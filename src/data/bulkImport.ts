import type {
  ContentKind, ManagedContentItem, QuestionAnswerDraft, AnswerLabel, ArticleArchetype,
  ActorBriefSectionDraft, PracticalMarkSectionDraft, PracticalAnswerDraft,
  ClinicalDecisionDraft, LabQuestionDraft, PracticalAuthoringData, ArticleMediaRecord,
  MediaRequest, MediaRequestKind, MediaRequestMedium, MediaRequestOwnerKind,
  MediaRequestPriority, MediaRequestStatus, CalloutEvidence, PublicationGate,
  MediaAttachment, QuestionTags, PracticalConceptTags, PracticalDifficulty, PracticalCommon,
} from './contentControl.ts'
import {
  MEDIA_REQUEST_MEDIA, MEDIA_REQUEST_KINDS, MEDIA_REQUEST_PRIORITIES, MEDIA_REQUEST_STATUSES,
} from './contentControl.ts'
import { DIFFICULTIES } from './qbank.ts'
import { ARTICLE_TEMPLATES, ARTICLE_TEMPLATE_IDS, canonicalTemplateId } from './articleTemplates.ts'
import { STATEMENT_RELATIONS, type ConceptAnnotation, type StatementRelationType } from './conceptGraph.ts'
import { optionalList } from './importSemantics.ts'
import { parseCardLines } from './decks.ts'

export interface ImportFieldDefinition {
  key: string
  label: string
  required?: boolean
  help: string
}

export interface ImportSchemaDefinition {
  noun: string
  fields: ImportFieldDefinition[]
  markdownExample: string
}

const common: ImportFieldDefinition[] = [
  { key: 'id', label: 'Canonical ID', help: 'Optional. Used to update an existing item when merge mode is enabled.' },
  { key: 'title', label: 'Title', required: true, help: 'The student-facing title or concise question label.' },
  { key: 'subject', label: 'Subject ID', required: true, help: 'Canonical subject ID such as cvs, resp, renal, neuro, or pharm.' },
  { key: 'status', label: 'Status', help: 'Draft, In review, Published, or Archived. Defaults to Draft.' },
  { key: 'owner', label: 'Owner', help: 'Author or team responsible for review.' },
]

