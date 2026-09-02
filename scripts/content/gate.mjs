#!/usr/bin/env node
// scripts/content/gate.mjs — quiet wrapper over the content gates.
// Full gate output goes to .gates/<sub>-<stamp>.json; stdout gets a ≤12-line summary.
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const NODE = ['--experimental-strip-types'];
const GATES = {
  batch: 'scripts/validate-content-batch.mjs',
  simulate: 'scripts/simulate-content-import.mjs',
  audit: 'scripts/audit-medical-content-fields.mjs',
};
const MAX_ERR_LINES = 5;
const MAX_ERR_CHARS = 200;
const MAX_TAIL_LINES = 8;

function stamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

function usage(code = 2) {
  console.log(`usage:
  node scripts/content/gate.mjs batch <batch.md> [--with <sibling.md>] [--with <sibling.md>] ...
  node scripts/content/gate.mjs simulate <batch.md> [<batch.md> ...] [--emit <out.json>]
  node scripts/content/gate.mjs audit --source <emit.json> [--ids <regex>]
  (--with takes ONE file; repeat it per sibling — a space-separated list or an unquoted $var is rejected by the validator)`);
  process.exit(code);
}

function parseJson(stdout) {
  // Gates print one pretty JSON object; tolerate leading log lines.
  const start = stdout.indexOf('{');
  if (start < 0) return null;
  try { return JSON.parse(stdout.slice(start)); } catch { return null; }
}

function errorLines(errors) {
  return (errors ?? []).slice(0, MAX_ERR_LINES).map((e) => {
    const s = typeof e === 'string' ? e : JSON.stringify(e);
    return '  - ' + (s.length > MAX_ERR_CHARS ? s.slice(0, MAX_ERR_CHARS - 1) + '…' : s);
  });
}

// The last few lines of whatever the child wrote, so a crash before JSON is
// still legible without opening the full log. Stack frames and Node's version
// footer are dropped first: an uncaught throw prints its message ABOVE six or
// more frames, so a plain tail showed the frames and lost the one line that
// says what went wrong.
function tailLines(text, label) {
  if (!text || !text.trim()) return [];
  const kept = text.trim().split('\n').filter((l) => !/^\s+at\s/.test(l) && !/^Node\.js v\d/.test(l));
  return kept.slice(-MAX_TAIL_LINES).map((l) => {
    const s = l.length > MAX_ERR_CHARS ? l.slice(0, MAX_ERR_CHARS - 1) + '…' : l;
    return `  [${label}] ${s}`;
  });
}

// Positional (non-flag) arguments: a flag token (starts with "--") consumes
// the token right after it as its value, so that value is never mistaken
// for a positional file.
function positionals(args) {
  const out = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) { i++; continue; }
    out.push(args[i]);
  }
  return out;
}

const [sub, ...rest] = process.argv.slice(2);
if (!GATES[sub]) usage();
if (sub === 'simulate' && rest.includes('--with')) {
  console.log('error: simulate has no --with flag (it silently drops every file after it). Pass all files positionally in apply order.');
  process.exit(2);
}
if (sub === 'audit' && !rest.includes('--source')) usage();
if (sub === 'batch') {
  // Same shape the validator enforces after us — checked here so a shell
  // mistake (space-separated `--with a b`, or an unquoted $var) fails before
  // we even spawn, instead of surfacing as a confusing null-JSON crash.
  const tail = rest.slice(1);
  for (let i = 0; i < tail.length; i++) {
    if (tail[i] === '--with') { i++; continue; }
    console.log(`error: unexpected argument "${tail[i]}" after the batch path — --with takes ONE file; repeat it per sibling (--with a.md --with b.md), not a space-separated list or an unquoted $var.`);
    process.exit(2);
  }
}

let idsFilter = null;
if (sub === 'audit') {
  const i = rest.indexOf('--ids');
  if (i >= 0) { idsFilter = new RegExp(rest[i + 1]); rest.splice(i, 2); }
}

const r = spawnSync('node', [...NODE, GATES[sub], ...rest], { encoding: 'utf8', maxBuffer: 1 << 30 });
mkdirSync('.gates', { recursive: true });
const logFile = path.join('.gates', `${sub}-${stamp()}.json`);
writeFileSync(logFile, (r.stdout ?? '') + (r.stderr ? `\n/* stderr */\n${r.stderr}` : ''));

const j = parseJson(r.stdout ?? '');

// No JSON on stdout means the validator did not complete — an arg-parsing
// throw, an ENOENT, whatever. Reporting "errors=0" here is exactly the lie
// that hid 37 real errors on a real batch: say so plainly instead, and never
// exit 0.
if (!j) {
  const code = r.status ?? r.signal ?? 'unknown';
  console.log(`GATE ${sub} FAILED: validator did not complete (exit ${code}, no JSON on stdout) — result is NOT trustworthy`);
  const tail = tailLines(r.stderr, 'stderr');
  for (const l of (tail.length ? tail : tailLines(r.stdout, 'stdout'))) console.log(l);
  if (!tail.length && !(r.stdout ?? '').trim()) console.log('  (no stderr or stdout captured)');
  console.log(`full log: ${logFile}`);
  process.exit(Number.isInteger(r.status) && r.status !== 0 ? r.status : 1);
}

let errors = j?.errors ?? [];
let head;
if (sub === 'batch') {
  const target = rest[0];
  head = `GATE batch ${target}: items=${j?.items ?? '?'} errors=${errors.length}`;
} else if (sub === 'simulate') {
  const files = positionals(rest);
  const batches = j?.batches ?? [];
  const created = batches.reduce((sum, b) => sum + (b.created ?? 0), 0);
  const updated = batches.reduce((sum, b) => sum + (b.updated ?? 0), 0);
  const rejected = batches.reduce((sum, b) => sum + (b.rejected ?? 0), 0);
  const skipped = j?.skipped?.length ?? 0;
  head = `GATE simulate ${files.length} file(s): batches=${batches.length} created=${created} updated=${updated} rejected=${rejected} skipped=${skipped} errors=${errors.length}`;
} else {
  // audit: report.errors is already a flat array of strings.
  errors = idsFilter ? errors.filter((e) => idsFilter.test(typeof e === 'string' ? e : JSON.stringify(e))) : errors;
  const sourceIdx = rest.indexOf('--source');
  head = `GATE audit ${rest[sourceIdx + 1]}${idsFilter ? ` (ids ~ ${idsFilter.source})` : ''}: errors=${errors.length}`;
}

console.log(head);
for (const l of errorLines(errors)) console.log(l);
console.log(`full log: ${logFile}`);
process.exit(r.status && r.status !== 0 ? r.status : errors.length ? 1 : 0);
