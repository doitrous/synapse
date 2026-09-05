import Foundation
import Testing
@testable import Nishany

/// Readiness, pinned to `src/data/adaptive/readiness.ts`.
///
/// Readiness is measured on items **held back** from practice. A score computed
/// from the questions the engine chose would be measuring its own choices:
/// adaptive blocks deliberately oversample weak areas, so practice accuracy
/// runs low and means something different.
struct AdaptiveReadinessTests {

    private let config = AdaptiveConfig.default

    private func answer(
        _ group: String, correct: Bool, omitted: Bool = false,
        seconds: Double? = 60, confident: Bool = false
    ) -> ReadinessAnswer {
        ReadinessAnswer(
            questionId: UUID().uuidString, groupId: group, correct: correct,
            omitted: omitted, seconds: seconds, confident: confident
        )
    }

    /// The normal approximation is badly wrong exactly where this product needs
    /// it to be right: small samples and proportions near 0 or 1.
    @Test func theIntervalNeverEscapesTheUnitRange() {
        let strong = Readiness.wilsonInterval(correct: 18, total: 20, confidence: 0.9)
        #expect(abs(strong.lower - 0.738331) < 1e-6)
        #expect(abs(strong.upper - 0.966338) < 1e-6)
        #expect(strong.upper <= 1, "18 of 20 must not imply better than perfect")

        let perfect = Readiness.wilsonInterval(correct: 10, total: 10, confidence: 0.9)
        #expect(abs(perfect.lower - 0.787049) < 1e-6)
        #expect(perfect.upper == 1)

        let none = Readiness.wilsonInterval(correct: 0, total: 10, confidence: 0.9)
        #expect(none.lower == 0)
        #expect(abs(none.upper - 0.212951) < 1e-6)

        // Nothing answered is total ignorance, not zero per cent.
        let empty = Readiness.wilsonInterval(correct: 0, total: 0, confidence: 0.9)
        #expect(empty.lower == 0 && empty.upper == 1)
    }

    /// Omissions are excluded from the denominator but reported. Counting a
    /// blank as wrong would fold a pacing problem into a knowledge estimate;
    /// hiding it would let a student skip everything hard for a flattering
    /// range.
    @Test func anOmissionIsNeitherRightNorWrong() {
        let answers = [
            answer("g1", correct: true), answer("g1", correct: true),
            answer("g1", correct: false), answer("g1", correct: true),
            answer("g2", correct: false), answer("g2", correct: true),
            answer("g3", correct: true, omitted: true, seconds: nil),
        ]
        let result = Readiness.score(
            id: "ra-1", answers: answers,
            groupLabels: ["g1": "G1", "g2": "G2", "g3": "G3"],
            underRepresented: [UnderRepresentedGroup(groupId: "g2", groupLabel: "G2", wanted: 5, got: 2)],
            config: config, blueprintVersion: 7, at: "2026-08-12T10:00:00.000Z"
        )

        #expect(result.answered == 6, "the omission is not in the denominator")
        #expect(result.omitted == 1, "but it is not hidden either")
        #expect(abs(result.lower - 0.347007) < 1e-6)
        #expect(abs(result.upper - 0.882727) < 1e-6)
        #expect(result.medianSeconds == 60)
    }

    /// A range from two answers is a number pretending to be evidence, so a
    /// thin group reports no range at all.
    @Test func aThinGroupReportsNoRange() {
        let answers = [
            answer("g1", correct: true), answer("g1", correct: true),
            answer("g1", correct: false), answer("g1", correct: true),
            answer("g2", correct: false), answer("g2", correct: true),
            answer("g3", correct: true, omitted: true, seconds: nil),
        ]
        let result = Readiness.score(
            id: "ra-1", answers: answers,
            groupLabels: ["g1": "G1", "g2": "G2", "g3": "G3"],
            underRepresented: [UnderRepresentedGroup(groupId: "g2", groupLabel: "G2", wanted: 5, got: 2)],
            config: config, blueprintVersion: 7, at: "2026-08-12T10:00:00.000Z"
        )

        let g1 = result.groups.first { $0.groupId == "g1" }
        #expect(g1?.answered == 4)
        #expect(abs((g1?.lower ?? 0) - 0.356159) < 1e-6)
        #expect(g1?.insufficient == false)

        // Two answers, and flagged as under-represented besides.
        let g2 = result.groups.first { $0.groupId == "g2" }
        #expect(g2?.lower == nil)
        #expect(g2?.insufficient == true)

        // Nothing but an omission: no range, and honest about it.
        let g3 = result.groups.first { $0.groupId == "g3" }
        #expect(g3?.answered == 0)
        #expect(g3?.insufficient == true)
    }

    /// A range, never a single number, and never a promise.
    @Test func theSentenceIsARangeWithItsCaveat() {
        let result = ReadinessResult(
            id: "ra-1", at: "x", lower: 0.347007, upper: 0.882727,
            answered: 6, omitted: 1, medianSeconds: 60, groups: [],
            underRepresented: [UnderRepresentedGroup(groupId: "g2", groupLabel: "G2", wanted: 5, got: 2)],
            configVersion: 1, blueprintVersion: 7
        )
        #expect(Readiness.sentence(result) == "On blueprint-balanced questions held back from your practice, your performance is between 35% and 88%. 1 blueprint area could not be fully represented, so treat this as provisional.")
    }

    /// With nothing sat, the answer is not a zero — it is that practice
    /// accuracy does not answer this question.
    @Test func noAssessmentSaysSoRatherThanScoringZero() {
        let sentence = Readiness.sentence(nil)
        #expect(sentence.contains("No readiness assessment yet"))
        #expect(sentence.contains("oversample your weak areas"))
        #expect(!sentence.contains("0%"))
    }

    /// Knowing *that* you do not know is a separate, teachable skill: a student
    /// who is confidently wrong needs a different intervention from one who is
    /// uncertainly right.
    @Test func calibrationSeparatesConfidentFromCorrect() {
        // Perfectly calibrated: sure when right, unsure when wrong.
        let good = [
            answer("g", correct: true, confident: true),
            answer("g", correct: true, confident: true),
            answer("g", correct: false, confident: false),
            answer("g", correct: false, confident: false),
        ]
        #expect(Readiness.calibrationError(good) == 0)

        // Exactly backwards: sure when wrong, unsure when right.
        let backwards = [
            answer("g", correct: false, confident: true),
            answer("g", correct: false, confident: true),
            answer("g", correct: true, confident: false),
            answer("g", correct: true, confident: false),
        ]
        #expect(Readiness.calibrationError(backwards) == 2)
    }

    /// Nothing to compare is nil, not zero — a student who was sure of
    /// everything has not demonstrated perfect calibration.
    @Test func calibrationNeedsBothKindsOfAnswer() {
        let allSure = [
            answer("g", correct: true, confident: true),
            answer("g", correct: true, confident: true),
        ]
        #expect(Readiness.calibrationError(allSure) == nil)
        #expect(Readiness.calibrationError([]) == nil)

        let allOmitted = [answer("g", correct: true, omitted: true)]
        #expect(Readiness.calibrationError(allOmitted) == nil)
    }
}
