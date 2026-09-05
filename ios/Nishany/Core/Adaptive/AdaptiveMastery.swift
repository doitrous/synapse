import Foundation

/// Where a concept stands.
///
/// `attention` is the important one. A single wrong answer produces attention,
/// not weakness: it schedules a follow-up and lightly marks the concept, and it
/// takes repeated independent evidence — or a high-confidence misconception —
/// to become a label a student sees as "you are weak at this".
enum ConceptStatus: String, Codable, CaseIterable, Sendable {
    case unmeasured
    case attention
    case weak
    case developing
    case secure
    case reviewDue = "review-due"

    /// The words the student reads. "Needs a second look" rather than "weak",
    /// because that is what one error actually means.
    var label: String {
        switch self {
        case .unmeasured: "Unmeasured"
        case .attention: "Needs a second look"
        case .weak: "Weak"
        case .developing: "Developing"
        case .secure: "Secure"
        case .reviewDue: "Review due"
        }
    }

    /// The statuses adaptive practice treats as a repair target.
    ///
    /// `attention` is included because a follow-up is exactly what one error is
    /// supposed to trigger — but it is not a weakness label, and the interface
    /// must not present it as one.
    static let repair: [ConceptStatus] = [.weak, .attention]
}

/// What the model believes about one concept, and how sure it is.
struct ConceptState: Equatable, Sendable {
    let conceptId: String
    /// Beta parameters after decay and all weighted evidence.
    var alpha: Double
    var beta: Double
    /// Posterior mean, 0–1. Never shown without its interval.
    var mean: Double
    /// Credible interval half-width, 0–1. Large means "we do not know yet".
    var uncertainty: Double
    /// Distinct questions that produced evidence — not attempt count.
    var distinctItems: Int
    /// Every marked attempt, including repeats of the same question.
    var attempts: Int
    /// Raw wrong attempts, as the student experienced them.
    var rawWrong: Int
    /// Wrong answers the student had said they were sure about.
    var highConfidenceErrors: Int
    /// Correct answers given at least `spacedSuccessMinHours` after the
    /// previous evidence.
    var spacedSuccesses: Int
    /// Median observed seconds ÷ expected seconds, or nil when nothing was
    /// timed.
    var responseTimeRatio: Double?
    /// ISO timestamp of the most recent evidence of any kind.
    var lastSeen: String?
    /// ISO timestamp this concept becomes worth revisiting.
    var nextReviewAt: String?
    var status: ConceptStatus
    /// The config version this estimate was produced under.
    var modelVersion: Int
}

/// How well a student knows a concept, and how sure we are.
///
/// A port of `src/data/adaptive/masteryModel.ts`. A decayed Beta model over the
/// immutable evidence ledger, and deliberately simple: a complicated model that
/// cannot be explained to the student it judges is a downgrade, not an upgrade.
///
/// **Not to be confused with `Mastery` in `Core/Progress`.** There are two
/// mastery models in this product and they answer different questions. The
/// older one counts marked answers per concept and bands them for the review
/// queue; this one replays an immutable evidence ledger through a decayed Beta
/// posterior and carries an interval. They share a subject and nothing else —
/// different inputs, different storage, different vocabulary. Reading a figure
/// from one against a threshold from the other would be meaningless.
///
/// Two properties matter more than the arithmetic:
///
/// - **Replayable.** `rebuild` takes evidence and config and returns the state.
///   Nothing accumulates in place, so changing the model recomputes history
///   rather than silently rewriting it under a new name.
/// - **Honest about ignorance.** Every estimate carries an interval. One right
///   answer is not mastery, and the interval is what stops the interface
///   claiming it is.
enum AdaptiveMastery {

    private static let hour: Double = 3_600_000
    private static let day: Double = 86_400_000

