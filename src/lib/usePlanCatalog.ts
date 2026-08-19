import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { PLAN_CATALOG_STORAGE_KEY, type PlanCatalog } from '@/data/planCatalog'
import { resolvePlanCatalog, type LegacyPlanDef } from '@/data/planCatalogSeed'

/** The key the previous, admin-editable plan list was stored under. */
const LEGACY_PLANS_STORAGE_KEY = 'synapse-plans-v1'

/**
 * The one plan catalogue, for the landing page, Billing, and the admin console.
 *
 * Until something is stored, this is the seed with any plans the admin added to
 * the old list folded in. The old document is read but never written, so this
 * can be re-run and a rollback loses nothing.
 */
export function usePlanCatalog() {
  const [stored, setStored, status] = usePersistentState<PlanCatalog | null>(PLAN_CATALOG_STORAGE_KEY, null)
  const [legacy] = usePersistentState<LegacyPlanDef[]>(LEGACY_PLANS_STORAGE_KEY, [])
  const catalog = useMemo(() => resolvePlanCatalog(stored, legacy), [legacy, stored])
  return [catalog, setStored, status] as const
}
