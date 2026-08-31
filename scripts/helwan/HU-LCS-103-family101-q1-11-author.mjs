#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  sources: resolve(base, 'evidence/HU-LCS-103-family101-osteomyelitis-sources.md'),
  concepts: resolve(base, 'concept/HU-LCS-103-family101-osteomyelitis-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family101-osteomyelitis-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family101-osteomyelitis-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family101-osteomyelitis-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family101-osteomyelitis-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family101-q1-11-osteomyelitis-mcq.md'),
}
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const source = {
  assessment: 'src_cf37932d10b47ec0a26f',
  teaching: 'src_3328fde7f743cd67dc9f',
  answerSupport: 'src_dc883db2a46aec7986e5',
}
const concept = {
  organism: 'CON-MSK-9093C8C1E6891D',
  distribution: 'CON-MSK-FA4F7DB668E5B9',
  pathogenesis: 'CON-MSK-7840CBA0BBA334',
  complications: 'CON-MSK-F10CBA8F31CD29',
  chronic: 'CON-MSK-986759075D3736',
}
const article = {
  acute: 'ART-HU-LCS103-PAT-F101-ACUTE-OSTEOMYELITIS',
  chronic: 'ART-HU-LCS103-PAT-F101-CHRONIC-OSTEOMYELITIS',
}

const sources = [
  {
    id: source.assessment,
    title: 'LCS-103 Pathology MCQ Lecture 2 MSS — Osteomyelitis',
    institution: 'Faculty of Medicine, Helwan University',
    processing_status: 'ocr_required',
    collection_id: 'hu-y1',
    source_relative_path: 'Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - mcq 2 mss.pdf',
    source_uri: '',
    media_type: 'application/pdf',
    languages: 'en',
    publication_date: '2025-04-11',
    accessed_at: '',
    page_count: '5',
    sha256: 'cf37932d10b47ec0a26f3c66652f587b3eb2be135933b9a008c53e4e37b11a88',
    rights: 'Local Helwan teaching and assessment material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-3 direct named-course LCS-103 Pathology question deck. The cover identifies Pathology, MCQ Lecture 2 MSS, Osteomyelitis, Dr Ahmed Hassan and Level 1 Semester 2. It supplies exact question wording and printed keys but is not a formal sitting paper or separately issued official key.',
    confidence: '0.9',
    is_assessment: 'yes',
  },
  {
    id: source.teaching,
    title: 'LCS-103 Pathology Lecture 1 Parts I and II — Bone Diseases and Tumours',
    institution: 'Faculty of Medicine, Helwan University',
    processing_status: 'native_text',
    collection_id: 'hu-y1',
    source_relative_path: 'Year 1/LCS 103/Pathology/Theoretical/Lec 1 - Bone Diseases & Tumors/103   (1) and (2)bone diseases and tumors.pdf',
    source_uri: '',
    media_type: 'application/pdf',
    languages: 'en',
    publication_date: '',
    accessed_at: '',
    page_count: '43',
    sha256: '3328fde7f743cd67dc9fabcdd320e6337d1b38a2f6f36a7fa2e347ededf359cb',
    rights: 'Local Helwan teaching material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-4 direct local LCS-103 Pathology theoretical lecture by Dr Rofanda Bakeer. Physical pages 23–26 support osteomyelitis classification and chronic sequestrum, involucrum and cloaca terminology; this is curriculum support, not independent medical verification.',
    confidence: '0.86',
    is_assessment: 'no',
  },
  {
    id: source.answerSupport,
    title: 'LCS-103 Pathology Short Essay and Short Answer Questions',
    institution: 'Faculty of Medicine, Helwan University',
    processing_status: 'native_text',
    collection_id: 'hu-y1',
    source_relative_path: 'Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - College MCQs 103 LMC SEQs _ SAQs.pdf',
    source_uri: '',
    media_type: 'application/pdf',
    languages: 'en',
    publication_date: '',
    accessed_at: '',
    page_count: '12',
    sha256: 'dc883db2a46aec7986e5772fe0431e1afe04f3aeeb51b2925c7f73f1bd073f2d',
    rights: 'Local Helwan teaching and assessment material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-3 direct course-authored LCS-103 Pathology revision-question handout by Assistant Professor Hebat Allah A. Amin. Its immediate printed osteomyelitis answers support Draft explanations only; its unmarked written records remain held and are not imported in this Family-101 slice.',
    confidence: '0.88',
    is_assessment: 'yes',
  },
]

