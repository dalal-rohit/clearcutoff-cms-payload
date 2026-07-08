import * as migration_20260708_055139_add_attachments_field from './20260708_055139_add_attachments_field';
import * as migration_20260708_122800 from './20260708_122800';

export const migrations = [
  {
    up: migration_20260708_055139_add_attachments_field.up,
    down: migration_20260708_055139_add_attachments_field.down,
    name: '20260708_055139_add_attachments_field',
  },
  {
    up: migration_20260708_122800.up,
    down: migration_20260708_122800.down,
    name: '20260708_122800'
  },
];
