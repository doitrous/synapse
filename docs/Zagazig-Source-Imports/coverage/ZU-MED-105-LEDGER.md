# ZU-MED-105 (Professional Practice I) — pp1-cluster1 + pp1-cluster2 + pp1-cluster3 + pp1-cluster4 ledger

**Tool note (same wall as pp1-cluster1's own note, and ZU-MED-106's author1 pass):**
`node scripts/content/ledger.mjs docs/Zagazig-Source-Imports/coverage/seeds/ZU-MED-105
--triage coverage/ZU-MED-105-triage-keys.txt` reports every authored/held key as
"remaining" under a synthetic one-key "cluster" equal to each triage-keys.txt slug —
`clusterForKey()` only strips a trailing `-qNN` suffix, and this lane's
`ZU-MED-105-triage-keys.txt` uses full descriptive slugs (e.g.
`pp1-past-q39-leadership-style-selection-factors`, not `pp1-past-q39`), so the
authored-keys set and the remaining-keys lookup never intersect. The tool also
**rewrites the whole file** on every run rather than appending, so each pass's raw
output must be re-curated by hand back into this same narrative form — this revision
restores pp1-cluster1/2/3's own sections (from git history, commits
341ff01c/32f4d392/147312c0) verbatim and adds pp1-cluster4 below. **Correctly reported
by the tool this pass**: `pp1-cluster1 | 40 | 0 | 0 | 40`, `pp1-cluster2 | 22 | 21 | 0 |
43`, `pp1-cluster3 | 32 | 0 | 0 | 32`, `pp1-cluster4 | 47 | 0 | 0 | 47`, and `pp1-held |
0 | 2 | 0 | 2` (all seed-declared clusters, matching real `cluster` fields in the four
seed JSON files). The pp1-cluster4 pass's own held/deferred items were never entered
into `ZU-MED-105-triage-keys.txt` as individual slugs (unlike pp1-cluster1/2/3's
practice), since most are referenced only by page/item position in
`coverage/ZU-MED-105-triage.md`'s own page-range breakdown — they are listed below
under "Held" and "Not authored this pass" instead. The ~90+ one-row-per-key
"remaining" lines the raw tool output also produces are the known false-positive
artefact described above — omitted from this hand-verified table; every one of them
is actually accounted for as authored, held, or out-of-scope-non-SBA below.

## Clusters

| cluster | authored | held | remaining | total |
|---|--:|--:|--:|--:|
| pp1-cluster1 | 40 | 0 | 0 | 40 |
| pp1-cluster2 | 22 | 21 | 0 | 43 |
| pp1-cluster3 | 32 | 0 | 0 | 32 |
| pp1-cluster4 | 47 | 0 | 0 | 47 |
| pp1-held | 0 | 2 | 0 | 2 |

pp1-cluster1 (landed 341ff01c): 40 of 76 keyed SBA items across the three tier-1
sources, pages 1-4 of امتحانات سابقه.pdf plus both Final papers in full. See this
file's prior revision (git history) or `coverage/ZU-MED-105-triage.md` for its own
concept table.

pp1-cluster2 (landed 32f4d392): 22 of the ~36 keyed items on امتحانات سابقه.pdf pages
5-13 (Q30-76) authored; 21 held (13 duplicates of pp1-cluster1's 40, 7 unmarked, 1
malformed); 4 further items (Q65-67, Q76 — definitions/enumerate/fill-in-the-blank)
are out of scope, not single-best-answer format, not counted in either total. This
exhausted امتحانات سابقه.pdf; `mcq شامل.pdf` (tier-2 bank, 44 pages) remained
status-checked only, not opened.

pp1-cluster3 (this pass): triaged and authored entirely from `mcq شامل.pdf`
(catalogued but not opened by pp1-cluster1/2). Full-bank triage: 44 pages, native
text, 142 detected question blocks, 133 keyed (~94%, yellow fill-rectangle highlight
over the correct option, ad hoc PyMuPDF detection, render-confirmed on pages 2 and
26 — 2 renders, 0 mismatches) — comfortably over the 60% approval bar. This pass
authors 32 questions, entirely from the bank's Self-Directed-Learning section (pages
2-11), the only section with zero overlap risk against lanes 1-2's 62 questions and
against internal duplication within this same source. The bank's remaining sections
(pages 12-40: bioethics-principles definitions, consent/confidentiality,
vulnerability/dignity/pluralism/stigmatization, leadership/team-dynamics, health
determinants) are triaged (keyed, method validated) but not authored this pass — see
"Not authored this pass" below. Real remaining scope for a follow-up pass.

