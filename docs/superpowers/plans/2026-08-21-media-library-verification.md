# Media library — verification record

Date: 2026-08-21
Branch: `claude/media-library-user-hierarchy-42f2c5`
Plan: `docs/superpowers/plans/2026-08-21-media-library.md`

## What was verified here, and what could not be

No database credentials and no Supabase session in this worktree, so every check
that needs a real upload is listed under *Outstanding* and **is not claimed as
passing**. Everything checkable without a backend was checked.

## Automated suites

| Command | Result |
|---|---|
| `npm test` | **1096 passed, 0 failed** (1085 before this work — 11 new) |
| `cd server && npm test` | **202 passed, 0 failed** (187 before — 15 new) |
| `npm run build` (`tsc -b` + Vite) | **succeeds**, no TypeScript errors |
| `npm run lint` | **0 errors** |

New suites: `imageMeta`, `mediaLibrary` (server); `mediaLibrary` (parity against
the server module), `mediaPlacement`, `conceptPriority` (client).

## Static sweeps

```
grep -rn "storeMediaFile" src/ | grep -v mediaStorage.ts
```

Two callers remain, both correct:

- `useMyDocuments.ts:98` — inside an `if (!API_MODE)` branch. With a backend, a
  student's document uploads properly; the IndexedDB path is demo mode only.
- `QuestionEditorDialog.tsx:235` — audio and video only. **Images are refused
  there now** and sent to Placed images, so the old control can no longer
  manufacture media a student cannot see. A recording says plainly that it is
  stored in this browser only, which was always true and never stated.

## Verified in a running browser (demo mode)

| Check | Result |
|---|---|
| Media requests group under the item waiting on them | pass — two requests render under one question as one job |
| A request shows the slot it names | pass — `stem` and `answer C` |
| `supplied` cannot be selected by hand | pass — present but `disabled`; the other three stay selectable |
| Each outstanding request offers "Supply it" | pass |
| The stranded-media panel counts and lists browser-only images | pass — "1 question holds an image that only exists in one browser" |
| Media library lists records with size and usage count | pass — "used by 2 items" / "used by 0 items" |
| A record missing alt text and rights is held back, and says which | pass — "held back — no alt text, no cleared rights" |
| A complete record reads `live` | pass |
| Usage panel names the count before any action | pass — "2 items use this image." |
| Replace states its blast radius first | pass — "All 2 items above will show the new image." |
| Re-pointing is a separate control with its own tickboxes | pass — 2 tickboxes, one per placement |
| Delete states the server will refuse while in use | pass |
| No broken images anywhere | pass — 0 images with `naturalWidth === 0` |

**One defect found and fixed during this run.** With no backend, Vite's SPA
fallback answers `/media/:id` with **HTML and a 200**, which `PlacedImage`
wrapped in a Blob labelled `image/png` and rendered as a broken picture. It now
checks the leading bytes against PNG/JPEG/GIF/WebP signatures before creating
the object URL, and states *"the server did not return an image for this record"*
instead. The server already refuses to believe a declared type on the way in;
this is the reading half of the same stance, and it matters in production too —
a proxy error page or a sign-in redirect answering 200 would otherwise render as
a broken image with no explanation.

## Outstanding — requires a running backend

**None of these has been run.** The first is the one this whole plan exists for.

1. **The round trip.** Attach an image to a question's stem and confirm the
   editor renders the student view with it in place. Then **clear the browser's
   IndexedDB and site data, reload, and reopen the question** — the image must
   still render. Under the old path it vanished. Then open it in a different
   browser as a different console account, and finally as a student for whom the
   question is published. Repeat for an image on answer C and on the explanation.
2. **Reuse.** Attach one record to a second question; confirm the usage panel
   shows both. Replace the file everywhere and confirm both change. Re-point one
   and confirm the other is untouched. Delete and confirm a **409** naming its
   users.
3. **Dedupe.** Upload the identical file twice: one stored file, a duplicate
   prompt offering the existing record, no second copy on disk.
4. **Refusals.** A PDF renamed `.png` → **415**, with nothing written under
   `media/`. A file over `MEDIA_MAX_BYTES` → **413**, with no staging file left
   behind.
5. **Release gating.** A record with no alt text does not reach the student view.
6. **Histology.** Upload a slide, clear site data, confirm it still renders.

## Deployment note

`MEDIA_MAX_BYTES` defaults to 20 MB and needs no configuration. Media shares
`RESOURCE_STORAGE_DIR`, so **no new volume or mount is required** — but that
volume now grows with every image, where previously it moved only when a
textbook was added. Its free space is worth watching.

Every media route is behind `requireTab('resources')`. The role hierarchy's own
outstanding checks
(`2026-08-21-admin-role-hierarchy-verification.md` §Outstanding) should be run
first: a reviewer who cannot reach that tab cannot upload, and debugging that
here would be debugging the wrong feature.
