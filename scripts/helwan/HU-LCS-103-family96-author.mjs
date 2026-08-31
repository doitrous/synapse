#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const importRoot = resolve(root, 'docs/Helwan-Source-Imports')

const paths = {
  concepts: resolve(importRoot, 'concept/HU-LCS-103-family96-joint-pathology-concepts.md'),
  articles: resolve(importRoot, 'article/HU-LCS-103-family96-joint-pathology-articles.md'),
  questions: resolve(importRoot, 'question/HU-LCS-103-family96-joint-pathology-mcq.md'),
  sources: resolve(importRoot, 'evidence/HU-LCS-103-family96-sources.md'),
  claims: resolve(importRoot, 'evidence/HU-LCS-103-family96-claims.md'),
  citations: resolve(importRoot, 'evidence/HU-LCS-103-family96-citations.md'),
  spans: resolve(importRoot, 'evidence/HU-LCS-103-family96-spans.md'),
}

const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const source = {
  assessment: 'src_d5d701558ddff491b455',
  joints: 'src_6995e894c8b7f13c8809',
  softTissue: 'src_237f83bb42bf143fefdf',
}

const article = {
  arthritis: 'ART-HU-LCS103-PAT-ARTHRITIS-PATTERNS',
  lesions: 'ART-HU-LCS103-PAT-PERIARTICULAR-LESIONS',
}

