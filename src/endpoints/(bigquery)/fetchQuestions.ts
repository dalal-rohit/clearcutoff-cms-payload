import type { Endpoint, PayloadHandler } from 'payload'

const fetchQuestions: Endpoint = {
  path: '/fetch/questions',
  method: 'get',
  handler: (async (req: any, res: any, next: any, context: { payload: any }) => {
    try {
     const limitParam =
        typeof (req.query as any)?.limit === 'string' ? (req.query as any).limit : undefined
      const limit = Number.isFinite(Number(limitParam)) ? Number(limitParam) : 100
      const exam_id = (req.query.exam_id || 'ctet').toString()

      const url = `${process.env.LARAVEL_API_URL}/api/v1/payload/questions?exam_instance_id=${exam_id}&limit=${limit}`
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
          const pick = (...keys: string[]) => {
            for (const k of keys) {
              if (Object.prototype.hasOwnProperty.call(item, k)) return (item as any)[k]
            }
            return undefined
          }

          record = {
            question_id: pick('question_id', 'questionId', 'id'),
            exam_instance_id: pick('exam_instance_id', 'examInstanceId'),
            stage_id: pick('stage_id', 'stageId'),
            label_id: pick('label_id', 'labelId'),
            section_id: pick('section_id', 'sectionId'),
            question_number: pick('question_number', 'questionNumber'),
            language_code: pick('language_code', 'languageCode', 'lang').toLowerCase(),
            question_text: pick('question_text', 'questionText'),
            question_image_url: pick('question_image_url', 'questionImageUrl'),
            option_1_text: pick('option_1_text', 'option1Text'),
            option_1_image_url: pick('option_1_image_url', 'option1ImageUrl'),
            option_2_text: pick('option_2_text', 'option2Text'),
            option_2_image_url: pick('option_2_image_url', 'option2ImageUrl'),
            option_3_text: pick('option_3_text', 'option3Text'),
            option_3_image_url: pick('option_3_image_url', 'option3ImageUrl'),
            option_4_text: pick('option_4_text', 'option4Text'),
            option_4_image_url: pick('option_4_image_url', 'option4ImageUrl'),
            correct_option: pick('correct_option', 'correctOption'),
            official_answer_key: pick('official_answer_key', 'officialAnswerKey'),
            explanation: pick('explanation'),
            chapter_id: pick('chapter_id', 'chapterId'),
            topic_id: pick('topic_id', 'topicId'),
            subtopic_id: pick('subtopic_id', 'subtopicId'),
            ai_time_to_solve: pick('ai_time_to_solve'),
            ai_difficulty_level: pick('ai_difficulty_level'),
            ai_question_type: pick('ai_question_type'),
            ai_chapter_name: pick('ai_chapter_name'),
            ai_topic_name: pick('ai_topic_name'),
            ai_subtopic_name: pick('ai_subtopic_name'),
            ai_cognitive_skill: pick('ai_cognitive_skill'),
            ai_is_pedagogy: pick('ai_is_pedagogy'),
            ai_is_not: pick('ai_is_not'),
            ai_question_tags: pick('ai_question_tags'),
            gs_created_at: pick('gs_created_at'),
            gs_updated_at: pick('gs_updated_at'),
          }

          const where = record?.question_id
            ? { question_id: { equals: record.question_id } }
            : record?.stage_id && record?.section_id && record?.question_number
              ? {
                  and: [
                    { stage_id: { equals: record.stage_id } },
                    { section_id: { equals: record.section_id } },
                    { question_number: { equals: String(record.question_number) } },
                    ...(record?.language_code
                      ? [{ language_code: { equals: record.language_code } }]
                      : []),
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

