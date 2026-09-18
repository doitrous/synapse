import SwiftUI
import UIKit

/// The live hall: the roster up top, chat below. Minimising keeps the model and
/// socket alive (the shell holds it); leaving tears it down for good.
///
/// Named apart from the legacy `RoomView` in `StudyTogetherView.swift`, which is
/// the separate shared-quiz surface kept for a later in-room activity.
struct RoomHallView: View {
    @Environment(\.strings) private var strings
    @Bindable var model: RoomModel
    let onMinimize: () -> Void
    let onLeave: () async -> Void

    @State private var whisperTo: RoomMember?
    @State private var leaving = false

    var body: some View {
        VStack(spacing: 0) {
            header
            if let label = model.connectionLabel { banner(label) }
            ScrollView {
                RoomRosterView(
                    members: model.members,
                    speaking: model.speaking,
                    mutedMembers: model.mutedMembers,
                    myUserId: model.myUserId,
                    onWhisper: { whisperTo = $0 },
                    onToggleMute: toggleMute,
                    onBlock: { model.block($0.userId) }
                )
                .padding(.vertical, 10)
            }
            .frame(maxHeight: 200)
            .background(Theme.paper)
            Rectangle().fill(Theme.line).frame(height: 0.5)
            RoomChatView(
                messages: model.messages,
                members: model.members,
                myUserId: model.myUserId,
                draft: $model.draft,
                whisperTo: $whisperTo,
                onSend: handleSend
            )
        }
        .background(Theme.paper)
        .task { model.connect() }
    }

    private var header: some View {
        HStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 2) {
                Text(model.party.name)
                    .font(Theme.ui(17, weight: 600)).foregroundStyle(Theme.ink).lineLimit(1)
                Button {
                    UIPasteboard.general.string = model.party.code
                } label: {
                    HStack(spacing: 4) {
                        Text(model.party.code).font(Theme.numeric(13))
                        Image(systemName: "doc.on.doc").font(.system(size: 11))
                    }
                    .foregroundStyle(Theme.ink3)
                }
            }
            Spacer()
            Button(strings("Minimize"), action: onMinimize)
                .font(Theme.ui(14)).foregroundStyle(Theme.primary)
            Button {
                leaving = true
                Task { await onLeave(); leaving = false }
            } label: {
                Text(strings("Leave")).font(Theme.ui(14, weight: 600)).foregroundStyle(Theme.danger)
            }
            .disabled(leaving)
        }
        .padding(.horizontal, 16).padding(.vertical, 10)
        .background(Theme.surface)
    }

    private func banner(_ text: String) -> some View {
        Text(strings(text))
            .font(Theme.ui(12)).foregroundStyle(Theme.ink2)
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.horizontal, 16).padding(.vertical, 6)
            .background(Theme.surface2)
    }

    private func handleSend() {
        let text = model.draft.trimmingCharacters(in: .whitespaces)
        guard !text.isEmpty else { return }
        if let target = whisperTo {
            model.whisper(text, to: target.userId)
            model.draft = ""
            whisperTo = nil
        } else {
            model.send()
        }
    }

    private func toggleMute(_ member: RoomMember) {
        if model.mutedMembers.contains(member.userId) {
            model.mutedMembers.remove(member.userId)
        } else {
            model.mutedMembers.insert(member.userId)
        }
    }
}
