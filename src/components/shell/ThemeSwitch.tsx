import { Coffee, Moon, Sun } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { THEMES, useTheme, type Theme } from '@/lib/useTheme'
import { useT } from '@/lib/i18n'

const GLYPH: Record<Theme, LucideIcon> = { light: Sun, warm: Coffee, dark: Moon }
const LABEL: Record<Theme, string> = { light: 'Light', warm: 'Warm', dark: 'Dark' }

/**
 * Three icons, one pressed. A radiogroup rather than three toggles: the modes
 * are mutually exclusive, and a screen reader should hear one control with a
 * chosen value, not three switches that happen to disagree.
 */
export function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const t = useT()

  return (
    <div
      role="radiogroup"
      aria-label={t('Appearance')}
      className={cn('inline-flex items-center gap-0.5 rounded-lg border border-line bg-surface-2 p-0.5', className)}
    >
      {THEMES.map((option) => {
        const active = option === theme
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t(LABEL[option])}
            title={t(LABEL[option])}
            onClick={() => setTheme(option)}
            className={cn(
              'grid size-9 place-items-center rounded-md transition-colors sm:size-7',
              active ? 'bg-surface text-primary-strong shadow-panel' : 'text-ink-3 hover:text-ink',
            )}
          >
            <Icon icon={GLYPH[option]} size={15} />
          </button>
        )
      })}
    </div>
  )
}
