"""Tavily implementation of SearchProvider."""
import asyncio
from tavily import TavilyClient

from errors import ProviderError
from providers.search.base import SearchProvider
from utils.key_rotator import KeyRotator


class TavilyProvider(SearchProvider):
    def __init__(self, api_keys: list[str]):
        self.rotator = KeyRotator(api_keys)

    async def search(self, query: str, max_results: int = 5) -> list[dict]:
        base_delay = 2.0
        last_error: Exception | None = None

        for attempt in range(3):
            key = self.rotator.next()
            try:
                client = TavilyClient(api_key=key)
                resp = await asyncio.to_thread(
                    client.search,
                    query=query,
                    max_results=max_results,
                    search_depth="basic",
                )
                self.rotator.mark_success(key)
                results = resp.get("results", [])
                return [
                    {
                        "title": r.get("title", ""),
                        "url": r.get("url", ""),
                        "content": r.get("content", ""),
                        "score": float(r.get("score", 0.0)),
                    }
                    for r in results
                ]
            except Exception as e:
                msg = str(e).lower()
                if "429" in msg or "rate" in msg or "quota" in msg:
                    self.rotator.mark_failed(key)
                    last_error = e
                    await asyncio.sleep(base_delay * (2 ** attempt))
                    continue
                if "401" in msg or "unauthorized" in msg or "api key" in msg:
                    self.rotator.mark_failed(key)
                    last_error = e
                    continue
                last_error = e
                await asyncio.sleep(base_delay)
        raise ProviderError(f"Tavily failed after retries: {last_error}")