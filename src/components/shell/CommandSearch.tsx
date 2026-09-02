import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Search, CornerDownLeft, FileText } from 'lucide-react'
import { ROUTE_TITLES, studentNav, adminNavFor } from './nav'
import { useIdentity } from '@/lib/useIdentity'
import { Icon } from '@/components/ui/Icon'
import { Kbd } from '@/components/ui/Kbd'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

interface Cmd {
  label: string
  to: string
  icon: LucideIcon
  group: string
}

const STUDENT_COMMANDS: Cmd[] = studentNav.flatMap((g) => g.items.map((i) => ({ ...i, group: 'Student app' })))

/**
 * Paths that only exist to bounce somewhere else. They carry a `ROUTE_TITLES`
 * entry so the breadcrumb reads correctly for the instant before the redirect
 * lands, but offering one in the palette is offering a row that navigates
 * twice and ends up somewhere the row did not name.
 */
const REDIRECT_ONLY = new Set(['/app/study-together', '/app/billing', '/app/question-notes'])

/**
 * The pages the sidebar stopped listing.
 *
 * The palette used to *be* the nav, which was fine while the nav was every
 * route. It is nine items now, and a student typing "flashcards" has to reach
 * flashcards — otherwise shrinking the sidebar quietly removed twenty routes
 * from search.
 *
 * A label is offered once. The nav wins any tie — "Study Rooms" is a
 * destination, not a page you find by searching for the old name — and among
 * the remaining routes the first one declared is the canonical path, which is
 * how the `/app/terminology` alias keeps `/app/taxonomy` out of the list.
 */
const NAV_LABELS = new Set(STUDENT_COMMANDS.map((command) => command.label))

const STUDENT_PAGE_COMMANDS: Cmd[] = Object.entries(ROUTE_TITLES)
  .filter(([to]) => !REDIRECT_ONLY.has(to))
  .filter(([, label], index, all) =>
    !NAV_LABELS.has(label) && all.findIndex(([, other]) => other === label) === index)
  .map(([to, label]) => ({ label, to, icon: FileText, group: 'Student pages' }))

export function CommandSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT()
  const navigate = useNavigate()
  // The palette used to be a module constant listing every console surface,
  // which would offer a reviewer the payments page and take them to a redirect.
  // Offering a page somebody cannot open is the same bug as linking to it.
  const { tabs } = useIdentity()
  const commands = useMemo<Cmd[]>(() => [
    ...STUDENT_COMMANDS,
    ...STUDENT_PAGE_COMMANDS,
    ...adminNavFor(tabs).flatMap((g) => g.items.map((i) => ({ ...i, group: 'Admin console' }))),
  ], [tabs])
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      // focus after paint
      const id = requestAnimationFrame(() => inputRef.current?.focus())
      return () => cancelAnimationFrame(id)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    if (!open) return
    function trap(event: globalThis.KeyboardEvent) {
      if (event.key !== 'Tab' || !panelRef.current) return
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>('input, button:not([disabled]), a[href]'))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', trap, true)
    return () => document.removeEventListener('keydown', trap, true)
  }, [open])

  if (!open) return null

  function go(to: string) {
    navigate(to)
    onClose()
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const r = results[active]
      if (r) go(r.to)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={t('Search Nishany')}>
      <button type="button" aria-label={t('Close search')} className="absolute inset-0 size-full cursor-default bg-ink/25 animate-fade" onClick={onClose} />
      <div className="absolute left-1/2 top-[calc(env(safe-area-inset-top)+0.75rem)] w-[min(94vw,560px)] -translate-x-1/2 sm:top-[12vh] sm:w-[min(92vw,560px)]">
        <div
          ref={panelRef}
          className="animate-pop overflow-hidden rounded-xl border border-line bg-surface shadow-pop"
          onKeyDown={onKeyDown}
        >
          <div className="flex items-center gap-2.5 border-b border-line px-4 focus-within:ring-2 focus-within:ring-primary">
            <Icon icon={Search} size={17} className="text-ink-3" />
            <input
              ref={inputRef}
              aria-label={t('Search Nishany')}
              name="command-search"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('Search topics, questions, resources, admin…')}
              className="h-12 w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-3"
            />
            <Kbd>Esc</Kbd>
          </div>

          <div className="max-h-[calc(100dvh-10rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain p-2 sm:max-h-[52vh]">
            {results.length === 0 ? (
              <p className="px-3 py-8 text-center text-[13px] text-ink-2">
                No matches for “{query}”.
              </p>
            ) : (
              results.map((cmd, i) => {
                const showHeader = i === 0 || results[i - 1].group !== cmd.group
                return (
                  <div key={cmd.to}>
                    {showHeader && (
                      <div className="px-2 pt-2.5 pb-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-3">
                        {cmd.group}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => go(cmd.to)}
                      onMouseMove={() => setActive(i)}
                      className={cn(
                        'flex min-h-11 w-full items-center gap-2.5 rounded-md px-2 py-2 text-start text-[13.5px] transition-colors sm:min-h-0',
                        i === active ? 'bg-primary-tint text-primary-strong' : 'text-ink hover:bg-inset',
                      )}
                    >
                      <Icon
                        icon={cmd.icon}
                        size={16}
                        className={i === active ? 'text-primary' : 'text-ink-3'}
                      />
                      <span className="flex-1 truncate">{cmd.label}</span>
                      {i === active && <Icon icon={CornerDownLeft} size={14} className="text-primary" />}
                    </button>
                  </div>
                )
              })
            )}
          </div>

          <div className="flex items-center gap-4 border-t border-line px-4 py-2 text-[11.5px] text-ink-3">
            <span className="flex items-center gap-1.5">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>↵</Kbd>
              to open
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
