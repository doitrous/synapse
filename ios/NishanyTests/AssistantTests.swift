import Testing
import Foundation
@testable import Nishany

/// The study assistant.
///
/// Two promises are being held here. The quota belongs to the server, so the
/// figures shown are always the ones it just returned. And a message that
/// failed to send comes back to the student rather than sitting in a transcript
/// that never got an answer.
@Suite @MainActor struct AssistantTests {

    // MARK: - What each failure means

    @Test func eachStatusTheServerUsesSaysSomethingDifferent() {
        #expect(AssistantModel.failure(for: APIError.forbidden) == .notOnPlan)
        #expect(AssistantModel.failure(for: APIError.transient(status: 429)) == .quota)
        #expect(AssistantModel.failure(for: APIError.transient(status: 503)) == .unavailable)
        // A gateway failure is ours, and reads as "try again" rather than as
        // anything about the student's plan.
        #expect(AssistantModel.failure(for: APIError.transient(status: 502)) == .error)
        #expect(AssistantModel.failure(for: APIError.malformed("x")) == .error)
        #expect(AssistantModel.failure(for: URLError(.notConnectedToInternet)) == .error)
    }

    @Test func everyFailureTellsTheStudentWhatToDoNext() {
        for failure in [AssistantFailure.quota, .notOnPlan, .unavailable, .error] {
            #expect(!failure.message.isEmpty)
        }
        #expect(AssistantFailure.quota.message.contains("midnight"))
        #expect(AssistantFailure.error.message.contains("back in the box"))
    }

    // MARK: - Availability

    @Test func noStatusMeansNoWayIn() {
        // A status that will not load is indistinguishable, from the student's
        // side, from an assistant that is switched off. Both mean: no launcher.
        let model = AssistantModel()
        #expect(!model.isAvailable)
    }

    @Test func aModelWithNoAPICannotBeAskedAnything() async {
        let model = AssistantModel()
        await model.send("What should I study?", lang: .en, context: AssistantContext())
        #expect(model.turns.isEmpty)
        #expect(!model.pending)
    }

    @Test func anEmptyMessageIsNotAMessage() async {
        let model = AssistantModel()
        await model.send("   \n  ", lang: .en, context: AssistantContext())
        #expect(model.turns.isEmpty)
    }

    // MARK: - The disclaimer

    @Test func theDisclaimerNamesTheOneThingTheAssistantMustNotBeUsedFor() {
        // Permanent, not a one-time notice: the claim it qualifies is made by
        // every answer, so it sits beside every answer.
        #expect(AssistantModel.disclaimer.contains("not clinical guidance"))
        #expect(AssistantModel.disclaimer.contains("patient"))
    }

    // MARK: - Housekeeping

    @Test func startingOverClearsTheTranscriptAndTheFailure() {
        let model = AssistantModel()
        model.reset()
        #expect(model.turns.isEmpty)
        #expect(model.failure == nil)
        #expect(model.takeReturned().isEmpty)
    }

    @Test func returnedTextIsHandedOverOnceAndNotAgain() {
        // Consumed rather than observed, so re-opening the panel does not
        // resurrect text the student already got back and sent.
        let model = AssistantModel()
        #expect(model.takeReturned().isEmpty)
        #expect(model.takeReturned().isEmpty)
    }

    // MARK: - The wire

    @Test func aStatusDecodesFromWhatTheServerActuallySends() throws {
        let json = """
        {"available":true,"reason":null,"plan":"Student","dailyMessages":30,"used":4,"remaining":26}
        """
        let status = try JSONDecoder().decode(AssistantStatus.self, from: Data(json.utf8))
        #expect(status.available)
        #expect(status.reason == nil)
        #expect(status.remaining == 26)
    }

    @Test func aRefusedStatusCarriesItsReason() throws {
        let json = """
        {"available":false,"reason":"not_on_plan","plan":"Free","dailyMessages":0,"used":0,"remaining":0}
        """
        let status = try JSONDecoder().decode(AssistantStatus.self, from: Data(json.utf8))
        #expect(!status.available)
        #expect(status.reason == "not_on_plan")
    }

    @Test func anEmptyReplyIsAFailureRatherThanAnEmptyBubble() throws {
        let json = """
        {"reply":null,"plan":"Student","dailyMessages":30,"used":5,"remaining":25}
        """
        let reply = try JSONDecoder().decode(NishanyAPI.AssistantReply.self, from: Data(json.utf8))
        #expect(reply.reply == nil)
    }

    @Test func theContextSentUpIsOnlyWhatWasSet() throws {
        // Nils are omitted rather than sent as null: the server reads this
        // straight into a prompt, and "Currently looking at: null" is worse
        // than saying nothing about where the student is.
        let data = try JSONEncoder().encode(AssistantContext(surface: "Question Bank"))
        let json = try #require(try JSONSerialization.jsonObject(with: data) as? [String: Any])
        #expect(json["surface"] as? String == "Question Bank")
        #expect(json["year"] == nil)
        #expect(json["dueToday"] == nil)
    }
}
