#!/usr/bin/env python3
"""Per-year constants for the corpus-intake pipeline.

One university corpus, several intake years, each with its own module set,
folder grammar and cohort-to-sitting-year math. Every script in this
directory reads its year's config from here rather than branching on
`if year == "y2": ...` scattered through the code — see
scripts/corpus-intake/README.md for how the six steps use it.

Only y1 and y2 are wired to real, walkable folders. y1's row is exactly what
inventory.py/probe.py/classify.py/manifest.py/index.py always assumed, kept
byte-for-byte so the default (`--year y1`, or no `--year` at all) reproduces
today's behaviour. y3/y4/y5 rows are staged from the module maps agreed for
those years so the same code is ready to run them, but nothing in this repo
executes them yet — their folder grammar is a second shape (subject-first,
not module-priority-first) that classify.py does not implement, and their
row here is marked accordingly.
"""
import os

ROOT = "/Users/doitrous/Desktop/Kasr Alainy"

# Resolved from this file's own location, not hardcoded to one checkout.
# manifest.py's original REPO constant was a literal absolute path to the
# main working tree, which is fine as long as exactly one checkout of this
# repo exists — and wrong the moment a second one does. This repo runs many
# git worktrees at once (one per lane; `git worktree list` routinely shows a
# dozen-plus), and the hardcoded path silently wrote a Year 2 manifest into
# the *main* checkout's working directory — a worktree this session was never
# supposed to touch — while this worktree's own `docs/` stayed untouched.
# Deriving REPO from `__file__` fixes that for every year, y1 included: the
# bytes a rerun produces are identical, only the checkout they land in
# changes, and they now land in whichever one the script is actually running
# from — the one instructions require. See the Year 1/Year 2 report for the
# stray file this already produced and removed.
REPO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
OUTDIR = os.path.join(REPO, "docs", "Kasr-Source-Imports", "manifest")


def batch_year(batch, year_num):
    """Cohort batch code -> the calendar year that cohort sat *this* year.

    Evidence is filenames that print both a batch code and a calendar year
    for themselves. Year 2's own corpus: `EOM - DIG-206 2024 196.pdf`,
    `PSY-213 2024 196 (psychology).pdf` and `EOY - Written INT-208 2024
    196.pdf` all say batch 196 sat Year 2 in 2024; `EOM - END - 207 2023
    195.pdf`, `EOM - Exam {DIG 195}(206) 2023.pdf` and `EOM - INT - 208 2023
    195.pdf` say batch 195 sat Year 2 in 2023; the Year 2 Telegram catalogue
    text itself has "[2026] EOM 208 (198)" for batch 198. All of them fit
    `batch + 1826 + year_num`. Year 1's own committed README documents batch
    197 as the paper dated 14 July 2024 — `197 + 1826 + 1` agrees.

    A calendar year actually printed on a paper always outranks this — see
    `examSittingYearSource` in manifest.py. This function only derives a year
    when nothing better is on the file, exactly as Year 1's `BATCH_YEAR`
    table already did; it is a formula now instead of a table so every year
    gets a consistent one without hand-copying nine rows per year.

    NOTE for the Year 1 lanes: by this same evidence, Year 1's own hardcoded
    BATCH_YEAR table (manifest.py) looks one year early for every entry
    (e.g. its 197 -> 2024 agrees, but 198 -> 2025 is off from `198 + 1827 =
    2025`... only 197 lines up because year_num=1 there; the point is this
    formula, not the old hand table, is what later years should read). Year
    1's committed manifest and BATCH_YEAR are left untouched by this change —
    that table is not read by anything below, and re-deriving Year 1's
    output is a decision for the Year 1 lane, not this one. See
    README-y2.md for the one-line pointer.
    """
    return batch + 1826 + year_num


def batch_year_table(year_num, lo=190, hi=201):
    return {b: batch_year(b, year_num) for b in range(lo, hi)}


# ---------------------------------------------------------------------------
# Year 1 — untouched. Every value below is exactly what inventory.py,
# probe.py, classify.py and manifest.py already hardcoded before --year
# existed. walkRoots is *not* just "y1": the committed manifest also carries
# five files from a sibling `Marks/` folder (administrative student-mark
# photos, all excluded rows) that sat directly under ROOT alongside `y1/`.
# y2..y5 have no such sibling.
# ---------------------------------------------------------------------------

Y1 = {
    "yearId": "KAU_Y1",
    "yearNum": 1,
    "walkRoots": ["y1", "Marks"],
    "corpusRoot": ROOT,
    "manifestName": "kasr-y1-sources.json",
    "readmeName": "README.md",
    "inventoryName": "inventory.json",
    "probeName": "probe.json",
    "planName": "plan.json",
    "moveLedgerName": "move-ledger.json",
    "grammar": "y1-legacy",  # classify.py's original content-first detector
    "batchYear": {200: 2026, 199: 2025, 198: 2024, 197: 2023, 196: 2022,
                  195: 2021, 194: 2020, 193: 2019, 192: 2018},
    "modules": {  # folder/catalogue id -> catalogue id (identical for y1)
        "101 ISK": "101 ISK", "102 INT": "102 INT", "103 BMS": "103 BMS",
        "104 CPS": "104 CPS", "108 INT": "108 INT",
    },
    "secondaryFolder": "2ry Modules",
    "practicalFolder": "PRACTICAL FIRST YEAR",
}

