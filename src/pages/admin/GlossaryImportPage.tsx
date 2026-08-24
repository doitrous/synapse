import { ImportWizard } from '@/components/admin/ImportWizard'
import { useMedicalGlossary } from '@/data/glossaryStore'
import { MED_CATEGORIES } from '@/data/glossary'
import {
  applyGlossaryRows,
  GLOSSARY_IMPORT_ALIASES,
  GLOSSARY_WIZARD_FIELDS,
  validateGlossaryImportRow,
} from '@/data/glossaryImport'

const MD = `| term | ar | category | def | definition_ar |
| --- | --- | --- | --- | --- |
| Tachycardia | تسرّع القلب | Signs & symptoms | A faster than normal heart rate. | تسارع ضربات القلب عن المعدل الطبيعي. |
| Auscultation | تسمّع | Examination | Listening to body sounds with a stethoscope. | الاستماع إلى أصوات الجسم بالسماعة. |`

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
    const result = applyGlossaryRows(glossary.terms, rows)

    // A document that has never met the categories still needs them, or every
    // imported term lands in a filter the page cannot show.
    setGlossary((current) => ({
      ...current,
      categories: current.categories.length ? current.categories : MED_CATEGORIES.map((entry) => ({ ...entry })),
      terms: applyGlossaryRows(current.terms, rows).records,
    }))

    return {
      imported: result.created + result.updated,
      failed: result.rejected,
      errors: [...result.errors, `Added ${result.created} · updated ${result.updated}`],
    }
  }

  return (
    <ImportWizard
      title="Bulk import glossary terms"
      description="Open a spreadsheet, CSV, or Markdown file; map every column, preview each row, then commit. A row whose ID matches an existing term updates it in place."
      noun="terms"
      fields={GLOSSARY_WIZARD_FIELDS}
      markdownExample={MD}
      aliases={GLOSSARY_IMPORT_ALIASES}
      previewSecondary={{ header: 'Category', get: (values) => values.category || '—' }}
      validateRow={validateGlossaryImportRow}
      commit={commit}
      backTo="/admin/glossary"
      backLabel="Back to glossary"
    />
  )
}
