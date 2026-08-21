# Module 102 INT — Physiology subject tree, extraction report

Companion to `physio-chapters.json`.

**Tree source:** `src_a488633802ec053c6325` — `y1/102 INT/Department Book/Department Book
Module 102.pdf`, 167 pages, native text. **Part II is Physiology, physical pages 112–167.**
**Mapped-in source:** `src_bfeed7a91f343a86b255` — `y1/102 INT/Department Book/Dpt book PHYSIO
First Year.pdf`, 158 pages, native. The physiology department's whole-first-year book; 102's
half is physical 9–74. Carried on every record as `yearBookChapters`.
**Scope source:** `src_701b6db49a7c01d79428` — the 1st-year physiology exam orientation, 2 pages.
**Tested against:** `src_f90429f7c288986e68b5` (2025 end-of-year paper, 11 pages) and
`src_77300134fd057d61852c` (its solved copy).
**Corroborating (read by the previous pass):** `src_2093c80b1f9c25f9c0a4` —
`Physio MCQ First Year.pdf`, 72 pages.

Nothing below is invented. Every chapter carries an `evidence` line in the JSON naming the
contents page, the running head or the body heading it came from.

This report supersedes the earlier one, which built the tree from the year book alone. Every
page number and every proof that pass established is kept below; nothing is discarded. The
change is which book supplies the chapter list.

---

## 1. Which book is the tree, and why

**The module book wins. The tree is its Part II contents list: 19 chapters.**

The starting assumption was that a module's own book outranks a year book, because a module
subject path is the curriculum's own position. That assumption was tested rather than
asserted, and three independent pieces of evidence back it. Two of them are decisive; one is
just corroboration.

### 1a. The exam orientation was written against the module book

This is the strongest evidence, and it is the piece the previous pass could not explain.

The orientation's 102 exclusion list opens with three entries the previous report flagged as
its **one open question that changes the tree**:

```
Theoretical topics not included in final theoretical exam: 102
HEMOPOIETIC SYSTEM
- INTRODUCTION
- BODY FLUIDS
- HOMEOSTASIS
```

The previous report said, correctly, that none of those three appears anywhere in the year
book's 102 half (physical 9–74), and that all three describe the year book's **BMS-103**
Introduction section (physical 79–81) instead. It refused to guess and left the question open.

**The module book has all three, inside 102, on its own physiology pages:**

| Orientation entry | Module book |
|---|---|
| `- INTRODUCTION` | body heading `INTRODUCTION` on physical p115 (printed 2) |
| `- BODY FLUIDS` | body heading `BODY FLUIDS` on physical p115 (printed 2) |
| `- HOMEOSTASIS` | body heading `HOMEOSTASIS` on physical p118 (printed 5) |

All three sit under the running head `Hemopoietic System`, inside Part II Physiology, in the
book the module ships. The orientation was written against this book. **The open question is
closed:** the announcement does not mislabel the module, and the department does not count a
103 section as 102 teaching. The year book simply files that material elsewhere.

### 1b. The orientation's ordering matches the module book, not the year book

The orientation lists its exclusions in each system's own teaching order. Under
`AUTONOMIC NERVOUS SYSTEM` it reads:

```
- ALARM or "STRESS" Response of Sympathetic Nervous System
- Centers of the Autonomic Reflexes
- CHEMICAL TRANSMISSION AT AUTONOMIC JUNCTIONS
- DRUGS THAT AFFECT THE AUTONOMIC ACTIVITY
```

| Topic | Module book (printed) | Year book (physical) |
|---|---|---|
| Alarm / stress response | 45 | 73 |
| Centres of the autonomic reflexes | 48 | 66 |
| Chemical transmission | 49 | 66 |
| Drugs / agents affecting autonomic activity | 54 | 73 |

The module book's page order is **45, 48, 49, 54** — exactly the orientation's order. The year
book's is **73, 66, 66, 73** — the orientation lists alarm/stress *first* where the year book
prints it *last*. Under `HEMOPOIETIC SYSTEM` the orientation's eight entries likewise run in
strict ascending module-book order (printed 2, 2, 5, 20, 28, 29, 31, 33), and the year book
cannot reproduce the first three at all.

### 1c. The 2025 paper uses the module book's chapter title verbatim

The paper's highest-mark physiology question is:

> "Explain physiological limitations of blood coagulation {9 Marks}"
> — `src_f90429f7c288986e68b5` p9

`Physiological limitations of blood coagulation` is a **chapter title in the module book's
Part II contents** (printed 27) and the body heading on physical p140. The year book has no
chapter, section or heading of that name anywhere; it prints `Anti-Clotting Mechanisms` on
physical p40 and splits the material into `A. General limiting reactions` and
`B. Specific limiting reactions`, with more of the answer sitting back in its `Hemostasis`
chapter. A tree built from the year book files the paper's biggest physiology question under a
name the faculty does not use.

### What was checked *against* the module book, and found not to disqualify it

