# Pricing Single Source of Truth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Make the plan catalog (`nishany-plan-catalog-v1`) and the voucher document (`nishany-vouchers-v1`) the single source of truth for every price, promo and voucher discount shown anywhere — landing pricing page, `/api/pricing/quote`, and every admin screen — with no second place a price can be set.

**Architecture:** Prices and promos live on the plan catalog's `maristana` plan (`prices.month`/`prices.term` + new optional `promo.month`/`promo.term`), edited once in `PlanCatalogEditor` and read by the public pricing page via `usePlanCatalog()`. Vouchers live in the separate `nishany-vouchers-v1` document (`src/data/vouchers.ts`), gaining an optional `periodPrices` for a fixed absolute target price. The backend (`server/src/pricing.js`, a separate Node/Express process with no shared code with the Vite frontend) re-reads both `app_state` documents directly and duplicates the same promo-rounding and voucher-discount math in plain JS, so `/api/pricing/quote` always agrees with what the page displays. The old SQL `pricing_promotions`/`pricing_vouchers` system is left in the schema, unused, and its admin UI is retired.

**Tech Stack:** TypeScript + Vite + React frontend, Express + raw `mysql2/promise` backend, MariaDB `app_state` KV store, Node's built-in test runner.

**Spec:** docs/superpowers/specs/2026-09-03-landing-pricing-subscriber-count-design.md (this plan implements spec section 1 "Pricing single source of truth" and section 2 "Vouchers" only — spec sections 3 "Live subscriber count" and 4 "Landing rebuild" are separate plans, out of scope here)

## Global Constraints

