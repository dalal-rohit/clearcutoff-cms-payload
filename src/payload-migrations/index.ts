import * as migration_20251017_034215 from './20251017_034215';
import * as migration_20251017_035000 from './20251017_035000';
import * as migration_20251017_035538 from './20251017_035538';

export const migrations = [
  {
    up: migration_20251017_034215.up,
    down: migration_20251017_034215.down,
    name: '20251017_034215',
  },
  {
    up: migration_20251017_035000.up,
    down: migration_20251017_035000.down,
    name: '20251017_035000',
  },
  {
    up: migration_20251017_035538.up,
    down: migration_20251017_035538.down,
    name: '20251017_035538'
  },
];
