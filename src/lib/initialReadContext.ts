import { createContext, useContext, useId, useLayoutEffect } from 'react'
import type { DocumentStatus } from './catalogueAvailability'

export type InitialReadReporter = (id: string, status: DocumentStatus | null) => void
export const InitialReadContext = createContext<InitialReadReporter | null>(null)

/** Report initial reads only to the enclosing page; shell and dashboard reads stay independent. */
export function useInitialRead(status: DocumentStatus) {
  const report = useContext(InitialReadContext)
  const id = useId()
  useLayoutEffect(() => {
    report?.(id, { hydrated: status.hydrated, error: status.error })
    return () => report?.(id, null)
  }, [id, report, status.error, status.hydrated])
}
