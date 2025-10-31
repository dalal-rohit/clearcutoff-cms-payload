import * as migration_20251031_075710 from './20251031_075710';

export const migrations = [
  {
    up: migration_20251031_075710.up,
    down: migration_20251031_075710.down,
    name: '20251031_075710'
  },
];