const conceptSpecs = [
  {
    code: 'organism', id: concept.organism, key: 'osteomyelitis.pyogenic.organisms-etiology', article: article.acute,
    label: 'Acute pyogenic osteomyelitis is most commonly caused by Staphylococcus aureus, while the organism differential depends on the infection context',
    aliases: 'Acute suppurative osteomyelitis organisms\nPyogenic osteomyelitis aetiology\nStaphylococcus aureus bone infection',
    definition: 'Acute pyogenic osteomyelitis is a bacterial infection of bone and marrow. In this direct LCS question set and its local answer support, Staphylococcus aureus is the most commonly identified organism.',
    objective: 'Identify the source-keyed common organism and retain the broader bacterial options exactly without treating a local question-bank key as independent verification.',
    pitfalls: 'Family-101 Q3 prints Klebsiella as the keyed non-cause. Preserve that occurrence but do not generalise it beyond this Draft local assessment without faculty review.',
    type: 'etiology', micro: 'Pyogenic organisms', resources: `${source.assessment}\n${source.answerSupport}`, signal: 'Family-101 Q1 key A and Q3 key C; Family-79 immediate answers name Staphylococcus aureus.',
    claim: 'CLM-HULCS103-F101-ORGANISM-01', articleQuote: 'The direct LCS sources identify Staphylococcus aureus as the most common organism in acute pyogenic osteomyelitis.',
    original: '[Family-101 Q1] The most common organism to cause acute suppurative osteomyelitis is; printed key A, Staph aureus.\n[Family-101 Q3] The printed key C selects Klebsiella as the option that is not a cause.\n[Family-79] The most common causative organism is Staphylococcus aureus.',
    conflicts: 'Family-101 Q3 is a source-risk item because its printed key excludes Klebsiella; the exact occurrence remains Draft pending named Pathology faculty review.',
  },
  {
    code: 'distribution', id: concept.distribution, key: 'osteomyelitis.hematogenous.distribution-site', article: article.acute,
    label: 'Acute hematogenous osteomyelitis preferentially involves long-bone metaphyses, often around the knee, while the source keys the epiphysis as relatively resistant to spread',
    aliases: 'Hematogenous osteomyelitis distribution\nMetaphyseal osteomyelitis\nLong-bone osteomyelitis site',
    definition: 'The direct Family-101 deck repeatedly tests the distribution of acute hematogenous osteomyelitis. It keys metaphyses of long bones and the knee region as the common distribution and keys the epiphysis as resistant to spread.',
    objective: 'Recognise the exact source-keyed long-bone metaphyseal distribution while flagging wording and age-context limitations for faculty review.',
    pitfalls: 'Do not silently change the printed term joint in Q8 to bone or metaphysis. The key is preserved as local assessment evidence, not promoted to universal age-independent teaching.',
    type: 'distribution_pattern', micro: 'Hematogenous distribution', resources: source.assessment, signal: 'Family-101 Q2/Q4/Q8/Q10, printed keys A/C/B/B.',
    claim: 'CLM-HULCS103-F101-DISTRIBUTION-01', articleQuote: 'The source-keyed distribution centres on metaphyses of long bones, especially around the knee.',
    original: '[Family-101 Q2] Epiphysis is printed as resistant to spread, key A.\n[Family-101 Q4] Metaphysis is printed as the affected site, key C.\n[Family-101 Q8/Q10] Knee and metaphysis of long bones are printed with keys B and B.',
    conflicts: 'Q8 asks for the most common joint even though the deck concerns osteomyelitis; its wording and key B are retained exactly and require faculty review.',
  },
  {
    code: 'pathogenesis', id: concept.pathogenesis, key: 'osteomyelitis.acute.neutrophilic-ischemic-necrosis', article: article.acute,
    label: 'Acute suppurative osteomyelitis is neutrophil-rich and can produce bone necrosis through bacterial toxins, inflammatory thrombosis and exudate-related vascular compression',
    aliases: 'Acute osteomyelitis neutrophils\nOsteomyelitis ischemic bone necrosis\nSuppurative bone inflammation',
    definition: 'Family-101 identifies neutrophils as the characteristic inflammatory cell of acute osteomyelitis. It keys all three printed mechanisms—bacterial toxins, inflammatory thrombosis and compression by exudate—as contributors to bone necrosis.',
    objective: 'Connect the acute neutrophilic response to the source-keyed toxic and ischaemic routes of bone necrosis.',
    pitfalls: 'Do not select a chronic mononuclear inflammatory cell for the acute item. Do not collapse the printed all-of-the-above mechanism into only one vascular pathway.',
    type: 'pathophysiology', micro: 'Acute suppurative pathogenesis', resources: source.assessment, signal: 'Family-101 Q5 key B and Q6 key D.',
    claim: 'CLM-HULCS103-F101-PATHOGENESIS-01', articleQuote: 'Acute suppurative osteomyelitis is neutrophil-rich, and the local deck attributes necrosis to toxins and vascular compromise.',
    original: '[Family-101 Q5] Neutrophils, printed key B.\n[Family-101 Q6] All of the above, printed key D, covering toxins, inflammatory thrombosis and vessel compression by exudates.',
    conflicts: '[clear]',
  },
  {
    code: 'complications', id: concept.complications, key: 'osteomyelitis.acute.features-complications', article: article.chronic,
    label: 'Acute hematogenous osteomyelitis may cause septicemia, sequestrum formation and pathological fracture, while the source rejects an older-female demographic pattern',
    aliases: 'Acute osteomyelitis complications\nHematogenous osteomyelitis outcomes\nSepticemia and pathological fracture in osteomyelitis',
    definition: 'The Family-101 deck lists septicemia, sequestrum formation and pathological fracture among acute hematogenous osteomyelitis outcomes. Its exception item keys the statement that disease more commonly affects females above 60 years old as false.',
    objective: 'Use the printed exception structure to distinguish source-keyed acute features and complications from the rejected demographic statement.',
    pitfalls: 'The item is a local question-bank occurrence, not a complete epidemiology statement. Preserve its older-female distractor and key without inferring an alternative demographic profile not printed by the source.',
    type: 'complication_pattern', micro: 'Acute complications', resources: source.assessment, signal: 'Family-101 Q7 printed key D.',
    claim: 'CLM-HULCS103-F101-COMPLICATIONS-01', articleQuote: 'The deck retains septicemia, sequestrum formation and pathological fracture as acute hematogenous osteomyelitis complications.',
    original: '[Family-101 Q7] The printed exception key is D; septicemia and sequestrum formation remain source-accepted statements.\n[Family-101 Q17, outside this slice] Pathological fracture appears in the later complication set.',
    conflicts: '[clear]',
  },
  {
    code: 'chronic', id: concept.chronic, key: 'osteomyelitis.chronic.sequestrum-involucrum-cloaca', article: article.chronic,
    label: 'Chronic osteomyelitis separates necrotic bone as a sequestrum, forms periosteal new bone as involucrum and may drain through cloacae',
    aliases: 'Sequestrum involucrum cloaca\nChronic osteomyelitis morphology\nSeparated necrotic bone',
    definition: 'A sequestrum is separated necrotic bone. The local theoretical lecture distinguishes it from involucrum, which is periosteal new bone, and from cloacae, which are thick-walled drainage openings in chronic osteomyelitis.',
    objective: 'Distinguish sequestrum, involucrum and cloaca by the tissue or structure each term names.',
    pitfalls: 'Do not call periosteal new bone a sequestrum. Do not call a drainage sinus or cloaca the necrotic bone fragment itself.',
    type: 'morphology', micro: 'Chronic morphology', resources: `${source.assessment}\n${source.teaching}`, signal: 'Family-101 Q9 key A and Q11 key B; Family-64 pp23–26 terminology support.',
    claim: 'CLM-HULCS103-F101-CHRONIC-01', articleQuote: 'A sequestrum is the separated necrotic-bone fragment in chronic osteomyelitis.',
    original: '[Family-101 Q9] Sequestrum, printed key A.\n[Family-101 Q11] Necrotic bone, printed key B.\n[Family-64] The separated necrotic part is called sequestrum; periosteal new bone is involucrum; thick-walled holes are cloacae.',
    conflicts: '[clear]',
  },
]

