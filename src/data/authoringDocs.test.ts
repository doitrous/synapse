import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { IMPORT_SCHEMAS } from './bulkImport.ts'
import { CONCEPT_IMPORT_FIELDS, RELATION_IMPORT_FIELDS } from './conceptImport.ts'
import { SUBJECTS_IMPORT_FIELDS } from './subjectsImport.ts'
import { EVIDENCE_IMPORT_FIELDS } from './evidenceImport.ts'
import { CURRICULUM_CATALOG } from './curriculumCatalog.ts'

/**
 * The authoring manuals and the import schema must not drift apart.
 *
 * An author works from `Instruction Manual for Content Creation/`. A field that
 * exists in the importer but not in the manual is invisible to them; a field
 * documented but absent from the schema is a promise the importer does not
 * keep. Either way the manual stops being usable, quietly. This test is what
 * makes that loud.
 *
 * The manuals replaced `docs/authoring/`, which covered five content types in
 * six files. These cover eleven in twelve, so the practical schema is now
 * spread across five format manuals and a key is satisfied by appearing in any
 * of them.
 */

const MANUALS = 'Instruction Manual for Content Creation'

const doc = (name: string) => readFileSync(new URL(`../../${MANUALS}/${name}`, import.meta.url), 'utf8')

/** Field keys the manual mentions, in any of the forms the docs use. */
const documented = (markdown: string) => new Set(
  [...markdown.matchAll(/`([a-z][a-z0-9_]*)`/g)].map((match) => match[1]),
)

/** A key counts as documented if any one of the named manuals mentions it. */
const check = (names: string[], keys: string[]) => {
  const known = new Set(names.flatMap((name) => [...documented(doc(name))]))
  const missing = keys.filter((key) => !known.has(key))
  assert.deepEqual(missing, [], `${names.join(', ')} do not document: ${missing.join(', ')}`)
}

test('every article import field is documented in the article manual', () => {
  check(['04-library-articles.md'], IMPORT_SCHEMAS.article.fields.map((field) => field.key))
})

test('every question import field is documented in the question manual', () => {
  // The six answer/explanation pairs are generated, and the manual documents
  // the pattern rather than twelve near-identical rows.
  const keys = IMPORT_SCHEMAS.question.fields
    .map((field) => field.key)
    .filter((key) => !/^(answer|explanation)_[a-f]$/.test(key))
  check(['05-questions.md'], keys)
})

test('every practical import field is documented across the five format manuals', () => {
  check([
    '06-osce-stations.md',
    '07-clinical-cases.md',
    '08-skills-checklists.md',
    '09-lab-interpretation.md',
    '10-imaging-interpretation.md',
  ], IMPORT_SCHEMAS.practical.fields.map((field) => field.key))
})

test('every concept import field is documented in the concept manual', () => {
  check(['02-concepts.md'], CONCEPT_IMPORT_FIELDS.map((field) => field.key))
})

test('every relation import field is documented in the relationships manual', () => {
  check(['03-relationships.md'], RELATION_IMPORT_FIELDS.map((field) => field.key))
})

test('every evidence import field is documented in the relationships manual', () => {
  // Claims and citations are authored alongside the edge they support, so the
  // relationships manual is where an author meets them. Sources and spans are
  // not author-minted, so only the two authored kinds are required here.
  const keys = [...EVIDENCE_IMPORT_FIELDS.claim, ...EVIDENCE_IMPORT_FIELDS.citation].map((field) => field.key)
  check(['03-relationships.md'], keys)
})

test('every catalogue-resource import field is documented in the resource manual', () => {
  check(['12-resources.md'], IMPORT_SCHEMAS.resource.fields.map((field) => field.key))
})

test('every evidence-source import field is documented in the resource manual', () => {
  // Sources are the one evidence kind an author mints, so they live in 12 rather
  // than alongside claims and citations in 03.
  check(['12-resources.md'], EVIDENCE_IMPORT_FIELDS.resource.map((field) => field.key))
})

test('every Subjects & Topics import field is documented in its manual', () => {
  check(['01-subjects-and-topics.md'], SUBJECTS_IMPORT_FIELDS.map((field) => field.key))
})

test('the shared law names every live subject ID', () => {
  // Cheap guard on the rule every manual depends on.
  const start = doc('00-START-HERE.md')
  for (const subject of CURRICULUM_CATALOG.map((system) => system.id)) {
    assert.ok(start.includes(`\`${subject}\``), `00-START-HERE does not name subject ${subject}`)
  }
})

test('the shared law documents every media-request field an author writes', () => {
  // A request is only creatable by import, so an undocumented line here is a
  // field no author can ever set.
  const start = documented(doc('00-START-HERE.md'))
  for (const key of ['media_recommendations', 'field_notes']) {
    assert.ok(start.has(key), `00-START-HERE does not document ${key}`)
  }
})
