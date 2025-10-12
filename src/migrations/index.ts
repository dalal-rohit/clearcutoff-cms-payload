import * as migration_20251012_174400 from './20251012_174400';
import * as migration_20251012_175754 from './20251012_175754';

export const migrations = [
  {
    up: migration_20251012_174400.up,
    down: migration_20251012_174400.down,
    name: '20251012_174400',
  },
  {
    up: migration_20251012_175754.up,
    down: migration_20251012_175754.down,
    name: '20251012_175754'
  },
];