- TypeScript + Vite + React (react-router v7)
- Tailwind v4 tokens live in `src/index.css` `@theme` (warm theme)
- Backend is Express + raw `mysql2/promise` (no ORM), schema in `server/schema.sql` applied idempotently at boot
- Settings persist as versioned JSON in the `app_state` table via `/api/state/:key`
- Superadmin = env allowlist (`requireSuperAdmin`), Settings page is superadmin-only
- EGP currency
- No payment gateway exists (quote only, subscriptions granted manually)
- Test runner is Node's built-in `node --test`. Frontend: `node --experimental-strip-types --test <file>` (matches `package.json`'s `"test": "node --test --experimental-strip-types \"src/**/*.test.ts\""`). Backend: `node --test <file>`, run from `server/` (matches `server/package.json`'s `"test": "node --test src/*.test.js"`)
- `src/` and `server/` are two separate Node processes with no shared imports — any math that must agree on both sides (promo rounding, voucher discount) is written twice, once per side, deliberately

---

### Task 1: Plan catalog promo model

**Files:**
- Modify: `src/data/planCatalog.ts` (add `promo` to `CatalogPlan` interface after `prices` at line 69; add `promoPrice()` after `priceAt()`, which ends at line 146)
- Modify: `src/data/planCatalogSeed.ts` (add `promo` to the `maristana` plan literal, right after `prices: { month: 400, term: 1000 },` at line 134)
- Test: `src/data/planCatalog.test.ts`, `src/data/planCatalogSeed.test.ts` (both already exist — extend, don't create)

**Interfaces:**
- Consumes: `CatalogPlan.prices: Record<string, number>` (existing)
- Produces: `CatalogPlan.promo?: { month?: { enabled: boolean; percentOff: number }; term?: { enabled: boolean; percentOff: number } }`; `promoPrice(plan: CatalogPlan, periodId: string): number | null`

- [ ] **Step 1: Write the failing test for `promoPrice`**

  Add to `src/data/planCatalog.test.ts`. First widen the existing import line 3-6 to include `promoPrice`:

  ```ts
  import {
    compareGroups, compareRows, findPlan, isPurchasable, monthlyEquivalent, monthlyPriceFor, offerSelectionFromSearch, perMonth, periodById, plansFor, priceAt, promoPrice, purchasableAt,
    savingPercent, say, signupPathForOffer, type BillingPeriodDef, type CatalogPlan, type PlanCatalog,
  } from './planCatalog.ts'
  ```

  Then add these tests in the "Price" section, after the `perMonth`/`periodById` tests (after line 77):

  ```ts
  test('promoPrice rounds a percent-off promo to the nearest whole EGP', () => {
    const withPromo = plan({
      prices: { month: 400, term: 1000 },
      promo: { month: { enabled: true, percentOff: 25 }, term: { enabled: true, percentOff: 30 } },
    })
    assert.equal(promoPrice(withPromo, 'month'), 300)
    assert.equal(promoPrice(withPromo, 'term'), 700)
  })

  test('a disabled or absent promo leaves the base price alone', () => {
    assert.equal(promoPrice(plan({ prices: { month: 400 } }), 'month'), 400)
    const disabled = plan({ prices: { month: 400 }, promo: { month: { enabled: false, percentOff: 25 } } })
    assert.equal(promoPrice(disabled, 'month'), 400)
  })

  test('a period the plan has no price for has no promo price either', () => {
    assert.equal(promoPrice(plan({ prices: {} }), 'month'), null)
  })
  ```

- [ ] **Step 2: Run it, confirm it fails**

  ```
  node --experimental-strip-types --test --test-name-pattern="promoPrice" src/data/planCatalog.test.ts
  ```

  Expected FAIL: `promoPrice` is not exported from `./planCatalog.ts` (`SyntaxError`/`TypeError: promoPrice is not a function`, since strip-types does not type-check but the name genuinely does not exist at runtime).

- [ ] **Step 3: Implement `promo` field and `promoPrice()`**

  In `src/data/planCatalog.ts`, add to the `CatalogPlan` interface right after the `prices` field (line 69):

  ```ts
    /** Period id → price. An absent period is not sold for this plan. */
    prices: Record<string, number>
    /**
     * A launch/first-time offer per period. Absent or `enabled: false` means the
     * base price is what shows — a promo is never invented from thin air, only
     * ever an explicit admin choice.
     */
    promo?: {
      month?: { enabled: boolean; percentOff: number }
      term?: { enabled: boolean; percentOff: number }
    }
  ```

  Add this function right after `priceAt()` (after line 146, before `perMonth`):

  ```ts
  /**
   * The whole-EGP price after a plan's promo for a period, or the base price
   * when no promo is enabled there, or `null` when the plan is not sold at
   * that period at all — the same "not sold" fact `priceAt` reports, rather
   * than a promo inventing a price `priceAt` refuses to show.
   *
   * Rounded to the nearest whole EGP: 25% off 400 is 300, 30% off 1000 is 700.
   */
  export function promoPrice(plan: CatalogPlan, periodId: string): number | null {
    const base = plan.prices[periodId]
    if (base === undefined) return null
    const promo = periodId === 'month' ? plan.promo?.month : periodId === 'term' ? plan.promo?.term : undefined
    if (!promo?.enabled) return base
    const off = Math.min(100, Math.max(0, promo.percentOff))
    return Math.round(base * (1 - off / 100))
  }
  ```

- [ ] **Step 4: Run it, confirm it passes**

  ```
  node --experimental-strip-types --test --test-name-pattern="promoPrice" src/data/planCatalog.test.ts
  ```

  Expected PASS: 3 passing tests.

- [ ] **Step 5: Write the failing test for the maristana seed promo**

  Add to `src/data/planCatalogSeed.test.ts`, after the "the launch catalogue is versioned..." test (after line 30):

  ```ts
  test('the maristana promo is 25% off the month and 30% off the term', () => {
    const maristana = findPlan(initialPlanCatalog(), 'maristana')!
    assert.deepEqual(maristana.promo, {
      month: { enabled: true, percentOff: 25 },
      term: { enabled: true, percentOff: 30 },
    })
  })
  ```

- [ ] **Step 6: Run it, confirm it fails**

  ```
  node --experimental-strip-types --test --test-name-pattern="maristana promo" src/data/planCatalogSeed.test.ts
  ```

  Expected FAIL: `assert.deepEqual` — `maristana.promo` is `undefined`, not the expected object.

- [ ] **Step 7: Add the seed promo values**

  In `src/data/planCatalogSeed.ts`, change line 134 from:

  ```ts
          prices: { month: 400, term: 1000 },
  ```

  to:

  ```ts
          prices: { month: 400, term: 1000 },
          promo: {
            month: { enabled: true, percentOff: 25 },
            term: { enabled: true, percentOff: 30 },
          },
  ```

- [ ] **Step 8: Run both files, confirm everything passes**

  ```
  node --experimental-strip-types --test src/data/planCatalog.test.ts src/data/planCatalogSeed.test.ts
  ```

  Expected PASS: all tests in both files green (including the pre-existing ones — the seed test `deepEqual(maristana.prices, { month: 400, term: 1000 })` at planCatalogSeed.test.ts:27 is unaffected since `promo` is a new sibling field).

- [ ] **Step 9: Commit**

  ```
  git add src/data/planCatalog.ts src/data/planCatalogSeed.ts src/data/planCatalog.test.ts src/data/planCatalogSeed.test.ts
  git commit -m "feat(pricing): add promo model and promoPrice() to the plan catalog"
  ```

---

### Task 2: Voucher `periodPrices` and the Ambassadors seed

**Files:**
- Modify: `src/data/vouchers.ts` (add `periodPrices` to `Voucher` interface after line 21; rewrite `voucherDiscount()` at lines 88-93; add an Ambassadors record to `initialVouchers` after line 58)
- Test: `src/data/vouchers.test.ts` (already exists — extend)

**Interfaces:**
- Consumes: none new
- Produces: `Voucher.periodPrices?: { month?: number; term?: number }`; `voucherDiscount(voucher: Voucher, price: number, periodId?: string): number` (adds an optional third parameter, backward compatible)

- [ ] **Step 1: Write the failing tests for `periodPrices`**

  Add to `src/data/vouchers.test.ts`, after the existing "a trial takes nothing off the price" test (after line 74):

  ```ts
  test('a periodPrices target sets the discount so the final price lands exactly there', () => {
    const ambassadors = voucher({ periodPrices: { month: 250, term: 550 } })
    assert.equal(voucherDiscount(ambassadors, 400, 'month'), 150)
    assert.equal(voucherDiscount(ambassadors, 1000, 'term'), 450)
  })

  test('without a period, periodPrices is ignored and the percent/fixed rule applies instead', () => {
    const ambassadors = voucher({ discountType: 'Percentage', amount: 20, periodPrices: { month: 250 } })
    assert.equal(voucherDiscount(ambassadors, 400), 80)
  })

  test('a periodPrices target above the price gives no discount, never a negative one', () => {
    const generous = voucher({ periodPrices: { month: 500 } })
    assert.equal(voucherDiscount(generous, 400, 'month'), 0)
  })
  ```

- [ ] **Step 2: Run it, confirm it fails**

  ```
  node --experimental-strip-types --test --test-name-pattern="periodPrices" src/data/vouchers.test.ts
  ```

  Expected FAIL: the first test — `voucherDiscount(ambassadors, 400, 'month')` currently ignores the third argument and the `periodPrices` field, falling through to the default `discountType: 'Percentage', amount: 20` from the `voucher()` test factory, returning `80` instead of the expected `150`.

- [ ] **Step 3: Add `periodPrices` and rewrite `voucherDiscount()`**

  In `src/data/vouchers.ts`, add to the `Voucher` interface right after `amount: number` (line 21):

  ```ts
    discountType: VoucherDiscountType
    amount: number
    /**
     * An absolute EGP target price per period, overriding the percent/fixed
     * `amount` above when present. Exists because some offers — Ambassadors,
     * month 250 / term 550 — are not a clean percentage of the base price.
     */
    periodPrices?: { month?: number; term?: number }
  ```

  Replace `voucherDiscount()` (lines 88-93):

  ```ts
  /**
   * Money off the price.
   *
   * A trial takes nothing off: it opens the whole platform for a few days and
   * then ends. Returning its `amount` here would show a student a discount they
   * were never given.
   *
   * `periodPrices` is honored first when a period is given and the voucher
   * names a target for it — the target IS the discount, worked out backwards
   * from the price the caller is charging, and clamped so a target above the
   * price never yields a negative discount.
   */
  export function voucherDiscount(voucher: Voucher, price: number, periodId?: string): number {
    if (isTrialVoucher(voucher)) return 0
    const target = periodId === 'month' ? voucher.periodPrices?.month
      : periodId === 'term' ? voucher.periodPrices?.term
      : undefined
    if (target !== undefined) return price - Math.max(0, Math.min(price, target))
    return voucher.discountType === 'Percentage'
      ? Math.min(price, price * (voucher.amount / 100))
      : Math.min(price, voucher.amount)
  }
  ```

- [ ] **Step 4: Run it, confirm it passes**

  ```
  node --experimental-strip-types --test --test-name-pattern="periodPrices" src/data/vouchers.test.ts
  ```

  Expected PASS: 3 passing tests. Also re-run the full file to confirm the two pre-existing `voucherDiscount` call sites (lines 72-74, 134) still pass with no `periodId` argument:

  ```
  node --experimental-strip-types --test src/data/vouchers.test.ts
  ```

  Expected PASS: all tests green.

- [ ] **Step 5: Write the failing test for the Ambassadors seed**

  Add `initialVouchers` to the import at the top of `src/data/vouchers.test.ts` (line 3-6):

  ```ts
  import {
    DEFAULT_TRIAL_DAYS, initialVouchers, isTrialVoucher, trialEndsAt, voucherDiscount, voucherEligibility,
    voucherTrialDays, type Voucher,
  } from './vouchers.ts'
  ```

  Add this test after the "a private scholarship code..." test (after line 144):

  ```ts
  test('the Ambassadors voucher seeds with fixed period prices, inactive and codeless until an admin claims it', () => {
    const ambassadors = initialVouchers.find((entry) => entry.id === 'voucher-ambassadors')!
    assert.deepEqual(ambassadors.periodPrices, { month: 250, term: 550 })
    assert.equal(ambassadors.active, false)
    assert.equal(ambassadors.code, '')
  })
  ```

- [ ] **Step 6: Run it, confirm it fails**

  ```
  node --experimental-strip-types --test --test-name-pattern="Ambassadors" src/data/vouchers.test.ts
  ```

  Expected FAIL: `ambassadors` is `undefined` — `.find(...)!` — `TypeError: Cannot read properties of undefined`.

- [ ] **Step 7: Add the Ambassadors seed record**

  In `src/data/vouchers.ts`, add to `initialVouchers` (after the closing `},` of `voucher-welcome`, before the closing `]` at line 59):

  ```ts
    {
      id: 'voucher-ambassadors',
      // Deliberately blank: the superadmin/admin sets the real code, the
      // redemption cap, and switches it active from the Vouchers admin page.
      // No code value is baked into the seed (decided with user 2026-09-03).
      code: '',
      name: 'Ambassadors',
      discountType: 'Fixed amount',
      amount: 0,
      periodPrices: { month: 250, term: 550 },
      active: false,
      startsAt: new Date(2026, 8, 1, 0, 0).toISOString(),
      expiresAt: new Date(2027, 7, 31, 23, 59).toISOString(),
      maxRedemptions: 0,
      redemptionCount: 0,
      universityIds: [],
      years: [],
      groups: [],
      createdAt: new Date(2026, 8, 3, 0, 0).toISOString(),
      updatedAt: new Date(2026, 8, 3, 0, 0).toISOString(),
    },
  ```

- [ ] **Step 8: Run it, confirm it passes**

  ```
  node --experimental-strip-types --test src/data/vouchers.test.ts
  ```

  Expected PASS: all tests in the file green.

- [ ] **Step 9: Commit**

  ```
  git add src/data/vouchers.ts src/data/vouchers.test.ts
  git commit -m "feat(vouchers): add periodPrices and seed the inactive Ambassadors voucher"
  ```

---

### Task 3: Backend reads base price and promo from the plan catalog

**Files:**
- Modify: `server/src/pricing.js` (add `catalogPricing()`, `promoPrice()`, `normalisePeriodId()` after `ALL_ACCESS_PRICES` at line 7; replace the body of `pricingQuote()`, currently lines 135-147)
- Test: `server/src/pricing.test.js` (already exists — extend; add `import { pool } from './db.js'`)

**Interfaces:**
- Consumes: `app_state` row `{ v: string }` at key `nishany-plan-catalog-v1`, shape `{ plans: [{ id: 'maristana', prices: { month, term }, promo? }] }`
- Produces: `catalogPricing(): Promise<{ prices: { month: number; term: number }; promo: { month?: {...}; term?: {...} } }>`; `promoPrice(basePrice: number, promo: {enabled,percentOff} | undefined): number`; `normalisePeriodId(value): 'month' | 'term' | null`; `pricingQuote({ period, voucherCode, now }): Promise<{ period, currency, baseAmount, totalAmount, appliedDiscount } | { error }>` (rewritten — same exported name and call signature the route at `server/src/index.js:859-863` already uses, so no route change is needed)

Note: `quoteAllAccess`, `ALL_ACCESS_PRICES`, `discountAmount`, `listPricingDiscounts`, `createPromotion`, `createPricingVoucher` are untouched — they still back the (now UI-retired, see Task 8) SQL discount routes, and the existing `pricing.test.js` coverage of `quoteAllAccess`/`discountAmount` stays valid unmodified.

- [ ] **Step 1: Write the failing tests for `promoPrice` and `catalogPricing`**

  In `server/src/pricing.test.js`, replace the import block (lines 1-3) with:

  ```js
  import test from 'node:test'
  import assert from 'node:assert/strict'
  import { pool } from './db.js'
  import { CATALOG_STATE_KEY, VOUCHERS_STATE_KEY, catalogPricing, discountAmount, pricingQuote, promoPrice, quoteAllAccess } from './pricing.js'
  ```

  Add this helper after the `NOW` constant (after line 5):

  ```js
  /** Routes app_state reads to canned rows by key, mirroring answerDistribution.test.js's routedQuery. */
  async function withAppState({ catalog = null, vouchers = null }, run) {
    const original = pool.query
    pool.query = async (sql, params) => {
      if (sql.includes('FROM app_state')) {
        const key = params?.[0]
        if (key === CATALOG_STATE_KEY) return [[{ v: JSON.stringify(catalog) }]]
        if (key === VOUCHERS_STATE_KEY) return [[{ v: JSON.stringify(vouchers ?? []) }]]
        return [[]]
      }
      throw new Error(`unexpected query: ${sql}`)
    }
    try {
      await run()
    } finally {
      pool.query = original
    }
  }
  ```

  Add these tests at the end of the file:

  ```js
  test('promoPrice rounds a percent-off promo to the nearest whole EGP', () => {
    assert.equal(promoPrice(400, { enabled: true, percentOff: 25 }), 300)
    assert.equal(promoPrice(1000, { enabled: true, percentOff: 30 }), 700)
    assert.equal(promoPrice(400, { enabled: false, percentOff: 25 }), 400)
    assert.equal(promoPrice(400, undefined), 400)
  })

  test('catalogPricing reads the maristana plan the admin console edits, promo included', async () => {
    const catalogDoc = {
      plans: [{
        id: 'maristana',
        prices: { month: 450, term: 1100 },
        promo: { month: { enabled: true, percentOff: 10 }, term: { enabled: false, percentOff: 0 } },
      }],
    }
    await withAppState({ catalog: catalogDoc }, async () => {
      const result = await catalogPricing()
      assert.deepEqual(result.prices, { month: 450, term: 1100 })
      assert.equal(result.promo.month.percentOff, 10)
    })
  })

  test('catalogPricing falls back to the launch seed when the document is missing', async () => {
    await withAppState({ catalog: null }, async () => {
      const result = await catalogPricing()
      assert.deepEqual(result.prices, { month: 400, term: 1000 })
    })
  })

  test('the quote matches the catalog price and applies its promo, with no voucher', async () => {
    const catalogDoc = {
      plans: [{
        id: 'maristana',
        prices: { month: 400, term: 1000 },
        promo: { month: { enabled: true, percentOff: 25 }, term: { enabled: true, percentOff: 30 } },
      }],
    }
    await withAppState({ catalog: catalogDoc, vouchers: [] }, async () => {
      const monthly = await pricingQuote({ period: 'month' })
      assert.equal(monthly.baseAmount, 400)
      assert.equal(monthly.totalAmount, 300)
      assert.equal(monthly.appliedDiscount.kind, 'promo')

      const term = await pricingQuote({ period: 'term' })
      assert.equal(term.totalAmount, 700)
    })
  })

  test('an invalid period is refused', async () => {
    const result = await pricingQuote({ period: 'annual' })
    assert.equal(result.error, 'invalid_period')
  })
  ```

- [ ] **Step 2: Run it, confirm it fails**

  ```
  cd server && node --test --test-name-pattern="promoPrice|catalogPricing|matches the catalog price|invalid" src/pricing.test.js
  ```

  Expected FAIL: `promoPrice`/`catalogPricing`/`CATALOG_STATE_KEY`/`VOUCHERS_STATE_KEY` are not exported from `./pricing.js` yet.

- [ ] **Step 3: Implement the catalog-reading helpers and rewrite `pricingQuote()`**

  In `server/src/pricing.js`, add right after `ALL_ACCESS_PRICES` (after line 7):

  ```js
  export const CATALOG_STATE_KEY = 'nishany-plan-catalog-v1'
  export const VOUCHERS_STATE_KEY = 'nishany-vouchers-v1'
  const MARISTANA_PLAN_ID = 'maristana'

  // The one shared last-resort constant on this side of the app/server
  // boundary (the frontend cannot import this file, so it keeps its own —
  // see src/pages/landing/pricingContent.ts's SEED_MARISTANA_PRICES).
  // Derived from ALL_ACCESS_PRICES so this file still only has one 400 and
  // one 1000 literal, not two.
  const SEED_MARISTANA_PRICES = { month: ALL_ACCESS_PRICES.monthly.amount, term: ALL_ACCESS_PRICES.term.amount }
  const SEED_MARISTANA_PROMO = {
    month: { enabled: true, percentOff: 25 },
    term: { enabled: true, percentOff: 30 },
  }

  export function normalisePeriodId(value) {
    const period = String(value ?? '').trim().toLowerCase()
    return period === 'month' || period === 'term' ? period : null
  }

  /** Whole-EGP price after a percent-off promo. Mirrors src/data/planCatalog.ts's promoPrice(). */
  export function promoPrice(basePrice, promo) {
    if (!promo?.enabled) return basePrice
    const off = Math.min(100, Math.max(0, Number(promo.percentOff) || 0))
    return Math.round(basePrice * (1 - off / 100))
  }

  /**
   * The Nishany base prices and promo the public page is showing, read from
   * the same document the admin console edits (PlanCatalogEditor). Falls back
   * to the launch seed only when the document or the maristana plan inside it
   * is missing — never silently on a single absent period, which would hide a
   * real "not sold" state behind a made-up number.
   */
  export async function catalogPricing() {
    const [[row]] = await pool.query('SELECT v FROM app_state WHERE k = ?', [CATALOG_STATE_KEY])
    let doc = null
    try { doc = row?.v ? JSON.parse(row.v) : null } catch { doc = null }
    const plan = doc?.plans?.find((candidate) => candidate?.id === MARISTANA_PLAN_ID)
    if (!plan) return { prices: SEED_MARISTANA_PRICES, promo: SEED_MARISTANA_PROMO }
    return {
      prices: {
        month: typeof plan.prices?.month === 'number' ? plan.prices.month : SEED_MARISTANA_PRICES.month,
        term: typeof plan.prices?.term === 'number' ? plan.prices.term : SEED_MARISTANA_PRICES.term,
      },
      promo: plan.promo ?? SEED_MARISTANA_PROMO,
    }
  }
  ```

  Replace `pricingQuote()` (lines 135-147) with:

  ```js
  export async function pricingQuote({ period, voucherCode, now = new Date() }) {
    const periodId = normalisePeriodId(period)
    if (!periodId) return { error: 'invalid_period' }

    const { prices, promo } = await catalogPricing()
    const baseAmount = prices[periodId]
    const promoAmount = promoPrice(baseAmount, promo?.[periodId])

    const candidates = [{ kind: null, amount: baseAmount }]
    if (promoAmount < baseAmount) candidates.push({ kind: 'promo', amount: promoAmount })

    candidates.sort((a, b) => a.amount - b.amount)
    const applied = candidates[0]
    return {
      period: periodId,
      currency: 'EGP',
      baseAmount,
      totalAmount: applied.amount,
      appliedDiscount: applied.kind ? { kind: applied.kind, code: applied.code ?? null, amount: applied.amount } : null,
    }
  }
  ```

- [ ] **Step 4: Run it, confirm it passes**

  ```
  cd server && node --test src/pricing.test.js
  ```

  Expected PASS: all tests in the file green, including the pre-existing `quoteAllAccess`/`discountAmount` tests (untouched functions).

- [ ] **Step 5: Commit**

  ```
  git add server/src/pricing.js server/src/pricing.test.js
  git commit -m "feat(pricing): read base price and promo from the plan catalog app_state doc"
  ```

---

### Task 4: `/api/pricing/quote` accepts a voucher code, best price wins (no stacking)

**Files:**
- Modify: `server/src/pricing.js` (extend `pricingQuote()` from Task 3 with a voucher branch; add `voucherActiveNow()`, `voucherAmountFor()`, `findVoucherByCode()`)
- Test: `server/src/pricing.test.js` (extend)

**Interfaces:**
- Consumes: `app_state` row at key `nishany-vouchers-v1`, shape `Voucher[]` (matches `src/data/vouchers.ts`'s `Voucher`, including the new `periodPrices`)
- Produces: `pricingQuote({ period, voucherCode, now })` now also considers a `voucher` candidate; `appliedDiscount.kind` is `'promo' | 'voucher' | null`; `appliedDiscount.code` is the voucher's code when a voucher won

No route change: `GET /api/pricing/quote` at `server/src/index.js:859-863` already passes `req.query?.voucher` through as `voucherCode` — that call site is unmodified.

- [ ] **Step 1: Write the failing tests for voucher quoting and best-price selection**

  Add to `server/src/pricing.test.js`:

  ```js
  test('a voucher cheaper than the promo wins — best price, no stacking', async () => {
    const catalogDoc = { plans: [{ id: 'maristana', prices: { month: 400, term: 1000 }, promo: { term: { enabled: true, percentOff: 30 } } }] }
    const vouchers = [{
      id: 'v1', code: 'AMBASSADOR', active: true,
      startsAt: '2020-01-01', expiresAt: '2099-01-01',
      maxRedemptions: 0, redemptionCount: 0,
      periodPrices: { term: 550 },
    }]
    await withAppState({ catalog: catalogDoc, vouchers }, async () => {
      const quote = await pricingQuote({ period: 'term', voucherCode: 'ambassador' })
      assert.equal(quote.totalAmount, 550)
      assert.equal(quote.appliedDiscount.kind, 'voucher')
      assert.equal(quote.appliedDiscount.code, 'AMBASSADOR')
    })
  })

  test('a voucher worse than the promo loses — the promo still wins, never both', async () => {
    const catalogDoc = { plans: [{ id: 'maristana', prices: { month: 400, term: 1000 }, promo: { term: { enabled: true, percentOff: 30 } } }] }
    const vouchers = [{
      id: 'v2', code: 'SMALL10', active: true,
      startsAt: '2020-01-01', expiresAt: '2099-01-01',
      maxRedemptions: 0, redemptionCount: 0,
      discountType: 'Percentage', amount: 10,
    }]
    await withAppState({ catalog: catalogDoc, vouchers }, async () => {
      const quote = await pricingQuote({ period: 'term', voucherCode: 'SMALL10' })
      assert.equal(quote.totalAmount, 700)
      assert.equal(quote.appliedDiscount.kind, 'promo')
    })
  })

  test('an expired or unknown voucher code is ignored, not refused', async () => {
    const catalogDoc = { plans: [{ id: 'maristana', prices: { month: 400, term: 1000 } }] }
    const expired = [{
      id: 'v3', code: 'OLD', active: true,
      startsAt: '2020-01-01', expiresAt: '2021-01-01',
      maxRedemptions: 0, redemptionCount: 0,
      discountType: 'Fixed amount', amount: 300,
    }]
    await withAppState({ catalog: catalogDoc, vouchers: expired }, async () => {
      const unknown = await pricingQuote({ period: 'month', voucherCode: 'NOPE' })
      assert.equal(unknown.totalAmount, 400)
      assert.equal(unknown.appliedDiscount, null)

      const expiredQuote = await pricingQuote({ period: 'month', voucherCode: 'OLD' })
      assert.equal(expiredQuote.totalAmount, 400)
      assert.equal(expiredQuote.appliedDiscount, null)
    })
  })

  test('a voucher at its redemption limit is ignored', async () => {
    const catalogDoc = { plans: [{ id: 'maristana', prices: { month: 400, term: 1000 } }] }
    const exhausted = [{
      id: 'v4', code: 'FULL', active: true,
      startsAt: '2020-01-01', expiresAt: '2099-01-01',
      maxRedemptions: 5, redemptionCount: 5,
      discountType: 'Fixed amount', amount: 100,
    }]
    await withAppState({ catalog: catalogDoc, vouchers: exhausted }, async () => {
      const quote = await pricingQuote({ period: 'month', voucherCode: 'FULL' })
      assert.equal(quote.totalAmount, 400)
      assert.equal(quote.appliedDiscount, null)
    })
  })
  ```

- [ ] **Step 2: Run it, confirm it fails**

  ```
  cd server && node --test --test-name-pattern="voucher" src/pricing.test.js
  ```

  Expected FAIL: `pricingQuote` currently ignores `voucherCode` entirely (Task 3's implementation), so `totalAmount` for the "AMBASSADOR" case is `700` (promo only), not the expected `550`.

- [ ] **Step 3: Add the voucher branch**

  In `server/src/pricing.js`, add these three functions right after `catalogPricing()`:

  ```js
  function voucherActiveNow(voucher, now) {
    if (!voucher?.active) return false
    if (new Date(voucher.startsAt).getTime() > now.getTime()) return false
    if (new Date(voucher.expiresAt).getTime() < now.getTime()) return false
    if (voucher.maxRedemptions > 0 && voucher.redemptionCount >= voucher.maxRedemptions) return false
    return true
  }

  /** Money off, mirroring src/data/vouchers.ts's voucherDiscount() — periodPrices first. */
  function voucherAmountFor(voucher, periodId, baseAmount) {
    if (voucher.grant === 'Full-access trial') return null
    const fixed = periodId === 'month' ? voucher.periodPrices?.month : voucher.periodPrices?.term
    if (typeof fixed === 'number') return Math.max(0, Math.min(baseAmount, fixed))
    const discount = voucher.discountType === 'Percentage'
      ? Math.min(baseAmount, baseAmount * (Number(voucher.amount) / 100))
      : Math.min(baseAmount, Number(voucher.amount) || 0)
    return Math.max(0, Math.round((baseAmount - discount) * 100) / 100)
  }

  async function findVoucherByCode(code) {
    const wanted = String(code ?? '').trim().toLowerCase()
    if (!wanted) return null
    const [[row]] = await pool.query('SELECT v FROM app_state WHERE k = ?', [VOUCHERS_STATE_KEY])
    let vouchers = []
    try { vouchers = row?.v ? JSON.parse(row.v) : [] } catch { vouchers = [] }
    if (!Array.isArray(vouchers)) return null
    return vouchers.find((entry) => String(entry?.code ?? '').trim().toLowerCase() === wanted) ?? null
  }
  ```

  Replace `pricingQuote()` again (the Task 3 version) with the full version that also considers a voucher:

  ```js
  export async function pricingQuote({ period, voucherCode, now = new Date() }) {
    const periodId = normalisePeriodId(period)
    if (!periodId) return { error: 'invalid_period' }

    const { prices, promo } = await catalogPricing()
    const baseAmount = prices[periodId]
    const promoAmount = promoPrice(baseAmount, promo?.[periodId])

    const candidates = [{ kind: null, amount: baseAmount }]
    if (promoAmount < baseAmount) candidates.push({ kind: 'promo', amount: promoAmount })

    if (voucherCode) {
      const voucher = await findVoucherByCode(voucherCode)
      if (voucher && voucherActiveNow(voucher, now)) {
        const voucherAmount = voucherAmountFor(voucher, periodId, baseAmount)
        if (voucherAmount !== null) candidates.push({ kind: 'voucher', amount: voucherAmount, code: voucher.code })
      }
    }

    candidates.sort((a, b) => a.amount - b.amount)
    const applied = candidates[0]
    return {
      period: periodId,
      currency: 'EGP',
      baseAmount,
      totalAmount: applied.amount,
      appliedDiscount: applied.kind ? { kind: applied.kind, code: applied.code ?? null, amount: applied.amount } : null,
    }
  }
  ```

- [ ] **Step 4: Run it, confirm it passes**

  ```
  cd server && node --test src/pricing.test.js
  ```

  Expected PASS: every test in the file green (Task 3's tests plus Task 4's).

- [ ] **Step 5: Commit**

  ```
  git add server/src/pricing.js server/src/pricing.test.js
  git commit -m "feat(pricing): quote a voucher code, cheapest of base/promo/voucher wins"
  ```

---

### Task 5: Frontend reads the promo-adjusted price, one shared fallback constant

**Files:**
- Modify: `src/pages/landing/pricingContent.ts` (add `PricingAmounts`, `offerAmounts()`, `SEED_MARISTANA_PRICES`, `Priced<T>`, `resolvePriced()` before `EN_PRICING` at line 76)
- Modify: `src/pages/landing/Pricing.tsx` (lines 1-42: replace the local `amounts` calc with `offerAmounts()`)
- Modify: `src/pages/landing/PricingPage.tsx` (lines 1-56: replace `monthPrice`/`termPrice` fallback with `offerAmounts()`)
- Test: `src/pages/landing/pricingContent.test.ts` (new file — `offerAmounts()` is pure money math and deserves a direct test)

**Interfaces:**
- Consumes: `PlanCatalog` (via `usePlanCatalog()`), `findPlan`, `promoPrice`, `MARISTANA_PLAN_ID` from `@/data/planCatalog` (all from Task 1 and pre-existing)
- Produces: `offerAmounts(catalog: PlanCatalog): { month: number; term: number; savings: number; termMonthly: number }`; `SEED_MARISTANA_PRICES = { month: 400, term: 1000 }` (the one shared frontend fallback)

- [ ] **Step 1: Write the failing test for `offerAmounts`**

  Create `src/pages/landing/pricingContent.test.ts`:

  ```ts
  import test from 'node:test'
  import assert from 'node:assert/strict'
  import { offerAmounts, SEED_MARISTANA_PRICES } from './pricingContent.ts'
  import { initialPlanCatalog } from '@/data/planCatalogSeed.ts'
  import type { PlanCatalog } from '@/data/planCatalog.ts'

  test('offerAmounts reads the promo-adjusted maristana price from the catalog', () => {
    const amounts = offerAmounts(initialPlanCatalog())
    assert.equal(amounts.month, 300) // 25% off 400
    assert.equal(amounts.term, 700) // 30% off 1000
    assert.equal(amounts.termMonthly, Math.round(700 / 3))
    assert.equal(amounts.savings, 300 * 3 - 700)
  })

  test('offerAmounts falls back to the seed constant when maristana is missing', () => {
    const empty: PlanCatalog = { schemaVersion: 2, periods: [], plans: [] }
    assert.deepEqual(
      { month: offerAmounts(empty).month, term: offerAmounts(empty).term },
      SEED_MARISTANA_PRICES,
    )
  })
  ```

- [ ] **Step 2: Run it, confirm it fails**

  ```
  node --experimental-strip-types --test src/pages/landing/pricingContent.test.ts
  ```

  Expected FAIL: `offerAmounts`/`SEED_MARISTANA_PRICES` are not exported from `./pricingContent.ts` yet.

- [ ] **Step 3: Add `offerAmounts()` and the shared fallback constant**

  In `src/pages/landing/pricingContent.ts`, add right after the file's doc comment (before `export interface FaqItem`, at line 8):

  ```ts
  import { findPlan, promoPrice, MARISTANA_PLAN_ID, type PlanCatalog } from '@/data/planCatalog'

  /** The one shared last-resort constant on the frontend when the catalog document is empty. */
  export const SEED_MARISTANA_PRICES = { month: 400, term: 1000 }

  export interface PricingAmounts { month: number; term: number; savings: number; termMonthly: number }

  /**
   * The Nishany price, promo included, that the whole pricing page shows.
   *
   * Reads the same catalog document the admin console edits, so a promo
   * toggled on in PlanCatalogEditor changes what this returns without a
   * second place to update. Falls back to the seed only when the catalog has
   * no maristana plan or no price for that period at all.
   */
  export function offerAmounts(catalog: PlanCatalog): PricingAmounts {
    const plan = findPlan(catalog, MARISTANA_PLAN_ID)
    const month = (plan ? promoPrice(plan, 'month') : null) ?? SEED_MARISTANA_PRICES.month
    const term = (plan ? promoPrice(plan, 'term') : null) ?? SEED_MARISTANA_PRICES.term
    const savings = Math.max(0, month * 3 - term)
    const termMonthly = Math.round(term / 3)
    return { month, term, savings, termMonthly }
  }

  /** A copy field that is either fixed text or derived from the catalog's live price. */
  export type Priced<T> = T | ((amounts: PricingAmounts) => T)

  /** Resolve a `Priced<T>` field against the current amounts. */
  export function resolvePriced<T>(value: Priced<T>, amounts: PricingAmounts): T {
    return typeof value === 'function' ? (value as (amounts: PricingAmounts) => T)(amounts) : value
  }
  ```

- [ ] **Step 4: Run it, confirm it passes**

  ```
  node --experimental-strip-types --test src/pages/landing/pricingContent.test.ts
  ```

  Expected PASS: both tests green.

- [ ] **Step 5: Wire `Pricing.tsx` to `offerAmounts()`**

  In `src/pages/landing/Pricing.tsx`, change the import on line 10:

  ```tsx
  import { offerAmounts, pricingFor } from './pricingContent'
  ```

  Replace lines 26-35:

  ```tsx
    const amounts = useMemo(() => {
      const plan = findPlan(catalog, 'maristana')
      return {
        month: plan?.prices.month ?? 400,
        term: plan?.prices.term ?? 1000,
      }
    }, [catalog])

    const savings = Math.max(0, (amounts.month * 3) - amounts.term)
    const termMonthly = Math.round(amounts.term / 3)
  ```

  with:

  ```tsx
    const amounts = useMemo(() => offerAmounts(catalog), [catalog])
    const savings = amounts.savings
    const termMonthly = amounts.termMonthly
  ```

  `findPlan` is no longer used in this file — remove it from the import on line 8: change `import { findPlan, type Lang } from '@/data/planCatalog'` to `import type { Lang } from '@/data/planCatalog'`.

- [ ] **Step 6: Wire `PricingPage.tsx` to `offerAmounts()`**

  In `src/pages/landing/PricingPage.tsx`, change line 4 (`import { findPlan } from '@/data/planCatalog'`) — delete it, it becomes unused.

  Replace lines 16-19:

  ```tsx
    const [catalog] = usePlanCatalog()
    const maristana = findPlan(catalog, 'maristana')
    const monthPrice = maristana?.prices.month ?? 400
    const termPrice = maristana?.prices.term ?? 1000
  ```

  with:

  ```tsx
    const [catalog] = usePlanCatalog()
    const amounts = offerAmounts(catalog)
  ```

  Add the import (near line 10, alongside the existing `pricingContent` type import):

  ```tsx
  import { offerAmounts, type PricingContent } from './pricingContent'
  ```

  Update the JSON-LD offers block (lines 42-45) to use `amounts.month`/`amounts.term` instead of `monthPrice`/`termPrice`:

  ```tsx
        offers: [
          { '@type': 'Offer', priceCurrency: 'EGP', price: amounts.month, url: `${SITE_ORIGIN}/signup?plan=maristana&period=month` },
          { '@type': 'Offer', priceCurrency: 'EGP', price: amounts.term, url: `${SITE_ORIGIN}/signup?plan=maristana&period=term` },
        ],
  ```

- [ ] **Step 7: Verify by hand**

  Run the frontend build to catch the two import removals type-checking cleanly:

  ```
  npx tsc -b --noEmit
  ```

  Expected: no errors referencing `Pricing.tsx`, `PricingPage.tsx`, or `pricingContent.ts`. Then start the dev server and open `/pricing`: confirm the offer card shows **EGP 300** for month and **EGP 700** for term (the promo-adjusted prices, not 400/1000), and the "Save EGP …" line reflects the new `savings`/`termMonthly`.

  ```
  npm run dev
  ```

- [ ] **Step 8: Commit**

  ```
  git add src/pages/landing/pricingContent.ts src/pages/landing/pricingContent.test.ts src/pages/landing/Pricing.tsx src/pages/landing/PricingPage.tsx
  git commit -m "feat(pricing): show the promo-adjusted price via one shared offerAmounts() helper"
  ```

---

### Task 6: `pricingContent.ts` literal price strings become catalog-derived

**Files:**
- Modify: `src/pages/landing/pricingContent.ts` (interface + `EN_PRICING`/`AR_PRICING` literal objects)
- Modify: `src/pages/landing/PricingPage.tsx` (resolve the now-dynamic fields at render)
- Test: `src/pages/landing/pricingContent.test.ts` (extend, from Task 5)

**Interfaces:**
- Consumes: `PricingAmounts`, `Priced<T>`, `resolvePriced()` (Task 5)
- Produces: `PricingContent.metaDescription: Priced<string>`; `PricingContent.assurances: Priced<string[]>`; `FaqItem.a: Priced<string>`; `PricingContent.teaser.sub`/`teaser.termDetail: Priced<string>`

- [ ] **Step 1: Write the failing test for the derived copy**

  Add to `src/pages/landing/pricingContent.test.ts`:

  ```ts
  import { EN_PRICING, resolvePriced } from './pricingContent.ts'

  test('the EN pricing copy states the promo-adjusted price, not the hardcoded launch price', () => {
    const amounts = offerAmounts(initialPlanCatalog())
    const description = resolvePriced(EN_PRICING.metaDescription, amounts)
    assert.match(description, /EGP 300 monthly/)
    assert.match(description, /EGP 700 per academic term/)

    const assurances = resolvePriced(EN_PRICING.assurances, amounts)
    assert.deepEqual(assurances, ['EGP 300 monthly', 'EGP 700 per term', 'Trial access is not a purchasable tier'])

    const costFaq = EN_PRICING.faq.find((item) => item.q === 'How much does it cost?')!
    assert.match(resolvePriced(costFaq.a, amounts), /EGP 300\. One academic term costs EGP 700/)
  })
  ```

- [ ] **Step 2: Run it, confirm it fails**

  ```
  node --experimental-strip-types --test --test-name-pattern="promo-adjusted price" src/pages/landing/pricingContent.test.ts
  ```

  Expected FAIL: `resolvePriced(EN_PRICING.metaDescription, amounts)` returns the static string containing "EGP 400 monthly" (a `string` passed through `resolvePriced`'s non-function branch unchanged) — the regex for "EGP 300 monthly" does not match.

- [ ] **Step 3: Convert the price-bearing fields to `Priced<T>` and derive them from `amounts`**

  In `src/pages/landing/pricingContent.ts`, update the type declarations. Change `FaqItem` (lines 9-12):

  ```ts
  export interface FaqItem {
    q: string
    a: Priced<string>
  }
  ```

  In the `PricingContent` interface, change `documentTitle`'s neighbor `metaDescription` (line 18), the `teaser` block's `sub`/`termDetail` (lines 24-25), and `assurances` (line 33):

  ```ts
    documentTitle: string
    metaDescription: Priced<string>
    breadcrumb: string
    navLabel: string
    teaser: {
      eyebrow: string
      title: string
      sub: Priced<string>
      termLabel: string
      termDetail: Priced<string>
      scholarship: string
      link: string
      cta: string
    }
    h1: string
    sub: string
    assurances: Priced<string[]>
  ```

  In `EN_PRICING`, replace `metaDescription` (lines 80-81):

  ```ts
    metaDescription: (a) =>
      `One all-access medical study workspace for EGP ${formatNumber(a.month, 'en')} monthly or EGP ${formatNumber(a.term, 'en')} per academic term. Trial access is available during onboarding without buying a separate tier.`,
  ```

  Replace `teaser.sub` (line 87) and `teaser.termDetail` (line 89):

  ```ts
      sub: (a) => `The whole platform is included for EGP ${formatNumber(a.month, 'en')} monthly or EGP ${formatNumber(a.term, 'en')} per term. Start in onboarding, then choose the time that fits your semester.`,
      termLabel: 'Academic term · 3 months',
      termDetail: (a) => `EGP ${formatNumber(a.term, 'en')} · save EGP ${formatNumber(a.savings, 'en')} · EGP ${formatNumber(a.termMonthly, 'en')}/month equivalent`,
  ```

  Replace `assurances` (lines 97-101):

  ```ts
    assurances: (a) => [
      `EGP ${formatNumber(a.month, 'en')} monthly`,
      `EGP ${formatNumber(a.term, 'en')} per term`,
      'Trial access is not a purchasable tier',
    ],
  ```

  Replace the FAQ item `{ q: 'How much does it cost?', a: '...' }` (lines 176-179):

  ```ts
      {
        q: 'How much does it cost?',
        a: (a) => `One month costs EGP ${formatNumber(a.month, 'en')}. One academic term costs EGP ${formatNumber(a.term, 'en')} for 3 months, saving EGP ${formatNumber(a.savings, 'en')} compared with three separate monthly windows.`,
      },
  ```

  Do the same for `AR_PRICING`. Replace `metaDescription` (lines 223-224):

  ```ts
    metaDescription: (a) =>
      `مساحة مذاكرة طبية كاملة في نيشاني بسعر ${formatNumber(a.month, 'ar')} ج.م شهريًا أو ${formatNumber(a.term, 'ar')} ج.م للفصل الدراسي. الوصول التجريبي حالة بدء وليس خطة منفصلة للشراء.`,
  ```

  Replace `teaser.sub`/`teaser.termDetail` (lines 230, 232):

  ```ts
      sub: (a) => `كل المنصة مشمولة مقابل ${formatNumber(a.month, 'ar')} ج.م شهريًا أو ${formatNumber(a.term, 'ar')} ج.م للفصل. ابدأ من الإعداد، ثم اختر المدة التي تناسب فصلك الدراسي.`,
      termLabel: 'فصل دراسي · ٣ أشهر',
      termDetail: (a) => `${formatNumber(a.term, 'ar')} ج.م · وفّر ${formatNumber(a.savings, 'ar')} ج.م · ما يعادل ${formatNumber(a.termMonthly, 'ar')} ج.م شهريًا`,
  ```

  Replace `assurances` (lines 240-244):

  ```ts
    assurances: (a) => [
      `${formatNumber(a.month, 'ar')} ج.م شهريًا`,
      `${formatNumber(a.term, 'ar')} ج.م للفصل`,
      'التجربة ليست خطة تُشترى',
    ],
  ```

  Replace the FAQ item `{ q: 'كم السعر؟', a: '...' }` (lines 319-322):

  ```ts
      {
        q: 'كم السعر؟',
        a: (a) => `الشهر الواحد ${formatNumber(a.month, 'ar')} ج.م. الفصل الدراسي ${formatNumber(a.term, 'ar')} ج.م لمدة ٣ أشهر، أي يوفر ${formatNumber(a.savings, 'ar')} ج.م مقارنة بثلاث مدد شهرية منفصلة.`,
      },
  ```

  Add the `formatNumber` import at the top of the file (after the doc comment, alongside the Task 5 imports):

  ```ts
  import { formatNumber } from '@/lib/pricing'
  ```

- [ ] **Step 4: Run it, confirm it passes**

  ```
  node --experimental-strip-types --test src/pages/landing/pricingContent.test.ts
  ```

  Expected PASS: all tests in the file green.

- [ ] **Step 5: Resolve the dynamic fields at their render sites**

  In `src/pages/landing/PricingPage.tsx`, change the import (Task 5 left it as `import { offerAmounts, type PricingContent } from './pricingContent'`) to also bring in `resolvePriced`:

  ```tsx
  import { offerAmounts, resolvePriced, type PricingContent } from './pricingContent'
  ```

  Update the `usePageMeta` call's `description` (line 23):

  ```tsx
      description: resolvePriced(p.metaDescription, amounts),
  ```

  Update the FAQ `jsonLd` mapping (lines 31-35):

  ```tsx
        mainEntity: p.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: resolvePriced(item.a, amounts) },
        })),
  ```

  Update the assurances list render (line 75):

  ```tsx
          {resolvePriced(p.assurances, amounts).map((line) => (
  ```

  Update the FAQ render (line 101):

  ```tsx
                <p className="pb-4 pe-7 text-[13.5px] leading-relaxed text-ink-2">{resolvePriced(item.a, amounts)}</p>
  ```

- [ ] **Step 6: Verify by hand**

  ```
  npx tsc -b --noEmit
  npm run dev
  ```

  Open `/pricing` and `/ar/pricing`: confirm the meta description, the three assurance chips, and the "How much does it cost?" FAQ answer all state EGP 300 / EGP 700 (or their Arabic-Indic equivalents ٣٠٠ / ٧٠٠), not 400/1,000.

- [ ] **Step 7: Commit**

  ```
  git add src/pages/landing/pricingContent.ts src/pages/landing/pricingContent.test.ts src/pages/landing/PricingPage.tsx
  git commit -m "feat(pricing): derive pricingContent's EN/AR price copy from the catalog"
  ```

---

### Task 7: Admin — promo enable + percent inputs in `PlanCatalogEditor`

**Files:**
- Modify: `src/components/admin/PlanCatalogEditor.tsx` (import at lines 5-8; `setPrice` at lines 108-115; the "Price per period" block at lines 129-152)

**Interfaces:**
- Consumes: `CatalogPlan.promo` (Task 1), `promoPrice()` (Task 1)
- Produces: no new exports — UI only

- [ ] **Step 1: Add `promoPrice` to the import**

  In `src/components/admin/PlanCatalogEditor.tsx`, change lines 5-8:

  ```tsx
  import {
    isPurchasable, monthlyEquivalent, priceAt, promoPrice, say,
    type Bilingual, type BillingPeriodDef, type CatalogPlan, type PlanCatalog, type PlanFeature,
  } from '@/data/planCatalog'
  ```

- [ ] **Step 2: Add a `setPromo` helper next to `setPrice`**

  After `setPrice` (lines 108-115), add:

  ```tsx
    const setPromo = (periodId: 'month' | 'term', fields: Partial<{ enabled: boolean; percentOff: number }>) => {
      const current = plan.promo?.[periodId] ?? { enabled: false, percentOff: 0 }
      patch({ promo: { ...plan.promo, [periodId]: { ...current, ...fields } } })
    }
  ```

- [ ] **Step 3: Add promo controls to the "Price per period" block**

  Replace the price-per-period `<div>` (lines 129-152):

  ```tsx
        <div>
          <p className="mb-1.5 text-[12.5px] font-medium text-ink-2">Price per period</p>
          <div className="flex flex-wrap gap-3">
            {periods.map((period) => (
              <label key={period.id} className="flex items-center gap-1.5 text-[12px] text-ink-3">
                <span className="font-medium text-ink-2">{say(period.label, 'en')}</span>
                <TextInput
                  type="number"
                  min={0}
                  value={plan.prices[period.id] ?? ''}
                  onChange={(event) => setPrice(period.id, event.target.value)}
                  placeholder="not sold"
                  aria-label={`Price for ${say(period.label, 'en')}`}
                  className="tnum h-8 w-28 font-mono"
                />
                {period.comingSoon && <span className="text-[10.5px] font-semibold uppercase text-warning">soon</span>}
                {(period.id === 'month' || period.id === 'term') && (
                  <span className="ms-1 inline-flex items-center gap-1.5 border-s border-line ps-2">
                    <Toggle
                      checked={plan.promo?.[period.id]?.enabled === true}
                      onChange={(enabled) => setPromo(period.id, { enabled })}
                      label={`${say(period.label, 'en')} promo`}
                    />
                    <TextInput
                      type="number"
                      min={0}
                      max={100}
                      value={plan.promo?.[period.id]?.percentOff ?? 0}
                      onChange={(event) => setPromo(period.id, { percentOff: Math.max(0, Math.min(100, Number(event.target.value) || 0)) })}
                      aria-label={`Promo percent off ${say(period.label, 'en')}`}
                      className="tnum h-8 w-16 font-mono text-[12px]"
                    />
                    <span className="text-[11px] text-ink-3">% off</span>
                  </span>
                )}
              </label>
            ))}
          </div>
          <p className="mt-1 text-[11.5px] text-ink-3">
            Leave a box empty where the plan is not sold that way. Worth{' '}
            <span className="tnum font-mono">EGP {Math.round(monthlyEquivalent(plan, periods))}</span> a month for reporting.
            {(plan.promo?.month?.enabled || plan.promo?.term?.enabled) && (
              <>
                {' '}Promo price:{' '}
                {plan.promo?.month?.enabled && (
                  <span className="tnum font-mono">month EGP {promoPrice(plan, 'month')}</span>
                )}
                {plan.promo?.month?.enabled && plan.promo?.term?.enabled && ' · '}
                {plan.promo?.term?.enabled && (
                  <span className="tnum font-mono">term EGP {promoPrice(plan, 'term')}</span>
                )}
                .
              </>
            )}
          </p>
        </div>
  ```

- [ ] **Step 4: Verify by hand**

  ```
  npx tsc -b --noEmit
  npm run dev
  ```

  Sign in as an admin, open **Payments & Finance**, expand the `maristana` (NISHANY) plan in "Plans & pricing". Confirm: the month and term price rows each show a promo toggle + percent input; toggling month's promo on with 25% shows "month EGP 300" in the hint line; toggling term's promo on with 30% shows "term EGP 700". Toggle both off and confirm the hint line's promo sentence disappears. Save and reload to confirm the promo persists (round-trips through `usePlanCatalog`'s `setCatalog`).

- [ ] **Step 5: Commit**

  ```
  git add src/components/admin/PlanCatalogEditor.tsx
  git commit -m "feat(admin): edit per-period promo enable + percent in PlanCatalogEditor"
  ```

---

### Task 8: Retire the rival "All-access pricing" panel in `PaymentsFinance.tsx`

**Files:**
- Modify: `src/pages/admin/PaymentsFinance.tsx` (remove the import at line 20; the local helper/interfaces/state at lines 22-120; the JSX panel at lines 143-225)

**Interfaces:**
- Consumes: none
- Produces: none — deletion only. `server/src/index.js`'s `/api/admin/pricing`, `/api/admin/pricing/promotions`, `/api/admin/pricing/vouchers` routes and `listPricingDiscounts`/`createPromotion`/`createPricingVoucher` in `server/src/pricing.js` are left in place, unused — per spec, the SQL tables and their backend functions may remain, only the UI is retired.

- [ ] **Step 1: Remove the `API_MODE`/`apiGet`/`apiPost` import**

  Delete line 20 of `src/pages/admin/PaymentsFinance.tsx`:

  ```tsx
  import { API_MODE, apiGet, apiPost } from '@/lib/api'
  ```

- [ ] **Step 2: Remove the local price-discount helper, interfaces, and default draft**

  Delete lines 23-65 (from `const localDateTime = ...` through the closing `})` of `emptyDiscount`):

  ```tsx
  const localDateTime = (daysFromNow: number) => new Date(Date.now() + daysFromNow * 86_400_000).toISOString().slice(0, 16)

  interface PricingDiscount {
    id: string
    kind: 'promotion' | 'voucher'
    code: string | null
    label: string
    period: 'monthly' | 'term' | 'both'
    discountType: 'percent' | 'fixed'
    discountValue: number
    startsAt: string
    endsAt: string
    active: boolean
    maxRedemptions?: number | null
  }

  interface PricingState {
    plans: Array<{ period: 'monthly' | 'term'; label: string; currency: string; amount: number }>
    promotions: PricingDiscount[]
    vouchers: PricingDiscount[]
  }

  interface DiscountDraft {
    kind: 'promotion' | 'voucher'
    code: string
    label: string
    period: 'monthly' | 'term' | 'both'
    discountType: 'percent' | 'fixed'
    discountValue: number
    startsAt: string
    endsAt: string
  }

  const emptyDiscount = (kind: 'promotion' | 'voucher'): DiscountDraft => ({
    kind,
    code: '',
    label: kind === 'promotion' ? 'Timed campaign' : 'Voucher code',
    period: kind === 'voucher' ? 'monthly' : 'both',
    discountType: 'percent',
    discountValue: 10,
    startsAt: localDateTime(0),
    endsAt: localDateTime(14),
  })
  ```

- [ ] **Step 3: Remove the pricing-discount state and handlers from the component**

  In the `PaymentsFinance()` component body, delete the `pricing`/`draft`/`pricingBusy`/`pricingNotice` state, `loadPricing`, the `useEffect` that calls it, and `createDiscount` (everything between `const [catalog, setCatalog] = usePlanCatalog()` and the `byUniversity` `useMemo`):

  ```tsx
    const [pricing, setPricing] = useState<PricingState | null>(null)
    const [draft, setDraft] = useState<DiscountDraft>(() => emptyDiscount('promotion'))
    const [pricingBusy, setPricingBusy] = useState(false)
    const [pricingNotice, setPricingNotice] = useState('')

    async function loadPricing() {
      if (!API_MODE) return
      setPricingBusy(true)
      try {
        setPricing(await apiGet<PricingState>('/admin/pricing'))
        setPricingNotice('')
      } catch {
        setPricingNotice('Could not load live pricing.')
      } finally {
        setPricingBusy(false)
      }
    }

    useEffect(() => { void loadPricing() }, [])

    async function createDiscount() {
      if (!draft.label.trim()) {
        setPricingNotice('Give the discount a label.')
        return
      }
      if (draft.kind === 'voucher' && !draft.code.trim()) {
        setPricingNotice('Give the voucher a code.')
        return
      }
      setPricingBusy(true)
      try {
        const body = {
          code: draft.code,
          label: draft.label,
          period: draft.period,
          discountType: draft.discountType,
          discountValue: draft.discountValue,
          startsAt: new Date(draft.startsAt).toISOString(),
          endsAt: new Date(draft.endsAt).toISOString(),
          active: true,
        }
        await apiPost(`/admin/pricing/${draft.kind === 'voucher' ? 'vouchers' : 'promotions'}`, body)
        setDraft(emptyDiscount(draft.kind))
        setPricingNotice('Discount saved.')
        await loadPricing()
      } catch (error) {
        setPricingNotice(error instanceof Error ? error.message : 'The discount was refused.')
      } finally {
        setPricingBusy(false)
      }
    }
  ```

  `useEffect` is now unused in this file if nothing else uses it — check with `grep -n "useEffect" src/pages/admin/PaymentsFinance.tsx`; if the only remaining hit is the `import { useEffect, useMemo, useState }` line, trim it to `import { useMemo, useState } from 'react'` (line 1).

- [ ] **Step 4: Remove the "All-access pricing" `Panel` JSX**

  Delete the whole panel (originally lines 143-225), from its opening `<Panel className="mb-4 overflow-hidden">` through the matching `</Panel>` right before the `<div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-5">` Stat row:

  ```tsx
      <Panel className="mb-4 overflow-hidden">
        <PanelHeader
          title="All-access pricing"
          hint={API_MODE ? 'Server-authoritative monthly/term pricing, promotions and vouchers' : 'Live backend required'}
          action={<Button size="sm" variant="ghost" iconLeft={RefreshCw} loading={pricingBusy} onClick={() => void loadPricing()}>Refresh</Button>}
        />
        <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {(pricing?.plans ?? [
                { period: 'monthly' as const, label: 'One month all-access', currency: 'EGP', amount: 400 },
                { period: 'term' as const, label: 'One term all-access', currency: 'EGP', amount: 1000 },
              ]).map((plan) => (
                <Panel key={plan.period} className="px-4 py-3">
                  <p className="text-[12px] text-ink-3">{plan.label}</p>
                  <p className="tnum mt-1 font-mono text-[24px] font-semibold text-ink">{plan.currency} {plan.amount.toLocaleString()}</p>
                  <Badge tone="success" className="mt-2">All access</Badge>
                </Panel>
              ))}
            </div>
            <Table>
              <thead><tr><Th>Discount</Th><Th>Period</Th><Th>Value</Th><Th>Window</Th><Th>Status</Th></tr></thead>
              <tbody>
                {[...(pricing?.promotions ?? []), ...(pricing?.vouchers ?? [])].map((discount) => (
                  <Tr key={`${discount.kind}-${discount.id}`}>
                    <Td>
                      <p className="font-medium text-ink">{discount.label}</p>
                      <p className="text-[11.5px] text-ink-3">{discount.kind === 'voucher' ? `Voucher · ${discount.code}` : 'Timed promotion'}</p>
                    </Td>
                    <Td className="capitalize text-ink-2">{discount.period}</Td>
                    <Td className="tnum font-mono text-ink-2">{discount.discountType === 'percent' ? `${discount.discountValue}%` : egp(discount.discountValue)}</Td>
                    <Td className="text-[12px] text-ink-3">{new Date(discount.startsAt).toLocaleDateString()} → {new Date(discount.endsAt).toLocaleDateString()}</Td>
                    <Td><Badge tone={discount.active ? 'success' : 'neutral'}>{discount.active ? 'Active' : 'Paused'}</Badge></Td>
                  </Tr>
                ))}
                {pricing && pricing.promotions.length + pricing.vouchers.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-[13px] text-ink-3">No promotions or vouchers yet.</td></tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="rounded-xl border border-line bg-surface-2 p-4">
            <p className="mb-3 text-[13px] font-bold text-ink">Create discount</p>
            <div className="grid gap-3">
              <Field label="Kind">
                <Select value={draft.kind} onChange={(event) => setDraft(emptyDiscount(event.target.value as 'promotion' | 'voucher'))}>
                  <option value="promotion">Timed promotion</option>
                  <option value="voucher">Voucher</option>
                </Select>
              </Field>
              {draft.kind === 'voucher' && (
                <Field label="Voucher code">
                  <TextInput value={draft.code} onChange={(event) => setDraft({ ...draft, code: event.target.value.toUpperCase() })} placeholder="WELCOME20" />
                </Field>
              )}
              <Field label="Label"><TextInput value={draft.label} onChange={(event) => setDraft({ ...draft, label: event.target.value })} /></Field>
              <Field label="Period">
                <Select value={draft.period} onChange={(event) => setDraft({ ...draft, period: event.target.value as DiscountDraft['period'] })}>
                  {draft.kind === 'promotion' && <option value="both">Both periods</option>}
                  <option value="monthly">Monthly</option>
                  <option value="term">Term</option>
                </Select>
              </Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Type">
                  <Select value={draft.discountType} onChange={(event) => setDraft({ ...draft, discountType: event.target.value as DiscountDraft['discountType'] })}>
                    <option value="percent">Percent</option>
                    <option value="fixed">Fixed EGP</option>
                  </Select>
                </Field>
                <Field label="Value">
                  <TextInput type="number" min={1} value={draft.discountValue} onChange={(event) => setDraft({ ...draft, discountValue: Number(event.target.value) })} />
                </Field>
              </div>
              <Field label="Starts"><TextInput type="datetime-local" value={draft.startsAt} onChange={(event) => setDraft({ ...draft, startsAt: event.target.value })} /></Field>
              <Field label="Ends"><TextInput type="datetime-local" value={draft.endsAt} onChange={(event) => setDraft({ ...draft, endsAt: event.target.value })} /></Field>
              {pricingNotice && <p role="status" className="text-[12.5px] text-ink-2">{pricingNotice}</p>}
              <Button variant="primary" iconLeft={Plus} loading={pricingBusy} disabled={!API_MODE} onClick={() => void createDiscount()}>Save discount</Button>
            </div>
          </div>
        </div>
      </Panel>

  ```

  (Leave the blank line before `<div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-5">` — the panel is simply gone.)

- [ ] **Step 5: Clean up now-unused imports**

  Run `npx tsc -b --noEmit` and remove whatever it flags as unused (candidates: `RefreshCw`, `Select`, `Badge`, `Table`/`Th`/`Td`/`Tr` if nothing else in the file uses them — but check first, `Table`/`Th`/`Td`/`Tr` are still used by the "Universities head-to-head"/"Years head-to-head"/"Recent transactions" tables further down the file, so they likely stay; `Select` and `Badge` were only used by the removed panel and the removed `RefreshCw` icon — confirm with `grep -n "Select\|Badge\|RefreshCw" src/pages/admin/PaymentsFinance.tsx` before removing each).

- [ ] **Step 6: Verify by hand**

  ```
  npx tsc -b --noEmit
  npm run dev
  ```

  Sign in as admin, open **Payments & Finance**: confirm the page no longer shows an "All-access pricing" panel or a "Create discount" form, and the rest of the page (Stats, Revenue, by-university/by-year, `PlanCatalogEditor`, Recent transactions) renders unchanged.

- [ ] **Step 7: Commit**

  ```
  git add src/pages/admin/PaymentsFinance.tsx
  git commit -m "refactor(admin): retire the SQL All-access pricing panel from Payments & Finance"
  ```

---

### Task 9: Admin — `periodPrices` fields in `VoucherManagement`

**Files:**
- Modify: `src/pages/admin/VoucherManagement.tsx` (the discount-type grid at line 102; the table's Discount column at line 83)

**Interfaces:**
- Consumes: `Voucher.periodPrices` (Task 2)
- Produces: no new exports — UI only

- [ ] **Step 1: Add the fixed period-price fields to the voucher editor**

  In `src/pages/admin/VoucherManagement.tsx`, right after the percent/fixed grid (line 102, inside the `!isTrialVoucher(editing)` branch), add:

  ```tsx
              <div className="grid grid-cols-2 gap-3"><Field label="Discount type"><Select value={editing.discountType} onChange={(event) => setEditing({ ...editing, discountType: event.target.value as VoucherDiscountType })}><option>Percentage</option><option>Fixed amount</option></Select></Field><Field label={editing.discountType === 'Percentage' ? 'Percent off' : 'Amount off (£)'}><TextInput type="number" min="1" max={editing.discountType === 'Percentage' ? 100 : undefined} value={editing.amount} onChange={(event) => setEditing({ ...editing, amount: Number(event.target.value) })} /></Field></div>
              <fieldset className="rounded-lg border border-line p-3"><legend className="px-1 text-[12.5px] font-medium text-ink-2">Fixed period prices (optional)</legend><p className="mb-2 text-[11px] text-ink-3">Overrides the percent/fixed discount above for that period — set month and/or term to an exact EGP target instead of a percentage off.</p><div className="grid grid-cols-2 gap-3"><Field label="Month price (EGP)"><TextInput type="number" min="0" value={editing.periodPrices?.month ?? ''} onChange={(event) => setEditing({ ...editing, periodPrices: { ...editing.periodPrices, month: event.target.value === '' ? undefined : Number(event.target.value) } })} placeholder="not set" /></Field><Field label="Term price (EGP)"><TextInput type="number" min="0" value={editing.periodPrices?.term ?? ''} onChange={(event) => setEditing({ ...editing, periodPrices: { ...editing.periodPrices, term: event.target.value === '' ? undefined : Number(event.target.value) } })} placeholder="not set" /></Field></div></fieldset>
  ```

  (This replaces the single line at line 102 with two lines: the original grid unchanged, plus the new fieldset right after it.)

- [ ] **Step 2: Show `periodPrices` in the table's Discount column**

  Replace line 83's `Discount` `<Td>` expression:

  ```tsx
  {isTrialVoucher(voucher) ? `${voucherTrialDays(voucher)}-day full access` : voucher.periodPrices?.month || voucher.periodPrices?.term ? `EGP ${voucher.periodPrices.month ?? '—'} / ${voucher.periodPrices.term ?? '—'}` : voucher.discountType === 'Percentage' ? `${voucher.amount}%` : `£${voucher.amount.toFixed(2)}`}
  ```

  (replaces the existing `{isTrialVoucher(voucher) ? \`${voucherTrialDays(voucher)}-day full access\` : voucher.discountType === 'Percentage' ? \`${voucher.amount}%\` : \`£${voucher.amount.toFixed(2)}\`}` expression inside that `<Td>`, everything else on that line — the `key`, the other `<Td>`s — is unchanged.)

- [ ] **Step 3: Verify by hand**

  ```
  npx tsc -b --noEmit
  npm run dev
  ```

  Sign in as admin, open **Vouchers**. Confirm:
  - The "Ambassadors" voucher (seeded in Task 2) appears in the list, inactive, with an empty code and a Discount column reading `EGP 250 / 550`.
  - Editing it and setting a code (e.g. `AMBASSADOR26`), a redemption cap, and switching Active on saves correctly and the row updates.
  - Creating a brand-new voucher still works with the percent/fixed fields alone (leaving the new fixed-period fields blank).

- [ ] **Step 4: Commit**

  ```
  git add src/pages/admin/VoucherManagement.tsx
  git commit -m "feat(admin): edit a voucher's fixed period prices in VoucherManagement"
  ```

---

### Task 10: Public pricing page — voucher-code field wired to `/api/pricing/quote`

**Files:**
- Modify: `src/pages/landing/Pricing.tsx` (imports at lines 1-10; add voucher state and `checkVoucher()`; add the voucher-code UI and wire `selectedAmount` to it)

**Interfaces:**
- Consumes: `GET /api/pricing/quote?period=<month|term>&voucher=<code>` → `{ period, currency, baseAmount, totalAmount, appliedDiscount: { kind, code, amount } | null } | { error }` (Task 4)
- Produces: no new exports — UI only

- [ ] **Step 1: Add imports and state**

  In `src/pages/landing/Pricing.tsx`, change line 1 to include `useState` (already there) and add to the import block:

  ```tsx
  import { useMemo, useState } from 'react'
  import { Link } from 'react-router-dom'
  import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
  import { Icon } from '@/components/ui/Icon'
  import { Button } from '@/components/ui/Button'
  import { TextInput } from '@/components/ui/Field'
  import { cn } from '@/lib/cn'
  import { formatNumber } from '@/lib/pricing'
  import { API_MODE, apiGet } from '@/lib/api'
  import { usePlanCatalog } from '@/lib/usePlanCatalog'
  import type { Lang } from '@/data/planCatalog'
  import type { LandingContent } from './content'
  import { offerAmounts, pricingFor } from './pricingContent'
  ```

  Inside the component, right after `const [periodId, setPeriodId] = useState<PeriodId>('term')` add:

  ```tsx
    interface VoucherQuote { period: PeriodId; totalAmount: number; appliedDiscount: { kind: string; code: string | null } | null }
    const [voucherCode, setVoucherCode] = useState('')
    const [voucherQuote, setVoucherQuote] = useState<VoucherQuote | null>(null)
    const [voucherMessage, setVoucherMessage] = useState('')
    const [checkingVoucher, setCheckingVoucher] = useState(false)

    async function checkVoucher() {
      const wanted = voucherCode.trim()
      if (!wanted || periodId === 'year') return
      if (!API_MODE) {
        setVoucherMessage('Connect the backend to check a code.')
        return
      }
      setCheckingVoucher(true)
      setVoucherMessage('')
      try {
        const result = await apiGet<VoucherQuote & { error?: string }>(
          `/pricing/quote?period=${periodId}&voucher=${encodeURIComponent(wanted)}`,
        )
        if (result.error) {
          setVoucherMessage('That code is not valid.')
          setVoucherQuote(null)
          return
        }
        setVoucherQuote(result)
        setVoucherMessage(result.appliedDiscount?.kind === 'voucher' ? 'Code applied.' : 'That code does not beat the current price.')
      } catch {
        setVoucherMessage('Could not check that code. Try again.')
      } finally {
        setCheckingVoucher(false)
      }
    }
  ```

- [ ] **Step 2: Wire `selectedAmount` to the quote when it matches the selected period**

  Replace line 36:

  ```tsx
    const selectedAmount = voucherQuote && voucherQuote.period === periodId
      ? voucherQuote.totalAmount
      : periodId === 'month' ? amounts.month : periodId === 'term' ? amounts.term : null
  ```

  Update the period-selector `onClick` (line 65) to clear a stale quote when the student switches period:

  ```tsx
                    onClick={() => { setPeriodId(option.id); setVoucherQuote(null); setVoucherMessage('') }}
  ```

- [ ] **Step 3: Add the voucher-code field to the offer card**

  In the offer card, right after the "Full Nishany access for the selected period" line (after line 110, `</p>` closing the `flex items-center gap-2` block) and before the `{signupHref ? (` CTA block (line 114), add:

  ```tsx
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <TextInput
                      value={voucherCode}
                      onChange={(event) => setVoucherCode(event.target.value)}
                      placeholder="Voucher code"
                      aria-label="Voucher code"
                      className="h-9 w-40 text-[12.5px]"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      loading={checkingVoucher}
                      disabled={!voucherCode.trim() || periodId === 'year'}
                      onClick={() => void checkVoucher()}
                    >
                      Apply
                    </Button>
                  </div>
                  {voucherMessage && <p role="status" className="mt-1.5 text-[12px] text-ink-2">{voucherMessage}</p>}
  ```

- [ ] **Step 4: Verify by hand**

  ```
  npx tsc -b --noEmit
  npm run dev
  ```

  Open `/pricing` in demo mode (no `VITE_API_BASE` set): type any code into the voucher field and click Apply — confirm the message reads "Connect the backend to check a code." and the displayed price is unchanged (this is the reachable check in a sandboxed dev environment with no live backend). With a live backend available (`VITE_API_BASE` set and a MariaDB reachable), seed a voucher via the Vouchers admin page (Task 9), enter its code on `/pricing`, and confirm the displayed price updates to the quoted `totalAmount` when it beats the current promo price, and the message reads "That code does not beat the current price." when it does not.

- [ ] **Step 5: Commit**

  ```
  git add src/pages/landing/Pricing.tsx
  git commit -m "feat(landing): voucher-code field on the pricing page, quoted live from the server"
  ```

---

## Self-review

Spec section 1 ("Pricing single source of truth"):

| Spec requirement | Task |
|---|---|
| `promo` field on catalog plan periods | Task 1 |
| maristana seed: month 25% off, term 30% off | Task 1 |
| `promoPrice()` helper, rounds to nearest whole EGP (300/700) | Task 1 |
| Backend reads base price from `nishany-plan-catalog-v1` app_state doc instead of hardcoded `ALL_ACCESS_PRICES` | Task 3 |
| Backend applies the promo the same way the UI does | Task 3 |
| Backend falls back to seed only if the doc is missing | Task 3 |
| Remove `?? 400`/`?? 1000` fallbacks in `PricingPage.tsx`, `Pricing.tsx` | Task 5 |
| Remove `?? 400`/`?? 1000` fallback in `PaymentsFinance.tsx` | Task 8 (removed along with the whole retired panel) |
| Keep exactly one shared last-resort constant (the seed) | Task 5 (`SEED_MARISTANA_PRICES` in `pricingContent.ts`, frontend) + Task 3 (`SEED_MARISTANA_PRICES` in `pricing.js`, backend — two copies is the unavoidable minimum since `src/` and `server/` share no code, each is itself the single constant on its side) |
| Replace literal price strings in `pricingContent.ts` (EN + AR) with catalog-derived values | Task 6 |
| Admin: promo enable + percent inputs in `PlanCatalogEditor` | Task 7 |
| Retire the rival "All-access pricing" panel + SQL "Create discount" form in `PaymentsFinance.tsx` | Task 8 |

Spec section 2 ("Vouchers"):

| Spec requirement | Task |
|---|---|
| `Voucher.periodPrices?: { month?: number; term?: number }` | Task 2 |
| `voucherDiscount()` honors `periodPrices` first | Task 2 |
| Ambassadors voucher seeded with `periodPrices: {month:250, term:550}`, `active:false`, empty `code` | Task 2 |
| Admin editing for `periodPrices` | Task 9 |
| `/api/pricing/quote` accepts a voucher code, validates via the shared voucher logic, returns the discounted total | Task 4 |
| Best price wins, no stacking — min(base, promo, voucher) | Task 4 |
| Pricing/signup page voucher-code field calling the quote endpoint, live total | Task 10 |

No spec requirement in sections 1-2 was left unmapped.

Explicitly out of scope (per the assignment, not this plan): spec section 3 "Live subscriber count" and section 4 "Landing rebuild" — separate plans.
