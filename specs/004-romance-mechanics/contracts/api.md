# API Contract: Phone Calls & Romance Mechanics

All endpoints are relative to backend base URL (e.g. `http://localhost:4000/api`).

## 1. Get Phone Contacts & Affinity
- **Endpoint**: `GET /player/phone/contacts`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`
  ```json
  [
    {
      "character_id": "castiel",
      "name": "Castiel",
      "affinity_score": 55,
      "avatar_url": "/assets/avatars/castiel.png",
      "can_call": true,
      "last_called": "2026-06-05T12:00:00Z"
    },
    {
      "character_id": "nathaniel",
      "name": "Nathaniel",
      "affinity_score": -10,
      "avatar_url": "/assets/avatars/nathaniel.png",
      "can_call": false,
      "last_called": "2026-06-05T14:30:00Z"
    }
  ]
  ```

## 2. Initiate Call
- **Endpoint**: `POST /player/phone/call`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "character_id": "castiel"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "call_id": "8f8b1c8f-3958-450c-b26a-54ff29906660",
    "dialogue_node_id": "phone_castiel_affinity_medium_1"
  }
  ```
- **Error Response**: `400 Bad Request` (e.g., if already called today)
  ```json
  {
    "message": "You have already called Castiel today."
  }
  ```

## 3. Get Dating Tips
- **Endpoint**: `GET /player/tips`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`
  ```json
  [
    {
      "tip_id": "castiel_likes",
      "title": "Gostos do Castiel",
      "content": "Castiel gosta de guitarras e prefere garotas que dizem o que pensam diretamente.",
      "unlocked_at": "2026-06-05T15:00:00Z"
    }
  ]
  ```
