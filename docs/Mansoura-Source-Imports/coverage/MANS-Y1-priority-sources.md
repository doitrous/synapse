# Mansoura Year 1 — priority source set

Per archive group (Telegram cohort-channel label — see `manifest/y1-sources.md` for why
these are not module ids). Tier order within each group: `paper` (1) → `bank` (2) →
`dept-book` (4), matching the manual's exam-first ranking. `lecture`/`practical` (3) are
not prioritized here — they are covered by the readability index for S1 triage, not
individually ranked. All `sourceId`s below are verified against
`manifest/y1-sources.json` (fixed regex build, see the `fix(mans)` commit).

## Priority-4 (from `_Catalog/Year 1 Priority 4.md`) — verified against this manifest

All 20 files confirmed present, correctly grouped, hash-verified. `AEP Full Exams
(VIP).pdf` was miscoded `other` by an earlier build of the kind regex (missed the
plural "exams"); corrected to `paper` before this table was written.

| Group | # | File | sourceId | kind | tier | size |
|---|--:|---|---|---|--:|--:|
| AEP | 1 | `AEP Full Exams (VIP) .pdf` | `src_68a72cf039eada5508f3` | paper | 1 | 14.5 MB |
| AEP | 2 | `AEP Final Book Part 1 (1).pdf` | `src_171299f5ef5a60b4db8e` | dept-book | 4 | 3.4 MB |
| AEP | 3 | `AEP Final Book Part 2.pdf` | `src_af671f068c09ceb2a511` | dept-book | 4 | 2.9 MB |
| AEP | 4 | `AEP Final Book Part 3.pdf` | `src_b66a08b9b5df3b08fb15` | dept-book | 4 | 3.3 MB |
| HBG | 1 | `HBG Continuous book Part 3.pdf` | `src_b0273f1f995a72550779` | dept-book | 4 | 9.2 MB |
| HBG | 2 | `Histo Sem 1 All Lectures.pdf` | `src_f26ad54d9bb44e954715` | lecture | 3 | 35.1 MB |
| HBG | 3 | `Histo Previous MCQ Exams Final.pdf` | `src_168d0f3dc020c263b89d` | bank | 2 | 8.0 MB |
| HBG | 4 | `Histo MCQ Formatives + Exams Final.pdf` | `src_75e3a10915ca69686e11` | bank | 2 | 7.6 MB |
| HIS | 1 | `His Continuous Berlin Book 2026.pdf` | `src_c4ee1e63536c22ca52d4` | dept-book | 4 | 14.0 MB |
| HIS | 2 | `His Final Book.pdf` | `src_d603e96bc763fbfe19d5` | dept-book | 4 | 3.3 MB |
| HIS | 3 | `HIS 1- MCQ-scan.pdf` | `src_59f4d49a6f6a2ef7c047` | bank | 2 | 4.7 MB |
| HIS | 4 | `Histo HIS Important MCQ.pdf` | `src_7d6804673006cadc10e0` | bank | 2 | 4.8 MB |
| MSS | 1 | `MSS Past Years.pdf` | `src_5cef175343fd761b8c9f` | paper | 1 | 600 KB |
| MSS | 2 | `تجميعات MSK للامتحان.pdf` | `src_11d5f76e2bad748a1538` | paper | 1 | 174 KB |
| MSS | 3 | `MSS Lecures & Practical.pdf` | `src_24f7364dd214c304bc24` | practical | 3 | 123 KB |
| MSS | 4 | `Most important MCQ (continuous).pdf` | `src_9fa49f3f0021440fcce7` | bank | 2 | 649 KB |
| PPPM | 1 | `PPPM Continuous Book ( Summary + Notes ) .pdf` | `src_9ee9dbdfb5f7074e2c30` | dept-book | 4 | 13.9 MB |
| PPPM | 2 | `PPPM Continuous Book ( MCQ ) .pdf` | `src_39d8a53d4177f58b1633` | bank | 2 | 13.8 MB |
| PPPM | 3 | `PPPM Continuous Book ( MCQ Part 2 ) .pdf` | `src_f3681a1d934aa2faa9a1` | bank | 2 | 12.3 MB |
| PPPM | 4 | `PPPM Final Part 2.pdf` | `src_62fb9d06fe0467eb053e` | other | 5 | 7.7 MB |

## Beyond Priority-4 — additional tier 1-2 candidates per group

