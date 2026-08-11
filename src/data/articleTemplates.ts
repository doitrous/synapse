/**
 * Article template registry.
 *
 * Every node in the canonical medical taxonomy carries a `templateId` and a
 * `slots` list, and every built article carries `templateId` + `archetype`.
 * This file is what those IDs point at: the section contract an author must
 * satisfy for each kind of article.
 *
 * The registry defines the contract for NEW articles. It is deliberately not a
 * retrospective validator of already-extracted pilot content, whose headings
 * come from their source material.
 */

import type { ArticleArchetype } from './contentControl'
import type { ConceptRelationType } from './conceptGraph'

/**
 * Headings no article may carry.
 *
 * "Components and relations" was a generated appendix listing an article's
 * concepts. It was removed for good when articles became continuous prose, and
 * `scripts/audit-medical-content-fields.mjs` now fails any article that still
 * has one. Concept links belong in `relatedConceptIds`, not in a section.
 */
export const FORBIDDEN_SECTIONS = ['Components and relations']

export interface ArticleTemplateDefinition {
  id: string
  archetype: ArticleArchetype
  label: string
  /** What this template is for, in one line, shown to authors. */
  purpose: string
  /** Section headings in order. */
  requiredSections: string[]
  /** Permitted extra headings. */
  optionalSections: string[]
  /** Relation types a concept discussed by this article is expected to use. */
  expectedRelations: ConceptRelationType[]
}

const define = (
  id: string,
  archetype: ArticleArchetype,
  label: string,
  purpose: string,
  requiredSections: string[],
  optionalSections: string[],
  expectedRelations: ConceptRelationType[],
): ArticleTemplateDefinition => ({ id, archetype, label, purpose, requiredSections, optionalSections, expectedRelations })

export const ARTICLE_TEMPLATES: ArticleTemplateDefinition[] = [
  define(
    'TPL-CONCEPT', 'concept', 'Concept / mechanism',
    'A single mechanism, principle, or process that other articles build on.',
    ['Definition', 'Mechanism', 'Key determinants', 'Clinical significance'],
    ['Normal values', 'Applied physiology', 'Common misconceptions'],
    ['is_a', 'part_of', 'mechanism_step_before', 'causes', 'increases', 'decreases', 'regulates', 'prerequisite_of', 'often_confused_with'],
  ),
  define(
    'TPL-CONDITION', 'condition', 'Condition / disease',
    'A named disease or syndrome, from cause through management.',
    ['Definition', 'Epidemiology', 'Aetiology and risk factors', 'Pathophysiology', 'Clinical picture', 'Investigation', 'Management', 'Complications and prognosis'],
    ['Classification', 'Prevention', 'Egyptian context'],
    ['is_a', 'causes', 'presents_as', 'diagnosed_by', 'investigated_by', 'treated_by', 'complication_of', 'differential_of', 'associated_with'],
  ),
  define(
    'TPL-PRESENTATION', 'presentation', 'Presentation / symptom',
    'A patient-facing complaint, worked from the symptom toward a differential.',
    ['Definition', 'Mechanisms', 'Differential diagnosis', 'Focused history', 'Focused examination', 'Initial investigation', 'Red flags', 'Immediate approach'],
    ['Age and context variation', 'Common misdiagnoses'],
    ['presents_as', 'differential_of', 'causes', 'investigated_by', 'associated_with', 'often_confused_with'],
  ),
  define(
    'TPL-ANATOMY', 'anatomy', 'Anatomy / structure',
    'A structure or region: what it is, where it is, and what it connects to.',
    ['Overview and position', 'Structure', 'Relations', 'Blood supply, innervation and lymphatics', 'Development', 'Surface and imaging anatomy', 'Clinical correlations'],
    ['Histology', 'Variations and anomalies'],
    ['part_of', 'located_in', 'supplies', 'drains_into', 'contains', 'composed_of', 'connects_to', 'accompanies'],
  ),
  define(
    'TPL-INVESTIGATION', 'investigation', 'Investigation / interpretation',
    'A test or imaging modality and how to read it.',
    ['Purpose and indications', 'Principle', 'How it is performed', 'Normal findings', 'Abnormal findings and interpretation', 'Limitations and pitfalls'],
    ['Contraindications', 'Patient preparation', 'Availability and cost in Egypt'],
    ['investigated_by', 'diagnosed_by', 'is_a', 'contrasts_with', 'associated_with'],
  ),
  define(
    'TPL-DRUG', 'drug', 'Drug / therapeutics',
    'A drug or therapeutic class, safe to prescribe from.',
    ['Class and members', 'Mechanism of action', 'Pharmacokinetics', 'Indications', 'Dosing principles', 'Adverse effects', 'Contraindications and cautions', 'Interactions', 'Monitoring'],
    ['Use in pregnancy and lactation', 'Use in renal or hepatic impairment', 'Cost and availability in Egypt'],
    ['treated_by', 'is_a', 'contraindicates', 'decreases', 'increases', 'regulates', 'often_confused_with'],
  ),
  define(
    'TPL-SKILL', 'skill', 'Skill / procedure',
    'An observable, examinable clinical skill or procedure.',
    ['Purpose and indications', 'Preparation and consent', 'Equipment', 'Step-by-step procedure', 'Safety and complications', 'Communication points', 'Assessment criteria'],
    ['Contraindications', 'Documentation', 'Common OSCE errors'],
    ['part_of', 'prerequisite_of', 'investigated_by', 'treated_by', 'associated_with'],
  ),
  define(
    'TPL-ORGANISM', 'organism', 'Organism / infection',
    'A pathogen and the disease it causes.',
    ['Classification and structure', 'Epidemiology and transmission', 'Pathogenesis and virulence', 'Clinical syndromes', 'Laboratory diagnosis', 'Treatment', 'Prevention and control'],
    ['Endemicity in Egypt', 'Antimicrobial resistance'],
    ['is_a', 'causes', 'presents_as', 'diagnosed_by', 'treated_by', 'associated_with'],
  ),
  define(
    'TPL-EMERGENCY', 'emergency', 'Emergency / acute care',
    'A time-critical presentation, ordered by what must happen first.',
    ['Recognition', 'Immediate priorities', 'Initial management', 'Definitive management', 'Escalation and referral', 'Reassessment and disposition', 'Pitfalls'],
    ['Paediatric differences', 'Pre-hospital considerations'],
    ['presents_as', 'causes', 'treated_by', 'complication_of', 'differential_of'],
  ),
  define(
    'TPL-PUBLIC-HEALTH', 'public-health', 'Public health / prevention',
    'A population-level problem, intervention, or health-system topic.',
    ['Definition and scope', 'Burden and determinants', 'Evidence base', 'Interventions and levels of prevention', 'Measurement and indicators', 'Policy and health-system context'],
    ['Egyptian national programmes', 'Equity considerations'],
    ['causes', 'decreases', 'increases', 'associated_with', 'is_a', 'part_of'],
  ),
]

