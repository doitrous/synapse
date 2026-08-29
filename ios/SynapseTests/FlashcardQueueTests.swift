import Foundation
import Testing
@testable import Synapse

/// Pinned to `src/data/flashcards/queue.ts`, mirroring `queue.test.ts`.
struct FlashcardQueueTests {
    private let now = ISO8601DateFormatter.synapse.date(from: "2026-08-20T09:00:00.000Z")!
    private let config = QueueConfig(newPerDay: 20, maxReviewsPerDay: 200)
    private func iso(_ d: Date) -> String { ISO8601DateFormatter.synapse.string(from: d) }

    private func sched(state: CardState = .new, interval: Int = 0, due: String? = nil) -> CardSchedule {
        CardSchedule(state: state, step: 0, interval: interval, ease: 2.5, lapses: 0, reps: 0,
                     due: due ?? iso(now), stability: nil, difficulty: nil)
    }
    private func entry(_ id: String, schedule: CardSchedule? = nil, suspended: Bool = false, buriedUntil: String? = nil) -> QueueEntry {
        var m = newCardMeta(schedule ?? sched())
        m.suspended = suspended
        m.buriedUntil = buriedUntil
        return QueueEntry(id: id, meta: m)
    }
    private func dueReview(_ id: String, suspended: Bool = false, buriedUntil: String? = nil) -> QueueEntry {
        entry(id, schedule: sched(state: .review, interval: 5, due: iso(now.addingTimeInterval(-1))),
              suspended: suspended, buriedUntil: buriedUntil)
    }

    @Test func dueCardsComeBeforeNewCards() {
        let q = buildQueue([entry("new1"), dueReview("due1")], now: now, config: config, seen: SeenToday(newSeen: 0, reviewsSeen: 0))
        #expect(q == ["due1", "new1"])
    }

    @Test func suspendedAndBuriedCardsAreNeverQueued() {
        let q = buildQueue(
            [dueReview("due1"), dueReview("sus", suspended: true), dueReview("bur", buriedUntil: "2026-08-25")],
            now: now, config: config, seen: SeenToday(newSeen: 0, reviewsSeen: 0)
        )
        #expect(q == ["due1"])
    }

    @Test func theDailyCapsBoundCountsMinusWhatWasSeenToday() {
        let news = (0..<30).map { entry("n\($0)") }
        #expect(buildQueue(news, now: now, config: config, seen: SeenToday(newSeen: 0, reviewsSeen: 0)).count == 20)
        #expect(buildQueue(news, now: now, config: config, seen: SeenToday(newSeen: 18, reviewsSeen: 0)).count == 2)
    }

    @Test func seenTodayIsReadOffTheLogSplitByStateAnswered() {
        func ev(stateBefore: CardState = .review, localDay: String = "2026-08-20", deckId: String = "d1", kind: ReviewEventKind = .grade) -> ReviewEvent {
            ReviewEvent(id: "e", at: "", cardId: "c", noteId: "n", deckId: deckId, kind: kind, grade: .good,
                        stateBefore: stateBefore, stateAfter: .review, intervalBefore: 1, intervalAfter: 2,
                        timeSpentMs: nil, scheduler: .sm2, localDay: localDay)
        }
        let events = [
            ev(stateBefore: .new),
            ev(stateBefore: .new),
            ev(stateBefore: .review),
            ev(localDay: "2026-08-19"), // yesterday — ignored
            ev(deckId: "other"),        // another deck — ignored
            ev(kind: .suspend),         // not a grade — ignored
        ]
        let seen = seenTodayFromEvents(events, deckId: "d1", now: now)
        #expect(seen == SeenToday(newSeen: 2, reviewsSeen: 1))
    }
}