- **It is not a summary or a study aid.** Part II runs 54 printed pages of continuous
  physiology prose with its own figures (Fig 1–Fig 21 in Blood, Fig 1–Fig 19 in ANS), tables
  and references, and each of its two systems opens with a `Chapter outline and learning
  objectives` page (physical p114 and p147) written in departmental learning-outcome language.
  Both books close on the same two references — `Ganong's Review of Medical Physiology` and
  `Guyton And Hall Textbook of Medical Physiology`. It is a teaching text of the same standing.
- **It is not thinner.** Where the two books cover the same ground the module book is equal or
  fuller. `Physiological limitations of blood coagulation` gives six numbered mechanisms where
  the year book's `Anti-Clotting Mechanisms` gives two grouped lists of three. The transfusion
  section carries a `Precautions before blood transfusion:` block of four items (module physical
  p146) that the year book's transfusion section does not have at all — its p48–49 runs
  `Indications:` straight into `Effects of incompatible blood transfusion:`. Hepcidin-based iron
  homeostasis is in both.
- **It is not older.** Both books are undated in their extracted text, so neither can be dated
  and no chronological claim is made here (see §7.2).
- **It loses one chapter the year book teaches.** The module book has no leucocyte chapter at
  all (§5, conflict 2). That is a real cost of choosing it, and it is recorded as a conflict
  rather than papered over — but it is one chapter against the three the year book is missing,
  and the orientation backs the module book on the three, not the year book on the one.

**The year book is not discarded.** Its 27 chapters are finer than the module book's 19 and
they are real headings on real pages. All 26 that map are carried on the module records as
`yearBookChapters`, each keeping its own physical and printed page range, its own `bookTitle`,
its own `evidence` string, and the previous pass's own `excludedFromWrittenExam` flag and
`exclusionNote`. The 27th is recorded as unmapped in §4.

---

## 2. The Part II printed-to-physical offset

**For the whole of Part II Physiology: `printed = physical − 113`.** Equivalently, printed p1
is physical p114.

**Part I's offset does not carry over.** Part I (Biochemistry) ends on physical p111, whose
running head prints `Cell Cycle and Apoptosis … 107` — an offset of 4. Part II restarts its
numbering at 1. The two offsets are 4 and 113; assuming Part I's would have thrown every page
in this file out by 109.

Proved three ways, not assumed:

1. **The part front matter fixes the origin.** Physical p112 is the divider, carrying only
   `Part II / Physiology / - Hemopoietic System / - Autonomic Nervous System`. Physical p113 is
   `Contents`. The first numbered body page is physical p114, the `HEMOPOIETIC SYSTEM` chapter
   outline page, whose page foot prints `1`. 114 − 1 = 113.
2. **Every one of the 54 body pages prints its own number, and the offset never breaks.**
   Checked page by page from physical p114 to p167: the page foot runs 1, 2, 3 … 54 with no
   gap, no repeat and no reset, and `physical − foot = 113` on all 54. No page in Part II
   failed to extract its number, and no page in Part II extracted empty.
3. **Every one of the 19 contents page numbers resolves to a real heading at exactly
   `contents page + 113`.** Not one is off. Worked examples: contents `Introduction 2` → the
   heading `INTRODUCTION` on physical p115; contents `Iron 14` → the heading `IRON` on physical
   p127; contents `Physiological limitations of blood coagulation 27` → the heading
   `PHYSIOLOGICAL LIMITATIONS OF BLOOD COAGULATION` on physical p140; contents
   `Autonomic ganglia 39` → the heading `AUTONOMIC GANGLIA` on physical p152; contents
   `Chemical transmission at autonomic junctions & autonomic receptors 49` → the heading
   `CHEMICAL TRANSMISSION AT AUTONOMIC JUNCTIONS` on physical p162.

The running head corroborates the split independently: physical p114–p146 all read
`Hemopoietic System`, physical p147–p167 all read `Autonomic nervous System`. The break falls
at exactly printed 34, which is the `AUTONOMIC NERVOUS SYSTEM` chapter-outline page.

### Kept from the previous pass: the year book's offset

**For the whole of the year book's 102 half: `printed = physical − 8`.** Printed p1 is physical
p9. That proof stands unchanged and is what every `yearBookChapters` page range in the JSON
rests on:

1. The year book's front matter runs cover (physical p1), copyright (p2), preface (p3), two
   blanks and a divider (p4–p6), contents (p7–p8). The first numbered body page is physical p9,
   printing `1` in its running head: `Hemopoietic System … 1`.
2. `printed = physical − 8` holds on all 66 pages from physical p9 to p74 without a break —
   checked page by page, including physical p17 and p45 where the running-head number is cut
   off and the neighbours bracket it.
3. All 22 page numbers in the year book's contents (physical p7–p8) resolve to a real chapter
   heading at exactly `contents page + 8`.

**Neither offset carries into 103.** In the year book, module BMS-103 restarts its printed
numbering at 1 on physical p79, so for that half `printed = physical − 78`. That is another
lane's problem; it is recorded here only so nobody reuses a 102 offset across the divider.

