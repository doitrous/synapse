import { getSubject } from '@/data/subjects'
import { SystemBadge } from '@/components/ui/SystemBadge'
import { useSystemColor } from '@/data/systemColors'
import { cn } from '@/lib/cn'

/**
 * The unified system marker. Historically a coloured dot; now a premium monogram
 * tile (SystemBadge) tinted with the system's colour (editable in Subjects &
 * Topics). Kept under the old name/signature so all call sites upgrade at once.
 */
export function SubjectDot({ id, className }: { id: string; className?: string }) {
  const color = useSystemColor(id)
  return <SystemBadge short={getSubject(id).short} color={color} size="sm" className={className} />
}

export function SubjectTag({ id, className }: { id: string; className?: string }) {
  const s = getSubject(id)
  const color = useSystemColor(id)
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-2', className)}>
      <SystemBadge short={s.short} color={color} size="sm" />
      {s.name}
    </span>
  )
}
