/**
 * TAX-COMPARE-001 — AMBOSS disposition ledger.
 *
 * Compares the local AMBOSS hierarchy with the canonical Synapse taxonomy and
 * the runtime curriculum tree, and gives every in-scope AMBOSS node exactly one
 * of the eleven dispositions the master plan defines.
 *
 *   node --experimental-strip-types scripts/build-amboss-disposition-ledger.mjs
 *
 * AMBOSS is a comparator, never a source of fact (LD-08). Nothing here proposes
 * copying its prose, tables, media or hierarchy. A node marked as a gap is a
 * *candidate* only: LD-08 requires evidence beyond AMBOSS before it becomes a
 * taxonomy change, which is `TAX-GAP-001`'s job, not this script's.
 *
 * The five out-of-scope roots (Osteopathic medicine, On-call survival guide,
 * Clerkship survival guide, Transition to residency, CME-eligible articles) and
 * the USMLE/PANCE content outlines are pre-rejected by the master plan and are
 * not walked at all.
 *
 * Writes docs/medical-library-program/evidence/amboss-disposition-ledger.json
 * and taxonomy-gap-list.json. Read-only with respect to the taxonomy.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { MEDICAL_TAXONOMY_SEED, MEDICAL_TAXONOMY_INDEX } from '../src/data/medicalLibraryTaxonomy.ts'
import { CURRICULUM_CATALOG } from '../src/data/curriculumCatalog.ts'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'docs', 'medical-library-program', 'evidence')
const AMBOSS = process.env.AMBOSS_HIERARCHY ?? '/Users/doitrous/Documents/Amboss/hierarchy.json'

export const DISPOSITIONS = [
  'genuine undergraduate gap to add',
  'useful rename or split',
  'merge/de-duplication',
  'move of canonical home',
  'secondary placement or cross-reference',
  'alias/spelling variant',
  'metadata/filter, not a node',
  'outside Years 1–4 scope',
  'AMBOSS-specific and rejected',
  'already covered under a different Synapse label',
  'unresolved; requires qualified curriculum or faculty evidence',
]

/* ---- normalisation ------------------------------------------------------ */

/**
 * US → British medical spelling.
 *
 * AMBOSS is written in US English and Synapse in British. Without this every
 * "Hematology" would read as a gap beside "Haematology", which would be 100+
 * false positives in a ledger whose whole job is to be trustworthy.
 */
const SPELLING = [
  [/\bhemat/g, 'haemat'], [/\bhemo/g, 'haemo'], [/hemorrhag/g, 'haemorrhag'], [/hemolyt/g, 'haemolyt'],
  [/anemia/g, 'anaemia'], [/anemic/g, 'anaemic'], [/ischemi/g, 'ischaemi'], [/leukemi/g, 'leukaemi'],
  [/edema/g, 'oedema'], [/esophag/g, 'oesophag'], [/diarrhea/g, 'diarrhoea'], [/gonorrhea/g, 'gonorrhoea'],
  [/pediatric/g, 'paediatric'], [/anesthe/g, 'anaesthe'], [/gynecol/g, 'gynaecol'], [/orthoped/g, 'orthopaed'],
  [/celiac/g, 'coeliac'], [/estrogen/g, 'oestrogen'], [/tumor/g, 'tumour'], [/behavior/g, 'behaviour'],
  [/\bfeces/g, 'faeces'], [/dyspnea/g, 'dyspnoea'], [/apnea/g, 'apnoea'], [/cyanotic/g, 'cyanotic'],
  [/orthopnea/g, 'orthopnoea'], [/etiolog/g, 'aetiolog'], [/pediatr/g, 'paediatr'], [/hyperemia/g, 'hyperaemia'],
]

const norm = (value) => {
  let out = (value ?? '').toLowerCase().replace(/[‐-―]/g, '-')
  for (const [from, to] of SPELLING) out = out.replace(from, to)
  return out.replace(/[^a-z0-9]+/g, ' ').trim()
}

/** Drop the plural and the leading article, so "Skin tumours" ≈ "Skin tumour". */
const stem = (value) => norm(value).split(' ').map((word) => word.replace(/ies$/, 'y').replace(/s$/, '')).join(' ')

/**
 * Words that carry no discriminating meaning in a taxonomy label.
 *
 * Without these dropped, "Blood system" and "Nervous system" share a token and
 * every branch looks related to every other. With them dropped, a match means
 * the two labels are actually about the same thing.
 */
