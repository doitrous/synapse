import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  PRIVATE_FIELDS,
  PUBLIC_FIELDS,
  hasUnresolvedRequiredMedia,
  hasUnreleasedManagedMedia,
  archiveScopeBlockedPublishedItems,
  mediaBlockedPublishedItems,
  newlyArchiveScopeBlockedPublishedItems,
  newlyMediaBlockedPublishedItems,
  publicationArchiveScopeBlockers,
  publicationMediaBlockers,
  redactItem,
  redactLedgerForStudent,
  redactMediaForStudent,
  redactModuleSchedulesForStudent,
  releasedMediaIdsFromDocument,
  MEDIA_PRIVATE_FIELDS,
  MEDIA_STUDENT_FIELDS,
  REDACTED_STATE_KEYS,
} from './studentLedger.js'
import { SCHEDULE_KEY, SCHEDULE_PUBLISH_STATE_KEY } from './academic.js'

const academicCatalogue = [{
  id: 'kau', short: 'KAU', name: 'Kasr Alainy',
  years: [{
    id: 'KAU_Y1', year: 'Year 1',
    courses: [
      { id: 'course-1', name: '101 ISK', moduleId: '101 ISK' },
      { id: 'course-2', name: 'Cardiovascular foundations' },
    ],
  }],
}, {
  id: 'asu', short: 'ASU', name: 'Ain Shams',
  years: [{ id: 'ASU_Y2', year: 'Year 2', courses: [{ id: 'course-3', name: 'ASU CVS', moduleId: 'ASU-CVS' }] }],
}]

function detachedArchive(overrides = {}) {
  return authoredQuestion({
    status: 'Archived',
    archive: {
      operationId: 'archive-1', actorId: 'admin-1', reason: 'Legacy generated catalogue',
      archivedAt: '2026-08-25T20:00:00.000Z', originalStatus: 'Published', detached: true,
    },
    questionData: {
      ...authoredQuestion().questionData,
      tags: { moduleIds: [], moduleSubjectPaths: [], universityIds: [], years: [], questionOnlyFor: [] },
    },
    ...overrides,
  })
}

test('a detached archive can publish only with known module and audience IDs', () => {
  const safe = detachedArchive({
    status: 'Published',
    questionData: {
      ...authoredQuestion().questionData,
      tags: { moduleIds: ['101 ISK'], universityIds: ['kau'], years: ['KAU_Y1'], questionOnlyFor: [] },
    },
  })
  assert.deepEqual(publicationArchiveScopeBlockers(safe, academicCatalogue), [])
  assert.deepEqual(archiveScopeBlockedPublishedItems([safe], academicCatalogue), [])

  const detached = detachedArchive({ status: 'Published' })
  assert.deepEqual(publicationArchiveScopeBlockers(detached, academicCatalogue), [
    'module assignment is required',
    'audience assignment is required',
  ])
  assert.notEqual(redactItem(safe, null, academicCatalogue), null)
  assert.equal(redactItem(detached, null, academicCatalogue), null)
})

test('unknown module, university, year and hard-audience IDs are all rejected', () => {
  const unsafe = detachedArchive({
    status: 'Published',
    questionData: {
      ...authoredQuestion().questionData,
      tags: {
        moduleIds: ['MISSING-MODULE'], universityIds: ['missing-university'],
        years: ['MISSING_YEAR'], questionOnlyFor: ['MISSING_ONLY_FOR'],
      },
    },
  })
  assert.deepEqual(publicationArchiveScopeBlockers(unsafe, academicCatalogue), [
    'unknown module IDs: MISSING-MODULE',
    'unknown university IDs: missing-university',
    'unknown year IDs: MISSING_YEAR',
    'unknown question-only audience IDs: MISSING_ONLY_FOR',
  ])
})

