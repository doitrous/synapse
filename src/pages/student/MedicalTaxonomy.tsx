import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Languages, BookA, Layers } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { SearchInput } from '@/components/ui/Field'
import { FilterChip } from '@/components/ui/FilterChip'
import { Icon } from '@/components/ui/Icon'
import type { MedTermCategory } from '@/data/glossary'
import { useMedicalGlossary } from '@/data/glossaryStore'
import { deckFromTerms } from '@/data/decks'
import { useDecks } from '@/lib/useDecks'
import { useT } from '@/lib/i18n'

/**
 * The name of whatever is currently on screen — the same name `deckFromTerms`
 * turns into a stable deck id. Built from the category and search query rather
 * than translated labels, so switching the UI language never changes which
 * deck a re-run lands on.
 */
function currentFilterName(category: MedTermCategory | 'all', query: string): string {
  const trimmed = query.trim()
  if (category !== 'all' && trimmed) return `${category} — "${trimmed}"`
  if (category !== 'all') return category
  if (trimmed) return `"${trimmed}"`
  return 'Medical Taxonomy'
}

export function MedicalTaxonomy() {
  const t = useT()
  const navigate = useNavigate()
  const { decks, saveDeck } = useDecks()
  // Live, and editable in Glossary Setup — no longer a source literal that
  // needed a redeploy to correct a translation.
  const [glossary] = useMedicalGlossary()
  const medicalTerms = glossary.terms
  const MED_CATEGORIES = glossary.categories
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<MedTermCategory | 'all'>('all')

  const q = query.trim().toLowerCase()
  const filtered = useMemo(
    () =>
      medicalTerms.filter((term) => {
        if (category !== 'all' && term.category !== category) return false
        if (!q) return true
        return `${term.term} ${term.ar} ${term.def} ${term.defAr}`.toLowerCase().includes(q)
      }),
    [q, category, medicalTerms],
  )

  const groups = MED_CATEGORIES.map((c) => ({ ...c, terms: filtered.filter((term) => term.category === c.key) })).filter(
    (g) => g.terms.length > 0,
  )
  const isEmpty = medicalTerms.length === 0

  /**
   * Build a deck from exactly what is on screen right now, and go study it.
   *
   * The filter name is the deck's name, and `deckFromTerms` turns that name
   * into a stable id — so pressing this again on the same filter overwrites
   * the same deck instead of piling up a duplicate. Any schedule progress on
   * cards that are still in the deck survives the overwrite.
   */
  function studyFilteredAsFlashcards() {
    const built = deckFromTerms(currentFilterName(category, query), filtered)
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

  return (
    <PageContainer>
      <PageHeader
        title={t('Medical Taxonomy')}
        description={t('A bilingual dictionary of the basic medical terms — with Arabic translations and plain explanations to help you build vocabulary fast.')}
      />

      <div className="mb-4 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('Search a term in Arabic or English…')} className="w-full sm:max-w-sm" />
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-primary-strong"><Icon icon={Languages} size={14} />{t('Arabic ⇄ English')}</span>
          <span className="ms-auto text-[12.5px] text-ink-3">
            <span className="tnum font-mono font-medium text-ink-2">{filtered.length}</span> {filtered.length === 1 ? t('term') : t('terms')}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>{t('All')}</FilterChip>
          {MED_CATEGORIES.map((c) => (
            <FilterChip key={c.key} active={category === c.key} onClick={() => setCategory(c.key)}>
              {t(c.key)}
            </FilterChip>
          ))}
          <Button
            variant="secondary"
            size="sm"
            iconLeft={Layers}
            className="ms-auto"
            disabled={filtered.length === 0}
            onClick={studyFilteredAsFlashcards}
          >
            {t('Study these as flashcards')} · <span className="tnum font-mono">{filtered.length}</span>
          </Button>
        </div>
      </div>

      {groups.length === 0 ? (
        <Panel className="p-10 text-center">
          <Icon icon={BookA} size={22} className="mx-auto text-ink-3" />
          <p className="mt-2 text-[13px] font-medium text-ink">
            {isEmpty ? t('The glossary has not been published yet.') : t('No terms match your search.')}
          </p>
          {isEmpty && <p className="mx-auto mt-1.5 max-w-sm text-[12.5px] leading-relaxed text-ink-3">{t('Terms appear here once they are published in the admin console.')}</p>}
        </Panel>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <section key={group.key}>
              <div className="mb-2.5 flex items-center gap-2 border-b border-line pb-1.5">
                <h2 className="font-serif text-[16px] font-semibold text-ink">{t(group.key)}</h2>
                <span lang="ar" dir="rtl" className="text-[13px] text-ink-3">{group.ar}</span>
                <span className="tnum ms-auto font-mono text-[11px] text-ink-3">{group.terms.length}</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {group.terms.map((term) => (
                  <Panel key={term.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[15.5px] font-semibold text-ink">{term.term}</p>
                      <p lang="ar" dir="rtl" className="text-[16px] font-semibold text-primary-strong">{term.ar}</p>
                    </div>
                    <div className="mt-2.5 space-y-1.5 border-t border-line pt-2.5">
                      <p className="text-[13px] leading-relaxed text-ink-2">{term.def}</p>
                      <p lang="ar" dir="rtl" className="text-[13px] leading-relaxed text-ink-2">{term.defAr}</p>
                    </div>
                    {term.example && (
                      <p className="mt-2 rounded-md bg-primary-tint/40 px-2.5 py-1.5 text-[12px] text-primary-strong">
                        <span className="font-semibold">{t('e.g.')} </span>{term.example}
                      </p>
                    )}
                  </Panel>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </PageContainer>
  )
}
