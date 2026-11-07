from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class AppSettings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # App
    app_name: str = Field("Deep Research API", alias="APP_NAME")
    environment: str = Field("dev", alias="ENVIRONMENT")
    debug: bool = Field(True, alias="DEBUG")

    # Security
    secret_key: str = Field(..., alias="SECRET_KEY")
    access_token_expire_minutes: int = Field(15, alias="ACCESS_TOKEN_EXPIRE_MINUTES")
    refresh_token_expire_days: int = Field(7, alias="REFRESH_TOKEN_EXPIRE_DAYS")

    # Database
    database_url: str = Field("sqlite:///./app.db", alias="DATABASE_URL")

    # CORS
    allowed_origins: str = Field(
        "http://localhost:3000", alias="ALLOWED_ORIGINS"
    )

    #SARVAM:
     # SARVAM API Key
    sarvam_api_key: str = Field("", alias="SARVAM_API_KEY")

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


app_settings = AppSettings()