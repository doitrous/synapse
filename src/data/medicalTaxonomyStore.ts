import { usePersistentState } from '@/lib/usePersistentState'
import { freshMedicalTaxonomy, MEDICAL_TAXONOMY_STORAGE_KEY, type MedicalTaxonomyNode } from './medicalLibraryTaxonomy'

export function useMedicalTaxonomy() {
  return usePersistentState<MedicalTaxonomyNode[]>(MEDICAL_TAXONOMY_STORAGE_KEY, freshMedicalTaxonomy)
}
