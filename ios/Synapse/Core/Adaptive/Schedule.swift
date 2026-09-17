import Foundation

/// Turning priorities into a week a person can actually live.
///
/// A port of `src/data/adaptive/schedule.ts`. The failure mode it is written
/// against is the familiar one: a planner that fills every free minute, stacks
/// the hardest work back to back, and answers a missed day by demanding double
/// tomorrow. Students abandon those within a fortnight, and the abandonment
/// looks like laziness in the figures when it was arithmetic.
///
/// So capacity carries a buffer, demanding sessions are separated, a missed day
/// is partly forgiven rather than fully carried, and every task states why it
/// exists so a student can disagree with it. Nothing here promises that
/// finishing the plan produces readiness — readiness is measured, not planned.

/// What a student has to do to have done the plan.
///
/// Three tiers exist so a bad day still has a defined win. Someone who manages
/// only the minimum has done the plan, not failed it.
enum TaskTier: String, Codable, Sendable {
    case minimum, recommended, stretch

    var label: String {
        switch self {
        case .minimum: "Minimum"
        case .recommended: "Recommended"
        case .stretch: "Stretch"
        }
    }
}

enum TaskKind: String, Codable, Sendable {
    case practice, review, calibration, resource, practical, rest
}

/// The kinds that genuinely tax a student differently.
///
/// A timed assessment and a hands-on station are not more of the same work —
/// they carry stakes and demand a different sort of attention, and two in a row
/// is the stacking the guardrail is about. Ordinary question practice is
/// deliberately not on this list: treating every block as demanding would cap a
/// week at one session a day however many free hours the student actually has,
/// which is a planner refusing to use capacity it was told about.
private let highEffort: Set<TaskKind> = [.calibration, .practical]

struct PlanTask: Codable, Identifiable, Equatable, Sendable {
    var id: String
    /// ISO date, `YYYY-MM-DD`.
    var date: String
    var kind: TaskKind
    var tier: TaskTier
    var title: String
    /// Why this task exists, in words the student can argue with.
    var reason: String
    var expectedMinutes: Int
    /// Concepts this is meant to move. Empty for rest.
    var conceptIds: [String]
    /// Blueprint weight this task would contribute to covering, 0–1.
    var blueprintContribution: Double
    /// The need it serves, for the weekly balance readout.
    var need: AllocationNeed?
    var questionIds: [String]
    var resourceIds: [String]
    /// Locked tasks survive every recalculation untouched.
    var locked: Bool
    var completedAt: String?
    var skippedAt: String?
    /// Every move this task has made, kept rather than overwritten.
    var history: [Move]

    struct Move: Codable, Equatable, Sendable {
        var at: String
        var from: String
        var to: String
        var reason: String
    }
}

struct DayCapacity: Codable, Equatable, Sendable {
    /// ISO date.
    var date: String
    /// Minutes the student says they have.
    var statedMinutes: Int
    /// Minutes taken by fixed university events. Not schedulable.
    var reservedMinutes: Int
    /// True when the student marked the day unavailable.
    var unavailable: Bool

    init(date: String, statedMinutes: Int, reservedMinutes: Int = 0, unavailable: Bool = false) {
        self.date = date
        self.statedMinutes = statedMinutes
        self.reservedMinutes = reservedMinutes
        self.unavailable = unavailable
    }
}

/// Work the week had no room for, named rather than quietly discarded.
struct UnplacedTask: Codable, Equatable, Sendable {
    var title: String
    var kind: TaskKind
    var expectedMinutes: Int
    var reason: String
}

struct WeeklyPlan: Codable, Equatable, Sendable {
    /// ISO date of the day this plan starts.
    var weekStart: String
    var tasks: [PlanTask]
    /// What did not fit.
    ///
    /// A planner that drops work silently lets a student believe their week is
    /// complete when the most important session in it was discarded for want of
    /// ten minutes.
    var unplaced: [UnplacedTask]
    /// Minutes available after buffer and reservations.
    var plannedMinutes: Int
    /// Minutes the student stated, before any deduction.
    var statedMinutes: Int
    /// Minutes deliberately left unscheduled.
    var bufferMinutes: Int
    /// Target minutes per need, before rounding into tasks.
    var needMinutes: [AllocationNeed: Int]
    var generatedAt: String
    var configVersion: Int

