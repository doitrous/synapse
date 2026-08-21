import { ImportWizard, type ImportField } from '@/components/admin/ImportWizard'
import { useMedicalGlossary } from '@/data/glossaryStore'
import { MED_CATEGORIES, type MedTermCategory, type MedicalTerm } from '@/data/glossary'

const FIELDS: ImportField[] = [
  { key: 'term', label: 'Term (English)', required: true },
  { key: 'ar', label: 'Term (Arabic)', required: true, help: 'The reviewed Arabic term students read.' },
  { key: 'category', label: 'Category', required: true, help: MED_CATEGORIES.map((entry) => entry.key).join(' · ') },
  { key: 'def', label: 'Definition (English)', required: true },
  { key: 'defAr', label: 'Definition (Arabic)' },
  { key: 'example', label: 'Example' },
  { key: 'id', label: 'ID', help: 'Optional. A matching ID updates that term in place instead of adding a second one.' },
]

// The wizard's markdown reader parses `# Item` / `## key` blocks; it has no table
// branch, so the pipe table this example used to show was rejected on upload with
// "No header row and data rows were detected". Note `definition_ar` — `defAr`
// normalises to `defar`, matches no field, and silently arrives unmapped.
const MD = `# Item

## term
Tachycardia

## ar
تسرّع القلب

## category
Signs & symptoms

## def
A faster than normal heart rate.

## definition_ar
تسارع ضربات القلب عن المعدل الطبيعي.

## example
The patient was tachycardic at 120 beats per minute.

---

# Item

## term
Psych- · psychology · psychiatry · psychologist

## ar
نفسي · علم النفس · الطب النفسي · عالِم نفس

## category
Word parts

## def
Mind. Add -ology for its study, -iatry for the branch of medicine, -ologist for the specialist.

## definition_ar
النفس أو العقل. تُضاف ology- لعلمه، وiatry- لفرع الطب المختص به، وologist- للمختص.`

const CATEGORY_KEYS = new Set<string>(MED_CATEGORIES.map((entry) => entry.key))

const slug = (value: string) =>
  value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || `term-${Date.now().toString(36)}`

/**
 * Bulk import for the glossary.
 *
 * Every other catalogue could be filled from a spreadsheet; the glossary could only
 * be typed one term at a time, which is the wrong shape for a bilingual dictionary
 * that arrives as a translation file. Same wizard, same six steps, same file formats.
 */
export function GlossaryImportPage() {
  const [glossary, setGlossary] = useMedicalGlossary()

  function commit(rows: Array<Record<string, string>>) {
    const errors: string[] = []
    const byId = new Map(glossary.terms.map((term) => [term.id, term]))
    const additions: MedicalTerm[] = []
    const updated = new Set<string>()

    rows.forEach((row, index) => {
      const term = row.term?.trim()
      const category = row.category?.trim()
      if (!term) { errors.push(`Row ${index + 1}: term is required`); return }
      if (!CATEGORY_KEYS.has(category)) { errors.push(`Row ${index + 1}: “${category || 'blank'}” is not a glossary category`); return }
      const id = row.id?.trim() || slug(term)
      const next: MedicalTerm = {
        id,
        term,
        ar: row.ar?.trim() ?? '',
        category: category as MedTermCategory,
        def: row.def?.trim() ?? '',
        defAr: row.defAr?.trim() ?? '',
        example: row.example?.trim() ?? '',
      }
      if (byId.has(id)) { byId.set(id, { ...byId.get(id)!, ...next }); updated.add(id) }
      else additions.push(next)
    })

    // A document that has never met the categories still needs them, or every
    // imported term lands in a filter the page cannot show.
    setGlossary((current) => ({
      ...current,
      categories: current.categories.length ? current.categories : MED_CATEGORIES.map((entry) => ({ ...entry })),
      terms: [...additions, ...current.terms.map((term) => byId.get(term.id) ?? term)],
    }))

    return {
      imported: additions.length + updated.size,
      failed: errors.length,
      errors: [...errors, `Added ${additions.length} · updated ${updated.size}`],
    }
  }

  return (
    <ImportWizard
      title="Bulk import glossary terms"
      description="Open a spreadsheet, CSV, or Markdown file; map every column, preview each row, then commit. A row whose ID matches an existing term updates it in place."
      noun="terms"
      fields={FIELDS}
      markdownExample={MD}
      // `defAr` normalises to `defar`, which matched no field: the column the page
      // itself advertises landed on "Ignore" and the Arabic definition imported
      // blank. Both spellings map now.
      aliases={{ english: 'term', arabic: 'ar', word: 'term', definition: 'def', definition_ar: 'defAr', defar: 'defAr', def_ar: 'defAr', meaning: 'def', group: 'category' }}
      previewSecondary={{ header: 'Category', get: (values) => values.category || '—' }}
      validateRow={(values) => {
        const errors: string[] = []
        if (!values.term?.trim()) errors.push('Term is required')
        if (!values.def?.trim()) errors.push('An English definition is required')
        const category = values.category?.trim()
        if (!category) errors.push('Category is required')
        else if (!CATEGORY_KEYS.has(category)) errors.push(`“${category}” is not one of the glossary categories`)
        return errors
      }}
      commit={commit}
      backTo="/admin/glossary"
      backLabel="Back to glossary"
    />
  )
}
