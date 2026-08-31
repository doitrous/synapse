#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family143-q1-13-joint-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family143-q1-13-joint-articles.md'),
  sources: resolve(base, 'evidence/HU-LCS-103-family143-q1-13-sources.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family143-q1-13-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family143-q1-13-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family143-q1-13-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family143-q1-13-mcq.md'),
}
const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`
const source = { assessment: 'src_d24024cfcd418918201f', teaching: 'src_6995e894c8b7f13c8809' }
const conceptIds = {
  oa: 'CON-MSK-5AD256E28E4183',
  ra: 'CON-MSK-CFE4B805DB79CC',
  septic: 'CON-MSK-7005C294D3DE73',
  tb: 'CON-MSK-074302F3E094DB',
  pott: 'CON-MSK-3506288FEBB87F',
}
const articleIds = {
  noninfectious: 'ART-HU-LCS103-PAT-F143-OA-RA-DISCRIMINATORS',
  infectious: 'ART-HU-LCS103-PAT-F143-INFECTIOUS-ARTHRITIS',
}
const claimIds = {
  oa: 'CLM-HULCS103-F143-OA-01',
  ra: 'CLM-HULCS103-F143-RA-01',
  septic: 'CLM-HULCS103-F143-SEPTIC-01',
  tb: 'CLM-HULCS103-F143-TB-01',
}

const conceptSpecs = [
  {
    code: 'OA', id: conceptIds.oa, key: 'pathology.joint.osteoarthritis-degeneration-osteophytes', type: 'update',
    label: 'Osteoarthritis produces activity-related pain, articular-cartilage loss, narrowed joint space, osteophytes, Heberden nodes and loose bodies',
    aliases: 'Osteoarthritis and osteophytes\nDegenerative joint disease\nHeberden nodes and joint mice',
    definition: 'Osteoarthritis is a chronic degenerative disorder of synovial joints. In the governed local sources, cartilage loss narrows the radiographic joint space, marginal repair produces osteophytes, distal interphalangeal disease produces hard painless Heberden nodes, and loose bodies may lock the joint.',
    objective: 'Recognise the activity-related osteoarthritis pattern and connect cartilage loss, joint-space narrowing, Heberden nodes, osteophytes and loose bodies.',
    pitfalls: 'Do not assign pannus or lymphoid-follicle synovitis to osteoarthritis. Do not call joint-space narrowing primary bone infarction when the source describes cartilage loss.',
    micro: 'Osteoarthritis clinicoradiologic morphology',
    articleIds: `ART-HU-LCS103-PAT-ARTHRITIS-PATTERNS\nART-HU-LCS103-PAT-PERIARTICULAR-LESIONS\n${articleIds.noninfectious}`,
    relatedArticles: `ART-HU-LCS103-PAT-ARTHRITIS-PATTERNS\nART-HU-LCS103-PAT-PERIARTICULAR-LESIONS`,
    resources: `${source.teaching}\nsrc_d5d701558ddff491b455\n${source.assessment}`,
    claims: `CLM-MSK-HULCS103-F96-OA-01\n${claimIds.oa}`,
    signal: 'Family-143 Q1–Q4 printed keys B/C/B/C; prior Family-96 exact-ID assessment occurrences remain preserved.',
    original: '[Family-143 Q1] older obese woman, activity-related knee pain, joint-space narrowing and osteophytes; printed key B, Osteoarthritis.\n[Q2] hard painless distal interphalangeal nodules; printed key C, Heberden nodes.\n[Q3] narrowed joint space; printed key B, Cartilage loss.\n[Q4] osteoarthritic knee locking; printed key C, Loose bodies (joint mice).',
  },
  {
    code: 'RA', id: conceptIds.ra, key: 'pathology.joint.rheumatoid-pannus-clinicopathology', type: 'update',
    label: 'Rheumatoid arthritis is a symmetrical peripheral inflammatory synovitis with prolonged morning stiffness, villous hypertrophy, lymphoid follicles and characteristic deformity',
    aliases: 'Rheumatoid arthritis and pannus\nRheumatoid synovitis\nRheumatoid clinicohistologic pattern',
    definition: 'Rheumatoid arthritis is a chronic symmetrical inflammatory disease of peripheral joints. The local lecture describes prolonged stiffness and swelling of hands and wrists, villous synovial hypertrophy with mononuclear inflammation and lymphoid follicles, ulnar deviation of fingers, radial deviation of the wrist, and rheumatoid-factor elevation in several unrelated diseases.',
    objective: 'Recognise the clinical, deformity, synovial-histology and source-bound rheumatoid-factor cues in Family-143 Q5–Q8.',
    pitfalls: 'Do not replace the printed Q8 Leprosy key with an inferred alternative. The RF association is retained as a local source claim and requires independent medical and faculty review.',
    micro: 'Rheumatoid arthritis clinicohistology and serology',
    articleIds: `ART-HU-LCS103-PAT-ARTHRITIS-PATTERNS\nART-HU-LCS103-PAT-PERIARTICULAR-LESIONS\n${articleIds.noninfectious}`,
    relatedArticles: `ART-HU-LCS103-PAT-ARTHRITIS-PATTERNS\nART-HU-LCS103-PAT-PERIARTICULAR-LESIONS`,
    resources: `${source.teaching}\nsrc_d5d701558ddff491b455\n${source.assessment}`,
    claims: `CLM-MSK-HULCS103-F96-RA-01\n${claimIds.ra}`,
    signal: 'Family-143 Q5–Q8 printed keys C/B/C/A; Q8=A Leprosy remains an explicit Draft source-risk occurrence.',
    original: '[Family-143 Q5] prolonged morning stiffness with symmetrical wrist and MCP swelling; printed key C, Rheumatoid arthritis.\n[Q6] villous hypertrophy and lymphoid follicles; printed key B, Rheumatoid arthritis.\n[Q7] ulnar finger and radial wrist deviation; printed key C, Rheumatoid arthritis.\n[Q8] elevated RF in another disease; printed key A, Leprosy.',
  },
  {
    code: 'SEPTIC', id: conceptIds.septic, key: 'pathology.joint.infectious-suppurative-arthritis', type: 'update',
    label: 'Suppurative arthritis is an acute bacterial joint infection commonly reached through blood and associated with pus and neutrophilic leukocytosis',
    aliases: 'Infectious arthritis\nSeptic arthritis\nPyogenic arthritis',
    definition: 'Suppurative arthritis is an acute inflammatory infection of a joint. The local lecture states that bacteria usually arrive from the bloodstream, while immunocompromised patients may present with fever, joint pain, redness, swelling, purulent aspirate and neutrophilic leucocytosis.',
    objective: 'Recognise septic arthritis from purulent aspiration and identify the source-keyed route and laboratory pattern.',
    pitfalls: 'Do not confuse a purulent acute joint with sterile crystal disease. Preserve the source spelling difference between leukocytosis and leucocytosis without changing the tested concept.',
    micro: 'Septic arthritis route, presentation and laboratory findings',
    articleIds: `ART-HU-LCS103-PAT-ARTHRITIS-PATTERNS\n${articleIds.infectious}`,
    relatedArticles: 'ART-HU-LCS103-PAT-ARTHRITIS-PATTERNS\nART-HU-LCS103-PAT-PERIARTICULAR-LESIONS',
    resources: `${source.teaching}\nsrc_d5d701558ddff491b455\n${source.assessment}`,
    claims: `CLM-MSK-HULCS103-F96-INFECTIOUS-01\n${claimIds.septic}`,
    signal: 'Family-143 Q9–Q11 printed keys C/C/B; prior Family-96 exact-ID occurrences and ambiguity notes remain preserved.',
    original: '[Family-143 Q9] immunocompromised patient with fever, red swollen painful joint and pus; printed key C, Septic arthritis.\n[Q10] route to joint; printed key C, Hematogenous spread.\n[Q11] laboratory finding; printed key B, Neutrophilic leukocytosis.',
  },
  {
    code: 'TB', id: conceptIds.tb, key: 'pathology.joint.tuberculous-arthritis-caseating-tubercles', type: 'new',
    label: 'Tuberculous arthritis is commonly monoarticular and is characterised by caseating tubercles in the synovium',
    aliases: 'Tuberculous arthritis\nTuberculous monoarthritis\nCaseating tubercles of synovium',
    definition: 'Tuberculous arthritis is a chronic joint infection that commonly follows haematogenous dissemination from another focus. The governed lecture describes a usually monoarticular pattern, frequent involvement of the spine, hip and knee, and caseating tubercles in the synovium.',
    objective: 'Recognise caseating granulomatous inflammation as the source-keyed pathology of tuberculous hip monoarthritis.',
    pitfalls: 'Do not substitute rheumatoid pannus, gouty tophi, osteophytes or CPPD crystals for the printed caseating-granuloma response.',
    micro: 'Tuberculous monoarthritis and caseating tubercles',
    articleIds: articleIds.infectious,
    relatedArticles: 'ART-HU-LCS103-PAT-F101-POTT-SINUS-COMPLICATIONS',
    resources: `${source.assessment}\n${source.teaching}`,
    claims: claimIds.tb,
    signal: 'Family-143 Q12 printed key B, Caseating granulomas.',
    original: '[Family-143 Q12] monoarticular hip arthritis due to tuberculosis; printed key B, Caseating granulomas.\n[Lecture p13] tuberculous joint disease is usually monoarticular and the synovium is studded with caseating tubercles.',
  },
  {
    code: 'POTT', id: conceptIds.pott, key: 'osteomyelitis.tuberculous.pott-disease-vertebral-kyphosis', type: 'update',
    label: 'Pott disease names tuberculosis of the spine in the governed local LCS source set',
    aliases: "Pott disease\nTuberculous spondylitis\nVertebral tuberculosis",
    definition: "Within the governed local LCS source set, Pott disease is tuberculosis of the spine. Family-143 directly asks for this eponym, while the local joint lecture calls spinal tuberculosis Pott's disease or tuberculous spondylitis.",
    objective: 'Identify Pott disease as the exact source-keyed name for tuberculosis of the spine.',
    pitfalls: 'Do not substitute Paget disease, spondylosis, ankylosing spondylitis or Scheuermann disease for the printed Pott disease key.',
    micro: 'Vertebral tuberculosis and Pott disease',
    articleIds: `ART-HU-LCS103-PAT-F101-POTT-SINUS-COMPLICATIONS\n${articleIds.infectious}`,
    relatedArticles: 'ART-HU-LCS103-PAT-F101-CHRONIC-OSTEOMYELITIS\nART-HU-LCS103-PAT-F101-POTT-SINUS-COMPLICATIONS',
    resources: `src_cf37932d10b47ec0a26f\nsrc_f2e15ef3167cabd93105\n${source.assessment}\n${source.teaching}`,
    claims: `CLM-HULCS103-F101-POTT-01\n${claimIds.tb}`,
    signal: 'Family-101 Q14–Q15 prior exact-ID scope; Family-143 Q13 printed key C, Pott disease.',
    original: '[Family-143 Q13] Tuberculosis of the spine is known as; printed key C, Pott disease.\n[Lecture p13] Tuberculosis of the spine is termed Pott’s disease or tuberculous spondylitis.',
  },
]

const conceptBase = (spec) => ({
  label: spec.label, id: spec.id, canonical_key: spec.key, aliases: spec.aliases, arabic_label: '', arabic_aliases: '',
  status: 'under review', support_mode: 'direct_statement', subject: 'msk', primary_node_id: 'SYS-MSK', secondary_node_ids: 'DIS-PAT-T03',
  topic: 'Musculoskeletal system', subtopic: 'Joint diseases and tumours', nanotopic: '', modules: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Pathology > Joint Diseases and Tumours', universities: 'hu', learner_years: '1',
  approved_file_resource_ids: '[clear]', approved_video_resource_ids: '[clear]', blueprint_weight: '0.84', exam_weight_by_year: 'HU_Y1=0.84',
  clinical_relevance: '0.78', academic_relevance: '0.98', weight_confidence: '0.58', confidence: '0.86', resource_occurrence_ids: '[clear]',
  source_candidate_ids: '[clear]', merge_ids: '[clear]', rejected_merge_candidate_ids: spec.type === 'new'
    ? 'Governed Family-143 reconciliation found no eligible complete prior tuberculous-joint handle; the existing Pott concept remains the narrower vertebral entity.'
    : 'Exact-ID update selected; no rival concept ID is introduced.',
  evidence_gaps: 'Independent medical verification and named Helwan Pathology faculty review are required before publication.',
  owner: 'Helwan Year-1 authoring lane', reviewer: 'Medical team, Helwan Pathology faculty', final_publisher: 'Admin team', last_reviewed: '', review_due: '',
  publication_status: 'needs_evidence', editorial_review_status: 'drafted_not_reviewed', exclusion_reason: '', definition: spec.definition,
  explicit_objective: spec.objective, pitfalls: spec.pitfalls, concept_type: 'pathology_pattern', microtopic: spec.micro,
  article_ids: spec.articleIds, related_article_ids: spec.relatedArticles, resource_ids: spec.resources, exam_signal: spec.signal,
  atomic_claim_ids: spec.claims, original_wording: spec.original, conflicts: '[clear]',
  uncertainty: spec.code === 'RA' ? 'Family-143 Q8=A Leprosy is retained as a source-printed association and remains Draft pending independent medical and named faculty review.' : '[clear]',
  field_notes: [
    'microtopicId: The reviewed taxonomy stops at SYS-MSK for this local Pathology overlay; the named microtopic is retained as prose.',
    'nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical node.',
    'approvedFileResourceIds: No source file is rights-cleared for student redistribution.',
    'approvedVideoResourceIds: No video is assigned to this concept.',
    'resourceOccurrenceIds: Hand-authored from governed Family-143 assessment and Family-65 teaching evidence; no extraction-occurrence record exists.',
    `sourceCandidateIds: Governed triage established ${spec.type === 'new' ? 'a new non-rival handle' : 'exact-ID reuse'} before authoring.`,
    'mergeIds: No concept was merged in this slice.',
    'lastReviewed: Draft record; no named faculty review has occurred.',
    'reviewDue: Set after the first named faculty review.',
    'exclusionReason: Not excluded; held at needs_evidence.',
    'arabicLabel: Blank pending independently verified Arabic terminology review.',
    'arabicAliases: Blank pending independently verified Arabic terminology review.',
  ].join('\n'),
})
const concepts = conceptSpecs.map(conceptBase)

const claimSpecs = [
  {
    code: 'OA', concept: conceptIds.oa, article: articleIds.noninfectious,
    text: 'In the local joint sources, osteoarthritis is associated with activity-related pain, cartilage-loss joint-space narrowing, osteophytes, Heberden nodes and loose bodies that may lock the joint.',
    object: 'activity-related pain with cartilage-loss joint-space narrowing, osteophytes, Heberden nodes and locking loose bodies',
    assessmentPage: '1-2', assessmentSection: 'Family-143 Q1–Q4',
    assessmentSpan: 'Q1 prints Osteoarthritis as B; Q2 prints Heberden nodes as C; Q3 prints Cartilage loss as B; Q4 prints Loose bodies (joint mice) as C.',
    teachingPage: '4-8', teachingSection: 'Osteoarthritis',
    teachingSpan: 'Damaged cartilage is the main lesion in osteoarthritis. On X-ray, the space between bones appears narrower because cartilage is lost. Loose bodies may cause locking of the joint.',
  },
  {
    code: 'RA', concept: conceptIds.ra, article: articleIds.noninfectious,
    text: 'The local joint sources present rheumatoid arthritis with prolonged symmetrical peripheral-joint stiffness and swelling, villous synovial hypertrophy, lymphoid follicles, ulnar finger deviation, radial wrist deviation and possible rheumatoid-factor elevation in leprosy.',
    object: 'prolonged symmetrical peripheral-joint inflammation with characteristic synovial morphology, deformity and the source-bound RF association',
    assessmentPage: '2-3', assessmentSection: 'Family-143 Q5–Q8',
    assessmentSpan: 'Q5 prints Rheumatoid arthritis as C; Q6 prints Rheumatoid arthritis as B; Q7 prints Rheumatoid arthritis as C; Q8 prints Leprosy as A.',
    teachingPage: '9-11', teachingSection: 'Rheumatoid arthritis',
    teachingSpan: 'RF titres are elevated in certain unrelated diseases too such as in: viral hepatitis, cirrhosis, sarcoidosis and leprosy. Advanced cases show ulnar deviation of the fingers and radial deviation of the wrist.',
  },
  {
    code: 'SEPTIC', concept: conceptIds.septic, article: articleIds.infectious,
    text: 'The local joint sources present septic arthritis as an acute purulent joint infection that commonly arrives through blood and may produce fever with neutrophilic leukocytosis.',
    object: 'an acute purulent joint infection commonly reached by the bloodstream and associated with fever and neutrophilic leukocytosis',
    assessmentPage: '3', assessmentSection: 'Family-143 Q9–Q11',
    assessmentSpan: 'Q9 prints Septic arthritis as C; Q10 prints Hematogenous spread as C; Q11 prints Neutrophilic leukocytosis as B.',
    teachingPage: '12', teachingSection: 'Suppurative arthritis',
    teachingSpan: 'Bacteria usually reach the joint space from the bloodstream. Constitutional symptoms such as fever, neutrophilic leucocytosis and raised ESR are generally associated.',
  },
  {
    code: 'TB', concept: conceptIds.tb, article: articleIds.infectious,
    text: 'The local joint sources present tuberculous arthritis as commonly monoarticular with caseating tubercles, and name tuberculosis of the spine Pott disease.',
    object: 'a commonly monoarticular infection with caseating tubercles, with spinal tuberculosis named Pott disease',
    assessmentPage: '3-4', assessmentSection: 'Family-143 Q12–Q13',
    assessmentSpan: 'Q12 prints Caseating granulomas as B. Q13 prints Pott disease as C.',
    teachingPage: '13', teachingSection: 'Tuberculous arthritis',
    teachingSpan: 'Tuberculous involvement of the joints is usually monoarticular. Tuberculosis of the spine is termed Pott’s disease or tuberculous spondylitis. Histologically, the synovium is studded with solitary or confluent caseating tubercles.',
  },
]

const articleSpecs = [
  {
    id: articleIds.noninfectious,
    title: 'Osteoarthritis and rheumatoid arthritis: clinicopathologic discriminators',
    aliases: 'Family-143 osteoarthritis and rheumatoid arthritis\nDegenerative versus inflammatory arthritis',
    micro: 'Osteoarthritis and rheumatoid arthritis patterns', reading: '7', concepts: `${conceptIds.oa}\n${conceptIds.ra}`,
    questionIds: Array.from({ length: 8 }, (_, index) => `Q-HU-LCS103-PAT-F143-${String(index + 1).padStart(2, '0')}`).join('\n'),
    claims: [claimSpecs[0], claimSpecs[1]],
    summary: 'Family-143 Q1–Q8 separate osteoarthritis from rheumatoid arthritis through symptoms, distribution, radiology, morphology, deformity and a source-bound rheumatoid-factor association.',
    sections: [
      '### Definition',
      'Osteoarthritis is a degenerative synovial-joint disorder centred on articular-cartilage loss and marginal bony repair. Rheumatoid arthritis is a chronic inflammatory synovial disease with a symmetrical peripheral-joint pattern. The Family-143 questions use clinicopathologic discriminators rather than management decisions.',
      '', '### Mechanism',
      'In osteoarthritis, cartilage becomes thin, cracked and worn; radiographic joint space narrows because cartilage is lost, while marginal repair forms osteophytes. Degenerative distal interphalangeal involvement produces hard painless Heberden nodes, and detached cartilage or bone fragments may form loose bodies that lock the joint.',
      '',
      'In rheumatoid arthritis, chronically inflamed synovium develops villous hypertrophy and mononuclear infiltrates with lymphoid follicles. Persistent symmetrical inflammation of wrists, hands and other peripheral joints may progress to ulnar deviation of the fingers and radial deviation of the wrist.',
      '', '### Key determinants',
      'Activity-related pain improving with rest, an older obese patient, joint-space narrowing, osteophytes, Heberden nodes and joint mice point to osteoarthritis. Prolonged morning stiffness with symmetrical wrist and MCP swelling, rheumatoid synovial morphology and characteristic deformity point to rheumatoid arthritis.',
      '', '### Clinical significance',
      'These are local first-year Pathology assessment distinctions, not a diagnostic or treatment protocol. Q8 retains Leprosy as the exact source-printed A response for possible RF elevation, and the Family-65 lecture independently repeats that local curriculum association. Both sources remain local rather than independent medical verification, so Q8 and the entire slice stay Draft pending named faculty review.',
      '', '### Common misconceptions',
      'Do not call cartilage-loss joint-space narrowing pannus, and do not call rheumatoid villous synovitis primary osteoarthritis. Do not silently replace Q8’s printed answer with another disease or promote the local association beyond its source-bound scope.',
      '', '### Source-bound statements',
      claimSpecs[0].text, claimSpecs[1].text,
    ].join('\n'),
    hold: `${claimSpecs[0].text}\n${claimSpecs[1].text}`,
    lose: 'Calling cartilage-loss narrowing a rheumatoid feature.\nMissing Heberden nodes or loose bodies in an osteoarthritis stem.\nReplacing Q8=A Leprosy instead of flagging the exact source claim.',
    relatedArticles: 'ART-HU-LCS103-PAT-ARTHRITIS-PATTERNS\nART-HU-LCS103-PAT-PERIARTICULAR-LESIONS',
    conflicts: 'Family-143 Q8 retains A, Leprosy, exactly. It remains an explicit source-risk occurrence requiring independent medical and named faculty review.',
    notes: 'Q4 and Q8 cross physical page boundaries, but each immediate printed answer remains attached to its single occurrence. No answer is repaired.',
  },
  {
    id: articleIds.infectious,
    title: 'Septic and tuberculous arthritis: route, inflammation and spinal nomenclature',
    aliases: 'Family-143 infectious arthritis\nSuppurative versus tuberculous arthritis\nPott disease in the joint-pathology source',
    micro: 'Suppurative and tuberculous arthritis', reading: '6', concepts: `${conceptIds.septic}\n${conceptIds.tb}\n${conceptIds.pott}`,
    questionIds: Array.from({ length: 5 }, (_, index) => `Q-HU-LCS103-PAT-F143-${String(index + 9).padStart(2, '0')}`).join('\n'),
    claims: [claimSpecs[2], claimSpecs[3]],
    summary: 'Family-143 Q9–Q13 distinguish acute purulent septic arthritis from monoarticular tuberculous arthritis and retain Pott disease as the source name for spinal tuberculosis.',
    sections: [
      '### Definition',
      'Suppurative or septic arthritis is an acute bacterial infection of a joint. Tuberculous arthritis is a chronic mycobacterial joint infection that is commonly monoarticular in the governed local lecture. Spinal tuberculosis is called Pott disease or tuberculous spondylitis in that same source.',
      '', '### Mechanism',
      'Bacteria in suppurative arthritis most commonly reach the joint from the bloodstream, although direct contamination and lymphatic spread are also described. Acute neutrophilic inflammation produces pain, redness, swelling, effusion, pus and systemic inflammatory findings such as fever and neutrophilic leukocytosis.',
      '',
      'Tuberculous arthritis commonly follows haematogenous dissemination from another focus or direct spread from nearby tuberculous osteomyelitis. The synovium may contain solitary or confluent caseating tubercles, and the local lecture identifies the spine, hip and knee as common sites.',
      '', '### Key determinants',
      'A febrile immunocompromised patient with a red swollen painful joint and purulent aspirate fits septic arthritis. The source then keys hematogenous spread and neutrophilic leukocytosis. A monoarticular tuberculous hip with caseating granulomas fits tuberculous arthritis, while tuberculosis of the spine is keyed as Pott disease.',
      '', '### Clinical significance',
      'The patterns help distinguish acute pyogenic inflammation from chronic granulomatous infection in a first-year pathology assessment. They do not establish a clinical diagnostic or management pathway. All records remain Draft because the assessment bank and teaching lecture are local curriculum sources rather than independent medical verification.',
      '', '### Common misconceptions',
      'Do not call a pus-filled acute joint gout or osteoarthritis. Do not substitute pannus, tophi, osteophytes or CPPD crystals for caseating granulomas in the exact tuberculous-arthritis item. Do not confuse Pott disease with Paget disease.',
      '', '### Source-bound statements',
      claimSpecs[2].text, claimSpecs[3].text,
    ].join('\n'),
    hold: `${claimSpecs[2].text}\n${claimSpecs[3].text}`,
    lose: 'Treating a purulent joint as sterile crystal disease.\nChoosing a non-haematogenous route against the printed Q10 key.\nConfusing Pott disease with Paget disease.',
    relatedArticles: 'ART-HU-LCS103-PAT-ARTHRITIS-PATTERNS\nART-HU-LCS103-PAT-F101-POTT-SINUS-COMPLICATIONS',
    conflicts: '[clear]',
    notes: 'The new tuberculous-arthritis concept owns the monoarticular caseating-joint scope; the existing Pott concept remains the narrower vertebral entity and is reused for Q13.',
  },
]

const articleBase = (spec) => ({
  id: spec.id, title: spec.title, aliases: spec.aliases, arabic_title: '', subject: 'msk', topic: 'Musculoskeletal system',
  subtopic: 'Joint diseases and tumours', primary_node_id: 'SYS-MSK', template_id: 'TPL-CONCEPT', archetype: 'concept', language: 'en',
  learner_stage: 'Years 1–3 foundation', high_yield: 'High', time_sensitive: 'stable', status: 'Draft', owner: 'Helwan Year-1 authoring lane',
  reviewer: 'Medical team, Helwan Pathology faculty', final_publisher: 'Admin team', published_summary: '', published_sections: '', universities: 'hu',
  years: 'HU_Y1', module: 'HU-LCS-103', media: '', publication_gate: 'needs_evidence', conflicts: spec.conflicts,
  evidence_gaps: 'Independent medical verification and named Helwan Pathology faculty review are required before publication.', last_reviewed: '', review_due: '',
  microtopic: spec.micro, nanotopic: '', secondary_node_ids: 'DIS-PAT-T03', reading_time: spec.reading, summary: spec.summary, sections: spec.sections,
  hold_these: spec.hold, lose_the_mark: spec.lose, related_concepts: spec.concepts, related_articles: spec.relatedArticles, question_ids: spec.questionIds,
  resource_ids: `${source.assessment}\n${source.teaching}`, module_subject: 'HU-LCS-103 > Pathology > Joint Diseases and Tumours',
  university_notes: 'hu: Restricted to the path-placed Family-143 solved question bank and governed Family-65 local teaching lecture.',
  annotations: spec.claims.map((claim) => `### definition_of · ${claim.concept}\nQuote: ${claim.text}\nBlock: body`).join('\n\n'),
  article_source_ids: `${source.assessment}\n${source.teaching}`, claim_ids: spec.claims.map((claim) => claimIds[claim.code.toLowerCase()]).join('\n'),
  span_ids: spec.claims.map((claim) => `SPN-HULCS103-F143-${claim.code}-01`).join('\n'), media_recommendations: '',
  callout_evidence: spec.claims.map((claim) => `### ${claim.text}\nClaims: ${claimIds[claim.code.toLowerCase()]}\nCitations: CIT-HULCS103-F143-${claim.code}-ASSESS-01, CIT-HULCS103-F143-${claim.code}-TEACH-01\nSpan: SPN-HULCS103-F143-${claim.code}-01`).join('\n\n'),
  evidence_basis: 'Family-143 supplies exact source wording and inline printed answers. Family-65 supplies local teaching support. Neither source counts as independent medical verification.',
  notes: spec.notes,
  field_notes: 'arabicTitle: Blank pending reviewed terminology.\nnanotopicId: No reviewed nanotopic exists below SYS-MSK.\nmedia: No media is required.\npublishedSummary: Blank because this remains Draft.\npublishedSections: Blank because this remains Draft.\nlastReviewed: No named medical review completed.\nreviewDue: Set after first named review.',
})
const articles = articleSpecs.map(articleBase)

