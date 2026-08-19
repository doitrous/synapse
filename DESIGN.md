# Design — Connect Cortex · "The Clinical Chart"

The visual language of medicine's own instruments: ruled vitals charts, graph/ECG
paper, formulary tables, fine anatomical line-work. Light-first, built for long
reading. No glass, no decorative gradients, no glow.

This is the **Connect Cortex Design System**, the rebrand of the product formerly
named Synapse. The architecture, interaction model and component inventory carry
over intact; the identity is new. The palette is a **restrained two-hue brand**
taken from the split-hemisphere mark: **cortex crimson** is the right hemisphere
and the working accent (actions, active navigation, selection, meters), **cortex
blue** the left and the secondary, structural one (sources, concept chips,
answered-state markers, categorical marks). Deliberately the reverse of the
medical-software default, where blue is heavily overused.

The blue lives in the ground, the red in the controls — that division is what
keeps a two-hue brand calm. Roughly **70% neutral / 25% crimson / 5% blue** per
screen. **Never a red→blue gradient**, and never the two at equal weight in one
component.

Source of truth for tokens: `src/index.css` (`@theme`). Contract: the HTML comment
at the top of `<body>` in `index.html`.

## Palette

Defined as Tailwind v4 theme tokens; utilities follow (`bg-paper`, `text-ink`, …).
Values below are the **light** theme, which is the reference ground; `warm` and
`dark` re-declare the same token names, so no component ever branches on theme.

| Role | Token | Value |
|---|---|---|
| Page ground | `--color-paper` | `#f5f7fb` (a very light hint of the brand blue + 4% paper grain) |
| Card surface | `--color-surface` | `#ffffff` |
| Raised/inset | `--color-surface-2` / `--color-inset` | `#eef1f7` / `#e4e9f2` |
| Ink | `--color-ink` | `#161920` (near-black, faintly cool) |
| Muted ink (≥4.5:1 on paper) | `--color-ink-2` | `#5d636f` |
| Faint ink (large/decorative) | `--color-ink-3` | `#949aa8` |
| Hairline / rule | `--color-line` / `--color-line-2` | `#e3e7ef` / `#ccd3e0` |
| Chart grid | `--color-grid` / `--color-grid-major` | `#e8ecf4` / `#dbe1ec` |
| **Primary (cortex crimson)** | `--color-primary` | `#d13a63` (hover `-hover #b62d55`, text-on-tint `-strong #a82449`, tint `-tint #fff5f5`) |
| On primary | `--color-on-primary` | `#ffffff` — 4.67:1 on the fill, clears AA |
| **Accent (cortex blue)** | `--color-accent` | `#1553b3` (`-strong #0e3f8c`, `-tint #eaf1fd`) |
| Success / Warning / Danger | `--color-success/warning/danger` | `#1a6e56` / `#8a5a0a` / `#a8121e` (+ `-tint`) — functional only |
| Heatmap ramp | `--color-scale-0…5` | `#e8ecf4 → #a82449` (ground → crimson) |

`#d13a63` is the lightest, pinkest rose that still carries a **white** label at AA.
That is the floor: a lighter fill forces a dark label, and a dark label on a
coloured button reads as a warning rather than an action. If a lighter button is
ever required it becomes a *tinted* button (`primary-tint` fill, `primary-strong`
text, `primary-line` border), never a lighter filled one.

`--color-primary-strong` is the **text** step, not a fill. It is what sits on a
tint. Filled controls hover to `--color-primary-hover`, which darkens in light and
*brightens* in dark; using `-strong` as a hover fill would make buttons turn pale
in the dark theme.

`#fff5f5` (`--color-primary-tint`) is a **control fill, not a background** — pills,
chips, filter chips, selected nav, active tabs, selected answer options, pickers.
Never a page, card, section or hero. If a whole area is coral, that is a bug.
Because the tint is near-white, selection is never carried by the fill alone: the
`nav-selected` utility adds a hairline and a 2px crimson spine (mirrored in RTL).

**Danger shares the brand family**, so it is never told apart by hue alone: danger
is deeper and less orange than primary and arrives as a tint + dot + word. Primary
is the only filled red used as an action. Success/warning/danger stay small
functional status signals — green never carries the theme, and state is never
carried by colour alone.

Curriculum systems use a categorical, medium-chroma palette that must stay
distinguishable; the colour lives on the system chip's **3px spine**, never as a
fill. Seeds are in `src/data/curriculumCatalog.ts`, the picker swatches in
`src/data/systemColors.ts`, and any admin override wins over both.

## Typography

- **Display / headings:** Source Serif 4 (variable) — carries the character. Weight ~560, tracking −0.011em.
- **UI / body:** Geist (variable) — crisp neo-grotesque; avoids the default-Inter tell. Base 15px / 1.55.
- **Data / numerals:** Geist Mono, tabular figures (`.tnum`) everywhere numbers align (times, counts, %, meters).
- **Brand:** Jost (`--font-brand`, `font-brand`) — the logotype's own geometric sans. **Wordmark and lockups only**; never body copy, never UI, never headings.
- Panel titles are **sans** (13.5px bold, −0.012em); page titles are **serif**. This split is the primary hierarchy signal.

