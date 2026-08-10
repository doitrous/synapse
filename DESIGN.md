# Design — "The Clinical Chart"

The visual language of medicine's own instruments: ruled vitals charts, graph/ECG
paper, formulary tables, fine anatomical line-work — rendered in a **premium warm
palette (Porcelain & Clay)** at the user's direction. Warm porcelain ground with a
faint paper grain, a clay/terracotta accent, and calibrated meters. Light-first,
built for long reading. No glass, no decorative gradients, no glow. (The original
build used a cool clinical-teal accent; the user asked for a premium light warm
colour with texture, so the accent, ground, heatmap ramp, and subject palette were
retuned — everything flows from the `@theme` tokens.)

Source of truth for tokens: `src/index.css` (`@theme`). Contract: the HTML comment
at the top of `<body>` in `index.html`.

## Palette

Defined as Tailwind v4 theme tokens; utilities follow (`bg-paper`, `text-ink`, …).

| Role | Token | Value |
|---|---|---|
| Page ground | `--color-paper` | `#f6f1e9` (warm porcelain + faint paper grain) |
| Card surface | `--color-surface` | `#fffdfa` (warm white) |
| Raised/inset | `--color-surface-2` / `--color-inset` | `#f1ebe1` / `#ece4d7` |
| Ink | `--color-ink` | `#241d16` (warm near-black) |
| Muted ink (≥4.5:1 on paper) | `--color-ink-2` | `#6b6053` (warm taupe) |
| Faint ink (large/decorative) | `--color-ink-3` | `#9c9083` |
| Hairline / rule | `--color-line` / `--color-line-2` | `#e8dfd1` / `#dacfbd` |
| Chart grid | `--color-grid` / `--color-grid-major` | `#ede4d6` / `#e2d8c8` |
| **Accent (clay / terracotta)** | `--color-accent` | `#b0512b` (hover `-strong #8c3d1d`, tint `-tint #f4e5d9`) |
| On accent | `--color-on-accent` | `#fdf7f2` |
| Success / Warning / Danger | `--color-success/warning/danger` | `#5e7a4f` / `#a5732a` / `#b23a3a` (+ `-tint`) — functional only |
| Heatmap ramp | `--color-scale-0…5` | `#ece4d5 → #8c3d1d` (porcelain → clay) |

The ground carries a faint SVG paper-grain (fixed, ~5% opacity) for a premium
tactile feel. Success/warning/danger are kept as small functional status signals
only — green never carries the theme. Subject dots use a muted, earthy categorical
palette (they must stay distinguishable across 8 subjects).

Color strategy: **Restrained** (neutrals + one accent) — correct for an Operate
product used for long sessions. Semantic colors are muted, never neon. Categorical
subject colors live in `src/data/student.ts` (8 medium-chroma clinical hues).

## Typography

- **Display / headings:** Source Serif 4 (variable) — carries the character. Weight ~560, tracking −0.011em.
- **UI / body:** Geist (variable) — crisp neo-grotesque; avoids the default-Inter tell. Base 15px / 1.55.
- **Data / numerals:** Geist Mono, tabular figures (`.tnum`) everywhere numbers align (times, counts, %, meters).
- Panel titles are **sans** (13px semibold); page titles are **serif**. This split is the primary hierarchy signal.

## Radius / Elevation / Motion

- Radius: 6 / 8 / 10 / 12 / 16px — restrained, never pill-rounded cards.
- Shadows: offset + soft blur only (`--shadow-panel/raised/pop`). Hairline borders do most separation. No zero-offset halos, no glow.
- Motion: `--ease-out-quint`, 100–250ms. One authored moment — meters fill on mount like instruments calibrating. Named entrances: `animate-fade/pop/slide-x/rise`. All respect `prefers-reduced-motion`.

## Signature materials