export const IMPORT_SCHEMAS: Record<ContentKind, ImportSchemaDefinition> = {
  question: {
    noun: 'questions',
    fields: [
      ...common,
      { key: 'vignette', label: 'Question context / vignette', help: 'Clinical or academic context shown before the main question.' },
      { key: 'question', label: 'Question', required: true, help: 'The main question, kept separate from its context.' },
      { key: 'correct_answer', label: 'Correct answer', required: true, help: 'A, B, C, D, E, or F.' },
      ...(['A', 'B', 'C', 'D', 'E', 'F'] as const).flatMap((letter) => [
        { key: `answer_${letter.toLowerCase()}`, label: `Answer ${letter}`, help: `Answer option ${letter}. Blank optional answers are omitted.` },
        { key: `explanation_${letter.toLowerCase()}`, label: `Explanation ${letter}`, help: `Why answer ${letter} is correct or incorrect.` },
      ]),
      { key: 'topic', label: 'Topic', help: 'Canonical topic or blueprint heading.' },
      { key: 'subtopic', label: 'Subtopic', help: 'More specific curriculum location.' },
      { key: 'difficulty', label: 'Intended difficulty', help: 'Easy, Moderate, Hard, or Challenging.' },
      { key: 'question_type', label: 'Question type', help: 'What it tests — e.g. Pathophysiology, Diagnosis, Investigation, Treatment, Mechanism.' },
      { key: 'main_concept', label: 'Main concept(s)', help: 'The concept ID(s) this question primarily tests. At least one is expected.' },
      { key: 'module', label: 'Module ID(s)', help: 'Every module this question is applicable to, separated by |, ; or new lines.' },
      { key: 'clinical_relevance', label: 'Clinical relevance (0–1)', help: 'How clinically relevant the question is.' },
      { key: 'academic_relevance', label: 'Academic relevance (0–1)', help: 'How academically relevant the question is.' },
      { key: 'cognitive_effort_score', label: 'Cognitive effort score (0–1)', help: 'Fine-grained cognitive effort on a 0–1 scale (finer than the Low/Medium/High band below).' },
      { key: 'exam_weight_by_year', label: 'Exam weight by year', help: 'Per-year blueprint weight as "YEAR_ID=weight" entries, e.g. OMS_Y2=0.7 | OMS_Y3=0.5.' },
      { key: 'question_only_for', label: 'Restrict to years/universities', help: 'If set, the question ONLY applies to these year/university IDs, regardless of subject scope.' },
      { key: 'concept_ids', label: 'Concept IDs', help: 'Canonical concept IDs separated by |, semicolon, or new lines.' },
      { key: 'years', label: 'Relevant years', help: 'Year labels separated by |, semicolon, or new lines.' },
      { key: 'universities', label: 'Relevant universities', help: 'Canonical university IDs separated by |, semicolon, or new lines.' },
      { key: 'cognitive_effort', label: 'Cognitive effort', help: 'Low, Medium, or High.' },
      { key: 'setting', label: 'Academic / clinical', help: 'Academic, Clinical, or Both.' },
      { key: 'reasoning_level', label: 'Clinical reasoning level', help: 'Integer from 0 to 5.' },
      { key: 'inferred_difficulty', label: 'Psychometric difficulty', help: 'Estimated percent correct from 0 to 100.' },
      { key: 'exam_relevance', label: 'Exam relevance', help: 'Blueprint relevance from 0 to 10.' },
      { key: 'contextual_concept_ids', label: 'Contextual concept IDs', help: 'Concepts that do not receive mastery evidence.' },
      { key: 'library_ids', label: 'Related library IDs', help: 'Canonical article IDs.' },
      { key: 'resource_ids', label: 'Related resource IDs', help: 'Canonical resource IDs.' },
      { key: 'learning_objective', label: 'Learning objective', help: 'What a correct response demonstrates.' },
      { key: 'media_recommendations', label: 'Media requests', help: 'Admin-only. Assets this item still needs, one "### medium-or-kind · rest" block per asset, then "Purpose:", "Priority:" (required, strongly helpful, optional) and "Status:" (needed, planned, supplied, declined). Lead with image, audio or video to set the medium, or with a genre such as diagram or histology to imply an image.' },
      { key: 'source_citation', label: 'Source citation', help: 'Guideline, book, paper, or source URL.' },
      { key: 'attachments', label: 'Attachments', help: 'One "### image|audio|video · URL" block per item, then "Name:" and optionally "Mime:".' },
      { key: 'attached_image', label: 'Attached image', help: 'A single image URL shown with the stem.' },
      { key: 'author_notes', label: 'Author notes', help: 'Internal notes. Never shown to a student.' },
      { key: 'estimated_seconds', label: 'Estimated seconds', help: 'How long the item should take. Defaults to 90.' },
      { key: 'randomise_answers', label: 'Randomise answers', help: 'yes or no. Defaults to yes.' },
    ],
    markdownExample: `# Item\n\n## title\nPulmonary embolism: first action\n\n## subject\ncvs\n\n## status\nPublished\n\n## vignette\nA 34-year-old woman is acutely breathless six days after a caesarean section.\n\n## question\nWhat is your first action?\n\n## correct_answer\nA\n\n## answer_a\nGive oxygen and assess immediate threats\n\n## explanation_a\nTreat hypoxia while the diagnosis remains open.\n\n## answer_b\nWait for imaging before treatment\n\n## explanation_b\nThis delays treatment in a high-probability presentation.\n\n## topic\nVenous thromboembolism\n\n## subtopic\nSUB_PE\n\n## difficulty\nModerate\n\n## question_type\nDiagnosis\n\n## main_concept\nmed.concept.acute-coronary-syndrome\n\n## module\nCVS 01\n\n## clinical_relevance\n0.9\n\n## academic_relevance\n0.6\n\n## cognitive_effort_score\n0.7\n\n## cognitive_effort\nHigh\n\n## setting\nClinical\n\n## reasoning_level\n4\n\n## inferred_difficulty\n55\n\n## exam_relevance\n8\n\n## exam_weight_by_year\nHU_Y2=0.7 | HU_Y3=0.5\n\n## question_only_for\nHU_Y3\n\n## concept_ids\nmed.concept.stemi\n\n## contextual_concept_ids\nmed.concept.anion-gap\n\n## years\nYear 3\n\n## universities\nHU | ASU\n\n## library_ids\nhf-mgmt\n\n## resource_ids\nr-ng106\n\n## learning_objective\nRecognise and treat the immediate threat in suspected PE.\n\n## source_citation\nNICE NG158\n\n---\n\n# Item\n...`,
  },
  article: {
    noun: 'library articles',
    fields: [
      ...common,
      { key: 'topic', label: 'Library topic', required: true, help: 'Parent topic shown in the library navigator.' },
      { key: 'summary', label: 'Summary', required: true, help: 'Opening summary for the article.' },
      { key: 'sections', label: 'Sections', help: 'Named clinical sections. Start each with "### Heading" on its own line, then the section text. Common headings: Definition, Incidence, Pathophysiology, Pathology, Clinical Picture, Investigation, Treatment.' },
      { key: 'body', label: 'Article body (legacy)', help: 'Optional plain-text body used only if no sections are given.' },
      { key: 'hold_these', label: 'Hold these', help: 'High-yield points separated by new lines, |, or semicolons.' },
      { key: 'lose_the_mark', label: 'Where people lose the mark', help: 'Common traps separated by new lines, |, or semicolons.' },
      { key: 'universities', label: 'University IDs', help: 'All universities this article applies to, separated by |, ; or new lines (e.g. OMS | MMS).' },
      { key: 'university_notes', label: 'University-only notes', help: 'University-specific callouts, one per line as "OMS: note text". Rendered as a distinct in-article aside.' },
      { key: 'years', label: 'Year IDs', help: 'All years this article is applicable on (e.g. OMS_Y2).' },
      { key: 'module', label: 'Module ID(s)', help: 'Module(s) this article sits under.' },
      { key: 'subtopic', label: 'Subtopic ID', help: 'Subtopic ID (SUB_*).' },
      { key: 'microtopic', label: 'Microtopic ID', help: 'Microtopic ID (MIC_*).' },
      { key: 'template_id', label: 'Article template', help: `Which article template this follows: ${ARTICLE_TEMPLATE_IDS.join(', ')}. Sets the expected section headings.` },
      { key: 'archetype', label: 'Archetype', help: 'Derived from the template when omitted. One of condition, presentation, concept, anatomy, drug, skill, investigation, organism, emergency, public-health.' },
      { key: 'learner_stage', label: 'Learner stage', help: 'Who this is written for, e.g. "Years 1–3 foundation" or "Years 4–6 clinical".' },
      { key: 'high_yield', label: 'High-yield band', help: 'Core, High, or Supplementary. Defaults to Core.' },
      { key: 'primary_node_id', label: 'Canonical node ID', help: 'Primary placement in the canonical medical taxonomy (e.g. SYS-CVS-T01). Derived from the subject/topic crosswalk when omitted.' },
      { key: 'secondary_node_ids', label: 'Secondary node IDs', help: 'Other valid canonical placements across the four views, separated by |, ; or new lines.' },
      { key: 'media', label: 'Media', help: 'One "### image|video|audio · URL" block per item, then "Caption:", "Alt:", "Rights:", "Necessity:", and optionally "Anchor:" with the exact phrase it explains (plus "Anchor block:" — body, summary, hold, or trap). Incomplete items are held back unless you add "Release without review: yes".' },
      { key: 'annotations', label: 'Statement annotations', help: 'One "### relation · conceptId" block per annotation, then "Quote:" with the exact words as they appear in the article, "Block:" (summary, body, hold, or trap), and optionally "Id:". The quote must occur verbatim in that block.' },
      { key: 'image_recommendations', label: 'Image recommendations', help: 'Admin-only. One "### kind · brief" block per visual, then "Purpose:", "Priority:" (required, strongly helpful, optional), "Status:" (needed, planned, supplied, declined), and optionally "Section:", "Block:", "Anchor:", "Source direction:", "Rights:", "Notes:", "Media id:". Never shown to students.' },
      { key: 'media_recommendations', label: 'Media requests', help: 'Admin-only. Assets this item still needs, one "### medium-or-kind · rest" block per asset, then "Purpose:", "Priority:" (required, strongly helpful, optional) and "Status:" (needed, planned, supplied, declined). Lead with image, audio or video to set the medium, or with a genre such as diagram or histology to imply an image.' },
      { key: 'callout_evidence', label: 'Callout evidence', help: 'What makes a "Hold these" or "Where people lose the mark" line publishable. One "### exact callout text" block per line, then "Claims:", "Citations:", "Span:", "Reviewed by:", "Reviewed at:".' },
      { key: 'related_concepts', label: 'Related concepts', help: 'Concept IDs discussed by this article.' },
      { key: 'related_articles', label: 'Related articles', help: 'Article IDs to offer as further reading, one per line as "articleId" or "articleId: why they connect".' },
      { key: 'question_ids', label: 'Question IDs', help: 'Canonical question IDs that test this article.' },
      { key: 'resource_ids', label: 'Resource IDs', help: 'Canonical resources that teach this article.' },
      { key: 'nanotopic', label: 'Nanotopic ID', help: 'Nanotopic ID (NAN_*).' },
      { key: 'arabic_title', label: 'Arabic title', help: 'Reviewed Arabic title. Leave blank only with a field note saying why.' },
      { key: 'aliases', label: 'Aliases', help: 'Alternate names and spelling variants. Aliases never create a second taxonomy node.' },
      { key: 'language', label: 'Language', help: 'Primary language of the prose, e.g. en.' },
      { key: 'time_sensitive', label: 'Time sensitivity', help: 'stable or time_sensitive. Anything that goes stale with guideline cycles is time_sensitive.' },
      { key: 'publication_gate', label: 'Publication gate', help: 'publishable, needs_evidence, faculty_review, conflicted, or excluded.' },
      { key: 'evidence_basis', label: 'Evidence basis', help: 'How this article is supported, one entry per line.' },
      { key: 'article_source_ids', label: 'Article-level source IDs', help: 'Resource IDs that support the article as a whole.' },
      { key: 'claim_ids', label: 'Claim IDs', help: 'Evidence claim IDs this article rests on.' },
      { key: 'span_ids', label: 'Span IDs', help: 'Stable evidence span IDs inside this article.' },
      { key: 'conflicts', label: 'Conflicts', help: 'Where sources disagree, one per line. Record the disagreement rather than choosing silently.' },
      { key: 'evidence_gaps', label: 'Evidence gaps', help: 'What is still unsupported, one per line. Required as a list even when empty — use [clear].' },
      { key: 'reviewer', label: 'Reviewer', help: 'Who checked the medical content.' },
      { key: 'final_publisher', label: 'Publisher', help: 'Who released it to students.' },
      { key: 'last_reviewed', label: 'Last reviewed', help: 'ISO date of the last review. Publishes the article\'s callouts under the callout policy.' },
      { key: 'review_due', label: 'Review due', help: 'ISO date this article must be re-checked by.' },
      { key: 'published_summary', label: 'Published summary', help: 'The student-facing summary, when it differs from the admin draft.' },
      { key: 'published_sections', label: 'Published sections', help: 'The evidence-gated student projection. Same "### Heading" format as sections.' },
      { key: 'field_notes', label: 'Field notes', help: 'Why a field is intentionally empty, one per line as "field: reason". Required for any blank the audit checks.' },
      { key: 'notes', label: 'Author notes', help: 'Internal notes. Never shown to a student.' },
      { key: 'reading_time', label: 'Reading time', help: 'Estimated minutes.' },
    ],
    markdownExample: `# Item\n\n## title\nPulmonary embolism\n\n## subject\ncvs\n\n## topic\nVenous thromboembolism\n\n## summary\nA common, treatable cause of acute breathlessness that must be confirmed and treated in parallel.\n\n## sections\n### Definition\nOcclusion of the pulmonary arterial tree, usually by thrombus embolising from a deep vein.\n### Incidence\nCommon; risk rises with immobility, surgery, malignancy, and pregnancy.\n### Pathophysiology\nMechanical obstruction and vasoactive mediators raise pulmonary vascular resistance and strain the right ventricle.\n### Clinical Picture\nPleuritic chest pain, breathlessness, tachycardia; massive PE causes haemodynamic collapse.\n### Investigation\nWells score guides D-dimer vs CTPA; ECG and ABG are supportive.\n### Treatment\nOxygen for hypoxia, anticoagulation, and thrombolysis for haemodynamic instability.\n\n## hold_these\nOxygen and ABC assessment come first.\nAnticoagulation should not wait in a high-probability patient without contraindications.\n\n## lose_the_mark\nOrdering D-dimer when CTPA is already indicated.\n\n## universities\nHU | ASU\n\n## university_notes\nHU: Kasr Alainy expects the two-level Wells score.\nASU: Ain Shams teaches the three-level Wells score.\n\n## years\nYear 3\n\n## module\nCVS 01\n\n## subtopic\nSUB_HF_MGMT\n\n## microtopic\nMIC_ECG_TERRITORIES\n\n## related_concepts\nmed.concept.heart-failure\n\n## question_ids\nq-hf-1\n\n## resource_ids\nr-ng106\n\n## reading_time\n9\n\n---\n\n# Item\n...`,
  },
  practical: {
    noun: 'practical items',
    fields: [
      ...common,
      { key: 'type', label: 'Practical type', required: true, help: 'OSCE station, Clinical case, Skills checklist, Lab interpretation, or Imaging interpretation.' },
      { key: 'duration', label: 'Duration', help: 'Expected minutes.' },
      { key: 'marks', label: 'Marks / decisions', help: 'Total marks or number of decisions.' },
      { key: 'difficulty', label: 'Difficulty', help: 'Easy, Moderate, Hard, or Challenging. Whole-item difficulty; a case or interpretation set may also set "Difficulty:" per question.' },
      { key: 'candidate_instructions', label: 'Candidate instructions', help: 'Student-facing station brief.' },
      { key: 'actor_opening', label: 'Actor opening', help: 'Opening statement for the actor.' },
      { key: 'actor_sections', label: 'Actor brief sections', help: 'One “Section: content” entry per line.' },
      { key: 'actor_flags', label: 'Actor flags', help: 'Behavioural flags separated by new lines. (OSCE station)' },
      { key: 'mark_scheme', label: 'Mark scheme', help: 'One “Section (marks): item” entry per line. (OSCE station)' },
      { key: 'decisions', label: 'Case decisions', help: 'Clinical-case decision points. Start each with "### Decision title", then optionally "Concept:", "Also:" and "Difficulty:", then "Q: question", options as "* option" (mark the right one "*= option") each followed by "Why: …", and "Rationale: …". (Clinical case)' },
      { key: 'debrief', label: 'Case debrief', help: 'Summary shown after a clinical case. (Clinical case)' },
      { key: 'lab_subtype', label: 'Lab / Imaging', help: 'Lab or Imaging — for interpretation sets.' },
      { key: 'lab_questions', label: 'Interpretation questions', help: 'Start each with "### Stem", then optionally "Concept:", "Also:" and "Difficulty:", then "Q: question", options as "* option" ("*= option" is correct) each followed by "Why: …", and "Explanation: …". "Media:" takes an image URL only — the runner renders it as an image, so audio and video show a broken image. (Lab/Imaging interpretation)' },
      { key: 'main_concept', label: 'Main concept(s)', help: 'The concept ID(s) this item primarily teaches.' },
      { key: 'concept_ids', label: 'Concept IDs', help: 'Concepts the item also assesses, separated by |, ; or new lines.' },
      { key: 'contextual_concept_ids', label: 'Contextual concept IDs', help: 'Concepts the scenario needs but does not assess. These receive no mastery evidence.' },
      { key: 'learning_objective', label: 'Learning objective', help: 'What a student who passes this item has demonstrated.' },
      { key: 'media_needed', label: 'Media needed', help: 'Admin-only. Assets this item still needs. One "### image|audio|video · question heading" block per asset, then "Brief:", "Purpose:", "Priority:" (required, strongly helpful, optional), "Status:" (needed, planned, supplied, declined), and optionally "Source direction:", "Rights:", "Notes:". Never shown to a student and never rendered as media.' },
      { key: 'media_recommendations', label: 'Media requests', help: 'Admin-only. Assets this item still needs, one "### medium-or-kind · rest" block per asset, then "Purpose:", "Priority:" (required, strongly helpful, optional) and "Status:" (needed, planned, supplied, declined). Lead with image, audio or video to set the medium, or with a genre such as diagram or histology to imply an image.' },
      { key: 'references', label: 'Read around it', help: 'Resource references separated by new lines.' },
    ],
    markdownExample: `# One file can mix every practical type — separate items with ---\n\n# Item\n\n## title\nHistory: chest pain in a 54-year-old\n\n## subject\ncvs\n\n## type\nOSCE station\n\n## duration\n8\n\n## difficulty\nModerate\n\n## candidate_instructions\nTake a focused history and present your differential.\n\n## actor_opening\nIt came on when I was carrying shopping upstairs.\n\n## actor_sections\nWho you are: Daniel Rossi, 54, self-employed builder.\nRadiation: Down my left arm and into my jaw.\n\n## actor_flags\nIf asked about smoking, admit to 20 a day for 30 years.\n\n## mark_scheme\nOpening and structure (15): Introduces self and confirms identity\nPain characterisation (25): Establishes site, onset, character and radiation\n\n## main_concept\nCON-CVS-EXAMPLE\n\n---\n\n# Item\n\n## title\nAcute central chest pain\n\n## subject\ncvs\n\n## type\nClinical case\n\n## decisions\n### Immediate action\nConcept: CON-CVS-EXAMPLE\nDifficulty: Moderate\nQ: What is your first step?\n*= Give aspirin and arrange an ECG\nWhy: Both are time-critical and neither waits on a confirmed diagnosis.\n* Send home with analgesia\nWhy: Chosen by students who treat a normal first troponin as reassurance.\nRationale: Early ECG and aspirin are time-critical in suspected ACS.\n\n## debrief\nThe case rewards early recognition and treatment of immediate threats.\n\n## media_needed\n### image · Immediate action\nBrief: 12-lead ECG showing 2 mm ST elevation in II, III and aVF\nPurpose: The decision cannot be made from the text alone.\nPriority: required\nStatus: needed\n\n---\n\n# Item\n\n## title\nChest X-ray basics\n\n## subject\nresp\n\n## type\nImaging interpretation\n\n## lab_subtype\nImaging\n\n## lab_questions\n### Consolidation vs effusion\nConcept: CON-RES-EXAMPLE\nDifficulty: Easy\nQ: What does the blunted costophrenic angle indicate?\n*= A pleural effusion\nWhy: Fluid tracks up the chest wall and produces a meniscus.\n* Lobar consolidation\nWhy: Picked by students who read any lower-zone opacity as consolidation.\nExplanation: A meniscus and blunted angle indicate fluid, not consolidation.\n\n---\n\n# Item\n\n## title\nCardiovascular examination\n\n## subject\ncvs\n\n## type\nSkills checklist\n\n## duration\n8\n\n## marks\n20`,
  },
  resource: {
    noun: 'resources',
    fields: [
      ...common,
      { key: 'type', label: 'Resource type', required: true, help: 'Book, Video, Guideline, Deck, or Article.' },
      { key: 'source', label: 'Source', required: true, help: 'Publisher, institution, or author.' },
      { key: 'url', label: 'Resource URL', help: 'Direct link or internal asset URL.' },
      { key: 'year', label: 'Publication year', help: 'Four-digit year.' },
      { key: 'topics', label: 'Tagged topics', help: 'Topic/subtopic IDs or titles this resource covers, separated by |, ; or new lines. Solving questions on this resource pulls in these topics.' },
      { key: 'chapter', label: 'Chapters', help: 'One or more chapters this resource covers, separated by |, ; or new lines (Files live in the Files tab, Videos in the Videos tab).' },
      { key: 'module_ids', label: 'Module IDs', help: 'Module IDs this resource serves (e.g. CVS 01), separated by |, ; or new lines.' },
      { key: 'included_concepts', label: 'Included concepts', help: 'Concept IDs this resource covers. Each concept is auto-updated to approve this resource. Add precise page/timestamp deep-links in the resource editor.' },
      { key: 'included_articles', label: 'Included library articles', help: 'Library article IDs this resource supports.' },
      { key: 'concept_locations', label: 'Concept deep-links', help: 'Pin concepts to a precise spot, one per line as "conceptId | page|line|slide|timestamp | locator", e.g. med.concept.heart-failure | page | 142.' },
      { key: 'universities', label: 'University IDs', help: 'Universities this resource belongs to, separated by |, ; or new lines.' },
      { key: 'years', label: 'Year IDs', help: 'Years this resource is used in, e.g. HU_Y2 | HU_Y3.' },
      { key: 'description', label: 'Description', help: 'What the resource teaches and why it is relevant.' },
    ],
    markdownExample: `# Item\n\n## title\nNICE NG158 · Venous thromboembolic diseases\n\n## subject\ncvs\n\n## type\nGuideline\n\n## source\nNICE\n\n## url\nhttps://www.nice.org.uk/guidance/ng158\n\n## year\n2026\n\n## topics\nTPC_HF\nSUB_HF_MGMT\n\n## chapter\nVenous thromboembolism\nHeart failure\n\n## module_ids\nCVS 01\n\n## included_concepts\nmed.concept.loop-diuretics\nmed.concept.heart-failure\n\n## included_articles\nhf-mgmt\n\n## concept_locations\nmed.concept.heart-failure | page | 142\nmed.concept.loop-diuretics | timestamp | 3:20\n\n## description\nDiagnosis and initial management of suspected pulmonary embolism.`,
  },
  deck: {
    noun: 'flashcard decks',
    fields: [
      ...common,
      { key: 'description', label: 'Description', help: 'What this deck covers.' },
      { key: 'cards', label: 'Cards', required: true, help: 'One card per line, as "front | back". The text before the first | is the question side; everything after it is the answer side. A line with no | is not a card and is skipped.' },
    ],
    markdownExample: `# Item\n\n## title\nCVS: Coronary anatomy\n\n## subject\ncvs\n\n## description\nQuick-fire recall for the major coronary vessels.\n\n## cards\nAorta | Largest artery in the body\nLAD | Supplies the anterior wall of the left ventricle\nRCA | Supplies the SA node in most people`,
  },
}

