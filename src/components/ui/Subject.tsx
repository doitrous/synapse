import { getSubject } from '@/data/subjects'
import { SystemMark } from '@/components/ui/SystemMark'
import { cn } from '@/lib/cn'

/**
 * The unified system marker. Historically a coloured dot, then a monogram tile,
 * now the spine chip that every other surface uses. Kept under the old
 * name/signature so all call sites upgrade at once.
 */
export function SubjectDot({ id, className }: { id: string; className?: string }) {
  return <SystemMark subjectId={id} size="sm" className={className} />
}

export function SubjectTag({ id, className }: { id: string; className?: string }) {
  const s = getSubject(id)
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-2', className)}>
      <SystemMark subjectId={id} size="sm" />
      {s.name}
    </span>
  )
}
