/**
 * The React binding for the command registry: one window listener, one source
 * of truth, and the two hooks a screen uses to plug in.
 *
 *   useCommands(commands)          — register commands while mounted
 *   useScope(scope, { exclusive }) — declare the active scope while mounted
 *
 * A screen lists its commands with their key specs and `run` handlers; the
 * provider owns the single `keydown` listener, the two-key sequence state, the
 * "G …" cue, and the `?` help dialog. Because the resolver is pure (`registry.ts`)
 * this file stays thin: it collects commands, computes the active scope order,
 * and dispatches — the policy lives in the tested core, not here.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { PanelHeader } from '@/components/ui/Panel'
import { Kbd } from '@/components/ui/Kbd'
import { IconButton } from '@/components/ui/IconButton'
import { X, Keyboard } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { detectMac, isEditableTarget, type Chord } from './keys.ts'
import { formatChord, helpModel, resolve, type Command, type Scope } from './registry.ts'

interface CommandSource {
  get: () => Command[]
}

interface ScopeReg {
  id: number
  scope: Scope
  exclusive: boolean
}

interface ShortcutsContextValue {
  isMac: boolean
  addSource: (source: CommandSource) => () => void
  addScope: (reg: Omit<ScopeReg, 'id'>) => () => void
  getCommands: () => Command[]
  cue: string | null
  openHelp: () => void
}

const ShortcutsContext = createContext<ShortcutsContextValue | null>(null)

const SEQUENCE_TIMEOUT_MS = 1400

export function ShortcutsProvider({ children, isMac: isMacProp }: { children: ReactNode; isMac?: boolean }) {
  const isMac = isMacProp ?? detectMac(typeof navigator === 'undefined' ? '' : navigator.platform)
  const sources = useRef<Set<CommandSource>>(new Set())
  const [scopes, setScopes] = useState<ScopeReg[]>([])
  const [cue, setCue] = useState<string | null>(null)
  const [helpOpen, setHelpOpen] = useState(false)
  const pending = useRef<Chord | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nextId = useRef(0)

  const clearPending = useCallback(() => {
    pending.current = null
    if (timer.current) clearTimeout(timer.current)
    setCue(null)
  }, [])

  const addSource = useCallback((source: CommandSource) => {
    sources.current.add(source)
    return () => {
      sources.current.delete(source)
    }
  }, [])

  const addScope = useCallback((reg: Omit<ScopeReg, 'id'>) => {
    const id = nextId.current++
    setScopes((current) => [...current, { ...reg, id }])
    return () => setScopes((current) => current.filter((s) => s.id !== id))
  }, [])

  // Active scopes, highest precedence first. An exclusive scope (a modal) stands
  // alone so nothing beneath it can fire; otherwise the most-recently mounted
  // scope leads and 'global' is always the fallback.
  const activeScopes = useMemo<Scope[]>(() => {
    const exclusive = [...scopes].reverse().find((s) => s.exclusive)
    if (exclusive) return [exclusive.scope]
    const ordered = [...scopes].reverse().map((s) => s.scope)
    return [...new Set([...ordered, 'global'])]
  }, [scopes])

  const openHelp = useCallback(() => setHelpOpen(true), [])
  const getCommands = useCallback(() => [...sources.current].flatMap((s) => s.get()), [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const commands = [...sources.current].flatMap((s) => s.get())
      const ctx = {
        isMac,
        activeScopes,
        isEditable: isEditableTarget(event.target as HTMLElement | null),
        isRepeat: event.repeat,
        pending: pending.current,
      }
      const result = resolve(commands, event, ctx)
      switch (result.type) {
        case 'run':
          event.preventDefault()
          clearPending()
          result.command.run(event)
          return
        case 'pending':
          event.preventDefault()
          pending.current = result.prefix
          setCue(formatChord(result.prefix, isMac))
          if (timer.current) clearTimeout(timer.current)
          timer.current = setTimeout(clearPending, SEQUENCE_TIMEOUT_MS)
          return
        case 'clear':
          event.preventDefault()
          clearPending()
          return
        case 'none':
          return
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMac, activeScopes, clearPending])

  const value = useMemo<ShortcutsContextValue>(
    () => ({ isMac, addSource, addScope, getCommands, cue, openHelp }),
    [isMac, addSource, addScope, getCommands, cue, openHelp],
  )

  return (
    <ShortcutsContext.Provider value={value}>
      {children}
      <BuiltInHelpCommand />
      {cue && <SequenceCue cue={cue} />}
      {helpOpen && <ShortcutHelpDialog onClose={() => setHelpOpen(false)} />}
    </ShortcutsContext.Provider>
  )
}

function useShortcutsContext(): ShortcutsContextValue {
  const ctx = useContext(ShortcutsContext)
  if (!ctx) throw new Error('useCommands/useScope must be used within a ShortcutsProvider')
  return ctx
}

/**
 * Register a set of commands while this component is mounted. Pass a memoized
 * array (its `run`/`when` closures capture current state, and the provider reads
 * the latest each keystroke, so a fresh array each render is fine and cheap).
 */
