import { useMemo, useState } from 'react'
import { Check, Plus, Trash2, X } from 'lucide-react'
import type { UniYear, University } from '@/data/universities'
import type { CurriculumCourse } from '@/data/universities'
import { curriculumCount } from '@/data/courseCurriculum'
import {
  DEFAULT_TERM, EXAM_BUCKETS, EXAM_KINDS, EXAM_SITTINGS, bucketTotals, formatShare, isInternshipYear,
  curriculumOfTree, descendantCount, moduleKey, moduleTotal, newModuleSubject, normaliseMark,
  programmeShareOf, share, subjectTotal, termTotal, yearTotal,
  type ExamMarks, type ModuleSubject, type ModuleSubjectStore,
} from '@/data/moduleSubjects'
import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { SystemMark } from '@/components/ui/SystemMark'
import { cn } from '@/lib/cn'

/**
 * What a module examines, and what each part of it is worth.
 *
 * Marks are the only numbers typed here. Every percentage on the screen is
 * derived from them as they are entered, so the consequence of a number is
 * visible in the same place the number is — including the module's share of its
 * term, its year and the degree, which is the figure this whole surface exists
 * to make answerable.
 */

/** Enough distinct tints to read a stacked bar; it wraps for a very long list. */
const BAND = [
  'var(--color-accent)',
  'color-mix(in oklab, var(--color-accent) 62%, white)',
  'color-mix(in oklab, var(--color-accent) 38%, white)',
  'color-mix(in oklab, var(--color-accent) 80%, black)',
  'color-mix(in oklab, var(--color-accent) 20%, white)',
]

function MarkInput({ value, onChange, label }: { value: number; onChange: (next: number) => void; label: string }) {
  return (
    <TextInput
      type="number"
      min={0}
      step={1}
      inputMode="numeric"
      aria-label={label}
      value={value === 0 ? '' : String(value)}
      onChange={(event) => onChange(normaliseMark(event.target.value))}
      placeholder="0"
      className="tnum h-9 text-center font-mono"
    />
  )
}

