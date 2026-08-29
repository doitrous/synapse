import Foundation
import Testing
@testable import Synapse

/// Pinned to `src/data/flashcards/time.ts`. The cases are chosen to be
/// timezone-independent — they turn on calendar arithmetic (rollovers, day
/// counts) that holds wherever the test machine sits, since every day is
/// anchored at local noon before being shifted.
struct LocalDayTests {

    @Test func addingZeroDaysIsIdentity() {
        #expect(LocalDay.adding(0, to: "2026-08-20") == "2026-08-20")
    }

    @Test func addingRollsOverMonthBoundaries() {
        #expect(LocalDay.adding(1, to: "2026-08-31") == "2026-09-01")
    }

    @Test func addingRollsBackOverYearBoundaries() {
        #expect(LocalDay.adding(-1, to: "2026-01-01") == "2025-12-31")
    }

    @Test func addingAWholeWeek() {
        #expect(LocalDay.adding(7, to: "2026-08-20") == "2026-08-27")
    }

    @Test func daysBetweenCountsForward() {
        #expect(LocalDay.daysBetween(from: "2026-08-20", to: "2026-08-27") == 7)
    }

    @Test func daysBetweenIsNegativeWhenToPrecedesFrom() {
        #expect(LocalDay.daysBetween(from: "2026-08-27", to: "2026-08-20") == -7)
    }

    @Test func daysBetweenAcrossAMonthBoundary() {
        #expect(LocalDay.daysBetween(from: "2026-08-31", to: "2026-09-01") == 1)
    }

    @Test func daysBetweenIsTheInverseOfAdding() {
        let start = "2026-03-14"
        let shifted = LocalDay.adding(20, to: start)
        #expect(LocalDay.daysBetween(from: start, to: shifted) == 20)
    }

    @Test func plusFromANowIsItsDayShifted() {
        let now = ISO8601DateFormatter.synapse.date(from: "2026-08-20T09:00:00.000Z")!
        // Zero-shift is exactly the local day of `now`, whatever the machine tz.
        #expect(LocalDay.plus(0, from: now) == LocalDay.of(now))
        // And shifting by n agrees with adding n to that day.
        #expect(LocalDay.plus(5, from: now) == LocalDay.adding(5, to: LocalDay.of(now)))
    }
}
