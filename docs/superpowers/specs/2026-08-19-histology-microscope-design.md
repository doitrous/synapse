# Histology and the microscope — design

**Date:** 2026-08-19
**Status:** Approved, ready to plan
**Slice:** E of an eleven-part request

---

## Scope

Slices A+B and H are built and staged on `main` (PR #12). This is slice E,
brought forward at the owner's request.

### In scope

1. A **Histology tab** for students, under Practical.
2. A **microscope** on that tab. Pressing it opens the slide picker; choosing a
   slide plays the focus animation and lands inside the eyepiece on the slide.
3. A **slide viewer** with an objective turret — **4× / 10× / 40×** — switching
   between one image per objective.
4. **Labelled structures**, hidden by default, revealed one at a time or all at
   once, each with a short note.
5. A **Histology tab in the admin console** for adding slides, following the
   same layout and sections as the other content editors, with bulk import.

### Out of scope

Slices C, D, F, G (essay questions, flashcards, study parties, the word game),
unchanged and still ordered as in the A+B spec.

**A spotter quiz is deliberately not built.** The pins this slice authors are
exactly the data such a quiz needs, so it becomes a small addition later rather
than a rebuild. Building it now would mean no slide is usable until every
structure on it is written.

---

## The asset, and what it decided

The supplied video is a camera push-in: it starts on the whole instrument and
ends **inside the eyepiece**, on a white circular field with a dark rim.

That ending is the design. The animation is not decoration bolted onto a
viewer — it is the transition *into* the viewer, and the circular field it
lands on is the frame the slide appears in.

It ships as `public/microscope/focus.mp4`, prepared from the 10.04s / 960×960 /
3.5 MB source with its AAC track:

- **audio stripped** — a control that plays sound when a student presses it is a
  defect, and the track was dead weight
- **2.3s instead of 10s** — ten seconds is a film; this is a transition a
  student takes many times a session
- **H.264, not VP9** — VP9 came out *larger* on footage this flat, and H.264
  needs no fallback
- 3.5 MB → **292 KB** including both stills, which matters on Egyptian mobile
  data

`focus-poster.jpg` (first frame, the whole instrument) is what shows before it
plays. `focus-end.jpg` (last frame) is the `prefers-reduced-motion` fallback:
the student lands in the eyepiece **without the journey**, rather than being
denied the destination.

---

## Decisions taken

1. **Objectives, not continuous zoom.** Each slide carries one image per
   objective. The turret switches them. This is how histology is taught and
   examined — find it at low power, confirm at high power — so the microscope
   does real work instead of being a frame. It costs 2–3 images per slide, which
   is the price of the metaphor being true.
2. **Labels are revealed, not given.** A slide that names everything up front is
   a diagram. Hidden pins make the student look first.
3. **The animation plays after the choice, not before it.** Pressing the
   microscope opens the picker; the push-in plays once a slide is chosen, so it
   covers a real transition rather than delaying one.
4. **A slide is a content kind of its own**, authored like every other kind
   through the existing ledger, editor and bulk import — not a special case
   bolted onto practicals.

---

## 1 · Data

### `ContentKind` gains `'histology'`

`ContentKind` currently spans `'question' | 'article' | 'practical' |
'resource'` and fans out to eight modules — `contentControl.ts`,
`bulkImport.ts`, `pickerOptions.ts`, `ContentEditorDialog.tsx`,
`ControlDashboard.tsx`, `BulkImportPage.tsx`, `contentReports.ts` and
`ReportContentDialog.tsx`. Adding a kind means touching all eight. That is the
established path for authored content and it is what buys the admin tab its
editor, its status workflow, its scoping by university and year, and its bulk
import for free.

### The shape

```ts
/** One magnification of one slide. */
export interface SlideView {
  objective: 4 | 10 | 40
  /** A stored media reference, resolved exactly as question attachments are. */
  image: string
}

export interface SlideStructure {
  id: string
  label: string
  /** Where the pin sits, as a fraction of the image — so it survives any
   *  rendered size. Stored per objective, because a structure visible at 40×
   *  is usually not where it was at 4×, if it is on screen at all. */
  at: Partial<Record<4 | 10 | 40, { x: number; y: number }>>
  note?: string
}

export interface HistologySlide {
  id: string
  title: string
  subjectId: string
  tissue: string
  /** H&E, PAS, Masson trichrome … */
  stain: string
  views: SlideView[]
  structures: SlideStructure[]
  description?: string
}
```

**Pins are fractional, per objective.** Storing pixels would break the moment
the image is rendered at any other size, and storing one position for the whole
slide would put the 4× pin in the wrong place at 40× — the two images are
different fields, not the same picture scaled.

A slide with no `structures` is still a valid slide. Labelling is what makes it
good, not what makes it work.

---

## 2 · The student's Histology tab

A sixth tab beside OSCE stations, Clinical cases, Oral questions, Skills, and
Lab & imaging.

**The microscope.** The poster frame, presented as a control with an accessible
name — pressing it opens the picker. It is a `<button>`, not a decorated `div`,
so it is reachable by keyboard and announced as what it is.

**The picker.** The published slides, grouped by system, each row naming its
tissue and stain, with a count. Empty until slides are published, and it says so
plainly rather than showing an empty microscope.

**The transition.** On choosing a slide, `focus.mp4` plays once. It is preloaded
on the picker opening, not on tab mount — a student who never opens histology
should not pay for it. Under `prefers-reduced-motion` the video is skipped
entirely and `focus-end.jpg` is shown for a beat instead.

**The viewer.** A circular field of view — **CSS, not an image**, so it scales
and takes the theme — holding the current objective's image, with:

- an **objective turret**: 4× / 10× / 40×, showing only the objectives that
  slide actually has
- **pins** for each structure at the current objective, hidden until asked for:
  *Reveal one* on tapping a pin, *Reveal all* as a single control
- the slide's title, tissue and stain beneath, and its description where it has
  one
- pan by drag when the image overflows its field

Every string goes through `useT()`, and the layout uses logical properties
throughout — the app runs RTL in Arabic.

---

## 3 · The admin Histology tab

A `HistologySetup` page in the same shape as `PracticalSetup`: the university/
year navigator on the left, wrapped around `ControlDashboard` with
`initialKind="histology"` and `lockedKind`. That gives the catalogue, search,
status filter, and the editor without inventing a second way to author content.

The editor adds three things the other kinds do not have:

- **one image per objective**, uploaded through the existing media path
- **structures**, each with a label, an optional note, and a pin placed by
  clicking the image at each objective it appears in
- the usual **status workflow** — Draft, In review, Published, Archived — so an
  unlabelled slide can sit in Draft rather than reaching students half-written

**Bulk import** follows the existing schema pattern in `bulkImport.ts`: a
`histology` entry with its fields and a markdown example, so a batch of slides
arrives the same way questions and practicals do. Pins are the one thing bulk
import cannot reasonably carry — clicking a point on an image is not a
spreadsheet cell — so imported slides arrive with their images and metadata and
are labelled in the editor.

---

## 4 · Verification

**Unit** — pure modules, tested as this repo tests (`node --test`, relative
`.ts` imports):

- pin coordinates round-trip as fractions and are clamped to 0–1
- a structure with no pin at the current objective is not rendered
- the turret offers only the objectives a slide has, and picks the lowest as
  the opening view
- `validateImportRow` accepts a well-formed histology row and refuses one
  missing a required field
- a slide with no structures is valid

**Typecheck** — `npx tsc -b` green; `noUnusedLocals` is on.

**In the browser:**

- the tab renders, and says plainly that nothing is published when nothing is
- pressing the microscope opens the picker; choosing a slide plays the
  transition once and lands on the slide
- the turret switches images, and pins move with the objective
- *Reveal one* and *Reveal all* behave, and pins start hidden
- with `prefers-reduced-motion` set, the video does not play and the viewer is
  still reached
- the admin tab lists slides, opens the editor, and places a pin by clicking

**Not verifiable here:** nothing about this slice needs a database, so unlike
the friend graph it can be exercised end to end in demo mode.
