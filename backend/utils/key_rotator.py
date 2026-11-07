"""Multi-key rotation with cooldowns for a single provider."""
import time
from errors import KeyExhaustedError


class KeyRotator:
    """
    Cycles through a list of API keys.
    A key that fails is put on cooldown and skipped until it expires.
    """

    def __init__(self, keys: list[str], cooldown_seconds: int = 300):
        cleaned = [k.strip() for k in keys if k and k.strip()]
        if not cleaned:
            raise ValueError("KeyRotator requires at least one key")
        self.keys = cleaned
        self.cooldown_seconds = cooldown_seconds
        self._dead: dict[str, float] = {}
        self._cursor = 0

    def _is_alive(self, key: str) -> bool:
        expiry = self._dead.get(key)
        if expiry is None:
            return True
        if time.time() >= expiry:
            del self._dead[key]
            return True
        return False

    def next(self) -> str:
        """Return the next alive key, or raise if all are dead."""
        n = len(self.keys)
        for _ in range(n):
            key = self.keys[self._cursor % n]
            self._cursor = (self._cursor + 1) % n
            if self._is_alive(key):
                return key
        raise KeyExhaustedError(
            f"All {n} keys for this provider are on cooldown. "
            f"Try again in a few minutes."
        )

    def mark_failed(self, key: str):
        """Put a key on cooldown."""
        self._dead[key] = time.time() + self.cooldown_seconds

    def mark_success(self, key: str):
        """Clear any cooldown for a key."""
        self._dead.pop(key, None)

    def alive_count(self) -> int:
        return sum(1 for k in self.keys if self._is_alive(k))