test('module paths and catalogue-derived module IDs are validated as real modules', () => {
  const fromPath = detachedArchive({
    status: 'Published',
    questionData: {
      ...authoredQuestion().questionData,
      tags: { moduleIds: [], moduleSubjectPaths: ['101 ISK > Anatomy'], universityIds: [], years: ['KAU_Y1'] },
    },
  })
  assert.deepEqual(publicationArchiveScopeBlockers(fromPath, academicCatalogue), [])

  const derived = detachedArchive({
    status: 'Published',
    questionData: {
      ...authoredQuestion().questionData,
      tags: { moduleIds: ['CARD 02'], universityIds: ['kau'], years: [] },
    },
  })
  assert.deepEqual(publicationArchiveScopeBlockers(derived, academicCatalogue), [])
})

test('real IDs cannot be combined across unrelated university audiences', () => {
  const wrongYear = detachedArchive({
    status: 'Published',
    questionData: {
      ...authoredQuestion().questionData,
      tags: { moduleIds: ['101 ISK'], universityIds: ['kau'], years: ['ASU_Y2'] },
    },
  })
  assert.deepEqual(publicationArchiveScopeBlockers(wrongYear, academicCatalogue), [
    'year IDs outside assigned universities: ASU_Y2',
    'module IDs outside assigned audience: 101 ISK',
  ])

  const wrongModule = detachedArchive({
    status: 'Published',
    questionData: {
      ...authoredQuestion().questionData,
      tags: { moduleIds: ['ASU-CVS'], universityIds: ['kau'], years: ['KAU_Y1'] },
    },
  })
  assert.deepEqual(publicationArchiveScopeBlockers(wrongModule, academicCatalogue), [
    'module IDs outside assigned audience: ASU-CVS',
  ])

  const wrongYearWithinUniversity = detachedArchive({
    status: 'Published',
    questionData: {
      ...authoredQuestion().questionData,
      tags: { moduleIds: ['101 ISK'], universityIds: ['kau'], years: ['KAU_Y2'] },
    },
  })
  const catalogueWithSecondKauYear = [{
    ...academicCatalogue[0],
    years: [...academicCatalogue[0].years, { id: 'KAU_Y2', year: 'Year 2', courses: [] }],
  }, academicCatalogue[1]]
  assert.deepEqual(publicationArchiveScopeBlockers(wrongYearWithinUniversity, catalogueWithSecondKauYear), [
    'module IDs outside assigned audience: 101 ISK',
  ])
})

test('articles use the same authoritative module and audience rule', () => {
  const article = {
    id: 'a-1', kind: 'article', title: 'Legacy article', status: 'Published',
    archive: { detached: true },
    articleData: { moduleIds: ['101 ISK'], moduleSubjectPaths: [], universityIds: ['kau'], yearIds: ['KAU_Y1'] },
  }
  assert.deepEqual(publicationArchiveScopeBlockers(article, academicCatalogue), [])
  assert.deepEqual(publicationArchiveScopeBlockers({
    ...article,
    articleData: { ...article.articleData, moduleIds: ['UNKNOWN'] },
  }, academicCatalogue), ['unknown module IDs: UNKNOWN'])
})

test('the write gate reports only newly invalid archive publications', () => {
  const archived = detachedArchive()
  const newlyPublished = { ...archived, status: 'Published' }
  assert.deepEqual(
    newlyArchiveScopeBlockedPublishedItems([archived], [newlyPublished], academicCatalogue),
    [{ id: archived.id, title: archived.title, blockers: ['module assignment is required', 'audience assignment is required'] }],
  )
  assert.deepEqual(
    newlyArchiveScopeBlockedPublishedItems([newlyPublished], [newlyPublished], academicCatalogue),
    [],
    'an already-invalid publication remains editable for remediation',
  )

  const ordinary = authoredQuestion({ status: 'Published' })
  assert.deepEqual(newlyArchiveScopeBlockedPublishedItems([], [ordinary], academicCatalogue), [])
})

test('archive detachment metadata cannot be removed or bypassed while publishing', () => {
  const archived = detachedArchive()
  const withoutMarker = { ...archived, archive: undefined }
  assert.deepEqual(
    newlyArchiveScopeBlockedPublishedItems([archived], [withoutMarker], academicCatalogue),
    [{ id: archived.id, title: archived.title, blockers: ['archive detachment metadata cannot be removed'] }],
  )

  const publishedWithoutMarker = { ...withoutMarker, status: 'Published' }
  assert.deepEqual(
    newlyArchiveScopeBlockedPublishedItems([archived], [publishedWithoutMarker], academicCatalogue),
    [{ id: archived.id, title: archived.title, blockers: ['archive detachment metadata cannot be removed'] }],
  )
})

