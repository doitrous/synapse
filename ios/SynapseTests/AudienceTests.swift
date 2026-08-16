import Foundation
import Testing
@testable import Synapse

/// The fixtures here are the shapes live content actually uses, not tidy ones.
/// Matching on raw strings would mark a `Year 2` question as belonging to no
/// year any student has, and hide it from everyone.
struct AudienceTests {

    @Test("the year ID derives as the site derives it")
    func yearIdDerivation() {
        let audience = StudentAudience(universityId: "kau", year: "Year 3")
        #expect(audience.yearId(universityShort: "KAU") == "KAU_Y3")
    }

    @Test("an internship year is marked as one")
    func internship() {
        let audience = StudentAudience(universityId: "kau", year: "Internship 1")
        #expect(audience.yearId(universityShort: "KAU") == "KAU_INT1")
    }

    @Test("an audience is only known once it has both halves")
    func known() {
        #expect(!StudentAudience.unknown.isKnown)
        #expect(!StudentAudience(universityId: "kau", year: "").isKnown)
        #expect(!StudentAudience(universityId: "", year: "Year 1").isKnown)
        #expect(StudentAudience(universityId: "kau", year: "Year 1").isKnown)
    }

    @Suite("Normalising the authored values")
    struct Normalising {

        /// All three of these appear in the live catalogue for the same cohort.
        @Test("every form of a year reduces to the same thing", arguments: [
            "kau_y3", "KAU_Y3", "Year 3", "3", "y3",
        ])
        func yearForms(value: String) {
            #expect(ScopeMatch.normalisedYear(value) == "y3")
        }

        @Test("internship years stay distinct from ordinary ones")
        func internshipDistinct() {
            #expect(ScopeMatch.normalisedYear("KAU_INT1") == "int1")
            #expect(ScopeMatch.normalisedYear("KAU_Y1") == "y1")
            #expect(ScopeMatch.normalisedYear("KAU_INT1") != ScopeMatch.normalisedYear("KAU_Y1"))
        }

        @Test("a value with no year in it yields nothing to compare")
        func noYear() {
            #expect(ScopeMatch.normalisedYear("kau") == nil)
            #expect(ScopeMatch.normalisedYear("") == nil)
        }

        @Test("a university reduces the same whether bare or in a year ID")
        func universityForms() {
            #expect(ScopeMatch.normalisedUniversity("kau") == "kau")
            #expect(ScopeMatch.normalisedUniversity("KAU") == "kau")
            #expect(ScopeMatch.normalisedUniversity("KAU_Y3") == "kau")
        }
    }

    @Suite("Matching")
    struct Matching {
        private let kauY3 = StudentAudience(universityId: "kau", year: "Year 3")

        /// The rule that decides whether the library has anything in it.
        @Test("no scope recorded means it is for everyone")
        func unrestricted() {
            #expect(ScopeMatch.matches(universityIds: [], yearIds: [], audience: kauY3))
            #expect(ScopeMatch.matches(universityIds: [], yearIds: [], audience: .unknown))
        }

        @Test("an unknown audience is shown everything rather than nothing")
        func unknownAudienceSeesAll() {
            #expect(ScopeMatch.matches(universityIds: ["kau"], yearIds: ["kau_y1"], audience: .unknown))
        }

        /// Both casings appear in the same field in live data.
        @Test("either casing of a year ID matches", arguments: ["kau_y3", "KAU_Y3"])
        func mixedCase(tag: String) {
            #expect(ScopeMatch.matches(universityIds: ["kau"], yearIds: [tag], audience: kauY3))
        }

        /// Questions tag years as labels. Compared literally against `KAU_Y3`,
        /// every question in the bank would be hidden from every student.
        @Test("a question's `Year 3` label matches a KAU_Y3 student")
        func labelForm() {
            #expect(ScopeMatch.matches(universityIds: ["kau"], yearIds: ["Year 3"], audience: kauY3))
        }

        @Test("another cohort's content is not shown")
        func wrongCohort() {
            #expect(!ScopeMatch.matches(universityIds: ["kau"], yearIds: ["Year 1"], audience: kauY3))
            #expect(!ScopeMatch.matches(universityIds: ["asu"], yearIds: [], audience: kauY3))
        }

        @Test("a restriction on one axis does not imply one on the other")
        func partial() {
            #expect(ScopeMatch.matches(universityIds: ["kau"], yearIds: [], audience: kauY3))
            #expect(ScopeMatch.matches(universityIds: [], yearIds: ["Year 3"], audience: kauY3))
        }

        @Test("a year listed for several cohorts matches any of them")
        func multiple() {
            #expect(ScopeMatch.matches(
                universityIds: ["kau", "asu"], yearIds: ["Year 2", "kau_y3"], audience: kauY3
            ))
        }

        /// A tag carrying no year cannot contradict the student's year.
        @Test("year tags with nothing comparable in them are ignored")
        func uncomparableYearTags() {
            #expect(ScopeMatch.matches(universityIds: [], yearIds: ["all", "any"], audience: kauY3))
        }
    }
}
