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

    /// Two-level grouping, a port of `src/data/resourceGrouping.test.ts`:
    /// subject/module folders of chapter subfolders, nothing ever dropped.
    @Suite("Grouping")
    struct Grouping {

        private func r(subject: String, modules: [String] = [], chapter: String? = nil) -> LibraryResource {
            LibraryResource(
                id: "\(subject)-\(modules.first ?? "")-\(chapter ?? "")",
                title: "\(subject) \(chapter ?? "")", type: .book, subjectId: subject,
                source: "—", meta: "", year: nil, chapters: chapter.map { [$0] } ?? [],
                modules: modules, hasFile: true
            )
        }

        private func total(_ folders: [ResourceModel.Folder]) -> Int {
            folders.reduce(0) { $0 + $1.resources.count }
        }

        @Test("off-catalogue subjects are grouped, not dropped")
        func offCatalogueKept() {
            let items = [r(subject: "medical"), r(subject: "medical"), r(subject: "cvs")]
            let folders = ResourceModel.group(items, by: .system)
            #expect(folders.map(\.id) == ["cvs", "medical"])
            #expect(total(folders) == items.count)
        }

        @Test("nothing is lost under either grouping")
        func nothingLost() {
            let items = [
                r(subject: "medical", modules: ["CVS 01"]),
                r(subject: "cvs"),
                r(subject: "zzz", modules: ["RES 02"]),
            ]
            for grouping in [ResourceModel.Grouping.system, .module] {
                #expect(total(ResourceModel.group(items, by: grouping)) == items.count)
            }
        }

        @Test("catalogue subjects keep catalogue order, then the rest")
        func catalogueOrder() {
            let items = [r(subject: "renal"), r(subject: "aaa"), r(subject: "cvs"), r(subject: "bbb")]
            let folders = ResourceModel.group(items, by: .system)
            #expect(folders.map(\.id) == ["cvs", "renal", "aaa", "bbb"])
        }

        @Test("a resource with no subject lands in one trailing folder")
        func noSubjectTrailing() {
            let folders = ResourceModel.group([r(subject: ""), r(subject: "cvs")], by: .system)
            #expect(folders.map(\.id) == ["cvs", ResourceModel.ungrouped])
            #expect(folders.last?.subjectId == nil)
        }

        /// Catalogue names each subject folder; an off-catalogue id shows its
        /// own uppercased code rather than vanishing.
        @Test("catalogue names label subject folders; unknown ids show their code")
        func subjectNames() {
            let folders = ResourceModel.group([r(subject: "cvs"), r(subject: "zzz")], by: .system)
            #expect(folders.map(\.title) == ["Cardiovascular", "ZZZ"])
        }

        @Test("module folders sort naturally, so CVS 2 precedes CVS 10")
        func moduleNaturalSort() {
            let items = [
                r(subject: "cvs", modules: ["CVS 10"]),
                r(subject: "cvs", modules: ["CVS 2"]),
                r(subject: "cvs", modules: ["CVS 1"]),
            ]
            #expect(ResourceModel.group(items, by: .module).map(\.id) == ["CVS 1", "CVS 2", "CVS 10"])
        }

        @Test("resources with no module collect in one folder at the end")
        func noModuleTrailing() {
            let items = [r(subject: "cvs"), r(subject: "cvs", modules: ["CVS 01"]), r(subject: "resp")]
            let folders = ResourceModel.group(items, by: .module)
            #expect(folders.map(\.id) == ["CVS 01", ResourceModel.ungrouped])
            #expect(folders.last?.resources.count == 2)
        }

        @Test("a module folder takes its colour from the first resource in it")
        func moduleColour() {
            let folders = ResourceModel.group([r(subject: "resp", modules: ["RES 02"])], by: .module)
            #expect(folders.first?.subjectId == "resp")
        }

        @Test("chapters become subfolders; chapterless items collect under one key")
        func chapterSubfolders() {
            let items = [
                r(subject: "cvs", chapter: "Ch. 1"),
                r(subject: "cvs", chapter: "Ch. 1"),
                r(subject: "cvs", chapter: "Ch. 2"),
                r(subject: "cvs"),
            ]
            let folder = ResourceModel.group(items, by: .system).first
            #expect(folder?.subfolders.map(\.key) == ["Ch. 1", "Ch. 2", ResourceModel.noChapter])
            #expect(folder?.subfolders.first?.items.count == 2)
            #expect(folder?.subfolders.last?.chapter == nil)
        }

        @Test("an empty list produces no folders")
        func empty() {
            #expect(ResourceModel.group([], by: .system).isEmpty)
            #expect(ResourceModel.group([], by: .module).isEmpty)
        }
    }
}
