# Implementation Plan: Backend Dialogue Engine & Character Progression

**Branch**: `002-backend-engine` | **Date**: 2026-06-02 | **Spec**: [specs/002-backend-engine/spec.md](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/specs/002-backend-engine/spec.md)

**Input**: Feature specification from `specs/002-backend-engine/spec.md`

## Summary

This plan outlines the integration of the NestJS dialogue engine with PostgreSQL and Redis. The backend API validates session security, checks and deducts Action Points (PA) inside atomic PostgreSQL transactions, manages character-affinity (Love-o-Meter) updates based on the Three-Button Rule (Doce, Ousada, Grossa), and caches active narrative trees in Redis to guarantee low latency lookup.

## Technical Context

- **Language/Version**: TypeScript 5.0+ / Node.js 20+
- **Primary Dependencies**: NestJS 10+, TypeORM, PostgreSQL (`pg`), Redis (`redis` / `cache-manager-redis-yet`)
- **Storage**: PostgreSQL (persisting Player and LoveOMeter states), Redis (caching active Chapter trees)
- **Testing**: Jest (NestJS unit and integration testing)
- **Target Platform**: Node.js back-end environment
- **Performance Goals**: Server lookup response <35ms, strict concurrency validation

## Constitution Check

*GATE: Passed. Principles verified:*

- **I. Component Isolation**: Separated modules (`AuthModule`, `PlayerModule`, `DialogueEngineModule`) ensure NestJS controllers and services are fully decoupled.
- **II. Premium Experience**: Ultra-low database latencies backed by Redis cache prevent UI delay.
- **III. Strict Type Safety**: TypeORM entity typings and JSON contracts match shared specifications.
- **IV. Centralized State**: PA validation and updates are computed strictly on the backend, serving as the single source of truth for the Zustand store.

## Project Structure

### Documentation (this feature)

```text
specs/002-backend-engine/
├── plan.md              # This file
├── research.md          # Concurrency and caching strategies
├── data-model.md        # PostgreSQL database schemas
├── quickstart.md        # Bootstrap and migration guidance
├── checklists/
│   └── requirements.md  # Specification checklist
└── contracts/
    └── api.md           # NestJS Controller endpoints contract
```

### Source Code (Backend Setup)

```text
backend-amordoce/
├── src/
│   ├── app.module.ts
│   ├── player/
│   │   ├── entities/
│   │   │   ├── player.entity.ts
│   │   │   └── loveometer.entity.ts
│   │   ├── player.controller.ts
│   │   └── player.service.ts
│   └── dialogue/
│       ├── dialogue.controller.ts
│       └── dialogue.service.ts
```

**Structure Decision**: Fully decoupled NestJS app directory located next to the Next.js frontend workspace in a mono-repository style setup.

## Complexity Tracking

*No current exceptions.*
