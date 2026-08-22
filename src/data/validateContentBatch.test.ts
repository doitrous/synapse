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
    '---',
    '',
    '# Item',
    '## label',
    'The cardiac conducting system',
    '## id',
    'CON-TEST-CONDUCTING-SYSTEM',
    '## definition',
    'The specialised myocardium that generates and distributes the impulse: SA node, AV node, bundle of His, Purkinje fibres.',
    '## explicit_objective',
    'List the components of the conducting system in the order the impulse travels.',
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

  const citations = join(root, 'evidence', 'TEST-citations.md')
  writeFileSync(citations, [
    '# Item',
    '## id',
    'CIT-KA-TEST-SA-NODE-01',
    '## claim_id',
    'CLM-TEST-SA-NODE-01',
    '## resource_id',
    'RES-WEB-TEST-01',
    '## support_span',
    'The sinoatrial node depolarises faster than any other pacemaker tissue.',
    '## locator',
    'page: 12',
    '',
  ].join('\n'))

  return { root, concepts, articles, claims, spans, citations }
}

/**
 * A relation batch in its own `relations/` directory, naming records that live
 * in three other directories: two concepts in `concept/`, a claim and a
 * citation in `evidence/`. Its own directory resolves none of them, which is
 * what makes this branch the worst instance of the sibling-scope bug.
 */
