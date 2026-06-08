# Tasks: Login Screen Amor Doce

**Input**: Design documents from `specs/003-login-screen/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and styling setup for the login portal

- [x] T001 Define color variables and fonts in `src/app/globals.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core layout components that must be present for the page setup

- [x] T002 Create initial login page container layout at `src/app/login/page.tsx`

---

## Phase 3: User Story 1 - Desktop Layout Authentication (Priority: P1) 🎯 MVP

**Goal**: Implement the horizontal pink login header bar and classic background layout

**Independent Test**: Load `http://localhost:3000/login`, see the top login bar, input fields, logo, background, fill the form, click submit and verify validation.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create top authentication bar in `src/components/game/TopLoginBar.tsx`
- [x] T004 [P] [US1] Integrate `TopLoginBar` and classic background style in `src/app/login/page.tsx`
- [x] T005 [US1] Set up form validation and login logic in `src/components/game/TopLoginBar.tsx`

---

## Phase 4: User Story 2 - Cadastro e CTA "Jogar" (Priority: P2)

**Goal**: Implement the presentation info section and "JOGAR" registration button

**Independent Test**: Check for the "JOGAR" button and stats counter on the left side of the screen.

### Implementation for User Story 2

- [x] T006 [US2] Create Hero presentation component in `src/components/game/HeroSection.tsx`
- [x] T007 [US2] Add counter statistics and "JOGAR" CTA button to `src/components/game/HeroSection.tsx`
- [x] T008 [US2] Mount the `HeroSection` on the page `src/app/login/page.tsx`

---

## Phase 5: User Story 3 - Menu de Navegação e Redes Sociais (Priority: P3)

**Goal**: Implement the right-side vertical menu and social links footer

**Independent Test**: Click links in the right navigation bar and check redirection or anchor behavior.

### Implementation for User Story 3

- [x] T009 [US3] Create vertical navigation links in `src/components/game/SideNavMenu.tsx`
- [x] T010 [US3] Add social media icon links in `src/components/game/SideNavMenu.tsx` or `src/app/login/page.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Refactoring, responsiveness tuning and final verification

- [x] T011 Verify responsiveness of the top login bar and hero elements on mobile viewports
- [x] T012 Run quickstart validation to verify that build passes and linting is correct