pp1-cluster4 (this pass): authored entirely from `mcq شامل.pdf` pages 12-40, the
sections pp1-cluster3 triaged but deferred (bioethics-principles, consent/
confidentiality/vulnerability, leadership/team-dynamics, health determinants). See
its own detail section below.

## Held — pp1-cluster1 (unchanged from its own landed pass)

- pp1-past-q14-team-development-stages-exception — held-indefensible-key — two gray-fill marks disagree (C "Adjuring" and D "Co-coordination"), render-confirmed p2, امتحانات سابقه.pdf
- pp1-past-q24-equity-definition — held-malformed-source — only 2 options (A/B) printed in source, C/D missing, امتحانات سابقه.pdf

## Held — pp1-cluster2 (unchanged from its own landed pass, 21 items)

Duplicates of pp1-cluster1's 40 (named twin, not re-authored — 13 items):

- pp1-past-q30-time-management-productive-duplicate — dup of pp1-past-q17 (identical stem/options)
- pp1-past-q32-self-awareness-remedy-duplicate — dup of pp1-past-q01/pp1-past-q27
- pp1-past-q34-self-awareness-sources-duplicate — dup of pp1-past-q29
- pp1-past-q37-leadership-definition-duplicate — dup of pp1-past-q20 (options reordered, same fact)
- pp1-past-q38-democratic-leadership-duplicate — dup of pp1-past-q19 (identical stem/options)
- pp1-past-q42-self-awareness-sources-duplicate-2 — dup of pp1-past-q29 (third copy)
- pp1-past-q61-vertical-equity-duplicate — dup of pp1-fakous24-q02
- pp1-past-q69-vertical-equity-duplicate-2 — dup of pp1-fakous24-q02 (second copy)
- pp1-past-q70-justice-organ-transplant-duplicate — dup of pp1-fakous24-q03 (identical stem/options)
- pp1-past-q71-mental-capacity-conflicting-key — dup of pp1-fakous24-q04 (identical stem/options), but this compilation bank marks C "Legally authority" while Fakous P.P1 Final 2024.pdf marks B "His physician" for the same item — cross-source key disagreement, held rather than re-authored or arbitrarily picking one source's mark
- pp1-past-q72-checklist-tool-duplicate — third copy of pp1-zag24-q01/pp1-fakous24-q05
- pp1-past-q74-negotiation-duplicate — dup of pp1-fakous24-q06 (identical stem/options)
- pp1-past-q75-storming-duplicate — dup of pp1-fakous24-q07 (identical stem/options; two-column layout, gray fill confirmed on D only after fixing an x-overlap bug in the detection script, render-confirmed p.13)

Unmarked, held-no-printed-key (7 items):

- pp1-past-q31-unmarked, pp1-past-q33-unmarked, pp1-past-q36-time-management-unmarked, pp1-past-q43-unmarked, pp1-past-q44-unmarked, pp1-past-q68-unmarked, pp1-past-q73-unmarked

Malformed source (1 item):

- pp1-past-q35-sources-of-self-awareness-malformed — only 3 options (A/B/C) printed, no D; also unmarked

## Out of scope — pp1-cluster1/2 (not "held" — never SBA format)

- pp1-past-q65-define-terms, pp1-past-q66-list-items, pp1-past-q67-spectrum-of-health-enumerate, pp1-past-q76-complete-statements — definitions/list/enumerate/fill-in-the-blank, not single-best-answer format, matching pp1-cluster1's own treatment of Fakous P.P1's non-SBA section

## Concept resolution for the 21 concepts backing pp1-cluster2's 22 authored questions

