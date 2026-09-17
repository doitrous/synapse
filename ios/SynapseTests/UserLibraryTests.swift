import Foundation
import Testing
@testable import Synapse

/// What a student has read, and what they call things.
///
/// Both keys are the website's, and both are in the user-owned list — a
/// mismatch would route a student's reading history to the shared catalogue,
/// where the server refuses their writes and their work simply is not there
/// when they open a laptop.
@MainActor
struct UserLibraryTests {

    @Test func bothKeysAreTheWebsAndBelongToTheStudent() {
        #expect(UserLibrary.readKey == "nishany.library.read")
        #expect(UserLibrary.tagsKey == "nishany.library.personalTags")
        #expect(StateOwnership.isUserOwned(UserLibrary.readKey))
        #expect(StateOwnership.isUserOwned(UserLibrary.tagsKey))
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
