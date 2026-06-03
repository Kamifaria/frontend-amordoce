# Feature Specification: Backend Dialogue Engine & Character Progression

**Feature Branch**: `002-backend-engine`

**Created**: 2026-06-02

**Status**: Draft

**Input**: User description: "Você é um Arquiteto de Software e Roteirista Sênior especialista no ecossistema TypeScript. Estamos desenvolvendo um clone moderno de Amor Doce. 1. Universo: Remi (vice-presidente misterioso, trench coat gótico, cartas de tarô, sotaque francês), Harry (bad boy provocador, guitarrista), Maggie (melhor amiga excêntrica, clube de artes). 2. Backend: NestJS, PostgreSQL/TypeORM, Redis. Validação de PA no servidor para transição de nós. 3. Três Botões de Escolha: Opção A (Doce/Tímida), Opção B (Ousada/Irônica), Opção C (Defensiva/Grossa)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Action Point (PA) Server Validation (Priority: P1)

Players click to advance dialogue or make choices, and the NestJS backend verifies that they have enough Action Points (PA) before executing the transition, rendering an error if insufficient and persisting the updated balance on success.

**Why this priority**: Crucial for game logic integrity, monetization rules, and preventing client-side cheat hacks.

**Independent Test**: Send API requests to advance dialogues with sufficient PA, check the response is successful and PA decrements, then send requests with zero/insufficient PA and verify the server returns a 403 Forbidden with a clear error payload.

**Acceptance Scenarios**:

1. **Given** a user has 10 PA, **When** they make a choice costing 10 PA, **Then** the NestJS server returns the next node successfully and database persists their new balance of 0 PA.
2. **Given** a user has 5 PA, **When** they request a node transition or choice costing 10 PA, **Then** the server rejects the request with a validation error and the player's database balance remains unchanged.

---

### User Story 2 - Character Affinity and the Three-Button Rule (Priority: P1)

When a player selects one of three path choices (Option A - Doce, Option B - Ousada, Option C - Grossa), the engine resolves the chosen path, updates the character's Love-o-Meter affinity score in the database, and serves the corresponding response dialogue.

**Why this priority**: Central visual novel gameplay mechanic affecting relationship progression.

**Independent Test**: Choose Option A and verify affinity with the character increases; choose Option C and verify affinity drops in the DB; query the player profile endpoint to confirm updated scores.

**Acceptance Scenarios**:

1. **Given** a decision node with Remi, **When** the player picks Option B (Ousada), **Then** Remi reacts with a unique expression and the player's affinity with Remi increases by 5 points.
2. **Given** a decision node with Remi, **When** the player picks Option C (Grossa), **Then** Remi reacts with irritation and the player's affinity with Remi decreases by 10 points.

---

### User Story 3 - Redis Caching for Dialogue Trees (Priority: P2)

The dialogue tree for the current active chapter is cached in Redis to guarantee ultra-fast response times when navigating dialogues, loading database configurations only on cache miss.

**Why this priority**: Speeds up dialogue engine server lookups, reducing DB query strain during high player concurrency.

**Independent Test**: Load a dialogue node, modify the database entry directly, load the node again and confirm the old cached value is still served, then flush Redis and confirm the new database value gets retrieved and re-cached.

**Acceptance Scenarios**:

1. **Given** a player traverses standard linear nodes, **When** they advance, **Then** the response time stays under 50ms due to Redis cache hits.

---

### Edge Cases

- **Negative PA Balance**: System must enforce non-negative check constraints at DB-level.
- **Race Condition Click**: Simultaneous clicks sending multiple choices must be locked on server using transactional locks.
- **Missing Affinity Profile**: If a player meets a character for the first time, the system must lazily create their Love-o-Meter record with a starting affinity of 0.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The NestJS API MUST validate the player's session and check PA requirements for each incoming node transit request.
- **FR-002**: The server MUST update the player's `playerPA` and affinity (Love-o-Meter) scores in PostgreSQL via TypeORM transactional queries.
- **FR-003**: The dialogue structure MUST include character specific identifiers (`remi`, `harry`, `maggie`) and track expression states.
- **FR-004**: Choices MUST follow the Three-Button Rule, cataloging responses as Option A, B, or C.
- **FR-005**: Dialogue chapters must be cached in Redis with keys mapped to their chapter ID.

### Key Entities

- **Player**: ID, Name, PA, Gold, currentChapterId, currentNodeId.
- **LoveOMeter**: PlayerId, CharacterId (e.g., 'remi'), AffinityScore (-100 to 100).
- **DialogueNode**: Cached JSON structure representing story sequences.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Node lookup and PA validation requests respond in under 35ms when served from Redis cache.
- **SC-002**: Database constraints guarantee PA can never go below 0 under concurrent transaction loads.
- **SC-003**: API returns standard JSON error objects with clear status codes (`400 Bad Request`, `403 Forbidden`).