Every concept this pass is a **fresh mint** — `find-existing.mjs` (short single-word/
phrase queries: group dynamics, double effect, altruism, informal communication,
learning needs, interpersonal skills, competence, implied consent, genetic factors,
self-directed learner, chaperone, genital examination, dress professionally, leadership
style) found 0 reusable hits for any of them (the "competence"/"chaperone" hits
returned were unrelated domains — immunocompetence/bacterial competence, molecular
chaperones). `docs/Zagazig-Source-Imports/concept/ZU-MED-108-*` does not exist yet
(PP II lane has not landed any concepts), so no cross-lane reuse check was possible
there. 1 concept (`CON-POP-6A53546B82C5B1`, self-awareness as a professionalism
attribute) is shared by 2 near-identical questions (Q53/Q55, a within-source
duplicate, professional-development vs emotional-intelligence wording) — the other 20
back exactly 1 question each. 21 distinct concepts back 22 authored questions.

3 marked keys in this cluster disagree with more conventional professionalism/ethics
teaching and are flagged with an `uncertainty` field rather than silently corrected or
held (each is a single, unambiguous, render-confirmed mark, not a two-mark conflict):
"Ethics" over "Professionalism" (Q51), "Autonomy" over "Beneficence" for altruism
(Q52), and "Interpersonal skills" over "Altruism" for a conflict-of-interest violation
(Q56). A 4th, "implied consent must be signed by the patient" (Q62), conflicts more
sharply with standard consent doctrine (implied consent specifically does not require
a signature) and is flagged as the strongest single-mark doubt in this cluster.

## Gate summary — pp1-cluster2 (unchanged, from its own landed pass)

```
GATE batch concept/ZU-MED-105-pp1-cluster2-concepts.md: items=21 errors=0
GATE batch article/ZU-MED-105-pp1-cluster2-articles.md: items=3 errors=0
GATE batch question/ZU-MED-105-pp1-cluster2-mcq.md (--with cluster2 concept/article, --with pp1-cluster1 concept/article): items=22 errors=0
GATE simulate 5 file(s) (pp1-cluster1 concept, pp1-cluster1 article, pp1-cluster2 concept, pp1-cluster2 article, pp1-cluster2 question, applied in order): batches=5 created=85 updated=0 rejected=0 skipped=0 errors=0
```

`validate-content-batch.mjs` run directly on all three pp1-cluster2 files (the
gate.mjs clean-summary caveat this lane card names) confirms the same: concept 0
errors, article 0 errors, question 0 errors (22 items, 21 concepts tested, all
`needs_evidence` as expected for fresh mints; one warning noting the correct-answer
explanations run 253-364 characters median, all ≥3 sentences, 0% under the 200-char/
3-sentence floor).

## Gate summary — pp1-cluster1 (unchanged, from its own landed pass)

```
GATE batch concept/ZU-MED-105-pp1-concepts.md: items=34 errors=0
GATE batch article/ZU-MED-105-pp1-articles.md: items=5 errors=0
GATE batch question/ZU-MED-105-pp1-cluster1-mcq.md (--with concept, --with article): items=40 errors=0
GATE simulate 3 file(s) (concept, article, question, applied in order): batches=3 created=79 updated=0 rejected=0 skipped=0 errors=0
```

---

## pp1-cluster3 — triage and authoring detail (this pass)

### Triage of `mcq شامل.pdf` (44 pages, tier-2 bank)

`pagetext.mjs status`: native PDF text throughout, not garbled (2 near-empty divider
pages at p1/p17, 4 blank trailer pages at p41-44 with only a printed page number).
`pagetext.mjs keys` crashes on the near-empty pages (`statistics.median` on an empty
list) and, run over the readable range, only detects a 2-keyed/2-ambiguous/25-unmarked
slice — the shared tool's mark classes (span colour, bold, thin underline, PDF
annotation objects) do not see this source's own key convention.

**New trap this lane found, distinct from both prior traps in this module (ink
corruption on `Final`-named scans; gray fill-rectangle on امتحانات سابقه.pdf): a
yellow fill-rectangle drawn behind the correct option's text**, RGB (1.0, 1.0, 0.0),
one per question, positioned to overlap only the correct option's text line. Recovered
with an ad hoc, read-only PyMuPDF script (not added to the shared toolchain, matching
the precedent set by this lane's own gray-fill script for a different source):
`page.get_drawings()` filled rectangles, matched to the option line whose bounding box
the fill's vertical centre falls inside. This source mixes numbered stems ("N-
question text") with unnumbered stems (a bare paragraph followed directly by "a)"
options), so question-block boundaries were detected generically by each "a)"-prefixed
option-start line, not by stem numbering, which is why the script recovers 142
question blocks against `pagetext.mjs keys`' far lower count.

