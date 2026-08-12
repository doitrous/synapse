import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { IMPORT_SCHEMAS } from './bulkImport.ts'
import { CONCEPT_IMPORT_FIELDS, RELATION_IMPORT_FIELDS } from './conceptImport.ts'
import { SUBJECTS_IMPORT_FIELDS } from './subjectsImport.ts'

/**
 * The authoring templates and the import schema must not drift apart.
 *
 * An author works from `docs/authoring/`. A field that exists in the importer
 * but not in the template is invisible to them; a field documented but absent
 * from the schema is a promise the importer does not keep. Either way the
 * template stops being usable, quietly. This test is what makes that loud.
 */

const doc = (name: string) => readFileSync(new URL(`../../docs/authoring/${name}`, import.meta.url), 'utf8')

/** Field keys the template mentions, in any of the forms the docs use. */
const documented = (markdown: string) => new Set(
  [...markdown.matchAll(/`([a-z][a-z0-9_]*)`/g)].map((match) => match[1]),
)

const check = (name: string, keys: string[]) => {
  const known = documented(doc(name))
  const missing = keys.filter((key) => !known.has(key))
  assert.deepEqual(missing, [], `docs/authoring/${name} does not document: ${missing.join(', ')}`)
}

test('every article import field is documented in the article template', () => {
  check('library-article.md', IMPORT_SCHEMAS.article.fields.map((field) => field.key))
})

test('every question import field is documented in the question template', () => {
  // The six answer/explanation pairs are generated, and the template documents
  // the pattern rather than twelve near-identical rows.
  const keys = IMPORT_SCHEMAS.question.fields
    .map((field) => field.key)
    .filter((key) => !/^(answer|explanation)_[a-f]$/.test(key))
  check('question.md', keys)
})

test('every practical import field is documented in the practical template', () => {
  check('practical.md', IMPORT_SCHEMAS.practical.fields.map((field) => field.key))
})

test('every concept import field is documented in the concept template', () => {
  check('concept.md', CONCEPT_IMPORT_FIELDS.map((field) => field.key))
})

test('every relation import field is documented in the concept template', () => {
  check('concept.md', RELATION_IMPORT_FIELDS.map((field) => field.key))
})

test('every Subjects & Topics import field is documented in its template', () => {
  check('subjects-and-topics.md', SUBJECTS_IMPORT_FIELDS.map((field) => field.key))
})

test('the shared contract still names the eight valid subject IDs', () => {
  // Cheap guard on the rule every template depends on.
  const readme = doc('README.md')
  for (const subject of ['cvs', 'resp', 'renal', 'gi', 'neuro', 'endo', 'msk', 'pharm']) {
    assert.ok(readme.includes(`\`${subject}\``), `README does not name subject ${subject}`)
  }
})
