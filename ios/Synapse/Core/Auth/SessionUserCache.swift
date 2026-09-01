import Foundation
import Security

/// The last identity the server confirmed for the session Supabase itself
/// persists.
///
/// This exists so that a launch with no network does not throw the student
/// back to the sign-in form. Synapse is offline-first -- every screen reads
/// the local cache, and the cache holds work the student has already done --
/// so answering "who is this?" with "nobody, sign in again" the moment the
/// server is unreachable locks them out of their own device. It is
/// `AuthModel`'s fallback, never its first answer: the server is still asked
/// on every restore, and this is read only when that ask failed for a reason
/// that is plainly the network's fault (see `AuthModel.restoreFromCache`).
///
/// Device-local, and deliberately not a synced document: no other client
/// reads it, so its shape is nobody else's contract. A rejected session
/// clears it, so it can only ever outlive the server's last confirmation,
/// never contradict it.
protocol SessionUserCache: Sendable {
    func readUser() -> SessionUser?

    /// Stores `user`, or forgets what was stored when it is nil.
    func writeUser(_ user: SessionUser?)
}

/// A cache that remembers nothing, which is exactly the behaviour the app
/// had before one existed. Used by anything with no interest in offline
/// restore -- `AuthModel`'s previews and tests, in particular -- so they are
/// not forced to stand up a real one.
struct ForgetfulSessionUserCache: SessionUserCache {
    func readUser() -> SessionUser? { nil }
    func writeUser(_ user: SessionUser?) {}
}

/// Backs `SessionUserCache` with the Keychain -- the same class of storage
/// supabase-swift's own `KeychainLocalStorage` uses for the session this
/// cache sits beside, so there is exactly one kind of place anything
/// auth-adjacent lives on this device.
///
/// `.afterFirstUnlockThisDeviceOnly`: available to a background refresh
/// without the device being unlocked first launch-to-launch, but never
/// synced through iCloud Keychain -- a cached identity has no business
/// silently appearing on a student's other device ahead of that device's
/// own sign-in.
final class KeychainSessionUserCache: SessionUserCache {

    private let service = "com.synapse.app.session-user"
    private let account = "current"

    func readUser() -> SessionUser? {
        guard let data = readData() else { return nil }
        // A value a previous build left behind that this build can no
        // longer parse means "ask the server", not a crash on launch -- this
        // is read on the restore path, where the app has no other answer.
        return try? JSONDecoder().decode(SessionUser.self, from: data)
    }

    func writeUser(_ user: SessionUser?) {
        guard let user else {
            deleteData()
            return
        }
        guard let data = try? JSONEncoder().encode(user) else { return }
        writeData(data)
    }

    // MARK: - Keychain primitives

    private var query: [String: Any] {
        [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account,
        ]
    }

    private func readData() -> Data? {
        var lookup = query
        lookup[kSecReturnData as String] = true
        lookup[kSecMatchLimit as String] = kSecMatchLimitOne
        var result: AnyObject?
        let status = SecItemCopyMatching(lookup as CFDictionary, &result)
        guard status == errSecSuccess else { return nil }
        return result as? Data
    }

    private func writeData(_ data: Data) {
        let update = SecItemUpdate(query as CFDictionary, [kSecValueData as String: data] as CFDictionary)
        guard update == errSecItemNotFound else { return }
        var insert = query
        insert[kSecValueData as String] = data
        insert[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
        SecItemAdd(insert as CFDictionary, nil)
    }

    private func deleteData() {
        SecItemDelete(query as CFDictionary)
    }
}
