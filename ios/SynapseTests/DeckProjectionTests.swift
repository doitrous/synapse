import Foundation
import Testing
@testable import Synapse

/// Pinned to the student half of `src/data/decks.ts`. Provided decks come off the
/// content ledger; only published decks with cards are studyable, and their cards
/// synthesize into stable `providedNoteId` notes so a student's schedule survives
/// a re-publish.
struct DeckProjectionTests {

    private func deckItem(id: String, status: ContentStatus, cards: [[String: Any]], description: String = "desc") -> LedgerItem {
        let record: [String: Any] = [
            "id": id, "kind": "deck", "title": "Provided", "subjectId": "cardio",
            "status": status.rawValue,
            "deckData": ["description": description, "cards": cards],
        ]
        let raw = try! JSONSerialization.data(withJSONObject: record)
        return LedgerItem(
            id: id, kind: .deck, title: "Provided", subjectId: "cardio", status: status,
            updatedAt: nil, raw: raw, universityIds: [], yearIds: [], searchText: ""
        )
    }

    private let twoCards: [[String: Any]] = [
        ["id": "c1", "front": "Front 1", "back": "Back 1"],
        ["id": "c2", "front": "Front 2", "back": "Back 2"],
    ]

    @Test func projectsAPublishedDeckWithCards() {
        let decks = DeckProjection.providedDecks(from: [deckItem(id: "d1", status: .published, cards: twoCards)])
        #expect(decks.count == 1)
        #expect(decks[0].id == "d1")
        #expect(decks[0].description == "desc")
        #expect(decks[0].cards.map(\.id) == ["c1", "c2"])
        #expect(decks[0].cards[0].front == "Front 1")
        #expect(decks[0].cards[1].back == "Back 2")
    }

    @Test func dropsADraftDeck() {
        let decks = DeckProjection.providedDecks(from: [deckItem(id: "d1", status: .draft, cards: twoCards)])
        #expect(decks.isEmpty)
    }

    @Test func dropsAPublishedDeckWithNoCards() {
        let decks = DeckProjection.providedDecks(from: [deckItem(id: "d1", status: .published, cards: [])])
        #expect(decks.isEmpty)
    }

    @Test func ignoresNonDeckItems() {
        // A non-deck LedgerItem must not be projected even if it slips in.
        let article = LedgerItem(
            id: "a1", kind: .article, title: "T", subjectId: "s", status: .published,
            updatedAt: nil, raw: Data("{}".utf8), universityIds: [], yearIds: [], searchText: ""
        )
        #expect(DeckProjection.providedDecks(from: [article]).isEmpty)
    }

    @Test func synthesizesStableProvidedNotes() {
        let deck = DeckProjection.providedDecks(from: [deckItem(id: "d1", status: .published, cards: twoCards)])[0]
        let notes = DeckProjection.synthesizedNotes(for: deck)
        #expect(notes.map(\.id) == ["provided:d1:c1", "provided:d1:c2"])
        #expect(notes.allSatisfy { $0.type == .basic && $0.deckId == "d1" })
        #expect(notes[0].fields.front == "Front 1")
        // createdAt is the catalogue index, so ordering is stable and clock-free.
        #expect(notes.map(\.createdAt) == ["00000000", "00000001"])
    }

    @Test func theDeckRecordIsMarkedProvidedViaSourceId() {
        let deck = DeckProjection.providedDecks(from: [deckItem(id: "d1", status: .published, cards: twoCards)])[0]
        #expect(DeckProjection.deckRecord(for: deck).sourceId == "d1")
    }
}
