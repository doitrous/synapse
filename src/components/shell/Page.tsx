import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function PageContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full min-w-0 max-w-[1180px] px-3 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8', className)}>
      {children}
    </div>
  )
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mb-5 flex min-w-0 flex-wrap items-end justify-between gap-x-6 gap-y-4 sm:mb-6', className)}>
      <div className="min-w-0 max-w-2xl">
        <h1 className="font-serif text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[30px]">
          {title}
        </h1>
        {description && <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{description}</p>}
      </div>
      {actions && <div className="flex max-w-full flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
