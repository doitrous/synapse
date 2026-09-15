#!/bin/bash
# Double-click launcher: serves $HOME over HTTP (so Chrome can fetch PDFs by
# absolute path) and opens the viewer.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REL="${DIR#"$HOME"/}"
# URL-encode each path segment (this folder's path contains spaces).
ENC="$(python3 -c 'import sys,urllib.parse; print("/".join(urllib.parse.quote(p) for p in sys.argv[1].split("/")))' "$REL")"
URL="http://127.0.0.1:8765/$ENC/index.html"

cd "$HOME" || exit 1
(python3 -m http.server 8765 --bind 127.0.0.1 >/dev/null 2>&1 &)
sleep 1
echo "MCQ Viz: $URL"
open "$URL" || true
