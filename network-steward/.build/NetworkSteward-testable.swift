import SwiftUI
import WebKit
import AppKit
import SecurityInterface

struct Device: Codable, Identifiable, Hashable {
    var mac: String
    var name: String
    var type: String
    var ip: String
    var online: Bool
    var network: String
    var duration: String
    var lease: String
    var id: String { mac }
    var symbol: String { network.hasPrefix("LAN") ? "desktopcomputer" : "wifi" }
}

enum RouterPage: String {
    case devices = "html/bbsp/userdevinfo/userdevinfo1.asp"
    case blocking = "html/bbsp/macfilter/macfilter.asp"
    case qos = "html/bbsp/qosconfig/qosconfig.asp"
}

@MainActor
final class RouterStore: NSObject, ObservableObject, WKNavigationDelegate, WKUIDelegate {
    @Published var devices: [Device] = []
    @Published var selection: String?
    @Published var busy = false
    @Published var connected = false
    @Published var connectionStarted = false
    @Published var canReviewCertificate = false
    @Published var message = "Connect to your router, then sign in in the panel on the right."
    @Published var error: String?
    @Published var refreshedAt: Date?
    @Published var aliases: [String: String] = UserDefaults.standard.dictionary(forKey: "deviceAliases") as? [String: String] ?? [:]
    let webView: WKWebView
    private var scriptLoadError: String?
    private var rejectedTrust: SecTrust?

    override init() {
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .default()
        if let url = Bundle.main.url(forResource: "router", withExtension: "js"),
           let script = try? String(contentsOf: url, encoding: .utf8) {
            configuration.userContentController.addUserScript(WKUserScript(source: script,
                injectionTime: .atDocumentEnd, forMainFrameOnly: true))
        } else {
            scriptLoadError = "The app is missing its router integration resource. Rebuild the app."
        }
        webView = WKWebView(frame: .zero, configuration: configuration)
        super.init()
        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.allowsBackForwardNavigationGestures = false
    }