/**
 * Legacy template IDs kept resolvable.
 *
 * The supplied blueprint spreadsheet uses `TPL-PUBLIC` on 101 nodes while the
 * reviewed additions use `TPL-PUBLIC-HEALTH` on 10. They mean the same thing;
 * `TPL-PUBLIC-HEALTH` is canonical because it matches the `public-health`
 * archetype name.
 */
export const ARTICLE_TEMPLATE_ALIASES: Record<string, string> = {
  'TPL-PUBLIC': 'TPL-PUBLIC-HEALTH',
}

const byId = new Map(ARTICLE_TEMPLATES.map((template) => [template.id, template]))
const byArchetype = new Map(ARTICLE_TEMPLATES.map((template) => [template.archetype, template]))

export const canonicalTemplateId = (templateId: string) => ARTICLE_TEMPLATE_ALIASES[templateId] ?? templateId

/** Resolve a template by ID, following the legacy aliases. */
export function articleTemplate(templateId: string): ArticleTemplateDefinition | undefined {
  return byId.get(canonicalTemplateId(templateId))
}

export function templateForArchetype(archetype: ArticleArchetype): ArticleTemplateDefinition | undefined {
  return byArchetype.get(archetype)
}

export const ARTICLE_TEMPLATE_IDS = ARTICLE_TEMPLATES.map((template) => template.id)

/** Headings this template permits, in the order they should appear. */
export function allowedSections(templateId: string): string[] {
  const template = articleTemplate(templateId)
  if (!template) return []
  return [...template.requiredSections, ...template.optionalSections]
}

/** Headings present in a draft that are no longer allowed anywhere. */
export function forbiddenSectionsIn(headings: string[]): string[] {
  const banned = new Set(FORBIDDEN_SECTIONS.map((heading) => heading.toLocaleLowerCase()))
  return headings.filter((heading) => banned.has(heading.trim().toLocaleLowerCase()))
}

/** Which required headings a draft is still missing, in template order. */
export function missingRequiredSections(templateId: string, headings: string[]): string[] {
  const template = articleTemplate(templateId)
  if (!template) return []
  const present = new Set(headings.map((heading) => heading.trim().toLocaleLowerCase()))
  return template.requiredSections.filter((heading) => !present.has(heading.toLocaleLowerCase()))
}
