"""Returns the correct LLM provider based on .env settings."""
from config import settings
from providers.llm.base import LLMProvider
from providers.llm.gemini import GeminiProvider
from providers.llm.openai import OpenAIProvider


_instance: LLMProvider | None = None


def get_llm_provider() -> LLMProvider:
    global _instance
    if _instance is not None:
        return _instance

    provider = settings.llm_provider.lower()

    if provider == "gemini":
        _instance = GeminiProvider(
            api_keys=settings.llm_api_keys_list,
            model=settings.llm_model,
        )
    elif provider == "openai":
        _instance = OpenAIProvider(
            api_keys=settings.llm_api_keys_list,
            model=settings.llm_model,
        )
    else:
        raise ValueError(f"Unsupported LLM_PROVIDER: {provider}")

    return _instance