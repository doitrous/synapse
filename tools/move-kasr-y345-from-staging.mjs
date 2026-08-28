#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'

const desktopRoot = path.resolve(process.argv[2] || '/Users/doitrous/Desktop/Kasr Alainy')
const stagingRoot = path.resolve(process.argv[3] || '/Users/doitrous/Documents/yyaaaacodex/telegram-library-work/staging')
const execute = process.argv.includes('--execute')

const sources = new Map()
const yearRows = new Map([[3, []], [4, []], [5, []]])

for (const year of [3, 4, 5]) {
  const catalogPath = path.join(desktopRoot, `y${year}`, '_Catalog', 'Telegram Source Catalog.csv')
  const table = parseCsv(fs.readFileSync(catalogPath, 'utf8'))
  const headers = table.shift()
  const index = Object.fromEntries(headers.map((header, position) => [header, position]))
  for (const row of table) {
    const destinationRelative = row[index['Destination File']] || ''
    const sourcePath = path.resolve(row[index['Staging Path']] || '')
    if (!destinationRelative || !isInside(stagingRoot, sourcePath)) continue
    const destinationPath = path.join(desktopRoot, `y${year}`, destinationRelative)
    const digest = row[index['SHA-256']] || ''
    const originalName = row[index['Original File']] || path.basename(sourcePath)
    const bytes = fs.existsSync(destinationPath) ? fs.statSync(destinationPath).size : null
    const detail = { year, sourcePath, destinationPath, destinationRelative, digest, originalName, bytes }
    yearRows.get(year).push(detail)
    if (!sources.has(sourcePath)) sources.set(sourcePath, { sourcePath, rows: [] })
    sources.get(sourcePath).rows.push(detail)
  }
}

const results = new Map()
for (const entry of sources.values()) {
  const uniqueTargets = [...new Map(entry.rows.map(row => [row.destinationPath, row])).values()]
  const existingTargets = uniqueTargets.filter(row => fs.existsSync(row.destinationPath) && fs.statSync(row.destinationPath).isFile())
  if (!existingTargets.length) {
    results.set(entry.sourcePath, { status: 'skipped', reason: 'no verified Desktop target', targets: uniqueTargets.map(row => row.destinationPath) })
    continue
  }
  if (!fs.existsSync(entry.sourcePath)) {
    results.set(entry.sourcePath, { status: 'already absent', targets: existingTargets.map(row => row.destinationPath) })
    continue
  }
  const sourceStat = fs.lstatSync(entry.sourcePath)
  if (!sourceStat.isFile() || sourceStat.isSymbolicLink()) {
    results.set(entry.sourcePath, { status: 'skipped', reason: 'staging source is not a regular file', targets: existingTargets.map(row => row.destinationPath) })
    continue
  }
  const sameSizeTargets = existingTargets.filter(row => fs.statSync(row.destinationPath).size === sourceStat.size)
  if (!sameSizeTargets.length) {
    results.set(entry.sourcePath, { status: 'skipped', reason: 'source and Desktop target sizes differ', targets: existingTargets.map(row => row.destinationPath) })
    continue
  }
  const linkedTarget = sameSizeTargets.find(row => {
    const targetStat = fs.statSync(row.destinationPath)
    return targetStat.dev === sourceStat.dev && targetStat.ino === sourceStat.ino
  })
  let verification = linkedTarget ? 'same inode (hard link)' : 'matching SHA-256'
  if (!linkedTarget) {
    const expected = sameSizeTargets.map(row => row.digest).find(Boolean)
    const sourceDigest = await sha256(entry.sourcePath)
    const targetDigest = await sha256(sameSizeTargets[0].destinationPath)
    if (sourceDigest !== targetDigest || expected && sourceDigest !== expected) {
      results.set(entry.sourcePath, { status: 'skipped', reason: 'SHA-256 verification failed', targets: existingTargets.map(row => row.destinationPath) })
      continue
    }
  }
  if (execute) fs.unlinkSync(entry.sourcePath)
  results.set(entry.sourcePath, {
    status: execute ? 'moved' : 'ready to move',
    verification,
    bytes: sourceStat.size,
    targets: existingTargets.map(row => row.destinationPath),
  })
}