    /// A concept with no evidence at all.
    static func blank(_ conceptId: String, config: AdaptiveConfig) -> ConceptState {
        let alpha = config.mastery.priorAlpha
        let beta = config.mastery.priorBeta
        return ConceptState(
            conceptId: conceptId,
            alpha: alpha,
            beta: beta,
            mean: alpha / (alpha + beta),
            uncertainty: betaHalfWidth(alpha, beta),
            distinctItems: 0,
            attempts: 0,
            rawWrong: 0,
            highConfidenceErrors: 0,
            spacedSuccesses: 0,
            responseTimeRatio: nil,
            lastSeen: nil,
            nextReviewAt: nil,
            status: .unmeasured,
            modelVersion: config.version
        )
    }

    /// A normal-approximation half-width for the Beta posterior.
    ///
    /// Two standard deviations, clamped to the unit interval. Exact quantiles
    /// would need an incomplete beta function for a figure that is only ever
    /// rendered as a band a few pixels wide; the approximation is honest at the
    /// scale it is shown, and it is monotone in evidence, which is the property
    /// the interface relies on.
    static func betaHalfWidth(_ alpha: Double, _ beta: Double) -> Double {
        let n = alpha + beta
        guard n > 0 else { return 0.5 }
        let variance = (alpha * beta) / (n * n * (n + 1))
        return min(0.5, 2 * (max(0, variance)).squareRoot())
    }

    /// Difficulty credit, clamped.
    ///
    /// Getting a Challenging item right says more than getting an Easy one
    /// right, but only a little more — the clamp is what stops one hard
    /// question from outweighing a week of consistent work. Unrecognised bands
    /// sit at neutral rather than guessing.
    static func difficultyCredit(_ difficulty: String, config: AdaptiveConfig) -> Double {
        let low = config.mastery.minDifficultyCredit
        let high = config.mastery.maxDifficultyCredit
        let position: [String: Double] = [
            "Easy": 0, "Moderate": 1.0 / 3.0, "Hard": 2.0 / 3.0, "Challenging": 1,
        ]
        guard let at = position[difficulty] else { return (low + high) / 2 }
        return low + (high - low) * at
    }

    /// How much a concept role says this item measured this concept.
    static func roleRelevance(_ role: ConceptRole, config: AdaptiveConfig) -> Double {
        role == .main ? config.mastery.mainConceptRelevance : config.mastery.secondaryConceptRelevance
    }

    /// Whether the answer arrived too fast to have been reasoned.
    ///
    /// Response time alone never proves or disproves knowledge — it only ever
    /// reduces how much an attempt is allowed to move an estimate. The raw
    /// record is untouched either way.
    static func isAbnormallyFast(_ event: AdaptiveEvidenceEvent, config: AdaptiveConfig) -> Bool {
        guard let seconds = event.seconds else { return false }
        let expected = event.expectedSeconds ?? config.validity.defaultExpectedSeconds
        guard expected > 0 else { return false }
        return seconds < expected * config.validity.fastResponseRatio
    }

    /// How much this one event is allowed to move the estimate.
    ///
    /// relevance × item validity × difficulty credit, with exposure and speed
    /// applied as reductions. Every factor is a reduction from a full-weight
    /// ordinary answer; nothing here can amplify an attempt beyond its
    /// difficulty credit — except the one case below, which is the point.
    static func evidenceWeight(_ event: AdaptiveEvidenceEvent, config: AdaptiveConfig) -> Double {
        var weight = roleRelevance(event.role, config: config)
            * difficultyCredit(event.difficulty, config: config)

        if event.outcome != .answered { weight *= config.validity.blankWeight }
        if event.exposure == .repeatAfterReveal { weight *= config.validity.exposedRepeatWeight }
        if isAbnormallyFast(event, config: config) {
            weight *= event.correct == true
                ? config.validity.fastCorrectWeight
                : config.validity.fastWrongWeight
        }
        // A wrong answer the student was sure of is the strongest misconception
        // evidence there is, so it is the one case that carries extra weight.
        if event.correct == false, event.confidence == .sure {
            weight *= config.mastery.highConfidenceErrorWeight
        }
        return weight
    }