### Kept from the previous pass: where the year book's 102 half begins and ends

**102 INT physiology in the year book = physical pages 9–74 (printed 1–66)**, drawn by the book
itself:

| Physical | What is there |
|---|---|
| 1 | Title page: `Module INT-102 · Blood · ANS` / `Module BMS-103 · Introduction · Nerve · Muscle` |
| 5 | Divider page reading only `Module /NT-102` |
| 7–8 | `Contents / Module INT-102`, one page for `• Blood`, one for `• ANS` |
| 9–49 | Running head `Hemopoietic System`, printed 1–41, ending in a references block |
| 50–74 | Running head `Autonomic Nervous System (A.N.S)`, printed 42–66, ending in a references block |
| **75** | **Divider page reading only `Module BMS-103`** |
| 77–78 | `Contents / Module BMS-103` — Introduction, Nerve, Muscle |
| 79–158 | Running heads `Introduction`, then nerve and muscle material, printed 1–… |

Physical 75–158 is left for the 103 lane and no 103 page is in this JSON. Page 2 of the
orientation lists 103's own exclusions (transport through the cell membrane, intercellular
communications, monophasic and biphasic action potential, compound action potential, types of
skeletal muscle contraction, metabolic changes following skeletal muscle stimulation,
electromyography / muscular hypertrophy / reaction of muscle to denervation) — seen and left
alone.

### Kept from the previous pass: the year book's empty pages

Physical **4, 6, 76 and 156** extracted empty. None mattered: p4 and p6 bracket the
`Module /NT-102` divider on p5; p76 is the blank facing the `Module BMS-103` divider; p156 is
inside 103. Three near-empty pages are content-bearing and worth naming: **p5** (14 chars,
`Module /NT-102`) and **p75** (14 chars, `Module BMS-103`) are the part dividers, and **p158**
(1 char) is the back cover. **No empty page falls inside physical 9–74.**

Part II of the module book has no empty page and no page whose number failed to extract.

---

## 3. What is in the tree

**19 chapters**, all at the same depth: `102 INT > Physiology > <system> > <chapter>` — four
levels, matching the 101 ISK precedent and the previous pass.

- Blood: **13** chapters, physical 115–146 (printed 2–33)
- Autonomic nervous system: **6** chapters, physical 148–167 (printed 35–54)

Every one of the 19 comes straight from the Part II contents on physical p113, and every one
was confirmed against a body heading on the page the contents names. **No chapter in this file
is a body heading the contents omits.** That is a change of policy from the previous pass,
which entered three such headings as chapters; it is deliberate, and §5 explains what happened
to them.

Boundary convention, unchanged from the previous pass: `physicalEnd` is the page on which the
*next* chapter's heading appears, so consecutive chapters share their boundary page. The last
chapter in each system ends on the last page of that system.

### The two top-level nodes

`subjectPath` uses `Blood` and `Autonomic nervous system`, which is what the Part II contents
prints (`I. Blood`, `II. Autonomic Nervous System`). Noting a divergence rather than hiding it:
the **Part II divider page** (physical p112) and the **running head** (physical p114–p146) both
call the first system `Hemopoietic System`, not `Blood`, and so does the orientation
(`HEMOPOIETIC SYSTEM`) and the previous pass's `subjectPath`. Three of the four sources say
haemopoietic; the contents — which is the list this tree is built from — says Blood. The
contents wins for consistency with the rest of the tree, and the divergence is recorded here so
it can be flipped on a ruling rather than re-derived.

### Two pages that belong to no chapter

Physical **p114** (printed 1) and **p147** (printed 34) are the `Chapter outline and learning
objectives` pages for the two systems. They carry the system's learning outcomes, not chapter
prose, and the contents does not list them — its first Blood entry is `Introduction 2` and its
first ANS entry is `The nervous system 35`. They are named here rather than swept into an
adjacent chapter's page range. They are the only two pages in physical 114–167 that no record
claims.

### Exam-scope flags

Of the 19 chapters:

- **4 are `excludedFromWrittenExam: true`** — Introduction, Anticoagulants, Abnormalities of
  Hemostasis, Blood groups and blood transfusion. In each case every topic the orientation
  names inside those pages is excluded, so the whole chapter is off the written paper.
- **4 more are *partially* excluded** — Anaemia, Sympathetic nervous system, Parasympathetic
  nervous system, and Chemical transmission at autonomic junctions and autonomic receptors.
  The orientation names a topic that sits *inside* the chapter but does not cancel the chapter.
  These carry `excludedFromWrittenExam: false` **with a non-null `exclusionNote` beginning
  `PARTIAL.`** naming the excluded heading and its page. A boolean at chapter level cannot say
  "half of this"; flagging them `true` would cancel examinable material — including, in the ANS
  case, the adrenergic-receptor material the year book chapters separately and does *not*
  exclude. Every one of these four is also a `conflict`.
