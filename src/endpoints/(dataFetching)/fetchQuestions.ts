import type { Endpoint, PayloadHandler, PayloadRequest } from 'payload'

const fetchQuestions: Endpoint = {
  path: '/fetch/questions',
  method: 'get',
  handler: (async (req: PayloadRequest) => {
    try {
      const q = (req.query || {}) as Record<string, string | string[]>

      const getStr = (key: string): string | undefined =>
        typeof q[key] === 'string' ? (q[key] as string) : undefined

      const getStrArr = (key: string): string[] | undefined => {
        const v = q[key]
        if (!v) return undefined
        if (Array.isArray(v)) return v
        if (typeof v === 'string') return v.split(',').map(s => s.trim()).filter(Boolean)
        return undefined
      }

      const id = getStr('id')
      const limitParam = getStr('limit')
      const pageParam = getStr('page')
      const depthParam = getStr('depth')
      const sort = getStr('sort')

      const limit = Number.isFinite(Number(limitParam)) ? Number(limitParam) : 25
      const page = Number.isFinite(Number(pageParam)) ? Number(pageParam) : 1
      const depth = Number.isFinite(Number(depthParam)) ? Number(depthParam) : undefined

      if (id) {
        const doc = await req.payload.findByID({ collection: 'questions', id, depth })
        return Response.json({ status: 'success', doc })
      }

      const equalsKeys = [
        'question_id',
        'exam_instance_id',
        'stage_id',
        'label_id',
        'section_id',
        'language_code',
        'question_number',
        'chapter_id',
        'topic_id',
        'subtopic_id',
        'ai_difficulty_level',
        'ai_question_type',
        'ai_cognitive_skill',
        'ai_is_pedagogy',
        'ai_is_not',
      ] as const

      const where: { and?: Array<Record<string, unknown>> } = { and: [] }

      for (const key of equalsKeys) {
        const arr = getStrArr(key)
        const val = getStr(key)
        if (arr && arr.length) where.and!.push({ [key]: { in: arr } })
        else if (val) where.and!.push({ [key]: { equals: val } })
      }

      if (Array.isArray(where.and) && where.and.length === 0) delete where.and

      const result = await req.payload.find({
        collection: 'questions',
        where: (Object.keys(where).length ? (where as unknown) : undefined) as any,
        limit,
        page,
        depth,
        sort,
      })

      return Response.json({ status: 'success', ...result })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      return Response.json({ status: 'error', message })
    }
  }) as PayloadHandler,
}

export default fetchQuestions
