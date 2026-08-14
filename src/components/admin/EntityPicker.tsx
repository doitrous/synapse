import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Plus, Search, TriangleAlert, X } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

/** One thing that can be picked — a concept, an article, a module, a chapter. */
export interface PickerOption {
  id: string
  label: string
  /** Second line: the ID, a division, a subject. Searched as well as shown. */
  sublabel?: string
  /** Heading this option sits under. Anything without one falls to the end. */
  group?: string
  /** Matched by the search but never shown — aliases, definitions. */
  keywords?: string
}

/**
 * Past this many rows the list stops being something you read and starts being
 * something you scroll past, and rendering it costs more than it returns. The
 * remainder is never hidden silently: the footer says how many are left.
 */
const LIST_CAP = 200

const UNGROUPED = 'Everything else'

function matches(option: PickerOption, query: string): boolean {
  return `${option.label} ${option.sublabel ?? ''} ${option.keywords ?? ''}`.toLowerCase().includes(query)
}

/**
 * A search-led multi-select.
 *
 * The admin had four different ways to attach one thing to another — a checkbox
 * list, a checkbox grid, a chip field, and a textarea of raw IDs — so the same job
 * felt different in every editor, and the textarea happily stored IDs that matched
 * nothing. This is the one way: press the field to see everything, type to narrow
 * it live, and what you pick becomes a chip and leaves the list.
 *
 * Nothing can be typed into existence. An ID already stored that matches no option
 * still shows, flagged, so a bad value surfaces instead of sitting there silently.
 */
