import Foundation

/// A note's generated cards, and the identity that lets an edit keep history. A
/// port of `src/data/flashcards/generate.ts`.
///
/// Regenerating is idempotent: the same note yields the same card ids every
/// time, so reconciliation can diff "what the note generates now" against "what
/// the student has a schedule for" and touch only the difference — a new cloze
/// number adds a card, a deleted occluder removes one, and every sibling in
/// between keeps its schedule untouched.
enum CardGen {
    /// The cards a note currently generates, in stable order. (`generate.ts:23-31`)
    static func cards(_ note: FlashcardNote) -> [Card] {
        templateKeys(note).map { key in
            Card(id: cardId(note.id, key), noteId: note.id, deckId: note.deckId, templateKey: key)
        }
    }

    /// Basic → `["card"]`; Cloze → `c{n}` per distinct number; Image-Occlusion →
    /// group ids then ungrouped occluder ids, each in authoring order.
    /// (`generate.ts:33-46`)
    static func templateKeys(_ note: FlashcardNote) -> [String] {
        switch note.type {
        case .basic:
            return ["card"]
        case .cloze:
            return Cloze.numbers(note.fields.text ?? "").map { "c\($0)" }
        case .imageOcclusion:
            let groupKeys = (note.groups ?? []).map { $0.id }
            let ungrouped = (note.occluders ?? []).filter { $0.groupId == nil }.map { $0.id }
            return groupKeys + ungrouped
        }
    }

    /// Bring a note's stored `meta` in line with the cards it now generates. New
    /// cards get a fresh, due-now schedule; cards that no longer exist are
    /// dropped; survivors keep exactly what they had. (`generate.ts:54-66`)
    static func reconcile(
        _ note: FlashcardNote, existing: [String: CardMeta], scheduler: Scheduler, now: Date
    ) -> [String: CardMeta] {
        let wanted = Set(cards(note).map { $0.id })
        var next: [String: CardMeta] = [:]
        for id in wanted {
            next[id] = existing[id] ?? newCardMeta(scheduler.newCard(now: now))
        }
        return next
    }

    /// Reconcile a whole collection's meta after a note changes, preserving the
    /// meta of every card that belongs to a *different* note — identified by the
    /// `noteId::` id prefix. (`generate.ts:73-90`)
    static func reconcileInMeta(
        _ note: FlashcardNote, allMeta: [String: CardMeta], scheduler: Scheduler, now: Date
    ) -> [String: CardMeta] {
        let noteCardIds = Set(cards(note).map { $0.id })
        let prefix = "\(note.id)::"
        var next: [String: CardMeta] = [:]
        for (id, meta) in allMeta where !id.hasPrefix(prefix) {
            next[id] = meta
        }
        for id in noteCardIds {
            next[id] = allMeta[id] ?? newCardMeta(scheduler.newCard(now: now))
        }
        return next
    }
}
