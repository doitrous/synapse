import Foundation

/// Where this build points, read once from the bundle.
///
/// The three values arrive from `Config/Base.xcconfig` and the gitignored
/// `Config/Secrets.xcconfig` by way of `Info.plist`. They are stored as bare
/// hosts because an xcconfig treats `//` as the start of a comment, which would
/// silently truncate `https://example.com` to `https:`. The scheme is added
/// here instead, in one place.
enum AppConfig {

    /// What is wrong with the configuration, phrased for the person who can fix it.
    enum Problem: Equatable {
        case missingSupabaseHost
        case missingSupabaseKey
        case placeholderValues

        var message: String {
            switch self {
            case .missingSupabaseHost, .missingSupabaseKey:
                "Supabase isn't configured for this build."
            case .placeholderValues:
                "This build still has the example Supabase values."
            }
        }

        var fix: String {
            "Copy ios/Config/Secrets.example.xcconfig to ios/Config/Secrets.xcconfig "
                + "and fill in SUPABASE_HOST and SUPABASE_ANON_KEY from the Supabase "
                + "dashboard (Project Settings → API)."
        }
    }

    /// The Synapse API, e.g. `https://synapse.doitrous.com/api`.
    static let apiBaseURL: URL = {
        let host = string(for: "SynapseAPIHost") ?? "synapse.doitrous.com"
        // Local development runs plain HTTP on a port; anything else is a real
        // host and must be TLS.
        let scheme = host.hasPrefix("localhost") || host.hasPrefix("127.0.0.1") ? "http" : "https"
        guard let url = URL(string: "\(scheme)://\(host)/api") else {
            preconditionFailure("SynapseAPIHost is not a usable host: \(host)")
        }
        return url
    }()

    static var supabaseURL: URL? {
        guard let host = string(for: "SupabaseHost"), !isPlaceholder(host) else { return nil }
        return URL(string: "https://\(host)")
    }

    static var supabaseAnonKey: String? {
        guard let key = string(for: "SupabaseAnonKey"), !isPlaceholder(key) else { return nil }
        return key
    }

    /// `nil` when the build is usable. Checked at launch so a misconfigured
    /// build explains itself rather than failing at the first network call.
    static var problem: Problem? {
        guard let host = string(for: "SupabaseHost") else { return .missingSupabaseHost }
        guard let key = string(for: "SupabaseAnonKey") else { return .missingSupabaseKey }
        if isPlaceholder(host) || isPlaceholder(key) { return .placeholderValues }
        return nil
    }

    // MARK: - Reading the bundle

    /// An unsubstituted build setting comes through as the literal `$(NAME)`,
    /// and an unset one as an empty string. Both mean "not configured".
    private static func string(for key: String) -> String? {
        guard let raw = Bundle.main.object(forInfoDictionaryKey: key) as? String else { return nil }
        let value = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !value.isEmpty, !value.hasPrefix("$(") else { return nil }
        return value
    }

    private static func isPlaceholder(_ value: String) -> Bool {
        value.hasPrefix("your-")
    }
}
