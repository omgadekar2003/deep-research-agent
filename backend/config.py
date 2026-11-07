# from pydantic_settings import BaseSettings, SettingsConfigDict
# from pydantic import Field


# class Settings(BaseSettings):
#     model_config = SettingsConfigDict(
#         env_file=".env",
#         env_file_encoding="utf-8",
#         extra="ignore",
#     )

#     gemini_api_key: str = Field(..., alias="GEMINI_API_KEY")
#     gemini_model: str = Field("gemini-3.6-flash", alias="GEMINI_MODEL")
#     tavily_api_key: str = Field(..., alias="TAVILY_API_KEY")
#     secret_key: str = Field(..., alias="SECRET_KEY")


# settings = Settings()


from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # LLM provider
    llm_provider: str = Field("gemini", alias="LLM_PROVIDER")
    llm_api_keys: str = Field(..., alias="LLM_API_KEYS")
    llm_model: str = Field("gemini-3.6-flash", alias="LLM_MODEL")

    # Search provider
    search_provider: str = Field("tavily", alias="SEARCH_PROVIDER")
    search_api_keys: str = Field(..., alias="SEARCH_API_KEYS")

    # App
    secret_key: str = Field(..., alias="SECRET_KEY")

    # DB
    database_url: str = Field("sqlite:///./app.db", alias="DATABASE_URL")
    checkpoint_db: str = Field("./checkpoints.db", alias="CHECKPOINT_DB")

    # SARVAM API Key
    sarvam_api_key: str = Field("", alias="SARVAM_API_KEY")

    # ---- Convenience ----
    @property
    def llm_api_keys_list(self) -> list[str]:
        return [k.strip() for k in self.llm_api_keys.split(",") if k.strip()]

    @property
    def search_api_keys_list(self) -> list[str]:
        return [k.strip() for k in self.search_api_keys.split(",") if k.strip()]


settings = Settings()