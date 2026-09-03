import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fromForCategory, isMarketingCategory, unsubscribeMailtoAddress, replyToForCategory } from './mailFrom.js'

test('fromForCategory maps known categories to the right domain by default', () => {
  assert.equal(fromForCategory('Onboarding'), 'Nishany <no-reply@mail.nishany.com>')
  assert.equal(fromForCategory('Security & account'), 'Nishany <no-reply@mail.nishany.com>')
  assert.equal(fromForCategory('Question of the Day'), 'Nishany <no-reply@mail.nishany.com>')
  assert.equal(fromForCategory(undefined), 'Nishany <no-reply@mail.nishany.com>')

  assert.equal(fromForCategory('Marketing'), 'Nishany <news@news.nishany.com>')
  assert.equal(fromForCategory('newsletter'), 'Nishany <news@news.nishany.com>')
  assert.equal(fromForCategory('Announcement'), 'Nishany <news@news.nishany.com>')

  assert.equal(fromForCategory('Support'), 'Nishany <info@nishany.com>')
  assert.equal(fromForCategory('Contact'), 'Nishany <info@nishany.com>')
  assert.equal(fromForCategory('Mailbox replies'), 'Nishany <info@nishany.com>')
})

test('fromForCategory honours an explicit from that matches a configured address, case-insensitively', () => {
  assert.equal(fromForCategory('Marketing', 'news@NEWS.nishany.com'), 'news@NEWS.nishany.com')
  assert.equal(fromForCategory('Onboarding', 'no-reply@mail.nishany.com'), 'no-reply@mail.nishany.com')
})

test('fromForCategory rejects an explicit from that is not a configured address and falls back to the category default', () => {
  const warnings = []
  const originalWarn = console.warn
  console.warn = (...args) => warnings.push(args)
  try {
    const result = fromForCategory('Marketing', 'someone@gmail.com')
    assert.equal(result, 'Nishany <news@news.nishany.com>')
    assert.equal(warnings.length, 1)
    assert.equal(warnings[0][0], '[mail] from override rejected')
  } finally {
    console.warn = originalWarn
  }
})

test('isMarketingCategory / unsubscribeMailtoAddress / replyToForCategory pick the right header values', () => {
  assert.equal(isMarketingCategory('Newsletter'), true)
  assert.equal(isMarketingCategory('Onboarding'), false)

  assert.equal(unsubscribeMailtoAddress('Marketing'), 'news@news.nishany.com')
  assert.equal(unsubscribeMailtoAddress('Study & learning'), 'no-reply@mail.nishany.com')
  assert.equal(unsubscribeMailtoAddress('Support'), 'no-reply@mail.nishany.com')

  assert.equal(replyToForCategory('Onboarding'), 'info@nishany.com')
  assert.equal(replyToForCategory('Question of the Day'), 'info@nishany.com')
  assert.equal(replyToForCategory('Marketing'), null)
  assert.equal(replyToForCategory('Support'), null)
})
