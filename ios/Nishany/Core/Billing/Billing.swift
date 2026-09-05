import Foundation
import Observation

/// Vouchers, the student-ID offer, and what the student is actually subscribed
/// to.
///
/// There is no payment provider in Connect Cortex. Nothing here offers to take
/// a payment, change a plan or cancel one, because none of those are things the
/// app can do — the subscription is granted by the team, and this screen says
/// so rather than showing buttons that do nothing.

/// What redeeming a voucher gives. Absent means a discount, so every voucher
/// written before trials existed keeps behaving exactly as it did.
enum VoucherGrant: String, Codable, Sendable {
    case discount = "Discount"
    case trial = "Full-access trial"
}

struct Voucher: Codable, Equatable, Identifiable, Sendable {
    var id: String
    var code: String
    var name: String = ""
    /// "Percentage" or "Fixed amount".
    var discountType: String = "Percentage"
    var amount: Double = 0
    var grant: VoucherGrant?
    var trialDays: Int?

    /// The trial the platform offers, and the default a new trial voucher takes.
    static let defaultTrialDays = 3

    var isTrial: Bool { grant == .trial }

    /// Days of full access this grants, or 0 when it is a discount.
    var days: Int {
        guard isTrial else { return 0 }
        let days = trialDays ?? Self.defaultTrialDays
        return days > 0 ? days : Self.defaultTrialDays
    }

    /// What this takes off a price. Never more than the price itself.
    func discount(on price: Double) -> Double {
        guard !isTrial, price > 0 else { return 0 }
        return discountType == "Percentage"
            ? min(price, price * amount / 100)
            : min(price, amount)
    }
}

/// A voucher this student has actually redeemed.
struct VoucherRedemption: Codable, Equatable, Sendable {
    var voucherId: String
    var code: String
    var redeemedAt: String?
}

/// The student-ID discount, and whether students are asked for one at all.
///
/// Deliberately absent from sign-up. Asking a stranger to upload an identity
/// document before they have seen the product is the wrong first request, so it
/// is offered later and only where an administrator has switched it on. Off by
/// default: until then no student can tell it exists.
struct StudentIdDiscount: Codable, Equatable, Sendable {
    var enabled: Bool = false
    var percent: Int = 5

    static let key = "synapse-student-id-discount-v1"

    /// What this takes off a price, or nothing.
    ///
    /// Nothing while the offer is off, and nothing while the document is still
    /// being reviewed — a discount shown before it has been granted is a number
    /// the invoice will disagree with.
    func amount(on price: Double, accepted: Bool) -> Double {
        guard enabled, accepted, price > 0 else { return 0 }
        return min(price, price * Double(min(100, max(0, percent))) / 100)
    }
}

enum StudentIdStatus: String, Codable, Sendable {
    case none, review, accepted, rejected

    var label: String {
        switch self {
        case .none: "Not submitted"
        case .review: "Awaiting review"
        case .accepted: "Accepted"
        case .rejected: "Not accepted"
        }
    }
}

struct StudentIdSubmission: Codable, Equatable, Sendable {
    var filename: String
    var uploadedAt: String
    var status: StudentIdStatus

    /// The student's own, so dotted.
    static let key = "synapse.account.student-id.v1"
}

/// The subscription row behind the entitlement, when there is one.
struct Subscription: Decodable, Equatable, Sendable {
    var id: String?
    var plan: String?
    var status: String?
    var source: String?
    var startedAt: String?
    var expiresAt: String?
    /// What whoever granted it wrote at the time.
    var note: String?
}

/// How an entitlement reads to a student.
enum EntitlementState: String, Sendable {
    case none, trialing, active, expired, cancelled

    var label: String {
        switch self {
        case .none: "No subscription"
        case .trialing: "Trial"
        case .active: "Active"
        case .expired: "Expired"
        case .cancelled: "Cancelled"
        }
    }
}

@MainActor
@Observable
final class BillingModel {

    private(set) var catalog = PlanCatalog()
    private(set) var offer = StudentIdDiscount()
    private(set) var submission: StudentIdSubmission?
    private(set) var redemption: VoucherRedemption?
    private(set) var vouchers: [Voucher] = []
    private(set) var entitlement: MeResponse.Entitlement?
    private(set) var subscription: Subscription?
    private(set) var isLoading = true
    private(set) var isBusy = false
    /// What the last redemption attempt said, in the words the server used.
    private(set) var message = ""
    /// Set when the plan itself — everything above, entitlement included —
    /// could not be read. There is no local cache to fall back on, and
    /// showing "No subscription" to a student who could not be reached is
    /// worse than saying the read failed.
    private(set) var loadError: String?

