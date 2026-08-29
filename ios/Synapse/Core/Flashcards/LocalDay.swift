import Foundation

/// Local-day arithmetic for the flashcard feature, kept pure and away from any
/// clock of its own. A port of `src/data/flashcards/time.ts`.
///
/// A student studying at 11pm and one studying at 1am are on different calendar
/// days regardless of what UTC thinks, and every day-bounded rule in this
/// feature — the new/review caps, bury rollover, true retention, the heatmap —
/// turns on the *student's* local day. So days are `YYYY-MM-DD` strings built
/// from local getters, and callers pass the `Date` in rather than letting these
/// read the clock, so a test can put it anywhere.
enum LocalDay {
    /// Local calendar date as `YYYY-MM-DD` (not UTC). (`time.ts:15-17`)
    static func of(_ now: Date) -> String {
        let c = calendar.dateComponents([.year, .month, .day], from: now)
        return String(format: "%04d-%02d-%02d", c.year ?? 0, c.month ?? 0, c.day ?? 0)
    }

    /// Shift a `YYYY-MM-DD` day by whole days, staying on calendar boundaries.
    /// (`time.ts:20-25`)
    static func adding(_ delta: Int, to day: String) -> String {
        guard let (y, m, d) = parse(day) else { return day }
        // Built at local noon so a ±12h DST shift can never roll the date.
        var comps = DateComponents()
        comps.year = y; comps.month = m; comps.day = d + delta
        comps.hour = 12; comps.minute = 0; comps.second = 0
        guard let shifted = calendar.date(from: comps) else { return day }
        return of(shifted)
    }

    /// Whole days from `from` to `to` (`to - from`); negative when `to` precedes.
    /// (`time.ts:28-30`)
    static func daysBetween(from: String, to: String) -> Int {
        Int(((value(to) - value(from)) / 86_400.0).rounded())
    }

    /// The local day exactly `n` days after `now`'s day. (`time.ts:33-35`)
    static func plus(_ n: Int, from now: Date) -> String {
        adding(n, to: of(now))
    }

    // MARK: - Internals

    /// Local noon of a `YYYY-MM-DD`, as seconds since the epoch. (`time.ts:37-40`)
    private static func value(_ day: String) -> Double {
        guard let (y, m, d) = parse(day) else { return 0 }
        var comps = DateComponents()
        comps.year = y; comps.month = m; comps.day = d
        comps.hour = 12; comps.minute = 0; comps.second = 0
        return (calendar.date(from: comps) ?? Date(timeIntervalSince1970: 0)).timeIntervalSince1970
    }

    private static func parse(_ day: String) -> (Int, Int, Int)? {
        let parts = day.split(separator: "-").map { Int($0) }
        guard parts.count == 3, let y = parts[0], let m = parts[1], let d = parts[2] else { return nil }
        return (y, m, d)
    }

    private static var calendar: Calendar {
        var cal = Calendar(identifier: .gregorian)
        cal.timeZone = .current
        return cal
    }
}
