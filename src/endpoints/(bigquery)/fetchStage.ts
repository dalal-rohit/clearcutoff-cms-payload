import type { Endpoint, PayloadHandler } from 'payload'

const fetchStage: Endpoint = {
  path: '/fetch/stages',
  method: 'get',
  handler: (async (req: any, res: any, next: any, context: { payload: any }) => {
    try {
      const limitParam =
        typeof (req.query as any)?.limit === 'string' ? (req.query as any).limit : undefined
      const limit = Number.isFinite(Number(limitParam)) ? Number(limitParam) : 100

      const url = `http://clearcutoff-main-backend.test/api/v1/payload/fetch?table=stage&limit=${limit}`
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
            stage_id: item?.stage_id ?? item?.stageId ?? item?.id ?? '',
            exam_id: item?.exam_id ?? item?.examId ?? '',
            name: item?.name ?? item?.title ?? '',
            stage_type: item?.stage_type ?? item?.stageType ?? '',
            stage_order: item?.stage_order ?? item?.stageOrder ?? '',
            description: item?.description ?? '',
            duration_mins: item?.duration_mins ?? item?.durationMins ?? '',
            total_marks: item?.total_marks ?? item?.totalMarks ?? '',
            total_questions: item?.total_questions ?? item?.totalQuestions ?? '',
            ai_evaluation_supported:
              item?.ai_evaluation_supported ?? item?.aiEvaluationSupported ?? '',
            status: item?.status ?? '',
          }

          const found = await req.payload.find({
            collection: 'e-stage',
            where: { stage_id: { equals: record?.stage_id } },
            limit: 1,
          })

          if (found?.docs?.[0]?.id) {
            await req.payload.update({ collection: 'e-stage', id: found.docs[0].id, data: record })
            updated++
          } else {
            await req.payload.create({ collection: 'e-stage', data: record })
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

export default fetchStage