    /// Dotted, so the sync layer files it under the student's own record.
    static let key = "nishany.progress.adaptive.plan.v1"

    /// The statement that must accompany every plan.
    ///
    /// Saying this in the plan itself, rather than only in a settings page
    /// nobody opens, is the difference between a caveat and a disclaimer.
    static let caveat = "Completing this plan does not by itself mean you are ready. Readiness is measured separately, on blueprint-balanced questions held back from your practice."

    /// Minutes planned per day, for the week bar.
    var minutesByDay: [String: Int] {
        tasks.reduce(into: [:]) { out, task in
            out[task.date, default: 0] += task.expectedMinutes
        }
    }
}

/// What one need contributes to the week.
struct PlanNeedInput: Equatable, Sendable {
    var need: AllocationNeed
    /// Concepts this need is about, most urgent first.
    var conceptIds: [String]
    /// Human label for the tasks generated.
    var label: String
}

struct BuildPlanInput: Sendable {
    var weekStart: String
    var days: [DayCapacity]
    /// Allocation shares for the student's current exam horizon.
    var shares: AllocationShares
    var needs: [PlanNeedInput]
    /// Concepts needing a practical station, if the programme has them.
    var practicalConceptIds: [String] = []
    var config: AdaptiveConfig = .default
    /// Blueprint weight per concept, for the contribution figure.
    var blueprintWeights: [String: Double] = [:]
    /// Days before the next exam, or nil when nothing is scheduled.
    var daysToExam: Int?
    var generatedAt: String
    /// Tasks the student locked, carried through untouched.
    var locked: [PlanTask] = []
}

enum StudySchedule {

    /// How much of a day may actually be scheduled.
    ///
    /// Reserved university events come off first because they are not optional,
    /// then the buffer comes off what remains. Taking the buffer from the stated
    /// total first would produce days that look free but are not.
    static func schedulableMinutes(_ day: DayCapacity, config: AdaptiveConfig) -> Int {
        guard !day.unavailable else { return 0 }
        let free = max(0, day.statedMinutes - day.reservedMinutes)
        return Int((Double(free) * (1 - config.schedule.capacityBufferShare)).rounded(.down))
    }

    /// Build a week.
    ///
    /// Needs become minutes by share, then tasks of a sane length, then a
    /// placement across the available days that alternates load. The placement
    /// is deliberately simple: a cleverer packer would be harder to explain to
    /// the student whose week it is, and the constraint that actually matters —
    /// never scheduling every minute — is held by the capacity function rather
    /// than by the packing.
    static func buildWeeklyPlan(_ input: BuildPlanInput) -> WeeklyPlan {
        let config = input.config

        let locked = input.locked.filter(\.locked)
        var lockedByDate: [String: Int] = [:]
        for task in locked { lockedByDate[task.date, default: 0] += task.expectedMinutes }

        let statedMinutes = input.days.reduce(0) { $0 + ($1.unavailable ? 0 : $1.statedMinutes) }
        let capacity = input.days.map { day in
            (date: day.date,
             minutes: max(0, schedulableMinutes(day, config: config) - (lockedByDate[day.date] ?? 0)))
        }
        let plannedMinutes = capacity.reduce(0) { $0 + $1.minutes }

        var needMinutes: [AllocationNeed: Int] = [:]
        for need in AllocationNeed.allCases {
            needMinutes[need] = Int((Double(plannedMinutes) * input.shares[need]).rounded())
        }

        var drafts: [TaskDraft] = []

        // Drafted before anything else, deliberately. A mock belongs in the week
        // holding its lead window and nowhere else, and it is the one task that
        // must not be squeezed out when the week is tight — a plan that drops
        // the measurement and keeps the practice has its priorities backwards.
        if let daysToExam = input.daysToExam, daysToExam <= config.schedule.mockLeadDays + 7 {
            let full = (Double(config.readiness.assessmentSize) * config.readiness.secondsPerItem / 60).rounded()
            drafts.append(TaskDraft(
                kind: .calibration,
                title: "Readiness assessment",
                reason: "Far enough before your exam that a poor result can still be repaired. This measures where you stand; it is not practice.",
                expectedMinutes: min(config.schedule.maxTaskMinutes, Int(full)),
                conceptIds: [],
                blueprintContribution: 0,
                need: nil
            ))
        }

        for entry in input.needs {
            var remaining = needMinutes[entry.need] ?? 0
            var index = 0
            while remaining >= config.schedule.minTaskMinutes {
                let minutes = min(config.schedule.maxTaskMinutes, remaining)
                // Slice the need's queue so consecutive tasks on one need do not
                // all target the same concept — that is a drill, not a week.
                let start = min(index * 3, entry.conceptIds.count)
                let end = min(start + 3, entry.conceptIds.count)
                let conceptIds = Array(entry.conceptIds[start..<end])
                drafts.append(TaskDraft(
                    kind: kind(for: entry.need),
                    title: entry.label,
                    reason: reason(for: entry.need, concepts: conceptIds.count),
                    expectedMinutes: minutes,
                    conceptIds: conceptIds,
                    blueprintContribution: conceptIds.reduce(0) { $0 + (input.blueprintWeights[$1] ?? 0) },
                    need: entry.need
                ))
                remaining -= minutes
                index += 1
            }
        }

        if !input.practicalConceptIds.isEmpty {
            drafts.append(TaskDraft(
                kind: .practical,
                title: "Practical station preparation",
                reason: "Your programme assesses these concepts at a practical station, which needs separate preparation from written questions.",
                expectedMinutes: config.schedule.maxTaskMinutes,
                conceptIds: Array(input.practicalConceptIds.prefix(3)),
                blueprintContribution: 0,
                need: nil
            ))
        }

        let (placed, unplaced) = place(drafts, capacity: capacity, config: config, weekStart: input.weekStart)
        let withRest = addRestDays(placed, days: input.days, weekStart: input.weekStart, config: config)

        return WeeklyPlan(
            weekStart: input.weekStart,
            tasks: (locked + withRest).sorted { $0.date < $1.date },
            unplaced: unplaced,
            plannedMinutes: plannedMinutes,
            statedMinutes: statedMinutes,
            bufferMinutes: max(0, statedMinutes - plannedMinutes),
            needMinutes: needMinutes,
            generatedAt: input.generatedAt,
            configVersion: config.version
        )
    }

