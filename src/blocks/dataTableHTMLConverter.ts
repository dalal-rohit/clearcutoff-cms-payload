import type { HTMLConverterAsync } from '@payloadcms/richtext-lexical/html-async'

// Renders a `dataTable` block (see DataTable.ts) to a real <table> at its
// exact position in `content_html`, so a fully author-defined table (any
// number of columns/rows) appears inline wherever it was placed.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

interface DataTableColumn {
  header?: string
}

interface DataTableRow {
  cells?: { value?: string }[]
}

interface DataTableFields {
  title?: string
  description?: string
  columns?: DataTableColumn[]
  rows?: DataTableRow[]
}

export const dataTableHTMLConverter: HTMLConverterAsync<any> = async ({ node }) => {
  const { title, description, columns = [], rows = [] } = (node.fields ?? {}) as DataTableFields

  if (columns.length === 0 || rows.length === 0) return ''

  const theadHtml = `<thead><tr>${columns
    .map((col) => `<th>${escapeHtml(col.header ?? '')}</th>`)
    .join('')}</tr></thead>`

  const tbodyHtml = `<tbody>${rows
    .map((row) => {
      const cellsHtml = columns
        .map((_, i) => `<td>${escapeHtml(row.cells?.[i]?.value ?? '')}</td>`)
        .join('')
      return `<tr>${cellsHtml}</tr>`
    })
    .join('')}</tbody>`

  return `<div class="data-table">
${title ? `  <div class="data-table-title">${escapeHtml(title)}</div>` : ''}
${description ? `  <p class="data-table-desc">${escapeHtml(description)}</p>` : ''}
  <table class="data-table-grid">${theadHtml}${tbodyHtml}</table>
</div>`
}
