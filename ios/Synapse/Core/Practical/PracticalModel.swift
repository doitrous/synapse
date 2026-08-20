import Foundation
import Observation

/// The practical surface's record of what a student has done.
///
/// Until now this platform kept none: ticks on a mark scheme lived in a
/// `@State` set and went when the screen did, so a station worked through
/// carefully left nothing behind and the same work had to be done again from
/// scratch.
@MainActor
@Observable
final class PracticalModel {

    private(set) var progress = PracticalProgress()

    /// False until the first read succeeds.
    ///
    /// One document, rewritten whole — writing before reading would replace a
    /// term's practice with whatever this device happened to know.
    private(set) var isLoaded = false

    private let api: SynapseAPI
    private let sync: SyncEngine

    init(api: SynapseAPI, sync: SyncEngine) {
        self.api = api
        self.sync = sync
    }

    func load() async {
        let remote = try? await api.userState(PracticalProgress.self, key: PracticalProgress.key)
        progress = remote?.value ?? PracticalProgress()
        isLoaded = true
    }

    private func save() async {
        await sync.write(key: PracticalProgress.key, value: progress)
    }

    private var now: String { ISO8601DateFormatter.synapse.string(from: Date()) }

    // MARK: - Recording

    /// Keep a station run.
    ///
    /// Called when the student leaves the station rather than on every tick:
    /// the record is one document, and a fifty-point mark scheme would
    /// otherwise cost fifty writes.
    func record(station: Practical, ticked: Set<String>, outOf: Int) async {
        guard isLoaded, !ticked.isEmpty else { return }
        progress.record(
            station: station.id, marks: ticked.count, outOf: outOf,
            checkedItems: ticked.sorted(), at: now
        )
        await save()
    }

    func record(case practical: Practical, reachedStep: Int, completed: Bool) async {
        guard isLoaded, !practical.decisions.isEmpty else { return }
        progress.record(
            case: practical.id, lastStep: reachedStep, steps: practical.decisions.count,
            completed: completed, at: now
        )
        await save()
    }

    func record(lab practical: Practical, answered: Int) async {
        guard isLoaded, !practical.questions.isEmpty else { return }
        progress.record(
            lab: practical.id, done: answered, items: practical.questions.count, at: now
        )
        await save()
    }

    /// Move a skill on to whatever it says next.
    func cycle(skill id: String) async {
        guard isLoaded else { return }
        progress.set(skill: id, status: progress.status(ofSkill: id).next, at: now)
        await save()
    }

    // MARK: - Reading

    /// Where a station stands, for the list.
    func station(_ id: String) -> PracticalProgress.Station? { progress.stations[id] }
    func caseProgress(_ id: String) -> PracticalProgress.Case? { progress.cases[id] }
    func lab(_ id: String) -> PracticalProgress.Lab? { progress.labs[id] }
    func skill(_ id: String) -> PracticalProgress.SkillStatus { progress.status(ofSkill: id) }

    /// The ticks from the last run, so a station resumes rather than restarts.
    func resumedTicks(_ id: String) -> Set<String> {
        Set(progress.stations[id]?.checkedItems ?? [])
    }
}
