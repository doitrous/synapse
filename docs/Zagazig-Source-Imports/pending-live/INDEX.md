# pending-live/ — apply order

## `ZU-MED-106-cardiopulmonary-pending-overlays.md`

5 sparse concept overlays (`+zu`, `+ZU-MED-106`) onto ids that exist only in another lane's
unimported batch — none is in `server/data/medical-library-v1.json` yet (checked directly
against the JSON). **Apply each row only after its own named source file is live**:

| id | Target source file | Module |
|---|---|---|
| `CON-RES-69F499B794713C` | `docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md` | 104 CPS |
| `CON-RES-52550F9711D9AC` | `docs/Alexandria-Source-Imports/concept/AU-MED-106-anatomy-concepts.md` | AU-MED-106 |
| `CON-HEM-02424D1AF8A169` | `docs/Kasr-Source-Imports/concept/104-CPS-practical-concepts.md` | 104 CPS |
| `CON-HEM-4D47090A0B7561` | `docs/Kasr-Source-Imports/concept/104-CPS-practical-concepts.md` | 104 CPS |
| `CON-RES-C6F65BAAC06FAA` | `docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md` | 104 CPS |

None of these 5 source files were authored or touched by this lane — they are pre-existing
pending batches from the Kasr and Alexandria lanes. This file only records where each
overlay row's target lives so Omar (or a validator lane) applies in the right order.

Simulate together with the target file each row applies to, e.g.:

```
node scripts/content/gate.mjs simulate \
  docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md \
  docs/Zagazig-Source-Imports/pending-live/ZU-MED-106-cardiopulmonary-pending-overlays.md
```

## `ZU-MED-107-git-pending-overlays.md`

15 sparse concept overlays (`+zu`, `+ZU-MED-107`) onto ids that exist only in another
lane's unimported batch — none is in `server/data/medical-library-v1.json` yet (checked
directly against the JSON). **Apply each row only after its own named source file is
live**:

| id | Target source file | Module |
|---|---|---|
| `CON-FND-D8A41B5C23B148` | `docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md` | 103 BMS |
| `CON-FND-229C78C9EB0E78` | `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md` | 103 BMS |
| `CON-FND-B928DE79E08882` | `docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md` | 103 BMS |
| `CON-HEM-8F2329AD7AF440` | `docs/Mansoura-Source-Imports/concept/MANS-HIS-203-concepts.md` | MANS-HIS-203 |
| `CON-FND-EA1BA37ACB643B` | `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md` | 103 BMS |
| `CON-FND-1BE461A57AB76D` | `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md` | 103 BMS |
| `CON-FND-0189D5EC600BC7` | `docs/Alexandria-Source-Imports/concept/AU-MED-103-biochemistry-concepts.md` | AU-MED-103 |
| `CON-FND-45DCF7CE171F0B` | `docs/Kasr-Source-Imports/concept/103-BMS-mcq-protein-concepts.md` | 103 BMS |
| `CON-FND-3806EF570B0A1C` | `docs/Kasr-Source-Imports/concept/103-BMS-mcq-nitrogen-concepts.md` | 103 BMS |
| `CON-GIT-6CB618DBA50596` | `docs/Kasr-Source-Imports/concept/103-BMS-mcq-lipid-concepts.md` | 103 BMS |
| `CON-FND-880D165894A5EC` | `docs/Kasr-Source-Imports/concept/103-BMS-mcq-protein-concepts.md` | 103 BMS |
| `CON-FND-0CA8047810DF78` | `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md` | 103 BMS |
| `CON-FND-CFB54F33867C57` | `docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-metabolism-concepts.md` | AU-MED-102 |
| `CON-FND-25DCFA3B0D1322` | `docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md` | AU-MED-102 |
| `CON-FND-596FDA58EEEF0A` | `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md` | 103 BMS |

The first 11 rows were added by the git-final24 cluster; the last 4 by git-summer24
(2026-09-02). None of these 15 source files were authored or touched by this lane — they
are pre-existing pending batches from the Kasr, Alexandria and Mansoura lanes. (A 5th
git-summer24 candidate, CON-FND-906A83DAC6C37F from Helwan's HU-BMS-102, was dropped —
its own article_ids target does not exist as an authored article anywhere in the corpus,
a gap in Helwan's own batch; Q9 mints its own concept instead.) This file only records
where each overlay row's target lives so Omar (or a validator lane) applies in the right
order.

## `ZU-MED-103-sf-final24-pending-overlays.md`

4 sparse concept overlays (`+zu`, `+ZU-MED-103`) onto ids that exist only in another
lane's unimported batch — none is in `server/data/medical-library-v1.json` yet (checked
directly against the JSON). **Apply each row only after its own named source file is
live**:

| id | Target source file | Module |
|---|---|---|
| `CON-FND-0A988681FF1ABF` | `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` | 101 ISK |
| `CON-FND-D716C3939DB217` | `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` | 101 ISK |
| `CON-FND-68DA70C4BBE2A1` | `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` | 101 ISK |
| `CON-IMM-CCB3049ABF5021` | `docs/Ain-Shams-Source-Imports/concept/ASU-IMM-immunology-concepts.md` | ASU-IMM |

None of these 2 source files were authored or touched by this lane — they are
pre-existing pending batches from the Kasr and Ain Shams lanes. (A 5th candidate,
`CON-FND-3660CDEFA054C3` from Kasr's 102-INT, was dropped for Q1/Q28 — its own
`article_ids` is empty, no article covers it anywhere in the corpus; those two questions
mint a fresh, covered concept instead, `CON-FND-9604144A11BB6A`.) This file only records
where each overlay row's target lives so Omar (or a validator lane) applies in the right
order.

Simulate together with the target file each row applies to, e.g.:

```
node scripts/content/gate.mjs simulate \
  docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
  docs/Zagazig-Source-Imports/pending-live/ZU-MED-103-sf-final24-pending-overlays.md
```

## `ZU-MED-108-pp2final24-pending-overlays.md`

3 sparse concept overlays (`+zu`, `+ZU-MED-108`) onto ids that exist only in another
lane's unimported batch — none is in `server/data/medical-library-v1.json` yet (checked
directly against the JSON). **Apply each row only after its own named source file is
live**:

| id | Target source file | Module |
|---|---|---|
| `CON-CVS-D3ED0A0E795D72` | `docs/import-ready/concept/SYS-CVS-CONCEPT-T02.md` | SYS-CVS (cross-university curriculum bank — carries no existing module tagging at all) |
| `CON-CVS-20A1EC258BFF30` | `docs/Alexandria-Source-Imports/concept/AU-MED-106-physiology-concepts.md` | AU-MED-106 |
| `CON-CVS-A0579343614BCD` | `docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md` | 104 CPS |

None of these 3 source files were authored or touched by this lane — they are
pre-existing pending batches from the SYS-CVS curriculum bank, Alexandria and Kasr lanes.
This file only records where each overlay row's target lives so Omar (or a validator
lane) applies in the right order.

Simulate together with the target file each row applies to, e.g.:

```
node scripts/content/gate.mjs simulate \
  docs/import-ready/concept/SYS-CVS-CONCEPT-T02.md \
  docs/Zagazig-Source-Imports/pending-live/ZU-MED-108-pp2final24-pending-overlays.md
```
