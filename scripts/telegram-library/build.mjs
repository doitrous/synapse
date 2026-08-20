#!/usr/bin/env node

import { createHash } from 'node:crypto'
import { constants, createReadStream } from 'node:fs'
import { access, copyFile, mkdir, readFile, readdir, rm, stat, statfs, unlink, writeFile } from 'node:fs/promises'
import { basename, dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const args = parseArgs(process.argv.slice(2))
const config = JSON.parse(await readFile(join(HERE, 'config.json'), 'utf8'))
const discoverySeed = JSON.parse(await readFile(join(HERE, 'discovery.json'), 'utf8'))
const messageSeed = JSON.parse(await readFile(join(HERE, 'messages.json'), 'utf8'))
const target = resolve(args.target || config.targetRoot)
const stagingRoots = (args.staging || []).map(resolve)
const guideDir = join(target, '_Library Guide & Catalogs')
const reviewDir = join(target, '_Needs Review')
const systemDir = join(target, '.library-system')
const previewDir = join(systemDir, 'previews')
const universityDir = join(target, config.university)
const previousManagedPaths = await readPreviousManagedPaths()

const exported = []
for (const exportPath of args.telegramExport || []) exported.push(...await parseTelegramExport(resolve(exportPath)))
const staged = []
for (const stagingRoot of stagingRoots) staged.push(...await discoverStagedFiles(stagingRoot))
const downloadStateRecords = []
for (const statePath of args.downloadState || []) downloadStateRecords.push(...await parseDownloadState(resolve(statePath)))
const includedSourceBatches = config.includedSourceBatches || config.batchPriority
const scopedDiscoveryRecords = discoverySeed.records.filter(record =>
  !record.sourceBatch || includedSourceBatches.includes(record.sourceBatch)
)
const records = mergeRecords([...scopedDiscoveryRecords, ...exported, ...staged, ...downloadStateRecords])
const seededMessageUrls = new Set(messageSeed.messages.map(message => normalizeTelegramUrl(message.telegramUrl)).filter(Boolean))
for (const record of records) {
  if (record.disposition === 'pending_discovery' && seededMessageUrls.has(normalizeTelegramUrl(record.telegramUrl))) record.disposition = 'orientation_index'
}

await createHierarchy()
const processed = await processRecords(records)
const manifest = buildManifest(processed)
const calendar = buildCalendar(processed)
const messages = buildMessageGraph(messageSeed, manifest)
await emitOutputs(manifest, calendar, messages)
await pruneObsoleteManagedFiles(manifest)

console.log(JSON.stringify({
  ok: true,
  target,
  records: manifest.records.length,
  downloadedFiles: manifest.summary.downloadedFiles,
  pending: manifest.summary.pending,
  calendarEvents: calendar.length,
  index: join(target, 'index.html'),
}, null, 2))

function parseArgs(argv) {
  const parsed = { telegramExport: [], staging: [], downloadState: [] }
  for (let index = 0; index < argv.length; index++) {
    const key = argv[index]
    const value = argv[index + 1]
    if (key === '--target') { parsed.target = value; index++ }
    else if (key === '--staging') { parsed.staging.push(value); index++ }
    else if (key === '--telegram-export') { parsed.telegramExport.push(value); index++ }
    else if (key === '--download-state') { parsed.downloadState.push(value); index++ }
    else if (key === '--help') {
      console.log('node build.mjs [--target PATH] [--staging PATH]... [--download-state state.json]... [--telegram-export result.json]...')
      process.exit(0)
    }
  }
  return parsed
}

async function readPreviousManagedPaths() {
  try {
    const prior = JSON.parse(await readFile(join(guideDir, 'catalog.json'), 'utf8'))
    const paths = new Set()
    for (const record of prior.records || prior) {
      if (record.canonicalPath) paths.add(record.canonicalPath)
      if (record.previewPath) paths.add(record.previewPath)
    }
    return paths
  } catch (error) {
    if (error?.code === 'ENOENT') return new Set()
    throw error
  }
}

async function pruneObsoleteManagedFiles(manifest) {
  const current = new Set()
  for (const record of manifest.records) {
    if (record.canonicalPath) current.add(record.canonicalPath)
    if (record.previewPath) current.add(record.previewPath)
  }
  for (const relativePath of previousManagedPaths) {
    if (current.has(relativePath)) continue
    const candidate = resolve(target, relativePath)
    if (candidate === target || !candidate.startsWith(target + sep)) continue
    try { await unlink(candidate) } catch (error) { if (error?.code !== 'ENOENT') throw error }
  }
}

async function parseDownloadState(path) {
  const state = JSON.parse(await readFile(path, 'utf8'))
  const stateContext = [path, state.ledger, state.staging].filter(Boolean).join(' ')
  const sourceBatch = inferBatch(stateContext)
  const year = inferYear(stateContext)
  const username = ({
    194: 'Futuredoctors194',
    195: 'FUTUREDOCTORS_Siraj',
    196: 'FUTUREDOCTORS_196',
    197: 'FUTUREDOCTORS_197',
    198: 'FUTUREDOCTORS_198',
    199: 'FUTUREDOCTORS_199',
    200: 'FUTUREDOCTORS_200',
  })[sourceBatch]
  const postUrl = mid => {
    if (!username || !mid) return null
    try {
      const post = BigInt(mid) - 4294967296n
      return post > 0n ? `https://t.me/${username}/${post}` : null
    } catch { return null }
  }
  const occurrences = state.occurrences || []
  const output = []
  for (const file of state.files || []) {
    const linked = occurrences.filter(item =>
      (file.telegramDocumentId && item.telegramDocumentId === file.telegramDocumentId) ||
      item.canonicalName === file.canonicalName
    )
    const first = linked[0] || {}
    output.push({
      id: `telegram-${sourceBatch || 'unknown'}-${file.telegramDocumentId || shortHash(file.stagingPath)}`,
      title: file.originalName || file.canonicalName,
      originalFilename: file.originalName || file.canonicalName,
      localPath: resolveRecordedPath(file.stagingPath, path),
      sizeBytes: file.bytes || null,
      sha256Hint: file.sha256 || null,
      sourceBatch,
      year,
      telegramUrl: postUrl(first.mid),
      caption: [first.name, first.size].filter(Boolean).join(' — '),
      kind: 'document',
      disposition: 'discovered_document',
      occurrences: linked.map(item => ({
        sourceBatch,
        telegramUrl: postUrl(item.mid),
        caption: [item.name, item.size].filter(Boolean).join(' — '),
        originalFilename: item.name || null,
        telegramDocumentId: item.telegramDocumentId || item.doc_id || null,
      })),
    })
  }
  for (const item of occurrences.filter(item => item.status === 'not-downloaded')) {
    output.push({
      id: `telegram-pending-${sourceBatch || 'unknown'}-${item.telegramDocumentId || item.doc_id || item.mid || shortHash(item.name)}`,
      title: item.name || 'Unavailable Telegram document',
      originalFilename: item.name || null,
      sourceBatch,
      year,
      telegramUrl: postUrl(item.mid),
      caption: [item.name, item.size].filter(Boolean).join(' — '),
      kind: 'document',
      disposition: 'pending_download',
      reviewReason: item.reason === 'no-size-matched-download'
        ? 'A local file with the expected name was found, but its size did not match the Telegram attachment.'
        : 'No verified local export was available at the last crawl checkpoint.',
    })
  }
  return output
}

function resolveRecordedPath(candidate, statePath) {
  if (!candidate || isAbsolute(candidate)) return candidate || null
  const firstSegment = String(candidate).split(/[\\/]/)[0]
  let cursor = dirname(statePath)
  while (true) {
    if (basename(cursor) === firstSegment) return resolve(dirname(cursor), candidate)
    const parent = dirname(cursor)
    if (parent === cursor) break
    cursor = parent
  }
  return resolve(dirname(statePath), candidate)
}

async function parseTelegramExport(path) {
  const payload = JSON.parse(await readFile(path, 'utf8'))
  const chats = payload.chats?.list || payload.chats || (payload.messages ? [payload] : [])
  const output = []
  for (const chat of chats) {
    const username = chat.username || extractUsername(chat)
    for (const message of chat.messages || []) {
      if (message.type && message.type !== 'message') continue
      const text = flattenText(message.text)
      const urls = new Set(extractUrls(text))
      for (const entity of message.text_entities || []) if (entity.href) urls.add(entity.href)
      const telegramUrl = username && message.id ? 'https://t.me/' + username + '/' + message.id : null
      const fileName = message.file_name || (message.file && !String(message.file).startsWith('(') ? basename(message.file) : null)
      const record = {
        id: 'export-' + (username || slug(chat.name || 'chat')) + '-' + message.id,
        title: fileName || text.slice(0, 100) || 'Telegram message ' + message.id,
        caption: text,
        telegramUrl,
        externalUrls: [...urls].filter(url => url !== telegramUrl),
        sourceBatch: inferBatch(chat.name + ' ' + username + ' ' + text),
        year: inferYear(text),
        module: inferModule(text),
        kind: fileName ? 'document' : urls.size ? 'linked_message' : 'message',
        originalFilename: fileName,
        sizeBytes: message.file_size || null,
        mimeType: message.mime_type || null,
        localPath: message.file && !String(message.file).startsWith('(') ? resolve(dirname(path), message.file) : null,
        date: message.date || null,
        disposition: fileName ? 'discovered_document' : 'discovered_message',
      }
      output.push(record)
      for (const url of urls) {
        if (url === telegramUrl) continue
        output.push({
          id: record.id + '-link-' + shortHash(url),
          title: 'Linked from ' + record.title,
          caption: text,
          telegramUrl: url.startsWith('https://t.me/') ? url : telegramUrl,
          externalUrl: url.startsWith('https://t.me/') ? null : url,
          sourceBatch: record.sourceBatch,
          year: record.year,
          module: record.module,
          kind: isMediaUrl(url) ? 'explanatory_media' : 'external_link',
          disposition: isMediaUrl(url) ? 'link_only_media' : 'pending_discovery',
        })
      }
    }
  }
  return output
}

function extractUsername(chat) {
  const text = JSON.stringify(chat)
  return text.match(/https:\/\/t\.me\/([A-Za-z0-9_]+)/)?.[1] || null
}

function flattenText(value) {
  if (typeof value === 'string') return value
  if (!Array.isArray(value)) return ''
  return value.map(part => typeof part === 'string' ? part : part.text || '').join('')
}

function extractUrls(text) {
  return text.match(/https?:\/\/[^\s<>()\[\]"']+/giu)?.map(url => url.replace(/[.,،؛:!?]+$/u, '')) || []
}

async function discoverStagedFiles(root) {
  const output = []
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue
      const path = join(directory, entry.name)
      if (entry.isDirectory()) await walk(path)
      else {
        const extension = extname(entry.name).toLowerCase()
        output.push({
          id: 'staged-' + shortHash(relative(root, path)),
          title: entry.name,
          originalFilename: entry.name,
          localPath: path,
          kind: isBlockedExtension(extension) ? 'explanatory_media' : 'document',
          disposition: isBlockedExtension(extension) ? 'link_only_media' : 'discovered_document',
          caption: relative(root, path),
          sourceBatch: inferBatch(path),
          year: inferYear(path),
          module: inferModule(path),
        })
      }
    }
  }
  await walk(root)
  return output
}

function mergeRecords(input) {
  const map = new Map()
  for (const raw of input) {
    // A single orientation message can also contain an explanatory-media
    // link. Those are separate catalog facts and must not overwrite one
    // another merely because they share a Telegram provenance URL. Documents
    // still merge across overlapping download-state manifests by source post
    // and filename, while seeded index/link records retain their stable IDs.
    const key = raw.kind === 'document'
      ? `document:${raw.telegramUrl || raw.externalUrl || raw.localPath || raw.id}:${raw.originalFilename || raw.title || ''}`
      : raw.id
        ? `record:${raw.id}`
        : raw.localPath || raw.externalUrl || raw.telegramUrl
    const existing = map.get(key)
    map.set(key, existing ? { ...existing, ...raw, caption: raw.caption || existing.caption } : raw)
  }
  return [...map.values()].sort((a, b) => rankBatch(b.sourceBatch) - rankBatch(a.sourceBatch) || String(a.id).localeCompare(String(b.id)))
}

async function createHierarchy() {
  await Promise.all([mkdir(target, { recursive: true }), mkdir(guideDir, { recursive: true }), mkdir(reviewDir, { recursive: true }), mkdir(previewDir, { recursive: true }), mkdir(universityDir, { recursive: true })])
  for (const year of config.years) {
    const yearDir = join(universityDir, 'Year ' + year.year)
    await mkdir(join(yearDir, 'Orientation & Official Admin'), { recursive: true })
    for (const module of year.modules) await createModuleTree(yearDir, moduleFolder(module))
    for (const secondary of year.secondaryModules || []) await createModuleTree(join(yearDir, 'Secondary Modules'), secondary)
  }
}

async function createModuleTree(parent, moduleName) {
  const moduleDir = join(parent, moduleName)
  for (const category of ['Study Files', 'MCQs', 'Practical Files & Tests']) {
    await mkdir(join(moduleDir, category, 'Department - Official', 'Previous Year Exams & Tests'), { recursive: true })
    await mkdir(join(moduleDir, category, 'Standalone Doctor Courses'), { recursive: true })
  }
}

function moduleFolder(module) {
  const subjects = module.subjects?.length ? ' - ' + module.subjects.join(' & ') : ''
  return safeName(module.code + ' - ' + module.name + subjects)
}

async function processRecords(input) {
  const hashes = new Map()
  const output = []
  for (const raw of input) {
    const record = classifyRecord(raw)
    if (!record.localPath) { output.push(record); continue }
    const extension = extname(record.originalFilename || record.localPath).toLowerCase()
    if (isBlockedExtension(extension) || isBlockedMime(record.mimeType)) {
      output.push({ ...record, kind: 'explanatory_media', disposition: 'link_only_media', localPath: null, exclusionReason: 'Audio/video/animation is link-only.' })
      continue
    }
    if (!config.allowedExtensions.includes(extension)) {
      output.push({ ...record, disposition: 'needs_review', reviewReason: 'Unsupported or ambiguous file type.' })
      continue
    }
    try { await access(record.localPath) } catch {
      output.push({ ...record, disposition: 'inaccessible', reviewReason: 'Export references a missing local file.' })
      continue
    }
    const free = await statfs(target)
    if (Number(free.bavail) * Number(free.bsize) < config.minimumFreeBytes) {
      output.push({ ...record, disposition: 'deferred_disk_guard', reviewReason: 'Stopped at the 5 GiB free-space guard.' })
      continue
    }
    const sha256 = await hashFile(record.localPath)
    const prior = hashes.get(sha256)
    if (prior) {
      prior.occurrences.push(...recordOccurrences(record))
      prior.sourceBatches = uniqueNumbers([...prior.sourceBatches, record.sourceBatch])
      prior.important = prior.sourceBatches.length >= 2
      output.push({ ...record, sha256, canonicalId: prior.id, canonicalPath: prior.canonicalPath, disposition: 'exact_duplicate' })
      continue
    }
    const destination = canonicalDestination(record, extension)
    await mkdir(dirname(destination), { recursive: true })
    // Preserve the single-physical-copy goal on APFS when possible. Node
    // falls back to a regular copy if clone-on-write is unavailable.
    await copyFile(record.localPath, destination, constants.COPYFILE_FICLONE)
    const info = await stat(destination)
    const canonical = {
      ...record,
      sha256,
      sizeBytes: info.size,
      canonicalPath: relative(target, destination),
      disposition: 'downloaded',
      occurrences: recordOccurrences(record),
      sourceBatches: uniqueNumbers([record.sourceBatch]),
      important: false,
    }
    if (config.officeExtensions.includes(extension)) canonical.previewPath = await convertOfficePreview(destination, sha256)
    hashes.set(sha256, canonical)
    output.push(canonical)
  }
  return output
}

function classifyRecord(raw) {
  const text = [raw.title, raw.caption, raw.originalFilename, raw.module].filter(Boolean).join(' ')
  const year = raw.year || inferYear(text)
  const module = raw.module || inferModule(text)
  const doctor = raw.doctor || [raw.title, raw.originalFilename, raw.caption].filter(Boolean).map(inferDoctor).find(Boolean) || null
  const category = inferCategory(text, raw.kind)
  const isExam = /\b(exam|eom|eoy|test|written|quiz)\b|امتحان|اختبار|أسئلة سنين|ريتِن/iu.test(text)
  const official = doctor ? false : /official|department|\bdept\.?\b|faculty|course book|كتاب القسم|الكتاب الرسمي|داتا الكلية|ملزمة القسم|جامعة القاهرة/iu.test(text) || raw.kind === 'orientation'
  const ambiguityEligible = !['inaccessible', 'pending_download', 'deferred_disk_guard', 'link_only_media'].includes(raw.disposition)
  const ambiguous = ambiguityEligible && raw.kind === 'document' && (!year || (!module && !/orientation|guide|grades|map/iu.test(text)) || (!official && !doctor))
  return {
    ...raw,
    year,
    module,
    doctor,
    category,
    isExam,
    ownership: doctor ? 'doctor' : official ? 'official' : 'unresolved',
    confidence: ambiguous ? 0.45 : doctor || official || raw.module ? 0.9 : 0.65,
    disposition: ambiguous ? 'needs_review' : raw.disposition,
    reviewReason: ambiguous ? 'Caption and parent context do not establish a safe destination.' : raw.reviewReason,
    subjects: findModule(year, module)?.subjects || [],
    tags: buildTags(text),
  }
}

function canonicalDestination(record, extension) {
  if (record.disposition === 'needs_review') return join(reviewDir, safeName(record.originalFilename || record.title || record.id))
  const yearConfig = config.years.find(item => item.year === record.year)
  const yearDir = join(universityDir, 'Year ' + (record.year || 'Unknown'))
  if (!record.module) return join(yearDir, 'Orientation & Official Admin', legacyName(record, extension))
  const configured = findModule(record.year, record.module)
  const isSecondary = yearConfig?.secondaryModules?.some(name => normalize(name).includes(normalize(record.module)) || normalize(record.module).includes(normalize(name)))
  const base = isSecondary ? join(yearDir, 'Secondary Modules', safeName(record.module)) : join(yearDir, configured ? moduleFolder(configured) : safeName(record.module))
  const owner = record.ownership === 'doctor' ? join('Standalone Doctor Courses', safeName('Dr ' + record.doctor)) : join('Department - Official')
  const exams = record.isExam ? join('Previous Year Exams & Tests', 'Batch ' + (record.sourceBatch || 'Unknown')) : ''
  return join(base, record.category, owner, exams, legacyName(record, extension))
}

function legacyName(record, extension) {
  const original = safeName(record.originalFilename || record.title || record.id)
  const effective = config.years.find(year => year.year === record.year)?.effectiveBatch
  if (!record.sourceBatch || !effective || record.sourceBatch >= effective) return original
  const stem = original.slice(0, original.length - extension.length)
  return stem + ' [Source Batch ' + record.sourceBatch + ']' + extension
}

async function convertOfficePreview(source, sha256) {
  const outputDirectory = join(previewDir, sha256.slice(0, 2))
  await mkdir(outputDirectory, { recursive: true })
  const success = await run('soffice', ['--headless', '--convert-to', 'pdf', '--outdir', outputDirectory, source])
  if (!success) return null
  const converted = join(outputDirectory, basename(source, extname(source)) + '.pdf')
  try { await access(converted); return relative(target, converted) } catch { return null }
}

function run(command, commandArgs) {
  return new Promise(resolvePromise => {
    const child = spawn(command, commandArgs, { stdio: 'ignore' })
    child.on('error', () => resolvePromise(false))
    child.on('exit', code => resolvePromise(code === 0))
  })
}

function buildManifest(items) {
  const downloaded = items.filter(item => item.disposition === 'downloaded')
  const pending = items.filter(item => !['downloaded', 'exact_duplicate', 'link_only_media', 'orientation_index'].includes(item.disposition))
  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    university: config.university,
    timezone: config.timezone,
    years: config.years,
    summary: {
      records: items.length,
      downloadedFiles: downloaded.length,
      exactDuplicates: items.filter(item => item.disposition === 'exact_duplicate').length,
      pending: pending.length,
      mediaLinks: items.filter(item => item.disposition === 'link_only_media').length,
      important: downloaded.filter(item => item.important).length,
    },
    records: items.map(item => ({ ...item, localPath: undefined })),
  }
}

