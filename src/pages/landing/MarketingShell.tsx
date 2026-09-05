import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Globe, Menu, X } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { Icon } from '@/components/ui/Icon'
import { ThemeSwitch } from '@/components/shell/ThemeSwitch'
import { useLocalPreference } from '@/lib/useLocalPreference'
import { pricingFor } from './pricingContent'
import { nishanyCopy } from './nishanyContent'
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
  const [dismissed, setDismissed] = useLocalPreference('nishany.landing.langOffer.dismissed', false)
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
        <Link to={otherHref} className="font-semibold text-primary-strong hover:underline">{c.otherOffer.accept}</Link>
        <button type="button" onClick={() => setDismissed(true)} className="grid size-11 shrink-0 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-6" aria-label={c.otherOffer.dismiss}>
          <Icon icon={X} size={13} />
        </button>
      </div>
    </div>
  )
}

/**
 * The footer's second row: terms, privacy, refunds, contact, accessibility.
 *
 * Written out here rather than imported from `pages/legal/content.ts` so the
 * marketing bundle does not carry the full text of five documents just to draw
 * five links. The Arabic shell keeps the same URLs and adds `?lang=ar`, which
 * mirrors the page's chrome and shows the "translation pending" notice.
 */
function legalLinks(lang: 'ar' | 'en'): [string, string][] {
  const suffix = lang === 'ar' ? '?lang=ar' : ''
  const labels: Record<'ar' | 'en', string[]> = {
    en: ['Terms and Conditions', 'Privacy Policy', 'Refund Policy', 'Contact Us', 'Accessibility'],
    ar: ['الشروط والأحكام', 'سياسة الخصوصية', 'سياسة الاسترداد', 'تواصل معنا', 'إمكانية الوصول'],
  }
  return (['/terms', '/privacy', '/refund-policy', '/contact', '/accessibility'] as const).map(
    (path, index) => [`${path}${suffix}`, labels[lang][index]],
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
  const m = nishanyCopy(c.lang)
  const location = useLocation()
  const toOther = otherHref ?? c.otherHref
  const toOtherAtPlace = `${toOther}${location.hash}`
  const toHome = homeHref ?? (c.lang === 'ar' ? '/ar' : '/')
  const [menuOpen, setMenuOpen] = useState(false)
  const anchor = (id: string) => `${toHome}#${id}`

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
      <OtherLanguageOffer c={c} otherHref={toOtherAtPlace} />

      <header className="sticky top-0 z-30 border-b border-line bg-paper">
        <div className="mx-auto flex min-h-[68px] max-w-[1160px] items-center justify-between gap-3 px-5 sm:px-8">
          <Link to={toHome} aria-label="Nishany home" className="shrink-0">
            <span className="hidden sm:inline-flex"><Wordmark textSize={18} /></span>
            <span className="inline-flex sm:hidden"><Wordmark collapsed /></span>
          </Link>

          <nav aria-label={c.lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'} className="hidden items-center gap-5 lg:flex">
            <Link to={anchor('why-nishany')} className="text-[12.5px] font-medium text-ink-2 transition-colors hover:text-ink">{m.nav.why}</Link>
            <Link to={pricing.path} className="text-[12.5px] font-medium text-ink-2 transition-colors hover:text-ink">{pricing.navLabel}</Link>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeSwitch />
            <Link
              to={toOtherAtPlace}
              lang={c.lang === 'ar' ? 'en' : 'ar'}
              className="inline-flex min-h-10 items-center gap-1.5 text-[12.5px] font-medium text-ink-2 transition-colors hover:text-ink"
            >
              <Icon icon={Globe} size={15} />
              {c.otherLabel}
            </Link>
            <Link to="/login" className="inline-flex min-h-10 items-center text-[12.5px] font-medium text-ink-2 transition-colors hover:text-ink">
              {c.signIn}
            </Link>
            <Link
              to="/signup?plan=maristana&period=term"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-[12.5px] font-semibold text-on-primary shadow-action transition-colors hover:bg-primary-hover"
            >
              {m.nav.start}
              <Icon icon={ArrowRight} size={15} className="rtl:-scale-x-100" />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeSwitch />
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="marketing-mobile-menu"
              aria-label={menuOpen ? m.nav.close : m.nav.menu}
              onClick={() => setMenuOpen((value) => !value)}
              className="grid size-11 shrink-0 place-items-center rounded-lg border border-line bg-surface text-ink-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Icon icon={menuOpen ? X : Menu} size={19} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="marketing-mobile-menu" className="border-t border-line bg-paper px-5 py-4 sm:px-8 lg:hidden">
            <nav aria-label={c.lang === 'ar' ? 'قائمة الهاتف' : 'Mobile navigation'} className="mx-auto grid max-w-[1160px] gap-1">
              {[
                [anchor('why-nishany'), m.nav.why],
                [pricing.path, pricing.navLabel],
              ].map(([href, label]) => (
                <Link key={href} to={href} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center border-b border-line text-[13px] font-semibold text-ink-2 last:border-b-0">{label}</Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link to={toOtherAtPlace} onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line-2 bg-surface text-[12.5px] font-semibold text-ink"><Icon icon={Globe} size={15} />{c.otherLabel}</Link>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line-2 bg-surface text-[12.5px] font-semibold text-ink">{c.signIn}</Link>
              </div>
              <Link to="/signup?plan=maristana&period=term" onClick={() => setMenuOpen(false)} className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-[13px] font-semibold text-on-primary shadow-action">{m.nav.start}<Icon icon={ArrowRight} size={15} className="rtl:-scale-x-100" /></Link>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-[1160px] px-5 sm:px-8">{children}</main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-4 py-7 text-[12.5px] text-ink-3 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Wordmark textSize={17} />
              <Link to={pricing.path} className="inline-flex min-h-11 items-center font-medium transition-colors hover:text-ink sm:min-h-0">{pricing.navLabel}</Link>
              <Link to={toOtherAtPlace} lang={c.lang === 'ar' ? 'en' : 'ar'} className="inline-flex min-h-11 items-center font-medium transition-colors hover:text-ink sm:min-h-0">{c.otherLabel}</Link>
            </div>
            <p className="max-w-md text-start sm:text-end">{m.footer}</p>
          </div>

          {/* The four documents. One English copy of each serves both shells —
              the Arabic labels lead to the same pages, which say for themselves
              that the Arabic translation is still under review. */}
          <nav
            aria-label={c.lang === 'ar' ? 'روابط قانونية' : 'Legal and support'}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line py-4 text-[12.5px] text-ink-3"
          >
            {legalLinks(c.lang).map(([href, label]) => (
              <Link key={href} to={href} className="inline-flex min-h-11 items-center font-medium transition-colors hover:text-ink sm:min-h-0">{label}</Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
