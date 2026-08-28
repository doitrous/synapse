import type { ReactElement } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { RequireAuth } from './RequireAuth'

const IMPORT_TAB_BY_KIND: Record<string, string> = {
  question: 'questions',
  article: 'library',
  practical: 'practical',
  resource: 'resources',
  deck: 'flashcards',
  essay: 'written',
  histology: 'histology',
  minigame: 'practical',
}

export function RequireImportKind({ children }: { children: ReactElement }) {
  const { kind } = useParams()
  const tab = kind ? IMPORT_TAB_BY_KIND[kind] : undefined
  if (!tab) return <Navigate to="/admin" replace />
  return <RequireAuth tab={tab}>{children}</RequireAuth>
}
