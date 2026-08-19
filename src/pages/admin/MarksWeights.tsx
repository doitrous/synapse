import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ChevronRight, GraduationCap, Scale } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { SystemMark } from '@/components/ui/SystemMark'
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { defaultModuleId, type UniYear, type University } from '@/data/universities'
import {
  EXAM_BUCKETS, MODULE_SUBJECTS_STORAGE_KEY, bucketTotals, formatShare, isInternshipYear,
  moduleKey, moduleTotal, modulesWithoutMarks, programmeTotal, share, subjectTotal, termCourses, termsOf,
  yearTotal, type ModuleSubjectStore,
} from '@/data/moduleSubjects'

/**
 * What every module is worth, against its term, its year, and the degree.
 *
 * Read-only on purpose. Marks are entered in one place — the module's Marks &
 * Exams dialog — so a number cannot be changed from two screens and disagree
 * with itself. Every module row here links back to the one place it is edited.
 */

/** A cell that prints a share, or the honest blank where there is nothing to divide by. */
function Share({ value }: { value: number | null }) {
  return (
    <td className={cn('tnum px-3 py-2 text-end font-mono text-[12px]', value === null ? 'text-ink-3' : 'text-ink-2')}>
      {formatShare(value)}
    </td>
  )
}

function Marks({ value, strong }: { value: number; strong?: boolean }) {
  return (
    <td className={cn('tnum px-3 py-2 text-end font-mono text-[12.5px]', strong ? 'font-semibold text-ink' : 'text-ink-2')}>
      {value === 0 ? <span className="text-ink-3">not set</span> : value}
    </td>
  )
}

