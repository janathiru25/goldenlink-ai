import hashlib
import hmac
import secrets
from datetime import datetime, timezone
from typing import Optional, Dict, Any

from app.database import get_db
from app.schemas.auth import (
    BystanderRegister,
    BystanderLogin,
    BystanderResponse,
    AuthResponse
)


class AuthService:
    def __init__(self):
        self.db_manager = get_db()

    @property
    def collection(self):
        return self.db_manager.get_collection("bystanders")

    def _normalize_phone(self, phone: str) -> str:
        return "".join(char for char in phone if char.isdigit() or char == "+")

    def _hash_password(self, password: str, salt: Optional[bytes] = None):
        if salt is None:
            salt = secrets.token_bytes(16)

        password_hash = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            salt,
            120_000
        )

        return salt.hex(), password_hash.hex()

    def _verify_password(
        self,
        password: str,
        salt_hex: str,
        stored_hash: str
    ) -> bool:
        try:
            salt = bytes.fromhex(salt_hex)

            _, calculated_hash = self._hash_password(
                password,
                salt
            )

            return hmac.compare_digest(
                calculated_hash,
                stored_hash
            )
        except Exception:
            return False

    def _generate_user_id(self) -> str:
        timestamp = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
        random_part = secrets.token_hex(3).upper()

        return f"GL-B-{timestamp}-{random_part}"

    def _generate_access_token(self) -> str:
        return secrets.token_urlsafe(48)

    def _public_user(self, document: Dict[str, Any]) -> BystanderResponse:
        return BystanderResponse(
            userId=document["userId"],
            fullName=document["fullName"],
            phoneNumber=document["phoneNumber"],
            email=document["email"],
            location=document["location"],
            createdAt=document["createdAt"]
        )

    async def register(
        self,
        data: BystanderRegister
    ) -> AuthResponse:

        phone = self._normalize_phone(data.phoneNumber)

        existing_user = await self.collection.find_one({
            "phoneNumber": phone
        })

        if existing_user:
            return AuthResponse(
                success=False,
                message="A bystander account with this mobile number already exists."
            )

        existing_email = await self.collection.find_one({
            "email": data.email.lower().strip()
        })

        if existing_email:
            return AuthResponse(
                success=False,
                message="An account with this email address already exists."
            )

        salt, password_hash = self._hash_password(data.password)

        now = datetime.now(timezone.utc).isoformat()

        user_document = {
            "userId": self._generate_user_id(),
            "fullName": data.fullName.strip(),
            "phoneNumber": phone,
            "email": data.email.lower().strip(),
            "location": data.location.strip(),
            "passwordSalt": salt,
            "passwordHash": password_hash,
            "createdAt": now,
            "lastLoginAt": None,
            "isActive": True,
            "sessionToken": None
        }

        await self.collection.insert_one(user_document)

        return AuthResponse(
            success=True,
            message="Bystander account created successfully.",
            user=self._public_user(user_document)
        )

    async def login(
        self,
        data: BystanderLogin
    ) -> AuthResponse:

        phone = self._normalize_phone(data.phoneNumber)

        user = await self.collection.find_one({
            "phoneNumber": phone
        })

        if not user:
            return AuthResponse(
                success=False,
                message="Invalid mobile number or password."
            )

        if not user.get("isActive", True):
            return AuthResponse(
                success=False,
                message="This account is currently inactive."
            )

        password_valid = self._verify_password(
            data.password,
            user.get("passwordSalt", ""),
            user.get("passwordHash", "")
        )

        if not password_valid:
            return AuthResponse(
                success=False,
                message="Invalid mobile number or password."
            )

        access_token = self._generate_access_token()
        now = datetime.now(timezone.utc).isoformat()

        await self.collection.update_one(
            {"userId": user["userId"]},
            {
                "$set": {
                    "sessionToken": access_token,
                    "lastLoginAt": now
                }
            }
        )

        user["sessionToken"] = access_token
        user["lastLoginAt"] = now

        return AuthResponse(
            success=True,
            message="Bystander login successful.",
            accessToken=access_token,
            user=self._public_user(user)
        )

    async def get_user_by_token(
        self,
        access_token: str
    ) -> Optional[BystanderResponse]:

        if not access_token:
            return None

        user = await self.collection.find_one({
            "sessionToken": access_token,
            "isActive": True
        })

        if not user:
            return None

        return self._public_user(user)


auth_service_instance = AuthService()


def get_auth_service() -> AuthService:
    return auth_service_instance