# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: React 19 + Vite + TypeScript + Tailwind CSS v4, with `react-router-dom`
and `lucide-react`. Chosen for a component-driven prototype spanning many
interactive surfaces (whiteboard, charts, calendar) that runs with a single
`npm run dev` and leaves a clean path to a real backend. Fonts are self-hosted
via Fontsource (offline, no external requests).

## Users

Primary: **undergraduate medical students** (MBBS-style, organ-system curriculum,
Years 1–5) studying across the library, question bank, and clinical practicals,
and managing a heavy revision load against fixed exam dates.

Secondary: **curriculum administrators** (faculty/operations) who author content,
run the academic calendar, handle payments, and govern access.

## Product Purpose

Osler brings the library, question bank, practicals, resources, and schedule
into one calm workspace and answers the student's real daily question — *what
should I study next?* — using spaced-repetition review, progress signals, and a
clear plan for the day. Success = the student opens Osler and knows, within
seconds, what deserves attention today.

## Positioning

An all-in-one clinical study instrument where every question links back to the
library subtopic and source resource, and where "due reviews" and exam-readiness
are first-class surfaces — not a bolt-on flashcard app or an isolated Qbank.

## Operating Context

Long, repeated study sessions (light-first UI for reading endurance); a
university curriculum layer that must stay visually distinct from the student's
personal plan; exam blocks (written + OSCE) that anchor readiness and pacing.

## Capabilities and Constraints

Two portals under one design system: a Student app (Dashboard, Library, Question
Bank, Practical, Calendar, Performance, Resources, Whiteboard, Notebook, Study
Together, Billing) and an Admin console (Control Dashboard, Academic/Library/
Questions/Practical Setup, Resources & Media, Email & Automations, Payments &
Finance, Privacy & Support, Settings, Audit & Security).

Constraint: this is a **front-end prototype** with a typed mock data layer
(`src/data/`). No real authentication, database, or payment processing. Content
is realistic and illustrative for undergraduate medicine — **not** clinical
guidance, and not claimed as authoritative.

Build status: **all three phases shipped.** Phase 1 — design system, app shell,
landing, Student Dashboard. Phase 2 — the 10 remaining student surfaces. Phase 3 —
the 11 admin surfaces. Every surface across both portals is built; any unmapped
route falls back to an "on the build plan" placeholder.

## Brand Commitments

- Name: **Osler** (after Sir William Osler, founder of modern bedside medical
  education). A deliberate, human reference — not a generated tech name.
- Voice: precise, calm, clinical; never hype or gamified.
- Anti-goal, set by the user: avoid "AI slop" — generic AI-dashboard aesthetics.

## Evidence on Hand

None real. All names, schedules, questions, resources, and metrics in
`src/data/student.ts` are authored placeholders labelled illustrative. Any future
commercial claim (pricing, institutional customers, benchmarks) must be supplied
as real data, not invented.

## Product Principles

1. **Answer "what next?" first.** The schedule and what's slipping lead every view.
2. **Everything links.** Questions → library → resources, one click apart.
3. **Honest signals.** Progress and readiness reflect real state, shown as
   calibrated measurements, never vanity metrics.
4. **Built for endurance.** Light-first, low-noise, tabular data — for hours of study.
5. **Separate curriculum from personal plan.** Always visually distinct.

## Accessibility & Inclusion

Light-first for long-form reading; body/placeholder text ≥ 4.5:1 contrast;
keyboard-navigable command palette (⌘K) and focus-visible outlines; motion
respects `prefers-reduced-motion`; the anonymous year leaderboard shows no names.
