# Quickstart: Testing Mini-Map & Romance Routes

This guide helps you test and verify the new Navigation and Relationship Tier features.

## 1. Local Testing Steps

### Verifying the Mini-Map
1. Launch the game in dev mode: `npm run dev`.
2. Access the main game screen (`/game`).
3. Click the **Map** button in the header.
4. Click **Pátio** on the map overlay. Verify the background changes to `patio` and you meet Patio characters.
5. Click the **Map** button again and return to **School**.

### Verifying Maggie's Expressions
1. Progress the story to Maggie's Art Club introduction.
2. Observe Maggie's dialogue boxes.
3. Check that her sprite transitions correctly between her 4 expressions:
   - **Neutral** (default greeting)
   - **Blushing** (when complimented)
   - **Angry** (when criticizing the room's mess)
   - **Sly/Smug** (when teasing or choosing bold paths)

### Verifying CG Unlocks
1. Trigger the Castiel & Nathaniel fight.
2. Verify that the dialogue displays the custom CG overlay image in place of individual character sprites.
3. Help Maggie paint in the art room and verify that her dynamic painting CG is displayed.
4. Check the "My Gallery" or "Collectibles" tab in the main menu to see the unlocked CG list.

### Verifying Phone Call Tiers
1. Open the phone interface and call Castiel while your affinity is below 50. Verify he responds with his friendly/annoyed tone.
2. Select choices that raise Castiel's affinity above 50.
3. Call Castiel again. Verify the conversation transitions to his Love Tier dialogue tree, culminating in a date invitation.
