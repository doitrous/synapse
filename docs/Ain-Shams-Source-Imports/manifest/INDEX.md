# ASU manifests index

Source manifests are generated from `/Users/doitrous/Desktop/ain shams` without OCR. They are foundation data, not medical content batches.

| Year | Manifest | Source rows | Canonical modules covered | Notes |
| --- | --- | ---: | --- | --- |
| ASU_Y1 | [asu-y1-sources.json](asu-y1-sources.json) | 238 | `ASU-AE`, `ASU-HCB`, `ASU-IBM`, `ASU-IMM`, `ASU-MBG`, `ASU-BLS`, `ASU-GPATH`, `ASU-GPHARM`, `ASU-INF`, `ASU-LOCO` | Includes the `ASU-IBM` enzyme source used by the Year 1 batch. |
| ASU_Y2 | [asu-y2-sources.json](asu-y2-sources.json) | 501 | `ASU-BLOOD`, `ASU-CVS`, `ASU-RESP`, `ASU-CNS-2`, `ASU-ENDO-2`, `ASU-RES-METH-2`, `ASU-SENSES-2` | Includes the `ASU-BLOOD` haemostasis source used by the Year 2 batch. |
| ASU_Y3 | [asu-y3-sources.json](asu-y3-sources.json) | 1403 | `ASU-CLIN-NSS`, `ASU-CNS-3`, `ASU-COMM`, `ASU-RES-METH-3`, `ASU-SENSES-3`, `ASU-ENDO-3`, `ASU-CLIN-ENDO`, `ASU-UG`, `ASU-CLIN-UG` | Includes the `ASU-RES-METH-3` handout sources used by the Year 3 batch. |

The readable evidence index is [../evidence/corpus-source-index.json](../evidence/corpus-source-index.json), generated from all three manifests.
