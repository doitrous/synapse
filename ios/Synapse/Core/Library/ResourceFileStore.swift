import Foundation
import Observation

/// Downloading and keeping the source documents.
///
/// These are textbooks — tens of megabytes each — so they are streamed to disk
/// rather than held in memory, and kept once fetched. A student who downloads
/// an anatomy PDF on wifi should still have it on the ward, which is the whole
/// reason the app exists rather than the website.
@MainActor
@Observable
final class ResourceFileStore {

    enum State: Equatable {
        case notDownloaded
        case downloading(fraction: Double)
        case ready(URL)
        case failed(String)
    }

    private(set) var states: [String: State] = [:]

    private let api: SynapseAPI
    private var tasks: [String: Task<Void, Never>] = [:]

    init(api: SynapseAPI) {
        self.api = api
    }

    func state(for id: String) -> State {
        if let known = states[id] { return known }
        // A file already on disk from a previous session.
        if let url = Self.existingFile(id) {
            states[id] = .ready(url)
            return .ready(url)
        }
        return .notDownloaded
    }

    /// Where a resource lives once downloaded.
    ///
    /// Application Support rather than Caches: the system may evict Caches
    /// under disk pressure, and a textbook silently disappearing the night
    /// before an exam is exactly the failure this app is meant to prevent.
    static func directory() throws -> URL {
        let base = try FileManager.default.url(
            for: .applicationSupportDirectory, in: .userDomainMask,
            appropriateFor: nil, create: true
        )
        let folder = base.appendingPathComponent("Synapse/Resources", isDirectory: true)
        try FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
        return folder
    }

    static func fileURL(_ id: String) -> URL? {
        // The ID comes from authored content, so it is not trusted as a path
        // component: anything but the expected shape is refused rather than
        // allowed to escape the directory.
        let safe = id.filter { $0.isLetter || $0.isNumber || $0 == "_" || $0 == "-" }
        guard safe == id, !safe.isEmpty else { return nil }
        return try? directory().appendingPathComponent("\(safe).pdf")
    }

    static func existingFile(_ id: String) -> URL? {
        guard let url = fileURL(id), FileManager.default.fileExists(atPath: url.path) else { return nil }
        return url
    }

    func download(_ id: String) {
        guard tasks[id] == nil else { return }
        if case .ready = state(for: id) { return }

        states[id] = .downloading(fraction: 0)
        tasks[id] = Task { [weak self] in
            guard let self else { return }
            defer { Task { @MainActor in self.tasks[id] = nil } }

            do {
                guard let destination = Self.fileURL(id) else {
                    await MainActor.run { self.states[id] = .failed("That resource has an unusable identifier.") }
                    return
                }
                let temporary = try await api.downloadResource(id: id) { fraction in
                    Task { @MainActor in self.states[id] = .downloading(fraction: fraction) }
                }
                // Move rather than copy, and replace any half-file from a
                // previous failed attempt.
                try? FileManager.default.removeItem(at: destination)
                try FileManager.default.moveItem(at: temporary, to: destination)

                var resourceValues = URLResourceValues()
                resourceValues.isExcludedFromBackup = true
                var mutable = destination
                try? mutable.setResourceValues(resourceValues)

                await MainActor.run { self.states[id] = .ready(destination) }
            } catch APIError.notFound {
                await MainActor.run {
                    self.states[id] = .failed("This resource has not been uploaded yet.")
                }
            } catch {
                await MainActor.run {
                    self.states[id] = .failed("Could not download it. Check your connection and try again.")
                }
            }
        }
    }

    func cancel(_ id: String) {
        tasks[id]?.cancel()
        tasks[id] = nil
        states[id] = .notDownloaded
    }

    func delete(_ id: String) {
        guard let url = Self.fileURL(id) else { return }
        try? FileManager.default.removeItem(at: url)
        states[id] = .notDownloaded
    }

    /// What the downloaded documents are costing in storage.
    static func bytesOnDisk() -> Int64 {
        guard let folder = try? directory(),
              let entries = try? FileManager.default.contentsOfDirectory(
                at: folder, includingPropertiesForKeys: [.fileSizeKey]
              )
        else { return 0 }

        return entries.reduce(0) { total, url in
            let size = (try? url.resourceValues(forKeys: [.fileSizeKey]).fileSize) ?? 0
            return total + Int64(size)
        }
    }
}
