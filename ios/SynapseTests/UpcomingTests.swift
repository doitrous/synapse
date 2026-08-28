import Testing
import Foundation
@testable import Synapse

/// What a student is told is coming next.
///
/// A port of the rules in `src/lib/upcoming.ts`. A student has two calendars —
/// the timetable their university published, and the blocks they planned
/// themselves — and every surface that asked "what is next" once read only the
/// first. Most universities have published nothing, so most students were told
/// there was nothing coming while their own calendar was full.
@Suite struct UpcomingTests {

    func at(_ hour: Int, minute: Int = 0, day: Int = 20) -> Date {
        var components = DateComponents()
        components.year = 2026; components.month = 8; components.day = day
        components.hour = hour; components.minute = minute
        return Calendar.current.date(from: components)!
    }

    func session(_ id: String, hour: Int, minutes: Int = 60, day: Int = 20) -> ScheduledSession {
        ScheduledSession(
            id: id, type: "lecture", title: "Lecture \(id)",
            date: "2026-08-\(String(format: "%02d", day))",
            startTime: "\(String(format: "%02d", hour)):00",
            endTime: "\(String(format: "%02d", hour + 1)):00",
            location: "Hall A", courseId: "c", courseName: "CVS",
            start: at(hour, day: day), end: at(hour, minute: minutes, day: day).addingTimeInterval(0),
            label: "Lecture", isExam: false
        )
    }

    func block(_ id: String, hour: Int, source: String? = nil, day: Int = 20) -> StudyBlock {
        StudyBlock(
            id: id, title: "Block \(id)", date: "2026-08-\(String(format: "%02d", day))",
            start: "\(String(format: "%02d", hour)):00", end: "\(String(format: "%02d", hour + 1)):00",
            subjectId: "cvs", moduleId: nil, kind: "Revision", done: false,
            sourceSessionId: source
        )
    }

    // MARK: - Merging

    @Test func bothCalendarsAppearInOneListInTimeOrder() {
        let items = Upcoming.merge(sessions: [session("s", hour: 14)], blocks: [block("b", hour: 9)])
        #expect(items.count == 2)
        #expect(items[0].source == .personal)
        #expect(items[1].source == .faculty)
    }

    @Test func aBlockPlannedFromASessionDoesNotShowTheSessionTwice() {
        // "Add to plan" copies a session into the student's own blocks. Without
        // this the moment they did, their day showed that lecture twice, an
        // hour of teaching counted as two, and the next thing coming up was a
        // duplicate of itself.
        let items = Upcoming.merge(
            sessions: [session("s", hour: 14)],
            blocks: [block("b", hour: 14, source: "s")]
        )
        #expect(items.count == 1)
        #expect(items[0].source == .faculty)
    }

    @Test func aBlockPlannedFromASessionNoLongerPublishedIsStillShown() {
        // The university withdrew the lecture; the student still put an hour
        // aside for it, and deleting their plan under them would be wrong.
        let items = Upcoming.merge(sessions: [], blocks: [block("b", hour: 14, source: "gone")])
        #expect(items.count == 1)
        #expect(items[0].source == .personal)
    }

    @Test func aBlockWithAnUnreadableDateIsDroppedRatherThanCrashing() {
        var broken = block("b", hour: 9)
        broken.date = "not-a-date"
        #expect(Upcoming.merge(sessions: [], blocks: [broken]).isEmpty)
    }

    @Test func idsFromTheTwoCalendarsCannotCollide() {
        // The two id spaces are unrelated, so both are namespaced.
        let items = Upcoming.merge(sessions: [session("x", hour: 9)], blocks: [block("x", hour: 10)])
        #expect(Set(items.map(\.id)).count == 2)
    }

    // MARK: - What is next

    @Test func somethingAlreadyRunningIsStillWhatIsNext() {
        // A lecture forty minutes in is what the student is doing now, and
        // skipping to the one after it answers a question nobody asked.
        let items = Upcoming.merge(sessions: [session("s", hour: 9)], blocks: [])
        let next = Upcoming.next(items, now: at(9, minute: 40))
        #expect(next?.recordId == "s")
    }

    @Test func somethingFinishedIsNotWhatIsNext() {
        let items = Upcoming.merge(sessions: [session("s", hour: 9), session("t", hour: 14)], blocks: [])
        #expect(Upcoming.next(items, now: at(11))?.recordId == "t")
    }

    @Test func anEmptyDayHasNothingNext() {
        #expect(Upcoming.next([], now: at(9)) == nil)
    }

    @Test func nothingLeftTodayReportsNothingRatherThanYesterday() {
        let items = Upcoming.merge(sessions: [session("s", hour: 9)], blocks: [])
        #expect(Upcoming.next(items, now: at(23)) == nil)
    }

    // MARK: - The past

    @Test func aFinishedItemIsMarkedPastRatherThanRemoved() {
        // "What have I already missed" is the question a day is most often
        // asked, and a list that erases its own past cannot answer it.
        let item = Upcoming.item(session("s", hour: 9))
        #expect(item.isPast(at(11)))
        #expect(!item.isPast(at(9, minute: 30)))
    }

    @Test func anUntimedItemIsJudgedByItsStart() {
        var item = Upcoming.item(session("s", hour: 9))
        item.end = nil
        #expect(item.isPast(at(9, minute: 30)))
        #expect(item.minutes == 0)
    }

    // MARK: - One day

    @Test func aDayHoldsOnlyItsOwnItems() {
        let items = Upcoming.merge(
            sessions: [session("today", hour: 9), session("tomorrow", hour: 9, day: 21)],
            blocks: []
        )
        #expect(Upcoming.on(items, day: at(12)).map(\.recordId) == ["today"])
    }

    // MARK: - Recent resources

    @Test func reopeningADocumentMovesItToTheFrontRatherThanListingItTwice() {
        let first = RecentResource(id: "a", title: "A", type: "Book", subjectId: "s", meta: "", openedAt: "1")
        let second = RecentResource(id: "b", title: "B", type: "Book", subjectId: "s", meta: "", openedAt: "2")
        let again = RecentResource(id: "a", title: "A", type: "Book", subjectId: "s", meta: "", openedAt: "3")

        let list = RecentResource.noting(again, in: [second, first])
        #expect(list.map(\.id) == ["a", "b"])
        #expect(list.first?.openedAt == "3")
    }

    @Test func theHistoryDoesNotGrowWithoutBound() {
        // The record is rewritten whole on every open, so an unbounded list
        // would cost a student a larger upload every time they read anything.
        var list: [RecentResource] = []
        for index in 0..<25 {
            list = RecentResource.noting(
                RecentResource(id: "r\(index)", title: "t", type: "Book",
                               subjectId: "s", meta: "", openedAt: "\(index)"),
                in: list
            )
        }
        #expect(list.count == RecentResource.limit)
        #expect(list.first?.id == "r24")
    }
}
