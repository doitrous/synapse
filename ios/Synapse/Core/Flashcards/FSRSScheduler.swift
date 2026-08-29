import Foundation

/// FSRS-5 (Free Spaced Repetition Scheduler), a pure, day-grained scheduler
/// behind the shared `Scheduler` interface. A port of
/// `src/data/flashcards/fsrs.ts`.
///
/// Every function is pure: no clock reads, no randomness, no global state — the
/// clock and the weights are always explicit, so a schedule is only ever a
/// function of its own history and the current query. That is also what makes
/// it testable against the web's published reference values.
///
/// Day-grained: a graded card always lands in `review` with a whole-day
/// interval; an 'again' comes back the next day, not later the same session.
/// FSRS-5's own short-term parameters `w[17]`/`w[18]` are therefore intentionally
/// UNUSED — they are kept in `defaultWeights` only so the vector matches the
/// published FSRS-5 parameter set byte-for-byte.
struct FSRSScheduler: Scheduler {
    var weights: [Double] = FSRSScheduler.defaultWeights
    var requestRetention: Double = FSRSScheduler.defaultRequestRetention

    /// FSRS-5 default parameters w[0]..w[18], as published by the FSRS project.
    static let defaultWeights: [Double] = [
        0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575,
        0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621,
    ]
    static let defaultRequestRetention = 0.9

    /// The exponent of the FSRS-5 power-function forgetting curve.
    private static let decay = -0.5
    /// = 0.9 ** (1 / DECAY) - 1, i.e. exactly 19/81 — see `intervalFromStability`.
    private static let factor = 19.0 / 81.0
    /// Stability never reaches zero: a fully-decayed memory still needs a next interval.
    private static let minStability = 0.01
    /// Reuses srs.ts's ceiling: a review is never scheduled further out than this.
    private static let maxIntervalDays = 36500

    var type: SchedulerType { .fsrs }

    func newCard(now: Date) -> CardSchedule {
        CardSchedule(
            state: .new, step: 0, interval: 0,
            // Unused filler: keeps the shape valid if the deck is switched back to SM-2.
            ease: 2.5, lapses: 0, reps: 0, due: SM2Scheduler.iso(now),
            // stability/difficulty deliberately absent — set on the first grade.
            stability: nil, difficulty: nil
        )
    }

    /// Answer a card, returning its next schedule. (`fsrs.ts:145-187`)
    func grade(_ schedule: CardSchedule, answer: Grade, now: Date) -> CardSchedule {
        let rating = Self.rating(of: answer)
        let isFirstReview = schedule.stability == nil

        let stability: Double
        let difficulty: Double
        if isFirstReview {
            stability = Self.initialStability(rating, weights)
            difficulty = Self.initialDifficulty(rating, weights)
        } else {
            // Reconstruct elapsed days since the last review: `due` minus the
            // interval that produced it is when the card was last graded.
            let dueDate = ISO8601DateFormatter.read(schedule.due) ?? now
            let lastReview = dueDate.addingTimeInterval(-Double(schedule.interval) * 86_400)
            let elapsedDays = max(0, (now.timeIntervalSince1970 - lastReview.timeIntervalSince1970) / 86_400)
            let prevStability = schedule.stability ?? Self.initialStability(rating, weights)
            let prevDifficulty = schedule.difficulty ?? Self.initialDifficulty(rating, weights)
            let r = Self.retrievability(elapsedDays, prevStability)
            difficulty = Self.nextDifficulty(prevDifficulty, rating, weights)
            // Stability updates are computed from the OLD difficulty, not the one
            // just derived — FSRS updates the two independently off the same
            // pre-review state.
            stability = rating == 1
                ? Self.nextStabilityOnForget(difficulty: prevDifficulty, stability: prevStability, retrievabilityAtReview: r, w: weights)
                : Self.nextStabilityOnRecall(difficulty: prevDifficulty, stability: prevStability, retrievabilityAtReview: r, rating: rating, w: weights)
        }

        let interval = Self.clampDayInterval(Self.intervalFromStability(stability, requestRetention))
        // Failing a NEW card (no prior FSRS memory) is not a lapse of an existing
        // memory — only a forgotten review card counts.
        let lapses = schedule.lapses + (rating == 1 && !isFirstReview ? 1 : 0)

        var next = schedule
        next.state = .review
        next.step = 0
        next.interval = interval
        next.lapses = lapses
        next.reps = schedule.reps + 1
        next.due = SM2Scheduler.iso(now.addingTimeInterval(Double(interval) * 86_400))
        next.stability = stability
        next.difficulty = difficulty
        return next
    }

