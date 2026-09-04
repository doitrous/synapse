import SwiftUI

/// The voice controls on a study room: Join / Mute / Leave, a "Speaking now"
/// line, and a roster that lights the ring beside whoever is talking. Mirrors
/// `src/components/rooms/RoomControls.tsx`.
///
/// Voice is additive: when the server has no SFU, or the socket is still
/// connecting, the section says voice is unavailable and the rest of the room —
/// the quiz, the roster, the results — is untouched. The microphone is asked for
/// only on a Join tap, after the row has said why, never at cold launch.
struct RoomVoiceSection: View {
    @Environment(\.strings) private var strings
    let api: SynapseAPI
    let code: String

    @State private var controller: RoomAudioController?

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(strings("Voice"))
                .font(Theme.panelTitle())
                .foregroundStyle(Theme.ink2)

            if let controller {
                content(controller)
            } else {
                Text(strings("Connecting to the room…"))
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink3)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(16)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
        .task {
            guard controller == nil else { return }
            let channel = RoomVoiceChannel(base: api.roomVoiceBaseURL, code: code, token: api.accessTokenProvider)
            channel.start()
            controller = RoomAudioController(channel: channel)
        }
        .onDisappear {
            controller?.leave()
            controller?.channel.stop()
        }
    }

    @ViewBuilder
    private func content(_ controller: RoomAudioController) -> some View {
        switch controller.state {
        case .idle, .error:
            if controller.voiceAvailable {
                Button {
                    Task { await controller.join() }
                } label: {
                    Label(strings("Join voice"), systemImage: "mic.fill")
                        .font(Theme.ui(15, weight: 600))
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                        .background(Theme.primary)
                        .foregroundStyle(Theme.onPrimary)
                        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                }
                Text(strings("Everyone in the room can hear you. Speaking is shown live."))
                    .font(Theme.ui(12))
                    .foregroundStyle(Theme.ink3)
            } else {
                Text(controller.reason ?? Self.unavailable)
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink3)
            }
            if let reason = controller.localReason {
                Text(reason)
                    .font(Theme.ui(12))
                    .foregroundStyle(Theme.danger)
            }

        case .joining:
            HStack(spacing: 8) {
                ProgressView().controlSize(.small)
                Text(strings("Joining voice…")).font(Theme.ui(13)).foregroundStyle(Theme.ink2)
            }

        case .live:
            HStack(spacing: 10) {
                Button {
                    controller.toggleMute()
                } label: {
                    Label(controller.muted ? strings("Unmute") : strings("Mute"),
                          systemImage: controller.muted ? "mic.slash.fill" : "mic.fill")
                        .font(Theme.ui(15, weight: 600))
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                        .background(controller.muted ? Theme.surface : Theme.primaryTint)
                        .foregroundStyle(controller.muted ? Theme.ink2 : Theme.primary)
                        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.line, lineWidth: 1))
                        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                }
                Button {
                    controller.leave()
                } label: {
                    Text(strings("Leave voice"))
                        .font(Theme.ui(15, weight: 600))
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                        .background(Theme.surface)
                        .foregroundStyle(Theme.danger)
                        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.line, lineWidth: 1))
                        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                }
            }

            if controller.voiceReconnecting {
                Text(strings("Reconnecting voice…"))
                    .font(Theme.ui(12))
                    .foregroundStyle(Theme.ink3)
            } else {
                Text(controller.callActive
                     ? strings("You are in the room's voice.")
                     : (controller.reason ?? Self.unavailable))
                    .font(Theme.ui(12))
                    .foregroundStyle(controller.callActive ? Theme.ink2 : Theme.ink3)
            }

            roster(controller)
        }
    }

    /// The socket's own roster, with a ring beside whoever is speaking.
    @ViewBuilder
    private func roster(_ controller: RoomAudioController) -> some View {
        let speaking = controller.speaking
        let members = controller.members
        if !members.isEmpty {
            VStack(alignment: .leading, spacing: 6) {
                if !speaking.isEmpty {
                    Text(strings("Speaking now"))
                        .font(Theme.ui(11, weight: 600))
                        .foregroundStyle(Theme.ink3)
                }
                ForEach(members) { member in
                    HStack(spacing: 8) {
                        Circle()
                            .fill(speaking.contains(member.userId) ? Theme.success : Theme.line)
                            .frame(width: 8, height: 8)
                        Text(member.userId == controller.selfUserId ? "\(member.name) (you)" : member.name)
                            .font(Theme.ui(13))
                            .foregroundStyle(Theme.ink)
                        Spacer()
                        if speaking.contains(member.userId) {
                            Image(systemName: "waveform")
                                .font(.system(size: 12))
                                .foregroundStyle(Theme.success)
                        }
                    }
                }
            }
            .padding(.top, 4)
        }
    }

    private static let unavailable = "Voice is unavailable right now."
}
