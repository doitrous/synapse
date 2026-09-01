import { usePersistentState } from '@/lib/usePersistentState'
import { API_MODE } from '@/lib/api'
import { EMPTY_GLOSSARY, GLOSSARY_STORAGE_KEY, starterGlossary, type GlossaryDoc } from './glossary'

/**
 * The glossary, live.
 *
 * Same idiom as `useLiveLibrary`: in demo mode the starter set fills the screen;
 * with a backend configured the surface starts from whatever an admin has
 * actually published. It is deliberately *not* auto-seeded on empty in live
 * mode — that would rewrite the document every time an admin opened the page,
 * silently reverting their corrections.
 *
 * `nishany-medical-glossary-v1` is on the server's student-readable allowlist,
 * so students read it and only an admin can write it.
 */
export function useMedicalGlossary() {
  return usePersistentState<GlossaryDoc>(GLOSSARY_STORAGE_KEY, () => (API_MODE ? EMPTY_GLOSSARY : starterGlossary()))
}
