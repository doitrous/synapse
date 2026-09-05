import { useMemo, useState } from 'react'
import { Check, X } from 'lucide-react'
import type { CurriculumCourse, University } from '@/data/universities'
import { defaultModuleId } from '@/data/universities'
import { termsOf } from '@/data/moduleSubjects'
import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'

/**
 * One place a module is edited.
 *
 * Its ID, name and block were three separate click-to-edit modes on the row,
 * each with its own draft, and the ID's had a tick but no cancel and no Escape.
 * Adding the year and term made that arrangement impossible: four fields cannot
 * share a row with three action buttons at any width, which is what the row was
 * being asked to do when it wrapped into nonsense.
 *
 * Nothing is applied until Save, so a cancelled edit leaves no half-change
 * behind — which the tick-only form it replaces could not promise.
 */

export interface ModuleEditDraft {
  moduleId: string
  name: string
  block: string
  yearId: string
  term: string
  /** Credit points; undefined clears them (an unmarked module has none). */
  creditPoints?: number
}

/** Sentinel for the "name a new term" option; no real term can collide with it. */
const NEW_TERM = ' new-term'

export function ModuleEditDialog({ university, yearId, course, onClose, onSave }: {
  university: University
  yearId: string
  course: CurriculumCourse
  onClose: () => void
  onSave: (draft: ModuleEditDraft) => void
}) {
  const currentYear = university.years.find((year) => year.id === yearId)
  const fallbackId = course.moduleId ?? defaultModuleId(course.name, (currentYear?.courses.indexOf(course) ?? 0) + 1)

  const [moduleId, setModuleId] = useState(fallbackId)
  const [name, setName] = useState(course.name)
  const [block, setBlock] = useState(course.block)
  const [credit, setCredit] = useState(course.creditPoints !== undefined ? String(course.creditPoints) : '')
  const [targetYearId, setTargetYearId] = useState(yearId)
  const [termChoice, setTermChoice] = useState(course.term || termsOf(currentYear ?? { courses: [] })[0])
  const [newTerm, setNewTerm] = useState('')

  /** Every module ID in this university except this module's own. */
  const taken = useMemo(() => {
    const set = new Set<string>()
    university.years.forEach((year) => year.courses.forEach((candidate) => {
      if (candidate.id !== course.id && candidate.moduleId) set.add(candidate.moduleId.trim().toUpperCase())
    }))
    return set
  }, [course.id, university])

  const targetYear = university.years.find((year) => year.id === targetYearId)
  const targetTerms = useMemo(() => (targetYear ? termsOf(targetYear) : []), [targetYear])

  // Moving to another year re-scopes the term list, so a term that does not
  // exist there falls back to naming a new one rather than silently landing the
  // module in a term nobody chose.
  const termValue = termChoice === NEW_TERM || targetTerms.includes(termChoice) ? termChoice : NEW_TERM
  const namingTerm = termValue === NEW_TERM

  const trimmedId = moduleId.trim()
  const duplicate = trimmedId.length > 0 && taken.has(trimmedId.toUpperCase())
  const term = namingTerm ? newTerm.trim() : termChoice
  const creditRaw = credit.trim()
  const creditNumber = creditRaw === '' ? undefined : Number(creditRaw)
  const creditInvalid = creditNumber !== undefined && (!Number.isFinite(creditNumber) || creditNumber < 0)
  const valid = name.trim().length > 0 && trimmedId.length > 0 && !duplicate && term.length > 0 && !creditInvalid

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!valid) return
    onSave({ moduleId: trimmedId, name: name.trim(), block: block.trim(), yearId: targetYearId, term, creditPoints: creditNumber })
  }

  const moving = targetYearId !== yearId

  return (
    <Dialog onClose={onClose} label={`Edit ${course.name}`} size="md">
      <form onSubmit={submit}>
        <div className="border-b border-line px-5 py-4">
          <h2 className="font-serif text-[17px] font-semibold text-ink">Edit module</h2>
          <p className="mt-0.5 text-[12.5px] text-ink-3">Nothing changes until you save.</p>
        </div>

        <div className="grid gap-3.5 px-5 py-4 sm:grid-cols-2">
          <Field
            label="Module ID"
            htmlFor="module-edit-id"
            hint={duplicate ? 'Already used in this university' : 'Unique across the university'}
          >
            <TextInput
              id="module-edit-id"
              value={moduleId}
              onChange={(event) => setModuleId(event.target.value)}
              className="font-mono"
              aria-invalid={duplicate}
              autoFocus
            />
          </Field>

          <Field label="Block" htmlFor="module-edit-block" hint="Optional">
            <TextInput id="module-edit-block" value={block} onChange={(event) => setBlock(event.target.value)} placeholder="e.g. Block 3" />
          </Field>

          <Field label="Credit points" htmlFor="module-edit-credit" hint={creditInvalid ? 'Must be a positive number' : 'Optional (e.g. 10.5)'}>
            <TextInput
              id="module-edit-credit"
              type="number"
              inputMode="decimal"
              min={0}
              step="0.5"
              value={credit}
              onChange={(event) => setCredit(event.target.value)}
              aria-invalid={creditInvalid}
              placeholder="e.g. 12"
            />
          </Field>

          <Field label="Module name" htmlFor="module-edit-name" className="sm:col-span-2">
            <TextInput id="module-edit-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Module name" />
          </Field>

          <Field label="Year" htmlFor="module-edit-year" hint={moving ? 'Marks, curriculum and schedule move with it' : undefined}>
            <Select id="module-edit-year" value={targetYearId} onChange={(event) => setTargetYearId(event.target.value)}>
              {university.years.map((year) => <option key={year.id} value={year.id}>{year.year}</option>)}
            </Select>
          </Field>

          <Field label="Term" htmlFor="module-edit-term">
            <Select id="module-edit-term" value={termValue} onChange={(event) => setTermChoice(event.target.value)}>
              {targetTerms.map((option) => <option key={option} value={option}>{option}</option>)}
              <option value={NEW_TERM}>New term...</option>
            </Select>
          </Field>

          {namingTerm && (
            <Field label="New term name" htmlFor="module-edit-new-term" className="sm:col-span-2" hint="Added to the selected year">
              <TextInput id="module-edit-new-term" value={newTerm} onChange={(event) => setNewTerm(event.target.value)} placeholder="e.g. Term 3" />
            </Field>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-3.5">
          <Button type="button" variant="ghost" onClick={onClose} iconLeft={X}>Cancel</Button>
          <Button type="submit" variant="primary" iconLeft={Check} disabled={!valid}>Save</Button>
        </div>
      </form>
    </Dialog>
  )
}