- The remaining 11 are fully examinable.

**All 12 of the orientation's 102 entries are accounted for**, none dropped:

| Orientation entry | Module chapter it falls in | Chapter flag |
|---|---|---|
| `- INTRODUCTION` | Introduction (p115, printed 2) | true |
| `- BODY FLUIDS` | Introduction (p115, printed 2) | true |
| `- HOMEOSTASIS` | Introduction (p118, printed 5) | true |
| `-POLYCYTHEMIA` | Anaemia (p133, printed 20) | false — PARTIAL |
| `- ANTICOAGULANTS` | Anticoagulants (p141, printed 28) | true |
| `- ABNORMALITIES OF HEMOSTASIS` | Abnormalities of haemostasis (p142, printed 29) | true |
| `- BLOOD GROUPS` | Blood groups and blood transfusion (p144, printed 31) | true |
| `- BLOOD TRANSFUSION` | Blood groups and blood transfusion (p146, printed 33) | true |
| `- ALARM or "STRESS" Response…` | Sympathetic nervous system (p158, printed 45) | false — PARTIAL |
| `- Centers of the Autonomic Reflexes` | Parasympathetic nervous system (p161, printed 48) | false — PARTIAL |
| `- CHEMICAL TRANSMISSION AT AUTONOMIC JUNCTIONS` | Chemical transmission… (p162, printed 49) | false — PARTIAL |
| `- DRUGS THAT AFFECT THE AUTONOMIC ACTIVITY` | Chemical transmission… (p167, printed 54) | false — PARTIAL |

---

## 4. Year book mapped onto module book

Year-book physical pages are in `src_bfeed7a91f343a86b255`; module-book physical pages are in
`src_a488633802ec053c6325`. Year-book printed = physical − 8; module-book printed = physical − 113.

| Year-book chapter (physical / printed) | → Module-book chapter (physical / printed) | Note |
|---|---|---|
| General function & components — 9–10 / 1–2 | General functions and blood components — 120–121 / 7–8 | 1:1 |
| Plasma — 10–14 / 2–6 | Plasma proteins — 121–123 / 8–10 | renamed; module narrows to the proteins |
| Red blood corpuscles — 14–15 / 6–7 | RBCs and haemoglobin — 123–125 / 10–12 | merged |
| Haemoglobin — 15–18 / 7–10 | RBCs and haemoglobin — 123–125 / 10–12 | merged |
| Erythropoiesis — 18–21 / 10–13 | Erythropoiesis — 125–127 / 12–14 | 1:1 |
| Iron — 21–25 / 13–17 | Iron — 127–131 / 14–18 | 1:1 |
| Vitamins — 25–27 / 17–19 | Vitamin B12 and folic acid — 131–132 / 18–19 | renamed; same content (B12 + folate) |
| Anaemia — 27–30 / 19–22 | Anaemia — 132–134 / 19–21 | 1:1 |
| **Polycythaemia — 30–31 / 22–23** | Anaemia — 132–134 / 19–21 | **merged; conflict 3** |
| Platelets — 31–33 / 23–25 | Platelets and haemostasis — 134–140 / 21–27 | merged |
| Haemostasis — 33–40 / 25–32 | Platelets and haemostasis — 134–140 / 21–27 | merged |
| **Anticlotting mechanisms — 40–41 / 32–33** | **Physiological limitations of blood coagulation — 140–141 / 27–28** | **renamed and rewritten; conflict 4** |
| Anticoagulants — 41–42 / 33–34 | Anticoagulants — 141–142 / 28–29 | 1:1 |
| Abnormalities of haemostasis — 42–44 / 34–36 | Abnormalities of haemostasis — 142–144 / 29–31 | 1:1 |
| **Leucocytes (white blood cells) — 44–46 / 36–38** | **— nothing —** | **unmapped; conflict 2** |
| Blood groups — 46–48 / 38–40 | Blood groups and blood transfusion — 144–146 / 31–33 | merged |
| Blood transfusion — 48–49 / 40–41 | Blood groups and blood transfusion — 144–146 / 31–33 | merged |
| Introduction to nervous system — 50–53 / 42–45 | The nervous system — 148–151 / 35–38 | 1:1 |
| The autonomic nervous system — 53–54 / 45–46 | Organisation of autonomic nervous system — 151–152 / 38–39 | renamed by the module contents |
| Autonomic ganglia — 54–56 / 46–48 | Autonomic ganglia — 152–154 / 39–41 | 1:1 |
| Sympathetic nervous system — 56–62 / 48–54 | Sympathetic nervous system — 154–159 / 41–46 | 1:1 |
| **Alarm or stress response — 73 / 65** | Sympathetic nervous system — 154–159 / 41–46 | **merged, and moved earlier; conflict 5** |
| Parasympathetic nervous system — 62–66 / 54–58 | Parasympathetic nervous system — 159–162 / 46–49 | 1:1 |
| **Centres of the autonomic reflexes — 66 / 58** | Parasympathetic nervous system — 159–162 / 46–49 | **merged; conflict 6** |
| Chemical transmission at autonomic junctions — 66–69 / 58–61 | Chemical transmission… and autonomic receptors — 162–167 / 49–54 | merged |
| **Receptors of the effector organs — 69–73 / 61–65** | Chemical transmission… and autonomic receptors — 162–167 / 49–54 | **merged across an exam-status line; conflict 7** |
| **Drugs that affect the autonomic activity — 73–74 / 65–66** | Chemical transmission… and autonomic receptors — 162–167 / 49–54 | **merged; conflict 7** |

