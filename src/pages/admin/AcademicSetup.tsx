import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Plus, X, Trash2, MapPin, Building2, SlidersHorizontal, Pencil, Check, Upload, Scale } from 'lucide-react'
import type { CurriculumCourse, University } from '@/data/universities'
import { newUniversityYears, defaultModuleId, universityYearId } from '@/data/universities'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Toggle } from '@/components/ui/Toggle'
import { SystemMark } from '@/components/ui/SystemMark'
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph } from '@/data/conceptGraph'
import { CourseCurriculumDialog } from '@/components/admin/CourseCurriculumDialog'
import { COURSE_CURRICULA_STORAGE_KEY, curriculumCount, type CourseCurriculumSelection } from '@/data/courseCurriculum'
import { ModuleScheduleDialog } from '@/components/admin/ModuleScheduleDialog'
import { ModuleEditDialog, type ModuleEditDraft } from '@/components/admin/ModuleEditDialog'
import { ModuleSubjectsDialog } from '@/components/admin/ModuleSubjectsDialog'
import { AcademicImportDialog } from '@/components/admin/AcademicImportDialog'
import type { ModuleScheduleStore } from '@/data/moduleSchedule'
import {
  DEFAULT_TERM, MODULE_SUBJECTS_STORAGE_KEY, mergeCurricula, moduleKey, moduleTotal, termsOf,
  type ModuleSubject, type ModuleSubjectStore,
} from '@/data/moduleSubjects'
import { deleteTerm, isYearLive, migrateModuleCurricula, migrateModuleKeys, moveModule, renameTerm } from '@/data/curriculumKeys'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'

/** Every module ID already used in a university, for a new module's default. */
function usedModuleIds(years: { courses: CurriculumCourse[] }[]): Set<string> {
  const set = new Set<string>()
  years.forEach((y) => y.courses.forEach((c) => { if (c.moduleId) set.add(c.moduleId.toUpperCase()) }))
  return set
}

/** Ensure a module ID is unique within a university by appending a suffix. */
function uniqueModuleId(base: string, taken: Set<string>): string {
  let candidate = base
  let n = 2
  while (taken.has(candidate.toUpperCase())) { candidate = `${base}-${n}`; n++ }
  return candidate
}

type ModuleTarget = { course: CurriculumCourse; yearIdx: number; key: string }