const conceptSpecs = [
  {
    id: 'CON-MSK-8EC65B29B306A6',
    key: 'pathology.joint.ganglion-synovial-cyst-benign-lesions',
    label: 'A ganglion is a benign periarticular cystic lesion, usually on the dorsum of the wrist, containing clear mucinous or gelatinous fluid',
    aliases: 'Ganglion cyst\nSynovial cystic lesion\nDorsal wrist ganglion',
    definition: 'A ganglion is a small, movable periarticular cystic swelling most often found on the dorsum of the wrist. It contains clear mucinous or gelatinous fluid and has a fibrous wall that may have an indistinct synovial lining.',
    objective: 'Recognise a ganglion from its typical wrist location, cystic consistency, clear gelatinous contents and benign behaviour.',
    pitfalls: 'Do not use the word synovial to imply malignancy. A ganglion may arise near a joint or tendon, but it is a benign cystic lesion rather than synovial sarcoma.',
    type: 'clinical_feature',
    microtopic: 'Ganglion and synovial cysts',
    articleIds: article.lesions,
    relatedArticleIds: article.arthritis,
    resourceIds: `${source.joints}\n${source.assessment}`,
    claimId: 'CLM-MSK-HULCS103-F96-GANGLION-01',
    examSignal: `${source.assessment} | direct named-course LCS question deck | Q1 and Q6 | printed key D`,
    original: '[Lecture p17] A ganglion is a small, round or ovoid, movable, subcutaneous cystic swelling; the most common location is dorsum of wrist; grossly it is filled with clear mucinous fluid.\n[Question deck Q1/Q6] The cystic wrist swelling contains clear, gelatinous fluid and has a smooth wall; printed key D, Ganglion cyst.',
    rejected: 'Synovial sarcoma is a malignant para-articular soft-tissue tumour, not a clear-fluid cyst. Pigmented villonodular synovitis is a proliferative synovial lesion rather than the source vignette’s gelatinous cyst.',
    conflict: '[clear]',
    uncertainty: '[clear]',
  },
  {
    id: 'CON-MSK-CFE4B805DB79CC',
    key: 'pathology.joint.rheumatoid-pannus-clinicopathology',
    label: 'Rheumatoid arthritis is a chronic symmetrical inflammatory disease of peripheral joints in which chronically inflamed synovium forms destructive pannus',
    aliases: 'Rheumatoid pannus\nRheumatoid synovitis\nSmall-joint rheumatoid arthritis',
    definition: 'Rheumatoid arthritis is a chronic multisystem inflammatory disease that characteristically affects peripheral joints symmetrically, especially the hands, wrists and feet. Chronically inflamed proliferating synovium forms pannus that erodes marginal cartilage and may progress to fibrous ankylosis and periarticular osteoporosis.',
    objective: 'Distinguish rheumatoid arthritis from osteoarthritis by its small-joint distribution, inflammatory synovium and pannus-based marginal destruction.',
    pitfalls: 'Do not transfer the central articular-cartilage degeneration of osteoarthritis to rheumatoid arthritis. Rheumatoid disease begins in synovium and produces inflammatory pannus with marginal erosion.',
    type: 'mechanism',
    microtopic: 'Rheumatoid arthritis and pannus',
    articleIds: article.arthritis,
    relatedArticleIds: article.lesions,
    resourceIds: `${source.joints}\n${source.assessment}`,
    claimId: 'CLM-MSK-HULCS103-F96-RA-01',
    examSignal: `${source.assessment} | direct named-course LCS question deck | Q5, Q7, Q9-Q10, Q16, Q24-Q25 and Q27 | printed keys`,
    original: '[Lecture pp9-11] Pain and swelling are symmetrical, especially in joints of hands, wrists and feet; the synovium shows villous hypertrophy and marked mononuclear inflammatory infiltrate with lymphoid follicles.\n[Question deck Q5/Q27] Pannus of rheumatoid arthritis consists of chronically inflamed synovium; printed key D.',
    rejected: 'Osteoarthritis is the source comparator but is degenerative and centres on articular-cartilage loss. Rheumatic, gouty and syphilitic arthritis do not own the complete pannus-and-small-joint pattern.',
    conflict: '[clear]',
    uncertainty: '[clear]',
  },
  {
    id: 'CON-MSK-5AD256E28E4183',
    key: 'pathology.joint.osteoarthritis-degeneration-osteophytes',
    label: 'Osteoarthritis is a degenerative disorder of synovial joints with central articular-cartilage loss and peripheral osteophyte formation',
    aliases: 'Degenerative joint disease\nOsteoarthrosis\nOsteophyte-forming arthritis',
    definition: 'Osteoarthritis is a chronic degenerative disease of synovial joints, particularly large weight-bearing joints in older adults. Articular cartilage becomes thin, cracked and worn centrally, while new bony projections called osteophytes form at the joint margins.',
    objective: 'Recognise osteoarthritis from older age, weight-bearing-joint involvement, central cartilage degeneration and peripheral osteophytes.',
    pitfalls: 'Do not call osteophytes exposed subchondral bone or areas of synovial congestion. They are new marginal bony projections and are a repair response to degenerative joint damage.',
    type: 'clinical_feature',
    microtopic: 'Osteoarthritis and osteophytes',
    articleIds: article.arthritis,
    relatedArticleIds: article.lesions,
    resourceIds: `${source.joints}\n${source.assessment}`,
    claimId: 'CLM-MSK-HULCS103-F96-OA-01',
    examSignal: `${source.assessment} | direct named-course LCS question deck | Q4, Q8, Q18-Q19, Q22-Q23 and Q26 | printed keys`,
    original: '[Lecture pp4-7] Osteoarthritis is degenerative, most conspicuous in large weight-bearing joints; damaged cartilage is the main lesion; osteophytes are new bony projections at joint margins.\n[Question deck Q8/Q23] Small bony projections formed at the joint periphery; printed key D.',
    rejected: 'Rheumatoid arthritis is inflammatory and pannus-centred. Gout is crystal-induced, and suppurative arthritis is an acute infection rather than chronic degenerative cartilage loss.',
    conflict: '[clear]',
    uncertainty: '[clear]',
  },
  {
    id: 'CON-MSK-26A34BABA3FA5B',
    key: 'pathology.joint.gout-urate-podagra',
    label: 'Gout is monosodium-urate crystal arthritis that characteristically attacks the first metatarsophalangeal joint as podagra',
    aliases: 'Gouty arthritis\nPodagra\nMonosodium urate crystal arthritis',
    definition: 'Gout is a disorder of purine metabolism associated with hyperuricaemia and deposition of monosodium urate crystals in and around joints. Acute gout most characteristically affects the metatarsophalangeal joint of the great toe, a presentation called podagra.',
    objective: 'Identify gout from urate crystals, an acutely inflamed great-toe joint and the term podagra.',
    pitfalls: 'Do not substitute calcium pyrophosphate crystals, which define pseudogout. Do not move podagra to the little toe or use a nonspecific large-joint pattern when the first metatarsophalangeal joint is given.',
    type: 'clinical_feature',
    microtopic: 'Gout, urate crystals and podagra',
    articleIds: article.arthritis,
    relatedArticleIds: article.lesions,
    resourceIds: `${source.joints}\n${source.assessment}`,
    claimId: 'CLM-MSK-HULCS103-F96-GOUT-01',
    examSignal: `${source.assessment} | direct named-course LCS question deck | Q2, Q14, Q17 and Q21 | printed keys`,
    original: '[Lecture pp14-15] Monosodium urate crystals occur in gout; acute gout most commonly affects the great toe and is called podagra.\n[Question deck Q14/Q21] The most common joint is the metatarsophalangeal joint of big toe; printed key B.',
    rejected: 'Pseudogout uses calcium pyrophosphate and rarely affects the big toe. Osteoarthritis and rheumatoid arthritis have different mechanisms and distribution patterns.',
    conflict: '[clear]',
    uncertainty: '[clear]',
  },
  {
    id: 'CON-MSK-7005C294D3DE73',
    key: 'pathology.joint.infectious-suppurative-arthritis',
    label: 'Suppurative arthritis is an acute bacterial joint infection with painful effusion, pus cells and systemic inflammatory features',
    aliases: 'Infectious arthritis\nSeptic arthritis\nPyogenic arthritis',
    definition: 'Suppurative arthritis is an acute inflammatory infection of a joint, commonly reached through the bloodstream but also by direct contamination or lymphatic spread. It presents with pain, swelling, redness, effusion and systemic features such as fever and neutrophilic leucocytosis.',
    objective: 'Recognise suppurative arthritis from an acutely inflamed joint with turbid purulent fluid and separate infectious causes from crystal arthritis.',
    pitfalls: 'Do not treat every inflamed joint as infectious. Gout is a sterile crystal-induced arthritis, while trauma as written is not itself an organism; the source’s Q13/Q20 wording therefore requires editorial review despite its printed key.',
    type: 'clinical_feature',
    microtopic: 'Suppurative and infectious arthritis',
    articleIds: article.arthritis,
    relatedArticleIds: article.lesions,
    resourceIds: `${source.joints}\n${source.assessment}`,
    claimId: 'CLM-MSK-HULCS103-F96-INFECTIOUS-01',
    examSignal: `${source.assessment} | direct named-course LCS question deck | Q3, Q13 and Q20 | printed keys; Q13/Q20 ambiguity held for review`,
    original: '[Lecture p12] Infectious or suppurative arthritis is acute; organisms usually reach the joint from blood but direct contamination and lymphatic spread also occur; patients have redness, swelling, pain and effusion.\n[Question deck Q3] Blood with many pus cells and turbid fluid; printed key E, Suppurative arthritis.',
    rejected: 'Gout is sterile crystal arthritis. Tuberculous and syphilitic arthritis are infectious categories but do not match the acute purulent-fluid vignette.',
    conflict: 'Question-deck Q13 and Q20 key gout as the single noninfectious choice while also printing traumatic arthritis; trauma without infection is noninfectious, so both records remain Draft for faculty review.',
    uncertainty: 'The exact printed keys are preserved, but Q13/Q20 are not safe for publication until the source ambiguity is resolved.',
  },
  {
    id: 'CON-MSK-B3941D215C2B3D',
    key: 'pathology.joint.pvns-synovial-sarcoma-differential',
    label: 'Pigmented villonodular synovitis is a benign hemosiderin-rich synovial proliferation, whereas synovial sarcoma is a malignant para-articular soft-tissue tumour of young adults',
    aliases: 'PVNS versus synovial sarcoma\nPigmented villonodular synovitis\nParajoint synovial sarcoma',
    definition: 'Pigmented villonodular synovitis is a benign proliferative synovial lesion with villous architecture, fibroblasts and hemosiderin-bearing histiocytes. Synovial sarcoma is instead a highly malignant soft-tissue tumour that usually arises adjacent to a joint in young adults and spreads predominantly through blood.',
    objective: 'Separate benign hemosiderin-rich villonodular synovial proliferation from malignant para-articular synovial sarcoma.',
    pitfalls: 'The name synovial sarcoma is a misnomer and does not establish origin from synovium. Do not classify PVNS as a solid malignant tumour or assume lymphatic spread is the expected route for a sarcoma.',
    type: 'differential',
    microtopic: 'PVNS and synovial sarcoma',
    articleIds: article.lesions,
    relatedArticleIds: article.arthritis,
    resourceIds: `${source.softTissue}\n${source.assessment}`,
    claimId: 'CLM-MSK-HULCS103-F96-SYNOVIAL-01',
    examSignal: `${source.assessment} | direct named-course LCS question deck | Q11-Q12 and Q15 | printed keys`,
    original: '[Soft-tissue lecture p19] Synovial sarcoma is highly malignant, usually para-articular in the lower extremity, most often occurs at ages 20-40, and is a misnomer.\n[Question deck Q11] PVNS exception key C, Solid tumor. [Q12] Synovial-sarcoma least-likely key E, Lymphatic spread.',
    rejected: 'Ganglion is a benign clear-fluid cyst, not a villous pigmented proliferation or sarcoma. Giant-cell tumour of tendon sheath is a separate benign periarticular lesion.',
    conflict: '[clear]',
    uncertainty: 'The PVNS feature set is supplied by the direct question deck and still needs independent medical verification before publication.',
  },
]

const conceptCommon = {
  arabic_label: '',
  arabic_aliases: '',
  status: 'under review',
  support_mode: 'direct_statement',
  subject: 'msk',
  primary_node_id: 'SYS-MSK',
  secondary_node_ids: 'DIS-PAT-T03',
  topic: 'Musculoskeletal system',
  subtopic: 'Joint diseases and tumours',
  nanotopic: '',
  modules: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Pathology > Joint Diseases and Tumours',
  universities: 'hu',
  learner_years: '1',
  approved_file_resource_ids: '[clear]',
  approved_video_resource_ids: '[clear]',
  blueprint_weight: '0.75',
  exam_weight_by_year: 'HU_Y1=0.75',
  clinical_relevance: '0.7',
  academic_relevance: '0.95',
  weight_confidence: '0.55',
  confidence: '0.88',
  resource_occurrence_ids: '[clear]',
  source_candidate_ids: '[clear]',
  merge_ids: '[clear]',
  rejected_merge_candidate_ids: '[clear]',
  evidence_gaps: 'Independent medical verification and named Helwan Pathology faculty review are required before publication.',
  owner: 'Helwan Year-1 authoring lane',
  reviewer: 'Medical team, Helwan Pathology faculty',
  final_publisher: 'Admin team',
  last_reviewed: '',
  review_due: '',
  publication_status: 'needs_evidence',
  editorial_review_status: 'drafted_not_reviewed',
  exclusion_reason: '',
}

