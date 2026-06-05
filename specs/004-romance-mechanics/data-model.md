# Data Model: Romance Mechanics & Gameplay Expansion

## Entities

### `CharacterAffinity` (Existing - Backend & Frontend)
Tracks the relationship score with each dateable character.
- `character_id`: string (e.g. `'castiel'`, `'lysandre'`, `'nathaniel'`)
- `affinity_score`: integer (-100 to 100, defaults to 0)

### `PhoneCallLog` (New - Backend & Frontend)
Tracks the history of phone interactions to prevent duplicate daily calls or double-triggering events.
- `id`: UUID (Primary Key)
- `user_id` / `player_progress_id`: Foreign Key referencing the player progress
- `character_id`: string (Love interest identifier)
- `direction`: enum (`'outgoing'` / `'incoming'`)
- `timestamp`: DateTime
- `affinity_at_call`: integer (affinity level at the time of the call)
- `dialogue_node_id`: string (the visual novel dialogue node started by this call)
- `completed`: boolean (whether the conversation finished)

### `UnlockedTip` (New - Backend & Frontend)
Tracks which game tips/guides the player has unlocked.
- `tip_id`: string (e.g., `'castiel_likes'`, `'nathaniel_schedule'`)
- `unlocked_at`: DateTime
