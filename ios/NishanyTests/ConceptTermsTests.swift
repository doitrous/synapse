import Testing
import Foundation
@testable import Nishany

/// Which words in a sentence are concepts.
///
/// Two rules carry the whole correctness of this. Longest term first, so a
/// student pressing "heart failure" is not given a definition of "heart". And
/// whole words only, so "arterial" does not light up inside "arterioles" and
/// offer a definition of something the sentence never said.
@Suite struct ConceptTermsTests {

    func concept(_ id: String, _ label: String, aliases: [String] = [],
                 status: String? = nil, arabic: String? = nil) -> Concept {
        Concept(id: id, label: label, aliases: aliases, arabicLabel: arabic,
                definition: "A definition.", status: status)
    }

    var index: ConceptTerms {
        ConceptTerms(graph: ConceptGraph(concepts: [
            concept("CON-heart", "heart", status: "active"),
            concept("CON-hf", "heart failure", aliases: ["HF", "cardiac failure"], status: "active"),
            concept("CON-art", "arterial", status: "active"),
        ]))
    }

    // MARK: - Matching

    @Test func aLongerTermWinsOverAShorterOneInsideIt() {
        // "heart failure" must not be read as "heart" plus the word "failure".
        let pieces = index.split("Chronic heart failure is common.")
        #expect(pieces.contains { $0.text == "heart failure" && $0.conceptId == "CON-hf" })
        #expect(!pieces.contains { $0.conceptId == "CON-heart" })
    }

    @Test func aTermInsideALongerWordIsNotAMatch() {
        let pieces = index.split("The arterioles constrict.")
        #expect(pieces.allSatisfy { $0.conceptId == nil })
        #expect(pieces.map(\.text).joined() == "The arterioles constrict.")
    }

    @Test func matchingIgnoresCase() {
        let pieces = index.split("Heart Failure and HF mean the same thing.")
        #expect(pieces.filter { $0.conceptId == "CON-hf" }.count == 2)
    }

    @Test func anAliasResolvesToItsConcept() {
        let pieces = index.split("Cardiac failure was documented.")
        #expect(pieces.first?.conceptId == "CON-hf")
    }

    @Test func everySplitPutsTheSentenceBackTogether() {
        // Whatever the matching does, no character may be lost or duplicated —
        // a reader would see a mangled sentence.
        for sentence in ["Chronic heart failure is common.",
                         "heart",
                         "No concepts here at all.",
                         "heart failure heart failure",
                         ""] {
            #expect(index.split(sentence).map(\.text).joined() == sentence)
        }
    }

    @Test func consecutiveTermsAreBothFound() {
        let pieces = index.split("heart failure heart failure")
        #expect(pieces.filter { $0.conceptId == "CON-hf" }.count == 2)
    }

    @Test func aSentenceWithNoConceptsIsOnePlainPiece() {
        let pieces = index.split("Nothing here.")
        #expect(pieces.count == 1)
        #expect(pieces[0].conceptId == nil)
    }

    @Test func anEmptyGraphLeavesProseAlone() {
        let empty = ConceptTerms()
        #expect(empty.isEmpty)
        let pieces = empty.split("Chronic heart failure is common.")
        #expect(pieces.count == 1)
        #expect(pieces[0].conceptId == nil)
    }

    // MARK: - What a student may meet

    @Test func aRetiredConceptIsNotOfferedToAStudent() {
        // `active` is the only status a term should light up under.
        let index = ConceptTerms(graph: ConceptGraph(concepts: [
            concept("CON-old", "obsolete term", status: "retired"),
        ]))
        #expect(index.isEmpty)
        #expect(index.split("An obsolete term appears.")[0].conceptId == nil)
    }

    @Test func aConceptWithNoStatusIsNotOfferedEither() {
        // The website requires an explicit `active`, and most of the live graph
        // is still under review. Showing an unreviewed definition on the phone
        // that the website withholds would be the wrong way round.
        #expect(ConceptTerms(graph: ConceptGraph(concepts: [concept("CON-x", "aorta")])).isEmpty)
    }

    @Test func arabicTermsAreCarriedWhateverTheReadersLanguage() {
        let index = ConceptTerms(graph: ConceptGraph(concepts: [
            concept("CON-heart", "heart", status: "active", arabic: "القلب"),
        ]))
        #expect(index.split("يقع القلب في الصدر").contains { $0.conceptId == "CON-heart" })
        #expect(index.split("The heart is here.").contains { $0.conceptId == "CON-heart" })
    }

    // MARK: - Relationships

    @Test func aRelationshipNamesTheOtherConceptAndItsDirection() {
        let index = ConceptTerms(graph: ConceptGraph(
            relations: [ConceptRelation(sourceId: "CON-hf", type: "caused_by", targetId: "CON-heart")],
            concepts: [concept("CON-heart", "heart", status: "active"),
                       concept("CON-hf", "heart failure", status: "active")]
        ))

        let outgoing = index.relationships(for: "CON-hf")
        #expect(outgoing.count == 1)
        #expect(outgoing[0].outgoing)
        #expect(outgoing[0].other == "heart")

        // Read from the other end it is the same edge, pointing back.
        let incoming = index.relationships(for: "CON-heart")
        #expect(!incoming[0].outgoing)
        #expect(incoming[0].other == "heart failure")
    }

    @Test func anUnknownConceptIdIsNamedRatherThanLeftBlank() {
        let index = ConceptTerms(graph: ConceptGraph(
            relations: [ConceptRelation(sourceId: "CON-hf", type: "x", targetId: "CON-missing")],
            concepts: [concept("CON-hf", "heart failure", status: "active")]
        ))
        #expect(index.relationships(for: "CON-hf")[0].other == "CON-missing")
    }

    @Test func aDatabaseRelationTypeIsMadeReadable() {
        // `related_concepts` is a column value, not something to show a student.
        #expect(ConceptTerms.humanRelation("related_concepts") == "Related concepts")
        #expect(ConceptTerms.humanRelation("caused-by") == "Caused by")
        #expect(ConceptTerms.humanRelation("") == "Related")
    }

    // MARK: - Decoding

    @Test func aGraphWithConceptsButNoEdgesStillDecodes() throws {
        let json = """
        {"concepts":[{"id":"CON-1","label":"aorta","definition":"The big one."}]}
        """
        let graph = try JSONDecoder().decode(ConceptGraph.self, from: Data(json.utf8))
        #expect(graph.concepts.count == 1)
        #expect(graph.relations.isEmpty)
    }

    @Test func aGraphWithEdgesButNoConceptsStillDecodes() throws {
        let json = """
        {"relations":[{"sourceId":"a","type":"x","targetId":"b"}]}
        """
        let graph = try JSONDecoder().decode(ConceptGraph.self, from: Data(json.utf8))
        #expect(graph.relations.count == 1)
        #expect(graph.concepts.isEmpty)
    }

    @Test func theSixtyFieldsThisAppDoesNotShowDoNotStopItDecoding() throws {
        // The authored concept carries review status, merge lineage and
        // per-year weights. A change to any of them must not stop a student
        // reading an article.
        let json = """
        {"concepts":[{"id":"CON-1","label":"aorta","definition":"d",
        "examWeightByYear":{"OMS_Y2":0.4},"mergeIds":["x"],"fieldNotes":{"a":"b"},
        "somethingInventedTomorrow":{"nested":[1,2,3]}}]}
        """
        let graph = try JSONDecoder().decode(ConceptGraph.self, from: Data(json.utf8))
        #expect(graph.concepts.first?.label == "aorta")
    }
}
