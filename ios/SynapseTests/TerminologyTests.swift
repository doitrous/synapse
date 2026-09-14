import Foundation
import Testing
@testable import Synapse

/// The glossary is bilingual reference content and a progress surface; the
/// category order is what a student scans, and the progress doc round-trips
/// with the web under a shared key, so both have to be right.
struct TerminologyTests {

    private func term(_ id: String, _ category: String) -> MedicalTerm {
        MedicalTerm(id: id, term: id, ar: "", category: category, def: "", defAr: "", example: nil)
    }

    @Test("categories come in the seed's order, off-catalogue ones alphabetical last")
    func categoryOrder() {
        let terms = [
            term("1", "Pharmacology"),
            term("2", "zzz custom"),
            term("3", "Word parts"),
            term("4", "Directional & anatomy"),
            term("5", "aaa custom"),
            term("6", "Word parts"),  // a duplicate collapses
        ]
        #expect(TerminologyModel.orderedCategories(terms) == [
            "Directional & anatomy", "Word parts", "Pharmacology", "aaa custom", "zzz custom",
        ])
    }

    @Test("a term with no category is not shown as a blank rail chip")
    func emptyCategoryDropped() {
        #expect(TerminologyModel.orderedCategories([term("1", ""), term("2", "Examination")]) == ["Examination"])
    }

    /// The doc shape and key match `src/data/terminologyProgress.ts`, so a term
    /// marked known on the phone is known on the web.
    @Test("progress round-trips as the web's known-map shape")
    func progressRoundTrips() throws {
        #expect(TerminologyProgress.key == "nishany.terminology.progress.v1")
        let doc = TerminologyProgress(version: 1, known: ["anterior": "2026-09-14T00:00:00Z"])
        let data = try JSONEncoder().encode(doc)
        let back = try JSONDecoder().decode(TerminologyProgress.self, from: data)
        #expect(back == doc)
        #expect(Set(back.known.keys) == ["anterior"])
    }
}