import { slugify } from './subjectsImport.ts'

export function splitImportList(value = '') {
  return value.split(/\r?\n|\||;/).map((item) => item.trim()).filter(Boolean)
}

/**
 * Parse a "### Heading" delimited block into named article sections.
 *
 * `idPrefix` is passed for real article sections, and makes each id
 * `<article-id>-<heading-slug>` — the convention the shipped articles already
 * use. It matters because evidence spans address a section by id: with the
 * positional `sec-N` fallback, inserting one section renumbers every section
 * after it, and each span silently starts pointing at the wrong prose. A
 * heading-derived id survives insertion, reordering and re-import.
 *
 * The other callers parse "### …" blocks that are lists rather than sections
 * (media, attachments, annotations, callouts), where nothing addresses the id
 * and repeated headings are legitimate, so they keep the positional fallback.
 */
export function parseSections(value = '', idPrefix = ''): Array<{ id: string; heading: string; body: string }> {
  if (!value.trim()) return []
  const out: Array<{ id: string; heading: string; body: string }> = []
  const used = new Set<string>()
  const idFor = (heading: string, index: number) => {
    if (!idPrefix) return `sec-${index}`
    const slug = slugify(heading) || `section-${index}`
    let id = `${idPrefix}-${slug}`
    // Two sections may legitimately share a heading; the id still has to be
    // unique or a span could not say which of them it belongs to.
    for (let n = 2; used.has(id); n++) id = `${idPrefix}-${slug}-${n}`
    used.add(id)
    return id
  }
  for (const raw of value.split(/\r?\n/)) {
    const heading = raw.match(/^###\s+(.*)/)
    if (heading) out.push({ id: idFor(heading[1].trim(), out.length), heading: heading[1].trim(), body: '' })
    else if (out.length) out[out.length - 1].body += (out[out.length - 1].body ? '\n' : '') + raw
    else if (raw.trim()) out.push({ id: idFor('', out.length), heading: '', body: raw })
  }
  return out.map((s) => ({ ...s, body: s.body.trim() })).filter((s) => s.heading || s.body)
}

/**
 * Split on new lines only.
 *
 * Prose lists cannot use `splitImportList`, which treats "|" and ";" as
 * separators. The structured practical blocks carry sentences containing both;
 * so do `hold_these` and `lose_the_mark`, where a semicolon inside a teaching
 * point was silently cutting it into two half-sentences — and, because callout
 * evidence keys on the exact text, quietly detaching that line from its
 * evidence.
 */
const importLines = (value = '') => value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)

