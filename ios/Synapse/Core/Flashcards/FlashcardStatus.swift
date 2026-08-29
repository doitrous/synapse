import Foundation

/// What state a card is in, and how a deck's cards divide across those states. A
/// port of `src/data/flashcards/status.ts`.
///
/// The dashboard's ten measures deliberately overlap (a card can be both New and
/// Unseen), so their percentages are all taken over `total` and never implied to
/// sum to 100. The Card Counts chart needs the opposite — a mutually exclusive
/// partition — so `exclusiveStatus` is a separate function with explicit
/// precedence, and the two never share a code path.

extension CardSchedule {
    /// Whether the card is due at `now`. (`srs.ts:119-121`)
    func isDue(now: Date) -> Bool {
        guard let dueDate = ISO8601DateFormatter.read(due) else { return false }
        return dueDate <= now
    }
}

/// Anki's own boundary: a review card is mature once its interval reaches 21 days.
let MATURE_THRESHOLD_DAYS = 21

/// True while the card is hidden by a bury that today has not yet rolled past.
func isBuried(_ meta: CardMeta, now: Date) -> Bool {
    guard let until = meta.buriedUntil else { return false }
    return LocalDay.of(now) < until
}

/// Never answered, no history at all. Overlaps New but is not the same thing.
func isUnseen(_ meta: CardMeta) -> Bool { meta.reviewCount == 0 }

/// At least one completed review and not reset since. Overlaps every live state.
func isLearned(_ meta: CardMeta) -> Bool { meta.reviewCount >= 1 && !meta.resetSinceReview }

/// A review-state card whose interval has not yet reached the mature boundary.
func isYoung(_ meta: CardMeta) -> Bool {
    meta.schedule.state == .review && meta.schedule.interval < MATURE_THRESHOLD_DAYS
}

func isMature(_ meta: CardMeta) -> Bool {
    meta.schedule.state == .review && meta.schedule.interval >= MATURE_THRESHOLD_DAYS
}

/// A review-state card that is due and actually showable — a suspended or buried
/// card is not "review due" however overdue, because it will not be shown.
func isReviewDue(_ meta: CardMeta, now: Date) -> Bool {
    meta.schedule.state == .review
        && meta.schedule.isDue(now: now)
        && !meta.suspended
        && !isBuried(meta, now: now)
}

/// Whether study would offer this card at all right now (before the daily caps).
func isStudyEligible(_ meta: CardMeta, now: Date) -> Bool {
    if meta.suspended || isBuried(meta, now: now) { return false }
    if meta.schedule.state == .new { return true }
    return meta.schedule.isDue(now: now)
}

/// The ten overlapping dashboard measures for a single card.
struct StatusFlags: Equatable, Sendable {
    var isNew: Bool
    var learning: Bool
    var reviewDue: Bool
    var young: Bool
    var mature: Bool
    var learned: Bool
    var unseen: Bool
    var buried: Bool
    var suspended: Bool
}

func statusFlags(_ meta: CardMeta, now: Date) -> StatusFlags {
    let state = meta.schedule.state
    return StatusFlags(
        isNew: state == .new,
        learning: state == .learning || state == .relearning,
        reviewDue: isReviewDue(meta, now: now),
        young: isYoung(meta),
        mature: isMature(meta),
        learned: isLearned(meta),
        unseen: isUnseen(meta),
        buried: isBuried(meta, now: now),
        suspended: meta.suspended
    )
}

/// Every dashboard count, plus the total that is their shared denominator.
struct DeckCounts: Equatable, Sendable {
    var total: Int
    var new: Int
    var learning: Int
    var reviewDue: Int
    var young: Int
    var mature: Int
    var learned: Int
    var unseen: Int
    var buried: Int
    var suspended: Int
}

func deckCounts(_ metas: [CardMeta], now: Date) -> DeckCounts {
    var c = DeckCounts(total: metas.count, new: 0, learning: 0, reviewDue: 0, young: 0, mature: 0, learned: 0, unseen: 0, buried: 0, suspended: 0)
    for meta in metas {
        let f = statusFlags(meta, now: now)
        if f.isNew { c.new += 1 }
        if f.learning { c.learning += 1 }
        if f.reviewDue { c.reviewDue += 1 }
        if f.young { c.young += 1 }
        if f.mature { c.mature += 1 }
        if f.learned { c.learned += 1 }
        if f.unseen { c.unseen += 1 }
        if f.buried { c.buried += 1 }
        if f.suspended { c.suspended += 1 }
    }
    return c
}

/// The mutually exclusive bucket for the Card Counts chart. Suspended and buried
/// win over the scheduling state, so a suspended-yet-mature card is drawn once.
enum ExclusiveStatus: String, Equatable, Sendable {
    case new, learning, relearning, young, mature, suspended, buried
}

func exclusiveStatus(_ meta: CardMeta, now: Date) -> ExclusiveStatus {
    if meta.suspended { return .suspended }
    if isBuried(meta, now: now) { return .buried }
    switch meta.schedule.state {
    case .new: return .new
    case .learning: return .learning
    case .relearning: return .relearning
    case .review: return meta.schedule.interval >= MATURE_THRESHOLD_DAYS ? .mature : .young
    }
}

/// The count in each exclusive bucket.
struct ExclusiveCounts: Equatable, Sendable {
    var new = 0, learning = 0, relearning = 0, young = 0, mature = 0, suspended = 0, buried = 0
}

func exclusiveCounts(_ metas: [CardMeta], now: Date) -> ExclusiveCounts {
    var c = ExclusiveCounts()
    for meta in metas {
        switch exclusiveStatus(meta, now: now) {
        case .new: c.new += 1
        case .learning: c.learning += 1
        case .relearning: c.relearning += 1
        case .young: c.young += 1
        case .mature: c.mature += 1
        case .suspended: c.suspended += 1
        case .buried: c.buried += 1
        }
    }
    return c
}