    /// Recalculate after missed work, without deleting history.
    ///
    /// Only a *share* of missed minutes carries forward. Carrying all of it is
    /// how a planner turns one missed day into a week the student cannot face,
    /// and the abandonment that follows costs far more than the work missed.
    struct CarryForward: Equatable, Sendable {
        var missedMinutes: Int
        var carriedMinutes: Int
        var forgivenMinutes: Int
        var tasks: [PlanTask]
    }

    static func carryForward(_ plan: WeeklyPlan, today: String, config: AdaptiveConfig) -> CarryForward {
        let missed = plan.tasks.filter {
            $0.date < today && $0.completedAt == nil && $0.skippedAt == nil && $0.kind != .rest
        }
        let missedIDs = Set(missed.map(\.id))
        let missedMinutes = missed.reduce(0) { $0 + $1.expectedMinutes }
        let carried = Int((Double(missedMinutes) * config.schedule.catchUpShare).rounded())

        let tasks = plan.tasks.map { task -> PlanTask in
            guard missedIDs.contains(task.id) else { return task }
            var moved = task
            moved.skippedAt = today
            moved.history.append(PlanTask.Move(
                at: today, from: task.date, to: today,
                reason: "Missed; part of this work carries into the next plan."
            ))
            return moved
        }

        return CarryForward(
            missedMinutes: missedMinutes,
            carriedMinutes: carried,
            forgivenMinutes: missedMinutes - carried,
            tasks: tasks
        )
    }

    /// Where a mock belongs.
    ///
    /// Far enough before the exam that a poor result can still be repaired. A
    /// mock two days out measures anxiety and leaves no time to act on it.
    static func mockDate(examDate: String, config: AdaptiveConfig) -> String {
        guard let exam = isoDay.date(from: examDate) else { return examDate }
        let moved = exam.addingTimeInterval(-Double(config.schedule.mockLeadDays) * 86_400)
        return isoDay.string(from: moved)
    }

    /// `YYYY-MM-DD` in UTC, matching how the website reads and writes plan dates.
    static let isoDay: DateFormatter = {
        let f = DateFormatter()
        f.calendar = Calendar(identifier: .gregorian)
        f.locale = Locale(identifier: "en_US_POSIX")
        f.timeZone = TimeZone(identifier: "UTC")
        f.dateFormat = "yyyy-MM-dd"
        return f
    }()

