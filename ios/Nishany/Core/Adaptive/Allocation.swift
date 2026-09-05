import Foundation

/// What a slot in a block is for.
///
/// These are allocation *targets*, not separate pools. A question that repairs
/// a weakness and closes blueprint coverage satisfies both needs and consumes
/// one slot.
enum AllocationNeed: String, CaseIterable, Codable, Sendable {
    case weakness, coverage, review, uncertainty

    var label: String {
        switch self {
        case .weakness: "Confirmed weak concepts"
        case .coverage: "Exam-blueprint coverage and rolling debt"
        case .review: "Spaced review"
        case .uncertainty: "Unmeasured or uncertain concepts"
        }
    }
}

/// Stored as a JSON object keyed by need, matching `Record<AllocationNeed, …>`
/// on the website. Without this a Swift dictionary keyed by the enum encodes as
/// a flat array, and a plan written on the phone would not read back on a
/// laptop.
extension AllocationNeed: CodingKeyRepresentable {}

/// How a block divides, as fractions summing to 1.
struct AllocationShares: Codable, Equatable, Sendable {
    var weakness: Double
    var coverage: Double
    var review: Double
    var uncertainty: Double

    subscript(need: AllocationNeed) -> Double {
        switch need {
        case .weakness: weakness
        case .coverage: coverage
        case .review: review
        case .uncertainty: uncertainty
        }
    }

    /// Rescaled to sum to 1, ignoring anything negative. An administrator who
    /// enters four numbers that do not add up gets the proportions they meant.
    func normalised(fallback: AllocationShares) -> AllocationShares {
        let total = AllocationNeed.allCases.reduce(0.0) { $0 + Swift.max(0, self[$1]) }
        guard total > 0 else { return fallback }
        return AllocationShares(
            weakness: Swift.max(0, weakness) / total,
            coverage: Swift.max(0, coverage) / total,
            review: Swift.max(0, review) / total,
            uncertainty: Swift.max(0, uncertainty) / total
        )
    }
}

/// Slots per need.
struct SlotTargets: Equatable, Sendable {
    private var values: [AllocationNeed: Int] = [:]

    init(_ values: [AllocationNeed: Int] = [:]) { self.values = values }

    subscript(need: AllocationNeed) -> Int {
        get { values[need] ?? 0 }
        set { values[need] = newValue }
    }

    var total: Int { AllocationNeed.allCases.reduce(0) { $0 + self[$1] } }

    static let empty = SlotTargets()
}

struct AllocationPlan: Equatable, Sendable {
    var size: Int
    var shares: AllocationShares
    var targets: SlotTargets
    /// Slots moved into coverage to repay debt from earlier blocks.
    var debtRepaid: Int
    /// Fractional remainders per need, carried so short blocks stay honest.
    var remainders: [AllocationNeed: Double]
}

/// Turning shares into slots.
///
/// A port of `src/data/adaptive/allocation.ts`. 40% of a 22-item block is 8.8
/// items. Rounding each share independently either loses a slot or invents one,
/// and doing that every block is how a stated "35% blueprint coverage" quietly
/// becomes 30% over a term.
enum Allocation {

    /// Largest-remainder apportionment.
    ///
    /// Every need gets its floor, then the slots left over go to whoever was
    /// closest to earning another one. Ties break in a fixed need order rather
    /// than by dictionary iteration, so the same inputs always produce the same
    /// block — which is what makes a stored seed enough to reproduce a session.
    static func apportion(
        size: Int, shares: AllocationShares
    ) -> (targets: SlotTargets, remainders: [AllocationNeed: Double]) {
        var targets = SlotTargets()
        var remainders: [AllocationNeed: Double] = [:]
        var assigned = 0

        for need in AllocationNeed.allCases {
            let exact = Double(size) * shares[need]
            let floor = Int(exact.rounded(.down))
            targets[need] = floor
            remainders[need] = exact - Double(floor)
            assigned += floor
        }

        let spare = size - assigned
        guard spare > 0 else { return (targets, remainders) }

        let ranked = AllocationNeed.allCases.sorted { a, b in
            let ra = remainders[a] ?? 0
            let rb = remainders[b] ?? 0
            if ra != rb { return ra > rb }
            return AllocationNeed.allCases.firstIndex(of: a)! < AllocationNeed.allCases.firstIndex(of: b)!
        }

        for index in 0..<spare {
            let need = ranked[index % ranked.count]
            targets[need] += 1
            // The remainder has been spent — recording that keeps `remainders`
            // a true statement of what is still owed rather than what was owed
            // before.
            remainders[need] = Swift.max(0, (remainders[need] ?? 0) - 1)
        }

        return (targets, remainders)
    }

