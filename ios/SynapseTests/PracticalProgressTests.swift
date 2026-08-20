import Foundation
import Testing
@testable import Synapse

/// Pinned to `src/data/practicalProgress.ts` run under Node.
///
/// Everything recorded here is what the *student* says about their own work: a
/// station is self-marked, a skill self-rated. Nothing in this product has an
/// assessor behind it, and none of this may be presented as though it had.
struct PracticalProgressTests {

    @Test func aBestScoreOnlyEverMovesUp() {
        var progress = PracticalProgress()
        progress.record(station: "s1", marks: 12, outOf: 20, checkedItems: ["a", "b"], at: "t1")
        #expect(progress.stations["s1"] == PracticalProgress.Station(
            attempts: 1, bestMarks: 12, outOf: 20, lastAt: "t1", checkedItems: ["a", "b"]
        ))

        // A worse run still counts as an attempt and still saves its ticks, but
        // does not pull the best score down.
        progress.record(station: "s1", marks: 8, outOf: 20, checkedItems: ["a"], at: "t2")
        #expect(progress.stations["s1"] == PracticalProgress.Station(
            attempts: 2, bestMarks: 12, outOf: 20, lastAt: "t2", checkedItems: ["a"]
        ))
    }

    /// The reason the mark total is stored beside the score. A station later
    /// re-authored out of 30 must not make an old 18/20 read as 18/30 — the
    /// comparison is on the share, and the total travels with it.
    @Test func theMarkTotalTravelsWithTheScore() {
        var progress = PracticalProgress()
        progress.record(station: "s1", marks: 12, outOf: 20, checkedItems: ["a", "b"], at: "t1")
        progress.record(station: "s1", marks: 8, outOf: 20, checkedItems: ["a"], at: "t2")
        progress.record(station: "s1", marks: 18, outOf: 30, checkedItems: ["a", "b", "c"], at: "t3")

        #expect(progress.stations["s1"] == PracticalProgress.Station(
            attempts: 3, bestMarks: 18, outOf: 30, lastAt: "t3", checkedItems: ["a", "b", "c"]
        ))
    }

    /// 12/20 is a better share than 17/30, and the record must know it.
    @Test func aBiggerNumberIsNotAlwaysABetterRun() {
        var progress = PracticalProgress()
        progress.record(station: "s1", marks: 12, outOf: 20, checkedItems: [], at: "t1")
        progress.record(station: "s1", marks: 17, outOf: 30, checkedItems: [], at: "t2")

        #expect(progress.stations["s1"]?.bestMarks == 12)
        #expect(progress.stations["s1"]?.outOf == 20)
        #expect(progress.stations["s1"]?.attempts == 2)
    }

    /// Once completed, revisiting a case does not demote it — nor rewind how
    /// far the student is known to have got.
    @Test func aFinishedCaseStaysFinished() {
        var progress = PracticalProgress()
        progress.record(case: "c1", lastStep: 2, steps: 5, completed: false, at: "t1")
        #expect(progress.cases["c1"]?.status == .inProgress)
        #expect(progress.cases["c1"]?.lastStep == 2)

        progress.record(case: "c1", lastStep: 5, steps: 5, completed: true, at: "t2")
        #expect(progress.cases["c1"]?.status == .completed)

        progress.record(case: "c1", lastStep: 1, steps: 5, completed: false, at: "t3")
        #expect(progress.cases["c1"]?.status == .completed)
        #expect(progress.cases["c1"]?.lastStep == 5)
        #expect(progress.cases["c1"]?.lastAt == "t3")
    }

    @Test func aLabNeverForgetsHowFarItGot() {
        var progress = PracticalProgress()
        progress.record(lab: "l1", done: 4, items: 6, at: "t1")
        progress.record(lab: "l1", done: 2, items: 6, at: "t2")
        #expect(progress.labs["l1"]?.done == 4)
        #expect(progress.labs["l1"]?.lastAt == "t2")
    }

    /// Back to "not started" removes the entry rather than storing one: an
    /// absent record and an explicit "not started" mean the same thing, and
    /// keeping both lets the two disagree.
    @Test func clearingASkillRemovesItRatherThanRecordingNothing() {
        var progress = PracticalProgress()
        progress.set(skill: "k1", status: .practised, at: "t1")
        progress.set(skill: "k2", status: .ready, at: "t1")
        #expect(progress.skills.count == 2)

        progress.set(skill: "k1", status: .notStarted, at: "t2")
        #expect(progress.skills.keys.sorted() == ["k2"])
        #expect(progress.status(ofSkill: "k1") == .notStarted)
    }

    @Test func skillsCycleThroughTheirThreeStates() {
        #expect(PracticalProgress.SkillStatus.notStarted.next == .practised)
        #expect(PracticalProgress.SkillStatus.practised.next == .ready)
        #expect(PracticalProgress.SkillStatus.ready.next == .notStarted)
    }

    /// The total comes from the live list, so the headline cannot disagree with
    /// what is shown beneath it.
    @Test func theSummaryCountsWhatIsThere() {
        var progress = PracticalProgress()
        progress.set(skill: "k1", status: .practised, at: "t")
        progress.set(skill: "k2", status: .ready, at: "t")
        progress.set(skill: "k3", status: .ready, at: "t")

        let summary = progress.skillsSummary(total: 22)
        #expect(summary.practised == 1)
        #expect(summary.ready == 2)
        #expect(summary.total == 22)
    }

    /// The record crosses platforms, so its spellings must match the web's.
    @Test func statusesSpellThemselvesAsTheWebDoes() throws {
        var progress = PracticalProgress()
        progress.record(case: "c1", lastStep: 1, steps: 3, completed: false, at: "t")
        progress.set(skill: "k1", status: .practised, at: "t")

        let json = try #require(
            try JSONSerialization.jsonObject(with: JSONEncoder().encode(progress)) as? [String: Any]
        )
        let cases = try #require(json["cases"] as? [String: [String: Any]])
        #expect(cases["c1"]?["status"] as? String == "in-progress")

        let skills = try #require(json["skills"] as? [String: [String: Any]])
        #expect(skills["k1"]?["status"] as? String == "practised")
        #expect(json["version"] as? Int == 1)
    }
}
