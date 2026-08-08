# Go-live, step by step (Coolify)

You deploy **two things** into the same Coolify Project → Environment as your
MariaDB, so they share the private network:

1. **The API** (`server/`) — talks to MariaDB + Resend.
2. **The SPA** (this repo root) — the website; talks only to the API.

Your secret values are in the repo's `.env.local` (gitignored). Open that file
side-by-side; below, "copy `X` from `.env.local`" means the value after `X=`.

---

## STEP 1 — Get the MariaDB **internal** connection details

In Coolify, open your **MariaDB** resource. Look for the **connection strings**
(usually under the resource's main page or a "Connection" section). You'll see two:

- an **Internal** one (host looks like a service name, e.g. `mariadb-xxxxx` or a
  UUID, port `3306`) ← **use this**
- an **External/Public** one (your server IP + `8823`) ← do NOT use for the app

Note the **internal host** and confirm the **internal port is 3306**.
Database/user are `synapsedb` (from `.env.local`).

> Why internal: the API runs inside Coolify next to the DB, so it reaches it over
> the private network. That's also what lets you close the public port in Step 4.

---

## STEP 2 — Deploy the API (`server/`)

1. Coolify → your Project → **+ New** → **Resource** → **Application** → **Public
   Repository** (or GitHub App) → repo `omary98/synapse`, branch `main`.
2. **Build settings**:
   - **Base Directory**: `server`
   - **Build Pack**: Dockerfile (Coolify auto-detects `server/Dockerfile`)
   - **Port (Ports Exposes)**: `8080`
3. **Environment Variables** (Application → *Environment Variables* tab → add each;
   paste values from `.env.local`):

   | Name | Value (where from) |
   |------|--------------------|
   | `DB_HOST` | the **internal host** from Step 1 |
   | `DB_PORT` | `3306` |
   | `DB_NAME` | `synapsedb` |
   | `DB_USER` | `synapsedb` |
   | `DB_PASSWORD` | copy `DB_PASSWORD` from `.env.local` |
   | `RESEND_API_KEY` | copy `RESEND_API_KEY` (the **sending** key) from `.env.local` |
   | `MAIL_FROM` | `synapse@mail.doitrous.com` |
   | `API_BEARER` | make up a long random string (e.g. run `openssl rand -hex 32`) — **remember it for Step 3** |
   | `CORS_ORIGIN` | your website URL, e.g. `https://synapse.doitrous.com` (you can fill this after Step 3 and redeploy) |

4. **Deploy**. When it's up, open `https://<api-domain>/api/health` — you should
   see `{"ok":true}`. (The schema is created automatically on first boot.)

Give the API a domain in Coolify (e.g. `api.synapse.doitrous.com`) — note it for Step 3.

---

## STEP 3 — Deploy the SPA (repo root)

1. Coolify → same Project → **+ New** → **Application** → same repo, branch `main`.
2. **Build settings**:
   - **Base Directory**: `/` (root)
   - **Build Pack**: **Nixpacks** (Node) — or Static
   - **Install**: `npm ci` · **Build**: `npm run build` · **Output/Publish dir**: `dist`
   - It's a single-page app, so enable **SPA fallback** (serve `index.html` for all
     paths). Coolify's static option has this; the repo also ships `vercel.json` and
     `public/_redirects` for other hosts.
3. **Environment Variables** (these are safe to expose — they're build-time):

   | Name | Value |
   |------|-------|
   | `VITE_API_BASE` | `https://<api-domain>/api` (from Step 2, note the `/api`) |
   | `VITE_API_TOKEN` | the **same** random string you set as `API_BEARER` |

4. **Deploy**. Visit the site → it loads **empty** (no demo data), reads/writes to
   MariaDB. Add a system in Subjects & Topics, reload → it persists. 🎉
5. Go back to the **API** app, set `CORS_ORIGIN` to this site's URL, redeploy the API.

---

## STEP 4 — Lock the public MariaDB port (8823)

Now that the API uses the internal network, the public port is unnecessary — close it:

1. Coolify → your **MariaDB** resource.
2. Find where the public port was set. Depending on your Coolify version it's one of:
   - the **"Public Port"** field (a number input showing `8823`) → **clear it (empty)** → Save, **or**
   - a **"Make it publicly available"** / **"Enable public port"** toggle → **turn it OFF** → Save.
   (It's on the resource's main **Configuration** page, often under a *Network* /
   *General* section, near where you originally set `8823`.)
3. **Redeploy / Restart** the MariaDB resource so the change takes effect.
4. Verify it's closed: from your laptop, `nc -vz <your-server-ip> 8823` should now
   **fail/timeout** (before, it connected). Your API keeps working because it uses
   the internal host from Step 1.

If you can't find the toggle, tell me your Coolify version (bottom of the dashboard)
and I'll point to the exact spot.

---

## STEP 5 — Rotate the exposed secrets

You pasted these in chat, so treat them as burned once everything works:
- In **Resend** → API Keys → roll both keys → update `RESEND_API_KEY` in the API env.
- In **Coolify** → MariaDB → change the DB/root passwords → update `DB_PASSWORD`
  in the API env + your `.env.local`.

---

## Mail later
Sending works as soon as the API has `RESEND_API_KEY` (verify `mail.doitrous.com`
is a verified domain in Resend). The **inbox** needs Resend inbound routing pointed
at `https://<api-domain>/api/webhooks/resend/inbound`, and the admin **Mail Box UI**
(not built yet) to read it. Say the word and I'll build that page.
