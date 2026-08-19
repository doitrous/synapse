import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, X } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { Icon } from '@/components/ui/Icon'
import { useLocalPreference } from '@/lib/useLocalPreference'
import { pricingFor } from './pricingContent'
import type { LandingContent } from './content'

/**
 * The chrome every marketing page shares.
 *
 * Pulled out of LandingShell when pricing became its own page: two pages that
 * each drew their own header would drift, and the header is where the language
 * switch and the pricing link live — the two things that must behave the same
 * everywhere or people lose their place.
 *
 * Direction and language are set here; the title and the rest of the head are
 * each page's own, because they are what distinguishes the pages in a search
 * result. See `usePageMeta`.
 */

/**
 * The other language, offered rather than forced.
 *
 * `/` serves English and `/ar` serves Arabic, both explicitly. Redirecting on
 * `navigator.language` would break a shared link — the person who sent it and
 * the person who opened it would see different pages — and split what search
 * engines index. So this is a strip, dismissible, remembered per device.
 */
function OtherLanguageOffer({ c, otherHref }: { c: LandingContent; otherHref: string }) {
  const [dismissed, setDismissed] = useLocalPreference('synapse.landing.langOffer.dismissed', false)
  const [prefersOther, setPrefersOther] = useState(false)

  useEffect(() => {
    const wanted = c.lang === 'en' ? 'ar' : 'en'
    setPrefersOther(navigator.languages?.some((tag) => tag.toLowerCase().startsWith(wanted)) ?? false)
  }, [c.lang])

  if (dismissed || !prefersOther) return null

  return (
    <div dir={c.lang === 'en' ? 'rtl' : 'ltr'} lang={c.lang === 'en' ? 'ar' : 'en'} className="border-b border-line bg-surface-2/70">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center gap-3 px-5 py-2 text-[13px] sm:px-8">
        <Icon icon={Globe} size={14} className="shrink-0 text-ink-3" />
        <p className="min-w-0 flex-1 text-ink-2">{c.otherOffer.line}</p>
        <Link to={otherHref} className="font-semibold text-accent-strong hover:underline">{c.otherOffer.accept}</Link>
        <button type="button" onClick={() => setDismissed(true)} className="grid size-6 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink" aria-label={c.otherOffer.dismiss}>
          <Icon icon={X} size={13} />
        </button>
      </div>
    </div>
  )
}

export function MarketingShell({
  c,
  otherHref,
  homeHref,
  children,
}: {
  c: LandingContent
  /** This same page in the other language — not always the home page. */
  otherHref?: string
  /** Where the wordmark goes back to, in this language. */
  homeHref?: string
  children: ReactNode
}) {
  const pricing = pricingFor(c.lang)
  const toOther = otherHref ?? c.otherHref
  const toHome = homeHref ?? (c.lang === 'ar' ? '/ar' : '/')

  useEffect(() => {
    const el = document.documentElement
    el.dir = c.dir
    el.lang = c.lang
    return () => {
      el.dir = 'ltr'
      el.lang = 'en'
    }
  }, [c.dir, c.lang])

  return (
    <div className="min-h-dvh overflow-x-clip" dir={c.dir} lang={c.lang}>
      <OtherLanguageOffer c={c} otherHref={toOther} />

      {/* ---- Nav (solid ground, hairline rule — no glass) ---- */}
      <header className="sticky top-0 z-30 border-b border-line bg-paper">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between px-5 py-3.5 sm:px-8">
          <Link to={toHome} aria-label="Synapse"><Wordmark /></Link>
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Pricing earns a permanent place: it is the page people leave to
                look for, and hunting for it on a long landing page loses them. */}
            <Link to={pricing.path} className="text-[13.5px] font-medium text-ink-2 transition-colors hover:text-ink">
              {pricing.navLabel}
            </Link>
            <Link
              to={toOther}
              lang={c.lang === 'ar' ? 'en' : 'ar'}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-2 transition-colors hover:text-ink"
            >
              <Icon icon={Globe} size={15} />
              {c.otherLabel}
            </Link>
            <Link to="/login" className="hidden text-[13.5px] font-medium text-ink-2 transition-colors hover:text-ink sm:inline">
              {c.signIn}
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[13.5px] font-semibold text-on-accent shadow-panel transition-colors hover:bg-accent-strong"
            >
              {c.nav.start}
              <Icon icon={ArrowRight} size={15} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1160px] px-5 sm:px-8">{children}</main>

      <footer className="mt-20 border-t border-line">
        <div className="mx-auto flex max-w-[1160px] flex-col items-start justify-between gap-4 px-5 py-7 text-[12.5px] text-ink-3 sm:flex-row sm:items-center sm:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Wordmark />
            <Link to={pricing.path} className="font-medium transition-colors hover:text-ink">{pricing.navLabel}</Link>
            <Link to={toOther} lang={c.lang === 'ar' ? 'en' : 'ar'} className="font-medium transition-colors hover:text-ink">{c.otherLabel}</Link>
          </div>
          <p className="max-w-md text-start sm:text-end">{c.footer}</p>
        </div>
      </footer>
    </div>
  )
}