const concepts = conceptSpecs.map((spec) => ({
  label: spec.label,
  id: spec.id,
  canonical_key: spec.key,
  aliases: spec.aliases,
  arabic_label: '',
  arabic_aliases: '',
  status: 'under review',
  support_mode: 'direct_statement',
  subject: 'msk',
  primary_node_id: 'SYS-MSK',
  secondary_node_ids: 'DIS-PAT-T03',
  topic: 'Musculoskeletal system',
  subtopic: 'Osteomyelitis',
  nanotopic: '',
  modules: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Osteomyelitis',
  universities: 'hu',
  learner_years: '1',
  approved_file_resource_ids: '[clear]',
  approved_video_resource_ids: '[clear]',
  blueprint_weight: '0.85',
  exam_weight_by_year: 'HU_Y1=0.85',
  clinical_relevance: '0.8',
  academic_relevance: '0.98',
  weight_confidence: '0.58',
  confidence: '0.86',
  resource_occurrence_ids: '[clear]',
  source_candidate_ids: '[clear]',
  merge_ids: '[clear]',
  rejected_merge_candidate_ids: 'The governed search found no substantive live or pending record covering this complete assessment objective.',
  evidence_gaps: 'Independent medical verification and named Helwan Pathology faculty review are required before publication.',
  owner: 'Helwan Year-1 authoring lane',
  reviewer: 'Medical team, Helwan Pathology faculty',
  final_publisher: 'Admin team',
  last_reviewed: '',
  review_due: '',
  publication_status: 'needs_evidence',
  editorial_review_status: 'drafted_not_reviewed',
  exclusion_reason: '',
  definition: spec.definition,
  explicit_objective: spec.objective,
  pitfalls: spec.pitfalls,
  concept_type: spec.type,
  microtopic: spec.micro,
  article_ids: spec.article,
  related_article_ids: spec.article === article.acute ? article.chronic : article.acute,
  resource_ids: spec.resources,
  exam_signal: spec.signal,
  atomic_claim_ids: spec.claim,
  original_wording: spec.original,
  conflicts: spec.conflicts,
  uncertainty: '[clear]',
  field_notes: `microtopicId: The reviewed taxonomy stops at SYS-MSK for this local Pathology overlay; the named microtopic is retained as prose.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical node.
approvedFileResourceIds: No source file is rights-cleared for student redistribution.
approvedVideoResourceIds: No video is assigned to this concept.
resourceOccurrenceIds: Hand-authored from governed Family-101 and local curriculum support; no extraction-occurrence record exists.
sourceCandidateIds: The governed triage and authoring search completed before minting.
mergeIds: No concept was merged into this new record.
lastReviewed: New record; no faculty review has occurred.
reviewDue: Set after the first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
arabicLabel: Blank pending independently verified Arabic terminology review.
arabicAliases: Blank pending independently verified Arabic terminology review.`,
}))

