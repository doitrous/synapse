import { getSubject } from '@/data/student'
import { SystemBadge } from '@/components/ui/SystemBadge'
import { cn } from '@/lib/cn'

/**
 * The unified system marker. Historically a coloured dot; now a premium monogram
 * tile (SystemBadge) so every "system" reads the same across admin and student
 * views. Kept under the old name/signature so all call sites upgrade at once.
 */
export function SubjectDot({ id, className }: { id: string; className?: string }) {
  return <SystemBadge short={getSubject(id).short} size="sm" className={className} />
}

export function SubjectTag({ id, className }: { id: string; className?: string }) {
  const s = getSubject(id)
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-2', className)}>
      <SystemBadge short={s.short} size="sm" />
      {s.name}
    </span>
  )
}
