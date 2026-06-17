# Research: Closet Customization, Clothing Shop & Gold Earning Mechanics

## Decision
- **Goth Customization Assets**: We will replace the placeholder emojis and clothing metadata in `WardrobeCloset.tsx` with dark and gothic equivalents (e.g. Cabelo Roxo Gótico, Blusa de Corpete, Jaqueta de Spikes, Calça Rasgada Punk, etc.).
- **Map Node & Shop Overlay**: Add a new location ID `'shop'` ("Loja de Roupas") to the Map. Clicking it will transition `currentLocationId` to `'shop'`. When this location is active, the `GameScreen` will render a `ClothingShop` overlay layout.
- **Gold Earning**: We will update the minigame ending handlers in `useGameStore.ts` to reward the user with Gold:
  - Guitar Minigame: High Score (400+) yields 20 Gold, Medium yields 10 Gold, Low yields 5 Gold.
  - Painting Minigame: Completing free paint yields 15 Gold.
  - Tarot Daily: Reward options in Tarot card draws already support Gold, which will be wired up to buy outfits in the shop.
- **Types**: We will add `owned` or `unlockedItems` array to the `GameState` to keep track of bought outfits.

## Rationale
- Leveraging existing location transition code is non-intrusive.
- Rewarding Gold on minigame completion incentivizes gameplay.
