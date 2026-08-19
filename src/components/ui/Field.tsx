import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { Icon } from './Icon'
import { cn } from '@/lib/cn'

const base =
  'w-full rounded-md border border-line bg-surface text-[13.5px] text-ink placeholder:text-ink-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_18%,transparent)]'

export function Field({
  label,
  hint,
  htmlFor,
  children,
  className,
}: {
  label: string
  hint?: string
  htmlFor?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[12.5px] font-medium text-ink-2">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-[12px] text-ink-3">{hint}</p>}
    </div>
  )
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(base, 'h-11 px-3 sm:h-9', className)} {...props} />
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(base, 'min-h-[5rem] px-3 py-2 leading-relaxed', className)} {...props} />
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={cn(base, 'h-11 appearance-none ps-3 pe-9 sm:h-9', className)} {...props}>
        {children}
      </select>
      <Icon
        icon={ChevronDown}
        size={16}
        className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-ink-3"
      />
    </div>
  )
}

export function SearchInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon
        icon={Search}
        size={16}
        className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-ink-3"
      />
      <input type="search" className={cn(base, 'h-11 ps-9 pe-3 sm:h-9', className)} {...props} />
    </div>
  )
}
