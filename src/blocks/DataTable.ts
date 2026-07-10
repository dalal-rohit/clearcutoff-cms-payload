import type { Block, ArrayField } from 'payload'

type DataTableRow = {
  cells?: { value?: string }[]
}

type DataTableColumn = {
  header?: string
}

// Cross-field validation: Payload can't natively enforce that every row has
// exactly one cell per column (they're separate array fields), so this
// checks it explicitly at save time. `siblingData` here is the rest of this
// block's fields (title, description, columns) — validate functions get
// sibling access within the same block/group level.
const validateRows: ArrayField['validate'] = (value, { siblingData }) => {
  const columns = (siblingData as { columns?: DataTableColumn[] } | undefined)?.columns
  const columnCount = columns?.length ?? 0
  const rows = (value ?? []) as DataTableRow[]

  if (!columnCount || rows.length === 0) return true

  for (let i = 0; i < rows.length; i++) {
    const cellCount = rows[i]?.cells?.length ?? 0
    if (cellCount !== columnCount) {
      return `Row ${i + 1} has ${cellCount} cell(s) but there are ${columnCount} column(s). Each row needs exactly one cell per column.`
    }
  }

  return true
}

/**
 * Inline Lexical block for the Posts `content` editor — a fully dynamic data
 * table (author controls the number of columns and rows), e.g. a comparison
 * table like "Piaget's stages of cognitive development". Rendered to HTML via
 * a custom converter (see dataTableHTMLConverter.ts) so it appears inline in
 * `content_html` at the exact position the author placed it — same pattern
 * as the `resourceTable` block.
 */
export const DataTableBlock: Block = {
  slug: 'dataTable',
  labels: { singular: 'Data Table', plural: 'Data Tables' },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: { description: 'e.g. "Jean Piaget: Cognitive Development". Leave blank to hide.' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Optional intro paragraph shown above the table.' },
    },
    {
      name: 'columns',
      type: 'array',
      labels: { singular: 'Column', plural: 'Columns' },
      admin: { description: 'Add as many columns as you need, in display order.' },
      fields: [
        {
          name: 'header',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "Stage", "Age Range", "Key Idea"' },
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      labels: { singular: 'Row', plural: 'Rows' },
      validate: validateRows,
      admin: {
        description: 'Each row needs exactly one cell per column above, in the same order.',
      },
      fields: [
        {
          name: 'cells',
          type: 'array',
          labels: { singular: 'Cell', plural: 'Cells' },
          fields: [
            {
              name: 'value',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
