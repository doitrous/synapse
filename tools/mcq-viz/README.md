# MCQ Viz

Local tool to visually check authored MCQs against the PDF page they came
from: a folder tree of sources, an MCQ list per source, and a PDF.js pane
that jumps to the right page and highlights the question stem.

## Run

Double-click `run.command`, or from a terminal:

```
cd "$HOME" && python3 -m http.server 8765 --bind 127.0.0.1 &
open "http://127.0.0.1:8765/<path-to-this-folder-relative-to-$HOME>/index.html"
```

It reads `./mcq-index.json` if present, else falls back to `sample-index.json`.

## Known limitation

Scanned PDFs (no text layer) render fine but the stem can't be located, so
no highlight box is drawn — the viewer shows a "position unavailable" note
instead of crashing.
