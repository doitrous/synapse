import Foundation

/// When a flashcard should come back — the SM-2 side of the schedule.
///
/// A direct port of `src/data/srs.ts:23-82`. Every number in `SrsConfig.anki`
/// is Anki 25.02.5's own default preset, and the algorithm is the SM-2
/// scheduler those defaults belong to. FSRS ships opt-in, so a student who has
/// only ever pressed "Add" is on SM-2, and matching what they already know is
/// the point.
///
/// `CardSchedule` is part of the synced flashcard document, so its shape must
/// match the web's `CardSchedule` exactly — a divergent field would silently
/// split a card's due date between the phone and the website with no error on
/// either side.

enum Grade: String, Codable, Equatable, Sendable, CaseIterable {
    case again, hard, good, easy
}

enum CardState: String, Codable, Equatable, Sendable {
    case new, learning, review, relearning
}

/// A card's spaced-repetition schedule. (`src/data/srs.ts:27-43`)
struct CardSchedule: Codable, Equatable, Sendable {
    var state: CardState
    /// Index into the learning or relearning step list; unused while in review.
    var step: Int
    /// Whole days. Zero until the card graduates — the step states count minutes.
    var interval: Int
    /// SM-2 ease factor, where 2.5 means "multiply the interval by two and a half".
    var ease: Double
    var lapses: Int
    var reps: Int
    /// ISO 8601, so a schedule survives a round trip through storage unchanged.
    var due: String
    /// FSRS memory-stability in days. Absent on SM-2 cards (encoded only when set).
    var stability: Double?
    /// FSRS difficulty in [1,10]. Absent on SM-2 cards (encoded only when set).
    var difficulty: Double?
}

/// The scheduler's tunables. (`src/data/srs.ts:45-66`) Not itself part of the
/// synced document — the per-deck `DeckConfig` is separate — so its numeric
/// types are chosen for the arithmetic, not for wire parity.
struct SrsConfig: Equatable, Sendable {
    var newPerDay: Int
    var maxReviewsPerDay: Int
    /// Minutes. `Double` because a "hard" on the first step averages two steps.
    var learningSteps: [Double]
    /// Minutes.
    var relearningSteps: [Double]
    /// Days.
    var graduatingInterval: Int
    /// Days.
    var easyInterval: Int
    var startingEase: Double
    var easyBonus: Double
    var hardMultiplier: Double
    /// Percent of the old interval a lapse leaves behind.
    var lapseNewIntervalPercent: Double
    /// Days.
    var minimumInterval: Int
    /// Days.
    var maximumInterval: Int
    var leechThreshold: Int

    /// Anki 25.02.5's default preset. (`src/data/srs.ts:68-82`)
    static let anki = SrsConfig(
        newPerDay: 20,
        maxReviewsPerDay: 200,
        learningSteps: [1, 10],
        relearningSteps: [10],
        graduatingInterval: 1,
        easyInterval: 4,
        startingEase: 2.5,
        easyBonus: 1.3,
        hardMultiplier: 1.2,
        lapseNewIntervalPercent: 0,
        minimumInterval: 1,
        maximumInterval: 36500,
        leechThreshold: 8
    )
}
