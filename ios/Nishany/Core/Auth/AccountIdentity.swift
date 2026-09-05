import Foundation

/// The two things that identify an account, and what makes two of them the same.
///
/// A port of `src/data/accountIdentity.ts`, held to the same expectations by
/// its own tests. Sign-up asks for a phone number as well as an email, and both
/// are unique — which only means anything if `0100 123 4567`,
/// `+20 100 123 4567` and `0020-100-123-4567` are recognised as one number. A
/// uniqueness check that compared what was typed would not notice, and the
/// second registration would go through.
///
/// Nothing here verifies a phone. It is collected and made unique; email stays
/// the channel that is actually proven.
enum AccountIdentity {

    /// Egypt's country code, used to read a local `01…` number as its full form.
    static let defaultCountry = "20"

    /// A phone number reduced to what makes it that number, or nil if it is not
    /// one.
    ///
    /// Spacing, hyphens, brackets and dots carry no meaning and are dropped. A
    /// leading `00` is the same instruction as a leading `+`. A local number
    /// written with a trunk `0` is the same number as its international form,
    /// so the `0` is replaced by the country code rather than kept — otherwise
    /// one person holds two numbers and can register twice.
    static func normalisePhone(_ raw: String?) -> String? {
        guard let raw, !raw.isEmpty else { return nil }
        var value = raw.filter { !" ()-.\u{00A0}".contains($0) }
        guard !value.isEmpty else { return nil }

        if value.hasPrefix("00") { value = "+" + value.dropFirst(2) }
        let international = value.hasPrefix("+")
        let digits = international ? String(value.dropFirst()) : value
        guard !digits.isEmpty, digits.allSatisfy(\.isASCII), digits.allSatisfy(\.isNumber) else { return nil }

        let full: String
        if international {
            full = digits
        } else if digits.hasPrefix("0") {
            full = defaultCountry + digits.dropFirst()
        } else {
            full = digits
        }

        // Short enough to be a typo rather than a number, or long enough to be
        // several run together. E.164 allows fifteen digits at most.
        guard full.count >= 8, full.count <= 15 else { return nil }
        return "+" + full
    }

    /// An email reduced to what makes it that address.
    static func normaliseEmail(_ raw: String?) -> String? {
        guard let raw else { return nil }
        let value = raw.trimmed.lowercased()
        // The same shape the web checks: something, an @, something, a dot,
        // something — and no spaces anywhere.
        let parts = value.split(separator: "@", omittingEmptySubsequences: false)
        guard parts.count == 2,
              !parts[0].isEmpty, !parts[1].isEmpty,
              !value.contains(" "),
              parts[1].contains("."),
              !parts[1].hasPrefix("."), !parts[1].hasSuffix(".")
        else { return nil }
        return value
    }
}

/// Which field says this person already has an account.
struct IdentityConflict: Equatable, Sendable {
    enum Field: String, Sendable { case email, phone }
    var field: Field
    /// What the visitor typed, so the sign-in screen can be filled in with it.
    var value: String

    var message: String {
        switch field {
        case .email: "That email already has an account. Sign in instead."
        case .phone: "That phone number already has an account. Sign in with the email you used."
        }
    }
}