    // MARK: - Internals

    private struct TaskDraft {
        var kind: TaskKind
        var title: String
        var reason: String
        var expectedMinutes: Int
        var conceptIds: [String]
        var blueprintContribution: Double
        var need: AllocationNeed?
    }

    /// `calibration` is reserved for readiness assessments.
    ///
    /// Measuring unmeasured concepts happens through an ordinary question
    /// block, so it is practice. Calling it calibration would put two different
    /// things — a timed measurement with no feedback during it, and a normal
    /// block that happens to explore — under one word in the interface.
    private static func kind(for need: AllocationNeed) -> TaskKind {
        need == .review ? .review : .practice
    }

    private static func reason(for need: AllocationNeed, concepts: Int) -> String {
        // Spelt out rather than left to automatic inflection: that markup only
        // resolves inside a `Text` literal, and this is a stored string.
        let scope = concepts == 0 ? ""
            : concepts == 1 ? " Focused on 1 concept."
            : " Focused on \(concepts) concepts."
        switch need {
        case .weakness: return "Repeated evidence points to gaps here.\(scope)"
        case .coverage: return "These blueprint areas have had little or no practice.\(scope)"
        case .review: return "Scheduled before this is likely to fade.\(scope)"
        case .uncertainty: return "Nothing yet measures these, so a short check tells Nishany where you stand.\(scope)"
        }
    }

    /// Place tasks across the week, alternating load.
    ///
    /// Round-robin across days rather than filling each in turn: filling days
    /// sequentially produces three exhausting days and four empty ones, which is
    /// both worse for retention and the first thing a student notices.
    private static func place(
        _ drafts: [TaskDraft],
        capacity: [(date: String, minutes: Int)],
        config: AdaptiveConfig,
        weekStart: String
    ) -> (placed: [PlanTask], unplaced: [UnplacedTask]) {
        guard !capacity.isEmpty else {
            return ([], drafts.map {
                UnplacedTask(title: $0.title, kind: $0.kind, expectedMinutes: $0.expectedMinutes,
                             reason: "You have no available days this week.")
            })
        }

        var remaining = Dictionary(uniqueKeysWithValues: capacity.map { ($0.date, $0.minutes) })
        var heavyOnDay: [String: Int] = [:]
        var lightOnDay: [String: Int] = [:]
        var placed: [PlanTask] = []
        var unplaced: [UnplacedTask] = []

        // Rotate across needs before placing, so consecutive sessions change
        // subject rather than grinding through one need for three days. The
        // high-effort check below is the separate, stricter guard.
        let ordered = interleaveByNeed(drafts)

        var cursor = 0
        for task in ordered {
            // Whole-hour tasks rarely tile a buffered day exactly, so a session
            // fitting nowhere at full length is shortened to the largest room
            // left rather than dropped. A 45-minute block is worth far more than
            // a perfect 60-minute one that never happens.
            let largestSlot = capacity.map { remaining[$0.date] ?? 0 }.max() ?? 0
            var draft = task
            if largestSlot >= config.schedule.minTaskMinutes, largestSlot < task.expectedMinutes {
                draft.expectedMinutes = largestSlot
            }

            var target: String?
            for step in 0..<capacity.count {
                let day = capacity[(cursor + step) % capacity.count]
                guard (remaining[day.date] ?? 0) >= draft.expectedMinutes else { continue }
                // A day may hold several demanding sessions, but never two in a
                // row: it needs a lighter task between them. A flat per-day cap
                // would limit any week to seven demanding sessions however many
                // free hours the student has.
                if highEffort.contains(draft.kind) {
                    let heavy = heavyOnDay[day.date] ?? 0
                    let light = lightOnDay[day.date] ?? 0
                    if heavy - light >= config.schedule.maxConsecutiveHighEffort { continue }
                }
                target = day.date
                cursor = (cursor + step + 1) % capacity.count
                break
            }

            // No day can take it. It is not scheduled — overrunning capacity is
            // the one thing this function exists to prevent — but it is
            // reported, so the student sees that their stated hours cannot hold
            // everything the week wanted.
            guard let target else {
                unplaced.append(UnplacedTask(
                    title: draft.title,
                    kind: draft.kind,
                    expectedMinutes: draft.expectedMinutes,
                    reason: "Needs \(draft.expectedMinutes) uninterrupted minutes, and no day this week has that much left after your other commitments."
                ))
                continue
            }

            remaining[target] = (remaining[target] ?? 0) - draft.expectedMinutes
            if highEffort.contains(draft.kind) { heavyOnDay[target, default: 0] += 1 }
            else { lightOnDay[target, default: 0] += 1 }

            placed.append(PlanTask(
                id: "task-\(weekStart)-\(placed.count)",
                date: target,
                kind: draft.kind,
                tier: tier(index: placed.count, total: ordered.count, config: config),
                title: draft.title,
                reason: draft.reason,
                expectedMinutes: draft.expectedMinutes,
                conceptIds: draft.conceptIds,
                blueprintContribution: draft.blueprintContribution,
                need: draft.need,
                questionIds: [],
                resourceIds: [],
                locked: false,
                completedAt: nil,
                skippedAt: nil,
                history: []
            ))
        }

        return (alternateWithinDays(placed), unplaced)
    }