**Confirmed against 2 full-page renders** (`render --force`, pages 2 and 26 — within
the 3-render budget for this dispatch): page 2's four questions matched the script's
four fill-to-option assignments exactly (b/a/d/d); page 26's two genuinely-unmarked
questions (permissible-breach-of-confidentiality-except, principles-of-dignity-except)
showed no highlight of any kind on any option in the render, confirming the script's
"0 marks" output is a real absence, not a detection miss, while the same page's two
marked questions (Vulnerable groups, Vulnerability) matched exactly.

**133/142 keyed (~94%)** via this method: 2 ambiguous (multi-mark conflict, held),
7 unmarked (`held-no-printed-key`, confirmed genuine by the page-26 render spot-check
above). **TRIAGE APPROVED condition met**, comfortably over the 60% bar.

### Scope decision: Self-Directed-Learning section only, this pass

This pass authors 32 of the ~133 keyed items, entirely from the bank's
Self-Directed-Learning section (pages 2-11, 38 numbered SDL questions, 36 keyed).
This section was chosen over the bank's other five sections (bioethics-principles,
consent/confidentiality, vulnerability/dignity/pluralism/stigmatization,
leadership/team-dynamics, health determinants, pages 12-40) because it is the only
one with **zero overlap risk**: lanes 1-2's 62 questions never touch self-directed
learning, and (per the concept-search below) only one existing concept in this
module's corpus footprint is SDL-adjacent at all.

**Not authored this pass** (triaged, method validated, real remaining scope for a
follow-up pass):
- Bioethics-principles definitions (pages 12-23) — this exact block is tested
  near-verbatim **twice** within `mcq شامل.pdf` itself (pages 12-16, then again
  16-23), and several of its facts (vertical/horizontal equity, justice, double
  effect) sit close enough to lane1/2's existing concepts (`verticalequity...`,
  `justice...`, `doubleeffect...`) to need further per-item duplicate review before
  minting or overlaying cleanly.
- Consent/confidentiality/dignity/vulnerability/pluralism/stigmatization (pages
  24-30) — mostly fresh territory, genuinely reasonable candidates for a follow-up
  pass, simply out of this dispatch's scope budget.
- Leadership/team-dynamics (pages 31-38) — several facts (storming/forming/norming/
  performing stages, negotiation) sit close to lane1/2's existing `storming` and
  `negotiation` concepts and would need the same per-item review.
- Health determinants/spectrum of health (pages 38-40) — the modifiable/
  non-modifiable-determinants framework sits close to lane2's existing
  `healthdeterminants.genetic-factors-are-non-modifiable` concept.
- An orphaned printed answer-key fragment at the bottom of page 40 ("ميد فاقوس P.P /
  الحل / 1_a 2_b 3_b... 10_c") has no matching question stems anywhere in this PDF —
  logged, not usable, likely copy-pasted from a different source during compilation.

### Held (this pass, within the Self-Directed-Learning section; referenced by
their position in `mcq شامل.pdf`'s own numbering, e.g. "source Q18" — none of these
were minted or given a `pp1shamel-qNN` authored key)

