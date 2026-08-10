import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Plus, X, Trash2, MapPin, Building2, SlidersHorizontal, Pencil, Check, Upload } from 'lucide-react'
import type { CurriculumCourse, University } from '@/data/universities'
import { newUniversityYears, defaultModuleId, universityYearId } from '@/data/universities'
import { yearId } from '@/data/taxonomy'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { ModuleIdChip } from '@/components/ui/ModuleIdChip'
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { CourseCurriculumDialog, type CourseCurriculumSelection } from '@/components/admin/CourseCurriculumDialog'
import { ModuleScheduleDialog } from '@/components/admin/ModuleScheduleDialog'
import { AcademicImportDialog } from '@/components/admin/AcademicImportDialog'
import type { ModuleScheduleStore } from '@/data/moduleSchedule'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'

const DEFAULT_TERM = 'Term 1'

/** Every module ID already used in a university (for uniqueness checks). */
function usedModuleIds(years: { courses: CurriculumCourse[] }[], exceptId?: string): Set<string> {
  const set = new Set<string>()
  years.forEach((y) => y.courses.forEach((c) => { if (c.id !== exceptId && c.moduleId) set.add(c.moduleId.toUpperCase()) }))
  return set
}

/** Ensure a module ID is unique within a university by appending a suffix. */
function uniqueModuleId(base: string, taken: Set<string>): string {
  let candidate = base
  let n = 2
  while (taken.has(candidate.toUpperCase())) { candidate = `${base}-${n}`; n++ }
  return candidate
}

