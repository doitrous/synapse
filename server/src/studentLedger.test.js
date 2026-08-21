import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  PRIVATE_FIELDS,
  PUBLIC_FIELDS,
  redactItem,
  redactLedgerForStudent,
  redactMediaForStudent,
  MEDIA_PRIVATE_FIELDS,
  MEDIA_STUDENT_FIELDS,
  REDACTED_STATE_KEYS,
} from './studentLedger.js'

/** A published question carrying everything an author would put on one. */
function authoredQuestion(overrides = {}) {
  return {
    id: 'q-1',
    kind: 'question',
    title: 'Which artery supplies the sinoatrial node?',
    subjectId: 'cvs',
    status: 'Published',
    owner: 'omar',
    updatedAt: '2026-08-21T00:00:00.000Z',
    fields: { Topic: 'Cardiac anatomy' },
    source: { origin: 'university', universityId: 'kau', reference: 'EOY 101 2025' },
    questionData: {
      answers: [
        { label: 'A', text: 'Right coronary', explanation: 'In most hearts.' },
        { label: 'B', text: 'Left circumflex', explanation: 'In about 40%.' },
      ],
      correctAnswer: 'A',
      tags: { mainConceptIds: ['CON-CVS-1'], conceptIds: [], topic: 'Cardiac anatomy' },
      libraryIds: [], resourceIds: [], attachedImage: '', attachments: [],
      learningObjective: 'Name the SA nodal supply.',
      authorNotes: 'Lifted from the 199 paper — rewrite the stem before publishing.',
      mediaRequests: [{ id: 'mr-1', brief: 'Coronary tree diagram, unlabelled' }],
    },
    ...overrides,
  }
}

describe('What a student receives of the content ledger', () => {
  test('an unpublished item is withheld entirely', () => {
    for (const status of ['Draft', 'Archived', 'In review', undefined]) {
      assert.equal(redactItem(authoredQuestion({ status })), null, `status ${status}`)
    }
  })

  test('a published item keeps what the student surfaces actually read', () => {
    const out = redactItem(authoredQuestion())
    assert.equal(out.id, 'q-1')
    assert.equal(out.title, 'Which artery supplies the sinoatrial node?')
    assert.equal(out.subjectId, 'cvs')
    assert.equal(out.questionData.correctAnswer, 'A')
    assert.equal(out.questionData.answers.length, 2)
    assert.equal(out.questionData.learningObjective, 'Name the SA nodal supply.')
    assert.deepEqual(out.questionData.tags.mainConceptIds, ['CON-CVS-1'])
    assert.equal(out.fields.Topic, 'Cardiac anatomy')
  })

  test('the private half never leaves', () => {
    const out = redactItem(authoredQuestion())
    assert.equal(out.source, undefined, 'provenance of the borrowed paper')
    assert.equal(out.owner, undefined, 'which admin wrote it')
    assert.equal(out.questionData.authorNotes, undefined, 'notes between authors')
    assert.equal(out.questionData.mediaRequests, undefined, 'media still being chased')
    // Belt and braces: no admin-only string survives anywhere in the payload,
    // however deeply a future field buries it.
    const wire = JSON.stringify(out)
    assert.ok(!wire.includes('Lifted from the 199 paper'))
    assert.ok(!wire.includes('Coronary tree diagram'))
    assert.ok(!wire.includes('EOY 101 2025'))
  })

  test('the provenance fields the extraction programme adds do not leak', () => {
    const item = authoredQuestion()
    item.questionData.sourceQuestion = 'Q3. The SA node is supplied by…'
    item.questionData.sourceOccurrences = [{ page: 4, file: 'EOY 101 199' }]
    item.questionData.originalWording = 'verbatim from the paper'
    const out = redactItem(item)
    assert.equal(out.questionData.sourceQuestion, undefined)
    assert.equal(out.questionData.sourceOccurrences, undefined)
    assert.equal(out.questionData.originalWording, undefined)
  })

  test('private keys are stripped at any depth', () => {
    const item = authoredQuestion()
    item.articleData = {
      summary: 'Coronary circulation',
      sections: [{ id: 's1', body: 'text', mediaRequests: [{ brief: 'nested and private' }] }],
      publicationStatus: 'Published',
    }
    const out = redactItem(item)
    assert.equal(out.articleData.summary, 'Coronary circulation')
    assert.equal(out.articleData.sections[0].mediaRequests, undefined)
    assert.ok(!JSON.stringify(out).includes('nested and private'))
  })

  test('a ledger yields only its published items', () => {
    const ledger = [
      authoredQuestion({ id: 'q-1' }),
      authoredQuestion({ id: 'q-2', status: 'Draft' }),
      authoredQuestion({ id: 'q-3' }),
    ]
    const out = redactLedgerForStudent(ledger)
    assert.deepEqual(out.map((item) => item.id), ['q-1', 'q-3'])
  })

  test('a malformed ledger yields an empty one rather than throwing', () => {
    assert.deepEqual(redactLedgerForStudent(null), [])
    assert.deepEqual(redactLedgerForStudent({}), [])
    assert.deepEqual(redactLedgerForStudent(['nonsense', 42, null]), [])
  })

  test('a practical keeps what its runner needs and loses what it does not', () => {
    const practical = {
      id: 'p-1', kind: 'practical', title: 'Chest examination', subjectId: 'cvs',
      status: 'Published', owner: 'omar', updatedAt: '2026-08-21T00:00:00.000Z', fields: {},
      source: { origin: 'university', reference: 'practical 197' },
      practicalData: {
        format: 'osce',
        candidateInstructions: 'Examine this patient.',
        markScheme: [{ line: 'Washes hands', marks: 1 }],
        mainConceptIds: ['CON-CVS-2'],
        mediaRequests: [{ brief: 'still being chased' }],
        authorNotes: 'check marks against the 198 paper',
      },
    }
    const out = redactItem(practical)
    assert.equal(out.practicalData.candidateInstructions, 'Examine this patient.')
    assert.equal(out.practicalData.markScheme.length, 1)
    assert.equal(out.practicalData.mediaRequests, undefined)
    assert.equal(out.practicalData.authorNotes, undefined)
    assert.equal(out.source, undefined)
  })
})

