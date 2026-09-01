# Fayoum University — Year 1 priority set (S2)

Per module: papers → banks → department files, tier order, with each source's `sourceId`
from `manifest/y1-sources.json`. No notes/textbook tier exists in this corpus beyond what's
listed below (see `manifest/y1-sources.md` for the tier legend).

## FU-NEURO1 — Neuroscience I

| Order | Kind (tier) | File | sourceId | Status |
|--:|---|---|---|---|
| 1 | paper (1) | `امتحانات فارما عملي.pdf` | `fu_src_ccf0077be9d3` | **Blocked** — scanned, unreadable even after OCR (14/15 pages 0-word, p1 OCR is non-language garbage). Needs Omar: a cleaner source, or this stays blocked. |
| 2 | bank (2/4) | `10 Anatomy MCQs Head & neck.pdf` | `fu_src_a9df9dfd84f9` | **Usable with caution** — third-party commercial bank (Biotest Inc. 1999), garbled extraction but per-question keys survive. Only part of the file (roughly pp20–48 sampled) is actually Head & Neck; pp1–4 sampled are Abdomen/Thorax, out of scope. Needs an Omar ruling on copyright before authoring from it. |
| 3 | bank (3) | `7- Physiology MCQ of Autonomic Nervous System.pdf` | `fu_src_253fb0e5003f` | Usable — 34 MCQs read in full, but **no printed answer key anywhere in the file**; every key would need editorial recovery (manual rule 10) before authoring. |
| 4 | dept-book (2) | `Neuroscience 1 theoritical 2023.pdf` | `fu_src_721f263baff5` | Teaching text for articles/concepts, not a question source (0 MCQ-pattern hits on grep). |

## FU-DM2 — Disease Mechanism II

| Order | Kind (tier) | File | Status |
|--:|---|---|---|
| 1 | dept-book (2) | `Pathology department book.pdf` | 204 pages, clean native text, confirms "1st semester" repeatedly. No embedded MCQ bank found (0 grep hits). |

## FU-DM-unconfirmed — Disease Mechanism (module I/II not confirmed)

| Order | Kind (tier) | File | Status |
|--:|---|---|---|
| 1 | bank (2) | `Important Q.pdf` | **Cleanest keyed source in the whole corpus** — 39 pharmacology MCQs, full printed answer-key table on p9 (Q1–39, letters A–D), clean native extraction. Module (I vs II) unconfirmed; strong second candidate for the first-module triage after Neuroscience I. |
| 2 | dept-book (2) | `Para department book .pdf` | 63 pages, clean native text. No embedded MCQ bank found. |

## FU-DM1 — Disease Mechanism I

| Order | Kind (tier) | File | Status |
|--:|---|---|---|
| 1 | dept-book (2) | `DISEASE MECHANISM1'micro'.pdf` | 80 pages, clean native text. No embedded MCQ bank found. |

## FU-MSK1 — Musculoskeletal I

| Order | Kind (tier) | File | Status |
|--:|---|---|---|
| 1 | dept-book (2) | `MSK-I module theoretical 2024.pdf` | 566 pages, clean native text, 0 garbled pages. No embedded MCQ bank found. |
| 2 | practical (2) | `MSK-I module practical 2024.pdf` | 48 pages, clean native text. |

## FU-MSK2 — Musculoskeletal II

| Order | Kind (tier) | File | Status |
|--:|---|---|---|
| 1 | dept-book (2) | `MSK-II module theoretical 2023.pdf` | 165 pages, 17 garbled pages (likely diagrams), confirms "2nd semester". No embedded MCQ bank found. |
| 2 | practical (2) | `MSK-II module practical 2022.pdf` | 187 pages, 31 garbled pages (likely diagrams/plates). |

## FU-NS101 — Normal Structure I

| Order | Kind (tier) | File | Status |
|--:|---|---|---|
| 1 | dept-book (2) | `uni book 2024 -2025.pdf` | 146 pages, clean native text, 0 garbled. Carries the corpus's only faculty-printed module code, "NS 101". |

## FU-NS2 — Normal Structure II

| Order | Kind (tier) | File | Status |
|--:|---|---|---|
| 1 | dept-book (2) | `normal structure 2 mod.pdf` | 374 pages, 76 garbled (diagram-heavy histology plates expected). |
| 2 | lecture (3) | `هستو (1).pdf` | 74 pages, 1 garbled — supplementary intro handout, same author as #1. |

## FU-NS-unconfirmed — Normal Structure (physiology component)

| Order | Kind (tier) | File | Status |
|--:|---|---|---|
| 1 | dept-book (2) | `_physiology of normal structure module 2023.pdf` | **Blocked** — 75/75 pages 0-word, not OCR'd (not a priority exam paper/bank per S1b scope; would need OCR to even confirm which module this belongs to). |

## Ranking across the whole Year 1 corpus for "first module to triage"

Two blocked/scanned sources aside, **Neuroscience I (`FU-NEURO1`) is the module with the
most keyed-exam-shaped material** — 3 of its 4 sources are question banks/papers (only 1 of
4 is a plain dept book), versus every other module having at most one bank alongside 1–4
plain dept/practical books. `Important Q.pdf` (Disease Mechanism, unconfirmed I/II) is
individually the *cleanest* single keyed source in the corpus (39/39 keyed, no garbling) and
is flagged here as the natural second module to triage.
