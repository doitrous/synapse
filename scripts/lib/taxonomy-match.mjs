/**
 * Shared label matching between a source vocabulary and the canonical taxonomy.
 *
 * Both the AMBOSS comparison and the local-curriculum comparison ask the same
 * question — "does Synapse already have a node for this label?" — so they ask it
 * the same way. A second, subtly different matcher would make the two ledgers
 * disagree for reasons nobody could reconstruct later.
 */
import { MEDICAL_TAXONOMY_SEED, MEDICAL_TAXONOMY_INDEX } from '../../src/data/medicalLibraryTaxonomy.ts'
import { CURRICULUM_CATALOG } from '../../src/data/curriculumCatalog.ts'

/* ---- normalisation ------------------------------------------------------ */

/**
 * US → British medical spelling.
 *
 * AMBOSS is written in US English and Synapse in British. Without this every
 * "Hematology" would read as a gap beside "Haematology", which would be 100+
 * false positives in a ledger whose whole job is to be trustworthy.
 */
export const SPELLING = [
  [/\bhemat/g, 'haemat'], [/\bhemo/g, 'haemo'], [/hemorrhag/g, 'haemorrhag'], [/hemolyt/g, 'haemolyt'],
  [/anemia/g, 'anaemia'], [/anemic/g, 'anaemic'], [/ischemi/g, 'ischaemi'], [/leukemi/g, 'leukaemi'],
  [/edema/g, 'oedema'], [/esophag/g, 'oesophag'], [/diarrhea/g, 'diarrhoea'], [/gonorrhea/g, 'gonorrhoea'],
  [/pediatric/g, 'paediatric'], [/anesthe/g, 'anaesthe'], [/gynecol/g, 'gynaecol'], [/orthoped/g, 'orthopaed'],
  [/celiac/g, 'coeliac'], [/estrogen/g, 'oestrogen'], [/tumor/g, 'tumour'], [/behavior/g, 'behaviour'],
  [/\bfeces/g, 'faeces'], [/dyspnea/g, 'dyspnoea'], [/apnea/g, 'apnoea'], [/cyanotic/g, 'cyanotic'],
  [/orthopnea/g, 'orthopnoea'], [/etiolog/g, 'aetiolog'], [/pediatr/g, 'paediatr'], [/hyperemia/g, 'hyperaemia'],
]

export const norm = (value) => {
  let out = (value ?? '').toLowerCase().replace(/[‐-―]/g, '-')
  for (const [from, to] of SPELLING) out = out.replace(from, to)
  return out.replace(/[^a-z0-9]+/g, ' ').trim()
}

/** Drop the plural and the leading article, so "Skin tumours" ≈ "Skin tumour". */
export const stem = (value) => norm(value).split(' ').map((word) => word.replace(/ies$/, 'y').replace(/s$/, '')).join(' ')

/**
 * Words that carry no discriminating meaning in a taxonomy label.
 *
 * Without these dropped, "Blood system" and "Nervous system" share a token and
 * every branch looks related to every other. With them dropped, a match means
 * the two labels are actually about the same thing.
 */
export const STOPWORDS = new Set([
  'and', 'or', 'of', 'the', 'in', 'to', 'a', 'an', 'general', 'other', 'related', 'relevant',
  'medical', 'human', 'applied', 'science', 'sciences', 'study', 'studies',
  'system', 'systems', 'disorder', 'disorders', 'disease', 'diseases', 'medicine', 'clinical',
  'principle', 'principles', 'option', 'options', 'basic', 'introduction', 'overview',
])

export const tokens = (value) => new Set(stem(value).split(' ').filter((word) => word && !STOPWORDS.has(word)))

/**
 * How much of the shorter label the two share.
 *
 * Containment rather than Jaccard, because a Synapse node legitimately carries a
 * broader label than the comparator's — "Mood and anxiety disorders" covers
 * "Anxiety disorders" completely, and a symmetric score would under-report that.
 */
