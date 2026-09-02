import type { ReactNode } from 'react'
import { SystemMark } from '@/components/ui/SystemMark'
import { useSubjectName } from '@/lib/useSubjectName'

/**
 * One item of a bank, on a line.
 *
 * The same row serves the flagged list, the missed list and the preview of what
 * a test will draw from, because they are the same thing seen three times — a
 * title, the system it belongs to, when it was last touched, and one control at
 * the end. Written once so the three cannot drift apart.
 */
export function BankItemRow({
  title,
  subjectId,
  kindLabel,
  meta,
  action,
}: {
  title: string
  /** The system it belongs to. Omitted for an item whose bank is not loaded here. */
  subjectId?: string
  /** What kind of item it is — a station, a case, an essay. */
  kindLabel?: string
  /** When it was flagged, or last worked on. Plain words, already formatted. */
  meta?: string
  /** The control at the end of the row: flag, unflag, nothing. */
  action?: ReactNode
}) {
  const subjectName = useSubjectName()
  return (
    <li className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-medium text-ink">{title}</p>
        <p className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] text-ink-3">
          {subjectId && (
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <SystemMark subjectId={subjectId} size="sm" />
              <span className="truncate">{subjectName(subjectId)}</span>
            </span>
          )}
          {kindLabel && (
            <>
              {subjectId && <span aria-hidden>·</span>}
              <span>{kindLabel}</span>
            </>
          )}
          {meta && (
            <>
              {(subjectId || kindLabel) && <span aria-hidden>·</span>}
              <span>{meta}</span>
            </>
          )}
        </p>
      </div>
      {action}
    </li>
  )
}

/** A short, scrollable list of rows inside a panel or a step. */
export function BankItemRows({ children, label }: { children: ReactNode; label: string }) {
  return (
    <ul aria-label={label} className="max-h-72 divide-y divide-line overflow-y-auto rounded-lg border border-line bg-surface">
      {children}
    </ul>
  )
}

/** Nothing in this list, said in words rather than as an empty box. */
export function BankItemsEmpty({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-line bg-surface-2/40 px-4 py-6 text-center text-[12.5px] leading-relaxed text-ink-3">
      {children}
    </p>
  )
}
