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
  onClick,
}: {
  children: ReactNode
  hover?: boolean
  className?: string
  /**
   * Makes the whole row a control. A row that responds to a click has to be
   * reachable and operable without a mouse, so it takes focus and answers Enter
   * and Space the way a button does — otherwise the only way to open a record
   * would be to point at it.
   */
  onClick?: () => void
}) {
  return (
    <tr
      className={cn(hover && 'transition-colors hover:bg-inset/70', onClick && 'cursor-pointer', className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (event) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onClick() }
      } : undefined}
    >
      {children}
    </tr>
  )
}
