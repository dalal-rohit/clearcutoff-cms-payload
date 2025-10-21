import type { Endpoint, PayloadHandler } from 'payload'

const fetchQuestions: Endpoint = {
  path: '/fetch/questions',
  method: 'get',
  handler: (async (req: any, res: any, next: any, context: { payload: any }) => {
    try {
      const limitParam =
        typeof (req.query as any)?.limit === 'string' ? (req.query as any).limit : undefined
      const limit = Number.isFinite(Number(limitParam)) ? Number(limitParam) : 100

      const url = `http://clearcutoff-main-backend.test/api/v1/payload/fetch?table=question&limit=${limit}`
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
        try {
          record = {
            question_id: item?.question_id ?? item?.questionId ?? item?.id ?? '',
            exam_instance_id: item?.exam_instance_id ?? item?.examInstanceId ?? '',
            stage_id: item?.stage_id ?? item?.stageId ?? '',
            label_id: item?.label_id ?? item?.labelId ?? '',
            section_id: item?.section_id ?? item?.sectionId ?? '',
            question_number: item?.question_number ?? item?.questionNumber ?? '',
            question_text: item?.question_text ?? item?.questionText ?? '',
            question_image_url: item?.question_image_url ?? item?.questionImageUrl ?? '',
            option_1_text: item?.option_1_text ?? item?.option1Text ?? '',
            option_1_image_url: item?.option_1_image_url ?? item?.option1ImageUrl ?? '',
            option_2_text: item?.option_2_text ?? item?.option2Text ?? '',
            option_2_image_url: item?.option_2_image_url ?? item?.option2ImageUrl ?? '',
            option_3_text: item?.option_3_text ?? item?.option3Text ?? '',
            option_3_image_url: item?.option_3_image_url ?? item?.option3ImageUrl ?? '',
            option_4_text: item?.option_4_text ?? item?.option4Text ?? '',
            option_4_image_url: item?.option_4_image_url ?? item?.option4ImageUrl ?? '',
            correct_option:
              item?.correct_option == null && item?.correctOption == null
                ? undefined
                : Number(item?.correct_option ?? item?.correctOption) || 0,
            explanation: item?.explanation ?? '',
          }

          const found = await req.payload.find({
            collection: 'questions',
            where: { question_id: { equals: record?.question_id } },
            limit: 1,
          })

          if (found?.docs?.[0]?.id) {
            await req.payload.update({
              collection: 'questions',
              id: found.docs[0].id,
              data: record,
            })
            updated++
          } else {
            await req.payload.create({ collection: 'questions', data: record })
            inserted++
          }
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

export default fetchQuestions

