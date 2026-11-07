"""Abstract LLM provider interface."""
from abc import ABC, abstractmethod
from typing import Any


class LLMProvider(ABC):
    """
    Every LLM provider must implement this interface.
    Nothing in the pipeline should import a specific SDK — only this class.
    """

    @abstractmethod
    async def generate(self, prompt: str, **kwargs: Any) -> str:
        """Return plain text completion for a prompt."""

    @abstractmethod
    async def generate_json(self, prompt: str, **kwargs: Any) -> dict:
        """Return parsed JSON for a prompt that asks for JSON output."""

    @abstractmethod
    async def health_check(self) -> bool:
        """Quick call to see if the provider is reachable with current keys."""