const concepts = conceptSpecs.map((spec) => ({
  label: spec.label,
  id: spec.id,
  canonical_key: spec.key,
  aliases: spec.aliases,
  ...conceptCommon,
  definition: spec.definition,
  explicit_objective: spec.objective,
  pitfalls: spec.pitfalls,
  concept_type: spec.type,
  microtopic: spec.microtopic,
  article_ids: spec.articleIds,
  related_article_ids: spec.relatedArticleIds,
  resource_ids: spec.resourceIds,
  exam_signal: spec.examSignal,
  atomic_claim_ids: spec.claimId,
  original_wording: spec.original,
  rejected_merge_candidate_ids: spec.rejected,
  conflicts: spec.conflict,
  uncertainty: spec.uncertainty,
  field_notes: `microtopicId: The reviewed taxonomy stops at SYS-MSK for this local Pathology overlay; the named microtopic is retained as prose.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical node.
approvedFileResourceIds: No source file is rights-cleared for student redistribution.
approvedVideoResourceIds: No video is assigned to this concept.
resourceOccurrenceIds: Hand-authored from governed Family-96 and its direct local teaching support; no extraction-occurrence record exists.
sourceCandidateIds: The governed triage completed the required searches before authoring.
mergeIds: No concept was merged into this new record.
conflicts: ${spec.conflict === '[clear]' ? 'No source conflict is recorded for this concept.' : spec.conflict}
uncertainty: ${spec.uncertainty === '[clear]' ? 'No concept-level uncertainty remains beyond the stated authority limits.' : spec.uncertainty}
lastReviewed: New record; no faculty review has occurred.
reviewDue: Set after the first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
arabicLabel: Blank pending independently verified Arabic terminology review.
arabicAliases: Blank pending independently verified Arabic terminology review.`,
}))

const commonArticle = {
  arabic_title: '',
  subject: 'msk',
  topic: 'Musculoskeletal system',
  subtopic: 'Joint diseases and tumours',
  primary_node_id: 'SYS-MSK',
  template_id: 'TPL-CONCEPT',
  archetype: 'concept',
  language: 'en',
  learner_stage: 'Years 1–3 foundation',
  high_yield: 'High',
  time_sensitive: 'stable',
  status: 'Draft',
  owner: 'Helwan Year-1 authoring lane',
  reviewer: 'Medical team, Helwan Pathology faculty',
  final_publisher: 'Admin team',
  published_summary: '',
  published_sections: '',
  universities: 'hu',
  years: 'HU_Y1',
  module: 'HU-LCS-103',
  media: '',
  publication_gate: 'needs_evidence',
  conflicts: '[clear]',
  evidence_gaps: 'Independent medical verification and named Helwan Pathology faculty review are required before publication.',
  last_reviewed: '',
  review_due: '',
}

