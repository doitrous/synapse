# Connect Cortex API

Node/Express service backing the Connect Cortex SPA with MariaDB + Resend. It owns all
secrets — the browser never sees the Resend key or DB password.

## Run locally

```bash
cd server
cp .env.example .env          # fill DB_* + RESEND_API_KEY + SUPABASE_URL
npm install
npm start                     # applies server/migrations/*.sql on boot, then listens on :8080
```

Health check: `GET /api/health` → `{ ok: true }`.

## Deploy on Coolify

1. New **Application** → source = this repo, base directory `server`, build with the
   included `Dockerfile` (or Nixpacks Node). Port `8080`.
2. Set env vars from `.env.example` (see root `.env.local` for the actual values):
   `DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD`, `RESEND_API_KEY`, `MAIL_FROM`,
   `SUPABASE_URL`, `CORS_ORIGIN=https://<your-spa-domain>`.
3. **Lock the MariaDB port (8823) to the private network** so it isn't public.
4. In a split deployment, set `VITE_API_BASE=https://<api-domain>/api`.

## Endpoints

- `GET/PUT/DELETE /api/state/:key`, `GET /api/state` — the JSON document store that
  backs every admin/student surface (taxonomy, content ledger, universities,
  concepts, plans, colours, email log, …).
- `GET/POST/PATCH/DELETE /api/students` — student roster.
- Mail: `GET /api/mail`, `GET /api/mail/:id`, `GET /api/mail/attachment/:id`,
  `POST /api/mail/send`, `GET/POST /api/mailboxes`,
  `POST /api/webhooks/resend/inbound`.
- Study assistant: `GET /api/assistant/status`, `POST /api/assistant/chat` (student);
  `GET/PUT /api/admin/assistant`, `PUT/DELETE /api/admin/assistant/tiers/:plan`,
  `GET /api/admin/assistant/usage`, `GET /api/admin/assistant/models` (admin).

## Study assistant

Off until an admin turns it on at **Admin → AI Assistant**, where the provider,
the model, the key and the per-plan limits are all set.

### Providers

| Provider | Wire format | Base URL |
|---|---|---|
| Groq | OpenAI-compatible | `https://api.groq.com/openai/v1` |
| OpenAI | OpenAI | `https://api.openai.com/v1` |
| Anthropic (Claude) | Anthropic | `https://api.anthropic.com/v1` |
| Google (Gemini) | Gemini | `https://generativelanguage.googleapis.com/v1beta` |
| xAI (Grok) | OpenAI-compatible | `https://api.x.ai/v1` |
| OpenRouter | OpenAI-compatible | `https://openrouter.ai/api/v1` |
| Custom | OpenAI-compatible | whatever you give it |

A key is stored **per provider**, so switching between them to compare does not
mean pasting keys back in. The base URL can be overridden on any provider to
route through a proxy, and is required for `custom`.

The model is a free-text field with a **Load models** button that asks the
provider what it currently accepts — model ids churn faster than any hardcoded
list, and a stale list means picking a model that 404s at the first question.

### Environment

| Var | Required | What it does |
|---|---|---|
| `ASSISTANT_KEY_SECRET` | To store a key | 16+ characters. Wraps API keys at rest (AES-256-GCM). Without it, the admin screen refuses to save a key rather than writing one in plaintext |
| `GROQ_API_KEY` | No | Fallback key for Groq |
| `OPENAI_API_KEY` | No | Fallback key for OpenAI |
| `ANTHROPIC_API_KEY` | No | Fallback key for Anthropic |
| `GEMINI_API_KEY` / `GOOGLE_API_KEY` | No | Fallback key for Gemini |
| `XAI_API_KEY` / `GROK_API_KEY` | No | Fallback key for Grok |
| `OPENROUTER_API_KEY` | No | Fallback key for OpenRouter |
| `ASSISTANT_API_KEY` | No | Fallback key for a custom endpoint |

A per-provider environment key is used only when no key has been saved for that
provider from the admin screen. A key for one provider is never offered to
another.

The key is never returned to any client — the admin screen sees its last four
characters and where it came from. Rotating `ASSISTANT_KEY_SECRET` makes a
stored key unreadable; the screen says so and asks for it again, and the
environment key keeps working meanwhile.

Daily message limits are per plan and enforced before the model is called, so a
client cannot spend anything by ignoring its own count. A plan with no limit row
falls back to `free`. Design and test scenarios: `docs/assistant-design.md`,
`docs/assistant-testing.md`.

## Auth

Every `/api/*` route (except health + the signed inbound webhook) requires a
verified Supabase user token. There is no bypass and no shared access key: a
secret that mints an admin identity is indistinguishable from a stolen one.
`SUPABASE_URL` must therefore be set, or every request is rejected.

New users are students; admin promotion is explicit and audited — including the
first one, which no signed-in user can perform and which
`npm run promote-admin -- <email> --commit` does from the database instead. A second factor
is **optional** — `user_access.mfa_required` records that an account asked to be
held to assurance level 2, and only those accounts are refused at `aal1`.

## Study room voice

Study rooms carry a live WebSocket at `/api/rooms/ws?code=<room code>` — the
same origin and the same HTTP server as the API, authenticated with the same
Supabase token (presented as the `nishany.bearer` subprotocol, because a browser
cannot set a header on a WebSocket and a token in a query string is a token in
every proxy log). It carries presence, speaking, and the mediasoup SFU
negotiation.

The SFU is loaded lazily: a host that cannot run mediasoup's native worker still
boots, still opens rooms, and still shows seats and presence — the room says
voice is unavailable and gives the reason. The boot log says which:

```
Study room signalling ready, voice ready
Study room signalling ready, voice unavailable (<reason>)
```

Media does **not** travel over the HTTP port. Open UDP **and** TCP
`SFU_RTC_MIN_PORT`–`SFU_RTC_MAX_PORT` (40000–40400 by default, four ports per
member in voice, so ~100 concurrent speakers; must equal the published port
mapping — raise env, mapping and firewall together to scale) on the host and
in Coolify, and set `SFU_ANNOUNCED_IP` to this machine's public IP — unset, voice
only connects on the server host itself. A `coturn` server (`TURN_URLS`,
`TURN_USERNAME`, `TURN_CREDENTIAL`) is required for reliability: STUN alone
fails behind symmetric NAT and on most mobile carriers.

Full protocol, migration SQL and a two-browser verification script:
`docs/rooms-voice.md`.

## Content Security Policy

- `MIGRATE_DATABASE_URL` — optional; when set, `npm run migrate` (the pre-deployment step) connects with it instead of `DATABASE_URL`. Lets the app run as a DML-only user while migrations run as one that may `CREATE`/`ALTER`.
- `CSP_ENFORCE` — the Content-Security-Policy is **enforced by default**; set `0` to ship it as `Content-Security-Policy-Report-Only` while a new third party is being allow-listed in `src/securityHeaders.js`.
