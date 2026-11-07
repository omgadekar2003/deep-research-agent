"""OpenAI provider — stub, ready to implement later.
To activate: set LLM_PROVIDER=openai in .env and fill this in."""
from typing import Any
from errors import ProviderError
from providers.llm.base import LLMProvider


class OpenAIProvider(LLMProvider):
    def __init__(self, api_keys: list[str], model: str = "gpt-4o-mini"):
        self.api_keys = api_keys
        self.model = model

    async def generate(self, prompt: str, **kwargs: Any) -> str:
        raise ProviderError(
            "OpenAIProvider is not implemented yet. "
            "Install 'openai' package and fill in providers/llm/openai.py."
        )

    async def generate_json(self, prompt: str, **kwargs: Any) -> dict:
        raise ProviderError("OpenAIProvider.generate_json not implemented yet.")

    async def health_check(self) -> bool:
        return False