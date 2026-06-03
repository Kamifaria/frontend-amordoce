# Research Notes: Backend Dialogue Engine & Character Progression

## Technical Choices & Decisions

### 1. Database Locking for PA Deductions
- **Decision**: Use TypeORM Pessimistic Write Locks (`SELECT ... FOR UPDATE`) during PA updates.
- **Rationale**: 
  - Prevents race conditions where a player double-clicks a choice and triggers multiple concurrent API requests that check and deduct PA.
  - Ensures atomic balance checks at the database transaction boundary.
- **Alternatives Considered**: 
  - *Optimistic Locking*: Rejected because it throws conflicts back to the user instead of handling them gracefully by queuing or ignoring double-taps.

### 2. Redis Caching for Story Nodes
- **Decision**: Cache active chapter trees using Redis Hashmaps (`HGETALL`).
- **Rationale**: 
  - Loading dialogue trees from SQL databases on every line progression adds significant overhead. Caching the active tree in memory ensures sub-5ms lookup latency.
- **Alternatives Considered**: 
  - *Local Node Cache (Memory)*: Rejected because when scaling backend API horizontally to multiple nodes, local memory caches would go out of sync.

### 3. Love-o-Meter Relação/Affinity Calculations
- **Decision**: A transactional database update triggered by path identifiers (Option A, B, C) that applies modifiers directly to the `LoveOMeter` join table.
- **Rationale**: Keeps values bounded between -100 and 100 using database constraints or NestJS service validation.