const sources = [{
  id: source.assessment,
  title: 'Joint Pathology MCQs — solved local LCS-103 question bank',
  institution: 'Helwan LCS-103 local question-bank corpus',
  processing_status: 'native_text', collection_id: 'hu-y1',
  source_relative_path: 'Year 1/LCS 103/Pathology/Practical Labs/CBLs/MCQs - joint mcq with answers.pdf.pdf', source_uri: '', media_type: 'application/pdf', languages: 'en',
  publication_date: '', accessed_at: '', page_count: '7', sha256: 'd24024cfcd418918201fea7f9ce01eacae96fd68874b0fb532b08822eb4e8063',
  rights: 'Local Helwan teaching and assessment material held for internal authoring only. No page image is redistributed.',
  qualification: 'Tier-3 manifest/path-placed local LCS-103 Pathology solved question bank. Page 1 is headed only Joint Pathology MCQs; no page names a university, module, faculty member, cohort, sitting or marks. Inline Answer letters are source-printed answer evidence, not an official answer key.',
  confidence: '0.82', is_assessment: 'yes',
}]

const claims = claimSpecs.map((spec) => ({
  id: claimIds[spec.code.toLowerCase()], concept_id: spec.concept,
  subject: spec.code === 'OA' ? 'Osteoarthritis' : spec.code === 'RA' ? 'Rheumatoid arthritis' : spec.code === 'SEPTIC' ? 'Septic arthritis' : 'Tuberculous arthritis and Pott disease',
  predicate: 'is presented in the governed local joint sources as', object: spec.object, display_text: spec.text,
  risk_class: 'foundational_stable', verification_status: 'needs_evidence', conflict_status: spec.code === 'RA' ? 'source_claim_requires_review' : 'none',
  confidence: spec.code === 'RA' ? '0.78' : '0.84', freshness: 'stable_local_curriculum_fact', time_sensitive: 'no',
  qualifiers: `polarity: affirmative\nauthority: local Helwan assessment and teaching support, not independent verification\nassessment boundary: Family-143 Q1–Q13${spec.code === 'RA' ? '\nsource risk: Q8=A Leprosy retained without answer repair' : ''}`,
}))

