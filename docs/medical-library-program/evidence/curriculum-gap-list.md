# Local curriculum gap list

`TAX-GAP-001`. Regenerate with
`node --experimental-strip-types scripts/build-curriculum-gap-list.mjs`.

The AMBOSS comparison found no gaps, but a US-oriented comparator cannot reveal
an Egyptian-curriculum gap. This asks the same question of the source that is
authoritative for local emphasis (LD-08): what the university corpus actually
teaches.

## What was read

| | |
|---|---:|
| Processed files read | 262 |
| Concept records in them | 110,850 |
| Distinct curriculum labels after dropping source headings | 10,743 |
| Already covered by a canonical node | 4,918 |
| Not covered | 5,825 |
| — taught in 2+ sources | 995 |
| &nbsp;&nbsp;— of those, already inside a canonical root (granularity, not a gap) | 995 |
| &nbsp;&nbsp;— of those, needing a curriculum decision | 0 |
| — taught in one source only (not promoted) | 4,830 |

Files the corpus does not mark as processed were counted, not read:
- `blocked` — 5

## By label level

| Level | Distinct labels | Covered |
|---|---:|---:|
| subject | 93 | 87 (94%) |
| subtopic | 8143 | 3392 (42%) |
| topic | 2178 | 1277 (59%) |
| microtopic | 329 | 162 (49%) |

## Candidates

995 of the 995 labels taught in 2+ sources already sit inside a
canonical root — the taxonomy has a home for them, finer than its floor. Whether
each earns its own article is an `LD-04` decision for that system, not a
taxonomy change.

**No label taught in two or more processed sources is missing a canonical home.**


## Decided by hand

Four labels the ladder could not match are course names or abbreviations rather
than missing subjects. They are written down so the next session does not
re-investigate them.

| Label | Resolution |
|---|---|
| Neuroscience | The corpus's course name for the nervous system. Alias of SYS-NEU, with DIS-ANA and DIS-PHY as the discipline routes. Not a missing subject. |
| Clinical Medicine | A course name covering internal medicine. Maps to DIS-MED. |
| Medical Education | Curriculum administration — intended learning outcomes, timetables, assessment policy. Not medical subject matter, and deliberately outside the library. |
| HSV, VZV | Two herpesviruses written as an abbreviation pair. Covered by SYS-INF-T02 Viral disease. |

## Reading this honestly

- Only 262 of the corpus's 3,238 files are processed. A subject absent here is **not**
  evidence it is absent from the curriculum (`LD-14`).
- Every processed file is in a review-required or machine-complete state. None
  has been medically verified.
- Labels are taken as the extractor recorded them, including source headings the
  filter could not catch. A candidate list is a starting point for a curriculum
  decision, never a taxonomy change.