All four are self-hosted via Fontsource — no external font requests.

## Brand mark

The mark is the client-supplied artwork (`public/brand/`), not redrawn or traced.
In interface lockups **the O in CONNECT *is* the mark**, so the wordmark and the
symbol are one thing: `CONNECT` blue, `CORTEX` crimson, one word, no space,
uppercase, Jost 500 at 0.045em. Never recolour the halves, never separate them,
never substitute a real letter O. `logo-dark.png` (both brand colours lifted) is
swapped in under the dark theme — the light artwork's deep blue goes muddy on
`#0d1117`. The logotype itself needs no swap: it reads `--brand-blue` /
`--brand-rose`, which the dark theme moves up the ramp.

## Radius / Elevation / Motion

- Radius: 6 / 8 / 10 / 12 / 16px — restrained, never pill-rounded cards.
- Shadows: offset + soft blur only (`--shadow-panel/raised/pop/control`). Hairline borders do most separation. No zero-offset halos, no glow. On the primary the shadow is tinted with the action colour (`--shadow-action`), not black.
- Motion: `--ease-out-quint`, 100–250ms for interface response. One authored moment — meters, rings and readiness markers fill on mount like instruments calibrating (900ms, 120ms delay, final value persists).

**Authored transitions.** No bounce, no spring, no parallax, no scroll-driven
animation, no looping ambient motion. Everything respects `prefers-reduced-motion`.

| Utility | Duration | Where |
|---|---|---|
| `animate-screen-in` | `--dur-screen` 260ms | `<main>` in `AppShell`, keyed on the sidebar **destination** — 8px, because the shell stays put and only the page re-settles. Keyed on the section rather than the full pathname, so moving between two resources does not remount the reader. |
| `stagger` | `--stagger-step` 26ms, capped at 8 | Marketing grids only (pricing tiers). Deliberately **not** combined with `animate-screen-in` — compounding two settles reads as a double-bounce. |
| `cortex-collapse` + `chevron-turn` | `--dur-collapse` 280ms | `Collapse` measures its own height, because a transition to `auto` does not animate. A chevron turns 90° rather than swapping glyph, and mirrors in RTL. |
| `cortex-tab-indicator` | `--dur-base` 180ms | One rule that **slides** between tabs rather than one rule per tab appearing. Position measured from the active button, so it survives any label length, RTL, and horizontal scrolling. |
| `lift` | `--dur-base` 180ms | A −3px hover rise on pricing tiers. **Never** on a data row. |
| `animate-fade/pop/rise/slide-x` | 150 / 180 / 500 / 240ms | Overlay entrances — dialog, popover, mobile drawer (mirrored in RTL). |

**The hard rule: a screen or list entrance animates transform only, never
opacity.** A keyframe starting at `opacity: 0` with a fill mode leaves the element
*permanently invisible* in any document whose timeline never advances — a
background tab, an offscreen thumbnail iframe, a print pass, a DOM-capture
screenshot. Motion may refine how content arrives; it may never be the thing that
makes content visible. (The overlay entrances above may use opacity: they are
mounted by a user action in a live document and are never page content.)

## Signature materials