**26 of the year book's 27 chapters map.** All 26 are carried in the JSON.

### Unmapped in the year → module direction: one chapter

**`Leucocytes (white blood cells)`.** Preserved in full here because it is the only year-book
chapter with no `yearBookChapters` slot to live in:

```json
{
  "subjectPath": "102 INT > Physiology > Haemopoietic system > Leucocytes (white blood cells)",
  "bookTitle": "Leucocytes (White Blood Cells WBCs)",
  "physicalStart": 44, "physicalEnd": 46,
  "printedStart": 36, "printedEnd": 38,
  "excludedFromWrittenExam": false,
  "exclusionNote": null,
  "evidence": "Contents on physical p7, 'Leucocytes (WBCs) 36' | centred chapter heading on physical p44",
  "sourceId": "src_bfeed7a91f343a86b255"
}
```

### Unmapped in the module → year direction: one chapter

**`Introduction`** (module physical 115–120, printed 2–7). Its `yearBookChapters` array is
empty. The year book's 102 half has no counterpart; the same material appears only in the year
book's BMS-103 section at physical 79–81. See conflict 1.

### Three year-book chapters the previous pass added from body headings

The previous pass entered `Blood transfusion`, `Centres of the autonomic reflexes` and
`Alarm or stress response of the sympathetic nervous system` as chapters even though the year
book's contents omits them. All three are preserved as `yearBookChapters` entries with their
pages and evidence. In the module tree, `Blood transfusion` is promoted — the module contents
names it (`Blood groups and Blood transfusion 31`) — while the other two become
partial-exclusion notes on their enclosing module chapters.

---

## 5. The four 2025 physiology questions

The paper is `src_f90429f7c288986e68b5`, `[Section 2 (Physiology)]`, physical pages 8–11.
**All four land cleanly in a module-book chapter, and three of the four match module-book
wording verbatim.**

| # | Question (verbatim) | Marks | Lands in | Module page | Match |
|---|---|---|---|---|---|
| 1 | "Explain absorption of Vitamin B12 {3 Marks}, mentioning its importance {2 Marks} and the manifestations of its deficiency {2 Marks}." | 7 | `Blood > Vitamin B12 and folic acid` | 131–132 / printed 18–19 | The chapter prints all three sub-headings in the question's own order and words: `Importance of Vitamin B12:` and `Absorption of Vitamin B12: (Fig 14)` on physical p131, `Deficiency of Vitamin B12:` on p132 |
| 2 | "Explain physiological limitations of blood coagulation {9 Marks}." | 9 | `Blood > Physiological limitations of blood coagulation` | 140–141 / printed 27–28 | **The chapter title, verbatim.** Body heading `PHYSIOLOGICAL LIMITATIONS OF BLOOD COAGULATION` on physical p140, opening `What prevents intravascular clotting?`, then six numbered mechanisms |
| 3 | "Mention types of autonomic ganglia {8 Marks}." | 8 | `Autonomic nervous system > Autonomic ganglia` | 152–154 / printed 39–41 | Body sub-heading `Types of autonomic ganglia: (Fig. 7)` on physical p152, verbatim, followed by the four numbered types and `Fig. 7: Types of ganglia` on p153 |
| 4 | "Explain function of parasympathetic system on Thoracic & Abdominal viscera {6 Marks}." | 6 | `Autonomic nervous system > Parasympathetic nervous system` | 159–162 / printed 46–49 | Body sub-heading `B) Functions of the Parasympathetic System on Thoracic & Abdominal Viscera:` on physical p160, verbatim including the ampersand |

Total 30 marks, and no question is orphaned.

**What the test showed.** Question 2 is the one that discriminates between the two books, and
it discriminates hard. Under the year-book tree it has no home: it would have to be filed under
`Anticlotting mechanisms`, a name that appears nowhere on the paper, with part of the answer
sitting in a different chapter (`Hemostasis`). Under the module-book tree it is a chapter title
match, and the chapter's six numbered mechanisms are a natural 9-mark answer. This is the
single highest-mark physiology question on the paper.

**No question landed in an excluded chapter**, and no question landed in the excluded *part* of
a partially-excluded chapter — a consistency check on §3's flags that passed. Question 4 lands
in the Parasympathetic chapter, whose partial exclusion is `Centers of the Autonomic Reflexes`
on printed 48; the question is answered from printed 47.

