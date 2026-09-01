import { test } from 'node:test'
import assert from 'node:assert/strict'
import { setMailer, sendReminderEmail, REMINDER_EMAIL_CATEGORY } from './qotdReminderEmail.js'

const notification = { title: 'Question of the Day', body: "Today's question is waiting.", path: '/app/qotd' }

test('sendReminderEmail returns false when no mailer has been injected', async () => {
  setMailer(null)
  const ok = await sendReminderEmail({ email: 'a@b.com', name: 'Sara' }, notification)
  assert.equal(ok, false)
})

test('sendReminderEmail returns false when the student has no email', async () => {
  setMailer(async () => ({ status: 'Sent' }))
  const ok = await sendReminderEmail({ name: 'Sara' }, notification)
  assert.equal(ok, false)
})

test('sendReminderEmail returns true on Sent and Queued, false otherwise', async () => {
  setMailer(async () => ({ status: 'Sent' }))
  assert.equal(await sendReminderEmail({ email: 'a@b.com' }, notification), true)

  setMailer(async () => ({ status: 'Queued' }))
  assert.equal(await sendReminderEmail({ email: 'a@b.com' }, notification), true)

  setMailer(async () => ({ status: 'Suppressed', suppressed: true }))
  assert.equal(await sendReminderEmail({ email: 'a@b.com' }, notification), false)
})

test('sendReminderEmail passes the Question of the Day category and expected fields to the mailer', async () => {
  let captured = null
  setMailer(async (args) => { captured = args; return { status: 'Sent' } })
  await sendReminderEmail({ email: 'a@b.com', name: 'Sara' }, notification)

  assert.equal(captured.to, 'a@b.com')
  assert.equal(captured.subject, notification.title)
  assert.equal(captured.category, REMINDER_EMAIL_CATEGORY)
  assert.equal(REMINDER_EMAIL_CATEGORY, 'Question of the Day')
  assert.match(captured.html, /Sara/)
  assert.match(captured.text, /app\/qotd/)
})