- **Chart grid** (`grid-chart`, `grid-chart-major`): faint graph/ECG paper. Used sparingly and only in measurement/blueprint contexts — the landing product specimen and the placeholder blueprint sketch. **Never** on the main dashboard. (The detector flags the utility generically; its use here is the committed world's material, kept to blueprint/specimen surfaces.)
- **Calibrated meters** (`Meter`) and the **reference-range scale** (exam readiness: Building / On track / Exam-ready zones with a marker) — the clinical alternative to generic donut rings.
- **Retention meters** color-coded by strength (danger < 50 < warning < 70 < success).

## Authentication surfaces

Authentication uses a **clinical intake sheet**, not a detached marketing card.
`AuthLayout` owns the full page ground, quiet ruled header, wordmark, page title,
supporting copy, optional account-progress line, bordered surface sheet, and the
persistent trust statement below it. Account creation uses the wide version of
the sheet (`max-w-5xl`): the form occupies the primary column and a narrower,
tonally inset ownership ledger explains which notes, plans, attempts, and
progress records belong to the verified account. Sign-in, verification,
password recovery, sign-out, and MFA use the compact width (`max-w-4xl`) and
center their task content inside the same material language.

The three-stage **Account → Verify email → Protect account** progress treatment
appears only while the user is actually moving through that lifecycle. Completed
stages use the success signal, the active stage uses crimson, and future stages stay
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

- Primitives (`src/components/ui/`): `Button` (primary/secondary/ghost/danger · sm/md/lg · icon + loading), `IconButton`, `Panel` + `PanelHeader`, `Badge` (7 tones + dot — `primary` crimson for what to act on, `accent` blue for what points elsewhere), `Meter`, `Avatar`, `Kbd`, `Icon` (lucide at a single 1.95 stroke; `open` publishes `data-open` for `chevron-turn`), `Subject` (dot/tag), `Tabs` (sliding indicator) + `Segmented`, `Toggle`, `Table`, `Field`/`TextInput`/`Textarea`/`Select`/`SearchInput`, `FilterChip`, `EmptyState`, `Collapse` (measured-height disclosure).
- Brand (`src/components/brand/`): `Wordmark` + `CortexMark` — the lockup and the mark, with the dark-ground artwork swap.
- Charts (`src/components/charts/`): `BarList` — single-hue horizontal magnitude bars (dataviz-guided: thin marks, rounded ends, direct labels, identity via label not colour). Study heatmap is hand-rolled SVG-free CSS cells.
- Shell (`src/components/shell/`): `AppShell` (collapsible sidebar + mobile drawer + ⌘K), `Sidebar` (grouped nav, portal-aware), `Topbar` (breadcrumb, search, portal switch), `CommandSearch` (keyboard-navigable palette), `Page` (container + header).
- Dashboard (`src/components/dashboard/`): `NextOnSchedule`, `DueReviews`, `ProgressTrio`, `TodaysPlan` (live checkboxes), `StudyHeatmap`, `LastUsedResources`.
- Authentication (`src/pages/auth/`): `AuthLayout` (wide/compact sheet · optional lifecycle progress · preview navigation · trust footer), ownership ledger, password-rule checklist, verification status, TOTP enrollment/challenge, disabled future-method row, and centered confirmation/recovery states.
- Adaptive Study (`src/components/adaptive/`): `RangeBar` (a band on a ticked track — no midpoint marker, because a dot inside a wide band reads as "the answer, with error bars" when the model only knows the value lies somewhere in it), `Figure` (a reading with its own "Not yet" state for sparse evidence), `Caveat` (a limit stated as a quiet inset note, never a warning banner — these are the terms every figure is offered on, and styling them as alarms trains students to dismiss them), `ShareRow`, `StatusBadge` (attention is *warning*, never danger: one wrong answer is a follow-up, not a weakness label). Admin editors in `src/components/admin/adaptive/`: `SettingGroup` (every tunable carries the sentence explaining what moving it does), `NumberSetting`, `ShareEditor` (running total, flagged the moment it drifts from 100%), `OrderEditor`.

## Guardrails (do / don't)

- **Do:** tabular figures for all data; serif page titles above sans panel titles; crimson for what the reader acts on and blue for what points elsewhere; hairline rules; real states (hover/active/disabled/empty); ≥4.5:1 body text; logical properties (`ps-/pe-`, `start/end`) so every surface survives `dir="rtl"`.
- **Don't:** eyebrows/kickers above hero headings; gradient text; a red→blue gradient or the two hues at equal weight in one component; the coral tint as a page/card background; glass/blur as decoration; colored `border-left > 1px`; monospace as a "technical" costume; a big centered icon as an empty-state hero (the glyph sits in a 44px hairline tile above a serif title); **emoji anywhere**; dark-mode-by-default. Light vs dark is chosen from the use scene (long daytime study), not category.

> A liquid-glass layer (`backdrop-filter` chrome and overlays) was built and then
> **removed at the user's direction** — it made the buttons read as broken. Do not
> reintroduce translucency or blur without asking.

## Themes

Three, all opt-in via `data-theme` on `<html>`, stamped before first paint by the
boot script in `index.html` so there is no flash. **Light is the default** and the
ground the palette is built around.

- **Light** — the reference. `#f5f7fb`, carrying a hint of the brand blue.
- **Warm** — a paper-tinted reading mode. Only the neutral ramp warms; the brand
  holds its value, because a button that is the same colour in all three themes is
  what makes them read as one brand. Not part of the upstream design system, which
  ships light and dark only; derived here at the user's direction.
- **Dark** — the ground is not black (`#0d1117` carries the same blue cast as the
  light paper). Elevation inverts: separation comes from the fill plus a hairline,
  and shadows survive only on genuinely floating things. Saturated brand colour is
  held as a **fill** and lifted as **text**. Pure white is never used for body ink.
  The paper grain is dropped entirely — the same texture on a dark ground reads as
  sensor noise — and the heatmap ramp ascends in brightness, because on a dark
  ground "more" has to mean lighter.

The theme preference key remains `synapse-theme`: it is the address of a setting
every existing reader already has on disk, not a piece of branding. The same is
true of every `synapse.*` storage key, the server state paths, and the
`synapse.doitrous.com` / `adminsynapse.doitrous.com` hostnames — none were renamed
at the rebrand, because renaming them would orphan saved work and break routing.
