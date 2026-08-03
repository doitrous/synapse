import type { ReactNode, ThHTMLAttributes, TdHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="max-w-full overflow-x-auto overscroll-x-contain" role="region" aria-label="Scrollable data table" tabIndex={0}>
      <table className={cn('w-full border-collapse text-[13.5px]', className)}>{children}</table>
    </div>
  )
}

export function Th({
  children,
  className,
  align = 'left',
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & { align?: 'left' | 'right' | 'center' }) {
  return (
    <th
      className={cn(
        'border-b border-line px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export function Td({
  children,
  className,
  align = 'left',
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & { align?: 'left' | 'right' | 'center' }) {
  return (
    <td
      className={cn(
        'border-b border-line px-3 py-3 text-ink',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
        className,
      )}
      {...props}
    >
      {children}
    </td>
  )
}

export function Tr({
  children,
  hover = false,
  className,
}: {
  children: ReactNode
  hover?: boolean
  className?: string
}) {
  return (
    <tr className={cn(hover && 'transition-colors hover:bg-inset/70', className)}>{children}</tr>
  )
}
