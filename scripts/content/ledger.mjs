#!/usr/bin/env node
// scripts/content/ledger.mjs — seed dir (+ optional triage key list) → a small
// progress ledger: authored / held / remaining per cluster. The ledger is the
// only progress record; never reconstruct "what is done" by reading batch files.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

function readSeeds(dir) {
  const seeds = [];
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.json')) continue;
    let data;
    try {
      data = JSON.parse(readFileSync(path.join(dir, f), 'utf8'));
    } catch {
      continue;
    }
    if (!Array.isArray(data.questions)) continue;
    seeds.push(data);
  }
  return seeds;
}

function readTriageKeys(file) {
  if (!file) return [];
  return readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*/, '').trim())
    .filter(Boolean);
}

function clusterForKey(key) {
  const m = key.match(/^(.*)-q\d+$/);
  return m ? m[1] : key;
}

function main() {
  const args = process.argv.slice(2);
  const dir = args[0];
  if (!dir) {
    console.log('usage: ledger.mjs <seed-dir> [--triage <keys.txt>] [--out <LEDGER.md>]');
    process.exit(2);
  }
  const triageIdx = args.indexOf('--triage');
  const triageFile = triageIdx >= 0 ? args[triageIdx + 1] : null;
  const outIdx = args.indexOf('--out');
  const outFile = outIdx >= 0 ? args[outIdx + 1] : null;

  const seeds = readSeeds(dir);

  // Per cluster: authored count, held count, held list, set of all keys seen.
  const clusters = new Map();
  const heldEntries = [];

  const clusterEntry = (cluster) => {
    if (!clusters.has(cluster)) clusters.set(cluster, { authored: 0, held: 0, keys: new Set() });
    return clusters.get(cluster);
  };

  for (const seed of seeds) {
    const cluster = seed.cluster ?? 'uncategorised';
    const entry = clusterEntry(cluster);
    for (const question of seed.questions ?? []) {
      if (!question.key) continue;
      entry.keys.add(question.key);
      if (question.hold) {
        entry.held += 1;
        heldEntries.push({ key: question.key, reason: question.hold });
      } else {
        entry.authored += 1;
      }
    }
  }

  const triageKeys = readTriageKeys(triageFile);
  const remainingByCluster = new Map();
  for (const key of triageKeys) {
    const cluster = clusterForKey(key);
    const entry = clusterEntry(cluster);
    if (entry.keys.has(key)) continue;
    if (!remainingByCluster.has(cluster)) remainingByCluster.set(cluster, []);
    remainingByCluster.get(cluster).push(key);
  }

  const clusterNames = [...clusters.keys()].sort();
  const rows = clusterNames.map((cluster) => {
    const entry = clusters.get(cluster);
    const remaining = (remainingByCluster.get(cluster) ?? []).length;
    const total = entry.authored + entry.held + remaining;
    return `| ${cluster} | ${entry.authored} | ${entry.held} | ${remaining} | ${total} |`;
  });

  const lines = [];
  lines.push('| cluster | authored | held | remaining | total |');
  lines.push('|---|---:|---:|---:|---:|');
  lines.push(...rows);
  lines.push('');
  lines.push('## Held');
  if (heldEntries.length) {
    for (const { key, reason } of heldEntries) lines.push(`- ${key} — ${reason}`);
  } else {
    lines.push('(none)');
  }
  lines.push('');
  lines.push('## Remaining');
  const allRemaining = [...remainingByCluster.values()].flat().sort();
  if (allRemaining.length) {
    for (const key of allRemaining) lines.push(`- ${key}`);
  } else {
    lines.push('(none)');
  }

  const out = lines.join('\n') + '\n';
  if (outFile) writeFileSync(outFile, out);
  process.stdout.write(out);
}

main();
