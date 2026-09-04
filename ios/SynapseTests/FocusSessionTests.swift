import Foundation
import Testing
@testable import Synapse

/// Pinned to `src/lib/focusSession.test.ts`, run under `node --test` against
/// the same semantics — the state machine each Focus Timer surface mirrors.
struct FocusSessionTests {

    private let t0 = Date(timeIntervalSince1970: 1_700_000_000)

    @Test func startTickComplete() {
        // The shortest duration the picker allows (`minDurationMinutes`) is 5
        // — `setDurationMinutes` clamps anything under that, so this block is
        // 5 minutes, not literally one.
        let started = FocusSession.start(FocusSession.setDurationMinutes(FocusSession.initial(now: t0), 5, now: t0), now: t0)
        #expect(started.running == true)
        #expect(started.remainingSeconds == 300)

        let midway = FocusSession.tick(started, now: t0.addingTimeInterval(150))
        #expect(midway.running == true)
        #expect(midway.remainingSeconds == 150)
        #expect(FocusSession.accruedSeconds(midway) == 150)

        let finished = FocusSession.tick(midway, now: t0.addingTimeInterval(300))
        #expect(finished.running == false)
        #expect(finished.remainingSeconds == 0)
        #expect(finished.completedAt == t0.addingTimeInterval(300))
        #expect(FocusSession.accruedSeconds(finished) == 300)
    }

    @Test func countUpAccrues() {
        let started = FocusSession.start(FocusSession.setMode(FocusSession.initial(now: t0), .countup, now: t0), now: t0)
        let later = FocusSession.tick(started, now: t0.addingTimeInterval(45))
        #expect(later.elapsedSeconds == 45)
        #expect(FocusSession.accruedSeconds(later) == 45)
        #expect(later.completedAt == nil)
    }

    @Test func pauseFreezesResumeContinues() {
        let started = FocusSession.start(FocusSession.setDurationMinutes(FocusSession.initial(now: t0), 25, now: t0), now: t0)
        let ran = FocusSession.tick(started, now: t0.addingTimeInterval(10))
        let paused = FocusSession.pause(ran, now: t0.addingTimeInterval(10))
        #expect(paused.running == false)
        #expect(paused.remainingSeconds == 25 * 60 - 10)

        // Time passing while paused must not be counted.
        let stillPaused = FocusSession.tick(paused, now: t0.addingTimeInterval(60))
        #expect(stillPaused.remainingSeconds == paused.remainingSeconds)

        let resumed = FocusSession.start(stillPaused, now: t0.addingTimeInterval(60))
        #expect(resumed.running == true)
        #expect(resumed.remainingSeconds == paused.remainingSeconds)
    }

    @Test func restartAfterCompletion() {
        let finished = FocusSession.tick(
            FocusSession.start(FocusSession.setDurationMinutes(FocusSession.initial(now: t0), 5, now: t0), now: t0),
            now: t0.addingTimeInterval(300)
        )
        #expect(finished.remainingSeconds == 0)
        let restarted = FocusSession.start(finished, now: t0.addingTimeInterval(300))
        #expect(restarted.running == true)
        #expect(restarted.remainingSeconds == 300)
        #expect(restarted.completedAt == nil)
    }

    @Test func strictDiscardThrowsAwayProgress() {
        let started = FocusSession.start(FocusSession.setDurationMinutes(FocusSession.initial(now: t0), 25, now: t0), now: t0)
        let ran = FocusSession.tick(started, now: t0.addingTimeInterval(5 * 60))
        #expect(ran.remainingSeconds == 20 * 60)

        let discarded = FocusSession.discard(ran, now: t0.addingTimeInterval(5 * 60 + 15))
        #expect(discarded.running == false)
        #expect(discarded.remainingSeconds == 25 * 60)
        #expect(FocusSession.accruedSeconds(discarded) == 0)
        #expect(discarded.completedAt == nil)
    }

    @Test func resetReturnsToFullDurationOrZero() {
        let countdown = FocusSession.reset(
            FocusSession.tick(FocusSession.start(FocusSession.setDurationMinutes(FocusSession.initial(now: t0), 50, now: t0), now: t0), now: t0.addingTimeInterval(5)),
            now: t0.addingTimeInterval(5)
        )
        #expect(countdown.remainingSeconds == 50 * 60)

        let countup = FocusSession.reset(
            FocusSession.tick(FocusSession.start(FocusSession.setMode(FocusSession.initial(now: t0), .countup, now: t0), now: t0), now: t0.addingTimeInterval(5)),
            now: t0.addingTimeInterval(5)
        )
        #expect(countup.elapsedSeconds == 0)
    }

    @Test func formatClockPrintsMinutesOrHours() {
        #expect(FocusSession.formatClock(65) == "1:05")
        #expect(FocusSession.formatClock(3_661) == "1:01:01")
        #expect(FocusSession.formatClock(-4) == "0:00")
    }
}
