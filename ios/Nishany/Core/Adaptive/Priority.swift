import Foundation

/// Everything the scorer reads. Assembled once per block, not per item.
struct ScoringContext {
    var config: AdaptiveConfig
    var states: [String: ConceptState]
    var coverage: CoverageState
    var nodeByConcept: [String: BlueprintNode]
    var blueprintWeights: [String: Double]
    var distinctItemsByConcept: [String: Int]
    var boosts: [String: ConceptBoost]
    var exposureByQuestion: [String: Int]
    /// Concepts and topics the student has just been asked about.
    var recentConceptIds: Set<String>
    var recentTopics: Set<String>
    /// 0–1. How far into a sitting the student is.
    var fatigue: Double
    var now: Date = Date()
}

/// The ten terms, each 0–1 before weighting.
struct PriorityTerms: Equatable, Sendable {
    var conceptWeakness = 0.0
    var topicOrSubtopicGap = 0.0
    var examBlueprintDeficit = 0.0
    var spacedReviewUrgency = 0.0
    var informationGain = 0.0
    var recentErrorBoost = 0.0
    var novelty = 0.0
    var repetitionPenalty = 0.0
    var exposurePenalty = 0.0
    var fatiguePenalty = 0.0
}

struct PriorityScore: Equatable, Sendable {
    var total: Double
    /// Each term before weighting, so a block can explain itself.
    var terms: PriorityTerms
    /// Each term after weighting and sign — penalties are negative here.
    var contributions: PriorityTerms
    var boostMultiplier: Double
}

/// Which need an item's signals would satisfy.
struct NeedSignals: Equatable, Sendable {
    var repairsWeakness = false
    var isDueReview = false
    var reducesUncertainty = false
    var closesCoverage = false
}

/// What to ask next, and why.
///
/// A port of `src/data/adaptive/priority.ts`. Ten terms, six of them reasons to
/// ask and four of them reasons not to. Every one is bounded 0–1 before it is
/// weighted, so no single signal can run away with a block.
enum Priority {

    /// How weak this item's concepts are, 0–1.
    ///
    /// A concept whose weakness is asserted on thin evidence is discounted, so
    /// a single bad answer cannot dominate a block before it has been
    /// confirmed.
    static func conceptWeakness(_ item: AdaptiveItem, _ context: ScoringContext) -> Double {
        let weakBelow = context.config.statuses.weakBelow
        var worst = 0.0
        for conceptId in item.conceptIds {
            guard let state = context.states[conceptId], state.status != .unmeasured else { continue }
            guard state.mean < weakBelow else { continue }
            let severity = weakBelow > 0 ? (weakBelow - state.mean) / weakBelow : 0
            let confidence = state.status == .weak ? 1.0 : 0.5
            worst = max(worst, severity * confidence)
        }
        return min(1, worst)
    }

    /// Breadth around the concept, 0–1.
    ///
    /// Delegated to `groupGap`, which subtracts the concept's own weight from
    /// both sides. This is what keeps parent-level breadth in the score without
    /// charging a concept twice for being weak.
    static func topicOrSubtopicGap(_ item: AdaptiveItem, _ context: ScoringContext) -> Double {
        Coverage.groupGap(
            conceptIds: item.conceptIds,
            nodeByConcept: context.nodeByConcept,
            coverage: context.coverage
        )
    }

    /// Blueprint weight this item would newly cover, 0–1.
    static func examBlueprintDeficit(_ item: AdaptiveItem, _ context: ScoringContext) -> Double {
        Coverage.blueprintDeficit(
            conceptIds: item.conceptIds,
            weights: context.blueprintWeights,
            distinctItemsByConcept: context.distinctItemsByConcept
        )
    }

