import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check, LockKeyhole } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

export type AuthStep = 'account' | 'verify' | 'setup'

/**
 * The three things a new student actually has to do.
 *
 * The last of these used to be "Protect account", which put an optional second
 * factor on the required path: a student who had just verified their address
 * was shown a numbered step telling them one more thing stood between them and
 * the app, and the screen it led to asked for an authenticator. Adding one is
 * worth offering and is not a step in signing up. What genuinely comes next is
 * choosing a university, a year and a plan, so that is what the rail says, and
 * the authenticator screen no longer draws a rail at all.
 */
const steps: Array<{ id: AuthStep; label: string }> = [
  { id: 'account', label: 'Account' },
  { id: 'verify', label: 'Verify email' },
  { id: 'setup', label: 'Set up your studies' },
]

export function AuthLayout({
  step,
  title,
  description,
  children,
  aside,
  compact = false,
  completedSteps,
  showProgress = true,
}: {
  step: AuthStep
  title: string
  description: string
  children: ReactNode
  aside?: ReactNode
  compact?: boolean
  completedSteps?: AuthStep[]
  showProgress?: boolean
}) {
  const activeIndex = steps.findIndex((item) => item.id === step)

  return (
    <div className="min-h-dvh bg-paper">
      <header className="border-b border-line bg-surface/70">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="Connect Cortex home"><Wordmark /></Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className={cn('mx-auto', compact ? 'max-w-4xl' : 'max-w-5xl')}>
          <div className="mb-8 max-w-2xl">
            <h1 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.025em] text-ink">{title}</h1>
            <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed text-ink-2">{description}</p>
          </div>

          {showProgress && <ol className="mb-7 grid grid-cols-3" aria-label="Account setup progress">
            {steps.map((item, index) => {
              const complete = completedSteps ? completedSteps.includes(item.id) : index < activeIndex
              const active = index === activeIndex
              return (
                <li key={item.id} className="relative flex min-w-0 flex-col items-center text-center">
                  {index > 0 && <span className={cn('absolute end-1/2 top-4 h-px w-full', index <= activeIndex ? 'bg-primary' : 'bg-line-2')} aria-hidden />}
                  <span className={cn(
                    'relative z-10 grid size-8 place-items-center rounded-full border bg-paper font-mono text-[12px] font-semibold',
                    complete && 'border-success bg-success text-on-success',
                    active && 'border-primary bg-primary text-on-primary',
                    !complete && !active && 'border-line-2 text-ink-2',
                  )}>
                    {complete ? <Icon icon={Check} size={14} /> : index + 1}
                  </span>
                  <span className={cn('mt-2 truncate text-[12px] font-semibold sm:text-[13px]', active ? 'text-primary-strong' : complete ? 'text-success' : 'text-ink-2')}>{item.label}</span>
                </li>
              )
            })}
          </ol>}

          <section className={cn(
            'overflow-hidden rounded-2xl border border-line bg-surface shadow-panel',
            Boolean(aside) && 'grid lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.78fr)]',
          )}>
            <div className="p-5 sm:p-7 lg:p-9">{children}</div>
            {aside && <aside className="border-t border-line bg-surface-2/45 p-5 sm:p-7 lg:border-s lg:border-t-0 lg:p-9">{aside}</aside>}
          </section>

          {/* What this means for the reader, rather than which products it is
              built on. Naming the auth provider and the database engine told a
              student nothing they could act on, and the same sentence used to
              be a checkbox they had to tick to register. */}
          <p className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2 text-center text-[12px] leading-relaxed text-ink-2">
            <Icon icon={LockKeyhole} size={14} /> Your notes, answers and progress are private to your account.
          </p>
        </div>
      </main>
    </div>
  )
}
