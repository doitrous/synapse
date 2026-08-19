# Pricing page

`/pricing` (English) and `/ar/pricing` (Arabic). Built against the
pricing-page design skill; this is its five-part output, plus what is still
open.

---

## 1. Page outline

| # | Section | Why it is here |
|---|---|---|
| 1 | Breadcrumb back to home | The page is reachable directly from search, so it needs a way up |
| 2 | H1 + subhead | The outcome, for whom. Not "Plans & pricing" — that is the section heading below it |
| 3 | Three assurances | Trial, cancel, refund — **above** the prices, because risk is what makes a price readable |
| 4 | Billing control | Monthly / every 3 months / yearly, with the saving computed from the offer |
| 5 | Three tiers | Free, QBank, Adaptive — one promoted |
| 6 | "And a few other ways in" | Add-on, Exam Sprint, Campus — demoted so the primary decision stays at three |
| 7 | Comparison table | 18 rows in 3 groups; stacked cards on mobile |
| 8 | **FAQ — 12 Q/A** | The new part. Two thirds of the page by height |
| 9 | Trust / procurement | Four facts about the account and its data |
| 10 | Closing CTA | Free plan, no card |

## 2. Pricing table spec

Unchanged from what the landing section already carried — the numbers live in
`src/pages/landing/content.ts` and are the single source for the page, the
landing teaser, and the saving percentages.

| Plan | Monthly | 3 months | Yearly | CTA |
|---|---|---|---|---|
| Free | 0 | — | — | Start free |
| QBank | 99 | 249 | 799 | Subscribe |
| **Adaptive** *(Best value)* | 199 | 499 | 1499 | Subscribe |
| Adaptive add-on | 79 | 199 | — | Add on |
| Exam Sprint | 249 / 30 days | — | — | Start a sprint |
| Campus / cohort | Quoted | — | — | Start, then talk to us |

All EGP. Savings are computed by `savingPercent()` from the monthly price, and
rounded down so the page never claims more than the offer.

## 3. FAQ

Twelve questions, in the order objections actually arrive: cancel → card →
limits → which plan → switching → annual maths → curriculum → **clinical
guidance** → data on lapse → institutional → currency and billing → exam-only.

Rendered as `<details>` so answers stay in the DOM when collapsed — findable by
search, by an answer engine, and by the browser's own find.

## 4. SEO / AEO

| Tag | English |
|---|---|
| Title | Pricing — Synapse · Plans for undergraduate medical study |
| Description | One workspace for the library, question bank, practicals and your schedule, priced per student from EGP 99 a month. Start free with a 7-day full trial, no card. |
| Canonical | `https://synapse.doitrous.com/pricing` |
| hreflang | `en` → /pricing, `ar` → /ar/pricing, `x-default` → /pricing |
| JSON-LD | `FAQPage` (all 12) + `BreadcrumbList` |

Set at runtime by `usePageMeta` (`src/lib/pageMeta.ts`), which reverts every tag
on unmount so one route's head never leaks onto another's.

Internal links in: header (every marketing page), footer, and the landing
teaser — three entry points, per the skill's internal-linking checklist.

### The one real limitation

`usePageMeta` runs in JavaScript. Crawlers that execute JS — Google, Bing, and
the major answer engines — see these tags. A plain `curl` sees `index.html`'s
site-level head instead.

That is fine for ranking today and not fine forever. The fix is prerendering
`/pricing` and `/ar/pricing` at build time (`vite-plugin-prerender` or an
equivalent), which would emit the real head into static HTML. Worth doing before
any paid campaign points at this URL.

## 5. Layout recommendation

**A — Classic 3-card**, with a **D — Enterprise last mile** tail.

Three natural tiers already exist and one is clearly the recommendation, which
is exactly what A is for. The reason not to use C ("pick your path") is that
Synapse's audiences are not separate: an individual student and a cohort student
use the same product, and the cohort is a procurement decision made by somebody
else. So Campus sits in the demoted row as reassurance rather than as a column
competing for a student's attention.

B (value-metric slider) is wrong here — the value metric is a seat, and a slider
implies usage pricing the product does not have.

---

## Still open

The FAQ answers only what the product actually does. Three questions were left
out because the facts are not settled, and a vague answer on a pricing page is
worse than no question:

| Question to add | What is needed first |
|---|---|
| "How can I pay?" | The payment processor, and which cards/wallets it accepts in Egypt |
| "Where is my data stored?" | The hosting region, stated plainly |
| "Are you SOC 2 / GDPR compliant?" | An actual certification or a documented position. **Do not claim either without one.** |

Also absent, and deliberately: **social proof**. The skill asks for testimonials
and results near the decision points, and `PRODUCT.md` states that any
commercial claim must be supplied as real data rather than invented. There are
no real testimonials yet, so there is no proof section — add one when there is
something true to put in it.
