import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * `check-concept-ids.ts`, driven end to end against a throwaway `docs/` tree.
 *
 * A process test because the thing under test is which directories the script
 * decides to scan, and that is resolved from the working directory rather than
 * passed in. Running it with `cwd` set to a temp tree is the only way to ask
 * "would it have seen the other university's batch".
 *
 * The bug these pin: the scan was hardcoded to
 * `docs/Kasr-Source-Imports/concept`, so a concept authored under
 * `docs/Alexandria-Source-Imports/concept/` could reuse a Kasr canonical key
 * with a different ID and the gate reported "no rival ids", exit 0. A canonical
 * key is global — one medical idea is one concept ID, and a university is an
 * overlay on that record — so that is the precise collision this check exists
 * to refuse, and it was invisible.
 */

const script = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'scripts', 'kasr', 'check-concept-ids.ts')

/**
 * Run the checker inside `root`, returning its exit code and combined output.
 *
 * `spawnSync` rather than `execFileSync` because this script says its most
 * important things on stderr — the problem list, and the "those files are
 * clean" verdict that accompanies a *zero* exit. `execFileSync` returns stdout
 * alone on success, so a helper built on it silently drops the sentence under
 * test and the assertion fails against output the script did produce.
 */
function check(root: string, ...args: string[]) {
  const run = spawnSync(process.execPath, ['--experimental-strip-types', script, ...args], {
    cwd: root, encoding: 'utf8',
  })
  if (run.error) throw run.error
  return { code: run.status ?? 1, output: `${run.stdout ?? ''}${run.stderr ?? ''}` }
}

/** One concept block, in the batch format the checker parses. */
const concept = (id: string, key: string, label = 'A concept') =>
  ['# Item', '## id', id, '## label', label, '## canonical_key', key, ''].join('\n')

/** A `docs/` tree with one batch per named university. */
function authorTree(batches: { university: string, file: string, body: string }[]) {
  const root = mkdtempSync(join(tmpdir(), 'concept-ids-'))
  for (const batch of batches) {
    const dir = join(root, 'docs', `${batch.university}-Source-Imports`, 'concept')
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, batch.file), batch.body)
  }
  return root
}

test('one canonical key under two universities with different ids is refused', () => {
  const root = authorTree([
    { university: 'Kasr', file: '102-INT-concepts.md', body: concept('CON-GIT-9589A7077392FD', 'cellulose-dietary-importance') },
    { university: 'Alexandria', file: 'AU-MED-102-concepts.md', body: concept('CON-GIT-DEADBEEF000001', 'cellulose-dietary-importance') },
  ])
  try {
    const { code, output } = check(root)
    assert.equal(code, 1, `expected a refusal, got exit ${code}:\n${output}`)
    assert.match(output, /cellulose-dietary-importance/)
    assert.match(output, /CON-GIT-9589A7077392FD/)
    assert.match(output, /CON-GIT-DEADBEEF000001/)
    // Both universities named, and by path — two universities may each author a
    // file called `concepts.md`, and a bare basename would not say whose.
    assert.match(output, /Alexandria-Source-Imports\/concept\/AU-MED-102-concepts\.md/)
    assert.match(output, /Kasr-Source-Imports\/concept\/102-INT-concepts\.md/)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('the same key under two universities with the SAME id is allowed', () => {
  // The other half of the rule, and the reason this is not simply "keys must be
  // unique". One idea is one concept ID; a second university teaching it files
  // the same key against the same ID and imports as an overlay on that record,
  // not as a duplicate. Refusing this would break every module that authors one
  // concept from two sources.
  const root = authorTree([
    { university: 'Kasr', file: '102-INT-concepts.md', body: concept('CON-GIT-9589A7077392FD', 'cellulose-dietary-importance') },
    { university: 'Alexandria', file: 'AU-MED-102-concepts.md', body: concept('CON-GIT-9589A7077392FD', 'cellulose-dietary-importance') },
  ])
  try {
    const { code, output } = check(root)
    assert.equal(code, 0, `expected this to pass, got exit ${code}:\n${output}`)
    assert.match(output, /no rival ids/)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('a university added later is scanned without editing the checker', () => {
  // Discovered by shape, not by name — the same rule `find-existing.mjs` uses.
  // A checker that needs a line added per university is one university behind
  // for however long nobody notices, which is how the Alexandria gap opened.
  const root = authorTree([
    { university: 'Kasr', file: 'k.md', body: concept('CON-FND-AAAAAAAAAAAAAA', 'shared.key.one') },
    { university: 'AinShams', file: 'a.md', body: concept('CON-FND-BBBBBBBBBBBBBB', 'shared.key.one') },
    { university: 'Helwan', file: 'h.md', body: concept('CON-FND-CCCCCCCCCCCCCC', 'shared.key.two') },
  ])
  try {
    const { code, output } = check(root)
    assert.equal(code, 1, `expected the Ain Shams collision to be caught, got exit ${code}`)
    assert.match(output, /AinShams-Source-Imports/)
    // Helwan's key is unique, so it is scanned but not faulted.
    assert.ok(!/shared\.key\.two/.test(output.split('problem(s)')[1] ?? ''), 'the unique key should not be reported as a problem')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('naming your own file still scopes the exit code across universities', () => {
  // A lane must be able to show its own files are clean while another lane's
  // are broken. That narrowing existed already; this checks it survived the
  // move from basenames to paths.
  const root = authorTree([
    { university: 'Kasr', file: 'broken.md', body: `${concept('CON-FND-1111111111111A', 'k.dup')}\n---\n${concept('CON-FND-2222222222222B', 'k.dup')}` },
    { university: 'Alexandria', file: 'mine.md', body: concept('CON-FND-3333333333333C', 'au.clean') },
  ])
  try {
    const theirs = check(root)
    assert.equal(theirs.code, 1, 'the duplicate should fail an unscoped run')

    const mine = check(root, 'docs/Alexandria-Source-Imports/concept/mine.md')
    assert.equal(mine.code, 0, `naming a clean file should exit 0, got:\n${mine.output}`)
    assert.match(mine.output, /Those files are clean/)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
