import type { Endpoint, PayloadHandler } from 'payload'

const fetchSections: Endpoint = {
  path: '/fetch/sections',
  method: 'get',
  handler: (async (req: any, res: any, next: any, context: { payload: any }) => {
    try {
      const limitParam =
        typeof (req.query as any)?.limit === 'string' ? (req.query as any).limit : undefined
      const limit = Number.isFinite(Number(limitParam)) ? Number(limitParam) : 100

      const url = `${process.env.LARAVEL_API_URL}/api/v1/payload/fetch?table=e_section&limit=${limit}`
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
            section_id: item?.section_id ?? item?.sectionId ?? item?.id ?? '',
            name: item?.name ?? item?.title ?? '',
            type: item?.type ?? '',
            area: item?.area ?? '',
            description: item?.description ?? '',
            total_questions: item?.total_questions ?? item?.totalQuestions ?? '',
            total_marks: item?.total_marks ?? item?.totalMarks ?? '',
            question_weightage: item?.question_weightage ?? item?.questionWeightage ?? '',
            evaluation_type: item?.evaluation_type ?? item?.evaluationType ?? '',
            ai_evaluation_supported:
              item?.ai_evaluation_supported ?? item?.aiEvaluationSupported ?? '',
          }

          const found = await req.payload.find({
            collection: 'e-sections',
            where: { section_id: { equals: record?.section_id } },
            limit: 1,
          })

          if (found?.docs?.[0]?.id) {
            await req.payload.update({ collection: 'e-sections', id: found.docs[0].id, data: record })
            updated++
          } else {
            await req.payload.create({ collection: 'e-sections', data: record })
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

export default fetchSections