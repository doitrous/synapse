# AZD-MSK (Musculoskeletal and skin) -- first-module triage (S1)

Source: `Faculty of Medicine/Year 1/Musculoskeletal/_Telegram Year 1 Archive/
Formative exam with answers.pdf`, 5 pages, 25 questions across four subject
sections (A-Biochemistry x5, B-Anatomy x10, C-Histology x5, D-Physiology x5),
read page-by-page via `pagetext.mjs show` first, then rendered in full (all 5
pages, 200 dpi via `pagetext.mjs render`) to recover keys.

## Why this module, and why this file

`AZD-MSK` was chosen because it is the only module in the whole Al-Azhar
Damietta Year 1 corpus with a genuinely native, genuinely keyed exam paper.
Every other candidate in the corpus's three content-bearing modules fails one
of those two tests: `AZD-RESP`'s four files are all notes/study-guide prose,
not question sets; three of `AZD-HBI`'s four files (including its own
"solved formative exam") are image-heavy scans needing OCR before anything
can be read; and `AZD-MSK`'s own other three files are practical-anatomy
notes, lecture notes, or an unkeyed essay-question checklist (see
`coverage/AZD-Y1-priority-sources.md`).

**The printed key is invisible to plain-text extraction.** `pagetext.mjs
keys` (bold-marker heuristic) found only 1 of 25 answers and reported 19 as
"unmarked". Rendering all 5 pages at 200 dpi shows every single question's
correct option highlighted in solid yellow -- a complete, unambiguous,
human-verified key for all 25 questions. This is the "answer keys hide in
highlights; textLayer lies" hazard, confirmed here on a different
university's material than where it was first logged (Kasr).

## Per-question key recovery

| # | Subject | Question (short) | Recovered answer | Method / confidence |
|--:|---|---|---|---|
| A1 | Biochem | Sarcomere is | (a) Portion of myofibril between 2 successive Z-lines | yellow highlight, unambiguous |
| A2 | Biochem | Not a muscle protein | (c) Albumin | yellow highlight, unambiguous |
| A3 | Biochem | True of osteocalcin | (b) Calcium binding protein | yellow highlight, unambiguous |
| A4 | Biochem | Collagen firm due to, EXCEPT | (d) Its double helical structure (false -- collagen is a triple helix) | yellow highlight, unambiguous |
| A5 | Biochem | True of hyaluronic acid, EXCEPT | (b) Contains 2 sulfur groups (false -- hyaluronic acid is the one sulfate-free GAG) | yellow highlight, unambiguous |
| B1 | Anatomy | Clavipectoral fascia NOT pierced by | (C) Medial pectoral nerve | yellow highlight, unambiguous |
| B2 | Anatomy | Pierces coracobrachialis | (D) Musculocutaneous nerve | yellow highlight, unambiguous |
| B3 | Anatomy | NOT a rotator cuff muscle | (D) Teres major | yellow highlight, unambiguous |
| B4 | Anatomy | Inferior angle of scapula covered by | (B) Latissimus dorsi | yellow highlight, unambiguous |
| B5 | Anatomy | Arises from supraglenoid tubercle | (B) Long head of biceps | yellow highlight, unambiguous |
| B6 | Anatomy | Biceps brachii, TRUE | (E) Supplied by the musculocutaneous nerve | yellow highlight, unambiguous |
| B7 | Anatomy | Breast, TRUE EXCEPT | (E) Nipple usually lies over the 6th intercostal space (false -- teaches the nipple is not at the 6th space) | yellow highlight, unambiguous |
| B8 | Anatomy | Upper limb muscles, FALSE EXCEPT | (D) Rhomboid muscles supplied by dorsal scapular nerve (C5) | yellow highlight, unambiguous |
| B9 | Anatomy | Brachial plexus, FALSE EXCEPT | (E) The roots lie between the scalene muscles | yellow highlight, unambiguous |
| B10 | Anatomy | Cubital fossa, FALSE EXCEPT | (B) The brachial artery divides at the level of the radial neck | yellow highlight, unambiguous |
| C1 | Histology | Skeletal muscle has | (E) Multiple peripheral nuclei | yellow highlight, unambiguous |
| C2 | Histology | NOT covered by perichondrium | (C) Articular cartilage in synovial joint | yellow highlight, unambiguous |
| C3 | Histology | Anchors actin at the Z-line | (C) alpha actinin | yellow highlight, unambiguous |
| C4 | Histology | Annulus fibrosus formed of | (B) White fibrocartilage | yellow highlight, unambiguous |
| C5 | Histology | Smooth muscle cells, EXCEPT | (A) Striated and cylindrical in shape (false -- smooth muscle is fusiform, not striated) | yellow highlight, unambiguous |
| D1 | Physiology | Action potential in a nerve | (B) Terminated by efflux of K+ | yellow highlight, unambiguous |
| D2 | Physiology | Chronaxie | (D) Time to stimulate the nerve with a stimulus double the rheobase | yellow highlight, unambiguous |
| D3 | Physiology | RMP of a nerve | (B) Caused by selective permeability of the membrane to the ions | yellow highlight, unambiguous |
| D4 | Physiology | Myelin sheath | (B) Formed of lipoprotein complex, acts as electric insulator | yellow highlight, unambiguous |
| D5 | Physiology | RMP caused mainly by | (A) Diffusion of K+ ions outside the nerve fibers | yellow highlight, unambiguous |

Questions triaged: **25**. Keys recovered: **25** (all -- no ties, no printed-key
conflicts, no garbled pages).

