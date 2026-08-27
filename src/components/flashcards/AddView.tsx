import { Plus } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { useT } from '@/lib/i18n'
import type { FlashcardsApi } from '@/lib/useFlashcards'

/**
 * Placeholder for the Add view (Basic / Cloze / Image Occlusion authoring).
 * Built in a later step of this slice; labelled honestly rather than shown as a
 * working control that does nothing.
 */
export function AddView({ api, initialDeckId, onDone }: { api: FlashcardsApi; initialDeckId?: string; onDone: () => void }) {
  const t = useT()
  void api
  void initialDeckId
  void onDone
  return (
    <Panel className="p-10 text-center">
      <EmptyState icon={Plus} title={t('Add is being built')} description={t('Card authoring lands in a later step of this build.')} />
    </Panel>
  )
}
