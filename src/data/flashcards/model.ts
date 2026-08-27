/**
 * The flashcard domain: notes a student authors, and the cards they generate.
 *
 * A note is what the student writes; a card is what they study. The two are
 * kept apart because they answer to different owners. One Basic note is one
 * card; one Cloze note with `{{c1::…}} {{c2::…}}` is two cards that share a
 * front; one Image Occlusion note is one card per occluder or grouped set. When
 * a student fixes a typo in a note, only the affected cards are regenerated —
 * an untouched sibling keeps the schedule it earned, because that schedule is
 * this student's own recall evidence and lives under their own key, never on
 * the note. See `generate.ts` for how a note becomes cards, and `migration.ts`
 * for how the flat v1 `{front,back}` decks are carried into this shape without
 * discarding a single interval.
 *
 * Nothing in this module reads a clock or a store. Identity is derived from
 * content, never from `Date.now()` or a counter, so regenerating a note's cards
 * twice lands on exactly the same ids and a card's history follows it across an
 * edit. That is the same discipline `srs.ts` and `decks.ts` already keep.
 */

import type { CardSchedule, Grade } from '../srs.ts'

/** A field's stored value: sanitized rich-text HTML (see `richText.ts`). */
export type RichText = string

export type NoteType = 'basic' | 'cloze' | 'image-occlusion'

/**
 * The seven study flags, in Anki's own order so `Cmd/Ctrl+1..7` maps straight
 * across. The colours are named, not hex: the palette is a theme concern that
 * lives in `flag.ts` and the CSS tokens, so a flag survives a theme change and
 * is never encoded by colour alone (it carries its name in tooltips and search).
 */
export type FlagColor = 'red' | 'orange' | 'green' | 'blue' | 'pink' | 'turquoise' | 'purple'

export const FLAG_ORDER: readonly FlagColor[] = ['red', 'orange', 'green', 'blue', 'pink', 'turquoise', 'purple']

