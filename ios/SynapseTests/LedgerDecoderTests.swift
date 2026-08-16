import Foundation
import Testing
@testable import Synapse

/// The ledger is one document holding every kind of content, and the scope
/// fields sit in a different place — under a different name — depending on the
/// kind. That asymmetry is the most likely thing to get wrong, and getting it
/// wrong empties a surface rather than raising anything.
struct LedgerDecoderTests {

    private func decode(_ records: [[String: Any]]) -> (items: [LedgerItem], skipped: Int) {
        LedgerDecoder.decode(records)
    }

    @Test("a question keeps its scope under questionData.tags, with years named `years`")
    func questionScope() throws {
        let (items, _) = decode([[
            "id": "Q1", "kind": "question", "title": "Chest pain", "subjectId": "SYS_CVS",
            "status": "Published",
            "questionData": ["tags": ["universityIds": ["OMS"], "years": ["OMS_Y2"]]],
        ]])

        let item = try #require(items.first)
        #expect(item.universityIds == ["OMS"])
        #expect(item.yearIds == ["OMS_Y2"])
    }

    @Test("an article keeps its scope at the top of articleData, with years named `yearIds`")
    func articleScope() throws {
        let (items, _) = decode([[
            "id": "A1", "kind": "article", "title": "Aortic stenosis", "subjectId": "SYS_CVS",
            "status": "Published",
            "articleData": ["universityIds": ["ASU"], "yearIds": ["ASU_Y3"], "summary": "A narrowing."],
        ]])

        let item = try #require(items.first)
        #expect(item.universityIds == ["ASU"])
        #expect(item.yearIds == ["ASU_Y3"])
    }

    /// If a question's years were read from `yearIds`, this record would come
    /// back unscoped — visible to everyone instead of one cohort.
    @Test("a question's years are not read from the article field name")
    func questionYearsAreNotMisread() throws {
        let (items, _) = decode([[
            "id": "Q2", "kind": "question", "title": "Murmur", "subjectId": "SYS_CVS",
            "status": "Published",
            "questionData": ["tags": ["years": ["OMS_Y2"], "universityIds": []]],
        ]])

        let item = try #require(items.first)
        #expect(item.yearIds == ["OMS_Y2"], "years must come from `years` on a question")
    }

    @Test("an unreadable record is skipped rather than failing the whole batch")
    func skipsBadRecords() {
        let (items, skipped) = decode([
            ["id": "A1", "kind": "article", "title": "Good", "subjectId": "S", "status": "Published"],
            ["kind": "article", "title": "No id", "status": "Published"],
            ["id": "A3", "kind": "not-a-kind", "title": "Bad kind", "status": "Published"],
            ["id": "A4", "kind": "article", "title": "Bad status", "status": "Nonsense"],
        ])

        #expect(items.count == 1, "one malformed record must not cost a student the catalogue")
        #expect(skipped == 3)
    }

    @Test("the whole original record is preserved for later decoding")
    func keepsRaw() throws {
        let (items, _) = decode([[
            "id": "A1", "kind": "article", "title": "Aortic stenosis", "subjectId": "SYS_CVS",
            "status": "Published",
            "articleData": ["summary": "A narrowing.", "someFutureField": "kept"],
        ]])

        let item = try #require(items.first)
        let object = try #require(try JSONSerialization.jsonObject(with: item.raw) as? [String: Any])
        let articleData = try #require(object["articleData"] as? [String: Any])
        #expect(articleData["someFutureField"] as? String == "kept",
                "a field the app does not model yet must survive, or it would need a release to read")
    }

    @Suite("Visibility")
    struct Visibility {

        private func item(status: String, universities: [String] = [], years: [String] = []) -> LedgerItem {
            let (items, _) = LedgerDecoder.decode([[
                "id": "A1", "kind": "article", "title": "T", "subjectId": "S", "status": status,
                "articleData": ["universityIds": universities, "yearIds": years],
            ]])
            return items[0]
        }

        @Test("only published content reaches a student")
        func publishedOnly() {
            #expect(item(status: "Published").isStudentVisible)
            #expect(!item(status: "Draft").isStudentVisible)
            #expect(!item(status: "In review").isStudentVisible)
            #expect(!item(status: "Archived").isStudentVisible)
        }

        /// Scope itself is covered in AudienceTests, against the formats the
        /// live catalogue actually uses. This only checks the decoder hands the
        /// tags through.
        @Test("scope tags survive decoding")
        func scopeDecoded() {
            let scoped = item(status: "Published", universities: ["OMS"], years: ["OMS_Y2"])
            #expect(scoped.universityIds == ["OMS"])
            #expect(scoped.yearIds == ["OMS_Y2"])
        }

        @Test("an item with no scope recorded applies to everyone")
        func emptyScopeIsUnrestricted() {
            let unrestricted = item(status: "Published")
            #expect(unrestricted.inScope(StudentAudience(universityId: "oms", year: "Year 2")))
            #expect(unrestricted.inScope(.unknown))
        }
    }
}
