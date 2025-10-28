import * as migration_20251028_050335 from './20251028_050335';
import * as migration_20251028_050430 from './20251028_050430';
import * as migration_20251028_074640 from './20251028_074640';

export const migrations = [
  {
    up: migration_20251028_050335.up,
    down: migration_20251028_050335.down,
    name: '20251028_050335',
  },
  {
    up: migration_20251028_050430.up,
    down: migration_20251028_050430.down,
    name: '20251028_050430',
  },
  {
    up: migration_20251028_074640.up,
    down: migration_20251028_074640.down,
    name: '20251028_074640'
  },
];
