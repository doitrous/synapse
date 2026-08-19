# One plan catalog, and a student's first ten minutes

Date: 2026-08-19
Status: approved design, not yet planned
Scope: landing page, admin console, sign-up, student onboarding

## Problem

**Plans are defined twice and agree by luck.** `src/data/plans.ts` holds a
`PlanDef[]` the admin console edits and Billing reads. `src/pages/landing/content.ts`
holds a separate `Plan[]`, hardcoded, in English and Arabic, with a price table
per billing period, a featured tier, a secondary row of offers, and a
hand-written comparison table. The landing page reads only the second. Editing a
price in the admin console therefore changes what a paying student is charged
and leaves the public page advertising the old number.

**Sign-up collects a name and an email and stops.** There is no phone number, no
nationality, and nothing prevents the same person registering twice under two
addresses. `students.email` is `UNIQUE`; nothing else is.

**Nothing asks a new student where they study or what they want.** The existing
`StudentOnboarding` is a dismissible modal that asks for a university and a year
and can be waved away with "Not now", leaving every scoped surface empty. No
plan is ever chosen, and no trial is ever granted, so a new account has no
entitlement and no reason to come back tomorrow.

## Decisions taken

Settled during brainstorming; not open in planning.

| Decision | Choice |
|---|---|
| Bilingual plan text | The admin edits **English and Arabic** for every plan. Neither page falls back to the other language. |
| Plan axis | **Feature tiers are kept; duration becomes the billing axis.** |
| Choosing a paid plan | Starts a **3-day trial** with full access, recording the chosen plan. No payment processing. |
| Phone | **Required and unique, not verified.** Email remains the verified channel. |
| Coupons | **Out of scope.** Dropped at the user's request. |

### How the plan axis reconciles with "free, 1 month, 1 term, year"

Feature tiers stay (Free, QBank, Adaptive — renameable and extensible from the
admin console). The billing control changes from `monthly · quarterly · yearly`
to **`1 month · 1 term · 1 year`**, and the year period is marked coming soon, so
it is shown and priced but cannot be bought. "The free plan" is the Free tier;
"the 1 month / 1 term / year plan" is the same product at three commitments.

## Part C1 — one plan catalog

### Model

New `src/data/planCatalog.ts`. It replaces `src/data/plans.ts` outright and takes
the `tiers`, `more` and `compare` data out of `content.ts`.

```ts
/** Text the admin writes twice, because both landing pages are first-class. */
export interface Bilingual { en: string; ar: string }

export interface BillingPeriodDef {
  id: string                 // 'month' | 'term' | 'year'
  label: Bilingual
  billedAs: Bilingual        // "billed every term"
  /** Months this period covers — drives per-month equivalence and the saving. */
  months: number
  /** Priced and shown, but not purchasable yet. This is the year plan. */
  comingSoon?: boolean
}

export interface CatalogPlan {
  id: string
  name: Bilingual
  entitlement: Bilingual
  /** Feature lines. The comparison table is built from these, not written twice. */
  features: Bilingual[]
  /** Period id → price. An absent period is not sold for this plan. */
  prices: Record<string, number>
  /** Shown instead of a price where there is no list price (campus, cohort). */
  quoted?: Bilingual
  /** `primary` plans are the tiers and the comparison columns; `secondary` is the row beneath. */
  prominence: 'primary' | 'secondary'
  featured?: boolean
  badge?: Bilingual
  /** The whole plan is announced but not yet available. */
  comingSoon?: boolean
  /** Off hides it from the landing page and from onboarding entirely. */
  active: boolean
  /** Existing targeting, preserved: empty means everyone. */
  universityIds: string[]
  years: string[]
}

export interface PlanCatalog {
  periods: BillingPeriodDef[]
  plans: CatalogPlan[]
}

export const PLAN_CATALOG_STORAGE_KEY = 'synapse-plan-catalog-v1'
```

`comingSoon` exists at two levels because the two cases are different: a period
that nobody can buy yet across every tier (the year plan), and a single plan
being announced ahead of launch. A plan is purchasable at a period only when
neither says otherwise — one predicate, `isPurchasable(plan, period)`, so no
caller can check one and forget the other.

