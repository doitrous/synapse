import Testing
import Foundation
@testable import Synapse

/// The weekly plan.
///
/// These mirror `src/data/adaptive/planning.test.ts`, because a plan built on
/// the phone and a plan built on a laptop have to be the same plan. The
/// promises being held here are about liveability rather than arithmetic: never
/// scheduling every free minute, never stacking the demanding sessions, never
/// dropping work without saying so.
@Suite struct AdaptiveScheduleTests {

    let config = AdaptiveConfig.default
    let weekStart = "2026-08-17"

    func week(_ minutesPerDay: Int = 120, overrides: [Int: DayCapacity] = [:]) -> [DayCapacity] {
        let start = StudySchedule.isoDay.date(from: weekStart)!
        return (0..<7).map { index in
            if let override = overrides[index] { return override }
            return DayCapacity(
                date: StudySchedule.isoDay.string(from: start.addingTimeInterval(Double(index) * 86_400)),
                statedMinutes: minutesPerDay
            )
        }
    }

    func input(days: [DayCapacity]? = nil, daysToExam: Int? = nil, locked: [PlanTask] = []) -> BuildPlanInput {
        BuildPlanInput(
            weekStart: weekStart,
            days: days ?? week(),
            shares: config.horizonBands.last!.shares,
            needs: [
                PlanNeedInput(need: .weakness, conceptIds: ["CON-0", "CON-1", "CON-2", "CON-3"], label: "Weak concept repair"),
                PlanNeedInput(need: .coverage, conceptIds: ["CON-4", "CON-5"], label: "Blueprint coverage"),
                PlanNeedInput(need: .review, conceptIds: ["CON-6"], label: "Spaced review"),
                PlanNeedInput(need: .uncertainty, conceptIds: ["CON-7"], label: "Measurement"),
            ],
            config: config,
            blueprintWeights: Dictionary(uniqueKeysWithValues: (0..<8).map { ("CON-\($0)", 0.125) }),
            daysToExam: daysToExam,
            generatedAt: "2026-08-17T09:00:00.000Z",
            locked: locked
        )
    }

    // MARK: - Capacity

    @Test func aPlanNeverSchedulesEveryFreeMinute() {
        let plan = StudySchedule.buildWeeklyPlan(input())
        #expect(plan.plannedMinutes < plan.statedMinutes)
        #expect(plan.bufferMinutes > 0)
    }

    @Test func theBufferIsTakenAfterFixedEventsNotBefore() {
        let day = DayCapacity(date: "2026-08-17", statedMinutes: 180, reservedMinutes: 60)
        // 120 free, then the buffer — not 180 buffered and then 60 removed,
        // which would leave a day that looks free and is not.
        #expect(StudySchedule.schedulableMinutes(day, config: config) == 98)
    }

    @Test func anUnavailableDayIsScheduledWithNothingAtAll() {
        var days = week()
        days[2] = DayCapacity(date: days[2].date, statedMinutes: 120, unavailable: true)
        let plan = StudySchedule.buildWeeklyPlan(input(days: days))
        #expect(plan.tasks.allSatisfy { $0.date != days[2].date })
    }

    @Test func noSingleDayIsLoadedPastItsOwnBufferedCapacity() {
        let plan = StudySchedule.buildWeeklyPlan(input())
        let capacity = Int((120.0 * (1 - config.schedule.capacityBufferShare)).rounded(.down))
        for (date, minutes) in plan.minutesByDay {
            #expect(minutes <= capacity, "\(date) was loaded with \(minutes) against a capacity of \(capacity)")
        }
    }

    @Test func aLongerDayEarnsMoreWorkRatherThanBeingCappedAtOneSession() {
        let short = StudySchedule.buildWeeklyPlan(input(days: week(120)))
        let long = StudySchedule.buildWeeklyPlan(input(days: week(300)))
        let minutes = { (plan: WeeklyPlan) in plan.tasks.reduce(0) { $0 + $1.expectedMinutes } }
        #expect(minutes(long) > minutes(short))
    }