export function useCommands(commands: Command[]): void {
  const { addSource } = useShortcutsContext()
  const latest = useRef(commands)
  latest.current = commands
  useEffect(() => addSource({ get: () => latest.current }), [addSource])
}

/** Declare a scope active while mounted. `exclusive` gives a modal precedence. */
export function useScope(scope: Scope, options: { active?: boolean; exclusive?: boolean } = {}): void {
  const { addScope } = useShortcutsContext()
  const { active = true, exclusive = false } = options
  useEffect(() => {
    if (!active) return
    return addScope({ scope, exclusive })
  }, [addScope, scope, active, exclusive])
}

/** The pending-sequence hint ("G …"), shown briefly after the first key. */
export function useSequenceCue(): string | null {
  return useShortcutsContext().cue
}

/** Open the `?` shortcut reference imperatively (e.g. from a help button). */
export function useOpenShortcutHelp(): () => void {
  return useShortcutsContext().openHelp
}

function BuiltInHelpCommand() {
  const { openHelp } = useShortcutsContext()
  useCommands(
    useMemo<Command[]>(
      () => [
        {
          id: 'help.shortcuts',
          title: 'Shortcut reference',
          group: 'Help',
          scopes: ['global'],
          keys: '?',
          run: openHelp,
        },
      ],
      [openHelp],
    ),
  )
  return null
}

function SequenceCue({ cue }: { cue: string }) {
  const t = useT()
  return (
    <div
      className="animate-fade pointer-events-none fixed bottom-5 start-1/2 z-50 -translate-x-1/2 rounded-lg border border-line-2 bg-surface px-3 py-1.5 shadow-pop"
      role="status"
      aria-live="polite"
    >
      <span className="text-[12.5px] text-ink-2">
        <Kbd>{cue}</Kbd> <span className="text-ink-3">{t('then a key…')}</span>
      </span>
    </div>
  )
}

function ShortcutHelpDialog({ onClose }: { onClose: () => void }) {
  const t = useT()
  const { isMac, getCommands } = useShortcutsContext()
  // Snapshot whatever is registered at the moment the dialog opens.
  const groups = useMemo(() => helpModel(getCommands(), isMac), [getCommands, isMac])

  return (
    <Dialog onClose={onClose} label={t('Keyboard shortcuts')} size="lg">
      <PanelHeader
        title={t('Keyboard shortcuts')}
        icon={Keyboard}
        action={<IconButton icon={X} label={t('Close')} size="sm" onClick={onClose} />}
      />
      <div className="max-h-[65dvh] overflow-y-auto p-5">
        {groups.length === 0 ? (
          <p className="text-[13px] text-ink-3">{t('No shortcuts are available here.')}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {groups.map((group) => (
              <section key={group.group}>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t(group.group)}</h3>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between gap-3 text-[13px]">
                      <span className={item.destructive ? 'text-danger' : 'text-ink-2'}>{t(item.title)}</span>
                      <Kbd>{item.keys}</Kbd>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  )
}
