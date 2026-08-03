import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Search, CornerDownLeft } from 'lucide-react'
import { studentNav, adminNav } from './nav'
import { Icon } from '@/components/ui/Icon'
import { Kbd } from '@/components/ui/Kbd'
import { cn } from '@/lib/cn'

interface Cmd {
  label: string
  to: string
  icon: LucideIcon
  group: string
}

const COMMANDS: Cmd[] = [
  ...studentNav.flatMap((g) => g.items.map((i) => ({ ...i, group: 'Student app' }))),
  ...adminNav.flatMap((g) => g.items.map((i) => ({ ...i, group: 'Admin console' }))),
]

export function CommandSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMANDS
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q))
  }, [query])

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
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search Osler">
      <button type="button" aria-label="Close search" className="absolute inset-0 size-full cursor-default bg-ink/25 animate-fade" onClick={onClose} />
      <div className="absolute left-1/2 top-[calc(env(safe-area-inset-top)+0.75rem)] w-[min(94vw,560px)] -translate-x-1/2 sm:top-[12vh] sm:w-[min(92vw,560px)]">
        <div
          className="animate-pop overflow-hidden rounded-xl border border-line bg-surface shadow-pop"
          onKeyDown={onKeyDown}
        >
          <div className="flex items-center gap-2.5 border-b border-line px-4">
            <Icon icon={Search} size={17} className="text-ink-3" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, questions, resources, admin…"
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
                        'flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-[13.5px] transition-colors',
                        i === active ? 'bg-accent-tint text-accent-strong' : 'text-ink hover:bg-inset',
                      )}
                    >
                      <Icon
                        icon={cmd.icon}
                        size={16}
                        className={i === active ? 'text-accent' : 'text-ink-3'}
                      />
                      <span className="flex-1 truncate">{cmd.label}</span>
                      {i === active && <Icon icon={CornerDownLeft} size={14} className="text-accent" />}
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
