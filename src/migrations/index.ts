import * as migration_20260708_055139_add_attachments_field from './20260708_055139_add_attachments_field';
import * as migration_20260708_122800 from './20260708_122800';
import * as migration_20260709_101237 from './20260709_101237';
import * as migration_20260710_115516 from './20260710_115516';
import * as migration_20260710_120201 from './20260710_120201';

export const migrations = [
  {
    up: migration_20260708_055139_add_attachments_field.up,
    down: migration_20260708_055139_add_attachments_field.down,
    name: '20260708_055139_add_attachments_field',
  },
  {
    up: migration_20260708_122800.up,
    down: migration_20260708_122800.down,
    name: '20260708_122800',
  },
  {
    up: migration_20260709_101237.up,
    down: migration_20260709_101237.down,
    name: '20260709_101237',
  },
  {
    up: migration_20260710_115516.up,
    down: migration_20260710_115516.down,
    name: '20260710_115516',
  },
  {
    up: migration_20260710_120201.up,
    down: migration_20260710_120201.down,
    name: '20260710_120201'
  },
];
