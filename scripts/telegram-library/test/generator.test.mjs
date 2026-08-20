import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

test('build emits a self-contained offline library and canonical hierarchy', async () => {
  const target = await mkdtemp(join(tmpdir(), 'kasr-library-'))
  const result = await run(['build.mjs', '--target', target])
  assert.equal(result.code, 0, result.stderr)

  const index = await readFile(join(target, 'index.html'), 'utf8')
  assert.match(index, /Kasr Al Ainy Study Archive/)
  assert.doesNotMatch(index, /__LIBRARY_DATA__/)
  assert.doesNotMatch(index, /https:\/\/[^"']+\.(?:js|css)/)
  for (const id of ['moduleFilter', 'ownerFilter', 'doctorFilter', 'cohortFilter', 'flagFilter', 'pageNumber', 'messagesTab', 'messageStage', 'revealFile', 'folderTree', 'newFolder', 'folderModal', 'fileFoldersModal', 'favoriteFile', 'organizeFile']) {
    assert.match(index, new RegExp(`id="${id}"`))
  }
  assert.match(index, /record\.occurrences/)
  assert.match(index, /saved\.progress/)
  assert.match(index, /kasrarchive:\/\/reveal\//)
  assert.match(index, /messageHistory/)
  assert.match(index, /saved\.folders/)
  assert.match(index, /descendantFolderIds/)
  assert.match(index, /folderNoteInput/)

  const messageGraph = JSON.parse(await readFile(join(target, '_Library Guide & Catalogs', 'orientation-and-message-graph.json'), 'utf8'))
  const batch199 = messageGraph.messages.find(message => message.id === 'tg-199-y1')
  assert.match(batch199.exactText, /🟥1st YEAR 199🟥/)
  assert.equal(batch199.references.find(reference => reference.href.endsWith('/10')).targetMessageId, '199-101')
  const module101 = messageGraph.messages.find(message => message.id === '199-101')
  const nestedModuleIndex = module101.references.find(reference => reference.href.endsWith('/16'))
  assert.ok(nestedModuleIndex.targetMessageId)
  const nestedModuleMessage = messageGraph.messages.find(message => message.id === nestedModuleIndex.targetMessageId)
  assert.equal(nestedModuleMessage.exactTextStatus, 'verified_public_telegram_page_preview')
  assert.match(nestedModuleMessage.exactText, /🟥Module 101 \[ISK\] شروحات:/)
  const batch200 = messageGraph.messages.find(message => message.id === 'tg-200-y1')
  assert.ok(batch200.references.find(reference => reference.href.endsWith('/34')).targetMessageId)
  assert.match(messageGraph.messages.find(message => message.telegramUrl.endsWith('/34')).exactText, /علم التشريح/)
  assert.match(messageGraph.messages.find(message => message.id === 'tg-198-y2').exactText, /🟥2nd YEAR 198🟥/)
  const helperApp = join(target, '.library-system', 'Kasr Archive Helper.app')
  const helperPlist = await readFile(join(helperApp, 'Contents', 'Info.plist'), 'utf8')
  assert.match(helperPlist, /kasrarchive/)
  const helper = join(helperApp, 'Contents', 'MacOS', 'KasrArchiveHelper')
  assert.ok((await stat(helper)).mode & 0o111)
  assert.notEqual((await readFile(helper)).subarray(0, 2).toString(), '#!')

  const catalog = JSON.parse(await readFile(join(target, '_Library Guide & Catalogs', 'catalog.json'), 'utf8'))
  assert.ok(catalog.records.length >= 20)
  assert.ok(catalog.records.every(record => !record.sourceBatch || [200, 199, 198, 197, 196, 195, 194].includes(record.sourceBatch)))
  assert.ok(catalog.records.some(record => record.module === '103 BMS'))
  assert.ok(catalog.records.every(record => record.localPath === undefined))
  assert.ok(catalog.records.some(record => record.id === 'tg-195-y5' && record.disposition === 'orientation_index'))
  assert.ok(catalog.records.some(record => record.id === '195-orientation-video' && record.disposition === 'link_only_media'))

  const yearOne = join(target, 'Cairo University - Kasr Al Ainy Faculty of Medicine', 'Year 1')
  assert.ok((await stat(join(yearOne, 'Orientation & Official Admin'))).isDirectory())
  const moduleFolders = await readdir(yearOne)
  assert.ok(moduleFolders.some(name => name.startsWith('103 BMS')))
})

test('generated discovery state keeps unresolved nodes visible', async () => {
  const target = await mkdtemp(join(tmpdir(), 'kasr-library-'))
  const result = await run(['build.mjs', '--target', target])
  assert.equal(result.code, 0, result.stderr)
  const state = JSON.parse(await readFile(join(target, '_Library Guide & Catalogs', 'discovery-state.json'), 'utf8'))
  assert.equal(state.complete, false)
  assert.ok(state.records.some(record => record.disposition === 'pending_discovery'))
})

test('download-state paths without word boundaries retain cohort provenance', async () => {
  const base = await mkdtemp(join(tmpdir(), 'kasr-library-'))
  const target = join(base, 'library')
  const input = join(base, 'telegram-library-work', 'discovery', 'year2-download-state.json')
  const staged = join(base, 'telegram-library-work', 'staging', 'Year 2 - Batch 198', 'Example.pdf')
  await mkdir(join(base, 'telegram-library-work', 'discovery'), { recursive: true })
  await mkdir(join(base, 'telegram-library-work', 'staging', 'Year 2 - Batch 198'), { recursive: true })
  await writeFile(staged, '%PDF-1.4\n%%EOF\n')
  await writeFile(input, JSON.stringify({
    staging: 'staging/Year 2 - Batch 198',
    files: [{
      canonicalName: 'Example.pdf',
      originalName: 'Example.pdf',
      telegramDocumentId: 'example-document',
      stagingPath: 'telegram-library-work/staging/Year 2 - Batch 198/Example.pdf',
    }],
    occurrences: [{
      mid: '4294967305',
      telegramDocumentId: 'example-document',
      name: 'Example.pdf',
      size: '12 KB',
      status: 'staged',
    }],
  }))

  const result = await run(['build.mjs', '--target', target, '--download-state', input])
  assert.equal(result.code, 0, result.stderr)
  const catalog = JSON.parse(await readFile(join(target, '_Library Guide & Catalogs', 'catalog.json'), 'utf8'))
  const record = catalog.records.find(item => item.id === 'telegram-198-example-document')
  assert.equal(record.sourceBatch, 198)
  assert.equal(record.telegramUrl, 'https://t.me/FUTUREDOCTORS_198/9')
  assert.equal(record.disposition, 'downloaded')
})

test('unexported Telegram documents remain resumable pending downloads', async () => {
  const target = await mkdtemp(join(tmpdir(), 'kasr-library-'))
  const input = join(target, 'year5-batch195-download-state.json')
  await writeFile(input, JSON.stringify({
    files: [],
    occurrences: [{ mid: '4294967305', telegramDocumentId: 'pending-document', name: 'Pending.pdf', status: 'not-downloaded' }],
  }))
  const result = await run(['build.mjs', '--target', target, '--download-state', input])
  assert.equal(result.code, 0, result.stderr)
  const catalog = JSON.parse(await readFile(join(target, '_Library Guide & Catalogs', 'catalog.json'), 'utf8'))
  const record = catalog.records.find(item => item.id === 'telegram-pending-195-pending-document')
  assert.equal(record.disposition, 'pending_download')
  assert.match(record.reviewReason, /No verified local export/)
})

test('doctor names and ENT module context are bounded by document subject text', async () => {
  const base = await mkdtemp(join(tmpdir(), 'kasr-library-'))
  const target = join(base, 'library')
  const input = join(base, 'year3-batch197-download-state.json')
  const stagedDir = join(base, 'staging')
  const first = join(stagedDir, 'Dr. Hussein Khairy Breast Surgery.pdf')
  const second = join(stagedDir, 'ENT OSCE by Dr. Wael Salah.pdf')
  await mkdir(stagedDir, { recursive: true })
  await writeFile(first, '%PDF-1.4\nfirst\n%%EOF\n')
  await writeFile(second, '%PDF-1.4\nsecond\n%%EOF\n')
  await writeFile(input, JSON.stringify({
    files: [
      { canonicalName: 'Dr. Hussein Khairy Breast Surgery.pdf', originalName: 'Dr. Hussein Khairy Breast Surgery.pdf', telegramDocumentId: 'doctor-one', stagingPath: first },
      { canonicalName: 'ENT OSCE by Dr. Wael Salah.pdf', originalName: 'ENT OSCE by Dr. Wael Salah.pdf', telegramDocumentId: 'doctor-two', stagingPath: second },
    ],
    occurrences: [
      { mid: '4294967310', telegramDocumentId: 'doctor-one', name: 'Dr. Hussein Khairy Breast Surgery.pdf', size: '1 KB', status: 'staged' },
      { mid: '4294967311', telegramDocumentId: 'doctor-two', name: 'ENT OSCE by Dr. Wael Salah.pdf', size: '1 KB', status: 'staged' },
    ],
  }))
  const result = await run(['build.mjs', '--target', target, '--download-state', input])
  assert.equal(result.code, 0, result.stderr)
  const catalog = JSON.parse(await readFile(join(target, '_Library Guide & Catalogs', 'catalog.json'), 'utf8'))
  const khairy = catalog.records.find(item => item.id === 'telegram-197-doctor-one')
  const wael = catalog.records.find(item => item.id === 'telegram-197-doctor-two')
  assert.equal(khairy.doctor, 'Hussein Khairy')
  assert.equal(wael.doctor, 'Wael Salah')
  assert.equal(wael.module, 'Clinical')
  assert.match(wael.canonicalPath, /Standalone Doctor Courses\/Dr Wael Salah/)
})

test('rebuild removes only files previously managed by the generated catalog', async () => {
  const base = await mkdtemp(join(tmpdir(), 'kasr-library-'))
  const target = join(base, 'library')
  const input = join(base, 'year3-batch197-download-state.json')
  const staged = join(base, 'Temporary.pdf')
  await writeFile(staged, '%PDF-1.4\ntemporary\n%%EOF\n')
  await writeFile(input, JSON.stringify({
    files: [{ canonicalName: 'Temporary.pdf', originalName: 'Temporary.pdf', telegramDocumentId: 'temporary-document', stagingPath: staged }],
    occurrences: [{ mid: '4294967320', telegramDocumentId: 'temporary-document', name: 'Temporary.pdf', size: '1 KB', status: 'staged' }],
  }))
  const first = await run(['build.mjs', '--target', target, '--download-state', input])
  assert.equal(first.code, 0, first.stderr)
  const firstCatalog = JSON.parse(await readFile(join(target, '_Library Guide & Catalogs', 'catalog.json'), 'utf8'))
  const managed = firstCatalog.records.find(item => item.id === 'telegram-197-temporary-document')
  const managedPath = join(target, managed.canonicalPath)
  assert.ok((await stat(managedPath)).isFile())
  const personal = join(target, 'personal-note.txt')
  await writeFile(personal, 'keep me')

  const second = await run(['build.mjs', '--target', target])
  assert.equal(second.code, 0, second.stderr)
  await assert.rejects(stat(managedPath), error => error?.code === 'ENOENT')
  assert.equal(await readFile(personal, 'utf8'), 'keep me')
})

function run(args) {
  return new Promise(resolve => {
    const child = spawn(process.execPath, args, { cwd: ROOT })
    let stdout = '', stderr = ''
    child.stdout.on('data', chunk => { stdout += chunk })
    child.stderr.on('data', chunk => { stderr += chunk })
    child.on('exit', code => resolve({ code, stdout, stderr }))
  })
}
