import Foundation
import Testing
@testable import Synapse

/// Records the website also writes must survive a round trip through this app
/// **whole**.
///
/// Every one of these is stored as a single document and rewritten in full.
/// Swift's `Codable` silently drops keys it does not know, so a struct missing
/// a field does not merely ignore it — it erases that field from every record
/// in the document the moment any one of them is touched here. There is no
/// error, no warning, and no way for a student to know their work is gone.
///
/// Each test below decodes JSON containing the fields the website writes and
/// asserts they are still there after re-encoding.
struct SharedRecordTests {

    private func roundTrip<T: Codable>(_ type: T.Type, _ json: String) throws -> [String: Any] {
        let decoded = try JSONDecoder().decode(type, from: Data(json.utf8))
        let data = try JSONEncoder().encode(decoded)
        return try #require(try JSONSerialization.jsonObject(with: data) as? [String: Any])
    }

    /// A note carries the article it was written from, a pasted image and the
    /// documents it references. None of those can be edited on the phone yet —
    /// which is exactly why they are the ones at risk.
    @Test func aNoteKeepsEverythingTheWebsiteWrote() throws {
        let json = """
        {
          "id": "n1", "title": "Preload", "body": "Text", "tags": ["cvs"],
          "subtopicId": "st-9", "subtopicTitle": "Cardiac output", "subjectId": "cvs",
          "imageData": "data:image/png;base64,AAAA",
          "resourceRefs": [{"resourceId": "my:42", "page": 17, "label": "thorax.pdf"}],
          "updatedAt": "2026-08-19T09:00:00.000Z"
        }
        """
        let out = try roundTrip(Note.self, json)

        #expect(out["subtopicId"] as? String == "st-9")
        #expect(out["subtopicTitle"] as? String == "Cardiac output")
        #expect(out["subjectId"] as? String == "cvs")
        #expect(out["imageData"] as? String == "data:image/png;base64,AAAA")

        let refs = try #require(out["resourceRefs"] as? [[String: Any]])
        #expect(refs.count == 1)
        #expect(refs[0]["resourceId"] as? String == "my:42")
        #expect(refs[0]["page"] as? Int == 17)
        #expect(refs[0]["label"] as? String == "thorax.pdf")
    }

    /// A note written before any of those fields existed is still a valid note,
    /// and must not gain empty ones.
    @Test func anOlderNoteIsNotGivenFieldsItNeverHad() throws {
        let json = """
        {"id": "n0", "title": "T", "body": "B", "tags": [], "updatedAt": "2026-01-01T00:00:00.000Z"}
        """
        let out = try roundTrip(Note.self, json)
        #expect(out["subtopicId"] == nil)
        #expect(out["imageData"] == nil)
        #expect(out["resourceRefs"] == nil)
    }

    @Test func aStudyBlockKeepsItsModuleAndItsTimetableLink() throws {
        let json = """
        {
          "id": "b1", "title": "Revise CVS", "date": "2026-08-19",
          "start": "09:00", "end": "10:30", "subjectId": "cvs",
          "moduleId": "CVS 01", "kind": "revision", "done": true,
          "sourceSessionId": "sess-7"
        }
        """
        let out = try roundTrip(StudyBlock.self, json)
        #expect(out["moduleId"] as? String == "CVS 01")
        #expect(out["sourceSessionId"] as? String == "sess-7")
        #expect(out["done"] as? Bool == true)
    }

    /// A bent connector is the student's own drawing. Losing the control points
    /// would silently straighten every link they had shaped.
    @Test func aWhiteboardKeepsBentConnectorsAndFrames() throws {
        let json = """
        {
          "notes": [{"id": "n1", "x": 10, "y": 20, "text": "Hi", "tone": "amber"}],
          "links": [{"id": "l1", "from": "n1", "to": "n2",
                     "c1": {"x": 1, "y": 2}, "c2": {"x": 3, "y": 4}}],
          "frames": [{"id": "f1", "x": 0, "y": 0, "width": 100, "height": 80, "title": "Loop"}]
        }
        """
        let out = try roundTrip(BoardState.self, json)

        let links = try #require(out["links"] as? [[String: Any]])
        let c1 = try #require(links[0]["c1"] as? [String: Any])
        #expect(c1["x"] as? Double == 1)

        let frames = try #require(out["frames"] as? [[String: Any]])
        #expect(frames[0]["title"] as? String == "Loop")
    }

    /// A tone this build has never heard of must not make the whole board
    /// undecodable — one new colour on the website would otherwise cost a
    /// student their entire board on the phone.
    @Test func anUnknownToneDoesNotDestroyTheBoard() throws {
        let json = """
        {"notes": [{"id": "n1", "x": 0, "y": 0, "text": "Hi", "tone": "aubergine"}],
         "links": [], "frames": []}
        """
        let board = try JSONDecoder().decode(BoardState.self, from: Data(json.utf8))
        #expect(board.notes.first?.tone == "aubergine")
    }

    /// The half-finished sitting, checked here too because it crosses platforms
    /// mid-sitting rather than between them.
    @Test func aLiveSittingKeepsEveryFieldTheWebsiteWrote() throws {
        let json = """
        {
          "questionIds": ["q1"], "idx": 0, "answers": {"q1": 2}, "checked": {"q1": true},
          "mode": "timed", "sessionId": "qb-x-yyyyy", "elapsed": 30, "visited": [0],
          "reviewing": false, "name": "Mixed 1", "phase": "running",
          "startedAt": "2026-08-19T09:00:00.000Z"
        }
        """
        let out = try roundTrip(LiveSession.self, json)
        #expect(Set(out.keys) == [
            "questionIds", "idx", "answers", "checked", "mode", "sessionId",
            "elapsed", "visited", "reviewing", "name", "phase", "startedAt",
        ])
    }
}