    var selected: Device? { devices.first { $0.mac == selection } }
    func displayName(_ device: Device) -> String { aliases[device.mac] ?? device.name }
    func rename(_ device: Device, to name: String) {
        let value = String(name.trimmingCharacters(in: .whitespacesAndNewlines).prefix(80))
        aliases[device.mac] = value.isEmpty ? nil : value
        UserDefaults.standard.set(aliases, forKey: "deviceAliases")
    }
    func connect() {
        guard scriptLoadError == nil else { error = scriptLoadError; return }
        error = nil
        connected = false
        connectionStarted = true
        message = "Connecting to the router…"
        webView.load(URLRequest(url: URL(string: "https://192.168.1.1/")!))
    }
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = navigationAction.request.url else { decisionHandler(.cancel); return }
        if url.absoluteString == "about:blank" || (url.scheme == "https" && url.host == "192.168.1.1" && (url.port == nil || url.port == 443)) {
            decisionHandler(.allow)
        } else {
            error = "Navigation outside the local HTTPS router was stopped."
            decisionHandler(.cancel)
        }
    }
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError failure: Error) {
        handle(failure)
    }
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError failure: Error) {
        handle(failure)
    }
    func webView(_ webView: WKWebView, didReceive challenge: URLAuthenticationChallenge,
                 completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
        guard challenge.protectionSpace.authenticationMethod == NSURLAuthenticationMethodServerTrust,
              challenge.protectionSpace.host == "192.168.1.1",
              let trust = challenge.protectionSpace.serverTrust else {
            completionHandler(.performDefaultHandling, nil)
            return
        }
        if SecTrustEvaluateWithError(trust, nil) {
            rejectedTrust = nil
            canReviewCertificate = false
            completionHandler(.performDefaultHandling, nil)
        } else {
            rejectedTrust = trust
            canReviewCertificate = true
            handle(NSError(domain: NSURLErrorDomain, code: NSURLErrorServerCertificateUntrusted))
            completionHandler(.cancelAuthenticationChallenge, nil)
        }
    }
    func reviewCertificate() {
        guard let trust = rejectedTrust else { return }
        // The system panel owns the trust decision. No certificate exception is installed by this app.
        let panel: SFCertificateTrustPanel = SFCertificateTrustPanel.shared()
        _ = panel.runModal(for: trust, message: "Review the certificate for your local router at 192.168.1.1. Only change trust if you have verified that it belongs to your router.")
        message = "Certificate review closed. Reconnect after making your trust decision; macOS will validate the certificate again."
    }
    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        connected = false
    }
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        webView.evaluateJavaScript("!!document.getElementById('menuIframe') && typeof NetworkSteward === 'object'") { [weak self] value, failure in
            guard let self else { return }
            self.connected = failure == nil && value as? Bool == true
            self.error = nil
            self.message = self.connected
                ? "Signed in. Click Read devices to load your network."
                : "Sign in using the router's own login form. Device controls become available after sign-in."
        }
    }
    private func handle(_ failure: Error) {
        let ns = failure as NSError
        if ns.code == NSURLErrorCancelled { return }
        connected = false
        if [-1200, -1201, -1202, -1203, -1204].contains(ns.code) {
            error = "macOS could not verify the router certificate. Chrome's exception is not shared with this app. Use Review certificate to inspect it in macOS's trust dialog, then reconnect. No certificate validation is bypassed."
        } else { error = failure.localizedDescription }
    }
    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage text: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let alert = NSAlert(); alert.messageText = "Router message"; alert.informativeText = text
        alert.runModal(); completionHandler()
    }
    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage text: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        let alert = NSAlert(); alert.messageText = "Confirm router change"; alert.informativeText = text
        alert.addButton(withTitle: "Continue"); alert.addButton(withTitle: "Cancel")
        completionHandler(alert.runModal() == .alertFirstButtonReturn)
    }

    private func literal(_ value: String) -> String {
        let data = try! JSONEncoder().encode(value)
        return String(decoding: data, as: UTF8.self)
    }
    private func evaluate(_ script: String) async throws -> Any? {
        try await webView.evaluateJavaScript(script)
    }
    private func navigate(_ page: RouterPage) async throws {
        let value = literal(page.rawValue)
        _ = try await evaluate("""
        (() => {
          const frame = document.getElementById('menuIframe');
          if (!frame) throw new Error('Sign in to the router first.');
          frame.src = \(value);
          return true;
        })()
        """)
        for _ in 0..<60 {
            try await Task.sleep(for: .milliseconds(200))
            let ready = try? await evaluate("""
            (() => {
              const d = document.getElementById('menuIframe')?.contentDocument;
              return !!d && d.location.pathname.endsWith(\(value)) && d.readyState === 'complete';
            })()
            """)
            if ready as? Bool == true { return }
        }
        throw NSError(domain: "NetworkSteward", code: 1, userInfo: [NSLocalizedDescriptionKey:
            "The router page did not load. Your login may have expired; reconnect and sign in again."])
    }
    func run(_ work: @escaping @MainActor () async throws -> Void) {
        guard !busy else { return }
        guard connected else {
            if error == nil { message = "Connect and sign in to the router before using device controls." }
            return
        }
        busy = true; error = nil
        Task {
            defer { busy = false }
            do { try await work() } catch {
                let failure = error as NSError
                self.error = (failure.userInfo["WKJavaScriptExceptionMessage"] as? String) ?? error.localizedDescription
            }
        }
    }
    func refresh() {
        run { [self] in
            try await navigate(.devices)
            let result = try await evaluate("JSON.stringify(NetworkSteward.readDevices())")
            guard let text = result as? String, let data = text.data(using: .utf8) else {
                throw NSError(domain: "NetworkSteward", code: 2, userInfo: [NSLocalizedDescriptionKey: "The router returned no readable inventory."])
            }
            devices = try JSONDecoder().decode([Device].self, from: data)
            refreshedAt = Date()
            message = "Read \(devices.count) remembered devices; \(devices.filter(\.online).count) online. Status is a snapshot from the router."
        }
    }
    func open(_ page: RouterPage) {
        run { [self] in
            try await navigate(page)
            message = "Router controls are open. Changes take effect only when you save them in the router panel."
        }
    }
    func prepareBlock(_ device: Device) {
        run { [self] in
            try await navigate(.blocking)
            message = try await evaluate("NetworkSteward.prepareBlock(\(literal(device.mac)))") as? String ?? "Review the router form."
        }
    }
    func prepareProfile(_ mbps: String) {
        run { [self] in
            // Validate before navigating so invalid input cannot discard an unsaved form.
            _ = try await evaluate("NetworkSteward.parseRate(\(literal(mbps)))")
            try await navigate(.qos)
            message = try await evaluate("NetworkSteward.prepareProfile(\(literal(mbps)))") as? String ?? "Review the router form."
        }
    }
    func prepareClassification(_ device: Device, index: String) {
        run { [self] in
            // Reload to read the saved policing table, then prepare a new classification.
            try await navigate(.qos)
            message = try await evaluate("NetworkSteward.prepareClassification(\(literal(device.mac)), \(literal(index)))") as? String ?? "Review the router form."
        }
    }
}

