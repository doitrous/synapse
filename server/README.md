# Synapse API

Node/Express service backing the Synapse SPA with MariaDB + Resend. It owns all
secrets — the browser never sees the Resend key or DB password.

## Run locally

```bash
cd server
cp .env.example .env          # fill DB_* + RESEND_API_KEY + SUPABASE_URL
npm install
npm start                     # applies schema.sql on boot, then listens on :8080
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

## Auth

Every `/api/*` route (except health + the signed inbound webhook) requires a
verified Supabase user token. There is no bypass and no shared access key: a
secret that mints an admin identity is indistinguishable from a stolen one.
`SUPABASE_URL` must therefore be set, or every request is rejected.

New users are students; admin promotion is explicit and audited. A second factor
is **optional** — `user_access.mfa_required` records that an account asked to be
held to assurance level 2, and only those accounts are refused at `aal1`.
