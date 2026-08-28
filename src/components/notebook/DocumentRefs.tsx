import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Plus, Upload, X } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { SearchInput } from '@/components/ui/Field'
import { useLiveResources } from '@/lib/useLiveResources'
import { useMyDocuments } from '@/lib/useMyDocuments'
import { uploadRouteId } from '@/lib/useReaderSource'
import { backState } from '@/components/ui/BackBar'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import type { NoteResourceRef } from '@/data/notebook'

/**
 * The documents a note is about.
 *
 * One list covering both the library's resources and the student's own
 * uploads, because from inside a note the difference does not matter — what
 * matters is getting back to the page you were reading. Each chip carries a
 * page when one was recorded, and a return trail, so following it is not a
 * one-way trip out of the notebook.
 */

export function DocumentRefs({
  refs,
  onChange,
  location,
}: {
  refs: NoteResourceRef[]
  onChange: (next: NoteResourceRef[]) => void
  /** The current location, for the "back to notebook" trail on each chip. */
  location: Parameters<typeof backState>[0]
}) {
  const t = useT()
  const picker = usePopoverTrigger()

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="me-1 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">{t('Documents')}</span>

      {refs.map((entry) => (
        <span key={`${entry.resourceId}-${entry.page ?? ''}`} className="inline-flex items-center gap-1 rounded-full border border-line bg-surface ps-1 shadow-panel">
          <Link
            to={`/app/resources/${encodeURIComponent(entry.resourceId)}${entry.page ? `?page=${entry.page}` : ''}`}
            state={backState(location, 'Back to notebook')}
            className="inline-flex items-center gap-1.5 rounded-full py-1 pe-1 ps-1.5 text-[12px] font-medium text-ink-2 hover:text-primary-strong"
          >
            <Icon icon={entry.resourceId.startsWith('my:') ? Upload : FileText} size={12} className="text-ink-3" />
            <span className="max-w-40 truncate">{entry.label}</span>
            {entry.page ? <span className="tnum font-mono text-[10.5px] text-ink-3">p.{entry.page}</span> : null}
          </Link>
          <button
            type="button"
            onClick={() => onChange(refs.filter((item) => item !== entry))}
            aria-label={`${t('Remove')} ${entry.label}`}
            className="grid size-5 place-items-center rounded-full text-ink-3 hover:bg-inset hover:text-ink"
          >
            <Icon icon={X} size={11} />
          </button>
        </span>
      ))}

      <button
        type="button"
        ref={picker.setAnchor}
        onClick={picker.toggle}
        aria-haspopup="dialog"
        aria-expanded={picker.open}
        className="inline-flex items-center gap-1 rounded-full border border-dashed border-line-2 px-2 py-1 text-[11.5px] font-medium text-ink-3 hover:border-primary-line hover:text-primary-strong"
      >
        <Icon icon={Plus} size={12} />{t('Reference a document')}
      </button>

      {picker.open && (
        <Popover anchor={picker.anchor} onClose={picker.close} placement="bottom-start" label={t('Reference a document')} className="w-80 p-2">
          <DocumentPicker
            chosen={refs.map((entry) => entry.resourceId)}
            onPick={(entry) => { onChange([...refs, entry]); picker.close() }}
          />
        </Popover>
      )}
    </div>
  )
}

function DocumentPicker({
  chosen,
  onPick,
}: {
  chosen: string[]
  onPick: (entry: NoteResourceRef) => void
}) {
  const t = useT()
  const [query, setQuery] = useState('')
  const resources = useLiveResources()
  const mine = useMyDocuments()

  const options = useMemo(() => {
    const taken = new Set(chosen)
    const all: { id: string; label: string; own: boolean }[] = [
      // Only what the reader can open. A file pinned to a whiteboard is on the
      // same account but is not something a note can cite a page of.
      ...mine.items.filter((item) => item.mediaType === 'pdf').map((item) => ({ id: uploadRouteId(item.id), label: item.title, own: true })),
      ...resources
        .filter((item) => item.type !== 'Video')
        .map((item) => ({ id: item.id, label: item.title, own: false })),
    ]
    const needle = query.trim().toLowerCase()
    return all
      .filter((item) => !taken.has(item.id))
      .filter((item) => !needle || item.label.toLowerCase().includes(needle))
      .slice(0, 40)
  }, [chosen, mine.items, query, resources])

  return (
    <div>
      <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('Search documents…')} />
      <ul className="mt-2 max-h-72 overflow-y-auto">
        {options.length === 0 && (
          <li className="px-2 py-6 text-center text-[12.5px] text-ink-3">{t('Nothing left to reference.')}</li>
        )}
        {options.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              onClick={() => onPick({ resourceId: option.id, label: option.label })}
              className={cn('flex w-full items-center gap-2 rounded-md px-2 py-2 text-start text-[12.5px] text-ink-2 hover:bg-inset hover:text-ink')}
            >
              <Icon icon={option.own ? Upload : FileText} size={13} className="shrink-0 text-ink-3" />
              <span className="min-w-0 flex-1 truncate">{option.label}</span>
              {option.own && <span className="shrink-0 rounded bg-inset px-1.5 py-0.5 text-[10px] font-medium text-ink-3">{t('Yours')}</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