const articles = [
  {
    id: article.arthritis,
    title: 'Reading arthritis patterns: rheumatoid, osteoarthritis, gout and suppuration',
    aliases: 'Joint disease differential\nRheumatoid pannus versus osteoarthritis\nGout and septic arthritis',
    ...commonArticle,
    microtopic: 'Inflammatory, degenerative, crystal and infectious arthritis',
    nanotopic: '',
    secondary_node_ids: 'DIS-PAT-T03',
    reading_time: '9',
    summary: 'Four recurring discriminators organise the Family-96 joint questions: rheumatoid arthritis is a small-joint inflammatory synovitis with pannus, osteoarthritis is central cartilage degeneration with marginal osteophytes, gout is urate-crystal podagra, and suppurative arthritis produces an acutely painful purulent effusion.',
    sections: `### Definition
Rheumatoid arthritis is a chronic inflammatory synovial disease with a symmetrical peripheral-joint pattern. Osteoarthritis is a chronic degenerative disorder centred on articular-cartilage loss in weight-bearing joints. Gout is a crystal-induced arthritis caused by monosodium urate, whereas suppurative arthritis is an acute bacterial infection of the joint.

### Mechanism
In rheumatoid arthritis, proliferating chronically inflamed synovium forms pannus. The pannus advances over articular cartilage, producing marginal erosion and potentially fibrous ankylosis and periarticular osteoporosis; this differs from primary central cartilage degeneration.

In osteoarthritis, repeated mechanical stress, ageing, obesity and inherited susceptibility contribute to focal cartilage degeneration. Cartilage becomes thin and cracked, joint space narrows, and repair at the margins produces osteophytes—new bony projections rather than exposed subchondral bone.

Gout follows hyperuricaemia and deposition of monosodium urate crystals. Acute disease most characteristically affects the first metatarsophalangeal joint, where the presentation is called podagra.

Suppurative arthritis follows bacterial entry into the joint, most often through blood but also by direct contamination or lymphatic spread. The resulting acute neutrophilic inflammation produces pain, swelling, redness, effusion, turbid purulent fluid and systemic inflammatory features.

### Key determinants
Use distribution and tissue target together. Symmetrical hands, wrists and feet plus synovial inflammation point to rheumatoid arthritis; an older adult with large weight-bearing-joint degeneration and osteophytes points to osteoarthritis.

For an acutely inflamed great toe with urate crystals, choose gout. For an acutely inflamed joint with pus cells and turbid fluid, choose suppurative arthritis.

### Clinical significance
These distinctions guide the first diagnostic branch: autoimmune inflammatory disease, chronic mechanical degeneration, sterile crystal inflammation or bacterial infection. Confusing suppuration with gout delays antimicrobial treatment, while confusing rheumatoid and osteoarthritis obscures their different mechanisms and distributions.

### Common misconceptions
Pannus is not central cartilage degeneration; it is chronically inflamed proliferating synovium. Osteophytes are not areas of congestion or exposed bone; they are new marginal bony projections. Gout is not infectious, and a purulent effusion is not explained by urate crystals alone.

Family-96 Q13 and Q20 remain an editorial risk. The source keys gout as the single noninfectious choice but also prints traumatic arthritis, so both exact records remain Draft until faculty review resolves the single-best-answer ambiguity.`,
    hold_these: 'Rheumatoid arthritis targets synovium and forms pannus, usually in symmetrical small peripheral joints.\nOsteoarthritis causes central articular-cartilage degeneration and peripheral osteophytes in weight-bearing joints.\nGout deposits monosodium urate and classically presents as podagra.\nSuppurative arthritis produces an acute painful purulent joint effusion.',
    lose_the_mark: 'Calling central cartilage degeneration a rheumatoid feature.\nCalling exposed bone an osteophyte.\nUsing calcium pyrophosphate for gout.\nTreating a pus-cell-rich turbid effusion as sterile crystal arthritis.',
    related_concepts: 'CON-MSK-CFE4B805DB79CC\nCON-MSK-5AD256E28E4183\nCON-MSK-26A34BABA3FA5B\nCON-MSK-7005C294D3DE73',
    related_articles: `${article.lesions}: distinguishes benign periarticular cysts and proliferations from synovial sarcoma`,
    question_ids: [2,3,4,5,7,8,9,10,13,14,16,17,18,19,20,21,22,23,24,25,26,27].map((n) => `Q-HU-LCS103-PAT-F96-${String(n).padStart(2, '0')}`).join('\n'),
    resource_ids: source.joints,
    module_subject: 'HU-LCS-103 > Pathology > Joint Diseases and Tumours > Arthritis',
    university_notes: 'hu: Restricted to the direct HU-LCS-103 joint-disease lecture and Family-96 named-course question deck.',
    annotations: `### definition_of · CON-MSK-CFE4B805DB79CC
Quote: In rheumatoid arthritis, proliferating chronically inflamed synovium forms pannus.
Block: body

### definition_of · CON-MSK-5AD256E28E4183
Quote: repair at the margins produces osteophytes
Block: body

### definition_of · CON-MSK-26A34BABA3FA5B
Quote: Acute disease most characteristically affects the first metatarsophalangeal joint, where the presentation is called podagra.
Block: body

### definition_of · CON-MSK-7005C294D3DE73
Quote: The resulting acute neutrophilic inflammation produces pain, swelling, redness, effusion, turbid purulent fluid and systemic inflammatory features.
Block: body`,
    article_source_ids: source.joints,
    claim_ids: 'CLM-MSK-HULCS103-F96-RA-01\nCLM-MSK-HULCS103-F96-OA-01\nCLM-MSK-HULCS103-F96-GOUT-01\nCLM-MSK-HULCS103-F96-INFECTIOUS-01',
    span_ids: 'SPN-HULCS103-F96-RA-01\nSPN-HULCS103-F96-OA-01\nSPN-HULCS103-F96-GOUT-01\nSPN-HULCS103-F96-INFECTIOUS-01',
    media_recommendations: `### diagram · Four-way arthritis discriminator
Purpose: A text-first table could reinforce distribution, mechanism and hallmark without requiring source imagery.
Priority: optional
Status: needed`,
    callout_evidence: `### Rheumatoid arthritis targets synovium and forms pannus, usually in symmetrical small peripheral joints.
Claims: CLM-MSK-HULCS103-F96-RA-01
Citations: CIT-HULCS103-F96-RA-01
Span: SPN-HULCS103-F96-RA-01

### Osteoarthritis causes central articular-cartilage degeneration and peripheral osteophytes in weight-bearing joints.
Claims: CLM-MSK-HULCS103-F96-OA-01
Citations: CIT-HULCS103-F96-OA-01
Span: SPN-HULCS103-F96-OA-01

### Gout deposits monosodium urate and classically presents as podagra.
Claims: CLM-MSK-HULCS103-F96-GOUT-01
Citations: CIT-HULCS103-F96-GOUT-01
Span: SPN-HULCS103-F96-GOUT-01

### Suppurative arthritis produces an acute painful purulent joint effusion.
Claims: CLM-MSK-HULCS103-F96-INFECTIOUS-01
Citations: CIT-HULCS103-F96-INFECTIOUS-01
Span: SPN-HULCS103-F96-INFECTIOUS-01`,
    evidence_basis: 'Direct HU-LCS-103 Pathology Joint Diseases and Tumours lecture, physical pp4-18. Family-96 supplies exact printed question-bank keys and recurrence signal but is not treated as independent medical authority.',
    notes: 'No source image is redistributed. Q13 and Q20 preserve a source ambiguity and remain Draft pending faculty adjudication.',
    field_notes: `arabicTitle: Blank because no reviewed Arabic title was present in the governed English source packet.
nanotopicId: The canonical taxonomy stops at SYS-MSK for this local article.
media: No rights-cleared asset is attached; the optional text-first diagram remains admin-only.
publishedSummary: Blank because the article remains Draft and needs evidence review.
publishedSections: Blank because the article remains Draft and needs evidence review.
lastReviewed: New draft; no named medical reviewer has completed review.
reviewDue: Set after the first named medical review.`,
  },
  {
    id: article.lesions,
    title: 'Ganglion, pigmented villonodular synovitis and synovial sarcoma',
    aliases: 'Periarticular lesion differential\nGanglion versus PVNS\nSynovial sarcoma near joints',
    ...commonArticle,
    microtopic: 'Periarticular cystic, proliferative and malignant lesions',
    nanotopic: '',
    secondary_node_ids: 'DIS-PAT-T03',
    reading_time: '7',
    summary: 'A clear-fluid wrist ganglion, a benign hemosiderin-rich villonodular synovial proliferation and a malignant para-articular synovial sarcoma occupy different diagnostic categories. Location near a joint is shared, so content, architecture and biological behaviour—not the word synovial—make the distinction.',
    sections: `### Definition
A ganglion is a small movable periarticular cyst, most often on the dorsum of the wrist. It contains clear mucinous or gelatinous fluid and has a fibrous wall whose lining may be indistinct.

Pigmented villonodular synovitis is represented in the direct Family-96 assessment deck as a benign villous synovial proliferation containing fibroblasts and hemosiderin-bearing histiocytes. The same source makes “solid tumor” the exception; this feature set remains Draft until independent medical verification.

Synovial sarcoma is a highly malignant soft-tissue tumour of uncertain differentiation. It usually arises adjacent to a joint in the lower extremity of a young adult, but its name is a misnomer because it has no necessary origin from synovium.

### Mechanism
Ganglion formation may reflect herniated synovium, displaced synovial tissue or post-traumatic connective-tissue degeneration. Its clear mucinous content explains the fluctuant cystic presentation rather than a solid proliferative mass.

The local soft-tissue lecture describes synovial sarcoma as a para-articular malignancy and places sarcomatous spread mainly through blood. This makes lymphatic spread the least likely statement in the source-keyed Family-96 item.

### Key determinants
For a smooth-walled cyst over the wrist containing clear gelatinous fluid, choose ganglion. For a villous pigmented synovial proliferation with hemosiderin-bearing histiocytes, the source’s intended category is pigmented villonodular synovitis.

For a young adult with a malignant para-articular lower-extremity tumour, consider synovial sarcoma. Do not infer synovial origin from its name, and do not make lymphatic spread the expected route for a sarcoma.

### Clinical significance
These lesions can all present near joints but differ sharply in behaviour. A ganglion is benign and cystic; PVNS is a locally proliferative synovial lesion; synovial sarcoma is malignant and demands oncologic staging and management.

### Common misconceptions
The word synovial does not make every lesion a synovial malignancy. Clear gelatinous fluid favours ganglion, while hemosiderin-rich villous proliferation favours PVNS. Synovial sarcoma is para-articular, occurs in young adults and spreads mainly through blood rather than being a lymphatic synovial cancer.`,
    hold_these: 'A dorsal wrist cyst with clear gelatinous fluid is a ganglion.\nPVNS is a benign villous synovial proliferation with hemosiderin-bearing histiocytes in the source’s assessment framing.\nSynovial sarcoma is a malignant para-articular tumour of young adults and its name is a misnomer.',
    lose_the_mark: 'Calling a clear-fluid ganglion synovial sarcoma.\nCalling PVNS a solid malignant tumour.\nAssuming synovial sarcoma arises from synovium or spreads mainly through lymphatics.',
    related_concepts: 'CON-MSK-8EC65B29B306A6\nCON-MSK-B3941D215C2B3D',
    related_articles: `${article.arthritis}: compares the inflammatory, degenerative, crystal and infectious arthritides in the same deck`,
    question_ids: [1,6,11,12,15].map((n) => `Q-HU-LCS103-PAT-F96-${String(n).padStart(2, '0')}`).join('\n'),
    resource_ids: `${source.joints}\n${source.softTissue}`,
    module_subject: 'HU-LCS-103 > Pathology > Joint Diseases and Tumours > Periarticular Lesions',
    university_notes: 'hu: Restricted to direct HU-LCS-103 Pathology teaching and the Family-96 named-course question deck.',
    annotations: `### definition_of · CON-MSK-8EC65B29B306A6
Quote: A ganglion is a small movable periarticular cyst, most often on the dorsum of the wrist.
Block: body

### contrasts_with · CON-MSK-B3941D215C2B3D
Quote: Synovial sarcoma is a highly malignant soft-tissue tumour of uncertain differentiation.
Block: body`,
    article_source_ids: `${source.joints}\n${source.softTissue}`,
    claim_ids: 'CLM-MSK-HULCS103-F96-GANGLION-01\nCLM-MSK-HULCS103-F96-SYNOVIAL-01',
    span_ids: 'SPN-HULCS103-F96-GANGLION-01\nSPN-HULCS103-F96-SYNOVIAL-01',
    media_recommendations: `### diagram · Periarticular lesion discriminator
Purpose: A simple cystic-versus-proliferative-versus-malignant table would support recall without reproducing source images.
Priority: optional
Status: needed`,
    callout_evidence: `### A dorsal wrist cyst with clear gelatinous fluid is a ganglion.
Claims: CLM-MSK-HULCS103-F96-GANGLION-01
Citations: CIT-HULCS103-F96-GANGLION-01
Span: SPN-HULCS103-F96-GANGLION-01

### Synovial sarcoma is a malignant para-articular tumour of young adults and its name is a misnomer.
Claims: CLM-MSK-HULCS103-F96-SYNOVIAL-01
Citations: CIT-HULCS103-F96-SYNOVIAL-01
Span: SPN-HULCS103-F96-SYNOVIAL-01`,
    evidence_basis: 'Direct HU-LCS-103 Joint Diseases lecture, physical pp17-18, and direct HU-LCS-103 Soft Tissue Tumours lecture, physical p19. Family-96 supplies the exact PVNS and synovial-sarcoma question-bank keys but is not independent medical verification.',
    notes: 'No source image is redistributed. PVNS statements derived from the direct assessment source remain explicitly held at needs_evidence.',
    field_notes: `arabicTitle: Blank because no reviewed Arabic title was present in the governed English source packet.
nanotopicId: The canonical taxonomy stops at SYS-MSK for this local article.
media: No rights-cleared asset is attached; the optional text-first diagram remains admin-only.
publishedSummary: Blank because the article remains Draft and needs evidence review.
publishedSections: Blank because the article remains Draft and needs evidence review.
lastReviewed: New draft; no named medical reviewer has completed review.
reviewDue: Set after the first named medical review.`,
  },
]

