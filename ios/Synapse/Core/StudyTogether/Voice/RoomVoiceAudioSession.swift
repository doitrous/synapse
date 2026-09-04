import AVFoundation
import Foundation

/// The audio session a voice call runs in.
///
/// A study-room call is two-way speech, so the category is `.playAndRecord` and
/// the mode is `.voiceChat` — which turns on echo cancellation and routes to the
/// receiver/speaker the way a phone call does. The session is activated when the
/// call starts and deactivated when it ends, so the app is not holding the audio
/// route (and the little red bar) a moment longer than a student is actually in
/// a call.
///
/// Interruptions (a phone call, Siri) and route changes (headphones pulled) are
/// the two things that silently break a call if ignored: iOS deactivates the
/// session under an interruption and does not always reactivate it afterwards,
/// and unplugging headphones can suspend I/O. Both are observed here and handed
/// back to the controller, which re-activates and tells the student if the call
/// could not be recovered.
@MainActor
final class RoomVoiceAudioSession {

    enum Interruption { case began, ended(shouldResume: Bool) }

    /// Called when the system interrupts or resumes audio.
    var onInterruption: ((Interruption) -> Void)?
    /// Called when the output route changes (headphones in/out).
    var onRouteChange: (() -> Void)?

    private var observers: [NSObjectProtocol] = []

    /// Configure and activate `.playAndRecord`/`.voiceChat`.
    ///
    /// `.allowBluetooth` and `.defaultToSpeaker` so a call behaves like a call:
    /// a paired headset is used when present, and otherwise the loudspeaker
    /// rather than the quiet earpiece, which is what a student studying with the
    /// phone on the desk expects.
    func activate() throws {
        let session = AVAudioSession.sharedInstance()
        try session.setCategory(
            .playAndRecord,
            mode: .voiceChat,
            options: [.allowBluetooth, .allowBluetoothA2DP, .defaultToSpeaker],
        )
        try session.setActive(true, options: [])
        observe(session)
    }

    /// Release the route. `.notifyOthersOnDeactivation` so a paused podcast or
    /// music app resumes when the call ends.
    func deactivate() {
        for observer in observers { NotificationCenter.default.removeObserver(observer) }
        observers.removeAll()
        try? AVAudioSession.sharedInstance().setActive(false, options: [.notifyOthersOnDeactivation])
    }

    private func observe(_ session: AVAudioSession) {
        guard observers.isEmpty else { return }
        let center = NotificationCenter.default

        observers.append(center.addObserver(
            forName: AVAudioSession.interruptionNotification, object: session, queue: .main,
        ) { [weak self] note in
            MainActor.assumeIsolated {
                guard let self,
                      let raw = note.userInfo?[AVAudioSessionInterruptionTypeKey] as? UInt,
                      let type = AVAudioSession.InterruptionType(rawValue: raw) else { return }
                switch type {
                case .began:
                    self.onInterruption?(.began)
                case .ended:
                    let options = (note.userInfo?[AVAudioSessionInterruptionOptionKey] as? UInt).map {
                        AVAudioSession.InterruptionOptions(rawValue: $0)
                    } ?? []
                    self.onInterruption?(.ended(shouldResume: options.contains(.shouldResume)))
                @unknown default:
                    break
                }
            }
        })

        observers.append(center.addObserver(
            forName: AVAudioSession.routeChangeNotification, object: session, queue: .main,
        ) { [weak self] _ in
            MainActor.assumeIsolated { self?.onRouteChange?() }
        })
    }

    /// Whether the student has already granted microphone access, without asking.
    static var micGranted: Bool {
        AVAudioApplication.shared.recordPermission == .granted
    }

    static var micDenied: Bool {
        AVAudioApplication.shared.recordPermission == .denied
    }

    /// Ask for the microphone. Only ever called from an explicit "Join voice"
    /// tap, after a row has already said why — never at cold launch. Mirrors the
    /// `PermissionPrimerRow` idiom used for notifications.
    static func requestMic() async -> Bool {
        await AVAudioApplication.requestRecordPermission()
    }
}
