import SwiftUI

/// Sign in, create an account, or ask for a reset link.
///
/// One screen rather than three, because the three differ by two fields and a
/// verb. Switching between them keeps whatever has already been typed.
struct SignInView: View {
    @Environment(\.strings) private var strings

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
    /// Asked for at sign-up only, and unique. See `AccountIdentity`.
    @State private var name = ""
    @State private var phone = ""
    /// What the identity check said, when it said anything.
    @State private var conflict: IdentityConflict?
    @FocusState private var focus: Field?

    /// Credentials passed in at launch, for driving the app in a simulator.
    ///
    /// Debug builds only, and read-only: it prefills the form, it does not sign
    /// anyone in. Synthetic keystrokes into a simulator drop characters often
    /// enough that typing a password by hand is not a reliable way to reach the
    /// screens behind this one.
    ///
    ///     xcrun simctl launch <udid> com.nishany.app \
    ///         -SynapseTestEmail you@example.com -SynapseTestPassword secret
    private static var launchCredentials: (email: String, password: String)? {
        #if DEBUG
        let defaults = UserDefaults.standard
        guard
            let email = defaults.string(forKey: "SynapseTestEmail"),
            let password = defaults.string(forKey: "SynapseTestPassword")
        else { return nil }
        return (email, password)
        #else
        return nil
        #endif
    }

    private enum Field { case name, email, phone, password }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                header
                picker
                fields
                submit
                if let conflict {
                    notice(conflict.message)
                }
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
        .onAppear {
            if let credentials = Self.launchCredentials, email.isEmpty {
                email = credentials.email
                password = credentials.password
            }
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 8) {
            // The artwork rather than the name set in a typeface: the O in
            // "Connect" is the mark, so the two cannot be separated.
            Wordmark(height: 34)
            Text(strings("Your library, question bank, and schedule in one place."))
                .font(Theme.ui(15))
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
            if mode == .signUp {
                field("Full name", text: $name)
                    .textContentType(.name)
                    .textInputAutocapitalization(.words)
                    .focused($focus, equals: .name)
                    .submitLabel(.next)
                    .onSubmit { focus = .email }
            }

            field("Email", text: $email)
                .keyboardType(.emailAddress)
                .textContentType(.emailAddress)
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .focused($focus, equals: .email)
                .submitLabel(mode == .reset ? .go : .next)
                .onSubmit { focus = mode == .reset ? nil : .password }

            if mode == .signUp {
                VStack(alignment: .leading, spacing: 4) {
                    field("Phone number", text: $phone)
                        .keyboardType(.phonePad)
                        .textContentType(.telephoneNumber)
                        .focused($focus, equals: .phone)
                    Text(strings("One account per number. Include the country code if you are outside Egypt."))
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.ink3)
                }
            }

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
                if auth.isWorking { ProgressView().tint(Theme.onPrimary) }
                Text(mode.title)
                    .font(Theme.ui(16, weight: 600))
            }
            .frame(maxWidth: .infinity)
            // 44pt is the smallest target that is comfortably tappable; the
            // web app holds the same floor on mobile.
            .frame(height: 48)
            .background(canSubmit ? Theme.primary : Theme.inset)
            .foregroundStyle(canSubmit ? Theme.onPrimary : Theme.ink3)
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
        }
        .disabled(!canSubmit)
    }

    private func notice(_ text: String) -> some View {
        Text(text)
            .font(Theme.ui(14))
            .foregroundStyle(Theme.ink)
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(12)
            .background(Theme.primaryTint)
            .overlay(
                RoundedRectangle(cornerRadius: Theme.Radius.md)
                    .stroke(Theme.primaryLine, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.md))
    }

    // MARK: - Behaviour

    private var canSubmit: Bool {
        guard !auth.isWorking, email.contains("@") else { return false }
        if mode == .signUp {
            // A number that will not normalise is not a number, and letting it
            // through would create an account the uniqueness rule cannot see.
            guard name.trimmed.count >= 2, AccountIdentity.normalisePhone(phone) != nil else { return false }
        }
        // Supabase enforces a minimum too, but failing here costs no round trip
        // and tells the student before they wait for one.
        return mode == .reset || password.count >= 6
    }

    private func submitCurrent() async {
        guard canSubmit else { return }
        focus = nil
        conflict = nil
        switch mode {
        case .signIn: await auth.signIn(email: email, password: password)
        case .signUp: await createAccount()
        case .reset: await auth.sendPasswordReset(email: email)
        }
    }

    /// Create an account, having first asked whether one already exists.
    ///
    /// Asked before anything is created: somebody re-registering is sent to
    /// sign in rather than handed an error after Supabase has already made an
    /// auth user with no roster row behind it.
    private func createAccount() async {
        guard let phone = AccountIdentity.normalisePhone(phone),
              let email = AccountIdentity.normaliseEmail(email)
        else { return }

        if let found = await auth.identityConflict(email: email, phone: phone) {
            conflict = found
            // Carried over to the sign-in form, filled in with what they typed.
            if found.field == .email { mode = .signIn }
            return
        }

        await auth.signUp(email: email, password: password, name: name.trimmed, phone: phone)
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
            .font(Theme.ui(16))
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