const conceptByCode = {
  ganglion: conceptSpecs[0],
  ra: conceptSpecs[1],
  oa: conceptSpecs[2],
  gout: conceptSpecs[3],
  infectious: conceptSpecs[4],
  synovial: conceptSpecs[5],
}

const questionRows = [
  [1, 2, 'ganglion', 'D', 'A male patient has a cystic swelling over his wrist. The cyst contains a clear, gelatinous fluid and smooth wall. The most probable diagnosis is', ['Rheumatic arthritis','Rheumatoid arthritis','Synovioma','Ganglion cyst','Pigmented villo-nodular synovitis'], 'A clear gelatinous cyst over the wrist is the source pattern for a ganglion, so the printed key is D.'],
  [2, 2, 'gout', 'D', 'Old man with swollen inflamed joint of big toe, joint aspiration revealed Uric acid crystals deposited surrounded by inflammatory cells. The most probable type of arthritis affecting this man is:', ['Rheumatic arthritis','Rheumatoid arthritis','Osteoarthritis','Gouty arthritis','Syphilitic arthritis.'], 'Urate crystals in an acutely inflamed great-toe joint identify gouty arthritis, matching the printed key D.'],
  [3, 2, 'infectious', 'E', 'Old man with swollen inflamed knee joint, joint aspiration revealed blood with many pus cells and turbid fluid. The most probable type of arthritis affecting this man is:', ['Rheumatic arthritis','Rheumatoid arthritis','Osteoarthritis','Gouty arthritis','Suppurative arthritis.'], 'A turbid joint aspirate containing many pus cells is an acute suppurative pattern, matching the printed key E.'],
  [4, 2, 'oa', 'C', 'The most probable type of arthritis affecting big joints of an old, obese patient is:', ['Rheumatic arthritis','Rheumatoid arthritis','Osteoarthritis','Gouty arthritis','Syphilitic arthritis.'], 'Older age, obesity and large weight-bearing-joint involvement point to osteoarthritis, matching the printed key C.'],
  [5, 2, 'ra', 'D', 'Pannus of rheumatoid arthritis consists of:', ['Calcified synovium','Necrotic fibrous tissue','Degenerating cartilage','Chronically inflamed synovium','Dislocated joint'], 'Pannus is chronically inflamed proliferating synovium rather than cartilage or inert fibrous tissue, matching the printed key D.'],
  [6, 3, 'ganglion', 'D', 'A male patient has a cystic swelling over his wrist. The cyst contains a clear, gelatinous fluid and smooth wall. The most probable diagnosis is', ['Rheumatic arthritis','Rheumatoid arthritis','Synovioma','Ganglion cyst','Pigmented villo-nodular synovitis'], 'This exact repeated wrist-cyst pattern remains a ganglion and retains the source’s printed key D.'],
  [7, 3, 'ra', 'B', 'A 40 years old woman presented with pleurisy and morning stiffness lasting for 60 minutes , swollen small joints of the hands with Erosion of the articular cartilage mainly at the periphery. The most probable type of arthritis affecting this patient is :', ['Rheumatic arthritis','Rheumatoid arthritis','Osteoarthritis','Gouty arthritis'], 'Prolonged morning stiffness, systemic involvement and peripheral erosions of small hand joints form a rheumatoid pattern, matching key B.'],
  [8, 3, 'oa', 'D', 'Osteophytes are:', ['Areas of congestion and inflammation in synovial membrane','Areas of degeneration in central part of articular cartilage','Exposed bone under degenerated cartilage','Small bony projections formed at the joint periphery','None of the above'], 'Osteophytes are new marginal bony projections at the joint periphery, so the source prints key D.'],
  [9, 3, 'ra', 'A', 'The following is not true regarding Rheumatoid arthritis:', ['Affects large weight bearing joints as hip and knee','More common in females','Occurs in middle age','Anti IgG antibody is called Rheumatoid factor'], 'Predominant large weight-bearing-joint disease is not the characteristic rheumatoid pattern, so the source prints key A.'],
  [10, 3, 'ra', 'B', 'Rheumatoid arthritis are not characterized by :', ['Creeping chronic inflammation','Destruction of central part of articular cartilage','Pannus formation','Fibrous ankylosis','Osteoporosis'], 'Central articular-cartilage destruction is the osteoarthritis pattern rather than the rheumatoid pannus pattern, matching key B.'],
  [11, 3, 'synovial', 'C', 'Pigmented villonodular synovitis is characterized by all except :', ['Benign proliferation of synovium','Shaggy with villous progections','Solid tumor','Fibroblasts are present','Histiocytes contain hemoisederin pigment'], 'The deck treats PVNS as a benign villous synovial proliferation rather than a solid tumour, so the printed exception is C.'],
  [12, 4, 'synovial', 'E', 'Regarding synovial sarcoma, Which is least likely to be true:', ['Affects young age','Biphasic tumor','Slow growth','Blood spread','Lymphatic spread'], 'The local lecture places sarcomatous metastasis mainly through blood, making lymphatic spread the source’s least-likely statement and key E.'],
  [13, 4, 'infectious', 'A', 'The Following is not a cause of infectious arthritis:', ['Gouty arthritis','Suppurative arthritis','Traumatic arhtritis','Tuberculosis','Syphilis'], 'Gout is a sterile urate-crystal arthritis and is the source-printed exception A, although the traumatic option makes the item editorially ambiguous.'],
  [14, 4, 'gout', 'B', 'The most common joint to be affected by gouty arthritis is :', ['Metatarsophalangeal joint of little toe','Metatarsophalangeal joint of big toe','Wrist','Shoulder','Knee'], 'The first metatarsophalangeal joint of the big toe is the classic site of podagra, matching the printed key B.'],
  [15, 4, 'synovial', 'C', 'All the following are Benign tumors of Joint except :', ['Ganglion','Synovial cyst','Synovial sarcoma','Giant Cell Tumor Of Tendon Sheath','Pigmented villonodular synovitis'], 'Synovial sarcoma is the malignant para-articular lesion among the listed benign joint-associated lesions, matching key C.'],
  [16, 4, 'ra', 'D', 'Rheumatoid arthritis Mainly affects which joint of the following :', ['Knee joint in females','Intervertebral joint','Joint of the big toe','Small joints of hands and feet','Atlanto axial joint'], 'Rheumatoid arthritis characteristically involves the small joints of the hands and feet symmetrically, matching key D.'],
  [17, 4, 'gout', 'C', 'Gouty arthritis Mainly affects which joint of the following :', ['Knee joint in females','Intervertebral joint','Joint of the big toe','Small joints of hands and feet'], 'Gout classically affects the great-toe joint as podagra, so the source prints key C.'],
  [18, 5, 'oa', 'A', 'Osteoarthritis Mainly affects which joint of the following :', ['Knee joint in females','Intervertebral joint','Joint of the big toe','Small joints of hands and feet','Atlanto axial joint'], 'A large weight-bearing knee in an older woman fits the source’s osteoarthritis distribution and printed key A.'],
  [19, 5, 'oa', 'C', 'All of the following is true regarding osteoarthritis except :', ['Degenerative disease','Affects large joints','Males are more affected than females','Degeneration affects central part of articular cartilage','Common in old age'], 'The local lecture states that primary osteoarthritis is more common in women, so “Males are more affected” is the false statement and key C.'],
  [20, 5, 'infectious', 'A', 'The Following is not a cause of infectious arthritis', ['Gouty arthritis','Suppurative arthritis','Traumatic arhtritis','Tuberculosis','Syphilis'], 'This repeated source item again keys gout as the sterile crystal-induced exception A, while retaining the same traumatic-option ambiguity for review.'],
  [21, 5, 'gout', 'B', 'The most common joint to be affected by gouty arthritis is', ['Metatarsophalangeal joint of little toe','Metatarsophalangeal joint of big toe','Wrist','Shoulder','Knee'], 'This repeated item again identifies the great-toe metatarsophalangeal joint as podagra and retains key B.'],
  [22, 5, 'oa', 'C', 'All of the following is true regarding osteoarthritis except', ['Degenerative disease','Affects large joints','Males are more affected than females','Degeneration affects central part of articular cartilage'], 'This near-repeat omits the fifth option but retains the false male-predominance statement and printed key C.'],
  [23, 5, 'oa', 'D', 'Osteophytes are', ['Areas of congestion and inflammation in synovial membrane','Areas of degeneration in central part of articular cartilage','Exposed bone under degenerated cartilage','Small bony projections formed at the joint periphery','None of the above'], 'This repeated item again defines osteophytes as peripheral bony projections and retains the printed key D.'],
  [24, 6, 'ra', 'A', 'The following is not true regarding Rheumatoid arthritis', ['Affects large weight bearing joints as hip and knee','More common in females','Occurs in middle age','Anti IgG antibody is called Rheumatoid factor','None of the above'], 'This repeated negative item retains the large-weight-bearing-joint statement as the exception and key A.'],
  [25, 6, 'ra', 'B', 'Rheumatoid arthritis are not characterized by', ['Creeping chronic inflammation','Destruction of central part of articular cartilage','Pannus formation','Fibrous ankylosis','Osteoporosis'], 'This repeated negative item retains central cartilage destruction as the non-rheumatoid feature and key B.'],
  [26, 6, 'oa', 'C', 'The most probable type ofarthritis affectingbigjoints of an old obese patient is:-', ['Rheumatic arthritis','Rheumatoid arthritis','Osteoarthritis','Gouty arthritis','Syphilitic arthritis'], 'This repeated visibly merged-word stem retains the older-obese-large-joint osteoarthritis pattern and key C.'],
  [27, 6, 'ra', 'D', 'Pannus of rheumatoid arthritis consists of:-', ['Calcified synovium','Necrotic fibrous tissue','Degenerating cartilage','Chronically inflamed synovium','Dislocated joint'], 'This repeated pannus item again identifies chronically inflamed synovium and retains key D.'],
]

