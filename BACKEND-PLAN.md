# Nishany Backend Plan — MariaDB + Resend on Coolify

The app today is a static SPA that stores everything in the browser's
`localStorage`, seeded from demo data. That's why your data "resets to default
university names": every browser re-seeds from `src/data/*` on first load, and
there is no shared source of truth. The fix is a small backend: **one API service
+ MariaDB + Resend**, and swapping the frontend's storage hooks to call the API.

This document is the build order. It is designed so each phase is shippable.

---

## 0. Architecture (smallest thing that works)

```
Browser SPA ──HTTPS──> API service (Node/Express or Fastify) ──> MariaDB
                                   │
                                   └──> Resend (send)  ◄── Resend inbound webhook (receive)
```

- **API service**: one container on Coolify (Node 20). Owns all reads/writes and
  the Resend calls. Holds the secrets (never the browser).
- **MariaDB**: the Coolify database you created. **Lock port 8823 to the API
  container's private network** — do not leave it public.
- **Auth**: add real login (email + password or magic link). Until then, protect
  the API with a shared bearer token set in both the API and the SPA build env.

### The persistence seam (why this is not a rewrite)
Every writable surface already goes through a tiny set of hooks:
`usePersistentState`, `useLiveLibrary`, `useLiveResources`, `useTaxonomyTree`,
`useUniversityCatalogue`, the content ledger (`CONTENT_LEDGER_STORAGE_KEY`),
`systemColors`, `plans`, `emailLog`, concept graph. Swap those to call the API
(fetch + optimistic cache) and the whole app becomes DB-backed without touching
page code. Keep the same shapes; change only where the bytes live.

---

## 1. Database schema (MariaDB)

Store the big editable trees as JSON documents keyed by a stable id — this
mirrors the current localStorage keys exactly, so migration is a copy. Add
relational tables only where you query across rows (students, emails).

```sql
-- Generic key/value document store (mirrors localStorage keys 1:1)
CREATE TABLE app_state (
  k           VARCHAR(128) PRIMARY KEY,     -- e.g. 'nishany-admin-content-ledger-v4'
  v           LONGTEXT NOT NULL,            -- JSON
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Students (already modelled in src/data/students.ts)
CREATE TABLE students (
  id VARCHAR(64) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE,
  university_id VARCHAR(64), year VARCHAR(32), plan VARCHAR(64), status VARCHAR(32),
  joined DATE, last_active DATETIME, questions_answered INT, accuracy FLOAT, readiness FLOAT
);

-- Mail
CREATE TABLE mailboxes (       -- the addresses you create, e.g. synapse@mail.doitrous.com
  address VARCHAR(255) PRIMARY KEY, label VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE emails (
  id VARCHAR(64) PRIMARY KEY,
  direction ENUM('inbound','outbound') NOT NULL,
  mailbox VARCHAR(255),                       -- which of our addresses
  from_addr VARCHAR(255), to_addr TEXT, cc TEXT, bcc TEXT,
  subject VARCHAR(998), html LONGTEXT, text LONGTEXT,
  status VARCHAR(32),                          -- Sent/Delivered/Opened/Bounced/Received/Failed
  resend_id VARCHAR(128), at DATETIME, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (mailbox, direction, at)
);
CREATE TABLE attachments (
  id VARCHAR(64) PRIMARY KEY, email_id VARCHAR(64),
  filename VARCHAR(255), content_type VARCHAR(128), size_bytes INT,
  storage_url TEXT,                            -- object storage key, or base64 in a LONGBLOB for small files
  FOREIGN KEY (email_id) REFERENCES emails(id) ON DELETE CASCADE
);
```

---

## 2. API endpoints

```
# State (covers taxonomy, ledger, universities, concepts, plans, colors, emailLog…)
GET    /api/state/:key            -> { v }            (returns null if unset)
PUT    /api/state/:key            <- { v }            (upsert; last-write-wins + updated_at)
GET    /api/state                 -> { [key]: v }     (bulk hydrate on app boot)

# Students
GET    /api/students              POST /api/students   PATCH/DELETE /api/students/:id

# Mail
GET    /api/mail?box=&dir=        -> list (inbox/outbox/all, filter by mailbox)
GET    /api/mail/:id              -> full message + attachments
POST   /api/mail/send             <- { from, to, cc?, subject, html, attachments[] }  (Resend send + store outbound)
GET    /api/mail/attachment/:id   -> streams the file (download)
POST   /api/mailboxes             <- { address, label }   (create example@mail.doitrous.com)
POST   /api/webhooks/resend/inbound   (Resend calls this; store inbound + attachments)
```

Send uses the **sending-only** Resend key (`RESEND_API_KEY`). Creating addresses/
domains uses the **full-access** key (`RESEND_ADMIN_API_KEY`) — keep it out of the
send path.

---

## 3. Mail Box (admin tab) — front + back

Front-end `MailBox` admin page (mirrors the existing Email & Automations styling):
- **Folders**: All · Inbox · Outbox · (per-mailbox filter). Reads `/api/mail`.
- **Compose**: to/cc/subject/body + **attachments** (multipart upload → `/api/mail/send`).
- **Message view**: renders html/text, lists attachments with **download** buttons
  (`/api/mail/attachment/:id`).
- **Addresses**: list mailboxes; "New address" → `/api/mailboxes` (creates
  `example@mail.doitrous.com`; also add it as a Resend sending identity/route).

Receiving requires pointing **Resend inbound** (or an MX route on `mail.doitrous.com`)
at `POST /api/webhooks/resend/inbound`. Until inbound is configured, Inbox is empty
but everything else (send, outbox, attachments) works.

---

## 4. Remove demo data / green light for real data

1. Ship the API + `GET /api/state` bulk hydrate.
2. On boot, the SPA hydrates from the API; if a key is **absent**, it starts
   **empty** (not from the demo seed). Gate the `initial*` seeds behind
   `import.meta.env.DEV` (or a `?seed=1` flag) so production is blank.
3. Provide an admin **"Reset to empty"** that clears server state for a key —
   this is your "wipe demo data" button.
4. Then enter real universities/taxonomy/content once; it lives in MariaDB and is
   shared across every device and browser. No more resets.

**Interim (before the API lands):** I can add a client-only "Start empty" action
that clears the seeded `localStorage` so you can trial real data in one browser
now — but it stays local until the DB is live. Say the word and I'll add it.

---

## 5. Coolify / env

- Deploy the API as a Node service; set (server env, never `VITE_`):
  `DATABASE_URL`, `RESEND_API_KEY`, `RESEND_ADMIN_API_KEY`, `MAIL_FROM`,
  `RESEND_DOMAIN`, `SUPABASE_URL`. Values are in `.env.local`.
- Set the SPA build env: `VITE_API_BASE=https://<api-host>/api`. The temporary
  owner key is typed at runtime on `/login`; it is never compiled into the SPA.
- MariaDB: restrict `8823` to the API's private network.
- **Rotate** the keys/passwords you pasted in chat once wired.

---

## Suggested build order
1. API skeleton + `app_state` GET/PUT + bearer auth. (½ day)
2. Swap `usePersistentState` to hydrate/persist via `/api/state`. (½ day) → **data stops resetting.**
3. Students table + endpoints. (¼ day)
4. Mail send + outbox + attachments + Mail Box UI. (1 day)
5. Resend inbound webhook + Inbox. (½ day, after DNS/inbound is set up)
6. Real auth to replace the shared bearer. (½–1 day)
```
