import Foundation

/// The SM-2 scheduler. A direct port of `src/data/srs.ts:84-217`.
///
/// `now` is always passed in, never read from a clock: a scheduler that reads
/// its own clock can only be asserted against itself, and a card that comes
/// back on the wrong day does not throw — it quietly reappears weeks late.
/// Passing the clock in is what makes the intervals testable.
///
/// Nothing here mutates its input: a caller holding the old schedule (an undo
/// stack, a SwiftUI render) keeps it.
struct SM2Scheduler: Scheduler {
    var config: SrsConfig = .anki

    var type: SchedulerType { .sm2 }

    /// Anki's own ease floor. Without it a card the student keeps failing drives
    /// its ease towards zero and then returns every single day forever.
    private static let minimumEase = 1.3
    private static let easeDeltaHard = -0.15
    private static let easeDeltaEasy = 0.15
    private static let easeDeltaLapse = -0.2
    private static let dayInSeconds = 86_400.0
    private static let minuteInSeconds = 60.0

    func newCard(now: Date) -> CardSchedule {
        CardSchedule(
            state: .new, step: 0, interval: 0, ease: config.startingEase,
            lapses: 0, reps: 0, due: Self.iso(now), stability: nil, difficulty: nil
        )
    }

    func isDue(_ card: CardSchedule, now: Date) -> Bool {
        guard let due = ISO8601DateFormatter.read(card.due) else { return false }
        return due <= now
    }

    /// Answer a card, returning its next schedule. (`src/data/srs.ts:127-132`)
    func grade(_ card: CardSchedule, answer: Grade, now: Date) -> CardSchedule {
        var next = card
        next.reps = card.reps + 1
        return card.state == .review
            ? gradeReview(next, answer, now)
            : gradeSteps(next, answer, now)
    }

    // MARK: - Steps (new / learning / relearning)

    /// New, learning and relearning cards are all scheduled in minutes off a
    /// step list. (`src/data/srs.ts:135-149`)
    private func gradeSteps(_ card: CardSchedule, _ answer: Grade, _ now: Date) -> CardSchedule {
        let relearning = card.state == .relearning
        let steps = relearning ? config.relearningSteps : config.learningSteps
        let stepState: CardState = relearning ? .relearning : .learning

        if answer == .easy { return graduate(card, .easy, now) }

        // Hard holds the card where it is: not forgotten, so it does not go back
        // to the start; not recalled cleanly, so it does not advance.
        let target = answer == .again ? 0 : (answer == .hard ? card.step : card.step + 1)

        if target >= steps.count { return graduate(card, answer, now) }

        var next = card
        next.state = stepState
        next.step = target
        next.due = atMinutes(now, stepDelay(steps, answer, target))
        return next
    }

    /// How long a step waits. Hard on the *first* step averages the first two
    /// steps (Anki's rule), because repeating a one-minute step would show the
    /// card again almost immediately. (`src/data/srs.ts:160-165`)
    private func stepDelay(_ steps: [Double], _ answer: Grade, _ target: Int) -> Double {
        let current = target < steps.count ? steps[target] : 0
        guard answer == .hard, target == 0 else { return current }
        guard steps.count > 1 else { return current }
        return (current + steps[1]) / 2
    }

    private func graduate(_ card: CardSchedule, _ answer: Grade, _ now: Date) -> CardSchedule {
        // A relearning card already has the interval its lapse left it with;
        // earning the full graduating interval back for one answer would undo
        // the lapse. (`src/data/srs.ts:167-175`)
        let interval = card.state == .relearning
            ? clampInterval(Double(card.interval))
            : clampInterval(Double(answer == .easy ? config.easyInterval : config.graduatingInterval))

        var next = card
        next.state = .review
        next.step = 0
        next.interval = interval
        next.due = atDays(now, interval)
        return next
    }

    // MARK: - Review

    private func gradeReview(_ card: CardSchedule, _ answer: Grade, _ now: Date) -> CardSchedule {
        if answer == .again { return lapse(card, now) }

        // The days a card sat overdue are partly credited before multiplying,
        // the way Anki does it — otherwise coming back from a week away shortens
        // every interval. A card answered early gets no credit: `delay` floors
        // at zero. (`src/data/srs.ts:185-192`)
        let dueDate = ISO8601DateFormatter.read(card.due) ?? now
        let delay = max(0, ((now.timeIntervalSince1970 - dueDate.timeIntervalSince1970) / Self.dayInSeconds).rounded(.down))

        let raw: Double
        switch answer {
        case .hard: raw = (Double(card.interval) + delay / 4) * config.hardMultiplier
        case .good: raw = (Double(card.interval) + delay / 2) * card.ease
        case .easy: raw = (Double(card.interval) + delay) * card.ease * config.easyBonus
        case .again: raw = 0 // unreachable: handled above
        }

        let easeDelta = answer == .hard ? Self.easeDeltaHard : (answer == .easy ? Self.easeDeltaEasy : 0)

        var next = card
        next.state = .review
        next.step = 0
        next.interval = clampInterval(raw)
        next.ease = clampEase(card.ease + easeDelta)
        next.due = atDays(now, next.interval)
        return next
    }

    private func lapse(_ card: CardSchedule, _ now: Date) -> CardSchedule {
        let interval = min(
            config.maximumInterval,
            max(config.minimumInterval, Int((Double(card.interval) * config.lapseNewIntervalPercent / 100).rounded()))
        )

        var lapsed = card
        lapsed.interval = interval
        lapsed.ease = clampEase(card.ease + Self.easeDeltaLapse)
        lapsed.lapses = card.lapses + 1
        lapsed.step = 0

        // A preset with no relearning steps has nowhere to send the card, so it
        // goes straight back into review on its shortened interval.
        if let first = config.relearningSteps.first {
            lapsed.state = .relearning
            lapsed.due = atMinutes(now, first)
        } else {
            lapsed.state = .review
            lapsed.due = atDays(now, interval)
        }
        return lapsed
    }

    // MARK: - Helpers

    private func clampEase(_ ease: Double) -> Double { max(Self.minimumEase, ease) }

    /// Cards are due on a day, not an instant, so every interval lands on a
    /// whole one. (`src/data/srs.ts:105`)
    private func clampInterval(_ days: Double) -> Int {
        min(config.maximumInterval, Int(days.rounded()))
    }

    private func atMinutes(_ now: Date, _ minutes: Double) -> String {
        Self.iso(now.addingTimeInterval(minutes * Self.minuteInSeconds))
    }

    private func atDays(_ now: Date, _ days: Int) -> String {
        Self.iso(now.addingTimeInterval(Double(days) * Self.dayInSeconds))
    }

    /// ISO 8601 with fractional seconds, matching the web's `Date.toISOString()`,
    /// so a `due` written on the phone reads back identically on the website.
    static func iso(_ date: Date) -> String {
        ISO8601DateFormatter.synapse.string(from: date)
    }
}
