import { cloneElement, isValidElement, useId, useState, type ReactElement, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type TriggerElement = ReactElement<{
  'aria-describedby'?: string
  onBlur?: React.FocusEventHandler<HTMLElement>
  onFocus?: React.FocusEventHandler<HTMLElement>
  onMouseEnter?: React.MouseEventHandler<HTMLElement>
  onMouseLeave?: React.MouseEventHandler<HTMLElement>
  onTouchStart?: React.TouchEventHandler<HTMLElement>
}>

export function Tooltip({
  label,
  children,
  className,
}: {
  label: ReactNode
  children: TriggerElement
  className?: string
}) {
  const id = useId()
  const [open, setOpen] = useState(false)

  if (!label || !isValidElement(children)) return children

  const child = children as TriggerElement
  const describedBy = [child.props['aria-describedby'], id].filter(Boolean).join(' ') || undefined
  const close = () => setOpen(false)

  return (
    <span
      className={cn('relative inline-flex', className)}
      onTouchStart={(event) => {
        event.stopPropagation()
        setOpen((current) => !current)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') close()
      }}
    >
      {cloneElement(child, {
        'aria-describedby': describedBy,
        onFocus: (event) => {
          child.props.onFocus?.(event)
          setOpen(true)
        },
        onBlur: (event) => {
          child.props.onBlur?.(event)
          close()
        },
        onMouseEnter: (event) => {
          child.props.onMouseEnter?.(event)
          setOpen(true)
        },
        onMouseLeave: (event) => {
          child.props.onMouseLeave?.(event)
          close()
        },
      })}
      <span id={id} role="tooltip" className={cn('pointer-events-none absolute bottom-[calc(100%+0.45rem)] left-1/2 z-50 max-w-64 -translate-x-1/2 rounded-lg border border-line bg-ink px-2.5 py-1.5 text-center text-[11.5px] font-medium leading-snug text-paper shadow-pop transition-opacity', open ? 'opacity-100' : 'opacity-0')}>
        {label}
      </span>
    </span>
  )
}
