import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, ChevronDown, Coffee, Globe, LightbulbOff, Menu, Moon, Sun, X, type LucideIcon } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { Icon } from '@/components/ui/Icon'
import { ThemeSwitch } from '@/components/shell/ThemeSwitch'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { useTheme, type Theme } from '@/lib/useTheme'
import { useLocalPreference } from '@/lib/useLocalPreference'
import { cn } from '@/lib/cn'
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
const THEME_GLYPH: Record<Theme, LucideIcon> = { light: Sun, warm: Coffee, dark: Moon, oled: LightbulbOff }

/**
 * Appearance and language as ONE compact menu, not controls strung across the
 * bar: a single button showing the current theme, opening a popover that holds
 * the full ThemeSwitch and a two-way language switch in the same panel. Keeps
 * the bar uncluttered while every theme and both languages stay one click away.
 */
function PreferencesMenu({
  lang, homeHref, otherHref, appearanceLabel, languageLabel,
}: {
  lang: 'ar' | 'en'
  homeHref: string
  otherHref: string
  appearanceLabel: string
  languageLabel: string
}) {
  const { theme } = useTheme()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const languages: ['ar' | 'en', string][] = [['en', 'English'], ['ar', 'العربية']]
  return (
    <>
      <button
        ref={setAnchor}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${appearanceLabel} · ${languageLabel}`}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-2 text-ink-3 transition-colors hover:bg-inset hover:text-ink lg:h-8"
      >
        <Icon icon={THEME_GLYPH[theme]} size={16} />
        <span className="h-3.5 w-px bg-line-2" aria-hidden />
        <Icon icon={Globe} size={15} />
        <Icon icon={ChevronDown} size={12} className={cn('-ms-0.5 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <Popover anchor={anchor} onClose={close} placement="bottom-end" label={`${appearanceLabel} · ${languageLabel}`} className="w-56 p-3">
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 px-0.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{appearanceLabel}</p>
              <ThemeSwitch className="flex w-full" />
            </div>
            <div>
              <p className="mb-1.5 px-0.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{languageLabel}</p>
              <div className="grid grid-cols-2 gap-1">
                {languages.map(([code, name]) => {
                  const active = lang === code
                  return (
                    <Link
                      key={code}
                      to={active ? homeHref : otherHref}
                      lang={code}
                      onClick={close}
                      className={cn(
                        'flex min-h-9 items-center justify-center rounded-md border text-[13px] font-semibold transition-colors',
                        active ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line bg-surface text-ink-2 hover:bg-inset hover:text-ink',
                      )}
                    >
                      {name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </Popover>
      )}
    </>
  )
}

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
 * The footer's second row: terms, privacy, refunds, contact.
 *
 * Written out here rather than imported from `pages/legal/content.ts` so the
 * marketing bundle does not carry the full text of four documents just to draw
 * four links. The Arabic shell keeps the same URLs and adds `?lang=ar`, which
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

/**
 * The footer's "Popular searches" block (10-internal-linking-menu-footer.md) — the site's real
 * home → category → item hierarchy (04-supporting-pages.md's "Courses" row), limited to routes
 * that actually exist and always resolve: `/blog/{lang}` is the category-level index, `/{lang}`
 * and the pricing page the trunk and the product/plan page. No per-article link: blog posts are
 * hub-synced (server/src/seoArticles.js) and may not exist yet, so a hardcoded slug here could
 * 404. Kept in sync by hand with the identical list server-rendered into the `/en`/`/ar` shell by
 * server/src/seoShell.js — there is no shared package between the client bundle and the API to
 * import it from.
 */
const POPULAR_SEARCHES: [string, string][] = [
  ['/en', 'Medical exam prep platform for Egyptian medical students'],
  ['/blog/en', 'Clinical study guides and exam-prep articles'],
  ['/pricing', 'Nishany study plans and pricing'],
  ['/ar', 'منصة التحضير لامتحانات كليات الطب المصرية'],
  ['/blog/ar', 'أدلة المذاكرة السريرية ومقالات التحضير للامتحانات'],
  ['/ar/pricing', 'خطط واشتراكات نيشاني'],
]

/**
 * Help center and Editorial guidelines (01-site-setup.md §2) — like Popular searches above,
 * rendered as plain `<a>` tags rather than react-router's `Link`: neither `/help` nor
 * `/editorial-guidelines` is a client route (they are full HTML pages the API renders itself, see
 * server/src/seo.js and CLAUDE.md's ticket notes), so a `Link` would hand them to the SPA's own
 * catch-all and show `NotFound` instead of ever reaching the server.
 */
const TRUST_PAGE_LINKS: Record<'ar' | 'en', [string, string][]> = {
  en: [['/help', 'Help center'], ['/editorial-guidelines', 'Editorial guidelines']],
  ar: [['/help', 'مركز المساعدة'], ['/editorial-guidelines', 'المبادئ التحريرية']],
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

  // The floating bar condenses once the page leaves the very top. A plain
  // passive scroll listener toggling one boolean — no smooth-scroll hijack, so
  // wheel and trackpad speed are never throttled.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

      {/* Floating capsule bar. A paper scrim fills the gap above it so content
          scrolling underneath never peeks through; the capsule itself rides on
          the page and tightens as you scroll. */}
      <header className="sticky top-0 z-30">
        <div
          className="px-3 pb-3 pt-3 sm:px-5 sm:pt-4"
          style={{ background: 'linear-gradient(to bottom, var(--color-paper) 55%, transparent)' }}
        >
          <div
            className={cn(
              'relative mx-auto max-w-[1180px] overflow-hidden rounded-[20px] border transition-[background-color,border-color,box-shadow] duration-300 ease-out',
              scrolled || menuOpen ? 'border-line bg-surface shadow-pop' : 'border-transparent bg-transparent shadow-none',
            )}
          >
            <div className="flex min-h-[62px] items-center justify-between gap-3 px-3.5 sm:px-4">
              <Link to={toHome} aria-label="Nishany home" className="shrink-0">
                <span className="hidden sm:inline-flex"><Wordmark textSize={18} /></span>
                <span className="inline-flex sm:hidden"><Wordmark collapsed /></span>
              </Link>

              <nav aria-label={c.lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'} className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
                <Link to={anchor('why-nishany')} className="text-[13px] font-medium text-ink-2 transition-colors hover:text-ink">{m.nav.why}</Link>
                <Link to={pricing.path} className="text-[13px] font-medium text-ink-2 transition-colors hover:text-ink">{pricing.navLabel}</Link>
              </nav>

              <div className="hidden items-center gap-4 lg:flex">
                {/* appearance + language, in one quiet menu */}
                <PreferencesMenu
                  lang={c.lang}
                  homeHref={toHome}
                  otherHref={toOtherAtPlace}
                  appearanceLabel={c.lang === 'ar' ? 'المظهر' : 'Appearance'}
                  languageLabel={c.lang === 'ar' ? 'اللغة' : 'Language'}
                />
                {/* auth actions, set clearly apart — Sign in as its own button beside the CTA */}
                <div className="flex items-center gap-2">
                  <Link to="/login" className="inline-flex min-h-10 items-center rounded-xl border border-line-2 bg-surface px-4 text-[13px] font-semibold text-ink shadow-control transition-colors hover:bg-inset">{c.signIn}</Link>
                  <Link
                    to="/signup?plan=maristana&period=term"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-primary px-4 text-[13px] font-semibold text-on-primary shadow-action transition-colors hover:bg-primary-hover"
                  >
                    {m.nav.start}
                    <Icon icon={ArrowRight} size={15} className="rtl:-scale-x-100" />
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <PreferencesMenu
                  lang={c.lang}
                  homeHref={toHome}
                  otherHref={toOtherAtPlace}
                  appearanceLabel={c.lang === 'ar' ? 'المظهر' : 'Appearance'}
                  languageLabel={c.lang === 'ar' ? 'اللغة' : 'Language'}
                />
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
              <div id="marketing-mobile-menu" className="border-t border-line px-3.5 py-4 sm:px-4 lg:hidden">
                <nav aria-label={c.lang === 'ar' ? 'قائمة الهاتف' : 'Mobile navigation'} className="grid gap-1">
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
          </div>
        </div>
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

          {/* Popular searches: real home → category → item links, plain <a> tags rather than
              `Link` — see the POPULAR_SEARCHES comment above for why. */}
          <nav
            aria-label={c.lang === 'ar' ? 'عمليات بحث شائعة' : 'Popular searches'}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line py-4 text-[12.5px] text-ink-3"
          >
            {POPULAR_SEARCHES.map(([href, label]) => (
              <a key={href} href={href} className="inline-flex min-h-11 items-center font-medium transition-colors hover:text-ink sm:min-h-0">{label}</a>
            ))}
          </nav>

          {/* The four legal documents plus Help center and Editorial guidelines. One English
              copy of each legal document serves both shells — the Arabic labels lead to the same
              pages, which say for themselves that the Arabic translation is still under review.
              Help/Editorial use plain <a> tags (see TRUST_PAGE_LINKS above); the rest use `Link`
              since those paths are real client routes. */}
          <nav
            aria-label={c.lang === 'ar' ? 'روابط قانونية' : 'Legal and support'}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line py-4 text-[12.5px] text-ink-3"
          >
            {TRUST_PAGE_LINKS[c.lang].map(([href, label]) => (
              <a key={href} href={href} className="inline-flex min-h-11 items-center font-medium transition-colors hover:text-ink sm:min-h-0">{label}</a>
            ))}
            {legalLinks(c.lang).map(([href, label]) => (
              <Link key={href} to={href} className="inline-flex min-h-11 items-center font-medium transition-colors hover:text-ink sm:min-h-0">{label}</Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
