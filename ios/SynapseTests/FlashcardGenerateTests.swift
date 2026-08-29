import Foundation
import Testing
@testable import Synapse

/// Pinned to `src/data/flashcards/generate.ts`, mirroring `generate.test.ts`.
struct FlashcardGenerateTests {
    private let now = ISO8601DateFormatter.synapse.date(from: "2026-08-20T09:00:00.000Z")!
    private let scheduler = SM2Scheduler()

    private var basic: FlashcardNote {
        FlashcardNote(id: "n1", type: .basic, deckId: "d1", tags: [], createdAt: "", updatedAt: "",
                      fields: NoteFields(front: "Q", back: "A"),
                      image: nil, imageWidth: nil, imageHeight: nil, occluders: nil, groups: nil, mode: nil)
    }
    private var cloze: FlashcardNote {
        FlashcardNote(id: "n2", type: .cloze, deckId: "d1", tags: [], createdAt: "", updatedAt: "",
                      fields: NoteFields(text: "{{c1::a}} {{c2::b}} {{c1::c}}", extra: ""),
                      image: nil, imageWidth: nil, imageHeight: nil, occluders: nil, groups: nil, mode: nil)
    }
    private var occ: FlashcardNote {
        FlashcardNote(id: "n3", type: .imageOcclusion, deckId: "d1", tags: [], createdAt: "", updatedAt: "",
                      fields: NoteFields(back: "", header: ""),
                      image: "synapse-media:img", imageWidth: 100, imageHeight: 100,
                      occluders: [
                        Occluder(id: "o1", shape: OccluderShape(kind: .rect, x: 0, y: 0, w: 10, h: 10), label: "", groupId: nil),
                        Occluder(id: "o2", shape: OccluderShape(kind: .rect, x: 20, y: 0, w: 10, h: 10), label: "", groupId: "g1"),
                        Occluder(id: "o3", shape: OccluderShape(kind: .rect, x: 40, y: 0, w: 10, h: 10), label: "", groupId: "g1"),
                      ],
                      groups: [OccluderGroup(id: "g1", label: "pair")], mode: .hideAll)
    }

    @Test func aBasicNoteMakesOneCard() {
        #expect(CardGen.templateKeys(basic) == ["card"])
        #expect(CardGen.cards(basic)[0].id == "n1::card")
    }

    @Test func aClozeNoteMakesOneCardPerDistinctNumber() {
        #expect(CardGen.templateKeys(cloze) == ["c1", "c2"])
        #expect(CardGen.cards(cloze).map { $0.id } == ["n2::c1", "n2::c2"])
    }

    @Test func groupedOccludersMakeOneCardForTheGroupPlusOnePerUngrouped() {
        #expect(CardGen.templateKeys(occ).sorted() == ["g1", "o1"])
        #expect(CardGen.cards(occ).count == 2)
    }

    @Test func editingANoteKeepsUnaffectedSiblingsAndOtherNotesUntouched() {
        let studied = CardSchedule(state: .review, step: 0, interval: 30, ease: 2.6, lapses: 1, reps: 8, due: ISO8601DateFormatter.synapse.string(from: now), stability: nil, difficulty: nil)
        let other = newCardMeta(scheduler.newCard(now: now))
        let before: [String: CardMeta] = [
            "n2::c1": newCardMeta(studied),
            "n2::c2": newCardMeta(scheduler.newCard(now: now)),
            "z1::card": other, // a different note — must survive
        ]
        var edited = cloze
        edited.fields.text = "{{c1::a}} {{c2::b}} {{c3::new}}"
        let after = CardGen.reconcileInMeta(edited, allMeta: before, scheduler: scheduler, now: now)

        #expect(after["n2::c1"]?.schedule.interval == 30) // c1 keeps its earned schedule
        #expect(after["n2::c3"] != nil) // c3 is created fresh
        #expect(after["n2::c3"]?.schedule.state == .new)
        #expect(after["z1::card"] == other) // a card from another note is untouched
    }

    @Test func removingAClozeNumberDropsOnlyItsCard() {
        let before: [String: CardMeta] = [
            "n2::c1": newCardMeta(scheduler.newCard(now: now)),
            "n2::c2": newCardMeta(scheduler.newCard(now: now)),
        ]
        var edited = cloze
        edited.fields.text = "{{c1::a}}"
        let after = CardGen.reconcileInMeta(edited, allMeta: before, scheduler: scheduler, now: now)
        #expect(after["n2::c1"] != nil)
        #expect(after["n2::c2"] == nil)
    }
}
