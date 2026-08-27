import { Search } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { useT } from '@/lib/i18n'
import type { FlashcardsApi } from '@/lib/useFlashcards'

/** Placeholder for the Browse view; built in a later step of this slice. */
export function BrowseView({ api, onAdd }: { api: FlashcardsApi; onAdd: () => void }) {
  const t = useT()
  void api
  void onAdd
  return (
    <Panel className="p-10 text-center">
      <EmptyState icon={Search} title={t('Browse is being built')} description={t('Card search and bulk actions land in a later step of this build.')} />
    </Panel>
  )
}
