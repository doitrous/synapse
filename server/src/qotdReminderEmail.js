// Lane R1 — email channel for QotD reminders.
//
// Kept in its own file (rather than qotdReminders.js) so the reminder
// dispatcher, the mailer wiring in index.js, and this email-specific logic
// can land independently without lane collisions. index.js is expected to
// import { setMailer } from here and call it once at boot with its own
// sendMail, then wire sendReminderEmail into the dispatcher's email channel.
//
// No circular import: this file never imports index.js. `setMailer` is the
// injection point index.js uses instead.

/** Non-transactional category: suppression + one-click unsubscribe apply automatically. */
export const REMINDER_EMAIL_CATEGORY = 'Question of the Day'

let mailer = null

/** index.js injects its sendMail here at boot to avoid a circular import. */
export function setMailer(fn) {
  mailer = fn
}

function reminderEmailHtml(name) {
  const hi = name ? `Hi ${name},` : 'Hi,'
  return `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5">
    <p>${hi}</p>
    <p>Your <strong>Question of the Day</strong> is waiting. Answer it to keep your streak going.</p>
    <p><a href="${process.env.PUBLIC_ORIGIN || ''}/app/qotd">Answer today's question →</a></p>
  </div>`
}

/**
 * Send one QotD reminder email to `student` for `notification` ({ title, body, path }).
 * No-op (returns false) when no mailer has been injected or the student has no email.
 */
export async function sendReminderEmail(student, notification) {
  if (!mailer || !student?.email) return false
  const result = await mailer({
    to: student.email,
    subject: notification.title,
    html: reminderEmailHtml(student.name),
    text: `${notification.body}\n${process.env.PUBLIC_ORIGIN || ''}${notification.path}`,
    category: REMINDER_EMAIL_CATEGORY,
  })
  return result?.status === 'Sent' || result?.status === 'Queued'
}
