import SwiftUI

/// The study assistant, as a sheet a student opens from where they already are.
///
/// A sheet rather than a tab: the question someone wants to ask is almost
/// always about what is on screen, and sending them to another tab to ask it
/// loses the thing they were asking about. The surface they came from is passed
/// as context for the same reason.
///
/// It is never presented when the assistant is off, unconfigured, or not on the
/// student's plan — every entry point checks first. A launcher that opens onto
/// "unavailable" is worse than no launcher.
struct StudyAssistantView: View {
    let model: AssistantModel
    /// The screen the student came from, named as the website names it.
    let surface: String

    @Environment(\.strings) private var strings
    @Environment(\.dismiss) private var dismiss

    @State private var draft = ""
    @FocusState private var composerFocused: Bool

    private var suggestions: [String] {
        ["What should I study today?",
         "Explain preload and afterload",
         "Where is heart failure covered?"]
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                transcript
                composer
            }
            .background(Theme.paper)
            .navigationTitle(strings("Study assistant"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) { titleBlock }
                if !model.turns.isEmpty {
                    ToolbarItem(placement: .topBarLeading) {
                        Button {
                            model.reset()
                            draft = ""
                        } label: {
                            Label(strings("Start over"), systemImage: "arrow.counterclockwise")
                        }
                        .tint(Theme.primary)
                    }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button(strings("Done")) { dismiss() }.tint(Theme.primary)
                }
            }
        }
        .task {
            await model.loadStatus()
            composerFocused = true
        }
    }

    /// The quota, where a student can see it before they spend it.
    private var titleBlock: some View {
        VStack(spacing: 1) {
            Text(strings("Study assistant"))
                .font(Theme.ui(15).weight(.semibold))
                .foregroundStyle(Theme.ink)
            if let status = model.status {
                Text("\(status.remaining) / \(status.dailyMessages) "
                     + strings("left today") + " · " + status.plan)
                    .font(Theme.numeric(11))
                    .foregroundStyle(Theme.ink3)
            }
        }
    }

    private var transcript: some View {
        ScrollViewReader { proxy in
            ScrollView {
                VStack(alignment: .leading, spacing: 12) {
                    if model.turns.isEmpty { opening }

                    ForEach(model.turns) { turn in
                        bubble(turn).id(turn.id)
                    }

                    if model.pending {
                        Text(strings("Thinking…"))
                            .font(Theme.ui(12.5))
                            .foregroundStyle(Theme.ink3)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .id("pending")
                    }

                    if let failure = model.failure {
                        Text(strings(failure.message))
                            .font(Theme.ui(12.5))
                            .foregroundStyle(Theme.ink)
                            .padding(10)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(Theme.warning.opacity(0.10))
                            .overlay(
                                RoundedRectangle(cornerRadius: Theme.Radius.lg)
                                    .stroke(Theme.warning.opacity(0.30), lineWidth: 1)
                            )
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                            .id("failure")
                    }
                }
                .padding(16)
                .frame(maxWidth: 680)
                .frame(maxWidth: .infinity)
            }
            .onChange(of: model.turns.count) { scroll(proxy) }
            .onChange(of: model.pending) { scroll(proxy) }
        }
    }

    private var opening: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(strings("Ask about anything you are studying, or about how Nishany works."))
                .font(Theme.ui(13.5))
                .foregroundStyle(Theme.ink2)

            ForEach(suggestions, id: \.self) { suggestion in
                Button {
                    ask(strings(suggestion))
                } label: {
                    Text(strings(suggestion))
                        .font(Theme.ui(12.5))
                        .foregroundStyle(Theme.ink2)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 10)
                        .background(Theme.surface2)
                        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                }
                .buttonStyle(.plain)
                .disabled(model.isExhausted)
                .opacity(model.isExhausted ? 0.5 : 1)
            }
        }
    }

    private func bubble(_ turn: AssistantTurn) -> some View {
        let mine = turn.role == .user
        return Text(turn.content)
            .font(Theme.ui(13.5))
            .foregroundStyle(mine ? Theme.onPrimary : Theme.ink)
            .textSelection(.enabled)
            .padding(.horizontal, 12)
            .padding(.vertical, 9)
            .background(mine ? Theme.primary : Theme.surface)
            .overlay(
                RoundedRectangle(cornerRadius: Theme.Radius.xl)
                    .stroke(mine ? Color.clear : Theme.line, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
            .frame(maxWidth: .infinity, alignment: mine ? .trailing : .leading)
    }

    private var composer: some View {
        VStack(spacing: 8) {
            HStack(alignment: .bottom, spacing: 8) {
                TextField(
                    strings(model.isExhausted ? "No messages left today" : "Ask a question"),
                    text: $draft,
                    axis: .vertical
                )
                .lineLimit(1...5)
                .font(Theme.ui(13.5))
                .focused($composerFocused)
                .disabled(model.isExhausted)
                .padding(.horizontal, 12)
                .padding(.vertical, 10)
                .background(Theme.surface)
                .overlay(
                    RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.line, lineWidth: 1)
                )
                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))

                Button {
                    ask(draft)
                } label: {
                    Image(systemName: "arrow.up")
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundStyle(Theme.onPrimary)
                        .frame(width: 40, height: 40)
                        .background(Theme.primary)
                        .clipShape(Circle())
                }
                .buttonStyle(.plain)
                .disabled(draft.trimmed.isEmpty || model.pending || model.isExhausted)
                .opacity(draft.trimmed.isEmpty || model.pending || model.isExhausted ? 0.4 : 1)
                .accessibilityLabel(strings("Send"))
            }

            Text(strings(AssistantModel.disclaimer))
                .font(Theme.ui(11))
                .foregroundStyle(Theme.ink3)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .background(Theme.surface2)
        .overlay(alignment: .top) { Rectangle().fill(Theme.line).frame(height: 1) }
    }

    private func ask(_ text: String) {
        let message = text.trimmed
        guard !message.isEmpty, !model.pending, !model.isExhausted else { return }
        draft = ""
        model.clearFailure()

        Task {
            await model.send(
                message,
                lang: strings.language,
                context: AssistantContext(surface: surface)
            )
            // A failed send hands the text back rather than dropping it.
            let returned = model.takeReturned()
            if !returned.isEmpty { draft = returned }
        }
    }

    private func scroll(_ proxy: ScrollViewProxy) {
        let target = model.failure != nil ? "failure"
            : model.pending ? "pending"
            : model.turns.last?.id
        guard let target else { return }
        withAnimation(Motion.outQuint(Motion.base)) {
            proxy.scrollTo(target, anchor: .bottom)
        }
    }
}

