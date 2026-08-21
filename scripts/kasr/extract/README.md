
## The committed JSON is not reproducible from this repository

`mcq.json`, `deptbook.json`, `practical.json`, `notes.json` and `questions.json`
are results, and they are tracked. What produced them is not fully here.

The page cache they were built from — `pagetext/`, `parts/`, `raw/` — is
gitignored, because it is several megabytes of machine output. And the source
PDFs are not in this repository at all; they live at
`/Users/doitrous/Desktop/Kasr Alainy`, 415 files and 1.4 GB, and the manifest
records each one's absolute path and checksum.

So **re-running an extractor does not verify the committed file, it replaces
it** — and can replace it with less. A parallel module lost 386 questions doing
exactly this: its committed JSON had been built by an uncapped pass, the cache
that proved it was gitignored and gone, and a re-run to "check byte identity"
hit the OCR page cap and wrote the shorter result back over the cache it was
checking against.

If you need to know whether a committed extraction is right, read it, or read
the page it cites in the source PDF. Do not regenerate it to find out.

To genuinely rebuild one, delete the tracked JSON first, confirm the extractor's
caps are set where you want them, and expect it to take as long as the original
did — the OCR passes are hours, not minutes.
