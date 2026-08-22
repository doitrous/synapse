/**
 * `paperFromJson` refuses a paper whose `tier`, `sittingYear` or `module`
 * cannot be trusted, loudly and naming the file — see the comment above those
 * checks in `from-json.ts` for why: Years 2-5 papers all arrive as JSON, and
 * nothing at the type level stops a misspelt tier reaching `examSignal.ts`,
 * which silently coerces anything it does not recognise to `'other'`.
 *
 *   node --test --experimental-strip-types scripts/kasr/seeds/from-json.test.ts
 */
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { paperFromJson } from './from-json.ts'

// A real chapter this module's own subject tree defines — see
// scripts/kasr/extract/102-INT/biochem-chapters.json — so `knownPaths`
// (which reads the module's actual chapter files) accepts it.
const VALID_MODULE_PATH = '102 INT > Biochemistry > Amino Acids of Biological Importance'

function basePaper(overrides: Record<string, unknown> = {}) {
  return {
    source: {
      id: 'src_test0000000000000000',
      file: 'test-fixture.pdf',
      module: '102 INT',
      sittingYear: 2025,
      tier: 'end_of_year',
      sections: ['Written'],
      ...overrides,
    },
    seeds: [{
      q: 1,
      section: 'Written',
      page: 1,
      marks: 1,
      asked: 'What is the smallest amino acid?',
      label: 'smallest amino acid',
      key: 'w1',
      definition: 'Glycine is the smallest amino acid.',
      objective: 'Identify glycine as the smallest amino acid.',
      pitfall: 'Confusing with alanine.',
      subject: 'gi',
      primary: 'glycine',
      secondary: [],
      modulePath: VALID_MODULE_PATH,
      type: 'short_answer',
    }],
    schemes: {
      W1: { format: 'short_answer', prompt: 'What is the smallest amino acid?', expects: ['Glycine'] },
    },
  }
}

function writeFixture(dir: string, name: string, paper: unknown): string {
  const path = join(dir, name)
  writeFileSync(path, JSON.stringify(paper))
  return path
}

test('paperFromJson: well-formed paper loads', () => {
  const dir = mkdtempSync(join(tmpdir(), 'from-json-test-'))
  try {
    const path = writeFixture(dir, 'good.json', basePaper())
    const loaded = paperFromJson(path)
    assert.equal(loaded.seeds.length, 1)
    assert.equal(loaded.source.module, '102 INT')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('paperFromJson: refuses a tier not in EXAM_SOURCE_TIERS', () => {
  const dir = mkdtempSync(join(tmpdir(), 'from-json-test-'))
  try {
    const path = writeFixture(dir, 'bad-tier.json', basePaper({ tier: 'resit' }))
    assert.throws(() => paperFromJson(path), /source\.tier "resit" is not one of/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('paperFromJson: refuses a non-numeric sittingYear', () => {
  const dir = mkdtempSync(join(tmpdir(), 'from-json-test-'))
  try {
    const path = writeFixture(dir, 'bad-year.json', basePaper({ sittingYear: '2025' }))
    assert.throws(() => paperFromJson(path), /source\.sittingYear "2025" is not a number/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('paperFromJson: refuses a module not in the catalogue', () => {
  const dir = mkdtempSync(join(tmpdir(), 'from-json-test-'))
  try {
    const path = writeFixture(dir, 'bad-module.json', basePaper({ module: '999 XXX' }))
    assert.throws(() => paperFromJson(path), /"999 XXX" is not a module in the catalogue/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