function authorRelation(root: string, options: { citationId: string }) {
  const dir = join(root, 'relations')
  mkdirSync(dir, { recursive: true })
  const batch = join(dir, 'TEST-relations.md')
  writeFileSync(batch, [
    '# Item',
    '## source',
    'CON-TEST-SA-NODE',
    '## type',
    'part_of',
    '## target',
    'CON-TEST-CONDUCTING-SYSTEM',
    '## evidence_claim_ids',
    'CLM-TEST-SA-NODE-01',
    '## citation_ids',
    options.citationId,
    '',
  ].join('\n'))
  return batch
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

test('--with resolving one concept does not excuse another that exists nowhere', () => {
  // The strongest form of the previous two, and the one that cannot pass by
  // accident. Both other negative tests withhold the concept batch, so a
  // validator that had silently stopped folding siblings in altogether would
  // still satisfy them. Here the fold-in is demonstrably running — one claim in
  // the same file resolves through it — and the second claim names a concept
  // authored in no batch and no live state. Widening what counts as existing
  // must never excuse an absence.
  const module = authorModule()
  try {
    writeFileSync(module.claims, [
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
      'The sinoatrial node sets the heart rate.',
      '## risk_class',
      'foundational_stable',
      '',
      '---',
      '',
      '# Item',
      '## id',
      'CLM-TEST-INVENTED-01',
      '## concept_id',
      'CON-TEST-AUTHORED-NOWHERE',
      '## subject',
      'A concept nobody wrote',
      '## predicate',
      'is',
      '## object',
      'not in any batch or in live state',
      '## display_text',
      'This claim names a concept that exists in no batch and no live state.',
      '## risk_class',
      'foundational_stable',
      '',
    ].join('\n'))

    const report = validate(module.claims, module.concepts)
    assert.equal(report.items, 2)

    // The fold-in ran: the note says so, and the resolvable claim is not faulted.
    assert.ok(
      report.notes.some((note) => note.includes('concept rows treated as pending import')),
      `expected the sibling fold-in to report itself, got ${JSON.stringify(report.notes)}`,
    )
    assert.ok(
      !report.errors.some((error) => error.includes('CON-TEST-SA-NODE does not exist')),
      `the named concept should have resolved, got ${JSON.stringify(report.errors)}`,
    )

    // And the invented one still fails, in that same run.
    assert.ok(
      report.errors.some((error) => error.includes('Concept CON-TEST-AUTHORED-NOWHERE does not exist')),
      `expected the invented concept to be refused, got ${JSON.stringify(report.errors)}`,
    )
  } finally {
    rmSync(module.root, { recursive: true, force: true })
  }
})

test('a --with sibling that is also a directory sibling is counted once', () => {
  // Naming the resources batch beside a claim batch is the documented way to run
  // this, and it put that file in both the directory scan and the --with list.
  // The ID sets deduplicated it; `everything.citation` is an array and did not.
  const module = authorModule()
  try {
    const resources = join(module.root, 'evidence', 'TEST-resources.md')
    writeFileSync(resources, [
      '# Item',
      '## id',
      'RES-WEB-TEST-01',
      '## title',
      'A source',
      '## institution',
      'Kasr Alainy',
      '## processing_status',
      'authoritative_article_level_reference',
      '',
    ].join('\n'))

    const report = validate(module.claims, module.concepts, resources)
    const counted = report.notes.filter((note) => note.includes('resource rows treated as pending import'))
    assert.equal(counted.length, 1, `the resources batch should be reported once, got ${JSON.stringify(counted)}`)
    assert.ok(counted[0].includes('1 resource rows'), `expected one row, got ${counted[0]}`)
  } finally {
    rmSync(module.root, { recursive: true, force: true })
  }
})

test('[clear] in a parseSections column is refused, and an empty body is not', () => {
  // The third spelling of "deliberately empty", which nothing checked. There are
  // two documented ones — an empty body for text(), `[clear]` for optionalList()
  // — and check-empties.py classifies every column as one or the other. Section
  // columns are neither, so they fell through the gap and it reported
  // "0 sentinel-in-text" on thirty articles carrying exactly that.
  //
  // parseSections('[clear]') does not return []. With no `###` to split on it
  // returns one section with an empty heading whose body is the literal string
  // "[clear]" — and on `published_sections`, the evidence-gated student
  // projection, that is a section a student can read.
  const module = authorModule()
  try {
    const withSentinel = join(module.root, 'article', 'TEST-sentinel.md')
    const article = (publishedSections: string) => [
      '# Item',
      '## id',
      'ART-TEST-SENTINEL',
      '## title',
      'The cardiac pacemaker',
      '## subject',
      'cvs',
      '## summary',
      'Which tissue sets the heart rate.',
      '## sections',
      '### Mechanism',
      'The sinoatrial node depolarises fastest.',
      '## published_sections',
      publishedSections,
      '',
    ].join('\n')

    writeFileSync(withSentinel, article('[clear]'))
    const refused = validate(withSentinel)
    assert.ok(
      refused.errors.some((error) => error.includes('published_sections holds the literal "[clear]"')),
      `expected the sentinel to be refused, got ${JSON.stringify(refused.errors)}`,
    )

    // The correct empty for this column, which must stay clean.
    writeFileSync(withSentinel, article(''))
    const accepted = validate(withSentinel)
    assert.ok(
      !accepted.errors.some((error) => error.includes('[clear]')),
      `an empty body is the right way to say this, got ${JSON.stringify(accepted.errors)}`,
    )
  } finally {
    rmSync(module.root, { recursive: true, force: true })
  }
})

test('a relation resolves concepts, claims and citations named with --with', () => {
  // The worst instance of the sibling-scope bug, and the last branch to carry
  // it. A relation names four records across three other directories — two
  // concepts in `concept/`, a claim and a citation in `evidence/` — while the
  // edge itself sits in `relations/`. Reading its own directory resolves none
  // of them, and relationErrors separately refuses an edge with no evidence
  // chain, so a correctly ordered relation batch could not reach zero errors by
  // any route except performing the import it was validating.
  const module = authorModule()
  try {
    const batch = authorRelation(module.root, { citationId: 'CIT-KA-TEST-SA-NODE-01' })
    const report = validate(batch, module.concepts, module.claims, module.citations)
    assert.equal(report.kind, 'relation')
    assert.deepEqual(report.errors, [])
  } finally {
    rmSync(module.root, { recursive: true, force: true })
  }
})

test('a relation still refuses a citation ID that only looks right', () => {
  // The negative control, and a near-miss rather than a straw man: the real ID
  // is CIT-KA-TEST-SA-NODE-01 and this drops the KA segment, which is the shape
  // of mistake an author actually makes. Everything else in the edge resolves
  // through --with in the same run, so this cannot pass by the fold-in being
  // dead — it is one refusal standing alone among three resolutions.
  const module = authorModule()
  try {
    const batch = authorRelation(module.root, { citationId: 'CIT-TEST-SA-NODE-01' })
    const report = validate(batch, module.concepts, module.claims, module.citations)
    assert.ok(
      report.errors.some((error) => error.includes('CIT-TEST-SA-NODE-01')),
      `expected the near-miss citation to be refused, got ${JSON.stringify(report.errors)}`,
    )
    for (const resolved of ['CON-TEST-SA-NODE', 'CON-TEST-CONDUCTING-SYSTEM', 'CLM-TEST-SA-NODE-01']) {
      assert.ok(
        !report.errors.some((error) => error.includes(`${resolved} does not exist`)),
        `${resolved} should have resolved through --with, got ${JSON.stringify(report.errors)}`,
      )
    }
  } finally {
    rmSync(module.root, { recursive: true, force: true })
  }
})
