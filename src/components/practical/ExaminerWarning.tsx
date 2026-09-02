import { Flag } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n'

export function ExaminerWarning({ className = '' }: { className?: string }) {
  const t = useT()
  return (
    <aside
      className={`flex items-start gap-3 rounded-xl border border-warning/30 bg-warning-tint/25 px-4 py-4 text-[13.5px] leading-[1.55] text-ink shadow-panel sm:gap-4 sm:px-5 ${className}`}
      aria-label={t('Before starting the station')}
    >
      <span className="grid size-7 shrink-0 place-items-center text-warning sm:size-8">
        <Icon icon={Flag} size={19} strokeWidth={1.8} />
      </span>
      <p className="pt-0.5 text-pretty">
        {t('The actor brief and the mark scheme are behind the')}{' '}
        <strong className="font-semibold text-primary-strong">{t('Examiner & Actor')}</strong>{' '}
        {t("tab. Don't read them before you run the station — knowing what is on the scheme is the fastest way to learn nothing from it.")}
      </p>
    </aside>
  )
}
