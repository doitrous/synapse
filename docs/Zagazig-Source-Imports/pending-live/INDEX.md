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

11 sparse concept overlays (`+zu`, `+ZU-MED-107`) onto ids that exist only in another
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

None of these 11 source files were authored or touched by this lane — they are
pre-existing pending batches from the Kasr, Alexandria and Mansoura lanes. This file only
records where each overlay row's target lives so Omar (or a validator lane) applies in
the right order.
