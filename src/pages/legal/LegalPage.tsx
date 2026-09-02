import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Info } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { usePageMeta } from '@/lib/pageMeta'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  EMPTY_LEGAL_PAGES_DOC,
  LEGAL_PAGES_STATE_KEY,
  formatLegalDate,
  legalSlugOf,
  mergeLegalPage,
  type LegalPagesDoc,
} from '@/data/legalPages'
import { MarketingShell } from '@/pages/landing/MarketingShell'
import { AR_CONTENT, EN_CONTENT } from '@/pages/landing/content'
import { legalLabel, type LegalPageContent } from './content'

/**
 * The layout every footer document shares.
 *
 * It renders inside `MarketingShell` rather than the student page frame
 * because these pages are public: somebody deciding whether to pay reads them
 * signed out, from the footer of the landing page, and they should keep the
 * same header, the same language switch and the same footer they arrived with.
 *
 * There is one copy of each document, in English, and both marketing shells
 * link to it. Arriving from the Arabic shell (`?lang=ar`) mirrors the chrome
 * and adds a notice saying the Arabic version is still being reviewed — which
 * is true, and is better than a translation nobody has checked standing in for
 * a contract. The canonical URL is the bare path in both cases, so the two do
 * not compete as separate pages in search.
 *
 * The document it renders is the draft in `content.ts` with whatever an admin
 * has written in `/admin/legal` laid over it. Until somebody edits a page
 * there is no override and `mergeLegalPage` hands back the draft object
 * itself, so these pages render exactly as they did before the console
 * existed.
 */
export function LegalPage({
  page: draft,
  after,
}: {
  page: LegalPageContent
  /** Rendered under the last section — the contact form is the only user. */
  after?: (lang: 'ar' | 'en') => ReactNode
}) {
  const [doc] = usePersistentState<LegalPagesDoc>(LEGAL_PAGES_STATE_KEY, EMPTY_LEGAL_PAGES_DOC)
  const slug = legalSlugOf(draft.slug)
  const page = mergeLegalPage(draft, slug ? doc?.pages?.[slug] : undefined)

  const location = useLocation()
  const lang: 'ar' | 'en' = new URLSearchParams(location.search).get('lang') === 'ar' ? 'ar' : 'en'
  const c = lang === 'ar' ? AR_CONTENT : EN_CONTENT
  const label = (en: string) => legalLabel(lang, en)

  usePageMeta({
    title: page.documentTitle,
    description: page.description,
    canonical: page.slug,
    // Self-referencing only. Without this the page keeps `index.html`'s
    // document-level alternates, which advertise the Arabic *home page* as
    // this document's Arabic version — and contradict the sitemap. There is
    // no Arabic edition yet: `?lang=ar` mirrors the chrome around the same
    // English text, so it is not a language alternate.
    alternates: { en: page.slug, 'x-default': page.slug },
  })

  return (
    <MarketingShell
      c={c}
      otherHref={lang === 'ar' ? page.slug : `${page.slug}?lang=ar`}
      homeHref={lang === 'ar' ? '/ar' : '/'}
    >
      <div className="py-10 sm:py-14">
        {lang === 'ar' && (
          <p className="mb-6 flex max-w-[62ch] items-start gap-2 rounded-lg border border-line bg-surface-2 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-ink-2">
            <Icon icon={Info} size={15} className="mt-0.5 shrink-0 text-ink-3" />
            <span>Arabic version pending review &mdash; الترجمة قيد المراجعة</span>
          </p>
        )}

        <h1 className="max-w-[20ch] text-balance font-serif text-[34px] font-semibold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[44px]">
          {label(page.title)}
        </h1>
        <p className="mt-3 text-[12.5px] text-ink-3">
          {label('Last updated')} {formatLegalDate(page.updated)}
        </p>
        {/* The document itself is English on both shells, so it carries its own
            direction. Left inside the Arabic shell's RTL flow, every sentence
            would have its full stop thrown to the front of the line. */}
        <p dir="ltr" lang="en" className="mt-6 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-2">{page.intro}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          {/* The index is a real list of links rather than a scroll-spy: these
              documents are read by someone looking for one clause, and a plain
              anchor list is the fastest way to that clause on any device. */}
          <nav
            aria-label={label('On this page')}
            className="lg:sticky lg:top-24 lg:h-fit lg:self-start"
          >
            <p className="text-[12.5px] font-semibold text-ink-2">{label('On this page')}</p>
            <ul dir="ltr" lang="en" className="mt-3 space-y-0.5 border-s border-line ps-3">
              {page.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block py-1 text-[12.5px] leading-snug text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div dir="ltr" lang="en" className="min-w-0 max-w-[62ch]">
            {page.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 border-t border-line py-7 first:border-t-0 first:pt-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h2 className="text-[16.5px] font-bold tracking-[-0.012em] text-ink">{section.heading}</h2>
                  {section.needsReview && <Badge tone="warning" dot>{label('Needs legal review')}</Badge>}
                </div>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-[14.5px] leading-relaxed text-ink-2">{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 space-y-1.5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="relative ps-4 text-[14.5px] leading-relaxed text-ink-2">
                        <span aria-hidden className="absolute start-0 top-[0.62em] size-1.5 rounded-full bg-ink-3" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            {after?.(lang)}
          </div>
        </div>
      </div>
    </MarketingShell>
  )
}
