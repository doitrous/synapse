import Foundation

/// Admin-authored ("provided") decks, projected from the content ledger. A port
/// of the student half of `src/data/decks.ts`.
///
/// A provided deck's *content* comes from the catalogue and is never stored on
/// the device; only the student's own schedule for each card lives in their
/// synced collection, keyed by a stable id (`providedNoteId`) so it follows the
/// card even as the catalogue is re-published. That is what lets an admin fix a
/// typo in a deck without resetting anyone's progress.
///
/// Provided decks carry no university/year scope on the web — they are offered
/// to everyone — so nothing here re-scopes them; `LocalStore.items` has already
/// applied the (empty) scope by the time they arrive.

struct DeckCard: Equatable, Sendable {
    var id: String
    var front: String
    var back: String
}

/// A deck as a student sees it: content only, no per-student scheduling.
struct StudentDeck: Equatable, Identifiable, Sendable {
    var id: String
    var title: String
    var subjectId: String
    var description: String
    var cards: [DeckCard]
}

enum DeckProjection {

    /// Project the `deck` ledger items a student may study. A published deck
    /// with no cards has nothing to study and is dropped, matching
    /// `managedDeckToStudentDeck` returning null. (`decks.ts:95-106`)
    static func providedDecks(from items: [LedgerItem]) -> [StudentDeck] {
        items.compactMap { item in
            guard item.kind == .deck, item.isStudentVisible else { return nil }
            guard
                let record = try? JSONSerialization.jsonObject(with: item.raw) as? [String: Any],
                let data = record["deckData"] as? [String: Any]
            else { return nil }

            let cards = (data["cards"] as? [[String: Any]] ?? []).compactMap { card -> DeckCard? in
                guard let id = card["id"] as? String else { return nil }
                return DeckCard(id: id, front: card["front"] as? String ?? "", back: card["back"] as? String ?? "")
            }
            guard !cards.isEmpty else { return nil }

            return StudentDeck(
                id: item.id,
                title: item.title,
                subjectId: item.subjectId,
                description: data["description"] as? String ?? "",
                cards: cards
            )
        }
    }

    /// The synthesized `DeckRecord` a provided deck shows as, when the student
    /// has not stored their own (a stored one carries a scheduler override).
    static func deckRecord(for deck: StudentDeck) -> DeckRecord {
        DeckRecord(id: deck.id, name: deck.title, sourceId: deck.id, config: nil, createdAt: "")
    }

    /// The notes a provided deck's cards synthesize into — Basic notes keyed by
    /// `providedNoteId` so a student's schedule is stable across re-publishes.
    /// `createdAt` is the catalogue index (zero-padded) so ordering is stable and
    /// clock-free, matching the deck's own card order.
    static func synthesizedNotes(for deck: StudentDeck) -> [FlashcardNote] {
        deck.cards.enumerated().map { index, card in
            let stamp = String(format: "%08d", index)
            return FlashcardNote(
                id: providedNoteId(deck.id, card.id), type: .basic, deckId: deck.id, tags: [],
                createdAt: stamp, updatedAt: stamp,
                fields: NoteFields(front: card.front, back: card.back),
                image: nil, imageWidth: nil, imageHeight: nil, occluders: nil, groups: nil, mode: nil
            )
        }
    }
}