export function AcademicSetup() {
  const [unis, setUnis] = useUniversityCatalogue()
  const [contentItems] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [curricula, setCurricula] = usePersistentState<Record<string, CourseCurriculumSelection>>('synapse-course-curricula-v1', {})
  const [schedules, setSchedules] = usePersistentState<ModuleScheduleStore>('synapse-module-schedules-v1', {})
  const [selectedId, setSelectedId] = useState(unis[0]?.id ?? '')
  const [addingUni, setAddingUni] = useState(false)
  const [uniName, setUniName] = useState('')
  const [uniShort, setUniShort] = useState('')
  const [uniLocation, setUniLocation] = useState('')
  const [editingIdentity, setEditingIdentity] = useState(false)
  const [editName, setEditName] = useState('')
  const [editShort, setEditShort] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const [addModuleTerm, setAddModuleTerm] = useState<{ yearIdx: number; term: string } | null>(null)
  const [courseName, setCourseName] = useState('')
  const [renamingYear, setRenamingYear] = useState<number | null>(null)
  const [yearLabel, setYearLabel] = useState('')
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null)
  const [moduleIdDraft, setModuleIdDraft] = useState('')
  const [importOpen, setImportOpen] = useState(false)
  const [curriculumEditor, setCurriculumEditor] = useState<{ course: CurriculumCourse; year: string; key: string } | null>(null)
  const [scheduleEditor, setScheduleEditor] = useState<{ course: CurriculumCourse; year: string; key: string } | null>(null)

  // Live mode intentionally starts with an empty catalogue and hydrates it from
  // MariaDB. Keep the selection valid both before hydration and after deletions.
  useEffect(() => {
    if (unis.length === 0) {
      if (selectedId) setSelectedId('')
      return
    }
    if (!unis.some((university) => university.id === selectedId)) setSelectedId(unis[0].id)
  }, [selectedId, unis])

  /** All terms in a year: explicit terms ∪ terms used by its modules. */
  const termsOf = (y: { terms?: string[]; courses: CurriculumCourse[] }): string[] => {
    const set = new Set<string>(y.terms ?? [])
    y.courses.forEach((c) => set.add(c.term || DEFAULT_TERM))
    if (set.size === 0) set.add(DEFAULT_TERM)
    return [...set]
  }

  const patchSelected = (fn: (u: University) => University) =>
    setUnis((prev) => prev.map((u) => (u.id === selectedId ? fn(u) : u)))

  function addYear() {
    patchSelected((u) => {
      const label = `Year ${u.years.length + 1}`
      return { ...u, years: [...u.years, { id: universityYearId(u.short, label), year: label, students: 0, courses: [], terms: [DEFAULT_TERM] }] }
    })
  }
  function removeYear(yearIdx: number) {
    patchSelected((u) => ({ ...u, years: u.years.filter((_, i) => i !== yearIdx) }))
  }
  function saveYearLabel(yearIdx: number) {
    const label = yearLabel.trim()
    if (label) patchSelected((u) => ({ ...u, years: u.years.map((y, i) => (i === yearIdx ? { ...y, id: universityYearId(u.short, label), year: label } : y)) }))
    setRenamingYear(null)
  }
  function addTerm(yearIdx: number) {
    patchSelected((u) => ({
      ...u,
      years: u.years.map((y, i) => {
        if (i !== yearIdx) return y
        const existing = termsOf(y)
        return { ...y, terms: [...existing, `Term ${existing.length + 1}`] }
      }),
    }))
  }
  function saveModuleId(courseId: string) {
    if (!uni) return
    const draft = moduleIdDraft.trim()
    setEditingModuleId(null)
    if (!draft) return
    const taken = usedModuleIds(uni.years, courseId)
    const unique = uniqueModuleId(draft, taken)
    patchSelected((u) => ({ ...u, years: u.years.map((y) => ({ ...y, courses: y.courses.map((c) => (c.id === courseId ? { ...c, moduleId: unique } : c)) })) }))
  }

  const uni = unis.find((u) => u.id === selectedId) ?? unis[0]
  const totalStudents = uni?.years.reduce((s, y) => s + y.students, 0) ?? 0

  function addUniversity() {
    const name = uniName.trim()
    if (!name) return
    const id = `u${Date.now()}`
    const short = uniShort.trim().toUpperCase().replace(/\s+/g, '') || name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 3)
      .toUpperCase()
    setUnis((prev) => [...prev, { id, name, short, region: uniLocation.trim() || '—', years: newUniversityYears(id) }])
    setSelectedId(id)
    setUniName('')
    setUniShort('')
    setUniLocation('')
    setAddingUni(false)
  }

  if (!uni) {
    return (
      <PageContainer>
        <PageHeader
          title="Academic Setup"
          description="Start by adding the first university. Years, terms, modules, curricula, and schedules can then be configured here."
        />
        <Panel className="mx-auto w-full max-w-2xl p-5">
          <PanelHeader title="Add your first university" icon={Building2} />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label="University name" htmlFor="first-university-name">
              <TextInput id="first-university-name" value={uniName} onChange={(event) => setUniName(event.target.value)} placeholder="University name" autoFocus />
            </Field>
            <Field label="Abbreviation" htmlFor="first-university-short" hint="Up to 8 characters">
              <TextInput id="first-university-short" value={uniShort} onChange={(event) => setUniShort(event.target.value.toUpperCase())} placeholder="e.g. OMS" maxLength={8} />
            </Field>
            <Field label="Location" htmlFor="first-university-location">
              <TextInput id="first-university-location" value={uniLocation} onChange={(event) => setUniLocation(event.target.value)} placeholder="City or country" />
            </Field>
            <div className="flex items-end">
              <Button variant="primary" size="md" iconLeft={Plus} onClick={addUniversity} disabled={!uniName.trim()} className="w-full">
                Add university
              </Button>
            </div>
          </div>
        </Panel>
      </PageContainer>
    )
  }

  function startIdentityEdit() {
    setEditName(uni.name)
    setEditShort(uni.short)
    setEditLocation(uni.region === '—' ? '' : uni.region)
    setEditingIdentity(true)
  }

  function saveIdentity() {
    const name = editName.trim()
    const short = editShort.trim().toUpperCase().replace(/\s+/g, '').slice(0, 8)
    if (!name || !short) return
    const region = editLocation.trim() || '—'
    setUnis((current) => current.map((candidate) => candidate.id === uni.id ? { ...candidate, name, short, region } : candidate))
    setEditingIdentity(false)
  }

  function addCourse(yearIdx: number, term: string) {
    const name = courseName.trim()
    if (!name) return
    const taken = usedModuleIds(uni.years)
    const base = defaultModuleId(name, uni.years[yearIdx].courses.length + 1)
    const moduleId = uniqueModuleId(base, taken)
    patchSelected((u) => ({
      ...u,
      years: u.years.map((y, i) =>
        i !== yearIdx
          ? y
          : { ...y, courses: [...y.courses, { id: `c${Date.now()}`, name, block: `Block ${y.courses.length + 1}`, moduleId, term }] },
      ),
    }))
    setCourseName('')
    setAddModuleTerm(null)
  }

  function removeCourse(yearIdx: number, courseId: string) {
    setUnis((prev) =>
      prev.map((u) =>
        u.id !== selectedId
          ? u
          : {
              ...u,
              years: u.years.map((y, i) =>
                i !== yearIdx ? y : { ...y, courses: y.courses.filter((c) => c.id !== courseId) },
              ),
            },
      ),
    )
  }

  return (
    <PageContainer>
      <PageHeader
        title="Academic Setup"
        description="Manage universities, years, terms, modules, curricula, and teaching schedules — each year carries a unique year_ID and each module a unique module_ID."
        actions={
          <>
            <Link to="/admin/academic/import"><Button variant="secondary" size="md" iconLeft={Upload}>Bulk import</Button></Link>
            <Button variant="primary" size="md" iconLeft={Plus} onClick={() => setAddingUni((v) => !v)}>
              Add university
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[18rem_1fr]">
        {/* Universities */}
        <Panel className="h-fit">
          <PanelHeader title="Universities" hint={String(unis.length)} icon={Building2} />
          {addingUni && (
            <div className="grid gap-2 border-b border-line p-2.5 sm:grid-cols-[minmax(0,1fr)_7rem_minmax(9rem,0.7fr)_auto] lg:grid-cols-1">
              <TextInput value={uniName} onChange={(e) => setUniName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addUniversity()} placeholder="University name" aria-label="New university name" />
              <TextInput value={uniShort} onChange={(e) => setUniShort(e.target.value.toUpperCase())} onKeyDown={(e) => e.key === 'Enter' && addUniversity()} placeholder="Abbrev." aria-label="New university abbreviation" maxLength={8} />
              <TextInput value={uniLocation} onChange={(e) => setUniLocation(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addUniversity()} placeholder="Location" aria-label="New university location" />
              <Button variant="primary" size="sm" onClick={addUniversity}>
                Add
              </Button>
            </div>
          )}
          <ul className="p-2">
            {unis.map((u) => (
              <li key={u.id}>
                <button
                  onClick={() => { setSelectedId(u.id); setEditingIdentity(false) }}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left transition-colors',
                    selectedId === u.id ? 'bg-accent-tint' : 'hover:bg-inset',
                  )}
                >
                  <span
                    className={cn(
                      'grid size-8 shrink-0 place-items-center rounded-md text-[11px] font-semibold',
                      selectedId === u.id ? 'bg-accent text-on-accent' : 'bg-inset text-ink-2',
                    )}
                  >
                    {u.short}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'block truncate text-[13.5px] font-medium',
                        selectedId === u.id ? 'text-accent-strong' : 'text-ink',
                      )}
                    >
                      {u.name}
                    </span>
                    <span className="block truncate text-[11.5px] text-ink-3">{u.region}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Detail: years + modules */}
        <div className="min-w-0 space-y-4">
          <Panel className="p-4">
            {editingIdentity ? (
              <form className="grid items-end gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_9rem_minmax(11rem,0.65fr)_auto]" onSubmit={(event) => { event.preventDefault(); saveIdentity() }}>
                <Field label="University name" htmlFor="edit-university-name"><TextInput id="edit-university-name" value={editName} onChange={(event) => setEditName(event.target.value)} autoFocus /></Field>
                <Field label="Abbreviation" htmlFor="edit-university-short" hint="Shown in selections"><TextInput id="edit-university-short" value={editShort} onChange={(event) => setEditShort(event.target.value.toUpperCase())} maxLength={8} /></Field>
                <Field label="Location" htmlFor="edit-university-location" hint="Shown in Academic Setup"><TextInput id="edit-university-location" value={editLocation} onChange={(event) => setEditLocation(event.target.value)} placeholder="City or country" /></Field>
                <div className="flex gap-2 sm:col-span-2 xl:col-span-1"><Button type="button" variant="ghost" iconLeft={X} onClick={() => setEditingIdentity(false)}>Cancel</Button><Button type="submit" variant="primary" iconLeft={Check} disabled={!editName.trim() || !editShort.trim()}>Save</Button></div>
              </form>
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><h2 className="font-serif text-[20px] font-semibold text-ink">{uni.name}</h2><span className="rounded-md border border-accent-line bg-accent-tint px-2 py-0.5 font-mono text-[11px] font-bold text-accent-strong">{uni.short}</span></div>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[12.5px] text-ink-3"><Icon icon={MapPin} size={13} />{uni.region} · {uni.years.length} years · {totalStudents.toLocaleString()} students</p>
                </div>
                <Button variant="secondary" size="sm" iconLeft={Pencil} onClick={startIdentityEdit}>Edit university details</Button>
              </div>
            )}
          </Panel>

          {uni.years.map((y, i) => (
            <Panel key={`${y.year}-${i}`}>
              <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
                {renamingYear === i ? (
                  <form className="flex items-center gap-2" onSubmit={(e) => { e.preventDefault(); saveYearLabel(i) }}>
                    <TextInput value={yearLabel} onChange={(e) => setYearLabel(e.target.value)} className="h-9 w-40" autoFocus aria-label="Year name" />
                    <Button type="submit" variant="primary" size="sm" iconLeft={Check}>Save</Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setRenamingYear(null)}><Icon icon={X} size={15} /></Button>
                  </form>
                ) : (
                  <>
                    <h3 className="font-serif text-[16px] font-semibold text-ink">{y.year}</h3>
                    <span className="rounded-md border border-accent-line bg-accent-tint px-2 py-0.5 font-mono text-[10.5px] font-bold text-accent-strong" title="Unique year ID">{yearId(uni.id, y.year)}</span>
                    <button onClick={() => { setRenamingYear(i); setYearLabel(y.year) }} className="grid size-7 place-items-center rounded text-ink-3 hover:bg-inset hover:text-ink" aria-label="Rename year"><Icon icon={Pencil} size={13} /></button>
                    <span className="text-[11.5px] text-ink-3">{y.students} students · {y.courses.length} modules · {termsOf(y).length} terms</span>
                    <div className="ms-auto flex items-center gap-1">
                      <Button variant="ghost" size="sm" iconLeft={Plus} onClick={() => addTerm(i)}>Add term</Button>
                      <button onClick={() => removeYear(i)} className="grid size-8 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label="Remove year"><Icon icon={Trash2} size={14} /></button>
                    </div>
                  </>
                )}
              </div>

              {termsOf(y).map((term) => {
                const termCourses = y.courses.filter((c) => (c.term || DEFAULT_TERM) === term)
                const adding = addModuleTerm?.yearIdx === i && addModuleTerm?.term === term
                return (
                  <section key={term} className="border-b border-line last:border-b-0">
                    <div className="flex items-center gap-2 bg-surface-2/50 px-4 py-1.5">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-2">{term}</span>
                      <span className="tnum font-mono text-[10.5px] text-ink-3">{termCourses.length}</span>
                      <Button className="ms-auto" variant="ghost" size="sm" iconLeft={Plus} onClick={() => { setAddModuleTerm(adding ? null : { yearIdx: i, term }); setCourseName('') }}>Add module</Button>
                    </div>
                    {adding && (
                      <div className="flex items-center gap-2 border-b border-line p-2.5">
                        <TextInput value={courseName} onChange={(e) => setCourseName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCourse(i, term)} placeholder="Module name" autoFocus />
                        <Button variant="primary" size="sm" onClick={() => addCourse(i, term)}>Add</Button>
                        <Button variant="ghost" size="sm" onClick={() => setAddModuleTerm(null)}><Icon icon={X} size={16} /></Button>
                      </div>
                    )}
                    <ul className="divide-y divide-line">
                      {termCourses.map((c) => {
                        const key = `${uni.id}:${y.year}:${c.id}`
                        const curriculum = curricula[key]
                        const curriculumCount = (curriculum?.articleIds.length ?? 0) + (curriculum?.questionIds.length ?? 0) + (curriculum?.practicalIds.length ?? 0)
                        const scheduleCount = schedules[key]?.length ?? 0
                        const fallbackModuleId = c.moduleId ?? defaultModuleId(c.name, y.courses.indexOf(c) + 1)
                        return (
                          <li key={c.id} className="group flex min-w-0 flex-wrap items-center gap-2.5 px-4 py-3 sm:flex-nowrap">
                            {editingModuleId === c.id ? (
                              <form className="flex items-center gap-1.5" onSubmit={(e) => { e.preventDefault(); saveModuleId(c.id) }}>
                                <TextInput value={moduleIdDraft} onChange={(e) => setModuleIdDraft(e.target.value)} className="h-8 w-28 font-mono" autoFocus aria-label="Module ID" />
                                <Button type="submit" variant="primary" size="sm"><Icon icon={Check} size={14} /></Button>
                              </form>
                            ) : (
                              <button onClick={() => { setEditingModuleId(c.id); setModuleIdDraft(fallbackModuleId) }} title="Edit module ID" className="shrink-0">
                                <ModuleIdChip moduleId={fallbackModuleId} />
                              </button>
                            )}
                            <span className="min-w-0 basis-full sm:flex-1"><span className="block truncate text-[13.5px] font-medium text-ink">{c.name}</span><span className="mt-0.5 block text-[11px] text-ink-3">{c.block}</span></span>
                            <Button className="flex-1 sm:flex-none" variant="secondary" size="sm" iconLeft={SlidersHorizontal} onClick={() => setCurriculumEditor({ course: c, year: y.year, key })}>Curriculum{curriculumCount > 0 ? ` · ${curriculumCount}` : ''}</Button>
                            <Button className="flex-1 sm:flex-none" variant="secondary" size="sm" iconLeft={CalendarDays} onClick={() => setScheduleEditor({ course: c, year: y.year, key })}>Schedule{scheduleCount > 0 ? ` · ${scheduleCount}` : ''}</Button>
                            <button onClick={() => removeCourse(i, c.id)} className="grid size-11 place-items-center rounded-lg text-ink-3 transition-opacity hover:bg-danger-tint hover:text-danger sm:size-10 sm:opacity-0 sm:focus:opacity-100 sm:group-hover:opacity-100" aria-label="Remove module"><Icon icon={Trash2} size={15} /></button>
                          </li>
                        )
                      })}
                      {termCourses.length === 0 && <li className="px-4 py-2.5 text-[12.5px] text-ink-3">No modules in this term yet.</li>}
                    </ul>
                  </section>
                )
              })}
            </Panel>
          ))}

          <Button variant="secondary" size="md" iconLeft={Plus} onClick={addYear} className="w-full">Add year</Button>
        </div>
      </div>
      {curriculumEditor && (
        <CourseCurriculumDialog
          key={curriculumEditor.key}
          course={curriculumEditor.course}
          year={curriculumEditor.year}
          items={contentItems}
          value={curricula[curriculumEditor.key]}
          onClose={() => setCurriculumEditor(null)}
          onSave={(value) => { setCurricula((current) => ({ ...current, [curriculumEditor.key]: value })); setCurriculumEditor(null) }}
        />
      )}
      {scheduleEditor && (
        <ModuleScheduleDialog
          key={scheduleEditor.key}
          module={scheduleEditor.course}
          university={uni.name}
          year={scheduleEditor.year}
          items={contentItems}
          curriculum={curricula[scheduleEditor.key]}
          value={schedules[scheduleEditor.key] ?? []}
          onClose={() => setScheduleEditor(null)}
          onChange={(value) => setSchedules((current) => ({ ...current, [scheduleEditor.key]: value }))}
        />
      )}
      <AcademicImportDialog
        open={importOpen}
        university={uni}
        onClose={() => setImportOpen(false)}
        onImport={(years) => { patchSelected((u) => ({ ...u, years })); setImportOpen(false) }}
      />
    </PageContainer>
  )
}
