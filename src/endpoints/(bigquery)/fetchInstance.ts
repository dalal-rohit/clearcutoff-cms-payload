import type { Endpoint, PayloadHandler } from 'payload'

const fetchInstance: Endpoint = {
  path: '/fetch/instance',
  method: 'get',
  handler: (async (req: any, res: any, next: any, context: { payload: any }) => {
    try {
      const limitParam = typeof (req.query as any)?.limit === 'string' ? (req.query as any).limit : undefined
      const limit = Number.isFinite(Number(limitParam)) ? Number(limitParam) : 100
      const examId = (req.query?.exam_id ?? '').toString().trim()

      const qs: string[] = [`table=e_instance`, `limit=${limit}`]
      if (examId) qs.push(`exam_id=${encodeURIComponent(examId)}`)
      const url = `${process.env.LARAVEL_API_URL}/api/v1/payload/fetch?${qs.join('&')}`

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
            exam_instance_id: pick('exam_instance_id', 'examInstanceId', 'id'),
            exam_id: pick('exam_id', 'examId'),
            exam_year: pick('exam_year', 'examYear'),
            exam_cycle: pick('exam_cycle', 'examCycle'),
            mode: pick('mode'),
            exam_pattern: pick('exam_pattern', 'examPattern'),
            duration_minutes: pick('duration_minutes', 'durationMinutes'),
            total_marks: pick('total_marks', 'totalMarks'),
            total_questions: pick('total_questions', 'totalQuestions'),
            pass_criteria: pick('pass_criteria', 'passCriteria'),
            pass_marks: pick('pass_marks', 'passMarks'),
            negative_marking: pick('negative_marking', 'negativeMarking'),
            marking_scheme: pick('marking_scheme', 'markingScheme'),
          }

          const found = await req.payload.find({
            collection: 'e-instance',
            where: { exam_instance_id: { equals: record?.exam_instance_id } },
            limit: 1,
          })

          if (found?.docs?.[0]?.id) {
            await req.payload.update({ collection: 'e-instance', id: found.docs[0].id, data: record })
            updated++
          } else {
            await req.payload.create({ collection: 'e-instance', data: record })
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

export default fetchInstance