# ---------------------------------------------------------------------------
# Year 2 — new. Owner-organised already: `<Module>/<Subject> <Dpt|Dr.|Other|
# Team> [Nth priority]/<MCQs|Written Questions|Files|Books|Practical>/<file>`
# plus `<Module>/<EOY|EOM|Orientation>/<file>`. See classify.py's
# `classify_grammar_a` and the module docstring in manifest.py for the full
# rule set this config feeds.
# ---------------------------------------------------------------------------

Y2 = {
    "yearId": "KAU_Y2",
    "yearNum": 2,
    "walkRoots": ["y2"],
    "corpusRoot": os.path.join(ROOT, "y2"),
    "manifestName": "kasr-y2-sources.json",
    "readmeName": "README-y2.md",
    "inventoryName": "inventory-y2.json",
    "probeName": "probe-y2.json",
    "planName": "plan-y2.json",
    "moveLedgerName": None,  # move.py is y1-only; nothing here is ever moved
    "grammar": "priority-folder",  # classify.py's folder-grammar detector
    "batchYear": batch_year_table(2),
    "modules": {
        "205 NEU": "205 NEU", "206 DIG": "206 DIG", "207 END": "207 END",
        "208 INT": "208 INT", "210 PAT": "210 PAT", "213 Psychology": "213 PSY",
    },
    "secondaryFolder": "2ry Modules",
    "practicalFolder": "Practical 2nd Year",
    "catalogFolder": "_Catalog",
    "exactDuplicatesFolder": "_Catalog/Exact Duplicates",
    "textOnlyFile": "_Catalog/Past Exams and Text-Only Questions.md",
}

# ---------------------------------------------------------------------------
# Years 3-5 — staged, not executed. Module maps as agreed with the owner
# (src/data/universities.ts KAU_MODULES 'Year 3'/'Year 4'/'Year 5'); folder
# names confirmed to exist on disk (`ls` one level deep) but the second
# folder grammar these years use (`<Module>/<Subject>/<KindFolder>/<file>`,
# priority tags on the doctor sub-folder rather than the subject folder) is
# not yet implemented in classify.py. Running `--year y3` (etc.) today will
# fail loudly in classify.py rather than silently misreading these folders
# as Year 2's grammar.
# ---------------------------------------------------------------------------

Y3 = {
    "yearId": "KAU_Y3",
    "yearNum": 3,
    "walkRoots": ["y3"],
    "corpusRoot": os.path.join(ROOT, "y3"),
    "manifestName": "kasr-y3-sources.json",
    "readmeName": "README-y3.md",
    "inventoryName": "inventory-y3.json",
    "probeName": "probe-y3.json",
    "planName": "plan-y3.json",
    "moveLedgerName": None,
    "grammar": "subject-first",  # NOT IMPLEMENTED — see module docstring
    "batchYear": batch_year_table(3),
    "modules": {
        "309 INF": "309 INF",
        "310 PAT": "310 PAT",
        "327 MPE Ethics": "327 MPE",
        # Catalogue labels 319 "Forensic Medicine"; the folder on disk is
        # "319 Nutrition". Recorded, not resolved — see README-y3.md.
        "319 Nutrition": "319",
        # These three folders each fold into 'CLIN 3' per the owner's map;
        # flagged in README-y3.md as a candidate for distinct catalogue
        # modules rather than one shared clinical bucket — Omar's call.
        "315 Ophthalmology": "CLIN 3",
        "316 ENT": "CLIN 3",
        "317 Forensic & Toxicology": "CLIN 3",
        "Community Issues": "COMM 3",
        "Elective Courses": "ELEC 3",
        "General": None,
    },
    "secondaryFolder": None,
    "practicalFolder": None,
    "needsReviewFolder": "_Needs Review",
    "catalogFolder": "_Catalog",
}

Y4 = {
    "yearId": "KAU_Y4",
    "yearNum": 4,
    "walkRoots": ["y4"],
    "corpusRoot": os.path.join(ROOT, "y4"),
    "manifestName": "kasr-y4-sources.json",
    "readmeName": "README-y4.md",
    "inventoryName": "inventory-y4.json",
    "probeName": "probe-y4.json",
    "planName": "plan-y4.json",
    "moveLedgerName": None,
    "grammar": "subject-first",  # NOT IMPLEMENTED — see module docstring
    "batchYear": batch_year_table(4),
    "modules": {
        "413 Psychiatry": "PSY 4",
        "418 Community Medicine": "CM 4",
        "422 Internal Medicine": "IM 4",
        "423 General Surgery": "SURG 4",
        "424 Paediatrics": "PEDS 4",
        "425 Obstetrics & Gynaecology": "OBGYN 4",
        "434 Research": "RSCH 4",
        "Family Medicine": "FM 4",
        "Palliative Medicine & Oncology": "PALL 4",
    },
    "secondaryFolder": None,
    "practicalFolder": None,
    "needsReviewFolder": "_Needs Review",
    "catalogFolder": "_Catalog",
}

