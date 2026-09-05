import Foundation

/// Compressed programmes, for the horizons students actually arrive with.
///
/// A port of `src/data/adaptive/crashCourse.ts`. A crash course compresses the
/// same blueprint and the same evidence model. It does *not* swap them for
/// "high-yield only" — which is the standard offer and a dishonest one, because
/// high yield in a compressed programme almost always means "the topics we
/// happen to have the most questions about".
///
/// What compression legitimately changes: the emphasis between repair and
/// coverage, how often measurement happens, and how far a prerequisite gap is
/// chased. What it must never change: the blueprint, or the claim made about
/// the result.

struct CrashDay: Identifiable, Equatable, Sendable {
    enum Kind: String, Sendable {
        case study, mock, review, catchUp = "catch-up", rest
    }

    /// ISO date.
    var date: String
    /// 1-based, so the interface can say "day 6 of 30".
    var dayNumber: Int
    /// Concepts clustered for this day, prerequisites before dependents.
    var conceptIds: [String]
    var labels: [String]
    /// Blueprint weight this day would touch, 0–1.
    var blueprintWeight: Double
    /// The day's cognitive demand, used to keep two heavy days apart.
    var load: Int
    var kind: Kind
    var reason: String

    var id: String { date }
}

struct CrashProgramme: Equatable, Sendable {
    var band: AdaptiveConfig.CrashHorizonBand
    var daysToExam: Int
    var days: [CrashDay]
    var shares: AllocationShares
    /// Blueprint weight the programme cannot reach with the questions there are.
    ///
    /// Reported prominently rather than hidden. A programme that silently omits
    /// a fifth of the blueprint and calls itself complete is the single most
    /// damaging thing a crash course can do.
    var unreachableWeight: Double
    var unreachableGroups: [UnreachableGroup]
    /// Narrowed claim when coverage is insufficient.
    var claim: String
    var generatedAt: String
    var configVersion: Int

    struct UnreachableGroup: Identifiable, Equatable, Sendable {
        var groupId: String
        var groupLabel: String
        var weight: Double
        var id: String { groupId }
    }

    /// Study days carrying no concepts — the honest signal that the pool ran out.
    var emptyStudyDays: Int {
        days.filter { $0.kind == .study && $0.conceptIds.isEmpty }.count
    }

    /// The statement that must accompany every crash programme.
    static let caveat = "This programme compresses your blueprint; it does not shorten it. Completing it is not a score prediction, and no part of it is a guarantee. Anything your question bank cannot yet cover is listed above rather than left out silently."
}

struct BuildCrashInput: Sendable {
    var daysToExam: Int
    /// ISO date the programme starts.
    var startDate: String
    var nodes: [BlueprintNode]
    var coverage: CoverageState
    var states: [String: ConceptState]
    /// Concept id → how many approved questions exist for it.
    var poolByConcept: [String: Int]
    /// Concept id → concepts that must come first.
    var prerequisites: [String: [String]]
    var config: AdaptiveConfig = .default
    var generatedAt: String
}

enum CrashCourse {

    /// Order concepts so prerequisites land before what depends on them.
    ///
    /// A depth-first walk with cycle protection. Teaching a dependent concept
    /// before its prerequisite does not merely waste a day — it produces a wrong
    /// answer that the mastery model then records as a weakness in the
    /// *dependent* concept, and the student is sent to repair the wrong thing.
    static func orderByPrerequisite(_ conceptIds: [String], prerequisites: [String: [String]]) -> [String] {
        let wanted = Set(conceptIds)
        var ordered: [String] = []
        var placed: Set<String> = []
        var visiting: Set<String> = []

        func visit(_ conceptId: String) {
            guard !placed.contains(conceptId), wanted.contains(conceptId) else { return }
            // A cycle in the graph is a content error, not a reason to hang.
            // Break it and keep the ordering stable — the concept is still
            // scheduled, just not before the thing it depends on.
            guard !visiting.contains(conceptId) else { return }
            visiting.insert(conceptId)
            for dependency in prerequisites[conceptId] ?? [] { visit(dependency) }
            visiting.remove(conceptId)
            placed.insert(conceptId)
            ordered.append(conceptId)
        }

        for conceptId in conceptIds { visit(conceptId) }
        return ordered
    }

