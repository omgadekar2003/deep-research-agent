# """Brave Search provider — stub, ready to fill later."""
# from providers.search.base import SearchProvider
# from errors import ProviderError


# class BraveProvider(SearchProvider):
#     def __init__(self, api_keys: list[str]):
#         self.api_keys = api_keys

#     async def search(self, query: str, max_results: int = 5) -> list[dict]:
#         raise ProviderError(
#             "BraveProvider is not implemented yet. "
#             "Fill in providers/search/brave.py to activate."
#         )

"""Returns the correct search provider based on .env settings."""
from config import settings
from providers.search.base import SearchProvider
from providers.search.tavily import TavilyProvider
from providers.search.brave import BraveProvider


_instance: SearchProvider | None = None


def get_search_provider() -> SearchProvider:
    global _instance
    if _instance is not None:
        return _instance

    provider = settings.search_provider.lower()

    if provider == "tavily":
        _instance = TavilyProvider(api_keys=settings.search_api_keys_list)
    elif provider == "brave":
        _instance = BraveProvider(api_keys=settings.search_api_keys_list)
    else:
        raise ValueError(f"Unsupported SEARCH_PROVIDER: {provider}")

    return _instance