/**
 * Authoring-contract validator.
 *
 * Enforces the structural rules the authoring templates in docs/authoring rely
 * on. Run alongside validate-reviewed-medical-taxonomy.mjs, which checks the
 * canonical tree's own integrity.
 */
import { CURRICULUM_CATALOG } from '../src/data/curriculumCatalog.ts'
import { MEDICAL_TAXONOMY_SEED } from '../src/data/medicalLibraryTaxonomy.ts'
import { crosswalkCoverage } from '../src/data/taxonomyCrosswalk.ts'
import { ARTICLE_TEMPLATES, ARTICLE_TEMPLATE_ALIASES, FORBIDDEN_SECTIONS, canonicalTemplateId } from '../src/data/articleTemplates.ts'

const errors = {
  duplicateLabels: [],
  unresolvedCrossRefs: [],
  selfCrossRefs: [],
  unmappedSubjects: [],
  unmappedTopics: [],
  unknownCrosswalkTargets: [],
  undefinedTemplateIds: [],
  archetypesWithoutTemplate: [],
  templatesWithForbiddenSection: [],
}

/* ---- Curriculum: one label, one home ----------------------------------- */

const labelHomes = new Map()
const curriculumIds = new Set()
const crossRefs = []

const record = (label, path) => {
  const key = label.trim().toLocaleLowerCase()
  labelHomes.set(key, [...(labelHomes.get(key) ?? []), path])
}

for (const system of CURRICULUM_CATALOG) {
  curriculumIds.add(system.id)
  for (const target of system.crossRefs ?? []) crossRefs.push({ from: system.id, target })
  for (const topicNode of system.topics) {
    curriculumIds.add(topicNode.id)
    record(topicNode.title, `${system.id}/${topicNode.title}`)
    for (const target of topicNode.crossRefs ?? []) crossRefs.push({ from: topicNode.id, target })
    for (const subtopicNode of topicNode.subs) {
      curriculumIds.add(subtopicNode.id)
      record(subtopicNode.title, `${system.id}/${topicNode.title}/${subtopicNode.title}`)
      for (const microtopicNode of subtopicNode.micros) {
        curriculumIds.add(microtopicNode.id)
        for (const nanotopicNode of microtopicNode.nanos) curriculumIds.add(nanotopicNode.id)
      }
    }
  }
}

for (const [label, paths] of labelHomes) {
  if (paths.length > 1) errors.duplicateLabels.push({ label, paths })
}

for (const { from, target } of crossRefs) {
  if (!curriculumIds.has(target)) errors.unresolvedCrossRefs.push({ from, target })
  if (target === from || target.startsWith(`${from}-`)) errors.selfCrossRefs.push({ from, target })
}

/* ---- Crosswalk --------------------------------------------------------- */

const coverage = crosswalkCoverage(CURRICULUM_CATALOG)
errors.unmappedSubjects = coverage.unmappedSubjects
errors.unmappedTopics = coverage.unmappedTopics
errors.unknownCrosswalkTargets = coverage.unknownTargets

/* ---- Article templates ------------------------------------------------- */

const definedTemplateIds = new Set(ARTICLE_TEMPLATES.map((template) => template.id))
const taxonomyTemplateIds = new Set(MEDICAL_TAXONOMY_SEED.map((node) => node.templateId).filter(Boolean))
for (const templateId of taxonomyTemplateIds) {
  if (!definedTemplateIds.has(canonicalTemplateId(templateId))) errors.undefinedTemplateIds.push(templateId)
}

// Every archetype the content model can store must be authorable.
const ARCHETYPES = ['condition', 'presentation', 'concept', 'anatomy', 'drug', 'skill', 'investigation', 'organism', 'emergency', 'public-health']
const definedArchetypes = new Set(ARTICLE_TEMPLATES.map((template) => template.archetype))
for (const archetype of ARCHETYPES) {
  if (!definedArchetypes.has(archetype)) errors.archetypesWithoutTemplate.push(archetype)
}

// "Components and relations" was removed for good when articles became prose;
// the field audit rejects any article still carrying one, so no template may
// ask an author to write it.
const banned = new Set(FORBIDDEN_SECTIONS.map((heading) => heading.toLocaleLowerCase()))
for (const template of ARTICLE_TEMPLATES) {
  const offending = [...template.requiredSections, ...template.optionalSections].filter((heading) => banned.has(heading.toLocaleLowerCase()))
  if (offending.length) errors.templatesWithForbiddenSection.push({ id: template.id, sections: offending })
}

/* ---- Report ------------------------------------------------------------ */

const passed = Object.values(errors).every((items) => items.length === 0)
console.log(JSON.stringify({
  passed,
  counts: {
    curriculumNodes: curriculumIds.size,
    distinctLabels: labelHomes.size,
    crossReferences: crossRefs.length,
    mappedSubjects: coverage.mappedSubjects,
    mappedTopics: coverage.mappedTopics,
    articleTemplates: ARTICLE_TEMPLATES.length,
    templateAliases: Object.keys(ARTICLE_TEMPLATE_ALIASES).length,
  },
  errors,
}, null, 2))
if (!passed) process.exitCode = 1
