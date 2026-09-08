import { ContentSkeleton } from '@/components/loading/PageSkeleton'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookA, Languages, Layers } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { SearchInput } from '@/components/ui/Field'
import { TargetRing } from '@/components/ui/TargetRing'
import { TermCard } from '@/components/terminology/TermCard'
import { CategoryRail } from '@/components/terminology/CategoryRail'
import { WaysToLearn } from '@/components/terminology/WaysToLearn'
import { buildGrid, MIN_TERMS, type GridTerm } from '@/data/crossword'
import { deckFromTerms, TERMINOLOGY_DEFAULT_FILTER } from '@/data/decks'
import type { MedTermCategory } from '@/data/glossary'
import { useMedicalGlossary } from '@/data/glossaryStore'
import { useDecks } from '@/lib/useDecks'
import { useTerminologyProgress } from '@/lib/useTerminologyProgress'
import { catalogueAvailability } from '@/lib/catalogueAvailability'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'

/**
 * The deck name for the current filter, and therefore its id.
 *
 * Built from the category *key* and the raw query rather than translated
 * labels, so switching the UI language never changes which deck a re-run
 * lands on. The default is the page's old name by way of `deckFromTerms`, so
 * the whole-glossary deck a student already has keeps its id.
 */
function currentFilterName(category: MedTermCategory | 'all', query: string): string {
  const trimmed = query.trim()
  if (category !== 'all' && trimmed) return `${category} — "${trimmed}"`
  if (category !== 'all') return category
  if (trimmed) return `"${trimmed}"`
  return TERMINOLOGY_DEFAULT_FILTER
}

const PREVIEW_SEED = 1

/**
 * Medical Terminology — the bilingual dictionary as a place to learn from,
 * not only to look things up in.
 *
 * Three moves, top to bottom: see how much you know (the ring), pick how to
 * practise (flashcards, the crossword, the match game), then work through the
 * cards themselves — flipping each to check yourself and marking the ones
 * that have landed. The page was called "Medical Taxonomy"; its route keeps
 * answering to both names.
 */