struct RouterConsole: NSViewRepresentable {
    let webView: WKWebView
    func makeNSView(context: Context) -> WKWebView { webView }
    func updateNSView(_ nsView: WKWebView, context: Context) {}
}

struct Dashboard: View {
    @StateObject private var store = RouterStore()
    @State private var query = ""
    @State private var onlineOnly = true
    @State private var alias = ""
    @State private var upload = "2"
    @State private var profileIndex = ""
    private var filtered: [Device] {
        store.devices.filter { device in
            (!onlineOnly || device.online) && (query.isEmpty ||
                [store.displayName(device), device.ip, device.mac].contains { $0.localizedCaseInsensitiveContains(query) })
        }.sorted { ($0.online ? 0 : 1, store.displayName($0)) < ($1.online ? 0 : 1, store.displayName($1)) }
    }
    var body: some View {
        VStack(spacing: 0) {
            HStack(spacing: 14) {
                Image("Logo").resizable().interpolation(.high).frame(width: 48, height: 48)
                VStack(alignment: .leading, spacing: 3) {
                    Text("Network Steward").font(.title2.bold())
                    Text("DN8245V-56  ·  192.168.1.1  ·  Local only").font(.caption).foregroundStyle(.secondary)
                }
                Spacer()
                if store.canReviewCertificate {
                    Button("Review certificate…", systemImage: "checkmark.seal") { store.reviewCertificate() }
                }
                Button("Connect to router", systemImage: "network") { store.connect() }.disabled(store.busy)
                Button("Read devices", systemImage: "arrow.clockwise") { store.refresh() }
                    .buttonStyle(.borderedProminent).tint(.teal).disabled(!store.connected || store.busy)
            }.padding(20)
            Divider()
            HSplitView {
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text("Devices").font(.headline)
                        Spacer()
                        Text(store.refreshedAt == nil ? "Not read yet" : "\(store.devices.filter(\.online).count) online").font(.caption).foregroundStyle(.secondary)
                    }
                    TextField("Search name, IP or MAC", text: $query).textFieldStyle(.roundedBorder)
                    Toggle("Online only", isOn: $onlineOnly).toggleStyle(.switch).controlSize(.small)
                    if store.refreshedAt == nil {
                        VStack(spacing: 12) {
                            Image(systemName: "wifi").font(.largeTitle).foregroundStyle(.tertiary)
                            Text("Your network, at a glance").font(.headline)
                            Text("Sign in on the right, then read the router's device list.").foregroundStyle(.secondary).multilineTextAlignment(.center)
                        }.frame(maxWidth: .infinity, maxHeight: .infinity)
                    } else {
                        List(filtered, selection: $store.selection) { device in
                            HStack(spacing: 10) {
                                Image(systemName: device.symbol).foregroundStyle(device.online ? .teal : .gray).frame(width: 22)
                                VStack(alignment: .leading, spacing: 4) {
                                    Text(store.displayName(device)).lineLimit(1)
                                    Text(device.ip).font(.caption.monospaced()).foregroundStyle(.secondary)
                                }
                                Spacer()
                                Circle().fill(device.online ? .green : .gray.opacity(0.35)).frame(width: 6, height: 6)
                            }.padding(.vertical, 5).tag(device.mac)
                        }.listStyle(.inset)
                    }
                    if let date = store.refreshedAt {
                        Text("Snapshot: \(date.formatted(date: .omitted, time: .standard))").font(.caption2).foregroundStyle(.secondary)
                    }
                }.padding(16).frame(minWidth: 230, idealWidth: 270, maxWidth: 340)
                ScrollView {
                    VStack(alignment: .leading, spacing: 20) {
                        if let device = store.selected {
                            deviceInspector(device)
                        } else {
                            Label("Select a device", systemImage: "cursorarrow.click").font(.title3.bold())
                            Text("View its address, give it a friendly name, or prepare a router rule.").foregroundStyle(.secondary)
                            capabilityNote
                        }
                    }.padding(20).frame(maxWidth: .infinity, alignment: .leading)
                }.frame(minWidth: 270, idealWidth: 305, maxWidth: 380)
                VStack(spacing: 0) {
                    HStack {
                        Label("Router console", systemImage: "lock.shield").font(.headline)
                        Spacer()
                        Menu("Pages") {
                            Button("Device list") { store.open(.devices) }
                            Button("MAC rules / unblock") { store.open(.blocking) }
                            Button("QoS rules") { store.open(.qos) }
                        }.disabled(!store.connected || store.busy)
                    }.padding(12)
                    Divider()
                    ZStack {
                        RouterConsole(webView: store.webView)
                        if !store.connectionStarted {
                            VStack(spacing: 14) {
                                Image("Logo").resizable().interpolation(.high).frame(width: 100, height: 100)
                                Text("Connect locally").font(.title2.bold())
                                Text("The router's login and controls appear here.\nYour password goes directly to your router.")
                                    .multilineTextAlignment(.center).foregroundStyle(.secondary)
                                Button("Connect to 192.168.1.1") { store.connect() }.buttonStyle(.borderedProminent).tint(.teal)
                            }.frame(maxWidth: .infinity, maxHeight: .infinity).background(.background)
                        }
                    }
                }.frame(minWidth: 490, idealWidth: 620)
            }
            Divider()
            HStack(alignment: .top, spacing: 10) {
                if store.busy { ProgressView().controlSize(.small) }
                else { Image(systemName: store.error == nil ? "info.circle" : "exclamationmark.triangle").foregroundStyle(store.error == nil ? Color.secondary : Color.orange) }
                Text(store.error ?? store.message).font(.callout).textSelection(.enabled).frame(maxWidth: .infinity, alignment: .leading)
            }.padding(14).background(.bar)
        }
        .frame(minWidth: 1060, minHeight: 680)
        .onChange(of: store.selection) { _, _ in
            alias = store.selected.map { store.aliases[$0.mac] ?? "" } ?? ""
            profileIndex = ""
        }
    }
    private var capabilityNote: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Router capabilities").font(.headline)
            Label("Internet MAC blacklist", systemImage: "checkmark.circle").foregroundStyle(.teal)
            Label("Upload policing assistant", systemImage: "arrow.up.circle").foregroundStyle(.teal)
            Text("Separate download limits are not verified on this firmware. Internet blocking does not guarantee isolation from other local devices.").font(.callout).foregroundStyle(.secondary)
        }.padding(14).background(.quaternary.opacity(0.45), in: RoundedRectangle(cornerRadius: 12))
    }
    @ViewBuilder private func deviceInspector(_ device: Device) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Image(systemName: device.symbol).font(.largeTitle).foregroundStyle(.teal)
            Text(store.displayName(device)).font(.title3.bold()).textSelection(.enabled)
            Text(device.online ? "Online at last refresh" : "Remembered · offline at last refresh").font(.caption).foregroundStyle(.secondary)
        }
        VStack(alignment: .leading, spacing: 8) {
            Text(device.ip).font(.body.monospaced())
            Text(device.mac).font(.caption.monospaced())
            Text("Interface: \(device.network)")
            Text("Online duration: \(device.duration)").font(.caption)
        }.textSelection(.enabled)
        HStack {
            TextField("Friendly name", text: $alias).textFieldStyle(.roundedBorder)
            Button("Save") { store.rename(device, to: alias) }
        }
        Divider()
        VStack(alignment: .leading, spacing: 10) {
            Text("Internet access").font(.headline)
            Button("Prepare block…", systemImage: "hand.raised") { store.prepareBlock(device) }
                .disabled(store.busy || !store.connected)
            Button("Review rules / unblock…") { store.open(.blocking) }.disabled(store.busy || !store.connected)
            Text("Review the selected MAC before Apply. The router's MAC filter must be enabled. To unblock, remove only this device's entry. Avoid blocking the Mac you are using.")
                .font(.caption).foregroundStyle(.secondary)
        }
        Divider()
        VStack(alignment: .leading, spacing: 10) {
            Text("Upload limit").font(.headline)
            HStack {
                TextField("Mbps", text: $upload).textFieldStyle(.roundedBorder).frame(width: 80)
                Text("Mbps").foregroundStyle(.secondary)
            }
            Button("1. Prepare rate profile…") { store.prepareProfile(upload) }.disabled(store.busy || !store.connected)
            Text("Apply the profile on the right. Enter its assigned Index below.").font(.caption).foregroundStyle(.secondary)
            TextField("Saved profile Index", text: $profileIndex).textFieldStyle(.roundedBorder)
            Button("2. Prepare device rule…") { store.prepareClassification(device, index: profileIndex) }
                .disabled(store.busy || !store.connected || profileIndex.isEmpty)
            Text("Apply the device rule, then test upload speed on that device. Existing QoS rules may take precedence. Review or remove rules in the QoS page.").font(.caption).foregroundStyle(.secondary)
        }
        capabilityNote
    }
}