    // MARK: - Pure FSRS math (exposed for tests and reuse)

    /// FSRS rating: again=1, hard=2, good=3, easy=4.
    static func rating(of answer: Grade) -> Int {
        switch answer {
        case .again: return 1
        case .hard: return 2
        case .good: return 3
        case .easy: return 4
        }
    }

    /// Probability of recall after `elapsedDays` at the given `stability`.
    /// `retrievability(0, S) == 1` and `retrievability(S, S) == 0.9` for any S.
    /// (`fsrs.ts:62-64`)
    static func retrievability(_ elapsedDays: Double, _ stability: Double) -> Double {
        pow(1 + (factor * elapsedDays) / stability, decay)
    }

    /// Days until retrievability decays to `requestRetention`. At 0.9 this equals
    /// `stability` exactly, because FACTOR was defined so. (`fsrs.ts:71-76`)
    static func intervalFromStability(_ stability: Double, _ requestRetention: Double = FSRSScheduler.defaultRequestRetention) -> Double {
        (stability / factor) * (pow(requestRetention, 1 / decay) - 1)
    }

    /// Stability assigned to a card graded for the very first time. (`fsrs.ts:79-81`)
    static func initialStability(_ rating: Int, _ w: [Double] = FSRSScheduler.defaultWeights) -> Double {
        max(minStability, w[rating - 1])
    }

    /// Difficulty assigned to a card graded for the very first time. (`fsrs.ts:84-86`)
    static func initialDifficulty(_ rating: Int, _ w: [Double] = FSRSScheduler.defaultWeights) -> Double {
        clamp(w[4] - exp(w[5] * Double(rating - 1)) + 1, 1, 10)
    }

    /// Difficulty after a review: a linear step pulled back toward D0(Easy) by
    /// mean reversion so it doesn't drift unboundedly. (`fsrs.ts:93-98`)
    static func nextDifficulty(_ difficulty: Double, _ rating: Int, _ w: [Double] = FSRSScheduler.defaultWeights) -> Double {
        let deltaD = -w[6] * Double(rating - 3)
        let linearDamping = difficulty + (deltaD * (10 - difficulty)) / 9
        let meanReverted = w[7] * initialDifficulty(4, w) + (1 - w[7]) * linearDamping
        return clamp(meanReverted, 1, 10)
    }

    /// Stability after a successful review (rating 2/3/4). (`fsrs.ts:101-120`)
    static func nextStabilityOnRecall(
        difficulty: Double, stability: Double, retrievabilityAtReview: Double, rating: Int, w: [Double] = FSRSScheduler.defaultWeights
    ) -> Double {
        let hardPenalty = rating == 2 ? w[15] : 1
        let easyBonus = rating == 4 ? w[16] : 1
        let grown = stability * (
            1
            + exp(w[8])
                * (11 - difficulty)
                * pow(stability, -w[9])
                * (exp(w[10] * (1 - retrievabilityAtReview)) - 1)
                * hardPenalty
                * easyBonus
        )
        return max(minStability, grown)
    }

    /// Stability after a lapse (rating 1). (`fsrs.ts:123-134`)
    static func nextStabilityOnForget(
        difficulty: Double, stability: Double, retrievabilityAtReview: Double, w: [Double] = FSRSScheduler.defaultWeights
    ) -> Double {
        let forgotten = w[11]
            * pow(difficulty, -w[12])
            * (pow(stability + 1, w[13]) - 1)
            * exp(w[14] * (1 - retrievabilityAtReview))
        return max(minStability, forgotten)
    }

    // MARK: - Helpers

    private static func clamp(_ x: Double, _ lo: Double, _ hi: Double) -> Double {
        min(hi, max(lo, x))
    }

    /// A review lands on a whole day, at least one day out, never past the ceiling.
    private static func clampDayInterval(_ days: Double) -> Int {
        max(1, min(maxIntervalDays, Int(days.rounded())))
    }
}
