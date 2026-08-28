#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2]
if (!root) throw new Error('Usage: node verify-kasr-years-3-5.mjs <build-root>')
const canonicalMoved = process.argv.includes('--canonical-moved')

const media = new Set(['.mp3', '.mp4', '.m4a', '.mov', '.mkv', '.webm', '.avi', '.wav', '.ogg', '.opus', '.aac', '.flac', '.gif', '.tgs'])
const requiredCatalogs = [
  'Telegram Source Catalog.csv',
  'Past Exams and Text-Only Questions.md',
  'Telegram Message Index.md',
  'Unresolved Telegram Links.md',
  'Missing High-Priority Downloads.md',
  'Telegram Message Graph.json',
  'Final Verification.json',
]
if (canonicalMoved) requiredCatalogs.push('Moved From Staging.csv', 'Movement Verification.json')

const results = {}
let passed = true
for (const year of [3, 4, 5]) {
  const yearRoot = path.join(root, `y${year}`)
  const all = walk(yearRoot)
  const files = all.filter(item => item.kind === 'file')
  const study = files.filter(item => !item.relative.startsWith('_Catalog/') && item.relative !== 'README.md')
  const report = JSON.parse(fs.readFileSync(path.join(yearRoot, '_Catalog', 'Final Verification.json'), 'utf8'))
  const zeroByte = study.filter(item => item.stat.size === 0).map(item => item.relative)
  const mediaPresent = study.filter(item => media.has(path.extname(item.relative).toLowerCase())).map(item => item.relative)
  const symlinks = all.filter(item => item.kind === 'symlink').map(item => item.relative)
  const notHardLinked = canonicalMoved ? [] : study.filter(item => item.stat.nlink < 2).map(item => item.relative)
  const prefixFailures = study.filter(item => {
    const segments = item.relative.split(path.sep)
    if (segments.includes('EOM')) return !/^EOM\b/iu.test(path.basename(item.relative))
    if (segments.includes('EOY')) return !/^EOY\b/iu.test(path.basename(item.relative))
    return false
  }).map(item => item.relative)
  const examCodeFailures = study.filter(item => {
    const segments = item.relative.split(path.sep)
    if (!segments.includes('EOM') && !segments.includes('EOY')) return false
    return !/(?:^|\D)(?:19[2-9]|20\d{2})(?:\D|$)/u.test(path.basename(item.relative))
  }).map(item => item.relative)
  const missingCatalogs = requiredCatalogs.filter(name => {
    const filename = path.join(yearRoot, '_Catalog', name)
    return !fs.existsSync(filename) || fs.statSync(filename).size === 0
  })
  const uniqueCountMatches = study.length === report.uniqueOrganizedFiles
  const yearPassed = uniqueCountMatches && !zeroByte.length && !mediaPresent.length && !symlinks.length && !notHardLinked.length && !prefixFailures.length && !examCodeFailures.length && !missingCatalogs.length
  passed &&= yearPassed
  results[`y${year}`] = {
    passed: yearPassed,
    desktopIsCanonicalLocation: canonicalMoved,
    studyFiles: study.length,
    expectedStudyFiles: report.uniqueOrganizedFiles,
    uniqueCountMatches,
    EOM: report.EOM,
    EOY: report.EOY,
    missingHighPriorityDownloads: report.missingHighPriorityDownloads,
    zeroByte,
    mediaPresent,
    symlinks,
    notHardLinked,
    prefixFailures,
    examCodeFailures,
    missingCatalogs,
  }
}

console.log(JSON.stringify({ passed, results }, null, 2))
if (!passed) process.exitCode = 1

function walk(directory, base = directory) {
  const output = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name)
    const relative = path.relative(base, filename)
    if (entry.isSymbolicLink()) output.push({ relative, kind: 'symlink', stat: fs.lstatSync(filename) })
    else if (entry.isDirectory()) output.push(...walk(filename, base))
    else if (entry.isFile()) output.push({ relative, kind: 'file', stat: fs.statSync(filename) })
  }
  return output
}