const acuteQuestions = [1, 2, 3, 4, 5, 6, 8, 10].map((number) => `Q-HU-LCS103-PAT-F101-${String(number).padStart(2, '0')}`).join('\n')
const chronicQuestions = [7, 9, 11].map((number) => `Q-HU-LCS103-PAT-F101-${String(number).padStart(2, '0')}`).join('\n')
const articleCommon = {
  arabic_title: '', subject: 'msk', topic: 'Musculoskeletal system', subtopic: 'Bone diseases', primary_node_id: 'SYS-MSK',
  template_id: 'TPL-CONCEPT', archetype: 'concept', language: 'en', learner_stage: 'Years 1–3 foundation', high_yield: 'High', time_sensitive: 'stable',
  status: 'Draft', owner: 'Helwan Year-1 authoring lane', reviewer: 'Medical team, Helwan Pathology faculty', final_publisher: 'Admin team',
  published_summary: '', published_sections: '', universities: 'hu', years: 'HU_Y1', module: 'HU-LCS-103', media: '', publication_gate: 'needs_evidence',
  evidence_gaps: 'Independent medical verification and named Helwan Pathology faculty review are required before publication.', last_reviewed: '', review_due: '',
  nanotopic: '', secondary_node_ids: 'DIS-PAT-T03', media_recommendations: '',
}
const articles = [
  {
    id: article.acute,
    title: 'Acute pyogenic osteomyelitis: organisms, distribution and necrosis',
    aliases: 'Acute suppurative osteomyelitis\nHematogenous osteomyelitis\nAcute bone infection',
    ...articleCommon,
    conflicts: 'Family-101 Q3 prints key C for Klebsiella as the non-cause; Q2 and Q8 use simplified distribution wording. The exact questions remain Draft pending faculty adjudication.',
    microtopic: 'Acute pyogenic osteomyelitis',
    reading_time: '8',
    summary: 'The Family-101 deck organises acute pyogenic osteomyelitis around four tested decisions: Staphylococcus aureus as the common organism, metaphyseal long-bone distribution around the knee, neutrophilic suppuration and necrosis produced through toxic and vascular mechanisms. The source wording and keys remain local question-bank evidence rather than independent verification.',
    sections: `### Definition
Acute pyogenic osteomyelitis is an acute bacterial infection involving bone and marrow. The direct LCS question deck uses the terms acute suppurative and acute hematogenous osteomyelitis across its organism, distribution and pathogenesis items.

### Mechanism
The local question set identifies neutrophils as the characteristic acute inflammatory cell. It attributes necrosis of inflamed bone to bacterial toxins, inflammatory thrombosis and compression of vessels by exudates, so its all-of-the-above key joins direct injury with ischaemic vascular compromise.

Hematogenous spread brings organisms to bone through the bloodstream. Within the source's first-year frame, the tested distribution centres on metaphyses of long bones, especially around the knee, while the epiphysis is printed as relatively resistant to spread.

### Key determinants
The direct deck and its local short-answer support identify Staphylococcus aureus as the most common organism. Family-101 Q3 separately prints Klebsiella as the keyed non-cause; that exact source occurrence is retained but remains an editorial risk rather than a universally published assertion.

For site questions, read whether the stem asks for the commonly affected location or the site resistant to spread. The source keys metaphysis for common involvement and epiphysis for resistance, and it prints knee for its regional item even though the stem says joint.

### Clinical significance
Acute bone infection can progress from a local neutrophilic process to tissue necrosis and systemic infection. Organism, route and age context matter in clinical care, so this local question-bank summary must not substitute for a reviewed diagnostic or treatment guideline.

### Common misconceptions
Do not choose a chronic mononuclear cell for the acute inflammatory-cell question. Do not treat one printed organism list as exhaustive. Do not silently repair Q8's word joint or turn an age-sensitive distribution rule into an unconditional statement.`,
    hold_these: 'Staphylococcus aureus is the source-keyed common organism.\nThe source keys long-bone metaphysis and the knee region for common hematogenous distribution.\nNeutrophils characterise the acute process.\nToxins, thrombosis and exudate-related compression contribute to necrosis in the printed mechanism item.',
    lose_the_mark: 'Selecting a chronic inflammatory cell for acute suppuration.\nConfusing the resistant-site stem with the common-site stem.\nReplacing the source key or option wording with an inferred correction.',
    related_concepts: `${concept.organism}\n${concept.distribution}\n${concept.pathogenesis}`,
    related_articles: `${article.chronic}: continues from acute injury to complications and chronic sequestrum terminology`,
    question_ids: acuteQuestions,
    resource_ids: `${source.assessment}\n${source.teaching}\n${source.answerSupport}`,
    module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Osteomyelitis > Acute Pyogenic Osteomyelitis',
    university_notes: 'hu: Restricted to the direct Family-101 Q1–Q11 deck and named local LCS teaching support.',
    annotations: `### definition_of · ${concept.organism}
Quote: The direct deck and its local short-answer support identify Staphylococcus aureus as the most common organism.
Block: body

### definition_of · ${concept.distribution}
Quote: Within the source's first-year frame, the tested distribution centres on metaphyses of long bones, especially around the knee, while the epiphysis is printed as relatively resistant to spread.
Block: body

### definition_of · ${concept.pathogenesis}
Quote: It attributes necrosis of inflamed bone to bacterial toxins, inflammatory thrombosis and compression of vessels by exudates, so its all-of-the-above key joins direct injury with ischaemic vascular compromise.
Block: body`,
    article_source_ids: `${source.assessment}\n${source.teaching}\n${source.answerSupport}`,
    claim_ids: 'CLM-HULCS103-F101-ORGANISM-01\nCLM-HULCS103-F101-DISTRIBUTION-01\nCLM-HULCS103-F101-PATHOGENESIS-01',
    span_ids: 'SPN-HULCS103-F101-ORGANISM-01\nSPN-HULCS103-F101-DISTRIBUTION-01\nSPN-HULCS103-F101-PATHOGENESIS-01',
    callout_evidence: `### Staphylococcus aureus is the source-keyed common organism.
Claims: CLM-HULCS103-F101-ORGANISM-01
Citations: CIT-HULCS103-F101-ORGANISM-01
Span: SPN-HULCS103-F101-ORGANISM-01

### The source keys long-bone metaphysis and the knee region for common hematogenous distribution.
Claims: CLM-HULCS103-F101-DISTRIBUTION-01
Citations: CIT-HULCS103-F101-DISTRIBUTION-01
Span: SPN-HULCS103-F101-DISTRIBUTION-01

### Neutrophils characterise the acute process.
Claims: CLM-HULCS103-F101-PATHOGENESIS-01
Citations: CIT-HULCS103-F101-PATHOGENESIS-01
Span: SPN-HULCS103-F101-PATHOGENESIS-01`,
    evidence_basis: 'Family-101 supplies exact printed MCQ occurrences and keys. Family-64 and Family-79 provide local curriculum and immediate-answer support only; none is independent medical verification.',
    notes: 'Family 100 is excluded as external student-authored written material. Family 79 remains evidence support only, and its written questions are not imported here.',
    field_notes: `arabicTitle: Blank because no reviewed Arabic title was present.
nanotopicId: No reviewed nanotopic exists below the assigned node.
media: No media is required by this text-only slice.
publishedSummary: Blank because this remains Draft.
publishedSections: Blank because this remains Draft.
lastReviewed: New record; no named medical reviewer has completed review.
reviewDue: Set after first named medical review.`,
  },
  {
    id: article.chronic,
    title: 'Osteomyelitis complications and chronic morphology',
    aliases: 'Sequestrum involucrum and cloaca\nChronic pyogenic osteomyelitis\nOsteomyelitis complications',
    ...articleCommon,
    conflicts: '[clear]',
    microtopic: 'Complications and chronic osteomyelitis',
    reading_time: '6',
    summary: 'Acute hematogenous osteomyelitis may extend beyond a local infection and can leave necrotic bone. The local sources distinguish the separated necrotic fragment, sequestrum, from periosteal new bone, involucrum, and from a thick-walled drainage opening, cloaca.',
    sections: `### Definition
A sequestrum is a separated fragment of necrotic bone in osteomyelitis. Involucrum is new bone formed by the thickened periosteum around the diseased region, while a cloaca is a thick-walled opening through which chronic infection can drain.

### Mechanism
Acute suppurative inflammation can compromise bone viability. Osteoclasts separate the necrotic portion from viable bone, producing a sequestrum; periosteal new-bone formation produces involucrum, and chronic drainage pathways can persist as cloacae.

### Key determinants
Family-101 Q9 asks for the name of separated necrotic bone and prints sequestrum. Q11 asks what a sequestrum consists of and prints necrotic bone. These two forms test the same terminology from opposite directions without being exact prompt repeats.

The Q7 exception set retains septicemia and sequestrum formation as source-accepted complications and rejects the older-female demographic statement. Pathological fracture appears in the later complication set outside this slice and is recorded in the concept background without importing Q17 yet.

### Clinical significance
The chronic terms describe different structures and should not be interchanged. Their recognition helps explain persistence of infection, drainage and structural weakening, but this Draft article is not a management protocol.

### Common misconceptions
Sequestrum is not periosteal new bone, and involucrum is not the dead fragment. A cloaca is an opening rather than the fragment itself. Brodie abscess is also not a synonym for sequestrum in this source set.`,
    hold_these: 'A sequestrum is separated necrotic bone.\nInvolucrum is periosteal new bone around the diseased region.\nCloacae are thick-walled drainage openings.\nSepticemia and sequestrum formation remain source-accepted acute complications.',
    lose_the_mark: 'Calling periosteal new bone sequestrum.\nCalling a drainage sinus the dead bone fragment.\nImporting later repeated or conflicted occurrences into this Q1–Q11 slice.',
    related_concepts: `${concept.complications}\n${concept.chronic}`,
    related_articles: `${article.acute}: reviews organisms, hematogenous distribution and acute necrosis`,
    question_ids: chronicQuestions,
    resource_ids: `${source.assessment}\n${source.teaching}`,
    module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Osteomyelitis > Complications and Chronic Morphology',
    university_notes: 'hu: Restricted to the direct Family-101 deck and Family-64 local theoretical terminology support.',
    annotations: `### definition_of · ${concept.complications}
Quote: The Q7 exception set retains septicemia and sequestrum formation as source-accepted complications and rejects the older-female demographic statement.
Block: body

### definition_of · ${concept.chronic}
Quote: A sequestrum is a separated fragment of necrotic bone in osteomyelitis.
Block: body`,
    article_source_ids: `${source.assessment}\n${source.teaching}`,
    claim_ids: 'CLM-HULCS103-F101-COMPLICATIONS-01\nCLM-HULCS103-F101-CHRONIC-01',
    span_ids: 'SPN-HULCS103-F101-COMPLICATIONS-01\nSPN-HULCS103-F101-CHRONIC-01',
    callout_evidence: `### Septicemia and sequestrum formation remain source-accepted acute complications.
Claims: CLM-HULCS103-F101-COMPLICATIONS-01
Citations: CIT-HULCS103-F101-COMPLICATIONS-01
Span: SPN-HULCS103-F101-COMPLICATIONS-01

### A sequestrum is separated necrotic bone.
Claims: CLM-HULCS103-F101-CHRONIC-01
Citations: CIT-HULCS103-F101-CHRONIC-01
Span: SPN-HULCS103-F101-CHRONIC-01`,
    evidence_basis: 'Family-101 supplies exact Q7/Q9/Q11 wording and printed keys. Family-64 physical pages 23–26 support the chronic terminology; neither source is independent medical verification.',
    notes: 'Family-101 Q12–Q21 remain outside this slice. The Q12=B versus Q20=C chronic-cell conflict is not resolved or imported here.',
    field_notes: `arabicTitle: Blank because no reviewed Arabic title was present.
nanotopicId: No reviewed nanotopic exists below the assigned node.
media: No media is required by this text-only slice.
publishedSummary: Blank because this remains Draft.
publishedSections: Blank because this remains Draft.
lastReviewed: New record; no named medical reviewer has completed review.
reviewDue: Set after first named medical review.`,
  },
]

