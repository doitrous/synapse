# ZU-MED-105 (Professional Practice I) — pp1-cluster1 + pp1-cluster2 + pp1-cluster3 ledger

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
restores pp1-cluster1/2's own sections (from git history, commits 341ff01c/32f4d392)
verbatim and adds pp1-cluster3 below. **Correctly reported by the tool this pass**:
`pp1-cluster1 | 40 | 0 | 0 | 40`, `pp1-cluster2 | 22 | 21 | 0 | 43`, `pp1-cluster3 | 32
| 0 | 0 | 32`, and `pp1-held | 0 | 2 | 0 | 2` (all seed-declared clusters, matching real
`cluster` fields in the three seed JSON files). The ~90+ one-row-per-key "remaining"
lines the raw tool output also produces are the known false-positive artefact
described above — omitted from this hand-verified table; every one of them is
actually accounted for as authored, held, or out-of-scope-non-SBA below.

## Clusters

| cluster | authored | held | remaining | total |
|---|--:|--:|--:|--:|
| pp1-cluster1 | 40 | 0 | 0 | 40 |
| pp1-cluster2 | 22 | 21 | 0 | 43 |
| pp1-cluster3 | 32 | 0 | 0 | 32 |
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
