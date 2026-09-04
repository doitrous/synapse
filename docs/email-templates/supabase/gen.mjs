import { writeFileSync, mkdirSync } from 'node:fs'
const out = process.argv[2]
mkdirSync(out, { recursive: true })

const VERIFY = '{{ .SiteURL }}/api/auth/verify?token_hash={{ .TokenHash }}'
const templates = {
  'confirm-signup': {
    subject: 'Confirm your Nishany account',
    preheader: 'One click and your study record is yours.',
    eyebrow: 'Welcome to Nishany',
    title: 'Confirm your email',
    lead: 'Thanks for joining. Confirm <strong>{{ .Email }}</strong> and your notes, plan and progress start saving under your own account.',
    button: 'Confirm my email',
    url: `${VERIFY}&type=signup`,
    after: 'The link works for 24 hours. If you did not create a Nishany account, you can ignore this email — nothing happens without the click.',
  },
  'reset-password': {
    subject: 'Reset your Nishany password',
    preheader: 'Choose a new password. Other devices will be signed out.',
    eyebrow: 'Account security',
    title: 'Set a new password',
    lead: 'We received a request to reset the password for <strong>{{ .Email }}</strong>. Use the button below to choose a new one.',
    button: 'Choose a new password',
    url: `${VERIFY}&type=recovery&next=/auth/reset-password`,
    after: 'The link works for one hour and can be used once. If you did not ask for this, ignore it — your password stays as it is. Changing it signs you out everywhere else.',
  },
  'magic-link': {
    subject: 'Your Nishany sign-in link',
    preheader: 'Tap to sign in. No password needed.',
    eyebrow: 'Sign in',
    title: 'Here is your sign-in link',
    lead: 'Use the button below to sign in to Nishany as <strong>{{ .Email }}</strong>. No password needed.',
    button: 'Sign in to Nishany',
    url: `${VERIFY}&type=magiclink`,
    after: 'The link works for one hour and only once. If you did not request it, ignore this email — no one can sign in without it.',
  },
  'change-email': {
    subject: 'Confirm your new Nishany email',
    preheader: 'Confirm the change from {{ .Email }} to {{ .NewEmail }}.',
    eyebrow: 'Account update',
    title: 'Confirm your new email address',
    lead: 'You asked to change the email on your Nishany account from <strong>{{ .Email }}</strong> to <strong>{{ .NewEmail }}</strong>. Confirm from the new address to finish.',
    button: 'Confirm the new address',
    url: `${VERIFY}&type=email_change&next=/app/account`,
    after: 'The link works for 24 hours. If you did not request this change, ignore this email and your address stays the same — then change your password from Account → Security.',
  },
  'invite': {
    subject: 'You are invited to Nishany',
    preheader: 'Accept the invitation and set up your account.',
    eyebrow: 'Invitation',
    title: 'You have been invited',
    lead: 'An invitation to Nishany has been created for <strong>{{ .Email }}</strong>. Accept it to set your password and start.',
    button: 'Accept the invitation',
    url: `${VERIFY}&type=invite`,
    after: 'The invitation works for 24 hours. If you were not expecting it, you can ignore this email.',
  },
}