export function AcademicSetup() {
  const [unis, setUnis, uniStatus] = useUniversityCatalogue()
  const [contentItems] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [conceptGraph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [curricula, setCurricula, curriculaStatus] = usePersistentState<Record<string, CourseCurriculumSelection>>(COURSE_CURRICULA_STORAGE_KEY, {})
  const [schedules, setSchedules, scheduleStatus] = usePersistentState<ModuleScheduleStore>('synapse-module-schedules-v1', {})
  const [subjects, setSubjects, subjectStatus] = usePersistentState<ModuleSubjectStore>(MODULE_SUBJECTS_STORAGE_KEY, {})
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
  const [removingYear, setRemovingYear] = useState<number | null>(null)
  const [renamingTerm, setRenamingTerm] = useState<{ yearIdx: number; term: string } | null>(null)
  const [termDraft, setTermDraft] = useState('')
  const [removingTerm, setRemovingTerm] = useState<{ yearIdx: number; term: string; into: string } | null>(null)
  const [importOpen, setImportOpen] = useState(false)
  const [moduleEditor, setModuleEditor] = useState<ModuleTarget | null>(null)
  const [curriculumEditor, setCurriculumEditor] = useState<ModuleTarget | null>(null)
  const [marksEditor, setMarksEditor] = useState<ModuleTarget | null>(null)
  const [scheduleEditor, setScheduleEditor] = useState<ModuleTarget | null>(null)

  // Live mode intentionally starts with an empty catalogue and hydrates it from
  // MariaDB. Keep the selection valid both before hydration and after deletions.
  useEffect(() => {
    if (unis.length === 0) {
      if (selectedId) setSelectedId('')
      return
    }
    if (!unis.some((university) => university.id === selectedId)) setSelectedId(unis[0].id)
  }, [selectedId, unis])

  /**
   * Move the stored documents off year *labels* and onto year *ids*, once.
   *
   * Curricula and schedules were keyed by the label, so renaming a year detached
   * every module's content and timetable without saying so. Marks would have
   * inherited the same defect. This waits for all four documents to hydrate —
   * migrating against a catalogue that has not arrived would rewrite nothing and
   * then never run again.
   */
  const migrated = useRef(false)
  useEffect(() => {
    if (migrated.current) return
    if (!uniStatus.hydrated || !curriculaStatus.hydrated || !scheduleStatus.hydrated || !subjectStatus.hydrated) return
    if (unis.length === 0) return
    migrated.current = true

    const nextCurricula = migrateModuleKeys(curricula, unis)
    if (nextCurricula !== curricula) setCurricula(nextCurricula)
    const nextSchedules = migrateModuleKeys(schedules, unis)
    if (nextSchedules !== schedules) setSchedules(nextSchedules)
    const nextSubjects = migrateModuleCurricula(migrateModuleKeys(subjects, unis), nextCurricula)
    if (nextSubjects !== subjects) setSubjects(nextSubjects)
  }, [curricula, curriculaStatus.hydrated, schedules, scheduleStatus.hydrated, setCurricula, setSchedules, setSubjects, subjects, subjectStatus.hydrated, uniStatus.hydrated, unis])

  const patchSelected = (fn: (u: University) => University) =>
    setUnis((prev) => prev.map((u) => (u.id === selectedId ? fn(u) : u)))

  function addYear() {
    patchSelected((u) => {
      const label = `Year ${u.years.length + 1}`
      return { ...u, years: [...u.years, { id: universityYearId(u.short, label), year: label, students: 0, courses: [], terms: [DEFAULT_TERM] }] }
    })
  }

  function removeYear(yearIdx: number) {
    const year = uni.years[yearIdx]
    patchSelected((u) => ({ ...u, years: u.years.filter((_, i) => i !== yearIdx) }))
    // The year's modules take their marks, curricula and schedules with them.
    const drop = <T,>(store: Record<string, T>): Record<string, T> => {
      const next = { ...store }
      year.courses.forEach((course) => { delete next[moduleKey(uni.id, year.id, course.id)] })
      return next
    }
    setSubjects(drop)
    setCurricula(drop)
    setSchedules(drop)
    setRemovingYear(null)
  }

  /**
   * Rename a year without moving its id.
   *
   * The id is what every stored document is keyed by. Re-minting it from the new
   * label — which is what this did — is exactly how a rename used to orphan a
   * year's curricula and schedules.
   */
  function saveYearLabel(yearIdx: number) {
    const label = yearLabel.trim()
    if (label) patchSelected((u) => ({ ...u, years: u.years.map((y, i) => (i === yearIdx ? { ...y, year: label } : y)) }))
    setRenamingYear(null)
  }

  function addTerm(yearIdx: number) {
    patchSelected((u) => ({
      ...u,
      years: u.years.map((y, i) => {
        if (i !== yearIdx) return y
        const existing = termsOf(y)
        let n = existing.length + 1
        while (existing.includes(`Term ${n}`)) n++
        return { ...y, terms: [...existing, `Term ${n}`] }
      }),
    }))
  }

  function saveTermName(yearIdx: number, from: string) {
    const to = termDraft.trim()
    setRenamingTerm(null)
    if (!to || to === from) return
    patchSelected((u) => renameTerm(u, u.years[yearIdx].id, from, to))
  }

  function confirmRemoveTerm() {
    if (!removingTerm) return
    const { yearIdx, term, into } = removingTerm
    patchSelected((u) => deleteTerm(u, u.years[yearIdx].id, term, into))
    setRemovingTerm(null)
  }

  function setUniversityActive(active: boolean) {
    patchSelected((u) => ({ ...u, active }))
  }

  function setYearActive(yearIdx: number, active: boolean) {
    patchSelected((u) => ({ ...u, years: u.years.map((y, i) => (i === yearIdx ? { ...y, active } : y)) }))
  }

  /** Apply an edit, moving the module and everything keyed to it when asked. */
  function applyModuleEdit(target: ModuleTarget, draft: ModuleEditDraft) {
    const fromYear = uni.years[target.yearIdx]
    setModuleEditor(null)

    const named = (u: University): University => ({
      ...u,
      years: u.years.map((year) => ({
        ...year,
        courses: year.courses.map((course) => (
          course.id === target.course.id ? { ...course, moduleId: draft.moduleId, name: draft.name, block: draft.block || course.block } : course
        )),
      })),
    })

    if (draft.yearId === fromYear.id && (draft.term || DEFAULT_TERM) === (target.course.term || DEFAULT_TERM)) {
      patchSelected(named)
      return
    }

    // One operation over the catalogue and all three documents: re-keying them
    // from three call sites is how a move half-lands.
    const moved = moveModule(
      { university: named(uni), courseId: target.course.id, fromYearId: fromYear.id, toYearId: draft.yearId, toTerm: draft.term },
      { subjects, curricula, schedules },
    )
    setUnis((prev) => prev.map((u) => (u.id === selectedId ? moved.university : u)))
    if (moved.stores.subjects !== subjects) setSubjects(moved.stores.subjects)
    if (moved.stores.curricula !== curricula) setCurricula(moved.stores.curricula as Record<string, CourseCurriculumSelection>)
    if (moved.stores.schedules !== schedules) setSchedules(moved.stores.schedules as ModuleScheduleStore)
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
          description="Start by adding the first university. Years, terms, modules, curricula, marks, and schedules can then be configured here."
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

  /**
   * Save the university's details, keeping every year id exactly as it was.
   *
   * Year ids are minted from the abbreviation, so re-deriving them here would
   * detach every module's marks, curriculum and schedule the first time a typo
   * in the abbreviation was corrected. An id is an identifier, not a label:
   * nothing on screen renders it as the abbreviation.
   */
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
    const key = moduleKey(uni.id, uni.years[yearIdx].id, courseId)
    patchSelected((u) => ({
      ...u,
      years: u.years.map((y, i) => (i !== yearIdx ? y : { ...y, courses: y.courses.filter((c) => c.id !== courseId) })),
    }))
    const drop = <T,>(store: Record<string, T>): Record<string, T> => {
      if (!(key in store)) return store
      const next = { ...store }
      delete next[key]
      return next
    }
    setSubjects(drop)
    setCurricula(drop)
    setSchedules(drop)
  }

  const uniLive = uni.active !== false

  return (
    <PageContainer>
      <PageHeader
        title="Academic Setup"
        description="Manage universities, years, terms, modules, curricula, marks, and teaching schedules — each year carries a unique year_ID and each module a unique module_ID."
        actions={
          <>
            <Link to="/admin/academic/marks"><Button variant="secondary" size="md" iconLeft={Scale}>Marks & weights</Button></Link>
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
                    'flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-start transition-colors',
                    selectedId === u.id ? 'bg-accent-tint' : 'hover:bg-inset',
                  )}
                >
                  <span
                    className={cn(
                      'grid size-8 shrink-0 place-items-center rounded-md text-[11px] font-semibold',
                      selectedId === u.id ? 'bg-accent text-on-accent' : 'bg-inset text-ink-2',
                      u.active === false && 'opacity-50',
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
                    <span className="block truncate text-[11.5px] text-ink-3">
                      {u.active === false ? 'Not live' : u.region}
                    </span>
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
                <label className="flex items-center gap-2 text-[12.5px] text-ink-2">
                  <Toggle checked={uniLive} onChange={setUniversityActive} label="University is live to students" />
                  <span className={uniLive ? 'text-ink-2' : 'font-medium text-warning'}>{uniLive ? 'Live' : 'Not live'}</span>
                </label>
                <Button variant="secondary" size="sm" iconLeft={Pencil} onClick={startIdentityEdit}>Edit university details</Button>
              </div>
            )}
          </Panel>

          {uni.years.map((y, i) => {
            const yearLive = isYearLive(uni, y)
            const yearTerms = termsOf(y)
            return (
            <Panel key={y.id}>
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
                    <span className="rounded-md border border-accent-line bg-accent-tint px-2 py-0.5 font-mono text-[10.5px] font-bold text-accent-strong" title="Unique year ID">{y.id}</span>
                    <button onClick={() => { setRenamingYear(i); setYearLabel(y.year) }} className="grid size-7 place-items-center rounded text-ink-3 hover:bg-inset hover:text-ink" aria-label="Rename year"><Icon icon={Pencil} size={13} /></button>
                    <span className="text-[11.5px] text-ink-3">{y.students} students · {y.courses.length} modules · {yearTerms.length} terms</span>
                    {!yearLive && <span className="rounded-md border border-warning/30 bg-warning-tint px-1.5 py-0.5 text-[10.5px] font-semibold text-warning">Not live</span>}
                    <div className="ms-auto flex items-center gap-1.5">
                      <Toggle checked={y.active !== false} onChange={(next) => setYearActive(i, next)} label={`${y.year} is live to students`} />
                      <Button variant="ghost" size="sm" iconLeft={Plus} onClick={() => addTerm(i)}>Add term</Button>
                      <button onClick={() => setRemovingYear(i)} className="grid size-8 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label="Remove year"><Icon icon={Trash2} size={14} /></button>
                    </div>
                  </>
                )}
              </div>

              {removingYear === i && (
                <div className="flex flex-wrap items-center gap-2 border-b border-line bg-danger-tint px-4 py-2.5 text-[12.5px] text-ink-2">
                  <span>Remove <strong className="text-ink">{y.year}</strong>? Its {y.courses.length} {y.courses.length === 1 ? 'module' : 'modules'} and their marks, curricula and schedules go with it.</span>
                  <span className="ms-auto flex gap-1.5">
                    <Button variant="ghost" size="sm" onClick={() => setRemovingYear(null)}>Keep</Button>
                    <Button variant="danger" size="sm" onClick={() => removeYear(i)}>Remove year</Button>
                  </span>
                </div>
              )}

              {yearTerms.map((term) => {
                const termCourses = y.courses.filter((c) => (c.term || DEFAULT_TERM) === term)
                const adding = addModuleTerm?.yearIdx === i && addModuleTerm?.term === term
                const renaming = renamingTerm?.yearIdx === i && renamingTerm?.term === term
                const removing = removingTerm?.yearIdx === i && removingTerm?.term === term
                const others = yearTerms.filter((candidate) => candidate !== term)
                return (
                  <section key={term} className="border-b border-line last:border-b-0">
                    <div className="flex flex-wrap items-center gap-2 bg-surface-2/50 px-4 py-1.5">
                      {renaming ? (
                        <form className="flex items-center gap-1.5" onSubmit={(e) => { e.preventDefault(); saveTermName(i, term) }}>
                          <TextInput value={termDraft} onChange={(e) => setTermDraft(e.target.value)} className="h-8 w-40" autoFocus aria-label="Term name" />
                          <Button type="submit" variant="primary" size="sm"><Icon icon={Check} size={14} /></Button>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setRenamingTerm(null)}><Icon icon={X} size={14} /></Button>
                        </form>
                      ) : (
                        <>
                          <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-2">{term}</span>
                          <span className="tnum font-mono text-[10.5px] text-ink-3">{termCourses.length}</span>
                          <button onClick={() => { setRenamingTerm({ yearIdx: i, term }); setTermDraft(term) }} className="grid size-6 place-items-center rounded text-ink-3 hover:bg-inset hover:text-ink" aria-label={`Rename ${term}`}><Icon icon={Pencil} size={12} /></button>
                          {others.length > 0 && (
                            <button onClick={() => setRemovingTerm({ yearIdx: i, term, into: others[0] })} className="grid size-6 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label={`Remove ${term}`}><Icon icon={Trash2} size={12} /></button>
                          )}
                          <Button className="ms-auto" variant="ghost" size="sm" iconLeft={Plus} onClick={() => { setAddModuleTerm(adding ? null : { yearIdx: i, term }); setCourseName('') }}>Add module</Button>
                        </>
                      )}
                    </div>

                    {removing && removingTerm && (
                      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-warning-tint px-4 py-2.5 text-[12.5px] text-ink-2">
                        {termCourses.length > 0 ? (
                          <>
                            <span>Move its {termCourses.length} {termCourses.length === 1 ? 'module' : 'modules'} to</span>
                            <Select
                              className="h-8 w-40"
                              aria-label="Move modules to"
                              value={removingTerm.into}
                              onChange={(event) => setRemovingTerm({ ...removingTerm, into: event.target.value })}
                            >
                              {others.map((option) => <option key={option} value={option}>{option}</option>)}
                            </Select>
                          </>
                        ) : (
                          <span>Remove <strong className="text-ink">{term}</strong>? It holds no modules.</span>
                        )}
                        <span className="ms-auto flex gap-1.5">
                          <Button variant="ghost" size="sm" onClick={() => setRemovingTerm(null)}>Cancel</Button>
                          <Button variant="primary" size="sm" onClick={confirmRemoveTerm}>Remove term</Button>
                        </span>
                      </div>
                    )}

                    {adding && (
                      <div className="flex items-center gap-2 border-b border-line p-2.5">
                        <TextInput value={courseName} onChange={(e) => setCourseName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCourse(i, term)} placeholder="Module name" autoFocus />
                        <Button variant="primary" size="sm" onClick={() => addCourse(i, term)}>Add</Button>
                        <Button variant="ghost" size="sm" onClick={() => setAddModuleTerm(null)}><Icon icon={X} size={16} /></Button>
                      </div>
                    )}
                    <ul className="divide-y divide-line">
                      {termCourses.map((c) => {
                        const key = moduleKey(uni.id, y.id, c.id)
                        const target: ModuleTarget = { course: c, yearIdx: i, key }
                        const moduleSubjects = subjects[key] ?? []
                        const chosen = moduleSubjects.reduce((sum, subject) => sum + curriculumCount(subject.curriculum), 0)
                        const marks = moduleTotal(moduleSubjects)
                        const scheduleCount = schedules[key]?.length ?? 0
                        const fallbackModuleId = c.moduleId ?? defaultModuleId(c.name, y.courses.indexOf(c) + 1)
                        return (
                          <li key={c.id} className="group flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-2 px-4 py-3 2xl:flex-nowrap">
                            <SystemMark moduleId={fallbackModuleId} />
                            {/* The name owns a line of its own until the row is genuinely
                                wide enough for it and three labelled actions. Sharing one
                                line earlier is what truncated every module to "Car…". */}
                            <div className="min-w-0 flex-1 basis-[calc(100%-4rem)] 2xl:basis-auto">
                              <span className="block truncate text-[13.5px] font-medium text-ink">{c.name}</span>
                              <span className="mt-0.5 block truncate text-[11px] text-ink-3">{c.block} · {c.term || DEFAULT_TERM}</span>
                            </div>
                            <Button className="flex-1 sm:flex-none" variant="secondary" size="sm" iconLeft={SlidersHorizontal} onClick={() => setCurriculumEditor(target)}>Curriculum{chosen > 0 ? ` · ${chosen}` : ''}</Button>
                            <Button className="flex-1 sm:flex-none" variant="secondary" size="sm" iconLeft={Scale} onClick={() => setMarksEditor(target)}>Marks &amp; exams{marks > 0 ? ` · ${marks}` : ''}</Button>
                            <Button className="flex-1 sm:flex-none" variant="secondary" size="sm" iconLeft={CalendarDays} onClick={() => setScheduleEditor(target)}>Schedule{scheduleCount > 0 ? ` · ${scheduleCount}` : ''}</Button>
                            <button onClick={() => setModuleEditor(target)} className="grid size-10 shrink-0 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label={`Edit ${c.name}`}><Icon icon={Pencil} size={15} /></button>
                            <button onClick={() => removeCourse(i, c.id)} className="grid size-11 shrink-0 place-items-center rounded-lg text-ink-3 transition-opacity hover:bg-danger-tint hover:text-danger sm:size-10 sm:opacity-0 sm:focus:opacity-100 sm:group-hover:opacity-100" aria-label={`Remove ${c.name}`}><Icon icon={Trash2} size={15} /></button>
                          </li>
                        )
                      })}
                      {termCourses.length === 0 && <li className="px-4 py-2.5 text-[12.5px] text-ink-3">No modules in this term yet.</li>}
                    </ul>
                  </section>
                )
              })}
            </Panel>
            )
          })}

          <Button variant="secondary" size="md" iconLeft={Plus} onClick={addYear} className="w-full">Add year</Button>
        </div>
      </div>

      {moduleEditor && (
        <ModuleEditDialog
          key={moduleEditor.key}
          university={uni}
          yearId={uni.years[moduleEditor.yearIdx].id}
          course={moduleEditor.course}
          onClose={() => setModuleEditor(null)}
          onSave={(draft) => applyModuleEdit(moduleEditor, draft)}
        />
      )}
      {marksEditor && (
        <ModuleSubjectsDialog
          key={marksEditor.key}
          university={uni}
          year={uni.years[marksEditor.yearIdx]}
          course={marksEditor.course}
          store={subjects}
          onClose={() => setMarksEditor(null)}
          onSave={(value: ModuleSubject[]) => { setSubjects((current) => ({ ...current, [marksEditor.key]: value })); setMarksEditor(null) }}
        />
      )}
      {curriculumEditor && (
        <CourseCurriculumDialog
          key={curriculumEditor.key}
          course={curriculumEditor.course}
          year={uni.years[curriculumEditor.yearIdx].year}
          items={contentItems}
          graph={conceptGraph}
          value={subjects[curriculumEditor.key] ?? []}
          onClose={() => setCurriculumEditor(null)}
          onSave={(value) => { setSubjects((current) => ({ ...current, [curriculumEditor.key]: value })); setCurriculumEditor(null) }}
        />
      )}
      {scheduleEditor && (
        <ModuleScheduleDialog
          key={scheduleEditor.key}
          module={scheduleEditor.course}
          university={uni.name}
          year={uni.years[scheduleEditor.yearIdx].year}
          items={contentItems}
          curriculum={mergeCurricula(subjects[scheduleEditor.key] ?? [])}
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