const citations = claimSpecs.flatMap((spec) => [
  {
    id: `CIT-HULCS103-F143-${spec.code}-ASSESS-01`, claim_id: claimIds[spec.code.toLowerCase()], resource_id: source.assessment,
    evidence_role: 'direct_assessment_support', locator_type: 'page', locator_page: spec.assessmentPage, locator_section: spec.assessmentSection,
    locator_detail: `Family-143 physical PDF p${spec.assessmentPage}, exact printed occurrence(s) and immediate inline Answer letters.`,
    support_span: spec.assessmentSpan, context_note: 'Direct local assessment support for a Draft record; not independent medical verification.',
    confidence: spec.code === 'RA' ? '0.78' : '0.84', counts_as_claim_evidence: 'no',
  },
  {
    id: `CIT-HULCS103-F143-${spec.code}-TEACH-01`, claim_id: claimIds[spec.code.toLowerCase()], resource_id: source.teaching,
    evidence_role: 'local_curriculum', locator_type: 'page', locator_page: spec.teachingPage, locator_section: spec.teachingSection,
    locator_detail: `Family-65 Joint Diseases and Tumours lecture physical PDF p${spec.teachingPage}.`, support_span: spec.teachingSpan,
    context_note: 'Direct local teaching support for explanation context; not independent medical verification.', confidence: '0.86', counts_as_claim_evidence: 'no',
  },
])

