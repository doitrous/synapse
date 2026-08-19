import { useI18n, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/cn'

const OPTIONS: { value: Lang; label: string; lang: string }[] = [
  { value: 'en', label: 'EN', lang: 'en' },
  { value: 'ar', label: 'العربية', lang: 'ar' },
]

/**
 * Both languages, one chosen.
 *
 * This was a single button labelled with the language you were *not* in, which
 * is the classic ambiguity: nobody can tell whether "العربية" reports the
 * current state or offers a change. Showing both and marking one settles it,
 * and it matches ThemeSwitch, which sits directly above it.
 */
export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n()

  return (
    <div
      role="radiogroup"
      aria-label={t('Language')}
      className={cn('inline-flex items-center gap-0.5 rounded-lg border border-line bg-surface-2 p-0.5', className)}
    >
      {OPTIONS.map((option) => {
        const active = option.value === lang
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setLang(option.value)}
            lang={option.lang}
            className={cn(
              'grid h-9 min-w-11 place-items-center rounded-md px-2 text-[12px] font-medium transition-colors sm:h-7',
              active ? 'bg-surface text-primary-strong shadow-panel' : 'text-ink-3 hover:text-ink',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
