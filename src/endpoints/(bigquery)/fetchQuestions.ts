import type { Endpoint, PayloadHandler } from 'payload'

const fetchQuestions: Endpoint = {
  path: '/fetch/questions',
  method: 'get',
  handler: (async (req: any, res: any, next: any, context: { payload: any }) => {
    try {
      const limitParam =
        typeof (req.query as any)?.limit === 'string' ? (req.query as any).limit : undefined
      const limit = Number.isFinite(Number(limitParam)) ? Number(limitParam) : 100

      const url = `${process.env.LARAVEL_API_URL}/api/v1/payload/questions?exam_instance_id=ctet&limit=50`
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

      const mapLanguageToLocale = (lang: string): 'en' | 'hi' | undefined => {
        const norm = (lang || '').toLowerCase().trim()
        if (!norm) return undefined
        if (['en', 'eng', 'english'].includes(norm)) return 'en'
        if (['hi', 'hin', 'hindi', 'हिंदी'].includes(norm)) return 'hi'
        // Add more mappings as locales are added to payload.config.ts
        if (['sanskrit', 'संस्कृत', 'sa'].includes(norm)) return undefined // locale not configured yet
        return undefined
      }

      for (const item of rows) {
        let record: any
        try {
          const language = item?.language_code ?? item?.languageCode ?? item?.lang ?? ''
          const locale = mapLanguageToLocale(String(language))

          const qnumRaw = item?.question_number ?? item?.questionNumber
          const question_number = qnumRaw != null ? String(qnumRaw) : ''

          record = {
            question_id: item?.question_id ?? item?.questionId ?? item?.id ?? '',
            exam_instance_id: item?.exam_instance_id ?? item?.examInstanceId ?? '',
            stage_id: item?.stage_id ?? item?.stageId ?? '',
            label_id: item?.label_id ?? item?.labelId ?? '',
            section_id: item?.section_id ?? item?.sectionId ?? '',
            question_number,
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

          const where = record?.question_id
            ? { question_id: { equals: record.question_id } }
            : record?.stage_id && record?.section_id && record?.question_number
              ? {
                  and: [
                    { stage_id: { equals: record.stage_id } },
                    { section_id: { equals: record.section_id } },
                    { question_number: { equals: record.question_number } },
                  ],
                }
              : undefined

          const found = where
            ? await req.payload.find({ collection: 'questions', where, limit: 1 })
            : undefined

          if (found?.docs?.[0]?.id) {
            await req.payload.update({
              collection: 'questions',
              id: found.docs[0].id,
              data: record,
              ...(locale ? { locale } : {}),
            })
            updated++
          } else {
            await req.payload.create({ collection: 'questions', data: record, ...(locale ? { locale } : {}) })
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