function SubjectBlock({ subject, index, total, onPatch, onRemove }: {
  subject: ModuleSubject
  index: number
  total: number
  onPatch: (next: ModuleSubject) => void
  onRemove: () => void
}) {
  const [confirming, setConfirming] = useState(false)
  const own = subjectTotal(subject)
  // What would be detached counts the whole branch, not just this subject's own
  // list: removing Anatomy removes Basis of Anatomy with it.
  const attached = curriculumCount(curriculumOfTree(subject))
  const branches = descendantCount(subject)

  const setMark = (key: keyof ExamMarks, next: number) =>
    onPatch({ ...subject, marks: { ...subject.marks, [key]: next } })

  return (
    <li className="px-5 py-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="size-3 shrink-0 rounded-sm" style={{ background: BAND[index % BAND.length] }} aria-hidden />
        <TextInput
          value={subject.name}
          onChange={(event) => onPatch({ ...subject, name: event.target.value })}
          placeholder="Subject name"
          aria-label={`Subject ${index + 1} name`}
          className="h-9 min-w-0 flex-1 sm:max-w-xs"
        />
        {branches > 0 && (
          <span className="rounded-full border border-line bg-inset px-2 py-0.5 text-[10.5px] font-medium text-ink-3" title="Marks stay on the module's own subjects; the subjects beneath this one organise what it covers">
            {branches} {branches === 1 ? 'sub-subject' : 'sub-subjects'}
          </span>
        )}
        <span className="tnum ms-auto font-mono text-[12.5px] text-ink-2">
          {own} {own === 1 ? 'mark' : 'marks'}
        </span>
        <span className="tnum w-20 text-end font-mono text-[12.5px] font-semibold text-accent-strong">
          {formatShare(share(own, total))}
        </span>
        <button
          type="button"
          onClick={() => (attached > 0 ? setConfirming(true) : onRemove())}
          className="grid size-9 place-items-center rounded-lg text-ink-3 hover:bg-danger-tint hover:text-danger"
          aria-label={`Remove ${subject.name || 'subject'}`}
        >
          <Icon icon={Trash2} size={15} />
        </button>
      </div>

      {confirming && (
        <div className="mt-2.5 flex flex-wrap items-center gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3 py-2 text-[12.5px] text-ink-2">
          <span>
            Remove <strong className="text-ink">{subject.name || 'this subject'}</strong>? {attached}{' '}
            {attached === 1 ? 'chosen item' : 'chosen items'} would be detached from the module.
          </span>
          <span className="ms-auto flex gap-1.5">
            <Button type="button" variant="ghost" size="sm" onClick={() => setConfirming(false)}>Keep</Button>
            <Button type="button" variant="danger" size="sm" onClick={onRemove}>Remove</Button>
          </span>
        </div>
      )}

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[22rem] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="pb-1.5 text-start text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Exam</th>
              {EXAM_SITTINGS.map((sitting) => (
                <th key={sitting} className="pb-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{sitting}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EXAM_KINDS.map((kind) => (
              <tr key={kind}>
                <td className="py-1 pe-3 text-[12.5px] font-medium text-ink-2">{kind}</td>
                {EXAM_SITTINGS.map((sitting) => {
                  const bucket = EXAM_BUCKETS.find((entry) => entry.exam === kind && entry.when === sitting)!
                  return (
                    <td key={sitting} className="w-28 px-1 py-1">
                      <MarkInput
                        value={subject.marks[bucket.key]}
                        onChange={(next) => setMark(bucket.key, next)}
                        label={`${subject.name || `Subject ${index + 1}`} — ${bucket.label}`}
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </li>
  )
}

export function ModuleSubjectsDialog({ university, year, course, store, onClose, onSave }: {
  university: University
  year: UniYear
  course: CurriculumCourse
  store: ModuleSubjectStore
  onClose: () => void
  onSave: (subjects: ModuleSubject[]) => void
}) {
  const key = moduleKey(university.id, year.id, course.id)
  const [draft, setDraft] = useState<ModuleSubject[]>(() => structuredClone(store[key] ?? []))

  const total = moduleTotal(draft)
  const split = bucketTotals(draft)

  // The rollups read a catalogue in which this module already carries the draft,
  // so the strip below answers "if I save this" rather than "as it was saved".
  const outsideProgramme = isInternshipYear(year)
  const context = useMemo(() => {
    const projected: ModuleSubjectStore = { ...store, [key]: draft }
    const term = course.term || DEFAULT_TERM
    return {
      term,
      termShare: share(total, termTotal(university, year, term, projected)),
      yearShare: share(total, yearTotal(university, year, projected)),
      programmeShare: programmeShareOf(university, year, total, projected),
    }
  }, [course.term, draft, key, outsideProgramme, store, total, university, year])

  const patch = (index: number, next: ModuleSubject) =>
    setDraft((current) => current.map((entry, i) => (i === index ? next : entry)))

  const remove = (index: number) => setDraft((current) => current.filter((_, i) => i !== index))

  return (
    <Dialog onClose={onClose} label={`Marks and exams for ${course.name}`} size="xl">
      <div className="sticky top-0 z-10 border-b border-line bg-surface px-5 py-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <SystemMark moduleId={course.moduleId ?? course.name} />
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-serif text-[17px] font-semibold text-ink">{course.name}</h2>
            <p className="text-[12px] text-ink-3">{year.year} · {course.term || DEFAULT_TERM} · marks and exams</p>
          </div>
          <span className="tnum rounded-md border border-accent-line bg-accent-tint px-2.5 py-1 font-mono text-[13px] font-bold text-accent-strong">
            {total} {total === 1 ? 'mark' : 'marks'}
          </span>
        </div>
      </div>

      <ul className="divide-y divide-line">
        {draft.map((subject, index) => (
          <SubjectBlock
            key={subject.id}
            subject={subject}
            index={index}
            total={total}
            onPatch={(next) => patch(index, next)}
            onRemove={() => remove(index)}
          />
        ))}
        {draft.length === 0 && (
          <li className="px-5 py-8 text-center">
            <p className="text-[13px] text-ink-2">No subjects yet.</p>
            <p className="mt-1 text-[12.5px] text-ink-3">
              Name the disciplines this module examines — Anatomy, Physiology, Pathology — then give each one its marks.
            </p>
          </li>
        )}
      </ul>

      <div className="border-t border-line px-5 py-3">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          iconLeft={Plus}
          onClick={() => setDraft((current) => [...current, newModuleSubject('')])}
        >
          Add subject
        </Button>
      </div>

      {total > 0 && (
        <div className="space-y-3 border-t border-line bg-surface-2/50 px-5 py-4">
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">How the module divides</p>
            <div className="flex h-3 w-full overflow-hidden rounded-full border border-line bg-inset" role="img" aria-label="Share of the module by subject">
              {draft.map((subject, index) => {
                const value = share(subjectTotal(subject), total) ?? 0
                if (value <= 0) return null
                return (
                  <span
                    key={subject.id}
                    style={{ width: `${value}%`, background: BAND[index % BAND.length] }}
                    title={`${subject.name || `Subject ${index + 1}`} — ${value.toFixed(1)}%`}
                  />
                )
              })}
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {draft.map((subject, index) => (
                <li key={subject.id} className="flex items-center gap-1.5 text-[11.5px] text-ink-2">
                  <span className="size-2.5 rounded-sm" style={{ background: BAND[index % BAND.length] }} aria-hidden />
                  {subject.name || `Subject ${index + 1}`}
                  <span className="tnum font-mono text-ink-3">{formatShare(share(subjectTotal(subject), total))}</span>
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid gap-2 sm:grid-cols-3">
            {[
              { label: `of ${context.term}`, value: context.termShare, note: undefined as string | undefined },
              { label: `of ${year.year}`, value: context.yearShare, note: undefined as string | undefined },
              {
                label: 'of the programme',
                value: context.programmeShare,
                note: outsideProgramme ? 'Internship sits outside the degree' : undefined,
              },
            ].map((entry) => (
              <div key={entry.label} className="rounded-lg border border-line bg-surface px-3 py-2">
                <dt className="text-[11.5px] text-ink-3">This module {entry.label}</dt>
                <dd className="tnum mt-0.5 font-mono text-[15px] font-semibold text-ink">
                  {entry.note ? <span className="font-sans text-[12px] font-normal text-ink-3">{entry.note}</span> : formatShare(entry.value)}
                </dd>
              </div>
            ))}
          </dl>

          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">Where the marks are sat</p>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {EXAM_BUCKETS.map((bucket) => (
                <li key={bucket.key} className="flex items-baseline gap-2 text-[12.5px] text-ink-2">
                  <span className="flex-1 truncate">{bucket.label}</span>
                  <span className="tnum font-mono text-ink">{split[bucket.key]}</span>
                  <span className="tnum w-16 text-end font-mono text-[11.5px] text-ink-3">{formatShare(share(split[bucket.key], total))}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className={cn('flex items-center gap-2 border-t border-line px-5 py-3.5')}>
        <p className="min-w-0 flex-1 text-[12px] text-ink-3">
          {total === 0 ? 'This module carries no marks yet, so it reports as a gap.' : 'Percentages are derived from the marks above.'}
        </p>
        <Button type="button" variant="ghost" onClick={onClose} iconLeft={X}>Cancel</Button>
        <Button
          type="button"
          variant="primary"
          iconLeft={Check}
          onClick={() => onSave(draft.filter((subject) => subject.name.trim().length > 0 || subjectTotal(subject) > 0))}
        >
          Save
        </Button>
      </div>
    </Dialog>
  )
}
