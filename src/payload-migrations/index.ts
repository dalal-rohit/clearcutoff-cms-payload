import * as migration_20251017_062920 from './20251017_062920';
import * as migration_20251025_055101 from './20251025_055101';

export const migrations = [
  {
    up: migration_20251017_062920.up,
    down: migration_20251017_062920.down,
    name: '20251017_062920',
  },
  {
    up: migration_20251025_055101.up,
    down: migration_20251025_055101.down,
    name: '20251025_055101'
  },
];
