# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + Vite + TypeScript + Tailwind CSS v4, with `react-router-dom` and
`lucide-react`, spanning many interactive surfaces (whiteboard, charts,
calendar). Backed by a Node/Express + MariaDB API with Supabase Auth, plus
native iOS (Swift) and Android (Kotlin) clients that share the same API. Runs in
demo mode with `npm run dev` (localStorage, seeded data) or in live mode against
`server/`. Fonts are self-hosted via Fontsource (offline, no external requests).

## Users

Primary: **undergraduate medical students** (MBBS-style, organ-system curriculum,
Years 1–5) studying across the library, question bank, and clinical practicals,
and managing a heavy revision load against fixed exam dates.

Secondary: **curriculum administrators** (faculty/operations) who author content,
run the academic calendar, handle payments, and govern access.

## Product Purpose

Nishany brings the library, question bank, practicals, resources, and schedule
into one calm workspace and answers the student's real daily question — *what
should I study next?* — using spaced-repetition review, progress signals, and a
clear plan for the day. Success = the student opens Nishany and knows, within
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

The web app runs in two modes: a **demo mode** (typed local data in `src/data/`,
no backend) for offline preview, and a **live mode** with real Supabase
authentication, MariaDB persistence, media storage, email, and payment
processing through `server/`. Medical content is authored for undergraduate
medicine and is a study aid — **not** clinical guidance, and not claimed as
authoritative.

Build status: **all three phases shipped.** Phase 1 — design system, app shell,
landing, Student Dashboard. Phase 2 — the 10 remaining student surfaces. Phase 3 —
the 11 admin surfaces. Every surface across both portals is built; any unmapped
route falls back to an "on the build plan" placeholder.

## Brand Commitments

- Name: **Nishany** (نيشاني, “my target”) — a deliberate reference to studying
  toward a goal, not a generated tech name.
- Voice: precise, calm, clinical; never hype or gamified.
- Anti-goal, set by the user: avoid "AI slop" — generic AI-dashboard aesthetics.

## Evidence on Hand

Demo-mode data in `src/data/student.ts` (names, schedules, sample metrics) is
authored and illustrative. Live-mode content is real medical material authored
through the admin console and content pipeline across multiple Egyptian
universities. Any commercial claim (pricing, institutional customers,
benchmarks) must be backed by real data, not invented.

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
