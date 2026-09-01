# Facebook connect — owner setup

"Connect Facebook" under Study Together → Friends lets a student find which
of their Facebook friends already use the app. The code is built and gated
off by default — nothing below is optional if you want the button live.

## 1. Create the Meta app

1. https://developers.facebook.com/apps → **Create App** → **Consumer**.
2. Name it, e.g. "Nishany — Study Together".
3. **Settings → Basic**: note the **App ID** and **App Secret** (needed
   below). Set **App Domains** to your production domain and **Privacy
   Policy URL** to `https://<domain>/privacy` (already served by the app).

## 2. Add Facebook Login + request `user_friends`

1. **Add Product** → **Facebook Login** → **Web**. Site URL: your production
   origin, e.g. `https://synapse.example.com`.
2. **Facebook Login → Settings → Valid OAuth Redirect URIs**: add
   `https://synapse.example.com/`. Also add your Supabase callback
   (`https://<project-ref>.supabase.co/auth/v1/callback`) only if Facebook is
   also used for Supabase sign-in — this feature does not need it.
3. **Permissions and Features**: request **`user_friends`**. Until Meta
   approves it, this only works for the app's own admins/testers, added
   under **Roles**.

## 3. App Review (required for real students)

Submit for `user_friends`. Meta requires: Business verification, the live
Privacy Policy URL from step 1, a screen recording of Connect → matches
appearing (record it as an admin/tester, before approval), and a one-line
justification — "lets a student find which existing Facebook friends already
use this study app."

## 4. Environment variables (Coolify, not committed)

**Server** — `server/.env`:
- `FEATURE_FACEBOOK_FRIENDS=true`
- `FACEBOOK_APP_SECRET=<App Secret>`

**Client build** — root `.env`, set *before* the Vite build (Coolify build
args, since Vite bakes these in):
- `VITE_FEATURE_FACEBOOK_FRIENDS=true`
- `VITE_FACEBOOK_APP_ID=<App ID>`

Until all four are set, the button shows "waiting on Facebook's own review"
copy instead of a broken control — intentional, not a bug.

## 5. Smoke test

1. Add yourself as an app tester, and add a second Facebook test account as
   your Facebook friend.
2. Sign in to the app as two students; each does Study Together → Friends →
   **Connect Facebook** and completes the login dialog (scope:
   `public_profile, user_friends`).
3. Reload the Friends tab on either account — the other should appear under
   "Facebook friends are already here" with an **Add** button that behaves
   like directory search's.
4. Test **disconnect**, and confirm Meta's Data Deletion Instructions tester
   gets `200` from `POST /api/facebook/deletion-callback`.