const spans = claimSpecs.map((spec) => ({
  id: `SPN-HULCS103-F143-${spec.code}-01`, article_id: spec.article,
  section_id: spec.article === articleIds.noninfectious ? 'art-hu-lcs103-pat-f143-oa-ra-discriminators-source-bound-statements' : 'art-hu-lcs103-pat-f143-infectious-arthritis-source-bound-statements',
  text: spec.text, claim_ids: claimIds[spec.code.toLowerCase()],
  citation_ids: `CIT-HULCS103-F143-${spec.code}-ASSESS-01\nCIT-HULCS103-F143-${spec.code}-TEACH-01`,
}))

const rows = [
  [1, 'B', 'A 68-year-old obese woman complains of chronic knee pain that worsens with activity and improves with rest. X-ray shows joint space narrowing and osteophyte formation. What is the most likely diagnosis?', ['Rheumatoid arthritis', 'Osteoarthritis', 'Gouty arthritis', 'Septic arthritis', 'Tuberculous arthritis'], conceptIds.oa, articleIds.noninfectious, '1'],
  [2, 'C', 'A 72-year-old woman presents with hard, painless nodules at the distal interphalangeal joints. These lesions are most characteristic of:', ['Rheumatoid nodules', 'Tophi', 'Heberden nodes', 'Ganglion cysts', 'Bursitis'], conceptIds.oa, articleIds.noninfectious, '1'],
  [3, 'B', 'A 55-year-old man has chronic hip pain. Radiographs show narrowing of the joint space. What is the pathological basis of this finding?', ['Synovial hypertrophy', 'Cartilage loss', 'Bone infarction', 'Granuloma formation', 'Crystal deposition'], conceptIds.oa, articleIds.noninfectious, '1'],
  [4, 'C', 'A patient with osteoarthritis develops locking of the knee joint. Which lesion is most likely responsible?', ['Pannus formation', 'Rheumatoid nodules', 'Loose bodies (joint mice)', 'Tophi', 'Caseating granulomas'], conceptIds.oa, articleIds.noninfectious, '1-2'],
  [5, 'C', 'A 45-year-old woman develops morning stiffness lasting more than one hour, with symmetrical swelling of both wrists and MCP joints. The most likely diagnosis is:', ['Osteoarthritis', 'Gout', 'Rheumatoid arthritis', 'Septic arthritis', 'Pseudogout'], conceptIds.ra, articleIds.noninfectious, '2'],
  [6, 'B', 'A biopsy from an inflamed synovium reveals villous hypertrophy and lymphoid follicle formation. Which disease is most likely?', ['Osteoarthritis', 'Rheumatoid arthritis', 'Tuberculous arthritis', 'Gout', 'Bursitis'], conceptIds.ra, articleIds.noninfectious, '2'],
  [7, 'C', 'A 50-year-old woman has ulnar deviation of the fingers and radial deviation of the wrist. These findings are characteristic of:', ['Gout', 'Osteoarthritis', 'Rheumatoid arthritis', 'Septic arthritis', 'Pseudogout'], conceptIds.ra, articleIds.noninfectious, '2'],
  [8, 'A', 'A patient is positive for rheumatoid factor. Which of the following diseases may also show elevated RF levels?', ['Leprosy', 'Osteoporosis', 'Osteosarcoma', 'Fibrous dysplasia', 'Chondroblastoma'], conceptIds.ra, articleIds.noninfectious, '2-3'],
  [9, 'C', 'A 30-year-old immunocompromised patient presents with fever, joint pain, redness, and swelling. Joint aspiration reveals pus. The most likely diagnosis is:', ['Gout', 'Osteoarthritis', 'Septic arthritis', 'Tuberculous arthritis', 'Bursitis'], conceptIds.septic, articleIds.infectious, '3'],
  [10, 'C', 'The most common route by which bacteria reach a joint in suppurative arthritis is:', ['Direct trauma', 'Lymphatic spread', 'Hematogenous spread', 'Neural spread', 'Congenital transmission'], conceptIds.septic, articleIds.infectious, '3'],
  [11, 'B', 'A patient with septic arthritis is expected to have which laboratory finding?', ['Leukopenia', 'Neutrophilic leukocytosis', 'Decreased ESR', 'Thrombocytopenia', 'Hypouricemia'], conceptIds.septic, articleIds.infectious, '3'],
  [12, 'B', 'A patient develops monoarticular arthritis involving the hip joint due to tuberculosis. Which pathological feature is most characteristic?', ['Pannus formation', 'Caseating granulomas', 'Tophi formation', 'Osteophytes', 'CPPD crystals'], conceptIds.tb, articleIds.infectious, '3'],
  [13, 'C', 'Tuberculosis of the spine is known as:', ['Paget disease', 'Spondylosis', 'Pott disease', 'Ankylosing spondylitis', 'Scheuermann disease'], conceptIds.pott, articleIds.infectious, '4'],
]