test('required media excludes published content at any anchor until an asset fulfils it', () => {
  const item = authoredQuestion({
    questionData: {
      mediaRequests: [{ priority: 'required', status: 'needed' }],
      answers: [{ text: 'A', mediaRequests: [{ priority: 'required', status: 'supplied', mediaId: 'media-2' }] }],
    },
  })
  assert.equal(hasUnresolvedRequiredMedia(item), true)
  assert.equal(redactItem(item), null)

  item.questionData.mediaRequests[0] = { priority: 'required', status: 'supplied', mediaId: 'media-1' }
  assert.equal(hasUnresolvedRequiredMedia(item), false)
  assert.notEqual(redactItem(item), null)
})

test('declining required media does not bypass the publication gate', () => {
  const item = authoredQuestion({
    questionData: { mediaRequests: [{ priority: 'required', status: 'declined' }] },
  })
  assert.equal(redactItem(item), null)
})

test('a supplied request still waits for released media metadata', () => {
  const item = authoredQuestion({
    questionData: { mediaRequests: [{ priority: 'required', status: 'supplied', mediaId: 'med-unreleased' }] },
  })
  assert.equal(redactItem(item, new Set()), null)
  assert.notEqual(redactItem(item, new Set(['med-unreleased'])), null)
})

test('direct histology and practical media URLs cannot bypass release', () => {
  const slide = {
    id: 'h-1', kind: 'histology', title: 'Slide', subjectId: 'path', status: 'Published',
    owner: 'reviewer', updatedAt: '2026-08-25T00:00:00.000Z', fields: {},
    histologyData: { views: [{ objective: 4, image: '/media/med-slide' }], structures: [] },
  }
  assert.equal(hasUnreleasedManagedMedia(slide, new Set()), true)
  assert.equal(redactItem(slide, new Set()), null)
  assert.notEqual(redactItem(slide, new Set(['med-slide'])), null)
})

test('the publication write gate reports exactly which published items are media-blocked', () => {
  const released = {
    id: 'med-ready', storageKey: 'media/aa/bb/ready.png', altText: 'Teaching image', rights: 'Owned',
  }
  const releasedIds = releasedMediaIdsFromDocument({ records: [released, { id: 'med-draft', storageKey: '', altText: '', rights: '' }] })
  assert.deepEqual([...releasedIds], ['med-ready'])

  const waiting = authoredQuestion({
    id: 'q-waiting',
    questionData: {
      ...authoredQuestion().questionData,
      mediaRequests: [{ priority: 'required', status: 'supplied', mediaId: 'med-draft' }],
    },
  })
  const safe = authoredQuestion({
    id: 'q-safe',
    questionData: {
      ...authoredQuestion().questionData,
      mediaRequests: [{ priority: 'required', status: 'supplied', mediaId: 'med-ready' }],
    },
  })
  assert.deepEqual(publicationMediaBlockers(safe, releasedIds), [])
  assert.deepEqual(mediaBlockedPublishedItems([waiting, safe], releasedIds), [{
    id: 'q-waiting',
    title: waiting.title,
    blockers: ['required media is unresolved', 'managed media is not released'],
  }])

  const newlyBlocked = authoredQuestion({
    id: 'q-new',
    questionData: {
      ...authoredQuestion().questionData,
      mediaRequests: [{ priority: 'required', status: 'needed' }],
    },
  })
  assert.deepEqual(
    newlyMediaBlockedPublishedItems([waiting], releasedIds, [waiting, newlyBlocked], releasedIds).map((item) => item.id),
    ['q-new'],
    'an existing block stays repairable while a newly introduced one is refused',
  )
  assert.deepEqual(
    newlyMediaBlockedPublishedItems([waiting, newlyBlocked], releasedIds, [safe, newlyBlocked], releasedIds),
    [],
    'a write that repairs one legacy block is allowed even while another remains',
  )
})

