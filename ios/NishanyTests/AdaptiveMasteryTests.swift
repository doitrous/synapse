import Foundation
import Testing
@testable import Nishany

/// The adaptive mastery model, pinned to `src/data/adaptive/masteryModel.ts`
/// run under Node against the web's own fixtures.
///
/// This is the model that decides what a student is told they are weak at, so
/// the safety rules matter more than the arithmetic: one lucky answer is not
/// knowledge, one error is not a weakness, and four questions in one sitting is
/// not retention.
struct AdaptiveMasteryTests {

    private let config = AdaptiveConfig.default
    /// The fixtures' epoch.
    private let at = "2026-08-12T10:00:00.000Z"

    private func date(_ iso: String) -> Date { ISO8601DateFormatter.read(iso)! }

    private func hoursAfter(_ hours: Double, from: String? = nil) -> String {
        ISO8601DateFormatter.synapse.string(
            from: date(from ?? at).addingTimeInterval(hours * 3600)
        )
    }

    private func daysAfter(_ days: Double) -> String { hoursAfter(days * 24) }

    private func evidence(
        concept: String, question: String = "q-0", attempt: String? = nil,
        correct: Bool? = true, at when: String? = nil,
        role: ConceptRole = .main, outcome: AttemptOutcome = .answered,
        confidence: Confidence = .unstated, seconds: Double? = 60,
        expectedSeconds: Double? = 60, exposure: ExposureState = .first,
        difficulty: String = "Moderate"
    ) -> AdaptiveEvidenceEvent {
        let attemptId = attempt ?? "attempt-\(question)"
        return AdaptiveEvidenceEvent(
            id: "\(attemptId):\(concept)", at: when ?? at, attemptId: attemptId,
            blockId: "block-1", questionId: question, questionVersion: "v1",
            conceptId: concept, role: role, correct: correct, outcome: outcome,
            confidence: confidence, seconds: seconds, expectedSeconds: expectedSeconds,
            mode: .tutor, exposure: exposure, difficulty: difficulty, configVersion: 1
        )
    }

    /// `n` wrong answers on one concept, each on a different question.
    private func wrongRun(_ concept: String, _ count: Int) -> [AdaptiveEvidenceEvent] {
        (0..<count).map { index in
            evidence(
                concept: concept, question: "q-wrong-\(index)",
                attempt: "attempt-wrong-\(index)", correct: false,
                at: hoursAfter(Double(index))
            )
        }
    }

    // MARK: - The rule the product hangs on

    /// Three questions, all mainly assessing one concept, must not become three
    /// weaknesses. They are three mistakes and one weak concept.
    @Test func threeWrongAnswersAreOneWeakConcept() {
        let events = wrongRun("CON-A", 3)
        let state = AdaptiveMastery.rebuild("CON-A", from: events, config: config, now: date(daysAfter(1)))

        #expect(events.rawWrongAttempts == 3, "all three mistakes are kept")
        #expect(state.rawWrong == 3)
        #expect(state.distinctItems == 3)
        #expect(state.attempts == 3)
        #expect(state.status == .weak)
        #expect(abs(state.mean - 0.210585) < 1e-6)
        #expect(abs(state.uncertainty - 0.340105) < 1e-6)
    }

    /// One ordinary error reaches attention, never weak. It schedules a
    /// follow-up; it does not tell a student they are bad at something.
    @Test func oneOrdinaryErrorReachesAttentionNeverWeak() {
        let state = AdaptiveMastery.rebuild(
            "CON-A", from: wrongRun("CON-A", 1), config: config, now: date(daysAfter(1))
        )
        #expect(state.status == .attention)
        #expect(state.rawWrong == 1)
        #expect(state.distinctItems == 1)
        #expect(abs(state.mean - 0.342857) < 1e-6)
    }

    /// A wrong answer the student was sure of is the strongest misconception
    /// evidence there is, so two of them are enough on their own.
    @Test func twoHighConfidenceErrorsAreEnoughForWeak() {
        let events = [
            evidence(concept: "C", question: "q1", attempt: "a1", correct: false, confidence: .sure),
            evidence(concept: "C", question: "q2", attempt: "a2", correct: false,
                     at: hoursAfter(1), confidence: .sure),
        ]
        let state = AdaptiveMastery.rebuild("C", from: events, config: config, now: date(daysAfter(1)))
        #expect(state.status == .weak)
        #expect(state.highConfidenceErrors == 2)
    }