export const PRACTICAL_TYPES = ['OSCE station', 'Clinical case', 'Skills checklist', 'Lab interpretation', 'Imaging interpretation'] as const
export type PracticalType = (typeof PRACTICAL_TYPES)[number]

/** Parse "Label: content" lines into an actor brief. */
export function parseActorSections(value = ''): ActorBriefSectionDraft[] {
  return importLines(value)
    .map((line, index) => {
      const [label, ...rest] = line.split(':')
      return { id: `actor-imp-${index}`, label: label.trim(), content: rest.join(':').trim() }
    })
    .filter((section) => section.label && section.content)
}

/** Parse "Section (marks): item" lines, grouping repeated section titles. */
export function parseMarkSections(value = ''): PracticalMarkSectionDraft[] {
  const sections: PracticalMarkSectionDraft[] = []
  importLines(value).forEach((line, index) => {
    const match = line.match(/^(.*?)\s*(?:\((\d+)\))?\s*:\s*(.+)$/)
    if (!match) return
    const title = match[1].trim()
    const text = match[3].trim()
    if (!title || !text) return
    const marks = Number(match[2] ?? '')
    let section = sections.find((entry) => entry.title === title)
    if (!section) {
      section = { id: `mark-imp-${sections.length}`, title, marks: Number.isFinite(marks) ? marks : 0, items: [] }
      sections.push(section)
    } else if (Number.isFinite(marks) && !section.marks) {
      section.marks = marks
    }
    section.items.push({ id: `mark-item-imp-${index}`, text })
  })
  return sections
}

const MEDIA_TYPES = ['image', 'video', 'audio'] as const
const ANCHOR_BLOCKS = ['body', 'summary', 'hold', 'trap'] as const

/**
 * Parse "### type · url" blocks into article media.
 *
 * An `Anchor:` line pins the item to a phrase in the article, which the reader
 * makes pressable. Without one the item belongs to the article as a whole.
 */
export function parseArticleMedia(value = ''): ArticleMediaRecord[] {
  return parseSections(value)
    .map((section, index) => {
      const [rawType, ...rest] = section.heading.split(/[|·]/)
      const type = rawType.trim().toLocaleLowerCase()
      const url = rest.join('·').trim()
      const labelled = (label: string) =>
        importLines(section.body).find((line) => new RegExp(`^${label}\\s*:`, 'i').test(line))?.replace(new RegExp(`^${label}\\s*:\\s*`, 'i'), '').trim() ?? ''
      const quote = labelled('Anchor')
      const rawBlock = labelled('Anchor block').toLocaleLowerCase()
      const release = labelled('Release without review').toLocaleLowerCase()
      return {
        ...(/^(yes|true|1)$/.test(release) ? { releaseWithoutReview: true } : {}),
        id: `media-imp-${index}`,
        type: (MEDIA_TYPES as readonly string[]).includes(type) ? type as ArticleMediaRecord['type'] : 'image',
        url,
        caption: labelled('Caption'),
        altText: labelled('Alt'),
        rights: labelled('Rights'),
        necessity: labelled('Necessity'),
        exactSource: labelled('Source') || undefined,
        locator: labelled('Locator') || undefined,
        ...(quote ? { anchor: { quote, block: (ANCHOR_BLOCKS as readonly string[]).includes(rawBlock) ? rawBlock as NonNullable<ArticleMediaRecord['anchor']>['block'] : 'body' } } : {}),
      }
    })
    .filter((item) => item.url)
}

/** Parse "### type · url" blocks into question attachments. */
export function parseAttachments(value = ''): MediaAttachment[] {
  return parseSections(value)
    .map((section, index) => {
      const [rawType, ...rest] = section.heading.split(/[|·]/)
      const type = rawType.trim().toLocaleLowerCase()
      const url = rest.join('·').trim()
      const name = labelledValue(section.body, 'Name')
      const mimeType = labelledValue(section.body, 'Mime')
      return {
        id: labelledValue(section.body, 'Id') || `attach-imp-${index}`,
        type: (MEDIA_TYPES as readonly string[]).includes(type) ? type as MediaAttachment['type'] : 'image',
        name: name || url.split('/').pop() || `Attachment ${index + 1}`,
        url,
        ...(mimeType ? { mimeType } : {}),
      }
    })
    .filter((attachment) => attachment.url)
}

/** Read a "Label: value" line out of a `### heading` block's body. */
function labelledValue(body: string, label: string): string {
  const matcher = new RegExp(`^${label}\\s*:\\s*(.*)$`, 'i')
  for (const line of importLines(body)) {
    const match = line.match(matcher)
    if (match) return match[1].trim()
  }
  return ''
}

/** A stable ID derived from its own content, so re-import is idempotent. */
function derivedId(prefix: string, ...parts: string[]): string {
  let hash = 2166136261
  const seed = parts.join('\u0000')
  for (let index = 0; index < seed.length; index++) hash = Math.imul(hash ^ seed.charCodeAt(index), 16777619)
  return `${prefix}-${(hash >>> 0).toString(36)}`
}

/**
 * The exact text of one article block, as an author would quote it.
 *
 * Annotation quotes are validated against this, so an author cannot tag a
 * sentence that is not in the article — which would highlight nothing and read
 * as a silent failure.
 */
export function articleBlockText(values: Record<string, string>, block: ConceptAnnotation['block']): string {
  if (block === 'summary') return values.summary ?? ''
  if (block === 'hold') return values.hold_these ?? ''
  if (block === 'trap') return values.lose_the_mark ?? ''
  return [values.sections ?? '', values.published_sections ?? '', values.body ?? ''].join('\n')
}

const ANNOTATION_BLOCKS = ['summary', 'body', 'hold', 'trap'] as const

/**
 * Parse "### relation · conceptId" blocks into statement annotations.
 *
 * The quote is the anchor, exactly as `ArticleMediaAnchor` already does for
 * media: an offset would break the moment the prose reflowed, but a verbatim
 * quote either matches or is reported.
 */
export function parseAnnotations(value = ''): ConceptAnnotation[] {
  return parseSections(value)
    .map((section) => {
      const [rawRelation, ...rest] = section.heading.split(/[|·]/)
      const relation = rawRelation.trim() as StatementRelationType
      const conceptId = rest.join('·').trim()
      const quote = labelledValue(section.body, 'Quote')
      const rawBlock = labelledValue(section.body, 'Block').toLocaleLowerCase()
      const block = (ANNOTATION_BLOCKS as readonly string[]).includes(rawBlock) ? rawBlock as ConceptAnnotation['block'] : 'body'
      const id = labelledValue(section.body, 'Id') || derivedId('ann', conceptId, relation, quote)
      return { id, quote, conceptId, relation, block }
    })
    .filter((annotation) => annotation.quote && annotation.conceptId)
}

/** Everything wrong with one annotation, in the author's language. */
export function annotationErrors(annotations: ConceptAnnotation[], values: Record<string, string>): string[] {
  const errors: string[] = []
  const seen = new Set<string>()
  annotations.forEach((annotation, index) => {
    const where = `Annotation ${index + 1} (${annotation.conceptId || 'no concept'})`
    if (!(STATEMENT_RELATIONS as readonly string[]).includes(annotation.relation)) {
      errors.push(`${where}: "${annotation.relation}" is not a relation type`)
    }
    if (!articleBlockText(values, annotation.block).includes(annotation.quote)) {
      errors.push(`${where}: the quote "${annotation.quote.slice(0, 48)}${annotation.quote.length > 48 ? '…' : ''}" does not appear in the ${annotation.block} block`)
    }
    if (seen.has(annotation.id)) errors.push(`${where}: duplicate annotation id ${annotation.id}`)
    seen.add(annotation.id)
  })
  return errors
}