    /// Build a compressed programme.
    ///
    /// Concepts are ranked by what the horizon emphasises — repair first when
    /// there is time, blueprint weight first when there is not — then ordered by
    /// prerequisite, then dealt across the study days left after mocks, review
    /// and catch-up are reserved.
    static func build(_ input: BuildCrashInput) -> CrashProgramme? {
        let config = input.config
        guard let band = config.crashHorizon(daysToExam: input.daysToExam) ?? config.crashHorizons.first
        else { return nil }
        let reserved = reservedDays(band)

        // Anything with no approved questions cannot be studied here, however
        // heavily the blueprint weights it. Saying so is the point; quietly
        // dropping it is the failure mode.
        let reachable = input.nodes.filter { (input.poolByConcept[$0.conceptId] ?? 0) > 0 }
        let unreachable = input.nodes.filter { (input.poolByConcept[$0.conceptId] ?? 0) == 0 }

        let unreachableWeight = unreachable.reduce(0) { $0 + $1.weight }
        let touched = Dictionary(input.coverage.concepts.map { ($0.conceptId, $0.touched) },
                                 uniquingKeysWith: { a, _ in a })

        func urgency(_ node: BlueprintNode) -> Double {
            let state = input.states[node.conceptId]
            let untouched = !(touched[node.conceptId] ?? false)
            let repair = state.map { max(0, config.statuses.weakBelow - $0.mean) } ?? 0
            // The horizon's own shares decide the balance rather than a second
            // set of constants: a 14-day programme weights coverage at 0.50 and
            // repair at 0.25, and this ranking says exactly the same thing.
            return band.shares.coverage * node.weight * (untouched ? 1 : 0.3)
                + band.shares.weakness * repair
        }

        let ranked = reachable.sorted {
            let a = urgency($0), b = urgency($1)
            return a != b ? a > b : $0.conceptId < $1.conceptId
        }
        let ordered = orderByPrerequisite(ranked.map(\.conceptId), prerequisites: input.prerequisites)
        let nodeById = Dictionary(input.nodes.map { ($0.conceptId, $0) }, uniquingKeysWith: { a, _ in a })

        let total = max(1, min(input.daysToExam, band.days))
        let studyDays = max(1, total - reserved.mocks - reserved.review - reserved.catchUp)
        let perDay = max(1, Int((Double(ordered.count) / Double(studyDays)).rounded(.up)))

        var days: [CrashDay] = []
        let start = StudySchedule.isoDay.date(from: input.startDate) ?? Date()
        var cursor = 0

        for dayNumber in 1...total {
            let iso = StudySchedule.isoDay.string(from: start.addingTimeInterval(Double(dayNumber - 1) * 86_400))
            let kind = self.kind(dayNumber: dayNumber, total: total, reserved: reserved)

            guard kind == .study else {
                days.append(CrashDay(date: iso, dayNumber: dayNumber, conceptIds: [], labels: [],
                                     blueprintWeight: 0, load: 0, kind: kind, reason: reason(for: kind)))
                continue
            }

            let end = min(cursor + perDay, ordered.count)
            let cluster = cursor < end ? Array(ordered[cursor..<end]) : []
            cursor = end
            let clusterNodes = cluster.compactMap { nodeById[$0] }

            days.append(CrashDay(
                date: iso,
                dayNumber: dayNumber,
                conceptIds: cluster,
                labels: clusterNodes.map(\.label),
                blueprintWeight: clusterNodes.reduce(0) { $0 + $1.weight },
                load: cluster.count,
                kind: .study,
                reason: cluster.isEmpty
                    ? "Nothing outstanding for this day — use it for consolidation."
                    : "Selected by blueprint weight and current evidence, with prerequisites placed before the concepts that depend on them."
            ))
        }

        return CrashProgramme(
            band: band,
            daysToExam: input.daysToExam,
            days: days,
            shares: band.shares,
            unreachableWeight: unreachableWeight,
            unreachableGroups: groupWeights(unreachable),
            claim: claim(unreachableWeight: unreachableWeight, band: band),
            generatedAt: input.generatedAt,
            configVersion: config.version
        )
    }

