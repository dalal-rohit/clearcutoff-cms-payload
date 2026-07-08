import type { HTMLConverterAsync } from '@payloadcms/richtext-lexical/html-async'

// Renders a `resourceTable` block (see ResourceTable.ts) to static HTML at
// its exact position in `content_html`, so it appears inline in the article
// wherever the author placed it — not appended at the end. The blog's
// article typography (article-content.tsx) styles the `.resource-table-*`
// class names below to match the two-button "View Solved Paper" /
// "Download PDF" row layout.
//
// NOTE: class names use plain single hyphens (no BEM `__`/`--`). Tailwind's
// arbitrary-selector syntax treats `_` as an escaped space, so BEM-style
// double underscores/hyphens require backslash-escaping in the blog's
// className — which breaks the moment that string passes through a JS
// string literal (JS silently drops "unnecessary" backslash escapes at
// runtime, desyncing the rendered class from what Tailwind's static scanner
// compiled). Single hyphens sidestep that footgun entirely.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

interface ResourceTableRow {
  id?: string
  title?: string
  questionCount?: string
  marks?: string
  duration?: string
  viewLink?: string
  downloadFile?: string | number | { id?: string | number; url?: string } | null
}

interface ResourceTableFields {
  title?: string
  description?: string
  rows?: ResourceTableRow[]
}

export const resourceTableHTMLConverter: HTMLConverterAsync<any> = async ({ node, populate }) => {
  const { title, description, rows = [] } = (node.fields ?? {}) as ResourceTableFields

  const rowsHtml = await Promise.all(
    rows.map(async (row) => {
      let fileUrl: string | undefined

      if (row.downloadFile) {
        if (typeof row.downloadFile === 'object') {
          fileUrl = row.downloadFile.url
        } else if (populate) {
          const media = await populate({ collectionSlug: 'media', id: row.downloadFile })
          fileUrl = (media as { url?: string } | undefined)?.url
        }
      }

      const stats = [row.questionCount, row.marks, row.duration].filter(Boolean) as string[]
      const statsHtml = stats
        .map((stat) => `<span class="resource-table-stat">${escapeHtml(stat)}</span>`)
        .join('')

      const viewBtn = row.viewLink
        ? `<a href="${escapeHtml(row.viewLink)}" target="_blank" rel="noopener noreferrer" class="resource-table-btn resource-table-btn-solid">View Solved Paper</a>`
        : ''
      const downloadBtn = fileUrl
        ? `<a href="${escapeHtml(fileUrl)}" download class="resource-table-btn resource-table-btn-outline">Download PDF</a>`
        : ''

      if (!viewBtn && !downloadBtn) return ''

      return `<div class="resource-table-row">
  <div class="resource-table-row-main">
    <p class="resource-table-row-title">${escapeHtml(row.title ?? '')}</p>
    ${statsHtml ? `<div class="resource-table-stats">${statsHtml}</div>` : ''}
  </div>
  <div class="resource-table-actions">${viewBtn}${downloadBtn}</div>
</div>`
    }),
  )

  const bodyHtml = rowsHtml.filter(Boolean).join('')
  if (!bodyHtml) return ''

  // The title uses a <div> (not <h2>/<h3>) — the blog's article renderer
  // injects TOC-anchor ids into every real heading tag, which would wrongly
  // add this decorative label to the Contents sidebar and strip its class.
  return `<div class="resource-table">
${title ? `  <div class="resource-table-title">${escapeHtml(title)}</div>` : ''}
${description ? `  <p class="resource-table-desc">${escapeHtml(description)}</p>` : ''}
  <div class="resource-table-head"><span></span><span>Link</span></div>
  <div class="resource-table-body">${bodyHtml}</div>
</div>`
}
