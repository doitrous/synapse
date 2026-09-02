import type { ReactNode, ThHTMLAttributes, TdHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  const t = useT()
  return (
    <div className="max-w-full overflow-x-auto overscroll-x-contain" role="region" aria-label={t('Scrollable data table')} tabIndex={0}>
      <table className={cn('w-full border-collapse text-[13.5px]', className)}>{children}</table>
    </div>
  )
}

/**
 * Where a cell's content sits, in reading order rather than on the screen.
 *
 * `end` is the trailing edge: physically right in English, physically left in
 * Arabic. The prop was once `left`/`right`, which meant every numeric column in
 * the app stayed pinned to the physical right in Arabic — jammed against the
 * label column instead of hanging off the outer edge, so a table of figures
 * read as though the columns had been shuffled.
 *
 * `center` has no direction and is spelled the same either way.
 */
export type CellAlign = 'start' | 'end' | 'center'

const ALIGN: Record<CellAlign, string> = {
  start: 'text-start',
  end: 'text-end',
  center: 'text-center',
}

/**
 * `align` is ours, not the HTML attribute.
 *
 * `ThHTMLAttributes` still carries the deprecated presentational `align`, typed
 * `left | center | right | justify | char`. Intersecting rather than omitting it
 * silently narrows this prop to their overlap — which is how the physical names
 * ended up here in the first place: `left`/`right` were the only values the
 * intersection permitted, so the component's API was being dictated by an
 * attribute from HTML 4 that it never renders.
 */
type CellProps<T> = Omit<T, 'align'> & { align?: CellAlign }

export function Th({
  children,
  className,
  align = 'start',
  ...props
}: CellProps<ThHTMLAttributes<HTMLTableCellElement>>) {
  return (
    <th
      className={cn(
        'border-b border-line px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3',
        // Always emitted: a `th` defaults to centred, so start alignment has to
        // be stated rather than left to the browser the way a `td` can be.
        ALIGN[align],
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
  align = 'start',
  ...props
}: CellProps<TdHTMLAttributes<HTMLTableCellElement>>) {
  return (
    <td
      className={cn(
        'border-b border-line px-3 py-3 text-ink',
        ALIGN[align],
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
