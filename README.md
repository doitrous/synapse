# Synapse / Connect Cortex

Synapse is the Connect Cortex undergraduate medical learning platform. It combines a React/Vite student app, a protected administration console, a Node/Express API, MariaDB persistence, Supabase Auth, Resend email, managed medical media, content-import tooling, and an in-progress native iOS student client.

The same repository can run in two modes:

- **Demo mode**: leave `VITE_API_BASE` unset. The browser uses localStorage and seeded demo data. No real authentication, database writes, email, media upload, or API authorization is exercised.
- **Live mode**: set `VITE_API_BASE` and Supabase browser keys. The app reads/writes through `server/`, uses Supabase sessions as bearer tokens, and persists shared and student-owned state in MariaDB.

## Architecture

| Layer | Current implementation |
| --- | --- |
| Web app | React 19, Vite, TypeScript, Tailwind CSS v4, React Router 7, lucide-react, self-hosted fonts |
| API | Node 20, Express 4, `mysql2`, compression, CORS, MariaDB boot-time schema setup |
| Authentication | Supabase Auth in the browser; API verifies Supabase JWTs against the project JWKS |
| Authorization | Server-owned `user_access` roles, tab permissions, reviewer content scope, admin MFA requirement |
| Persistence | MariaDB tables plus JSON state documents in `app_state` and per-user documents in `user_state` |
| Email | Resend for sending, inbound webhook, unsubscribe tokens, mailbox/address records |
| Media/storage | Server-managed resource files, user documents, and media assets under `RESOURCE_STORAGE_DIR` |
| iOS | Native student app in `ios/`, using `supabase-swift` and the same Express API |
| Deployment | Root Dockerfile builds the Vite app and serves it from the API container on port 8080 |

## Main Routes

Public and auth:

- `/`, `/en`, `/ar` - public landing pages.
- `/pricing`, `/ar/pricing` - public pricing pages.
- `/login`, `/signup`, `/logout` - account entry and sign-out.
- `/auth/verify-email`, `/auth/mfa`, `/auth/forgot-password`, `/auth/reset-password` - Supabase-backed account flows.
- `/unsubscribe` - public email unsubscribe.
- `/s/:id` - shared note/board/document link; the server decides whether it is public, view-only, or editable.

Student portal:

- `/app` - dashboard.
- `/app/library`, `/app/qbank`, `/app/adaptive`, `/app/practical`, `/app/flashcards`, `/app/essays`.
- `/app/resources`, `/app/resources/:id`, `/app/taxonomy`.
- `/app/term-grid`, `/app/spotter`, `/app/term-match`.
- `/app/calendar`, `/app/performance`, `/app/whiteboard`, `/app/notebook`.
- `/app/study-together`, `/app/billing`, `/app/account`.

Admin console:

- `/admin` - first permitted admin tab, usually the control dashboard.
- `/admin/academic`, `/admin/academic/import`, `/admin/academic/marks`.
- `/admin/library`, `/admin/library/coverage`, `/admin/library/media`, `/admin/library/evidence/import`.
- `/admin/questions`, `/admin/adaptive`, `/admin/concepts`, `/admin/concepts/import`.
- `/admin/relationships`, `/admin/relationships/import`, `/admin/taxonomy`, `/admin/taxonomy/import`.
- `/admin/glossary`, `/admin/glossary/import`, `/admin/practical`, `/admin/flashcards`, `/admin/written`, `/admin/histology`, `/admin/resources`.
- `/admin/import/:kind` - bulk import page for supported content kinds.
- `/admin/reports`, `/admin/users`, `/admin/students`, `/admin/notifications`, `/admin/vouchers`, `/admin/email`, `/admin/mailbox`, `/admin/payments`, `/admin/privacy`, `/admin/settings`, `/admin/audit`, `/admin/assistant`, `/admin/access`.

Production host split is runtime-based in `src/lib/portalHost.ts`: `synapse.*` serves the student portal and hands `/admin` to `adminsynapse.*`; `adminsynapse.*` serves the admin portal and hands student/public routes back. Localhost and preview hosts keep both portals mounted.

## Local Setup

Install the web app:

```bash
npm install
npm run dev
```

By default this is demo mode. To run against the API, start MariaDB, configure `server/.env`, start the API, and set `VITE_API_BASE` for the Vite app.

```bash
cd server
cp .env.example .env
npm install
npm start
```

The API applies `server/schema.sql` plus guarded column/index updates on boot. Health check:

```bash
curl http://127.0.0.1:8080/api/health
```

For a same-origin production-like build, use the root Dockerfile. It builds the Vite app with `VITE_API_BASE=/api`, copies `dist/` into the API image, and serves the SPA plus `/api` from port `8080`.

