import { useMemo, useState } from 'react'
import { Download } from 'lucide-react'
import { NishanyLoader } from '@/components/ui/NishanyLoader'
import { Dialog } from '@/components/ui/Dialog'
import { PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Field, Select } from '@/components/ui/Field'
import { Checkbox } from '@/components/ui/Checkbox'
import { useT } from '@/lib/i18n'
import { useMyDocuments } from '@/lib/useMyDocuments'
import { resolveMediaSource } from '@/lib/mediaStorage'
import type { FlashcardsApi } from '@/lib/useFlashcards'
import type { FetchedMedia } from '@/lib/anki/exportApkg'

type Format = 'apkg' | 'anki-tsv' | 'csv' | 'pipe'

const FORMAT_META: Record<Format, { label: string; ext: string; mime: string }> = {
  apkg: { label: 'Anki package (.apkg)', ext: 'apkg', mime: 'application/octet-stream' },
  'anki-tsv': { label: 'Anki text (.txt, tab-separated)', ext: 'txt', mime: 'text/plain' },
  csv: { label: 'CSV (front,back,tags)', ext: 'csv', mime: 'text/csv' },
  pipe: { label: 'Plain text (front | back)', ext: 'txt', mime: 'text/plain' },
}

const MIME_EXT: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
  'audio/mpeg': 'mp3',
  'audio/ogg': 'ogg',
  'audio/wav': 'wav',
  'audio/mp4': 'm4a',
}

function safeFileName(name: string): string {
  return name.replace(/[^a-z0-9_-]+/gi, '_').replace(/^_+|_+$/g, '') || 'flashcards'
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

/**
 * Exports selected decks to a legacy `.apkg` (reimports into current Anki) or a
 * CSV/TSV/text file. The Anki package builder (sql.js + zip) loads on demand.
 */
export function ExportDeckDialog({ api, onClose }: { api: FlashcardsApi; onClose: () => void }) {
  const t = useT()
  const docs = useMyDocuments()

  // Only authored decks have stored notes; provided (catalogue) decks are not
  // part of the student's own collection and cannot be exported.
  const decks = useMemo(() => api.decks.filter((d) => !d.provided), [api.decks])
  const [selected, setSelected] = useState<Set<string>>(() => new Set(decks.map((d) => d.id)))
  const [format, setFormat] = useState<Format>('apkg')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  async function fetchMedia(reference: string): Promise<FetchedMedia | null> {
    try {
      const { url, revoke } = await resolveMediaSource(reference)
      const res = await fetch(url)
      const blob = await res.blob()
      if (revoke) URL.revokeObjectURL(url)
      const bytes = new Uint8Array(await blob.arrayBuffer())
      const id = reference.slice(reference.indexOf(':') + 1)
      const known = docs.items.find((d) => d.id === id)?.fileName
      const ext = MIME_EXT[blob.type] ?? 'bin'
      return { name: known || `${safeFileName(id)}.${ext}`, bytes }
    } catch {
      return null
    }
  }

  async function run(): Promise<void> {
    const deckIds = [...selected]
    if (deckIds.length === 0) return
    setBusy(true)
    setError(null)
    try {
      const baseName = deckIds.length === 1 ? decks.find((d) => d.id === deckIds[0])?.name ?? 'deck' : 'flashcards'
      const meta = FORMAT_META[format]
      if (format === 'apkg') {
        const { exportDecksToApkg } = await import('@/lib/anki/exportApkg')
        const blob = await exportDecksToApkg(api.collection, deckIds, fetchMedia)
        triggerDownload(blob, `${safeFileName(baseName)}.${meta.ext}`)
      } else {
        const { exportDecksToText } = await import('@/lib/anki/exportText')
        const text = exportDecksToText(api.collection, deckIds, format)
        triggerDownload(new Blob([text], { type: meta.mime }), `${safeFileName(baseName)}.${meta.ext}`)
      }
      onClose()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t('The export could not be created.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog onClose={onClose} label={t('Export decks')} size="md">
      <PanelHeader title={t('Export decks')} icon={Download} />

      <div className="space-y-4 p-4">
        {decks.length === 0 ? (
          <p className="text-[12.5px] text-ink-3">{t('You have no decks of your own to export yet.')}</p>
        ) : (
          <>
            <Field label={t('Decks')}>
              <ul className="max-h-52 space-y-1 overflow-y-auto rounded-lg border border-line p-2">
                {decks.map((deck) => (
                  <li key={deck.id} className="flex items-center gap-2">
                    <Checkbox checked={selected.has(deck.id)} onChange={() => toggle(deck.id)} label={deck.name} />
                    <span className="text-[13px] text-ink-2">{deck.name}</span>
                    <span className="tnum ms-auto text-[12px] text-ink-3">{deck.counts.total}</span>
                  </li>
                ))}
              </ul>
            </Field>

            <Field label={t('Format')}>
              <Select value={format} onChange={(e) => setFormat(e.target.value as Format)}>
                {(Object.keys(FORMAT_META) as Format[]).map((f) => (
                  <option key={f} value={f}>
                    {FORMAT_META[f].label}
                  </option>
                ))}
              </Select>
            </Field>

            {format === 'apkg' && (
              <p className="text-[12px] text-ink-3">{t('Images and audio are bundled into the package.')}</p>
            )}

            {error && <p className="text-[12.5px] text-rose-500">{error}</p>}

            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={onClose} disabled={busy}>
                {t('Cancel')}
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconLeft={busy ? undefined : Download}
                onClick={() => void run()}
                loading={busy}
                disabled={busy || selected.size === 0}
              >
                {busy ? <NishanyLoader mini /> : t('Export')}
              </Button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  )
}
