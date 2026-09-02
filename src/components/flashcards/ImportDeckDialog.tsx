import { useRef, useState } from 'react'
import { FileUp, CheckCircle2, AlertTriangle } from 'lucide-react'
import { NishanyLoader } from '@/components/ui/NishanyLoader'
import { Dialog } from '@/components/ui/Dialog'
import { PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Checkbox } from '@/components/ui/Checkbox'
import { Badge } from '@/components/ui/Badge'
import { useT } from '@/lib/i18n'
import { useMyDocuments } from '@/lib/useMyDocuments'
import type { FlashcardsApi } from '@/lib/useFlashcards'
import type { ImportReport } from '@/lib/anki/mapper'
import type { AnkiContainer } from '@/lib/anki/container'
import type { AnkiPackage } from '@/lib/anki/ankiDb'
import type { ParsedRow, TextFormat } from '@/lib/anki/csvText'

interface PackageData {
  kind: 'package'
  container: AnkiContainer
  pkg: AnkiPackage
  mediaBytes: number
}
interface TextData {
  kind: 'text'
  rows: ParsedRow[]
  format: TextFormat
}

const PACKAGE_EXTS = /\.(apkg|colpkg)$/i

function uniqueId(prefix: string): () => string {
  return () => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function humanBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Imports an Anki `.apkg`/`.colpkg` or a CSV/TSV/text deck into the student's
 * collection. The heavy Anki pipeline (zip + sql.js) is loaded on demand so it
 * never enters the main bundle. Media is uploaded to My Documents, which counts
 * against the student's Resources allowance — checked before the upload starts.
 */
export function ImportDeckDialog({ api, onClose }: { api: FlashcardsApi; onClose: () => void }) {
  const t = useT()
  const docs = useMyDocuments()
  const inputRef = useRef<HTMLInputElement>(null)

  const [fileName, setFileName] = useState('')
  const [data, setData] = useState<PackageData | TextData | null>(null)
  const [report, setReport] = useState<ImportReport | null>(null)
  const [deckName, setDeckName] = useState('')
  const [preserve, setPreserve] = useState(false)
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<{ decks: number; notes: number; cards: number } | null>(null)

  const quotaLeft = docs.quotaBytes > 0 ? docs.quotaBytes - docs.usedBytes : Infinity
  const overQuota =
    data?.kind === 'package' && docs.synced && data.mediaBytes > 0 && data.mediaBytes > quotaLeft

  async function analyze(file: File): Promise<void> {
    setError(null)
    setBusy(true)
    setFileName(file.name)
    setDeckName(file.name.replace(/\.[^.]+$/, ''))
    try {
      if (PACKAGE_EXTS.test(file.name)) {
        const [{ readAnkiPackage }, { readAnkiDb }, { mapAnkiPackage }] = await Promise.all([
          import('@/lib/anki/container'),
          import('@/lib/anki/ankiDb'),
          import('@/lib/anki/mapper'),
        ])
        const container = await readAnkiPackage(await file.arrayBuffer())
        const pkg = await readAnkiDb(container.sqlite)
        const preview = mapAnkiPackage(pkg, { preserveSchedule: false, now: new Date(), idFactory: uniqueId('note') })
        const needed = new Set(preview.mediaRefsNeeded)
        const mediaBytes = container.media
          .filter((m) => needed.has(m.ankiName))
          .reduce((sum, m) => sum + m.bytes.length, 0)
        setData({ kind: 'package', container, pkg, mediaBytes })
        setReport(preview.report)
      } else {
        const { detectTextFormat, parsePipeLines, parseFrontBackTagsCsv, parseAnkiCsv } = await import('@/lib/anki/csvText')
        const text = await file.text()
        const format = detectTextFormat(text)
        const rows =
          format === 'anki' ? parseAnkiCsv(text) : format === 'csv' ? parseFrontBackTagsCsv(text) : parsePipeLines(text)
        setData({ kind: 'text', rows, format })
        setReport({ decks: 1, notes: rows.length, cards: rows.length, mediaRefs: 0, approximations: [] })
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t('That file could not be read as an Anki deck.'))
      setData(null)
      setReport(null)
    } finally {
      setBusy(false)
    }
  }

  async function commit(): Promise<void> {
    if (!data) return
    setBusy(true)
    setError(null)
    try {
      if (data.kind === 'package') {
        const [{ mapAnkiPackage }, { materializeMedia }] = await Promise.all([
          import('@/lib/anki/mapper'),
          import('@/lib/anki/media'),
        ])
        const mapped = mapAnkiPackage(data.pkg, { preserveSchedule: preserve, now: new Date(), idFactory: uniqueId('note') })
        setProgress({ done: 0, total: mapped.mediaRefsNeeded.length })
        const { notes } = await materializeMedia(mapped, data.container, docs.upload, (d, total) => setProgress({ done: d, total }))
        api.importCollection({ decks: mapped.decks, notes, meta: mapped.meta })
        setDone({ decks: mapped.decks.length, notes: notes.length, cards: mapped.report.cards })
      } else {
        const { rowsToBasicNotes } = await import('@/lib/anki/csvText')
        const { decks, notes } = rowsToBasicNotes(data.rows, {
          deckId: uniqueId('deck')(),
          deckName,
          html: data.format === 'anki',
          now: new Date(),
          idFactory: uniqueId('note'),
        })
        api.importCollection({ decks, notes })
        setDone({ decks: decks.length, notes: notes.length, cards: notes.length })
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t('The import could not be completed.'))
    } finally {
      setBusy(false)
      setProgress(null)
    }
  }

  return (
    <Dialog onClose={onClose} label={t('Import deck')} size="md">
      <PanelHeader title={t('Import deck')} icon={FileUp} />

      <div className="space-y-4 p-4">
        {done ? (
          <div className="space-y-3 text-center">
            <CheckCircle2 className="mx-auto text-emerald-500" size={32} />
            <p className="text-[13px] text-ink-2">
              {t('Imported')} <span className="tnum font-medium">{done.notes}</span> {t('notes into')}{' '}
              <span className="tnum font-medium">{done.decks}</span> {done.decks === 1 ? t('deck') : t('decks')}.
            </p>
            <Button variant="primary" size="sm" onClick={onClose}>
              {t('Done')}
            </Button>
          </div>
        ) : (
          <>
            <div>
              <input
                ref={inputRef}
                type="file"
                accept=".apkg,.colpkg,.csv,.tsv,.txt"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) void analyze(file)
                }}
              />
              <Button variant="secondary" size="sm" iconLeft={FileUp} onClick={() => inputRef.current?.click()} disabled={busy}>
                {fileName || t('Choose a .apkg, .colpkg, or CSV/text file')}
              </Button>
              <p className="mt-1.5 text-[12px] text-ink-3">
                {t('Supports Anki .apkg / .colpkg (legacy and current) and CSV/TSV/“front | back” text.')}
              </p>
            </div>

            {busy && !progress && (
              <p className="flex items-center gap-2 text-[12.5px] text-ink-3">
                <NishanyLoader mini /> {t('Reading file…')}
              </p>
            )}

            {report && (
              <div className="rounded-lg border border-line p-3">
                <div className="flex flex-wrap gap-2">
                  <Badge>{report.notes} {t('notes')}</Badge>
                  <Badge>{report.cards} {t('cards')}</Badge>
                  <Badge>{report.decks} {report.decks === 1 ? t('deck') : t('decks')}</Badge>
                  {report.mediaRefs > 0 && <Badge>{report.mediaRefs} {t('media')}</Badge>}
                </div>
                {report.approximations.length > 0 && (
                  <ul className="mt-2 space-y-1 text-[12px] text-ink-3">
                    {report.approximations.map((a) => (
                      <li key={a} className="flex gap-1.5">
                        <AlertTriangle className="mt-0.5 shrink-0 text-amber-500" size={12} /> {a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {data?.kind === 'text' && (
              <Field label={t('Deck name')}>
                <TextInput value={deckName} onChange={(e) => setDeckName(e.target.value)} placeholder={t('Imported')} />
              </Field>
            )}

            {data?.kind === 'package' && (
              <Checkbox
                checked={preserve}
                onChange={setPreserve}
                label={t('Preserve due dates and ease')}
              />
            )}
            {data?.kind === 'package' && (
              <p className="text-[12px] text-ink-3">
                {preserve
                  ? t('Imported cards keep their Anki interval and ease.')
                  : t('Imported cards start fresh in your scheduler.')}
              </p>
            )}

            {data?.kind === 'package' && data.mediaBytes > 0 && (
              <p className={overQuota ? 'text-[12px] text-rose-500' : 'text-[12px] text-ink-3'}>
                {t('Media')}: {humanBytes(data.mediaBytes)}
                {docs.synced && docs.quotaBytes > 0 && (
                  <> — {humanBytes(Math.max(0, quotaLeft))} {t('of your storage remaining')}</>
                )}
                {overQuota && <> · {t('not enough space; free up storage in Resources first.')}</>}
              </p>
            )}

            {progress && (
              <p className="flex items-center gap-2 text-[12.5px] text-ink-3">
                <NishanyLoader mini /> {t('Uploading media')} {progress.done}/{progress.total}…
              </p>
            )}

            {error && <p className="text-[12.5px] text-rose-500">{error}</p>}

            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={onClose} disabled={busy}>
                {t('Cancel')}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => void commit()}
                loading={busy && !!progress}
                disabled={!data || busy || overQuota}
              >
                {t('Import')}
              </Button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  )
}