## Environment Variables

Browser-safe build variables:

| Variable | Use |
| --- | --- |
| `VITE_API_BASE` | API base path or origin. Unset means demo/localStorage mode; `/api` is used in the root Dockerfile. |
| `VITE_SUPABASE_URL` | Supabase project URL for browser auth. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key. `VITE_SUPABASE_ANON_KEY` is still accepted for compatibility. |
| `VITE_EMAIL_ENDPOINT`, `VITE_EMAIL_FROM` | Optional static email demo endpoint. Real mail should go through the server. |
| `VITE_FEATURE_FACEBOOK_FRIENDS` | Shows the Facebook friend-linking control only when paired with server support and Meta review. |

Server-only variables:

| Variable | Use |
| --- | --- |
| `PORT` | API/container port, default `8080`. |
| `DATABASE_URL` | Preferred MariaDB connection URL. |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | MariaDB connection fields when `DATABASE_URL` is absent. |
| `SUPABASE_URL` | Required for API JWT verification. Without it, protected API requests are refused. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key used for admin auth-user operations such as account deletion and recovery links. Never expose it to Vite or iOS. |
| `SUPER_ADMIN_EMAILS` | Comma-separated email allowlist that resolves to super-admin at request time. |
| `CORS_ORIGIN` | Comma-separated allowed origins for split deployments. Omit for development. |
| `RESEND_API_KEY` | Sending key for Resend. |
| `RESEND_ADMIN_API_KEY` | Optional broader Resend key for inbound/address operations; falls back to `RESEND_API_KEY` where supported. |
| `RESEND_WEBHOOK_SECRET` | Optional inbound webhook verification secret. |
| `MAIL_FROM` | Default sender address. |
| `PUBLIC_ORIGIN` | Public student origin used in email links. |
| `RESOURCE_STORAGE_DIR` | Root directory for managed medical resources, student documents, upload workspaces, and media files. Default `/data/medical-library`. |
| `RESOURCE_MAX_BYTES`, `RESOURCE_CHUNK_MAX_BYTES`, `RESOURCE_CHUNKED_MAX_BYTES` | Resource upload limits. |
| `MEDIA_MAX_BYTES` | Managed media upload limit. |
| `MY_DOCUMENT_MAX_BYTES`, `MY_DOCUMENT_QUOTA_BYTES` | Student document upload ceiling and fallback quota before admin storage settings are read. |
| `PUBLIC_DIR` | Directory served as the SPA build, default `server/public` inside the container. |
| `FEATURE_FACEBOOK_FRIENDS`, `FACEBOOK_APP_SECRET` | Facebook friend matching and Meta deletion callback support. |
| `ASSISTANT_KEY_SECRET`, provider keys such as `OPENAI_API_KEY`, `GROQ_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `XAI_API_KEY`, `OPENROUTER_API_KEY` | Optional AI assistant configuration. Saved provider keys are wrapped by `ASSISTANT_KEY_SECRET`. |

Never put database credentials, Resend keys, service-role keys, assistant provider keys, or shared admin secrets in a `VITE_` variable. Vite embeds those values in public JavaScript.

## Supabase Auth

The web client creates a Supabase browser client only when `VITE_SUPABASE_URL` and a publishable key are present. Email/password sign-up, login, email verification, password reset, logout, and TOTP MFA are wired through Supabase Auth. The API does not trust browser metadata for roles; it verifies the JWT and reads role/tab/scope state from MariaDB.

Configure Supabase URL allow-list and redirects for every deployed origin:

- Site URL: the main student origin, for example `https://synapse.example.com`.
- Additional redirect URLs: `https://synapse.example.com/auth/verify-email`, `https://synapse.example.com/auth/reset-password`, `https://synapse.example.com/auth/mfa`, plus the same paths on the admin origin if admins sign in there.
- Local development redirects: `http://localhost:5173/auth/verify-email`, `http://localhost:5173/auth/reset-password`, `http://localhost:5173/auth/mfa`, and any `adminsynapse.localhost`/`synapse.localhost` hostnames used to test the split.

Google and Facebook social login are not currently present in the React login form. When that UI is added, enable the Google and Facebook providers in Supabase Auth, enter the OAuth client credentials in Supabase, and include the Supabase provider callback URL shown in the dashboard in each provider's console. The app-side post-auth redirect should still land on the existing onboarding/account flow, not directly on protected content.

Facebook friend matching is separate from Supabase social login. The server has feature-flagged endpoints for linking a Meta app-scoped Facebook id and a deletion callback, but the UI labels the feature as waiting on Meta review.

## Data, State, and Media

