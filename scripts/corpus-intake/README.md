# Corpus intake

Six steps that turn a pile of a university's course files into a manifest every
later stage can trust. Run in order; each writes what the next one reads.

```sh
python3 scripts/corpus-intake/inventory.py   # identity: sha256, pages, text layer
python3 scripts/corpus-intake/probe.py       # read the front of each file, OCR if scanned
python3 scripts/corpus-intake/classify.py    # decide module and type, with evidence
python3 scripts/corpus-intake/move.py        # dry run — prints what it would do
python3 scripts/corpus-intake/move.py --apply
python3 scripts/corpus-intake/manifest.py    # the manifest itself
python3 scripts/corpus-intake/index.py       # the human-readable version
```

Intermediates land beside the scripts' working directory; the two outputs land
in `docs/Kasr-Source-Imports/manifest/`.

## Why each step exists

**`inventory.py`** records a checksum for every file before anything is touched,
which is what makes the whole run reversible and verifiable: after moving, every
original checksum must still be present somewhere on disk, or something was lost.

**`probe.py`** reads the first pages. Roughly 40% of this corpus is scanned page
images with no text layer, so `pdftotext` returns nothing for them — and
concluding from that that a file is empty is how a module's whole set of past
papers ends up filed as "unknown". Anything without a text layer is rendered and
run through tesseract in English and Arabic instead.

**`classify.py`** decides which module a file belongs to and what kind of thing
it is. The module comes from the document's own header first and the filename
second, because filenames are not reliable here — nine exam papers were sitting
under the wrong module and only the text said so. Decisions that no rule could
be trusted with are listed explicitly in `OVERRIDES`, each with the evidence
that settled it.

**`move.py`** never deletes and never overwrites. A file already at the target
is compared by checksum: an identical twin is left alone and recorded, a genuine
collision gets a suffix. Every move goes to a ledger with both paths, so the run
can be reversed exactly. It also reuses folders that already exist rather than
creating differently-cased siblings — this corpus contains a `HISTOLOGY ` with a
trailing space and a lower-case `pharmacology`, and tidy-looking duplicates of
those would split a subject in two.

**`manifest.py`** emits one row per file. Two things it deliberately does not do:
it does not resolve a disagreement between a batch code and a calendar year — it
records both and flags the conflict — and it does not drop `OLD SYSTEM` files,
it records them as excluded with a reason so they are not reconsidered on every
future pass.

**`index.py`** renders the manifest as markdown so a person can check it.

## Using it for another university

`classify.py` and `manifest.py` carry Kasr Alainy's module codes, subject names
and folder conventions at the top of the file. Another university means another
set of those constants; the six steps and their guarantees do not change.

The `NOTE … NOTE` convention is the owner's, not this repo's: text between two
`NOTE` markers on a folder or filename is an instruction about the files beneath
it, and is recorded on the manifest rather than treated as part of the name.
