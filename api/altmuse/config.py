from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Required: Groq API key for the simple language service
    GROQ_API_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()
