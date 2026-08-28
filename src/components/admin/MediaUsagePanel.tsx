import { useMemo, useState } from 'react'
import { TriangleAlert, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { MediaPicker } from '@/components/admin/MediaPicker'
import { PlacedImage } from '@/components/ui/PlacedMedia'
import { apiDelete } from '@/lib/api'
import { usageOf, type MediaLibraryDocument, type MediaRecord } from '@/data/mediaLibrary'
import type { ManagedContentItem } from '@/data/contentControl'
import type { Concept } from '@/data/conceptGraph'

/**
 * Who shares this image, and the two different things you might mean by
 * changing it.
 *
 * Replacing the file changes every item at once, which is the point of reuse
 * and also its hazard. Re-pointing changes only what is ticked. They are
 * separate controls rather than one dialog with a checkbox, because a reviewer
 * who wanted the second and got the first has silently edited every other item
 * on this list without opening one of them.
 */
export function MediaUsagePanel({ record, ledger, concepts, onLedger, onLibrary, onClose }: {
  record: MediaRecord
  ledger: ManagedContentItem[]
  concepts: Concept[]
  onLedger: (update: (items: ManagedContentItem[]) => ManagedContentItem[]) => void
  onLibrary: (update: (document: MediaLibraryDocument) => MediaLibraryDocument) => void
  onClose: () => void
}) {
  const usage = useMemo(() => usageOf(record.id, ledger, concepts), [record.id, ledger, concepts])
  const [ticked, setTicked] = useState<Set<string>>(new Set())
  const [repointing, setRepointing] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function toggle(placementId: string) {
    setTicked((current) => {
      const next = new Set(current)
      if (next.has(placementId)) next.delete(placementId)
      else next.add(placementId)
      return next
    })
  }

  /** Point the ticked placements at a different record. Nothing else moves. */
  function repointTicked(mediaId: string) {
    onLedger((items) => items.map((item) => {
      const placements = item.questionData?.media
      if (!placements?.some((placement) => ticked.has(placement.id))) return item
      return {
        ...item,
        questionData: {
          ...item.questionData!,
          media: placements.map((placement) => ticked.has(placement.id) ? { ...placement, mediaId } : placement),
        },
      }
    }))
    setMessage(`${ticked.size} item${ticked.size === 1 ? '' : 's'} now use a different image. The rest are unchanged.`)
    setTicked(new Set())
    setRepointing(false)
  }

  async function remove() {
    setBusy(true)
    setError('')
    try {
      await apiDelete(`/media/${encodeURIComponent(record.id)}`)
      onLibrary((document) => ({
        ...document,
        records: (document.records ?? []).filter((candidate) => candidate.id !== record.id),
      }))
      onClose()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'That image could not be deleted.')
    } finally {
      setBusy(false)
    }
  }

  const repointable = usage.filter((entry) => entry.placementId)

  return (
    <Panel className="p-4">
      <div className="flex flex-wrap items-start gap-3">
        <div className="w-32 shrink-0"><PlacedImage record={record} className="max-h-24 w-full rounded object-contain" /></div>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-ink">{record.title}</p>
          <p className="mt-0.5 text-[11.5px] text-ink-3">{record.width}×{record.height} · {record.mimeType} · {Math.round(record.sizeBytes / 1024)} KB</p>
          <p className="mt-1 text-[12px] text-ink-2">{record.altText || <span className="text-warning">no alt text — held back from students</span>}</p>
        </div>
        <Button size="sm" variant="ghost" onClick={onClose}>Close</Button>
      </div>

      <p className="mt-4 text-[12.5px] font-semibold text-ink">
        {usage.length === 0
          ? 'Nothing uses this image yet.'
          : `${usage.length} item${usage.length === 1 ? '' : 's'} use this image.`}
      </p>

      {usage.length > 0 && (
        <ul className="mt-2 divide-y divide-line rounded-lg border border-line">
          {usage.map((entry) => (
            <li key={`${entry.ownerId}-${entry.placementId ?? entry.where}`} className="flex items-center gap-2 px-3 py-2">
              <input
                type="checkbox"
                className="size-4 accent-primary"
                aria-label={`Select ${entry.ownerTitle}`}
                disabled={!entry.placementId}
                checked={entry.placementId ? ticked.has(entry.placementId) : false}
                onChange={() => entry.placementId && toggle(entry.placementId)}
              />
              <Badge tone="outline">{entry.ownerKind}</Badge>
              <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink">{entry.ownerTitle}</span>
              <span className="text-[11.5px] text-ink-3">{entry.where}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-line p-3">
          <p className="text-[12.5px] font-semibold text-ink">Replace this image everywhere</p>
          <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-2">
            Temporarily unavailable while global replacement is moved into one server transaction. This prevents a partial
            replacement from leaving some questions or concepts on the old file. Use the ticked-item control for explicit
            question placements in the meantime.
          </p>
          <Button className="mt-2" size="sm" variant="secondary" disabled>Server-safe replacement coming next</Button>
        </div>

        <div className="rounded-lg border border-line p-3">
          <p className="text-[12.5px] font-semibold text-ink">Use a different image for the ticked items</p>
          <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-2">
            Points {ticked.size ? `${ticked.size} ticked item${ticked.size === 1 ? '' : 's'}` : 'the items you tick'} at another
            image. Everything unticked keeps this one. Use this when only some of them were wrong.
          </p>
          <Button
            className="mt-2"
            size="sm"
            variant="secondary"
            disabled={ticked.size === 0 || repointable.length === 0}
            onClick={() => setRepointing(true)}
          >
            Choose the other image
          </Button>
        </div>
      </div>

      {repointing && (
        <div className="mt-3"><MediaPicker onPick={repointTicked} onCancel={() => setRepointing(false)} /></div>
      )}

      <div className="mt-4 border-t border-line pt-3">
        <Button size="sm" variant="ghost" iconLeft={Trash2} loading={busy} onClick={() => void remove()}>Delete this image</Button>
        {usage.length > 0 && (
          <p className="mt-1 flex items-start gap-1.5 text-[11.5px] leading-relaxed text-ink-2">
            <Icon icon={TriangleAlert} size={13} className="mt-0.5 shrink-0 text-warning" />
            The server will refuse while anything above still renders it.
          </p>
        )}
      </div>

      {message && <p role="status" className="mt-3 text-[11.5px] leading-relaxed text-ink-2">{message}</p>}
      {error && <p role="alert" className="mt-3 text-[11.5px] leading-relaxed text-danger">{error}</p>}
    </Panel>
  )
}