const teachingByConcept = {
  ganglion: 'Ganglia are benign cystic periarticular lesions, usually at the dorsal wrist, and their clear mucinous contents distinguish them from inflammatory arthritis or malignant soft-tissue masses.',
  ra: 'Rheumatoid arthritis is a chronic inflammatory synovial disease with symmetrical small-joint involvement, pannus formation and marginal rather than primary central cartilage destruction.',
  oa: 'Osteoarthritis is a degenerative disease of older adults and weight-bearing joints, with central articular-cartilage loss and new marginal osteophytes.',
  gout: 'Gout is a sterile monosodium-urate crystal arthritis whose classic great-toe presentation is podagra, not an infectious or autoimmune joint process.',
  infectious: 'Suppurative arthritis is an acute bacterial joint infection that produces pain, effusion and neutrophil-rich turbid fluid, unlike sterile crystal arthritis.',
  synovial: 'PVNS is a benign hemosiderin-rich villous synovial proliferation, whereas synovial sarcoma is a malignant para-articular soft-tissue tumour of young adults that spreads mainly through blood.',
}

const discriminatorByConcept = {
  ganglion: 'The decisive source features are cystic consistency, a smooth wall and clear gelatinous fluid rather than the name of a neighbouring joint lesion.',
  ra: 'The decisive discriminator is inflamed synovium and pannus in small peripheral joints, not the central cartilage degeneration typical of osteoarthritis.',
  oa: 'The decisive discriminator is degenerative cartilage loss with peripheral bony repair in an older weight-bearing-joint pattern.',
  gout: 'The decisive discriminator is monosodium urate in the first metatarsophalangeal joint rather than calcium pyrophosphate or a purulent effusion.',
  infectious: 'The decisive discriminator is acute purulent inflammation; the source’s gout-versus-infectious wording is preserved but not medically repaired.',
  synovial: 'The decisive discriminator is biological behaviour: benign pigmented villous proliferation differs from a malignant para-articular sarcoma.',
}

