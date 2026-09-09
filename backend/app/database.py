import logging
import copy
from typing import Dict, Any, List, Optional
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.config import get_settings

logger = logging.getLogger("goldenlink.database")

class AsyncInMemoryCursor:
    def __init__(self, items: List[Dict[str, Any]]):
        self.items = [copy.deepcopy(item) for item in items]
        self._index = 0

    def sort(self, key_or_list, direction=None):
        # basic sort support
        try:
            if isinstance(key_or_list, str):
                rev = (direction == -1)
                self.items.sort(key=lambda x: x.get(key_or_list, ""), reverse=rev)
            elif isinstance(key_or_list, list) and len(key_or_list) > 0:
                key, direction = key_or_list[0]
                rev = (direction == -1)
                self.items.sort(key=lambda x: x.get(key, ""), reverse=rev)
        except Exception:
            pass
        return self

    def limit(self, count: int):
        self.items = self.items[:count]
        return self

    async def to_list(self, length: Optional[int] = None) -> List[Dict[str, Any]]:
        if length is not None:
            return copy.deepcopy(self.items[:length])
        return copy.deepcopy(self.items)

    def __aiter__(self):
        self._index = 0
        return self

    async def __anext__(self):
        if self._index < len(self.items):
            item = copy.deepcopy(self.items[self._index])
            self._index += 1
            return item
        raise StopAsyncIteration