/**
 * The guard that keeps a deny-list honest.
 *
 * `studentLedger.js` removes named fields rather than keeping named ones, which
 * is the right trade for a payload nine different projections read — but it has
 * the deny-list's weakness: a field added to an authoring type tomorrow reaches
 * students by default, and nobody is asked whether it should.
 *
 * So the authoring interfaces are read out of the TypeScript at test time and
 * every field is required to appear in one of the two sets. Adding a field to
 * `contentControl.ts` without classifying it fails here, by name. This mirrors
 * `scripts/report-import-field-parity.mjs`, which re-reads the same types at
 * run time for the same reason.
 */
describe('Field classification cannot drift', () => {
  test('every authoring field is classified as public or private', async () => {
    const { readFile } = await import('node:fs/promises')
    const { fileURLToPath } = await import('node:url')
    const { dirname, join } = await import('node:path')
    const here = dirname(fileURLToPath(import.meta.url))
    const typesPath = join(here, '..', '..', 'src', 'data', 'contentControl.ts')
    const source = await readFile(typesPath, 'utf8')

    const INTERFACES = [
      'ManagedContentItem', 'QuestionAuthoringData', 'ArticleAuthoringData',
      'PracticalCommon', 'OsceAuthoringData', 'CaseAuthoringData',
      'LabAuthoringData', 'ResourceAuthoringData', 'QuestionTags',
    ]

    const unclassified = []
    for (const name of INTERFACES) {
      const match = new RegExp(`export interface ${name}[^{]*\\{([\\s\\S]*?)\\n\\}`).exec(source)
      assert.ok(match, `interface ${name} not found in contentControl.ts — rename or remove it here too`)
      for (const [, field] of match[1].matchAll(/^ {2}([a-zA-Z_][a-zA-Z0-9_]*)\??\s*:/gm)) {
        if (!PRIVATE_FIELDS.has(field) && !PUBLIC_FIELDS.has(field)) {
          unclassified.push(`${name}.${field}`)
        }
      }
    }

    assert.deepEqual(
      unclassified, [],
      'New authoring field(s) with no decision about who may see them. Add each ' +
      'to PRIVATE_FIELDS or PUBLIC_FIELDS in server/src/studentLedger.js:\n  ' +
      unclassified.join('\n  '),
    )
  })

  test('nothing is classified both ways', () => {
    const both = [...PRIVATE_FIELDS].filter((field) => PUBLIC_FIELDS.has(field))
    assert.deepEqual(both, [], `classified as both public and private: ${both.join(', ')}`)
  })
})