**Question 1 is also mild evidence for the module book**, though not proof. The paper asks about
vitamin B12 specifically; the module book's chapter is titled `Vitamin B12 and Folic acid`
where the year book's is the broader `Vitamins`. Both books carry the same three sub-headings,
so either tree would have caught it.

### The solved copy answers nothing in physiology

`src_77300134fd057d61852c` (`EOY (INT - 102) 199 solved`) is the same 11-page paper with
handwritten answers OCR'd in. **The answers stop at the end of the biochemistry section.** Its
physical pages 8–11, the whole physiology section, extract as the question stems and blank
dotted answer lines, identical to the unsolved paper — the only difference on those four pages
is a `Collected by A.D.E !` line on p11. So the solved copy could not be used to check *which
book's wording* the model answers follow. That is recorded, not guessed around (§7.1).

---

## 6. Every conflict recorded, and why none was resolved

`00-START-HERE.md` §5 and `02-concepts.md` require that where sources disagree the
disagreement is recorded rather than resolved invisibly. Seven conflicts are in the JSON's
`conflict` fields. None was resolved, for the reason given in each case.

**1. `Introduction` — presence conflict.** *(record: Blood > Introduction)*
Module book: a chapter, printed 2–6, covering what physiology is, body fluids and their
compartments, and homeostasis. Year book: nothing in its 102 half; the same material is in its
**BMS-103** section at physical 79–81. **Why not resolved:** the orientation sides with the
module book — it lists all three topics under `102 / HEMOPOIETIC SYSTEM` — so the module
position is followed for the tree, but the year book's own filing under 103 is a real editorial
position by the same department and could reflect a later re-allocation. Recorded under 102, no
year-book page pulled across, and the disagreement left visible on the record.

**2. `Leucocytes` — presence conflict, the other way.**
*(record: Blood > Abnormalities of haemostasis)*
Year book: a chapter, `Leucocytes (White Blood Cells WBCs)`, physical 44–46, printed 36–38,
between abnormalities of haemostasis and blood groups, not excluded from the written exam.
Module book: **nothing.** The word `Leucocytes` does not appear in Part II at all, and WBCs are
mentioned only three times in passing (physical p120 in the list of blood cells, p133 under
polycythaemia, p146 among the indications for transfusion). **Why not resolved:** the
orientation does not mention leucocytes either way, so it cannot arbitrate; and the year book's
three pages are real teaching pages that a student may well be examined on. Inventing a
leucocyte chapter in the module tree would mean claiming module-book pages that do not exist.
No record claims those pages; the conflict names both positions and §4 preserves the full
year-book record.

**3. `Polycythaemia` — boundary conflict with an exclusion consequence.**
*(record: Blood > Anaemia)*
Year book: its own chapter, physical 30–31, printed 22–23, flagged excluded by the previous
pass. Module book: an unlisted body heading `POLYCYTHEMIA` on physical p133 (printed 20), inside
the Anemia chapter. The orientation excludes `-POLYCYTHEMIA` by name. **Why not resolved:** a
chapter-level boolean cannot say "printed 20 of this chapter is off the paper". Flagging Anaemia
`true` would cancel anaemia, which is examinable. The flag stays `false` and the exclusion is
carried in a `PARTIAL.` note plus this conflict.

**4. `Physiological limitations of blood coagulation` vs `Anti-Clotting Mechanisms` — naming and
boundary conflict.** *(record: Blood > Physiological limitations of blood coagulation)*
This is the conflict that drove the whole re-extraction. Module book: one chapter of that name,
printed 27–28, with six numbered mechanisms (healthy endothelium, heparin, the liver,
continuous normal flow rate, the TXA2/prostacyclin balance, the fibrinolytic system). Year book:
`Anti-Clotting Mechanisms`, physical 40–41, split into `A. General limiting reactions` (3 items)
and `B. Specific limiting reactions` (3 items), with further relevant material back in
`Hemostasis`. The 2025 paper uses the module book's name verbatim for 9 marks. **Why not
resolved:** the year book's A/B split is a real structure a student may have been taught from,
and its `Hemostasis` chapter genuinely carries part of the answer. Both structures are preserved
— the module title on the record, the year book's chapter in `yearBookChapters`.

**5. `Alarm or "STRESS" response` — boundary conflict with an exclusion consequence.**
*(record: Autonomic nervous system > Sympathetic nervous system)*
Year book: its own chapter at physical 73 (printed 65), at the very end of the ANS section,
flagged excluded. Module book: an unlisted heading `ALARM or "STRESS" Response of Sympathetic
Nervous System` on physical p158 (printed 45), inside the sympathetic chapter, immediately after
the sympathetic functions. **Why not resolved:** same boolean problem as conflict 3, plus the
books place it at opposite ends of the ANS material. The orientation's ordering agrees with the
module book (§1b), but that is evidence about ordering, not licence to delete the year book's
chapter.