const objective = {
  [conceptIds.oa]: 'Recognise the exact osteoarthritis symptom, radiologic and morphologic discriminators in the governed source.',
  [conceptIds.ra]: 'Recognise the exact rheumatoid clinical, synovial, deformity and source-bound serologic cues.',
  [conceptIds.septic]: 'Recognise septic arthritis from purulence and identify its source-keyed route and laboratory pattern.',
  [conceptIds.tb]: 'Recognise caseating granulomas in source-keyed tuberculous monoarthritis.',
  [conceptIds.pott]: 'Identify Pott disease as the source-keyed name for tuberculosis of the spine.',
}
const common = {
  subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '',
  matching_options: '', matching_prompts: '', correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '',
  topic: 'Musculoskeletal system', subtopic: 'Joint diseases and tumours', difficulty: 'Easy', question_type: 'Pathology', module: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Pathology > Joint Diseases and Tumours', clinical_relevance: '0.78', academic_relevance: '0.98',
  cognitive_effort_score: '0.36', exam_weight_by_year: 'HU_Y1=0.84', question_only_for: 'HU_Y1', concept_ids: '', years: 'HU_Y1', universities: 'hu',
  cognitive_effort: 'Low', setting: 'Academic', reasoning_level: '1', inferred_difficulty: '70', exam_relevance: '9', contextual_concept_ids: '',
  media_recommendations: '', attachments: '', attached_image: '', estimated_seconds: '60', randomise_answers: 'yes',
}

