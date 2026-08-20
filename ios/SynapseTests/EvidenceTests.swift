import Foundation
import Testing
@testable import Synapse

/// Reading the published evidence store.
///
/// Only the ids were kept before, which is all the publication gate needs. A
/// student asking "where does this come from" needs the document, the page and
/// the sentence it rests on, so those are decoded too.
struct EvidenceTests {

    private var published: [String: Any] {
        [
            "claims": [
                ["id": "claim-1", "verificationStatus": "verified"],
                ["id": "claim-2", "verificationStatus": "needs_review"],
            ],
            "citations": [
                [
                    "id": "cite-1", "resourceId": "res-1",
                    "locator": ["page": 42],
                    "supportSpan": "The great cardiac vein accompanies it.",
                    "countsAsClaimEvidence": true,
                ],
                [
                    "id": "cite-2", "resourceId": "res-1",
                    "locator": "Figure 3.2",
                    "countsAsClaimEvidence": false,
                ],
                ["id": "cite-3", "resourceId": "res-2"],
            ],
            "resources": [
                ["id": "res-1", "title": "Gray's Anatomy", "storageKey": "k", "mediaType": "pdf", "pageCount": 900],
                ["id": "res-2", "title": "Catalogued only"],
            ],
            "articleSpans": [
                [
                    "id": "span-1", "articleId": "a1", "sectionId": "s1",
                    "text": "The vein follows the artery.",
                    "claimIds": ["claim-1"],
                    "citationIds": ["cite-1", "cite-2"],
                ],
            ],
        ]
    }

    @Test func aPageLocatorIsReadAsAPage() {
        let store = EvidenceStore.decode(published)
        let citation = store.citations["cite-1"]

        #expect(citation?.page == 42)
        #expect(citation?.placeLabel == "Page 42")
        #expect(citation?.supportSpan == "The great cardiac vein accompanies it.")
        #expect(citation?.countsAsClaimEvidence == true)
    }

    /// Not every citation names a page. A figure or a section is still a place,
    /// and dropping it would leave the student with a document and no idea
    /// where to look in it.
    @Test func aLocatorThatIsNotAPageIsStillAPlace() {
        let store = EvidenceStore.decode(published)
        let citation = store.citations["cite-2"]

        #expect(citation?.page == nil)
        #expect(citation?.placeLabel == "Figure 3.2")
        #expect(citation?.countsAsClaimEvidence == false)
    }

    @Test func aCitationWithNoLocatorHasNoPlace() {
        #expect(EvidenceStore.decode(published).citations["cite-3"]?.placeLabel == nil)
    }

    /// `needs_review` is not a phrase anybody says.
    @Test func claimStatusReadsAsWords() {
        let store = EvidenceStore.decode(published)
        #expect(store.claims["claim-1"]?.isVerified == true)
        #expect(store.claims["claim-2"]?.isVerified == false)
        #expect(store.claims["claim-2"]?.label == "needs review")
    }

    /// A resource with nothing behind it is catalogued, not openable — which
    /// is what stops the drawer offering a button that leads nowhere.
    @Test func onlyResourcesWithBytesBehindThemAreOpenable() {
        let store = EvidenceStore.decode(published)
        #expect(store.resourceFiles["res-1"] != nil)
        #expect(store.resourceFiles["res-2"] == nil)
        // Still named, so a student can go and find it.
        #expect(store.resourceTitles["res-2"] == "Catalogued only")
    }

    @Test func aSpanKeepsWhatItCites() {
        let store = EvidenceStore.decode(published)
        let span = store.spansById["span-1"]

        #expect(span?.citationIds == ["cite-1", "cite-2"])
        #expect(span?.claimIds == ["claim-1"])
        #expect(store.spansBySection["a1|s1"]?.count == 1)
    }

    @Test func anEmptyStoreDecodesRatherThanCrashing() {
        #expect(EvidenceStore.decode(nil).citations.isEmpty)
        #expect(EvidenceStore.decode([:]).claims.isEmpty)
    }
}