    /// One lucky correct answer is unmeasured, not secure.
    @Test func oneLuckyAnswerIsNotKnowledge() {
        let events = [evidence(concept: "L", question: "q1", attempt: "a1", correct: true)]
        let state = AdaptiveMastery.rebuild("L", from: events, config: config, now: date(daysAfter(1)))
        #expect(state.status == .unmeasured)
    }

    /// Four right answers in one sitting is recall, not retention — so it stops
    /// at developing however high the mean goes.
    @Test func answeringFourInOneSittingIsNotRetention() {
        let events = (0..<4).map { index in
            evidence(concept: "S", question: "q\(index)", attempt: "a\(index)",
                     correct: true, at: hoursAfter(Double(index)))
        }
        let state = AdaptiveMastery.rebuild("S", from: events, config: config, now: date(daysAfter(1)))

        #expect(state.status == .developing)
        #expect(state.spacedSuccesses == 0)
        #expect(state.distinctItems == 4)
        #expect(abs(state.mean - 0.823447) < 1e-6, "well above the secure threshold, and still not secure")
    }

    /// Secure needs the threshold, four distinct items **and** a success at
    /// least 48 hours later.
    @Test func secureNeedsASpacedSuccess() {
        var events = (0..<4).map { index in
            evidence(concept: "S", question: "q\(index)", attempt: "a\(index)",
                     correct: true, at: hoursAfter(Double(index)))
        }
        events.append(evidence(concept: "S", question: "q4", attempt: "a4",
                               correct: true, at: daysAfter(3)))

        let state = AdaptiveMastery.rebuild("S", from: events, config: config, now: date(daysAfter(4)))
        #expect(state.status == .secure)
        #expect(state.spacedSuccesses == 1)
        #expect(abs(state.mean - 0.845225) < 1e-6)
        #expect(state.nextReviewAt == "2026-08-29T10:00:00.000Z")
    }

    /// A secure concept becomes review-due once its date passes — the same
    /// state, read against a later clock.
    @Test func aSecureConceptBecomesDue() {
        var events = (0..<4).map { index in
            evidence(concept: "S", question: "q\(index)", attempt: "a\(index)",
                     correct: true, at: hoursAfter(Double(index)))
        }
        events.append(evidence(concept: "S", question: "q4", attempt: "a4",
                               correct: true, at: daysAfter(3)))

        let later = date(daysAfter(60))
        let state = AdaptiveMastery.rebuild("S", from: events, config: config, now: later)
        #expect(state.status == .reviewDue)
        #expect(abs((AdaptiveMastery.reviewUrgencyDays(state, now: later) ?? 0) - 43) < 1e-6)
    }

    // MARK: - Weighting

    @Test func difficultyCreditIsClampedToTheBand() {
        let credits = ["Easy", "Moderate", "Hard", "Challenging"].map {
            AdaptiveMastery.difficultyCredit($0, config: config)
        }
        #expect(abs(credits[0] - 0.75) < 1e-6)
        #expect(abs(credits[1] - 0.916667) < 1e-6)
        #expect(abs(credits[2] - 1.083333) < 1e-6)
        #expect(abs(credits[3] - 1.25) < 1e-6)

        // An unrecognised band sits at neutral rather than guessing.
        #expect(abs(AdaptiveMastery.difficultyCredit("Nonsense", config: config) - 1) < 1e-6)
    }

    /// Every factor is a reduction from a full-weight ordinary answer — except
    /// a high-confidence error, which is the one thing that counts for more.
    @Test func everyWeightMatchesTheWeb() {
        func weight(_ event: AdaptiveEvidenceEvent) -> Double {
            AdaptiveMastery.evidenceWeight(event, config: config)
        }
        let plain = weight(evidence(concept: "X"))
        #expect(abs(plain - 0.916667) < 1e-6)

        #expect(abs(weight(evidence(concept: "X", role: .secondary)) - 0.55) < 1e-6)
        #expect(abs(weight(evidence(concept: "X", correct: nil, outcome: .blank)) - 0.229167) < 1e-6)
        #expect(abs(weight(evidence(concept: "X", exposure: .repeatAfterReveal)) - 0.229167) < 1e-6)
        #expect(abs(weight(evidence(concept: "X", correct: true, seconds: 5, expectedSeconds: 60)) - 0.366667) < 1e-6)
        #expect(abs(weight(evidence(concept: "X", correct: false, seconds: 5, expectedSeconds: 60)) - 0.458333) < 1e-6)

        let sureWrong = weight(evidence(concept: "X", correct: false, confidence: .sure))
        #expect(abs(sureWrong - 1.191667) < 1e-6)
        #expect(sureWrong > plain, "the only case that carries more than an ordinary answer")
    }