- **Chart grid** (`grid-chart`, `grid-chart-major`): faint graph/ECG paper. Used sparingly and only in measurement/blueprint contexts — the landing product specimen and the placeholder blueprint sketch. **Never** on the main dashboard. (The detector flags the utility generically; its use here is the committed world's material, kept to blueprint/specimen surfaces.)
- **Calibrated meters** (`Meter`) and the **reference-range scale** (exam readiness: Building / On track / Exam-ready zones with a marker) — the clinical alternative to generic donut rings.
- **Retention meters** color-coded by strength (danger < 50 < warning < 70 < success).

## Authentication surfaces

Authentication uses a **clinical intake sheet**, not a detached marketing card.
`AuthLayout` owns the full porcelain page, quiet ruled header, wordmark, page title,
supporting copy, optional account-progress line, bordered warm-white sheet, and the
persistent trust statement below it. Account creation uses the wide version of
the sheet (`max-w-5xl`): the form occupies the primary column and a narrower,
tonally inset ownership ledger explains which notes, plans, attempts, and
progress records belong to the verified account. Sign-in, verification,
password recovery, sign-out, and MFA use the compact width (`max-w-4xl`) and
center their task content inside the same material language.

The three-stage **Account → Verify email → Protect account** progress treatment
appears only while the user is actually moving through that lifecycle. Completed
stages use the success signal, the active stage uses clay, and future stages stay
neutral. Sign-in, reset, and sign-out omit it rather than presenting false setup
progress. MFA adds a narrow status rail inside the sheet and makes the free TOTP
authenticator the active method: QR code, manual secret, six-digit code, and
verification action form one continuous task. SMS remains visible as a subdued,
non-interactive future method with a `Provider required` badge and explicit cost
copy; never style or describe it as available before the provider is configured.

### Security and trust cues

- State the boundary in plain language at the point of commitment: Supabase Auth
  verifies identity; private learning records are stored in MariaDB under the
  verified account ID. The ownership ledger makes this concrete with real data
  categories rather than generic privacy claims.
- Use semantic tints sparingly and literally: warning for an unconfigured account
  service, danger for an actionable failure, and success only after confirmed
  verification or completion. Provider errors are translated into calm
  problem-and-recovery copy; raw service messages do not become interface voice.
- Student and Admin preview destinations remain visible at every breakpoint.
  Their labels shorten to `Student` and `Admin` on narrow screens. Preview
  navigation is not an authorization claim: editing live admin data requires a
  server-provided owner key entered at runtime, retained only in the current
  browser tab, and cleared on sign-out. Never embed that key in the built site.
- Admin role changes use a list-and-review composition with visible role and
  account-status badges, a recorded reason, explicit confirmation, and disabled
  controls for suspended accounts. Recovery-point actions use the same honest
  loading/status language and identify automatic versus manual snapshots.
- Meaningful helper, status, identifier, and disabled-method copy uses
  `text-ink-2` or stronger to preserve 4.5:1 contrast. `text-ink-3` remains
  decorative only. Password rules use a neutral circle until met and a check
  only after success, so state is never communicated by colour alone.

### Responsive auth composition

- Below `lg`, split sheets become one vertical reading order: the form first,
  then the ownership ledger separated by a top rule. MFA moves its status rail
  above the method content with a bottom rule. Do not compress either pattern
  into side-by-side columns on a phone.
- Page padding is 16px on mobile, 24px from `sm`, and 32px from `lg`; sheet
  padding steps from 20px to 28px to 36px. Inputs and primary actions retain a
  minimum 44px touch height on mobile.
- Header preview links remain available on mobile as two compact destinations,
  never one ambiguous plural link. Paired actions stack vertically on narrow
  screens and may align horizontally from `sm` when labels remain comfortable.
- Keep auth body copy at a readable measure (about 52–65ch), allow titles to
  balance naturally, and let long emails, setup secrets, and recovery messages
  wrap without widening the sheet.

## Component inventory

- Primitives (`src/components/ui/`): `Button` (primary/secondary/ghost/danger · sm/md/lg · icon + loading), `IconButton`, `Panel` + `PanelHeader`, `Badge` (6 tones + dot), `Meter`, `Avatar`, `Kbd`, `Icon` (lucide at a single 1.75 stroke), `Subject` (dot/tag), `Tabs` + `Segmented`, `Toggle`, `Table`, `Field`/`TextInput`/`Textarea`/`Select`/`SearchInput`, `FilterChip`, `EmptyState`.
- Charts (`src/components/charts/`): `BarList` — single-hue horizontal magnitude bars (dataviz-guided: thin marks, rounded ends, direct labels, identity via label not colour). Study heatmap is hand-rolled SVG-free CSS cells.
- Shell (`src/components/shell/`): `AppShell` (collapsible sidebar + mobile drawer + ⌘K), `Sidebar` (grouped nav, portal-aware), `Topbar` (breadcrumb, search, portal switch), `CommandSearch` (keyboard-navigable palette), `Page` (container + header).
- Dashboard (`src/components/dashboard/`): `NextOnSchedule`, `DueReviews`, `ProgressTrio`, `TodaysPlan` (live checkboxes), `StudyHeatmap`, `LastUsedResources`.
- Authentication (`src/pages/auth/`): `AuthLayout` (wide/compact sheet · optional lifecycle progress · preview navigation · trust footer), ownership ledger, password-rule checklist, verification status, TOTP enrollment/challenge, disabled future-method row, and centered confirmation/recovery states.

## Guardrails (do / don't)

- **Do:** tabular figures for all data; serif for page/section headings; one accent; hairline rules; real states (hover/active/disabled/empty); ≥4.5:1 body text.
- **Don't:** eyebrows/kickers above headings; gradient text; glass/blur as decoration; colored `border-left > 1px`; monospace as a "technical" costume; a big centered icon as an empty-state hero; dark-mode-by-default. Light vs dark is chosen from the use scene (long daytime study), not category.

## Not yet built

Dark mode is architected-for (tokens) but not shipped — light-first is deliberate.
Phases 2–3 add the remaining surfaces on this same system.
