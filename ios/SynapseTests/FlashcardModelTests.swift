import Foundation
import Testing
@testable import Synapse

/// Pinned to `src/data/flashcards/model.ts`. The collection is the synced
/// document, so these tests guard the wire shape: nullable fields stay explicit
/// `null` (not omitted), type-specific note fields stay absent when unused, and
/// the whole thing round-trips through JSON unchanged.
struct FlashcardModelTests {
    private let now = ISO8601DateFormatter.synapse.date(from: "2026-01-01T00:00:00.000Z")!

    private func json<T: Encodable>(_ value: T) throws -> String {
        String(data: try JSONEncoder().encode(value), encoding: .utf8)!
    }

    // MARK: helpers

    @Test func cardIdComposesNoteAndTemplateKey() {
        #expect(cardId("note1", "c2") == "note1::c2")
    }

    @Test func providedNoteIdIsDeckScoped() {
        #expect(providedNoteId("deckA", "cardX") == "provided:deckA:cardX")
    }

    @Test func flagOrderIsAnkiOrder() {
        #expect(FLAG_ORDER == [.red, .orange, .green, .blue, .pink, .turquoise, .purple])
    }

    @Test func newCardMetaHasNoHistory() {
        let meta = newCardMeta(SM2Scheduler().newCard(now: now))
        #expect(meta.reviewCount == 0)
        #expect(meta.flag == nil)
        #expect(meta.suspended == false)
        #expect(meta.resetSinceReview == false)
        #expect(meta.buriedUntil == nil)
    }

    // MARK: wire shape — explicit nulls vs omission

    @Test func cardMetaWritesNullableFieldsAsExplicitNull() throws {
        let text = try json(newCardMeta(SM2Scheduler().newCard(now: now)))
        #expect(text.contains("\"flag\":null"))
        #expect(text.contains("\"buriedUntil\":null"))
        #expect(text.contains("\"firstReviewedAt\":null"))
        #expect(text.contains("\"lastReviewedAt\":null"))
    }

    @Test func anSM2ScheduleOmitsFSRSFields() throws {
        let text = try json(SM2Scheduler().newCard(now: now))
        #expect(!text.contains("stability"))
        #expect(!text.contains("difficulty"))
    }

    @Test func aReviewEventWritesGradeNullForNonGradeKinds() throws {
        let event = ReviewEvent(
            id: "e1", at: "2026-01-01T00:00:00.000Z", cardId: "n::card", noteId: "n", deckId: "d",
            kind: .suspend, grade: nil, stateBefore: .review, stateAfter: .review,
            intervalBefore: 10, intervalAfter: 10, timeSpentMs: nil, scheduler: .sm2, localDay: "2026-01-01"
        )
        let text = try json(event)
        #expect(text.contains("\"grade\":null"))
        #expect(text.contains("\"timeSpentMs\":null"))
    }

    @Test func aBasicNoteOmitsFieldsItDoesNotUse() throws {
        let note = FlashcardNote(
            id: "n1", type: .basic, deckId: "d", tags: [], createdAt: "t", updatedAt: "t",
            fields: NoteFields(front: "Q", back: "A"), image: nil, imageWidth: nil,
            imageHeight: nil, occluders: nil, groups: nil, mode: nil
        )
        let text = try json(note)
        #expect(text.contains("\"front\":\"Q\""))
        #expect(text.contains("\"back\":\"A\""))
        #expect(!text.contains("\"text\":"))
        #expect(!text.contains("\"audio\":"))
        #expect(!text.contains("\"image\":"))
    }

    // MARK: round-trip

    @Test func aFullCollectionRoundTripsThroughJSON() throws {
        let sched = SM2Scheduler()
        let basic = FlashcardNote(
            id: "n1", type: .basic, deckId: "d1", tags: ["cardio"], createdAt: "t1", updatedAt: "t1",
            fields: NoteFields(front: "front", back: "back", audio: "nishany-media:a1"),
            image: nil, imageWidth: nil, imageHeight: nil, occluders: nil, groups: nil, mode: nil
        )
        let cloze = FlashcardNote(
            id: "n2", type: .cloze, deckId: "d1", tags: [], createdAt: "t2", updatedAt: "t2",
            fields: NoteFields(text: "The {{c1::heart}} pumps blood.", extra: "note"),
            image: nil, imageWidth: nil, imageHeight: nil, occluders: nil, groups: nil, mode: nil
        )
        let occlusion = FlashcardNote(
            id: "n3", type: .imageOcclusion, deckId: "d1", tags: [], createdAt: "t3", updatedAt: "t3",
            fields: NoteFields(back: "extra", header: "Heart"),
            image: "nishany-media:img1", imageWidth: 800, imageHeight: 600,
            occluders: [
                Occluder(id: "o1", shape: OccluderShape(kind: .rect, x: 1, y: 2, w: 3, h: 4), label: "aorta", groupId: nil),
                Occluder(id: "o2", shape: OccluderShape(kind: .polygon, points: [OcclusionPoint(x: 0, y: 0), OcclusionPoint(x: 5, y: 5)]), label: "apex", groupId: "g1"),
            ],
            groups: [OccluderGroup(id: "g1", label: "left")],
            mode: .hideAll
        )
        let collection = FlashcardCollection(
            version: 2,
            decks: ["d1": DeckRecord(id: "d1", name: "Deck 1", sourceId: nil, config: DeckConfig(scheduler: .fsrs, newPerDay: 20, maxReviewsPerDay: 200), createdAt: "t0")],
            notes: ["n1": basic, "n2": cloze, "n3": occlusion],
            meta: [
                "n1::card": newCardMeta(sched.newCard(now: now)),
                "n2::c1": newCardMeta(sched.grade(sched.newCard(now: now), answer: .good, now: now)),
            ]
        )

        let data = try JSONEncoder().encode(collection)
        let decoded = try JSONDecoder().decode(FlashcardCollection.self, from: data)
        #expect(decoded == collection)
    }

    @Test func decodesAWebShapedCardMetaWithExplicitNulls() throws {
        let jsonText = """
        {"schedule":{"state":"new","step":0,"interval":0,"ease":2.5,"lapses":0,"reps":0,"due":"2026-01-01T00:00:00.000Z"},
        "flag":null,"suspended":false,"buriedUntil":null,"reviewCount":0,"resetSinceReview":false,
        "firstReviewedAt":null,"lastReviewedAt":null}
        """
        let meta = try JSONDecoder().decode(CardMeta.self, from: Data(jsonText.utf8))
        #expect(meta.flag == nil)
        #expect(meta.reviewCount == 0)
        #expect(meta.schedule.state == .new)
        #expect(meta.schedule.stability == nil)
    }
}
