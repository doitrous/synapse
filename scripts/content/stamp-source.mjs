#!/usr/bin/env node
// scripts/content/stamp-source.mjs — provenance classifier + `## source` stamper
// for question batches.
//
// Given question batch files, decide each batch's student-facing MCQ source
// (dept-mcq | dept-book | past-paper) from its provenance — the filename plus
// the top HTML-comment header that names the source PDF — and, with --apply,
// insert a `## source <value>` field into every `# Item` block that lacks one.
//
// WITHOUT --apply it only reads and prints a classification table; it never
// writes. With --apply it edits, in place, only the files passed as arguments,
// idempotently (an item that already carries `## source` is left untouched).
//
// The source column is parsed on import by src/data/bulkImport.ts, which sets
// tags.sourceCategory → Question.source; src/data/questionSource.ts defines the
// three-value vocabulary and its `bucketOf` reader.
import { readFileSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';
import { pathToFileURL } from 'node:url';

/** The three student-facing MCQ sources, mirroring src/data/questionSource.ts. */
export const SOURCES = ['dept-mcq', 'dept-book', 'past-paper'];

// Provenance markers, tested in this precedence: past-paper, then dept-book,
// then an explicit dept-mcq marker; a file that matches none defaults to
// dept-mcq but is reported as low-confidence for a human to review.
//
// Short/ambiguous tokens (pp, mid, eom, eoy, ch<n>, bank, quiz) carry word or
// digit boundaries so they do not fire inside unrelated words; the rest are
// plain substrings, as the task's marker list is written. Note `mcq` alone is
// never a dept-mcq marker — every batch file is named `*-mcq.md`, so it would
// classify the entire corpus as dept-mcq.
const PAST_PAPER = /\bpp\b|past|exam|final|midterm|\bmid\b|mid-?module|mid-?exam|end[-\s]?of|end[-\s]?module|endofmodule|end[-\s]?year|\beom\b|\beoy\b|model[-\s]?answer/;
const DEPT_BOOK = /textbook|handout|lecture|notes|chapter|\bch\d|hegazy|\bbook\b|dept[-\s]?book/;
const DEPT_MCQ = /bank|mcq-?bank|moodle|\bquiz|qbank|question\sbank/;

/**
 * The top HTML comment (`<!-- ... -->`) that names the source PDF, or '' when a
 * batch has none. Only the first comment is read — that is the batch header.
 */
export function headerOf(text) {
  const match = text.match(/<!--([\s\S]*?)-->/);
  return match ? match[1] : '';
}

/**
 * Classify one batch from its filename and header text. Returns the chosen
 * source and a confidence: 'high' when a provenance marker matched, 'low' when
 * nothing matched and the safe dept-mcq default was used.
 */
export function classify(filename, header) {
  const hay = `${basename(filename)} ${header}`.toLowerCase();
  if (PAST_PAPER.test(hay)) return { source: 'past-paper', confidence: 'high' };
  if (DEPT_BOOK.test(hay)) return { source: 'dept-book', confidence: 'high' };
  if (DEPT_MCQ.test(hay)) return { source: 'dept-mcq', confidence: 'high' };
  return { source: 'dept-mcq', confidence: 'low' };
}

/** Classify a whole file's text (convenience: extracts the header itself). */
export function classifyFile(filename, text) {
  return classify(filename, headerOf(text));
}

const ITEM_SEP = /^\s*---\s*$/;
const FIELD = /^##[ \t]/;
const isField = (name) => new RegExp(`^##[ \\t]+${name}\\b`, 'i');
const HAS_SOURCE = isField('source');
const IS_STATUS = isField('status');
const IS_OWNER = isField('owner');
const IS_ITEM = /^#\s+Item\b/i;

/**
 * Insert a well-formed `## source` block into one item segment that lacks one.
 *
 * The batch parser (src/pages/admin/BulkImportPage.tsx) reads a field as a
 * `## key` line followed by its value on the next line, so the stamp is written
 * as two lines, not inline. It goes right after the `## status` block, or — when
 * a segment has no status — right before `## owner`, matching the field order
 * the real batches already use (id, title, question, subject, status, owner…).
 * A segment that is not an item, or already carries `## source`, is unchanged.
 */
export function stampSegment(segment, source) {
  const lines = segment.split('\n');
  const looksLikeItem = lines.some((l) => IS_ITEM.test(l) || FIELD.test(l));
  if (!looksLikeItem) return { text: segment, changed: false };
  if (lines.some((l) => HAS_SOURCE.test(l))) return { text: segment, changed: false };

  const block = ['## source', source, ''];

  // Prefer inserting just after the status block: from the `## status` line,
  // walk to the next field heading and insert before it.
  const statusIdx = lines.findIndex((l) => IS_STATUS.test(l));
  if (statusIdx !== -1) {
    let next = statusIdx + 1;
    while (next < lines.length && !FIELD.test(lines[next])) next += 1;
    lines.splice(next, 0, ...block);
    return { text: lines.join('\n'), changed: true };
  }

  // No status: insert immediately before `## owner`.
  const ownerIdx = lines.findIndex((l) => IS_OWNER.test(l));
  if (ownerIdx !== -1) {
    lines.splice(ownerIdx, 0, ...block);
    return { text: lines.join('\n'), changed: true };
  }

  // Neither field present: fall back to just after the `# Item` line so the
  // stamp still lands inside the item rather than being dropped.
  const itemIdx = lines.findIndex((l) => IS_ITEM.test(l));
  if (itemIdx !== -1) {
    lines.splice(itemIdx + 1, 0, '', ...block);
    return { text: lines.join('\n'), changed: true };
  }
  return { text: segment, changed: false };
}

/**
 * Stamp every item in a file's text. Splits on `---` the way the importer does,
 * stamps each item segment, and returns the rewritten text plus how many items
 * were newly stamped. Idempotent: already-stamped items are skipped.
 */
export function stampText(text, source) {
  const parts = text.split(/(^\s*---\s*$)/m);
  let stamped = 0;
  const out = parts.map((part) => {
    if (ITEM_SEP.test(part)) return part;
    const { text: next, changed } = stampSegment(part, source);
    if (changed) stamped += 1;
    return next;
  });
  return { text: out.join(''), stamped };
}

function main(argv) {
  const apply = argv.includes('--apply');
  const files = argv.filter((a) => a !== '--apply');
  if (files.length === 0) {
    process.stderr.write('usage: stamp-source.mjs [--apply] <files...>\n');
    process.exit(2);
  }

  const rows = [];
  const lowConfidence = [];
  const counts = { 'dept-mcq': 0, 'dept-book': 0, 'past-paper': 0 };
  let totalStamped = 0;

  for (const file of files) {
    let text;
    try {
      text = readFileSync(file, 'utf8');
    } catch (err) {
      process.stderr.write(`skip ${file}: ${err.message}\n`);
      continue;
    }
    const { source, confidence } = classifyFile(file, text);
    counts[source] += 1;
    if (confidence === 'low') lowConfidence.push(file);

    let stamped = 0;
    if (apply) {
      const result = stampText(text, source);
      stamped = result.stamped;
      if (stamped > 0) writeFileSync(file, result.text);
      totalStamped += stamped;
    }
    rows.push({ file, source, confidence, stamped });
  }

  const pad = (s, n) => String(s).padEnd(n);
  process.stdout.write(`${pad('file', 64)} ${pad('source', 12)} ${pad('conf', 5)}${apply ? ' stamped' : ''}\n`);
  for (const r of rows) {
    process.stdout.write(
      `${pad(basename(r.file), 64)} ${pad(r.source, 12)} ${pad(r.confidence, 5)}${apply ? ` ${r.stamped}` : ''}\n`,
    );
  }

  process.stdout.write('\n');
  process.stdout.write(`totals: dept-mcq=${counts['dept-mcq']} dept-book=${counts['dept-book']} past-paper=${counts['past-paper']} low-confidence=${lowConfidence.length}\n`);
  if (lowConfidence.length) {
    process.stdout.write(`low-confidence (defaulted to dept-mcq — review):\n`);
    for (const f of lowConfidence) process.stdout.write(`  ${basename(f)}\n`);
  }
  if (apply) process.stdout.write(`\napplied: ${totalStamped} item(s) stamped across ${files.length} file(s)\n`);
  else process.stdout.write('\n(dry run — pass --apply to write ## source into these files)\n');
}

// Run only when invoked directly, so the classifier can be imported by tests.
// `pathToFileURL` handles paths with spaces (this repo has them), which a plain
// `file://${argv[1]}` comparison silently fails to match.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main(process.argv.slice(2));
