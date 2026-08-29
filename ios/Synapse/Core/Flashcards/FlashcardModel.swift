import Foundation

/// The flashcard domain: notes a student authors, and the cards they generate.
/// A port of `src/data/flashcards/model.ts`.
///
/// A note is what the student writes; a card is what they study. The two are
/// kept apart because they answer to different owners: editing a note only
/// regenerates the affected cards, and each card's schedule (the student's own
/// recall evidence) lives under their own key, never on the note. Identity is
/// derived from content, never from a clock or a counter, so regenerating a
/// note's cards twice lands on exactly the same ids.
///
/// These types are the synced `FlashcardCollection` document, so their JSON must
/// match the web's exactly — including explicit `null`s where the web writes
/// them (see `CardMeta`/`ReviewEvent` below), since a divergent shape silently
/// splits a student's progress between the phone and the website.

/// A field's stored value: sanitized rich-text HTML (see `richText.ts`).
typealias RichText = String

enum NoteType: String, Codable, Equatable, Sendable {
    case basic, cloze
    case imageOcclusion = "image-occlusion"
}

/// The seven study flags, in Anki's own order so `1..7` maps straight across.
enum FlagColor: String, Codable, Equatable, Sendable, CaseIterable {
    case red, orange, green, blue, pink, turquoise, purple
}

/// The flags in Anki's order — the same order `FlagColor.allCases` yields.
let FLAG_ORDER: [FlagColor] = FlagColor.allCases

// MARK: - Occlusion geometry

struct OcclusionPoint: Codable, Equatable, Sendable {
    var x: Double
    var y: Double
}

enum OccluderShapeKind: String, Codable, Equatable, Sendable {
    case rect, ellipse, polygon
}

/// A rect/ellipse (x,y,w,h) or a polygon (points), tagged by `kind`. Modeled as
/// one struct with optional members so it round-trips the web's tagged-union
/// JSON without a custom coder: only the members for the active `kind` are set,
/// and the rest encode as absent.
struct OccluderShape: Codable, Equatable, Sendable {
    var kind: OccluderShapeKind
    var x: Double?
    var y: Double?
    var w: Double?
    var h: Double?
    var points: [OcclusionPoint]?
}

struct Occluder: Codable, Equatable, Sendable {
    var id: String
    var shape: OccluderShape
    /// Text revealed for this occluder when it is the one being guessed.
    var label: RichText
    /// Set when this occluder is part of a group; the group generates one card.
    var groupId: String?
}

struct OccluderGroup: Codable, Equatable, Sendable {
    var id: String
    var label: RichText
}

/// How an occlusion note shows its cards: `hide-all` masks every occluder and
/// asks one; `hide-one` masks only the asked occluder.
enum OcclusionMode: String, Codable, Equatable, Sendable {
    case hideAll = "hide-all"
    case hideOne = "hide-one"
}

// MARK: - FlashcardNote

/// A note's fields. The web keeps a different shape per note type
/// (`{front,back}`, `{text,extra}`, `{header,back}`), all optional here so one
/// struct round-trips every variant's flat JSON: unset members encode as absent,
/// exactly as the web omits the keys a type does not use.
struct NoteFields: Codable, Equatable, Sendable {
    // basic
    var front: RichText?
    var back: RichText?
    // cloze
    var text: RichText?
    var extra: RichText?
    // basic / cloze — a `synapse-media:` reference to an audio blob.
    var audio: String?
    // image-occlusion
    var header: RichText?
}

/// A note the student authored. Basic, Cloze and Image-Occlusion notes share a
/// flat JSON shape (base fields plus type-specific fields at the same level), so
/// they are one struct discriminated by `type`; the members only a given type
/// uses are optional and encode as absent for the others.
struct FlashcardNote: Codable, Equatable, Identifiable, Sendable {
    var id: String
    var type: NoteType
    /// The deck this note's cards belong to. Moving a note moves its cards.
    var deckId: String
    var tags: [String]
    var createdAt: String
    var updatedAt: String
    var fields: NoteFields
    // image-occlusion only:
    var image: String?
    var imageWidth: Double?
    var imageHeight: Double?
    var occluders: [Occluder]?
    var groups: [OccluderGroup]?
    var mode: OcclusionMode?
}

/// The card-audio media reference on a note, if any (Basic/Cloze only).
func noteAudio(_ note: FlashcardNote) -> String? {
    switch note.type {
    case .basic, .cloze: return note.fields.audio
    case .imageOcclusion: return nil
    }
}

// MARK: - Card

/// A generated, studyable card. It carries no content: `noteId` plus
/// `templateKey` renders it from the note. The id is `noteId::templateKey`, so
/// it is stable across regeneration and never collides between notes.
struct Card: Equatable, Identifiable, Sendable {
    var id: String
    var noteId: String
    var deckId: String
    var templateKey: String
}

func cardId(_ noteId: String, _ templateKey: String) -> String {
    "\(noteId)::\(templateKey)"
}

/// The note id a catalogue (provided) deck's card takes. Provided-deck content
/// is synthesized on load, not stored, so its cards need a stable id derived
/// from the deck and the catalogue card, and a student's schedule follows it.
func providedNoteId(_ deckId: String, _ catalogueCardId: String) -> String {
    "provided:\(deckId):\(catalogueCardId)"
}

