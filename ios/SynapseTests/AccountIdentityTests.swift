import Testing
@testable import Synapse

/// What makes two sign-ups the same person.
///
/// These mirror `src/data/accountIdentity.test.ts` case for case. Both platform
/// implementations have to agree, because either can be the one that creates
/// the account, and the UNIQUE index behind them does not care which asked.
@Suite struct AccountIdentityTests {

    // MARK: - Phone

    @Test func spacingHyphensAndBracketsCarryNoMeaning() {
        #expect(AccountIdentity.normalisePhone("+20 100 123 4567") == "+201001234567")
        #expect(AccountIdentity.normalisePhone("+20-100-123-4567") == "+201001234567")
        #expect(AccountIdentity.normalisePhone("+20 (100) 123.4567") == "+201001234567")
    }

    @Test func aLeading00IsTheSameInstructionAsALeadingPlus() {
        #expect(AccountIdentity.normalisePhone("0020 100 123 4567") == "+201001234567")
    }

    @Test func aLocalNumberAndItsInternationalFormAreOneNumber() {
        // The whole point: one person must not be able to hold two numbers and
        // register twice.
        #expect(AccountIdentity.normalisePhone("01001234567") == "+201001234567")
        #expect(AccountIdentity.normalisePhone("+201001234567") == "+201001234567")
        #expect(AccountIdentity.normalisePhone("01001234567")
                == AccountIdentity.normalisePhone("+20 100 123 4567"))
    }

    @Test func whatIsNotANumberIsRefusedRatherThanNormalisedIntoOne() {
        #expect(AccountIdentity.normalisePhone("") == nil)
        #expect(AccountIdentity.normalisePhone(nil) == nil)
        #expect(AccountIdentity.normalisePhone("not a phone") == nil)
        #expect(AccountIdentity.normalisePhone("+20 100 12x 4567") == nil)
        // Short enough to be a typo, and long enough to be several run together.
        #expect(AccountIdentity.normalisePhone("12345") == nil)
        #expect(AccountIdentity.normalisePhone("+1234567890123456") == nil)
    }

    @Test func easternArabicDigitsAreNotQuietlyAcceptedAsANumber() {
        // `isNumber` is true for ٠١٢…, and accepting them would produce a
        // "+" string the server's own ASCII-only rule would then reject.
        #expect(AccountIdentity.normalisePhone("+٢٠١٠٠١٢٣٤٥٦٧") == nil)
    }

    // MARK: - Email

    @Test func anEmailIsTheSameAddressWhateverCaseItIsTypedIn() {
        #expect(AccountIdentity.normaliseEmail("  Omar@Example.COM ") == "omar@example.com")
        #expect(AccountIdentity.normaliseEmail("omar@example.com")
                == AccountIdentity.normaliseEmail("OMAR@EXAMPLE.COM"))
    }

    @Test func whatIsNotAnAddressIsRefused() {
        #expect(AccountIdentity.normaliseEmail("omar") == nil)
        #expect(AccountIdentity.normaliseEmail("omar@") == nil)
        #expect(AccountIdentity.normaliseEmail("omar@example") == nil)
        #expect(AccountIdentity.normaliseEmail("") == nil)
        #expect(AccountIdentity.normaliseEmail("omar@ex ample.com") == nil)
        #expect(AccountIdentity.normaliseEmail("omar@@example.com") == nil)
    }

    // MARK: - Conflicts

    @Test func eachConflictHasSomethingToSayToThePersonWhoHitIt() {
        for field in [IdentityConflict.Field.email, .phone] {
            let conflict = IdentityConflict(field: field, value: "x")
            #expect(!conflict.message.isEmpty)
            #expect(conflict.message.contains("Sign in"))
        }
    }
}
