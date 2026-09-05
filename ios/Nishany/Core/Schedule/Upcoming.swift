import Foundation

/// One shape for everything on a student's day, from either calendar.
///
/// A student has two: the timetable their university published, and the blocks
/// they planned themselves. Every surface that asked "what is next" read only
/// the first, so a student whose university has published nothing — which is
/// most of them, most of the time — was told there was nothing coming while
/// their own calendar was full. The two are different records with different
/// owners and they stay that way; this is only the reading of them.
///
/// A port of `src/lib/upcoming.ts`. Pure functions over plain data, so the
/// rules that decide what a student is shown next can be tested without a
/// clock or a stored document.
struct UpcomingItem: Identifiable, Equatable, Sendable {
    enum Source: String, Sendable { case faculty, personal }

    /// Unique across both sources: the two id spaces are unrelated.
    var id: String
    var source: Source
    var title: String
    var start: Date
    /// Nil for an untimed item, such as a logbook deadline.
    var end: Date?
    var subjectId: String
    /// "Lecture", "Revision" — what this is, for the badge.
    var kind: String
    var location: String?
    var isExam: Bool
    /// Personal only: ticked off by the student.
    var done: Bool?
    /// Faculty only: the module it belongs to.
    var courseName: String?
    /// The underlying record's id, for writing back to it.
    var recordId: String
    /// Personal only, and only when planned from a published session.
    var fromSessionId: String?

    /// Whether this has already finished.
    ///
    /// Used to dim a row rather than remove it: "what have I already missed" is
    /// the question a day is most often asked, and a list that erases its own
    /// past cannot answer it.
    func isPast(_ now: Date = Date()) -> Bool { (end ?? start) < now }

    /// Minutes this occupies. Zero for an untimed item.
    var minutes: Int {
        guard let end else { return 0 }
        return max(0, Int(end.timeIntervalSince(start) / 60))
    }
}

enum Upcoming {

    static func item(_ session: ScheduledSession) -> UpcomingItem {
        UpcomingItem(
            id: "faculty:\(session.id)",
            source: .faculty,
            title: session.title.isEmpty ? session.label : session.title,
            start: session.start,
            end: session.end,
            subjectId: "",
            kind: session.label,
            location: session.location.isEmpty ? nil : session.location,
            isExam: session.isExam,
            courseName: session.courseName.isEmpty ? nil : session.courseName,
            recordId: session.id
        )
    }

    /// Nil when the stored block has a date nothing can be made of.
    static func item(_ block: StudyBlock) -> UpcomingItem? {
        guard let start = StudentSchedule.localDateTime(date: block.date, time: block.start) else { return nil }
        let minutes = block.minutes
        return UpcomingItem(
            id: "personal:\(block.id)",
            source: .personal,
            title: block.title,
            start: start,
            end: minutes > 0 ? start.addingTimeInterval(Double(minutes) * 60) : nil,
            subjectId: block.subjectId,
            kind: block.kind,
            location: nil,
            isExam: false,
            done: block.done ?? false,
            courseName: nil,
            recordId: block.id,
            fromSessionId: block.sourceSessionId
        )
    }

    /// Both calendars as one list, in time order.
    ///
    /// A block planned from a published session is dropped in favour of the
    /// session it came from. "Add to plan" copies a session into the student's
    /// own blocks and records which one — so without this, the moment a student
    /// added a lecture to their plan their day showed that lecture twice, an
    /// hour of teaching counted as two, and the next thing coming up was a
    /// duplicate of itself.
    static func merge(sessions: [ScheduledSession], blocks: [StudyBlock]) -> [UpcomingItem] {
        let facultyIds = Set(sessions.map(\.id))
        var items = sessions.map(item)
        for block in blocks {
            if let source = block.sourceSessionId, facultyIds.contains(source) { continue }
            if let made = item(block) { items.append(made) }
        }
        return items.sorted { $0.start != $1.start ? $0.start < $1.start : $0.id < $1.id }
    }

    /// The next thing still to come.
    ///
    /// An item counts as still to come until it has *finished*, not until it
    /// has started: a lecture forty minutes in is what the student is doing
    /// now, and skipping to the one after it would answer a question nobody
    /// asked.
    static func next(_ items: [UpcomingItem], now: Date = Date()) -> UpcomingItem? {
        items.first { (($0.end ?? $0.start)) >= now }
    }

    /// Everything on one local calendar day, in time order.
    static func on(_ items: [UpcomingItem], day: Date) -> [UpcomingItem] {
        let calendar = Calendar.current
        return items.filter { calendar.isDate($0.start, inSameDayAs: day) }
    }
}