class AsyncInMemoryCollection:
    def __init__(self, name: str):
        self.name = name
        self.documents: List[Dict[str, Any]] = []

    def _matches(self, doc: Dict[str, Any], query: Dict[str, Any]) -> bool:
        if not query:
            return True
        for k, v in query.items():
            if isinstance(v, dict):
                # Basic operator support e.g. $in, $ne
                if "$in" in v and doc.get(k) not in v["$in"]:
                    return False
                if "$ne" in v and doc.get(k) == v["$ne"]:
                    return False
            else:
                if doc.get(k) != v:
                    return False
        return True

    async def insert_one(self, document: Dict[str, Any]):
        doc_copy = copy.deepcopy(document)
        if "_id" not in doc_copy and "incidentId" in doc_copy:
            doc_copy["_id"] = doc_copy["incidentId"]
        elif "_id" not in doc_copy:
            doc_copy["_id"] = str(len(self.documents) + 1)
        self.documents.append(doc_copy)
        class InsertResult:
            inserted_id = doc_copy["_id"]
        return InsertResult()

    async def insert_many(self, documents: List[Dict[str, Any]]):
        for doc in documents:
            await self.insert_one(doc)

    async def find_one(self, filter: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        for doc in self.documents:
            if self._matches(doc, filter):
                return copy.deepcopy(doc)
        return None

    def find(self, filter: Optional[Dict[str, Any]] = None) -> AsyncInMemoryCursor:
        matched = [doc for doc in self.documents if self._matches(doc, filter or {})]
        return AsyncInMemoryCursor(matched)

    async def update_one(self, filter: Dict[str, Any], update: Dict[str, Any]):
        for idx, doc in enumerate(self.documents):
            if self._matches(doc, filter):
                if "$set" in update:
                    for k, v in update["$set"].items():
                        doc[k] = copy.deepcopy(v)
                else:
                    for k, v in update.items():
                        doc[k] = copy.deepcopy(v)
                self.documents[idx] = doc
                class UpdateResult:
                    matched_count = 1
                    modified_count = 1
                return UpdateResult()
        class EmptyUpdateResult:
            matched_count = 0
            modified_count = 0
        return EmptyUpdateResult()

    async def delete_one(self, filter: Dict[str, Any]):
        for idx, doc in enumerate(self.documents):
            if self._matches(doc, filter):
                del self.documents[idx]
                class DeleteResult:
                    deleted_count = 1
                return DeleteResult()
        class EmptyDeleteResult:
            deleted_count = 0
        return EmptyDeleteResult()

    async def count_documents(self, filter: Optional[Dict[str, Any]] = None) -> int:
        if not filter:
            return len(self.documents)
        return len([doc for doc in self.documents if self._matches(doc, filter)])

class DatabaseManager:
    def __init__(self):
        self.client: Optional[AsyncIOMotorClient] = None
        self.db: Optional[Any] = None
        self.is_in_memory: bool = False
        self._in_memory_collections: Dict[str, AsyncInMemoryCollection] = {}

    async def connect(self):
        settings = get_settings()
        try:
            logger.info(f"Connecting to MongoDB at {settings.MONGODB_URI}...")
            # Set short serverSelectionTimeoutMS so we fail fast to in-memory demo if no local daemon
            self.client = AsyncIOMotorClient(
                settings.MONGODB_URI,
                serverSelectionTimeoutMS=2000
            )
            # Ping database to verify connection
            await self.client.admin.command("ping")
            self.db = self.client[settings.DATABASE_NAME]
            self.is_in_memory = False
            logger.info(f"Successfully connected to MongoDB database: '{settings.DATABASE_NAME}'")
        except Exception as e:
            logger.warning(
                f"MongoDB connection failed: {e}. Falling back to high-fidelity In-Memory Database for DEMO_MODE."
            )
            self.is_in_memory = True
            self.db = None

        # Seed initial demo data
        if settings.DEMO_MODE:
            await self.seed_initial_data()

    async def close(self):
        if self.client:
            self.client.close()
            logger.info("MongoDB connection closed.")

    def get_collection(self, name: str):
        if not self.is_in_memory and self.db is not None:
            return self.db[name]
        if name not in self._in_memory_collections:
            self._in_memory_collections[name] = AsyncInMemoryCollection(name)
        return self._in_memory_collections[name]

    def get_status(self) -> Dict[str, Any]:
        settings = get_settings()
        return {
            "status": "in_memory_fallback" if self.is_in_memory else "connected",
            "mode": "in_memory_demo" if self.is_in_memory else "mongodb",
            "database": settings.DATABASE_NAME,
            "demo_mode": settings.DEMO_MODE
        }

    async def seed_initial_data(self):
        """Seed realistic responders and hospitals for demonstration."""
        responders_col = self.get_collection("responders")
        hospitals_col = self.get_collection("hospitals")

        resp_count = await responders_col.count_documents({})
        if resp_count == 0:
            logger.info("Seeding initial demo responders...")
            initial_responders = [
                {
                    "id": 1,
                    "responderId": "GL-R-2026-001",
                    "name": "Arun Kumar",
                    "initials": "AK",
                    "role": "First-Aid Trained",
                    "type": "medical",
                    "phone": "+91 98765 43210",
                    "distance": "0.4 km",
                    "distanceKm": 0.4,
                    "eta": "3 min",
                    "estimatedArrivalMinutes": 3,
                    "rating": 4.9,
                    "verified": True,
                    "available": True,
                    "status": "available",
                    "skills": ["First Aid", "Traffic Support", "CPR"],
                    "icon": "bi-person-check-fill",
                    "organization": "Tamil Nadu Volunteer Corps",
                    "vehicleNumber": "TN-38-AB-1234",
                    "latitude": 11.0168,
                    "longitude": 76.9558,
                    "workload": 0
                },
                {
                    "id": 2,
                    "responderId": "GL-R-2026-002",
                    "name": "Priya S",
                    "initials": "PS",
                    "role": "Community Volunteer",
                    "type": "volunteer",
                    "phone": "+91 98765 43211",
                    "distance": "0.8 km",
                    "distanceKm": 0.8,
                    "eta": "5 min",
                    "estimatedArrivalMinutes": 5,
                    "rating": 4.8,
                    "verified": True,
                    "available": True,
                    "status": "available",
                    "skills": ["Community Support", "Location Guidance", "First Aid"],
                    "icon": "bi-person-heart",
                    "organization": "Red Cross Volunteer",
                    "vehicleNumber": "TN-38-CD-5678",
                    "latitude": 11.0180,
                    "longitude": 76.9600,
                    "workload": 0
                },
                {
                    "id": 3,
                    "responderId": "GL-R-2026-003",
                    "name": "Vignesh R",
                    "initials": "VR",
                    "role": "First Response Volunteer",
                    "type": "ambulance",
                    "phone": "+91 98765 43212",
                    "distance": "1.1 km",
                    "distanceKm": 1.1,
                    "eta": "7 min",
                    "estimatedArrivalMinutes": 7,
                    "rating": 4.7,
                    "verified": True,
                    "available": True,
                    "status": "available",
                    "skills": ["First Aid", "Emergency Communication", "Trauma Care"],
                    "icon": "bi-shield-check",
                    "organization": "108 Fast Response Unit",
                    "vehicleNumber": "TN-38-EF-9012",
                    "latitude": 11.0200,
                    "longitude": 76.9650,
                    "workload": 0
                },
                {
                    "id": 4,
                    "responderId": "GL-R-2026-004",
                    "name": "Kavya M",
                    "initials": "KM",
                    "role": "Community Volunteer",
                    "type": "volunteer",
                    "phone": "+91 98765 43213",
                    "distance": "1.6 km",
                    "distanceKm": 1.6,
                    "eta": "9 min",
                    "estimatedArrivalMinutes": 9,
                    "rating": 4.6,
                    "verified": True,
                    "available": False,
                    "status": "busy",
                    "skills": ["Location Guidance", "Communication"],
                    "icon": "bi-person-check",
                    "organization": "Civil Defense Volunteer",
                    "vehicleNumber": "TN-38-GH-3456",
                    "latitude": 11.0250,
                    "longitude": 76.9700,
                    "workload": 1
                }
            ]
            for r in initial_responders:
                await responders_col.insert_one(r)

        hosp_count = await hospitals_col.count_documents({})
        if hosp_count == 0:
            logger.info("Seeding initial demo hospitals...")
            initial_hospitals = [
                {
                    "hospitalId": "HOSP-001",
                    "name": "Coimbatore Medical College Hospital (Government CMCH)",
                    "address": "Trichy Road, Gopalapuram, Coimbatore, Tamil Nadu 641018",
                    "latitude": 11.0016,
                    "longitude": 76.9664,
                    "distanceKm": 1.8,
                    "phone": "0422-2301393",
                    "emergencyAvailable": True,
                    "availableBeds": 42,
                    "icuAvailable": 8,
                    "specialties": ["Trauma Care", "Emergency Medicine", "Neurosurgery", "Orthopedics", "Burn Unit"],
                    "ambulanceAvailable": True,
                    "estimatedArrivalMinutes": 6,
                    "operatingHours": "24x7",
                    "rating": 4.7
                },
                {
                    "hospitalId": "HOSP-002",
                    "name": "PSG Institute of Medical Sciences & Research",
                    "address": "Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641004",
                    "latitude": 11.0254,
                    "longitude": 77.0028,
                    "distanceKm": 4.2,
                    "phone": "0422-2570170",
                    "emergencyAvailable": True,
                    "availableBeds": 28,
                    "icuAvailable": 5,
                    "specialties": ["Trauma Care", "Cardiology", "Critical Care", "Pediatric ICU"],
                    "ambulanceAvailable": True,
                    "estimatedArrivalMinutes": 11,
                    "operatingHours": "24x7",
                    "rating": 4.8
                },
                {
                    "hospitalId": "HOSP-003",
                    "name": "G. Kuppuswamy Naidu Memorial Hospital (GKNM)",
                    "address": "P.N. Palayam, Coimbatore, Tamil Nadu 641037",
                    "latitude": 11.0135,
                    "longitude": 76.9805,
                    "distanceKm": 2.9,
                    "phone": "0422-4323800",
                    "emergencyAvailable": True,
                    "availableBeds": 15,
                    "icuAvailable": 3,
                    "specialties": ["Cardiothoracic", "Emergency Care", "General Surgery"],
                    "ambulanceAvailable": False,
                    "estimatedArrivalMinutes": 8,
                    "operatingHours": "24x7",
                    "rating": 4.6
                }
            ]
            for h in initial_hospitals:
                await hospitals_col.insert_one(h)

db_manager = DatabaseManager()

def get_db():
    return db_manager
