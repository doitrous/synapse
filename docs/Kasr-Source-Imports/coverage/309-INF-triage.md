# 309 INF — triage (Year 3, Infectious Diseases: Microbiology & Parasitology) — MODULE OPENED 2026-09-06

**Module opened** with the first triaged, keyed 309 source: a department/faculty PARASITOLOGY
question bank with printed answer-key tables — `8_Bank_of_Questions,_MCQs,_Cases_&_Formative_
assesment_+_Collection.pdf` (manifest sourceId `src_10f1a669aa2eeedf3cd9`, sha256
`10f1a669aa2eeedf3cd95f73664022018e901f6af879c1be9c9afe6276502365`; native text layer, 56 pages).

## Why this source

The 309 corpus MCQ banks split into two kinds:

- **Unsolved MCQ banks** (clean stems, NO keys): `Para MCQ & Match PY V2.0.pdf` (272 pp, native,
  keys detector returns 0 marked), `Micro MCQ ...`, `Para ABC.pdf` (image). Not usable alone.
- **"Solved" papers that are not MCQ**: `Para ABC solved.pdf` (native, but Give-Reasons / enumerate /
  cases written bank, not 4-option MCQ); `EOY - 309 EOY 197 1st.pdf` (native, essay + matching);
  `FA Para BookAnswered.pdf` (image-only, 7 words/page); `EOM - 309 197.pdf` (image-only, garbled).

The **Bank of Questions** is the one source that is BOTH genuine 4-option MCQ AND keyed: each section
(Trematoda, Cestoda, Nematoda, Protozoology, Entomology) ends with a printed answer table. Native
text, department-tier, near-zero dupes for a fresh module.

## Answer-key method

Native text layer (no OCR, no colour-key). The correct answer is the option letter in the section's
printed ANSWER-KEY TABLE (e.g. p.3 "Answers of Introduction + Trematoda": `1 C 2 C 3 D ...`). Render
not needed — `pagetext.mjs render` refused p.3 as "not garbled", confirming the text layer is
authoritative. Keys transcribed directly and sample-checked against known parasitology (all consistent).

## This tranche — Introduction + Trematoda MCQ (Q1-19, pp.2-3)

18 authored (Q1-11, Q13-19), **1 excluded**: Q12 is an in-source exact duplicate of Q15 (identical
stem "Spurious infection is related to:", same options, same key B). Keys in
`coverage/309-INF-triage-keys.txt`. Subject: **parasitology**.

## Next cluster

Cestoda MCQ (answers p.6), then Nematoda (p.13), Protozoology (p.21), Entomology (p.23) from the same
bank — recover each section's keys from its printed answer table.
