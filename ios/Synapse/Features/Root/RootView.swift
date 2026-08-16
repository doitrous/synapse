import SwiftUI

/// Chooses what the app shows, based on whether anyone is signed in.
struct RootView: View {
    @State private var auth = AuthModel()

    var body: some View {
        Group {
            switch auth.state {
            case .restoring:
                RestoringView()
            case .unconfigured(let problem):
                UnconfiguredView(problem: problem)
            case .signedOut:
                SignInView(auth: auth)
            case .signedIn(let user):
                SignedInView(user: user, auth: auth)
            }
        }
        .background(Theme.paper)
        .task { await auth.start() }
    }
}

private struct RestoringView: View {
    var body: some View {
        ProgressView()
            .tint(Theme.accent)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Theme.paper)
    }
}

/// Shown when the build has no Supabase configuration.
///
/// This is a developer-facing screen, so it names the actual file to edit
/// rather than apologising vaguely. It exists because the alternative — a
/// sign-in form that fails on every attempt — looks like a broken server.
private struct UnconfiguredView: View {
    let problem: AppConfig.Problem

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Not configured")
                .font(Theme.display(24))
                .foregroundStyle(Theme.ink)
            Text(problem.message)
                .font(.system(size: 15))
                .foregroundStyle(Theme.ink)
            Text(problem.fix)
                .font(.system(size: 14, design: .monospaced))
                .foregroundStyle(Theme.ink2)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(24)
        .frame(maxHeight: .infinity, alignment: .center)
        .background(Theme.paper)
    }
}

/// A placeholder shell.
///
/// Deliberately minimal: its job in this step is to prove the round trip —
/// Supabase issued a token, the Synapse API verified it against the project
/// JWKS, and it told us who this is and what role they hold. The study
/// surfaces arrive once the sync engine is in place.
private struct SignedInView: View {
    let user: SessionUser
    let auth: AuthModel

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            VStack(alignment: .leading, spacing: 6) {
                Text("Signed in")
                    .font(Theme.display(28))
                    .foregroundStyle(Theme.ink)
                Text("The API verified this session.")
                    .font(.system(size: 15))
                    .foregroundStyle(Theme.ink2)
            }

            VStack(spacing: 0) {
                row("Email", user.email ?? "—")
                Divider().overlay(Theme.line)
                row("Role", user.role)
                if let aal = user.aal {
                    Divider().overlay(Theme.line)
                    row("Assurance", aal)
                }
            }
            .background(Theme.surface)
            .overlay(
                RoundedRectangle(cornerRadius: Theme.Radius.xl)
                    .stroke(Theme.line, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))

            Button("Sign out") {
                Task { await auth.signOut() }
            }
            .font(.system(size: 15, weight: .medium))
            .foregroundStyle(Theme.accent)

            Spacer()
        }
        .padding(24)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Theme.paper)
    }

    private func row(_ label: LocalizedStringKey, _ value: String) -> some View {
        HStack {
            Text(label)
                .font(Theme.panelTitle())
                .foregroundStyle(Theme.ink2)
            Spacer()
            Text(value)
                .font(.system(size: 14))
                .foregroundStyle(Theme.ink)
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 12)
    }
}
