import Testing
import Foundation
@testable import Synapse

/// Plans, prices and vouchers.
///
/// The arithmetic here ends up on an invoice, so it is held to the website's
/// own rules: a price never falls back to a period the plan is not sold at
/// without saying which period it landed on, a saving is never rounded up, and
/// a discount never exceeds the thing it is discounting.
@Suite struct BillingTests {

    let month = BillingPeriodDef(id: "month", label: Bilingual(en: "Monthly", ar: "شهريًا"),
                                 billedAs: Bilingual(en: "billed monthly", ar: ""), months: 1)
    let term = BillingPeriodDef(id: "term", label: Bilingual(en: "Termly", ar: "فصليًا"),
                                billedAs: Bilingual(en: "billed each term", ar: ""), months: 4)
    let year = BillingPeriodDef(id: "year", label: Bilingual(en: "Yearly", ar: "سنويًا"),
                                billedAs: Bilingual(en: "billed yearly", ar: ""), months: 12)

    func catalog(_ prices: [String: Double]) -> PlanCatalog {
        PlanCatalog(
            periods: [year, month, term],  // deliberately out of order
            plans: [CatalogPlan(id: "qbank", name: Bilingual(en: "QBank", ar: "بنك الأسئلة"),
                                entitlement: Bilingual(), prices: prices)]
        )
    }

    // MARK: - Prices

    @Test func aPeriodTheEntryOrderDidNotSortIsStillSortedShortestFirst() {
        #expect(catalog([:]).byLength.map(\.id) == ["month", "term", "year"])
    }

    @Test func aPriceIsTheOneAskedForWhenThePlanIsSoldAtThatPeriod() throws {
        let catalog = self.catalog(["month": 99, "term": 249, "year": 799])
        let priced = try #require(catalog.price(catalog.plans[0], at: "term"))
        #expect(priced.amount == 249)
        #expect(priced.period.id == "term")
    }

    @Test func aPlanSoldOnlyByTheMonthStillHasAPriceUnderTheYear() throws {
        // And it comes back saying "month", because "billed monthly" under a
        // yearly column is the honest label.
        let catalog = self.catalog(["month": 99])
        let priced = try #require(catalog.price(catalog.plans[0], at: "year"))
        #expect(priced.amount == 99)
        #expect(priced.period.id == "month")
    }

    @Test func aPlanSoldOnlyByTheYearFallsForwardRatherThanReportingNothing() throws {
        let catalog = self.catalog(["year": 799])
        let priced = try #require(catalog.price(catalog.plans[0], at: "month"))
        #expect(priced.period.id == "year")
    }

    @Test func aPlanSoldAtNoPeriodHasNoPrice() {
        let catalog = self.catalog([:])
        #expect(catalog.price(catalog.plans[0], at: "month") == nil)
    }

    @Test func aStudentSeesEveryPeriodTheirPlanIsActuallySoldAt() {
        // Not one converted figure: someone on a term plan has never been
        // charged a monthly price.
        let catalog = self.catalog(["month": 99, "year": 799])
        #expect(catalog.soldPrices(catalog.plans[0]).map(\.period.id) == ["month", "year"])
    }

    // MARK: - Savings

    @Test func aSavingIsMeasuredAgainstTheShortestPeriodThePlanIsSoldAt() throws {
        // 99/month is 1188 a year; 799 saves 32.7%, reported as 32.
        let catalog = self.catalog(["month": 99, "year": 799])
        #expect(catalog.savingPercent(catalog.plans[0], at: "year") == 32)
    }

    @Test func aSavingIsRoundedDownSoNothingClaimsMoreThanItGives() {
        let catalog = self.catalog(["month": 100, "year": 1199])  // 1200 → 1199 is 0.08%
        #expect(catalog.savingPercent(catalog.plans[0], at: "year") == 0)
    }

    @Test func aLongerCommitmentThatIsNotCheaperClaimsNoSaving() {
        let catalog = self.catalog(["month": 99, "year": 1400])
        #expect(catalog.savingPercent(catalog.plans[0], at: "year") == nil)
    }

    @Test func theShortestPeriodHasNothingToCompareItselfTo() {
        let catalog = self.catalog(["month": 99, "year": 799])
        #expect(catalog.savingPercent(catalog.plans[0], at: "month") == nil)
    }

    @Test func aFreePlanClaimsNoSaving() {
        let catalog = self.catalog(["month": 0, "year": 0])
        #expect(catalog.savingPercent(catalog.plans[0], at: "year") == nil)
    }

    // MARK: - Finding a plan

    @Test func aPlanIsFoundByIdOrByEitherLanguagesName() {
        // A subscription stores the name written when it was taken out, so a
        // student on "بنك الأسئلة" and one on "QBank" are on the same plan.
        let catalog = self.catalog(["month": 99])
        #expect(catalog.plan(handle: "qbank")?.id == "qbank")
        #expect(catalog.plan(handle: "QBank")?.id == "qbank")
        #expect(catalog.plan(handle: "بنك الأسئلة")?.id == "qbank")
        #expect(catalog.plan(handle: "  QBANK  ")?.id == "qbank")
        #expect(catalog.plan(handle: "") == nil)
        #expect(catalog.plan(handle: "adaptive") == nil)
    }