- source Q18 (page 6), "ascendency of SDL competencies... include" (All of the above, naming stages 1-3) — held-duplicate-concept — restates ground already fully covered by pp1-cluster2's `interestedlearner.staged-self-directed-learning-stage-two` concept (Grow's model); the stage-4-specific item (source Q19, authored as pp1shamel-q17-sdl-stage4-self-directed-learner) was judged a genuinely distinct sibling fact and authored instead.
- source Q24 (page 7), "Developing a learning plan consists of a cyclical process as outlined in the steps this step are" — held-indefensible-key — three yellow fill marks disagree on the same question (e "All of the above", f "a and b", g "a and c" all marked), a genuine multi-mark conflict, not a detection artefact.
- source Q27 (page 8), "keeping a diary of learning needs... refer to" keyed "Self-assessment" — held-question-quality — reads as a closer fit to a logbook/reflective-diary method than to self-assessment proper; dropped for authoring-quality caution rather than authored with an uncertainty flag, since a cleaner adjacent item (source Q28, practice reviews) covers the same assessment-methods slot cleanly.
- source Q29 (page 9), "ask colleagues to observe your performance and give feedback" keyed "Observation" — held-question-quality — reads as a closer fit to 360-degree appraisal (peer feedback) than to observation; dropped for the same reason as above.
- source Q30 (page 9), "Learning needs are... (gap between current and desired KSA)" — held-duplicate — restates pp1-cluster2's pp1-past-q48-learning-needs-definition in reverse MCQ orientation (terms-as-options vs statements-as-options, same underlying fact).
- source Q11 (page 4), "Helping students understand how they learn most effectively" keyed "Engage students in the process" — held-question-quality — reads as a closer fit to the readiness/self-awareness step than to engagement; dropped for authoring-quality caution. (Source Q12, the cleaner "blend within classroom education... suit student needs" stem on the same page, was authored instead as pp1shamel-q11-steps-implement-sdl-adapt-student — note the authored key's own "q11" sequence number does not correspond to source Q11.)

### Concept resolution for the 31 concepts backing pp1-cluster3's 32 authored questions

Every concept this pass is a **fresh mint** — `find-existing.mjs` (short literal
queries: self-directed learning, learning plan, learning needs, 360 appraisal,
autonomy, beneficence, non-maleficence, privacy, confidentiality, team dynamics,
forming, spectrum of health, determinants of health, SWOT, vulnerable groups,
vulnerability, pluralism, stigmatization, non-discrimination, accountability,
responsibility, bioethics, medical ethics, equity, equality, consent, wellness) plus
`grep -ril` across `docs/*-Source-Imports/{concept,pending-live}` and
`docs/import-ready/concept`. "self-directed learning" hit exactly one existing
record (pp1-cluster2's Grow's-model concept, addressed above by holding the
stages-list item). "learning needs" hit pp1-cluster2's existing definition concept
(addressed by holding the duplicate item). "accountability" and "equity" hit lane1's
existing `accountabilitymodel...` and `verticalequity...` concepts, but neither
authored SDL item in this cluster tests those same specific facts (this cluster's
accountability/equity-adjacent candidates were the ones held for the follow-up pass
on pages 12-30, not authored here). Every other search term returned 0 hits,
confirming self-directed learning is genuinely new territory in this module and this
corpus. 1 concept (`CON-POP-92DD5FB34120C6`, the "adjust and adapt to suit student
needs" SDL-implementation step) is shared by 2 questions (a within-source
false-exception framing and a direct positive framing of the same fact) — the other
30 back exactly 1 question each. No `uncertainty` flags were needed this pass; every
marked key authored reads as a defensible, conventional fit for its stem.

One item (`pp1shamel-q05-learning-resources-functions-except`) printed 6 options in
the source; trimmed to 5 by dropping "Time and effort saving" (still a genuine
function per the source and per this item's backing concept's own definition, which
lists all five original genuine functions) and re-lettering, keeping the marked
exception "Increase the hope" as the correct answer — documented in the concept's
`original_wording` and the question's `field_notes.optionsTrimmed`, per this
module's `>5 options trimmed and documented` rule.

### Gate summary — pp1-cluster3 (this pass)

```
GATE batch concept/ZU-MED-105-pp1-cluster3-concepts.md (--with cluster3 article): items=31 errors=0
GATE batch article/ZU-MED-105-pp1-cluster3-articles.md (--with cluster3 concept): items=3 errors=0
GATE batch question/ZU-MED-105-pp1-cluster3-mcq.md (--with cluster3 concept, --with cluster3 article): items=32 errors=0
GATE simulate 3 file(s) (cluster3 concept, cluster3 article, cluster3 question, applied in order): batches=3 created=66 updated=0 rejected=0 skipped=0 errors=0
```

`validate-content-batch.mjs` run directly on all three pp1-cluster3 files confirms
the same: concept 0 errors (31 items, 50 fields used, `## sections` and definitions
populated in full), article 0 errors (3 items, 51 fields used after the LD-15 Arabic-
title field-note fix), question 0 errors (32 items, 31 concepts tested, all
`needs_evidence` as expected for fresh mints; one warning noting the correct-answer
explanations run 265-402+ characters, all ≥3 sentences, 0% under the 200-char/
3-sentence floor). Parsed-row counts verified to equal `# Item` counts and unique ids
for all three files (31/31, 3/3, 32/32).

---

## pp1-cluster4 — triage and authoring detail (this pass)

### Scope: `mcq شامل.pdf` pages 12-40 (bioethics, consent/confidentiality/vulnerability, leadership/team-dynamics, health determinants)

pp1-cluster3 triaged this whole 44-page bank at ~94% keyed (133/142 detected blocks)
but authored only its Self-Directed-Learning section (pages 2-11). This pass opens
the remaining four sections (pages 12-40) that pp1-cluster3 deferred, per the
dispatch's page-range scope. The yellow fill-rectangle key convention and ad hoc
PyMuPDF detection method are unchanged from pp1-cluster3 (`page.get_drawings()` for
non-white filled rectangles matched to the option-line bounding box the fill's
vertical centre falls inside); this pass extended the option-letter regex from
`[a-h]` to `[a-n]` after discovering two questions on page 38 whose options continue
past `h)` (the source's own lettering runs sequentially across adjacent questions
rather than resetting to `a)` — see "script-merge artefacts" below).

Detection over pages 12-40 found **106 question blocks**: 96 single-marked, 8
zero-marked, 2 multi-marked. Two of the "zero-marked" blocks were not real questions:
a page-16/17 and a page-35/36 question each split across a page boundary, with its
single option-`a` mark already counted on the earlier page. Both multi-marked blocks
were **script-merge artefacts, not genuine key conflicts**: this source's own option
lettering sometimes continues sequentially into an adjacent question (e.g. page 19's
beneficence question uses `a-d`, the next non-maleficence question continues `e-h`
rather than resetting to `a-d`; page 36 and page 38 do the same) rather than the
generic "new block starts at `a)`" boundary rule the detection script uses, so two
independently-marked questions get read as one block with two marks. Manually
re-splitting each by its embedded lettering resolved both cleanly into two
single-marked sub-questions, with 0 real ambiguity. **6 blocks are genuinely
unmarked** (`held-no-printed-key`): the "circumstances of consent (from whom)" and
"given consent is invalid except" items (p.24), "persons without capacity to consent
except" (p.25), "conditions of permissible breach of confidentiality except" and
"principles of dignity in health care except" (p.26, both render-confirmed genuinely
unmarked by pp1-cluster3's own page-26 render spot-check, since they sit on the same
page pp1-cluster3 already rendered), and "physician responsibilities except" (p.30,
render-confirmed this pass — see below). Net: **106 detected blocks resolve to
~107 distinct question instances** (106 − 2 split-boundary artefacts + 2×2
merge-artefact sub-questions), close to this dispatch's ~101-item estimate; 96 of
these carry a single unambiguous mark.

**Render used (this dispatch's only 1 of 14 module-wide renders):** page 30, to
verify an apparently convention-reversed pair of marks (see below). `render --force`
confirmed the detection script's fills exactly: 4/4 marks matched, 0 mismatches —
consistent with pp1-cluster3's own 2-render, 0-mismatch track record on this same
source. The two unconventional marks on that page are genuinely printed, not a
detection error, and are deferred rather than authored (see "Not authored this pass").

### Authoring: 47 of ~107 items, selected for topical balance and to avoid duplication

This pass authors 47 questions across all four deferred sections (13 bioethics, 14
consent/confidentiality/vulnerability, 14 leadership/team-dynamics, 6 health
determinants), selected against two duplicate-review passes:

**Against lanes 1-3's existing 94 concepts** (per-item review, as flagged by
pp1-cluster3's own triage): three facts recur and are held rather than re-minted,
named twin in each case —
- "unequal treatment of unequal needs" = vertical equity (p.16, and its p.23
  restatement) — held-duplicate — dup of `pp1-fakous24-q02-vertical-equity-definition`
  (lane 1; already has two further within-source duplicates, `pp1-past-q61`/`q69`).
- "double effect ... combined effect of beneficence and non-maleficence" (p.21) —
  held-duplicate — dup of `pp1-past-q50-double-effect-beneficence-nonmaleficence`
  (lane 2).
- "effective negotiation involves understanding the interests of all involved" (p.32)
  — held-duplicate — dup of
  `pp1-fakous24-q06-leadership-negotiation-conflicting-interests` (lane 1).
- "some rebellion against the assigned task" = storming (p.35, and its p.36
  restatement) — held-duplicate — dup of
  `pp1-zag24-q04-storming-stage-team-development` /
  `pp1-fakous24-q07-storming-stage-team-development` (lane 1, already a documented
  twin pair).
- "the intellectual capacity to understand, analyze, and judge information" =
  competence (p.14) — held-duplicate — dup of `pp1-past-q57-competence-definition`
  (lane 2).

Three further new concepts this pass instead **cross-link** to an existing lane
concept via `related_concept_ids` rather than holding, because they test a distinct,
complementary fact rather than restating the same one: `horizontalequity.definition-
is-equal-treatment-of-equal-needs` (new) links to lane 1's vertical-equity concept;
`unmodifiabledeterminants.biological-factors-except-behavioural-sociocultural` and
`modifiabledeterminants.factors-except-gender-not-modifiable` (both new) link to lane
2's `healthdeterminants.genetic-factors-are-non-modifiable`.

**Against `mcq شامل.pdf`'s own internal near-duplication**: the bioethics-principles
block (pages 12-16) is tested near-verbatim a second time (pages 16-23) within this
same source; this pass authors from the clearer first pass plus a handful of facts
genuinely unique to the second pass (autonomy-and-responsibility, beneficence and
non-maleficence definitions, the "no autonomy without responsibility" aphorism, the
consent-as-assault-except item), and holds every second-pass item that merely
restates a first-pass fact. The team-dynamics stage material (forming/norming/
storming/performing) is also stated twice within pages 34-38; this pass authors one
clean instance of each stage tested and holds the repeats. The "team dynamics"
definition itself is stated twice (p.34 and p.37); this pass authors the p.34 version
and holds the p.37 restatement.

**Not authored this pass** (triaged, keyed, method validated; real remaining scope
for a follow-up pass, not held for any quality reason):
- Bioethics: law/culture definitions, "three main questions", "principles guide
  decision-making" (all-of-the-above list items), the autonomy-vs-justice-vs-equity
  item marked "justice" for an equity-sounding stem (single mark, plausible but not
  selected this pass to keep the section to a representative sample), "competent
  adult right to decide about own body" (p.18), "equity in healthcare principles"
  (all-of-the-above, p.23).
- Consent/confidentiality/vulnerability: "care for vulnerable populations"
  (all-of-the-above), "bioethical issues: present and future generations",
  "stigmatization is a social rather than legal concept", the UNESCO-style culture
  definition (p.29), a second culture/pluralism item (p.29) whose printed mark reads
  as "Culture" for a stem that describes pluralism — flagged as an anomaly but not
  render-checked (this dispatch's 1 render was spent on p.30 instead) and deferred
  rather than authored on a doubtful mark, "performance indicators in education"
  (all-of-the-above), and two responsibility/accountability items (p.30) whose
  printed marks reverse the conventional self-initiated-vs-requested-by-another
  distinction relative to this same page's own conventional first item — render-
  confirmed as genuinely printed (see above), deferred for topical-balance/scope
  reasons rather than doubt in the mark.
- Leadership/team-dynamics: this module's second "leadership skills" list
  (problem-solving list, all-of-the-above item), the performing-stage item, "effective
  team principles" and "effective team challenges" (both all-of-the-above),
  "elements/stages of team dynamics" (all-of-the-above), "importance of teamwork
  improves care at the organization and patient level", and the Health/Wellness/
  Spectrum-of-health mini-topic (p.38, 3 items) — a clean, self-contained trio judged
  lower-priority than the module's professionalism/team content this pass, and left
  for a follow-up pass.

### Held (this pass) — unmarked, malformed, or duplicate, not authored

- 6 genuinely unmarked items (`held-no-printed-key`): "circumstances of consent (from
  whom)" and "given consent is invalid except" (p.24), "persons without capacity to
  consent except" (p.25), "conditions of permissible breach of confidentiality
  except" and "principles of dignity in health care except" (p.26, render-confirmed
  by pp1-cluster3's own page-26 render), "physician responsibilities except" (p.30,
  render-confirmed this pass).
- 2 malformed-source items (`held-malformed-source`): "the following refer to" (p.15
  — an empty/incomplete stem reusing the prior question's options with a different,
  unverifiable mark); "importance of teamwork in health care except" (p.34 — three of
  four options print with no visible text, an extraction/source defect).
- Duplicate-of-lanes-1-3 items (`held-duplicate`, named twin above): competence
  (p.14), vertical equity (p.16 and its p.23 restatement), double effect (p.21),
  negotiation (p.32), storming/rebellion (p.35 and its p.36 restatement).
- Internal duplicates within `mcq شامل.pdf` itself (`held-duplicate`): the bioethics-
  principles block's second pass (pages 16-23) restates its own first pass (pages
  12-16) — bioethical concepts, medical-ethics-as-a-branch, law/culture definitions,
  "three main questions", four-principles-all-of-the-above, autonomy-self-
  determination, and the equity/equality/justice trio (p.22) all restate their own
  first-pass twin; "physician must act in best interest, promote health/wellbeing"
  (p.19, merged block) restates this pass's own beneficence item (p.21); "first, do no
  harm ... risk outweighed by benefit" (p.19, merged block) restates this pass's own
  non-maleficence item (p.21); the p.36 merged-block forming/ambiguity and storming/
  rebellion sub-questions restate p.35's forming item (authored) and the storming
  duplicate (held) respectively; p.37's norming and performing items restate p.35's
  norming item (authored) and performing item (not authored this pass) respectively;
  p.37's team-dynamics-definition item restates p.34's team-dynamics item (authored).

