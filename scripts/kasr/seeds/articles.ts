/**
 * Which article teaches which concept.
 *
 * The validator refuses a question whose concept no article covers — "nothing
 * teaches this question's answer" — and it is right to: a question a student
 * gets wrong with nowhere to go and read is a dead end.
 *
 * Keyed by concept ID rather than by canonical key, so the mapping breaks
 * loudly if a concept is re-minted rather than silently pointing an article at
 * something it no longer teaches.
 */
export const ARTICLE_FOR_CONCEPT: Record<string, string> = {
  // Histology — docs/Kasr-Source-Imports/article/101-ISK-histology.md
  'CON-HEM-5724364F46CD5A': 'ART-101-HIS-GRANULAR-LEUKOCYTES',
  'CON-HEM-CC292B4D6CC61E': 'ART-101-HIS-BLOOD-PLATELETS',
  'CON-FND-EE10AFCE944705': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-FND-42CCE864C55A08': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-0FAE59E00B748E': 'ART-101-HIS-MEMBRANOUS-SPECIALISATIONS',
  'CON-FND-89FBF21510F273': 'ART-101-HIS-SURFACE-EPITHELIUM',
}
