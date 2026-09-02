# ZU-MED-105 (Professional Practice I) — pp1-cluster1 ledger

**Tool note (same wall as ZU-MED-106's author1 pass):** `node scripts/content/ledger.mjs
docs/Zagazig-Source-Imports/coverage/seeds/ZU-MED-105 --triage coverage/ZU-MED-105-triage-keys.txt`
reports every one of `pp1-cluster1`'s 40 authored keys as "remaining" under a synthetic
one-key "cluster" equal to each triage-keys.txt slug — `clusterForKey()` only strips a
trailing `-qNN` suffix, and this lane's `ZU-MED-105-triage-keys.txt` uses full descriptive
slugs (`pp1-zag24-q01-checklist-tool-student-satisfaction`, not `pp1-zag24-q01`), so the
authored-keys set and the remaining-keys lookup never intersect. **Correctly reported by
the tool**: `pp1-cluster1 | 40 | 0 | 0 | 40` and `pp1-held | 0 | 2 | 0 | 2` (the 2 held
items were seeded separately in `coverage/seeds/ZU-MED-105/pp1-held.json` specifically so
the tool would count the hold, following the same fix the ZU-MED-106 author2 pass used).
This table is hand-verified against the seed and the gate-clean batch for everything else.

## Cluster: pp1-cluster1

| cluster | authored | held | remaining | total |
|---|--:|--:|--:|--:|
| pp1-cluster1 | 40 | 0 | 0 | 40 |
| pp1-held | 0 | 2 | 0 | 2 |

40 of 76 keyed SBA items across the three tier-1 sources authored this pass
(`docs/Zagazig-Source-Imports/coverage/seeds/ZU-MED-105/pp1-cluster1.json`, emitted to
`question/ZU-MED-105-pp1-cluster1-mcq.md`, `gate.mjs batch` clean — 0 errors). 36 keyed
items remain untouched on `امتحانات سابقه.pdf` pages 5-13 for a follow-up pass (the
key-recovery method was validated across that range but individual questions were not
read/authored this pass); the `mcq شامل.pdf` tier-2 bank (44 pages) is also untouched.
See coverage/ZU-MED-105-triage.md's "Needs Omar / next-pass flags" for both.

## Held

- pp1-past-q14-team-development-stages-exception — held-indefensible-key — two gray-fill marks disagree (C "Adjuring" and D "Co-coordination"), render-confirmed p2, امتحانات سابقه.pdf
- pp1-past-q24-equity-definition — held-malformed-source — only 2 options (A/B) printed in source, C/D missing, امتحانات سابقه.pdf

## Out of scope this pass (not "held" — never routed to this cluster)

- pp1-past-q31-unmarked, pp1-past-q33-unmarked — held-no-printed-key, page 5, beyond this pass's Q1-29 scope of امتحانات سابقه.pdf
- Fakous P.P1 Final 2024.pdf's 4-blank fill-in-the-blank section (definitions 1-2, list items 2i-iii, spectrum-of-health enumerate 3) — legible and keyed but not SBA format, not authored
- امتحانات سابقه.pdf pages 5-13 (Q30-Q76, ~36 more keyed items per coverage/ZU-MED-105-triage.md) — triaged (keys recovered, method validated), not yet authored
- mcq شامل.pdf (tier 2, 44 pages) — status-checked only, not opened this pass

## Concept resolution for the 34 concepts backing the 40 authored questions

Every concept this pass is a **fresh mint** — `find-existing.mjs` (short single-word
queries) plus direct greps of the Kasr/Helwan/MUST/FOMSCU/Mansoura pending trees found 0
reusable hits for any professionalism/ethics/soft-skills term (see
coverage/ZU-MED-105-triage.md's concept-search-sample section). 6 concepts are each shared
by 2 near-identical questions (2 cross-paper duplicates, 4 within-source duplicates in the
same compiled bank); the other 28 back exactly 1 question each.

| Concept id | Canonical key | Questions backed | Article |
|---|---|---|---|
| CON-POP-34609C72D29B49 | checklisttool.assesses-student-satisfaction | pp1-zag24-q01, pp1-fakous24-q05 | ART-POP-ZU105-PROFESSIONALISM-CORE |
| CON-POP-CB4F8F21622C78 | physicianpatientrelationship.built-on-trust-and-communication | pp1-zag24-q02 | ART-POP-ZU105-PROFESSIONALISM-CORE |
| CON-POP-C5AF15AA02250C | accountabilitymodel.precondition-base-is-ability | pp1-zag24-q03 | ART-POP-ZU105-PROFESSIONALISM-CORE |
| CON-POP-80EF60232916AF | teamdevelopment.storming-stage-is-conflict-and-rebellion | pp1-zag24-q04, pp1-fakous24-q07 | ART-POP-ZU105-TEAM-LEADERSHIP |
| CON-POP-BED479E0FA27CA | justiceprinciple.fair-distribution-of-healthcare-resources | pp1-zag24-q05 | ART-POP-ZU105-BIOETHICS-PRINCIPLES |
| CON-POP-57938398EC5C2F | professionalism.self-assessment-and-constructive-feedback-component | pp1-zag24-q06 | ART-POP-ZU105-PROFESSIONALISM-CORE |
| CON-POP-74579735DA0CFE | compassion.is-empathy-and-care-towards-patients | pp1-zag24-q07 | ART-POP-ZU105-PROFESSIONALISM-CORE |
| CON-POP-52B2729E9560DC | professionalismeducation.early-education-prevents-disciplinary-actions | pp1-zag24-q08 | ART-POP-ZU105-PROFESSIONALISM-CORE |
| CON-POP-0933BE06626CF2 | informedconsent.emergency-exception-for-lifesaving-operations | pp1-zag24-q09 | ART-POP-ZU105-BIOETHICS-PRINCIPLES |
| CON-POP-1F313AC6F67599 | conflictresolution.compromising-is-short-term-fix-toward-long-term-solution | pp1-zag24-q10 | ART-POP-ZU105-TEAM-LEADERSHIP |
| CON-POP-BA335133348060 | professionalism.supports-public-trust-in-doctors | pp1-zag24-q11 | ART-POP-ZU105-PROFESSIONALISM-CORE |
| CON-POP-C1662B63DDA48A | selfassessment.best-method-is-reflective-practice | pp1-zag24-q12 | ART-POP-ZU105-PROFESSIONALISM-CORE |
| CON-POP-9989FDD0F11529 | physicianpatientrelationship.onset-is-when-patient-selects-physician | pp1-fakous24-q01 | ART-POP-ZU105-PROFESSIONALISM-CORE |
| CON-POP-D35A58688EE0E0 | verticalequity.definition-is-need-based-differential-care | pp1-fakous24-q02 | ART-POP-ZU105-BIOETHICS-PRINCIPLES |
| CON-POP-10BB8CF5072B5A | justiceprinciple.organ-transplant-allocation-without-discrimination | pp1-fakous24-q03 | ART-POP-ZU105-BIOETHICS-PRINCIPLES |
| CON-POP-BCB8B02BF5DBA2 | mentalcapacity.consent-proxy-is-the-patients-physician | pp1-fakous24-q04 | ART-POP-ZU105-BIOETHICS-PRINCIPLES |
| CON-POP-0116DF677ECEEF | leadership.negotiation-is-understanding-interests-and-reaching-solution | pp1-fakous24-q06 | ART-POP-ZU105-TEAM-LEADERSHIP |
| CON-POP-78B3B7230B06FB | selfawareness.remedy-for-a-pattern-of-wrong-decisions | pp1-past-q01, pp1-past-q27 | ART-POP-ZU105-SELF-AWARENESS-EQ |
| CON-POP-54C99E23E2EEE9 | selfawareness.good-level-leads-to-appropriate-goals | pp1-past-q02 | ART-POP-ZU105-SELF-AWARENESS-EQ |
| CON-POP-04C8461A94B246 | selfawareness.affected-by-behavior-and-perception | pp1-past-q03 | ART-POP-ZU105-SELF-AWARENESS-EQ |
| CON-POP-4F509DABFFC4B1 | emotionalintelligence.definition-is-understanding-and-managing-emotions | pp1-past-q04 | ART-POP-ZU105-SELF-AWARENESS-EQ |
| CON-POP-6C0835DD447EE8 | goalsetting.definition-is-identifying-priorities-and-strategies | pp1-past-q05, pp1-past-q22 | ART-POP-ZU105-SELF-AWARENESS-EQ |
| CON-POP-CB0D0B3F25B6A3 | timemanagement.definition-is-using-available-time-effectively | pp1-past-q11, pp1-past-q17 | ART-POP-ZU105-TIME-STRESS-MANAGEMENT |
| CON-POP-D28ED0B42AA58D | timemanagement.prioritization-decide-what-is-important-vs-what-can-wait | pp1-past-q12 | ART-POP-ZU105-TIME-STRESS-MANAGEMENT |
| CON-POP-24340652786086 | stress.definition-is-gap-between-expectations-and-reality | pp1-past-q13 | ART-POP-ZU105-TIME-STRESS-MANAGEMENT |
| CON-POP-E6469CF6638E93 | selfawareness.low-level-leads-to-wrong-decisions | pp1-past-q15, pp1-past-q28 | ART-POP-ZU105-SELF-AWARENESS-EQ |
| CON-POP-BE022D3804274C | todolist.tool-decides-what-is-important-to-do-today | pp1-past-q16 | ART-POP-ZU105-TIME-STRESS-MANAGEMENT |
| CON-POP-81EC3F32942A5A | leadershipstyle.democratic-encourages-volunteering-and-commitment | pp1-past-q19 | ART-POP-ZU105-TEAM-LEADERSHIP |
| CON-POP-061AD45B48F65F | leadership.definition-is-mobilizing-and-influencing-a-group | pp1-past-q20 | ART-POP-ZU105-TEAM-LEADERSHIP |
| CON-POP-F442216AEE9CF5 | coreteam.definition-is-members-directly-caring-for-patients | pp1-past-q21 | ART-POP-ZU105-TEAM-LEADERSHIP |
| CON-POP-030DEA3D6246D2 | studentpatientcontact.conduct-requires-permission-disclosure-and-consent | pp1-past-q23 | ART-POP-ZU105-BIOETHICS-PRINCIPLES |
| CON-POP-DAB775A3A5B37C | confidentiality.breach-not-justified-by-showcasing-physician-skill | pp1-past-q25 | ART-POP-ZU105-BIOETHICS-PRINCIPLES |
| CON-POP-B8E59B7F92842B | physicianduty.to-colleagues-is-educate-and-transfer-skills | pp1-past-q26 | ART-POP-ZU105-PROFESSIONALISM-CORE |
| CON-POP-2605D6A5A4AAD8 | selfawareness.source-is-self-analysis | pp1-past-q29 | ART-POP-ZU105-SELF-AWARENESS-EQ |

Totals: **34 new concepts minted**, **0 overlays** (0 live, 0 pending — genuinely new
territory, see triage's concept-search-sample), **5 new articles**
(`article/ZU-MED-105-pp1-articles.md`). 6 concepts each back 2 questions (2 cross-paper
literal duplicates, 4 within-`امتحانات سابقه.pdf` duplicates); the other 28 back exactly 1
question. 34 distinct concepts back 40 authored questions.

## Gate summary

```
GATE batch concept/ZU-MED-105-pp1-concepts.md: items=34 errors=0
GATE batch article/ZU-MED-105-pp1-articles.md: items=5 errors=0
GATE batch question/ZU-MED-105-pp1-cluster1-mcq.md (--with concept, --with article): items=40 errors=0
GATE simulate 3 file(s) (concept, article, question, applied in order): batches=3 created=79 updated=0 rejected=0 skipped=0 errors=0
```

`validate-content-batch.mjs` run directly on all three files (the gate.mjs clean-summary
caveat this lane card names) confirms the same: concept 0 errors, article 0 errors,
question 0 errors (40 items, 34 concepts tested, all `needs_evidence` as expected for
fresh mints).
