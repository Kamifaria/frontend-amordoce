# Data Model: Backend Dialogue Engine & Character Progression

## Database Schemas (TypeORM Entities)

### 1. Player Entity
```typescript
@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: 100 })
  playerPA: number;

  @Column({ default: 50 })
  playerGold: number;

  @Column({ default: 'start' })
  currentNodeId: string;

  @OneToMany(() => LoveOMeter, (love) => love.player)
  loveOMeters: LoveOMeter[];
}
```

### 2. LoveOMeter (Affinity) Entity
```typescript
@Entity('love_o_meters')
@Unique(['playerId', 'characterId'])
export class LoveOMeter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  playerId: string;

  @Column()
  characterId: string; // e.g., 'remi', 'harry', 'maggie'

  @Column({ default: 0 })
  affinityScore: number; // Range: -100 to 100

  @ManyToOne(() => Player, (player) => player.loveOMeters, { onDelete: 'CASCADE' })
  player: Player;
}
```

### 3. Story Decision Mapping
Option types map to affinity modifiers dynamically resolved in the service layer:
- **Option A (Doce/Tímida)**: +5 affinity for protetores (e.g., Lysandre, Nathaniel).
- **Option B (Ousada/Irônica)**: +5 affinity for bad boys (e.g., Remi, Harry).
- **Option C (Defensiva/Grossa)**: -10 affinity across all characters.
