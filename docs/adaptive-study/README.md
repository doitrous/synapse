# Adaptive Study

Synapse selects the most useful next learning action while preserving exam
coverage, medical-content safety, student autonomy, and an auditable
explanation. It optimises **preparation quality** — not engagement volume, and
not a guaranteed exam result.

Everything in this document applies to Adaptive Study only. It reads from the
existing question bank, concept graph and timetable; it does not change them.

## The one structural decision

Two systems are measured independently, and conflating them is the failure this
whole design is built to prevent:

| | Adaptive Learning | Readiness Assessment |
|---|---|---|
| Answers | What should the student practise next? | How prepared are they? |
| Selection | Deliberately oversamples weakness and due reviews | Blueprint-balanced, held-out, timed |
| Feedback | Tutor (immediate) or Exam (on submit), student's choice | Always delayed. Cannot become Tutor |
| Reported as | A recommendation with a reason | A **range**, with per-topic uncertainty |

Practice-block accuracy is a biased estimator of exam performance — reliably
pessimistic, and getting more so the better selection works. It is never
reported as readiness. The north-star metric is future performance on unseen,
blueprint-balanced questions.

## Counting rule

**Three wrong answers on one concept are three attempts and one weak concept.**

One submitted response produces one immutable evidence event *per assessed
concept*. Three questions all mainly assessing `CON-A` therefore produce three
events sharing a `conceptId` — not three concepts. The errors raise that
concept's repair urgency through a bounded `recent_error_boost` term; they do
not manufacture additional weaknesses.

Both numbers are always shown together. A student shown only the smaller one
concludes the app has lost their mistakes.

## Files

Algorithms live in `src/data/adaptive/` and import nothing from the app, so they
run under `node --test` (which cannot resolve the `@/` alias). Anything needing
app types is a type-only import, which is erased at runtime.

| File | Responsibility |
|---|---|
| `config.ts` | Every tunable number, versioned, with dated change notes. Nothing elsewhere hardcodes a threshold. |
| `blueprint.ts` | Derives weights from `Concept.blueprintWeight` / `examWeightByYear`; applies admin overrides. |
| `evidenceLedger.ts` | Immutable, idempotent events, month-sharded like `attempts.ts`. |
| `masteryModel.ts` | Decayed Beta model. `rebuild` replays the ledger — nothing accumulates in place. |
| `misconceptions.ts` | Distractor → belief. Separate from not-knowing, because the repair differs. |
| `boosts.ts` | Capped, expiring nudges plus transfer-check obligations. |
| `coverage.ts` | Blueprint coverage and rolling debt. |
| `allocation.ts` | Largest-remainder apportionment of shares into slots. |
| `priority.ts` | The scored terms, each returned separately. |
| `blockBuilder.ts` | Seeded constrained greedy builder with bounded backtracking. |
| `readiness.ts` | Held-out reservation, blueprint-balanced assembly, Wilson intervals. |
| `schedule.ts` | The weekly plan (legacy requirement 029). |
| `crashCourse.ts` | Compressed programmes (legacy requirement 056). |
| `explain.ts` | Student-facing reasons and the published rules text. |
| `item.ts` / `itemProjection.ts` | The selector's view of an approved question. |

Hooks are in `src/lib/adaptive/`, surfaces in `src/components/adaptive/`,
`src/components/admin/adaptive/`, `src/pages/student/AdaptiveStudy.tsx` and
`src/pages/admin/AdaptiveSetup.tsx`.

## Decision loop

```
observe → validate attempt → update concept evidence → recalculate due/uncertain/weak
        → calculate blueprint debt → build constrained candidates → select
        → explain → measure transfer
```

## Allocation

Four needs, expressed as **targets, not pools**. One question may satisfy several
and always consumes one slot.

