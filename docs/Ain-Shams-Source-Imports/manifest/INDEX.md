# ASU manifests index

Source manifests are generated from `/Users/doitrous/Desktop/ain shams` without OCR. They are foundation data, not medical content batches.

| Year | Manifest | Source rows | Canonical modules covered | Notes |
| --- | --- | ---: | --- | --- |
| ASU_Y1 | [asu-y1-sources.json](asu-y1-sources.json) | 238 | `ASU-AE`, `ASU-HCB`, `ASU-IBM`, `ASU-IMM`, `ASU-MBG`, `ASU-BLS`, `ASU-GPATH`, `ASU-GPHARM`, `ASU-INF`, `ASU-LOCO` | Includes the `ASU-IBM` enzyme source used by the Year 1 batch. |
| ASU_Y2 | [asu-y2-sources.json](asu-y2-sources.json) | 501 | `ASU-BLOOD`, `ASU-CVS`, `ASU-RESP`, `ASU-CNS-2`, `ASU-ENDO-2`, `ASU-RES-METH-2`, `ASU-SENSES-2` | Includes the `ASU-BLOOD` haemostasis source used by the Year 2 batch. Re-verified 2026-09-02, see below. |
| ASU_Y3 | [asu-y3-sources.json](asu-y3-sources.json) | 1403 | `ASU-CLIN-NSS`, `ASU-CNS-3`, `ASU-COMM`, `ASU-RES-METH-3`, `ASU-SENSES-3`, `ASU-ENDO-3`, `ASU-CLIN-ENDO`, `ASU-UG`, `ASU-CLIN-UG` | Includes the `ASU-RES-METH-3` handout sources used by the Year 3 batch. Re-verified 2026-09-02, see below. |

The readable evidence index is [../evidence/corpus-source-index.json](../evidence/corpus-source-index.json), generated from all three manifests.

## Years 2–3 re-verification (2026-09-02)

Both manifests still say `generatedOn: 2026-08-22` with `corpusRoot` under the now-retired
`/Users/doitrous/Desktop/ain shams/Year N` path (per `desktop-university-trees-canonical`, the live
tree moved to `/Users/doitrous/Desktop/Universities/Ain Shams/Year N`). `absolutePath` on every row
is stale; `corpusRelativePath` is unaffected and is what still resolves — append it to the new root.

Re-hashed every file under the new tree (active `Year N/` + `_Exact Duplicates/Year N/` +
`_Needs Review/Zero Byte Files/Year N/`, `.DS_Store` excluded) and diffed sha256 sets against each
manifest:

| Year | Manifest rows | Active tree (new root) | Quarantined (exact-dup + needs-review) | Total on disk | Missing from disk | New/unaccounted on disk |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| ASU_Y2 | 501 | 492 | 9 (8 exact-dup + 1 zero-byte) | 501 | 0 real (1 script false-positive, see below) | 0 real (same file) |
| ASU_Y3 | 1403 | 1381 | 22 (exact-dup) | 1403 | 0 | 0 |

**Result: both manifests are clean — every row is fully accounted for.** No drift, no missing
sources, no unmanifested new files. The apparent Y2 mismatch is a verification-script artifact, not
real drift: `أسئلة.pdf` (`Year 2/Term 2/Endocrine System/Biochemistry/Questions/Essay Questions/`) is
a genuine zero-byte file, already correctly quarantined under `_Needs Review/Zero Byte Files/Year 2/`
at manifest time (`duplicateOf: src_e3b0c44...`, the empty-file sha256) — my verification script
hashed zero-byte files as a sentinel instead of computing the real (empty-input) sha256, so it
reported that one file as both "missing" and "new" against the same physical file. No action needed;
confirmed by manual inspection, not a corpus gap.

Files that moved between the active tree and the quarantine folders since 2026-08-22 (the post-manifest
dedup/zero-byte sweep) were matched by content hash, not path — a handful of filenames also lost a
copy-suffix (`Pituitary Gland- (1).pdf` → `Pituitary Gland.pdf`, `Anatomy Endocrine (1).pdf` →
`Anatomy Endocrine.pdf`) in the same sweep; content is unchanged, so no manifest update is required.

### Module × kind counts (from the manifest rows, `kindFolder`)

**ASU_Y2** (501 rows, 7 modules):

| Module | Assessments | Dept books | Lectures | Practical | Questions | Other | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| ASU-BLOOD | 2 | 1 | 22 | 31 | 9 | 0 | 65 |
| ASU-CVS | 18 | 1 | 21 | 26 | 3 | 9 (compilations/notes/summaries) | 78 |
| ASU-RESP | 2 | 0 | 23 | 33 | 0 | 0 | 58 |
| ASU-CNS-2 | 29 | 1 | 47 | 34 | 20 | 0 | 131 |
| ASU-ENDO-2 | 25 | 0 | 16 | 16 | 70 | 0 | 127 |
| ASU-RES-METH-2 | 0 | 0 | 17 | 0 | 2 | 4 (notes) | 23 |
| ASU-SENSES-2 | 0 | 0 | 10 | 9 | 0 | 0 | 19 |

**ASU_Y3** (1403 rows, 9 modules + 3 rows with no module — Administration/Schedules, out of scope):

| Module | Assessments | Dept books | Lectures | Practical | Questions | Other | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| ASU-CNS-3 | 51 | 0 | 238 | 56 | 82 | 3 (General) | 430 |
| ASU-UG | 36 | 0 | 190 | 60 | 128 | 3 (General) | 417 |
| ASU-ENDO-3 | 24 | 0 | 103 | 27 | 61 | 2 (General) | 217 |
| ASU-SENSES-3 | 14 | 0 | 63 | 17 | 22 | 1 (General) | 117 |
| ASU-CLIN-NSS | 13 | 0 | 47 | 0 | 14 | 3 (notes) | 77 |
| ASU-CLIN-UG | 4 | 0 | 39 | 0 | 17 | 0 | 60 |
| ASU-RES-METH-3 | 7 | 2 | 18 | 0 | 5 | 0 | 32 |
| ASU-COMM | 19 | 0 | 11 | 0 | 0 | 0 | 30 |
| ASU-CLIN-ENDO | 7 | 0 | 12 | 0 | 1 | 0 | 20 |
| (none — Administration) | — | — | — | — | — | 3 | 3 |

Tier distribution (`sourceTier`, 1=highest): Y2 — tier1 154, tier2 145, tier3 125, tier4 64, tier5 13.
Y3 — tier1 704, tier2 181, tier3 382, tier4 94, tier5 39, tier9 3 (the Administration rows).
`twinOf` is unset on every row in both manifests (twin detection not yet run for Y2–3; unlike
Alexandria's ~50% duplicate corpus, ASU Y2/Y3 dedup already happened once upstream via the
`_Exact Duplicates` quarantine folders — see table above).
