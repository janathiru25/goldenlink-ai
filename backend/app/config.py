from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    APP_NAME: str = "GoldenLink AI Backend"
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    DEBUG: bool = True

    MONGODB_URI: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "goldenlink"

    DEMO_MODE: bool = True

    CORS_ORIGINS: str = "http://localhost:4200,http://127.0.0.1:4200,http://localhost:3000"

    NOTIFICATION_SERVICE_URL: str = "http://localhost:5001"

    # AI Provider settings
    AI_PROVIDER_TYPE: str = "rule_based"  # rule_based, model, external_api
    AI_MODEL_PATH: str = ""
    EXTERNAL_AI_API_KEY: str = ""
    EXTERNAL_AI_ENDPOINT: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

@lru_cache()
def get_settings() -> Settings:
    return Settings()
