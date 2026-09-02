import { useCallback, useMemo } from 'react'
import {
  EMPTY_TERMINOLOGY_PROGRESS,
  TERMINOLOGY_PROGRESS_KEY,
  knownIn,
  markKnown,
  toggleKnown,
  unmarkKnown,
  type TerminologyProgressDoc,
} from '@/data/terminologyProgress'
import { usePersistentState } from './usePersistentState'

/** The terms the student has marked "Got it", shared by the page and the Learn hub. */
export function useTerminologyProgress() {
  const [doc, setDoc] = usePersistentState<TerminologyProgressDoc>(TERMINOLOGY_PROGRESS_KEY, EMPTY_TERMINOLOGY_PROGRESS)
  const known = useMemo(() => new Set(Object.keys(doc.known)), [doc.known])
  return {
    known,
    mark: useCallback((id: string) => setDoc((current) => markKnown(current ?? EMPTY_TERMINOLOGY_PROGRESS, id)), [setDoc]),
    unmark: useCallback((id: string) => setDoc((current) => unmarkKnown(current ?? EMPTY_TERMINOLOGY_PROGRESS, id)), [setDoc]),
    toggle: useCallback((id: string) => setDoc((current) => toggleKnown(current ?? EMPTY_TERMINOLOGY_PROGRESS, id)), [setDoc]),
    knownIn: useCallback((ids: readonly string[]) => knownIn(doc, ids), [doc]),
  }
}
