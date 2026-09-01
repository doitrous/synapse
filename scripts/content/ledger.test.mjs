// scripts/content/ledger.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

test('ledger counts authored / held / remaining per cluster', () => {
  const r = spawnSync('node', ['scripts/content/ledger.mjs', 'scripts/content/fixtures/seed', '--triage', 'scripts/content/fixtures/seed/triage-keys.txt'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /\| cluster \| authored \| held \| remaining \| total \|/);
  assert.match(r.stdout, /\| cancer \| 1 \| 1 \| 2 \| 4 \|/);
  assert.match(r.stdout, /^## Held\n- cancer-q02 — printed key conflicts/m);
  assert.match(r.stdout, /^## Remaining\n- cancer-q03\n- cancer-q04$/m);
});
