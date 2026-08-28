import type { ReactNode } from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n'

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
  back,
  className,
}: {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  /**
   * Adds an ArrowLeft control above the title. Goes to the previous entry in
   * this tab's own history when there is one, else `back.fallback` — a fresh
   * tab, a bookmark, or a deep link has no "previous" to return to.
   */
  back?: { fallback: string; label?: string }
  className?: string
}) {
  const t = useT()
  const navigate = useNavigate()
  const handleBack = useCallback(() => {
    if (!back) return
    const historyIndex = (window.history.state as { idx?: number } | null)?.idx
    if (typeof historyIndex === 'number' && historyIndex > 0) navigate(-1)
    else navigate(back.fallback)
  }, [back, navigate])

  return (
    <>
      {back && (
        <button
          type="button"
          onClick={handleBack}
          className="mb-3 -ms-2 inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 text-[12.5px] font-medium text-ink-2 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          <Icon icon={ArrowLeft} size={15} className="rtl:-scale-x-100" />
          {back.label || t('Back')}
        </button>
      )}
      <div className={cn('mb-5 flex min-w-0 flex-wrap items-end justify-between gap-x-6 gap-y-4 sm:mb-6', className)}>
        <div className="min-w-0 max-w-2xl">
          <h1 className="font-serif text-[26px] font-semibold tracking-[-0.02em] text-ink sm:text-[30px]">
            {title}
          </h1>
          {description && <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{description}</p>}
        </div>
        {actions && <div className="flex max-w-full flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </>
  )
}
