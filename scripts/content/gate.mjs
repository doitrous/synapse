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

function stamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

function usage(code = 2) {
  console.log(`usage:
  node scripts/content/gate.mjs batch <batch.md> [--with <sibling.md> ...]
  node scripts/content/gate.mjs simulate <batch.md> [<batch.md> ...] [--emit <out.json>]
  node scripts/content/gate.mjs audit --source <emit.json> [--ids <regex>]`);
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
if (!j) console.log('  (gate printed no JSON — read the full log)');
console.log(`full log: ${logFile}`);
process.exit(r.status && r.status !== 0 ? r.status : errors.length ? 1 : 0);