/**
 * Parse "### medium-or-kind · rest" blocks into admin-only media requests.
 *
 * One parser for all three surfaces, because the three authoring conventions
 * that grew up separately are the same block with the first heading token used
 * differently. Articles lead with a genre — `### histology · A muscular artery`
 * — and practicals lead with a medium and put the brief on its own line —
 * `### audio · Station 2` plus `Brief: …`. Both are accepted:
 *
 * - a leading `image`, `audio` or `video` sets the medium, and the rest of the
 *   heading names where in the owner the asset belongs;
 * - a leading genre sets the kind and implies an image, and the rest of the
 *   heading is the brief.
 *
 * A `Brief:` line always wins over the heading, so a genre-led block can still
 * name a section.
 */
export function parseMediaRequests(
  value = '',
  ownerId = '',
  ownerKind: MediaRequestOwnerKind = 'article',
): MediaRequest[] {
  return parseSections(value)
    .map((section, index) => {
      const [rawLead, ...rest] = section.heading.split(/[|·]/)
      const lead = rawLead.trim().toLocaleLowerCase()
      const tail = rest.join('·').trim()
      const leadIsMedium = (MEDIA_REQUEST_MEDIA as readonly string[]).includes(lead)
      const labelledBrief = labelledValue(section.body, 'Brief')
      const brief = labelledBrief || (leadIsMedium ? tail : tail)
      const priority = labelledValue(section.body, 'Priority').toLocaleLowerCase()
      const status = labelledValue(section.body, 'Status').toLocaleLowerCase()
      const rawBlock = labelledValue(section.body, 'Block').toLocaleLowerCase()
      const rawKind = labelledValue(section.body, 'Kind').toLocaleLowerCase()
      const anchorQuote = labelledValue(section.body, 'Anchor')
      // A medium-led heading names a location; a genre-led heading names the brief.
      const sectionName = labelledValue(section.body, 'Section') || (leadIsMedium && labelledBrief ? tail : '')
      const sourceDirection = labelledValue(section.body, 'Source direction')
      const rightsNotes = labelledValue(section.body, 'Rights')
      const notes = labelledValue(section.body, 'Notes')
      const mediaId = labelledValue(section.body, 'Media id')
      const kind = rawKind || (leadIsMedium ? '' : lead)
      return {
        id: labelledValue(section.body, 'Id') || derivedId('mrq', ownerId, brief, String(index)),
        ownerId,
        ownerKind,
        medium: (leadIsMedium ? lead : 'image') as MediaRequestMedium,
        kind: (MEDIA_REQUEST_KINDS as readonly string[]).includes(kind) ? kind as MediaRequestKind : 'other',
        brief,
        teachingPurpose: labelledValue(section.body, 'Purpose'),
        priority: (MEDIA_REQUEST_PRIORITIES as readonly string[]).includes(priority) ? priority as MediaRequestPriority : 'strongly helpful',
        status: (MEDIA_REQUEST_STATUSES as readonly string[]).includes(status) ? status as MediaRequestStatus : 'needed',
        ...(sectionName ? { section: sectionName } : {}),
        ...((ANNOTATION_BLOCKS as readonly string[]).includes(rawBlock) ? { block: rawBlock as MediaRequest['block'] } : {}),
        ...(anchorQuote ? { anchorQuote } : {}),
        ...(sourceDirection ? { sourceDirection } : {}),
        ...(rightsNotes ? { rightsNotes } : {}),
        ...(notes ? { notes } : {}),
        ...(mediaId ? { mediaId } : {}),
      }
    })
    .filter((request) => request.brief)
}

/** Parse "### exact callout text" blocks into per-callout evidence. */
export function parseCalloutEvidence(value = ''): Record<string, CalloutEvidence> {
  const out: Record<string, CalloutEvidence> = {}
  for (const section of parseSections(value)) {
    const text = section.heading.trim()
    if (!text) continue
    const claimIds = splitImportList(labelledValue(section.body, 'Claims'))
    const citationIds = splitImportList(labelledValue(section.body, 'Citations'))
    const spanId = labelledValue(section.body, 'Span')
    const reviewedBy = labelledValue(section.body, 'Reviewed by')
    const reviewedAt = labelledValue(section.body, 'Reviewed at')
    out[text] = {
      ...(claimIds.length ? { claimIds } : {}),
      ...(citationIds.length ? { citationIds } : {}),
      ...(spanId ? { spanId } : {}),
      ...(reviewedBy ? { reviewedBy } : {}),
      ...(reviewedAt ? { reviewedAt } : {}),
    }
  }
  return out
}

/** Parse "field: reason" lines into the intentional-empty notes the audit reads. */
export function parseFieldNotes(value = ''): Record<string, string> {
  const out: Record<string, string> = {}
  for (const line of importLines(value)) {
    const [field, ...rest] = line.split(':')
    const reason = rest.join(':').trim()
    if (field.trim() && reason) out[field.trim()] = reason
  }
  return out
}

/**
 * Parse "articleId" or "articleId: why they connect" lines.
 *
 * The reason belongs to the pair, so it is stored in `fieldNotes` under a key
 * naming the other article rather than in a parallel array that could drift out
 * of step with the IDs.
 */
export function parseRelatedArticles(value = ''): { ids: string[]; reasons: Record<string, string> } {
  const ids: string[] = []
  const reasons: Record<string, string> = {}
  for (const line of importLines(value)) {
    const [rawId, ...rest] = line.split(':')
    const id = rawId.trim()
    if (!id || ids.includes(id)) continue
    ids.push(id)
    const reason = rest.join(':').trim()
    if (reason) reasons[`relatedArticle:${id}`] = reason
  }
  return { ids, reasons }
}

type BlockField = 'context' | 'question' | 'rationale' | 'explanation' | 'media' | 'concept' | 'also' | 'difficulty'

/** `why` is not a part of the block — it belongs to the option above it. */
type BlockTarget = BlockField | 'why'

const BLOCK_LABELS: Record<string, BlockTarget> = {
  q: 'question', rationale: 'rationale', explanation: 'explanation', media: 'media',
  why: 'why', concept: 'concept', also: 'also', difficulty: 'difficulty',
}

const BLOCK_LABEL_PATTERN = /^(Q|Rationale|Explanation|Media|Why|Concept|Also|Difficulty)\s*:\s*(.*)$/i

/**
 * Labels whose value is a single line: an ID, a band, a URL.
 *
 * Prose labels wrap, so they keep absorbing lines until the next label. These do
 * not, and must not: an author who writes `Difficulty: Moderate` and then a line
 * of case narrative means the narrative to be narrative. Letting a scalar label
 * swallow it produced a difficulty of "Moderate He tells you he is thirsty",
 * which matched no band and silently went untagged.
 */
const SCALAR_BLOCK_LABELS = new Set<BlockTarget>(['concept', 'also', 'difficulty', 'media'])

/** Read an authored difficulty, on the same four-band scale the question bank uses. */
function practicalDifficulty(value: string): PracticalDifficulty | undefined {
  return DIFFICULTIES.find((tier) => tier.toLowerCase() === value.trim().toLowerCase())
}

/**
 * Parse one `### heading` block into its labelled parts.
 *
 * A prose label's value runs until the next label or option line, so
 * `Rationale:` and `Q:` may wrap across several lines without their
 * continuation falling back into the block's context. A scalar label
 * (`SCALAR_BLOCK_LABELS`) takes only its own line. Anything before the first
 * label, or after a scalar one, is the block's context.
 *
 * `Why:` is the exception: it belongs to the option immediately above it rather
 * than to the block, which is how one explanation is written per option. A
 * `Why:` with no option above it has nothing to attach to and is dropped — the
 * batch validator reports it as an option missing its explanation.
 */
function parseLabelledBlock(body = '') {
  const parts: Record<BlockField, string[]> = { context: [], question: [], rationale: [], explanation: [], media: [], concept: [], also: [], difficulty: [] }
  const answers: PracticalAnswerDraft[] = []
  let current: BlockTarget = 'context'
  const write = (target: BlockTarget, text: string) => {
    if (target !== 'why') {
      parts[target].push(text)
      return
    }
    const option = answers[answers.length - 1]
    if (option) option.explanation = [option.explanation, text].filter(Boolean).join(' ')
  }
  importLines(body).forEach((line, index) => {
    const option = line.match(/^\*(=)?\s+(.+)$/)
    if (option) {
      answers.push({ id: `pa-imp-${index}`, text: option[2].trim(), explanation: '', correct: Boolean(option[1]) })
      current = 'context'
      return
    }
    const label = line.match(BLOCK_LABEL_PATTERN)
    if (label) {
      const target = BLOCK_LABELS[label[1].toLowerCase()]
      if (label[2].trim()) write(target, label[2].trim())
      // A scalar label takes its own line and nothing more, so the prose after
      // it goes back to being context rather than being absorbed.
      current = SCALAR_BLOCK_LABELS.has(target) ? 'context' : target
      return
    }
    write(current, line)
  })
  return {
    context: parts.context.join('\n').trim(),
    question: parts.question.join(' ').trim(),
    rationale: parts.rationale.join(' ').trim(),
    explanation: parts.explanation.join(' ').trim(),
    mediaUrl: parts.media.join('').trim(),
    conceptId: parts.concept.join(' ').trim(),
    secondaryConceptIds: splitImportList(parts.also.join('\n')),
    difficulty: practicalDifficulty(parts.difficulty.join(' ')),
    answers,
  }
}

