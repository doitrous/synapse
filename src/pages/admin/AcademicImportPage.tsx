import { useState } from 'react'
import { ImportWizard, type ImportField } from '@/components/admin/ImportWizard'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { defaultModuleId, type CurriculumCourse, type UniYear } from '@/data/universities'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Field, Select } from '@/components/ui/Field'

const FIELDS: ImportField[] = [
  { key: 'year', label: 'Year', required: true, help: 'e.g. Year 1 — grouped into the university.' },
  { key: 'term', label: 'Term', help: 'Term within the year (defaults to Term 1).' },
  { key: 'module', label: 'Module name', required: true, help: 'The module/course name.' },
  { key: 'module_id', label: 'Module ID', help: 'Visible unique ID (e.g. CVS 01); auto-generated if omitted.' },
  { key: 'students', label: 'Students', help: 'Optional enrolment count for the year.' },
]

const MD = `# Item\n## year\nYear 2\n## term\nTerm 1\n## module\nCardiovascular System\n## module_id\nCVS 01\n\n---\n\n# Item\n## year\nYear 2\n## term\nTerm 1\n## module\nRespiratory System\n## module_id\nRES 02`

export function AcademicImportPage() {
  const [universities, setUniversities] = useUniversityCatalogue()
  const [uniId, setUniId] = useState(universities[0]?.id ?? '')

  function commit(rows: Array<Record<string, string>>) {
    const errors: string[] = []
    const uni = universities.find((u) => u.id === uniId)
    if (!uni) return { imported: 0, failed: rows.length, errors: ['No target university selected.'] }

    // Start from the university's current structure and merge rows in.
    const years: UniYear[] = uni.years.map((y) => ({ ...y, courses: [...y.courses], terms: [...(y.terms ?? [])] }))
    const takenIds = new Set<string>()
    years.forEach((y) => y.courses.forEach((c) => c.moduleId && takenIds.add(c.moduleId.toUpperCase())))
    const uniqueId = (base: string) => { let id = base, n = 2; while (takenIds.has(id.toUpperCase())) id = `${base}-${n++}`; takenIds.add(id.toUpperCase()); return id }
    let imported = 0

    rows.forEach((v, i) => {
      const yearLabel = v.year?.trim()
      const moduleName = v.module?.trim()
      if (!yearLabel || !moduleName) { errors.push(`Row ${i + 2}: year and module are required.`); return }
      const term = v.term?.trim() || 'Term 1'
      let year = years.find((y) => y.year.toLowerCase() === yearLabel.toLowerCase())
      if (!year) { year = { year: yearLabel, students: Number(v.students) || 0, courses: [], terms: [] }; years.push(year) }
      if (v.students && !year.students) year.students = Number(v.students) || 0
      if (!year.terms?.includes(term)) year.terms = [...(year.terms ?? []), term]
      const moduleId = uniqueId((v.module_id?.trim() || defaultModuleId(moduleName, year.courses.length + 1)))
      const course: CurriculumCourse = { id: `imp-${Date.now()}-${i}`, name: moduleName, block: term, moduleId, term }
      year.courses.push(course)
      imported++
    })

    setUniversities((prev) => prev.map((u) => (u.id === uniId ? { ...u, years } : u)))
    return { imported, failed: errors.length, errors }
  }

  return (
    <ImportWizard
      title="Bulk import academic structure"
      description="Open a spreadsheet, CSV, or Markdown file of years, terms, and modules; map every column, preview, then merge into the selected university."
      noun="modules"
      fields={FIELDS}
      markdownExample={MD}
      aliases={{ course: 'module', module_name: 'module', moduleid: 'module_id' }}
      previewSecondary={{ header: 'Year · Term', get: (v) => `${v.year || '—'}${v.term ? ` · ${v.term}` : ''}` }}
      validateRow={(v) => { const e: string[] = []; if (!v.year?.trim()) e.push('Year required'); if (!v.module?.trim()) e.push('Module required'); return e }}
      commit={commit}
      backTo="/admin/academic"
      backLabel="Back to academic setup"
      contextControl={
        <Panel className="overflow-hidden">
          <PanelHeader title="Target university" hint="Rows merge into this university's structure" />
          <div className="p-4">
            <Field label="University">
              <Select value={uniId} onChange={(e) => setUniId(e.target.value)}>
                {universities.map((u) => <option key={u.id} value={u.id}>{u.short} — {u.name}</option>)}
              </Select>
            </Field>
          </div>
        </Panel>
      }
    />
  )
}