export interface NoteBase {
  id: string
  type: NoteType
  /** The deck this note's cards belong to. Moving a note moves its cards. */
  deckId: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface BasicNote extends NoteBase {
  type: 'basic'
  fields: { front: RichText; back: RichText }
}

export interface ClozeNote extends NoteBase {
  type: 'cloze'
  /** The cloze source text, `{{c1::hidden::hint}}` markup and all. */
  fields: { text: RichText; extra: RichText }
}

/** A single occluder region, in image-space coordinates (see `occlusion.ts`). */
export interface Occluder {
  id: string
  shape: OccluderShape
  /** Text revealed for this occluder when it is the one being guessed. */
  label: RichText
  /** Set when this occluder is part of a group; the group generates one card. */
  groupId?: string
}

export type OccluderShape =
  | { kind: 'rect'; x: number; y: number; w: number; h: number }
  | { kind: 'ellipse'; x: number; y: number; w: number; h: number }
  | { kind: 'polygon'; points: { x: number; y: number }[] }

export interface OccluderGroup {
  id: string
  label: RichText
}

/**
 * How an occlusion note shows its cards.
 *  - `hide-all`: every occluder is masked, one is asked. Anatomy-atlas style.
 *  - `hide-one`: only the asked occluder is masked, the rest stay visible.
 */
export type OcclusionMode = 'hide-all' | 'hide-one'

export interface ImageOcclusionNote extends NoteBase {
  type: 'image-occlusion'
  /** A `synapse-media:` reference; the blob lives in `mediaStorage`, not here. */
  image: string
  imageWidth: number
  imageHeight: number
  occluders: Occluder[]
  groups: OccluderGroup[]
  mode: OcclusionMode
  fields: { header: RichText; back: RichText }
}

export type Note = BasicNote | ClozeNote | ImageOcclusionNote

/**
 * A generated, studyable card. It carries no content of its own: `noteId` plus
 * `templateKey` is enough to render it from the note, and keeping it that way
 * means an edit to the note never has to migrate a copy held on the card.
 *
 * `templateKey` is the stable discriminator among a note's siblings:
 *   - Basic:            `'card'`
 *   - Cloze:            `'c1'`, `'c2'`, … (the cloze number, not its position)
 *   - Image Occlusion:  the occluder id, or the group id for a grouped set
 * The card id is `${noteId}::${templateKey}`, so it is stable across regenera-
 * tion by construction and never collides between notes.
 */
export interface Card {
  id: string
  noteId: string
  deckId: string
  templateKey: string
}

export function cardId(noteId: string, templateKey: string): string {
  return `${noteId}::${templateKey}`
}

/**
 * The note id a catalogue (provided) deck's card takes. Provided-deck content is
 * synthesized from the catalogue on load rather than stored, so its cards need a
 * stable id derived from the deck and the catalogue card — the same one the
 * migration writes for a v1 provided mirror — so a student's schedule follows
 * the card whether its content comes from the catalogue or a stored fallback.
 */
export function providedNoteId(deckId: string, catalogueCardId: string): string {
  return `provided:${deckId}:${catalogueCardId}`
}

/**
 * A student's standing on one card: the schedule that says when it is due, plus
 * the study-action state that sits alongside scheduling — flag, suspend, bury.
 *
 * `reviewCount` and `resetSinceReview` exist because two of the deck's status
 * definitions can't be read off the schedule alone. "Unseen" means the card has
 * no review history at all — `reviewCount === 0`. "Learned" means it has at
 * least one completed review and has not *since* been reset — `reviewCount >= 1
 * && !resetSinceReview`. A reset returns the schedule to `new` but must not
 * erase the fact that reviews happened; it flips `resetSinceReview` true, and
 * the next grade flips it back, so a card relearned after a reset is learned
 * again. The review-event log is the corroborating audit trail.
 */
export interface CardMeta {
  schedule: CardSchedule
  flag: FlagColor | null
  suspended: boolean
  /** Local calendar day (`YYYY-MM-DD`) the card is buried until; null if not. */
  buriedUntil: string | null
  /** Cumulative count of grade answers ever committed. Never cleared by reset. */
  reviewCount: number
  /** True after a manual reset, until the next grade clears it. */
  resetSinceReview: boolean
  firstReviewedAt: string | null
  lastReviewedAt: string | null
}

/** A never-studied card's standing: due now, no history, nothing acted on. */
export function newCardMeta(schedule: CardSchedule): CardMeta {
  return {
    schedule,
    flag: null,
    suspended: false,
    buriedUntil: null,
    reviewCount: 0,
    resetSinceReview: false,
    firstReviewedAt: null,
    lastReviewedAt: null,
  }
}

export type SchedulerType = 'sm2' | 'fsrs'

/**
 * One entry in the audit trail of everything that ever happened to a card.
 *
 * The deck counts and every statistic are derived from these records, never
 * invented: a chart with no events shows an honest empty state. A manual action
 * (reset, suspend, set-due) is logged with the same weight as a grade so the
 * card-info panel can replay the full history, and so "reset" leaves a trace
 * rather than silently rewriting the past. `localDay` is stamped from the
 * student's own clock at write time because true-retention counts the first
 * review of a card *per local day*, and recomputing that from a UTC timestamp
 * after the fact would put a late-night review on the wrong day.
 */
export interface ReviewEvent {
  id: string
  at: string
  cardId: string
  noteId: string
  deckId: string
  kind: ReviewEventKind
  /** Present only when `kind === 'grade'`. */
  grade: Grade | null
  stateBefore: CardSchedule['state']
  stateAfter: CardSchedule['state']
  intervalBefore: number
  intervalAfter: number
  /** Milliseconds from card shown to answer committed; null when not measured. */
  timeSpentMs: number | null
  scheduler: SchedulerType
  localDay: string
}

export type ReviewEventKind =
  | 'grade'
  | 'reset'
  | 'set-due'
  | 'suspend'
  | 'unsuspend'
  | 'bury'
  | 'unbury'

/**
 * A student's whole flashcard collection, versioned so the shape can change
 * again without a guess about what an older document held. `version` is checked
 * on read by `migration.ts`; a document without one is the pre-versioned v1
 * store and is migrated forward.
 */
export interface FlashcardCollection {
  version: 2
  decks: Record<string, DeckRecord>
  notes: Record<string, Note>
  /** Card id → the student's standing on it. Cards themselves are derived. */
  meta: Record<string, CardMeta>
}

export interface DeckRecord {
  id: string
  name: string
  /** Set when this deck mirrors a published catalogue deck. */
  sourceId?: string
  /** Per-deck scheduler and limits; absent means the app defaults apply. */
  config?: DeckConfig
  createdAt: string
}

export interface DeckConfig {
  scheduler: SchedulerType
  newPerDay: number
  maxReviewsPerDay: number
}

export const EMPTY_COLLECTION: FlashcardCollection = { version: 2, decks: {}, notes: {}, meta: {} }
