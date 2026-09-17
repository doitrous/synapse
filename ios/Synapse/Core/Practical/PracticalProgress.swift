import Foundation

/// What a student has done on the practical surface.
///
/// A port of `src/data/practicalProgress.ts`. Everything here is what the
/// *student* says about their own work: a station is self-marked, a skill is
/// self-rated. No assessor signs anything off in this product, so nothing here
/// may be presented as though one had.
struct PracticalProgress: Codable, Equatable, Sendable {
    var version = 1
    var stations: [String: Station] = [:]
    var cases: [String: Case] = [:]
    var labs: [String: Lab] = [:]
    var skills: [String: Skill] = [:]

    static let key = "nishany.practical.progress.v1"

    struct Station: Codable, Equatable, Sendable {
        var attempts: Int
        /// Best marks achieved, out of the station's own total.
        var bestMarks: Int
        /// The station's mark total when `bestMarks` was set, so a percentage
        /// is honest.
        var outOf: Int
        var lastAt: String
        /// Mark-scheme items ticked on the most recent run, so it can be
        /// resumed.
        var checkedItems: [String]
    }

    enum CaseStatus: String, Codable, Sendable {
        case notStarted = "not-started"
        case inProgress = "in-progress"
        case completed
    }

    struct Case: Codable, Equatable, Sendable {
        var status: CaseStatus
        /// How far through the decision points the student reached.
        var lastStep: Int
        var steps: Int
        var lastAt: String
    }

    struct Lab: Codable, Equatable, Sendable {
        var done: Int
        var items: Int
        var lastAt: String
    }

    /// What the student says about a skill. Never what an assessor says.
    enum SkillStatus: String, Codable, CaseIterable, Sendable {
        case notStarted = "not-started"
        case practised
        case ready

        var label: String {
            switch self {
            case .notStarted: "Not started"
            case .practised: "Practised"
            case .ready: "Ready"
            }
        }

        /// Cycled rather than picked: three states on one tap is quicker than
        /// a menu, and there is no wrong order to meet them in.
        var next: SkillStatus {
            switch self {
            case .notStarted: .practised
            case .practised: .ready
            case .ready: .notStarted
            }
        }
    }

    struct Skill: Codable, Equatable, Sendable {
        var status: SkillStatus
        var lastAt: String
    }
}

extension PracticalProgress {

    /// Fold a finished station run in.
    ///
    /// The best score only moves up, and it carries the mark total it was
    /// scored against — a station later re-authored out of 30 must not make an
    /// old 18/20 read as 18/30.
    mutating func record(
        station id: String, marks: Int, outOf: Int, checkedItems: [String], at: String
    ) {
        let current = stations[id]
        let previousShare = (current?.outOf ?? 0) > 0
            ? Double(current!.bestMarks) / Double(current!.outOf)
            : -1
        let thisShare = outOf > 0 ? Double(marks) / Double(outOf) : 0
        let better = thisShare >= previousShare

        stations[id] = Station(
            attempts: (current?.attempts ?? 0) + 1,
            bestMarks: better ? marks : (current?.bestMarks ?? marks),
            outOf: better ? outOf : (current?.outOf ?? outOf),
            lastAt: at,
            checkedItems: checkedItems
        )
    }

    /// Fold a case's progress in.
    mutating func record(
        case id: String, lastStep: Int, steps: Int, completed: Bool, at: String
    ) {
        let current = cases[id]
        cases[id] = Case(
            // Once completed, revisiting a case does not demote it.
            status: completed || current?.status == .completed ? .completed : .inProgress,
            lastStep: max(lastStep, current?.lastStep ?? 0),
            steps: steps,
            lastAt: at
        )
    }

    mutating func record(lab id: String, done: Int, items: Int, at: String) {
        labs[id] = Lab(done: max(done, labs[id]?.done ?? 0), items: items, lastAt: at)
    }

    /// Set what a student says about a skill.
    ///
    /// Back to "not started" removes the record rather than storing it: an
    /// absent entry and an explicit "not started" mean the same thing, and
    /// keeping both lets the two disagree.
    mutating func set(skill id: String, status: SkillStatus, at: String) {
        if status == .notStarted {
            skills.removeValue(forKey: id)
        } else {
            skills[id] = Skill(status: status, lastAt: at)
        }
    }

    func status(ofSkill id: String) -> SkillStatus { skills[id]?.status ?? .notStarted }

    /// How the skills list stands.
    ///
    /// The total is passed in from the live list rather than stored, so the
    /// headline can never disagree with the list beneath it.
    func skillsSummary(total: Int) -> (practised: Int, ready: Int, total: Int) {
        (
            practised: skills.values.filter { $0.status == .practised }.count,
            ready: skills.values.filter { $0.status == .ready }.count,
            total: total
        )
    }
}
