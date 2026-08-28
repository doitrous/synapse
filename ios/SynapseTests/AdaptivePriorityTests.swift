import Foundation
import Testing
@testable import Synapse

/// Coverage and priority, pinned to `src/data/adaptive/coverage.ts` and
/// `priority.ts` run under Node against the same blueprint.
struct AdaptiveCoverageTests {

    private let config = AdaptiveConfig.default

    private var nodes: [BlueprintNode] {
        [
            BlueprintNode(conceptId: "CON-A", label: "A", groupId: "g1", groupLabel: "G1", weight: 0.4, overridden: false),
            BlueprintNode(conceptId: "CON-B", label: "B", groupId: "g1", groupLabel: "G1", weight: 0.35, overridden: false),
            BlueprintNode(conceptId: "CON-C", label: "C", groupId: "g2", groupLabel: "G2", weight: 0.25, overridden: false),
        ]
    }

    private let practised = ["CON-A": 3]

    /// Coverage is weight, not questions answered. Three questions on one
    /// concept cover that concept's weight and nothing else.
    @Test func coverageIsMeasuredInWeightNotVolume() {
        let state = Coverage.state(nodes, distinctItemsByConcept: practised)

        #expect(abs(state.coveredWeight - 0.4) < 1e-9)
        #expect(abs(state.uncoveredWeight - 0.6) < 1e-9)
        #expect(state.uncoveredConcepts.map(\.conceptId) == ["CON-B", "CON-C"])
        #expect(state.groups.map(\.groupId) == ["g1", "g2"])
        #expect(abs(state.groups[0].coveredWeight - 0.4) < 1e-9)
        #expect(state.groups[0].uncovered == 1)
    }

    /// Covered means "practised at all", not "mastered" — a single wrong answer
    /// still counts as having been there.
    @Test func oneAnswerCoversAConcept() {
        let state = Coverage.state(nodes, distinctItemsByConcept: ["CON-B": 1])
        #expect(state.concepts.first { $0.conceptId == "CON-B" }?.touched == true)
        #expect(abs(state.coveredWeight - 0.35) < 1e-9)
    }

    /// Deficit falls off quickly: the second question on a concept closes far
    /// less than the first, and it is scaled so the term stays 0–1 whatever the
    /// blueprint's size.
    @Test func blueprintDeficitMatchesTheWeb() {
        let weights = Dictionary(uniqueKeysWithValues: nodes.map { ($0.conceptId, $0.weight) })

        #expect(abs(Coverage.blueprintDeficit(conceptIds: ["CON-A"], weights: weights, distinctItemsByConcept: practised) - 0.25) < 1e-6)
        #expect(abs(Coverage.blueprintDeficit(conceptIds: ["CON-B"], weights: weights, distinctItemsByConcept: practised) - 0.875) < 1e-6)
        #expect(abs(Coverage.blueprintDeficit(conceptIds: ["CON-C"], weights: weights, distinctItemsByConcept: practised) - 0.625) < 1e-6)
        // A concept not on the blueprint closes nothing.
        #expect(Coverage.blueprintDeficit(conceptIds: ["NOPE"], weights: weights, distinctItemsByConcept: practised) == 0)
    }

    /// The group gap subtracts the concept's own weight from both sides, so a
    /// weak concept in a well-covered topic does not collect a second penalty
    /// for the topic it happens to sit in.
    @Test func aConceptIsNotChargedTwiceForItsOwnGroup() {
        let coverage = Coverage.state(nodes, distinctItemsByConcept: practised)
        let byConcept = Dictionary(uniqueKeysWithValues: nodes.map { ($0.conceptId, $0) })

        // CON-A's group still holds an untouched sibling, so breadth remains.
        #expect(abs(Coverage.groupGap(conceptIds: ["CON-A"], nodeByConcept: byConcept, coverage: coverage) - 1) < 1e-9)
        // CON-C is alone in its group: with its own weight removed there is no
        // breadth left to report.
        #expect(Coverage.groupGap(conceptIds: ["CON-C"], nodeByConcept: byConcept, coverage: coverage) == 0)
    }

    /// Debt decays across the rolling window, so a bad week does not distort a
    /// month — and it is repaid a slot or two at a time rather than turning one
    /// block into a syllabus march.
    @Test func coverageDebtDecaysAndIsCapped() {
        var debt = Coverage.debtAfterBlock(.empty, targeted: 6, served: 2, config: config, at: "x")
        #expect(abs(debt.slots - 3) < 1e-9)
        #expect(debt.blocks == 1)

        debt = Coverage.debtAfterBlock(debt, targeted: 6, served: 6, config: config, at: "x")
        #expect(abs(debt.slots - 2.25) < 1e-9)
        #expect(debt.blocks == 2)
    }

