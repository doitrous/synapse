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
