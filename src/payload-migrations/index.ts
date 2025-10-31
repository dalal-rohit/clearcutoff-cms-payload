import * as migration_20251030_101129 from './20251030_101129';
import * as migration_20251031_074415 from './20251031_074415';

export const migrations = [
  {
    up: migration_20251030_101129.up,
    down: migration_20251030_101129.down,
    name: '20251030_101129',
  },
  {
    up: migration_20251031_074415.up,
    down: migration_20251031_074415.down,
    name: '20251031_074415'
  },
];
