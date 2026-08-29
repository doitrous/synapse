import Foundation

/// What to study now: due cards before new ones, under the day's caps. A port of
/// `src/data/flashcards/queue.ts`.
///
/// Due comes first — a pile of overdue reviews buried under fresh material is how
/// a deck gets abandoned. The caps are per deck; "how many have I already seen
/// today" is read straight off the review log rather than a second counter that
/// could drift, split into new versus review by the state the card was in when
/// it was answered. One source of truth.

struct QueueConfig: Sendable {
    var newPerDay: Int
    var maxReviewsPerDay: Int
}

struct SeenToday: Equatable, Sendable {
    var newSeen: Int
    var reviewsSeen: Int
}

struct QueueEntry: Sendable {
    var id: String
    var meta: CardMeta
}

/// Count today's grades for a deck, split into new-card and review answers.
func seenTodayFromEvents(_ events: [ReviewEvent], deckId: String, now: Date) -> SeenToday {
    let today = LocalDay.of(now)
    var newSeen = 0
    var reviewsSeen = 0
    for event in events {
        if event.kind != .grade || event.deckId != deckId || event.localDay != today { continue }
        if event.stateBefore == .new { newSeen += 1 } else { reviewsSeen += 1 }
    }
    return SeenToday(newSeen: newSeen, reviewsSeen: reviewsSeen)
}

/// The ordered card ids to study, due first then new, each bounded by what the
/// day's cap leaves after what has been seen. Suspended and buried cards are
/// excluded by `isStudyEligible`.
func buildQueue(_ entries: [QueueEntry], now: Date, config: QueueConfig, seen: SeenToday) -> [String] {
    let eligible = entries.filter { isStudyEligible($0.meta, now: now) }
    let due = eligible.filter { $0.meta.schedule.state != .new && $0.meta.schedule.isDue(now: now) }
    let fresh = eligible.filter { $0.meta.schedule.state == .new }

    let reviewRoom = max(0, config.maxReviewsPerDay - seen.reviewsSeen)
    let newRoom = max(0, config.newPerDay - seen.newSeen)

    return due.prefix(reviewRoom).map { $0.id } + fresh.prefix(newRoom).map { $0.id }
}

/// How large this session will be, for the deck dashboard's estimate.
func estimatedSessionSize(_ entries: [QueueEntry], now: Date, config: QueueConfig, seen: SeenToday) -> Int {
    buildQueue(entries, now: now, config: config, seen: seen).count
}