const questions = rows.map(([number, key, stem, options, concept, article, page]) => {
  const fields = { id: `Q-HU-LCS103-PAT-F143-${String(number).padStart(2, '0')}`, title: stem, ...common, question: stem, correct_answer: key }
  for (let index = 0; index < options.length; index += 1) {
    const letter = String.fromCharCode(65 + index)
    const option = options[index]
    const q8Risk = number === 8
      ? ' The printed A, Leprosy, association is preserved without medical repair and is explicitly held for independent medical verification and named Helwan Pathology faculty review.'
      : ''
    fields[`answer_${letter.toLowerCase()}`] = option
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `The Family-143 source prints ${key} as the immediate Answer for this exact occurrence, so “${option}” is retained as the source-keyed response. The linked Draft article explains the local clinicopathologic discriminator without converting it into an independent clinical rule.${q8Risk} This item remains Draft because the path-placed question bank and local teaching lecture do not replace independent verification.`
      : `The option “${option}” is preserved exactly from Family-143, but the immediate printed Answer selects ${key} instead. The linked Draft article explains the local source distinction without rewriting this distractor or inferring a different answer.${q8Risk} This item remains Draft pending independent medical verification and named Helwan Pathology faculty review.`
  }
  for (const letter of ['a', 'b', 'c', 'd', 'e', 'f']) {
    if (!Object.hasOwn(fields, `answer_${letter}`)) fields[`answer_${letter}`] = ''
    if (!Object.hasOwn(fields, `explanation_${letter}`)) fields[`explanation_${letter}`] = ''
  }
  const boundary = number === 4 || number === 8 ? ' The item crosses a physical page boundary, but its immediate printed answer remains attached to this one occurrence.' : ''
  const risk = number === 8 ? ' Q8=A Leprosy is an explicit source-risk occurrence: the exact printed answer is retained without repair and requires independent medical and named faculty review.' : ''
  return {
    ...fields, main_concept: concept, library_ids: article, resource_ids: `${source.assessment}\n${source.teaching}`, learning_objective: objective[concept],
    source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact stem/options with immediate printed Answer ${key}. Teaching support: ${source.teaching}.`,
    author_notes: `Transcribed from governed Family-143 physical p${page}; wording, option order and printed answer are preserved without answer repair.${boundary}${risk} The source contains no practical, written or media task. Family-101 Q12/Q20 and all earlier option-contract holds remain untouched.`,
  }
})

if (questions.length !== 13 || questions.map((row) => row.correct_answer).join('') !== 'BCBCCBCACCBBC') throw new Error('Family-143 Q1–Q13 count or key mismatch')
if (concepts.length !== 5 || articles.length !== 2 || sources.length !== 1 || claims.length !== 4 || citations.length !== 8 || spans.length !== 4) throw new Error('Family-143 dependency count mismatch')
await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await Promise.all([
  writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8'),
  writeFile(paths.articles, articles.map(item).join(divider), 'utf8'),
  writeFile(paths.sources, sources.map(item).join(divider), 'utf8'),
  writeFile(paths.claims, claims.map(item).join(divider), 'utf8'),
  writeFile(paths.citations, citations.map(item).join(divider), 'utf8'),
  writeFile(paths.spans, spans.map(item).join(divider), 'utf8'),
  writeFile(paths.questions, questions.map(item).join(divider), 'utf8'),
])
console.log(JSON.stringify({ files: paths, counts: { concepts: 5, newConcepts: 1, conceptUpdates: 4, articles: 2, sources: 1, questions: 13, claims: 4, citations: 8, spans: 4 }, keys: 'BCBCCBCACCBBC', optionCounts: questions.map(() => 5), sourceRisks: ['Q8=A Leprosy'], newHolds: [], practical: 0, written: 0, media: 0 }, null, 2))