    /// Fold one event into a running Beta state.
    ///
    /// The decay pulls accumulated evidence back toward the prior in proportion
    /// to elapsed time, so a concept last practised months ago is treated as
    /// genuinely less certain rather than permanently proven.
    static func apply(
        alpha: Double, beta: Double, at: String?,
        event: AdaptiveEvidenceEvent, config: AdaptiveConfig
    ) -> (alpha: Double, beta: Double) {
        let priorAlpha = config.mastery.priorAlpha
        let priorBeta = config.mastery.priorBeta
        let halfLife = config.mastery.decayHalfLifeDays

        let elapsedDays: Double
        if let at, let from = date(at), let to = date(event.at) {
            elapsedDays = max(0, (to.timeIntervalSince1970 - from.timeIntervalSince1970) * 1000 / day)
        } else {
            elapsedDays = 0
        }
        let decay = halfLife > 0 ? pow(0.5, elapsedDays / halfLife) : 1

        let weight = evidenceWeight(event, config: config)
        // A blank contributes uncertainty, not a verdict: it decays what came
        // before and adds a small amount of negative evidence, never a full
        // wrong answer.
        let correctness: Double = event.correct == true ? 1 : 0

        return (
            alpha: priorAlpha + decay * (alpha - priorAlpha) + weight * correctness,
            beta: priorBeta + decay * (beta - priorBeta) + weight * (1 - correctness)
        )
    }

    /// Which band a state falls into.
    ///
    /// Read the order carefully — it encodes the product's safety rules:
    ///
    /// - Not enough distinct questions means `unmeasured`, whatever the
    ///   accuracy. One lucky answer must never read as knowledge.
    /// - `weak` needs repeated independent evidence, or two high-confidence
    ///   misconceptions. A single ordinary error can only reach `attention`.
    /// - `secure` needs the threshold, enough distinct questions, **and** a
    ///   successful review at least 48 hours later. Answering four questions in
    ///   one sitting is not retention.
    static func status(
        _ state: ConceptState, config: AdaptiveConfig, now: Date = Date()
    ) -> ConceptStatus {
        let t = config.statuses

        if state.distinctItems < t.measuredDistinctItems {
            // Even unmeasured, one recent error is worth surfacing as something
            // to look at again — that is the whole point of the attention band.
            return state.rawWrong > 0 || state.highConfidenceErrors > 0 ? .attention : .unmeasured
        }

        let secure = state.mean >= t.secureAtOrAbove
            && state.distinctItems >= t.secureDistinctItems
            && state.spacedSuccesses >= 1

        if secure {
            let due = state.nextReviewAt.flatMap(date).map { $0 <= now } ?? false
            return due ? .reviewDue : .secure
        }

        let weak = (state.mean < t.weakBelow && state.distinctItems >= t.weakDistinctItems)
            || state.highConfidenceErrors >= t.weakHighConfidenceErrors

        if weak { return .weak }
        if state.rawWrong > 0, state.distinctItems < t.secureDistinctItems { return .attention }
        return .developing
    }

    /// Which review interval a status waits out. `unmeasured` has nothing to
    /// review.
    static func reviewIntervalDays(_ status: ConceptStatus, config: AdaptiveConfig) -> Double? {
        switch status {
        case .weak: config.reviewIntervalDays.weak
        case .attention: config.reviewIntervalDays.attention
        case .developing: config.reviewIntervalDays.developing
        case .secure, .reviewDue: config.reviewIntervalDays.secure
        case .unmeasured: nil
        }
    }

