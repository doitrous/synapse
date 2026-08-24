import type { ImportFieldDefinition } from './bulkImport.ts'
import { MED_CATEGORIES, type MedicalTerm, type MedTermCategory } from './glossary.ts'

type GlossaryImportRow = Record<string, string | undefined>

/**
 * External glossary import contract.
 *
 * `definition_ar` is the authored heading. The generic wizard maps it onto the
 * camel-cased `defAr` destination used by the stored `MedicalTerm` model.
 */
export const GLOSSARY_IMPORT_FIELDS: ImportFieldDefinition[] = [
  { key: 'term', label: 'Term (English)', required: true, help: 'The reviewed English term students search for.' },
  { key: 'ar', label: 'Term (Arabic)', required: true, help: 'The reviewed Arabic term students read.' },
  { key: 'category', label: 'Category', required: true, help: MED_CATEGORIES.map((entry) => entry.key).join(' · ') },
  { key: 'def', label: 'Definition (English)', required: true, help: 'A concise plain-English definition.' },
  { key: 'definition_ar', label: 'Definition (Arabic)', help: 'The reviewed Arabic definition; stored as defAr.' },
  { key: 'example', label: 'Example', help: 'A short example showing how the term is used.' },
  { key: 'id', label: 'ID', help: 'Optional. A matching ID updates that term in place.' },
]

export const GLOSSARY_WIZARD_FIELDS: ImportFieldDefinition[] = GLOSSARY_IMPORT_FIELDS.map((field) => (
  field.key === 'definition_ar' ? { ...field, key: 'defAr' } : field
))

export const GLOSSARY_IMPORT_ALIASES: Record<string, string> = {
  english: 'term',
  arabic: 'ar',
  word: 'term',
  definition: 'def',
  definition_ar: 'defAr',
  defar: 'defAr',
  meaning: 'def',
  group: 'category',
}

const CATEGORY_KEYS = new Set<string>(MED_CATEGORIES.map((entry) => entry.key))

const slug = (value: string, index: number) =>
  value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40)
  || `term-${index + 1}`

export function validateGlossaryImportRow(row: GlossaryImportRow): string[] {
  const errors: string[] = []
  if (!row.term?.trim()) errors.push('Term is required')
  if (!row.def?.trim()) errors.push('An English definition is required')
  const category = row.category?.trim()
  if (!category) errors.push('Category is required')
  else if (!CATEGORY_KEYS.has(category)) errors.push(`“${category}” is not one of the glossary categories`)
  return errors
}

export function glossaryTermFromRow(row: GlossaryImportRow, index = 0): MedicalTerm {
  const term = row.term?.trim() ?? ''
  const example = row.example?.trim()
  return {
    id: row.id?.trim() || slug(term, index),
    term,
    ar: row.ar?.trim() ?? '',
    category: row.category?.trim() as MedTermCategory,
    def: row.def?.trim() ?? '',
    defAr: row.defAr?.trim() ?? row.definition_ar?.trim() ?? row.defar?.trim() ?? '',
    ...(example ? { example } : {}),
  }
}

export function applyGlossaryRows(existing: MedicalTerm[], rows: GlossaryImportRow[]) {
  const byId = new Map(existing.map((term) => [term.id, { ...term }]))
  const existingOrder = existing.map((term) => term.id)
  const newOrder: string[] = []
  let created = 0
  let updated = 0
  let rejected = 0
  const errors: string[] = []

  rows.forEach((row, index) => {
    const rowErrors = validateGlossaryImportRow(row)
    if (rowErrors.length) {
      rejected += 1
      errors.push(`Row ${index + 1}: ${rowErrors.join('; ')}`)
      return
    }
    const next = glossaryTermFromRow(row, index)
    if (byId.has(next.id)) {
      byId.set(next.id, { ...byId.get(next.id)!, ...next })
      updated += 1
    } else {
      byId.set(next.id, next)
      newOrder.push(next.id)
      created += 1
    }
  })

  return {
    records: [...newOrder, ...existingOrder].map((id) => byId.get(id)!).filter(Boolean),
    created,
    updated,
    rejected,
    errors,
  }
}