function buildCalendar(items) {
  const events = []
  for (const item of items) {
    for (const date of item.dates || []) {
      if (!date.date || date.confidence < 0.8 || !date.explicit) continue
      events.push({
        id: item.id + '-' + date.date,
        title: date.title || item.title,
        date: date.date,
        startTime: date.startTime || '',
        endTime: date.endTime || '',
        type: date.type || (item.isExam ? 'exam' : 'teaching'),
        year: item.year,
        module: item.module,
        sourceBatch: item.sourceBatch,
        archive: item.sourceBatch < (config.years.find(year => year.year === item.year)?.effectiveBatch || item.sourceBatch),
        sourceId: item.id,
        sourcePath: item.previewPath || item.canonicalPath || null,
        telegramUrl: item.telegramUrl || null,
      })
    }
  }
  return events.sort((a, b) => a.date.localeCompare(b.date))
}

function buildMessageGraph(seed, manifest) {
  const messages = (seed.messages || []).map(message => ({ ...message }))
  const seededByUrl = new Map(messages.filter(message => message.telegramUrl).map(message => [normalizeTelegramUrl(message.telegramUrl), message]))
  for (let index = 0; index < messages.length; index++) {
    const message = messages[index]
    const references = [...(message.references || [])]
    if (message.exactText) {
      for (const href of message.exactText.match(/https?:\/\/t\.me\/[A-Za-z0-9_]+(?:\/\d+)?/giu) || []) {
        if (!references.some(reference => normalizeTelegramUrl(reference.href) === normalizeTelegramUrl(href))) references.push({ href, label: href })
      }
    }
    message.references = references
    for (const reference of references) {
      const key = normalizeTelegramUrl(reference.href)
      if (!/^https:\/\/t\.me\/[a-z0-9_]+\/\d+$/iu.test(key) || seededByUrl.has(key)) continue
      const sourceBatch = inferBatch(reference.href) || message.sourceBatch || null
      const placeholder = {
        id: `linked-${sourceBatch || 'unknown'}-${shortHash(key)}`,
        sourceBatch,
        year: message.year || null,
        module: message.module || null,
        title: reference.label && reference.label !== reference.href ? reference.label : `Linked Telegram message · ${reference.href.split('/').slice(-2).join('/')}`,
        telegramUrl: reference.href,
        exactText: null,
        exactTextStatus: 'pending_authenticated_export',
        discoveredFrom: [message.id],
        references: [],
      }
      messages.push(placeholder)
      seededByUrl.set(key, placeholder)
    }
  }
  const messagesByUrl = new Map(messages.filter(message => message.telegramUrl).map(message => [normalizeTelegramUrl(message.telegramUrl), message]))
  const recordsByUrl = new Map()
  for (const record of manifest.records) {
    for (const url of [record.telegramUrl, ...(record.occurrences || []).map(item => item.telegramUrl)].filter(Boolean)) {
      const key = normalizeTelegramUrl(url)
      const matches = recordsByUrl.get(key) || []
      if (!matches.some(item => item.id === record.id)) matches.push(record)
      recordsByUrl.set(key, matches)
    }
  }
  for (const message of messages) {
    message.references = (message.references || []).map(reference => {
      const key = normalizeTelegramUrl(reference.href)
      const targetMessage = messagesByUrl.get(key)
      const targetRecords = recordsByUrl.get(key) || []
      return {
        ...reference,
        kind: targetMessage ? 'message' : targetRecords.length ? 'document' : 'external',
        targetMessageId: targetMessage?.id || null,
        recordIds: targetRecords.map(record => record.id),
      }
    })
    message.recordIds = (recordsByUrl.get(normalizeTelegramUrl(message.telegramUrl)) || []).map(record => record.id)
  }
  attachAdjacentTelegramDocuments(messages, manifest.records)
  return { schemaVersion: seed.schemaVersion || 1, scope: seed.scope || '', roots: seed.roots || [], messages }
}

