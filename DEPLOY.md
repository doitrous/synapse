# Deploying Synapse

Synapse is a static single-page app (React + React Router + Vite). It builds to a
folder of static files and runs on any static host. No server is required for the
app itself — only for real email sending (optional, see below).

## 1. Build

```bash
npm ci
npm run build     # runs tsc -b then vite build → ./dist
npm run preview   # optional: serve ./dist locally to verify
```

The output is `./dist`. Everything is self-contained (fonts are bundled; no
external requests at runtime).

## 2. Host (client-side routing needs a SPA fallback)

Because routes like `/admin/questions` are client-rendered, every path must fall
back to `index.html`. Config is already included:

- **Vercel** — `vercel.json` (rewrites all paths to `/index.html`, long-caches
  hashed assets). Import the repo and deploy; build command and output dir are set.
- **Netlify** — `public/_redirects` (`/* /index.html 200`). Set build command
  `npm run build`, publish directory `dist`.
- **Cloudflare Pages / other** — build `npm run build`, output `dist`, and add a
  catch-all rewrite to `/index.html`.

Point the domain (`synapse.doitrous.com`, already in the meta tags) at the host.

### The admin domain

The dashboard answers on `adminsynapse.doitrous.com`, which is the **same
deployment** — one build, one container, one `/api`. Both domains are attached to
the same Coolify application; nothing separate is deployed for the admin.

The split is decided in the browser by `src/lib/portalHost.ts`:

- on `adminsynapse.*`, `/` lands on `/admin`, the marketing head is stripped, the
  page is marked `noindex`, and the public site and `/app` are handed to the
  student origin;
- on `synapse.*`, `/admin/*` is handed to the admin origin;
- on `localhost` or an IP, neither rule applies and every route stays mounted, so
  development is unaffected. To exercise the split locally, use
  `adminsynapse.localhost:5173` — `.localhost` subdomains resolve to loopback.

Sessions are stored per-origin, so an admin signs in once on each domain, and
`https://adminsynapse.doitrous.com` must be in Supabase's allowed redirect URLs.

## 3. Email & automations (optional, for real sending)

The app sends email through a serverless function so the Resend key never reaches
the browser. See `server/send-email.example.ts` and `.env.example`:

- Deploy the function (Vercel `/api`, Netlify function, etc.) and set
  `RESEND_API_KEY` in **that platform's** server environment — never `VITE_`-prefixed.
- Set `VITE_EMAIL_ENDPOINT` (the function URL) and `VITE_EMAIL_FROM` in the app's
  build env. Until set, the app runs in demo mode (messages are logged, not sent) —
  the Email & Automations page shows which mode is active.

## 4. What persists where

All admin edits and student state live in the browser's `localStorage` (keys
prefixed `synapse-…`). This makes the prototype fully functional with no backend.
For a multi-user production deployment, back these stores with a real API +
authentication — the app already reads/writes through small typed hooks
(`usePersistentState`, `useLiveLibrary`, `useLiveResources`, the content ledger),
so swapping the storage layer is localized.

## 5. Pre-launch checklist

- [x] Production build passes (`npm run build`).
- [x] SPA fallback configured (Vercel + Netlify).
- [x] Top-level error boundary (graceful recovery screen, not a white page).
- [x] SEO/social meta complete (title, description, canonical, hreflang, OpenGraph, Twitter, theme-color, favicon).
- [x] Responsive on mobile & tablet (drawer nav, scrolling tables, stacking grids).
- [ ] Set `VITE_EMAIL_ENDPOINT` + deploy the Resend function (if live email is wanted).
- [ ] Replace demo `localStorage` persistence with a real API + auth (for multi-user).
- [ ] (Optional) Route-level code-splitting to shrink the initial JS (currently ~285 KB gzip).
- [ ] Point analytics + a privacy/terms page if collecting real user data.
