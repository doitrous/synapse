import { randomUUID } from 'node:crypto'
import { pool } from './db.js'

export const ALL_ACCESS_PRICES = {
  monthly: { period: 'monthly', label: 'One month all-access', currency: 'EGP', amount: 400 },
  term: { period: 'term', label: 'One term all-access', currency: 'EGP', amount: 1000 },
}

export function normalisePeriod(value) {
  const period = String(value ?? '').trim().toLowerCase()
  return period === 'monthly' || period === 'term' ? period : null
}

export function activeDuring(discount, now = new Date()) {
  if (!discount?.active) return false
  const start = new Date(discount.startsAt ?? discount.starts_at)
  const end = new Date(discount.endsAt ?? discount.ends_at)
  const at = now instanceof Date ? now : new Date(now)
  return Number.isFinite(start.getTime()) && Number.isFinite(end.getTime()) && start <= at && at <= end
}

export function appliesToPeriod(discount, period) {
  const target = String(discount?.period ?? '').toLowerCase()
  return target === period || target === 'both'
}

export function discountAmount(baseAmount, discount) {
  const value = Math.max(0, Number(discount?.discountValue ?? discount?.discount_value ?? 0))
  const type = String(discount?.discountType ?? discount?.discount_type ?? '').toLowerCase()
  const amount = type === 'percent' ? baseAmount * Math.min(value, 100) / 100 : value
  return Math.min(baseAmount, Math.round(amount * 100) / 100)
}

export function quoteAllAccess({ period, voucherCode, promotions = [], vouchers = [], now = new Date() }) {
  const cleanPeriod = normalisePeriod(period)
  if (!cleanPeriod) return { error: 'invalid_period' }
  const base = ALL_ACCESS_PRICES[cleanPeriod]
  const candidates = []
  for (const promotion of promotions) {
    if (!activeDuring(promotion, now) || !appliesToPeriod(promotion, cleanPeriod)) continue
    candidates.push({ ...promotion, kind: 'promotion', amountOff: discountAmount(base.amount, promotion) })
  }
  const wantedCode = String(voucherCode ?? '').trim().toLowerCase()
  for (const voucher of vouchers) {
    if (!wantedCode || String(voucher.code ?? '').trim().toLowerCase() !== wantedCode) continue
    if (!activeDuring(voucher, now) || !appliesToPeriod(voucher, cleanPeriod)) continue
    candidates.push({ ...voucher, kind: 'voucher', amountOff: discountAmount(base.amount, voucher) })
  }
  candidates.sort((a, b) => {
    const byAmount = b.amountOff - a.amountOff
    if (byAmount) return byAmount
    const byKind = a.kind.localeCompare(b.kind)
    if (byKind) return byKind
    return String(a.id ?? a.code ?? '').localeCompare(String(b.id ?? b.code ?? ''))
  })
  const applied = candidates[0] ?? null
  const total = Math.max(0, Math.round((base.amount - (applied?.amountOff ?? 0)) * 100) / 100)
  return {
    period: cleanPeriod,
    currency: base.currency,
    baseAmount: base.amount,
    totalAmount: total,
    appliedDiscount: applied
      ? {
          id: applied.id,
          kind: applied.kind,
          code: applied.code ?? null,
          label: applied.label,
          discountType: applied.discountType ?? applied.discount_type,
          discountValue: Number(applied.discountValue ?? applied.discount_value ?? 0),
          amountOff: applied.amountOff,
        }
      : null,
    alternatives: candidates.map((candidate) => ({
      id: candidate.id,
      kind: candidate.kind,
      code: candidate.code ?? null,
      label: candidate.label,
      amountOff: candidate.amountOff,
    })),
  }
}

function shapeDiscount(row, kind) {
  return {
    id: row.id,
    kind,
    code: row.code ?? null,
    label: row.label,
    period: row.period,
    discountType: row.discountType ?? row.discount_type,
    discountValue: Number(row.discountValue ?? row.discount_value ?? 0),
    startsAt: row.startsAt ?? row.starts_at,
    endsAt: row.endsAt ?? row.ends_at,
    active: Boolean(row.active),
    maxRedemptions: row.maxRedemptions ?? row.max_redemptions ?? null,
    createdBy: row.createdBy ?? row.created_by ?? null,
    createdAt: row.createdAt ?? row.created_at ?? null,
  }
}

function cleanDiscountInput(body, { voucher = false } = {}) {
  const label = String(body?.label ?? '').trim().slice(0, 160)
  const period = voucher ? normalisePeriod(body?.period) : (normalisePeriod(body?.period) ?? (String(body?.period).toLowerCase() === 'both' ? 'both' : null))
  const discountType = String(body?.discountType ?? '').trim().toLowerCase()
  const discountValue = Number(body?.discountValue)
  const startsAt = body?.startsAt ? new Date(body.startsAt) : null
  const endsAt = body?.endsAt ? new Date(body.endsAt) : null
  if (!label) return { error: 'label_required' }
  if (!period) return { error: 'invalid_period' }
  if (!['percent', 'fixed'].includes(discountType)) return { error: 'invalid_discount_type' }
  if (!Number.isFinite(discountValue) || discountValue <= 0) return { error: 'invalid_discount_value' }
  if (!startsAt || !endsAt || !Number.isFinite(startsAt.getTime()) || !Number.isFinite(endsAt.getTime()) || startsAt >= endsAt) {
    return { error: 'invalid_window' }
  }
  const code = voucher ? String(body?.code ?? '').trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '').slice(0, 64) : null
  if (voucher && !code) return { error: 'code_required' }
  const maxRedemptions = body?.maxRedemptions == null || body.maxRedemptions === ''
    ? null
    : Math.max(1, Math.floor(Number(body.maxRedemptions)))
  return {
    id: body?.id ? String(body.id).slice(0, 64) : randomUUID(),
    label,
    code,
    period,
    discountType,
    discountValue,
    startsAt,
    endsAt,
    active: body?.active !== false,
    maxRedemptions: Number.isFinite(maxRedemptions) ? maxRedemptions : null,
  }
}

export async function pricingQuote({ period, voucherCode, now = new Date() }) {
  const [promotions] = await pool.query(
    `SELECT id, label, period, discount_type AS discountType, discount_value AS discountValue,
            starts_at AS startsAt, ends_at AS endsAt, active
       FROM pricing_promotions`,
  )
  const [vouchers] = await pool.query(
    `SELECT id, code, label, period, discount_type AS discountType, discount_value AS discountValue,
            starts_at AS startsAt, ends_at AS endsAt, active, max_redemptions AS maxRedemptions
       FROM pricing_vouchers`,
  )
  return quoteAllAccess({ period, voucherCode, promotions, vouchers, now })
}

export async function listPricingDiscounts() {
  const [promotions] = await pool.query(
    `SELECT id, label, period, discount_type AS discountType, discount_value AS discountValue,
            starts_at AS startsAt, ends_at AS endsAt, active, created_by AS createdBy, created_at AS createdAt
       FROM pricing_promotions ORDER BY starts_at DESC, created_at DESC`,
  )
  const [vouchers] = await pool.query(
    `SELECT id, code, label, period, discount_type AS discountType, discount_value AS discountValue,
            starts_at AS startsAt, ends_at AS endsAt, active, max_redemptions AS maxRedemptions,
            created_by AS createdBy, created_at AS createdAt
       FROM pricing_vouchers ORDER BY starts_at DESC, created_at DESC`,
  )
  return {
    plans: Object.values(ALL_ACCESS_PRICES),
    promotions: promotions.map((row) => shapeDiscount(row, 'promotion')),
    vouchers: vouchers.map((row) => shapeDiscount(row, 'voucher')),
  }
}

export async function createPromotion(body, actorId) {
  const input = cleanDiscountInput(body)
  if (input.error) return input
  await pool.query(
    `INSERT INTO pricing_promotions (id, label, period, discount_type, discount_value, starts_at, ends_at, active, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [input.id, input.label, input.period, input.discountType, input.discountValue, input.startsAt, input.endsAt, input.active ? 1 : 0, actorId],
  )
  return { ok: true, promotion: shapeDiscount(input, 'promotion') }
}

export async function createPricingVoucher(body, actorId) {
  const input = cleanDiscountInput(body, { voucher: true })
  if (input.error) return input
  await pool.query(
    `INSERT INTO pricing_vouchers (id, code, label, period, discount_type, discount_value, starts_at, ends_at, active, max_redemptions, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [input.id, input.code, input.label, input.period, input.discountType, input.discountValue, input.startsAt, input.endsAt, input.active ? 1 : 0, input.maxRedemptions, actorId],
  )
  return { ok: true, voucher: shapeDiscount(input, 'voucher') }
}