    /// The slot plan for one block.
    ///
    /// Coverage debt is repaid out of the needs that can most afford it —
    /// weakness first, then uncertainty — and **never** out of spaced review,
    /// because a review that slips is a review that decays.
    static func plan(
        size: Int, shares: AllocationShares, debt: CoverageDebt, config: AdaptiveConfig
    ) -> AllocationPlan {
        var (targets, remainders) = apportion(size: size, shares: shares)

        let owed = min(
            Int(debt.slots.rounded()),
            Coverage.maxDebtRepayment(blockSize: size, config: config)
        )
        var repaid = 0

        // Weakness before uncertainty: a student with a real weakness is better
        // served by one fewer repair item than by one fewer exploratory item,
        // because the exploratory item is the only thing measuring concepts
        // nothing has touched.
        for donor in [AllocationNeed.weakness, .uncertainty] {
            while repaid < owed, targets[donor] > 0 {
                targets[donor] -= 1
                targets[.coverage] += 1
                repaid += 1
            }
        }

        return AllocationPlan(
            size: size, shares: shares, targets: targets,
            debtRepaid: repaid, remainders: remainders
        )
    }

    /// Which needs a question would satisfy.
    ///
    /// One question, several needs, one slot. Crediting every need the chosen
    /// item happens to serve is what stops a block's diagnostics
    /// double-counting it.
    static func credit(_ signals: NeedSignals) -> [AllocationNeed] {
        var needs: [AllocationNeed] = []
        if signals.repairsWeakness { needs.append(.weakness) }
        if signals.closesCoverage { needs.append(.coverage) }
        if signals.isDueReview { needs.append(.review) }
        if signals.reducesUncertainty { needs.append(.uncertainty) }
        return needs
    }

    static func remaining(_ targets: SlotTargets, filled: SlotTargets) -> SlotTargets {
        var out = SlotTargets()
        for need in AllocationNeed.allCases {
            out[need] = Swift.max(0, targets[need] - filled[need])
        }
        return out
    }

    /// The need with the fewest eligible candidates per remaining slot.
    ///
    /// Filling the most constrained quota first is what stops the builder
    /// spending its last slots on a need nothing can satisfy.
    ///
    /// A need with slots but *no* candidates is infinitely scarce, which sorts
    /// it last rather than first — there is nothing to fill it with, so the
    /// builder serves what it can and the gap surfaces as a shortage. Choosing
    /// it would spend the pass achieving nothing.
    static func mostConstrained(
        _ remaining: SlotTargets, candidateCounts: [AllocationNeed: Int]
    ) -> AllocationNeed? {
        let open = AllocationNeed.allCases.filter { remaining[$0] > 0 }
        guard !open.isEmpty else { return nil }

        return open.min { a, b in
            let sa = (candidateCounts[a] ?? 0) == 0
                ? Double.infinity : Double(candidateCounts[a] ?? 0) / Double(remaining[a])
            let sb = (candidateCounts[b] ?? 0) == 0
                ? Double.infinity : Double(candidateCounts[b] ?? 0) / Double(remaining[b])
            if sa != sb { return sa < sb }
            return AllocationNeed.allCases.firstIndex(of: a)! < AllocationNeed.allCases.firstIndex(of: b)!
        }
    }

    /// Clamp a requested block size into the configured range.
    static func clampBlockSize(_ size: Int, config: AdaptiveConfig) -> Int {
        Swift.max(config.constraints.minBlockSize, Swift.min(config.constraints.maxBlockSize, size))
    }
}

extension AdaptiveConfig {

    /// The allocation for a given exam horizon.
    ///
    /// The nearest band that still contains the horizon wins; with no exam
    /// scheduled, the open-ended band applies. Fourteen days out, coverage
    /// matters more than depth — there is no longer time to fix everything, and
    /// breadth is what an exam actually asks for.
    func shares(daysToExam: Int?) -> AllocationShares {
        guard let daysToExam else {
            let open = horizonBands.first { $0.maxDaysToExam == nil }
            return (open?.shares ?? defaultShares).normalised(fallback: defaultShares)
        }
        let bounded = horizonBands
            .filter { $0.maxDaysToExam != nil && daysToExam <= $0.maxDaysToExam! }
            .sorted { $0.maxDaysToExam! < $1.maxDaysToExam! }
        let band = bounded.first ?? horizonBands.first { $0.maxDaysToExam == nil }
        return (band?.shares ?? defaultShares).normalised(fallback: defaultShares)
    }
}
