import {
  cloneElement,
  isValidElement,
  useId,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'

type Trigger = ReactElement<Record<string, unknown>>

function call<E>(handler: unknown, event: E) {
  if (typeof handler === 'function') (handler as (event: E) => void)(event)
}

export function Tooltip({
  content,
  label,
  children,
  disabled = false,
  className,
  placement = 'top',
}: {
  content?: ReactNode
  label?: ReactNode
  children: Trigger
  disabled?: boolean
  className?: string
  placement?: 'top' | 'bottom'
}) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const tooltip = content ?? label
  if (!tooltip || !isValidElement(children) || disabled) return children

  const props = children.props
  const describedBy = [open ? id : undefined, props['aria-describedby']].filter(Boolean).join(' ') || undefined

  return (
    <span className={cn('relative inline-flex min-w-0', className)}>
      {cloneElement(children, {
        'aria-describedby': describedBy,
        onPointerEnter: (event: PointerEvent) => {
          call(props.onPointerEnter, event)
          if (event.pointerType !== 'touch') setOpen(true)
        },
        onPointerLeave: (event: PointerEvent) => {
          call(props.onPointerLeave, event)
          if (event.pointerType !== 'touch') setOpen(false)
        },
        onFocus: (event: FocusEvent) => {
          call(props.onFocus, event)
          setOpen(true)
        },
        onBlur: (event: FocusEvent) => {
          call(props.onBlur, event)
          setOpen(false)
        },
        onKeyDown: (event: KeyboardEvent) => {
          call(props.onKeyDown, event)
          if (event.key === 'Escape') setOpen(false)
        },
      })}
      {open && (
        <span
          id={id}
          role="tooltip"
          className={cn(
            'pointer-events-none absolute start-1/2 z-[90] w-max max-w-[min(16rem,calc(100vw-1rem))] -translate-x-1/2 rounded-lg border border-line bg-ink px-2.5 py-1.5 text-center text-[11.5px] font-medium leading-snug text-paper shadow-pop animate-pop',
            placement === 'bottom' ? 'top-[calc(100%+0.45rem)]' : 'bottom-[calc(100%+0.45rem)]',
          )}
        >
          {tooltip}
        </span>
      )}
    </span>
  )
}
