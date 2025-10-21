import type { Endpoint, PayloadHandler } from 'payload'

const fetchExams: Endpoint = {
  path: '/fetch/exams',
  method: 'get',

  handler: (async (req: any, res: any, next: any, context: { payload: any }) => {
    try {
      const limitParam =
        typeof (req.query as any)?.limit === 'string' ? (req.query as any).limit : undefined
      const limit = Number.isFinite(Number(limitParam)) ? Number(limitParam) : 100

      const url = `http://clearcutoff-main-backend.test/api/v1/payload/fetch?table=exam&limit=${limit}`
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
        let record: any
        console.log(item)
        try {
         
          record = {
            exam_id: item?.exam_id ?? item?.examId ?? item?.id ?? '',
            name: item?.name ?? item?.title ?? '',
            short_name: item?.short_name ?? item?.shortName ?? '',
            state: item?.state ?? '',
            conducting_body: item?.conducting_body ?? '',
            logo_url: item?.logo_url ?? '',
            exam_type: item?.exam_type ?? '',
            exam_frequency: item?.exam_frequency ?? '',
            evaluation_type: item?.evaluation_type ?? '',
            upcoming_exam: item?.upcoming_exam ?? '',
            status: ['active', 'inactive', 'archived'].includes(item?.status)
              ? item.status
              : 'active',
            rating: String(item?.rating ?? ''), // ✅ text field
            price: Number(item?.price) || 0, // ✅ number
            combo_price: item?.combo_price == null ? undefined : Number(item.combo_price) || 0,
            marking_schema: item?.marking_schema ?? '',
          }

           const found = await req.payload.find({
            collection: 'courses',
            where: { exam_id: { equals: record?.exam_id } },
            limit: 1,
          })

          if (found?.docs?.[0]?.id) {
            await req.payload.update({
              collection: 'courses',
              id: found?.docs?.[0]?.id,
              data: {
                exam_id: record?.exam_id  ,
                name: record?.name,
                short_name: record?.short_name,
                state: record?.state,
                conducting_body: record?.conducting_body,
                logo_url: record?.logo_url,
                exam_type: record?.exam_type,
                exam_frequency: record?.exam_frequency,
                evaluation_type: record?.evaluation_type,
                upcoming_exam: record?.upcoming_exam,
                status: record?.status,
                rating: record?.rating,
                price: record?.price,
                combo_price: record?.combo_price,
                marking_schema: record?.marking_schema,
              },
            })
          } else {
            await req.payload.create({
              collection: 'courses',
              data: {
                exam_id:  record?.exam_id ,
                name: record?.name,
                short_name: record?.short_name,
                state: record?.state,
                conducting_body: record?.conducting_body,
                logo_url: record?.logo_url,
                exam_type: record?.exam_type,
                exam_frequency: record?.exam_frequency,
                evaluation_type: record?.evaluation_type,
                upcoming_exam: record?.upcoming_exam,
                status: record?.status,
                rating: record?.rating,
                price: record?.price,
                combo_price: record?.combo_price,
                marking_schema: record?.marking_schema,
              },
            })
          }

          inserted++
          

       
        } catch (e: any) {
          failures.push({ reason: e?.message || 'Unknown error', item })
        }
      }

      return Response.json({
        status: 'success',
        total: rows.length,
        inserted,
        updated,
        failures,
      })
    } catch (err: any) {
      return Response.json({
        status: 'error',
        message: err?.message || 'Unknown error',
      })
    }
  }) as PayloadHandler,
}

export default fetchExams
