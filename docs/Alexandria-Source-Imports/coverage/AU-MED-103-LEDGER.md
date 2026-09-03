| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| bioc1 | 30 | 0 | 0 | 30 |
| bioc1pending | 33 | 0 | 0 | 33 |
| bioc2 | 20 | 0 | 0 | 20 |
| bioc2au102 | 7 | 0 | 0 | 7 |
| bioc2kasr | 18 | 0 | 0 | 18 |
| held | 0 | 0 | 19 | 19 |

## Held
(none)

## Remaining
- held-q01
- held-q02
- held-q03
- held-q04
- held-q05
- held-q06
- held-q07
- held-q08
- held-q09
- held-q10
- held-q11
- held-q12
- held-q13
- held-q14
- held-q15
- held-q16
- held-q17
- held-q18
- held-q19

## Narrative -- what remains, by source (Step 2 lane 2, W1-103-BIOC bioc2)

108 questions now exist for AU-MED-103 Biochemistry across five clusters: `bioc1` (30,
already-landed main batch, commit c4b3e557) and `bioc1pending` (33, already-landed Kasr
overlay) from Step 2 lane 1, plus this lane's `bioc2` (20, this lane's own concept file),
`bioc2kasr` (18, Kasr 103-BMS carbohydrate/heme/lipid pending reuse) and `bioc2au102` (7,
sibling AU-MED-102 pending reuse) from Step 2 lane 2. Every fact this lane authored was
checked against the 63 pre-existing questions' `source_citation` fields before writing a
stem, so none of the 45 new items restates a fact already tested.

**AGHA-BLOOD MCQ (`src_c757d47d9f689de66b5d`, 73 items).** Roughly 40 of 73 items are now
covered (Step 2 lane 1's 16 + this lane's remainder), spanning haemoglobin structure,
sickle cell, thalassaemia, methaemoglobinaemia, folate/B12/vitamin K, iron, haem
biosynthesis/porphyria and immunoglobulins. What remains uncovered is almost entirely
near-verbatim restatement of a fact this lane or lane 1 already tested under a different
Q number (the bank restates several facts two or three times, as the original triage
flagged) -- no further distinct fact was found worth a 46th question. Q3-Q6's keys remain
genuinely lost (see Held, below).

**MCQs - CHO Metabolism MCQs (1) (`src_97aa282c2fde6f6025a2`, 111 keyed of 125 items).**
This bank had the largest open window: of its 111 keyed items, only ~35 were covered
before this lane started (mostly uronic acid, glycogen synthase/branching/debranching,
G6PD/favism, plus a scattering of glycolysis/CAC/gluconeogenesis facts lane 1's pending
overlay reached). This lane closed most of the rest -- ATP yield, NAD+ regeneration,
substrate-level phosphorylation, PFK-1 regulation (newly minted), the HMP shunt's two
phases, glycogen phosphorylase's covalent switch and rate-limiting role, two more CAC
facts, essential fructosuria/HFI, galactosaemia, the malate shuttle and gluconeogenesis's
ATP cost. What remains is chiefly restated facts (the bank tests "rate-limiting enzyme of
glycogen degradation" and "product of contracting muscle used for gluconeogenesis" more
than once each, as the triage's own HAZARDS section flagged) and a handful of
"coenzyme-enzyme mismatch except"-style items whose exact fact could not be pinned down
without the source page. 14 entries (Q13, 18, 19, 24, 38, 43, 48, 51, 52, 56, 62, 65, 68,
76) remain unkeyed (see Held, below).

**Blood - Bio - Agha / CHO Metabolism - Agha (department books, `src_4e9f6eb8be5aeedd4cf4`
/ `src_afc87efebd1aaf64f595`).** Both now registered as resource rows for the first time
(resource/AU-MED-103-biochemistry-2-resources.md) -- neither had a resource/AU-MED-103-*.md
row before this lane, despite being cited in concept `resource_ids` since Step 2 lane 1.
No further content owed from these; their contents chapter-map onto the MCQ banks above.

**EOM papers (3, `src_49f438279b68a489aa42` / `src_56bc398ce32f0140fc29` /
`src_c9c9ca53cfa1321d0508`).** All Biochemistry-relevant Qs the triage tables list are now
cited somewhere across the five clusters, with two exceptions: EGYF Q13 (galactose,
unkeyed in the source's own key -- see Held) and a handful of Qs whose fact is a
near-duplicate of one already tested (e.g. WAF Q1's Hb tetramer structure, already covered
via the globin-composition question; WAF Q9's ferritin storage form, already covered via
this lane's iron-overload question) -- not separately authored, to avoid padding with
restated facts.

**Practical Blood Questions bank (`src_4b9b0c4cf94fde15b14a` / preferred twin
`src_5309ee19e1149a5bbe9d`, a `.docx` `pagetext.py` still cannot read).** Fully covered --
all 13 Biochemistry spots were already tested by Step 2 lane 1's main batch. Nothing owed.
The `.docx`-vs-`.pdf` twin-substitution question Step 1's triage flagged is still open and
not this lane's to resolve (no content decision depends on it, since both twins were
already read as equivalent by lane 1).

**Held -- 19 unkeyed items, all confirmed genuinely unresolvable this session.** This
lane's environment has no `~/Desktop/Alexandria University` corpus tree mounted (checked:
`find / -iname "*Alexandria University*"` returned nothing reachable), so the triage's
called-for render check on AGHA-BLOOD Q3-Q6 and the 14 AGHA-CHO `0`-printed entries could
not be run. All 19 are held per the standing rule (never key by fact-checking), listed
above by `held-qNN` placeholder in the absence of a page render. Whoever next has access
to the source PDF tree should run `node scripts/content/pagetext.mjs keys` (or `render`
if that reports no usable text layer) on AGHA-BLOOD p13-15 and AGHA-CHO p12-13 to attempt
recovery before authoring these 18 (17 distinct stems, since AGHA-BLOOD Q4 is cross-listed
under both the haem-biosynthesis and vitamin-K chapters in the triage).