### Derived, never stored

- `priceAt(plan, periodId)` — the price, falling back to the longest shorter
  period the plan is actually sold at, as `priceFor` does today.
- `perMonth(amount, period)` — `amount / period.months`.
- `savingPercent(plan, period, periods)` — against the shortest period's price,
  rounded down so the page never claims more than the offer gives.
- `monthlyEquivalent(plan)` — the per-month figure Payments & Finance reports
  revenue with, replacing `PlanDef.priceEGP`.
- `compareRows(catalog, lang)` — the union of every primary plan's features, in
  first-seen order, each row marking which plans carry it. The hand-written
  `compare` groups in `content.ts` are deleted; the table can no longer disagree
  with the plans above it.

### What stays in `content.ts`

Section chrome only — the heading, the subheading, the refund line, the
"a month, equivalent" and "Save" labels, the currency, the word for free, and
the two section titles. That is translation copy, not admin content. The plan
data leaves.

### Migration

On first read, if `PLAN_CATALOG_STORAGE_KEY` is empty, the catalog is seeded from
the current English and Arabic `content.ts` plans joined by id, with
`quarterly → term` and `monthly/yearly` kept. Any plan present in the stored
`synapse-plans-v1` `PlanDef[]` but absent from the seed is carried over as a
`secondary`, English-only plan with its Arabic left equal to its English, so an
admin's existing edits are not silently dropped. `synapse-plans-v1` is left in
place, unread, so the migration can be re-run and a rollback loses nothing.

Seeding also applies the changes requested: periods become `1 month`, `1 term`,
`1 year`; the year period is `comingSoon`; and the Free tier's entitlement copy
loses its claim of "a 7-day full Adaptive trial", which is now three days.

### Admin editor

Payments & Finance keeps the plan list but edits the catalog: per plan, English
and Arabic name, entitlement and badge side by side, a feature list with add and
remove, a price per period, prominence, featured, coming-soon, active, and the
existing university and year targeting. Periods are editable too — label, billed-as,
months, and coming-soon — because "the year plan is coming soon" is a fact about
a period, not about a plan.

### Consumers

`src/pages/landing/Pricing.tsx` renders from the catalog in the active language.
`src/pages/student/Billing.tsx` and `src/pages/admin/PaymentsFinance.tsx` read it
instead of `PlanDef[]`.

## Part C2 — sign-up and onboarding

### Sign-up fields

Name (required), email (required, verified as now), **phone (required)**,
**nationality (optional)**.

Phone is normalised before comparison and storage: whitespace, hyphens and
brackets stripped, a leading `00` rewritten to `+`. Two students who type the
same number differently are the same student, and a uniqueness check that
compared raw strings would not have noticed.

### Duplicate registration

A duplicate email or phone does not raise an error in place. The form sends the
visitor to `/login` with that identifier already filled in and a line saying the
account exists — which is what someone re-registering actually wants.

The check runs **before** Supabase is asked to create the account, so a rejected
sign-up never leaves an auth user with no roster row behind it.

Server:

- `students` gains `phone VARCHAR(32) UNIQUE` and `nationality VARCHAR(64)`.
- `POST /accounts/exists` takes an email or a phone and answers whether it is
  taken, and nothing else. It reports no name, no id, and no other field: a
  public endpoint that confirms an address exists is already the most it should
  say, and anything more is an enumeration tool.

In demo mode, with no server, the check runs against the local roster so the flow
is exercisable without a backend.

### The onboarding flow

A blocking, full-screen flow after account creation, resumable if abandoned.

1. **University** — only universities that are live (`active !== false`).
2. **Year** — only live years of that university, read through `isYearLive`, so
   a year switched off in Academic Setup is not offered. Choosing a year lists
   that year's modules, read-only, so the student can see what they are signing
   up to study before they pay for it.
3. **Plan** — the catalog's active plans for that university and year, at the
   three periods. A coming-soon plan or period is shown and cannot be chosen.

