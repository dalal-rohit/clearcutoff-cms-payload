import type { Endpoint, PayloadHandler } from 'payload'

const fetchMappingInstanceStage: Endpoint = {
  path: '/fetch/mapping-instance-stage',
  method: 'get',
  handler: (async (req: any) => {
    try {
      const limitParam =
        typeof (req.query as any)?.limit === 'string' ? (req.query as any).limit : undefined
      const limit = Number.isFinite(Number(limitParam)) ? Number(limitParam) : 100

      const url = `${process.env.LARAVEL_API_URL}/api/v1/payload/fetch?table=mapping_instance_stage&limit=${limit}`
      const response = await fetch(url)

      if (!response.ok) {
        return Response.json({ status: 'error', message: `Upstream fetch failed with ${response.status}` })
      }

      const json = await response.json()
      const rows: any[] = Array.isArray(json)
        ? json
        : Array.isArray((json as any)?.data)
          ? (json as any).data
          : []

      let inserted = 0
      let updated = 0
      const failures: { reason: string; item?: unknown }[] = []

      for (const item of rows) {
        try {
          const pick = (...keys: string[]) => {
            for (const k of keys) {
              if (Object.prototype.hasOwnProperty.call(item, k)) return (item as any)[k]
            }
            return undefined
          }

          const record = {
            stage_id: pick('stage_id', 'stageId'),
            instance_id: pick('instance_id', 'instanceId'),
            gs_created_at: pick('gs_created_at'),
            gs_updated_at: pick('gs_updated_at'),
          }

          const where = record?.stage_id && record?.instance_id
            ? { and: [{ stage_id: { equals: record.stage_id } }, { instance_id: { equals: record.instance_id } }] }
            : undefined

          const found = where
            ? await req.payload.find({ collection: 'mapping-instance-and-stage', where, limit: 1 })
            : undefined

          if (found?.docs?.[0]?.id) {
            await req.payload.update({ collection: 'mapping-instance-and-stage', id: found.docs[0].id, data: record })
            updated++
          } else {
            await req.payload.create({ collection: 'mapping-instance-and-stage', data: record })
            inserted++
          }
        } catch (e: any) {
          failures.push({ reason: e?.message || 'Unknown error', item })
        }
      }

      return Response.json({ status: 'success', total: rows.length, inserted, updated, failures })
    } catch (err: any) {
      return Response.json({ status: 'error', message: err?.message || 'Unknown error' })
    }
  }) as PayloadHandler,
}

export default fetchMappingInstanceStage
