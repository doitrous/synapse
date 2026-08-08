import { useSyncExternalStore } from 'react'
import { getSubject } from '@/data/student'

/**
 * A single, editable source of System colours. Common chapters keep their common
 * colours (seeded from the subject palette); admins can override any system's
 * colour in Subjects & Topics, and every SystemBadge across the app reflects it.
 */
export const SYSTEM_COLORS_KEY = 'synapse-system-colors-v1'
const CHANGE_EVENT = 'synapse-system-colors-change'

/** A curated palette of common chapter colours for the picker. */
export const SYSTEM_COLOR_PALETTE = [
  '#b3452f', // clay red — cardiovascular
  '#c2691c', // amber — pharmacology
  '#2f7d6b', // teal — respiratory
  '#3b6bb0', // blue — renal
  '#7a4fb0', // violet — neurology
  '#4f8f3a', // green — gastrointestinal
  '#b03a76', // magenta — endocrine
  '#8a6d3b', // bronze — musculoskeletal
  '#5b6570', // slate — general
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
