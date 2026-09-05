import SwiftUI
import UIKit

/// UIKit-level chrome that SwiftUI styles no other way.
///
/// Navigation and tab bars are still UIKit underneath, so the fonts and colours
/// they use come from an appearance proxy rather than a view modifier.
///
/// Every colour here is read from `Theme` rather than written out again. It was
/// written out again once, and the rebrand left a band of the old warm ground
/// across the top of every screen while everything below it had moved on — a
/// palette copied into a second place is a palette that will disagree with
/// itself the first time it changes.
enum Appearance {

    static func apply() {
        navigationBars()
        tabBars()
    }

    /// Re-apply after the theme changes.
    ///
    /// An appearance proxy is read when a bar is created, so bars already on
    /// screen keep the old colours. Rebuilding the tree is what replaces them —
    /// which the theme change already does — so this only has to run first.
    @MainActor
    static func reapply() {
        apply()
    }

    /// Page titles are serif — the rule that pairs with sans panel titles and
    /// gives the product its hierarchy.
    private static func navigationBars() {
        let appearance = UINavigationBarAppearance()
        appearance.configureWithOpaqueBackground()
        appearance.backgroundColor = UIColor(Theme.paper)
        appearance.shadowColor = .clear

        let ink = UIColor(Theme.ink)
        appearance.largeTitleTextAttributes = [
            .font: serif(size: 30, weight: 560),
            .foregroundColor: ink,
        ]
        appearance.titleTextAttributes = [
            .font: serif(size: 17, weight: 560),
            .foregroundColor: ink,
        ]

        UINavigationBar.appearance().standardAppearance = appearance
        UINavigationBar.appearance().scrollEdgeAppearance = appearance
        UINavigationBar.appearance().compactAppearance = appearance
    }

    private static func tabBars() {
        let appearance = UITabBarAppearance()
        appearance.configureWithOpaqueBackground()
        appearance.backgroundColor = UIColor(Theme.surface)

        for item in [appearance.stackedLayoutAppearance, appearance.inlineLayoutAppearance, appearance.compactInlineLayoutAppearance] {
            item.normal.titleTextAttributes = [.font: sans(size: 10, weight: 500)]
            item.selected.titleTextAttributes = [.font: sans(size: 10, weight: 600)]
        }

        UITabBar.appearance().standardAppearance = appearance
        UITabBar.appearance().scrollEdgeAppearance = appearance
    }

    // MARK: - Fonts

    /// A bundled variable font at an exact weight, for UIKit.
    ///
    /// Falls back to the system face rather than crashing: a missing font is a
    /// packaging mistake, and shipping a blank navigation bar over it would be
    /// a worse failure than shipping the wrong typeface.
    private static func font(_ family: String, size: CGFloat, weight: CGFloat) -> UIFont {
        let axis = 0x77676874  // 'wght'
        let descriptor = UIFontDescriptor(fontAttributes: [
            .family: family,
            kCTFontVariationAttribute as UIFontDescriptor.AttributeName: [axis: weight],
        ])
        return UIFont(descriptor: descriptor, size: size)
    }

    private static func serif(size: CGFloat, weight: CGFloat) -> UIFont {
        font(Theme.Family.serif, size: size, weight: weight)
    }

    private static func sans(size: CGFloat, weight: CGFloat) -> UIFont {
        font(Theme.Family.sans, size: size, weight: weight)
    }
}

extension UIColor {
    convenience init(rgb: UInt32) {
        self.init(
            red: CGFloat((rgb >> 16) & 0xFF) / 255,
            green: CGFloat((rgb >> 8) & 0xFF) / 255,
            blue: CGFloat(rgb & 0xFF) / 255,
            alpha: 1
        )
    }
}