function attachAdjacentTelegramDocuments(messages, records) {
  const anchorsByChannel = new Map()
  const recordsByChannel = new Map()
  for (const message of messages) {
    const post = telegramPost(message.telegramUrl)
    if (!post) continue
    const anchors = anchorsByChannel.get(post.channel) || []
    anchors.push({ ...post, message })
    anchorsByChannel.set(post.channel, anchors)
  }
  for (const record of records) {
    for (const url of [record.telegramUrl, ...(record.occurrences || []).map(item => item.telegramUrl)].filter(Boolean)) {
      const post = telegramPost(url)
      if (!post || !record.canonicalPath) continue
      const entries = recordsByChannel.get(post.channel) || []
      if (!entries.some(entry => entry.record.id === record.id && entry.id === post.id)) entries.push({ ...post, record })
      recordsByChannel.set(post.channel, entries)
    }
  }
  for (const [channel, anchors] of anchorsByChannel) {
    anchors.sort((a, b) => a.id - b.id)
    const channelRecords = (recordsByChannel.get(channel) || []).sort((a, b) => a.id - b.id)
    for (let index = 0; index < anchors.length; index += 1) {
      const anchor = anchors[index]
      if (!anchor.message.exactText || anchor.message.exactTextStatus === 'verified_public_attachment_or_media_endpoint') continue
      const nextAnchorId = anchors[index + 1]?.id ?? Number.POSITIVE_INFINITY
      const upperBound = Math.min(nextAnchorId, anchor.id + 21)
      const adjacent = channelRecords
        .filter(entry => entry.id > anchor.id && entry.id < upperBound)
        .map(entry => entry.record.id)
      if (!adjacent.length) continue
      anchor.message.adjacentRecordIds = [...new Set(adjacent)]
      anchor.message.recordIds = [...new Set([...(anchor.message.recordIds || []), ...adjacent])]
    }
  }
}