/** The concept and difficulty tags a decision or interpretation question carries. */
function blockTags(block: ReturnType<typeof parseLabelledBlock>) {
  return {
    ...(block.conceptId ? { conceptId: block.conceptId } : {}),
    ...(block.secondaryConceptIds.length ? { secondaryConceptIds: block.secondaryConceptIds } : {}),
    ...(block.difficulty ? { difficulty: block.difficulty } : {}),
  }
}

/** Parse "### title / Q: / * options / Rationale:" blocks into case decisions. */
export function parseDecisions(value = ''): ClinicalDecisionDraft[] {
  return parseSections(value)
    .map((section, index) => {
      const block = parseLabelledBlock(section.body)
      return { id: `dec-imp-${index}`, title: section.heading, context: block.context, question: block.question, answers: block.answers, rationale: block.rationale, ...blockTags(block) }
    })
    .filter((decision) => decision.question && decision.answers.length)
}

/** Parse "### stem / Q: / * options / Explanation:" blocks into interpretation questions. */
export function parseLabQuestions(value = ''): LabQuestionDraft[] {
  return parseSections(value)
    .map((section, index) => {
      const block = parseLabelledBlock(section.body)
      // The heading is the stem; any prose before `Q:` extends it.
      const context = [section.heading, block.context].filter(Boolean).join('\n')
      return { id: `lab-imp-${index}`, context, question: block.question, mediaUrl: block.mediaUrl, answers: block.answers, explanation: block.explanation, ...blockTags(block) }
    })
    .filter((question) => question.question && question.answers.length)
}


/**
 * Build the runnable practical record.
 *
 * `PracticalRunner` reads `practicalData`, not the flat `fields` strings, so an
 * imported practical is only usable once this returns the right shape.
 */
export function practicalDataFrom(values: Record<string, string>, ownerId = ''): PracticalAuthoringData {
  const type = values.type?.trim()
  const learningObjective = values.learning_objective?.trim()
  // Each of these is `undefined` when its column is absent, so an update keeps
  // what the practical already had. `materialiseNewItem` lays down the empty
  // shape a new practical needs. The `emptyPracticalCommon()` spread used to do
  // that here, on updates too, which wiped a station's references and its whole
  // concept tagging whenever an author corrected one line of it.
  const media = values.media_recommendations || values.media_needed
  const shared = {
    references: values.references?.trim() ? importLines(values.references) : undefined,
    conceptTags: practicalConceptTags(values),
    mediaRequests: media?.trim() ? parseMediaRequests(media, ownerId, 'practical') : undefined,
    ...(learningObjective ? { learningObjective } : {}),
  } as unknown as PracticalCommon
  // The format-carrying fields follow the same rule. `format` and `subtype` stay
  // eager because they are derived from `type`, which is a required column and
  // so is always restated; the content they carry is not.
  const only = <T>(key: string, parse: (value: string) => T) => values[key]?.trim() ? parse(values[key]) : undefined
  if (type === 'Clinical case') {
    return {
      ...shared,
      format: 'case',
      decisions: only('decisions', parseDecisions) as ClinicalDecisionDraft[],
      debrief: trimmed(values.debrief) as string,
    }
  }
  if (type === 'Lab interpretation' || type === 'Imaging interpretation') {
    const subtype = values.lab_subtype?.trim() === 'Imaging' || type === 'Imaging interpretation' ? 'Imaging' : 'Lab'
    return { ...shared, format: 'lab', subtype, questions: only('lab_questions', parseLabQuestions) as LabQuestionDraft[] }
  }
  // OSCE station and Skills checklist share the mark-scheme shape; a checklist
  // simply has no actor brief.
  const difficulty = practicalDifficulty(values.difficulty ?? '')
  return {
    ...shared,
    format: 'osce',
    candidateInstructions: trimmed(values.candidate_instructions) as string,
    actorOpening: trimmed(values.actor_opening) as string,
    actorSections: only('actor_sections', parseActorSections) as ActorBriefSectionDraft[],
    actorFlags: only('actor_flags', importLines) as string[],
    markSections: only('mark_scheme', parseMarkSections) as PracticalMarkSectionDraft[],
    ...(difficulty ? { difficulty } : {}),
  }
}

/** A trimmed value, or `undefined` when the cell was absent or blank. */
const trimmed = (value: string | undefined) => value?.trim() || undefined

/** What a practical assesses, kept apart from what it merely mentions. */
function practicalConceptTags(values: Record<string, string>): PracticalConceptTags {
  return {
    mainConceptIds: optionalList(values.main_concept) as string[],
    conceptIds: optionalList(values.concept_ids) as string[],
    contextualConceptIds: optionalList(values.contextual_concept_ids) as string[],
  }
}

/** Parse "YEAR_ID=weight | OTHER=weight" into a { yearId: number } map (0–1). */
export function parseWeightMap(value = ''): Record<string, number> {
  const out: Record<string, number> = {}
  value.split(/\r?\n|\||;/).forEach((pair) => {
    const [k, v] = pair.split('=').map((p) => p.trim())
    if (k && v !== undefined) {
      const n = Number(v)
      if (Number.isFinite(n)) out[k] = Math.min(1, Math.max(0, n))
    }
  })
  return out
}

const clamp01 = (value?: string) => {
  const n = Number(value)
  return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : undefined
}

export function validateImportRow(kind: ContentKind, values: Record<string, string>) {
  const errors = IMPORT_SCHEMAS[kind].fields.filter((field) => field.required && !values[field.key]?.trim()).map((field) => `${field.label} is required`)
  if (kind === 'question') {
    const answer = values.correct_answer?.trim().toUpperCase()
    if (answer && !/^[A-F]$/.test(answer)) errors.push('Correct answer must be A–F')
    if (answer && !values[`answer_${answer.toLowerCase()}`]?.trim()) errors.push(`Answer ${answer} is marked correct but has no text`)
  }
  if (kind === 'article') {
    const templateId = values.template_id?.trim()
    if (templateId && !ARTICLE_TEMPLATE_IDS.includes(canonicalTemplateId(templateId))) {
      errors.push(`Article template must be one of ${ARTICLE_TEMPLATE_IDS.join(', ')}`)
    }
    const archetype = values.archetype?.trim()
    if (archetype && !ARTICLE_TEMPLATES.some((template) => template.archetype === archetype)) {
      errors.push(`Archetype must be one of ${ARTICLE_TEMPLATES.map((template) => template.archetype).join(', ')}`)
    }
    // A media block with no URL is dropped, so say so rather than let it vanish.
    const mediaBlocks = parseSections(values.media).length
    const parsedMedia = parseArticleMedia(values.media).length
    if (mediaBlocks > parsedMedia) {
      errors.push(`${mediaBlocks - parsedMedia} media block${mediaBlocks - parsedMedia === 1 ? '' : 's'} have no URL after "### type ·" and would be dropped`)
    }
    // Annotations are validated against the article's own prose, so a quote that
    // does not exist is an error rather than an annotation that highlights
    // nothing. The concept ID itself is checked at commit, where the graph is.
    const annotationBlocks = parseSections(values.annotations).length
    const annotations = parseAnnotations(values.annotations)
    if (annotationBlocks > annotations.length) {
      const dropped = annotationBlocks - annotations.length
      errors.push(`${dropped} annotation block${dropped === 1 ? '' : 's'} lack a Quote: line or a concept ID after "### relation ·"`)
    }
    errors.push(...annotationErrors(annotations, values))

    const recommendationBlocks = parseSections(values.media_recommendations || values.image_recommendations).length
    const recommendations = parseMediaRequests(values.media_recommendations || values.image_recommendations)
    if (recommendationBlocks > recommendations.length) {
      const dropped = recommendationBlocks - recommendations.length
      errors.push(`${dropped} image recommendation${dropped === 1 ? '' : 's'} have no brief after "### kind ·"`)
    }
    recommendations.forEach((recommendation, index) => {
      if (!recommendation.teachingPurpose) errors.push(`Image recommendation ${index + 1} has no Purpose: line saying why prose is not enough`)
    })

    // Callout evidence keys on the exact callout text, so a typo would attach
    // evidence to a line that does not exist and silently fail to publish it.
    const calloutTexts = new Set([...importLines(values.hold_these), ...importLines(values.lose_the_mark)])
    Object.keys(parseCalloutEvidence(values.callout_evidence)).forEach((text) => {
      if (!calloutTexts.has(text)) errors.push(`Callout evidence names "${text.slice(0, 48)}${text.length > 48 ? '…' : ''}", which is not one of this article's Hold these or Where people lose the mark lines`)
    })

    const gate = values.publication_gate?.trim()
    if (gate && !['publishable', 'needs_evidence', 'faculty_review', 'conflicted', 'excluded'].includes(gate)) {
      errors.push('Publication gate must be publishable, needs_evidence, faculty_review, conflicted, or excluded')
    }
    const timeSensitive = values.time_sensitive?.trim()
    if (timeSensitive && !['stable', 'time_sensitive'].includes(timeSensitive)) {
      errors.push('Time sensitivity must be stable or time_sensitive')
    }
  }
  if (kind === 'practical') {
    const type = values.type?.trim()
    if (type && !PRACTICAL_TYPES.includes(type as PracticalType)) {
      errors.push(`Practical type must be one of ${PRACTICAL_TYPES.join(', ')}`)
    }
    const difficulty = values.difficulty?.trim()
    if (difficulty && !practicalDifficulty(difficulty)) {
      errors.push(`Difficulty must be one of ${DIFFICULTIES.join(', ')}`)
    }
    // An omitted column now reads as `undefined` rather than an empty list, so
    // these are optional-chained. The row is rejected either way — a practical
    // that names no decisions is as incomplete as one that names an empty set —
    // so which rows fail is unchanged.
    const data = practicalDataFrom(values)
    if (data.format === 'case') {
      if (!data.decisions?.length) errors.push('Clinical case needs at least one decision with a "Q:" line and "*" options')
      data.decisions?.forEach((decision, index) => {
        errors.push(...answerErrors(decision.answers, `Decision ${index + 1} (${decision.title || 'untitled'})`))
      })
    }
    if (data.format === 'lab') {
      if (!data.questions?.length) errors.push('Interpretation set needs at least one question with a "Q:" line and "*" options')
      data.questions?.forEach((question, index) => {
        errors.push(...answerErrors(question.answers, `Interpretation question ${index + 1}`))
      })
    }
    if (data.format === 'osce' && type === 'OSCE station' && !data.markSections?.length) {
      errors.push('OSCE station needs a mark scheme as "Section (marks): item" lines')
    }
    // A request that names a block nobody wrote points at nothing, and would be
    // fulfilled against a question that does not exist.
    const targets = new Set(parseSections(data.format === 'case' ? values.decisions : values.lab_questions).map((section) => section.heading.trim().toLowerCase()))
    data.mediaRequests?.forEach((request) => {
      const target = (request.section || 'station').trim().toLowerCase()
      if (target === 'station' || targets.has(target)) return
      errors.push(`Media request "${request.brief}" names "${request.section}", which is not a question in this item`)
    })
  }
  if (kind === 'deck') {
    if (parseCardLines(values.cards ?? '').length === 0) {
      errors.push('A deck needs at least one card, written as "front | back"')
    }
  }
  return errors
}

