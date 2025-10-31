import type { Endpoint, PayloadHandler } from 'payload'

const fetchExams: Endpoint = {
  path: '/fetch/exams',
  method: 'get',
  handler: (async (req: any) => {
    try {
      const limitParam =
        typeof (req.query as any)?.limit === 'string' ? (req.query as any).limit : undefined
      const limit = Number.isFinite(Number(limitParam)) ? Number(limitParam) : 100

      const url = `${process.env.LARAVEL_API_URL}/api/v1/payload/fetch?table=exam&limit=${limit}`
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
          const record = {
            exam_id: item?.exam_id ?? item?.examId ?? '',
            name: item?.name ?? item?.title ?? '',
            short_name: item?.short_name ?? item?.shortName ?? '',
            state: item?.state ?? '',
            conducting_body: item?.conducting_body ?? '',
            logo_url: item?.logo_url ?? '',
            exam_type: item?.exam_type ?? '',
            exam_frequency: item?.exam_frequency ?? '',
            evaluation_type: item?.evaluation_type ?? '',
            upcoming_exam: item?.upcoming_exam ?? '',
            status: item?.status || 'active',
            rating: String(item?.rating ?? ''),
            price: String(item?.price ?? ''),
            combo_price: item?.combo_price == null ? undefined : String(item?.combo_price ?? ''),
            marking_schema: item?.marking_schema ?? '',
          }

          // First try to find by stable identifier
          const found = await req.payload.find({
            collection: 'exams',
            where: { exam_id: { equals: record.exam_id } },
            limit: 1,
          })

         

          if (found?.docs?.[0]?.id) {
            await req.payload.update({ collection: 'exams', id: found.docs[0].id, data: record })
            updated++
          } else {
            await req.payload.create({ collection: 'exams', data: record })
            inserted++
          }
        } catch (e: any) {
          failures.push({ reason: e || 'Unknown error', item })
        }
      }

      return Response.json({ status: 'success', total: rows.length, inserted, updated, failures })
    } catch (err: any) {
      return Response.json({ status: 'error', message: err?.message || 'Unknown error' })
    }
  }) as PayloadHandler,
}

export default fetchExams
