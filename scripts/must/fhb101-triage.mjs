#!/usr/bin/env node
/**
 * Read-only inventory for the MUST FHB 101 S1 triage lane.
 *
 * It neither changes source material nor creates content.  It selects the exact
 * readiness-rule rows (exam categories plus 05 MCQs), joins their existing
 * extraction diagnostic, and emits a tab-separated source ledger.  The optional
 * --text flag invokes pdftotext with stdout only, to measure whether a readable
 * text layer is available; it never writes a derivative next to a source.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.argv.find((arg) => arg.startsWith('--root='))?.slice(7)
const inventoryPath = process.argv.find((arg) => arg.startsWith('--inventory='))?.slice(12)
const inspectedPath = process.argv.find((arg) => arg.startsWith('--inspected='))?.slice(12)
const includeText = process.argv.includes('--text')
const summaryOnly = process.argv.includes('--summary')
if (!root || !inventoryPath || !inspectedPath) {
  throw new Error('Usage: node scripts/must/fhb101-triage.mjs --root=... --inventory=... --inspected=... [--text]')
}

const lines = readFileSync(inventoryPath, 'utf8').trimEnd().split(/\r?\n/)
const columns = lines.shift().split('\t')
const rows = lines.map((line) => {
  const fields = line.split('\t')
  while (fields.length < columns.length) fields.push('')
  return Object.fromEntries(columns.map((column, i) => [column, fields[i]]))
})
const inspected = JSON.parse(readFileSync(inspectedPath, 'utf8'))
const candidateCategories = new Set(['05 MCQs', '06 EOM Exams', '07 EOY Exams', '08 Midterm Exams'])
const candidates = rows.filter((row) => row.module === 'FHB 101' && candidateCategories.has(row.category))

if (!summaryOnly) console.log(['subject', 'category', 'pages', 'bytes', 'sha256', 'relative_path', 'audit_pdf_error', 'audit_sample_chars', 'current_text_chars', 'text_status'].join('\t'))
const results = []
for (const row of candidates) {
  const source = join(root, row.relative_path)
  const audit = inspected[source] ?? {}
  let text = ''
  let textStatus = 'not-run'
  if (includeText) {
    try {
      text = execFileSync('pdftotext', ['-layout', source, '-'], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 })
      const characters = text.replace(/[\s\f]/g, '').length
      textStatus = characters === 0 ? 'empty-text' : characters < 500 ? 'sparse-text' : 'substantive-text'
    } catch (error) {
      textStatus = `extract-failed:${error.status ?? 'unknown'}`
    }
  }
  const clean = (value) => String(value ?? '').replace(/[\t\r\n]+/g, ' ').trim()
  const result = [
    row.subject, row.category, row.pdf_pages, row.bytes, row.sha256, row.relative_path,
    row.pdf_error, audit.sample?.length ?? 0, text.replace(/[\s\f]/g, '').length, textStatus,
  ].map(clean)
  results.push({ subject: row.subject, category: row.category, status: textStatus, sha256: row.sha256 })
  if (!summaryOnly) console.log(result.join('\t'))
}

const byDepartment = Object.groupBy(candidates, (row) => row.subject)
const groups = Object.groupBy(results, (row) => `${row.subject}\t${row.category}\t${row.status}`)
console.error(`selected=${candidates.length}; unique_hashes=${new Set(candidates.map((row) => row.sha256)).size}; departments=${Object.entries(byDepartment).map(([name, values]) => `${name}:${values.length}`).join(',')}`)
for (const [key, values] of Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))) console.error(`${key}\t${values.length}`)
