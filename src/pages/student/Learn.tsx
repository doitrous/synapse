import { useMemo } from 'react'
import { BookOpen, FolderOpen, Languages, MonitorPlay } from 'lucide-react'
import { FeatureCard, FeatureGrid, HubPage, HubStat } from '@/components/hub'
import { useMedicalGlossary } from '@/data/glossaryStore'
import { useLiveLibrary } from '@/lib/useLiveLibrary'
import { useRecentResources } from '@/lib/useRecentResources'
import { useTerminologyProgress } from '@/lib/useTerminologyProgress'
import { usePersistentState } from '@/lib/usePersistentState'
import { useT } from '@/lib/i18n'

/**
 * Learn: read it, look it up, understand it.
 *
 * The library is the destination that is not finished — it opens as a
 * preview from the coming-soon note rather than pretending to be the shelf it
 * will become. Terminology is the one place on this hub with a real ring,
 * because it is the one place a student marks something as learned.
 */
export function Learn() {
  const t = useT()
  const [glossary] = useMedicalGlossary()
  const { known, knownIn } = useTerminologyProgress()
  const { recent } = useRecentResources()
  const { topics, subtopics } = useLiveLibrary()
  const [bookmarks] = usePersistentState<string[]>('nishany.bookmarks.resources.v1', [])

  const termIds = useMemo(() => glossary.terms.map((term) => term.id), [glossary.terms])
  const knownCount = knownIn(termIds)
  const categories = glossary.categories.length

  return (
    <HubPage
      eyebrow="02 · LEARN"
      title={t('Learn')}
      lede={t('Read, look it up, understand it.')}
      aside={<HubStat label="Terms known" value={`${knownCount}/${termIds.length}`} sub={known.size ? 'marked “Got it”' : 'none marked yet'} />}
    >
      <FeatureGrid>
        <FeatureCard
          to="/app/library"
          icon={BookOpen}
          title={t('Library')}
          description={t('Concept-linked reading for every topic on your blueprint, with your marks kept in the margin.')}
          status="coming-soon"
          comingSoon={{
            body: t('The Library is being filled topic by topic from your university’s curriculum. It opens for your year once its articles are reviewed; the preview already reads what has been published so far.'),
            previewHref: '/app/library',
          }}
          stats={topics.length ? [{ label: t('Topics'), value: String(topics.length) }, { label: t('Articles'), value: String(subtopics.length) }] : undefined}
        />
        <FeatureCard
          to="/app/terminology"
          icon={Languages}
          title={t('Medical Terminology')}
          description={t('The bilingual dictionary of the terms you meet first — flip, check yourself, mark what you know.')}
          progress={termIds.length ? { kind: 'ring', value: knownCount, max: termIds.length, label: t('known') } : undefined}
          stats={[
            { label: t('Categories'), value: String(categories) },
            { label: t('Terms'), value: String(termIds.length) },
          ]}
        />
        <FeatureCard
          to="/app/resources"
          icon={FolderOpen}
          title={t('Resources')}
          description={t('Textbooks, videos, guidelines and your own uploads — read in place, with deep links into pages.')}
          stats={[
            { label: t('Bookmarks'), value: String(Array.isArray(bookmarks) ? bookmarks.length : 0) },
            { label: t('Recently opened'), value: String(recent.length) },
          ]}
        />
        <FeatureCard
          to="/app/tutorial"
          icon={MonitorPlay}
          title={t('Tutorial')}
          description={t('Short videos on how each part of Nishany works, by area.')}
        />
      </FeatureGrid>
    </HubPage>
  )
}