### Concept resolution for the 47 concepts backing pp1-cluster4's 47 authored questions

Every concept this pass is a **fresh mint** except the three cross-links noted above.
`find-existing.mjs` (literal queries: bioethics, beneficence, autonomy, non-
maleficence, vulnerability, accountability, leadership styles, health determinants,
pluralism, stigmatization, confidentiality, privacy, team dynamics, consent) plus
`grep -ril` across `docs/Ain-Shams-Source-Imports`, `docs/Helwan-Source-Imports`,
`docs/FOMSCU-Source-Imports` concept/pending-live directories for the same terms
returned 0 cross-university hits in the bioethics/professionalism domain — the only
matches were unrelated anatomical "vulnerability" (subendocardial ischaemia,
liver-zonation, abducens-nucleus concepts) and unrelated immunological/oncological
"autonomy" mentions, confirming this content is genuinely new territory outside this
lane too, matching pp1-cluster3's own finding for self-directed learning. Every
concept backs exactly 1 question (no shared concepts this pass).

### Gate summary — pp1-cluster4 (this pass)

```
GATE batch concept/ZU-MED-105-pp1-cluster4-concepts.md: items=47 errors=0
GATE batch article/ZU-MED-105-pp1-cluster4-articles.md (--with cluster4 concept): items=4 errors=0
GATE batch question/ZU-MED-105-pp1-cluster4-mcq.md (--with cluster4 concept, --with cluster4 article): items=47 errors=0
GATE simulate 12 file(s) (cluster1 concept/article/question, cluster2 concept/article/question, cluster3 concept/article/question, cluster4 concept/article/question, applied in order): batches=12 created=289 updated=0 rejected=0 skipped=0 errors=0
```

