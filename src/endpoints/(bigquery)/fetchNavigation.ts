import type { Endpoint, PayloadHandler } from 'payload'

const fetchNavigation: Endpoint = {
  path: '/fetch/navigation',
  method: 'get',
  handler: (async (req: any, res: any, next: any, context: { payload: any }) => {
    try {
      const limitParam =
        typeof (req.query as any)?.limit === 'string' ? (req.query as any).limit : undefined
      const limit = Number.isFinite(Number(limitParam)) ? Number(limitParam) : 100

      const url = `${process.env.LARAVEL_API_URL}/api/v1/payload/fetch?table=e_navigation&limit=${limit}`
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
        let record: any
        try {
          record = {
            ent_id: item?.id ?? item?.id ?? '',
            exam_id: item?.exam_id ?? item?.examId ?? '',
            parent_id: item?.parent_id ?? item?.parentId ?? '',
            name: item?.name ?? item?.title ?? '',
            group: item?.group ?? item?.nav_group ?? '',
            status: item?.status ?? '',
            flag_course: item?.flag_course ?? item?.flagCourse ?? '',
            flag_tests: item?.flag_tests ?? item?.flagTests ?? '',
          }

          const found = await req.payload.find({
            collection: 'e-navigation',
            where: {
              and: [
                { ent_id: { equals: record.ent_id } },
                { exam_id: { equals: record.exam_id } },
               
              ],
            },
            limit: 1,
          })

          if (found?.docs?.[0]?.id) {
            await req.payload.update({ collection: 'e-navigation', id: found.docs[0].id, data: record })
            updated++
          } else {
            await req.payload.create({ collection: 'e-navigation', data: record })
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

export default fetchNavigation