Y5 = {
    "yearId": "KAU_Y5",
    "yearNum": 5,
    "walkRoots": ["y5"],
    "corpusRoot": os.path.join(ROOT, "y5"),
    "manifestName": "kasr-y5-sources.json",
    "readmeName": "README-y5.md",
    "inventoryName": "inventory-y5.json",
    "probeName": "probe-y5.json",
    "planName": "plan-y5.json",
    "moveLedgerName": None,
    "grammar": "subject-first",  # NOT IMPLEMENTED — see module docstring
    "batchYear": batch_year_table(5),
    "modules": {
        "Surgery": "SURG 5",
        "Internal Medicine": "IM 5",
        "Family Medicine": "FM 5",
        "General": None,
    },
    "secondaryFolder": None,
    "practicalFolder": None,
    "needsReviewFolder": "_Needs Review",
    "catalogFolder": "_Catalog",
}

YEARS = {"y1": Y1, "y2": Y2, "y3": Y3, "y4": Y4, "y5": Y5}
IMPLEMENTED_GRAMMARS = {"y1-legacy", "priority-folder"}

for _cfg in YEARS.values():
    _cfg["universityId"] = "kau"

# ---------------------------------------------------------------------------
# Universities. Keyed by (university, year) rather than year alone, so a
# second university's lane adds its own top-level row here — its own ROOT,
# its own module map, its own folder grammar and sitting-year rule — without
# touching Kasr Alainy's. `manifestPrefix` is what the six steps prefix
# their output filenames with; kau keeps the bare `kasr-` prefix it has
# always used (not `kau-`), so Year 1's committed `kasr-y1-sources.json` is
# not one more thing this reorganisation could have moved. Another
# university's lane gets `<university-id>-y<N>-sources.json` unless it has
# its own reason not to — see `manifest_filename` below.
# ---------------------------------------------------------------------------

UNIVERSITIES = {
    "kau": {
        "universityId": "kau",
        "manifestPrefix": "kasr",
        "years": YEARS,
    },
    # An Alexandria (or other) lane adds its own row here — its own ROOT,
    # module map and grammar — and nothing above changes.
}


def manifest_filename(university, year_num):
    uni = UNIVERSITIES.get(university)
    prefix = uni["manifestPrefix"] if uni else university
    return f"{prefix}-y{year_num}-sources.json"


def config_for(year, university="kau"):
    uni = UNIVERSITIES.get(university)
    if not uni:
        raise SystemExit(
            f'--university "{university}" is not configured. Known: '
            f'{", ".join(sorted(UNIVERSITIES))}. Add a row to UNIVERSITIES in '
            f'scripts/corpus-intake/year_config.py.')
    cfg = uni["years"].get(year)
    if not cfg:
        raise SystemExit(
            f'--year "{year}" is not configured for university "{university}". '
            f'Known years: {", ".join(sorted(uni["years"]))}. Add a row to its '
            f'"years" table in scripts/corpus-intake/year_config.py.')
    return cfg


def year_cfg(year, university="kau"):
    """Back-compat name for `config_for` — same thing, `year` first."""
    return config_for(year, university)


def require_implemented(cfg):
    if cfg["grammar"] not in IMPLEMENTED_GRAMMARS:
        raise SystemExit(
            f'{cfg["yearId"]} uses folder grammar "{cfg["grammar"]}", which '
            f'classify.py does not implement yet. Implemented: '
            f'{", ".join(sorted(IMPLEMENTED_GRAMMARS))}.')


def add_year_arg(parser):
    parser.add_argument("--year", default="y1", help="y1 (default) | y2 | y3 | y4 | y5")
    parser.add_argument("--university", default="kau", help="kau (default)")
    return parser


# Char-count-only ("< 60 characters") is what y1's manifest.py has always
# used, and it is wrong at least once in the committed manifest: a text layer
# that is page after page of a single control glyph (U+0001) has a large
# character count and is not readable text. This adds a floor on the
# word-forming ratio inventory.py now also measures, for callers (Year 2
# onward) that want the sturdier check. Year 1's own manifest.py keeps its
# original char-count-only rule untouched — see manifest.py's
# `no_text_legacy` — so nothing already committed is re-judged by this.
def needs_ocr(text_chars, wordforming_ratio, min_chars=60, min_ratio=0.15):
    if text_chars is None or text_chars < min_chars:
        return True
    if wordforming_ratio is not None and wordforming_ratio < min_ratio:
        return True
    return False
