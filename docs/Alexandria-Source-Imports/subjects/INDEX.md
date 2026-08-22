# subjects — index

| File | Items | Imports at | Import BEFORE |
|---|---:|---|---|
| `AU-MED-102-terminology-subjects.md` | 3 rows (1 topic, 1 subtopic, 3 microtopics, 1 nanotopic — union across rows) | Admin › Taxonomy › Import | `docs/Alexandria-Source-Imports/concept/AU-MED-102-terminology-concepts.md` — 3 of its 4 concepts (`CON-FND-D6B9800570FBC5`, `CON-FND-FA746431A3224E`, `CON-FND-AF90D292E35205`) name this shelf's microtopics/nanotopic by title and only resolve to a real `MIC_`/`NAN_` id once this file is live and the concept file is re-applied ("Update matching items" on) |

Adds `Foundations (fnd) > Word building > Term structure > {3 microtopics}` to the
curriculum catalogue (`src/data/curriculumCatalog.ts`), anchored to the existing `fnd`
system by `system_id` — not a rename, and no canonical `SYS-`/`DIS-`/`SKL-`/`KNW-` node is
touched (that tree stays SYS-FND for `primary_node_id` on all three concepts; see the
CLAIMS.md Wanted row this file closes).