const summary = {
  mode: execute ? 'execute' : 'dry-run',
  uniqueStagingSources: sources.size,
  readyOrMoved: [...results.values()].filter(result => execute ? result.status === 'moved' : result.status === 'ready to move').length,
  alreadyAbsent: [...results.values()].filter(result => result.status === 'already absent').length,
  skipped: [...results.values()].filter(result => result.status === 'skipped').length,
  bytesReleasedFromStagingNamespace: [...results.values()].filter(result => result.status === 'moved').reduce((sum, result) => sum + Number(result.bytes || 0), 0),
  desktopTargetsMissing: [...new Set([...yearRows.values()].flat().filter(row => !fs.existsSync(row.destinationPath)).map(row => row.destinationPath))],
}

if (execute) {
  for (const year of [3, 4, 5]) {
    const catalogDir = path.join(desktopRoot, `y${year}`, '_Catalog')
    const uniqueRows = [...new Map(yearRows.get(year).map(row => [`${row.sourcePath}\0${row.destinationPath}`, row])).values()]
    const ledger = [['Status', 'Verification', 'Former Staging Path', 'Desktop Destination', 'Original File', 'Bytes', 'SHA-256']]
    for (const row of uniqueRows) {
      const result = results.get(row.sourcePath)
      ledger.push([
        result?.status || 'unknown',
        result?.verification || result?.reason || '',
        row.sourcePath,
        row.destinationPath,
        row.originalName,
        row.bytes ?? '',
        row.digest,
      ])
    }
    fs.writeFileSync(path.join(catalogDir, 'Moved From Staging.csv'), `${ledger.map(csvRow => csvRow.map(csv).join(',')).join('\n')}\n`)
    const yearSources = new Set(uniqueRows.map(row => row.sourcePath))
    const yearResults = [...yearSources].map(source => results.get(source))
    const movementReport = {
      year,
      desktopIsCanonicalLocation: true,
      uniqueStagingSourcesReferenced: yearSources.size,
      moved: yearResults.filter(result => result?.status === 'moved').length,
      alreadyAbsent: yearResults.filter(result => result?.status === 'already absent').length,
      skipped: yearResults.filter(result => result?.status === 'skipped').length,
      skippedDetails: [...yearSources].map(source => ({ source, ...results.get(source) })).filter(result => result.status === 'skipped'),
      desktopTargetsMissing: [...new Set(uniqueRows.filter(row => !fs.existsSync(row.destinationPath)).map(row => row.destinationPath))],
      generatedAt: new Date().toISOString(),
    }
    fs.writeFileSync(path.join(catalogDir, 'Movement Verification.json'), `${JSON.stringify(movementReport, null, 2)}\n`)
    const readmePath = path.join(desktopRoot, `y${year}`, 'README.md')
    const readme = fs.readFileSync(readmePath, 'utf8')
    if (!readme.includes('## Canonical storage location')) {
      fs.writeFileSync(readmePath, `${readme.trim()}\n\n## Canonical storage location\n\nThe organized Desktop folder is the canonical location for these files. Corresponding staging-directory entries were removed after verifying the Desktop targets. See \`_Catalog/Moved From Staging.csv\` and \`_Catalog/Movement Verification.json\`.\n`)
    }
  }
}

console.log(JSON.stringify({ summary, skipped: [...results].filter(([, result]) => result.status === 'skipped').map(([source, result]) => ({ source, ...result })) }, null, 2))
if (summary.skipped || summary.desktopTargetsMissing.length) process.exitCode = 1

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate)
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative)
}

function csv(value) {
  return `"${String(value ?? '').replaceAll('"', '""').replaceAll('\n', ' ')}"`
}

function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index]
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"'
        index += 1
      } else if (character === '"') quoted = false
      else field += character
    } else if (character === '"') quoted = true
    else if (character === ',') {
      row.push(field)
      field = ''
    } else if (character === '\n') {
      row.push(field.replace(/\r$/u, ''))
      if (row.some(value => value !== '')) rows.push(row)
      row = []
      field = ''
    } else field += character
  }
  if (field || row.length) {
    row.push(field.replace(/\r$/u, ''))
    rows.push(row)
  }
  return rows
}

function sha256(filename) {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256')
    const stream = fs.createReadStream(filename)
    stream.on('data', chunk => hash.update(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(hash.digest('hex')))
  })
}
