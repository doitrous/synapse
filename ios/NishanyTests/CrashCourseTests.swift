import Testing
import Foundation
@testable import Nishany

/// Compressed programmes.
///
/// Mirrors the crash-course half of `src/data/adaptive/planning.test.ts`. The
/// promises are about honesty rather than arithmetic: compression changes the
/// emphasis, never the syllabus, and what the question bank cannot reach is
/// named in figures instead of quietly dropped.
@Suite struct CrashCourseTests {

    let config = AdaptiveConfig.default

    var nodes: [BlueprintNode] {
        (0..<40).map { index in
            BlueprintNode(
                conceptId: "CON-\(index)",
                label: "Concept \(index)",
                groupId: "GRP-\(index % 5)",
                groupLabel: "Group \(index % 5)",
                weight: 1.0 / 40,
                overridden: false
            )
        }
    }

    func input(
        daysToExam: Int = 30,
        poolByConcept: [String: Int]? = nil,
        prerequisites: [String: [String]] = [:]
    ) -> BuildCrashInput {
        let nodes = self.nodes
        return BuildCrashInput(
            daysToExam: daysToExam,
            startDate: "2026-08-17",
            nodes: nodes,
            coverage: Coverage.state(nodes, distinctItemsByConcept: [:]),
            states: [:],
            poolByConcept: poolByConcept ?? Dictionary(uniqueKeysWithValues: nodes.map { ($0.conceptId, 5) }),
            prerequisites: prerequisites,
            config: config,
            generatedAt: "2026-08-17T09:00:00.000Z"
        )
    }

    // MARK: - Horizons

    @Test func theCrashHorizonsMatchThePublishedTable() {
        #expect(config.crashHorizon(daysToExam: 10)?.days == 14)
        #expect(config.crashHorizon(daysToExam: 30)?.days == 30)
        #expect(config.crashHorizon(daysToExam: 45)?.days == 60)
        #expect(config.crashHorizon(daysToExam: 70)?.days == 75)
        // A distant exam needs a normal plan, not a crash course.
        #expect(config.crashHorizon(daysToExam: 200) == nil)
        #expect(config.crashHorizon(daysToExam: nil) == nil)
    }

    @Test func aFourteenDayProgrammeEmphasisesCoverageAndASeventyFiveDayOneRepair() throws {
        let imminent = try #require(CrashCourse.build(input(daysToExam: 14))).shares
        let distant = try #require(CrashCourse.build(input(daysToExam: 70))).shares
        #expect(imminent.coverage > imminent.weakness)
        #expect(distant.weakness > distant.coverage)
    }

    // MARK: - Shape of the programme

    @Test func aProgrammeReservesMocksReviewAndCatchUpDays() throws {
        let programme = try #require(CrashCourse.build(input()))
        let kinds = Set(programme.days.map(\.kind))
        #expect(kinds.contains(.mock))
        #expect(kinds.contains(.review))
        // Something will slip; a programme with no slack breaks when it does.
        #expect(kinds.contains(.catchUp))
    }

    @Test func aProgrammeNeverRunsPastTheExam() throws {
        let programme = try #require(CrashCourse.build(input(daysToExam: 10)))
        #expect(programme.days.count <= 10)
        #expect(programme.days.first?.dayNumber == 1)
    }

    @Test func aCompressedHorizonStillCoversTheBlueprintNotJustHighYield() throws {
        let short = try #require(CrashCourse.build(input(daysToExam: 14)))
        let scheduled = Set(short.days.flatMap(\.conceptIds))
        // Compression changes emphasis, not the syllabus.
        #expect(scheduled.count == nodes.count)
    }

    // MARK: - Prerequisites

    @Test func prerequisitesAreScheduledBeforeTheConceptsThatDependOnThem() {
        let ordered = CrashCourse.orderByPrerequisite(
            ["CON-5", "CON-1", "CON-0"],
            prerequisites: ["CON-5": ["CON-1"], "CON-1": ["CON-0"]]
        )
        #expect(ordered.firstIndex(of: "CON-0")! < ordered.firstIndex(of: "CON-1")!)
        #expect(ordered.firstIndex(of: "CON-1")! < ordered.firstIndex(of: "CON-5")!)
    }

    @Test func aCycleInThePrerequisiteGraphDoesNotHangTheGenerator() {
        let ordered = CrashCourse.orderByPrerequisite(
            ["CON-0", "CON-1"],
            prerequisites: ["CON-0": ["CON-1"], "CON-1": ["CON-0"]]
        )
        // A content error must not cost the student their programme.
        #expect(ordered.count == 2)
    }

    @Test func aPrerequisiteOutsideTheSelectedSetIsSkippedNotInvented() {
        let ordered = CrashCourse.orderByPrerequisite(["CON-5"], prerequisites: ["CON-5": ["CON-999"]])
        #expect(ordered == ["CON-5"])
    }

    // MARK: - What the bank cannot reach

    @Test func aConceptWithNoApprovedQuestionsIsReportedNeverSilentlyDropped() throws {
        let pool = Dictionary(uniqueKeysWithValues: nodes.enumerated().map { ($1.conceptId, $0 < 30 ? 5 : 0) })
        let programme = try #require(CrashCourse.build(input(poolByConcept: pool)))

        #expect(programme.unreachableWeight > 0)
        #expect(!programme.unreachableGroups.isEmpty)
        #expect(programme.claim.contains("%"), "the claim names the gap in figures")

        let scheduled = Set(programme.days.flatMap(\.conceptIds))
        for node in nodes.dropFirst(30) {
            #expect(!scheduled.contains(node.conceptId), "a concept with no questions cannot be studied")
        }
    }

    @Test func theClaimNarrowsAsCoverageFallsRatherThanStayingAFixedPromise() throws {
        let band = try #require(config.crashHorizons.first { $0.days == 30 })
        #expect(CrashCourse.claim(unreachableWeight: 0, band: band).contains("full exam blueprint"))
        #expect(CrashCourse.claim(unreachableWeight: 0.08, band: band).contains("most of your exam blueprint"))

        let partial = CrashCourse.claim(unreachableWeight: 0.4, band: band)
        #expect(partial.contains("cannot claim to cover your exam"))
        #expect(partial.contains("targeted practice"))
    }

    @Test func aProgrammeReportsStudyDaysItCouldNotFill() throws {
        let sparse = Dictionary(uniqueKeysWithValues: nodes.enumerated().map { ($1.conceptId, $0 < 2 ? 5 : 0) })
        let programme = try #require(CrashCourse.build(input(daysToExam: 60, poolByConcept: sparse)))
        // An empty day is the honest signal that the bank ran out.
        #expect(programme.emptyStudyDays > 0)
    }
}
