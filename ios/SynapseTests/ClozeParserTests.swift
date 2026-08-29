import Foundation
import Testing
@testable import Synapse

/// Pinned to `src/data/flashcards/cloze.ts`, mirroring `cloze.test.ts`.
struct ClozeParserTests {

    @Test func distinctNumbersEachBecomeACardSorted() {
        #expect(Cloze.numbers("a {{c2::x}} b {{c1::y}} c {{c2::z}}") == [1, 2])
    }

    @Test func aHintAfterASecondDoubleColonIsParsedApart() {
        #expect(Cloze.tokenize("{{c1::answer::hint}}") == [.cloze(number: 1, content: "answer", hint: "hint")])
    }

    @Test func theFrontHidesTheActiveClozeAndRevealsTheOthers() {
        let text = "Hyperplasia is {{c1::proliferation}} of {{c2::cells}}."
        let front = Cloze.renderSide(text, activeNumber: 1, side: .front)
        #expect(front == [
            .text("Hyperplasia is "),
            .blank(hint: nil),
            .text(" of "),
            .text("cells"),
            .text("."),
        ])
        let back = Cloze.renderSide(text, activeNumber: 1, side: .back)
        #expect(back[1] == .answer("proliferation"))
    }

    @Test func deletionsSharingANumberBlankTogether() {
        let front = Cloze.renderSide("{{c1::A}} and {{c1::B}}", activeNumber: 1, side: .front)
        #expect(front.filter { if case .blank = $0 { return true } else { return false } }.count == 2)
    }

    @Test func malformedAndEmptyClozesAreRejected() {
        #expect(Cloze.validate("no clozes here").ok == false)
        #expect(Cloze.validate("no clozes here").errors == [.noCloze])
        #expect(Cloze.validate("{{c1::}}").ok == false)
        #expect(Cloze.validate("{{c1::}}").errors.contains(.emptyDeletion))
        #expect(Cloze.validate("{{c0::x}}").errors.contains(.zeroNumber))
        #expect(Cloze.validate("half {{c1::x").errors.contains(.unbalanced))
    }

    @Test func aWellFormedClozeValidates() {
        #expect(Cloze.validate("The {{c1::mitral}} valve").ok == true)
    }

    @Test func theNextNumberIsOnePastTheHighest() {
        #expect(Cloze.nextNumber("") == 1)
        #expect(Cloze.nextNumber("{{c1::a}} {{c3::b}}") == 4)
    }

    @Test func insertingWrapsASelectionOrDropsTheCaretInside() {
        let wrapped = Cloze.insert("the mitral valve", selStart: 4, selEnd: 10, number: 1)
        #expect(wrapped.text == "the {{c1::mitral}} valve")

        let empty = Cloze.insert("abc", selStart: 3, selEnd: 3, number: 1)
        #expect(empty.text == "abc{{c1::}}")
        #expect(empty.caret == ("abc{{c1::" as NSString).length)
    }

    @Test func plainTextStripsMarkupKeepsContent() {
        #expect(Cloze.plainText("The {{c1::mitral::valve?}} one") == "The mitral one")
    }
}