    private let api: NishanyAPI?
    private let sync: SyncEngine?

    init(api: NishanyAPI? = nil, sync: SyncEngine? = nil) {
        self.api = api
        self.sync = sync
    }

    var state: EntitlementState {
        EntitlementState(rawValue: entitlement?.state ?? "none") ?? .none
    }

    var plan: CatalogPlan? {
        entitlement?.plan.flatMap { catalog.plan(handle: $0) }
    }

    /// The voucher behind the redemption, when the catalogue still lists it.
    var appliedVoucher: Voucher? {
        redemption.flatMap { redemption in vouchers.first { $0.id == redemption.voucherId } }
    }

    /// True once an administrator has accepted the document.
    var studentIdAccepted: Bool { submission?.status == .accepted }

    func load() async {
        isLoading = true
        defer { isLoading = false }
        guard let api else { return }

        async let remoteCatalog = try? api.state(PlanCatalog.self, key: PlanCatalog.key)
        async let remoteOffer = try? api.state(StudentIdDiscount.self, key: StudentIdDiscount.key)
        async let remoteVouchers = try? api.state([Voucher].self, key: "synapse-vouchers-v1")
        async let remoteSubmission = try? api.userState(StudentIdSubmission.self, key: StudentIdSubmission.key)
        async let me = try? api.me()
        async let mine = try? api.myVoucher()

        catalog = (await remoteCatalog)?.value ?? PlanCatalog()
        offer = (await remoteOffer)?.value ?? StudentIdDiscount()
        // Vouchers are admin-authored and a student may not be allowed to read
        // the whole list; an empty one only costs the applied voucher's name.
        vouchers = (await remoteVouchers)?.value ?? []
        submission = (await remoteSubmission)?.value

        // `me` is the one read this screen cannot do without: it is where the
        // entitlement and subscription come from, and defaulting it to "no
        // subscription" on a failed read would tell a paying student they
        // have nothing.
        if let resolved = await me {
            entitlement = resolved.entitlement
            subscription = resolved.subscription
            loadError = nil
        } else {
            loadError = Connectivity.shared.isOnline
                ? "Your plan could not be read. Try again."
                : "You're offline, so your plan can't be shown right now."
        }
        redemption = await mine
    }

    /// Redeem a code.
    ///
    /// The server decides, against the roster row and the redemption table, and
    /// a refusal comes back as a normal answer with a reason to show — not as
    /// an error the student has to interpret.
    func redeem(_ code: String, strings: Localisation) async {
        let wanted = code.trimmed
        guard !wanted.isEmpty, !isBusy, let api else { return }
        guard Connectivity.shared.isOnline else {
            message = strings("You're offline. Connect and try again.")
            return
        }
        isBusy = true
        message = ""
        defer { isBusy = false }

        do {
            let result = try await api.redeemVoucher(code: wanted)
            guard result.ok, let voucher = result.voucher else {
                message = result.message ?? strings("That voucher could not be applied.")
                return
            }
            redemption = VoucherRedemption(voucherId: voucher.id, code: voucher.code, redeemedAt: nil)
            if !vouchers.contains(where: { $0.id == voucher.id }) { vouchers.append(voucher) }
            message = voucher.isTrial
                ? "\(voucher.code) " + strings("opens full access for") + " \(voucher.days) " + strings("days.")
                : "\(voucher.code) " + strings("has been applied to your next renewal.")
        } catch {
            message = strings("That voucher could not be applied. Check your connection and try again.")
        }
    }

    func removeVoucher(strings: Localisation) async {
        guard !isBusy, let api else { return }
        isBusy = true
        defer { isBusy = false }
        do {
            try await api.releaseVoucher()
            redemption = nil
            message = strings("Voucher removed.")
        } catch {
            message = strings("That voucher could not be removed. Try again.")
        }
    }

    func record(submission new: StudentIdSubmission?) async {
        submission = new
        guard let new else { return }
        await sync?.write(key: StudentIdSubmission.key, value: new)
    }
}