    @Test func aWeekWithNoCapacityProducesNoWorkRatherThanAnImpossiblePlan() {
        let plan = StudySchedule.buildWeeklyPlan(input(days: week(0)))
        #expect(plan.plannedMinutes == 0)
        #expect(plan.tasks.filter { $0.expectedMinutes > 0 }.isEmpty)
    }

    // MARK: - Load

    @Test func assessmentsAndPracticalStationsNeverSitBackToBackWithinADay() {
        // Checked in the order the student works through, not merely in daily
        // totals — a day whose totals look balanced can still be front-loaded
        // with every hard session, which is the stacking the rule prevents.
        for minutes in [120, 240, 300] {
            let plan = StudySchedule.buildWeeklyPlan(input(days: week(minutes)))
            var byDate: [String: [TaskKind]] = [:]
            for task in plan.tasks { byDate[task.date, default: []].append(task.kind) }
            for (date, kinds) in byDate {
                var run = 0
                for kind in kinds {
                    run = (kind == .calibration || kind == .practical) ? run + 1 : 0
                    #expect(run <= config.schedule.maxConsecutiveHighEffort,
                            "\(date) at \(minutes) min/day stacks \(run) demanding sessions in a row")
                }
            }
        }
    }

    @Test func consecutiveTasksOnOneNeedDoNotAllTargetTheSameConcept() {
        let plan = StudySchedule.buildWeeklyPlan(input(days: week(300)))
        let weakness = plan.tasks.filter { $0.need == .weakness && !$0.conceptIds.isEmpty }
        // A drill is one concept repeated; a week is a rotation.
        #expect(Set(weakness.flatMap(\.conceptIds)).count > 1)
    }

    // MARK: - Legibility

    @Test func everyTaskStatesWhyItExists() {
        let plan = StudySchedule.buildWeeklyPlan(input())
        #expect(!plan.tasks.isEmpty)
        for task in plan.tasks { #expect(!task.reason.isEmpty, "\(task.title) has no reason") }
    }

    @Test func aPlanOffersAMinimumTierSoABadDayStillHasADefinedWin() {
        let plan = StudySchedule.buildWeeklyPlan(input())
        #expect(plan.tasks.contains { $0.tier == .minimum })
    }

    @Test func aDayWithNothingScheduledIsNamedAsRestRatherThanLeftBlank() {
        let plan = StudySchedule.buildWeeklyPlan(input(days: week(60)))
        let busy = Set(plan.tasks.filter { $0.kind != .rest }.map(\.date))
        let available = week(60).filter { !$0.unavailable }.map(\.date)
        for date in available where !busy.contains(date) {
            #expect(plan.tasks.contains { $0.date == date && $0.kind == .rest })
        }
    }

    // MARK: - Locked work

    @Test func lockedTasksSurviveARecalculationUntouched() {
        let pinned = PlanTask(
            id: "pinned", date: "2026-08-19", kind: .resource, tier: .minimum,
            title: "Dissection room", reason: "Booked.", expectedMinutes: 90,
            conceptIds: [], blueprintContribution: 0, need: nil,
            questionIds: [], resourceIds: [], locked: true,
            completedAt: nil, skippedAt: nil, history: []
        )
        let plan = StudySchedule.buildWeeklyPlan(input(locked: [pinned]))
        #expect(plan.tasks.contains(pinned))
        // And its minutes are gone from that day's capacity, not double-spent.
        #expect((plan.minutesByDay["2026-08-19"] ?? 0) <= 90 + Int(120.0 * (1 - config.schedule.capacityBufferShare)))
    }

    // MARK: - Missed work

    @Test func aMissedDayIsPartlyForgivenRatherThanFullyCarried() {
        let plan = StudySchedule.buildWeeklyPlan(input())
        let result = StudySchedule.carryForward(plan, today: "2026-08-20", config: config)
        #expect(result.missedMinutes > 0)
        #expect(result.carriedMinutes < result.missedMinutes)
        #expect(result.forgivenMinutes == result.missedMinutes - result.carriedMinutes)
    }

    @Test func carryingForwardRecordsHistoryRatherThanDeletingIt() {
        let plan = StudySchedule.buildWeeklyPlan(input())
        let result = StudySchedule.carryForward(plan, today: "2026-08-20", config: config)
        let moved = result.tasks.filter { !$0.history.isEmpty }
        #expect(!moved.isEmpty)
        #expect(moved.allSatisfy { $0.skippedAt == "2026-08-20" })
        #expect(result.tasks.count == plan.tasks.count, "nothing is deleted")
    }

    @Test func aCompletedTaskIsNeverTreatedAsMissed() {
        var plan = StudySchedule.buildWeeklyPlan(input())
        for index in plan.tasks.indices where plan.tasks[index].kind != .rest {
            plan.tasks[index].completedAt = "2026-08-18T10:00:00.000Z"
        }
        let result = StudySchedule.carryForward(plan, today: "2026-08-20", config: config)
        #expect(result.missedMinutes == 0)
    }

    @Test func restIsNeverCountedAsMissedWork() {
        let plan = StudySchedule.buildWeeklyPlan(input(days: week(60)))
        let result = StudySchedule.carryForward(plan, today: "2026-08-24", config: config)
        #expect(result.tasks.filter { $0.kind == .rest }.allSatisfy { $0.skippedAt == nil })
    }

    // MARK: - The mock

    @Test func aMockIsPlacedFarEnoughAheadToActOnWhatItFinds() {
        #expect(StudySchedule.mockDate(examDate: "2026-09-10", config: config) == "2026-09-03")
    }

    @Test func aReadinessAssessmentIsScheduledOnlyWhenAnExamIsActuallyNear() {
        let far = StudySchedule.buildWeeklyPlan(input(days: week(300), daysToExam: 90))
        #expect(!far.tasks.contains { $0.kind == .calibration })

        let near = StudySchedule.buildWeeklyPlan(input(days: week(300), daysToExam: 10))
        #expect(near.tasks.contains { $0.kind == .calibration })
    }

    @Test func aTightWeekPlacesTheMeasurementFirstOrSaysItCouldNot() {
        // The mock is the one task a squeezed week must not lose quietly.
        let cramped = StudySchedule.buildWeeklyPlan(input(days: week(60), daysToExam: 10))
        let scheduled = cramped.tasks.contains { $0.kind == .calibration }
        let reported = cramped.unplaced.contains { $0.kind == .calibration }
        #expect(scheduled || reported)
    }

    // MARK: - What did not fit

    @Test func workThatDoesNotFitIsReportedNeverSilentlyDiscarded() {
        let cramped = StudySchedule.buildWeeklyPlan(input(days: week(30)))
        let asked = cramped.tasks.filter { $0.expectedMinutes > 0 }.count + cramped.unplaced.count
        #expect(asked > 0)
        for task in cramped.unplaced {
            #expect(task.reason.contains("minutes"), "the reason says concretely what was missing")
        }
    }

    @Test func aWeekWithRoomForEverythingReportsNothingUnplaced() {
        let roomy = StudySchedule.buildWeeklyPlan(input(days: week(300)))
        #expect(roomy.unplaced.isEmpty)
    }

    // MARK: - Round-tripping

    @Test func aPlanReadsBackAsItWasWritten() throws {
        // Needs are dictionary keys here, and a Swift dictionary keyed by an
        // enum encodes as a flat array unless told otherwise — which would make
        // a plan written on the phone unreadable on a laptop.
        let plan = StudySchedule.buildWeeklyPlan(input())
        let data = try JSONEncoder().encode(plan)
        let json = try #require(try JSONSerialization.jsonObject(with: data) as? [String: Any])
        #expect(json["needMinutes"] is [String: Any])

        let decoded = try JSONDecoder().decode(WeeklyPlan.self, from: data)
        #expect(decoded == plan)
    }
}
