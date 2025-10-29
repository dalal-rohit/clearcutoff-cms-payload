import * as migration_20251029_103348 from './20251029_103348';
import * as migration_20251029_104551 from './20251029_104551';

export const migrations = [
  {
    up: migration_20251029_103348.up,
    down: migration_20251029_103348.down,
    name: '20251029_103348',
  },
  {
    up: migration_20251029_104551.up,
    down: migration_20251029_104551.down,
    name: '20251029_104551'
  },
];