    /// A blank is not a wrong answer. It contributes uncertainty, not a verdict.
    @Test func aBlankIsNotAWrongAnswer() {
        let blank = evidence(concept: "X", correct: nil, outcome: .blank)
        let wrong = evidence(concept: "X", correct: false)
        #expect(AdaptiveMastery.evidenceWeight(blank, config: config)
                < AdaptiveMastery.evidenceWeight(wrong, config: config))
    }

    @Test func anAnswerTooFastToHaveBeenReasonedIsRecognised() {
        #expect(AdaptiveMastery.isAbnormallyFast(
            evidence(concept: "X", seconds: 5, expectedSeconds: 60), config: config))
        #expect(!AdaptiveMastery.isAbnormallyFast(
            evidence(concept: "X", seconds: 30, expectedSeconds: 60), config: config))
        // An untimed item cannot be too fast.
        #expect(!AdaptiveMastery.isAbnormallyFast(
            evidence(concept: "X", seconds: nil), config: config))
    }

    @Test func theIntervalNarrowsAsEvidenceAccumulates() {
        #expect(abs(AdaptiveMastery.betaHalfWidth(1, 1) - 0.5) < 1e-6)
        #expect(abs(AdaptiveMastery.betaHalfWidth(2, 2) - 0.447214) < 1e-6)
        #expect(abs(AdaptiveMastery.betaHalfWidth(10, 10) - 0.218218) < 1e-6)
        // No evidence at all is maximum ignorance, not a divide by zero.
        #expect(abs(AdaptiveMastery.betaHalfWidth(0, 0) - 0.5) < 1e-6)
    }

    // MARK: - Replay

    /// Rebuilding is pure and order-independent: the events are sorted inside,
    /// so a caller cannot corrupt the decay by handing over an unsorted array.
    @Test func rebuildingIsOrderIndependent() {
        let events = wrongRun("CON-A", 3)
        let forwards = AdaptiveMastery.rebuild("CON-A", from: events, config: config, now: date(daysAfter(1)))
        let backwards = AdaptiveMastery.rebuild("CON-A", from: events.reversed(), config: config, now: date(daysAfter(1)))
        #expect(forwards == backwards)
    }

    @Test func evidenceForOtherConceptsIsIgnored() {
        let mixed = wrongRun("CON-A", 2) + wrongRun("CON-B", 3)
        let state = AdaptiveMastery.rebuild("CON-A", from: mixed, config: config, now: date(daysAfter(1)))
        #expect(state.distinctItems == 2)
        #expect(state.conceptId == "CON-A")
    }

    @Test func aConceptWithNoEvidenceIsUnmeasuredWithTheWidestInterval() {
        let state = AdaptiveMastery.rebuild("NEW", from: [], config: config, now: date(at))
        #expect(state.status == .unmeasured)
        #expect(state.mean == 0.5)
        #expect(state.uncertainty == 0.5)
        #expect(state.lastSeen == nil)
        #expect(state.nextReviewAt == nil)
        #expect(AdaptiveMastery.isUnmeasured(state))
    }

    @Test func rebuildAllCoversEveryConceptWithEvidence() {
        let events = wrongRun("CON-A", 2) + wrongRun("CON-B", 3)
        let states = AdaptiveMastery.rebuildAll(events, config: config, now: date(daysAfter(1)))
        #expect(Set(states.keys) == ["CON-A", "CON-B"])
    }

    /// Attention is a repair target too — a follow-up is exactly what one error
    /// should trigger — but it is not a weakness label.
    @Test func repairTargetsIncludeAttentionButItIsNotWeakness() {
        #expect(ConceptStatus.repair == [.weak, .attention])
        #expect(ConceptStatus.attention.label == "Needs a second look")
        #expect(ConceptStatus.weak.label == "Weak")
    }

    /// The stored spellings, which cross to the website.
    @Test func statusesSpellThemselvesAsTheWebDoes() {
        #expect(ConceptStatus.reviewDue.rawValue == "review-due")
        #expect(Confidence.unstated.rawValue == "unstated")
        #expect(ExposureState.repeatAfterReveal.rawValue == "repeat-after-reveal")
        #expect(ExposureState.first.rawValue == "first")
        #expect(PresentationMode.tutor.rawValue == "tutor")
    }
}
