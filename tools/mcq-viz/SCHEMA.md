# mcq-index.json contract

The indexer (`build-index.mjs`) writes this; the viewer (`index.html`) reads it.
Both agents build against THIS shape. Do not change field names without telling the orchestrator.

All PDF URLs are **home-relative** (relative to `$HOME`), forward-slash, each path
segment URI-encoded, because the viewer is served by a localhost server rooted at `$HOME`.
Example: `Desktop/Universities/Kasr%20Alainy/y2/207%20END/EOM/EOM%20-%20...%20.pdf`.

```jsonc
{
  "university": "Kasr Alainy",
  "generatedAt": "2026-09-06T...Z",
  "totals": { "mcqs": 1419, "held": 182, "sources": 17, "sourcesResolved": 16 },

  // Left-selector tree, mirroring the real folder/subfolder layout taken from
  // each source's sourceRelativePath directory segments. Modules are the top
  // folders (e.g. "207 END"), then any subfolders (e.g. "EOM"), leaf = a PDF.
  "tree": [
    {
      "name": "207 END", "type": "folder", "mcqCount": 320,
      "children": [
        { "name": "EOM", "type": "folder", "mcqCount": 210, "children": [
          { "name": "EOM - End of END - 207 2023 195 With Answers.pdf",
            "type": "source", "srcId": "src_bb589c39762100585461", "mcqCount": 18 }
        ]}
      ]
    }
  ],

  "sources": [
    {
      "srcId": "src_bb589c39762100585461",
      "title": "EOM - End of END - 207 2023 195 With Answers",
      "module": "207 END",
      "sourceRelativePath": "207 END/EOM/EOM - End of END - 207 2023 195 With Answers.pdf",
      "pdfUrl": "Desktop/Universities/Kasr%20Alainy/y2/207%20END/EOM/EOM%20-%20End%20of%20END%20-%20207%202023%20195%20With%20Answers.pdf",
      "pdfFound": true,
      "sha256": "bb589c39...",
      "pageCount": 19,
      "institution": "Kasr Al Ainy Faculty of Medicine, Cairo University",
      "collection": "kau-y2",
      "mcqCount": 18,
      "heldCount": 0,
      "pageHistogram": { "2": 3, "5": 1, "unknown": 4 }   // authored MCQs per resolved PDF page
    }
  ],

  "mcqs": [
    {
      "id": "QST-KASR207END-2023EOM-003",
      "key": "q03",
      "srcId": "src_bb589c39762100585461",
      "module": "207 END",
      "cluster": "2023eom",
      "page": 2,              // resolved PDF page as int, or null if unknown
      "pageRaw": "Q3",        // the seed's raw `page` value, verbatim
      "pageSource": "field_notes", // "page" | "field_notes" | "unknown" — how `page` was resolved
      "title": "Characteristic feature of the pars nervosa",
      "question": "The following is a characteristic feature of the pars nervosa:",
      "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
      "correct": "B",
      "explanations": { "A": "...", "B": "...", "C": "...", "D": "..." },
      "concept": "CON-END-2889B7789A466E",
      "topic": "Histology",
      "subtopic": "Pituitary gland",
      "difficulty": "Moderate",
      "sourceCitation": "Kasr Al Ainy 207 END End-of-Module 2023 (solved), p.2",
      "fieldNotes": { "keySource": "printed answer table p.19 (Q3=b)", "kasr": "2023 EOM 195, p.2" },
      "stem": "the following is a characteristic feature of the pars nervosa"
      // ^ normalized lowercase stem (question text, punctuation collapsed) for PDF.js text-layer search
    }
  ]
}
```

## Resolution rules for the indexer

- **srcId → PDF metadata:** look up `docs/Kasr-Source-Imports/evidence/corpus-source-index.json`
  (`.sources[srcId]` → `sourceRelativePath`, `sha256`, `pageCount`). Fall back to the
  `## sha256` / `## source_relative_path` fields in `docs/Kasr-Source-Imports/evidence/*-resources.md`
  if a srcId is missing from the corpus index.
- **PDF on disk:** walk `~/Desktop/Universities/Kasr Alainy/` once, index basename → absolute path.
  Resolve each source by PDF basename; if a basename collides, disambiguate by sha256.
  `pdfFound=false` and `pdfUrl=null` if not found (still list the source + its MCQs).
- **pdfUrl:** make the resolved absolute path relative to `$HOME`, split on `/`, `encodeURIComponent`
  each segment, rejoin with `/`.
- **page resolution (in priority order):** (1) if seed `page` is a plain integer → use it,
  `pageSource="page"`. (2) else scan `fieldNotes` values and `sourceCitation` for `p.<N>` /
  `page <N>` → use N, `pageSource="field_notes"`. (3) else `page=null`, `pageSource="unknown"`.
  (`page` values like `"Q3"` are paper question numbers, NOT PDF pages — keep them only in `pageRaw`.)
- **stem:** lowercase the `question` text, collapse whitespace, strip trailing colon; this is what
  the viewer searches for in the PDF.js text layer to draw the highlight box.
- Held questions (`"hold"`) are counted in `heldCount`/`totals.held` but NOT emitted into `mcqs`.
- A question's `resource_ids` fall back to the seed's `defaults.resource_ids` (take the first id).