Finishing writes the audience (university, year, group) and grants a
**3-day trial**: a subscription with status `trialing`, `source: 'trial'`, the
chosen plan recorded, and `expires_at` three days out. `entitlementOf` already
derives `trialing` and its expiry at read time, so nothing new has to run for the
trial to end on time.

The existing dismissible `StudentOnboarding` modal is removed. It asked a subset
of the same questions and let the student skip them, which is how accounts ended
up with no audience at all.

### Student ID upload

An admin setting, off by default: whether to offer it, and the discount percent
(default 5). It is **never** part of onboarding. When enabled it appears on the
student's Billing page as an upload that claims the discount. When disabled it
appears nowhere and no student can tell it exists.

## Testing

Pure logic under `node --test`, matching the repo's convention — no component
tests exist and none are introduced.

`src/data/planCatalog.test.ts`

- `priceAt` returns the exact price, and falls back to the longest shorter period
  a plan is sold at; null when the plan has no price at all.
- `perMonth` divides by the period's months.
- `savingPercent` is null for a free plan, for the shortest period, and where the
  longer commitment is not actually cheaper; otherwise rounded down.
- `isPurchasable` is false when the plan is coming soon, when the period is
  coming soon, when the plan is inactive, and when the plan is not sold at that
  period; true otherwise.
- `compareRows` unions features across primary plans in first-seen order, marks
  which plans carry each, and ignores secondary plans.
- `monthlyEquivalent` matches the shortest-period price for a plan sold monthly.
- Seeding from the landing content produces both languages for every plan, marks
  the year period coming soon, and is idempotent.
- A `PlanDef` present only in the old store is carried over rather than dropped.

`src/data/accountIdentity.test.ts`

- Phone normalisation strips spaces, hyphens and brackets, and rewrites a leading
  `00` to `+`.
- Two differently-typed spellings of one number compare equal.
- An email compares case-insensitively and trimmed.
- A blank or malformed phone is rejected rather than normalised into something.

`src/data/onboarding.test.ts`

- Only live universities and live years are offered, using `isYearLive`.
- A year switched off is excluded even when its university is live.
- Plans are filtered by the student's university and year targeting.
- A coming-soon plan or period is offered but not selectable.
- Completing produces a trial of exactly 3 days from the given start.

## Files

Part C1 — new

- `src/data/planCatalog.ts`, `src/data/planCatalog.test.ts`
- `src/data/planCatalogSeed.ts` — the seed and migration, kept out of the model

Part C1 — modified

- `src/pages/landing/content.ts` — plan data removed, chrome copy kept
- `src/pages/landing/Pricing.tsx` — renders the catalog in the active language
- `src/lib/pricing.ts` — periods come from the catalog rather than a fixed map
- `src/pages/admin/PaymentsFinance.tsx` — edits the catalog
- `src/pages/student/Billing.tsx` — reads the catalog
- `src/data/plans.ts` — deleted once nothing imports it

Part C2 — new

- `src/data/accountIdentity.ts` + test — normalisation and the uniqueness question
- `src/data/onboarding.ts` + test — what may be offered, and what completing grants
- `src/pages/onboarding/Onboarding.tsx` and its three steps

Part C2 — modified

- `src/pages/auth/Signup.tsx` — phone, nationality, the pre-flight check, the
  hand-off to `/login`
- `src/pages/auth/Login.tsx` — accepts a prefilled email or phone
- `src/router.tsx` — the onboarding route
- `src/components/onboarding/StudentOnboarding.tsx` — deleted
- `server/schema.sql`, `server/src/accounts.js` — phone and nationality columns,
  the uniqueness endpoint, the trial grant
- `src/pages/admin/Settings.tsx` — the student-ID discount toggle and percent
- `src/pages/student/Billing.tsx` — the upload, when enabled

## Out of scope

- **Payment processing.** No card is taken anywhere. Choosing a paid plan starts
  a trial and records intent.
- **SMS verification.** Phone is collected and enforced unique, not proven.
- **Coupons.** Dropped at the user's request.
- **Resource storage limits and offline downloads** — a separate sub-project.
- **An Android app.** None exists in this repository.