export function MedicalTerminology() {
  const t = useT()
  const navigate = useNavigate()
  const { decks, saveDeck } = useDecks()
  const [glossary, , glossaryStatus] = useMedicalGlossary()
  const progress = useTerminologyProgress()
  const terms = glossary.terms
  const categories = glossary.categories
  const availability = useMemo(
    () => catalogueAvailability({ statuses: [glossaryStatus], itemCount: terms.length }),
    [glossaryStatus, terms.length],
  )
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<MedTermCategory | 'all'>('all')
  const [hideKnown, setHideKnown] = useState(false)

  const q = query.trim().toLowerCase()
  const filtered = useMemo(
    () => terms.filter((term) => {
      if (category !== 'all' && term.category !== category) return false
      if (!q) return true
      return `${term.term} ${term.ar} ${term.def} ${term.defAr}`.toLowerCase().includes(q)
    }),
    [q, category, terms],
  )
  const shown = hideKnown ? filtered.filter((term) => !progress.known.has(term.id)) : filtered
  const knownInFilter = filtered.filter((term) => progress.known.has(term.id)).length
  const knownTotal = progress.knownIn(terms.map((term) => term.id))

  const groups = categories
    .map((c) => ({ ...c, terms: shown.filter((term) => term.category === c.key) }))
    .filter((group) => group.terms.length > 0)

  /** Save a deck for a set of terms under the current filter's name and go study it. */
  function studyAsFlashcards(subset: typeof filtered, suffix = '') {
    const built = deckFromTerms(currentFilterName(category, query) + suffix, subset)
    const existing = decks[built.id]
    saveDeck({
      id: built.id,
      name: built.title,
      cards: built.cards,
      schedules: existing?.schedules ?? {},
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    })
    navigate('/app/flashcards')
  }

  const categoryTerms = useMemo<GridTerm[]>(
    () => (category === 'all' ? [] : terms.filter((term) => term.category === category).map((term) => ({ term: term.term, clue: term.def }))),
    [terms, category],
  )
  const previewGrid = useMemo(() => buildGrid(categoryTerms, PREVIEW_SEED), [categoryTerms])
  const canPlayGrid = category !== 'all' && previewGrid.words.length > 0

  const playGrid = useCallback(() => {
    if (category === 'all') return
    for (let attempt = 0; attempt < 5; attempt++) {
      const seed = Math.floor(Math.random() * 0x7fffffff)
      if (buildGrid(categoryTerms, seed).words.length > 0) {
        navigate(`/app/term-grid?category=${encodeURIComponent(category)}&seed=${seed}`)
        return
      }
    }
  }, [category, categoryTerms, navigate])

  // Term Match draws from the whole glossary; it has no category of its own.
  const playMatch = useCallback(() => {
    navigate(`/app/term-match?seed=${Math.floor(Math.random() * 0x7fffffff)}`)
  }, [navigate])

  const stillLearning = filtered.filter((term) => !progress.known.has(term.id))

  return (
    <PageContainer>
      <PageHeader
        title={t('Medical Terminology')}
        back={{ fallback: '/app/learn' }}
        actions={(
          <div className="flex items-center gap-4">
            <TargetRing value={knownTotal} max={terms.length || 1} size={52} thickness={5} aria-label={t('Terms known')} />
            <div className="leading-tight">
              <p className="tnum font-mono text-[15px] font-semibold text-ink">{knownTotal} / {terms.length}</p>
              <p className="text-[12px] text-ink-2">{t('terms known')} · {categories.length} {t('categories')}</p>
            </div>
          </div>
        )}
      />

      {availability.kind !== 'ready' ? (
        <Panel className="p-10">
          <CatalogueUnavailable skeleton={<ContentSkeleton shape="terminology" />}
            availability={availability}
            empty={{
              title: t('The glossary has not been published yet.'),
              description: t('Terms appear here once they are published in the admin console.'),
            }}
          />
        </Panel>
      ) : (
        <>
          {/* ways to learn */}
          <section>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-[13.5px] font-bold tracking-[-0.012em] text-ink">{t('Three ways to learn')}</h2>
              <span className="text-[12px] text-ink-3">{category === 'all' ? t('Pick a category below to unlock the games') : t(category)}</span>
            </div>
            <WaysToLearn
              flashcards={{ count: filtered.length, onStart: () => studyAsFlashcards(filtered) }}
              grid={{
                count: previewGrid.words.length,
                enabled: canPlayGrid,
                hint: category === 'all'
                  ? t('Pick a category first')
                  : t('Needs at least {min} interlocking terms').replace('{min}', String(MIN_TERMS)),
                onStart: playGrid,
              }}
              match={{ count: terms.length, enabled: terms.length >= 4, onStart: playMatch }}
            />
          </section>

          {/* browse */}
          <section className="mt-8">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h2 className="text-[13.5px] font-bold tracking-[-0.012em] text-ink">{t('Browse & mark')}</h2>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-primary-strong"><Icon icon={Languages} size={14} />{t('Arabic ⇄ English')}</span>
              <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('Search a term in Arabic or English…')} className="w-full sm:ms-auto sm:max-w-xs" />
            </div>
            <CategoryRail categories={categories} terms={terms} known={progress.known} value={category} onChange={setCategory} />

            <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-line bg-surface-2/60 px-3 py-2">
              <span className="text-[12.5px] text-ink-2">
                <span className="tnum font-mono font-semibold text-ink">{knownInFilter}</span> / <span className="tnum font-mono">{filtered.length}</span> {t('known in this view')}
              </span>
              <label className="ms-auto flex cursor-pointer items-center gap-2 text-[12.5px] text-ink-2">
                <input type="checkbox" checked={hideKnown} onChange={(event) => setHideKnown(event.target.checked)} className="size-4 accent-[var(--color-primary)]" />
                {t('Hide known')}
              </label>
              <Button variant="secondary" size="sm" iconLeft={Layers} disabled={stillLearning.length === 0} onClick={() => studyAsFlashcards(stillLearning, ' · still learning')}>
                {t('Study the {n} still learning').replace('{n}', String(stillLearning.length))}
              </Button>
            </div>

            {groups.length === 0 ? (
              <Panel className="mt-4 p-10">
                <EmptyState
                  icon={BookA}
                  title={hideKnown && filtered.length ? t('Everything here is marked as known.') : t('No terms match your search.')}
                />
              </Panel>
            ) : (
              <div className="mt-5 space-y-8">
                {groups.map((group) => (
                  <section key={group.key}>
                    <div className="mb-3 flex items-center gap-2 border-b border-line pb-1.5">
                      <h3 className="font-serif text-[16px] font-semibold text-ink">{t(group.key)}</h3>
                      <span lang="ar" dir="rtl" className="text-[13px] text-ink-3">{group.ar}</span>
                      <span className="tnum ms-auto font-mono text-[11px] text-ink-3">{group.terms.length}</span>
                    </div>
                    <div className={cn('stagger grid gap-3 sm:grid-cols-2 xl:grid-cols-3')}>
                      {group.terms.map((term) => (
                        <TermCard key={term.id} term={term} known={progress.known.has(term.id)} onToggleKnown={() => progress.toggle(term.id)} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </PageContainer>
  )
}
