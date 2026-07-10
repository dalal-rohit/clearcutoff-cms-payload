/**
 * One-off fix: the "alternatives" tables were created via dev-mode `push`
 * (not tracked in payload_migrations), but a migration file
 * (20260710_115516) was later generated that tries to CREATE them again from
 * scratch, colliding with what already exists ("type already exists").
 *
 * The DB schema already matches what this migration's up() would produce, so
 * this marks it as applied in payload_migrations WITHOUT re-running its SQL
 * — the standard safe fix for push/migrate drift. Safe to delete after use.
 *
 * Usage: npx tsx scripts/mark-migration-applied.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function run() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'payload-migrations' as never,
    where: { name: { equals: '20260710_115516' } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log('Already marked as applied — nothing to do.')
  } else {
    await payload.create({
      collection: 'payload-migrations' as never,
      data: { name: '20260710_115516', batch: 3 },
    })
    console.log('Marked 20260710_115516 as applied.')
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