// MARK: - Card standing

/// A student's standing on one card: the schedule plus the study-action state
/// (flag, suspend, bury) and the two counters status derives from.
///
/// A custom coder is used only to keep the nullable fields (`flag`,
/// `buriedUntil`, `firstReviewedAt`, `lastReviewedAt`) written as explicit
/// `null` — as the web does — rather than omitted, so the document round-trips
/// unchanged.
struct CardMeta: Equatable, Sendable {
    var schedule: CardSchedule
    var flag: FlagColor?
    var suspended: Bool
    /// Local calendar day (`YYYY-MM-DD`) the card is buried until; nil if not.
    var buriedUntil: String?
    /// Cumulative count of grade answers ever committed. Never cleared by reset.
    var reviewCount: Int
    /// True after a manual reset, until the next grade clears it.
    var resetSinceReview: Bool
    var firstReviewedAt: String?
    var lastReviewedAt: String?
}

extension CardMeta: Codable {
    enum CodingKeys: String, CodingKey {
        case schedule, flag, suspended, buriedUntil, reviewCount, resetSinceReview, firstReviewedAt, lastReviewedAt
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.container(keyedBy: CodingKeys.self)
        try c.encode(schedule, forKey: .schedule)
        // `encode` (not `encodeIfPresent`) writes an explicit null for nil.
        try c.encode(flag, forKey: .flag)
        try c.encode(suspended, forKey: .suspended)
        try c.encode(buriedUntil, forKey: .buriedUntil)
        try c.encode(reviewCount, forKey: .reviewCount)
        try c.encode(resetSinceReview, forKey: .resetSinceReview)
        try c.encode(firstReviewedAt, forKey: .firstReviewedAt)
        try c.encode(lastReviewedAt, forKey: .lastReviewedAt)
    }
}

/// A never-studied card's standing: due now, no history, nothing acted on.
func newCardMeta(_ schedule: CardSchedule) -> CardMeta {
    CardMeta(
        schedule: schedule, flag: nil, suspended: false, buriedUntil: nil,
        reviewCount: 0, resetSinceReview: false, firstReviewedAt: nil, lastReviewedAt: nil
    )
}

// MARK: - Review log

enum ReviewEventKind: String, Codable, Equatable, Sendable {
    case grade, reset
    case setDue = "set-due"
    case suspend, unsuspend, bury, unbury
}

/// One entry in the audit trail of everything that ever happened to a card.
/// Every statistic replays this log rather than a second source of truth.
///
/// A custom coder keeps `grade` and `timeSpentMs` written as explicit `null`
/// (the web's shape) when absent.
struct ReviewEvent: Equatable, Identifiable, Sendable {
    var id: String
    var at: String
    var cardId: String
    var noteId: String
    var deckId: String
    var kind: ReviewEventKind
    /// Present only when `kind == .grade`.
    var grade: Grade?
    var stateBefore: CardState
    var stateAfter: CardState
    var intervalBefore: Int
    var intervalAfter: Int
    /// Milliseconds from card shown to answer committed; nil when not measured.
    var timeSpentMs: Int?
    var scheduler: SchedulerType
    var localDay: String
}

extension ReviewEvent: Codable {
    enum CodingKeys: String, CodingKey {
        case id, at, cardId, noteId, deckId, kind, grade
        case stateBefore, stateAfter, intervalBefore, intervalAfter, timeSpentMs, scheduler, localDay
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.container(keyedBy: CodingKeys.self)
        try c.encode(id, forKey: .id)
        try c.encode(at, forKey: .at)
        try c.encode(cardId, forKey: .cardId)
        try c.encode(noteId, forKey: .noteId)
        try c.encode(deckId, forKey: .deckId)
        try c.encode(kind, forKey: .kind)
        try c.encode(grade, forKey: .grade) // explicit null when not a grade
        try c.encode(stateBefore, forKey: .stateBefore)
        try c.encode(stateAfter, forKey: .stateAfter)
        try c.encode(intervalBefore, forKey: .intervalBefore)
        try c.encode(intervalAfter, forKey: .intervalAfter)
        try c.encode(timeSpentMs, forKey: .timeSpentMs) // explicit null when not measured
        try c.encode(scheduler, forKey: .scheduler)
        try c.encode(localDay, forKey: .localDay)
    }
}

// MARK: - Collection

struct DeckConfig: Codable, Equatable, Sendable {
    var scheduler: SchedulerType
    var newPerDay: Int
    var maxReviewsPerDay: Int
}

struct DeckRecord: Codable, Equatable, Identifiable, Sendable {
    var id: String
    var name: String
    /// Set when this deck mirrors a published catalogue deck.
    var sourceId: String?
    /// Per-deck scheduler and limits; absent means the app defaults apply.
    var config: DeckConfig?
    var createdAt: String
}

/// A student's whole flashcard collection, versioned so the shape can change
/// again without guessing what an older document held.
struct FlashcardCollection: Codable, Equatable, Sendable {
    var version: Int
    var decks: [String: DeckRecord]
    var notes: [String: FlashcardNote]
    /// Card id → the student's standing on it. Cards themselves are derived.
    var meta: [String: CardMeta]

    static let currentVersion = 2
    static let empty = FlashcardCollection(version: currentVersion, decks: [:], notes: [:], meta: [:])
}
