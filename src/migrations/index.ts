import * as migration_20251016_054910 from './20251016_054910';

export const migrations = [
  {
    up: migration_20251016_054910.up,
    down: migration_20251016_054910.down,
    name: '20251016_054910'
  },
];
