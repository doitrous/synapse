import { Microscope as MicroscopeIcon } from 'lucide-react'
import { ComingSoonBanner, HubStat } from '@/components/hub'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { HistologyBench } from '@/components/practical/HistologyBench'
import { useLiveHistology } from '@/lib/useLiveHistology'
import { useCatalogueAvailability } from '@/lib/useCatalogueAvailability'
import { useT } from '@/lib/i18n'

/**
 * Histology: the slide box and the microscope.
 *
 * Marked coming soon on the Practice hub, and the banner says so again here —
 * the bench works and every published slide is on it, but nothing you name is
 * recorded yet, so the page is honest about being a preview rather than
 * pretending to be a graded surface.
 */
export function Histology() {
  const t = useT()
  const { slides } = useLiveHistology()
  const availability = useCatalogueAvailability(slides.length)

  return (
    <PageContainer>
      <PageHeader
        title={t('Histology')}
        back={{ fallback: '/app/practice' }}
        actions={slides.length ? (
          <HubStat label="Slides" value={String(slides.length)} sub={slides.length === 1 ? 'slide published' : 'slides published'} />
        ) : undefined}
      />
      <ComingSoonBanner
        icon={MicroscopeIcon}
        body="Histology will mark what you name on a slide, the way the question bank marks an answer, and carry it into your record. Until then the bench is a preview: every published slide, at full magnification, with the labels revealed when you ask for them."
      />
      {availability.kind !== 'ready' ? (
        <Panel className="p-8">
          <CatalogueUnavailable
            availability={availability}
            empty={{ title: t('No slides published yet'), description: t('Published histology slides will appear here.') }}
          />
        </Panel>
      ) : (
        <HistologyBench />
      )}
    </PageContainer>
  )
}