**6. `Centers of the Autonomic Reflexes` — boundary conflict with an exclusion consequence, plus
an ordering disagreement.** *(record: Autonomic nervous system > Parasympathetic nervous system)*
Year book: its own chapter at physical 66 (printed 58), *after* the parasympathetic chapter has
ended and immediately before chemical transmission, flagged excluded. Module book: an unlisted
heading on physical p161 (printed 48), *inside* the parasympathetic chapter. **Why not
resolved:** as conflict 3, plus the two books disagree on whether this material belongs to the
parasympathetic system or stands alone.

**7. `Chemical transmission` / `Receptors of the effector organs` / `Drugs that affect the
autonomic activity` — three-way boundary conflict, and the worst exclusion mismatch in the
file.** *(record: Autonomic nervous system > Chemical transmission at autonomic junctions and
autonomic receptors)*
Year book: three chapters with **two different exam statuses** — `Chemical transmission at
autonomic junctions` (physical 66–69, excluded), `Receptors of the effector organs` (physical
69–73, **not** excluded), `Drugs that affect the autonomic activity` (physical 73–74, excluded).
Module book: one contents-listed chapter, printed 49–54, covering all three, so excluded and
examinable material share a node. There is also a wording conflict inside it: the orientation
says `DRUGS THAT AFFECT THE AUTONOMIC ACTIVITY`, which is the **year book's** exact heading; the
module book prints `AGENTS THAT AFFECT THE AUTONOMIC ACTIVITY` (physical p167). **Why not
resolved:** splitting the module chapter to match the year book would invent boundaries the
module book does not print — the module contents lists this as one entry wrapping over two lines
— while merging silently would hide that most of it is off the paper. The record carries
`excludedFromWrittenExam: false` (because the adrenergic-receptor material on printed 51–53 is
examinable) with a `PARTIAL.` note naming both excluded stretches and their pages.

### Kept from the previous pass: depth, a judgement call

The year book's contents pages indent some entries under others — under `RBCs`: `Hemoglobin`,
`Erythropoiesis`, `Anemia`, `Polycythemia` one step and `Iron`, `Vitamins` two steps; under
`Platelets`: `Hemostasis`, `Anticlotting mechanisms`, `Anticoagulants`,
`Abnormalities of hemostasis`; under `The Autonomic Nervous System`: `Autonomic ganglia`,
`Sympathetic nervous system`, `Parasympathetic nervous system`. The previous pass flattened
them, because the year book's body typography sets all of those in the same centred chapter
style at the same visual level, with no grouping page or heading between them.

**The module book's contents has no indentation at all** — 19 flat entries under two roman
numerals — so the question does not arise for the tree. The year-book indentation is recorded
here so the previous pass's reasoning survives and can be reversed on evidence.

---

## 7. What I could not determine

1. **Whether the model answers follow the module book's wording.** The solved paper
   `src_77300134fd057d61852c` solves only the biochemistry section; its four physiology pages
   are blank answer lines (§5). So the strongest possible confirmation — that the marking scheme
   quotes the module book — was unavailable. The chapter-title match on question 2 stands on the
   question stem alone.

2. **Which book is newer.** Neither book's extracted text carries a date, edition number or
   printing year anywhere I could find, so "the module book is the current one" is *not* claimed
   here. The case for it in §1 rests on the orientation and the exam paper agreeing with it, not
   on chronology. If a dated cover or edition statement exists as an image rather than text, it
   would settle this and should be checked by eye.

3. **Whether the leucocyte chapter is still taught.** Conflict 2 leaves three year-book pages
   (physical 44–46) with no module-book home and no orientation ruling. Whether students are
   examined on leucocytes in 102 needs a human answer. Nothing was invented to cover it.

4. **Whether the first system should be called `Blood` or `Haemopoietic system`.** Three sources
   say haemopoietic (the Part II divider, the running head, the orientation) and one says Blood
   (the Part II contents, which is the list this tree is built from). §3 explains the choice; it
   is a naming ruling, not a page-range question, and flipping it changes 13 `subjectPath`
   strings and nothing else.

5. **Whether `AGENTS` or `DRUGS` is the department's word** for the material on module physical
   p167. The module book prints `AGENTS`; the orientation and the year book both say `DRUGS`.
   Recorded inside conflict 7; the `bookTitle` field is unaffected because neither word is a
   chapter title in the module book.

6. **No marks or teaching hours are recorded**, because no source read here states any for 102
   physiology. The orientation gives exclusions only; the 2025 paper gives marks per *question*,
   not per chapter. Following the 101 precedent, a number nobody wrote down is not invented.

7. **Resolved since the previous report, and no longer open:** that report's open question 1 —
   the three orientation entries (`INTRODUCTION`, `BODY FLUIDS`, `HOMEOSTASIS`) with no home in
   the year book's 102 half. §1a closes it: all three are chapters' worth of material in the
   module book's 102 physiology, at printed 2, 2 and 5. The announcement does not mislabel the
   module.

### Kept from the previous pass: year-book text-extraction damage

