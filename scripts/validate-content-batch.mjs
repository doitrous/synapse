/**
 * Check an authored batch file against the importer before anyone imports it.
 *
 *   node --experimental-strip-types scripts/validate-content-batch.mjs docs/medical-library-program/batches/SYS-FND-CONCEPT-001.md
 *
 * Parses the file exactly as the import wizard does, builds the records, and
 * reports what would be written. A batch that fails here would fail in the
 * admin UI too — better to find out from a command than from a half-applied
 * import.
 */
import { readFile, readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { conceptFromRow, materialiseNewConcept, CONCEPT_IMPORT_FIELDS } from '../src/data/conceptImport.ts'
import { EVIDENCE_IMPORT_FIELDS, evidenceErrors, citationFromRow, claimFromRow } from '../src/data/evidenceImport.ts'
import { RELATION_IMPORT_FIELDS, relationFromRow, relationErrors, isDuplicateRelation } from '../src/data/conceptImport.ts'
import { IMPORT_SCHEMAS, importRowToContent, validateImportRow, parseSections } from '../src/data/bulkImport.ts'
import { isChoiceFormat, isWrittenFormat, parseQuestionFormat } from '../src/data/questionFormat.ts'
import { materialiseNewItem } from '../src/data/importMerge.ts'
import { missingRequiredSections } from '../src/data/articleTemplates.ts'
import { MEDICAL_TAXONOMY_INDEX } from '../src/data/medicalLibraryTaxonomy.ts'
import { detectBatchKind } from '../src/data/batchKind.ts'

const file = process.argv[2]
if (!file) throw new Error('Usage: validate-content-batch.mjs <batch.md> [--with <sibling.md> ...]')

/**
 * Batches that will be imported alongside this one.
 *
 * A question resolves its concept and its article against live state, because a
 * question pointing at a concept nobody authored is the failure that check
 * exists to catch. But a programme that authors the concepts, the questions and
 * the articles for one paper in a single pass has none of them imported yet, so
 * every question in it fails against a ledger that has not been told about the
 * sibling file sitting next to it.
 *
 * `--with` names those siblings explicitly. It widens what counts as existing;
 * it never suppresses an error, and a file not named here still has to be real.
 */
const alongside = process.argv.slice(3).reduce((files, arg, index, argv) => {
  if (arg === '--with' && argv[index + 1]) files.push(argv[index + 1])
  return files
}, [])

const normalize = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

/** Read a `Label: value` line out of a block body, as the importer's parser does. */
const labelled = (body, label) => body.match(new RegExp(`^${label}\\s*:\\s*(.+)$`, 'im'))?.[1].trim() ?? ''

/** The import wizard's Markdown parser, kept identical on purpose. */
function parseMarkdown(text) {
  return text.split(/^\s*---\s*$/m).map((part) => part.trim()).filter(Boolean).map((document) => {
    const result = {}
    const matcher = /^##[ \t]*(.+?)[ \t]*\r?\n([\s\S]*?)(?=\r?\n##[ \t]|(?![\s\S]))/gm
    let match
    while ((match = matcher.exec(document))) result[normalize(match[1])] = match[2].trim()
    return result
  })
}

const rows = parseMarkdown(await readFile(file, 'utf8'))

const detectKind = detectBatchKind

const kind = detectKind(rows[0] ?? {})
const errors = []
const notes = []
const records = []

// Every branch below assumes `kind` names a contract this script knows how to
// check. Nothing said so, and an unrecognised file fell through to the evidence
// branch and threw `TypeError: Cannot read properties of undefined (reading
// 'map')` on `EVIDENCE_IMPORT_FIELDS[kind]`. Catalogue resources, subjects and
// glossary terms all land here, and none of them are broken files — they are
// kinds this script has no branch for. A stack trace says neither, so the author
// reads it as a bad batch and starts editing content that was fine. Refuse by
// name, and say which kinds are recognised so the answer is "wrong tool".
const VALIDATED_KINDS = ['concept', 'relation', 'article', 'question', 'practical', 'resource', 'claim', 'citation', 'span']
if (!VALIDATED_KINDS.includes(kind)) {
  errors.push(
    `${file}: its columns match none of the contracts this script validates, so there is nothing here to check it against. `
    + `Recognised kinds are ${VALIDATED_KINDS.join(', ')} — a catalogue-resource, subjects or glossary batch is not one of them `
    + 'and has no branch here. Check it with the manual for its type and the import wizard\'s own preview instead.',
  )
  console.log(JSON.stringify({ file, kind, items: rows.length, notes, errors }, null, 1))
  process.exit(1)
}

/**
 * Fold `--with` siblings in as though already imported.
 *
 * Both the question branch and the practical branch resolve concepts against
 * live state, deliberately — an item pointing at a concept nobody authored is
 * the failure those checks exist to catch. But a programme authoring concepts,
 * articles, questions and practicals in one pass has none of them imported yet.
 *
 * This started life inside the question branch only, which meant a practical
 * batch could not be checked against its own sibling concepts at all: 91 errors
 * on a file whose concepts were sitting in the next directory. One function,
 * called by both.
 */
async function foldInSiblings(concepts, articles, resources) {
  for (const sibling of alongside) {
    const rows = parseMarkdown(await readFile(sibling, 'utf8'))
    const kind = detectKind(rows[0] ?? {})
    for (const row of rows) {
      const id = row.id?.trim()
      if (!id) continue
      if (kind === 'concept') {
        concepts.set(id, { id, publicationStatus: row.publication_status?.trim(), articleIds: [], pending: sibling })
      }
      if (kind === 'article' && articles) {
        articles.set(id, { id, status: row.status?.trim() ?? 'Draft', pending: sibling })
      }
      if (kind === 'resource' && resources) resources.add(id)
    }
    notes.push(`${sibling}: ${rows.length} ${kind} rows treated as pending import`)
  }

  // An article's `related_concepts` is what puts its ID on the concept record
  // at import. A concept and an article both waiting to be imported would
  // otherwise look, to the coverage check, like a concept nothing teaches — so
  // the same link is made here, from the article side, exactly as the importer
  // makes it.
  for (const sibling of alongside) {
    const rows = parseMarkdown(await readFile(sibling, 'utf8'))
    if (detectKind(rows[0] ?? {}) !== 'article') continue
    for (const row of rows) {
      const articleId = row.id?.trim()
      if (!articleId) continue
      for (const conceptId of (row.related_concepts ?? '').split(/[|;\n]/).map((one) => one.trim()).filter(Boolean)) {
        const concept = concepts.get(conceptId)
        if (concept) concept.articleIds = [...new Set([...(concept.articleIds ?? []), articleId])]
      }
    }
  }
}

if (kind === 'relation') {
  const dir = dirname(file)
  const concepts = []
  const claims = []
  const citations = []
  for (const name of await readdir(dir)) {
    if (!name.endsWith('.md')) continue
    for (const row of parseMarkdown(await readFile(join(dir, name), 'utf8'))) {
      const k = detectKind(row)
      if (k === 'concept') concepts.push({ id: row.id?.trim() })
      if (k === 'claim') claims.push({ id: row.id?.trim() })
      if (k === 'citation') citations.push({ id: row.id?.trim() })
    }
  }
  const graph = { concepts, relations: [] }
  const evidence = { claims, citations }
  const known = new Set(RELATION_IMPORT_FIELDS.map((field) => field.key))
  const built = []
  rows.forEach((values, index) => {
    const where = `Item ${index + 1} (${values.source ?? '?'} -${values.type ?? '?'}-> ${values.target ?? '?'})`
    for (const key of Object.keys(values)) if (!known.has(key)) errors.push(`${where}: unknown column "${key}"`)
    const relation = relationFromRow(values)
    for (const error of relationErrors(relation, graph, evidence)) errors.push(`${where}: ${error}`)
    if (isDuplicateRelation(relation, built)) errors.push(`${where}: duplicate of an edge already in this batch`)
    // The field audit rejects any relation without an evidence chain at rest.
    if (!(relation.evidenceClaimIds ?? []).length || !(relation.citationIds ?? []).length) {
      errors.push(`${where}: no evidence chain — the audit rejects this at rest`)
    }
    built.push(relation)
  })
  const byType = {}
  for (const r of built) byType[r.type] = (byType[r.type] ?? 0) + 1
  console.log(JSON.stringify({
    file, kind, items: rows.length,
    verified: built.filter((r) => r.verificationStatus === 'verified').length,
    needsEvidence: built.filter((r) => r.verificationStatus === 'needs_evidence').length,
    byType, errors,
  }, null, 1))
  if (errors.length) process.exitCode = 1
  process.exit()
}

if (kind === 'question') {
  // Unlike every other batch kind, a question references records that already
  // exist rather than siblings in the same directory: the concept it tests and
  // the article that teaches it. So the resolution scope is live state, not the
  // batch directory. A question pointing at a concept nobody authored is the
  // failure this whole branch exists to catch.
  const here = dirname(fileURLToPath(import.meta.url))
  const live = JSON.parse(await readFile(join(here, '..', 'server', 'data', 'medical-library-v1.json'), 'utf8'))
  const concepts = new Map((live.states['synapse-concept-graph-v2']?.concepts ?? []).map((concept) => [concept.id, concept]))
  const ledger = live.states['synapse-admin-content-ledger-v4'] ?? []
  const articles = new Map(ledger.filter((item) => item.kind === 'article').map((item) => [item.id, item]))
  const resources = new Set(ledger.filter((item) => item.kind === 'resource').map((item) => item.id))

  await foldInSiblings(concepts, articles, resources)



  const known = new Set(IMPORT_SCHEMAS.question.fields.map((field) => field.key))
  const DIFFICULTIES = ['Easy', 'Moderate', 'Hard', 'Challenging']
  const built = []
  const difficultyCounts = {}
  let mediaFlagged = 0

  rows.forEach((values, index) => {
    const where = `Item ${index + 1} (${values.title ?? values.question ?? 'untitled'})`
    for (const key of Object.keys(values)) if (!known.has(key)) errors.push(`${where}: unknown column "${key}"`)
    for (const error of validateImportRow('question', values)) errors.push(`${where}: ${error}`)

    const item = materialiseNewItem(importRowToContent('question', values, `row-${index}`))
    const data = item.questionData
    built.push(item)

    // What a well-formed item looks like depends on its format. A written
    // question has no lettered options at all, and checking it for four of them
    // reported an entire end-of-year paper as sixteen broken questions.
    //
    // That fix was half a fix. `matching`, `completion` and `labeling` are not
    // written formats either, and they have no lettered options and no single
    // correct letter — so they fell through to the `else` and came back as
    // "0 options — the contract is 4 to 5" for questions that were entirely
    // well formed. Fixing one half of a format-aware check and not auditing the
    // others is how this recurs.
    //
    // Their contracts are real and are already checked, by `matchingErrors`,
    // `completionErrors` and `labelingErrors` through `validateImportRow`
    // above. What is needed here is only that the option checks do not run.
    const format = parseQuestionFormat(values.format) ?? 'mcq_single_best'
    if (isWrittenFormat(format)) {
      // The mark scheme is to a written question what the options are to a
      // single-best-answer one: without it there is nothing to practise
      // against, and `markWritten` scores a part with no points as zero.
      const parts = data.writtenParts ?? []
      if (!parts.length) {
        errors.push(`${where}: no written_parts — a written question with no parts cannot be marked`)
      }
      for (const part of parts) {
        if (!part.expectedPoints.length) {
          errors.push(`${where}: part (${part.label}) has no Expects lines, so it would always score zero`)
        }
        if (!part.prompt.trim()) errors.push(`${where}: part (${part.label}) has no prompt`)
        if (!(part.marks > 0)) errors.push(`${where}: part (${part.label}) is worth no marks`)
      }
    } else if (isChoiceFormat(format)) {
      // Options and their explanations. An option without an explanation teaches
      // nothing, which is the one thing this content type exists to do.
      const answered = data.answers.filter((answer) => answer.text.trim())
      if (answered.length < 4 || answered.length > 5) {
        errors.push(`${where}: ${answered.length} option${answered.length === 1 ? '' : 's'} — the contract is 4 to 5`)
      }
      for (const answer of answered) {
        if (!answer.explanation.trim()) errors.push(`${where}: option ${answer.label} has no explanation`)
      }
      if (!answered.some((answer) => answer.label === data.correctAnswer)) {
        errors.push(`${where}: correct answer ${data.correctAnswer} is not one of the filled options`)
      }
    }

    // The difficulty the author wrote, not the one the importer settled for.
    const authored = values.difficulty?.trim()
    if (authored && !DIFFICULTIES.includes(authored)) {
      errors.push(`${where}: difficulty "${authored}" is not one of ${DIFFICULTIES.join(', ')} — it would import as Moderate`)
    }
    difficultyCounts[data.tags.intendedDifficulty] = (difficultyCounts[data.tags.intendedDifficulty] ?? 0) + 1

    // Concept tagging. Getting main vs contextual wrong corrupts a student's
    // mastery profile in silence, so it is an error and not a note.
    const main = data.tags.mainConceptIds ?? []
    const also = data.tags.conceptIds ?? []
    const contextual = data.tags.contextualConceptIds ?? []
    // At least one, not exactly one. A written question comparing two
    // structures assesses both as co-primary, and so does a matching item;
    // forcing a single main concept there means one of the things the question
    // actually tests earns no mastery evidence. The practical branch has always
    // required only one-or-more.
    if (main.length < 1) errors.push(`${where}: no main_concept — name what this question tests`)
    for (const [label, ids] of [['main_concept', main], ['concept_ids', also], ['contextual_concept_ids', contextual]]) {
      for (const id of ids) if (!concepts.has(id)) errors.push(`${where}: ${label} ${id} is not a concept that exists`)
    }
    for (const id of contextual) {
      if (main.includes(id) || also.includes(id)) {
        errors.push(`${where}: ${id} is both assessed and contextual — it would take mastery evidence it never earned`)
      }
    }

    // A question may only test a concept some article covers.
    if (!data.libraryIds.length) errors.push(`${where}: no library_ids — nothing teaches this question's answer`)
    for (const id of data.libraryIds) if (!articles.has(id)) errors.push(`${where}: library_ids ${id} is not an article that exists`)
    for (const id of data.resourceIds) if (!resources.has(id)) errors.push(`${where}: resource_ids ${id} is not a resource that exists`)
    for (const id of main) {
      const concept = concepts.get(id)
      if (!concept) continue
      const covered = (concept.articleIds ?? []).some((articleId) => data.libraryIds.includes(articleId))
      if (!covered) errors.push(`${where}: main concept ${id} is not covered by any article in library_ids`)
      if (concept.publicationStatus !== 'published') {
        notes.push(`${item.id}: main concept ${id} has not passed the evidence gate (${concept.publicationStatus}) — promote the concept and the question together`)
      }
    }

    if (item.status !== 'Draft') errors.push(`${where}: status is ${item.status} — assessment content lands as Draft`)
    if (!data.learningObjective.trim()) errors.push(`${where}: no learning objective`)
    if (!data.sourceCitation.trim()) errors.push(`${where}: no source citation`)

    if (values.media_recommendations?.trim()) {
      mediaFlagged += 1
      // Same shape the article field uses, so it transfers when A2 lands.
      for (const block of parseSections(values.media_recommendations)) {
        if (!labelled(block.body, 'Purpose')) errors.push(`${where}: media recommendation "${block.heading}" has no Purpose`)
      }
    }
  })

  const ids = built.map((item) => item.id)
  for (const id of ids) if (ids.filter((other) => other === id).length > 1) errors.push(`duplicate id ${id} within the file`)
  if (mediaFlagged) {
    const required = built.reduce((sum, item) => sum + (item.questionData.mediaRequests ?? []).filter((request) => request.priority === 'required').length, 0)
    notes.push(`${mediaFlagged} question${mediaFlagged === 1 ? '' : 's'} need media before they can publish, ${required} of them required — see Library Setup → Media requests`)
  }

  console.log(JSON.stringify({
    file, kind, items: rows.length,
    fieldsUsed: [...new Set(rows.flatMap((row) => Object.keys(row)))].length,
    difficulty: difficultyCounts,
    conceptsTested: [...new Set(built.flatMap((item) => item.questionData.tags.mainConceptIds ?? []))].length,
    mediaFlagged,
    notes, errors,
  }, null, 1))
  if (errors.length) process.exitCode = 1
  process.exit()
}

if (kind === 'practical') {
  // Like a question, a practical references records that already exist — the
  // concepts it teaches — so the resolution scope is live state rather than the
  // batch directory.
  const here = dirname(fileURLToPath(import.meta.url))
  const live = JSON.parse(await readFile(join(here, '..', 'server', 'data', 'medical-library-v1.json'), 'utf8'))
  const concepts = new Map((live.states['synapse-concept-graph-v2']?.concepts ?? []).map((concept) => [concept.id, concept]))
  await foldInSiblings(concepts)

  const known = new Set(IMPORT_SCHEMAS.practical.fields.map((field) => field.key))
  const DIFFICULTIES = ['Easy', 'Moderate', 'Hard', 'Challenging']
  // What a bank should look like: mostly middle, a thin tail at each end. A set
  // that is nearly all Hard filters students rather than teaching them.
  const TARGET_SHARE = { Easy: 0.25, Moderate: 0.55, Hard: 0.15, Challenging: 0.05 }
  const built = []
  const itemDifficulty = {}
  const questionDifficulty = {}
  const mediaByKind = {}
  let questions = 0
  let markSchemeItems = 0

  rows.forEach((values, index) => {
    const where = `Item ${index + 1} (${values.id ?? values.title ?? 'untitled'})`
    for (const key of Object.keys(values)) if (!known.has(key)) errors.push(`${where}: unknown column "${key}"`)
    for (const error of validateImportRow('practical', values)) errors.push(`${where}: ${error}`)

    const item = materialiseNewItem(importRowToContent('practical', values, `row-${index}`))
    const data = item.practicalData
    built.push(item)

    if (item.status !== 'Draft') errors.push(`${where}: status is ${item.status} — assessment content lands as Draft`)
    itemDifficulty[item.fields.Difficulty] = (itemDifficulty[item.fields.Difficulty] ?? 0) + 1

    // Concept tagging. The same rule the question branch enforces, and for the
    // same reason: a mentioned concept must not collect mastery evidence.
    const { mainConceptIds: main, conceptIds: also, contextualConceptIds: contextual } = data.conceptTags
    if (!main.length) errors.push(`${where}: no main_concept — name what this item teaches`)
    for (const [label, ids] of [['main_concept', main], ['concept_ids', also], ['contextual_concept_ids', contextual]]) {
      for (const id of ids) if (!concepts.has(id)) errors.push(`${where}: ${label} ${id} is not a concept that exists`)
    }
    for (const id of contextual) {
      if (main.includes(id) || also.includes(id)) {
        errors.push(`${where}: ${id} is both assessed and contextual — it would take mastery evidence it never earned`)
      }
    }
    if (!data.learningObjective?.trim()) errors.push(`${where}: no learning objective`)

    // Every question names the one concept it teaches, and that concept exists.
    const blocks = data.format === 'case' ? data.decisions : data.format === 'lab' ? data.questions : []
    blocks.forEach((block, blockIndex) => {
      questions += 1
      const label = `${where} question ${blockIndex + 1}`
      if (!block.conceptId) errors.push(`${label}: no "Concept:" line — name the one concept it teaches`)
      else if (!concepts.has(block.conceptId)) errors.push(`${label}: concept ${block.conceptId} is not a concept that exists`)
      for (const id of block.secondaryConceptIds ?? []) {
        if (!concepts.has(id)) errors.push(`${label}: also-assessed concept ${id} is not a concept that exists`)
      }
      if (!block.difficulty) errors.push(`${label}: no "Difficulty:" line`)
      else questionDifficulty[block.difficulty] = (questionDifficulty[block.difficulty] ?? 0) + 1
      if (!(data.format === 'case' ? block.rationale : block.explanation)?.trim()) {
        errors.push(`${label}: no ${data.format === 'case' ? 'Rationale:' : 'Explanation:'} line`)
      }
    })

    if (data.format === 'osce') {
      markSchemeItems += data.markSections.reduce((sum, section) => sum + section.items.length, 0)
      for (const section of data.markSections) {
        for (const mark of section.items) {
          if (!mark.text.trim()) errors.push(`${where}: an empty mark-scheme item in "${section.title}"`)
        }
      }
      // A station that rewards asking something the patient cannot answer is the
      // classic broken OSCE. Only encounters have an actor to check against.
      if (values.type?.trim() === 'OSCE station' && !data.actorSections.length) {
        errors.push(`${where}: an OSCE station needs an actor brief, or the mark scheme cannot be answered`)
      }
    }

    for (const request of data.mediaRequests) {
      mediaByKind[request.kind] = (mediaByKind[request.kind] ?? 0) + 1
      if (!request.teachingPurpose.trim()) errors.push(`${where}: media request "${request.brief}" has no Purpose`)
    }
  })

  const ids = built.map((item) => item.id)
  for (const id of ids) if (ids.filter((other) => other === id).length > 1) errors.push(`duplicate id ${id} within the file`)

  // A distribution note, not an error: one file is a slice of the bank, and the
  // 25/55/15/5 shape is a property of the whole.
  if (questions) {
    const drift = DIFFICULTIES
      .map((tier) => ({ tier, share: (questionDifficulty[tier] ?? 0) / questions, target: TARGET_SHARE[tier] }))
      .filter((entry) => Math.abs(entry.share - entry.target) > 0.15)
      .map((entry) => `${entry.tier} ${Math.round(entry.share * 100)}% vs ${Math.round(entry.target * 100)}% target`)
    if (drift.length) notes.push(`difficulty mix in this file drifts from the bank target: ${drift.join(', ')}`)
  }

  console.log(JSON.stringify({
    file, kind, items: rows.length,
    byType: rows.reduce((out, row) => ({ ...out, [row.type ?? '?']: (out[row.type ?? '?'] ?? 0) + 1 }), {}),
    questions,
    markSchemeItems,
    itemDifficulty,
    questionDifficulty,
    conceptsTaught: [...new Set(built.flatMap((item) => [
      ...item.practicalData.conceptTags.mainConceptIds,
      ...(item.practicalData.format === 'case' ? item.practicalData.decisions : item.practicalData.format === 'lab' ? item.practicalData.questions : []).map((block) => block.conceptId).filter(Boolean),
    ]))].length,
    mediaNeeded: mediaByKind,
    notes, errors,
  }, null, 1))
  if (errors.length) process.exitCode = 1
  process.exit()
}

if (kind === 'article') {
  // Related reading legitimately points at an article authored in a different
  // batch file, so the whole directory is the resolution scope — the same reason
  // the evidence batches read their siblings.
  const dir = dirname(file)
  const siblingArticleIds = new Set()
  for (const name of await readdir(dir)) {
    if (!name.endsWith('.md')) continue
    for (const row of parseMarkdown(await readFile(join(dir, name), 'utf8'))) {
      if ('summary' in row && 'sections' in row && row.id?.trim()) siblingArticleIds.add(row.id.trim())
    }
  }

  const known = new Set(IMPORT_SCHEMAS.article.fields.map((field) => field.key))
  const built = []
  rows.forEach((values, index) => {
    const where = `Item ${index + 1} (${values.id ?? values.title ?? 'untitled'})`
    for (const key of Object.keys(values)) if (!known.has(key)) errors.push(`${where}: unknown column "${key}"`)
    for (const error of validateImportRow('article', values)) errors.push(`${where}: ${error}`)

    const item = materialiseNewItem(importRowToContent('article', values, `row-${index}`))
    const data = item.articleData
    built.push(item)

    // The archetype's section contract is the point of having archetypes.
    const headings = data.sections.map((section) => section.heading)
    const missing = missingRequiredSections(data.templateId ?? '', headings)
    if (missing.length) errors.push(`${where}: missing required sections for ${data.templateId}: ${missing.join(', ')}`)

    for (const nodeId of [data.primaryNodeId, ...(data.secondaryNodeIds ?? [])].filter(Boolean)) {
      if (!MEDICAL_TAXONOMY_INDEX.byId.has(nodeId)) errors.push(`${where}: placement ${nodeId} is not a canonical node`)
    }
    if (!data.arabicTitle && !data.fieldNotes?.arabicTitle) errors.push(`${where}: no Arabic title and no field note saying why (LD-15)`)
    // A callout that publishes must be one the article actually carries.
    for (const text of Object.keys(data.calloutEvidence ?? {})) {
      if (![...(data.holdThese ?? []), ...(data.loseTheMark ?? [])].includes(text)) {
        errors.push(`${where}: callout evidence names a line this article does not have`)
      }
    }
  })

  const ids = built.map((item) => item.id)
  for (const id of ids) if (ids.filter((other) => other === id).length > 1) errors.push(`duplicate id ${id} within the file`)
  // Related reading must resolve, at least within the batch.
  for (const item of built) {
    for (const related of item.articleData.relatedArticleIds ?? []) {
      if (!siblingArticleIds.has(related)) errors.push(`${item.id}: related article ${related} is authored nowhere in the batch directory`)
    }
  }

  console.log(JSON.stringify({
    file, kind, items: rows.length,
    fieldsUsed: [...new Set(rows.flatMap((row) => Object.keys(row)))].length,
    annotations: built.reduce((sum, item) => sum + item.articleData.annotations.length, 0),
    mediaRequests: built.reduce((sum, item) => sum + (item.articleData.mediaRequests?.length ?? 0), 0),
    calloutsWithEvidence: built.reduce((sum, item) => sum + Object.keys(item.articleData.calloutEvidence ?? {}).length, 0),
    errors,
  }, null, 1))
  if (errors.length) process.exitCode = 1
  process.exit()
}

if (kind !== 'concept') {
  // Evidence batches reference each other — a citation names a claim, a span
  // names an article — and those records are authored across sibling files that
  // have not been imported yet. Rather than guess filenames from this one, read
  // every batch in the directory and validate against the set. Guessing was
  // tried and broke the moment a span batch and its claims lived in files with
  // different stems.
  const dir = dirname(file)
  //
  // Reading the directory finds the claim a citation names, because both live in
  // `evidence/`. It does not find the *concept* a claim names, because concepts
  // live one directory over in `concept/` — so every claim in a batch authored
  // before its concepts are imported failed with `Concept CON-… does not exist`
  // for a concept sitting in the same batch, correctly written. `--with` is the
  // documented answer to exactly that ("it widens what counts as existing; it
  // never suppresses an error"), and it was wired into the question branch only.
  // Naming a file here folds it in on the same terms: parsed with the same
  // parser, classified by the same detector, so a file that is not what it
  // claims to be still contributes nothing.
  const siblings = [
    ...(await readdir(dir)).filter((name) => name.endsWith('.md')).map((name) => join(dir, name)),
    ...alongside,
  ]
  const everything = { concept: [], article: [], resource: [], claim: [], citation: [], span: [], relation: [] }
  for (const path of siblings) {
    const parsed = parseMarkdown(await readFile(path, 'utf8'))
    // `??=` rather than a fixed set of buckets: a new record kind should make
    // the validator report something useful, not throw while collecting context.
    if (parsed.length) (everything[detectKind(parsed[0])] ??= []).push(...parsed)
  }

  const countingCitations = everything.citation.map(citationFromRow).filter((citation) => citation.countsAsClaimEvidence)

  const context = {
    store: { claims: [], citations: [], resources: [], articleSpans: [] },
    conceptIds: new Set(everything.concept.map((row) => row.id?.trim()).filter(Boolean)),
    articleIds: new Set(everything.article.map((row) => row.id?.trim()).filter(Boolean)),
    incoming: {
      claims: new Set(everything.claim.map((row) => row.id?.trim()).filter(Boolean)),
      resources: new Set(everything.resource.map((row) => row.id?.trim()).filter(Boolean)),
      citations: new Set(everything.citation.map((row) => row.id?.trim()).filter(Boolean)),
      claimsWithEvidence: new Set(countingCitations.map((citation) => citation.claimId)),
      evidenceCountByClaim: countingCitations.reduce((map, citation) => map.set(citation.claimId, (map.get(citation.claimId) ?? 0) + 1), new Map()),
    },
  }

  // A local source ID must exist in the corpus. Three invented ones passed every
  // other check once; this is why they cannot again.
  //
  // The index has to sit beside the batch, and outside `docs/import-ready/` —
  // which carries a symlink to it — it usually does not. The absence used to be
  // swallowed here, so the guard quietly stopped guarding and an invented
  // `src_…` passed a green run. A missing index is now said out loud in `notes`
  // every time, and any row it would actually have checked is refused rather
  // than waved through: unchecked and checked must not look alike. It is not a
  // blanket error, because a claim or span batch names no source at all and
  // failing one over an index it never needed is the opposite mistake.
  const corpusSourcePath = join(dirname(dirname(file)), 'evidence', 'corpus-source-index.json')
  let corpusSources = null
  try {
    corpusSources = JSON.parse(await readFile(corpusSourcePath, 'utf8')).sources
  } catch (reason) {
    notes.push(`${corpusSourcePath} could not be read (${reason.message}) — no source ID in this file can be checked against the corpus. Put the index beside the batch, or regenerate it.`)
  }

  const known = new Set(EVIDENCE_IMPORT_FIELDS[kind].map((field) => field.key))
  rows.forEach((values, index) => {
    const where = `Item ${index + 1} (${values.id ?? 'no id'})`
    for (const key of Object.keys(values)) if (!known.has(key)) errors.push(`${where}: unknown column "${key}"`)
    for (const error of evidenceErrors(kind, values, context)) errors.push(`${where}: ${error}`)

    const id = values.id?.trim() ?? ''
    if (id.startsWith('src_')) {
      if (!corpusSources) errors.push(`${where}: ${id} cannot be checked — the corpus index is missing, and an unchecked source ID is how three invented ones got through before`)
      else {
        const record = corpusSources[id]
        if (!record) errors.push(`${where}: ${id} is not a source the corpus contains — do not invent a source ID`)
        else if (values.source_relative_path?.trim() && values.source_relative_path.trim() !== record.sourceRelativePath) {
          errors.push(`${where}: ${id} is "${record.sourceRelativePath}" in the corpus, not "${values.source_relative_path.trim()}"`)
        }
      }
    }
    // Only a local ID is checkable: a web source, `RES-WEB-…`, is not in the
    // corpus index and its absence there means nothing.
    if (kind === 'citation') {
      const resourceId = values.resource_id?.trim() ?? ''
      if (resourceId.startsWith('src_')) {
        if (!corpusSources) errors.push(`${where}: cites ${resourceId}, which cannot be checked — the corpus index is missing`)
        else if (!corpusSources[resourceId]) errors.push(`${where}: cites ${resourceId}, which is not a source the corpus contains`)
      }
    }
  })

  // A claim asserting verification will be demoted at import unless a counting
  // citation exists. That is not an error, but it is worth saying out loud.
  if (kind === 'claim') {
    for (const values of rows) {
      const claim = claimFromRow(values)
      if (claim.verificationStatus !== 'verified') continue
      if (!context.incoming.claimsWithEvidence.has(claim.id)) {
        notes.push(`${claim.id} asks to be verified, but no counting citation supports it yet — it will land as needs_evidence`)
      }
    }
  }

  const ids = rows.map((row) => row.id?.trim())
  for (const id of ids) if (id && ids.filter((other) => other === id).length > 1) errors.push(`duplicate id ${id} within the file`)

  console.log(JSON.stringify({ file, kind, items: rows.length, fieldsUsed: [...new Set(rows.flatMap((row) => Object.keys(row)))].length, notes, errors }, null, 1))
  if (errors.length) process.exitCode = 1
  process.exit()
}

// `sourceCandidateIds` is the same trap as `src_`, one field over: a `concept_`
// ID that does not exist would validate cleanly and point at nothing. And the
// missing index was the same trap again: swallowing it left a batch that looked
// checked and was not. Reported in `notes` whenever it is absent, and a refusal
// on any concept that actually names a candidate — a concept that names none is
// not failed for an index it had no use for.
const corpusConceptPath = join(dirname(dirname(file)), 'evidence', 'corpus-concept-index.json')
let corpusConcepts = null
try {
  corpusConcepts = JSON.parse(await readFile(corpusConceptPath, 'utf8')).candidates
} catch (reason) {
  notes.push(`${corpusConceptPath} could not be read (${reason.message}) — no source_candidate_ids in this file can be checked against the corpus. Put the index beside the batch, or regenerate it.`)
}

const known = new Set(CONCEPT_IMPORT_FIELDS.map((field) => field.key))

rows.forEach((values, index) => {
  const where = `Item ${index + 1} (${values.label ?? 'no label'})`
  for (const key of Object.keys(values)) {
    if (!known.has(key)) errors.push(`${where}: unknown column "${key}"`)
  }
  if (!values.label?.trim()) errors.push(`${where}: label is required`)
  const concept = materialiseNewConcept(conceptFromRow(values))
  for (const nodeId of [concept.primaryNodeId, ...(concept.secondaryNodeIds ?? [])].filter(Boolean)) {
    if (!MEDICAL_TAXONOMY_INDEX.byId.has(nodeId)) errors.push(`${where}: placement ${nodeId} is not a canonical node`)
  }
  for (const candidateId of concept.sourceCandidateIds ?? []) {
    if (!corpusConcepts) errors.push(`${where}: ${candidateId} cannot be checked — the concept candidate index is missing, and an unchecked candidate ID points at nothing`)
    else if (!corpusConcepts[candidateId]) {
      errors.push(`${where}: ${candidateId} is not a concept candidate the corpus contains — do not invent a candidate ID`)
    }
  }
  if (!concept.definition) errors.push(`${where}: no definition`)
  if (!concept.explicitObjective) errors.push(`${where}: no explicit objective — a concept without one cannot be assessed`)
  if (!concept.arabicLabel && !concept.fieldNotes?.arabicLabel) errors.push(`${where}: no Arabic label and no field note saying why (LD-15)`)
  records.push(concept)
})

const ids = records.map((record) => record.id)
for (const id of ids) if (ids.filter((other) => other === id).length > 1) errors.push(`duplicate id ${id} within the file`)

console.log(JSON.stringify({
  file,
  kind,
  items: rows.length,
  fieldsUsed: [...new Set(rows.flatMap((row) => Object.keys(row)))].length,
  placements: records.map((record) => record.primaryNodeId),
  // `notes` was missing from this branch's report, so anything it had to say
  // about a check it could not run had nowhere to appear.
  notes,
  errors,
}, null, 1))
if (errors.length) process.exitCode = 1
