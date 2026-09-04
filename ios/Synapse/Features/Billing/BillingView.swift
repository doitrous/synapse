import SwiftUI

/// What the student is actually subscribed to.
///
/// There is no payment provider in Connect Cortex, so this screen does not
/// offer to take one. It shows the subscription an administrator granted,
/// priced from the real catalogue, and lets a voucher be redeemed against the
/// server. It deliberately does not offer to do things it cannot do.
///
/// No purchase route, and **no link out either**: App Store rule 3.1.1 forbids
/// buttons, links or calls to action that send a customer to a purchasing
/// mechanism other than in-app purchase, and an address to write to about
/// arranging a plan is exactly that. The website carries that conversation.
/// Redeeming a voucher stays, because no money moves and it is a real function
/// of the account rather than a way to buy one.
struct BillingView: View {
    @State private var model: BillingModel
    @Environment(\.strings) private var strings

    @State private var code = ""

    init(api: SynapseAPI, sync: SyncEngine) {
        _model = State(wrappedValue: BillingModel(api: api, sync: sync))
    }

    var body: some View {
        // Everything on this screen — the entitlement most of all — is a
        // direct server read with no local cache behind it, so unlike most of
        // the app it genuinely cannot work with no connection.
        StateSurface(isLoading: model.isLoading, error: model.loadError, retry: { Task { await model.load() } }) {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    yourPlan
                    payments
                    voucher
                    if model.offer.enabled { studentId }
                }
                .padding(16)
                .frame(maxWidth: 680)
                .frame(maxWidth: .infinity)
            }
            .background(Theme.paper)
        }
        .background(Theme.paper)
        .navigationTitle(strings("Billing"))
        .navigationBarTitleDisplayMode(.inline)
        .task { await model.load() }
    }

    // MARK: - The plan

    @ViewBuilder private var yourPlan: some View {
        panel(strings("Your plan"), badge: strings(model.state.label), tone: tone(model.state)) {
            if model.state == .none {
                VStack(alignment: .leading, spacing: 10) {
                    Text(strings("No plan has been granted to your account yet. Plans are arranged on the website."))
                        .font(Theme.ui(13))
                        .foregroundStyle(Theme.ink2)
                }
            } else {
                VStack(alignment: .leading, spacing: 12) {
                    Text(model.entitlement?.plan ?? strings("Your plan"))
                        .font(Theme.display(22))
                        .foregroundStyle(Theme.ink)

                    Text(runsUntil)
                        .font(Theme.ui(13))
                        .foregroundStyle(Theme.ink3)

                    if let plan = model.plan {
                        let prices = model.catalog.soldPrices(plan)
                        if prices.isEmpty {
                            Text(strings("Free"))
                                .font(Theme.numeric(17).weight(.semibold))
                                .foregroundStyle(Theme.ink)
                        } else {
                            // Every period this plan is sold at, not one
                            // converted figure: a student on a term plan has
                            // never been charged a monthly price.
                            ForEach(prices, id: \.period.id) { entry in
                                HStack {
                                    Text(entry.period.label(strings.language))
                                        .font(Theme.ui(13))
                                        .foregroundStyle(Theme.ink2)
                                    Spacer()
                                    Text(Money.price(entry.amount, strings.language))
                                        .font(Theme.numeric(15).weight(.semibold))
                                        .foregroundStyle(Theme.ink)
                                }
                            }
                        }
                    } else {
                        Text(strings("This plan is not in the current catalogue, so no price is shown for it."))
                            .font(Theme.ui(12.5))
                            .foregroundStyle(Theme.ink2)
                            .padding(10)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(Theme.surface2)
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                    }

                    if let note = model.subscription?.note, !note.isEmpty {
                        Text(note)
                            .font(Theme.ui(12.5))
                            .foregroundStyle(Theme.ink2)
                    }

                    Divider().overlay(Theme.line)

                    Text(strings("Subscriptions are managed by the Nishany team. To change or end your plan, use the website."))
                        .font(Theme.ui(12.5))
                        .foregroundStyle(Theme.ink3)
                }
            }
        }
    }

    private var runsUntil: String {
        guard let expiry = model.entitlement?.expiresAt, !expiry.isEmpty else {
            return strings("Open-ended · no expiry recorded")
        }
        let date = ISO8601DateFormatter.read(expiry).map { $0.formatted(date: .long, time: .omitted) } ?? expiry
        guard let days = model.entitlement?.daysLeft else { return strings("Runs until") + " " + date }
        let left = days == 1 ? strings("day left") : strings("days left")
        return strings("Runs until") + " \(date) · \(days) " + left
    }

    // MARK: - Payments

    private var payments: some View {
        panel(strings("Payments")) {
            Text(strings("Nishany does not take card payments in the app, and stores no card details. Your plan is arranged on the website."))
                .font(Theme.ui(13))
                .foregroundStyle(Theme.ink2)
        }
    }

    // MARK: - Voucher

    @ViewBuilder private var voucher: some View {
        panel(strings("Student voucher"),
              badge: model.redemption != nil ? strings("Applied") : nil,
              tone: Theme.success) {
            VStack(alignment: .leading, spacing: 12) {
                if let redemption = model.redemption {
                    HStack(alignment: .top, spacing: 12) {
                        VStack(alignment: .leading, spacing: 3) {
                            Text(redemption.code)
                                .font(Theme.numeric(14).weight(.semibold))
                                .foregroundStyle(Theme.ink)
                            Text(savingLine(redemption))
                                .font(Theme.ui(12))
                                .foregroundStyle(Theme.ink2)
                        }
                        Spacer(minLength: 0)
                        Button {
                            Task { await model.removeVoucher(strings: strings) }
                        } label: {
                            Image(systemName: "xmark")
                                .font(.system(size: 13, weight: .semibold))
                                .foregroundStyle(Theme.ink3)
                        }
                        .buttonStyle(.plain)
                        .disabled(model.isBusy)
                        .accessibilityLabel(strings("Remove voucher"))
                    }
                    .padding(12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Theme.successTint)
                    .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                } else {
                    Text(strings("Eligibility is checked on the server against your university, year, group, the voucher dates, and the remaining redemption limit."))
                        .font(Theme.ui(12.5))
                        .foregroundStyle(Theme.ink3)

                    HStack(spacing: 8) {
                        TextField(strings("Enter voucher code"), text: $code)
                            .textInputAutocapitalization(.characters)
                            .autocorrectionDisabled()
                            .font(Theme.numeric(14))
                            .padding(.horizontal, 12)
                            .padding(.vertical, 10)
                            .background(Theme.surface)
                            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg)
                                .stroke(Theme.line, lineWidth: 1))
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                            .onSubmit { apply() }

                        Button(strings("Apply")) { apply() }
                            .font(Theme.ui(14).weight(.semibold))
                            .foregroundStyle(Theme.onPrimary)
                            .padding(.horizontal, 16)
                            .padding(.vertical, 11)
                            .background(Theme.primary)
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                            .buttonStyle(.plain)
                            .disabled(code.trimmed.isEmpty || model.isBusy)
                            .opacity(code.trimmed.isEmpty || model.isBusy ? 0.4 : 1)
                    }
                }

                if !model.message.isEmpty {
                    Text(model.message)
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.ink2)
                }
            }
        }
    }

    private func savingLine(_ redemption: VoucherRedemption) -> String {
        guard let voucher = model.appliedVoucher, let plan = model.plan else {
            return strings("Applied to your account")
        }
        if voucher.isTrial {
            return strings("Full access for") + " \(voucher.days) " + strings("days.")
        }
        let price = model.catalog.monthlyEquivalent(plan)
        let discount = voucher.discount(on: price)
        guard price > 0, discount > 0 else { return strings("Applied to your account") }
        return strings("You save") + " " + Money.price(discount, strings.language)
            + " · " + strings("renewal") + " " + Money.price(price - discount, strings.language)
    }

    private func apply() {
        let wanted = code
        code = ""
        Task { await model.redeem(wanted, strings: strings) }
    }

    // MARK: - Student ID

    private var studentId: some View {
        panel(strings("Student ID discount")) {
            VStack(alignment: .leading, spacing: 10) {
                Text(strings("Upload your student ID to claim a discount. It is checked by the Nishany team, and the discount applies from your next invoice once it is accepted.")
                     + " (" + Money.percent(Double(model.offer.percent), strings.language) + ")")
                    .font(Theme.ui(12.5))
                    .foregroundStyle(Theme.ink2)

                if let submission = model.submission {
                    HStack {
                        VStack(alignment: .leading, spacing: 2) {
                            Text(submission.filename)
                                .font(Theme.ui(13).weight(.medium))
                                .foregroundStyle(Theme.ink)
                                .lineLimit(1)
                            Text(strings(submission.status.label))
                                .font(Theme.ui(12))
                                .foregroundStyle(Theme.ink2)
                        }
                        Spacer()
                        Button(strings("Remove")) {
                            Task { await model.record(submission: nil) }
                        }
                        .font(Theme.ui(13))
                        .tint(Theme.primary)
                    }
                    .padding(12)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Theme.surface2)
                    .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                } else {
                    // Deliberately not a file picker. Nothing on either platform
                    // actually transmits the document, and a control that looks
                    // like an upload but sends nowhere is worse than saying so.
                    Text(strings("Send your student ID from the website and the team will apply the discount to your account."))
                        .font(Theme.ui(12.5))
                        .foregroundStyle(Theme.ink3)
                }
            }
        }
    }

    // MARK: - Parts

    private func tone(_ state: EntitlementState) -> Color {
        switch state {
        case .active: Theme.success
        case .trialing: Theme.primary
        case .expired, .cancelled: Theme.warning
        case .none: Theme.ink3
        }
    }

    private func panel<Content: View>(
        _ title: String, badge: String? = nil, tone: Color = Theme.primary,
        @ViewBuilder content: () -> Content
    ) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(title)
                    .font(Theme.panelTitle())
                    .foregroundStyle(Theme.ink2)
                Spacer()
                if let badge {
                    Text(badge)
                        .font(Theme.ui(11).weight(.semibold))
                        .foregroundStyle(tone)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(tone.opacity(0.12))
                        .clipShape(Capsule())
                }
            }
            content()
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
    }
}
