import * as migration_20251025_060302 from './20251025_060302';
import * as migration_20251025_061401 from './20251025_061401';

export const migrations = [
  {
    up: migration_20251025_060302.up,
    down: migration_20251025_060302.down,
    name: '20251025_060302',
  },
  {
    up: migration_20251025_061401.up,
    down: migration_20251025_061401.down,
    name: '20251025_061401'
  },
];
