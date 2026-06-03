# API Contracts: Backend Engine

## 1. Get Current Scene Node
- **Endpoint**: `GET /dialogue/current`
- **Headers**: `Authorization: Bearer <player_token>`
- **Response**:
```json
{
  "currentNodeId": "remi-intro",
  "speaker": "remi",
  "characterName": "Remi",
  "expression": "sorriso_ladino",
  "backgroundUrl": "https://images.unsplash.com/school-corridor.jpg",
  "text": "Ah, bonjour chérie. Que bom ver você fora da sala...",
  "playerPA": 90,
  "playerGold": 50,
  "choices": [
    { "text": "Oi, Remi... estava te procurando. (Doce)", "nextNodeId": "remi-doce", "costPA": 10 },
    { "text": "Curioso te ver por aqui, Sr. Vice-Presidente. (Ousada)", "nextNodeId": "remi-ousado", "costPA": 10 },
    { "text": "Tenho pressa, licença. (Grossa)", "nextNodeId": "remi-grosso", "costPA": 10 }
  ]
}
```

## 2. Execute Dialogue Progression
- **Endpoint**: `POST /dialogue/advance`
- **Headers**: `Authorization: Bearer <player_token>`
- **Response**:
```json
{
  "currentNodeId": "remi-linear-next",
  "speaker": "remi",
  "characterName": "Remi",
  "expression": "neutro",
  "backgroundUrl": "https://images.unsplash.com/school-corridor.jpg",
  "text": "D'accord, vamos ver até onde isso nos leva.",
  "playerPA": 90,
  "playerGold": 50
}
```

## 3. Submit Decision Choice
- **Endpoint**: `POST /dialogue/choice`
- **Headers**: `Authorization: Bearer <player_token>`
- **Body**:
```json
{
  "choiceText": "Curioso te ver por aqui, Sr. Vice-Presidente. (Ousada)",
  "nextNodeId": "remi-ousado",
  "costPA": 10
}
```
- **Response**:
```json
{
  "currentNodeId": "remi-ousado",
  "speaker": "remi",
  "characterName": "Remi",
  "expression": "sorriso_ladino",
  "backgroundUrl": "https://images.unsplash.com/school-corridor.jpg",
  "text": "Mon ange, você sabe como prender minha atenção.",
  "playerPA": 80,
  "playerGold": 50,
  "affinityUpdated": {
    "characterId": "remi",
    "newScore": 5,
    "delta": 5
  }
}
```
- **Error Response (Insufficient PA)**:
  - Status Code: `403 Forbidden`
  - Payload:
```json
{
  "statusCode": 403,
  "message": "Pontos de Ação (PA) insuficientes para realizar esta ação.",
  "error": "Forbidden"
}
```
