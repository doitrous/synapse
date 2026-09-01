import { useMemo, useState } from 'react'
import { Pin, X } from 'lucide-react'
import { Field, Select, SearchInput } from '@/components/ui/Field'
import { DateField } from '@/components/ui/DateTimeField'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'
import { useQotdPins } from '@/lib/useQotdPins'
import { cohortKey, qotdDateInCairo } from '@/data/qotdCohort'

/**
 * Admin override for the Question of the Day selector.
 *
 * Auto-selection (deterministic, cohort-seeded) is the default for every
 * cohort on every date; this panel only records exceptions into the shared
 * `nishany-qotd-pins-v1` document — `cohortKey → isoDate → questionId` — which
 * both the demo selector and `GET /api/qotd/today` check first.
 */
export function QotdPinPanel() {
  const [universities] = useUniversityCatalogue()
  const questions = usePublishedQuestions()
  const { pins, setPin, clearPin } = useQotdPins()

  const [universityId, setUniversityId] = useState(universities[0]?.id ?? '')
  const university = universities.find((u) => u.id === universityId) ?? universities[0]
  const [year, setYear] = useState(university?.years[0]?.year ?? '')
  const [isoDate, setIsoDate] = useState(() => qotdDateInCairo(new Date()))
  const [search, setSearch] = useState('')
  const [questionId, setQuestionId] = useState('')

  const activeUniversity = universities.find((u) => u.id === universityId) ?? university
  const years = activeUniversity?.years ?? []
  const activeYear = year || years[0]?.year || ''

  const questionById = useMemo(() => new Map(questions.map((q) => [q.id, q])), [questions])

  const matches = useMemo(() => {
    const term = search.trim().toLowerCase()
    const pool = term
      ? questions.filter((q) => q.stem.toLowerCase().includes(term) || q.topic.toLowerCase().includes(term))
      : questions
    return pool.slice(0, 25)
  }, [questions, search])

  const universityShort = (id: string) => universities.find((u) => u.id === id)?.short ?? id

  const pinRows = useMemo(() => {
    const rows: { cohort: string; universityId: string; year: string; isoDate: string; questionId: string }[] = []
    for (const [cohort, byDate] of Object.entries(pins)) {
      const [uniId, yearLabel] = cohort.split('|')
      for (const [date, qid] of Object.entries(byDate)) {
        rows.push({ cohort, universityId: uniId ?? cohort, year: yearLabel ?? '', isoDate: date, questionId: qid })
      }
    }
    return rows.sort((a, b) => (a.isoDate < b.isoDate ? 1 : a.isoDate > b.isoDate ? -1 : 0))
  }, [pins])

  const canPin = Boolean(universityId && activeYear && isoDate && questionId)

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-5">
      <div>
        <h2 className="text-[15px] font-semibold text-ink">Question of the Day — admin override</h2>
        <p className="mt-1 text-[12.5px] text-ink-2">
          Every cohort gets a deterministic daily pick automatically. Pin a specific published question for a
          cohort and date to override it — the pin wins over the auto-selected question.
        </p>
      </div>

      <div className="rounded-lg border border-line bg-surface p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="University" htmlFor="qotd-pin-university">
            <Select
              id="qotd-pin-university"
              value={universityId}
              onChange={(event) => {
                const nextId = event.target.value
                setUniversityId(nextId)
                const nextUni = universities.find((u) => u.id === nextId)
                setYear(nextUni?.years[0]?.year ?? '')
              }}
            >
              {universities.map((u) => (
                <option key={u.id} value={u.id}>{u.short}</option>
              ))}
            </Select>
          </Field>

          <Field label="Year" htmlFor="qotd-pin-year">
            <Select id="qotd-pin-year" value={activeYear} onChange={(event) => setYear(event.target.value)}>
              {years.map((yr) => (
                <option key={yr.id} value={yr.year}>{yr.year}</option>
              ))}
            </Select>
          </Field>

          <Field label="Date">
            <DateField value={isoDate} onChange={setIsoDate} />
          </Field>
        </div>

        <Field label="Question" className="mt-3" hint={`${matches.length} of ${questions.length} published question${questions.length === 1 ? '' : 's'} shown`}>
          <SearchInput
            placeholder="Search by stem or topic…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </Field>

        <ul className="mt-2 max-h-56 space-y-1 overflow-y-auto rounded-md border border-line bg-surface-2/40 p-1.5">
          {matches.length === 0 && (
            <li className="px-2 py-3 text-center text-[12.5px] text-ink-3">No published questions match.</li>
          )}
          {matches.map((q) => {
            const active = q.id === questionId
            return (
              <li key={q.id}>
                <button
                  type="button"
                  onClick={() => setQuestionId(q.id)}
                  aria-pressed={active}
                  className={cn(
                    'flex w-full flex-col gap-0.5 rounded-md px-2.5 py-1.5 text-start',
                    active ? 'bg-primary-tint text-primary-strong' : 'hover:bg-inset',
                  )}
                >
                  <span className="truncate text-[12.5px] font-medium text-ink">{q.stem || '(untitled question)'}</span>
                  <span className="truncate text-[11px] text-ink-3">{q.topic} · {q.id}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-3 flex items-center justify-end">
          <button
            type="button"
            disabled={!canPin}
            onClick={() => setPin(cohortKey({ universityId, year: activeYear }), isoDate, questionId)}
            className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3.5 text-[12.5px] font-semibold text-on-primary transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon icon={Pin} size={14} />
            Pin for {universityShort(universityId)} · {activeYear || '—'} · {isoDate}
          </button>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">
          Current pins {pinRows.length > 0 && `(${pinRows.length})`}
        </h3>
        {pinRows.length === 0 ? (
          <p className="rounded-md border border-dashed border-line px-3 py-4 text-center text-[12.5px] text-ink-3">
            No pins set — every cohort is on its automatic daily pick.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {pinRows.map((row) => {
              const question = questionById.get(row.questionId)
              return (
                <li
                  key={`${row.cohort}-${row.isoDate}`}
                  className="flex items-center gap-3 rounded-md border border-line bg-surface px-3 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-medium text-ink">
                      {universityShort(row.universityId)} · {row.year} · {row.isoDate}
                    </p>
                    <p className="truncate text-[11.5px] text-ink-3">
                      {question ? question.stem : `${row.questionId} (not currently published)`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => clearPin(row.cohort, row.isoDate)}
                    aria-label={`Clear pin for ${row.universityId} ${row.year} on ${row.isoDate}`}
                    className="grid size-8 shrink-0 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink"
                  >
                    <Icon icon={X} size={15} />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
