import Foundation

/// One answer in a readiness assessment.
struct ReadinessAnswer: Codable, Equatable, Sendable {
    var questionId: String
    var groupId: String
    var correct: Bool
    var omitted: Bool
    var seconds: Double?
    /// Whether the student said they were sure.
    var confident: Bool = false
}

/// How one blueprint group came out.
struct GroupResult: Codable, Identifiable, Equatable, Sendable {
    var groupId: String
    var groupLabel: String
    var answered: Int
    var correct: Int
    /// Nil when too few items to report a range for this group honestly.
    var lower: Double?
    var upper: Double?
    /// True when the group had too few items, or the assessment could not
    /// represent it properly in the first place.
    var insufficient: Bool

    var id: String { groupId }
}

/// A blueprint area the assessment could not represent — the honest asterisk on
/// the score.
struct UnderRepresentedGroup: Codable, Identifiable, Equatable, Sendable {
    var groupId: String
    var groupLabel: String
    var wanted: Int
    var got: Int

    var id: String { groupId }
}

struct ReadinessResult: Codable, Equatable, Sendable {
    var id: String
    var at: String
    /// Blueprint-balanced score interval, 0–1. Never a single number.
    var lower: Double
    var upper: Double
    var answered: Int
    var omitted: Int
    var medianSeconds: Double?
    var groups: [GroupResult]
    var underRepresented: [UnderRepresentedGroup]
    var configVersion: Int
    var blueprintVersion: Int?

    static let key = "nishany.progress.adaptive.readiness.v1"
}

/// How ready a student is, said as a range.
///
/// A port of the scoring half of `src/data/adaptive/readiness.ts`. Readiness is
/// measured on items **held back** from practice, because a score computed from
/// the questions the engine chose would be measuring its own choices: adaptive
/// blocks deliberately oversample weak areas, so practice accuracy runs low and
/// means something different.
enum Readiness {

    /// A Wilson score interval.
    ///
    /// Chosen over the textbook normal approximation because that one is badly
    /// wrong exactly where this product needs it to be right: small samples and
    /// proportions near 0 or 1. A student who got 18 of 20 correct must not be
    /// shown an upper bound above 1.
    static func wilsonInterval(
        correct: Int, total: Int, confidence: Double
    ) -> (lower: Double, upper: Double) {
        guard total > 0 else { return (0, 1) }
        let z = zFor(confidence)
        let n = Double(total)
        let p = Double(correct) / n
        let denominator = 1 + (z * z) / n
        let centre = p + (z * z) / (2 * n)
        let spread = z * ((p * (1 - p)) / n + (z * z) / (4 * n * n)).squareRoot()
        return (
            lower: max(0, (centre - spread) / denominator),
            upper: min(1, (centre + spread) / denominator)
        )
    }

    /// The handful of confidence levels the console offers, rather than an erf.
    private static func zFor(_ confidence: Double) -> Double {
        let table: [(level: Double, z: Double)] = [
            (0.8, 1.2816), (0.9, 1.6449), (0.95, 1.96), (0.99, 2.5758),
        ]
        return table.reduce(table[1]) { closest, entry in
            abs(entry.level - confidence) < abs(closest.level - confidence) ? entry : closest
        }.z
    }

    /// Score an assessment.
    ///
    /// Omissions are excluded from the accuracy denominator but reported
    /// separately. Counting a blank as wrong would fold a pacing problem into a
    /// knowledge estimate; hiding it entirely would let a student skip
    /// everything they found hard and receive a flattering range.
    static func score(
        id: String, answers: [ReadinessAnswer], groupLabels: [String: String],
        underRepresented: [UnderRepresentedGroup], config: AdaptiveConfig,
        blueprintVersion: Int?, at: String = ISO8601DateFormatter.synapse.string(from: Date())
    ) -> ReadinessResult {
        let marked = answers.filter { !$0.omitted }
        let correct = marked.filter(\.correct).count
        let overall = wilsonInterval(
            correct: correct, total: marked.count,
            confidence: config.readiness.intervalConfidence
        )

        var order: [String] = []
        var byGroup: [String: [ReadinessAnswer]] = [:]
        for answer in answers {
            if byGroup[answer.groupId] == nil { order.append(answer.groupId) }
            byGroup[answer.groupId, default: []].append(answer)
        }

        let under = Set(underRepresented.map(\.groupId))

        let groups: [GroupResult] = order.compactMap { groupId in
            guard let entries = byGroup[groupId] else { return nil }
            let groupMarked = entries.filter { !$0.omitted }
            let groupCorrect = groupMarked.filter(\.correct).count
            let enough = groupMarked.count >= config.readiness.minItemsPerTopicReport
            let interval = enough
                ? wilsonInterval(correct: groupCorrect, total: groupMarked.count,
                                 confidence: config.readiness.intervalConfidence)
                : nil

            return GroupResult(
                groupId: groupId,
                groupLabel: groupLabels[groupId] ?? groupId,
                answered: groupMarked.count,
                correct: groupCorrect,
                lower: interval?.lower,
                upper: interval?.upper,
                insufficient: !enough || under.contains(groupId)
            )
        }.sorted { $0.groupLabel.localizedCompare($1.groupLabel) == .orderedAscending }

        let times = answers.compactMap(\.seconds).sorted()
        let middle = times.count / 2
        let medianSeconds: Double? = times.isEmpty
            ? nil
            : (times.count % 2 == 1 ? times[middle] : (times[middle - 1] + times[middle]) / 2)

        return ReadinessResult(
            id: id, at: at,
            lower: overall.lower, upper: overall.upper,
            answered: marked.count, omitted: answers.count - marked.count,
            medianSeconds: medianSeconds, groups: groups,
            underRepresented: underRepresented,
            configVersion: config.version, blueprintVersion: blueprintVersion
        )
    }

    /// Calibration: did the student's confidence match their accuracy?
    ///
    /// Reported alongside the score because knowing *that* you do not know is a
    /// separate, teachable skill — and a student who is confidently wrong needs
    /// a different intervention from one who is uncertainly right.
    ///
    /// Nil when there is nothing to compare: no marked answers, or every answer
    /// given at the same confidence.
    static func calibrationError(_ answers: [ReadinessAnswer]) -> Double? {
        let marked = answers.filter { !$0.omitted }
        guard !marked.isEmpty else { return nil }

        let confident = marked.filter(\.confident)
        let unconfident = marked.filter { !$0.confident }
        guard !confident.isEmpty, !unconfident.isEmpty else { return nil }

        let confidentAccuracy = Double(confident.filter(\.correct).count) / Double(confident.count)
        let unconfidentAccuracy = Double(unconfident.filter(\.correct).count) / Double(unconfident.count)
        // Perfect calibration would put confident answers far above unconfident
        // ones. The error is how much of that expected separation is missing.
        return max(0, 1 - (confidentAccuracy - unconfidentAccuracy))
    }

    /// A readiness range in words. Never a single number, never a promise.
    static func sentence(_ result: ReadinessResult?) -> String {
        guard let result, result.answered > 0 else {
            return "No readiness assessment yet. Practice accuracy is not a substitute — adaptive blocks deliberately oversample your weak areas."
        }
        let lower = Int((result.lower * 100).rounded())
        let upper = Int((result.upper * 100).rounded())

        var caveat = ""
        if !result.underRepresented.isEmpty {
            let count = result.underRepresented.count
            caveat = " \(count) blueprint area\(count == 1 ? "" : "s") could not be fully represented, so treat this as provisional."
        }
        return "On blueprint-balanced questions held back from your practice, your performance is between \(lower)% and \(upper)%.\(caveat)"
    }
}
