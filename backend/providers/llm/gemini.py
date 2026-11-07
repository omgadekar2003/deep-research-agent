"""Gemini implementation of LLMProvider."""
import asyncio
import json
import re
import google.generativeai as genai

from errors import ProviderError
from providers.llm.base import LLMProvider
from utils.key_rotator import KeyRotator


FENCE_RE = re.compile(r"^```(?:json)?\s*(.*?)\s*```$", re.DOTALL)


def _strip_fences(raw: str) -> str:
    raw = raw.strip()
    m = FENCE_RE.match(raw)
    if m:
        return m.group(1).strip()
    return raw


def _sanitize_json(raw: str) -> str:
    """
    Fix Gemini's most common JSON mistakes:
    - literal newlines/tabs inside string values
    - trailing commas before } or ]
    """
    out = []
    in_string = False
    escaped = False
    for ch in raw:
        if escaped:
            out.append(ch)
            escaped = False
            continue
        if ch == "\\":
            out.append(ch)
            escaped = True
            continue
        if ch == '"':
            in_string = not in_string
            out.append(ch)
            continue
        if in_string and ch in ("\n", "\r", "\t"):
            if ch == "\n":
                out.append("\\n")
            elif ch == "\r":
                out.append("\\r")
            else:
                out.append("\\t")
            continue
        out.append(ch)
    text = "".join(out)

    # Remove trailing commas before } or ]
    text = re.sub(r",\s*([}\]])", r"\1", text)

    return text


class GeminiProvider(LLMProvider):
    def __init__(self, api_keys: list[str], model: str = "gemini-2.0-flash"):
        self.rotator = KeyRotator(api_keys)
        self.model_name = model

    def _model_for(self, key: str):
        genai.configure(api_key=key)
        return genai.GenerativeModel(self.model_name)

    async def _call(self, prompt: str, retries: int = 3) -> str:
        base_delay = 2.0
        last_error: Exception | None = None

        for attempt in range(retries):
            key = self.rotator.next()   # raises KeyExhaustedError if all dead
            try:
                model = self._model_for(key)
                response = await asyncio.to_thread(model.generate_content, prompt)
                text = getattr(response, "text", "") or ""
                if not text:
                    raise ProviderError("Gemini returned empty text")
                self.rotator.mark_success(key)
                return text
            except Exception as e:
                msg = str(e).lower()
                if "429" in msg or "quota" in msg or "resource_exhausted" in msg:
                    self.rotator.mark_failed(key)
                    last_error = e
                    await asyncio.sleep(base_delay * (2 ** attempt))
                    continue
                if "api key" in msg or "401" in msg or "permission" in msg:
                    self.rotator.mark_failed(key)
                    last_error = e
                    continue
                last_error = e
                await asyncio.sleep(base_delay)
        raise ProviderError(f"Gemini failed after retries: {last_error}")

    async def generate(self, prompt: str, **kwargs) -> str:
        return await self._call(prompt)

    async def generate_json(self, prompt: str, **kwargs) -> dict:
        raw = await self._call(prompt)
        cleaned = _strip_fences(raw)
        sanitized = _sanitize_json(cleaned)
        try:
            return json.loads(sanitized)
        except json.JSONDecodeError as e:
            raise ProviderError(
                f"Gemini returned invalid JSON: {e}. Raw: {raw[:300]}"
            )

    async def health_check(self) -> bool:
        try:
            await self.generate("Reply with exactly: OK")
            return True
        except Exception:
            return False