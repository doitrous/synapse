import Foundation
import Testing
@testable import Nishany

/// Turning shares into slots, pinned to `src/data/adaptive/allocation.ts`.
struct AdaptiveAllocationTests {

    private let config = AdaptiveConfig.default

    private func slots(_ t: SlotTargets) -> [Int] {
        AllocationNeed.allCases.map { t[$0] }
    }

    /// 40% of a 22-item block is 8.8 items. Rounding each share on its own
    /// either loses a slot or invents one, and doing that every block is how a
    /// stated "35% coverage" quietly becomes 30% over a term.
    @Test func everySlotIsAccountedFor() {
        let (targets, remainders) = Allocation.apportion(size: 22, shares: config.defaultShares)

        #expect(slots(targets) == [9, 8, 3, 2])
        #expect(targets.total == 22, "the block is exactly the size asked for")
        #expect(abs((remainders[.review] ?? 0) - 0.3) < 1e-6)
        #expect(abs((remainders[.uncertainty] ?? 0) - 0.2) < 1e-6)

        // A size the shares divide exactly leaves nothing owed.
        let (exact, none) = Allocation.apportion(size: 20, shares: config.defaultShares)
        #expect(slots(exact) == [8, 7, 3, 2])
        #expect(AllocationNeed.allCases.allSatisfy { (none[$0] ?? 0) == 0 })
    }

    /// Debt is repaid out of weakness first, then uncertainty, and never out of
    /// review — a review that slips is a review that decays.
    @Test func debtIsRepaidButNeverOutOfReview() {
        let plan = Allocation.plan(
            size: 20, shares: config.defaultShares,
            debt: CoverageDebt(slots: 3, blocks: 2, updatedAt: nil), config: config
        )
        #expect(slots(plan.targets) == [5, 10, 3, 2])
        #expect(plan.debtRepaid == 3)
        #expect(plan.targets[.review] == 3, "review is untouched")
        #expect(plan.targets.total == 20)
    }

    /// A long absence must not produce a block that is nothing but coverage.
    @Test func oneBlockNeverBecomesAllCoverage() {
        let plan = Allocation.plan(
            size: 20, shares: config.defaultShares,
            debt: CoverageDebt(slots: 99, blocks: 4, updatedAt: nil), config: config
        )
        #expect(plan.debtRepaid == 5, "capped at the rolling-window share")
        #expect(slots(plan.targets) == [3, 12, 3, 2])
        #expect(plan.targets[.weakness] > 0, "a student with weaknesses still gets repair work")
    }

    @Test func noDebtChangesNothing() {
        let plan = Allocation.plan(
            size: 20, shares: config.defaultShares, debt: .empty, config: config
        )
        #expect(slots(plan.targets) == [8, 7, 3, 2])
        #expect(plan.debtRepaid == 0)
    }

    /// Fourteen days out, coverage overtakes depth: there is no longer time to
    /// fix everything, and breadth is what an exam actually asks for.
    @Test func theAllocationChangesAsAnExamApproaches() {
        let imminent = config.shares(daysToExam: 7)
        #expect(abs(imminent.coverage - 0.50) < 1e-9)
        #expect(abs(imminent.weakness - 0.25) < 1e-9)

        // The boundary belongs to the tighter band.
        #expect(abs(config.shares(daysToExam: 14).coverage - 0.50) < 1e-9)
        #expect(abs(config.shares(daysToExam: 30).coverage - 0.35) < 1e-9)
        #expect(abs(config.shares(daysToExam: 60).coverage - 0.35) < 1e-9)
        #expect(abs(config.shares(daysToExam: 90).coverage - 0.25) < 1e-9)

        // No exam scheduled falls to the open-ended band, where depth wins.
        let open = config.shares(daysToExam: nil)
        #expect(abs(open.weakness - 0.45) < 1e-9)
        #expect(abs(open.review - 0.20) < 1e-9)
    }

    /// Shares that do not add up are read as the proportions they meant, so an
    /// administrator entering four numbers cannot silently unbalance a block.
    @Test func sharesAreNormalised() {
        let lopsided = AllocationShares(weakness: 2, coverage: 2, review: 0, uncertainty: 0)
        let fixed = lopsided.normalised(fallback: config.defaultShares)
        #expect(abs(fixed.weakness - 0.5) < 1e-9)
        #expect(abs(fixed.coverage - 0.5) < 1e-9)

        // All zeroes cannot be normalised, so the default stands.
        let empty = AllocationShares(weakness: 0, coverage: 0, review: 0, uncertainty: 0)
        #expect(empty.normalised(fallback: config.defaultShares) == config.defaultShares)
    }

    @Test func blockSizeIsClampedToTheConfiguredRange() {
        #expect(Allocation.clampBlockSize(3, config: config) == 20)
        #expect(Allocation.clampBlockSize(25, config: config) == 25)
        #expect(Allocation.clampBlockSize(999, config: config) == 40)
    }

    /// The most constrained quota is filled first, so the builder does not
    /// spend its last slots on a need nothing can satisfy.
    @Test func theScarcestNeedIsServedFirst() {
        var remaining = SlotTargets()
        remaining[.coverage] = 5
        remaining[.review] = 2

        #expect(Allocation.mostConstrained(
            remaining, candidateCounts: [.coverage: 50, .review: 2]
        ) == .review)

        // A need with slots and *no* candidates is infinitely scarce, which
        // sorts it last rather than first: there is nothing to fill it with, so
        // the builder serves what it can and the gap is reported as a shortage.
        // Choosing it here would spend the pass achieving nothing.
        #expect(Allocation.mostConstrained(
            remaining, candidateCounts: [.coverage: 0, .review: 99]
        ) == .review)

        // Nothing open is nothing to choose.
        #expect(Allocation.mostConstrained(
            .empty, candidateCounts: [.weakness: 9]
        ) == nil)
    }

    @Test func remainingSubtractsWhatIsAlreadyFilled() {
        var targets = SlotTargets()
        targets[.weakness] = 8; targets[.coverage] = 7
        targets[.review] = 3; targets[.uncertainty] = 2

        var filled = SlotTargets()
        filled[.weakness] = 8; filled[.coverage] = 2

        #expect(slots(Allocation.remaining(targets, filled: filled)) == [0, 5, 3, 2])
    }

    /// One question, several needs, one slot — so the diagnostics report what a
    /// block delivered rather than what its slots were nominally labelled.
    @Test func oneQuestionCanCreditSeveralNeeds() {
        let credited = Allocation.credit(NeedSignals(
            repairsWeakness: true, isDueReview: false,
            reducesUncertainty: true, closesCoverage: true
        ))
        #expect(credited == [.weakness, .coverage, .uncertainty])
    }
}