const repeats = new Map([[6,1],[20,13],[21,14],[22,19],[23,8],[24,9],[25,10],[26,4],[27,5]])
const sourceSupport = (code) => code === 'synovial' ? source.softTissue : source.joints
const pageSupport = (code) => ({ ganglion: '17-18', ra: '9-11', oa: '4-7', gout: '14-15', infectious: '12', synovial: '19' }[code])

const questionCommon = {
  subject: 'msk',
  status: 'Draft',
  owner: 'Helwan Year-1 authoring lane',
  vignette: '',
  format: 'single best answer',
  written_parts: '',
  matching_options: '',
  matching_prompts: '',
  correct_answers: '',
  labeling_image: '',
  labeling_alt: '',
  labeling_points: '',
  completion_text: '',
  derived_from: '',
  topic: 'Musculoskeletal system',
  subtopic: 'Joint diseases and tumours',
  difficulty: 'Easy',
  question_type: 'Pathology',
  module: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Pathology > Joint Diseases and Tumours',
  clinical_relevance: '0.65',
  academic_relevance: '0.95',
  cognitive_effort_score: '0.3',
  exam_weight_by_year: 'HU_Y1=0.8',
  question_only_for: 'HU_Y1',
  concept_ids: '',
  years: 'HU_Y1',
  universities: 'hu',
  cognitive_effort: 'Low',
  setting: 'Academic',
  reasoning_level: '1',
  inferred_difficulty: '74',
  exam_relevance: '8',
  contextual_concept_ids: '',
  media_recommendations: '',
  attachments: '',
  attached_image: '',
  estimated_seconds: '55',
  randomise_answers: 'yes',
}

const questionArticle = (code) => ['ganglion','synovial'].includes(code) ? article.lesions : article.arthritis

