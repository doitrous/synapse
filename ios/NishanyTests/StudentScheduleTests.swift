import Testing
import Foundation
@testable import Nishany

/// The published timetable.
///
/// This decides the exam horizon, and the horizon decides how every block in
/// Adaptive Study is divided. So the case that matters most is the empty one:
/// no exam published must stay nil rather than becoming a guess.
@Suite struct StudentScheduleTests {

    let audience = StudentAudience(universityId: "kau", year: "Year 3", group: "")

    /// A day at 09:00 local, as `YYYY-MM-DD` — the form the console writes.
    func day(offset: Int, from now: Date = Date()) -> String {
        let date = Calendar.current.date(byAdding: .day, value: offset, to: now) ?? now
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: date)
    }

    func universities(courses: [[String: Any]] = [["id": "cvs", "name": "Cardiovascular"]]) -> [[String: Any]] {
        [["id": "kau", "name": "King Abdulaziz", "short": "KAU",
          "years": [["id": "KAU_Y3", "year": "Year 3", "courses": courses]]]]
    }

    func block(_ type: String, date: String, title: String = "", start: String = "09:00") -> [String: Any] {
        ["id": "b-\(type)-\(date)", "type": type, "title": title,
         "date": date, "startTime": start, "endTime": "11:00", "location": "Hall A"]
    }

    // MARK: - Reading the timetable

    @Test func everyModuleInTheYearIsFlattenedIntoOneList() {
        let schedules = ["kau:Year 3:cvs": [block("lecture", date: day(offset: 1)),
                                            block("final", date: day(offset: 30))]]
        let sessions = StudentSchedule.sessions(
            universities: universities(), schedules: schedules, audience: audience
        )
        #expect(sessions.count == 2)
        #expect(sessions.allSatisfy { $0.courseName == "Cardiovascular" })
        // Sorted, because a student reads a timetable forwards.
        #expect(sessions[0].start < sessions[1].start)
    }

    @Test func onlyExamBlocksCountAsExams() {
        let dates = ["lecture", "practical", "review", "logbook", "midterm", "midyear", "term", "final"]
        let schedules = ["kau:Year 3:cvs": dates.enumerated().map { block($1, date: day(offset: $0 + 1)) }]
        let sessions = StudentSchedule.sessions(
            universities: universities(), schedules: schedules, audience: audience
        )
        #expect(sessions.filter(\.isExam).map(\.type).sorted() == ["final", "midterm", "midyear", "term"])
    }

    @Test func aBlockIsReadInTheStudentsOwnTimeZoneNotUTC() throws {
        let schedules = ["kau:Year 3:cvs": [block("lecture", date: "2026-09-10", start: "09:00")]]
        let session = try #require(StudentSchedule.sessions(
            universities: universities(), schedules: schedules, audience: audience
        ).first)

        // Reading a timetable as UTC shifts the day for anyone east or west of
        // Greenwich, which is every student this product has.
        let parts = Calendar.current.dateComponents([.year, .month, .day, .hour], from: session.start)
        #expect(parts.year == 2026 && parts.month == 9 && parts.day == 10 && parts.hour == 9)
    }

    @Test func aLogbookTaskIsADeadlineRatherThanASitting() throws {
        var task = block("logbook", date: day(offset: 3))
        task["startTime"] = ""
        task["endTime"] = ""
        let session = try #require(StudentSchedule.sessions(
            universities: universities(), schedules: ["kau:Year 3:cvs": [task]], audience: audience
        ).first)
        #expect(session.end == nil)
    }

    @Test func aTimetableIsFoundUnderTheYearIdTheConsoleActuallyWrites() {
        // The console keys schedules by the year's ID; the website's own reader
        // builds the key from the year's label, which is why a published
        // timetable never reaches a student there. Both forms are read here.
        for key in ["kau:KAU_Y3:cvs", "kau:Year 3:cvs"] {
            let sessions = StudentSchedule.sessions(
                universities: universities(),
                schedules: [key: [block("final", date: day(offset: 8))]],
                audience: audience
            )
            #expect(sessions.count == 1, "nothing found under \(key)")
            #expect(sessions.first?.isExam == true)
        }
    }

    // MARK: - Scoping

    @Test func anotherYearsTimetableIsNotThisStudentsTimetable() {
        let schedules = ["kau:Year 2:cvs": [block("final", date: day(offset: 5))]]
        #expect(StudentSchedule.sessions(
            universities: universities(), schedules: schedules, audience: audience
        ).isEmpty)
    }

    @Test func aStudentWithNoUniversityOrYearHasNoTimetable() {
        let schedules = ["kau:Year 3:cvs": [block("final", date: day(offset: 5))]]
        #expect(StudentSchedule.sessions(
            universities: universities(), schedules: schedules, audience: .unknown
        ).isEmpty)
    }

    @Test func aCatalogueThatWillNotParseIsAnEmptyTimetableNotACrash() {
        #expect(StudentSchedule.sessions(universities: "not a catalogue", schedules: [:], audience: audience).isEmpty)
        #expect(StudentSchedule.sessions(universities: nil, schedules: nil, audience: audience).isEmpty)
    }

    // MARK: - The next exam

    @Test func noExamPublishedIsNilRatherThanAGuess() {
        let schedules = ["kau:Year 3:cvs": [block("lecture", date: day(offset: 2))]]
        let sessions = StudentSchedule.sessions(
            universities: universities(), schedules: schedules, audience: audience
        )
        // The horizon divides every block on the Adaptive Study screen. An
        // invented countdown would quietly change all of it.
        #expect(StudentSchedule.nextExam(sessions) == nil)
    }

    @Test func theNextExamIsTheSoonestOneStillAhead() throws {
        let schedules = ["kau:Year 3:cvs": [
            block("final", date: day(offset: -10), title: "Last term"),
            block("midterm", date: day(offset: 12), title: "Mid-term"),
            block("final", date: day(offset: 40), title: "Finals"),
        ]]
        let sessions = StudentSchedule.sessions(
            universities: universities(), schedules: schedules, audience: audience
        )
        let next = try #require(StudentSchedule.nextExam(sessions))
        #expect(next.session.title == "Mid-term")
        #expect(next.daysAway == 12)
    }

    @Test func anExamTomorrowMorningIsOneDayAwayNotZero() throws {
        let schedules = ["kau:Year 3:cvs": [block("final", date: day(offset: 1), start: "09:00")]]
        let sessions = StudentSchedule.sessions(
            universities: universities(), schedules: schedules, audience: audience
        )
        // Counted between midnights, not between timestamps: at 4pm today, an
        // exam at 9am tomorrow is 17 hours away, and rounding that to zero days
        // would tell a student their exam is today.
        #expect(try #require(StudentSchedule.nextExam(sessions)).daysAway == 1)
    }

    @Test func anExamAlreadySatIsNotTheNextExam() {
        let schedules = ["kau:Year 3:cvs": [block("final", date: day(offset: -1))]]
        let sessions = StudentSchedule.sessions(
            universities: universities(), schedules: schedules, audience: audience
        )
        #expect(StudentSchedule.nextExam(sessions) == nil)
    }
}
