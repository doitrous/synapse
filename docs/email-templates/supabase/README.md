# Supabase auth email templates

Paste each file's full contents into Supabase → Authentication → Emails → Templates → *Body (HTML)*, and set the subject shown. The links point at `/api/auth/verify`, which redeems the token server-side and sets the session cookie; `{{ .ConfirmationURL }}` must not be used.

| Template in Supabase | File | Subject |
|---|---|---|
| Confirm sign up | `confirm-signup.html` | Confirm your Nishany account |
| Reset Password | `reset-password.html` | Reset your Nishany password |
| Magic Link | `magic-link.html` | Your Nishany sign-in link |
| Change Email Address | `change-email.html` | Confirm your new Nishany email |
| Invite user | `invite.html` | You are invited to Nishany |

The logo is loaded from `https://nishany.com/brand/nishany-lockup.png`; regenerate with `node docs/email-templates/supabase/gen.mjs docs/email-templates/supabase` after editing the copy in `gen.mjs`.
