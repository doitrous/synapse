import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * The evidence branch of `validate-content-batch.mjs`, driven end to end.
 *
 * These are process tests rather than unit tests because the thing under test
 * is the script's resolution scope — which files it decides count as "already
 * authored" — and that lives in the script, not in a module it imports.
 *
 * The bug they pin: the evidence branch built its concept and article sets from
 * the batch's own directory only, and never consulted `--with`. A claim batch in
 * `evidence/` naming concepts authored in `concept/` therefore failed on every
 * single row, and the only way to a clean run was to copy the concept batch into
 * the evidence directory. `--with` was accepted, echoed nothing, and changed
 * nothing.
 */

const script = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'scripts', 'validate-content-batch.mjs')

/** Run the validator and return its report, whatever its exit code. */
function validate(batch: string, ...withFiles: string[]) {
  const args = ['--experimental-strip-types', script, batch, ...withFiles.flatMap((file) => ['--with', file])]
  let stdout = ''
  try {
    stdout = execFileSync(process.execPath, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
  } catch (reason) {
    // A batch with errors exits 1 and still prints its report; that is the
    // output under test, so a non-zero exit is not a test failure by itself.
    const failure = reason as { stdout?: string, stderr?: string }
    if (!failure.stdout) throw new Error(`validator produced no report: ${failure.stderr ?? reason}`)
    stdout = failure.stdout
  }
  return JSON.parse(stdout) as { kind: string, items: number, notes: string[], errors: string[] }
}

/**
 * A module laid out the way the real ones are: concepts in `concept/`, articles
 * in `article/`, evidence in `evidence/`. Separate directories are the whole
 * point — a claim and the concept it names are never siblings.
 */
function authorModule() {
  const root = mkdtempSync(join(tmpdir(), 'batch-scope-'))
  for (const dir of ['concept', 'article', 'evidence']) mkdirSync(join(root, dir))

  const concepts = join(root, 'concept', 'TEST-concepts.md')
  writeFileSync(concepts, [
    '# Item',
    '## label',
    'The sinoatrial node sets the heart rate',
    '## id',
    'CON-TEST-SA-NODE',
    '## definition',
    'The sinoatrial node depolarises spontaneously and faster than any other pacemaker tissue, so it sets the rate.',
    '## explicit_objective',
    'Say which tissue sets the heart rate, and why that one rather than another.',
    '',
  ].join('\n'))

  const articles = join(root, 'article', 'TEST-articles.md')
  writeFileSync(articles, [
    '# Item',
    '## id',
    'ART-TEST-PACEMAKER',
    '## title',
    'The cardiac pacemaker',
    '## summary',
    'Which tissue sets the heart rate.',
    '## sections',
    '### Mechanism',
    'The sinoatrial node depolarises fastest, so it sets the rate.',
    '',
  ].join('\n'))

  const claims = join(root, 'evidence', 'TEST-claims.md')
  writeFileSync(claims, [
    '# Item',
    '## id',
    'CLM-TEST-SA-NODE-01',
    '## concept_id',
    'CON-TEST-SA-NODE',
    '## subject',
    'The sinoatrial node',
    '## predicate',
    'sets',
    '## object',
    'the heart rate',
    '## display_text',
    'The sinoatrial node sets the heart rate because it depolarises faster than any other pacemaker tissue.',
    '## risk_class',
    'foundational_stable',
    '',
  ].join('\n'))

  const spans = join(root, 'evidence', 'TEST-spans.md')
  writeFileSync(spans, [
    '# Item',
    '## id',
    'SPN-TEST-PACEMAKER-01',
    '## article_id',
    'ART-TEST-PACEMAKER',
    '## section_id',
    'art-test-pacemaker-mechanism',
    '## text',
    'The sinoatrial node depolarises fastest, so it sets the rate.',
    '## claim_ids',
    'CLM-TEST-SA-NODE-01',
    '',
  ].join('\n'))

  return { root, concepts, articles, claims, spans }
}

test('a claim batch resolves concepts named with --with from another directory', () => {
  const module = authorModule()
  try {
    const report = validate(module.claims, module.concepts)
    assert.equal(report.kind, 'claim')
    assert.equal(report.items, 1)
    assert.deepEqual(report.errors, [])
  } finally {
    rmSync(module.root, { recursive: true, force: true })
  }
})

test('a span batch resolves articles named with --with from another directory', () => {
  const module = authorModule()
  try {
    // The span names its article in `article/` and its claim in `evidence/`, so
    // this covers both scopes at once: one crosses directories, one does not.
    const report = validate(module.spans, module.articles)
    assert.equal(report.kind, 'span')
    assert.deepEqual(report.errors, [])
  } finally {
    rmSync(module.root, { recursive: true, force: true })
  }
})

test('without --with, a cross-directory concept is still reported missing', () => {
  // The other half of the contract. `--with` widens what counts as existing; it
  // must not be the case that the check passes because it stopped checking. A
  // claim naming a concept nobody authored anywhere is the failure this branch
  // exists to catch, and it still has to fail.
  const module = authorModule()
  try {
    const report = validate(module.claims)
    assert.ok(
      report.errors.some((error) => error.includes('Concept CON-TEST-SA-NODE does not exist')),
      `expected the unresolved concept to be reported, got ${JSON.stringify(report.errors)}`,
    )
  } finally {
    rmSync(module.root, { recursive: true, force: true })
  }
})

test('a --with file that is not the kind it is needed as resolves nothing', () => {
  // `--with` is not a suppression flag. Naming the article batch does not make
  // the claim's concept exist, because the folding is by detected kind and an
  // article contributes no concept IDs.
  const module = authorModule()
  try {
    const report = validate(module.claims, module.articles)
    assert.ok(
      report.errors.some((error) => error.includes('Concept CON-TEST-SA-NODE does not exist')),
      `expected the concept to stay unresolved, got ${JSON.stringify(report.errors)}`,
    )
  } finally {
    rmSync(module.root, { recursive: true, force: true })
  }
})