`validate-content-batch.mjs` run directly on all three pp1-cluster4 files confirms
the same: concept 0 errors (47 items), article 0 errors (4 items, field_notes added
for the LD-15 Arabic-title check, matching pp1-cluster3's own precedent), question 0
errors (47 items, 47 concepts tested, all `needs_evidence` as expected for fresh
mints; one warning noting the correct-answer explanations run 404+ characters median
517, all ≥3 sentences, 0% under the 200-char/3-sentence floor). Parsed-row counts
verified to equal `# Item` counts and unique ids for all three files (47/47, 4/4,
47/47); question `library_ids` present and non-empty on all 47 items.

Two items (`pp1shamel2-q20-vulnerable-populations-except-dm`,
`pp1shamel2-q43-modifiable-determinants-except-gender`) print 5 options in the
source; kept at 5 rather than trimmed, since every option is a genuine, distinct list
member the source itself enumerates and this module's `>5 options trimmed and
documented` rule applies to sources printing more than 5, not exactly 5.

### Remaining scope after this pass

~60 further keyed items remain across pages 12-40 (see "Not authored this pass"
above), plus the Health/Wellness/Spectrum-of-health mini-topic (p.38, 3 clean items)
and the second, unresolved bioethics equity/justice item (p.15). Real remaining scope
for a follow-up pass on this same source.