/**
 * Everything wrong with one question's options.
 *
 * An option with no `Why:` is the failure this is really for: it imports and
 * runs, and the student who picks it is told nothing. The runner shows an
 * explanation per option, so a blank one is a silently worse question rather
 * than a broken one.
 */
function answerErrors(answers: PracticalAnswerDraft[], where: string): string[] {
  const errors: string[] = []
  const correct = answers.filter((answer) => answer.correct).length
  if (correct === 0) errors.push(`${where} has no correct option marked with "*="`)
  if (correct > 1) errors.push(`${where} marks ${correct} options with "*=" — exactly one must be correct`)
  const unexplained = answers.filter((answer) => answer.text.trim() && !answer.explanation.trim()).length
  if (unexplained) errors.push(`${where} has ${unexplained} option(s) with no "Why:" line explaining the choice`)
  return errors
}

/**
 * Read a status column, distinguishing "not mentioned" from a real value.
 *
 * `undefined` when the column is absent or blank, so an update leaves the live
 * status alone; `materialiseNewItem` supplies `'Draft'` for a new record. This
 * used to default eagerly, which meant a partial update — a fixed summary, say —
 * silently un-published the article it touched.
 *
 * An unrecognised value is still `'Draft'`. That is a typo, not a silence.
 */
function normalizeStatus(value: string | undefined): ManagedContentItem['status'] | undefined {
  const status = trimmed(value)
  if (!status) return undefined
  return ['Draft', 'In review', 'Published', 'Archived'].includes(status) ? status as ManagedContentItem['status'] : 'Draft'
}

function numberInRange(value: string, fallback: number, min: number, max: number) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback
}

/**
 * The same clamp, but silent when the column is absent.
 *
 * A blank cell returns `undefined` so an update keeps the live number;
 * `materialiseNewItem` applies `fallback` to a new record. An unparseable value
 * still clamps to `fallback` — that is a typo, not a silence.
 */
function optionalNumberInRange(value: string | undefined, fallback: number, min: number, max: number) {
  return value?.trim() ? numberInRange(value.trim(), fallback, min, max) : undefined
}

function stableHash(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index++) hash = Math.imul(hash ^ value.charCodeAt(index), 16777619)
  return (hash >>> 0).toString(36)
}

