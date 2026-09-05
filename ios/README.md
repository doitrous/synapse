# Nishany for iOS

The native student app. Admins keep using the web console — this covers the
student portal only.

## Setup

```bash
cp ios/Config/Secrets.example.xcconfig ios/Config/Secrets.xcconfig
```

Fill in `SUPABASE_HOST` and `SUPABASE_ANON_KEY` from the Supabase dashboard
(Project Settings → API). `Secrets.xcconfig` is gitignored; the app builds
without it and shows a "Not configured" screen naming this step, so a fresh
clone never fails to compile.

Two things worth knowing before editing that file:

- **Strip `https://` from the host.** An xcconfig treats `//` as the start of a
  comment, so pasting a full URL silently truncates it to `https:`. The scheme
  is added back in `AppConfig`.
- **Use the publishable ("anon") key, never the service role key.** The service
  role key bypasses every row-level security policy and must not ship in an app.

Then open `ios/Nishany.xcodeproj` and run, or from the command line:

```bash
xcodebuild build -project ios/Nishany.xcodeproj -scheme Nishany -destination 'platform=iOS Simulator,name=iPhone 17'
```

**Do not pass `CODE_SIGNING_ALLOWED=NO`, even for the simulator.** An unsigned
app carries no entitlements, and without them Keychain access fails — which is
where `supabase-swift` keeps the session. The visible symptom is not an error
about the Keychain: sign-in appears to succeed, the token then reads back as
`nil`, the request goes out with no `Authorization` header, and the API answers
401. It looks exactly like a rejected password.

## How it fits the existing stack

The app is a client of the same Express API in `server/`. It adds no
Nishany-specific backend of its own.

- **Auth** — `supabase-swift` signs in and holds the session; the access token
  goes to `/api` as a bearer, which `server/src/auth.js` verifies against the
  project JWKS. Identical to how the web app authenticates.
- **Content** — the 14 documents in `STUDENT_READABLE_STATE`
  (`server/src/index.js`). Fetched, cached, and rendered generically, which is
  what lets new articles and questions appear without an app release.
- **Progress** — `/api/user-state/:key`, using the same key names as the web
  app. The routing rule lives in `src/lib/stateOwnership.ts`
  (`USER_OWNED_PATTERNS`) and **must be mirrored exactly here** — a key written
  under a different name would split a student's progress between their phone
  and their browser without either side reporting an error.

## Layout

| Path | What lives there |
|---|---|
| `Config/` | Build settings, `Info.plist`, and the gitignored secrets file. Not part of the source group. |
| `Nishany/Core/Config` | `AppConfig` — reads the build's configuration, reports what's missing. |
| `Nishany/Core/API` | `NishanyAPI` — the thin API client. Holds no cache and no state. |
| `Nishany/Core/Auth` | `AuthModel` — sign in/up/reset, and confirming the session against the API. |
| `Nishany/Design` | `Theme` — the palette and type scale, ported from `src/index.css`. |
| `Nishany/Features` | Screens. |

`Nishany/` is a synchronized file-system group, so files added on disk are
picked up automatically — the `.xcodeproj` does not need editing to add a file.

## State of the build

Done:

- the project, sign-in / sign-up / password reset, session restore, and the
  `/api/session` round-trip that proves the whole auth chain;
- the local cache (`LocalStore`) — SQLite via GRDB, with an FTS5 index for
  library and question search, and an outbox for writes made offline;
- the sync engine (`SyncEngine`) — manifest-driven catalogue pull, ledger
  shredding, and outbox drain.

43 tests cover the parts that fail quietly rather than loudly: key routing
against the web app's rules, precedence between a local edit and the server's
copy, the ledger's per-kind scope fields, and not losing a note typed while an
upload is in flight.

Next, in order: the reading surfaces (Library, Resources), Question Bank,
Dashboard and Performance, Calendar / Notebook / Practical, then push.

### Compatibility note

`SyncEngine` tolerates an API that predates `GET /api/state/manifest`: a 404
there makes it fall back to fetching every catalogue, which is how sync worked
before the endpoint existed. That matters during rollout — the app can reach
TestFlight before the server is redeployed without looking broken.
