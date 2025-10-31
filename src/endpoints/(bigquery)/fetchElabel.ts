import type { Endpoint, PayloadHandler } from 'payload'

const fetchELabel: Endpoint = {
  path: '/fetch/labels',
  method: 'get',
  handler: (async (req: any) => {
    try {
      const limitParam =
        typeof (req.query as any)?.limit === 'string' ? (req.query as any).limit : undefined
      const limit = Number.isFinite(Number(limitParam)) ? Number(limitParam) : 100

      const url = `${process.env.LARAVEL_API_URL}/api/v1/payload/fetch?table=e_label&limit=${limit}`
      const response = await fetch(url)

      if (!response.ok) {
        return Response.json({
          status: 'error',
          message: `Upstream fetch failed with ${response.status}`,
        })
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
            label_id: pick('label_id', 'labelId', 'id'),
            exam_instance_id: pick('exam_instance_id', 'examInstanceId'),
            set_label: pick('set_label', 'setLabel'),
            shift_label: pick('shift_label', 'shiftLabel'),
            date_label: pick('date_label', 'dateLabel'),
            exam_date: pick('exam_date', 'examDate'),
            description: pick('description'),
            gs_created_at: pick('gs_created_at'),
            gs_updated_at: pick('gs_updated_at'),
          }

          const where = record?.label_id ? { label_id: { equals: record.label_id } } : undefined
          const found = where
            ? await req.payload.find({ collection: 'e-label', where, limit: 1 })
            : undefined

          if (found?.docs?.[0]?.id) {
            await req.payload.update({ collection: 'e-label', id: found.docs[0].id, data: record })
            updated++
          } else {
            await req.payload.create({ collection: 'e-label', data: record })
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

export default fetchELabel