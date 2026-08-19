import { useSyncExternalStore } from 'react'
import { getSubject } from '@/data/subjects'

/**
 * A single, editable source of System colours. Common chapters keep their common
 * colours (seeded from the subject palette); admins can override any system's
 * colour in Subjects & Topics, and every SystemMark across the app reflects it.
 */
export const SYSTEM_COLORS_KEY = 'synapse-system-colors-v1'
const CHANGE_EVENT = 'synapse-system-colors-change'

/**
 * A curated palette of common chapter colours for the picker. Categorical and
 * medium-chroma: these have to stay distinguishable from one another, and they
 * only ever appear on a system chip's 3px spine — never as a fill.
 */
export const SYSTEM_COLOR_PALETTE = [
  '#b52230', // red — cardiovascular
  '#c14a2e', // rust — pharmacology
  '#9a6a1f', // ochre — gastrointestinal
  '#1f8a5a', // emerald — immune
  '#1f6f8b', // teal — respiratory
  '#2f6bc7', // blue — neurology
  '#5a5b9a', // periwinkle — renal
  '#8d4a72', // plum — endocrine
  '#6d7688', // slate — general
]

let cache: Record<string, string> | null = null

function read(): Record<string, string> {
  if (cache) return cache
  try { cache = JSON.parse(localStorage.getItem(SYSTEM_COLORS_KEY) || '{}') as Record<string, string> }
  catch { cache = {} }
  return cache!
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => { if (e.key === SYSTEM_COLORS_KEY) cache = null })
  window.addEventListener(CHANGE_EVENT, () => { cache = null })
}

/** Resolve a system's colour: explicit override, else its common chapter colour. */
export function systemColor(id: string): string {
  return read()[id] || getSubject(id).color
}

export function setSystemColor(id: string, color: string) {
  const next = { ...read(), [id]: color }
  cache = next
  try { localStorage.setItem(SYSTEM_COLORS_KEY, JSON.stringify(next)) } catch { /* ignore */ }
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(CHANGE_EVENT))
}

function subscribe(cb: () => void) {
  window.addEventListener('storage', cb)
  window.addEventListener(CHANGE_EVENT, cb)
  return () => { window.removeEventListener('storage', cb); window.removeEventListener(CHANGE_EVENT, cb) }
}
function snapshot() {
  return typeof window !== 'undefined' ? localStorage.getItem(SYSTEM_COLORS_KEY) ?? '' : ''
}

/** Reactive colour for a system id — re-renders when the colour is edited. */
export function useSystemColor(id: string): string {
  useSyncExternalStore(subscribe, snapshot, () => '')
  return systemColor(id)
}
