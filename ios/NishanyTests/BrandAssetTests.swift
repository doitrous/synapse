import Testing
import UIKit
@testable import Nishany

/// The brand marks resolve.
///
/// `Image("name")` looks in an asset catalog. These are loose files in the
/// bundle, and the difference is invisible in code and invisible in a build
/// log — it shows up as a wordmark that silently does not draw.
@Suite struct BrandAssetTests {

    @Test(arguments: ["logo", "logo-dark", "logo-wordmark", "logo-wordmark-white"])
    func everyBrandMarkLoads(_ name: String) {
        #expect(UIImage(named: name) != nil, "\(name) did not resolve")
    }
}
