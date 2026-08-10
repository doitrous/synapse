# Synapse API

Node/Express service backing the Synapse SPA with MariaDB + Resend. It owns all
secrets — the browser never sees the Resend key or DB password.

## Run locally

```bash
cd server
cp .env.example .env          # fill DB_* + RESEND_API_KEY + API_BEARER
npm install
npm start                     # applies schema.sql on boot, then listens on :8080
```

Health check: `GET /api/health` → `{ ok: true }`.

## Deploy on Coolify

1. New **Application** → source = this repo, base directory `server`, build with the
   included `Dockerfile` (or Nixpacks Node). Port `8080`.
2. Set env vars from `.env.example` (see root `.env.local` for the actual values):
   `DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD`, `RESEND_API_KEY`, `MAIL_FROM`,
   `API_BEARER`, `CORS_ORIGIN=https://<your-spa-domain>`.
3. **Lock the MariaDB port (8823) to the private network** so it isn't public.
4. In a split deployment, set `VITE_API_BASE=https://<api-domain>/api`. Never
   expose `API_BEARER` as a `VITE_` variable. Enter the owner key at runtime on
   `/login`; it is retained only in that browser tab.

## Endpoints

- `GET/PUT/DELETE /api/state/:key`, `GET /api/state` — the JSON document store that
  backs every admin/student surface (taxonomy, content ledger, universities,
  concepts, plans, colours, email log, …).
- `GET/POST/PATCH/DELETE /api/students` — student roster.
- Mail: `GET /api/mail`, `GET /api/mail/:id`, `GET /api/mail/attachment/:id`,
  `POST /api/mail/send`, `GET/POST /api/mailboxes`,
  `POST /api/webhooks/resend/inbound`.

## Auth

Every `/api/*` route (except health + the signed inbound webhook) requires either
a verified Supabase user token or the temporary server-only owner access key.
New users are students. Admin promotion is explicit, audited, and requires MFA
assurance level 2. Remove `API_BEARER` and set `AUTH_BYPASS_ENABLED=false` only
when the owner explicitly closes preview access.