These affect the `yearBookChapters` entries' `bookTitle` strings, which are quotations of a book
whose scan is imperfect. All are flagged in the year-book evidence strings carried in the JSON.

- **The parasympathetic chapter's body heading never extracted.** On year-book physical p62 the
  text jumps from the sympathetic section's closing NB to `Anabolic and Energy preserving system
  (rest, digest, reading)`; the heading is presumably a graphic. That entry's `bookTitle` is
  quoted from the year book's contents. *(The module book prints the heading cleanly —
  `THE PARASYMPATHETIC NERVOUS SYSTEM` on physical p159 — so the module record is unaffected.)*
- **A stray `Blood Transfusion` string renders on year-book physical p42**, between the
  heparin/dicumarol table and `Abnormalities of Hemostasis`, with no transfusion prose after it;
  the real section is on p48–49. Treated as a layout artefact. *(The module book has the same
  artefact in the same place: `Blood Transfusion` renders inside the Heparin/Dicumarol table's
  `Antidote` row on physical p142. Two books, same table, same stray string — which corroborates
  the artefact reading rather than undermining it.)*
- **Two year-book body headings extract damaged** and were quoted from its contents instead:
  `Receptors of he effector or ans:` on physical p69, and the closing quotation mark of the
  Alarm/Stress heading on p73.
- **`Erythropoisis` is the year book's own spelling** on physical p18; its contents spells it
  `Erythropoiesis`. *(The module book spells it `ERYTHROPOIESIS` on physical p125.)*
- **One inaccuracy in a previous-pass evidence string, left in place rather than edited.** The
  `Blood transfusion` year-book entry's evidence reads `Bold heading 'Blood Transfusion:' with
  its own Indications / Precautions / Effects sections`. Re-reading year-book physical p48–49
  shows `Indications:` and `Effects of incompatible blood transfusion:` but **no Precautions
  section** — the word `Prevention:` appears on p48, but under erythroblastosis fetalis, not
  under transfusion. The `Precautions before blood transfusion:` block is in the **module** book
  (physical p146). The year-book evidence string is carried verbatim in the JSON because it is a
  quotation of what that pass wrote; the correction is recorded here rather than made silently.
  It changes no page number and no chapter.

Part II of the module book extracted clean: all 19 contents entries and all 19 body headings are
legible, no heading is damaged, no page is empty.

---

## 8. Spelling and field conventions

- `bookTitle` quotes the **module book's Part II contents entry verbatim**, so it keeps that
  book's American spellings — `Hemoglobin`, `Anemia`, `Hemostasis`. Where the body heading's
  wording differs from the contents (`Organization of autonomic nervous system` in the contents
  vs `THE AUTONOMIC NERVOUS SYSTEM` in the body; `…& autonomic receptors` in the contents vs
  `CHEMICAL TRANSMISSION AT AUTONOMIC JUNCTIONS` in the body) the contents is quoted and the
  `evidence` line names both. Body headings are set in full capitals throughout Part II, which is
  display styling rather than spelling, so `bookTitle` uses the contents' title case.
- `subjectPath` and all prose use **British spelling** — haemopoietic, anaemia, haemostasis,
  leucocyte, organisation.
- `sourceId` on each record is `src_a488633802ec053c6325` (the module book); each
  `yearBookChapters` entry carries its own `sourceId` of `src_bfeed7a91f343a86b255`. All
  `physicalStart` / `physicalEnd` values are relative to their own record's `sourceId`.
- `yearBookChapters` entries preserve the previous pass's `title`, `bookTitle`, physical and
  printed ranges, `excludedFromWrittenExam`, `exclusionNote` where it was non-null, and the full
  `evidence` string. Nothing that pass established was dropped.
- `exclusionNote` is non-null in two situations: a fully excluded chapter, and a partially
  excluded one, where the note begins with `PARTIAL.` and `excludedFromWrittenExam` is `false`.
  Read the flag and the note together.

## 9. One divergence from the sibling artefact in this folder

`biochem-chapters.json`, written by the 102 INT biochemistry lane into this same directory, uses
`cancelledForExam` / `cancelledNote` where this file uses `excludedFromWrittenExam` /
`exclusionNote`, and a three-segment `subjectPath` (`102 INT > Biochemistry > <chapter>`) where
this file uses four (`102 INT > Physiology > <system> > <chapter>`). The field names here are
the ones this lane was given; the extra path segment is real structure — physiology's book
splits into two named systems and biochemistry's does not. Flagging it so whoever merges the two
picks one vocabulary deliberately rather than discovering the mismatch at import.

Worth noting for that lane: biochemistry is **Part I** of the same `Department Book Module
102.pdf`, physical pages 1–111, and Part I's printed-to-physical offset is **4**, not 113
(physical p111 prints `107`). The two parts number independently.

## Housekeeping

- Nothing outside `scripts/kasr/extract/102-INT/` was touched.
- `biochem-chapters.json`, `biochem-chapters-report.md` and all `eoy-*` files were left alone.
- No commit, no push, no import.
