/**
 * Which article teaches which concept.
 *
 * The validator refuses a question whose concept no article covers — "nothing
 * teaches this question's answer" — and it is right to: a question a student
 * gets wrong with nowhere to go and read is a dead end.
 *
 * This was a hand-written table, and a hand-written table is the same fact
 * stored twice: once in an article's `related_concepts` or a concept's
 * `article_ids`, once here. Two copies drift, and they drift silently, because
 * nothing compares them. `build-article-links.ts` derives the mapping from the
 * batches themselves and writes `article-links.json`; this file reads it.
 *
 * The table it replaces had grown to 71 entries, and the generator reproduces
 * every one of them — 71 of 71, no misses, no disagreements — before adding the
 * ones nobody had got round to typing. That reproduction is the evidence for
 * the change: a generator that disagreed with the hand table would be proposing
 * a rewrite rather than an extension, and would deserve the opposite decision.
 *
 * Keyed by concept ID rather than canonical key, so a re-minted concept breaks
 * the mapping loudly instead of quietly pointing at an article that no longer
 * teaches it.
 *
 * One caveat that no code here can check, and that the generator repeats in its
 * own output: a link means an author thought the two were related. It is not
 * evidence the article answers the concept. Read before trusting one.
 */
<<<<<<< HEAD
import { readFileSync } from 'node:fs'

