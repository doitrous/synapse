# Nishany — brand implementation spec (v1)

Nishany (نيشاني, "my target") replaces every prior brand name: **Maristana**,
**Synapse** (internal codename), **Connect Cortex** (mobile/en/ar app label), and the
Orbitron "ARISTANA" logotype with the Courtyard-M mark. The endorsement line is
**"BY CONNECT"** (shortened — "BY CONNECT ACADEMY" retires with the rest).

Decided by Omar 2026-08-31. Design canvas:
https://claude.ai/code/artifact/595e7dad-255d-4c33-b1ec-a2ccf8924ef2

## The mark — "Noon Dot"

The bowl of the letter ن drawn as one thick blue stroke, its dot come to rest at
the bullseye, inside a faint aiming ring. Canonical SVGs live in `public/brand/`
(`nishany-mark.svg`, `-dark`, `-mono`, `-white`). Canonical geometry (viewBox 0 0 64 64):

```svg
<circle cx="32" cy="32" r="29" stroke="#c4d9f7" stroke-width="2" fill="none"/>
<path d="M18.6 21.75 A17.5 17.5 0 1 0 45.4 21.75" stroke="#1553b3"
      stroke-width="9" stroke-linecap="round" fill="none"/>
<circle cx="32" cy="28.5" r="6" fill="#d13a63"/>
```

In React components use theme aliases, not literals: bowl `var(--brand-blue)`,
dot `var(--brand-rose)`, ring `var(--color-accent-line)`. Dark surfaces lift the
bowl to `#5a8ee0`; the dot never changes. The mono variant is single-ink; the
white variant is for photos/dark floods. App icon: the mark on a white disc over
a crimson `#d13a63` rounded square.

## Wordmark & fonts

- Latin: **nishany** — lowercase, Baloo 2 ExtraBold (800), tracking 0, a **normal
  dotted i** (no bullseye tittle in the logotype).
- Arabic: **نيشاني** — Baloo Bhaijaan 2 ExtraBold (800), the same family voice.
  Never letterspace Arabic.
- Endorsement: **BY CONNECT** — Geist SemiBold, ~0.24em tracking, ink-2.
- Fonts ship via fontsource (match the existing `@fontsource-variable/*` pattern;
  plain `@fontsource/baloo-2` + `@fontsource/baloo-bhaijaan-2` if the variable
  packages don't exist). `--font-brand` in `src/index.css` points at Baloo 2 with
  `"Baloo Bhaijaan 2"` next in the stack; **remove Orbitron** (dependency too).
- UI/reading fonts are unchanged: Geist, Source Serif 4, Geist Mono.

## Color

Every hex token is unchanged. Only narrative renames: primary is **nishan
crimson** (the hit — actions, active nav, meters), accent is **field blue** (the
ground — sources, chips, structure). Update the `src/index.css` header comment
block to the Nishany story; do not touch token values. Never a crimson→blue
gradient. The four themes (light/warm/dark/oled) carry over as-is.

## Target-as-progress (the mark is also the meter)

One vocabulary for every progress surface (design board "Target as progress"):

- Track/field = `--color-inset` (or quiet blue for long-horizon metrics).
  Advance = crimson `--color-primary`. Long-horizon (mastery) rings = blue.
- **The centre dot is earned**: it appears only at 100% — an unfinished meter
  never shows the bullseye dot. Completing a goal completes the brand mark.
- Ring device: circular meter, round caps, sweeps from 12 o'clock; on completion
  the dot pops at centre (use `--dur-calibrate` 900ms; normal sweeps ~260ms
  `--ease-out-quint`).
- Linear device ("the approach"): bar whose leading edge is a 10px crimson dot,
  with a small hollow bullseye (blue ring, grey centre) waiting at the track end;
  at 100% the centre of that bullseye turns crimson and the leading dot merges.
- Micro: streak days are landed dots (filled crimson), today is an open ring;
  countable goals (8–16 items) may use tick-segments around a centre.
- RTL mirrors everything: rings sweep counter-clockwise, bars fill right→left.

## Scope guards (do NOT touch in this wave)

- `synapse-*` / `synapse.*` **storage & state keys** (client and server) — live
  data contract, needs its own migration wave.
- iOS `PRODUCT_BUNDLE_IDENTIFIER com.synapse.app`, Android
  `applicationId com.synapse.android`, push topic — breaking installed apps.
- The **Maristana hospital-game feature** (components/maristanas, /api/maristanas,
  maristana_* DB tables, public/maristana/ stages) — separate product decision.
- Domains `synapse.doitrous.com` / `adminsynapse.doitrous.com` and
  `portalHost.ts` routing regexes.
- Content tooling & corpora: `scripts/` (except `scripts/og/`), `docs/` outside
  this folder, `Instruction Manual for Content Creation/`.
- Root PDFs `Synapse-Overview*.pdf` — regenerate later.
