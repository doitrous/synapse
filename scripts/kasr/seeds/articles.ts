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
  // Anatomy and embryology — docs/Kasr-Source-Imports/article/101-ISK-anatomy.md
  'CON-MSK-4018ED42ADDDB4': 'ART-101-ANA-MUSCLE-ATTACHMENTS',
  'CON-MSK-8863ACD7E8D790': 'ART-101-ANA-CARTILAGINOUS-JOINTS',
  'CON-DEV-B84639AB8FF5DE': 'ART-101-ANA-DECIDUA',
  'CON-DEV-72D21476F03993': 'ART-101-ANA-EMBRYONIC-FOLDING',
  'CON-MSK-097C0BDED777AB': 'ART-101-ANA-PECTORALIS-MAJOR',
  'CON-MSK-59B3B8AB2A2CFA': 'ART-101-ANA-RADIAL-NERVE',
  // One article teaches both concepts the Hand leaf carries.
  'CON-MSK-0F4A85CDF62557': 'ART-101-ANA-HAND-ARTERIES',
  'CON-MSK-0DC3FA5C012B3D': 'ART-101-ANA-HAND-ARTERIES',
  'CON-MSK-782A87EC05EF74': 'ART-101-ANA-ELBOW-JOINT',
  // And one teaches both halves of case 1 — where the breast drains, and the
  // nerve the operation that clears it puts at risk.
  'CON-MSK-C8C7E857552F4C': 'ART-101-ANA-AXILLA-BREAST',
  'CON-MSK-8D52E127159B80': 'ART-101-ANA-AXILLA-BREAST',
}
