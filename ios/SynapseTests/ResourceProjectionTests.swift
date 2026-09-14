import Foundation
import Testing
@testable import Synapse

/// Mirrors `useLiveResources.ts`.
struct ResourceProjectionTests {

    private func item(_ record: [String: Any]) -> LedgerItem {
        var full: [String: Any] = [
            "id": "R1", "kind": "resource", "title": "Guyton and Hall",
            "subjectId": "SYS_CVS", "status": "Published",
        ]
        full.merge(record) { _, new in new }
        return LedgerDecoder.decode([full]).items[0]
    }

    @Test("a resource projects its authored fields")
    func projectsFields() throws {
        let resource = try #require(ResourceModel.project(item([
            "fields": ["Type": "Book", "Source": "Elsevier", "Year": "2021", "Location": "Ch. 23"],
            "resourceData": ["chapters": ["Cardiac output"], "storageKey": "uploads/guyton.pdf"],
        ])))

        #expect(resource.type == .book)
        #expect(resource.source == "Elsevier")
        #expect(resource.year == 2021)
        #expect(resource.meta == "Ch. 23")
        #expect(resource.chapter == "Cardiac output")
        #expect(resource.hasFile)
    }

    /// An unrecognised type must not drop the resource from the catalogue.
    @Test("an unknown type reads as an article")
    func unknownType() throws {
        #expect(try #require(ResourceModel.project(item(["fields": ["Type": "Podcast"]]))).type == .article)
        #expect(try #require(ResourceModel.project(item([:]))).type == .article)
    }

    /// A resource catalogued before its file is uploaded cannot be opened, and
    /// the row says so rather than offering a tap that goes nowhere.
    @Test("a resource with no uploaded file is marked unopenable")
    func missingFile() throws {
        #expect(try #require(ResourceModel.project(item(["resourceData": ["storageKey": ""]]))).hasFile == false)
        #expect(try #require(ResourceModel.project(item(["resourceData": [:] as [String: Any]]))).hasFile == false)
        #expect(try #require(ResourceModel.project(item([:]))).hasFile == false)
    }

    @Test("the chapter falls back to the field when none is authored")
    func chapterFallback() throws {
        let fromField = try #require(ResourceModel.project(item(["fields": ["Chapter": "Valves"]])))
        #expect(fromField.chapter == "Valves")

        let authoredWins = try #require(ResourceModel.project(item([
            "fields": ["Chapter": "Ignored"],
            "resourceData": ["chapters": ["Authored"]],
        ])))
        #expect(authoredWins.chapter == "Authored")

        #expect(try #require(ResourceModel.project(item([:]))).chapter == nil)
    }

    @Test("only resources project")
    func onlyResources() {
        let question = LedgerDecoder.decode([[
            "id": "Q1", "kind": "question", "title": "Q", "subjectId": "S", "status": "Published",
        ]]).items[0]
        #expect(ResourceModel.project(question) == nil)
    }

    @Suite("Grouping")
    struct Grouping {

        private func resource(_ id: String, _ title: String, chapter: String?) -> LibraryResource {
            LibraryResource(
                id: id, title: title, type: .book, subjectId: "S", source: "—", meta: "",
                year: nil, chapters: chapter.map { [$0] } ?? [], modules: [], hasFile: true
            )
        }

        @Test("resources are grouped by chapter and sorted by title")
        func groupsByChapter() {
            let folders = ResourceModel.group([
                resource("2", "Zebra", chapter: "Anatomy"),
                resource("1", "Alpha", chapter: "Anatomy"),
                resource("3", "Beta", chapter: "Physiology"),
            ])

            #expect(folders.map(\.title) == ["Anatomy", "Physiology"])
            #expect(folders[0].resources.map(\.title) == ["Alpha", "Zebra"])
        }

        /// A resource with no chapter would otherwise be invisible.
        @Test("unfiled resources are kept, and kept last")
        func unfiledLast() {
            let folders = ResourceModel.group([
                resource("1", "No chapter", chapter: nil),
                resource("2", "Filed", chapter: "Anatomy"),
            ])

            #expect(folders.map(\.title) == ["Anatomy", "Unfiled"])
            #expect(folders.last?.resources.map(\.id) == ["1"])
        }

        @Test("an empty catalogue produces no folders")
        func empty() {
            #expect(ResourceModel.group([]).isEmpty)
        }

        /// The subject axis names each folder from the ported catalogue, and an
        /// off-catalogue id (a resource tagged with a system this build doesn't
        /// list) is kept and shown by its own code rather than dropped.
        @Test("resources group by subject with catalogue names; unknown ids kept")
        func groupsBySubject() {
            func r(_ id: String, subject: String) -> LibraryResource {
                LibraryResource(
                    id: id, title: id, type: .book, subjectId: subject, source: "—",
                    meta: "", year: nil, chapters: [], modules: [], hasFile: true
                )
            }
            let titles = Set(ResourceModel.group([
                r("1", subject: "cvs"),
                r("2", subject: "resp"),
                r("3", subject: "zzz"),
            ], by: .subject).map(\.title))

            #expect(titles.contains("Cardiovascular"))
            #expect(titles.contains("Respiratory"))
            #expect(titles.contains("ZZZ"))
        }
    }
}
