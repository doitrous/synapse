#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const manifestPath = resolve('docs/Helwan-Source-Imports/manifest/helwan-y1-3-sources.json');
const auditArgument = process.argv.indexOf('--root-audit');
const auditPath = auditArgument === -1 ? null : resolve(process.argv[auditArgument + 1] ?? '');
const allowedModules = ['HU-BMS-101', 'HU-BMS-102', 'HU-LCS-103', 'HU-PSY-104'];
const waveEvidence = new Map([
  ['src_03cc8b051c09473d48be', 'HU-BMS-101'],
  ['src_aa8bb730fbccdbf7d6e0', 'HU-BMS-101'],
  ['src_b7c0eb8f1cafb9f6c9d7', 'HU-BMS-101'],
  ['src_f5f3ba808a5eb4afa3a0', 'HU-BMS-101'],
  ['src_86786ce382d463dc3036', 'HU-BMS-101'],
  ['src_88169dc9b6ad00181a0d', 'HU-BMS-102'],
  ['src_1c60f50ead8f40b9ec44', 'HU-BMS-102'],
  ['src_7ce9691056d728be0f13', 'HU-BMS-102'],
  ['src_9e03b5ed652b866cf88d', 'HU-BMS-102'],
  ['src_5da6cd6d288fb46dba2f', 'HU-LCS-103'],
  ['src_7f33f41ffaff192e3bc8', 'HU-LCS-103'],
  ['src_103bc8809c3045ada51d', 'HU-LCS-103'],
  ['src_5328082a807132f5cb29', 'HU-LCS-103'],
]);
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const rows = manifest.sources.filter((source) => source.yearId === 'HU_Y1');
const modules = new Map(allowedModules.map((moduleId) => [moduleId, 0]));
const sourceById = new Map(rows.map((source) => [source.sourceId, source]));
let unscoped = 0;
let errors = 0;

for (const source of rows) {
  if (source.universityId !== 'hu' || !source.sourceId || !source.sha256) errors += 1;
  if (source.moduleId === null) {
    unscoped += 1;
    if (!String(source.disposition).startsWith('year-level')) errors += 1;
  } else if (modules.has(source.moduleId)) {
    modules.set(source.moduleId, modules.get(source.moduleId) + 1);
  } else {
    errors += 1;
  }
}

console.log('Helwan Y1 readiness check');
console.log(`manifest_hu_y1_rows=${rows.length}`);
for (const [moduleId, count] of modules) console.log(`${moduleId}=${count}`);
console.log(`unscoped_year_level=${unscoped}`);
console.log(`scoped_rows=${rows.length - unscoped}`);
console.log(`manifest_invariant_errors=${errors}`);
const waveEvidenceErrors = [...waveEvidence].filter(([sourceId, moduleId]) => {
  const source = sourceById.get(sourceId);
  return !source || source.moduleId !== moduleId;
}).length;
console.log(`wave_evidence_refs=${waveEvidence.size}`);
console.log(`wave_evidence_ref_errors=${waveEvidenceErrors}`);
console.log(`s0_readiness=${errors === 0 ? 'READY' : 'BLOCKED'}`);
console.log(`s1_readiness=${waveEvidenceErrors === 0 ? 'PLANNED_FRESH_TRIAGE_REQUIRED' : 'BLOCKED'}`);
console.log('year2_year3=PAUSED');

if (auditPath) {
  const auditLines = (await readFile(auditPath, 'utf8')).trimEnd().split('\n');
  const directRows = auditLines.slice(1).filter((line) => {
    const [university, path] = line.split('\t');
    return university === 'helwan' && path.includes('/helwan/Year 1/');
  });
  console.log(`root_audit_direct_hu_y1_rows=${directRows.length}`);
  console.log(`root_audit_minus_manifest=${directRows.length - rows.length}`);
  console.log('root_audit_status=READ_ONLY_RECONCILIATION_ONLY');
}

process.exitCode = errors === 0 && waveEvidenceErrors === 0 ? 0 : 1;