export function EntityPicker({
  label,
  hint,
  noun,
  options,
  selected,
  onChange,
  placeholder,
  derived = [],
  derivedNote,
  emptyText,
  className,
}: {
  label: string
  hint?: string
  /** Plural, for the counts: "concepts", "articles", "modules". */
  noun: string
  options: PickerOption[]
  selected: string[]
  onChange: (ids: string[]) => void
  placeholder?: string
  /** Ids linked from the other side of the relationship — shown, not editable here. */
  derived?: string[]
  derivedNote?: string
  emptyText?: string
  className?: string
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const inputId = useId()
  const listId = `${inputId}-list`
  const listRef = useRef<HTMLDivElement>(null)

  const byId = useMemo(() => new Map(options.map((option) => [option.id, option])), [options])
  const chosen = useMemo(() => new Set(selected), [selected])
  const derivedOnly = useMemo(() => derived.filter((id) => !chosen.has(id)), [chosen, derived])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return options.filter((option) => !chosen.has(option.id) && (!q || matches(option, q)))
  }, [chosen, options, query])

  // Grouped for display, but the flat order is what the arrow keys walk, so the
  // two have to agree — the groups are built from the capped slice, not re-sorted.
  const shown = useMemo(() => results.slice(0, LIST_CAP), [results])
  const groups = useMemo(() => {
    const map = new Map<string, PickerOption[]>()
    shown.forEach((option) => {
      const key = option.group ?? UNGROUPED
      const bucket = map.get(key)
      if (bucket) bucket.push(option)
      else map.set(key, [option])
    })
    return [...map.entries()]
  }, [shown])
  const flat = useMemo(() => groups.flatMap(([, entries]) => entries), [groups])

  useEffect(() => { setActive(0) }, [query])

  useEffect(() => {
    if (!open) return
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  const available = options.length - chosen.size
  const filtering = query.trim().length > 0

  function add(id: string) {
    if (chosen.has(id)) return
    onChange([...selected, id])
    setQuery('')
    setActive(0)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') { setOpen(false); return }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) { setOpen(true); return }
      if (!flat.length) return
      const step = event.key === 'ArrowDown' ? 1 : -1
      setActive((current) => (current + step + flat.length) % flat.length)
      return
    }
    if (event.key === 'Enter') {
      // Enter inside a dialog would otherwise submit the form behind the picker.
      event.preventDefault()
      const option = flat[active]
      if (open && option) add(option.id)
      else setOpen(true)
    }
  }

  return (
    <div
      className={cn('min-w-0', className)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false) }}
    >
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={inputId} className="text-[12.5px] font-medium text-ink-2">{label}</label>
        <span className="tnum shrink-0 font-mono text-[10.5px] text-ink-3">
          {filtering ? `${results.length} of ${available} ${noun}` : `${available} ${noun}`}
        </span>
      </div>

      <div className="relative">
        <Icon icon={Search} size={15} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-ink-3" />
        <input
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          placeholder={placeholder ?? `Search ${noun}…`}
          onChange={(event) => { setQuery(event.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="h-11 w-full rounded-md border border-line bg-surface ps-9 pe-3 text-[13.5px] text-ink transition-colors placeholder:text-ink-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-accent)_18%,transparent)] sm:h-9"
        />
      </div>
      {hint && <p className="mt-1 text-[11px] text-ink-3">{hint}</p>}

      {open && (
        <div ref={listRef} id={listId} role="listbox" className="mt-1 max-h-64 overflow-y-auto rounded-lg border border-line bg-surface p-1 shadow-panel">
          {flat.length === 0 ? (
            <p className="px-2 py-6 text-center text-[12px] text-ink-3">
              {available === 0 ? (emptyText ?? `Everything available is already added.`) : `Nothing matches “${query.trim()}”.`}
            </p>
          ) : (
            groups.map(([group, entries]) => (
              <div key={group}>
                <p className="sticky top-0 z-10 bg-surface px-2 py-1 text-[10px] font-bold uppercase tracking-[0.07em] text-ink-3">{group}</p>
                {entries.map((option) => {
                  const index = flat.indexOf(option)
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="option"
                      aria-selected={index === active}
                      data-active={index === active}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => add(option.id)}
                      className={cn('flex w-full items-start gap-2 rounded-md px-2 py-2 text-start', index === active ? 'bg-inset' : 'hover:bg-inset')}
                    >
                      <Icon icon={Plus} size={13} className="mt-0.5 shrink-0 text-accent" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12px] leading-snug text-ink">{option.label}</span>
                        {option.sublabel && <span className="block truncate font-mono text-[9.5px] text-ink-3">{option.sublabel}</span>}
                      </span>
                    </button>
                  )
                })}
              </div>
            ))
          )}
          {results.length > shown.length && (
            <p className="border-t border-line px-2 py-1.5 text-[10.5px] text-ink-3">
              Showing the first {LIST_CAP} of {results.length}. Keep typing to narrow it.
            </p>
          )}
        </div>
      )}

      {(selected.length > 0 || derivedOnly.length > 0) && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selected.map((id) => {
            const option = byId.get(id)
            return (
              <span
                key={id}
                className={cn(
                  'inline-flex max-w-full items-center gap-1 rounded-full border px-2 py-1 text-[10.5px]',
                  option ? 'border-line bg-surface-2 text-ink-2' : 'border-warning/40 bg-warning-tint text-warning',
                )}
                title={option ? option.sublabel ?? option.id : `${id} — no longer matches anything`}
              >
                {!option && <Icon icon={TriangleAlert} size={10} className="shrink-0" />}
                <span className="truncate">{option?.label ?? id}</span>
                <button
                  type="button"
                  className="shrink-0 text-ink-3 hover:text-danger"
                  aria-label={`Remove ${option?.label ?? id}`}
                  onClick={() => onChange(selected.filter((entry) => entry !== id))}
                >
                  <Icon icon={X} size={11} />
                </button>
              </span>
            )
          })}
          {derivedOnly.map((id) => (
            <span
              key={id}
              className="inline-flex max-w-full items-center gap-1 rounded-full border border-dashed border-line-2 bg-surface px-2 py-1 text-[10.5px] text-ink-3"
              title={derivedNote ?? 'Linked from the other side'}
            >
              <span className="truncate">{byId.get(id)?.label ?? id}</span>
            </span>
          ))}
        </div>
      )}
      {derivedOnly.length > 0 && derivedNote && <p className="mt-1 text-[10.5px] text-ink-3">{derivedNote}</p>}
    </div>
  )
}