## Concept table (distinct tested ideas; D3+D5 collapsed as one RMP-mechanism idea)

| Concept | Search term used | Result | Subject placement (if new) |
|---|---|---|---|
| Sarcomere = myofibril segment between 2 Z-lines | `sarcomere` | **live** (`CON-MSK-70448A9B07D24A`) | -- |
| Myosin/actin/troponin are muscle proteins, albumin is not | `troponin` | pending (103-BMS-physiology-concepts, myosin/actin/troponin structure -- same concept space, not the exact "albumin" framing) | -- |
| Osteocalcin is a calcium-binding bone protein | `osteocalcin` | pending (102-INT-mcq-concepts) | -- |
| Collagen is firm due to its triple (not double) helix | `collagen triple helix` / `double helix collagen` | **new** -- no hit | fnd (general protein-structure biochemistry, not organ-specific) |
| Hyaluronic acid is the sulfate-free GAG, lubricates joints | `hyaluronic acid` | pending (AU-MED-102-biochem-structural-concepts) | -- |
| Clavipectoral fascia: structures pierced/not pierced | `clavipectoral fascia` | pending (101-ISK-mcq-concepts) | -- |
| Musculocutaneous nerve pierces coracobrachialis | `coracobrachialis` | **live** (`CON-DER-8387EA6B89BC45`) | -- |
| Rotator cuff = supraspinatus, infraspinatus, teres minor, subscapularis (not teres major) | `rotator cuff` | **live** (`CON-MSK-630F5C52F1CB7C`) | -- |
| Inferior angle of scapula covered by latissimus dorsi | `inferior angle of scapula` | **new** -- no hit | msk |
| Long head of biceps arises from the supraglenoid tubercle | `supraglenoid tubercle` | **new** -- no hit | msk |
| Musculocutaneous nerve supplies biceps brachii | `musculocutaneous nerve` | **live** (`CON-DER-5AF796E0F2C0D3`) | -- |
| The nipple does not lie over the 6th intercostal space | `nipple` | **new** -- nearest hits are `CON-GYN-*` breast-anatomy concepts (areola, lactiferous duct, polythelia), not this specific level fact | gyn |
| Rhomboid muscles supplied by dorsal scapular nerve (C5) | `dorsal scapular nerve` | pending (AU-MED-105-anatomy-concepts) | -- |
| Brachial plexus roots lie between the scalene muscles | `scalene muscles` | **new** -- no hit | msk |
| Brachial artery divides at the level of the radial neck (cubital fossa) | `cubital fossa` | **new** -- live cubital-fossa concept found (`CON-MSK-7757FA9AC100EA`) teaches a different fact (anterior relations), not this bifurcation level; distinct objective, cross-link rather than merge | msk |
| Skeletal muscle fibres have multiple peripheral nuclei | `peripheral nuclei` | **new** -- no hit | msk |
| Perichondrium is absent from articular cartilage in synovial joints | `perichondrium` | pending (103-BMS-histology-concepts -- direct match: "absent at articular surfaces") | -- |
| Alpha actinin anchors actin filaments at the Z-line | `actinin` | **new** -- no hit | msk |
| Annulus fibrosus of the intervertebral disc is white fibrocartilage | `annulus fibrosus` | pending (103-BMS-histology-concepts) | -- |
| Smooth muscle cells are fusiform, not striated | `smooth muscle histology` | pending (AU-MED-105-histology-articles) | -- |
| Action potential is terminated by K+ efflux (repolarization) | `repolarization` | pending (AU-MED-105-physiology-questions) | -- |
| Chronaxie = time to stimulate at double the rheobase | `chronaxie` | **live** (`CON-NEU-105A7842809DC1`) | -- |
| RMP is caused by the membrane's selective ion permeability, driven mainly by outward K+ diffusion | `resting membrane potential` | **live** (`CON-NEU-763D2F7A1571C9`) -- covers both D3 and D5 | -- |
| Myelin sheath is a lipoprotein complex acting as an electrical insulator | `myelin sheath` | pending (103-BMS-MCQ-nerve-muscle -- same MCQ title, "The myelin sheath of the nerve:") | -- |

Distinct concepts tested: **24** (D3 and D5 collapsed onto one RMP-mechanism
idea).

## Checkpoint table

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| AZD-MSK | 25 | 25 | 24 | 6 | 10 | 8 | msk: 6 (inferior angle of scapula, supraglenoid tubercle/biceps origin, brachial plexus roots at the scalenes, cubital-fossa bifurcation level, skeletal-muscle peripheral nuclei, alpha actinin at the Z-line) · gyn: 1 (nipple level vs. intercostal space) · fnd: 1 (collagen's triple helix) |

Live-hit rate (6/24 = 25%) and pending-hit rate (10/24 = 42%) together account
for 16 of 24 searched concepts (67%) landing on existing Kasr/Alexandria
material -- consistent with the overlap rate other lanes have found for
Year-1 body-structure/function content across universities.

## What this triage does not cover

The other three `AZD-MSK` files (`Anatomy prac.نظري.pdf`, `bone histo
questions.pdf`, `Mechanism of muscle contraction.pdf`) were read for source
selection but not triaged question-by-question here: the first two are notes,
not question sets, and the third's bare MCQ prompts carry no printed options
or keys (see `coverage/AZD-Y1-priority-sources.md`). `AZD-HBI`'s and
`AZD-RESP`'s files are untouched pending OCR (S1b priority order in
`coverage/AZD-Y1-priority-sources.md`).
