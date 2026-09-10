# Go-live, step by step (Coolify) — single app + MariaDB

You only need **two resources**, which is exactly what you have:

1. **One Application** (this repo) that serves **both the website and the API**.
2. **MariaDB**.

The root `Dockerfile` builds the website and bundles it into the API container, so
the app answers the website on `/` and the backend on `/api` from the same origin.

Your secret values are in the repo's `.env.local` (gitignored). Open it alongside
this file; "copy `X`" = the value after `X=`.

---

## STEP 1 — MariaDB internal connection

Open your **MariaDB** resource in Coolify and find its **Internal** connection
string (host looks like a service name/UUID, **port 3306**). Use that — not the
public `188.34.198.167:8823`. Confirm the **database name** shown (your pasted
string said `default`).

Build the URL: `mysql://synapsedb:<DB_PASSWORD>@<internal-host>:3306/<dbname>`

---

## STEP 2 — Configure the Application (the one you already made)

Point it at this repo, branch `main`, and set:

- **Base Directory**: `/` (root)
- **Build Pack**: **Dockerfile** (Coolify uses the root `Dockerfile`)
- **Port**: `8080`
- A **domain** (e.g. `synapse.doitrous.com`).

**Environment variables** (Application → *Environment Variables*):

| Name | Value | Also a build variable? |
|------|-------|------------------------|
| `DATABASE_URL` | the internal URL from Step 1 | no |
| `RESEND_API_KEY` | copy the **sending** key from `.env.local` | no |
| `MAIL_FROM` | `info@nishany.com` (support/fallback sender; transactional & news default to `no-reply@mail.nishany.com` / `news@news.nishany.com`) | no |
| `SUPABASE_URL` | your Supabase project URL | no |
| `VITE_SUPABASE_URL` | the same Supabase project URL | **yes** |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key (never service-role) | **yes** |

> **`API_BEARER` and `AUTH_BYPASS_ENABLED` are gone.** They granted an admin
> identity to anyone holding a shared secret, and the fallback that applied when
> Supabase was unconfigured made *every* request an admin. Delete both variables
> from the application if they are still set; nothing reads them.
>
> Never create `VITE_API_TOKEN` either: every `VITE_` value is public in the
> browser bundle. `VITE_API_BASE` is already hardcoded to `/api` in the Dockerfile.

`SUPABASE_URL` is now required. Without it the server can verify no tokens and
every `/api/*` request is refused — which is the intended failure, not an outage
to work around with a bypass.

**Deploy.** Then:
- `https://<your-domain>/api/health` → `{"ok":true}` (DB tables auto-create on first boot).
- `https://<your-domain>/` → the app loads **empty** (no demo data), reads/writes MariaDB.
  Add a system in Subjects & Topics, reload → it persists. Open **Mail Box** → compose works.

---

## Database migrations

Schema changes now live as files in `server/migrations/*.sql`, applied in
filename order and tracked in `schema_migration_files` (see
`server/migrations/README.md` for the naming/idempotency rules). `npm run
migrate` (`server/src/migrate.js`) applies anything new and exits 0/1 — the
app also runs this at boot, but once this is stable it should become the
Coolify **pre-deploy command** instead, so the runtime DB user can lose DDL
rights and only the deploy step needs schema-altering privileges.

---

## STEP 3 — Close the public MariaDB port (8823)

The app now uses the internal DB host, so the public port is unnecessary:

1. Coolify → **MariaDB** resource → its **Configuration** page (where you set `8823`).
2. Either **clear the "Public Port" field** or **turn off "Make it publicly available"** → Save.
3. **Restart** the MariaDB resource.
4. Verify from your laptop: `nc -vz 188.34.198.167 8823` should now **time out**.

---

## STEP 4 — Rotate the exposed secrets
You pasted these in chat — once everything works, roll both Resend keys and the
DB passwords, and update `RESEND_API_KEY` / `DATABASE_URL` in the app's env.

---

## Mail: sending vs inbox
- **Sending** works immediately (verify `mail.doitrous.com` is a **verified domain**
  in Resend). Compose → Send in the Mail Box.
- **Receiving (Inbox)** needs Resend **inbound routing** for `mail.doitrous.com`
  pointed at `https://<your-domain>/api/webhooks/resend/inbound`. Until then the
  Inbox is empty but Outbox, attachments, and new addresses all work.
- **New addresses**: Mail Box → Addresses → New → e.g. `admissions` →
  creates `admissions@mail.doitrous.com`.
