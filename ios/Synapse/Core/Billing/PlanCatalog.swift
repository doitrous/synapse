import Foundation

/// What the plans are, and what they cost.
///
/// A port of `src/data/planCatalog.ts`. Plans stopped being two hardcoded lists
/// a while ago and became one document the admin console edits, so everything
/// here reads that document rather than knowing anything itself.

/// Text an administrator writes in both languages.
struct Bilingual: Codable, Equatable, Sendable {
    var en: String = ""
    var ar: String = ""

    /// One language of it.
    ///
    /// An empty translation reads as the other language rather than as a blank:
    /// a half-filled plan should look unfinished, not broken.
    func callAsFunction(_ language: AppLanguage) -> String {
        let wanted = (language == .ar ? ar : en).trimmed
        if !wanted.isEmpty { return wanted }
        return (language == .ar ? en : ar).trimmed
    }
}

struct BillingPeriodDef: Codable, Equatable, Identifiable, Sendable {
    var id: String
    var label: Bilingual
    /// "billed each term" — what is actually charged, and when.
    var billedAs: Bilingual
    /// Months this period covers. Drives per-month equivalence and the saving.
    var months: Int
    /// Priced and shown, but not purchasable yet.
    var comingSoon: Bool?
}

/// One line of what a plan includes.
///
/// `value` exists because "limited" and "unlimited" are the honest difference
/// between these tiers, and a tick would flatten it.
struct PlanFeature: Codable, Equatable, Sendable {
    var group: Bilingual?
    var label: Bilingual
    var value: Bilingual?
}

struct CatalogPlan: Codable, Equatable, Identifiable, Sendable {
    var id: String
    var name: Bilingual
    var entitlement: Bilingual
    var features: [PlanFeature] = []
    /// Period id → price. An absent period is not sold for this plan.
    var prices: [String: Double] = [:]
    /// Shown instead of a price where there is no list price — campus, cohort.
    var quoted: Bilingual?
    var fixedPeriod: Bilingual?
    var cta: Bilingual?
    /// `primary` plans are the tiers; `secondary` sits beneath them.
    var prominence: String = "primary"
    var featured: Bool?
    var badge: Bilingual?
    /// Announced, not yet available.
    var comingSoon: Bool?
    var active: Bool = true
    /// Empty means everyone.
    var universityIds: [String] = []
    var years: [String] = []
}

struct PlanCatalog: Codable, Equatable, Sendable {
    var periods: [BillingPeriodDef] = []
    var plans: [CatalogPlan] = []

    /// Admin-authored, so hyphenated and read from the shared catalogue.
    static let key = "nishany-plan-catalog-v1"

    /// Periods shortest first, whatever order they were entered in.
    var byLength: [BillingPeriodDef] { periods.sorted { $0.months < $1.months } }

    /// A plan by id, then by either language's name.
    ///
    /// A subscription stores a plan *name*, written when it was taken out, so a
    /// plan since renamed still has to be findable — and a student on
    /// "بنك الأسئلة" and one on "QBank" must resolve to the same plan.
    func plan(handle: String) -> CatalogPlan? {
        let wanted = handle.trimmed.lowercased()
        guard !wanted.isEmpty else { return nil }
        return plans.first { $0.id.lowercased() == wanted }
            ?? plans.first { $0.name.en.trimmed.lowercased() == wanted }
            ?? plans.first { $0.name.ar.trimmed.lowercased() == wanted }
    }

    /// The price to show for a period.
    ///
    /// A plan sold only by the month still has a price when the page is showing
    /// the year, so this falls back to the longest shorter period the plan is
    /// actually sold at, and then to the shortest longer one. The period it
    /// landed on comes back with the amount, because "billed monthly" under a
    /// yearly column is the honest label.
    func price(_ plan: CatalogPlan, at periodId: String) -> (amount: Double, period: BillingPeriodDef)? {
        let sorted = byLength
        let has = { (period: BillingPeriodDef) in plan.prices[period.id] != nil }

        if let wanted = sorted.first(where: { $0.id == periodId }) {
            if let amount = plan.prices[wanted.id] { return (amount, wanted) }
            if let shorter = sorted.last(where: { $0.months < wanted.months && has($0) }),
               let amount = plan.prices[shorter.id] {
                return (amount, shorter)
            }
        }
        guard let any = sorted.first(where: has), let amount = plan.prices[any.id] else { return nil }
        return (amount, any)
    }

    /// What a student on this plan is worth a month. Zero when unknown.
    func monthlyEquivalent(_ plan: CatalogPlan) -> Double {
        guard let base = byLength.first(where: { plan.prices[$0.id] != nil }),
              let amount = plan.prices[base.id]
        else { return 0 }
        return base.months > 0 ? amount / Double(base.months) : amount
    }

    /// Every period this plan is actually sold at, with its price.
    ///
    /// The billing screen states the plan's own price list rather than one
    /// period's: a student on a term plan should see the term price, not a
    /// monthly figure they have never been charged.
    func soldPrices(_ plan: CatalogPlan) -> [(amount: Double, period: BillingPeriodDef)] {
        byLength.compactMap { period in
            plan.prices[period.id].map { (amount: $0, period: period) }
        }
    }

    /// How much cheaper a period is than the shortest one the plan is sold at.
    ///
    /// Nil when there is nothing to compare. Rounded down, so nothing ever
    /// claims a saving larger than the one on offer.
    func savingPercent(_ plan: CatalogPlan, at periodId: String) -> Int? {
        let sorted = byLength
        guard let base = sorted.first(where: { plan.prices[$0.id] != nil }),
              base.id != periodId,
              let basePrice = plan.prices[base.id], basePrice > 0,
              let chosen = sorted.first(where: { $0.id == periodId }),
              let price = plan.prices[chosen.id],
              base.months > 0
        else { return nil }

        let full = basePrice * (Double(chosen.months) / Double(base.months))
        guard price < full else { return nil }
        return Int(((full - price) / full * 100).rounded(.down))
    }
}

/// Numbers, written the way the reader reads them.
///
/// A port of `src/lib/pricing.ts`. The Arabic pages are set in Arabic-Indic
/// numerals throughout, so a price in Western digits would be the one figure on
/// the screen that looked foreign to it.
enum Money {
    private static let arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]

    static func number(_ value: Double, _ language: AppLanguage) -> String {
        let grouped = NumberFormatter.grouping.string(from: NSNumber(value: value.rounded()))
            ?? String(Int(value.rounded()))
        guard language == .ar else { return grouped }
        return grouped
            .replacingOccurrences(of: ",", with: "٬")
            .map { character in
                character.wholeNumberValue.flatMap { $0 < 10 ? arabicDigits[$0] : nil } ?? String(character)
            }
            .joined()
    }

    /// Arabic puts the sign before the number — ٪٣٢, not ٣٢٪.
    static func percent(_ value: Double, _ language: AppLanguage) -> String {
        let digits = number(value, language)
        return language == .ar ? "٪\(digits)" : "\(digits)%"
    }

    /// A price with its currency, in the order the language writes it.
    static func price(_ value: Double, _ language: AppLanguage) -> String {
        language == .ar ? "\(number(value, language)) ج.م" : "EGP \(number(value, language))"
    }
}

private extension NumberFormatter {
    static let grouping: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.locale = Locale(identifier: "en_US")
        formatter.maximumFractionDigits = 0
        return formatter
    }()
}
