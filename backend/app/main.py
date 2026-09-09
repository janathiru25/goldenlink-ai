import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database import get_db
from app.routes.incidents import router as incidents_router
from app.routes.responders import router as responders_router
from app.routes.hospitals import router as hospitals_router
from app.routes.ai import router as ai_router
from app.routes.notifications import router as notifications_router
from app.routes.auth import router as auth_router
from app.services.ai_service import get_ai_service


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

logger = logging.getLogger("goldenlink.main")

settings = get_settings()
db_manager = get_db()


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"Starting {settings.APP_NAME}...")

    await db_manager.connect()

    ai_status = get_ai_service().get_status()

    logger.info(
        f"AI Provider initialized: "
        f"{ai_status.provider} (mode: {ai_status.mode})"
    )

    yield

    logger.info("Shutting down GoldenLink AI Backend...")

    await db_manager.close()


app = FastAPI(
    title=settings.APP_NAME,
    description=(
        "Emergency Incident Coordination, AI Triage, "
        "Responder Matching & Hospital Recommendation API"
    ),
    version="1.0.0",
    lifespan=lifespan
)


# Configure CORS
# Explicitly allow Angular development servers running on
# localhost and 127.0.0.1.
allowed_origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register API routers under /api
app.include_router(incidents_router, prefix="/api")
app.include_router(responders_router, prefix="/api")
app.include_router(hospitals_router, prefix="/api")
app.include_router(ai_router, prefix="/api")
app.include_router(notifications_router, prefix="/api")
app.include_router(auth_router, prefix="/api")


@app.get("/")
async def root():
    return {
        "app": settings.APP_NAME,
        "version": "1.0.0",
        "docs": "/docs",
        "status": "online",
        "database": db_manager.get_status(),
        "ai": get_ai_service().get_status().model_dump()
    }


@app.get("/health")
@app.get("/api/health")
async def health_check():
    db_status = db_manager.get_status()
    ai_status = get_ai_service().get_status()

    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "database": db_status,
        "ai": ai_status.model_dump(),
        "demo_mode": settings.DEMO_MODE
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )