import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_TRIAL_DAYS, isTrialVoucher, trialEndsAt, voucherDiscount, voucherEligibility,
  voucherTrialDays, type Voucher,
} from './vouchers.ts'
import type { University } from './universities.ts'

function voucher(overrides: Partial<Voucher> = {}): Voucher {
  return {
    id: 'v1',
    code: 'CODE',
    name: 'Test voucher',
    discountType: 'Percentage',
    amount: 20,
    active: true,
    startsAt: new Date(2026, 0, 1).toISOString(),
    expiresAt: new Date(2030, 0, 1).toISOString(),
    maxRedemptions: 0,
    redemptionCount: 0,
    universityIds: [],
    years: [],
    groups: [],
    createdAt: new Date(2026, 0, 1).toISOString(),
    updatedAt: new Date(2026, 0, 1).toISOString(),
    ...overrides,
  }
}

function catalogue(overrides: { uniActive?: boolean; yearActive?: boolean } = {}): University[] {
  return [{
    id: 'kau', name: 'Kasr Alainy', short: 'KAU', region: 'Cairo',
    ...(overrides.uniActive === undefined ? {} : { active: overrides.uniActive }),
    years: [
      { id: 'KAU_Y1', year: 'Year 1', students: 0, courses: [], terms: ['Term 1'],
        ...(overrides.yearActive === undefined ? {} : { active: overrides.yearActive }) },
      { id: 'KAU_Y2', year: 'Year 2', students: 0, courses: [], terms: ['Term 1'] },
    ],
  }]
}

const student = { universityId: 'kau', year: 'Year 1', group: '' }

/* ---- Trial grants -------------------------------------------------------- */

test('a voucher is a discount unless it says otherwise', () => {
  assert.equal(isTrialVoucher(voucher()), false)
  assert.equal(voucherTrialDays(voucher()), 0)
  assert.equal(trialEndsAt(voucher(), new Date(2026, 0, 1)), null)
})

test('a trial voucher grants the days it names', () => {
  const trial = voucher({ grant: 'Full-access trial', trialDays: 3 })
  assert.equal(isTrialVoucher(trial), true)
  assert.equal(voucherTrialDays(trial), 3)
})

test('a trial voucher with no length falls back to the platform trial', () => {
  assert.equal(voucherTrialDays(voucher({ grant: 'Full-access trial' })), DEFAULT_TRIAL_DAYS)
  assert.equal(voucherTrialDays(voucher({ grant: 'Full-access trial', trialDays: 0 })), DEFAULT_TRIAL_DAYS)
  assert.equal(voucherTrialDays(voucher({ grant: 'Full-access trial', trialDays: -5 })), DEFAULT_TRIAL_DAYS)
})

test('a three-day trial redeemed today ends three days from today', () => {
  const end = trialEndsAt(voucher({ grant: 'Full-access trial', trialDays: 3 }), new Date(2026, 7, 19))
  assert.equal(end?.getFullYear(), 2026)
  assert.equal(end?.getMonth(), 7)
  assert.equal(end?.getDate(), 22)
})

test('a trial takes nothing off the price — it opens the platform instead', () => {
  assert.equal(voucherDiscount(voucher({ grant: 'Full-access trial', trialDays: 3, amount: 20 }), 500), 0)
  assert.equal(voucherDiscount(voucher({ amount: 20 }), 500), 100)
})

/* ---- Eligibility --------------------------------------------------------- */

test('without a catalogue, eligibility is the targeting rules alone', () => {
  assert.equal(voucherEligibility(voucher(), student), null)
})

test('a voucher targeted elsewhere is refused', () => {
  assert.match(voucherEligibility(voucher({ universityIds: ['asu'] }), student) ?? '', /university/)
  assert.match(voucherEligibility(voucher({ years: ['Year 3'] }), student) ?? '', /year/)
})

test('a targeted voucher redeems when the university and year are live', () => {
  const targeted = voucher({ universityIds: ['kau'], years: ['Year 1'] })
  assert.equal(voucherEligibility(targeted, student, catalogue()), null)
  assert.equal(voucherEligibility(targeted, student, catalogue({ uniActive: true, yearActive: true })), null)
})

test('a voucher is refused while the university is switched off', () => {
  const targeted = voucher({ universityIds: ['kau'], years: ['Year 1'] })
  assert.match(voucherEligibility(targeted, student, catalogue({ uniActive: false })) ?? '', /university .*right now/)
})

test('a voucher is refused while the year is switched off', () => {
  const targeted = voucher({ universityIds: ['kau'], years: ['Year 1'] })
  assert.match(voucherEligibility(targeted, student, catalogue({ yearActive: false })) ?? '', /year .*right now/)
})

test('a switched-off university refuses the code whatever its years say', () => {
  const targeted = voucher({ universityIds: ['kau'] })
  assert.notEqual(voucherEligibility(targeted, student, catalogue({ uniActive: false, yearActive: true })), null)
})

test('a student whose university or year is not in the catalogue is refused, not guessed', () => {
  assert.notEqual(voucherEligibility(voucher(), { ...student, universityId: 'nowhere' }, catalogue()), null)
  assert.notEqual(voucherEligibility(voucher(), { ...student, year: 'Year 9' }, catalogue()), null)
})

test('an untargeted voucher still has to land somewhere live', () => {
  assert.notEqual(voucherEligibility(voucher(), student, catalogue({ yearActive: false })), null)
})

test('the inactive, unstarted, expired and exhausted rules still come first', () => {
  assert.match(voucherEligibility(voucher({ active: false }), student, catalogue()) ?? '', /not active/)
  assert.match(voucherEligibility(voucher({ startsAt: new Date(2099, 0, 1).toISOString() }), student, catalogue()) ?? '', /not available yet/)
  assert.match(voucherEligibility(voucher({ expiresAt: new Date(2020, 0, 1).toISOString() }), student, catalogue()) ?? '', /expired/)
  assert.match(voucherEligibility(voucher({ maxRedemptions: 5, redemptionCount: 5 }), student, catalogue()) ?? '', /redemption limit/)
})
