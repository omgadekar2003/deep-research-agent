"""Abstract search provider interface."""
from abc import ABC, abstractmethod


class SearchProvider(ABC):
    @abstractmethod
    async def search(self, query: str, max_results: int = 5) -> list[dict]:
        """
        Returns a list of:
          {"title": str, "url": str, "content": str, "score": float}
        """