    /// How overdue this item's concepts are, 0–1.
    ///
    /// Saturating rather than linear: a review seven days late and one thirty
    /// days late are both simply late, and a linear ramp would let one ancient
    /// concept outscore every genuinely urgent one for weeks.
    static func spacedReviewUrgency(_ item: AdaptiveItem, _ context: ScoringContext) -> Double {
        var best = 0.0
        for conceptId in item.conceptIds {
            guard let state = context.states[conceptId],
                  let overdue = AdaptiveMastery.reviewUrgencyDays(state, now: context.now),
                  overdue >= 0
            else { continue }
            best = max(best, overdue / (overdue + 3))
        }
        return min(1, best)
    }

    /// How much asking this would teach us about the student, 0–1.
    ///
    /// Highest where the estimate is least certain. This funds the "unmeasured
    /// or uncertain" allocation, and is why a student who only ever practises
    /// their weaknesses still ends up measured across the blueprint.
    static func informationGain(_ item: AdaptiveItem, _ context: ScoringContext) -> Double {
        var best = 0.0
        for conceptId in item.conceptIds {
            // No state at all is maximum ignorance, and therefore maximum
            // information.
            guard let state = context.states[conceptId] else { return 1 }
            // Scaled against the half-width of a flat prior, the most uncertain
            // a Beta estimate can be.
            best = max(best, min(1, state.uncertainty / 0.5))
        }
        return best
    }

    /// The bounded contribution of recent errors, 0–1.
    ///
    /// This is where error *burden* enters — three wrong answers on one concept
    /// make its repair more urgent — while `conceptWeakness` keeps counting
    /// distinct weak concepts. Bounded, so burden intensifies a concept's
    /// priority without ever manufacturing extra weak concepts.
    static func recentErrorBoost(_ item: AdaptiveItem, _ context: ScoringContext) -> Double {
        var best = 0.0
        for conceptId in item.conceptIds {
            guard let state = context.states[conceptId] else { continue }
            let burden = Double(state.rawWrong + state.highConfidenceErrors)
            guard burden > 0 else { continue }
            // Saturating: the fourth error on a concept adds far less than the
            // second, because by then the message has been received.
            best = max(best, burden / (burden + 2))
        }
        return best
    }

    /// Never seen is 1, seen is 0. Deliberately binary — "how new" is not a
    /// spectrum.
    static func novelty(_ item: AdaptiveItem, _ context: ScoringContext) -> Double {
        (context.exposureByQuestion[item.id] ?? 0) == 0 ? 1 : 0
    }

    /// How much of this item the student has just been asked about, 0–1.
    static func repetitionPenalty(_ item: AdaptiveItem, _ context: ScoringContext) -> Double {
        guard !item.conceptIds.isEmpty else {
            return context.recentTopics.contains(item.topic) ? 0.5 : 0
        }
        let repeated = item.conceptIds.filter(context.recentConceptIds.contains).count
        let conceptShare = Double(repeated) / Double(item.conceptIds.count)
        let topicShare = context.recentTopics.contains(item.topic) ? 0.5 : 0.0
        return min(1, max(conceptShare, topicShare))
    }

    /// How worn out this item is for this student, 0–1.
    ///
    /// Reaches 1 at the configured cap, so an item at its limit is heavily
    /// penalised but still scoreable — the cap itself is a hard constraint
    /// applied by the builder, and duplicating it as an infinite penalty here
    /// would hide a real shortage behind a score of negative infinity.
    static func exposurePenalty(_ item: AdaptiveItem, _ context: ScoringContext) -> Double {
        let seen = context.exposureByQuestion[item.id] ?? 0
        guard seen > 0 else { return 0 }
        return min(1, Double(seen) / Double(max(1, context.config.constraints.maxExposuresPerItem)))
    }

    /// The cost of asking something demanding of a tired student, 0–1.
    ///
    /// Only demanding items are penalised, and only in proportion to both the
    /// fatigue and the item's load. A tired student can still answer a
    /// straightforward recall question; what they cannot do well is a four-step
    /// reasoning item, and scoring both the same is how a block's last third
    /// becomes noise rather than evidence.
    static func fatiguePenalty(_ item: AdaptiveItem, _ context: ScoringContext) -> Double {
        guard context.fatigue > 0 else { return 0 }
        let load = item.demanding
            ? max(0.5, item.cognitiveEffort)
            : item.cognitiveEffort * 0.5
        return min(1, context.fatigue * load)
    }

