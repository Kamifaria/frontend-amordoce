# Implementation Plan: Story Dialogue Bugfixes, Maggie Integration & Class Schedules (Chapter 1)

**Branch**: `016-story-fixes-maggie-classes` | **Date**: 2026-06-17 | **Spec**: [spec.md](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/specs/016-story-fixes-maggie-classes/spec.md)

**Input**: Feature specification from `specs/016-story-fixes-maggie-classes/spec.md`

## Summary

This plan outlines the fixes for dangling/broken dialogue nodes (`find-notebook` and `maggie-start`), details how Maggie is integrated as an active character during the school day in Episode 1, outlines how class schedule nodes/transitions are added, and details the additional flirty/romantic options across Chapter 1 dialogue trees.

## Technical Context

**Language/Version**: TypeScript / React 19 / Next.js 16
**Primary Dependencies**: React, Zustand, TailwindCSS, Framer Motion
**Storage**: Client-side Zustand store (persisted locally / session state)
**Testing**: Jest / React Testing Library
**Target Platform**: Web (Desktop & Mobile Responsive)
**Project Type**: Web Application
**Performance Goals**: Instant dialogue rendering and node transitions
**Constraints**: 100% type safety, no runtime crashes due to invalid nodes

## Constitution Check

- **Component Isolation**: Passed. Changes are confined to the static story configurations/types, keeping UI components completely decoupled.
- **Premium & Responsive UI**: Passed. Dialogue flows and LOM notifications render smoothly inside the existing optimized DialogueBox.
- **Strict Type Safety**: Passed. All new dialogue configurations will fully conform to the `DialogueNode` interface.
- **Centralized State Management**: Passed. Game store acts as the single source of truth for narrative nodes, choices, and LOM values.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── checklists/
    └── requirements.md  # Spec checklist
```

### Source Code (repository root)

```text
src/
├── mock/
│   └── storyData.ts     # Main dialogue configuration containing mockStory
├── shared/
│   └── types.ts         # TypeScript interfaces
```

**Structure Decision**: Monorepo structure, modifying mock data configurations inside `src/mock/storyData.ts`.

## Complexity Tracking

No violations.
