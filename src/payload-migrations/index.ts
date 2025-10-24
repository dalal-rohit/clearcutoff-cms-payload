import * as migration_20251017_062920 from './20251017_062920';
import * as migration_20251017_063721 from './20251017_063721';
import * as migration_20251017_145756 from './20251017_145756';
import * as migration_20251017_150723 from './20251017_150723';
import * as migration_20251017_151523 from './20251017_151523';
import * as migration_20251017_153142 from './20251017_153142';
import * as migration_20251021_080126 from './20251021_080126';
import * as migration_20251024_052303 from './20251024_052303';
import * as migration_20251024_123456 from './20251024_123456';
import * as migration_20251024_125340 from './20251024_125340';
import * as migration_20251024_132119 from './20251024_132119';

export const migrations = [
  {
    up: migration_20251017_062920.up,
    down: migration_20251017_062920.down,
    name: '20251017_062920',
  },
  {
    up: migration_20251017_063721.up,
    down: migration_20251017_063721.down,
    name: '20251017_063721',
  },
  {
    up: migration_20251017_145756.up,
    down: migration_20251017_145756.down,
    name: '20251017_145756',
  },
  {
    up: migration_20251017_150723.up,
    down: migration_20251017_150723.down,
    name: '20251017_150723',
  },
  {
    up: migration_20251017_151523.up,
    down: migration_20251017_151523.down,
    name: '20251017_151523',
  },
  {
    up: migration_20251017_153142.up,
    down: migration_20251017_153142.down,
    name: '20251017_153142',
  },
  {
    up: migration_20251021_080126.up,
    down: migration_20251021_080126.down,
    name: '20251021_080126',
  },
  {
    up: migration_20251024_052303.up,
    down: migration_20251024_052303.down,
    name: '20251024_052303',
  },
  {
    up: migration_20251024_123456.up,
    down: migration_20251024_123456.down,
    name: '20251024_123456',
  },
  {
    up: migration_20251024_125340.up,
    down: migration_20251024_125340.down,
    name: '20251024_125340',
  },
  {
    up: migration_20251024_132119.up,
    down: migration_20251024_132119.down,
    name: '20251024_132119'
  },
];