| Time to exam | Weak repair | Blueprint coverage | Spaced review | Calibration |
|---|---|---|---|---|
| > 60 days, or none scheduled | 45% | 25% | 20% | 10% |
| 15–60 days | 40% | 35% | 15% | 10% |
| ≤ 14 days | 25% | 50% | 15% | 10% |

Coverage is a **floor**, never a ceiling: every selected question counts toward
actual coverage whichever need bought its slot.

A 22-item block cannot represent four percentages exactly, so slots are
apportioned by largest remainder and the leftover is carried as coverage debt,
repaid across a rolling window rather than forced into one block.

### The alternative arm

A 50/30/15/5 allocation is documented in the source specification as a
comparison arm. It is **not** wired in as a live variant. Choosing between it and
the current 40/35/15/10 default requires held-out outcome data this deployment
does not have; shipping both and picking by in-block accuracy would select the
worse one, because in-block accuracy falls as weakness targeting improves.

## Priority score

```
priority(q,s) = 0.32 concept_weakness
              + 0.18 topic_or_subtopic_gap
              + 0.20 exam_blueprint_deficit
              + 0.12 spaced_review_urgency
              + 0.10 information_gain
              + 0.05 recent_error_boost
              + 0.03 novelty
              − repetition_penalty − exposure_penalty − fatigue_penalty
```

All weights are versioned launch hypotheses. Every term is logged separately.

**Concept weakness and hierarchy gap are different measurements.** Weakness is
scored from a concept's own evidence; the gap term reports only the breadth
*around* it that the concept's weakness does not already explain. Charging both
is how an adaptive engine convinces itself one struggling student is failing an
entire subject.

The boost multiplies the total only when it is already positive — multiplying a
negative score would make a poor question *worse* the more its concept needs
work.

## Mastery model

A decayed Beta model with conservative priors. IRT, Bayesian knowledge tracing,
multidimensional Elo and anything learned stay offline candidates until the item
pool and response data can beat transparent rules on held-out outcomes.

```
decay = 0.5 ^ (days_since_update / 60)
alpha = prior_alpha + decay × (old_alpha − prior_alpha) + evidence × correctness
beta  = prior_beta  + decay × (old_beta  − prior_beta)  + evidence × (1 − correctness)

evidence = concept_relevance × item_quality × attempt_validity × bounded_difficulty_credit
```

Difficulty credit is clamped to 0.75–1.25. Repeats after answer exposure
contribute at most 25% of normal weight. Blanks and timeouts are a separate
outcome, never a selected wrong answer. Response time alone never proves or
disproves knowledge — it only reduces how far an attempt may move an estimate.

### Statuses

| Status | Requires |
|---|---|
| Unmeasured | Fewer than 2 distinct valid questions |
| Attention | One recent error — a follow-up, **not** a weakness label |
| Weak | Mean < 0.55 with ≥ 2 distinct questions, **or** 2 high-confidence misconceptions |
| Developing | Measurable, neither weak nor secure |
| Secure | Mean ≥ 0.75, ≥ 4 distinct questions, **and** a successful review ≥ 48h later |
| Review due | Previously secure, personalised review date passed |

The blueprint proposes three distinct questions as a possible minimum for
secure. Four is the safer operational default; three remains available as a
labelled pilot toggle in the admin console until validation resolves it.

## After a wrong answer

One response, several independent retry-safe consumers: attempt ledger, mastery
evidence, spaced repetition, temporary boost, resource highlighting, misconception
tracking, targeted intervention, explanation, analytics.

The boost is 1.05×, capped at 1.15× stacked, surviving three *eligible* blocks —
decremented only when a block could genuinely have served the concept. It is
cancelled by two distinct repair questions including one spaced success; the
question that exposed the weakness is never its own repair.

A 5% nudge may not reorder a 20-item block at all. That is why a repeated or
high-confidence error **also** creates a transfer-check obligation due within two
eligible blocks. The obligation is the guarantee; the multiplier is only the
preference.

Watching a resource schedules a transfer check. It never clears a weak status —
only new independent question evidence does.

