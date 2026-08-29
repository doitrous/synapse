import Foundation

/// One interface over "when does this card come back", so the rest of the app
/// never names a scheduling algorithm. A port of `src/data/flashcards/scheduler.ts`.
///
/// SM-2 (`SM2Scheduler`) stays the default — it is what every existing deck was
/// built on, and matching what a student already knows is the point. FSRS
/// (`FSRSScheduler`) is a second implementation behind this same interface,
/// opt-in per deck, so the study screen, the queue and the stats call
/// `grade(...)` / `preview(...)` without caring which one answered. A scheduler
/// always takes `now` as a parameter: one that reads its own clock can only be
/// asserted against itself.
enum SchedulerType: String, Codable, Equatable, Sendable {
    case sm2, fsrs
}

/// The four intervals the answer buttons would produce, previewed before commit.
typealias GradePreview = [Grade: CardSchedule]

protocol Scheduler {
    var type: SchedulerType { get }
    /// A fresh, never-studied card's schedule.
    func newCard(now: Date) -> CardSchedule
    /// Answer a card; never mutates the input (an undo stack keeps the old one).
    func grade(_ schedule: CardSchedule, answer: Grade, now: Date) -> CardSchedule
    /// What each of the four answers would do, for the button labels.
    func preview(_ schedule: CardSchedule, now: Date) -> GradePreview
}

extension Scheduler {
    /// Build a full four-answer preview from `grade`. (`scheduler.ts:57-68`)
    func preview(_ schedule: CardSchedule, now: Date) -> GradePreview {
        [
            .again: grade(schedule, answer: .again, now: now),
            .hard: grade(schedule, answer: .hard, now: now),
            .good: grade(schedule, answer: .good, now: now),
            .easy: grade(schedule, answer: .easy, now: now),
        ]
    }
}
