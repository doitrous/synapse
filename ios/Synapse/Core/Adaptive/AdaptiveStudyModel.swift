import Foundation
import Observation

/// Everything Adaptive Study computes, in one place.
///
/// The iOS counterpart of `useAdaptiveStudy`. Like the web's, it computes
/// entirely on the device: the evidence ledger, the blueprint and the config
/// are read from storage, and every figure below is derived from them. Nothing
/// here asks a server what a student knows.
@MainActor
@Observable
final class AdaptiveStudyModel {

    private(set) var config = AdaptiveConfig.default
    private(set) var blueprint: [BlueprintNode] = []
    private(set) var events: [AdaptiveEvidenceEvent] = []
    private(set) var states: [String: ConceptState] = [:]
    private(set) var coverage = CoverageState()
    private(set) var boosts: [String: ConceptBoost] = [:]
    private(set) var debt = CoverageDebt.empty
    private(set) var readiness: ReadinessResult?
    private(set) var isLoading = true

    /// Days until the next exam, when the student has a timetable with one.
    var daysToExam: Int?
    var examTitle: String?

    /// True when the student's university and year are not set.
    ///
    /// Every figure on this surface is scoped to a programme, so without one
    /// there is nothing honest to render — a blueprint belonging to nobody is
    /// worse than an empty screen.
    var scopeUnknown = false

    private let api: SynapseAPI?
    private let sync: SyncEngine?

    init(api: SynapseAPI? = nil, sync: SyncEngine? = nil) {
        self.api = api
        self.sync = sync
    }

    /// How this block would divide, given the exam horizon.
    var shares: AllocationShares { config.shares(daysToExam: daysToExam) }

    /// Distinct questions answered per concept, which is what coverage counts.
    var distinctItemsByConcept: [String: Int] {
        var byConcept: [String: Set<String>] = [:]
        for event in events {
            byConcept[event.conceptId, default: []].insert(event.questionId)
        }
        return byConcept.mapValues(\.count)
    }

    /// Concepts grouped by status, for the headline counts.
    ///
    /// A concept on the blueprint with no evidence is *unmeasured*, not absent.
    /// Skipping it would let a student read "0 unmeasured" on their first day.
    func statusCounts() -> [ConceptStatus: Int] {
        var counts = Dictionary(uniqueKeysWithValues: ConceptStatus.allCases.map { ($0, 0) })
        for node in blueprint {
            let status = states[node.conceptId]?.status ?? .unmeasured
            counts[status, default: 0] += 1
        }
        return counts
    }

    /// Raw wrong attempts, as the student experienced them.
    ///
    /// Shown next to the weak-concept count, never instead of it. The two
    /// numbers differ on purpose, and a student who sees only the smaller one
    /// concludes the app has lost their mistakes.
    var rawWrongTotal: Int { events.rawWrongAttempts }

    /// The slot plan the next block would follow.
    func nextBlockPlan(size: Int = 20) -> AllocationPlan {
        Allocation.plan(
            size: Allocation.clampBlockSize(size, config: config),
            shares: shares, debt: debt, config: config
        )
    }

    /// The weakest concepts worth repairing, most urgent first.
    var repairTargets: [ConceptState] {
        states.values
            .filter { ConceptStatus.repair.contains($0.status) }
            .sorted { $0.mean != $1.mean ? $0.mean < $1.mean : $0.conceptId < $1.conceptId }
    }

    /// Concepts whose review has come round.
    var dueForReview: [ConceptState] {
        states.values
            .filter { $0.status == .reviewDue }
            .sorted {
                let a = AdaptiveMastery.reviewUrgencyDays($0) ?? 0
                let b = AdaptiveMastery.reviewUrgencyDays($1) ?? 0
                return a != b ? a > b : $0.conceptId < $1.conceptId
            }
    }

    /// A concept's label, from the blueprint rather than the graph — the
    /// blueprint carries it so this reads without the concept graph beside it.
    func label(for conceptId: String) -> String {
        blueprint.first { $0.conceptId == conceptId }?.label ?? conceptId
    }

    // MARK: - Loading

    func load(audience: StudentAudience) async {
        isLoading = true
        defer { isLoading = false }

        scopeUnknown = !audience.isKnown

        guard let api else { rebuild(); return }

        async let remoteConfig = try? api.state(AdaptiveConfig.self, key: AdaptiveConfig.key)
        async let remoteBlueprint = try? api.state([BlueprintNode].self, key: Self.blueprintKey)
        async let remoteEvents = try? api.userState([AdaptiveEvidenceEvent].self, key: Self.evidenceKey)
        async let remoteBoosts = try? api.userState([String: ConceptBoost].self, key: ConceptBoost.key)
        async let remoteDebt = try? api.userState(CoverageDebt.self, key: CoverageDebt.key)
        async let remoteReadiness = try? api.userState(ReadinessResult.self, key: ReadinessResult.key)

        config = (await remoteConfig)?.value ?? .default
        blueprint = (await remoteBlueprint)?.value ?? []
        events = (await remoteEvents)?.value ?? []
        boosts = (await remoteBoosts)?.value ?? [:]
        debt = (await remoteDebt)?.value ?? .empty
        readiness = (await remoteReadiness)?.value

        rebuild()
    }

    /// Recompute everything from the ledger.
    ///
    /// The whole model is replayable, so this is the only way state is ever
    /// produced — changing the config recomputes history rather than silently
    /// reinterpreting it.
    private func rebuild() {
        states = AdaptiveMastery.rebuildAll(events, config: config)
        coverage = Coverage.state(blueprint, distinctItemsByConcept: distinctItemsByConcept)
    }

    /// Admin-authored, so hyphenated and read from the shared catalogue.
    static let blueprintKey = "synapse-adaptive-blueprints-v1"
    /// The student's own, so dotted.
    static let evidenceKey = "synapse.progress.adaptive.evidence.v1"
}
