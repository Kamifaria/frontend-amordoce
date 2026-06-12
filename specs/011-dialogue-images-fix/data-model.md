# Data Model: Dialogue and CG Image Backgrounds Fix

No new database entities or state schemas are introduced. We are adjusting existing frontend view states.

## Component States & Properties

### `CGOverlay` Component
- **Props**:
  - `cgUrl`: string (Path to the CG illustration asset)
  - `cgId`: string (Unique identifier for the CG, used to unlock it in the store)
  - `isOpen`: boolean (Controls visibility of the overlay)
  - `onClose`: function (Closes the overlay)
- **Zustand Store Context**:
  - `backgroundUrl`: string (Used to retrieve the active location background to display behind the illustration)
