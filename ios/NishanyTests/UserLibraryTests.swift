import Foundation
import Testing
@testable import Nishany

/// What a student has read, and what they call things.
///
/// Both keys are the website's, and both are in the user-owned list — a
/// mismatch would route a student's reading history to the shared catalogue,
/// where the server refuses their writes and their work simply is not there
/// when they open a laptop.
@MainActor
struct UserLibraryTests {

    @Test func bothKeysAreTheWebsAndBelongToTheStudent() {
        #expect(UserLibrary.readKey == "synapse.library.read")
        #expect(UserLibrary.tagsKey == "synapse.library.personalTags")
        #expect(UserLibrary.marksKey == "nishany.library.marks.v1")
        #expect(StateOwnership.isUserOwned(UserLibrary.readKey))
        #expect(StateOwnership.isUserOwned(UserLibrary.tagsKey))
        #expect(StateOwnership.isUserOwned(UserLibrary.marksKey))
    }

    /// A highlight made on resolved words is stored on the article it sits on;
    /// its note can be edited and it can be removed.
    @Test func aMarkCanBeAddedEditedAndRemoved() async {
        let library = UserLibrary()
        await library.load()

        let text = "The left ventricle pumps blood into the aorta."
        let made = await library.addMark(
            articleID: "art-1", block: "p:0", text: text,
            range: TextRange(start: 4, end: 18), tone: "amber"
        )
        #expect(made?.anchor.exact == "left ventricle")
        #expect(library.marks(on: "art-1").count == 1)

        var edited = try! #require(made)
        edited.note = "high-yield"
        await library.updateMark(edited)
        #expect(library.marks(on: "art-1").first?.note == "high-yield")
        #expect(library.marks(on: "art-1").count == 1)

        await library.removeMark(articleID: "art-1", markID: edited.id)
        #expect(library.marks(on: "art-1").isEmpty)
    }

    /// A selection whose words cannot be anchored makes no mark, the same signal
    /// the web's `create` returns.
    @Test func anUnanchorableSelectionMakesNoMark() async {
        let library = UserLibrary()
        await library.load()
        let made = await library.addMark(
            articleID: "art-1", block: "p:0", text: "abc",
            range: TextRange(start: 2, end: 2), tone: "amber"
        )
        #expect(made == nil)
        #expect(library.marks(on: "art-1").isEmpty)
    }

    /// Nothing may be written before the first read, or an empty document would
    /// replace a student's marks with whatever this device happened to know.
    @Test func noMarkIsWrittenBeforeTheRecordHasBeenRead() async {
        let library = UserLibrary()
        let made = await library.addMark(
            articleID: "art-1", block: "p:0", text: "the aorta",
            range: TextRange(start: 4, end: 9), tone: "amber"
        )
        #expect(made == nil)
        #expect(library.marks(on: "art-1").isEmpty)
    }

    /// Tags are a personal vocabulary, so the same word twice is one tag —
    /// however it was capitalised the second time.
    @Test func aTagIsNotAddedTwiceInDifferentClothes() async {
        let library = UserLibrary()
        await library.load()

        await library.add(tag: "exam", to: "a1")
        await library.add(tag: "Exam", to: "a1")
        await library.add(tag: "  exam  ", to: "a1")

        #expect(library.tags(on: "a1") == ["exam"])
    }

    @Test func blankTagsAreNotTags() async {
        let library = UserLibrary()
        await library.load()

        await library.add(tag: "   ", to: "a1")
        await library.add(tag: "", to: "a1")
        #expect(library.tags(on: "a1").isEmpty)
    }

    /// The reuse row exists so a personal vocabulary does not splinter into
    /// "exam", "Exam" and "exams".
    @Test func everyTagUsedAnywhereIsOfferedBack() async {
        let library = UserLibrary()
        await library.load()

        await library.add(tag: "exam", to: "a1")
        await library.add(tag: "weak", to: "a1")
        await library.add(tag: "exam", to: "a2")

        #expect(library.allTags == ["exam", "weak"])
        #expect(library.articles(taggedWith: "EXAM") == ["a1", "a2"])
    }

    /// Removing the last tag clears the entry rather than leaving an empty
    /// list behind in a record that is rewritten whole.
    @Test func removingTheLastTagRemovesTheEntry() async {
        let library = UserLibrary()
        await library.load()

        await library.add(tag: "exam", to: "a1")
        await library.remove(tag: "exam", from: "a1")
        #expect(library.tags(on: "a1").isEmpty)
        #expect(library.allTags.isEmpty)
    }

    /// Read is a set of what has been read. An explicit false says the same
    /// thing as no entry while taking up room forever.
    @Test func unreadingAnArticleRemovesItRatherThanRecordingFalse() async {
        let library = UserLibrary()
        await library.load()

        await library.toggleRead("a1")
        #expect(library.hasRead("a1"))
        #expect(library.readCount == 1)

        await library.toggleRead("a1")
        #expect(!library.hasRead("a1"))
        #expect(library.readCount == 0)
        #expect(library.read.isEmpty)
    }

    /// Nothing may be written before the first read succeeds, or an empty map
    /// would replace a term's reading history.
    @Test func nothingIsWrittenBeforeTheRecordHasBeenRead() async {
        let library = UserLibrary()

        await library.toggleRead("a1")
        await library.add(tag: "exam", to: "a1")

        #expect(!library.hasRead("a1"))
        #expect(library.tags(on: "a1").isEmpty)
    }
}