function telegramPost(value) {
  const match = normalizeTelegramUrl(value).match(/^https:\/\/t\.me\/([a-z0-9_]+)\/(\d+)$/iu)
  return match ? { channel: match[1].toLowerCase(), id: Number(match[2]) } : null
}

function normalizeTelegramUrl(value) {
  return String(value || '').replace(/[?#].*$/u, '').replace(/\/$/u, '').toLowerCase()
}

async function emitOutputs(manifest, calendar, messages) {
  const catalogJson = JSON.stringify(manifest, null, 2) + '\n'
  await writeFile(join(guideDir, 'catalog.json'), catalogJson)
  await writeFile(join(guideDir, 'catalog.csv'), toCsv(manifest.records))
  await writeFile(join(guideDir, 'provenance-and-duplicates.json'), JSON.stringify({ generatedAt: manifest.generatedAt, records: manifest.records.map(record => ({ id: record.id, sha256: record.sha256 || null, canonicalId: record.canonicalId || record.id, canonicalPath: record.canonicalPath || null, occurrences: record.occurrences || [occurrence(record)], important: Boolean(record.important) })) }, null, 2) + '\n')
  await writeFile(join(guideDir, 'calendar-events.json'), JSON.stringify(calendar, null, 2) + '\n')
  await writeFile(join(guideDir, 'orientation-and-message-graph.json'), JSON.stringify(messages, null, 2) + '\n')
  await writeFile(join(guideDir, 'discovery-state.json'), JSON.stringify({ generatedAt: manifest.generatedAt, complete: manifest.summary.pending === 0, records: manifest.records.map(record => ({ id: record.id, disposition: record.disposition, telegramUrl: record.telegramUrl || null, externalUrl: record.externalUrl || null })) }, null, 2) + '\n')
  await writeFile(join(guideDir, 'Repeated Across Cohorts.md'), repeatedReport(manifest.records))
  await writeFile(join(guideDir, 'Explanatory Media Links.md'), mediaReport(manifest.records))
  await writeFile(join(guideDir, 'Pending or Inaccessible.md'), pendingReport(manifest.records))
  await writeFile(join(guideDir, 'README.md'), guideReadme(manifest))
  await createFinderHelper()
  const template = await readFile(join(HERE, 'index.template.html'), 'utf8')
  const safePayload = JSON.stringify({ manifest, calendar, messages, targetRoot: target }).replace(/<\//g, '<\\/')
  await writeFile(join(target, 'index.html'), template.replace('__LIBRARY_DATA__', safePayload))
}

async function createFinderHelper() {
  const app = join(systemDir, 'Kasr Archive Helper.app')
  const contents = join(app, 'Contents')
  const executableDir = join(contents, 'MacOS')
  const executable = join(executableDir, 'KasrArchiveHelper')
  const source = join(systemDir, 'KasrArchiveHelper.m')
  await rm(app, { recursive: true, force: true })
  await mkdir(executableDir, { recursive: true })
  await writeFile(source, `#import <Cocoa/Cocoa.h>
#import <CoreServices/CoreServices.h>

@interface KasrArchiveDelegate : NSObject <NSApplicationDelegate>
@property BOOL handledURL;
@end

@implementation KasrArchiveDelegate
- (void)applicationDidFinishLaunching:(NSNotification *)notification {
  CFURLRef bundleURL = (__bridge CFURLRef)[NSBundle mainBundle].bundleURL;
  CFStringRef bundleID = (__bridge CFStringRef)[NSBundle mainBundle].bundleIdentifier;
  LSRegisterURL(bundleURL, true);
  LSSetDefaultHandlerForURLScheme(CFSTR("kasrarchive"), bundleID);
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.75 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    if (!self.handledURL) [NSApp terminate:nil];
  });
}

- (void)application:(NSApplication *)application openURLs:(NSArray<NSURL *> *)urls {
  self.handledURL = YES;
  NSString *prefix = @"kasrarchive://reveal/";
  for (NSURL *url in urls) {
    NSString *absolute = url.absoluteString;
    if (![absolute hasPrefix:prefix]) continue;
    NSString *payload = [absolute substringFromIndex:prefix.length];
    payload = [payload stringByReplacingOccurrencesOfString:@"-" withString:@"+"];
    payload = [payload stringByReplacingOccurrencesOfString:@"_" withString:@"/"];
    while (payload.length % 4) payload = [payload stringByAppendingString:@"="];
    NSData *data = [[NSData alloc] initWithBase64EncodedString:payload options:0];
    NSString *path = data ? [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding] : nil;
    if (path.length && [[NSFileManager defaultManager] fileExistsAtPath:path]) {
      [[NSWorkspace sharedWorkspace] activateFileViewerSelectingURLs:@[[NSURL fileURLWithPath:path]]];
      break;
    }
  }
  [application terminate:nil];
}
@end

int main(int argc, const char *argv[]) {
  @autoreleasepool {
    NSApplication *application = [NSApplication sharedApplication];
    KasrArchiveDelegate *delegate = [KasrArchiveDelegate new];
    application.delegate = delegate;
    [application setActivationPolicy:NSApplicationActivationPolicyAccessory];
    [application run];
  }
  return 0;
}
`)
  const compiled = await run('/usr/bin/xcrun', ['clang', '-fobjc-arc', '-fblocks', '-framework', 'Cocoa', '-framework', 'CoreServices', '-o', executable, source])
  if (!compiled) throw new Error('Could not compile the Finder reveal helper')
  await unlink(source)
  await writeFile(join(contents, 'Info.plist'), `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
<key>CFBundleName</key><string>Kasr Archive Helper</string>
<key>CFBundleDisplayName</key><string>Kasr Archive Helper</string>
<key>CFBundleIdentifier</key><string>local.kasralainy.archive.helper</string>
<key>CFBundleVersion</key><string>1</string>
<key>CFBundleShortVersionString</key><string>1.0</string>
<key>CFBundlePackageType</key><string>APPL</string>
<key>CFBundleExecutable</key><string>KasrArchiveHelper</string>
<key>LSUIElement</key><true/>
<key>NSHighResolutionCapable</key><true/>
<key>CFBundleURLTypes</key><array><dict><key>CFBundleURLName</key><string>Kasr Archive Reveal</string><key>CFBundleTypeRole</key><string>Viewer</string><key>CFBundleURLSchemes</key><array><string>kasrarchive</string></array></dict></array>
</dict></plist>\n`)
  const signed = await run('/usr/bin/codesign', ['--force', '--deep', '--sign', '-', app])
  if (!signed) throw new Error('Could not sign the Finder reveal helper')
  await run('/usr/bin/open', ['-gj', app])
}

function toCsv(records) {
  const keys = ['id', 'title', 'year', 'module', 'category', 'ownership', 'doctor', 'sourceBatch', 'disposition', 'confidence', 'important', 'originalFilename', 'canonicalPath', 'previewPath', 'telegramUrl', 'externalUrl', 'caption']
  return keys.join(',') + '\n' + records.map(record => keys.map(key => csv(Array.isArray(record[key]) ? record[key].join(' | ') : record[key])).join(',')).join('\n') + '\n'
}

function repeatedReport(records) {
  const rows = records.filter(record => record.important)
  return '# Important — Repeated Across Cohorts\n\n' + (rows.length ? rows.map(record => '- **' + record.title + '** — batches ' + (record.sourceBatches || []).join(', ') + ' — `' + record.canonicalPath + '`').join('\n') : '_No cross-cohort exact duplicates have been downloaded yet._') + '\n'
}

function mediaReport(records) {
  const rows = records.filter(record => record.disposition === 'link_only_media')
  return '# Explanatory Media Links\n\nVideo and audio are intentionally not downloaded.\n\n' + (rows.length ? rows.map(record => '- [' + record.title + '](' + (record.externalUrl || record.telegramUrl) + ') — ' + (record.caption || 'No caption')).join('\n') : '_No explanatory media links captured yet._') + '\n'
}

function pendingReport(records) {
  const rows = records.filter(record => !['downloaded', 'exact_duplicate', 'link_only_media', 'orientation_index'].includes(record.disposition))
  return '# Pending or Inaccessible\n\n' + (rows.length ? rows.map(record => '- **' + record.title + '** — `' + record.disposition + '` — ' + (record.reviewReason || record.telegramUrl || record.externalUrl || 'Awaiting discovery')).join('\n') : '_Nothing pending._') + '\n'
}

function guideReadme(manifest) {
  return '# Kasr Al Ainy Offline Study Library\n\nOpen `../index.html` by double-clicking it.\n\n- Records: ' + manifest.summary.records + '\n- Downloaded files: ' + manifest.summary.downloadedFiles + '\n- Pending discovery/review: ' + manifest.summary.pending + '\n- Link-only media: ' + manifest.summary.mediaLinks + '\n\nThe catalog preserves original Telegram captions and provenance. No audio or video is stored.\n'
}

function occurrence(record) {
  return { sourceBatch: record.sourceBatch || null, telegramUrl: record.telegramUrl || null, externalUrl: record.externalUrl || null, caption: record.caption || '', originalFilename: record.originalFilename || null }
}

function recordOccurrences(record) {
  return record.occurrences?.length ? record.occurrences : [occurrence(record)]
}

async function hashFile(path) {
  return await new Promise((resolvePromise, rejectPromise) => {
    const hash = createHash('sha256')
    const stream = createReadStream(path)
    stream.on('error', rejectPromise)
    stream.on('data', chunk => hash.update(chunk))
    stream.on('end', () => resolvePromise(hash.digest('hex')))
  })
}

function inferBatch(text) {
  // Cohort identifiers also occur in machine-generated paths such as
  // `year4-current-batch196-download-state.json`, where a word boundary does
  // not exist between `batch` and `196`. Only require digit boundaries so the
  // parser still rejects longer numbers such as dates and document IDs.
  const matches = String(text).match(/(?<!\d)(19[4-9]|200)(?!\d)/g)
  return matches ? Math.max(...matches.map(Number)) : null
}

function inferYear(text) {
  const value = String(text)
  const direct = value.match(/(?:year|سنة|السنة)\s*([1-5]|الأولى|الاولى|الثانية|الثالثة|الرابعة|الخامسة)/iu)?.[1]
  const names = { الأولى: 1, الاولى: 1, الثانية: 2, الثالثة: 3, الرابعة: 4, الخامسة: 5 }
  if (direct) return Number(direct) || names[direct]
  const module = inferModule(value)
  if (/^(10[1-8])/.test(module || '')) return 1
  if (/^(20[5-9]|210)/.test(module || '')) return 2
  if (/^(30[9]|310|314|319)/.test(module || '')) return 3
  return null
}

function inferModule(text) {
  const value = String(text)
  const code = value.match(/\b(101\s*ISK|102\s*INT|103\s*BMS|104\s*CPS|108\s*INT|205\s*NEU|206\s*DIG|207\s*END|208\s*INT|210\s*PAT|309\s*INF|310\s*PAT|314|319|MPE[- ]?327)\b/i)?.[1]
  if (code) return code.replace(/\s+/g, ' ').toUpperCase().replace('MPE 327', 'MPE-327 Ethics')
  const named = [
    ['paediatrics|pediatrics|أطفال', 'PAEDS'], ['obstetrics|gyn(?:ae)?cology|نسا', 'OBGYN'], ['general surgery|جراحة', 'SURG'],
    ['internal medicine|باطنة', 'IM'], ['psychiatry|نفسية', 'PSY'], ['family medicine|طب الأسرة', 'FM'],
    ['ophthalmology|\\boph\\b|رمد', 'Clinical'], ['forensic|toxicology|toxico|طب شرعي|سموم', 'Clinical'], ['\\bent\\b|أنف وأذن', 'Clinical'],
    ['psychology|سايكو', 'Psychology 213'], ['community', 'Community Medicine'], ['palliative|oncology', 'Palliative Medicine & Oncology'], ['research', 'Research'],
  ]
  return named.find(([pattern]) => new RegExp(pattern, 'iu').test(value))?.[1] || null
}

function inferDoctor(text) {
  const value = String(text)
  const marker = /(?:^|[\s[(])(?:Dr\.?|د\.?|دكتور(?:ة)?)\s*/iu.exec(value)
  if (!marker) return null
  let remainder = value.slice(marker.index + marker[0].length)
    .replace(/\.(?:pdf|docx?|pptx?|xlsx?|epub|txt|md)\b.*$/iu, '')
    .split(/\.{2,}|[|_[\](){},:;،؛]|\s+[—–]\s+/u)[0]
    .trim()
  const boundary = /^(?:practical|pharma(?:cology)?|anatomy|histo(?:logy)?|physio(?:logy)?|patho(?:logy)?|micro(?:biology)?|bio(?:chemistry)?|surgery|medicine|obstetrics?|gyn(?:ae)?cology|paed(?:iatrics?)?|pediatrics?|notes?|slides?|lectures?|books?|final|revision|questions?|exam|module|cases?|matching|mock|written|oral|workbook|presentation|answers?|key|boards?|crash|tips?|high-?yield|general|special|clinical|diagnostics?|cardiac|respiratory|vascular|endocrine|neuro|cns|git|cvs|eye|ophthalmology|oph|ent|derma(?:tology)?|toxico(?:logy)?|forensic|nutrition|psych(?:iatry|ology)?|radiology|anaesthesia|breast|urology|orthopaedics?|plastic|imaging|lymphatics|thyroid|scrotum|face|hernia|operative|andrology|upper|lower|limb|شرح|ملزمة|محاضرات?|فاينال|عملي|أسئلة|امتحان|بورد|تحديدات|مراجعة|كتاب|اناتومي|فسيولوجي|باثولوجي|فارما)$/iu
  const tokens = []
  for (const rawToken of remainder.split(/\s+/u)) {
    const token = rawToken.replace(/^[^\p{L}]+|[^\p{L}.'-]+$/gu, '')
    if (!token || /\d/u.test(token) || boundary.test(token)) break
    tokens.push(token)
    if (tokens.length === 4) break
  }
  return tokens.length ? tokens.join(' ').replace(/\s{2,}/g, ' ').trim() : null
}

function inferCategory(text, kind) {
  if (kind === 'practical_index' || /practical|osce|spotter|عملي|لاب/iu.test(text)) return 'Practical Files & Tests'
  if (/\bmcq|question bank|qbank|بنك أسئلة|أسئلة اختيار/iu.test(text)) return 'MCQs'
  return 'Study Files'
}

function findModule(year, module) {
  if (!module) return null
  return config.years.find(item => item.year === year)?.modules.find(item => normalize(item.code) === normalize(module) || normalize(item.name) === normalize(module)) || null
}

function buildTags(text) {
  const tags = []
  if (/exam|eom|eoy|امتحان/iu.test(text)) tags.push('exam')
  if (/practical|osce|spotter|عملي/iu.test(text)) tags.push('practical')
  if (/mcq|qbank|question/iu.test(text)) tags.push('mcq')
  if (/book|كتاب/iu.test(text)) tags.push('book')
  if (/schedule|timetable|جدول|ميعاد|موعد/iu.test(text)) tags.push('schedule')
  return tags
}

function isBlockedExtension(extension) { return config.blockedExtensions.includes(extension) }
function isBlockedMime(mime) { return /^(audio|video)\//i.test(mime || '') || /gif|animation/i.test(mime || '') }
function isMediaUrl(url) { return /(?:youtube\.com|youtu\.be|vimeo\.com|soundcloud\.com)|\.(?:mp4|mov|mkv|webm|mp3|m4a|wav|ogg|opus)(?:\?|$)/iu.test(url) }
function normalize(value) { return String(value || '').normalize('NFKD').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '') }
function safeName(value) { return String(value || 'Untitled').normalize('NFC').replace(/[\u0000-\u001f\/:*?"<>|]/g, ' - ').replace(/\s+/g, ' ').replace(/[. ]+$/g, '').slice(0, 180) || 'Untitled' }
function slug(value) { return normalize(value).slice(0, 40) || 'unknown' }
function shortHash(value) { return createHash('sha256').update(String(value)).digest('hex').slice(0, 12) }
function rankBatch(batch) {
  const index = config.batchPriority.indexOf(batch)
  return index === -1 ? 0 : config.batchPriority.length - index
}
function uniqueNumbers(values) { return [...new Set(values.filter(Boolean).map(Number))].sort((a, b) => b - a) }
function csv(value) { const string = value == null ? '' : String(value); return '"' + string.replace(/"/g, '""') + '"' }