const claimSpecs = [
  ['ORGANISM', concept.organism, 'Acute pyogenic osteomyelitis', 'is most commonly caused by', 'Staphylococcus aureus in the direct local LCS source', 'Acute pyogenic osteomyelitis is most commonly caused by Staphylococcus aureus in the direct local LCS source.', article.acute, 'art-hu-lcs103-pat-f101-acute-osteomyelitis-key-determinants', '2', 'Printed Q1 and Q3', 'Q1 prints Staph aureus with key A; Q3 prints Klebsiella with key C as the non-cause.', 'Staph aureus'],
  ['DISTRIBUTION', concept.distribution, 'Acute hematogenous osteomyelitis', 'preferentially affects', 'the metaphyses of long bones, especially around the knee, in the source-keyed distribution', 'Acute hematogenous osteomyelitis preferentially affects the metaphyses of long bones, especially around the knee, in the source-keyed distribution.', article.acute, 'art-hu-lcs103-pat-f101-acute-osteomyelitis-key-determinants', '2-3', 'Printed Q2, Q4, Q8 and Q10', 'The deck keys epiphysis as resistant, metaphysis as affected/common and knee as the regional answer.', 'Metaphysis of long bones'],
  ['PATHOGENESIS', concept.pathogenesis, 'Acute suppurative osteomyelitis', 'is characterised by', 'neutrophilic inflammation with bone necrosis attributed to toxins and vascular compromise in the local deck', 'Acute suppurative osteomyelitis is characterised by neutrophilic inflammation with bone necrosis attributed to toxins and vascular compromise in the local deck.', article.acute, 'art-hu-lcs103-pat-f101-acute-osteomyelitis-mechanism', '2-3', 'Printed Q5 and Q6', 'Q5 prints neutrophils with key B; Q6 prints all of the above with key D.', 'Neutrophils; All of the above'],
  ['COMPLICATIONS', concept.complications, 'Acute hematogenous osteomyelitis', 'may produce', 'septicemia, sequestrum formation and pathological fracture in the local assessment set', 'Acute hematogenous osteomyelitis may produce septicemia, sequestrum formation and pathological fracture in the local assessment set.', article.chronic, 'art-hu-lcs103-pat-f101-chronic-osteomyelitis-key-determinants', '3', 'Printed Q7', 'Q7 retains septicemia and sequestrum formation as true statements and prints D as the exception.', 'May be complicated by septicemia; May result in the formation of sequestrum'],
  ['CHRONIC', concept.chronic, 'A sequestrum in osteomyelitis', 'is', 'a separated fragment of necrotic bone', 'A sequestrum in osteomyelitis is a separated fragment of necrotic bone.', article.chronic, 'art-hu-lcs103-pat-f101-chronic-osteomyelitis-key-determinants', '3', 'Printed Q9 and Q11', 'Q9 prints Sequestrum with key A; Q11 prints Necrotic bone with key B.', 'Sequestrum; Necrotic bone'],
]