/// The assistant, reachable from any surface that offers a way in.
///
/// One model for the app rather than one per screen: the status is a single
/// server fact, and a transcript that vanished when a student moved from the
/// question they were reading to the article explaining it would be a strange
/// thing to do to a conversation about that question.
private struct AssistantKey: EnvironmentKey {
    @MainActor static let defaultValue = AssistantModel()
}

extension EnvironmentValues {
    var assistant: AssistantModel {
        get { self[AssistantKey.self] }
        set { self[AssistantKey.self] = newValue }
    }
}

/// A way into the assistant, drawn only when there is one to offer.
///
/// Placed in a toolbar. It renders nothing at all when the assistant is off,
/// unconfigured or not on the student's plan, which is the point: an entry
/// point that leads to a refusal is worse than no entry point.
struct AssistantButton: View {
    let surface: String

    @Environment(\.assistant) private var assistant
    @Environment(\.strings) private var strings
    @State private var showing = false

    var body: some View {
        if assistant.isAvailable {
            Button { showing = true } label: {
                Label(strings("Study assistant"), systemImage: "bubble.left.and.text.bubble.right")
            }
            .tint(Theme.primary)
            .sheet(isPresented: $showing) {
                StudyAssistantView(model: assistant, surface: surface)
            .localisedSheet()
            }
        }
    }
}