    @Test func noOneBlockRepaysEverything() {
        #expect(Coverage.maxDebtRepayment(blockSize: 20, config: config) == 5)
        #expect(Coverage.maxDebtRepayment(blockSize: 4, config: config) == 1)
        // Never zero: a block that can repay nothing would never close the debt.
        #expect(Coverage.maxDebtRepayment(blockSize: 1, config: config) == 1)
    }
}

struct AdaptivePriorityTests {

    private let config = AdaptiveConfig.default
    private let at = "2026-08-12T10:00:00.000Z"

    private func date(_ iso: String) -> Date { ISO8601DateFormatter.read(iso)! }

    private var nodes: [BlueprintNode] {
        [
            BlueprintNode(conceptId: "CON-A", label: "A", groupId: "g1", groupLabel: "G1", weight: 0.4, overridden: false),
            BlueprintNode(conceptId: "CON-B", label: "B", groupId: "g1", groupLabel: "G1", weight: 0.35, overridden: false),
            BlueprintNode(conceptId: "CON-C", label: "C", groupId: "g2", groupLabel: "G2", weight: 0.25, overridden: false),
        ]
    }

    private func item(
        _ id: String = "q1", concepts: [String] = ["CON-A"], topic: String = "T",
        demanding: Bool = false, effort: Double = 0.5
    ) -> AdaptiveItem {
        AdaptiveItem(
            id: id, version: "v1", subjectId: "cvs", topic: topic, difficulty: "Moderate",
            mainConceptIds: concepts, secondaryConceptIds: [], conceptIds: concepts,
            cognitiveEffort: effort, estimatedSeconds: 60, demanding: demanding
        )
    }

    private func context(
        states: [String: ConceptState] = [:], exposure: [String: Int] = [:],
        recentConcepts: Set<String> = [], recentTopics: Set<String> = [],
        fatigue: Double = 0, boosts: [String: ConceptBoost] = [:]
    ) -> ScoringContext {
        let distinct = ["CON-A": 3]
        return ScoringContext(
            config: config,
            states: states,
            coverage: Coverage.state(nodes, distinctItemsByConcept: distinct),
            nodeByConcept: Dictionary(uniqueKeysWithValues: nodes.map { ($0.conceptId, $0) }),
            blueprintWeights: Dictionary(uniqueKeysWithValues: nodes.map { ($0.conceptId, $0.weight) }),
            distinctItemsByConcept: distinct,
            boosts: boosts,
            exposureByQuestion: exposure,
            recentConceptIds: recentConcepts,
            recentTopics: recentTopics,
            fatigue: fatigue,
            now: date("2026-08-13T10:00:00.000Z")
        )
    }

    private func wrongRun(_ concept: String, _ count: Int) -> [AdaptiveEvidenceEvent] {
        (0..<count).map { index in
            AdaptiveEvidenceEvent(
                id: "attempt-wrong-\(index):\(concept)",
                at: ISO8601DateFormatter.synapse.string(from: date(at).addingTimeInterval(Double(index) * 3600)),
                attemptId: "attempt-wrong-\(index)", blockId: "block-1",
                questionId: "q-wrong-\(index)", questionVersion: "v1", conceptId: concept,
                role: .main, correct: false, outcome: .answered, confidence: .unstated,
                seconds: 60, expectedSeconds: 60, mode: .tutor, exposure: .first,
                difficulty: "Moderate", configVersion: 1
            )
        }
    }

    /// Every term, against the web's own output for the same state.
    @Test func everyTermMatchesTheWeb() {
        let states = AdaptiveMastery.rebuildAll(wrongRun("CON-A", 3), config: config, now: date("2026-08-13T10:00:00.000Z"))
        let score = Priority.score(item(), context(states: states))

        #expect(abs(score.terms.conceptWeakness - 0.617118) < 1e-6)
        #expect(abs(score.terms.topicOrSubtopicGap - 1) < 1e-6)
        #expect(abs(score.terms.examBlueprintDeficit - 0.25) < 1e-6)
        #expect(score.terms.spacedReviewUrgency == 0)
        #expect(abs(score.terms.informationGain - 0.680209) < 1e-6)
        #expect(abs(score.terms.recentErrorBoost - 0.6) < 1e-6)
        #expect(score.terms.novelty == 1)
        #expect(abs(score.total - 0.555499) < 1e-6)
    }

    /// Weakness asserted on thin evidence is halved, so one bad answer cannot
    /// dominate a block before it has been confirmed.
    @Test func thinEvidenceIsDiscounted() {
        let confirmed = AdaptiveMastery.rebuildAll(wrongRun("CON-A", 3), config: config, now: date("2026-08-13T10:00:00.000Z"))
        let single = AdaptiveMastery.rebuildAll(wrongRun("CON-A", 1), config: config, now: date("2026-08-13T10:00:00.000Z"))

        let strong = Priority.conceptWeakness(item(), context(states: confirmed))
        let weak = Priority.conceptWeakness(item(), context(states: single))
        #expect(strong > weak, "confirmed weakness outranks a single unconfirmed error")
        #expect(weak > 0, "but one error still counts for something")
    }

