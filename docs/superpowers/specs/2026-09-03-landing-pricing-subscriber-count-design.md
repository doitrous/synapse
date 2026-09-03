# Landing rebuild, pricing single-source-of-truth, and live subscriber count

Date: 2026-09-03
Status: Approved (design) — pending spec review
Branch: `claude/landing-pricing-redesign-b43b01`

## Goal

Three linked pieces of work, driven by `Nishany-Showcase-EN.pdf`:

1. **Landing page rebuild** — turn the 10-section showcase PDF into the live marketing
   landing, as faithful on-brand HTML recreations that showcase the real product, with the
   design bugs fixed (e.g. timeline dots that don't sit on the track).
2. **Pricing redo + single source of truth** — one place defines prices, promos, and
   vouchers; the public pricing page, the quote endpoint, and every admin screen read it.
3. **Live subscriber count** — a superadmin-controlled marketing number (target 790) that
   ticks up, fully secluded from the real `students`/`subscriptions` data.

## Decisions locked with the user

- **Checkout:** no payment gateway now. Voucher entry + live quote via existing
  `/api/pricing/quote`; subscriptions still granted manually by admin.
- **Languages:** English first; Arabic routes keep working with existing copy; dedicated
  RTL pass afterward.
- **Product visuals:** faithful on-brand HTML/CSS recreations on the real design tokens
  (not screenshots), so they stay live, fixable, and animatable.
- **Subscriber count model:** seed + daily drift, with real signups added on top; never
  writes real data.
- **First-time promo:** launch promo shown to everyone while ON, toggle + tune % in
  settings. Strict per-account enforcement deferred until real checkout.
- **Counter placement:** compact figure in the hero + one dedicated trust band deeper in
  the page.

## Non-goals

- No payment gateway (Paymob/Fawry/Stripe) integration.
- No third voucher system — consolidate the two that exist into one.
- No new DB table for the count — reuse `app_state` (+ its free `app_state_versions`).
- No Arabic/RTL redesign in this pass (routes keep working; copy unchanged until the AR pass).

---

## Current state (from codebase map)

- **Landing:** `src/pages/landing/LandingShell.tsx` (+ `nishanyContent.ts`, `content.ts`),
  chrome via `MarketingShell.tsx`. Served at `/`, `/en`, `/ar` (`src/router.tsx`).
- **Pricing:** `src/pages/landing/PricingPage.tsx` + `Pricing.tsx` + `pricingContent.ts`,
  at `/pricing`, `/ar/pricing`.
- **Prices duplicated in 6 places:** `server/src/pricing.js:4-7` (`ALL_ACCESS_PRICES`,
  hardcoded 400/1000), `src/data/planCatalogSeed.ts:134`, `PaymentsFinance.tsx:153-154`,
  `PricingPage.tsx:18-19`, `Pricing.tsx:29-31`, and literal strings in `pricingContent.ts`.
- **Catalog** (`nishany-plan-catalog-v1` app_state doc) is designed to be the one source
  (`src/data/planCatalog.ts`, `planCatalogSeed.ts`, `usePlanCatalog.ts`).
- **Two voucher systems:** SQL `pricing_promotions`/`pricing_vouchers` (wired to
  `/api/pricing/quote`, admin form in PaymentsFinance) and app_state `nishany-vouchers-v1`
  (`src/data/vouchers.ts`, admin `VoucherManagement.tsx`, server `server/src/vouchers.js`,
  audience targeting + trials). Plus a student-ID discount (`nishany-student-id-discount-v1`).
- **Superadmin:** derived from `SUPER_ADMIN_EMAILS` allowlist; `requireSuperAdmin`
  (`server/src/auth.js:276`); Settings page is superadmin-only.
- **Settings storage:** `app_state (k, v, updated_at)` JSON KV, versioned in
  `app_state_versions`. Read `GET /api/state/:key`; generic write `PUT /api/state/:key` is
  `requireConsole` (NOT superadmin). Whitelist of student-readable keys at
  `server/src/index.js:1355-1398`.
- **Real counts (keep separate):** `server/src/platformReports.js` — `COUNT(*) FROM students`,
  active subscriptions query. DB = MariaDB, raw `mysql2`, schema in `server/schema.sql`.

---

## 1. Pricing single source of truth

### Data model (catalog is authority)

Extend the plan catalog period/plan shape (`src/data/planCatalog.ts` + seed) so each active
plan period can carry an optional promo:

```ts
// per plan, per period
prices: { month: 400, term: 1000 }            // base (unchanged values)
promo?: {                                       // NEW — first-time / launch offer
  month?: { enabled: boolean; percentOff: number }  // 25
  term?:  { enabled: boolean; percentOff: number }  // 30
}
```

- `maristana` seed gains `promo.month = {enabled:true, percentOff:25}`,
  `promo.term = {enabled:true, percentOff:30}`.
- A `promoPrice(plan, period)` helper returns the discounted whole-EGP price when enabled,
  else the base. Rounding: round to nearest whole EGP (25% of 400 = 300; 30% of 1000 = 700).

### Backend agreement

- `server/src/pricing.js`: replace the hardcoded `ALL_ACCESS_PRICES` with a read of the
  `nishany-plan-catalog-v1` doc from `app_state` (pattern: storage-limits read at
  `server/src/index.js:551-566`). Apply the promo the same way the UI does so
  `/api/pricing/quote` matches the displayed price. Fall back to the seed defaults only if
  the doc is missing.

### Kill duplication

- Remove `?? 400 / ?? 1000` fallbacks in `PaymentsFinance.tsx`, `PricingPage.tsx`,
  `Pricing.tsx`; read from catalog. Keep exactly one shared last-resort constant (the seed).
- Replace literal price strings in `pricingContent.ts` (EN + AR) with values derived from
  the catalog (savings, per-month equivalents) — mirror what `Pricing.tsx:34-35` already does.

### One admin editor

- Prices + promo toggles edited in **Payments & Finance** via `PlanCatalogEditor`
  (`src/components/admin/PlanCatalogEditor.tsx`): add per-period promo enable + percent inputs.
- Retire the rival "All-access pricing" server panel and the SQL `pricing_promotions`/
  `pricing_vouchers` "Create discount" form in `PaymentsFinance.tsx` so there is no second
  place a price/promo can be set. (SQL tables may remain in schema, unused, to avoid a
  destructive migration.)

## 2. Vouchers

Consolidate on the app_state system (`nishany-vouchers-v1`, `src/data/vouchers.ts`,
`server/src/vouchers.js`, admin `VoucherManagement.tsx`).

- Extend the `Voucher` model with an optional **per-period fixed target price**:
  ```ts
  periodPrices?: { month?: number; term?: number }  // absolute EGP the code charges
  ```
  This expresses Ambassador (month → 250, term → 550) which is not a clean percent.
  Existing percent/fixed and trial grants stay supported.
- `voucherDiscount()` honors `periodPrices` first when present.
- Seed the **Ambassadors** voucher (code TBD with user, default `AMBASSADOR`), `periodPrices:
  { month: 250, term: 550 }`, no audience restriction, redemption cap TBD.
- Wire `/api/pricing/quote` (`server/src/pricing.js` / index route) to accept a voucher code,
  validate via the shared voucher logic, and return the discounted total.
- Pricing/signup page: a voucher-code field that calls the quote endpoint and shows the live
  total. **Best price wins, no stacking** — min(base, promo, voucher). Matches the existing
  "single lowest option wins" rule.

## 3. Live subscriber count (secluded)

### Storage

New app_state key `nishany-subscriber-display-v1` (superadmin-owned):

```ts
{
  enabled: boolean,          // default false until superadmin turns on
  base: number,              // 790
  epoch: number,             // ms timestamp when base/realCountAtEpoch were set
  realCountAtEpoch: number,  // real active-subscriber count captured at epoch
  minPct: number,            // 0.3
  maxPct: number,            // 2.5
  daySeed?: number           // optional, for deterministic daily multiplier
}
```

Never writes `students`/`subscriptions`. Reads a real count only to compute the "added on
top" delta.

### Model

- **Synthetic component** grows each calendar day by a random multiplier
  `m ∈ [minPct, maxPct]` (percent of the running synthetic total). Within a day it eases
  linearly from the day's start value to start + `round(start * m)`, by fraction of day
  elapsed — so it "increases across the day" rather than jumping.
- **Real on top:** `displayed = syntheticNow + max(0, realCountNow − realCountAtEpoch)`.
- Whole numbers; **monotonic non-decreasing** (clamp so a lapsed real sub never drops it).
- Daily multiplier derived deterministically from `epoch`/date (+ optional `daySeed`) so the
  server and any client compute the same value and it's stable across a day.

### Endpoints

- **Public read:** `GET /api/public/subscriber-count` → `{ enabled, value, ratePerSecond }`.
  `value` = current integer; `ratePerSecond` = today's growth / 86400 for the client's live
  tick. Returns `{ enabled:false }` when off (front-end then hides the widget).
  (Alternatively whitelist the key for public `GET /api/state/:key` and compute client-side;
  the dedicated endpoint is preferred so the real-count read stays server-side.)
- **Superadmin write:** `POST /api/admin/subscriber-count` guarded by `requireSuperAdmin`
  (model on `server/src/index.js:2247`). Sets `enabled`, `base`, `minPct`, `maxPct`; on a
  base change it re-captures `epoch` + `realCountAtEpoch`. Writes the app_state key
  server-side (do NOT use the generic `requireConsole` PUT).

### Front-end

- `useSubscriberCount()` hook: fetches the endpoint, exposes `{ enabled, value }`.
- `<LiveCount>` component: on scroll-into-view (IntersectionObserver, once) animates
  **0 → value**, then increments by `ratePerSecond` for a live feel; a pulsing dot + "live"
  label. Respects `prefers-reduced-motion` (no count-up, just the final number).
- Placement: compact figure in the hero; one "790 students across universities" trust band
  deeper in the page.

### Superadmin UI

- A panel in `src/pages/admin/Settings.tsx` (already superadmin-only): number input for base,
  on/off toggle, min/max percent, and a read-only preview of the current computed value.

## 4. Landing rebuild

Rebuild `src/pages/landing/LandingShell.tsx` (EN content) as the full PDF story, faithful
recreations on `src/index.css` tokens. Section order:

1. **Hero** — نيشاني target artwork, "Med school, right on target," subhead, primary CTA,
   compact `<LiveCount>`.
2. **A decade with the doctors above you** — "one method, the whole road" timeline. Fix:
   dots snapped exactly onto the path (SVG path + points share one coordinate space).
3. **We grade understanding, not just accuracy** — concept-digestion rings + next-block bar.
4. **Never let a weak concept survive** — 3-step drill.
5. **Every format your exams throw at you, in one bank** — 4 formats.
6. **Compare yourself — anonymously** — cohort leaderboard + QOTD + privacy.
7. **Everything a study session needs, built in** — notebook/whiteboard/pomodoro/focus.
8. **Your material, our tools** — PDF editor + synced across platforms.
9. **Momentum you can share** — study party + minigames.
10. **Trust band** — "790 students across universities" (`<LiveCount>` large).
11. **Pricing teaser** → link to `/pricing`.
12. **Closing CTA** + footer (MarketingShell).

Subtle scroll-in motion; `prefers-reduced-motion` respected. AR (`LandingAr`) keeps rendering
the existing content until the RTL pass.

## 5. Testing

- **Pricing math** (`src/data/planCatalog` promo helper + voucher `periodPrices`): promo %
  rounds to 300/700; Ambassador returns 250/550; best-price/no-stacking picks the min.
- **Count model:** daily multiplier stays within [minPct, maxPct]; whole numbers; monotonic;
  real delta added; disabled → hidden.
- Keep the roles parity test green (`src/data/adminRoles.ts` ↔ `server/src/roles.js`).
- Browser verification of landing + pricing (light/dark), and the superadmin panel writing
  the count.

## Files touched (indicative)

- Data/model: `src/data/planCatalog.ts`, `src/data/planCatalogSeed.ts`, `src/data/vouchers.ts`,
  new `src/data/subscriberCount.ts`.
- Backend: `server/src/pricing.js`, `server/src/vouchers.js`, `server/src/index.js` (routes +
  key whitelist), possibly `server/src/platformReports.js` (reuse the count query).
- Public UI: `src/pages/landing/LandingShell.tsx`, `Pricing.tsx`, `PricingPage.tsx`,
  `pricingContent.ts`, `MarketingShell.tsx`, new `LiveCount` + `useSubscriberCount`.
- Admin UI: `src/components/admin/PlanCatalogEditor.tsx`, `src/pages/admin/PaymentsFinance.tsx`,
  `src/pages/admin/VoucherManagement.tsx`, `src/pages/admin/Settings.tsx`.

## Open items to confirm during build

- Ambassador voucher **code string** and **redemption cap**.
- Whether to also show `<LiveCount>` on the pricing page (user chose hero + band on landing;
  pricing-page counter is optional).
