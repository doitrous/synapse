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

    /// Days until the next exam, when the student's year has one published.
    ///
    /// Nil is a real answer, and the one that must not be papered over: an
    /// invented countdown changes how every block on this screen is divided.
    private(set) var daysToExam: Int?
    private(set) var examTitle: String?

    /// True when the student's university and year are not set.
    ///
    /// Every figure on this surface is scoped to a programme, so without one
    /// there is nothing honest to render — a blueprint belonging to nobody is
    /// worse than an empty screen.
    var scopeUnknown = false

    /// How many approved questions exist for each concept.
    ///
    /// The compressed programme needs this to tell the difference between a
    /// concept it chose not to schedule and one it *cannot* schedule, and that
    /// difference is the whole honesty of a crash course.
    private(set) var poolByConcept: [String: Int] = [:]
    /// Concept id → the concepts that must come first.
    private(set) var prerequisites: [String: [String]] = [:]

    private let api: SynapseAPI?
    private let sync: SyncEngine?
    private let store: LocalStore?

    init(api: SynapseAPI? = nil, sync: SyncEngine? = nil, store: LocalStore? = nil) {
        self.api = api
        self.sync = sync
        self.store = store
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

    // MARK: - The week

    /// Minutes a day the student says they have.
    ///
    /// Held here rather than saved, matching the website: it is a dial for
    /// asking "what would my week look like at two hours a day", and a stored
    /// answer to that question goes stale the moment a timetable changes.
    var minutesPerDay = 90

    /// The Monday of the week containing `today`.
    func weekStart(from today: Date = Date()) -> String {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = TimeZone(identifier: "UTC") ?? .gmt
        // Monday-first regardless of locale: this is the same week the website
        // plans, and a plan that started on Sunday on one device and Monday on
        // another would be two different plans.
        let weekday = calendar.component(.weekday, from: today)
        let offset = (weekday + 5) % 7
        let monday = calendar.date(byAdding: .day, value: -offset, to: today) ?? today
        return StudySchedule.isoDay.string(from: monday)
    }

    /// A week built from where the student actually stands.
    ///
    /// Everything the planner needs is already computed: which concepts are
    /// weak, which parts of the blueprint have had no practice, what is due for
    /// review, and what has never been measured at all.
    func weeklyPlan(from today: Date = Date()) -> WeeklyPlan {
        let start = weekStart(from: today)
        let startDate = StudySchedule.isoDay.date(from: start) ?? today

        let days = (0..<7).map { index in
            DayCapacity(
                date: StudySchedule.isoDay.string(from: startDate.addingTimeInterval(Double(index) * 86_400)),
                statedMinutes: minutesPerDay
            )
        }

        let byStatus = { (wanted: Set<ConceptStatus>) in
            self.states.values.filter { wanted.contains($0.status) }
                .sorted { $0.mean != $1.mean ? $0.mean < $1.mean : $0.conceptId < $1.conceptId }
                .map(\.conceptId)
        }

        let needs = [
            PlanNeedInput(need: .weakness, conceptIds: byStatus([.weak, .attention]),
                          label: "Weak concept repair"),
            PlanNeedInput(need: .coverage, conceptIds: coverage.uncoveredConcepts.map(\.conceptId),
                          label: "Blueprint coverage"),
            PlanNeedInput(need: .review, conceptIds: byStatus([.reviewDue]),
                          label: "Spaced review"),
            PlanNeedInput(need: .uncertainty,
                          conceptIds: blueprint.filter { states[$0.conceptId] == nil }.map(\.conceptId),
                          label: "Measuring what is unknown"),
        ]

        return StudySchedule.buildWeeklyPlan(BuildPlanInput(
            weekStart: start,
            days: days,
            shares: shares,
            needs: needs,
            config: config,
            blueprintWeights: Dictionary(blueprint.map { ($0.conceptId, $0.weight) },
                                         uniquingKeysWith: { a, _ in a }),
            daysToExam: daysToExam,
            generatedAt: ISO8601DateFormatter().string(from: today)
        ))
    }

    /// The compressed programme, when an exam is close enough to warrant one.
    ///
    /// Nil is a real answer: no exam on the timetable, or one far enough away
    /// that an ordinary week serves the student better than a countdown.
    func crashProgramme(from today: Date = Date()) -> CrashProgramme? {
        guard let daysToExam, !blueprint.isEmpty,
              config.crashHorizon(daysToExam: daysToExam) != nil
        else { return nil }

        return CrashCourse.build(BuildCrashInput(
            daysToExam: daysToExam,
            startDate: StudySchedule.isoDay.string(from: today),
            nodes: blueprint,
            coverage: coverage,
            states: states,
            poolByConcept: poolByConcept,
            prerequisites: prerequisites,
            config: config,
            generatedAt: ISO8601DateFormatter().string(from: today)
        ))
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

        prerequisites = await loadPrerequisites()
        poolByConcept = await loadPool(audience: audience)
        await loadNextExam(audience: audience)

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

    /// Count the approved questions behind each concept.
    ///
    /// Read from the local catalogue rather than asked of a server: this is the
    /// same pool the question bank draws from, so a programme cannot promise a
    /// concept the bank could not actually serve.
    private func loadPool(audience: StudentAudience) async -> [String: Int] {
        guard let store,
              let items = try? await store.items(kind: .question, audience: audience)
        else { return [:] }

        var counts: [String: Int] = [:]
        for question in items.compactMap(QuestionProjection.project) {
            // Main concepts only. A question that merely touches a concept is
            // not a question that can teach it.
            for conceptId in question.conceptIds { counts[conceptId, default: 0] += 1 }
        }
        return counts
    }

    /// Read the published timetable for the student's year.
    ///
    /// Both documents are admin-authored catalogues the app already caches, so
    /// this costs no network call — and an exam nobody published stays nil
    /// rather than becoming a guess.
    private func loadNextExam(audience: StudentAudience) async {
        guard let store,
              let universities = try? await store.catalogue(key: SyncEngine.universitiesKey),
              let schedules = try? await store.catalogue(key: SyncEngine.moduleSchedulesKey)
        else { return }

        let sessions = StudentSchedule.sessions(
            universities: try? JSONSerialization.jsonObject(with: universities),
            schedules: try? JSONSerialization.jsonObject(with: schedules),
            audience: audience
        )

        guard let next = StudentSchedule.nextExam(sessions) else { return }
        daysToExam = next.daysAway
        examTitle = next.session.title.isEmpty ? next.session.label : next.session.title
    }

    /// Prerequisite edges, from the shared concept graph.
    ///
    /// `source prerequisite_of target` means the source must come first, so it
    /// is the target that carries the dependency.
    private func loadPrerequisites() async -> [String: [String]] {
        guard let api,
              let graph = try? await api.state(ConceptGraph.self, key: ConceptGraph.key),
              let relations = graph.value?.relations
        else { return [:] }

        var edges: [String: [String]] = [:]
        for relation in relations where relation.type == "prerequisite_of" {
            edges[relation.targetId, default: []].append(relation.sourceId)
        }
        return edges
    }

    /// Admin-authored, so hyphenated and read from the shared catalogue.
    static let blueprintKey = "nishany-adaptive-blueprints-v1"
    /// The student's own, so dotted.
    static let evidenceKey = "nishany.progress.adaptive.evidence.v1"
}