## Hard constraints

Evaluated **before** any scoring. A high score never admits a failing item.

Never relaxed, at any pool size: content approval; university, year and module
scope; language and accessibility; held-out readiness items excluded from
practice.

Relaxed in this published order when the pool cannot satisfy everything, each
relaxation recorded and raising a shortage event: novelty → difficulty mix →
consecutive-topic limit → unseen share → concept cap → exposure cap → quota
tolerance.

A need nothing in the pool can serve is a different failure: relaxing a
constraint cannot conjure a weak concept for a student who has none. Those slots
are redistributed to needs that can be met, and the redistribution is reported.

Blocks are **never** filled silently with whatever topic has the most questions.

## Readiness

Blueprint-balanced, timed, mixed, drawn from held-out items, excluding anything
practised in the last 30 days, with no adaptive substitution once started.

Reservation is an admin flag; failing that, a deterministic hash reserves a
stable share of each concept's pool. Concepts with fewer than five questions
reserve none — a blueprint node with nothing left to practise teaches nobody.

Scores are Wilson intervals, chosen over the normal approximation because that is
wrong exactly where it matters: small samples and proportions near 0 or 1. A
topic with too few answers reports **no** interval rather than a meaningless one.
Groups the pool could not represent are named rather than backfilled from
elsewhere — a 40-item assessment that quietly became 20 cardiology items is not
blueprint-balanced.

Omissions are excluded from the accuracy denominator and reported separately.

## Planning

**Weekly (029).** Capacity carries a buffer taken *after* fixed university
events. Assessments and practical stations never sit back to back. Tasks come in
minimum / recommended / stretch tiers so a bad day still has a defined win. A
missed day is partly forgiven, not fully carried. Work that cannot be placed is
**reported**, not dropped — including the readiness assessment, which is drafted
first precisely so a tight week places it before anything else competes.

**Crash courses (056).** 75 / 60 / 30 / 14-day horizons compress the same
blueprint and the same evidence model. They do not swap it for "high-yield only",
which in practice means whichever topics happen to have the most questions.
Prerequisites are ordered before dependents — teaching a dependent first produces
a wrong answer the model then records as a weakness in the wrong concept. The
programme's claim narrows automatically as coverage falls, and concepts with no
approved questions are listed rather than silently omitted.

No readiness promise is ever derived from plan completion.

## Governance

The student-facing "How this works" tab publishes the governing principles and
the live configuration: the separation of the two systems, wrong attempts versus
weak concepts, the current allocation, the relaxation order, status definitions,
evidence date, and the config version behind every figure.

Deliberately not published: item parameters, held-out answers, other students'
data, fraud thresholds. The principles are public; the levers are not.

Material changes need a dated change note, applied automatically on publish.
Publishing changes future selection; it does not recompute historical scores
under the new model. A recomputation is a separate, clearly labelled operation.

## Validation scorecard

Tracked, all currently reporting "not measurable yet" because the held-out
response history does not exist in this deployment. An empty scorecard is a
finding, not an oversight.

Learning gain on matched held-out items · retention at 7/14/21/30/45 days ·
readiness calibration and interval coverage · blueprint coverage, debt and
unmeasured count · weak-concept resolution time and false-red rate · resource
completion followed by successful transfer · exposure concentration and pool
utilisation · abandonment, time burden and fatigue · subgroup calibration.

Practice-block accuracy is explicitly excluded.

## Tests

`npm run test` — 127 tests in `src/data/adaptive/*.test.ts`, written against the
safety rules rather than the implementation. Notably: every block size 20–40
apportions exactly; an out-of-scope or held-out item can never enter a block
whatever it scores; no more than two items per dominant concept; no more than
three consecutive from one topic; a stored seed reproduces the exact block; a
short pool raises a shortage rather than filling silently; three wrong answers on
one concept produce one weak concept; a readiness assembly and an adaptive pool
never overlap.