export function importRowToContent(kind: ContentKind, values: Record<string, string>, rowKey: string): ManagedContentItem {
  const id = values.id?.trim() || `import-${kind}-${stableHash(`${values.title}-${rowKey}`)}`
  /** A column's value, or `undefined` when the row did not carry one. */
  const text = (key: string) => values[key]?.trim() || undefined
  const base: ManagedContentItem = {
    id,
    kind,
    title: values.title.trim(),
    subjectId: values.subject.trim().toLowerCase(),
    // `undefined`, not a default, when the row is silent — the same contract the
    // list columns keep through `optionalList`. `materialiseNewItem` fills these
    // in for a create; on an update they must survive untouched. Typed as the
    // concrete field because only a materialised record is ever stored, exactly
    // as `conceptFromRow` types its own optional `definition`.
    status: normalizeStatus(values.status) as ManagedContentItem['status'],
    owner: (values.owner?.trim() || undefined) as string,
    updatedAt: new Date().toISOString(),
    fields: {},
  }

  if (kind === 'question') {
    const labels: AnswerLabel[] = ['A', 'B', 'C', 'D', 'E', 'F']
    const answers: QuestionAnswerDraft[] = labels.map((label) => ({ label, text: values[`answer_${label.toLowerCase()}`]?.trim() ?? '', explanation: values[`explanation_${label.toLowerCase()}`]?.trim() ?? '' }))
    // `undefined` when the column is absent, so an update leaves the live value
    // alone; `materialiseNewItem` supplies the default a new question needs.
    // Every one of these used to be written on every row, so a partial update —
    // one that only revised a vignette — silently reset the whole blueprint
    // tagging: difficulty, effort, setting, reasoning level, exam relevance, and
    // every concept, year and university the question was scoped to.
    const enumValue = <T extends string>(value: string | undefined, allowed: readonly string[], fallback: T) =>
      value?.trim() ? (allowed.includes(value.trim()) ? value.trim() as T : fallback) : undefined
    const difficulty = enumValue<QuestionTags['intendedDifficulty']>(values.difficulty, ['Easy', 'Moderate', 'Hard', 'Challenging'], 'Moderate')
    // `answers` and `correctAnswer` stay eager: `question` and `correct_answer`
    // are required columns and the validator rejects a correct answer with no
    // text, so a row that reaches here has always restated them.
    return {
      ...base,
      title: values.question?.trim() || base.title,
      fields: {
        Topic: values.topic ?? '', Vignette: values.vignette ?? '',
        Explanation: answers.find((answer) => answer.label === values.correct_answer?.toUpperCase())?.explanation ?? '',
        ...(difficulty ? { Difficulty: difficulty } : {}),
      },
      questionData: {
        attachments: (values.attachments?.trim() ? parseAttachments(values.attachments) : undefined) as MediaAttachment[],
        correctAnswer: (/^[A-F]$/.test(values.correct_answer?.toUpperCase()) ? values.correct_answer.toUpperCase() : 'A') as AnswerLabel,
        answers,
        attachedImage: text('attached_image') as string,
        libraryIds: optionalList(values.library_ids) as string[],
        resourceIds: optionalList(values.resource_ids) as string[],
        tags: {
          module: text('module') as string,
          topic: text('topic') as string,
          subtopic: text('subtopic') as string,
          conceptIds: optionalList(values.concept_ids) as string[],
          years: optionalList(values.years) as string[],
          universityIds: optionalList(values.universities) as string[],
          cognitiveEffort: enumValue<'Low' | 'Medium' | 'High'>(values.cognitive_effort, ['Low', 'Medium', 'High'], 'Medium') as 'Low' | 'Medium' | 'High',
          setting: enumValue<'Academic' | 'Clinical' | 'Both'>(values.setting, ['Academic', 'Clinical', 'Both'], 'Both') as 'Academic' | 'Clinical' | 'Both',
          intendedDifficulty: difficulty as QuestionTags['intendedDifficulty'],
          clinicalReasoningLevel: optionalNumberInRange(values.reasoning_level, 2, 0, 5) as number,
          inferredDifficulty: optionalNumberInRange(values.inferred_difficulty, 50, 0, 100) as number,
          examRelevance: optionalNumberInRange(values.exam_relevance, 5, 0, 10) as number,
          contextualConceptIds: optionalList(values.contextual_concept_ids) as string[],
          questionType: text('question_type'),
          mainConceptIds: optionalList(values.main_concept),
          moduleIds: optionalList(values.module),
          clinicalRelevance: clamp01(values.clinical_relevance),
          academicRelevance: clamp01(values.academic_relevance),
          cognitiveEffortScore: clamp01(values.cognitive_effort_score),
          examWeightByYear: values.exam_weight_by_year?.trim() ? parseWeightMap(values.exam_weight_by_year) : undefined,
          questionOnlyFor: optionalList(values.question_only_for),
        },
        mediaRequests: values.media_recommendations?.trim() ? parseMediaRequests(values.media_recommendations, id, 'question') : undefined,
        learningObjective: text('learning_objective') as string,
        authorNotes: text('author_notes') as string,
        sourceCitation: text('source_citation') as string,
        estimatedSeconds: optionalNumberInRange(values.estimated_seconds, 90, 5, 3600) as number,
        randomiseAnswers: (values.randomise_answers?.trim() ? !/^(no|false|0)$/i.test(values.randomise_answers.trim()) : undefined) as boolean,
      },
    }
  }
  if (kind === 'article') {
    // Sections are addressed by evidence spans, so their ids are derived from
    // the article id and the heading. `published_sections` gets the same prefix
    // deliberately: a section keeps one id whether the reader is seeing the
    // draft or the evidence-gated projection.
    const sections = parseSections(values.sections, id.toLowerCase())
    const body = values.body || sections.map((s) => `${s.heading}\n${s.body}`).join('\n\n')
    // Absent column means "leave the live notes alone", so this stays
    // `undefined` rather than becoming the empty list it used to.
    const universityNotes = values.university_notes?.trim()
      ? splitImportList(values.university_notes).map((line, i) => {
        const [uni, ...rest] = line.split(':')
        return { id: `unote-import-${i}`, universityId: uni.trim(), text: rest.join(':').trim() }
      }).filter((n) => n.universityId && n.text)
      : undefined
    const templateId = values.template_id?.trim() ? canonicalTemplateId(values.template_id.trim()) : undefined
    const archetype = (values.archetype?.trim() || ARTICLE_TEMPLATES.find((template) => template.id === templateId)?.archetype) as ArticleArchetype | undefined
    // Undefined when unmentioned: defaulting to Core demoted every article a
    // partial update touched. `materialiseNewItem` applies Core to new records.
    const highYield = values.high_yield?.trim()
      ? (['Core', 'High', 'Supplementary'].includes(values.high_yield.trim()) ? values.high_yield.trim() as 'Core' | 'High' | 'Supplementary' : 'Core')
      : undefined
    const related = parseRelatedArticles(values.related_articles)
    const publishedSections = parseSections(values.published_sections, id.toLowerCase())
    const calloutEvidence = parseCalloutEvidence(values.callout_evidence)
    const mediaRequests = parseMediaRequests(values.media_recommendations || values.image_recommendations, id, 'article')
    // Per-pair link reasons live alongside the author's own field notes, so a
    // partial update that touches only one of the two keeps the other.
    const fieldNotes = { ...parseFieldNotes(values.field_notes), ...related.reasons }
    const timeSensitive = ['stable', 'time_sensitive'].includes(values.time_sensitive?.trim() ?? '') ? values.time_sensitive.trim() as 'stable' | 'time_sensitive' : undefined
    const publicationGate = ['publishable', 'needs_evidence', 'faculty_review', 'conflicted', 'excluded'].includes(values.publication_gate?.trim() ?? '') ? values.publication_gate.trim() as PublicationGate : undefined
    return {
      ...base,
      fields: {
        Topic: values.topic || '', Summary: values.summary || '',
        'Key point': importLines(values.hold_these)[0] || '', 'Template ID': templateId || '', Archetype: archetype || '',
        // Omitted rather than defaulted when the row is silent. The merge keeps
        // a field the incoming row left blank, but '5' and 'Import queue' are
        // not blank — they overwrote the real reading time and owner.
        ...(values.reading_time?.trim() ? { 'Reading time': values.reading_time.trim() } : {}),
        ...(text('owner') ? { 'Content owner': values.owner.trim() } : {}),
        ...(publicationGate ? { 'Publication gate': publicationGate } : {}),
        ...(text('reviewer') ? { Reviewer: values.reviewer.trim() } : {}),
        ...(text('final_publisher') ? { Publisher: values.final_publisher.trim() } : {}),
      },
      articleData: {
        summary: values.summary || '', body, sections,
        publishedSections: publishedSections.length ? publishedSections : undefined,
        publishedSummary: text('published_summary'),
        // Prose: split on new lines only, so a semicolon inside a teaching point
        // does not cut it in half.
        holdThese: (values.hold_these === undefined || !values.hold_these.trim() ? undefined : importLines(values.hold_these)) as string[],
        loseTheMark: (values.lose_the_mark === undefined || !values.lose_the_mark.trim() ? undefined : importLines(values.lose_the_mark)) as string[],
        questionIds: optionalList(values.question_ids) as string[],
        resourceIds: optionalList(values.resource_ids) as string[],
        annotations: (values.annotations === undefined || !values.annotations.trim() ? undefined : parseAnnotations(values.annotations)) as ConceptAnnotation[],
        universityIds: optionalList(values.universities),
        yearIds: optionalList(values.years),
        moduleIds: optionalList(values.module),
        subtopicId: text('subtopic'), microtopicId: text('microtopic'), nanotopicId: text('nanotopic'),
        relatedConceptIds: optionalList(values.related_concepts),
        relatedArticleIds: related.ids.length ? related.ids : undefined,
        universityNotes, templateId, archetype,
        arabicTitle: text('arabic_title'),
        aliases: optionalList(values.aliases),
        language: text('language'),
        learnerStage: text('learner_stage'),
        highYield, timeSensitive, publicationGate,
        primaryNodeId: text('primary_node_id'),
        secondaryNodeIds: optionalList(values.secondary_node_ids),
        evidenceBasis: optionalList(values.evidence_basis),
        articleLevelSourceIds: optionalList(values.article_source_ids),
        claimIds: optionalList(values.claim_ids),
        spanIds: optionalList(values.span_ids),
        conflicts: optionalList(values.conflicts),
        evidenceGaps: optionalList(values.evidence_gaps),
        reviewer: text('reviewer'), finalPublisher: text('final_publisher'),
        lastReviewed: text('last_reviewed'), reviewDue: text('review_due'),
        media: values.media === undefined || !values.media.trim() ? undefined : parseArticleMedia(values.media),
        mediaRequests: mediaRequests.length ? mediaRequests : undefined,
        calloutEvidence: Object.keys(calloutEvidence).length ? calloutEvidence : undefined,
        fieldNotes: Object.keys(fieldNotes).length ? fieldNotes : undefined,
        notes: text('notes'),
      },
    }
  }
  if (kind === 'practical') {
    return {
      ...base,
      // `type` is a required column, so it is always restated. The other three
      // are not, and defaulting them reset a 15-minute, 30-mark, Hard station to
      // an 8-minute, 20-mark, Moderate one on any partial update. The `|| ''`
      // entries are safe: the merge already keeps a field an incoming row left
      // blank, so only a non-blank default could overwrite.
      fields: {
        Type: values.type || 'OSCE station',
        ...(text('duration') ? { Duration: values.duration.trim() } : {}),
        ...(text('marks') ? { Marks: values.marks.trim() } : {}),
        ...(text('difficulty') ? { Difficulty: values.difficulty.trim() } : {}),
        'Candidate instructions': values.candidate_instructions || '', 'Actor opening': values.actor_opening || '', 'Actor sections': values.actor_sections || '', 'Actor flags': values.actor_flags || '', 'Mark scheme': values.mark_scheme || '', Decisions: values.decisions || '', Debrief: values.debrief || '', 'Lab subtype': values.lab_subtype || '', 'Lab questions': values.lab_questions || '', 'Main concept': values.main_concept || '', Concepts: values.concept_ids || '', 'Contextual concepts': values.contextual_concept_ids || '', 'Learning objective': values.learning_objective || '', 'Media needed': values.media_needed || '', References: values.references || '',
      },
      practicalData: practicalDataFrom(values),
    }
  }
  if (kind === 'deck') {
    return {
      ...base,
      fields: { Description: values.description || '' },
      deckData: {
        description: values.description || '',
        cards: parseCardLines(values.cards ?? ''),
      },
    }
  }
  return {
    ...base,
    fields: { Type: values.type || 'Article', Source: values.source || '', URL: values.url || '', Year: values.year || '', Topics: values.topics || '', Chapter: values.chapter || '', 'Included concepts': values.included_concepts || '', 'Included articles': values.included_articles || '', Description: values.description || '' },
    resourceData: {
      universityIds: optionalList(values.universities),
      yearIds: optionalList(values.years),
      institution: values.source?.trim() || undefined,
      chapters: splitImportList(values.chapter),
      moduleIds: splitImportList(values.module_ids),
      includedConceptIds: splitImportList(values.included_concepts),
      includedArticleIds: splitImportList(values.included_articles),
      conceptLocations: (values.concept_locations ?? '').split(/\r?\n/).map((line, i) => {
        const [conceptId, kind, ...rest] = line.split('|').map((s) => s.trim())
        const k = ['page', 'line', 'slide', 'timestamp'].includes(kind) ? kind as 'page' | 'line' | 'slide' | 'timestamp' : 'page'
        return { id: `loc-imp-${i}`, conceptId, kind: k, locator: rest.join('|').trim() }
      }).filter((l) => l.conceptId && l.locator),
    },
  }
}