    /// What the programme is allowed to claim.
    ///
    /// Narrowed automatically as coverage falls. The alternative — one fixed
    /// marketing sentence regardless of what the bank can actually support — is
    /// how a student ends up believing they have covered a syllabus they have
    /// never seen.
    static func claim(unreachableWeight: Double, band: AdaptiveConfig.CrashHorizonBand) -> String {
        let missing = Int((unreachableWeight * 100).rounded())
        if missing <= 0 {
            return "A \(band.days)-day programme covering your full exam blueprint, emphasising \(band.emphasis.lowercased())."
        }
        if missing < 15 {
            return "A \(band.days)-day programme covering most of your exam blueprint. About \(missing)% by weight has no approved questions yet and is not included."
        }
        return "A partial \(band.days)-day programme. About \(missing)% of your blueprint by weight has no approved questions yet, so this cannot claim to cover your exam. Treat it as targeted practice, not a complete course."
    }

    // MARK: - Internals

    /// Days reserved for measurement, review and slack, by horizon.
    private static func reservedDays(_ band: AdaptiveConfig.CrashHorizonBand) -> (mocks: Int, review: Int, catchUp: Int) {
        if band.days <= 14 { return (2, 1, 1) }
        if band.days <= 30 { return (4, 2, 3) }
        if band.days <= 60 { return (4, 4, 5) }
        return (5, 6, 7)
    }

    /// Which kind of day this is.
    ///
    /// Mocks are spread rather than clustered at the end, so each still leaves
    /// room to repair what it exposes. Catch-up days sit late, where the
    /// accumulated slippage actually is.
    private static func kind(dayNumber: Int, total: Int, reserved: (mocks: Int, review: Int, catchUp: Int)) -> CrashDay.Kind {
        if dayNumber == total { return .rest }
        if dayNumber == 1 { return .mock }

        let mockInterval = max(2, total / max(1, reserved.mocks))
        if dayNumber % mockInterval == 0, dayNumber < total - 1 { return .mock }

        let catchUpStart = total - reserved.catchUp
        if dayNumber > catchUpStart { return .catchUp }

        let reviewInterval = max(3, total / max(1, reserved.review))
        if dayNumber % reviewInterval == 0 { return .review }

        return .study
    }

    private static func reason(for kind: CrashDay.Kind) -> String {
        switch kind {
        case .study: ""
        case .mock: "A timed, blueprint-balanced assessment. Placed with enough time left to act on what it finds."
        case .review: "Revisiting earlier days. Spacing is what makes compressed study hold."
        case .catchUp: "Deliberately empty. Something will slip, and a programme with no slack breaks the first time it does."
        case .rest: "Rest. Consolidation happens in the gaps."
        }
    }

    private static func groupWeights(_ nodes: [BlueprintNode]) -> [CrashProgramme.UnreachableGroup] {
        var groups: [String: CrashProgramme.UnreachableGroup] = [:]
        for node in nodes {
            if var current = groups[node.groupId] {
                current.weight += node.weight
                groups[node.groupId] = current
            } else {
                groups[node.groupId] = CrashProgramme.UnreachableGroup(
                    groupId: node.groupId, groupLabel: node.groupLabel, weight: node.weight
                )
            }
        }
        return groups.values.sorted {
            $0.weight != $1.weight ? $0.weight > $1.weight : $0.groupId < $1.groupId
        }
    }
}

extension CrashDay.Kind {
    var label: String {
        switch self {
        case .study: "Study"
        case .mock: "Mock"
        case .review: "Review"
        case .catchUp: "Catch-up"
        case .rest: "Rest"
        }
    }
}