Papers first, then banks, largest file first within each tier (a proxy for "most
comprehensive," not verified by content). Full lists are in the manifest; this is the
next tier of candidates a module's S1 triage should pull from after Priority-4.

### AEP (spans `MANS-PAEHC` + `MANS-PPP`, unresolved split — 10 papers, 60 banks total)

- Papers: `past year & terial  harvard cont .pdf` (`src_483a1b88ae8f05d5874e`),
  `Written with answers Final 64th -scan.pdf` (`src_864eeeb781ee42ba9bc9`),
  `Written semester 1 - Final 64th-scan.pdf` (`src_2085e719bd36cd14d499`),
  `Most important + previous exams (after midterm).pdf` (`src_eb99c23b4006e7c6e7d3`)
- Banks: `MCQ Anatomy AEP CONTINUOUS BOOK.pdf` (`src_e954525150c608ce1a42`),
  `MCQ embryo AEP CONTINUOUS BOOK.pdf` (`src_6cb970ed1a1fcdd6dd81`),
  `Important MCQ - Final 64th-scan.pdf` (`src_316972c4c811f1109434`)

### HBG (spans `MANS-PAEHC` + `MANS-PBBG`, unresolved split — 8 papers, 31 banks total)

- Papers: `Histo Written Final.pdf` (`src_59cd3b6eff58cfef3d2b`),
  `Histo MCQ Formatives + Exams (1-10) (1).pdf` (`src_c3eccabf1fc6d1efe593`),
  `Bio Past Years Questions (1).pdf` (`src_ae52c88577b436b5e6f4`),
  `Written Bio.pdf` (`src_5decd126fb4707617974`), `7-Past exams.pdf` (`src_7859f2da2dc9adf3f0ab`)
- Banks: `Histo Practical MCQ Collected.pdf` (`src_bf771329a87663945bca`),
  `Histo Important MCQ Divided.pdf` (`src_2503a6040cc2e82b7122`)

### PPPM — Telegram label (spans old-baseline `MANS-PPP` + `MANS-PPMIP`, S1; **not**
`MANS-PPPM-201` — 16 papers, 58 banks total, the largest group)

- Papers: `Patho Written (Combined).pdf` (`src_587d43073757924064da`),
  `Patho MCQ Formative & Exams (1-14).pdf` (`src_1b568a9428eb7f89a195`),
  `PPPM Exam Bank ( 61, 60, 59,58).pdf` (`src_111bbd078054dc30d3af` — a 4-cohort
  back-catalog exam bank, worth checking first for volume), `PPPM - Para - Written
  2026.pdf` (`src_c4769a29b9b5a3808fef`)
- Banks: `Patho Important MCQ Divided (1-14).pdf` (`src_3bd49779bf361dd42eb9`),
  `pharma mcq 1-19.pdf` (`src_e234a7fe71b84d32de64`),
  `MCQ - PPPM - Micro - 2026.pdf` (`src_b026c4a3e615c9406414`)

### MSS (`MANS-MSS-202`, direct — 10 papers, 45 banks total)

- Papers: `Para - MSS - Written.pdf` (`src_0a7e1d279794af2ceb2f`),
  `Patho MSS Written.pdf` (`src_0b708659f7c6c0d5ce14`), `Histo MSS Written.pdf`
  (`src_13d330e0fba50cdc229e`), `Micro - MSS - Written.pdf` (`src_0d82d08baef4cb389692`),
  `4-Histo_Micro_Para Written MSS.pdf` (`src_259ee6863006c5ea962e`) — MSS's papers split
  cleanly by department subject (Anatomy/Patho/Histo/Micro/Para each have their own
  written-paper file), unlike the other four groups.
- Banks: the "Mss Hero" scanned series (`Scan L5`.. `Scan L13`, one bank per lecture,
  e.g. `src_fd628d58d4c119bec936`) plus `Patho MSS Important MCQ.pdf`
  (`src_fd1bf42b14ab57e1cb99`) and `ANATOMY_UPPER LIMB-MCQ 1_compressed (2).pdf`
  (`src_8e6b366a91853f91d5b3`)

### HIS (`MANS-HIS-203`, direct — 0 papers by filename, 12 banks, 11 dept-books)

**No file in this group's filename matches the paper heuristic** (`exam`/`written`/
`model answer`/`past years`) — HIS's exam-shaped material appears to live inside its two
"book" files instead: `His Continuous Berlin Book 2026.pdf` (`src_c4ee1e63536c22ca52d4`,
already Priority-4 #1) and `His Final Book.pdf` (`src_d603e96bc763fbfe19d5`, Priority-4
#2) — "Berlin Book" is the cohort's informal name for a compiled run of past written
exams, consistent with every other group's "Continuous Book" carrying the same role.
S1 triage on `MANS-HIS-203` should open these two first and confirm; treat them as this
module's paper-tier sources by function even though the filename regex placed them at
`dept-book`.

- Remaining banks: `Patho HIS Important MCQ.pdf` (`src_adb851ddff929a652fe1`), the
  per-lecture `MCQ Histo HIS L1`..`L4` series (e.g. `src_047d0c0250282910aa51`)
- Remaining dept-books: `Scan Summary Pharma HIS DrSherif.pdf`
  (`src_649cbae59ac952ac4668`), `Histo HIS Summary + Collections.pdf`
  (`src_cb58b6621d691c2b4c6b`), `Patho HIS Summary + Collections.pdf`
  (`src_7e52cc824a8cd428b2d7`), `summary physio HIS.pdf` (`src_d07d9f388cca039f5cee`)
