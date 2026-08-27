/**
 * Turning a keystroke into a chord the registry can match, on either platform.
 *
 * The whole shortcut system rests on one normalization: a `KeyboardEvent` and a
 * declared spec like `'Mod+Shift+R'` must reduce to the same canonical string or
 * they will never match. "Mod" is the platform-primary modifier — Command on a
 * Mac, Control everywhere else — so a spec is written once and works on both;
 * pressing Control on a Mac is deliberately *not* Mod, so a Mac user's ⌃ chords
 * never collide with the ⌘ ones the app defines.
 *
 * Everything here is pure and free of the DOM's globals (it reads only the event
 * fields and the `isMac` flag passed in), so chord parsing and platform mapping
 * are pinned by tests without a browser.
 */

export interface Chord {
  mod: boolean
  alt: boolean
  shift: boolean
  key: string
}

/** The minimal shape of a keyboard event this module reads — for testability. */
export interface KeyLike {
  key: string
  code?: string
  metaKey?: boolean
  ctrlKey?: boolean
  altKey?: boolean
  shiftKey?: boolean
}

/** The platform-primary modifier: Command on macOS, Control elsewhere. */
export function modPressed(event: KeyLike, isMac: boolean): boolean {
  return isMac ? !!event.metaKey : !!event.ctrlKey
}

/**
 * Reduce a raw key to a stable token: letters lowercased, digits as digits,
 * and a fixed vocabulary for the named keys the shortcuts use. `e.key` is
 * preferred (it respects the user's layout for letters and punctuation) with
 * `e.code` as the fallback for digits so `Shift+1` still reads as `1`.
 */
export function normalizeKey(event: KeyLike): string {
  const k = event.key
  if (k === '?') return '?'
  if (k === ' ' || k === 'Spacebar' || event.code === 'Space') return 'space'
  if (k.length === 1) {
    if (/[a-zA-Z]/.test(k)) return k.toLowerCase()
    if (/[0-9]/.test(k)) return k
    const punct: Record<string, string> = { '.': 'period', ',': 'comma', '\\': 'backslash' }
    if (punct[k]) return punct[k]
  }
  if (event.code && /^Digit[0-9]$/.test(event.code)) return event.code.slice(5)
  const named: Record<string, string> = {
    Escape: 'escape',
    Esc: 'escape',
    Enter: 'enter',
    Backspace: 'backspace',
    Delete: 'delete',
    ArrowUp: 'arrowup',
    ArrowDown: 'arrowdown',
    ArrowLeft: 'arrowleft',
    ArrowRight: 'arrowright',
    Tab: 'tab',
  }
  return named[k] ?? k.toLowerCase()
}

/** Canonicalize an event into a chord, given the platform. */
export function eventToChord(event: KeyLike, isMac: boolean): Chord {
  return {
    mod: modPressed(event, isMac),
    alt: !!event.altKey,
    shift: !!event.shiftKey,
    key: normalizeKey(event),
  }
}

/** Stable string form, modifiers in a fixed order, for comparison and as a map key. */
export function chordId(chord: Chord): string {
  const parts: string[] = []
  if (chord.mod) parts.push('mod')
  if (chord.alt) parts.push('alt')
  if (chord.shift) parts.push('shift')
  parts.push(chord.key)
  return parts.join('+')
}

/**
 * Parse a declared spec (`'Mod+Shift+R'`, `'Shift+I'`, `'B'`, `'Space'`) into a
 * chord. Token names are case-insensitive; `Cmd`/`Ctrl`/`Control`/`Meta` all map
 * to Mod so a spec never has to name a platform, and `Opt`/`Option` map to Alt.
 */
export function parseChord(spec: string): Chord {
  const chord: Chord = { mod: false, alt: false, shift: false, key: '' }
  const tokens = spec.split('+').map((t) => t.trim())
  for (const token of tokens) {
    const lower = token.toLowerCase()
    if (['mod', 'cmd', 'command', 'ctrl', 'control', 'meta'].includes(lower)) chord.mod = true
    else if (['alt', 'opt', 'option'].includes(lower)) chord.alt = true
    else if (lower === 'shift') chord.shift = true
    else chord.key = normalizeKey({ key: token.length === 1 ? token : token })
  }
  return chord
}

/** A key spec: a single chord, or a two-key sequence like G then D. */
export type KeySpec = string | { seq: [string, string] }

export function specChords(spec: KeySpec): Chord[] {
  if (typeof spec === 'string') return [parseChord(spec)]
  return spec.seq.map(parseChord)
}

/** Whether two chords are the same keystroke. */
export function chordsEqual(a: Chord, b: Chord): boolean {
  return a.mod === b.mod && a.alt === b.alt && a.shift === b.shift && a.key === b.key
}

/**
 * Whether the event originates from somewhere text is being entered — an input,
 * textarea, select, a content-editable region, or an ARIA textbox. Global and
 * study shortcuts must not fire here; only commands that opt in (editor
 * commands) may. Kept as a predicate over a minimal element shape so the rule is
 * testable without a real DOM node.
 */
export interface ElementLike {
  tagName?: string
  isContentEditable?: boolean
  getAttribute?: (name: string) => string | null
}

export function isEditableTarget(target: ElementLike | null | undefined): boolean {
  if (!target) return false
  const tag = target.tagName?.toUpperCase()
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  if (target.isContentEditable) return true
  const role = target.getAttribute?.('role')
  if (role === 'textbox' || role === 'combobox' || role === 'searchbox') return true
  return false
}

/** Detect macOS from a userAgent/platform string, defaulting to false off-browser. */
export function detectMac(platform: string | undefined): boolean {
  if (!platform) return false
  return /mac|iphone|ipad|ipod/i.test(platform)
}