    /// Alternate demanding and light work inside each day.
    ///
    /// Placement decides *which* day; this decides the order within it. Without
    /// it a day can end up front-loaded with every demanding session, which is
    /// the stacking the capacity rules exist to prevent — the constraint has to
    /// hold in the order the student actually works through, not merely in the
    /// daily totals.
    private static func alternateWithinDays(_ tasks: [PlanTask]) -> [PlanTask] {
        var byDate: [String: [PlanTask]] = [:]
        for task in tasks { byDate[task.date, default: []].append(task) }

        var out: [PlanTask] = []
        for day in byDate.keys.sorted() {
            let dayTasks = byDate[day] ?? []
            var heavy = dayTasks.filter { highEffort.contains($0.kind) }
            var light = dayTasks.filter { !highEffort.contains($0.kind) }
            while !heavy.isEmpty || !light.isEmpty {
                if !heavy.isEmpty { out.append(heavy.removeFirst()) }
                if !light.isEmpty { out.append(light.removeFirst()) }
            }
        }
        return out
    }

    /// Round-robin across needs, preserving the order they were drafted in.
    ///
    /// Lanes are kept in an array rather than left to a dictionary's ordering:
    /// the readiness assessment is drafted first precisely so a tight week
    /// places it before anything else competes for the room, and a lane order
    /// that varied run to run would throw that away.
    private static func interleaveByNeed(_ drafts: [TaskDraft]) -> [TaskDraft] {
        var order: [String] = []
        var queues: [String: [TaskDraft]] = [:]
        for draft in drafts {
            let key = draft.need?.rawValue ?? draft.kind.rawValue
            if queues[key] == nil { order.append(key); queues[key] = [] }
            queues[key]?.append(draft)
        }

        var out: [TaskDraft] = []
        while out.count < drafts.count {
            for key in order where !(queues[key]?.isEmpty ?? true) {
                out.append(queues[key]!.removeFirst())
            }
        }
        return out
    }

    private static func tier(index: Int, total: Int, config: AdaptiveConfig) -> TaskTier {
        guard total > 0 else { return .minimum }
        let position = Double(index) / Double(total)
        if position < config.schedule.minimumTierShare { return .minimum }
        if position < config.schedule.minimumTierShare + config.schedule.recommendedTierShare { return .recommended }
        return .stretch
    }

    /// A day with nothing scheduled is named as rest rather than left blank.
    private static func addRestDays(
        _ tasks: [PlanTask], days: [DayCapacity], weekStart: String, config: AdaptiveConfig
    ) -> [PlanTask] {
        guard config.schedule.capacityBufferShare > 0 else { return tasks }
        let busy = Set(tasks.map(\.date))
        let rest = days
            .filter { !busy.contains($0.date) && !$0.unavailable }
            .enumerated()
            .map { index, day in
                PlanTask(
                    id: "task-\(weekStart)-rest-\(index)",
                    date: day.date,
                    kind: .rest,
                    tier: .minimum,
                    title: "Rest",
                    reason: "Deliberately unscheduled. Consolidation needs gaps, and a plan with no slack is one a single bad day destroys.",
                    expectedMinutes: 0,
                    conceptIds: [],
                    blueprintContribution: 0,
                    need: nil,
                    questionIds: [],
                    resourceIds: [],
                    locked: false,
                    completedAt: nil,
                    skippedAt: nil,
                    history: []
                )
            }
        return tasks + rest
    }
}
