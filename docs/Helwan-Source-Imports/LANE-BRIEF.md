# LANE-BRIEF — Helwan Year 1

## Identity

Reports to: `/root`, only. Scope: Helwan (`hu`) Year 1 (`HU_Y1`) only: `HU-BMS-101`,
`HU-BMS-102`, `HU-LCS-103`, and `HU-PSY-104`.

Omar resumed this Year-1 planning lane. Year 2 and Year 3 remain paused. The old Year-3
`TRIAGE APPROVED` checkpoint is not approval for Year 1 and must not be used to mint or
author Year-1 content.

## Roots and ownership

- Import root: `docs/Helwan-Source-Imports/`.
- Toolchain: `scripts/helwan/` only; never alter another lane's scripts.
- Source inventory: `manifest/helwan-y1-3-sources.json`; durable Year-1 slice: 797
  `HU_Y1` rows, 790 module-scoped and seven deliberately year-level.
- S0/S1 ownership is recorded only in this root's `CLAIMS.md`; the global ledger is out of
  scope.

## Rules

- Question-led scope: every item traces to a Helwan Year-1 assessment or teaching needed to
  explain it. Papers and keys outrank department material, then notes. Another university's
  bank is not Helwan exam signal.
- Search live and pending before any new ID. A hit is an overlay, not a replacement.
- S1 returns one consolidated table: questions triaged, keys, distinct concepts,
  live/pending/new, and placement. Nothing enters S2 until `/root` says fresh
  `TRIAGE APPROVED` for Helwan Year 1.
- Student-facing prose states medicine directly; provenance belongs in metadata.
- This brief authorises no minting, browser work, import, or push.

## Readiness and next work

`coverage/HU-Y1-READINESS.md` is the factual checkpoint. The 2026-08-26 root audit is
read-only evidence, not deletion authority: 785 direct Year-1 paths versus the manifest's
797 rows. Keep all 797 until S0 resolves 13 manifest-only paths and one audit-only schedule
by source ID/SHA and path normalisation.

Run the evidence-ranked, triage-only dispatches in `coverage/HU-Y1-S1-WAVE-PLAN.md`,
beginning with BMS-101's official EOM packet.
