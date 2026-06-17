# Walkthrough: Story Dialogue Bugfixes, Maggie Integration & Class Schedules

## Summary of Changes
- Fixed dangling node references: `find-notebook` corrected to `quest-found-notebook` in `maggie-art-notebook` dialogue node.
- Connected the Photography Room (`search-galpao`) which was previously unreachable, linking it to the list of choices in the notebook search quest (`quest-choose-location`, etc.).
- Defined Maggie's dialogue branches (`maggie-start`, `maggie-school-notebook`, `maggie-school-flirt`), rendering her sprite and allowing players to talk/flirt with her.
- Created morning (`aula-schedule-morning`) and afternoon (`aula-schedule-afternoon`) class time transitions and schedules.
- Added a new flirting choice for Nathaniel's classroom encounter (`nathaniel-classroom-flirt`) yielding +25 LOM.

## Testing & Verification
- Validated compile status via `npm run build`.