function YearSection({ university, year, store, programme }: {
  university: University
  year: UniYear
  store: ModuleSubjectStore
  programme: number
}) {
  const [openModules, setOpenModules] = useState<string[]>([])
  const total = yearTotal(university, year, store)
  const internship = isInternshipYear(year)

  return (
    <Panel className="overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
        <h3 className="font-serif text-[15.5px] font-semibold text-ink">{year.year}</h3>
        <span className="rounded-md border border-accent-line bg-accent-tint px-2 py-0.5 font-mono text-[10.5px] font-bold text-accent-strong">{year.id}</span>
        {internship && (
          <span className="rounded-md border border-line-2 bg-inset px-2 py-0.5 text-[10.5px] font-semibold text-ink-2" title="Sits outside the degree, so it is excluded from every programme figure">
            Outside the programme
          </span>
        )}
        <span className="ms-auto tnum font-mono text-[12.5px] text-ink-2">
          {total === 0 ? 'no marks set' : `${total} marks`}
          {!internship && programme > 0 && <span className="ms-2 text-ink-3">{formatShare(share(total, programme))} of the programme</span>}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[46rem] border-collapse">
          <thead>
            <tr className="border-b border-line bg-surface-2/50 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">
              <th className="px-4 py-2 text-start">Term / module / subject</th>
              <th className="px-3 py-2 text-end">Marks</th>
              <th className="px-3 py-2 text-end">of module</th>
              <th className="px-3 py-2 text-end">of term</th>
              <th className="px-3 py-2 text-end">of year</th>
              <th className="px-3 py-2 text-end">of programme</th>
            </tr>
          </thead>
          <tbody>
            {termsOf(year).map((term) => {
              const courses = termCourses(year, term)
              const termMarks = courses.reduce((sum, course) => sum + moduleTotal(store[moduleKey(university.id, year.id, course.id)] ?? []), 0)
              return (
                <Fragment key={`term-${term}`}>
                  <tr className="border-b border-line bg-inset/45">
                    <td className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-2">{term}</td>
                    <Marks value={termMarks} strong />
                    <td className="px-3 py-1.5 text-end text-[12px] text-ink-3">—</td>
                    <td className="px-3 py-1.5 text-end text-[12px] text-ink-3">—</td>
                    <Share value={share(termMarks, total)} />
                    <Share value={internship ? null : share(termMarks, programme)} />
                  </tr>

                  {courses.map((course) => {
                    const subjects = store[moduleKey(university.id, year.id, course.id)] ?? []
                    const marks = moduleTotal(subjects)
                    const open = openModules.includes(course.id)
                    return (
                      <Fragment key={course.id}>
                        <tr className="border-b border-line hover:bg-inset/40">
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setOpenModules((current) => current.includes(course.id) ? current.filter((id) => id !== course.id) : [...current, course.id])}
                                className="grid size-6 shrink-0 place-items-center rounded text-ink-3 hover:text-ink"
                                aria-label={open ? `Hide subjects of ${course.name}` : `Show subjects of ${course.name}`}
                                aria-expanded={open}
                              >
                                <Icon icon={ChevronRight} size={13} className={cn('transition-transform', open && 'rotate-90')} />
                              </button>
                              <SystemMark moduleId={course.moduleId ?? defaultModuleId(course.name, year.courses.indexOf(course) + 1)} size="sm" />
                              <Link to="/admin/academic" className="min-w-0 truncate text-[13px] font-medium text-ink hover:text-accent-strong" title="Edit this module's marks in Academic Setup">
                                {course.name}
                              </Link>
                              <span className="shrink-0 text-[11px] text-ink-3">{subjects.length} {subjects.length === 1 ? 'subject' : 'subjects'}</span>
                            </div>
                          </td>
                          <Marks value={marks} strong />
                          <td className="px-3 py-2 text-end text-[12px] text-ink-3">—</td>
                          <Share value={share(marks, termMarks)} />
                          <Share value={share(marks, total)} />
                          <Share value={internship ? null : share(marks, programme)} />
                        </tr>

                        {open && subjects.map((subject) => {
                          const own = subjectTotal(subject)
                          return (
                            <tr key={subject.id} className="border-b border-line bg-surface-2/30">
                              <td className="py-1.5 ps-16 pe-4 text-[12.5px] text-ink-2">{subject.name || 'Unnamed subject'}</td>
                              <Marks value={own} />
                              <Share value={share(own, marks)} />
                              <Share value={share(own, termMarks)} />
                              <Share value={share(own, total)} />
                              <Share value={internship ? null : share(own, programme)} />
                            </tr>
                          )
                        })}
                        {open && subjects.length === 0 && (
                          <tr className="border-b border-line bg-surface-2/30">
                            <td colSpan={6} className="py-2 ps-16 pe-4 text-[12px] text-ink-3">No subjects yet. Open this module in Academic Setup to name them.</td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  })}

                  {courses.length === 0 && (
                    <tr className="border-b border-line">
                      <td colSpan={6} className="px-4 py-2 text-[12px] text-ink-3">No modules in this term.</td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

export function MarksWeights() {
  const [universities] = useUniversityCatalogue()
  const [store] = usePersistentState<ModuleSubjectStore>(MODULE_SUBJECTS_STORAGE_KEY, {})
  const [selectedId, setSelectedId] = useState('')

  const university = universities.find((candidate) => candidate.id === selectedId) ?? universities[0]

  const gaps = useMemo(() => (university ? modulesWithoutMarks(university, store) : []), [store, university])
  const programme = university ? programmeTotal(university, store) : 0

  const split = useMemo(() => {
    if (!university) return null
    const all = university.years
      .filter((year) => !isInternshipYear(year))
      .flatMap((year) => year.courses.flatMap((course) => store[moduleKey(university.id, year.id, course.id)] ?? []))
    return bucketTotals(all)
  }, [store, university])

  if (!university) {
    return (
      <PageContainer>
        <PageHeader title="Marks & weights" description="What every module is worth, against its term, its year, and the whole degree." />
        <Panel className="p-8 text-center">
          <p className="text-[13.5px] font-medium text-ink">No universities yet</p>
          <p className="mt-1 text-[12.5px] text-ink-3">Add one in Academic Setup, then come back to see how its marks divide.</p>
          <Link to="/admin/academic" className="mt-4 inline-block"><Button variant="primary" size="sm" iconLeft={GraduationCap}>Open Academic Setup</Button></Link>
        </Panel>
      </PageContainer>
    )
  }

  const programmeYearCount = university.years.filter((year) => !isInternshipYear(year)).length
  const internshipYears = university.years.filter(isInternshipYear)

  return (
    <PageContainer>
      <PageHeader
        title="Marks & weights"
        description="What every module is worth, against its term, its year, and the whole degree. Marks are entered in each module's Marks & Exams dialog; everything here is derived from them."
        actions={
          <>
            <Select aria-label="University" value={university.id} onChange={(event) => setSelectedId(event.target.value)} className="w-56">
              {universities.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name}</option>)}
            </Select>
            <Link to="/admin/academic"><Button variant="secondary" size="md" iconLeft={GraduationCap}>Academic Setup</Button></Link>
          </>
        }
      />

      {gaps.length > 0 && (
        <Panel className="mb-4 border-warning/30 bg-warning-tint p-4">
          <div className="flex gap-3">
            <Icon icon={AlertTriangle} size={17} className="mt-0.5 shrink-0 text-warning" />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-ink">
                {gaps.length} {gaps.length === 1 ? 'module has' : 'modules have'} no mark scheme
              </p>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-2">
                They contribute nothing, so every percentage below is a share of what has been entered so far — not of the finished curriculum.
              </p>
              <p className="mt-1.5 text-[12px] text-ink-3">
                {gaps.slice(0, 12).map((gap) => `${gap.year.year} · ${gap.course.name}`).join('  ·  ')}
                {gaps.length > 12 && `  ·  and ${gaps.length - 12} more`}
              </p>
            </div>
          </div>
        </Panel>
      )}

      <Panel className="mb-4 p-4">
        <PanelHeader title="The programme" icon={Scale} hint={`${programmeYearCount} ${programmeYearCount === 1 ? 'year' : 'years'}`} />
        <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <p className="tnum font-mono text-[22px] font-semibold text-ink">
            {programme === 0 ? <span className="text-[15px] text-ink-3">No marks entered yet</span> : `${programme} marks`}
          </p>
          <p className="text-[12px] text-ink-3">Internship years are excluded — they sit outside the degree.</p>
        </div>
        {split && programme > 0 && (
          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {EXAM_BUCKETS.map((bucket) => (
              <li key={bucket.key} className="flex items-baseline gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-[12.5px] text-ink-2">
                <span className="min-w-0 flex-1 truncate">{bucket.label}</span>
                <span className="tnum font-mono text-ink">{split[bucket.key]}</span>
                <span className="tnum w-16 text-end font-mono text-[11.5px] text-ink-3">{formatShare(share(split[bucket.key], programme))}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <div className="space-y-4">
        {university.years.filter((year) => !isInternshipYear(year)).map((year) => (
          <YearSection key={year.id} university={university} year={year} store={store} programme={programme} />
        ))}
      </div>

      {internshipYears.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-[16px] font-semibold text-ink">Outside the programme</h2>
            <p className="text-[12px] text-ink-3">Internship years, reported on their own and excluded from every figure above.</p>
          </div>
          {internshipYears.map((year) => (
            <YearSection key={year.id} university={university} year={year} store={store} programme={programme} />
          ))}
        </div>
      )}
    </PageContainer>
  )
}
