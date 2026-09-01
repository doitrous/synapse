import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
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

/* ---- update rows that would land as stubs -------------------------------- */

/** A concept batch directory holding exactly the rows given. */
function authorConceptDir(rows: string[]) {
  const root = mkdtempSync(join(tmpdir(), 'stub-create-'))
  mkdirSync(join(root, 'concept'))
  rows.forEach((body, index) => writeFileSync(join(root, 'concept', `batch-${index}.md`), body))
  return root
}

const STUB_ROW = ['# Item', '## id', 'CON-FND-NOTLIVE000001', '## canonical_key', 'not.live.anywhere', '## atomic_claim_ids', '+CLM-X-1', ''].join('\n')

test('an update row for an id nothing authors is refused, naming the id', () => {
  // The importer has no record to update, so it creates one from the handful of
  // columns present: `medical:simulate` reports `created: 1, errors: []` and a
  // near-empty concept enters the graph with a plausible ID.
  const root = authorConceptDir([STUB_ROW])
  try {
    const report = validate(join(root, 'concept', 'batch-0.md'))
    const stub = report.errors.filter((error) => error.includes('only carries the columns it changes'))
    assert.equal(stub.length, 1, `expected one stub-create error, got ${JSON.stringify(report.errors)}`)
    assert.match(stub[0], /CON-FND-NOTLIVE000001/, 'the error must name the id')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('an update row is accepted when a full record in the same folder authors that id', () => {
  const full = ['# Item', '## label', 'A fully authored concept', '## id', 'CON-FND-NOTLIVE000001',
    '## canonical_key', 'not.live.anywhere', '## definition', 'd', '## explicit_objective', 'o', '## arabic_label', 'x', ''].join('\n')
  const root = authorConceptDir([STUB_ROW, full])
  try {
    const report = validate(join(root, 'concept', 'batch-0.md'))
    assert.equal(report.errors.filter((error) => error.includes('only carries the columns it changes')).length, 0)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('two update rows for the same absent id do not vouch for each other', () => {
  // Otherwise the check is satisfied by the very duplication it exists to catch.
  const second = ['# Item', '## id', 'CON-FND-NOTLIVE000001', '## canonical_key', 'not.live.anywhere', '## resource_ids', '+src_a', ''].join('\n')
  const root = authorConceptDir([STUB_ROW, second])
  try {
    const report = validate(join(root, 'concept', 'batch-0.md'))
    assert.equal(report.errors.filter((error) => error.includes('only carries the columns it changes')).length, 1)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('a fully authored question is never update-shaped, whatever its format', () => {
  // The regression this pins. "Update-shaped" was first defined as "missing a
  // required field", and `correct_answer` is required while only
  // single-best-answer questions have one — so every matching, written,
  // completion and labelling question in the repository was reported as an
  // update to a record that does not exist. Five real questions were flagged,
  // one of them carrying 31 populated fields. Substance is `question`, which
  // does not vary by format.
  const root = mkdtempSync(join(tmpdir(), 'stub-format-'))
  mkdirSync(join(root, 'question'))
  const matching = ['# Item', '## id', 'QM-TEST-000000000001', '## title', 'Match the descriptions',
    '## subject', 'msk', '## format', 'matching', '## question', 'Match each item to its description',
    '## matching_prompts', 'a = A', '## matching_options', 'A | thing', ''].join('\n')
  writeFileSync(join(root, 'question', 'q.md'), matching)
  try {
    const report = validate(join(root, 'question', 'q.md'))
    assert.equal(
      report.errors.filter((error) => error.includes('only carries the columns it changes')).length, 0,
      `a matching question is authored, not an update: ${JSON.stringify(report.errors)}`,
    )
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('a question whose concept is nowhere fails, and says to try --with', () => {
  // Reported as a silent pass: "the coverage check does `if (!concept) continue`,
  // so a question whose main concept is absent passes when the concept file was
  // not given". It does not — the resolution check above the coverage check
  // already errors, and the `continue` only avoids reporting the same id twice.
  // What was missing was the hint: an author reading "is not a concept that
  // exists" goes looking for a typo in the id, when the usual cause is a
  // question batch validated without its own concept batch beside it.
  const root = mkdtempSync(join(tmpdir(), 'coverage-'))
  mkdirSync(join(root, 'question'))
  mkdirSync(join(root, 'concept'))
  const question = ['# Item', '## id', 'QM-TEST-000000000009', '## title', 'T', '## subject', 'msk',
    '## format', 'single best answer', '## question', 'Which?', '## correct_answer', 'A',
    '## answer_a', 'This', '## answer_b', 'That', '## main_concept', 'CON-FND-ABSENT00000X',
    '## library_ids', 'ART-NOPE', ''].join('\n')
  const concept = ['# Item', '## label', 'The absent concept, now authored', '## id', 'CON-FND-ABSENT00000X',
    '## canonical_key', 'q6.concept', '## definition', 'd', '## explicit_objective', 'o',
    '## arabic_label', 'x', '## publication_status', 'published', '## article_ids', 'ART-NOPE', ''].join('\n')
  writeFileSync(join(root, 'question', 'q.md'), question)
  writeFileSync(join(root, 'concept', 'c.md'), concept)
  try {
    const without = validate(join(root, 'question', 'q.md'))
    const missing = without.errors.filter((error) => error.includes('CON-FND-ABSENT00000X is not a concept that exists'))
    assert.equal(missing.length, 1, `expected the absent concept to be reported once, got ${JSON.stringify(without.errors)}`)
    assert.match(missing[0], /--with/, 'the error should say how to resolve it')

    const withIt = validate(join(root, 'question', 'q.md'), join(root, 'concept', 'c.md'))
    assert.equal(
      withIt.errors.filter((error) => error.includes('is not a concept that exists')).length, 0,
      `naming the concept batch should resolve it: ${JSON.stringify(withIt.errors)}`,
    )
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

/* ---- source_candidate_ids on an update row ------------------------------- */

test('a live concept may restate the candidate ids it already carries', () => {
  // A sparse update row repeats the fields it is not changing. Those candidate
  // ids were minted when the concept was first authored, against whatever
  // corpus index was current then — not necessarily the one this directory
  // symlinks to. Nine correct rows in 108 INT were refused for repeating,
  // unchanged, what the live record already holds.
  //
  // Read from live state rather than hard-coded, so this cannot drift.
  const live = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'server', 'data', 'medical-library-v1.json'), 'utf8'))
  const concepts = (live.states['nishany-concept-graph-v2']?.concepts ?? [])
    .filter((concept: { sourceCandidateIds?: string[] }) => concept.sourceCandidateIds?.length)
  const mine = concepts[0]
  const someoneElse = concepts.find((concept: { id: string }) => concept.id !== mine.id)
  assert.ok(mine && someoneElse, 'live state should carry concepts with candidate ids')

  const root = mkdtempSync(join(tmpdir(), 'candidates-'))
  mkdirSync(join(root, 'concept'))
  const row = (candidate: string, name: string) => ['# Item', '## label', name, '## id', mine.id,
    '## canonical_key', `cand.${name.replace(/\W+/g, '')}`, '## definition', 'd',
    '## explicit_objective', 'o', '## arabic_label', 'x', '## source_candidate_ids', candidate, ''].join('\n')
  const candidateErrors = (body: string, file: string) => {
    writeFileSync(join(root, 'concept', file), body)
    return validate(join(root, 'concept', file)).errors.filter((error) => error.includes('candidate'))
  }

  try {
    assert.deepEqual(candidateErrors(row(mine.sourceCandidateIds[0], 'own'), 'own.md'), [],
      'restating a candidate the live record carries is not an invention')

    // Per id, not globally. A candidate that belongs to a different live
    // concept is still an invention on this one, and accepting any live
    // candidate anywhere would make the check almost unfailable.
    assert.equal(candidateErrors(row(someoneElse.sourceCandidateIds[0], 'other'), 'other.md').length, 1,
      "another record's candidate must still be refused")

    assert.equal(candidateErrors(row('concept_ffffffffffffffffffffffff', 'invented'), 'invented.md').length, 1,
      'a candidate no record and no index has must still be refused')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

/* ---- completeness warnings ----------------------------------------------- */

test('thin records are reported per record, and never as an error', () => {
  // `fieldsUsed` in the summary is the union of every column any row uses, so
  // one complete record makes a file of stubs report a full count. The floor
  // the manual states is per record. Same name, different measurement.
  const root = mkdtempSync(join(tmpdir(), 'completeness-'))
  mkdirSync(join(root, 'question'))
  const question = (id: string, extra: string[]) => ['# Item', '## id', id, '## title', 'T', '## subject', 'msk',
    '## format', 'single best answer', '## question', 'Which?', '## correct_answer', 'a',
    '## answer_a', 'This', '## answer_b', 'That', '## explanation_a', 'Because.', ...extra, ''].join('\n')
  // One padded row and one bare row: the file-level union looks healthy, the
  // per-record count does not.
  const padding = Array.from({ length: 30 }, (_, index) => [`## spare_${index}`, 'x']).flat()
  writeFileSync(join(root, 'question', 'q.md'), `${question('QM-T-1', padding)}\n---\n${question('QM-T-2', [])}`)
  try {
    const report = validate(join(root, 'question', 'q.md')) as { warnings?: string[], errors: string[] }
    const warnings = report.warnings ?? []
    assert.ok(warnings.some((line) => /below the question fieldsUsed floor/.test(line)),
      `expected a floor warning, got ${JSON.stringify(warnings)}`)
    // Thinness is not invalidity. A short record imports and can be answered;
    // a gate that failed on it would block correct batches and be argued with.
    assert.ok(!report.errors.some((error) => /fieldsUsed floor/.test(error)),
      'completeness must never be an error')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('the explanation distribution measures the correct answer, and skips rows without one', () => {
  const root = mkdtempSync(join(tmpdir(), 'explanations-'))
  mkdirSync(join(root, 'question'))
  const rows = [
    // correct is b, so the long explanation_a must NOT be what is measured.
    ['# Item', '## id', 'QM-T-1', '## title', 'T', '## subject', 'msk', '## format', 'single best answer',
      '## question', 'Which?', '## correct_answer', 'b', '## answer_a', 'A', '## answer_b', 'B',
      '## explanation_a', 'x'.repeat(900), '## explanation_b', 'Short one.'].join('\n'),
    // No explanation for its correct answer at all.
    ['# Item', '## id', 'QM-T-2', '## title', 'T', '## subject', 'msk', '## format', 'single best answer',
      '## question', 'Which?', '## correct_answer', 'a', '## answer_a', 'A', '## answer_b', 'B'].join('\n'),
  ]
  writeFileSync(join(root, 'question', 'q.md'), rows.join('\n\n---\n\n'))
  try {
    const warnings = (validate(join(root, 'question', 'q.md')) as { warnings?: string[] }).warnings ?? []
    const distribution = warnings.find((line) => line.startsWith('explanation of the correct answer'))
    assert.ok(distribution, `expected a distribution line, got ${JSON.stringify(warnings)}`)
    assert.match(distribution, /across 1 question/, 'only the row with a correct-answer explanation counts')
    assert.match(distribution, /shortest 10 chars/, 'it must measure explanation_b, not the 900-char explanation_a')
    assert.ok(warnings.some((line) => /1 question\(s\) have no explanation/.test(line)))
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

/* ---- a + on a column that does not take one ------------------------------ */

test('a + on a non-list column is refused, and a + on a list column is not', () => {
  // `+` means append, and only the list columns implement it. On anything else
  // the `+` is just part of the value: `module_subject` stored
  // "+ASU-CVS > Anatomy > …", a path no lookup matches, with no error anywhere.
  //
  // Which columns take one is asked of the importer rather than listed here —
  // the manual's splitting table ends "and every other list of identifiers", so
  // any list copied into the checker would drift the first time a column is
  // added. The check parses the row twice, with and without the `+`, and judges
  // the column by whether the `+` survives into storage.
  const root = mkdtempSync(join(tmpdir(), 'plus-column-'))
  mkdirSync(join(root, 'concept'))
  const concept = (extra: string[]) => ['# Item', '## label', 'Fixture', '## id', 'CON-FND-PLUS0000001',
    '## canonical_key', 'plus.fixture', '## definition', 'd', '## explicit_objective', 'o',
    '## arabic_label', 'x', ...extra, ''].join('\n')
  const errorsFor = (extra: string[], file: string) => {
    writeFileSync(join(root, 'concept', file), concept(extra))
    return validate(join(root, 'concept', file)).errors.filter((error) => error.includes('does not take an append'))
  }

  try {
    const bad = errorsFor(['## module_subject', '+103 BMS > Anatomy > Hip'], 'bad.md')
    assert.equal(bad.length, 1, `module_subject should refuse a +: ${JSON.stringify(bad)}`)
    assert.match(bad[0], /full replacement/, 'the error should say what to write instead')

    // The other half. `article_ids` and `aliases` are list columns and a `+` on
    // them is the documented way to add to what a record already has.
    assert.deepEqual(errorsFor(['## article_ids', '+ART-A | +ART-B', '## aliases', '+An alias'], 'good.md'), [],
      'a + on a real list column is legitimate and must stay clean')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

/* ---- practical completeness ---------------------------------------------- */

test('practical completeness is per format, and only ever a warning', () => {
  // The five practical manuals state this as "Columns you should use — 20 of
  // the 25" and say outright that practicals do not report `fieldsUsed`. Same
  // contract, different name, and different per format: an OSCE has candidate
  // instructions and a mark scheme, a clinical case has decisions and neither.
  const root = mkdtempSync(join(tmpdir(), 'practical-complete-'))
  mkdirSync(join(root, 'practical'))
  const station = (id: string, type: string, extra: string[]) => ['# Item', '## id', id, '## title', 'A station',
    '## subject', 'msk', '## type', type, ...extra, ''].join('\n')

  // A thin OSCE (floor 20), an unscored one, and a station wanting media.
  writeFileSync(join(root, 'practical', 'p.md'), [
    station('PRA-T-1', 'OSCE station', ['## candidate_instructions', 'Do the thing']),
    station('PRA-T-2', 'Skills checklist', ['## media_needed', 'A photo of the trolley']),
  ].join('\n\n---\n\n'))

  try {
    const report = validate(join(root, 'practical', 'p.md')) as { warnings?: string[], errors: string[] }
    const warnings = report.warnings ?? []

    const floor = warnings.find((line) => line.includes("their format's manual asks for"))
    assert.ok(floor, `expected a per-format floor warning, got ${JSON.stringify(warnings)}`)
    assert.match(floor, /OSCE station below 20/, 'the OSCE floor is 20')
    assert.match(floor, /Skills checklist below 16/, 'the checklist floor is 16')

    assert.ok(warnings.some((line) => /carry neither mark_scheme nor marks/.test(line)),
      'a station nobody can be marked on should be reported')
    assert.ok(warnings.some((line) => /set media_needed but no media_recommendations/.test(line)),
      'an asset flagged as missing with nothing saying what to make should be reported')

    // Never an error: these batches are incomplete, not invalid.
    assert.ok(!report.errors.some((error) => /manual asks for|mark_scheme nor marks|media_recommendations/.test(error)),
      'practical completeness must never be an error')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('a clinical case is not asked for a mark scheme it does not use', () => {
  // A case and a lab set score through their decisions, so counting them as
  // unscored would report every correctly-authored case in the repository.
  const root = mkdtempSync(join(tmpdir(), 'practical-case-'))
  mkdirSync(join(root, 'practical'))
  writeFileSync(join(root, 'practical', 'p.md'), ['# Item', '## id', 'PRA-T-3', '## title', 'A case',
    '## subject', 'msk', '## type', 'Clinical case', '## decisions', '### D1\nQ: What?\n* A\n* B', ''].join('\n'))
  try {
    const warnings = (validate(join(root, 'practical', 'p.md')) as { warnings?: string[] }).warnings ?? []
    assert.ok(!warnings.some((line) => /mark_scheme nor marks/.test(line)),
      'a clinical case scores through decisions and must not be counted as unscored')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

/* ---- update rows are not asked for what a create needs -------------------- */

test('a sparse update on a resolvable id is not asked for the authoring fields', () => {
  // 90 lines of "no definition" against records whose live definitions were
  // never in doubt. An update restates its discriminator and the columns it
  // changes; asking it for a definition it is not touching is asking the wrong
  // question, and the lanes started treating simulate as the gate instead.
  const root = mkdtempSync(join(tmpdir(), 'update-semantics-'))
  mkdirSync(join(root, 'concept'))
  const full = ['# Item', '## label', 'A fully authored concept', '## id', 'CON-FND-UPD00000001',
    '## canonical_key', 'upd.full', '## definition', 'd', '## explicit_objective', 'o',
    '## arabic_label', 'x', ''].join('\n')
  const sparse = (extra: string[] = []) => ['# Item', '## label', 'A fully authored concept',
    '## id', 'CON-FND-UPD00000001', '## atomic_claim_ids', '+CLM-U-1', ...extra, ''].join('\n')
  writeFileSync(join(root, 'concept', 'full.md'), full)
  writeFileSync(join(root, 'concept', 'upd.md'), sparse())
  try {
    // Resolved through a --with sibling, which is what the rule allows.
    const update = validate(join(root, 'concept', 'upd.md'), join(root, 'concept', 'full.md'))
    assert.deepEqual(update.errors, [], `a resolvable sparse update should be clean: ${JSON.stringify(update.errors)}`)

    // A create must never certify itself. A row whose id nothing else authors —
    // not live state, not a sibling — is a create, and is still refused for
    // what it lacks. The first version of this rule let such a row vouch for
    // itself, because its own id counted as "authored here", so a brand-new
    // concept was excused the definition it genuinely lacked.
    const alone = mkdtempSync(join(tmpdir(), 'update-create-'))
    mkdirSync(join(alone, 'concept'))
    writeFileSync(join(alone, 'concept', 'new.md'), ['# Item', '## label', 'A brand new concept',
      '## id', 'CON-FND-UPDNOTLIVE01', '## canonical_key', 'upd.notlive', ''].join('\n'))
    try {
      const create = validate(join(alone, 'concept', 'new.md'))
      assert.ok(create.errors.some((error) => error.includes('no definition')),
        `an id nothing authors is a create and still needs a definition: ${JSON.stringify(create.errors)}`)
    } finally {
      rmSync(alone, { recursive: true, force: true })
    }

    // Every check that reads a field the row does name still applies.
    writeFileSync(join(root, 'concept', 'bad.md'), sparse(['## subject', 'cardio']))
    const badSubject = validate(join(root, 'concept', 'bad.md'), join(root, 'concept', 'full.md'))
    assert.ok(badSubject.errors.some((error) => error.includes('curriculum subjects')),
      'an update naming a bad subject must still be refused')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

/* ---- a record's universities, years and modules must agree ---------------- */

test('a year or module belonging to an unnamed university is refused', () => {
  // A shared record has to be traceable per university and per year, and
  // nothing checked the two agreed: a question naming `kau` and `AU_Y1` claimed
  // to be Kasr content sat in an Alexandria year. It matters beyond tidiness —
  // blueprint.ts restricts a concept to exactly the year ids in
  // exam_weight_by_year once any exist, so a key on the wrong year hides the
  // record from that university entirely.
  const root = mkdtempSync(join(tmpdir(), 'scope-agree-'))
  mkdirSync(join(root, 'question'))
  const q = (name: string, extra: string[]) => {
    const body = ['# Item', '## id', `QM-S-${name}`, '## title', 'T', '## subject', 'msk',
      '## format', 'single best answer', '## question', 'Which?', '## correct_answer', 'a',
      '## answer_a', 'A', '## answer_b', 'B', ...extra, ''].join('\n')
    writeFileSync(join(root, 'question', `${name}.md`), body)
    return validate(join(root, 'question', `${name}.md`)).errors
      .filter((error) => /belongs to|no entry in years|not a year of any/.test(error))
  }

  try {
    assert.deepEqual(q('ok', ['## universities', 'kau', '## years', 'KAU_Y1']), [], 'a matching pair is clean')

    assert.match(q('foreign', ['## universities', 'kau', '## years', 'AU_Y1'])[0] ?? '',
      /AU_Y1, which belongs to au/, 'a year of an unnamed university is refused')

    assert.match(q('weight', ['## universities', 'kau', '## years', 'KAU_Y1',
      '## exam_weight_by_year', 'AU_Y1=0.5'])[0] ?? '',
    /exam_weight_by_year is keyed by AU_Y1/, 'an exam weight on a foreign year is refused')

    assert.match(q('mod', ['## universities', 'au', '## years', 'AU_Y1', '## module', '101 ISK'])[0] ?? '',
      /module 101 ISK belongs to kau/, "a module the catalogue places elsewhere is refused")

    // The label form names no university, so it satisfies any named one. 2,469
    // values in the repository are written this way and failing them would turn
    // 41 files red for a convention nobody has ruled on.
    assert.deepEqual(q('label', ['## universities', 'kau', '## years', 'Year 1']), [],
      'a bare year label is not a contradiction')

    // Same id, lower case — 114 of them. Resolution, not pattern-matching.
    assert.deepEqual(q('case', ['## universities', 'kau', '## years', 'kau_y3']), [],
      'a lower-case year id is the same year')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