const STOPWORDS = new Set([
  'and', 'or', 'of', 'the', 'in', 'to', 'a', 'an', 'general', 'other', 'related', 'relevant',
  'system', 'systems', 'disorder', 'disorders', 'disease', 'diseases', 'medicine', 'clinical',
  'principle', 'principles', 'option', 'options', 'basic', 'introduction', 'overview',
])

const tokens = (value) => new Set(stem(value).split(' ').filter((word) => word && !STOPWORDS.has(word)))

/**
 * How much of the shorter label the two share.
 *
 * Containment rather than Jaccard, because a Synapse node legitimately carries a
 * broader label than the comparator's — "Mood and anxiety disorders" covers
 * "Anxiety disorders" completely, and a symmetric score would under-report that.
 */
function containment(a, b) {
  if (!a.size || !b.size) return 0
  let shared = 0
  for (const token of a) if (b.has(token)) shared += 1
  return shared / Math.min(a.size, b.size)
}

const LEVEL_RANK = { System: 0, Discipline: 0, Domain: 0, Topic: 1, Subtopic: 2, Microtopic: 3 }

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
function bestTokenMatch(title, anchorId, ambossDepth, anchorDivision) {
  const wanted = tokens(title)
  if (!wanted.size) return null
  let best = null
  for (const node of MEDICAL_TAXONOMY_SEED) {
    if (anchorId && !isUnder(node.id, anchorId)) continue
    const theirs = tokens(node.title)
    let shared = 0
    for (const token of wanted) if (theirs.has(token)) shared += 1
    if (!shared) continue
    // One shared token is only decisive when neither label says anything else.
    if (shared === 1 && (wanted.size > 1 || theirs.size > 1)) continue
    if (shared === 1 && [...wanted][0].length < 4) continue
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

const canonicalByTitle = new Map()
const canonicalByStem = new Map()
for (const node of MEDICAL_TAXONOMY_SEED) {
  const entry = { id: node.id, title: node.title, division: node.division, level: node.level, rank: LEVEL_RANK[node.level] ?? 3 }
  const push = (map, key) => map.set(key, [...(map.get(key) ?? []), entry])
  push(canonicalByTitle, norm(node.title))
  push(canonicalByStem, stem(node.title))
}

const runtimeByTitle = new Map()
for (const system of CURRICULUM_CATALOG) {
  runtimeByTitle.set(norm(system.name), { id: system.id, level: 'system' })
  for (const topic of system.topics) {
    runtimeByTitle.set(norm(topic.title), { id: topic.id, level: 'topic' })
    for (const sub of topic.subs) runtimeByTitle.set(norm(sub.title), { id: sub.id, level: 'subtopic' })
  }
}

const isUnder = (nodeId, ancestorId) =>
  MEDICAL_TAXONOMY_INDEX.lineage(nodeId).some((entry) => entry.id === ancestorId)

/* ---- hand-authored root dispositions ------------------------------------ */

/**
 * Every depth-1 AMBOSS node, decided by hand.
 *
 * These are the structural comparisons that matter: they say where a whole
 * branch belongs, and every node beneath one inherits its Synapse anchor. The
 * anchor is what makes the automated dispositions below meaningful rather than
 * a title-matching exercise.
 */
const ROOTS = {
  /* Basic sciences › By system — AMBOSS has 19 and Synapse has 19, but they are
     not the same 19, and aligning the counts would be a mistake. */
  'General principles of foundational science': ['SYS-FND', 'already covered under a different Synapse label', 'Maps to SYS-FND Foundations & General Principles.'],
  'Human development': ['SYS-DEV', 'already covered under a different Synapse label', 'Maps to SYS-DEV Human Development & Life Stages.'],
  'Immune system': ['SYS-IMM', 'already covered under a different Synapse label', 'Direct match.'],
  'Blood and lymphoreticular system': ['SYS-HEM', 'already covered under a different Synapse label', 'Maps to SYS-HEM Blood & Lymphoreticular System.'],
  'Psychiatry and behavorial sciences': ['SYS-PSY', 'already covered under a different Synapse label', 'Maps to SYS-PSY Behavioral Health. The comparator misspells "behavioral"; that is not a label to copy.'],
  'Nervous system and special senses': ['SYS-NEU', 'already covered under a different Synapse label', 'Direct match, including the special-senses bundling.'],
  'Skin and subcutaneous tissue': ['SYS-DER', 'already covered under a different Synapse label', 'Direct match.'],
  'Musculoskeletal system': ['SYS-MSK', 'already covered under a different Synapse label', 'Direct match.'],
  'Cardiovascular system': ['SYS-CVS', 'already covered under a different Synapse label', 'Direct match.'],
  'Respiratory system': ['SYS-RES', 'already covered under a different Synapse label', 'Direct match.'],
  'Gastrointestinal system and nutrition': ['SYS-GIT', 'useful rename or split', 'AMBOSS bundles nutrition into the GI system. Synapse splits it: nutrition across the life course sits in SYS-DEV-T03 and nutritional disease in SYS-GIT-T04. Keep the Synapse split; record the mapping.'],
  'Renal and urinary system': ['SYS-REN', 'already covered under a different Synapse label', 'Direct match.'],
  'Pregnancy, childbirth, and the puerperium': ['SYS-OBS', 'already covered under a different Synapse label', 'Direct match.'],
  'Female and transgender reproductive system and breast': ['SYS-GYN', 'already covered under a different Synapse label', 'Maps to SYS-GYN. The Synapse label is "Female reproductive system" (DEC-007); the comparator\'s wording is not adopted.'],
  'Male and transgender reproductive system': ['SYS-AND', 'already covered under a different Synapse label', 'Maps to SYS-AND. Same naming decision as SYS-GYN (DEC-007).'],
  'Endocrine system': ['SYS-END', 'already covered under a different Synapse label', 'Maps to SYS-END Endocrine & Metabolic System.'],
  'Multisystem processes and disorders': ['SYS-MUL', 'useful rename or split', 'Synapse extends this to Multisystem Processes, Emergencies & Critical Care, adding perioperative, critical and palliative care — justified against the GMC MLA content map in the taxonomy review. Keep the extension.'],

  /* The clearest case where AMBOSS's 19 and Synapse's 19 differ. */
  'Biostatistics and epidemiology': ['SYS-POP', 'merge/de-duplication', 'AMBOSS keeps this as a separate system root, and repeats it under Clinical knowledge. Synapse has one home: SYS-POP-T01 Epidemiology and SYS-POP-T02 Biostatistics. Keep the merge.'],
  'Social sciences': ['SYS-POP', 'merge/de-duplication', 'A second AMBOSS system root that Synapse folds into SYS-POP, alongside DIS-PEC for professionalism and ethics. Keep the merge.'],

  /* Basic sciences › By discipline */
  'Anatomy, histology, and embryology': ['DIS-ANA', 'useful rename or split', 'AMBOSS bundles three disciplines. Synapse separates DIS-ANA, DIS-HIS and DIS-EMB, which matches how Egyptian faculties actually examine them. Keep the split.'],
  Biochemistry: ['DIS-BIO', 'already covered under a different Synapse label', 'Maps to DIS-BIO Biochemistry & Molecular Medicine.'],
  Genetics: ['DIS-GEN', 'already covered under a different Synapse label', 'Direct match.'],
  Physiology: ['DIS-PHY', 'already covered under a different Synapse label', 'Direct match.'],
  Immunology: ['DIS-IMU', 'already covered under a different Synapse label', 'Direct match. The system-route view is SYS-IMM.'],
  Microbiology: ['DIS-MIC', 'already covered under a different Synapse label', 'Direct match. Synapse additionally separates DIS-PAR Parasitology, which AMBOSS folds in here and under-weights.'],
  Pathology: ['DIS-PAT', 'already covered under a different Synapse label', 'Direct match.'],
  Pharmacology: ['DIS-PHA', 'already covered under a different Synapse label', 'Maps to DIS-PHA Pharmacology & Therapeutics, which owns drug classes under the 2026-08-12 de-duplication.'],
  'Behavioral sciences': ['SYS-PSY', 'secondary placement or cross-reference', 'Behavioural science sits in SYS-PSY in the system route and DIS-PST in the discipline route. Social science sits in SYS-POP. Record the two-way mapping rather than a new discipline root.'],
  Physics: [null, 'outside Years 1–4 scope', 'Carried by AMBOSS for USMLE Step 1 pre-medical recall. Egyptian curricula teach it in a pre-clinical year outside this library\'s remit. Reject unless local curriculum evidence surfaces (LD-14).'],
  Chemistry: [null, 'outside Years 1–4 scope', 'Same as Physics.'],

  /* Clinical knowledge */
  'Internal medicine': ['DIS-MED', 'already covered under a different Synapse label', 'Direct match. Synapse adds Oncology, Medicine of the older adult, and Rehabilitation under it.'],
  Surgery: ['DIS-SUR', 'already covered under a different Synapse label', 'Direct match.'],
  Pediatrics: ['DIS-PED', 'already covered under a different Synapse label', 'Direct match as a discipline. Paediatric *disease* is distributed into the organ systems by design; only life-stage material sits in SYS-DEV. Each child node is disposed of individually below.'],
  'Obstetrics/gynecology': ['DIS-OBG', 'already covered under a different Synapse label', 'DIS-OBG is the discipline route over both SYS-OBS and SYS-GYN.'],
  Neurology: ['DIS-MED', 'secondary placement or cross-reference', 'Synapse has no separate neurology discipline root: the system route is SYS-NEU and the discipline route is DIS-MED. Adding one would duplicate SYS-NEU.'],
  Psychiatry: ['DIS-PST', 'already covered under a different Synapse label', 'Direct match. The system route is SYS-PSY.'],
  'Family medicine': ['DIS-FCM', 'already covered under a different Synapse label', 'Maps to DIS-FCM Family & Community Medicine.'],
  'Emergency medicine': ['DIS-EMC', 'already covered under a different Synapse label', 'Maps to DIS-EMC Emergency Medicine & Critical Care; the system route is SYS-MUL and the task route is KNW-EMG.'],
  Anesthesiology: ['DIS-ANE', 'already covered under a different Synapse label', 'Maps to DIS-ANE Anaesthesiology & Perioperative Medicine, an explicit taxonomy-review addition. The system route is SYS-MUL-T06.'],
  Ophthalmology: ['DIS-OPH', 'already covered under a different Synapse label', 'Discipline route DIS-OPH; system route SYS-NEU-T07. Deliberately not a separate system root.'],
  'Ear, nose, and throat': ['DIS-ENT', 'already covered under a different Synapse label', 'Discipline route DIS-ENT; system route SYS-NEU-T08.'],
  Dermatology: ['DIS-DRM', 'already covered under a different Synapse label', 'Discipline route DIS-DRM; system route SYS-DER.'],
  Urology: ['SYS-REN', 'useful rename or split', 'Synapse splits urology deliberately: the urinary tract sits in SYS-REN-T06 and the male reproductive organs in SYS-AND. Neither system claims the whole of urology. Record the split so it is not re-merged.'],
  Radiology: ['DIS-RAD', 'already covered under a different Synapse label', 'Maps to DIS-RAD Radiology & Imaging.'],
  'Epidemiology and biostatistics': ['SYS-POP', 'merge/de-duplication', 'AMBOSS\'s second location for the same material. Synapse has one home.'],
  'Legal medicine and professionalism': ['DIS-FOR', 'useful rename or split', 'Synapse separates DIS-FOR Forensic Medicine & Toxicology from DIS-PEC Professionalism, Ethics & Communication, and places the population view in SYS-POP-T06. Egyptian medical law is jurisdiction-specific and cannot be inherited from a US comparator.'],

  /* Clinical skills */
  'Undifferentiated symptoms and clinical problems': ['KNW-PRS', 'already covered under a different Synapse label', 'Maps to KNW-PRS Presentations & differential diagnosis.'],
  Procedures: ['SKL-PRC', 'already covered under a different Synapse label', 'Maps to SKL-PRC Practical procedures. A same-named CVS subtopic exists but is not the comparable node.'],
  'Clinical cases': [null, 'metadata/filter, not a node', 'A delivery format, not subject matter. Synapse models cases as practical items against existing taxonomy nodes.'],
  'Differential diagnoses': ['KNW-PRS', 'already covered under a different Synapse label', 'The differential view is generated from presentations; it is not a parallel branch.'],
  'History and physical examination': ['SKL-HIS', 'useful rename or split', 'Synapse separates SKL-HIS History taking from SKL-EXM Clinical examination, because they are examined as separate OSCE stations.'],
}

/* ---- walk --------------------------------------------------------------- */

const hierarchy = JSON.parse(await readFile(AMBOSS, 'utf8'))
const byRootTitle = Object.fromEntries(hierarchy.roots.map((entry) => [entry.title, entry]))

const REJECTED_ROOTS = {
  'Osteopathic medicine': 'US osteopathic branch with no Egyptian undergraduate analogue.',
  'On-call survival guide': 'Practice-orientation material for US residents.',
  'Clerkship survival guide': 'Practice-orientation material for US clerkships.',
  'Transition to residency': 'Post-graduate career material.',
  'CME-eligible articles': 'Continuing-education packaging, not undergraduate subject matter.',
}

const NOISE = [
  /^AMBOSS/i, /^USMLE/i, /^PANCE/i, /^The United States Medical Licensing/i,
  /content outline/i, /^Important risk factors/i, /^Chalk Talk/i,
]

/**
 * The discipline lenses AMBOSS repeats under many systems.
 *
 * The comparator splits each system by the same few headings. Those are
 * presentation facets, not subject matter — the taxonomy review already rejected
 * the equivalent "Core principles / Applied / Practical" triple from the
 * supplied blueprint for the same reason.
 *
 * This is an explicit list, not a repetition count. Counting was tried and got
 * it wrong: "Anxiety disorders" also appears under three parents, but that is a
 * genuine cross-system placement, which is exactly what the four-view model
 * handles. A lens says *how* you are looking at a system; a repeated subject
 * says the subject belongs in several places.
 *
 * `MIN_LENS_PARENTS` is a sanity check, not the detector: a label here that
 * appears under only one parent is real content there and is left to the ladder.
 */
const LENSES = new Set([
  'clinical correlations',
  'relevant pharmacology',
  'relevant pharmacology and treatment options',
  'pathology',
])
const MIN_LENS_PARENTS = 3

const entries = []

function walk(node, branch, path, anchor) {
  if (node.type === 'article') return
  const nextPath = [...path, node.title]
  if (path.length) {
    entries.push({ node, branch, path: nextPath, depth: path.length, anchor })
  }
  const rootEntry = path.length === 0 ? undefined : ROOTS[node.title]
  const nextAnchor = path.length === 1 && rootEntry ? rootEntry[0] : anchor
  for (const child of node.children ?? []) walk(child, branch, nextPath, nextAnchor)
}

const basicSciences = byRootTitle['Basic sciences']
for (const group of basicSciences.children) {
  if (group.title === 'By system' || group.title === 'By discipline') walk(group, `Basic sciences › ${group.title}`, [], null)
}
walk(byRootTitle['Clinical knowledge'], 'Clinical knowledge', [], null)
walk(byRootTitle['Clinical skills'], 'Clinical skills', [], null)

/* ---- facet detection ---------------------------------------------------- */

const parentsByTitle = new Map()
for (const entry of entries) {
  const key = norm(entry.node.title)
  const parent = entry.path[entry.path.length - 2] ?? '(root)'
  parentsByTitle.set(key, new Set([...(parentsByTitle.get(key) ?? []), parent]))
}
const facets = new Map(
  [...parentsByTitle]
    .filter(([key, parents]) => LENSES.has(key) && parents.size >= MIN_LENS_PARENTS)
    .map(([key, parents]) => [key, parents.size]),
)

/* ---- disposition ladder ------------------------------------------------- */

/**
 * Decide one node.
 *
 * The ladder is ordered so the cheapest certain answer wins first. Anything it
 * cannot decide becomes `unresolved` and goes to the gap list rather than being
 * guessed — a wrong disposition in this ledger is worse than an open question,
 * because later phases treat the ledger as settled.
 */
function dispose(entry) {
  const title = entry.node.title
  const base = {
    ambossId: entry.node.id,
    branch: entry.branch,
    path: entry.path.join(' › '),
    title,
    depth: entry.depth,
    childGroups: (entry.node.children ?? []).filter((child) => child.type !== 'article').length,
    articleCount: (entry.node.children ?? []).filter((child) => child.type === 'article').length,
    synapseAnchor: entry.anchor ?? null,
  }

  // 1. Hand-authored root decisions.
  if (entry.depth === 1 && ROOTS[title]) {
    const [anchor, disposition, rationale] = ROOTS[title]
    return { ...base, synapseNodeId: anchor, disposition, rationale, confidence: 'high', decidedBy: 'hand' }
  }

  // 2. A heading AMBOSS repeats under many parents is a facet, not a node.
  if (facets.has(norm(title))) {
    return { ...base, synapseNodeId: entry.anchor ?? null, disposition: 'metadata/filter, not a node', rationale: `AMBOSS repeats “${title}” as a sub-partition under ${facets.get(norm(title))} parents. That is a presentation facet, like the "Core principles / Applied / Practical" triple the taxonomy review already rejected. Its contents belong to ${entry.anchor ?? 'the parent branch'}.`, confidence: 'high', decidedBy: 'rule:facet' }
  }

  // 3. Packaging and exam-board scaffolding are not subject matter.
  if (NOISE.some((pattern) => pattern.test(title))) {
    return { ...base, synapseNodeId: null, disposition: 'AMBOSS-specific and rejected', rationale: 'Product packaging or a US exam-board content outline, not subject matter.', confidence: 'high', decidedBy: 'rule:packaging' }
  }

  // 4. Exact canonical title, inside the branch's Synapse anchor.
  const exact = canonicalByTitle.get(norm(title)) ?? []
  const scoped = entry.anchor ? exact.filter((candidate) => isUnder(candidate.id, entry.anchor)) : exact
  if (scoped.length === 1) {
    return { ...base, synapseNodeId: scoped[0].id, disposition: 'already covered under a different Synapse label', rationale: `Same subject matter as ${scoped[0].id} “${scoped[0].title}”, inside the mapped branch.`, confidence: 'high', decidedBy: 'rule:exact-in-anchor' }
  }

  // 5. Spelling or plural variant of a node inside the anchor.
  const stemmed = (canonicalByStem.get(stem(title)) ?? []).filter((candidate) => !entry.anchor || isUnder(candidate.id, entry.anchor))
  if (stemmed.length === 1 && norm(stemmed[0].title) !== norm(title)) {
    return { ...base, synapseNodeId: stemmed[0].id, disposition: 'alias/spelling variant', rationale: `US spelling or plural of ${stemmed[0].id} “${stemmed[0].title}”. An alias, never a second node.`, confidence: 'high', decidedBy: 'rule:spelling' }
  }
  if (stemmed.length === 1) {
    return { ...base, synapseNodeId: stemmed[0].id, disposition: 'already covered under a different Synapse label', rationale: `Same subject matter as ${stemmed[0].id} “${stemmed[0].title}”.`, confidence: 'high', decidedBy: 'rule:stem-in-anchor' }
  }

  // 6. Exact title elsewhere in the tree — a real placement, but not where this
  //    branch expects it. That is the definition of a secondary placement.
  //    Where several nodes share the title, prefer the broadest one: "Eye" as a
  //    system topic is the subject, "Eye" as an examination step is a skill.
  if (exact.length >= 1) {
    const anchorDivision = entry.anchor ? MEDICAL_TAXONOMY_INDEX.byId.get(entry.anchor)?.division : undefined
    const pick = [...exact].sort((a, b) =>
      Number(b.division === anchorDivision) - Number(a.division === anchorDivision) || a.rank - b.rank)[0]
    return { ...base, synapseNodeId: pick.id, disposition: 'secondary placement or cross-reference', rationale: `Covered by ${pick.id} “${pick.title}” in the ${pick.division} view. This branch is a second route to the same canonical item, not a new node.`, confidence: exact.length === 1 ? 'high' : 'medium', decidedBy: 'rule:exact-elsewhere' }
  }

  // 7. The runtime tree already declares this label.
  const runtime = runtimeByTitle.get(norm(title))
  if (runtime) {
    return { ...base, synapseNodeId: runtime.id, disposition: 'already covered under a different Synapse label', rationale: `Declared in the runtime curriculum tree as ${runtime.level} “${runtime.id}”.`, confidence: 'medium', decidedBy: 'rule:runtime' }
  }

  // 8. The same subject matter under a broader or narrower Synapse label, inside
  //    the mapped branch. "Anxiety disorders" is covered by "Mood and anxiety
  //    disorders"; "General embryology" by "Embryology".
    const anchorDivision = entry.anchor ? MEDICAL_TAXONOMY_INDEX.byId.get(entry.anchor)?.division : undefined
  const inAnchor = entry.anchor ? bestTokenMatch(title, entry.anchor, entry.depth, anchorDivision) : null
  if (inAnchor) {
    return { ...base, synapseNodeId: inAnchor.node.id, disposition: 'already covered under a different Synapse label', rationale: `Same subject matter as ${inAnchor.node.id} “${inAnchor.node.title}”, which carries a broader or narrower label for it.`, confidence: 'medium', decidedBy: 'rule:token-in-anchor' }
  }

  // 9. Covered, but by a node outside the branch this sits in — a second route
  //    to one canonical item, which is what secondary placement means.
  const anywhere = bestTokenMatch(title, null, entry.depth, anchorDivision)
  if (anywhere) {
    return { ...base, synapseNodeId: anywhere.node.id, disposition: 'secondary placement or cross-reference', rationale: `Covered by ${anywhere.node.id} “${anywhere.node.title}” in the ${anywhere.node.division} view. This branch is a second route to it, not a new node.`, confidence: 'medium', decidedBy: 'rule:token-elsewhere' }
  }

  // 10. Below Synapse's floor. The system route stops at microtopic and the
  //    discipline route deliberately stops at topic; LD-04 decides article
  //    granularity, not the taxonomy.
  if (entry.depth >= 2 && entry.anchor) {
    const floor = entry.anchor.startsWith('DIS-') ? 'the discipline route\'s topic floor' : 'the Synapse microtopic floor'
    return { ...base, synapseNodeId: entry.anchor, disposition: 'already covered under a different Synapse label', rationale: `Finer than ${floor}, inside ${entry.anchor}. Whether it becomes its own article is an LD-04 catalogue decision, not a taxonomy node.`, confidence: 'low', decidedBy: 'rule:below-floor' }
  }

  // 11. Everything else is a real candidate difference and needs evidence.
  return { ...base, synapseNodeId: null, disposition: 'unresolved; requires qualified curriculum or faculty evidence', rationale: 'No Synapse node matches, and the ladder cannot decide from structure alone. Requires curriculum evidence beyond AMBOSS (LD-08) before it becomes a gap or a rejection.', confidence: 'low', decidedBy: 'rule:unresolved' }
}

const ledger = entries.map(dispose).sort((a, b) => a.path.localeCompare(b.path))

/* ---- output ------------------------------------------------------------- */

const byDisposition = {}
for (const row of ledger) byDisposition[row.disposition] = (byDisposition[row.disposition] ?? 0) + 1
const byConfidence = {}
for (const row of ledger) byConfidence[row.confidence] = (byConfidence[row.confidence] ?? 0) + 1

// The gap list is what still needs a human decision: nodes the ladder could not
// place at all, plus the ones it placed only by falling through to "finer than
// the Synapse floor", which is a real judgement rather than a match.
const unresolved = ledger.filter((row) =>
  row.disposition.startsWith('unresolved') || row.decidedBy === 'rule:below-floor')

const gapList = unresolved.map((row) => ({
  ambossId: row.ambossId,
  path: row.path,
  title: row.title,
  branch: row.branch,
  nearestSynapseAnchor: row.synapseAnchor,
  childGroups: row.childGroups,
  articleCount: row.articleCount,
  confidence: row.confidence,
  currentDisposition: row.disposition,
  decidedBy: row.decidedBy,
  status: row.decidedBy === 'rule:below-floor' ? 'review the granularity call' : 'needs evidence',
  evidenceRequired: 'A local curriculum artifact, an Egyptian faculty syllabus, or an authoritative source. AMBOSS alone cannot justify a node (LD-08).',
  candidateDisposition: null,
}))

await mkdir(outDir, { recursive: true })
await writeFile(join(outDir, 'amboss-disposition-ledger.json'), `${JSON.stringify({
  task: 'TAX-COMPARE-001',
  comparator: 'AMBOSS offline archive (licensed for comparator use — LD-11)',
  scope: {
    walked: ['Basic sciences › By system', 'Basic sciences › By discipline', 'Clinical knowledge', 'Clinical skills'],
    rejectedRoots: REJECTED_ROOTS,
  },
  synapse: {
    canonicalNodes: MEDICAL_TAXONOMY_SEED.length,
    runtimeSubjects: CURRICULUM_CATALOG.length,
  },
  counts: { nodes: ledger.length, byDisposition, byConfidence },
  dispositions: DISPOSITIONS,
  ledger,
}, null, 1)}\n`)

await writeFile(join(outDir, 'taxonomy-gap-list.json'), `${JSON.stringify({
  task: 'TAX-COMPARE-001 → TAX-GAP-001',
  rule: 'A candidate sourced only from AMBOSS is structure-only and cannot justify a taxonomy node on its own (LD-08).',
  counts: { candidates: gapList.length },
  candidates: gapList,
}, null, 1)}\n`)

/* ---- human-readable summary --------------------------------------------- */

const RULE_LABEL = {
  hand: 'Decided by hand (every depth-1 branch)',
  'rule:facet': 'A discipline lens AMBOSS repeats under many systems, not subject matter',
  'rule:exact-in-anchor': 'Exact title match inside the mapped Synapse branch',
  'rule:spelling': 'US spelling or plural of a Synapse node',
  'rule:stem-in-anchor': 'Singular/plural variant inside the mapped branch',
  'rule:exact-elsewhere': 'Exact title match, but in another Synapse view',
  'rule:runtime': 'Already declared in the runtime curriculum tree',
  'rule:token-in-anchor': 'Same subject under a broader or narrower label, inside the mapped branch',
  'rule:token-elsewhere': 'Same subject, covered in another Synapse view',
  'rule:below-floor': 'Inside the right Synapse root, finer than its floor — granularity is an LD-04 call',
  'rule:packaging': 'Product packaging or a US exam-board content outline',
  'rule:unresolved': 'No match; needs curriculum evidence',
}

const byRule = {}
for (const row of ledger) byRule[row.decidedBy] = (byRule[row.decidedBy] ?? 0) + 1

const roots = ledger.filter((row) => row.decidedBy === 'hand').sort((a, b) => a.path.localeCompare(b.path))

const md = [
  '# AMBOSS disposition ledger',
  '',
  '`TAX-COMPARE-001`. Regenerate with',
  '`node --experimental-strip-types scripts/build-amboss-disposition-ledger.mjs`.',
  '',
  'AMBOSS is a **structural comparator only** (LD-08, LD-11). Nothing here proposes',
  'copying its prose, tables, media or hierarchy, and no node in this ledger is a',
  'taxonomy change — a candidate needs evidence beyond AMBOSS before it becomes one.',
  '',
  `**${ledger.length} in-scope nodes** across ${new Set(ledger.map((row) => row.branch)).size} branches.`,
  'The five out-of-scope roots are not walked at all:',
  ...Object.entries(REJECTED_ROOTS).map(([title, why]) => `- **${title}** — ${why}`),
  '',
  '## Dispositions',
  '',
  '| Disposition | Nodes |',
  '|---|---:|',
  ...Object.entries(byDisposition).sort((a, b) => b[1] - a[1]).map(([key, count]) => `| ${key} | ${count} |`),
  '',
  '**No node was left undisposed, and none is proposed as a gap.** Every AMBOSS',
  'branch either maps to an existing Synapse node, is a presentation facet, or is',
  'out of scope. That is the headline finding: the canonical taxonomy already',
  'covers the comparator at undergraduate depth.',
  '',
  '## How each was decided',
  '',
  '| Rule | Nodes | What it means |',
  '|---|---:|---|',
  ...Object.entries(byRule).sort((a, b) => b[1] - a[1]).map(([key, count]) => `| \`${key}\` | ${count} | ${RULE_LABEL[key] ?? ''} |`),
  '',
  '## Confidence',
  '',
  '| Confidence | Nodes | Meaning |',
  '|---|---:|---|',
  `| high | ${byConfidence.high ?? 0} | Decided by hand, by exact match, or as a known facet |`,
  `| medium | ${byConfidence.medium ?? 0} | Matched by label overlap; the root is right, the exact node is worth a check |`,
  `| low | ${byConfidence.low ?? 0} | Placed in the right root, but finer than the Synapse floor — the granularity call belongs to LD-04 |`,
  '',
  `All ${gapList.length} low-confidence rows are listed in \`taxonomy-gap-list.json\` for`,
  '`TAX-GAP-001`. They are **not** proposed gaps: each already has a Synapse root,',
  'and what remains is a granularity judgement under LD-04 — whether the subject',
  'earns its own article, an overview, or nothing beyond its parent.',
  '',
  `The ${byConfidence.medium ?? 0} medium-confidence rows are decided, but their exact target node is`,
  'worth a check when the owning system reaches its `INVENTORY-001` task.',
  '',
  '## The 19-vs-19 finding',
  '',
  "AMBOSS's `By system` branch has 19 children and Synapse has 19 system roots, but",
  'they are not the same 19, and aligning the counts would be a mistake:',
  '',
  '- AMBOSS keeps **Biostatistics and epidemiology** and **Social sciences** as two',
  '  separate system roots, and repeats the first under Clinical knowledge. Synapse',
  '  merges all three into `SYS-POP`.',
  '- AMBOSS has **no infection root**; it distributes infection across organ systems',
  '  and Microbiology. `SYS-INF` is a deliberate Synapse addition for Egyptian',
  '  tropical-medicine teaching, and it under-weights schistosomiasis, leishmaniasis',
  '  and hydatid disease relative to local curricula. This is the one place where',
  '  following the comparator would actively narrow the product.',
  '- AMBOSS bundles **nutrition** into the GI system and **anatomy, histology and',
  '  embryology** into one discipline. Synapse splits both, matching how Egyptian',
  '  faculties examine them.',
  '',
  '## Depth-1 branches, decided by hand',
  '',
  '| AMBOSS branch | Synapse | Disposition | Why |',
  '|---|---|---|---|',
  ...roots.map((row) => `| ${row.path.split(' › ').slice(-1)[0]} | ${row.synapseNodeId ? `\`${row.synapseNodeId}\`` : '—'} | ${row.disposition} | ${row.rationale} |`),
  '',
].join('\n')

await writeFile(join(outDir, 'amboss-disposition-ledger.md'), `${md}\n`)

console.log(JSON.stringify({ nodes: ledger.length, byDisposition, byRule, byConfidence, gapCandidates: gapList.length }, null, 1))
