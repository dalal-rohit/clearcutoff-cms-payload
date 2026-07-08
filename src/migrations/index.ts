import * as migration_20260708_055139_add_attachments_field from './20260708_055139_add_attachments_field';

export const migrations = [
  {
    up: migration_20260708_055139_add_attachments_field.up,
    down: migration_20260708_055139_add_attachments_field.down,
    name: '20260708_055139_add_attachments_field'
  },
];
