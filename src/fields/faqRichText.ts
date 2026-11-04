import type { Field } from 'payload'
import {
  BoldFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  TextStateFeature,
  UnorderedListFeature,
  lexicalEditor,
  lexicalHTMLField,
} from '@payloadcms/richtext-lexical'
import type { HTMLConvertersFunctionAsync } from '@payloadcms/richtext-lexical/html-async'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

/**
 * Rich text for the FAQ page (phase 76 in clearcut-master/docs/phases).
 *
 * Editors get exactly three formats: bold, blue text and links (plus lists in
 * answers). The editor stores a stable key ("blue"), not a colour, so the
 * actual shade lives in two places that must agree:
 *   - here, for the admin preview (matches --color-brand-accessible, #0069cc)
 *   - apps/landing `.faq-blue`, which uses the design token
 */
export const faqTextState = {
  color: {
    blue: { label: 'Blue', css: { color: '#0069cc' } },
  },
} as const

type Variant = 'question' | 'answer'

function faqEditor(variant: Variant) {
  return lexicalEditor({
    features: [
      ParagraphFeature(),
      BoldFeature(),
      // External URLs only: the FAQ has no CMS documents to link to.
      LinkFeature({ enabledCollections: [] }),
      TextStateFeature({ state: faqTextState }),
      ...(variant === 'answer' ? [UnorderedListFeature(), OrderedListFeature()] : []),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  })
}

/** `<span class="faq-blue">` around text carrying the `color: blue` state. */
const converters =
  (variant: Variant): HTMLConvertersFunctionAsync =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    text: async (args) => {
      const base = await (defaultConverters.text as (a: typeof args) => string | Promise<string>)(
        args,
      )
      const state = (args.node as unknown as { $?: Record<string, string> }).$
      return state?.color === 'blue' ? `<span class="faq-blue">${base}</span>` : base
    },
    // A question is one line: no <p> wrapper, so it sits inside the accordion title.
    ...(variant === 'question'
      ? {
          paragraph: async ({ node, nodesToHTML }) =>
            `${(await nodesToHTML({ nodes: node.children })).join('')} `,
        }
      : {}),
  })

/** True when a Lexical value holds any visible text. */
export function hasRichText(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false
  try {
    return convertLexicalToPlaintext({ data: value as never }).trim().length > 0
  } catch {
    return false
  }
}

/**
 * Fields for one FAQ string (`question` or `answer`):
 *   <name>Rich       rich text (new content goes here)
 *   <name>Html       virtual, HTML for the frontend (empty when only legacy text exists)
 * The legacy plain field (`question` / `answer`) is defined by the caller and is never
 * touched, so existing content keeps working until an editor re-enters it.
 */
export function faqRichFields(name: Variant): Field[] {
  const rich = `${name}Rich`
  return [
    {
      name: rich,
      type: 'richText',
      localized: true,
      editor: faqEditor(name),
      admin: {
        description:
          name === 'question'
            ? 'Use Bold, Blue or Link from the toolbar. Keep it to one line.'
            : 'Use Bold, Blue, Link or a list from the toolbar. Press Enter for a new paragraph.',
      },
      // English is the source language and must have content. Other locales may stay
      // empty: the API falls back to English, so a Hindi save is never blocked by a row
      // that has no Hindi text yet.
      validate: (value, { siblingData, req }) => {
        if (req?.locale && req.locale !== 'en') return true
        const legacy = (siblingData as Record<string, unknown>)?.[name]
        if (hasRichText(value) || (typeof legacy === 'string' && legacy.trim())) return true
        return `Enter the ${name}.`
      },
    },
    lexicalHTMLField({
      htmlFieldName: `${name}Html`,
      lexicalFieldName: rich,
      storeInDB: false,
      converters: converters(name),
    }),
  ]
}

/**
 * Virtual `<name>Text`: ALWAYS plain text, from the rich text when present, else the legacy
 * plain field. Search, deep-link slugs and JSON-LD read this. It must be listed AFTER the
 * legacy field: Payload flattens localized values field by field, and this hook reads both.
 */
export function faqPlainTextField(name: Variant): Field {
  const rich = `${name}Rich`
  return {
    name: `${name}Text`,
    type: 'text',
    virtual: true,
    admin: { hidden: true, disableListColumn: true },
    hooks: {
      afterRead: [
        ({ siblingData }) => {
          const row = siblingData as Record<string, unknown>
          const richValue = row?.[rich]
          if (hasRichText(richValue)) {
            return convertLexicalToPlaintext({ data: richValue as never })
              .replace(/\s+/g, ' ')
              .trim()
          }
          return typeof row?.[name] === 'string' ? (row[name] as string) : ''
        },
      ],
    },
  }
}
