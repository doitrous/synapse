import SwiftUI

/// Sign in, create an account, or ask for a reset link.
///
/// One screen rather than three, because the three differ by two fields and a
/// verb. Switching between them keeps whatever has already been typed.
struct SignInView: View {

    enum Mode: String, CaseIterable, Identifiable {
        case signIn, signUp, reset
        var id: String { rawValue }

        var title: LocalizedStringKey {
            switch self {
            case .signIn: "Sign in"
            case .signUp: "Create account"
            case .reset: "Reset password"
            }
        }
    }

    let auth: AuthModel

    @State private var mode: Mode = .signIn
    @State private var email = ""
    @State private var password = ""
    @FocusState private var focus: Field?

    private enum Field { case email, password }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                header
                picker
                fields
                submit
                if let message = auth.message {
                    notice(message)
                }
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 32)
            .frame(maxWidth: 480)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.paper)
        .scrollDismissesKeyboard(.interactively)
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Synapse")
                .font(Theme.display(32))
                .foregroundStyle(Theme.ink)
            Text("Your library, question bank, and schedule in one place.")
                .font(.system(size: 15))
                .foregroundStyle(Theme.ink2)
        }
        .padding(.bottom, 8)
    }

    private var picker: some View {
        Picker("", selection: $mode) {
            ForEach(Mode.allCases) { mode in
                Text(mode.title).tag(mode)
            }
        }
        .pickerStyle(.segmented)
        .labelsHidden()
    }

    @ViewBuilder
    private var fields: some View {
        VStack(spacing: 12) {
            field("Email", text: $email)
                .keyboardType(.emailAddress)
                .textContentType(.emailAddress)
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .focused($focus, equals: .email)
                .submitLabel(mode == .reset ? .go : .next)
                .onSubmit { focus = mode == .reset ? nil : .password }

            if mode != .reset {
                secureField("Password", text: $password)
                    .textContentType(mode == .signUp ? .newPassword : .password)
                    .focused($focus, equals: .password)
                    .submitLabel(.go)
                    .onSubmit { Task { await submitCurrent() } }
            }
        }
    }

    private var submit: some View {
        Button {
            Task { await submitCurrent() }
        } label: {
            HStack(spacing: 8) {
                if auth.isWorking { ProgressView().tint(Theme.onAccent) }
                Text(mode.title)
                    .font(.system(size: 16, weight: .semibold))
            }
            .frame(maxWidth: .infinity)
            // 44pt is the smallest target that is comfortably tappable; the
            // web app holds the same floor on mobile.
            .frame(height: 48)
            .background(canSubmit ? Theme.accent : Theme.inset)
            .foregroundStyle(canSubmit ? Theme.onAccent : Theme.ink3)
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
        }
        .disabled(!canSubmit)
    }

    private func notice(_ text: String) -> some View {
        Text(text)
            .font(.system(size: 14))
            .foregroundStyle(Theme.ink)
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(12)
            .background(Theme.accentTint)
            .overlay(
                RoundedRectangle(cornerRadius: Theme.Radius.md)
                    .stroke(Theme.accentLine, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.md))
    }

    // MARK: - Behaviour

    private var canSubmit: Bool {
        guard !auth.isWorking, email.contains("@") else { return false }
        // Supabase enforces a minimum too, but failing here costs no round trip
        // and tells the student before they wait for one.
        return mode == .reset || password.count >= 6
    }

    private func submitCurrent() async {
        guard canSubmit else { return }
        focus = nil
        switch mode {
        case .signIn: await auth.signIn(email: email, password: password)
        case .signUp: await auth.signUp(email: email, password: password)
        case .reset: await auth.sendPasswordReset(email: email)
        }
    }

    // MARK: - Field styling

    private func field(_ label: LocalizedStringKey, text: Binding<String>) -> some View {
        TextField(label, text: text)
            .textFieldStyle(.plain)
            .modifier(FieldChrome())
    }

    private func secureField(_ label: LocalizedStringKey, text: Binding<String>) -> some View {
        SecureField(label, text: text)
            .textFieldStyle(.plain)
            .modifier(FieldChrome())
    }
}

private struct FieldChrome: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.system(size: 16))
            .foregroundStyle(Theme.ink)
            .padding(.horizontal, 14)
            .frame(height: 48)
            .background(Theme.surface)
            .overlay(
                RoundedRectangle(cornerRadius: Theme.Radius.lg)
                    .stroke(Theme.line2, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
    }
}
