# ZU-MED-105 (Professional Practice I) — pp1-cluster1 + pp1-cluster2 ledger

**Tool note (same wall as pp1-cluster1's own note, and ZU-MED-106's author1 pass):**
`node scripts/content/ledger.mjs docs/Zagazig-Source-Imports/coverage/seeds/ZU-MED-105
--triage coverage/ZU-MED-105-triage-keys.txt` reports every authored/held key as
"remaining" under a synthetic one-key "cluster" equal to each triage-keys.txt slug —
`clusterForKey()` only strips a trailing `-qNN` suffix, and this lane's
`ZU-MED-105-triage-keys.txt` uses full descriptive slugs (e.g.
`pp1-past-q39-leadership-style-selection-factors`, not `pp1-past-q39`), so the
authored-keys set and the remaining-keys lookup never intersect. **Correctly reported
by the tool**: `pp1-cluster1 | 40 | 0 | 0 | 40`, `pp1-cluster2 | 22 | 21 | 0 | 43`, and
`pp1-held | 0 | 2 | 0 | 2` (all seed-declared clusters, matching real `cluster` fields
in the seed JSON). The ~90 one-row-per-key "remaining" lines the raw tool output also
produces are the known false-positive artefact described above — omitted from this
hand-verified table; every one of them is actually accounted for as authored, held, or
out-of-scope-non-SBA below.

## Clusters

| cluster | authored | held | remaining | total |
|---|--:|--:|--:|--:|
| pp1-cluster1 | 40 | 0 | 0 | 40 |
| pp1-cluster2 | 22 | 21 | 0 | 43 |
| pp1-held | 0 | 2 | 0 | 2 |

pp1-cluster1 (landed 341ff01c): 40 of 76 keyed SBA items across the three tier-1
sources, pages 1-4 of امتحانات سابقه.pdf plus both Final papers in full. See this
file's prior revision (git history) or `coverage/ZU-MED-105-triage.md` for its own
concept table.

pp1-cluster2 (this pass): 22 of the ~36 keyed items on امتحانات سابقه.pdf pages 5-13
(Q30-76) authored; 21 held (13 duplicates of pp1-cluster1's 40, 7 unmarked, 1
malformed); 4 further items (Q65-67, Q76 — definitions/enumerate/fill-in-the-blank)
are out of scope, not single-best-answer format, not counted in either total. This
exhausts امتحانات سابقه.pdf; `mcq شامل.pdf` (tier-2 bank, 44 pages) remains
status-checked only, not opened, real remaining scope for a future pass.

## Held — pp1-cluster1 (unchanged from its own landed pass)

- pp1-past-q14-team-development-stages-exception — held-indefensible-key — two gray-fill marks disagree (C "Adjuring" and D "Co-coordination"), render-confirmed p2, امتحانات سابقه.pdf
- pp1-past-q24-equity-definition — held-malformed-source — only 2 options (A/B) printed in source, C/D missing, امتحانات سابقه.pdf

## Held — pp1-cluster2 (this pass, 21 items)

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

## Out of scope this pass (not "held" — never SBA format)

- pp1-past-q65-define-terms, pp1-past-q66-list-items, pp1-past-q67-spectrum-of-health-enumerate, pp1-past-q76-complete-statements — definitions/list/enumerate/fill-in-the-blank, not single-best-answer format, matching pp1-cluster1's own treatment of Fakous P.P1's non-SBA section
- `mcq شامل.pdf` (tier 2, 44 pages) — status-checked only, not opened this pass, real remaining scope for a future pass

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

## Gate summary — pp1-cluster2 (this pass)

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