Shared catalogue/admin state lives in MariaDB `app_state` documents and is guarded by role/tab permissions. Student-owned state lives under `/api/user-state/:key`, where the server derives the owner from the verified Supabase session. The front end routes known private keys through `src/lib/stateOwnership.ts`; demo mode stores the same keys in localStorage.

Medical resources and media are stored as files under `RESOURCE_STORAGE_DIR`, with metadata in MariaDB-backed state. Admin-managed media uploads go through `/api/media`; files are content-addressed by SHA-256 and released to students only when they have a stored file, alt text, and rights information. Student documents go through `/api/my-documents`, are stored under that student's server-owned path, and count against the student's current plan quota. Existing browser-only media helpers remain for demo/offline convenience, but live upload success is not reported until the server has accepted and returned the bytes.

## Content and Imports

Authoring guidance lives in `Instruction Manual for Content Creation/`. Start with `00-START-HERE.md`, then use the manual for the content type being authored: subjects/topics, concepts, relationships, library articles, questions, practical formats, glossary terms, and resources.

Important import locations:

- `docs/import-ready/` - validated batches staged for manual admin import.
- `docs/Ain-Shams-Source-Imports/` - Ain Shams Years 1-3 source manifests, coverage ledgers, evidence rows, resource rows, concepts, and articles. These are not imported automatically; local ASU curriculum claims are labelled `needs_evidence`.
- `scripts/asu/` - ASU source-foundation tooling.
- `scripts/kasr/` and `tools/` - Kasr/source organization, validation, catalog reconciliation, and import helpers.
- `server/scripts/apply-medical-library-v*.mjs` - guarded server-side application scripts; they require explicit apply environment flags.

Recommended content checks:

```bash
npm run medical:validate:authoring
npm run medical:validate:taxonomy
npm run medical:parity
npm run medical:simulate -- "docs/import-ready/"*/*.md
npm run medical:batch -- docs/import-ready/question/SYS-CVS-QUESTION-001.md
```

Use the admin import pages for the actual import and preview. Do not treat files in `docs/import-ready/` or `docs/Ain-Shams-Source-Imports/` as already published.

## Validation Commands

Before pushing platform changes, use the relevant gates for the area touched:

```bash
npm run lint
npm run build
npm run test
cd server && npm test
npm run medical:validate:authoring
npm run medical:validate:taxonomy
npm run medical:parity
npm run medical:simulate -- "docs/import-ready/"*/*.md
```

Additional useful checks:

```bash
cd server && npm run conncheck
cd server && npm run migrate
npm run load:students -- --users=5000 --target=http://127.0.0.1:4173
```

## Load Testing Scope

`reports/load/2026-08-24-5000-students.md` records a 5,000 simultaneous-student run against one local Vite preview process on `127.0.0.1`. It opened fresh browser journeys and downloaded the static module graph for dashboard, question bank, library, and practical routes.

That report is a **Vite-preview frontend delivery test only**. It did not use student credentials, did not call authenticated APIs, did not write production data, did not exercise MariaDB, did not test Supabase/Auth, and does not prove production API, database, authentication, payment, email, storage, CDN, or infrastructure capacity. Use it as a frontend asset/page-delivery baseline and run separate staging tests for authenticated API and MariaDB capacity.

The harness refuses remote targets unless `--allow-remote` is supplied.

## Email

Mail sending is server-side through Resend. The admin mailbox can send, list outbound/inbound records, serve attachments, and create mailbox addresses. Inbound mail requires Resend inbound routing pointed at:

```text
https://<your-domain>/api/webhooks/resend/inbound
```

Suppression/unsubscribe tokens are opaque and public-safe; transactional categories are not suppressed. Configure Supabase custom SMTP separately if Supabase confirmation/reset emails should come from the same verified domain.

## iOS

The native iOS student app lives in `ios/`. It uses `supabase-swift` for session storage and sends the access token to the same Express API. Setup:

```bash
cp ios/Config/Secrets.example.xcconfig ios/Config/Secrets.xcconfig
```

Set `SUPABASE_HOST` without `https://` and `SUPABASE_ANON_KEY`/publishable key from the Supabase dashboard. Do not use a service-role key. See `ios/README.md` for the current build state and simulator command.

## Deployment

For the current Coolify shape, use the root `Dockerfile` from repository root:

- one application container;
- port `8080`;
- MariaDB on the private/internal network;
- browser build variables only for Supabase publishable configuration;
- server secrets configured only on the application runtime.

See `DEPLOY-STEPS.md` for the detailed Coolify runbook. The older split `server/Dockerfile` is still present for API-only deployments, but the documented production path is the root Dockerfile serving both the SPA and `/api` from one origin.

Do not deploy or merge from feature branches without an explicit release request.
