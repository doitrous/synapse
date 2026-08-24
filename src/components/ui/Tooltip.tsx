import {
  cloneElement,
  isValidElement,
  useId,
  useRef,
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
  children,
  disabled = false,
  className,
}: {
  content: ReactNode
  children: Trigger
  disabled?: boolean
  className?: string
}) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const touchOpened = useRef(false)
  if (!isValidElement(children) || disabled) return children

  const props = children.props
  return (
    <span className={cn('relative inline-flex min-w-0', className)}>
      {cloneElement(children, {
        'aria-describedby': open ? id : props['aria-describedby'],
        onPointerEnter: (event: PointerEvent) => {
          call(props.onPointerEnter, event)
          if (event.pointerType !== 'touch') setOpen(true)
        },
        onPointerLeave: (event: PointerEvent) => {
          call(props.onPointerLeave, event)
          if (event.pointerType !== 'touch') setOpen(false)
        },
        onPointerDown: (event: PointerEvent) => {
          call(props.onPointerDown, event)
          if (event.pointerType === 'touch') {
            touchOpened.current = true
            setOpen((current) => !current)
          }
        },
        onFocus: (event: FocusEvent) => {
          call(props.onFocus, event)
          setOpen(true)
        },
        onBlur: (event: FocusEvent) => {
          call(props.onBlur, event)
          setOpen(false)
          touchOpened.current = false
        },
        onKeyDown: (event: KeyboardEvent) => {
          call(props.onKeyDown, event)
          if (event.key === 'Escape') {
            setOpen(false)
            touchOpened.current = false
          }
        },
      })}
      {open && (
        <span
          id={id}
          role="tooltip"
          className="pointer-events-none absolute bottom-[calc(100%+0.45rem)] start-1/2 z-[90] w-max max-w-64 -translate-x-1/2 rounded-lg border border-line bg-ink px-2.5 py-1.5 text-[11.5px] font-medium leading-snug text-paper shadow-pop animate-pop"
        >
          {content}
        </span>
      )}
    </span>
  )
}
