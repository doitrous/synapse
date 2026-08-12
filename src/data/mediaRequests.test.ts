import test from 'node:test'
import assert from 'node:assert/strict'
import { articleToSubtopic, overlaySubtopic } from './articleProjection.ts'
import { importRowToContent } from './bulkImport.ts'
import { materialiseNewItem } from './importMerge.ts'
import type { ManagedContentItem } from './contentControl.ts'
import type { ConceptGraph } from './conceptGraph.ts'
import type { MedicalEvidenceStore } from './medicalEvidence.ts'
import type { Subtopic } from './library.ts'

/**
 * A recommendation is an editorial instruction to a human. If any of these
 * strings can be found in what the projection returns, it has leaked into the
 * student-facing surface — which is the exact failure the separate type exists
 * to prevent.
 */
const SECRET_BRIEF = 'LEAK-CANARY-coronary-territory-plate'
const SECRET_PURPOSE = 'LEAK-CANARY-prose-cannot-carry-the-mapping'
const SECRET_NOTES = 'LEAK-CANARY-ask-the-illustrator'
const SECRET_SOURCE = 'LEAK-CANARY-openly-licensed-atlas'
const SECRET_RIGHTS = 'LEAK-CANARY-must-be-CC-BY'

const RECOMMENDATIONS = `### anatomy plate · ${SECRET_BRIEF}
Purpose: ${SECRET_PURPOSE}
Priority: required
Status: needed
Notes: ${SECRET_NOTES}
Source direction: ${SECRET_SOURCE}
Rights: ${SECRET_RIGHTS}`

const evidence = { claims: [], citations: [], resources: [], articleSpans: [], merges: [], coverage: [] } as unknown as MedicalEvidenceStore
const graph = { concepts: [], relations: [] } as ConceptGraph

function articleWith(extra: Record<string, string>): ManagedContentItem {
  return materialiseNewItem(importRowToContent('article', {
    id: 'ART-LEAK-TEST',
    title: 'Coronary circulation',
    subject: 'cvs',
    topic: 'Structure and function',
    summary: 'The coronary arteries supply the myocardium.',
    sections: '### Overview and position\nThe left and right coronary arteries arise from the aortic sinuses.',
    image_recommendations: RECOMMENDATIONS,
    ...extra,
  }, 'row-1'))
}

const CANARIES = [SECRET_BRIEF, SECRET_PURPOSE, SECRET_NOTES, SECRET_SOURCE, SECRET_RIGHTS]

function assertNoLeak(projected: Subtopic, where: string) {
  const serialised = JSON.stringify(projected)
  for (const canary of CANARIES) {
    assert.equal(serialised.includes(canary), false, `${where} leaked "${canary}"`)
  }
  assert.equal('mediaRequests' in projected, false, `${where} carries the request field itself`)
}

test('the article carries its media requests on the admin side', () => {
  // The premise of every assertion below: the data really is there to leak.
  const item = articleWith({})
  assert.equal(item.articleData?.mediaRequests?.length, 1)
  assert.equal(item.articleData?.mediaRequests?.[0].brief, SECRET_BRIEF)
  assert.equal(item.articleData?.mediaRequests?.[0].priority, 'required')
  // A genre-led heading implies an image; the two axes stay separate.
  assert.equal(item.articleData?.mediaRequests?.[0].medium, 'image')
  assert.equal(item.articleData?.mediaRequests?.[0].kind, 'anatomy plate')
  assert.equal(item.articleData?.mediaRequests?.[0].ownerKind, 'article')
})

test('recommendations never reach the student projection of a new article', () => {
  const projected = articleToSubtopic(articleWith({}), evidence, graph, new Map())
  assertNoLeak(projected, 'articleToSubtopic')
})

test('recommendations never reach the projection of an evidence-gated article', () => {
  const item = articleWith({ published_sections: '### Overview and position\nThe coronary arteries arise from the aortic sinuses.' })
  const projected = articleToSubtopic(item, evidence, graph, new Map())
  assertNoLeak(projected, 'articleToSubtopic (gated)')
})

test('recommendations never reach a seeded article overlaid by an admin edit', () => {
  const seedSubtopic = {
    id: 'ART-LEAK-TEST', title: 'Seed', readingMin: 5, summary: 'Seed summary',
    blocks: [], keyPoints: [], questions: [], resources: [],
  } as Subtopic
  const projected = overlaySubtopic(seedSubtopic, articleWith({}), evidence, graph, new Map())
  assertNoLeak(projected, 'overlaySubtopic')
})

test('a supplied recommendation still does not leak — only the media it links to is student-facing', () => {
  const item = articleWith({
    image_recommendations: `${RECOMMENDATIONS}\nStatus: supplied\nMedia id: media-imp-0`,
    media: '### image · https://example.org/coronary.png\nCaption: Coronary territories\nAlt: Diagram of coronary territories\nRights: CC-BY\nNecessity: The territory mapping is the teaching point',
  })
  const projected = articleToSubtopic(item, evidence, graph, new Map())
  assertNoLeak(projected, 'articleToSubtopic (supplied)')
  // The approved media does reach the student; the instruction that produced it does not.
  assert.equal(projected.media?.length, 1)
  assert.equal(projected.media?.[0].caption, 'Coronary territories')
})

test('the projection exposes no admin-only authoring field at all', () => {
  const item = articleWith({
    notes: 'LEAK-CANARY-internal-author-note',
    field_notes: 'moduleIds: LEAK-CANARY-field-note',
    callout_evidence: '### A trap.\nReviewed by: LEAK-CANARY-reviewer',
    lose_the_mark: 'A trap.',
  })
  const serialised = JSON.stringify(articleToSubtopic(item, evidence, graph, new Map()))
  for (const canary of ['LEAK-CANARY-internal-author-note', 'LEAK-CANARY-field-note', 'LEAK-CANARY-reviewer']) {
    assert.equal(serialised.includes(canary), false, `projection leaked "${canary}"`)
  }
})
