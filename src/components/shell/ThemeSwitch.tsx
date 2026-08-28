import { Coffee, LightbulbOff, Moon, Sun } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Tooltip } from '@/components/ui/Tooltip'
import { cn } from '@/lib/cn'
import { THEMES, useTheme, type Theme } from '@/lib/useTheme'
import { useT } from '@/lib/i18n'

/* A bulb switched off, not another moon: Dark and OLED are two different
   grounds (a blue-tinted near-black vs. true #000), and the "lights out"
   glyph is the pattern readers already know from other apps' true-black
   mode, so it reads as distinct from Dark at a glance rather than a second
   copy of it. */
const GLYPH: Record<Theme, LucideIcon> = { light: Sun, warm: Coffee, dark: Moon, oled: LightbulbOff }
const LABEL: Record<Theme, string> = { light: 'Light', warm: 'Warm', dark: 'Dark', oled: 'Black' }

/**
 * Four icons, one pressed. A radiogroup rather than four toggles: the modes
 * are mutually exclusive, and a screen reader should hear one control with a
 * chosen value, not four switches that happen to disagree.
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
          <Tooltip key={option} content={t(LABEL[option])} className="min-w-11 flex-1 sm:min-w-7">
            <button
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={t(LABEL[option])}
              onClick={() => setTheme(option)}
              className={cn(
                'grid h-11 w-full place-items-center rounded-md transition-colors sm:h-7',
                active ? 'bg-surface text-primary-strong shadow-panel' : 'text-ink-3 hover:text-ink',
              )}
            >
              <Icon icon={GLYPH[option]} size={15} />
            </button>
          </Tooltip>
        )
      })}
    </div>
  )
}
