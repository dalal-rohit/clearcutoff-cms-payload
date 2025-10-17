import * as migration_20251017_062920 from './20251017_062920';
import * as migration_20251017_063721 from './20251017_063721';
import * as migration_20251017_145756 from './20251017_145756';

export const migrations = [
  {
    up: migration_20251017_062920.up,
    down: migration_20251017_062920.down,
    name: '20251017_062920',
  },
  {
    up: migration_20251017_063721.up,
    down: migration_20251017_063721.down,
    name: '20251017_063721',
  },
  {
    up: migration_20251017_145756.up,
    down: migration_20251017_145756.down,
    name: '20251017_145756'
  },
];
