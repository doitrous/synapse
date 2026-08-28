import { useMemo, useRef, useState, type Ref } from 'react'
import { Tag, X, Plus } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'

/**
 * A searchable multi-select over a note's tags.
 *
 * Existing tags are offered as a filtered list; a query that matches nothing
 * offers to create it. Selected tags read as removable chips inside the field,
 * Backspace on an empty query lifts the last one, and the whole control is
 * driven from the keyboard so it stays usable without a pointer. The input is
 * exposed through `inputRef` so an owning form can focus it from a shortcut.
 */
export function TagSelect({
  value,
  options,
  onChange,
  inputRef,
  id,
}: {
  value: string[]
  options: string[]
  onChange: (tags: string[]) => void
  inputRef?: Ref<HTMLInputElement>
  id?: string
}) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const listId = useRef(`tag-list-${Math.random().toString(36).slice(2, 7)}`).current

  const trimmed = query.trim()
  const selected = useMemo(() => new Set(value.map((tag) => tag.toLowerCase())), [value])

  const matches = useMemo(() => {
    const q = trimmed.toLowerCase()
    return options
      .filter((tag) => !selected.has(tag.toLowerCase()))
      .filter((tag) => (q === '' ? true : tag.toLowerCase().includes(q)))
      .slice(0, 50)
  }, [options, selected, trimmed])

  const canCreate = trimmed !== '' && !options.some((tag) => tag.toLowerCase() === trimmed.toLowerCase()) && !selected.has(trimmed.toLowerCase())

  // The option rows the arrow keys move over: existing matches, then "create".
  const rowCount = matches.length + (canCreate ? 1 : 0)

  function add(tag: string) {
    const clean = tag.trim()
    if (!clean || selected.has(clean.toLowerCase())) return
    onChange([...value, clean])
    setQuery('')
    setHighlight(0)
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  function commitHighlighted() {
    if (rowCount === 0) return
    if (highlight < matches.length) {
      add(matches[highlight])
    } else if (canCreate) {
      add(trimmed)
    }
  }

  return (
    <div>
      <div
        ref={setAnchor}
        className={cn(
          'flex min-h-11 flex-wrap items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-1.5 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] sm:min-h-9',
        )}
        onClick={() => {
          const input = anchor?.querySelector('input')
          input?.focus()
          setOpen(true)
        }}
      >
        {value.map((tag, index) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full border border-accent-line bg-accent-tint py-0.5 pe-1 ps-2 text-[12px] font-medium text-accent-strong"
          >
            <Icon icon={Tag} size={11} />
            {tag}
            <button
              type="button"
              aria-label={t('Remove tag')}
              onClick={(event) => {
                event.stopPropagation()
                removeAt(index)
              }}
              className="grid size-4 place-items-center rounded-full text-accent-strong/80 transition-colors hover:bg-accent-line hover:text-accent-strong"
            >
              <Icon icon={X} size={11} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          value={query}
          placeholder={value.length === 0 ? t('Add tags…') : ''}
          className="h-7 min-w-[6rem] flex-1 border-0 bg-transparent px-1 text-[13.5px] text-ink placeholder:text-ink-3 focus:outline-none"
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value)
            setHighlight(0)
            setOpen(true)
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setOpen(true)
              setHighlight((h) => (rowCount === 0 ? 0 : (h + 1) % rowCount))
            } else if (event.key === 'ArrowUp') {
              event.preventDefault()
              setHighlight((h) => (rowCount === 0 ? 0 : (h - 1 + rowCount) % rowCount))
            } else if (event.key === 'Enter') {
              if (rowCount > 0) {
                event.preventDefault()
                commitHighlighted()
              }
            } else if (event.key === 'Backspace' && query === '' && value.length > 0) {
              event.preventDefault()
              removeAt(value.length - 1)
            } else if (event.key === 'Escape') {
              if (open) {
                event.preventDefault()
                close()
              }
            }
          }}
        />
      </div>

      {open && rowCount > 0 && (
        <Popover anchor={anchor} onClose={close} placement="bottom-start" matchAnchorWidth role="listbox" label={t('Tags')} className="py-1">
          <ul id={listId} className="max-h-64 overflow-y-auto">
            {matches.map((tag, index) => (
              <li key={tag}>
                <button
                  type="button"
                  role="option"
                  aria-selected={highlight === index}
                  // Pointer-down so the field's blur doesn't beat the click.
                  onMouseDown={(event) => {
                    event.preventDefault()
                    add(tag)
                  }}
                  onMouseEnter={() => setHighlight(index)}
                  className={cn(
                    'flex w-full items-center gap-2 px-3 py-2 text-start text-[13px] transition-colors',
                    highlight === index ? 'bg-primary-tint text-primary-strong' : 'text-ink-2 hover:bg-inset',
                  )}
                >
                  <Icon icon={Tag} size={13} className="text-ink-3" />
                  {tag}
                </button>
              </li>
            ))}
            {canCreate && (
              <li>
                <button
                  type="button"
                  role="option"
                  aria-selected={highlight === matches.length}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    add(trimmed)
                  }}
                  onMouseEnter={() => setHighlight(matches.length)}
                  className={cn(
                    'flex w-full items-center gap-2 px-3 py-2 text-start text-[13px] transition-colors',
                    highlight === matches.length ? 'bg-primary-tint text-primary-strong' : 'text-ink-2 hover:bg-inset',
                  )}
                >
                  <Icon icon={Plus} size={13} className="text-ink-3" />
                  {t('Create')} <span className="font-medium text-ink">“{trimmed}”</span>
                </button>
              </li>
            )}
          </ul>
        </Popover>
      )}
    </div>
  )
}
