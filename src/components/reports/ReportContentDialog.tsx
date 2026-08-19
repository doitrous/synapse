import { useEffect, useState } from 'react'
import { CircleCheck, Flag, X } from 'lucide-react'
import {
  initialContentReports,
  newReportId,
  REPORT_STORAGE_KEY,
  reportCategories,
  type ContentReport,
  type ReportContentKind,
  type ReporterRole,
} from '@/data/contentReports'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { Button } from '@/components/ui/Button'
import { Field, Select, Textarea } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { overlayPortal } from '@/lib/overlayPortal'

export interface ReportTarget {
  kind: ReportContentKind
  id: string
  title: string
}

export function ReportContentDialog({
  open,
  target,
  reporterRole = 'Student',
  onClose,
  onSubmitted,
}: {
  open: boolean
  target: ReportTarget | null
  reporterRole?: ReporterRole
  onClose: () => void
  onSubmitted?: (report: ContentReport) => void
}) {
  const identity = useIdentity()
  const [, setReports] = usePersistentState<ContentReport[]>(REPORT_STORAGE_KEY, initialContentReports)
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!open || !target) return
    setCategory(reportCategories[target.kind][0])
    setNote('')
    setSubmitted(false)
  }, [open, target])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, open])

  if (!open || !target) return null

  function submit() {
    if (!target || !note.trim()) return
    const report: ContentReport = {
      id: newReportId(),
      contentKind: target.kind,
      contentId: target.id,
      contentTitle: target.title,
      reporterRole,
      // Whoever is signed in — a report filed under an invented name is one an
      // admin can neither verify nor answer.
      reporterName: reporterRole === 'Admin' ? 'Curriculum admin' : identity.displayName,
      reporterUserId: identity.userId,
      category,
      note: note.trim(),
      status: 'Open',
      createdAt: new Date().toISOString(),
    }
    setReports((current) => [report, ...current])
    setSubmitted(true)
    onSubmitted?.(report)
  }

  return overlayPortal(
    <div className="fixed inset-0 z-[70] grid place-items-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="report-content-title">
      <button type="button" aria-label="Close report dialog" className="absolute inset-0 size-full bg-ink/30 animate-fade" onClick={onClose} />
      <div className="animate-pop relative w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-pop">
        <div className="flex items-start gap-3 border-b border-line px-4 py-3.5 sm:px-5">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-danger-tint text-danger"><Icon icon={Flag} size={17} /></span>
          <div className="min-w-0 flex-1">
            <h2 id="report-content-title" className="text-[15px] font-bold text-ink">Report {target.kind}</h2>
            <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-ink-3">{target.title}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid size-10 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink sm:size-8"><Icon icon={X} size={17} /></button>
        </div>

        {submitted ? (
          <div className="px-5 py-10 text-center">
            <span className="mx-auto grid size-11 place-items-center rounded-xl bg-success-tint text-success"><Icon icon={CircleCheck} size={23} /></span>
            <h3 className="mt-3 text-[16px] font-bold text-ink">Report sent for review</h3>
            <p className="mx-auto mt-1 max-w-sm text-[13px] leading-relaxed text-ink-2">The curriculum team will see your note together with the exact content you reported.</p>
            <Button className="mt-5" variant="primary" onClick={onClose}>Done</Button>
          </div>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); submit() }}>
            <div className="space-y-4 px-4 py-5 sm:px-5">
              <Field label="What needs attention?" htmlFor="report-category">
                <Select id="report-category" value={category} onChange={(event) => setCategory(event.target.value)}>
                  {reportCategories[target.kind].map((option) => <option key={option}>{option}</option>)}
                </Select>
              </Field>
              <Field label="Add a note" htmlFor="report-note" hint="Describe what you expected to see and what appears wrong. This helps reviewers reproduce the issue.">
                <Textarea id="report-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="For example: the explanation contradicts the linked guideline…" className="min-h-32" autoFocus />
              </Field>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t border-line bg-surface-2/45 px-4 py-3 sm:flex-row sm:justify-end sm:px-5">
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="primary" iconLeft={Flag} disabled={!note.trim()}>Send report</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
