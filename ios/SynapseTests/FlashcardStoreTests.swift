import Foundation
import Testing
@testable import Synapse

/// Guards the sync contract the whole flashcard feature rests on: the two keys
/// route to the student's own user-state, and the study-queue projection reads
/// the right cards out of a collection.
struct FlashcardStoreTests {
    private let now = ISO8601DateFormatter.synapse.date(from: "2026-08-20T09:00:00.000Z")!

    @Test func theFlashcardKeysAreUserOwned() {
        #expect(StateOwnership.isUserOwned(FlashcardStore.collectionKey))
        #expect(StateOwnership.isUserOwned(FlashcardStore.reviewLogKey))
        // Regression guard on the exact web key strings.
        #expect(FlashcardStore.collectionKey == "nishany.flashcards.collection.v2")
        #expect(FlashcardStore.reviewLogKey == "nishany.flashcards.reviewlog.v2")
    }

    @Test func newIdCarriesItsPrefix() {
        #expect(FlashcardStore.newId("deck").hasPrefix("deck-"))
        #expect(FlashcardStore.newId("rev").hasPrefix("rev-"))
    }

    @Test func entriesProjectADecksCardsThatHaveMeta() {
        let sched = SM2Scheduler()
        func basic(_ id: String, _ deckId: String, _ createdAt: String) -> FlashcardNote {
            FlashcardNote(id: id, type: .basic, deckId: deckId, tags: [], createdAt: createdAt, updatedAt: createdAt,
                          fields: NoteFields(front: "Q", back: "A"),
                          image: nil, imageWidth: nil, imageHeight: nil, occluders: nil, groups: nil, mode: nil)
        }
        let cloze = FlashcardNote(id: "n2", type: .cloze, deckId: "d1", tags: [], createdAt: "t2", updatedAt: "t2",
                                  fields: NoteFields(text: "{{c1::a}} {{c2::b}}", extra: ""),
                                  image: nil, imageWidth: nil, imageHeight: nil, occluders: nil, groups: nil, mode: nil)
        let collection = FlashcardCollection(
            version: 2,
            decks: ["d1": DeckRecord(id: "d1", name: "Deck", sourceId: nil, config: nil, createdAt: "t0")],
            notes: ["n1": basic("n1", "d1", "t1"), "n2": cloze, "n3": basic("n3", "d2", "t3")],
            meta: [
                "n1::card": newCardMeta(sched.newCard(now: now)),
                "n2::c1": newCardMeta(sched.newCard(now: now)),
                // n2::c2 has no meta yet — it must be dropped from the queue projection.
                // n3 belongs to another deck — it must not appear.
            ]
        )
        let entries = FlashcardStore.entries(forDeck: "d1", in: collection)
        #expect(entries.map { $0.id } == ["n1::card", "n2::c1"])
    }
}
