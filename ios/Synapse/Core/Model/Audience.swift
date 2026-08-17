import Foundation

/// Which cohort a student belongs to.
///
/// Mirrors `StudentAudience` in `src/lib/useIdentity.tsx`. It comes from the
/// roster row on `/api/me`, and falls back to what the student declared about
/// themselves — a university may not have set up a profile, and that is a state
/// to render rather than an error.
struct StudentAudience: Codable, Equatable, Hashable, Sendable {
    var universityId: String = ""
    /// As written on the roster, e.g. "Year 3".
    var year: String = ""
    var group: String = ""

    static let unknown = StudentAudience()

    /// True once there is enough to scope anything by.
    var isKnown: Bool { !universityId.isEmpty && !year.isEmpty }

    /// The derived year ID, e.g. `KAU_Y3`.
    ///
    /// A port of `yearId()` in `src/data/taxonomy.ts`: the university's short
    /// code, then the digits of the year, with internships marked `_INT`.
    func yearId(universityShort: String?) -> String {
        guard isKnown else { return "" }
        let short = (universityShort ?? universityId).uppercased()
        let number = year.filter(\.isNumber)
        let digits = number.isEmpty ? "1" : number
        return year.range(of: "internship", options: .caseInsensitive) != nil
            ? "\(short)_INT\(digits)"
            : "\(short)_Y\(digits)"
    }

    /// Where a student records their own cohort when the roster has none.
    /// The same key the web app uses, so setting it on one shows on the other.
    static let storageKey = "synapse.account.audience.v1"
}

/// Deciding whether a piece of content is meant for a given cohort.
///
/// This is more forgiving than a string comparison because the authored data is
/// not consistent, and a stricter reading would hide most of the catalogue:
///
/// - article years arrive as `kau_y3` **and** `KAU_Y3`, mixed within the field;
/// - question years arrive as `Year 2` — a label, not an ID at all;
/// - universities arrive lowercased (`kau`) while derived IDs uppercase them.
///
/// So both sides are reduced to what they actually mean — a university and a
/// year number — before being compared. Matching on the raw strings would mark
/// a Year 2 question as belonging to no year any student has.
enum ScopeMatch {

    /// `kau_y3`, `KAU_Y3`, `Year 3`, `3` → `y3`. Internships → `int1`.
    /// Returns nil when there is no year in the value to compare.
    static func normalisedYear(_ value: String) -> String? {
        let digits = value.filter(\.isNumber)
        guard !digits.isEmpty else { return nil }
        let isInternship = value.range(of: "int", options: .caseInsensitive) != nil
        return isInternship ? "int\(digits)" : "y\(digits)"
    }

    /// A university tag reduced to something comparable: `KAU_Y3` → `kau`,
    /// `kau` → `kau`.
    static func normalisedUniversity(_ value: String) -> String {
        let head = value.split(separator: "_").first.map(String.init) ?? value
        return head.lowercased()
    }

    /// Whether a scoped item is meant for this cohort.
    ///
    /// Empty means unrestricted, as everywhere else in the product: an item
    /// with no universities listed applies to everyone rather than to nobody.
    static func matches(
        universityIds: [String], yearIds: [String], audience: StudentAudience
    ) -> Bool {
        if !universityIds.isEmpty, !audience.universityId.isEmpty {
            let wanted = normalisedUniversity(audience.universityId)
            guard universityIds.contains(where: { normalisedUniversity($0) == wanted }) else {
                return false
            }
        }

        if !yearIds.isEmpty, !audience.year.isEmpty {
            guard let wanted = normalisedYear(audience.year) else { return true }
            // A tag with no year in it cannot contradict the student's year, so
            // it is ignored rather than treated as a mismatch.
            let comparable = yearIds.compactMap(normalisedYear)
            guard comparable.isEmpty || comparable.contains(wanted) else { return false }
        }

        return true
    }
}