describe('The media library a student receives', () => {
  const released = {
    id: 'med-1', storageKey: 'media/ab/cd/hash.png', sha256: 'hash', sizeBytes: 4096,
    mimeType: 'image/png', width: 800, height: 600,
    title: 'Simple columnar epithelium, H&E', altText: 'A micrograph of simple columnar epithelium',
    rights: 'Licensed from the department, 2025', tags: { moduleIds: ['101 ISK'], conceptIds: ['CON-FND-1'] },
    uploadedBy: 'omar@example.com', uploadedAt: '2026-01-01T00:00:00.000Z',
  }
  const unreleased = {
    id: 'med-2', storageKey: 'media/ef/01/scan.png', sha256: 'scan', sizeBytes: 900_000,
    mimeType: 'image/png', width: 1200, height: 1600,
    title: 'EOY (ISK - 101) 199 page 3 — source scan', altText: '', rights: '',
    tags: {}, uploadedBy: 'omar@example.com', uploadedAt: '2026-01-01T00:00:00.000Z',
  }

  test('an unreleased record does not leave at all', () => {
    const out = redactMediaForStudent({ records: [released, unreleased] })
    assert.deepEqual(out.records.map((record) => record.id), ['med-1'])
  })

  test('the exam paper a source scan names never reaches a student', () => {
    // The disclosure this exists to stop. `title` is the one field the picker
    // shows, so an authoring upload names its paper there — and the whole
    // document used to be served to students verbatim.
    const serialised = JSON.stringify(redactMediaForStudent({ records: [unreleased] }))
    assert.ok(!serialised.includes('199'), serialised)
    assert.ok(!serialised.includes('EOY'), serialised)
  })

  test('a released record keeps only what renders it', () => {
    const [record] = redactMediaForStudent({ records: [released] }).records
    assert.deepEqual(Object.keys(record).sort(), ['altText', 'height', 'id', 'mimeType', 'title', 'width'])
  })

  test('storage identity, provenance and rights are withheld', () => {
    const [record] = redactMediaForStudent({ records: [released] }).records
    for (const field of MEDIA_PRIVATE_FIELDS) {
      assert.equal(record[field], undefined, `${field} must not reach a student`)
    }
  })

  test('a malformed document yields an empty library rather than a thrown request', () => {
    for (const bad of [null, undefined, {}, { records: 'nope' }, []]) {
      assert.deepEqual(redactMediaForStudent(bad), { records: [] })
    }
  })

  test('the media key is redacted on the way out', () => {
    assert.equal(REDACTED_STATE_KEYS.get('synapse-media-library-v1'), redactMediaForStudent)
  })

  test('every field of MediaRecord is classified, so a new one cannot leak by being forgotten', async () => {
    // The same drift guard the ledger has. A field added to `MediaRecord` and
    // classified nowhere would otherwise reach students the moment it exists.
    const { readFile } = await import('node:fs/promises')
    const { fileURLToPath } = await import('node:url')
    const { dirname, join } = await import('node:path')
    const here = dirname(fileURLToPath(import.meta.url))
    const source = await readFile(join(here, '..', '..', 'src', 'data', 'mediaLibrary.ts'), 'utf8')
    const body = source.match(/export interface MediaRecord \{([\s\S]*?)\n\}/)?.[1]
    assert.ok(body, 'interface MediaRecord not found in mediaLibrary.ts — rename or remove it here too')

    const declared = [...body.matchAll(/^\s{2}([a-zA-Z][a-zA-Z0-9]*)\??:/gm)].map((match) => match[1])
    assert.ok(declared.length >= 10, `only found ${declared.length} fields — the parser needs updating`)

    const classified = new Set([...MEDIA_STUDENT_FIELDS, ...MEDIA_PRIVATE_FIELDS])
    const unclassified = declared.filter((field) => !classified.has(field))
    assert.deepEqual(unclassified, [],
      `unclassified MediaRecord fields — add each to MEDIA_STUDENT_FIELDS or MEDIA_PRIVATE_FIELDS: ${unclassified.join(', ')}`)
  })
})
