import { useMemo, useState } from 'react'
import { Clapperboard } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { SearchInput } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
import { PlacedImage } from '@/components/ui/PlacedMedia'
import { MediaUsagePanel } from '@/components/admin/MediaUsagePanel'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph,
} from '@/data/conceptGraph'
import {
  CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem,
} from '@/data/contentControl'
import {
  MEDIA_STATE_KEY, emptyMediaLibrary, mediaReleaseBlockers, usageOf,
  type MediaLibraryDocument,
} from '@/data/mediaLibrary'

/**
 * Every image the product holds.
 *
 * Deliberately not narrowed by reviewer scope. Restricting it would fight the
 * reason it exists — an upper limb plate is equally useful to a Year 2 and a
 * Year 4 reviewer, and forcing the second to re-upload it recreates the
 * duplication this replaces. Seeing an image grants nothing on its own;
 * *placing* one edits a question, and that write is already refused out of
 * scope by the server.
 */
export function MediaLibraryBrowser() {
  const [library, setLibrary] = usePersistentState<MediaLibraryDocument>(MEDIA_STATE_KEY, emptyMediaLibrary)
  const [ledger, setLedger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const records = library.records ?? []
  const concepts = graph.concepts ?? []

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return records
    return records.filter((record) => `${record.title} ${record.altText} ${record.rights}`.toLowerCase().includes(q))
  }, [query, records])

  const open = openId ? records.find((record) => record.id === openId) ?? null : null

  return (
    <Panel className="mb-4 overflow-hidden">
      <PanelHeader
        title="Media library"
        icon={Clapperboard}
        hint={`${records.length} image${records.length === 1 ? '' : 's'}`}
      />
      <div className="border-b border-line p-3">
        <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, alt text or rights" />
      </div>

      {open && (
        <div className="border-b border-line p-3">
          <MediaUsagePanel
            record={open}
            ledger={ledger}
            concepts={concepts}
            onLedger={setLedger}
            onLibrary={setLibrary}
            onClose={() => setOpenId(null)}
          />
        </div>
      )}

      {visible.length === 0 ? (
        <EmptyState
          icon={Clapperboard}
          title={records.length ? 'Nothing matches that' : 'No images yet'}
          description={records.length
            ? 'Widen the search to see the rest of the library.'
            : 'Images arrive here when they are attached to a question or supplied against a media request. One image can then be used by as many questions as need it.'}
        />
      ) : (
        <ul className="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((record) => {
            const blockers = mediaReleaseBlockers(record)
            const uses = usageOf(record.id, ledger, concepts).length
            return (
              <li key={record.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(record.id === openId ? null : record.id)}
                  className="w-full rounded-lg border border-line p-2 text-start hover:border-primary-line hover:bg-primary-tint/15"
                >
                  <PlacedImage record={record} className="max-h-28 w-full rounded object-contain" />
                  <span className="mt-1.5 block truncate text-[12.5px] font-medium text-ink">{record.title}</span>
                  <span className="mt-0.5 block text-[11px] text-ink-3">
                    {record.width}×{record.height} · used by {uses} item{uses === 1 ? '' : 's'}
                  </span>
                  <span className="mt-1 block">
                    {blockers.length
                      ? <Badge tone="danger">held back — {blockers.join(', ')}</Badge>
                      : <Badge tone="success">live</Badge>}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </Panel>
  )
}
