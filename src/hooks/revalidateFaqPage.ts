import type { GlobalAfterChangeHook } from 'payload'

/**
 * Asks the landing app to refresh /faq and /hi/faq right after an editor saves,
 * instead of waiting for the page's 1-hour revalidate window. A no-op until
 * LANDING_REVALIDATE_URL and REVALIDATE_SECRET are set, and a failure never
 * blocks the save.
 */
export const revalidateFaqPage: GlobalAfterChangeHook = async ({ doc, req }) => {
  const base = process.env.LANDING_REVALIDATE_URL
  const secret = process.env.REVALIDATE_SECRET
  if (!base || !secret) return doc

  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/revalidate`, {
      method: 'POST',
      headers: { 'x-revalidate-secret': secret },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) req.payload.logger.warn(`FAQ revalidate responded ${res.status}`)
  } catch (error) {
    req.payload.logger.warn(
      `FAQ revalidate failed: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
  return doc
}
