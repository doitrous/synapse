import { BarChart3 } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { useT } from '@/lib/i18n'
import type { FlashcardsApi } from '@/lib/useFlashcards'

/** Placeholder for the Stats view; built in a later step of this slice. */
export function StatsView({ api }: { api: FlashcardsApi }) {
  const t = useT()
  void api
  return (
    <Panel className="p-10 text-center">
      <EmptyState icon={BarChart3} title={t('Stats are being built')} description={t('Charts land in a later step of this build.')} />
    </Panel>
  )
}
