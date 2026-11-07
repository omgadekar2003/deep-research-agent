"""Brave Search provider — stub, ready to fill later."""
from providers.search.base import SearchProvider
from errors import ProviderError


class BraveProvider(SearchProvider):
    def __init__(self, api_keys: list[str]):
        self.api_keys = api_keys

    async def search(self, query: str, max_results: int = 5) -> list[dict]:
        raise ProviderError(
            "BraveProvider is not implemented yet. "
            "Fill in providers/search/brave.py to activate."
        )