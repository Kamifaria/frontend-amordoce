# Quickstart & Verification: Story Exploration & Pacing

This guide details how to verify the story exploration and pacing implementation.

## Manual Verification Steps

1. **Verify Intro Pacing**:
   - Start the game.
   - Confirm you are in the Corridor (`corredor` background).
   - Advance through the dialogs (confrontation between Castiel and Nathaniel, tarot with Remi).
   - Try to click the map. Verify that navigation options are disabled or map is hidden.

2. **Verify Free Exploration Unlock**:
   - Once the intro dialogue is finished, a notification/tip should appear: *"Você agora pode explorar a escola livremente usando o mapa!"*
   - Open the Mini-Map.
   - Verify that **Pátio**, **Quadra**, and **Galpão** are clickable and unlocked.
   - Verify that **Cinema** is shown as locked with a padlock and has a hover tooltip: *"Desbloqueia após atingir afinidade 50 com algum paquera e progredir no mistério."*

3. **Verify Character Resident Movement**:
   - Travel to the **Pátio**. Verify that Castiel, Harry, and Kami are present.
   - Travel to the **Quadra**. Verify that Lysandre is present.
   - Travel to the **Galpão**. Verify that Maggie is present.

4. **Verify Cinema Unlock**:
   - Boost any character's affinity to 50 via the console or choices.
   - Complete the notebook search/mystery.
   - Verify that **Cinema** is now clickable and transitions to the cinema date scene.
