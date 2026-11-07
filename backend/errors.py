"""Custom error classes for the research pipeline."""


class ResearchError(Exception):
    """Base class for all pipeline errors."""


class FatalError(ResearchError):
    """Something went wrong that stops the whole run.
    Example: all LLM keys exhausted."""


class RetryableError(ResearchError):
    """Transient failure — retry with backoff.
    Example: 429 rate limit, network timeout."""


class NonFatalError(ResearchError):
    """Failure inside one step that shouldn't kill the run.
    Example: one source 403'd during reading."""


class ProviderError(ResearchError):
    """Raised by provider implementations."""


class KeyExhaustedError(FatalError):
    """All API keys for a provider are on cooldown."""