// Email-safe palette lifted from src/index.css: ink #161920, ink-2 #5d636f,
// primary (crimson) #d13a63 / #a82449, accent (navy) #1553b3, mist #eff3fa.
const page = (t) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${t.subject}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
  body { margin:0; padding:0; background:#eff3fa; -webkit-text-size-adjust:100%; }
  table { border-collapse:collapse; }
  img { border:0; line-height:100%; outline:none; text-decoration:none; }
  a { color:#1553b3; }
  .btn:hover { background:#b62d55 !important; }
  @media (max-width: 620px) {
    .wrap { width:100% !important; }
    .card { border-radius:0 !important; }
    .pad { padding:28px 22px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#eff3fa;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#eff3fa;font-size:1px;line-height:1px;">${t.preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eff3fa;">
  <tr><td align="center" style="padding:40px 16px;">
    <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;">

      <tr><td align="left" style="padding:0 8px 22px;">
        <a href="{{ .SiteURL }}" style="text-decoration:none;">
          <img src="https://nishany.com/brand/nishany-lockup.png" width="164" height="45" alt="Nishany by Connect" style="display:block;width:164px;height:45px;">
        </a>
      </td></tr>

      <tr><td class="card" style="background:#ffffff;border:1px solid #d8e1f1;border-radius:22px;overflow:hidden;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="height:6px;background:#d13a63;background-image:linear-gradient(90deg,#d13a63 0%,#d13a63 62%,#1553b3 62%,#1553b3 100%);font-size:0;line-height:0;">&nbsp;</td></tr>
          <tr><td class="pad" style="padding:40px 44px 36px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
            <p style="margin:0 0 10px;font-size:12px;line-height:16px;letter-spacing:1.4px;text-transform:uppercase;font-weight:700;color:#a82449;">${t.eyebrow}</p>
            <h1 style="margin:0 0 16px;font-size:26px;line-height:32px;font-weight:700;color:#161920;letter-spacing:-0.3px;">${t.title}</h1>
            <p style="margin:0 0 26px;font-size:16px;line-height:26px;color:#3a404b;">${t.lead}</p>
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
              <tr><td align="center" bgcolor="#d13a63" style="border-radius:12px;">
                <a class="btn" href="${t.url}" style="display:inline-block;padding:14px 28px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:20px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;background:#d13a63;">${t.button}&nbsp;&rarr;</a>
              </td></tr>
            </table>
            <p style="margin:0 0 22px;font-size:14px;line-height:22px;color:#5d636f;">${t.after}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eaf1fd;border-radius:12px;">
              <tr><td style="padding:14px 16px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
                <p style="margin:0 0 4px;font-size:12px;line-height:16px;font-weight:700;color:#0e3f8c;">Button not working?</p>
                <p style="margin:0;font-size:12px;line-height:18px;color:#1553b3;word-break:break-all;"><a href="${t.url}" style="color:#1553b3;text-decoration:underline;">${t.url}</a></p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </td></tr>

      <tr><td style="padding:24px 8px 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
        <p style="margin:0 0 6px;font-size:13px;line-height:20px;color:#5d636f;">Sent by <strong style="color:#161920;">Nishany</strong> by Connect &middot; the study platform for Egyptian medical students.</p>
        <p style="margin:0 0 6px;font-size:13px;line-height:20px;color:#5d636f;">Questions? Write to <a href="mailto:info@nishany.com" style="color:#1553b3;">info@nishany.com</a> or visit <a href="https://nishany.com/contact" style="color:#1553b3;">nishany.com/contact</a>.</p>
        <p style="margin:0;font-size:12px;line-height:18px;color:#8a919f;">You received this because this address was used on nishany.com. This is a one-off security message, not a newsletter. <a href="https://nishany.com/privacy" style="color:#8a919f;">Privacy</a> &middot; <a href="https://nishany.com/terms" style="color:#8a919f;">Terms</a></p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>
`

let readme = `# Supabase auth email templates\n\nPaste each file's full contents into Supabase → Authentication → Emails → Templates → *Body (HTML)*, and set the subject shown. The links point at \`/api/auth/verify\`, which redeems the token server-side and sets the session cookie; \`{{ .ConfirmationURL }}\` must not be used.\n\n| Template in Supabase | File | Subject |\n|---|---|---|\n`
const names = { 'confirm-signup': 'Confirm sign up', 'invite': 'Invite user', 'magic-link': 'Magic Link', 'change-email': 'Change Email Address', 'reset-password': 'Reset Password' }
for (const [key, t] of Object.entries(templates)) {
  writeFileSync(`${out}/${key}.html`, page(t))
  readme += `| ${names[key]} | \`${key}.html\` | ${t.subject} |\n`
}
readme += `\nThe logo is loaded from \`https://nishany.com/brand/nishany-lockup.png\`; regenerate with \`node docs/email-templates/supabase/gen.mjs docs/email-templates/supabase\` after editing the copy in \`gen.mjs\`.\n`
writeFileSync(`${out}/README.md`, readme)
console.log('wrote', Object.keys(templates).length, 'templates to', out)
