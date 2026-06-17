# Research: Dialogue Bugs, Maggie Integration and Class Schedules

## Decision
- **Maggie Integration**: We will introduce Maggie during the Episode 1 school search phase when visiting the Photography Room (Galpão) or in the courtyard. She will have a custom dialogue branch where the player meets her and can converse/flirt.
- **Broken Nodes**: Fix `find-notebook` reference in `maggie-art-notebook` to correctly point to `quest-found-notebook`. Ensure the Photography Room choices successfully point to `maggie-start`.
- **Class Schedules**: Add two transition nodes during Episode 1 representing the class schedules (e.g. morning classes notice and afternoon dismissal signal).
- **Flirting/Romance**: Insert additional dialogue choices that yield higher LOM (Love-O-Meter) affinity.

## Rationale
- Reusing the existing `DialogueNode` and `Choice` models ensures compatibility without schema changes.
- Direct static mock data update avoids any DB schema or API contract changes.