const questions = questionRows.map(([number, page, code, key, stem, options, correctNote]) => {
  const concept = conceptByCode[code]
  const fields = {
    id: `Q-HU-LCS103-PAT-F96-${String(number).padStart(2, '0')}`,
    title: stem,
    ...questionCommon,
    question: stem,
    correct_answer: key,
  }
  for (const [index, text] of options.entries()) {
    const letter = String.fromCharCode(65 + index)
    fields[`answer_${letter.toLowerCase()}`] = text
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `${correctNote} ${teachingByConcept[code]} ${discriminatorByConcept[code]}`
      : `This option is not the source-keyed response for this item, so it is retained as a distractor rather than promoted into a new answer. ${teachingByConcept[code]} ${discriminatorByConcept[code]}`
  }
  for (const letter of ['a','b','c','d','e','f']) {
    if (!(letter in Object.fromEntries(options.map((_, i) => [String.fromCharCode(97 + i), true])))) {
      fields[`answer_${letter}`] = ''
      fields[`explanation_${letter}`] = ''
    }
  }
  const repeat = repeats.get(number)
  const ambiguity = [13,20].includes(number)
  return {
    ...fields,
    main_concept: concept.id,
    library_ids: questionArticle(code),
    resource_ids: `${source.assessment}\n${sourceSupport(code)}`,
    learning_objective: concept.objective,
    source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact source stem/options with right-column printed key ${key}. Teaching support: ${sourceSupport(code)}, physical PDF p${pageSupport(code)}.`,
    author_notes: `Transcribed from Family 96 physical p${page}; source spelling, punctuation and option wording are preserved, including visible errors. ${repeat ? `This is a ${number === 22 ? 'near-repeat' : 'repeat'} of printed Q${repeat} and remains a separate source occurrence.` : 'This is the first occurrence of this printed prompt form.'}${ambiguity ? ' The source keys gout as the single noninfectious choice while also printing traumatic arthritis; the exact key is preserved but the item must remain Draft until faculty review.' : ''} No mark or media dependency is inferred.`,
  }
})

const sources = [
  {
    id: source.assessment,
    title: 'LCS-103 Pathology MCQ Lecture 3 MSS — Joint Diseases',
    institution: 'Faculty of Medicine, Helwan University',
    processing_status: 'ocr_required',
    collection_id: 'hu-y1',
    source_relative_path: 'Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - MCQ 3 MSS.pdf',
    source_uri: '',
    media_type: 'application/pdf',
    languages: 'en',
    publication_date: '2025-04-11',
    accessed_at: '',
    page_count: '6',
    sha256: 'd5d701558ddff491b4550559326b06aad107793f432ae127fc1dc9bc6ef8280f',
    rights: 'Local Helwan teaching and assessment material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-3 direct named-course LCS-103 Pathology question deck. Cover and pages identify Pathology, MCQ Lecture 3 MSS, Joint Diseases, Dr Ahmed Hassan, Level 1 Semester 2. It supplies exact question-bank wording and printed keys but is not a formal sitting paper or separately issued official key.',
    confidence: '0.9',
    is_assessment: 'yes',
  },
  {
    id: source.joints,
    title: 'LCS-103 Pathology Lecture 3 — Joints',
    institution: 'Faculty of Medicine, Helwan University',
    processing_status: 'native_text',
    collection_id: 'hu-y1',
    source_relative_path: 'Year 1/LCS 103/Pathology/Theoretical/Lec 2 - Joint Diseases & Tumors/103  (3) joints.pdf',
    source_uri: '',
    media_type: 'application/pdf',
    languages: 'en',
    publication_date: '',
    accessed_at: '',
    page_count: '31',
    sha256: '6995e894c8b7f13c88097fced41e6d68b9af3d2a05b8a49203eff09d46be5378',
    rights: 'Local Helwan teaching material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-4 direct local LCS-103 Pathology teaching lecture by Dr Rofanda Bakeer. It is local curriculum support for joint-disease explanations, not independent medical verification or an official assessment key.',
    confidence: '0.86',
    is_assessment: 'no',
  },
  {
    id: source.softTissue,
    title: 'LCS-103 Pathology — Soft Tissue Tumors',
    institution: 'Faculty of Medicine, Helwan University',
    processing_status: 'native_text',
    collection_id: 'hu-y1',
    source_relative_path: 'Year 1/LCS 103/Pathology/Theoretical/Lec 3 - Soft Tissue Lesions & Tumors/103  (4) Soft Tissue Tumors.pdf',
    source_uri: '',
    media_type: 'application/pdf',
    languages: 'en',
    publication_date: '',
    accessed_at: '',
    page_count: '29',
    sha256: '237f83bb42bf143fefdfd1bb5be5fefda31fa451da2ae98c4c71944c852a312a',
    rights: 'Local Helwan teaching material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-4 direct local LCS-103 Pathology teaching lecture by Dr Hebat Allah Amin. It is local curriculum support for synovial-sarcoma explanations, not independent medical verification or an official assessment key.',
    confidence: '0.86',
    is_assessment: 'no',
  },
]

const evidenceRows = [
  {
    code: 'GANGLION', concept: conceptSpecs[0], article: article.lesions,
    subject: 'A ganglion', predicate: 'is typically', object: 'a dorsal-wrist cyst filled with clear mucinous or gelatinous fluid',
    display: 'A ganglion is typically a dorsal-wrist cyst filled with clear mucinous or gelatinous fluid.',
    resource: source.joints, page: '17', section: 'Cyst of ganglion',
    support: 'The most common location is dorsum of wrist. Grossly, a ganglion is a small cyst filled with clear mucinous fluid.',
    detail: 'Physical PDF page 17, location and gross-description paragraphs',
    spanText: 'A ganglion is a small movable periarticular cyst, most often on the dorsum of the wrist.',
    sectionId: 'art-hu-lcs103-pat-periarticular-lesions-definition',
  },
  {
    code: 'RA', concept: conceptSpecs[1], article: article.arthritis,
    subject: 'Rheumatoid arthritis', predicate: 'characteristically produces', object: 'symmetrical peripheral inflammatory synovitis with villous hypertrophy and mononuclear inflammation',
    display: 'Rheumatoid arthritis characteristically produces symmetrical peripheral inflammatory synovitis with villous hypertrophy and mononuclear inflammation.',
    resource: source.joints, page: '9-11', section: 'Rheumatoid arthritis',
    support: 'Pain and swelling of joints usually in symmetrical fashion, especially involving joints of hands, wrists and feet. The characteristic histologic features are villous hypertrophy of the synovium and marked mononuclear inflammatory cell infiltrate.',
    detail: 'Physical PDF pages 9 and 11, clinical-distribution and histology paragraphs',
    spanText: 'In rheumatoid arthritis, proliferating chronically inflamed synovium forms pannus.',
    sectionId: 'art-hu-lcs103-pat-arthritis-patterns-mechanism',
  },
  {
    code: 'OA', concept: conceptSpecs[2], article: article.arthritis,
    subject: 'Osteophytes in osteoarthritis', predicate: 'are', object: 'new bony projections formed at the margins of the joint',
    display: 'Osteophytes in osteoarthritis are new bony projections formed at the margins of the joint.',
    resource: source.joints, page: '7', section: 'Osteoarthritis — osteophytes',
    support: 'These are new bony projections formed at the margins of the joint.',
    detail: 'Physical PDF page 7, osteophytes definition',
    spanText: 'Cartilage becomes thin and cracked, joint space narrows, and repair at the margins produces osteophytes.',
    sectionId: 'art-hu-lcs103-pat-arthritis-patterns-mechanism',
  },
  {
    code: 'GOUT', concept: conceptSpecs[3], article: article.arthritis,
    subject: 'Acute gouty arthritis', predicate: 'most commonly affects', object: 'the great toe, producing podagra',
    display: 'Acute gouty arthritis most commonly affects the great toe, producing podagra.',
    resource: source.joints, page: '15', section: 'Gout and gouty arthritis',
    support: 'Acute gouty arthritis is predominantly a disease of lower extremities, affecting most commonly great toe. This is called “Podagra”.',
    detail: 'Physical PDF page 15, acute-gout distribution statement',
    spanText: 'Acute disease most characteristically affects the first metatarsophalangeal joint, where the presentation is called podagra.',
    sectionId: 'art-hu-lcs103-pat-arthritis-patterns-mechanism',
  },
  {
    code: 'INFECTIOUS', concept: conceptSpecs[4], article: article.arthritis,
    subject: 'Suppurative arthritis', predicate: 'is', object: 'an acute infectious inflammation of a joint with pain, swelling and effusion',
    display: 'Suppurative arthritis is an acute infectious inflammation of a joint with pain, swelling and effusion.',
    resource: source.joints, page: '12', section: 'Suppurative arthritis',
    support: 'Infectious or suppurative arthritis is invariably an acute inflammatory involvement of the joint. Clinically, the patients present with redness, swelling, pain and joint effusion.',
    detail: 'Physical PDF page 12, definition and clinical paragraph',
    spanText: 'The resulting acute neutrophilic inflammation produces pain, swelling, redness, effusion, turbid purulent fluid and systemic inflammatory features.',
    sectionId: 'art-hu-lcs103-pat-arthritis-patterns-mechanism',
  },
  {
    code: 'SYNOVIAL', concept: conceptSpecs[5], article: article.lesions,
    subject: 'Synovial sarcoma', predicate: 'is', object: 'a highly malignant para-articular soft-tissue tumour that most often affects young adults',
    display: 'Synovial sarcoma is a highly malignant para-articular soft-tissue tumour that most often affects young adults.',
    resource: source.softTissue, page: '19', section: 'Uncertain differentiation — Synovial sarcoma',
    support: 'Highly malignant soft tissue tumor mostly originates adjacent to a joint. Most occur in people in their 20s to 40s.',
    detail: 'Physical PDF page 19, synovial-sarcoma bullet list',
    spanText: 'Synovial sarcoma is a highly malignant soft-tissue tumour of uncertain differentiation.',
    sectionId: 'art-hu-lcs103-pat-periarticular-lesions-definition',
  },
]

const claims = evidenceRows.map((row) => ({
  id: `CLM-MSK-HULCS103-F96-${row.code}-01`,
  concept_id: row.concept.id,
  subject: row.subject,
  predicate: row.predicate,
  object: row.object,
  display_text: row.display,
  risk_class: 'foundational_stable',
  verification_status: 'needs_evidence',
  conflict_status: row.code === 'INFECTIOUS' ? 'source_ambiguity_in_assessment_item' : 'none',
  confidence: '0.88',
  freshness: 'stable_local_curriculum_fact',
  time_sensitive: 'no',
  qualifiers: 'polarity: affirmative\nauthority: direct local Helwan curriculum, not independent verification',
}))

const citations = evidenceRows.map((row) => ({
  id: `CIT-HULCS103-F96-${row.code}-01`,
  claim_id: `CLM-MSK-HULCS103-F96-${row.code}-01`,
  resource_id: row.resource,
  evidence_role: 'local_curriculum',
  locator_type: 'page',
  locator_page: row.page,
  locator_section: row.section,
  locator_detail: row.detail,
  support_span: row.support,
  context_note: 'Source wording is preserved; punctuation is normalised only where two adjacent source sentences are joined.',
  confidence: '0.88',
  counts_as_claim_evidence: 'no',
}))

const spans = evidenceRows.map((row) => ({
  id: `SPN-HULCS103-F96-${row.code}-01`,
  article_id: row.article,
  section_id: row.sectionId,
  text: row.spanText,
  claim_ids: `CLM-MSK-HULCS103-F96-${row.code}-01`,
  citation_ids: `CIT-HULCS103-F96-${row.code}-01`,
}))

if (questions.length !== 27 || concepts.length !== 6 || articles.length !== 2 || sources.length !== 3 || claims.length !== 6 || citations.length !== 6 || spans.length !== 6) {
  throw new Error('Family-96 governed count mismatch')
}

await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8')
await writeFile(paths.articles, articles.map(item).join(divider), 'utf8')
await writeFile(paths.questions, questions.map(item).join(divider), 'utf8')
await writeFile(paths.sources, sources.map(item).join(divider), 'utf8')
await writeFile(paths.claims, claims.map(item).join(divider), 'utf8')
await writeFile(paths.citations, citations.map(item).join(divider), 'utf8')
await writeFile(paths.spans, spans.map(item).join(divider), 'utf8')

console.log(JSON.stringify({
  files: paths,
  counts: { concepts: concepts.length, articles: articles.length, questions: questions.length, sources: sources.length, claims: claims.length, citations: citations.length, spans: spans.length },
  held: { family79: '75 answered written prompts; 0 printed marks', family72: '15 keyed MEQ subprompts; 0 printed marks' },
}, null, 2))
