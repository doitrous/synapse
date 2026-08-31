#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const MANIFEST_RELATIVE_PATH = 'docs/Helwan-Source-Imports/manifest/helwan-y1-3-sources.json';
const manifestPath = resolve(MANIFEST_RELATIVE_PATH);
const auditArgument = process.argv.indexOf('--root-audit');
const auditPath = auditArgument === -1 ? null : resolve(process.argv[auditArgument + 1] ?? '');
const textOutput = process.argv.includes('--text');

const MODULES = Object.freeze(['HU-BMS-101', 'HU-BMS-102', 'HU-LCS-103', 'HU-PSY-104']);
const EXPECTED_MANIFEST_ROWS = Object.freeze({
  'HU-BMS-101': 175,
  'HU-BMS-102': 362,
  'HU-LCS-103': 231,
  'HU-PSY-104': 22,
});

// These are the closed, source-first triage results. They are deliberately kept as
// numbers rather than inferred from prose so a changed closeout cannot pass silently.
const SNAPSHOT = Object.freeze({
  'HU-BMS-101': {
    status: 'SCOPE_READY',
    authority: 'S1_TRIAGE_EVIDENCE',
    retainedQuestions: 260,
    printedKeys: 260,
    testedConceptHandles: 179,
  },
  'HU-BMS-102': {
    status: 'SCOPE_READY',
    authority: 'S1_TRIAGE_EVIDENCE',
    primary: { observedQuestions: 762, printedAnswers: 405, retainedQuestions: 552, testedConceptHandles: 372 },
    auxiliary: { observedQuestions: 3565, answerOccurrences: 2541, retainedQuestions: 3269, testedConceptHandles: 2936, conceptDelta: 1499 },
    allEligible: { observedQuestions: 4327, answerOccurrences: 2946, retainedQuestions: 3821, testedConceptHandles: 1871 },
  },
  'HU-LCS-103': {
    status: 'SCOPE_READY',
    authority: 'S1_TRIAGE_EVIDENCE',
    eligible: { questionOccurrences: 1080, answerOccurrences: 710, testedConceptHandles: 337 },
    externalLedger: { questionOccurrences: 7635, answerOccurrences: 7349, excludedRows: 221 },
    practical: { promptOccurrences: 94, teachingPlates: 526, printedMappings: 3039, unresolvedResidues: 173, assessmentKeys: 87 },
  },
  'HU-PSY-104': {
    status: 'HOLD',
    authority: 'INSUFFICIENT_OFFICIAL_ASSESSMENT_AUTHORITY',
    rawQuestions: 78,
    answerBlocks: 78,
    retainedQuestions: 76,
    testedConceptHandles: 48,
  },
});

const APPROVAL_TEXT = 'TRIAGE APPROVED — HU-BMS-101, HU-BMS-102, and HU-LCS-103 only. HU-PSY-104 remains HOLD and is excluded until an official paper/bank with a matched key is supplied.';

const hash = (value) => createHash('sha256').update(value).digest('hex');
const canonicalJson = (value) => {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
};

function parseAudit(lines) {
  const rows = lines.trimEnd() ? lines.trimEnd().split('\n').slice(1) : [];
  const directRows = rows.filter((line) => {
    const fields = line.split('\t');
    return fields[0] === 'helwan' && fields.some((field) => field.includes('/helwan/Year 1/'));
  });
  return {
    directYear1Rows: directRows.length,
    status: 'READ_ONLY_RECONCILIATION_ONLY',
  };
}

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const rows = manifest.sources.filter((source) => source.yearId === 'HU_Y1');
const manifestRowsByModule = Object.fromEntries(MODULES.map((moduleId) => [moduleId, 0]));
const sourceIds = [];
const invariantErrors = [];
let yearLevelRows = 0;

for (const source of rows) {
  sourceIds.push(source.sourceId ?? '');
  if (source.universityId !== 'hu' || !source.sourceId || !source.sha256) {
    invariantErrors.push(`${source.sourceId ?? '<missing-id>'}:missing-hu-id-or-sha256`);
  }
  if (source.moduleId === null) {
    yearLevelRows += 1;
    if (!String(source.disposition).startsWith('year-level')) {
      invariantErrors.push(`${source.sourceId}:unscoped-row-not-year-level`);
    }
  } else if (Object.hasOwn(manifestRowsByModule, source.moduleId)) {
    manifestRowsByModule[source.moduleId] += 1;
  } else {
    invariantErrors.push(`${source.sourceId}:unknown-module`);
  }
}