test('supplying verified media to a published item is not blocked by the descriptive save still being in flight', () => {
  // A reviewer supplies media to an already-published question. The placement
  // rides the ledger save; the media record's alt text and rights ride a second,
  // separate save to the media document. If the ledger lands first, the media id
  // is not yet "released", which used to refuse the supply and lose the reviewer's
  // work. The state route now counts the just-supplied, verified id as acceptable
  // (see enforceMediaSupply.readyMediaIds) — modelled here by adding it to the
  // after-released set — while a managed id NOT part of the supply is still blocked.
  const before = authoredQuestion({
    id: 'q-pub',
    questionData: { ...authoredQuestion().questionData, media: [], mediaRequests: [{ priority: 'optional', status: 'needed' }] },
  })
  const supplied = authoredQuestion({
    id: 'q-pub',
    questionData: {
      ...authoredQuestion().questionData,
      media: [{ id: 'plc-1', mediaId: 'med-supplied', slot: 'stem' }],
      mediaRequests: [{ priority: 'optional', status: 'supplied', mediaId: 'med-supplied' }],
    },
  })
  const storedReleased = new Set() // the descriptive media save has not landed yet
  const withSupply = new Set([...storedReleased, 'med-supplied'])
  assert.deepEqual(
    newlyMediaBlockedPublishedItems([before], storedReleased, [supplied], withSupply),
    [],
    'a verified supply is accepted even before its descriptive record is released',
  )

  // But media that was never supplied through a request must still be released.
  const sneaky = authoredQuestion({
    id: 'q-pub2',
    questionData: { ...authoredQuestion().questionData, media: [{ id: 'plc-9', mediaId: 'med-unsupplied', slot: 'stem' }] },
  })
  const beforeSneaky = authoredQuestion({ id: 'q-pub2', questionData: { ...authoredQuestion().questionData, media: [] } })
  assert.deepEqual(
    newlyMediaBlockedPublishedItems([beforeSneaky], storedReleased, [sneaky], withSupply).map((item) => item.id),
    ['q-pub2'],
    'managed media outside the supply is still gated on release',
  )
})

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
    assert.equal(REDACTED_STATE_KEYS.get('nishany-media-library-v1'), redactMediaForStudent)
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

describe('redactModuleSchedulesForStudent', () => {
  const document = {
    'kau::KAU_Y1::course-1': [{ id: 'block-1', title: 'Published block' }],
    'kau::KAU_Y1::course-2': [{ id: 'block-2', title: 'Unpublished block' }],
    'legacy::kau::Year 1::course-2': [{ id: 'block-2-legacy', title: 'Unpublished legacy block' }],
    [SCHEDULE_PUBLISH_STATE_KEY]: { 'kau::KAU_Y1::course-1': true },
  }

  test('a student receives no blocks for a module missing from the publish map', () => {
    const redacted = redactModuleSchedulesForStudent(document)
    assert.deepEqual(redacted['kau::KAU_Y1::course-2'], [])
    assert.deepEqual(redacted['legacy::kau::Year 1::course-2'], [])
  })

  test('a student receives the blocks of a published module', () => {
    const redacted = redactModuleSchedulesForStudent(document)
    assert.deepEqual(redacted['kau::KAU_Y1::course-1'], document['kau::KAU_Y1::course-1'])
  })

  test('the publish-state map itself is left intact', () => {
    const redacted = redactModuleSchedulesForStudent(document)
    assert.deepEqual(redacted[SCHEDULE_PUBLISH_STATE_KEY], document[SCHEDULE_PUBLISH_STATE_KEY])
  })

  test('a malformed document is returned unchanged rather than thrown', () => {
    for (const bad of [null, undefined, [], 'nope', 42]) {
      assert.equal(redactModuleSchedulesForStudent(bad), bad)
    }
  })

  test('the schedule key is redacted on the way out', () => {
    assert.equal(REDACTED_STATE_KEYS.get(SCHEDULE_KEY), redactModuleSchedulesForStudent)
  })
})
