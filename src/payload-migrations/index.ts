import * as migration_20251017_034215 from './20251017_034215';
import * as migration_20251017_035000 from './20251017_035000';
import * as migration_20251017_035538 from './20251017_035538';
import * as migration_20251017_040216 from './20251017_040216';
import * as migration_20251017_045940 from './20251017_045940';
import * as migration_20251017_050513 from './20251017_050513';
import * as migration_20251017_051035 from './20251017_051035';
import * as migration_20251017_051701 from './20251017_051701';
import * as migration_20251017_062920 from './20251017_062920';

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
    name: '20251017_035538',
  },
  {
    up: migration_20251017_040216.up,
    down: migration_20251017_040216.down,
    name: '20251017_040216',
  },
  {
    up: migration_20251017_045940.up,
    down: migration_20251017_045940.down,
    name: '20251017_045940',
  },
  {
    up: migration_20251017_050513.up,
    down: migration_20251017_050513.down,
    name: '20251017_050513',
  },
  {
    up: migration_20251017_051035.up,
    down: migration_20251017_051035.down,
    name: '20251017_051035',
  },
  {
    up: migration_20251017_051701.up,
    down: migration_20251017_051701.down,
    name: '20251017_051701',
  },
  {
    up: migration_20251017_062920.up,
    down: migration_20251017_062920.down,
    name: '20251017_062920'
  },
];
