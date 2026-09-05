import Foundation

/// The student's own timetable, as their university published it.
///
/// A port of `src/lib/useStudentSchedule.ts`. The admin console stores
/// schedules per module, keyed `<universityId>:<yearId>:<courseId>`. A student
/// does not think in modules when they look at a Tuesday, so this flattens
/// every module in their year into one list.
///
/// The key is looked up under the year's ID *and* its label. The console writes
/// `moduleKey(uni.id, y.id, c.id)` — the ID, e.g. `kau:KAU_Y1:…` — while the
/// website's own student reader builds the key from the year's label, so on the
/// web a published timetable never reaches the student it was published for.
/// Accepting both is not indecision: it is the only way to read the data that
/// actually exists while staying correct if that reader is ever fixed.
///
/// Empty until an admin has set up their year, which is the honest state: the
/// web deleted a generated calendar for exactly this reason, because it
/// manufactured lectures, seminars and a recurring exam for everyone, forever.
struct ScheduledSession: Identifiable, Equatable, Sendable {
    var id: String
    var type: String
    var title: String
    /// `YYYY-MM-DD`.
    var date: String
    var startTime: String
    var endTime: String
    var location: String
    var courseId: String
    var courseName: String
    /// Local, never UTC — reading a timetable as UTC shifts the day.
    var start: Date
    /// Nil for a logbook task, which is a deadline rather than a sitting.
    var end: Date?
    var label: String
    var isExam: Bool
}

enum StudentSchedule {

    /// The block types that are actually an exam.
    static let examTypes: Set<String> = ["midterm", "midyear", "term", "final"]

    static let label: [String: String] = [
        "lecture": "Lecture",
        "practical": "Practical session",
        "review": "Review session",
        "midterm": "Mid-term exam",
        "midyear": "Mid-year exam",
        "term": "Term exam",
        "final": "Final exam",
        "logbook": "Logbook task",
    ]

    /// Flatten the published schedules for this student's year.
    ///
    /// Both documents are read as loose JSON rather than decoded into types:
    /// they are admin-authored and grow fields regularly, and a timetable that
    /// refuses to load because a new key appeared is worse than one that
    /// ignores what it does not recognise.
    static func sessions(
        universities: Any?, schedules: Any?, audience: StudentAudience, now: Date = Date()
    ) -> [ScheduledSession] {
        guard audience.isKnown,
              let universities = universities as? [[String: Any]],
              let schedules = schedules as? [String: Any],
              let university = universities.first(where: { $0["id"] as? String == audience.universityId }),
              let years = university["years"] as? [[String: Any]],
              let year = years.first(where: { ($0["year"] as? String) == audience.year })
        else { return [] }

        let universityId = university["id"] as? String ?? audience.universityId
        let yearKeys = [year["id"] as? String, year["year"] as? String ?? audience.year]
            .compactMap { $0 }
        var out: [ScheduledSession] = []

        for course in year["courses"] as? [[String: Any]] ?? [] {
            guard let courseId = course["id"] as? String else { continue }
            let blocks = yearKeys
                .lazy
                .compactMap { schedules["\(universityId):\($0):\(courseId)"] as? [[String: Any]] }
                .first ?? []

            for block in blocks {
                guard let date = block["date"] as? String else { continue }
                let type = block["type"] as? String ?? "lecture"
                let startTime = block["startTime"] as? String ?? ""
                guard let start = localDateTime(date: date, time: startTime) else { continue }
                let endTime = block["endTime"] as? String ?? ""

                out.append(ScheduledSession(
                    id: block["id"] as? String ?? "\(courseId)-\(date)-\(startTime)",
                    type: type,
                    title: block["title"] as? String ?? "",
                    date: date,
                    startTime: startTime,
                    endTime: endTime,
                    location: block["location"] as? String ?? "",
                    courseId: courseId,
                    courseName: course["name"] as? String ?? courseId,
                    start: start,
                    end: endTime.isEmpty ? nil : localDateTime(date: date, time: endTime),
                    label: label[type] ?? type,
                    isExam: examTypes.contains(type)
                ))
            }
        }

        return out.sorted { $0.start < $1.start }
    }

    /// The next exam on the timetable, and how many days away it is.
    ///
    /// Nil when the student's year has no exam scheduled. The dashboard used to
    /// claim "38 days to your Cardiovascular exam" from a literal; if no exam
    /// has been published, the honest answer is to say nothing at all.
    static func nextExam(_ sessions: [ScheduledSession], now: Date = Date())
        -> (session: ScheduledSession, daysAway: Int)? {
        guard let upcoming = sessions.first(where: { $0.isExam && $0.start >= now }) else { return nil }

        // Measured between midnights, so an exam at nine tomorrow morning is
        // one day away rather than zero.
        let calendar = Calendar.current
        let today = calendar.startOfDay(for: now)
        let examDay = calendar.startOfDay(for: upcoming.start)
        let days = calendar.dateComponents([.day], from: today, to: examDay).day ?? 0
        return (upcoming, days)
    }

    /// `YYYY-MM-DD` and `HH:MM` as a local date — never as UTC, which shifts
    /// the day for anyone east or west of Greenwich.
    ///
    /// Shared with the upcoming list, which reads the student's own calendar
    /// and has to place its blocks on the same day this places sessions.
    static func localDateTime(date: String, time: String) -> Date? {
        let day = date.split(separator: "-").compactMap { Int($0) }
        guard day.count == 3 else { return nil }
        let clock = (time.isEmpty ? "00:00" : time).split(separator: ":").compactMap { Int($0) }

        var components = DateComponents()
        components.year = day[0]
        components.month = day[1]
        components.day = day[2]
        components.hour = clock.first ?? 0
        components.minute = clock.count > 1 ? clock[1] : 0
        return Calendar.current.date(from: components)
    }
}
