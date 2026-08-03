import { getSubject } from '@/data/student'
import { cn } from '@/lib/cn'

export function SubjectDot({ id, className }: { id: string; className?: string }) {
  const s = getSubject(id)
  return (
    <span
      className={cn('inline-block size-2 rounded-full', className)}
      style={{ backgroundColor: s.color }}
      aria-hidden
    />
  )
}

export function SubjectTag({ id, className }: { id: string; className?: string }) {
  const s = getSubject(id)
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-2', className)}>
      <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} aria-hidden />
      {s.name}
    </span>
  )
}