    /// Rebuild one concept's state from its evidence.
    ///
    /// Pure, and the only way a `ConceptState` is ever produced. Events may be
    /// passed in any order — they are sorted here, so a caller cannot corrupt
    /// the decay by handing over an unsorted array.
    static func rebuild(
        _ conceptId: String, from events: [AdaptiveEvidenceEvent],
        config: AdaptiveConfig, now: Date = Date()
    ) -> ConceptState {
        let ordered = events
            .filter { $0.conceptId == conceptId }
            .sorted { $0.at < $1.at }

        guard !ordered.isEmpty else { return blank(conceptId, config: config) }

        var alpha = config.mastery.priorAlpha
        var beta = config.mastery.priorBeta
        var at: String?
        var spacedSuccesses = 0
        var highConfidenceErrors = 0
        var attempts = 0
        var ratios: [Double] = []

        for event in ordered {
            let spacedFromPrevious: Bool = {
                guard let at, let from = date(at), let to = date(event.at) else { return false }
                let millis = (to.timeIntervalSince1970 - from.timeIntervalSince1970) * 1000
                return millis >= config.statuses.spacedSuccessMinHours * hour
            }()

            let next = apply(alpha: alpha, beta: beta, at: at, event: event, config: config)
            alpha = next.alpha
            beta = next.beta
            at = event.at

            if event.correct != nil { attempts += 1 }
            if event.correct == true, spacedFromPrevious { spacedSuccesses += 1 }
            if event.correct == false, event.confidence == .sure { highConfidenceErrors += 1 }
            if let seconds = event.seconds {
                let expected = event.expectedSeconds ?? config.validity.defaultExpectedSeconds
                if expected > 0 { ratios.append(seconds / expected) }
            }
        }

        var state = ConceptState(
            conceptId: conceptId,
            alpha: alpha,
            beta: beta,
            mean: alpha / (alpha + beta),
            uncertainty: betaHalfWidth(alpha, beta),
            distinctItems: ordered.distinctQuestions,
            attempts: attempts,
            rawWrong: ordered.rawWrongAttempts,
            highConfidenceErrors: highConfidenceErrors,
            spacedSuccesses: spacedSuccesses,
            responseTimeRatio: median(ratios),
            lastSeen: at,
            nextReviewAt: nil,
            status: .unmeasured,
            modelVersion: config.version
        )

        // Status and review date are mutually dependent — `review-due` is
        // "secure and past its date" — so the date is computed from the status
        // the state would have without it, then the status is finalised against
        // that date.
        let provisional = status(state, config: config, now: now)
        if let interval = reviewIntervalDays(provisional, config: config),
           let last = at, let from = date(last) {
            state.nextReviewAt = iso(from.addingTimeInterval(interval * 86_400))
        }
        state.status = status(state, config: config, now: now)
        return state
    }

    /// Rebuild every concept that has evidence.
    static func rebuildAll(
        _ events: [AdaptiveEvidenceEvent], config: AdaptiveConfig, now: Date = Date()
    ) -> [String: ConceptState] {
        var states: [String: ConceptState] = [:]
        for conceptId in Set(events.map(\.conceptId)) {
            states[conceptId] = rebuild(conceptId, from: events, config: config, now: now)
        }
        return states
    }

    /// How overdue a review is, in days. Positive means overdue; nil means not
    /// scheduled.
    static func reviewUrgencyDays(_ state: ConceptState, now: Date = Date()) -> Double? {
        guard let next = state.nextReviewAt, let due = date(next) else { return nil }
        return now.timeIntervalSince(due) / 86_400
    }

    /// Concepts with too little evidence to say anything about.
    static func isUnmeasured(_ state: ConceptState?) -> Bool {
        state == nil || state?.status == .unmeasured
    }

    // MARK: - Time

    /// Both timestamp forms, for the reason the review queue already learnt: a
    /// timestamp that cannot be read is not a visible failure, it is evidence
    /// that quietly stops counting.
    private static func date(_ text: String) -> Date? {
        ISO8601DateFormatter.read(text)
    }

    private static func iso(_ date: Date) -> String {
        ISO8601DateFormatter.synapse.string(from: date)
    }

    private static func median(_ values: [Double]) -> Double? {
        guard !values.isEmpty else { return nil }
        let sorted = values.sorted()
        let middle = sorted.count / 2
        return sorted.count % 2 == 1 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
    }
}