interface ArticleLinks {
  links: Record<string, string[]>
=======
export const ARTICLE_FOR_CONCEPT: Record<string, string> = {
  // Histology — docs/Kasr-Source-Imports/article/101-ISK-histology.md
  'CON-HEM-5724364F46CD5A': 'ART-101-HIS-GRANULAR-LEUKOCYTES',
  'CON-HEM-CC292B4D6CC61E': 'ART-101-HIS-BLOOD-PLATELETS',
  'CON-FND-EE10AFCE944705': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-FND-9D325B98FC59A0': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-0FAE59E00B748E': 'ART-101-HIS-MEMBRANOUS-SPECIALISATIONS',
  'CON-FND-89FBF21510F273': 'ART-101-HIS-SURFACE-EPITHELIUM',
  // Anatomy and embryology — docs/Kasr-Source-Imports/article/101-ISK-anatomy.md
  'CON-MSK-4018ED42ADDDB4': 'ART-101-ANA-MUSCLE-ATTACHMENTS',
  'CON-MSK-8863ACD7E8D790': 'ART-101-ANA-CARTILAGINOUS-JOINTS',
  'CON-DEV-B84639AB8FF5DE': 'ART-101-ANA-DECIDUA',
  'CON-DEV-72D21476F03993': 'ART-101-ANA-EMBRYONIC-FOLDING',
  'CON-MSK-2B9F47FC205689': 'ART-101-ANA-PECTORALIS-MAJOR',
  'CON-MSK-A49B57B03A3610': 'ART-101-ANA-RADIAL-NERVE',
  // One article teaches both concepts the Hand leaf carries.
  'CON-MSK-BC95DAE3531583': 'ART-101-ANA-HAND-ARTERIES',
  'CON-MSK-1424177E093253': 'ART-101-ANA-HAND-ARTERIES',
  'CON-MSK-782A87EC05EF74': 'ART-101-ANA-ELBOW-JOINT',
  // And one teaches both halves of case 1 — where the breast drains, and the
  // nerve the operation that clears it puts at risk.
  'CON-MSK-1B2BD8EC2B44B8': 'ART-101-ANA-AXILLA-BREAST',
  'CON-MSK-24E318F2E3F18E': 'ART-101-ANA-AXILLA-BREAST',
  // Basis of anatomy — fascia and the fibrous joints.
  'CON-MSK-6CD9FFF51AE9CD': 'ART-101-ANA-DEEP-FASCIA',
  'CON-MSK-17E2267FB4758F': 'ART-101-ANA-FIBROUS-JOINTS',
  // General embryology.
  'CON-DEV-F33BB68138377B': 'ART-101-ANA-FERTILIZATION',
  'CON-DEV-89FC3BBB3C9BCE': 'ART-101-ANA-IMPLANTATION',
  'CON-DEV-E099FAA01BEAEB': 'ART-101-ANA-CHORIONIC-VILLI-PLACENTA',
  'CON-DEV-723B31B1B9ED2E': 'ART-101-ANA-CHORIONIC-VILLI-PLACENTA',
  'CON-DEV-3E918A4C74B56D': 'ART-101-ANA-UMBILICAL-CORD',
  // Upper limb — regions.
  'CON-MSK-26E6BC06A6079C': 'ART-101-ANA-CLAVICLE',
  'CON-MSK-8533FCB18D819B': 'ART-101-ANA-SHOULDER-SPACES-ROTATION',
  'CON-MSK-04D3ACA71DC025': 'ART-101-ANA-SHOULDER-SPACES-ROTATION',
  'CON-MSK-82C4250560D1A1': 'ART-101-ANA-SHOULDER-SPACES-ROTATION',
  'CON-MSK-FD238B6D305E22': 'ART-101-ANA-BRACHIAL-PLEXUS-INJURIES',
  'CON-MSK-528AA0580391C0': 'ART-101-ANA-BRACHIAL-PLEXUS-INJURIES',
  'CON-MSK-798DE81B6EE665': 'ART-101-ANA-BRACHIAL-ARTERY',
  'CON-MSK-44234D1863CE8E': 'ART-101-ANA-FOREARM-RETINACULUM-ROTATION',
  'CON-MSK-E10403A4189B45': 'ART-101-ANA-FOREARM-RETINACULUM-ROTATION',
  'CON-MSK-D5589ECD8F3C27': 'ART-101-ANA-STERNOCLAVICULAR-JOINT',
  // Upper limb — the nerve supply leaf, one article per named nerve.
  'CON-MSK-F4FC0C323C654E': 'ART-101-ANA-UPPER-LIMB-CUTANEOUS-NERVES',
  'CON-MSK-EE022A2043C10F': 'ART-101-ANA-AXILLARY-NERVE',
  'CON-MSK-F125616F7ED37A': 'ART-101-ANA-MUSCULOCUTANEOUS-NERVE',
  'CON-MSK-712EBE5936F7E4': 'ART-101-ANA-RADIAL-NERVE',
  'CON-MSK-9B52018C4649BD': 'ART-101-ANA-MEDIAN-ULNAR-NERVES',
  'CON-MSK-B640E3E982A149': 'ART-101-ANA-MEDIAN-ULNAR-NERVES',
  'CON-MSK-6DD9511FAB3EF1': 'ART-101-ANA-MEDIAN-ULNAR-NERVES',
  // Concepts a landed article already teaches, mapped rather than re-authored.
  'CON-MSK-2145D2D62EC401': 'ART-101-ANA-DEEP-FASCIA',
  'CON-DEV-44A219B862FFD5': 'ART-101-ANA-EMBRYONIC-FOLDING',
  'CON-MSK-8AA227FAC19B41': 'ART-101-ANA-AXILLA-BREAST',
  'CON-MSK-1CA86BE843A07C': 'ART-101-ANA-SHOULDER-SPACES-ROTATION',
  // Second wave of anatomy leaves.
  'CON-MSK-1E40050F141F4C': 'ART-101-ANA-SYNOVIAL-JOINTS',
  'CON-DEV-5E63C211DEEE00': 'ART-101-ANA-PARAXIAL-MESODERM',
  'CON-DEV-F356C3B8CFD31E': 'ART-101-ANA-AMNIOTIC-FLUID',
  'CON-MSK-74BFAB9385B955': 'ART-101-ANA-CUBITAL-FOSSA',
  'CON-MSK-CF723B5FB24D70': 'ART-101-ANA-BRACHIAL-PLEXUS',
  'CON-MSK-25C6698A72A982': 'ART-101-ANA-ULNAR-ARTERY',
  'CON-MSK-EA4C451C8749B9': 'ART-101-ANA-SHOULDER-JOINT',
  'CON-MSK-DF8F395F3D471E': 'ART-101-ANA-SCAPULAR-ANASTOMOSIS',
  // Histology — concepts a landed article already teaches, or now teaches after
  // being extended. The monocyte's leaf-correct home is
  // ART-101-HIS-NON-GRANULAR-LEUKOCYTES, in a sibling batch file this pass was
  // not permitted to edit; the reason it is declared on the connective tissue
  // article instead is recorded in that article's `conflicts`.
  'CON-HEM-77B701F6105076': 'ART-101-HIS-GRANULAR-LEUKOCYTES',
  'CON-HEM-5559E34E79085D': 'ART-101-HIS-GRANULAR-LEUKOCYTES',
  'CON-FND-0BB73C5CC1821B': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-FND-CC62175DBE7355': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-FND-45A380D5F6A77F': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-FND-2E2D5D5817E5F5': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-HEM-22B546E0AA7D80': 'ART-101-HIS-NON-GRANULAR-LEUKOCYTES',
  'CON-FND-0B3CC0A79F9150': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-56B72DE04F5FED': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-1D529ACEC2E2F3': 'ART-101-HIS-SECRETORY-PATHWAY-ORGANELLES',
  'CON-FND-F1914E2CE56EBF': 'ART-101-HIS-MITOCHONDRIA-AND-CYTOSKELETON',
  'CON-FND-73F10C624D4BE1': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  // The last six, wired after checking each article genuinely teaches its
  // concept rather than merely sitting on the same leaf. The notochord goes to
  // its own article and not to the paraxial-mesoderm one, which says a great
  // deal about where the notochord lies and nothing about the four steps or the
  // nucleus pulposus — declaring it there would have been a lie the validator
  // cannot catch.
  'CON-DEV-1BCF37C48AF307': 'ART-101-ANA-NOTOCHORD',
  'CON-MSK-951D4DFF864245': 'ART-101-ANA-BRACHIAL-ARTERY',
  'CON-MSK-88711B7586CF2F': 'ART-101-ANA-SHOULDER-JOINT',
  'CON-FND-9EA7F8E2898EB7': 'ART-101-HIS-CT-CELLS-COMPARED',
  'CON-HEM-9F3C4150F1076B': 'ART-101-HIS-NON-GRANULAR-LEUKOCYTES',
  'CON-FND-834F212F6343CE': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
>>>>>>> origin/main
}

const LINKS = 'scripts/kasr/seeds/article-links.json'

/**
 * Every article that teaches a concept, by concept ID.
 *
 * A concept examined from two sides is genuinely taught by both — a cilium by
 * the cytoplasm article and by the membranous-specialisations one — and its
 * questions cite whichever their leaf sits under. Keeping only the first left
 * the other leaf's questions reported as taught by nothing.
 */
export const ARTICLES_FOR_CONCEPT: Record<string, string[]> =
  (JSON.parse(readFileSync(LINKS, 'utf8')) as ArticleLinks).links

/**
 * One article per concept, for callers that can only carry one.
 *
 * The first alphabetically, which is arbitrary but stable: every article in the
 * list teaches the concept, so any of them satisfies the coverage check, and an
 * arbitrary-but-deterministic choice at least does not change under a rebuild.
 */
export const ARTICLE_FOR_CONCEPT: Record<string, string> = Object.fromEntries(
  Object.entries(ARTICLES_FOR_CONCEPT).map(([conceptId, articles]) => [conceptId, articles[0]]),
)