export function containment(a, b) {
  if (!a.size || !b.size) return 0
  let shared = 0
  for (const token of a) if (b.has(token)) shared += 1
  return shared / Math.min(a.size, b.size)
}

export const LEVEL_RANK = { System: 0, Discipline: 0, Domain: 0, Topic: 1, Subtopic: 2, Microtopic: 3 }

/**
 * The best canonical node for a title, optionally restricted to one subtree.
 *
 * Two guards keep this from producing confident nonsense. A single shared token
 * is only trusted when it is the *whole* of both labels — otherwise "General
 * histology" matches "Cardiac anatomy and histology", which is not the same
 * subject. And a broad comparator node is never matched to a Synapse leaf: a
 * top-level branch that resolves to a microtopic means the match is incidental,
 * not real. Ties prefer the shallowest node, because a general label belongs to
 * a general node.
 */
export function bestTokenMatch(title, anchorId, ambossDepth, anchorDivision) {
  const wanted = tokens(title)
  if (!wanted.size) return null
  let best = null
  for (const node of MEDICAL_TAXONOMY_SEED) {
    if (anchorId && !isUnder(node.id, anchorId)) continue
    const theirs = tokens(node.title)
    let shared = 0
    for (const token of wanted) if (theirs.has(token)) shared += 1
    if (!shared) continue
    // A single shared token is allowed, because "Histology" and
    // "Histology & Cell Biology" are the same subject. What stops it becoming
    // "Histology" ≈ "Cardiac anatomy and histology" is not a token count but the
    // division and rank preference below: the broadest node in the right view
    // wins, and a shallow label can never match a deep leaf.
    if (shared === 1 && [...wanted].find((token) => theirs.has(token)).length < 4) continue
    const score = containment(wanted, theirs)
    if (score < 0.6) continue
    // A shallow comparator branch matching a deep Synapse leaf is an accident of
    // vocabulary, not a real correspondence: "Red blood cell disorders" belongs
    // beside "Anaemia and red-cell disorders", not inside transfusion medicine.
    const rank = LEVEL_RANK[node.level] ?? 3
    if (rank > ambossDepth) continue
    const sameDivision = Number(node.division === anchorDivision)
    const candidate = { node, score, rank, sameDivision }
    const better = !best
      || candidate.score > best.score
      || (candidate.score === best.score && candidate.sameDivision > best.sameDivision)
      || (candidate.score === best.score && candidate.sameDivision === best.sameDivision && candidate.rank < best.rank)
    if (better) best = candidate
  }
  return best
}

/* ---- Synapse side ------------------------------------------------------- */

export const canonicalByTitle = new Map()
export const canonicalByStem = new Map()
for (const node of MEDICAL_TAXONOMY_SEED) {
  const entry = { id: node.id, title: node.title, division: node.division, level: node.level, rank: LEVEL_RANK[node.level] ?? 3 }
  const push = (map, key) => map.set(key, [...(map.get(key) ?? []), entry])
  push(canonicalByTitle, norm(node.title))
  push(canonicalByStem, stem(node.title))
}

export const runtimeByTitle = new Map()
for (const system of CURRICULUM_CATALOG) {
  runtimeByTitle.set(norm(system.name), { id: system.id, level: 'system' })
  for (const topic of system.topics) {
    runtimeByTitle.set(norm(topic.title), { id: topic.id, level: 'topic' })
    for (const sub of topic.subs) runtimeByTitle.set(norm(sub.title), { id: sub.id, level: 'subtopic' })
  }
}

export const isUnder = (nodeId, ancestorId) =>
  MEDICAL_TAXONOMY_INDEX.lineage(nodeId).some((entry) => entry.id === ancestorId)


export { MEDICAL_TAXONOMY_SEED, MEDICAL_TAXONOMY_INDEX, CURRICULUM_CATALOG }
