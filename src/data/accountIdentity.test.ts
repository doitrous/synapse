import test from 'node:test'
import assert from 'node:assert/strict'
import {
  CONFLICT_MESSAGE, findIdentityConflict, normaliseEmail, normalisePhone, signInPathFor,
} from './accountIdentity.ts'

/* ---- Phone --------------------------------------------------------------- */

test('spacing, hyphens and brackets carry no meaning', () => {
  assert.equal(normalisePhone('+20 100 123 4567'), '+201001234567')
  assert.equal(normalisePhone('+20-100-123-4567'), '+201001234567')
  assert.equal(normalisePhone('+20 (100) 123.4567'), '+201001234567')
})

test('a leading 00 is the same instruction as a leading +', () => {
  assert.equal(normalisePhone('0020 100 123 4567'), '+201001234567')
})

test('a local number and its international form are one number', () => {
  assert.equal(normalisePhone('01001234567'), '+201001234567')
  assert.equal(normalisePhone('+201001234567'), '+201001234567')
  assert.equal(normalisePhone('01001234567'), normalisePhone('+20 100 123 4567'))
})

test('what is not a number is refused rather than normalised into one', () => {
  assert.equal(normalisePhone(''), null)
  assert.equal(normalisePhone(null), null)
  assert.equal(normalisePhone(undefined), null)
  assert.equal(normalisePhone('not a phone'), null)
  assert.equal(normalisePhone('+20 100 12x 4567'), null)
  assert.equal(normalisePhone('12345'), null)
  assert.equal(normalisePhone('+1234567890123456'), null)
})

/* ---- Email --------------------------------------------------------------- */

test('an email is the same address whatever case it is typed in', () => {
  assert.equal(normaliseEmail('  Omar@Example.COM '), 'omar@example.com')
  assert.equal(normaliseEmail('omar@example.com'), normaliseEmail('OMAR@EXAMPLE.COM'))
})

test('what is not an address is refused', () => {
  assert.equal(normaliseEmail('omar'), null)
  assert.equal(normaliseEmail('omar@'), null)
  assert.equal(normaliseEmail('omar@example'), null)
  assert.equal(normaliseEmail(''), null)
})

/* ---- Conflicts ----------------------------------------------------------- */

const roster = [
  { email: 'Omar@Example.com', phone: '+20 100 123 4567' },
  { email: 'sara@example.com', phone: null },
]

test('a new person has no conflict', () => {
  assert.equal(findIdentityConflict(roster, { email: 'new@example.com', phone: '01112223333' }), null)
})

test('the same email in different case is the same account', () => {
  assert.deepEqual(findIdentityConflict(roster, { email: 'OMAR@example.COM', phone: '01112223333' }), {
    field: 'email', value: 'OMAR@example.COM',
  })
})

test('the same number written differently is the same account', () => {
  assert.deepEqual(findIdentityConflict(roster, { email: 'new@example.com', phone: '0100 123 4567' }), {
    field: 'phone', value: '0100 123 4567',
  })
})

test('email is reported first when both are taken', () => {
  const conflict = findIdentityConflict(roster, { email: 'omar@example.com', phone: '+201001234567' })
  assert.equal(conflict?.field, 'email')
})

test('a record with no phone cannot collide on one', () => {
  assert.equal(findIdentityConflict([{ email: 'sara@example.com', phone: null }], { phone: '01001234567' }), null)
})

test('a malformed value is a validation problem, not a taken account', () => {
  assert.equal(findIdentityConflict(roster, { phone: 'nonsense' }), null)
  assert.equal(findIdentityConflict(roster, { email: 'nonsense' }), null)
})

test('the sign-in link carries the field that was already registered', () => {
  assert.equal(signInPathFor({ field: 'email', value: 'omar@example.com' }), '/login?email=omar%40example.com')
  assert.equal(signInPathFor({ field: 'phone', value: '+20 100 123 4567' }), '/login?phone=%2B20%20100%20123%204567')
})

test('each conflict has something to say to the person who hit it', () => {
  assert.match(CONFLICT_MESSAGE.email, /already registered/)
  assert.match(CONFLICT_MESSAGE.phone, /already registered/)
})