    /// A concept never measured is maximum ignorance, and therefore maximum
    /// information — which is what funds the uncertainty allocation.
    @Test func anUnmeasuredConceptIsWorthTheMostToAsk() {
        #expect(Priority.informationGain(item(concepts: ["NEVER-SEEN"]), context()) == 1)
    }

    /// Novelty is binary. "How new" is not a spectrum.
    @Test func noveltyIsBinary() {
        #expect(Priority.novelty(item(), context()) == 1)
        #expect(Priority.novelty(item(), context(exposure: ["q1": 1])) == 0)
        #expect(Priority.novelty(item(), context(exposure: ["q1": 9])) == 0)
    }

    /// A tired student can still answer a straightforward question; what they
    /// cannot do well is a demanding one.
    @Test func fatigueOnlyReallyPenalisesDemandingItems() {
        let tired = context(fatigue: 1)
        let hard = Priority.fatiguePenalty(item(demanding: true, effort: 0.8), tired)
        let easy = Priority.fatiguePenalty(item(demanding: false, effort: 0.8), tired)

        #expect(hard > easy)
        #expect(abs(hard - 0.8) < 1e-9)
        #expect(abs(easy - 0.4) < 1e-9)
        // A fresh student is never penalised at all.
        #expect(Priority.fatiguePenalty(item(demanding: true, effort: 0.8), context(fatigue: 0)) == 0)
    }

    @Test func askingTheSameGroundAgainIsPenalised() {
        #expect(Priority.repetitionPenalty(item(), context(recentConcepts: ["CON-A"])) == 1)
        #expect(Priority.repetitionPenalty(item(), context(recentTopics: ["T"])) == 0.5)
        #expect(Priority.repetitionPenalty(item(), context()) == 0)
    }

    /// A boost may only lift something already worth asking. Multiplying a
    /// negative total would make a poor item *worse* the more its concept needs
    /// work.
    @Test func aBoostNeverMakesAPoorItemWorse() {
        let boosts = [
            "CON-A": ConceptBoost(
                conceptId: "CON-A", multiplier: 1.15, remainingEligibleBlocks: 3,
                notBefore: at, repairQuestionIds: []
            ),
        ]
        // Drive the total negative with penalties on all sides.
        let punished = context(
            exposure: ["q1": 5], recentConcepts: ["CON-A"], recentTopics: ["T"],
            fatigue: 1, boosts: boosts
        )
        let score = Priority.score(item(demanding: true, effort: 1), punished)

        #expect(score.total < 0)
        #expect(score.boostMultiplier == 1.15)
        // Negative and *not* multiplied — otherwise the boost would deepen it.
        let unboosted = Priority.score(item(demanding: true, effort: 1), context(
            exposure: ["q1": 5], recentConcepts: ["CON-A"], recentTopics: ["T"], fatigue: 1
        ))
        #expect(abs(score.total - unboosted.total) < 1e-12)
    }

    /// A boost inside its spacing window is not live: re-asking a concept in
    /// the same sitting tests recall of the explanation just read.
    @Test func aBoostInsideItsSpacingWindowDoesNotApply() {
        let notYet = [
            "CON-A": ConceptBoost(
                conceptId: "CON-A", multiplier: 1.15, remainingEligibleBlocks: 3,
                notBefore: "2099-01-01T00:00:00.000Z", repairQuestionIds: []
            ),
        ]
        #expect(notYet.multiplier(for: ["CON-A"], now: date(at)) == 1)

        let spent = [
            "CON-A": ConceptBoost(
                conceptId: "CON-A", multiplier: 1.15, remainingEligibleBlocks: 0,
                notBefore: at, repairQuestionIds: []
            ),
        ]
        #expect(spent.multiplier(for: ["CON-A"], now: date("2026-08-13T10:00:00.000Z")) == 1)
    }

    /// The diagnostics are read from the same state the score is, so a block
    /// cannot claim it served a need the score never saw.
    @Test func needSignalsSayWhatAnItemWouldActuallyDo() {
        let states = AdaptiveMastery.rebuildAll(wrongRun("CON-A", 3), config: config, now: date("2026-08-13T10:00:00.000Z"))

        let repairs = Priority.needs(item(), context(states: states))
        #expect(repairs.repairsWeakness)
        #expect(!repairs.closesCoverage, "CON-A has been practised three times")

        let fresh = Priority.needs(item(concepts: ["CON-B"]), context(states: states))
        #expect(fresh.closesCoverage)
        #expect(fresh.reducesUncertainty)
        #expect(!fresh.repairsWeakness)
    }
}
