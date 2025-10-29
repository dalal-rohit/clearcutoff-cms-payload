import * as migration_20251024_134601 from './20251024_134601';
import * as migration_20251029_101944 from './20251029_101944';

export const migrations = [
  {
    up: migration_20251024_134601.up,
    down: migration_20251024_134601.down,
    name: '20251024_134601',
  },
  {
    up: migration_20251029_101944.up,
    down: migration_20251029_101944.down,
    name: '20251029_101944'
  },
];
