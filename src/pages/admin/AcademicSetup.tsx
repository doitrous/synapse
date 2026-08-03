import { useState } from 'react'
import { CalendarDays, Plus, X, Trash2, MapPin, Building2, SlidersHorizontal, Pencil, Check } from 'lucide-react'
import type { CurriculumCourse } from '@/data/universities'
import { newUniversityYears } from '@/data/universities'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { CourseCurriculumDialog, type CourseCurriculumSelection } from '@/components/admin/CourseCurriculumDialog'
import { ModuleScheduleDialog } from '@/components/admin/ModuleScheduleDialog'
import type { ModuleScheduleStore } from '@/data/moduleSchedule'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'

export function AcademicSetup() {
  const [unis, setUnis] = useUniversityCatalogue()
  const [contentItems] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [curricula, setCurricula] = usePersistentState<Record<string, CourseCurriculumSelection>>('osler-course-curricula-v1', {})
  const [schedules, setSchedules] = usePersistentState<ModuleScheduleStore>('osler-module-schedules-v1', {})
  const [selectedId, setSelectedId] = useState(unis[0].id)
  const [addingUni, setAddingUni] = useState(false)
  const [uniName, setUniName] = useState('')
  const [uniShort, setUniShort] = useState('')
  const [uniLocation, setUniLocation] = useState('')
  const [editingIdentity, setEditingIdentity] = useState(false)
  const [editName, setEditName] = useState('')
  const [editShort, setEditShort] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const [addCourseYear, setAddCourseYear] = useState<number | null>(null)
  const [courseName, setCourseName] = useState('')
  const [curriculumEditor, setCurriculumEditor] = useState<{ course: CurriculumCourse; year: string; key: string } | null>(null)
  const [scheduleEditor, setScheduleEditor] = useState<{ course: CurriculumCourse; year: string; key: string } | null>(null)

  const uni = unis.find((u) => u.id === selectedId) ?? unis[0]
  const totalStudents = uni.years.reduce((s, y) => s + y.students, 0)

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

  function addCourse(yearIdx: number) {
    const name = courseName.trim()
    if (!name) return
    setUnis((prev) =>
      prev.map((u) =>
        u.id !== selectedId
          ? u
          : {
              ...u,
              years: u.years.map((y, i) =>
                i !== yearIdx
                  ? y
                  : {
                      ...y,
                      courses: [...y.courses, { id: `c${Date.now()}`, name, block: `Block ${y.courses.length + 1}` }],
                    },
              ),
            },
      ),
    )
    setCourseName('')
    setAddCourseYear(null)
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
        description="Manage universities, modules, curricula, teaching schedules, exams, and logbook requirements."
        actions={
          <Button variant="primary" size="md" iconLeft={Plus} onClick={() => setAddingUni((v) => !v)}>
            Add university
          </Button>
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
            <Panel key={y.year}>
              <PanelHeader
                title={y.year}
                hint={`${y.students} students · ${y.courses.length} modules`}
                action={
                  <Button
                    variant="ghost"
                    size="sm"
                    iconLeft={Plus}
                    onClick={() => {
                      setAddCourseYear(addCourseYear === i ? null : i)
                      setCourseName('')
                    }}
                  >
                    Add module
                  </Button>
                }
              />
              {addCourseYear === i && (
                <div className="flex items-center gap-2 border-b border-line p-2.5">
                  <TextInput
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCourse(i)}
                    placeholder="Module name"
                  />
                  <Button variant="primary" size="sm" onClick={() => addCourse(i)}>
                    Add
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setAddCourseYear(null)}>
                    <Icon icon={X} size={16} />
                  </Button>
                </div>
              )}
              <ul className="divide-y divide-line">
                {y.courses.map((c) => (
                  <li key={c.id} className="group flex min-w-0 flex-wrap items-center gap-2.5 px-4 py-3 sm:flex-nowrap">
                    <span className="min-w-0 basis-full sm:flex-1"><span className="block truncate text-[13.5px] font-medium text-ink">{c.name}</span><span className="mt-0.5 block text-[11px] text-ink-3">{c.block}</span></span>
                    {(() => {
                      const key = `${uni.id}:${y.year}:${c.id}`
                      const curriculum = curricula[key]
                      const count = (curriculum?.articleIds.length ?? 0) + (curriculum?.questionIds.length ?? 0) + (curriculum?.practicalIds.length ?? 0)
                      return <Button className="flex-1 sm:flex-none" variant="secondary" size="sm" iconLeft={SlidersHorizontal} onClick={() => setCurriculumEditor({ course: c, year: y.year, key })}>Curriculum{count > 0 ? ` · ${count}` : ''}</Button>
                    })()}
                    {(() => {
                      const key = `${uni.id}:${y.year}:${c.id}`
                      const count = schedules[key]?.length ?? 0
                      return <Button className="flex-1 sm:flex-none" variant="secondary" size="sm" iconLeft={CalendarDays} onClick={() => setScheduleEditor({ course: c, year: y.year, key })}>Schedule{count > 0 ? ` · ${count}` : ''}</Button>
                    })()}
                    <button
                      onClick={() => removeCourse(i, c.id)}
                      className="grid size-11 place-items-center rounded-lg text-ink-3 transition-opacity hover:bg-danger-tint hover:text-danger sm:size-10 sm:opacity-0 sm:focus:opacity-100 sm:group-hover:opacity-100"
                      aria-label="Remove module"
                    >
                      <Icon icon={Trash2} size={15} />
                    </button>
                  </li>
                ))}
                {y.courses.length === 0 && (
                  <li className="px-4 py-3 text-[13px] text-ink-3">No modules yet.</li>
                )}
              </ul>
            </Panel>
          ))}
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
    </PageContainer>
  )
}
