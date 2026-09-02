/**
 * Stop a `type: 'update'` concept row from silently full-overwriting a live
 * id another university owns.
 *
 * Root cause (Helwan ID-collision audit, 2026-09-02,
 * docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md):
 * `HU-LCS-103-family163-q15-28-author.mjs` hand-typed a live Kasr id
 * (`CON-REN-B9E0531973510E`, `gout: '...'` in its `conceptIds` map) into a
 * `type: 'update'` spec and let `conceptBase` build a full body for it —
 * label, definition, aliases, pitfalls, concept_type, everything — the same
 * way it would for a concept Helwan actually minted. That bypassed
 * `mint-concept-id.mjs`'s own collision check entirely (that tool is never
 * invoked for an "update"), and `mergeAuthoringData` (src/data/importMerge.ts)
 * then applied the row's plain (non-`+`) `universities`/`learner_years`/
 * `modules` values as a *replace*, not an append — so on import this would
 * have overwritten Kasr's concept body and narrowed its university/year/
 * module tagging to Helwan-only, 87 times across the family163 batch (84 of
 * them bare full-record rows; 1 a genuine meaning change, the rest cosmetic
 * rewording).
 *
 * The fix has two parts. This module is the second: a live-state check that
 * makes the *generator* incapable of reproducing the bug, so a rebuild
 * regenerates the corrected sparse-overlay output instead of the original
 * bare full-record rows.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const REPO = resolve(here, '../../..')
const FIXTURE = resolve(REPO, 'server/data/medical-library-v1.json')
const DOCS = resolve(REPO, 'docs')

/**
 * Every id this generator could plausibly be asked to "update": the live
 * fixture (server/data/medical-library-v1.json), plus every OTHER
 * university's `*-Source-Imports/concept/*.md` and `docs/import-ready/
 * concept/*.md` — deliberately excluding `Helwan-Source-Imports`, since a
 * Helwan-authored id enriching Helwan's own prior record is exactly the safe
 * case this guard must not flag.
 *
 * The fixture alone is not enough: it is a snapshot (2026-08-12) that
 * predates most current Kasr/ASU/Alexandria batches, so an id whose only
 * live record is on `main`'s markdown tree — like the actual `disc`
 * collision this audit found — would read as "safe" from the fixture alone.
 * Both are scanned; the markdown tree is a full record, or nothing.
 */
let liveById = null
function loadLive() {
  if (liveById) return liveById
  liveById = new Map()

  const fixtureData = JSON.parse(readFileSync(FIXTURE, 'utf8'))
  for (const c of fixtureData.states['nishany-concept-graph-v2']?.concepts ?? []) {
    if (c.id) liveById.set(c.id, { label: c.label ?? '', canonicalKey: c.canonicalKey ?? '', universityIds: c.universityIds ?? [] })
  }

  const conceptDirs = []
  if (existsSync(DOCS)) {
    for (const name of readdirSync(DOCS)) {
      if (!name.endsWith('-Source-Imports') || name === 'Helwan-Source-Imports') continue
      const dir = join(DOCS, name, 'concept')
      if (existsSync(dir)) conceptDirs.push(dir)
    }
  }
  const importReady = join(DOCS, 'import-ready', 'concept')
  if (existsSync(importReady)) conceptDirs.push(importReady)

  for (const dir of conceptDirs) {
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md')) continue
      const text = readFileSync(join(dir, file), 'utf8')
      for (const block of text.split(/(?=^# Item\s*$)/m)) {
        const id = block.match(/^## id\r?\n(.+)$/m)?.[1]?.trim()
        if (!id) continue
        const canonicalKey = block.match(/^## canonical_key\r?\n(.+)$/m)?.[1]?.trim() ?? ''
        const universities = (block.match(/^## universities\r?\n([\s\S]*?)(?=\n## |\n---|\n*$)/m)?.[1] ?? '')
          .split(/\r?\n|\||;/).map((s) => s.trim().replace(/^\+\s*/, '')).filter(Boolean)
        const existing = liveById.get(id)
        // A markdown record only replaces what is already known when it is
        // more complete (has a canonical_key), so a bare sparse pointer row
        // elsewhere in the corpus never masks a genuine full record.
        if (!existing || (!existing.canonicalKey && canonicalKey)) {
          liveById.set(id, { label: '', canonicalKey, universityIds: universities })
        }
      }
    }
  }
  return liveById
}

/**
 * True when `id` is a live concept owned by a university other than
 * `ownUniversity` (default `hu`). This is deliberately conservative: an id
 * with no live record at all (still-pending, or genuinely Helwan's own new
 * mint) is never "foreign" — only an id that already resolves to someone
 * else's published record is.
 */
export function isForeignLiveId(id, ownUniversity = 'hu') {
  const record = loadLive().get(id)
  if (!record) return false
  const owners = record.universityIds ?? []
  return owners.length > 0 && !owners.includes(ownUniversity)
}

/**
 * The sparse Helwan overlay row shape for a foreign live id: tag fields
 * only, no body. This is exactly the row shape the audit's fix restored by
 * hand on every bare full-record row this bug produced — this function is
 * what makes a rebuild reproduce that fix instead of reverting it.
 *
 * `label` defaults to the live record's own value so the row still satisfies
 * `isRecognisedUpdate` (scripts/validate-content-batch.mjs, which requires a
 * concept row to restate its label) without ever asserting Helwan's own
 * wording over the live one. `canonical_key` is deliberately left BLANK
 * (never defaulted from `record`), even though this module's own live lookup
 * carries one: the fix's own dry run caught this exact trap — Kasr's
 * *markdown* source occasionally renames a `canonical_key` after the id was
 * minted (9 such pre-existing cases, `report-duplicate-keys.ts` §3), so the
 * *markdown* key and the actually-imported *live* key can disagree. A sparse
 * row that restates the markdown one would import as a real field change —
 * replacing the live key with a newer one this batch has no authority to
 * assert — and would itself show up as a fresh same-id/different-key
 * finding. Leaving it blank means "untouched": the live key stands,
 * whichever of the two it is.
 */
export function sparseOverlayRow({ id, module, learnerYear = '1', university = 'hu', label, extraNote = '' }) {
  const record = loadLive().get(id)
  const owners = (record?.universityIds ?? []).join(', ') || 'unknown'
  return {
    label: label ?? record?.label ?? '',
    id,
    canonical_key: '',
    universities: `+${university}`,
    learner_years: `+${learnerYear}`,
    modules: `+${module}`,
    field_notes: `Sparse Helwan overlay: ${id} is a live concept owned by another university (${owners}). `
      + 'This row adds Helwan tagging only — no body field, and no canonical_key restatement, is ever set here, or a '
      + 'rebuild would re-open the Helwan ID-collision audit\'s overwrite '
      + '(docs/chief-of-staff/HELWAN-ID-COLLISION-AUDIT-2026-09-02.md).'
      + (extraNote ? ` ${extraNote}` : ''),
  }
}

/**
 * Guard for a `type: 'update'` concept spec, called at the point a generator
 * is about to build its full-body fields for `id`. Returns the sparse
 * overlay row when `id` is a live id owned by someone other than Helwan (in
 * which case the generator MUST use this returned row instead of building a
 * full body from the spec's own definition/aliases/pitfalls/etc.); returns
 * `null` when it is safe to build the full record as authored — `id` has no
 * live record at all, or Helwan already co-owns it.
 */
export function sparseIfForeignLive({ id, module, learnerYear, university, label, canonicalKey }) {
  if (!isForeignLiveId(id, university)) return null
  return sparseOverlayRow({ id, module, learnerYear, university, label, canonicalKey })
}
