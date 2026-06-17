# Data Model: Closet & Shop

We will update the `GameState` type inside `src/shared/types.ts` or directly in the store to support:
- `unlockedItems`: An array of strings containing the IDs of clothing items currently owned/unlocked by the player.
- `buyOutfit(itemId: string, cost: number)`: Action to purchase an item, checking gold reserves, deducting them, and adding the item ID to `unlockedItems`.

## Closet Item Categories
- **HAIRSTYLES**: `long-purple-goth`, `short-black-grunge`, `punk-braids`
- **TOPS**: `black-corset`, `leather-spikes`, `band-tshirt`
- **BOTTOMS**: `skirt-chains`, `ripped-jeans`, `shorts-fishnet`
