import { useEffect, useState } from 'react'
import { CircleAlert, CircleCheck, Flag, X } from 'lucide-react'
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
import { API_MODE, apiPost, ApiError, errorKind } from '@/lib/api'
import { invalidateEntry } from '@/lib/stateStore'
import { Button } from '@/components/ui/Button'
import { Field, Select, Textarea } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Turnstile } from '@/components/forms/Turnstile'
import { overlayPortal } from '@/lib/overlayPortal'
import { useT } from '@/lib/i18n'

export interface ReportTarget {
  kind: ReportContentKind
  id: string
  title: string
  /** Which part of the content the problem is in — a field name or slot. */
  field?: string
  /** A quote or locator that pins the problem inside that content. */
  anchor?: string
  /** A stable copy of the reported content, taken when the report was filed. */
  snapshot?: string
}

/**
 * Files a content report.
 *
 * Creation always goes through `POST /api/content-reports` in live mode: the
 * server stamps the reporter's identity, role and time itself, which is what
 * lets a student use this dialog at all — students hold no console tab and
 * would be refused by the shared `PUT /api/state` write path this used to go
 * through. `reporterRole` is accepted for source compatibility with existing
 * callers (`ControlDashboard.tsx` passes `"Admin"`) but is never sent — the
 * server's answer is the only one that counts, and asserting it here would be
 * exactly the caller's-word-for-it problem the create endpoint exists to close.
 *
 * Demo mode has no server to stamp anything, so it keeps the previous local
 * path: the report is built here and pushed straight into the shared document.
 */
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
  onSubmitted?: () => void
}) {
  const t = useT()
  const identity = useIdentity()
  const [, setReports] = usePersistentState<ContentReport[]>(REPORT_STORAGE_KEY, initialContentReports)
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')

  useEffect(() => {
    if (!open || !target) return
    setCategory(reportCategories[target.kind][0])
    setNote('')
    setSubmitted(false)
    setSubmitting(false)
    setError('')
    setTurnstileToken('')
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

  async function submit() {
    if (!target || !note.trim() || submitting) return
    setSubmitting(true)
    setError('')
    try {
      if (API_MODE) {
        await apiPost('/content-reports', {
          contentKind: target.kind,
          contentId: target.id,
          contentTitle: target.title,
          field: target.field,
          anchor: target.anchor,
          snapshot: target.snapshot,
          category,
          note: note.trim(),
          turnstileToken: turnstileToken || undefined,
        })
        // The create endpoint bypasses `usePersistentState`'s own setter (that
        // path is refused for a student), so the shared cache this dialog and
        // every reports queue read from does not yet know the report exists.
        invalidateEntry(REPORT_STORAGE_KEY)
      } else {
        // No server in demo mode: build the same shape it would have stamped
        // and push it into the local document directly. `reporterRole` stays
        // the caller's own word for who is reporting — the demo build has no
        // signed-in session distinct per surface for the server to read a real
        // role from, which is exactly why the live path above never trusts it.
        const now = new Date().toISOString()
        const report: ContentReport = {
          id: newReportId(),
          contentKind: target.kind,
          contentId: target.id,
          contentTitle: target.title,
          field: target.field,
          anchor: target.anchor,
          snapshot: target.snapshot,
          reporterRole,
          // Whoever is signed in — a report filed under an invented name is one
          // nobody reviewing it can verify or answer.
          reporterName: identity.displayName,
          reporterUserId: identity.userId,
          category,
          note: note.trim(),
          status: 'Open',
          createdAt: now,
          events: [{ at: now, actorId: identity.userId, actorName: identity.displayName, actorRole: reporterRole, action: 'created', note: note.trim() }],
        }
        setReports((current) => [report, ...current])
      }
      setSubmitted(true)
      onSubmitted?.()
    } catch (submitError) {
      const kind = errorKind(submitError)
      const messages: Record<string, string> = {
        unauthorized: t('Sign in again to file this report.'),
        forbidden: t('This account cannot file a report.'),
        network: t('Could not reach the server. Check your connection and try again.'),
        server: t('The server could not save this report. Try again.'),
      }
      setError(messages[kind] ?? (submitError instanceof ApiError ? submitError.message : t('Something went wrong. Try again.')))
    } finally {
      setSubmitting(false)
    }
  }

  return overlayPortal(
    <div className="fixed inset-0 z-[70] grid place-items-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="report-content-title">
      <button type="button" aria-label={t('Close report dialog')} className="absolute inset-0 size-full bg-ink/30 animate-fade" onClick={onClose} />
      <div className="animate-pop relative w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-pop">
        <div className="flex items-start gap-3 border-b border-line px-4 py-3.5 sm:px-5">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-danger-tint text-danger"><Icon icon={Flag} size={17} /></span>
          <div className="min-w-0 flex-1">
            <h2 id="report-content-title" className="text-[15px] font-bold text-ink">{t('Report')} {target.kind}</h2>
            <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-ink-3">{target.title}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={t('Close')} className="grid size-10 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink sm:size-8"><Icon icon={X} size={17} /></button>
        </div>

        {submitted ? (
          <div className="px-5 py-10 text-center">
            <span className="mx-auto grid size-11 place-items-center rounded-xl bg-success-tint text-success"><Icon icon={CircleCheck} size={23} /></span>
            <h3 className="mt-3 text-[16px] font-bold text-ink">{t('Report sent for review')}</h3>
            <p className="mx-auto mt-1 max-w-sm text-[13px] leading-relaxed text-ink-2">{t('The curriculum team will see your note together with the exact content you reported.')}</p>
            <Button className="mt-5" variant="primary" onClick={onClose}>{t('Done')}</Button>
          </div>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); void submit() }}>
            <div className="space-y-4 px-4 py-5 sm:px-5">
              <Field label={t('What needs attention?')} htmlFor="report-category">
                <Select id="report-category" value={category} onChange={(event) => setCategory(event.target.value)}>
                  {reportCategories[target.kind].map((option) => <option key={option}>{option}</option>)}
                </Select>
              </Field>
              <Field label={t('Add a note')} htmlFor="report-note" hint={t('Describe what you expected to see and what appears wrong. This helps reviewers reproduce the issue.')}>
                <Textarea id="report-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder={t('For example: the explanation contradicts the linked guideline…')} className="min-h-32" autoFocus />
              </Field>
              <Turnstile onToken={setTurnstileToken} />
              {error && (
                <p role="alert" className="flex items-start gap-2 rounded-lg border border-danger/25 bg-danger-tint px-3 py-2 text-[12.5px] leading-relaxed text-danger">
                  <Icon icon={CircleAlert} size={15} className="mt-0.5 shrink-0" />
                  {error}
                </p>
              )}
            </div>
            <div className="flex flex-col-reverse gap-2 border-t border-line bg-surface-2/45 px-4 py-3 sm:flex-row sm:justify-end sm:px-5">
              <Button type="button" variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
              <Button type="submit" variant="primary" iconLeft={Flag} loading={submitting} disabled={!note.trim() || submitting}>{t('Send report')}</Button>
            </div>
          </form>
        )}
      </div>
    </div>,
  )
}