    /// The whole score.
    ///
    /// The boost multiplier is applied to the total rather than to a single
    /// term, because a boost is a statement about the concept's importance
    /// overall, not about one reason for asking it.
    static func score(_ item: AdaptiveItem, _ context: ScoringContext) -> PriorityScore {
        let w = context.config.priority

        let terms = PriorityTerms(
            conceptWeakness: conceptWeakness(item, context),
            topicOrSubtopicGap: topicOrSubtopicGap(item, context),
            examBlueprintDeficit: examBlueprintDeficit(item, context),
            spacedReviewUrgency: spacedReviewUrgency(item, context),
            informationGain: informationGain(item, context),
            recentErrorBoost: recentErrorBoost(item, context),
            novelty: novelty(item, context),
            repetitionPenalty: repetitionPenalty(item, context),
            exposurePenalty: exposurePenalty(item, context),
            fatiguePenalty: fatiguePenalty(item, context)
        )

        let contributions = PriorityTerms(
            conceptWeakness: terms.conceptWeakness * w.conceptWeakness,
            topicOrSubtopicGap: terms.topicOrSubtopicGap * w.topicOrSubtopicGap,
            examBlueprintDeficit: terms.examBlueprintDeficit * w.examBlueprintDeficit,
            spacedReviewUrgency: terms.spacedReviewUrgency * w.spacedReviewUrgency,
            informationGain: terms.informationGain * w.informationGain,
            recentErrorBoost: terms.recentErrorBoost * w.recentErrorBoost,
            novelty: terms.novelty * w.novelty,
            repetitionPenalty: -terms.repetitionPenalty * w.repetitionPenalty,
            exposurePenalty: -terms.exposurePenalty * w.exposurePenalty,
            fatiguePenalty: -terms.fatiguePenalty * w.fatiguePenalty
        )

        let base = contributions.conceptWeakness + contributions.topicOrSubtopicGap
            + contributions.examBlueprintDeficit + contributions.spacedReviewUrgency
            + contributions.informationGain + contributions.recentErrorBoost
            + contributions.novelty + contributions.repetitionPenalty
            + contributions.exposurePenalty + contributions.fatiguePenalty

        let boostMultiplier = context.boosts.multiplier(for: item.conceptIds, now: context.now)

        return PriorityScore(
            // Multiplying a negative total by a boost would make a poor item
            // *worse* the more its concept needs work. Boost only what is
            // already worth asking.
            total: base > 0 ? base * boostMultiplier : base,
            terms: terms,
            contributions: contributions,
            boostMultiplier: boostMultiplier
        )
    }

    /// Which need each of an item's signals would satisfy.
    ///
    /// Read from the same state the score is read from, so a block's
    /// diagnostics cannot claim it served a need the score never saw.
    static func needs(_ item: AdaptiveItem, _ context: ScoringContext) -> NeedSignals {
        var signals = NeedSignals()

        for conceptId in item.conceptIds {
            guard let state = context.states[conceptId] else {
                // Never measured, and on the blueprint: this is exactly what
                // the uncertainty allocation exists to buy.
                if context.blueprintWeights[conceptId] != nil { signals.reducesUncertainty = true }
                if (context.distinctItemsByConcept[conceptId] ?? 0) == 0,
                   context.blueprintWeights[conceptId] != nil {
                    signals.closesCoverage = true
                }
                continue
            }
            if ConceptStatus.repair.contains(state.status) { signals.repairsWeakness = true }
            if state.status == .reviewDue { signals.isDueReview = true }
            if state.status == .unmeasured { signals.reducesUncertainty = true }
            if (context.distinctItemsByConcept[conceptId] ?? 0) == 0,
               context.blueprintWeights[conceptId] != nil {
                signals.closesCoverage = true
            }
        }
        return signals
    }
}