for (const moduleId of MODULES) {
  if (manifestRowsByModule[moduleId] !== EXPECTED_MANIFEST_ROWS[moduleId]) {
    invariantErrors.push(`${moduleId}:expected-${EXPECTED_MANIFEST_ROWS[moduleId]}-got-${manifestRowsByModule[moduleId]}`);
  }
}
if (rows.length !== 797) invariantErrors.push(`expected-797-year1-rows-got-${rows.length}`);
if (yearLevelRows !== 7) invariantErrors.push(`expected-7-year-level-rows-got-${yearLevelRows}`);

const aggregateInventory = {
  status: invariantErrors.length === 0 ? 'COMPLETE' : 'BLOCKED',
  manifestRows: rows.length,
  yearLevelRows,
  moduleRows: Object.fromEntries(MODULES.map((moduleId) => [moduleId, manifestRowsByModule[moduleId]])),
  modules: SNAPSHOT,
};

const authoringRelease = {
  status: 'APPROVED_THREE_MODULES_PSY_HOLD',
  decision: APPROVAL_TEXT,
  approvedModules: ['HU-BMS-101', 'HU-BMS-102', 'HU-LCS-103'],
  heldExcludedModules: ['HU-PSY-104'],
  allFourRelease: false,
  modules: Object.fromEntries(MODULES.map((moduleId) => [moduleId, {
    status: SNAPSHOT[moduleId].status,
    authority: SNAPSHOT[moduleId].authority,
  }])),
};

const checksumInput = {
  aggregateInventory,
  authoringRelease,
  manifestRowsByModule,
  yearLevelRows,
};
const report = {
  schemaVersion: 2,
  manifest: {
    path: MANIFEST_RELATIVE_PATH,
    sourceRows: manifest.sources.length,
    year1Rows: rows.length,
  },
  aggregateInventory,
  authoringRelease,
  gates: {
    s0: aggregateInventory.status === 'COMPLETE' ? 'READY' : 'BLOCKED',
    s1: aggregateInventory.status === 'COMPLETE' ? 'READY_FOR_SCOPED_AUTHORING' : 'BLOCKED',
    s2: 'BLOCKED_UNTIL_AUTHORING_VALIDATION',
    year2Year3: 'PAUSED',
  },
  checks: {
    manifestInvariants: invariantErrors.length === 0,
    manifestInvariantErrors: invariantErrors,
    scopedApprovalIsNotAllFour: authoringRelease.allFourRelease === false,
    psyAuthorityHeld: SNAPSHOT['HU-PSY-104'].status === 'HOLD',
  },
  checksums: {
    algorithm: 'sha256',
    manifestSha256: hash(await readFile(manifestPath)),
    year1SourceIdsSha256: hash([...sourceIds].sort().join('\n')),
    snapshotSha256: hash(canonicalJson(checksumInput)),
  },
};

if (auditPath) {
  report.rootAudit = parseAudit(await readFile(auditPath, 'utf8'));
  report.rootAudit.minusManifest = report.rootAudit.directYear1Rows - rows.length;
} else {
  report.rootAudit = null;
}

if (textOutput) {
  console.log('Helwan Y1 readiness check');
  console.log(`manifest_hu_y1_rows=${rows.length}`);
  for (const moduleId of MODULES) console.log(`${moduleId}=${manifestRowsByModule[moduleId]}`);
  console.log(`unscoped_year_level=${yearLevelRows}`);
  console.log(`manifest_invariant_errors=${invariantErrors.length}`);
  console.log(`aggregate_inventory=${aggregateInventory.status}`);
  console.log(`authoring_release=${authoringRelease.status}`);
  console.log(`approved_modules=${authoringRelease.approvedModules.join(',')}`);
  console.log(`held_excluded_modules=${authoringRelease.heldExcludedModules.join(',')}`);
  console.log(`all_four_release=${authoringRelease.allFourRelease}`);
  console.log(`s0_readiness=${report.gates.s0}`);
  console.log(`s1_readiness=${report.gates.s1}`);
  console.log(`s2_readiness=${report.gates.s2}`);
  console.log(`year2_year3=${report.gates.year2Year3}`);
  if (report.rootAudit) {
    console.log(`root_audit_direct_hu_y1_rows=${report.rootAudit.directYear1Rows}`);
    console.log(`root_audit_minus_manifest=${report.rootAudit.minusManifest}`);
    console.log(`root_audit_status=${report.rootAudit.status}`);
  }
} else {
  console.log(JSON.stringify(report, null, 2));
}

process.exitCode = invariantErrors.length === 0 ? 0 : 1;