const claims = claimSpecs.map(([code, conceptId, subject, predicate, object, display]) => ({
  id: `CLM-HULCS103-F101-${code}-01`, concept_id: conceptId, subject, predicate, object, display_text: display,
  risk_class: 'foundational_stable', verification_status: 'needs_evidence', conflict_status: 'none', confidence: '0.84',
  freshness: 'stable_local_assessment_fact', time_sensitive: 'no',
  qualifiers: 'polarity: affirmative\nauthority: direct local named-course assessment and curriculum support, not independent verification\nassessment boundary: Family-101 Q1–Q11 only',
}))

const citations = claimSpecs.map(([code, , , , , , , , page, section, detail, support]) => ({
  id: `CIT-HULCS103-F101-${code}-01`, claim_id: `CLM-HULCS103-F101-${code}-01`, resource_id: source.assessment,
  evidence_role: 'local_assessment', locator_type: 'page', locator_page: page, locator_section: section, locator_detail: detail,
  support_span: support, context_note: 'Exact source wording and printed key are preserved; the claim remains Draft pending independent verification.', confidence: '0.84', counts_as_claim_evidence: 'no',
}))

const spans = claimSpecs.map(([code, , , , , display, articleId, sectionId]) => ({
  id: `SPN-HULCS103-F101-${code}-01`, article_id: articleId, section_id: sectionId, text: display,
  claim_ids: `CLM-HULCS103-F101-${code}-01`, citation_ids: `CIT-HULCS103-F101-${code}-01`,
}))