    // MARK: - Bilingual copy

    @Test func anEmptyTranslationReadsAsTheOtherLanguage() {
        // A half-filled plan should look unfinished, not broken.
        let onlyEnglish = Bilingual(en: "QBank", ar: "")
        #expect(onlyEnglish(.ar) == "QBank")
        #expect(onlyEnglish(.en) == "QBank")

        let onlyArabic = Bilingual(en: "  ", ar: "بنك")
        #expect(onlyArabic(.en) == "بنك")
    }

    // MARK: - Vouchers

    @Test func aPercentageVoucherTakesItsShare() {
        let voucher = Voucher(id: "v", code: "WELCOME20", discountType: "Percentage", amount: 20)
        #expect(voucher.discount(on: 100) == 20)
    }

    @Test func aFixedVoucherNeverTakesMoreThanThePrice() {
        let voucher = Voucher(id: "v", code: "BIG", discountType: "Fixed amount", amount: 500)
        #expect(voucher.discount(on: 99) == 99)
    }

    @Test func aTrialVoucherIsNotADiscount() {
        // It grants days, not money off, and treating it as both would show a
        // saving on a renewal it does not touch.
        let voucher = Voucher(id: "v", code: "TRY", discountType: "Percentage", amount: 20,
                              grant: .trial, trialDays: 3)
        #expect(voucher.isTrial)
        #expect(voucher.discount(on: 100) == 0)
        #expect(voucher.days == 3)
    }

    @Test func aTrialVoucherWithNoLengthTakesThePlatformDefault() {
        let voucher = Voucher(id: "v", code: "TRY", grant: .trial)
        #expect(voucher.days == 3)
        #expect(Voucher(id: "v", code: "TRY", grant: .trial, trialDays: 0).days == 3)
    }

    @Test func aVoucherWrittenBeforeTrialsExistedIsStillADiscount() {
        // `grant` is absent on every old voucher, and must keep meaning what it
        // meant before the field was added.
        let voucher = Voucher(id: "v", code: "OLD", discountType: "Percentage", amount: 10)
        #expect(!voucher.isTrial)
        #expect(voucher.discount(on: 200) == 20)
    }

    // MARK: - The student-ID offer

    @Test func nothingIsDiscountedUntilTheDocumentHasBeenAccepted() {
        // A discount shown while a document is still in review is a number the
        // invoice will disagree with.
        let offer = StudentIdDiscount(enabled: true, percent: 10)
        #expect(offer.amount(on: 100, accepted: false) == 0)
        #expect(offer.amount(on: 100, accepted: true) == 10)
    }

    @Test func anOfferThatIsSwitchedOffDiscountsNothingEvenWhenAccepted() {
        #expect(StudentIdDiscount(enabled: false, percent: 10).amount(on: 100, accepted: true) == 0)
    }

    @Test func aNonsensePercentIsClampedRatherThanTrusted() {
        #expect(StudentIdDiscount(enabled: true, percent: 500).amount(on: 100, accepted: true) == 100)
        #expect(StudentIdDiscount(enabled: true, percent: -5).amount(on: 100, accepted: true) == 0)
    }

    // MARK: - Figures

    @Test func arabicPagesAreSetInArabicIndicNumerals() {
        // A price in Western digits would be the one figure on an Arabic screen
        // that looked foreign to it.
        #expect(Money.number(1499, .ar) == "١٬٤٩٩")
        #expect(Money.number(1499, .en) == "1,499")
    }

    @Test func arabicPutsThePercentSignBeforeTheNumber() {
        #expect(Money.percent(32, .ar) == "٪٣٢")
        #expect(Money.percent(32, .en) == "32%")
    }

    @Test func aPriceCarriesItsCurrencyInTheOrderTheLanguageWritesIt() {
        #expect(Money.price(799, .en) == "EGP 799")
        #expect(Money.price(799, .ar) == "٧٩٩ ج.م")
    }

    // MARK: - No purchase route

    @Test func nothingOnThisScreenSendsAStudentSomewhereToBuy() throws {
        // App Store rule 3.1.1 forbids buttons, links or calls to action that
        // direct a customer to a purchasing mechanism other than in-app
        // purchase. This is checked as source rather than trusted to review.
        let source = try String(contentsOf: URL(fileURLWithPath: #filePath)
            .deletingLastPathComponent()
            .deletingLastPathComponent()
            .appendingPathComponent("Synapse/Features/Billing/BillingView.swift"), encoding: .utf8)
        #expect(!source.contains("mailto"))
        #expect(!source.contains("Link(destination"))
        #expect(!source.contains("openURL"))
    }
}