const teaching = {
  organism: 'The direct deck and its local short-answer support identify Staphylococcus aureus as the common organism. The source still prints several alternative organisms, and Q3 specifically keys Klebsiella as the non-cause; that exact key is retained as a Draft source-risk occurrence. No option is corrected or broadened into a universal organism rule without faculty review.',
  distribution: 'The source keys metaphysis for common long-bone involvement, epiphysis for resistance to spread and knee for its regional item. These are preserved local question-bank statements, while the word joint in Q8 and the age-sensitive nature of distribution require faculty review. Read whether the stem asks for the common site or the resistant site before selecting the printed key.',
  pathogenesis: 'The source identifies neutrophils as the characteristic acute inflammatory cell. It attributes bone necrosis to bacterial toxins, inflammatory thrombosis and compression of vessels by exudates, making all of the above its printed mechanism key. Chronic mononuclear cells belong to a different temporal pattern and are not substituted into these acute items.',
  complications: 'The source retains septicemia and sequestrum formation as true acute-osteomyelitis statements and rejects the older-female demographic option. Sequestrum formation reflects persistence of necrotic bone after the acute process. The occurrence remains Draft because this local exception item is not a complete epidemiology source.',
  chronic: 'A sequestrum is the separated necrotic fragment of bone. The local theoretical lecture distinguishes it from involucrum, which is periosteal new bone, and from a cloaca, which is a thick-walled drainage opening. The two questions test the same terminology from opposite directions but are not exact prompt repeats.',
}
const rowSpecs = [
  [1, 2, 'organism', 'A', 'The most common organism to cause acute suppurative osteomyelitis is:', ['Staph aureus', 'E coli', 'Streptococcus hemolyticus', 'Gonococci', 'Menigiococci']],
  [2, 2, 'distribution', 'A', 'The following site is resistant to spread in cases of acute hematogenous osteomyelitis:', ['Epiphysis', 'Diaphysis', 'Metaphysis', 'Periosteum', 'Endosteum']],
  [3, 2, 'organism', 'C', 'The following is not a cause of hematogenous suppurative osteomyelitis', ['Staph aureus', 'E.Coli', 'Klebsiella', 'Streptococci', 'None of the above']],
  [4, 2, 'distribution', 'C', 'Acute hematogenous osteomyelitis affects', ['Epiphysis', 'Diaphysis', 'Metaphysis', 'Periosteum', 'Endosteum']],
  [5, 2, 'pathogenesis', 'B', 'The characteristic inflammatory cell in acute osteomyelitis is:', ['Plasma cells', 'Neutrophils', 'Lymphocytes', 'Macrophages', 'Eosinophils']],
  [6, 3, 'pathogenesis', 'D', 'In acute suppurative osteomyelitis, the inflamed bone become necrotic due to:', ['Bacterial toxins', 'Ischemia caused by inflammatory thrombosis', 'Ischemia due to compression of vessels by exudates', 'All of the above', 'None of the above']],
  [7, 3, 'complications', 'D', 'All of the followings are true about acute osteomyelitis except:', ['is most commonly caused by staphylococcus aureus', 'May be complicated by septicemia', 'May result in the formation of sequestrum', 'More commonly affects females above 60 years old', 'Acute hematogenous osteomyelitis usually affects the knee region']],
  [8, 3, 'distribution', 'B', 'The most common joint to be affected by acute hematogenous osteomyelitis is:', ['Shoulder', 'Knee', 'Elbow', 'Sacroiliac', 'Ankle']],
  [9, 3, 'chronic', 'A', 'Separated necrotic bone is called', ['Sequestrum', 'Involucrum', 'Cloaca', 'Brodie abscess', 'None of the above']],
  [10, 3, 'distribution', 'B', 'The commonest site of hematogenous osteomyelitis is:', ['Epiphysis of long bones', 'Metaphysis of long bones', 'Short bones', 'Flat bones']],
  [11, 3, 'chronic', 'B', 'Sequestrum in osteomyelitis consists of:', ['Osseous metaplasia of skeletal muscles', 'Necrotic bone', 'Malignant bone', 'Sinuses from the infection to skin surface', 'Sub-periosteal new bone formation']],
]
const commonQuestion = {
  subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '',
  matching_options: '', matching_prompts: '', correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '',
  topic: 'Musculoskeletal system', subtopic: 'Osteomyelitis', difficulty: 'Easy', question_type: 'Pathology', module: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Pathology > Bone Diseases > Osteomyelitis', clinical_relevance: '0.75', academic_relevance: '0.98', cognitive_effort_score: '0.35',
  exam_weight_by_year: 'HU_Y1=0.85', question_only_for: 'HU_Y1', concept_ids: '', years: 'HU_Y1', universities: 'hu', cognitive_effort: 'Low',
  setting: 'Academic', reasoning_level: '1', inferred_difficulty: '72', exam_relevance: '9', contextual_concept_ids: '', media_recommendations: '',
  attachments: '', attached_image: '', estimated_seconds: '60', randomise_answers: 'yes',
}
const questionMap = {
  organism: [concept.organism, article.acute, 'Identify the source-keyed common organism or organism-list exception in acute pyogenic osteomyelitis.'],
  distribution: [concept.distribution, article.acute, 'Distinguish the source-keyed common and resistant sites of acute hematogenous osteomyelitis.'],
  pathogenesis: [concept.pathogenesis, article.acute, 'Connect acute neutrophilic inflammation with the printed toxic and ischaemic mechanisms of bone necrosis.'],
  complications: [concept.complications, article.chronic, 'Identify the printed exception among acute osteomyelitis features and complications.'],
  chronic: [concept.chronic, article.chronic, 'Identify sequestrum as separated necrotic bone and distinguish it from involucrum and cloaca.'],
}
const questions = rowSpecs.map(([number, page, code, key, stem, options]) => {
  const [conceptId, articleId, objective] = questionMap[code]
  const fields = { id: `Q-HU-LCS103-PAT-F101-${String(number).padStart(2, '0')}`, title: stem, ...commonQuestion, question: stem, correct_answer: key }
  options.forEach((option, index) => {
    const letter = String.fromCharCode(65 + index)
    fields[`answer_${letter.toLowerCase()}`] = option
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `The direct Family-101 question deck prints ${key} as the answer, so this is the exact source-keyed response. ${teaching[code]} The record remains Draft because a local printed key is assessment evidence and has not received independent medical verification.`
      : `This option is retained exactly from the Family-101 question deck, but the printed right-column key selects ${key} instead. ${teaching[code]} The record remains Draft pending named Helwan Pathology faculty review and independent medical verification.`
  })
  for (const letter of ['a', 'b', 'c', 'd', 'e', 'f']) {
    if (!Object.hasOwn(fields, `answer_${letter}`)) {
      fields[`answer_${letter}`] = ''
      fields[`explanation_${letter}`] = ''
    }
  }
  return {
    ...fields,
    main_concept: conceptId,
    library_ids: articleId,
    resource_ids: `${source.assessment}\n${source.teaching}\n${source.answerSupport}`,
    learning_objective: objective,
    source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact source stem/options with right-column printed key ${key}. Draft support: ${source.teaching} and ${source.answerSupport}.`,
    author_notes: `Transcribed exactly from governed Family 101 physical p${page}; spelling, capitalisation, punctuation, option order and printed key are preserved. Family 100 is excluded because it is external student-authored written revision material. Family 79 remains evidence support only; its unmarked written questions are not imported. Q12–Q21 remain outside this slice, including the untouched Q12=B versus Q20=C source conflict. No source option-contract hold occurs inside Q1–Q11, and no mark, media dependency or corrected answer is inferred.`,
  }
})

if (questions.length !== 11 || questions.map((row) => row.correct_answer).join('') !== 'AACCBDDBABB') throw new Error('Family-101 Q1–Q11 count or key mismatch')
if (concepts.length !== 5 || articles.length !== 2 || claims.length !== 5 || citations.length !== 5 || spans.length !== 5 || sources.length !== 3) throw new Error('Family-101 dependency count mismatch')

await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await Promise.all([
  writeFile(paths.sources, sources.map(item).join(divider), 'utf8'),
  writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8'),
  writeFile(paths.articles, articles.map(item).join(divider), 'utf8'),
  writeFile(paths.claims, claims.map(item).join(divider), 'utf8'),
  writeFile(paths.citations, citations.map(item).join(divider), 'utf8'),
  writeFile(paths.spans, spans.map(item).join(divider), 'utf8'),
  writeFile(paths.questions, questions.map(item).join(divider), 'utf8'),
])
console.log(JSON.stringify({ files: paths, counts: { sources: 3, concepts: 5, articles: 2, questions: 11, claims: 5, citations: 5, spans: 5 }, keys: questions.map((row) => row.correct_answer).join(''), optionCounts: rowSpecs.map((row) => row[5].length), skippedFamily100: true, family79EvidenceOnly: true, newHolds: 0, practical: 0, written: 0, media: 0 }, null, 2))
