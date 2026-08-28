import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'node:crypto'
import { pool } from './db.js'
import { entitlementOf } from './accounts.js'
import {
  PROVIDER_IDS, providerDef, resolveBaseUrl, envKeyFor,
  buildChatRequest, parseChatResponse, buildModelsRequest, parseModelsResponse,
  publicProviders,
} from './assistantProviders.js'

/**
 * The student-facing study assistant.
 *
 * Three concerns live here, and they are separated on purpose:
 *
 *  - **Configuration** — which model, whose key, how long an answer may be.
 *    Editable by an admin at runtime, because the model a product should use
 *    changes faster than a deploy cycle.
 *  - **Entitlement** — how many messages a day this student's plan allows.
 *    Enforced here, before the model is called, so a client that ignores the
 *    count cannot spend anything.
 *  - **Accounting** — what was actually spent. Counted in aggregate; the
 *    conversation itself is never written down.
 *
 * The API key never leaves this process. It is stored encrypted, decrypted only
 * to sign a request, and reported to the admin screen as four characters.
 *
 * See `docs/assistant-design.md` for the intent contract this implements and
 * `docs/assistant-testing.md` for the scenarios it must pass.
 */

/** Conversation turns kept in context. Beyond this the oldest are dropped. */
const MAX_TURNS = 12
/** A single student message longer than this is refused rather than truncated. */
const MAX_MESSAGE_CHARS = 4000

/**
 * Plans that ship with a limit.
 *
 * `free` mirrors the free plan's 10 questions a day — the same number in the
 * same period, so a student does not have to hold two different allowances in
 * their head. Everything above it is generous enough not to be felt during a
 * normal study session, which is the point: a quota that bites during ordinary
 * use trains people to stop opening the assistant.
 */
export const DEFAULT_TIER_LIMITS = [
  { plan: 'free', label: 'Free', daily_messages: 10, enabled: 1 },
  { plan: 'qbank', label: 'QBank', daily_messages: 60, enabled: 1 },
  { plan: 'adaptive', label: 'Adaptive', daily_messages: 200, enabled: 1 },
  { plan: 'sprint', label: 'Exam Sprint', daily_messages: 200, enabled: 1 },
  { plan: 'campus', label: 'Campus / cohort', daily_messages: 200, enabled: 1 },
]

/**
 * A plan name reduced to a limit key.
 *
 * Plan strings are typed by an admin when granting a subscription, so "QBank",
 * "qbank" and "Q-Bank" all arrive. Normalising here means the limits table has
 * one row per plan rather than one per spelling.
 */
export function normalisePlan(plan) {
  if (!plan) return 'free'
  const key = String(plan).toLowerCase().replace(/[^a-z0-9]+/g, '')
  if (!key) return 'free'
  if (key.includes('adaptive')) return 'adaptive'
  if (key.includes('qbank')) return 'qbank'
  if (key.includes('sprint')) return 'sprint'
  if (key.includes('campus') || key.includes('cohort')) return 'campus'
  if (key.includes('free')) return 'free'
  return key
}

// ── Key storage ────────────────────────────────────────────────────────────

/**
 * The secret that wraps the stored API key.
 *
 * Absent, an admin cannot save a key at all and the assistant falls back to
 * `ANTHROPIC_API_KEY` from the environment. That is the honest failure: writing
 * a provider key to the database in plaintext because a secret was not
 * configured would be worse than refusing the feature.
 */
function wrappingKey() {
  const secret = process.env.ASSISTANT_KEY_SECRET
  if (!secret || secret.length < 16) return null
  return scryptSync(secret, 'synapse-assistant-key', 32)
}

export function keyStorageAvailable() {
  return wrappingKey() !== null
}

export function encryptKey(plain) {
  const key = wrappingKey()
  if (!key) throw new Error('ASSISTANT_KEY_SECRET is not configured')
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  return [iv.toString('base64'), cipher.getAuthTag().toString('base64'), enc.toString('base64')].join('.')
}

export function decryptKey(stored) {
  const key = wrappingKey()
  if (!key || !stored) return null
  try {
    const [iv, tag, body] = stored.split('.')
    const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'base64'))
    decipher.setAuthTag(Buffer.from(tag, 'base64'))
    return Buffer.concat([decipher.update(Buffer.from(body, 'base64')), decipher.final()]).toString('utf8')
  } catch {
    // A key encrypted under a different secret is unreadable, not fatal: the
    // environment key still works and the admin is told the stored one failed.
    return null
  }
}

// ── Settings ───────────────────────────────────────────────────────────────

async function ensureRows(conn = pool) {
  await conn.query('INSERT IGNORE INTO assistant_settings (id) VALUES (1)')
  // The single key predates per-provider keys. Move it across once, under the
  // provider that was selected when it was saved, so an existing install keeps
  // working across the upgrade without an admin re-entering anything.
  const [legacy] = await conn.query(
    'SELECT provider, api_key_enc, key_hint FROM assistant_settings WHERE id = 1 AND api_key_enc IS NOT NULL',
  )
  if (legacy.length) {
    await conn.query(
      `INSERT IGNORE INTO assistant_provider_keys (provider, api_key_enc, key_hint)
       VALUES (?, ?, ?)`,
      [legacy[0].provider || 'anthropic', legacy[0].api_key_enc, legacy[0].key_hint],
    )
    await conn.query('UPDATE assistant_settings SET api_key_enc = NULL, key_hint = NULL WHERE id = 1')
  }
  for (const tier of DEFAULT_TIER_LIMITS) {
    await conn.query(
      'INSERT IGNORE INTO assistant_tier_limits (plan, label, daily_messages, enabled) VALUES (?, ?, ?, ?)',
      [tier.plan, tier.label, tier.daily_messages, tier.enabled],
    )
  }
}

/** Full settings, key included. Never send the result of this to a client. */
async function readSettings() {
  await ensureRows()
  const [rows] = await pool.query('SELECT * FROM assistant_settings WHERE id = 1')
  const row = rows[0] ?? {}
  const provider = PROVIDER_IDS.includes(row.provider) ? row.provider : 'anthropic'

  const [keys] = await pool.query(
    'SELECT api_key_enc, key_hint FROM assistant_provider_keys WHERE provider = ?',
    [provider],
  )
  const stored = keys[0]?.api_key_enc ? decryptKey(keys[0].api_key_enc) : null
  const fromEnv = envKeyFor(provider)

  return {
    enabled: Boolean(row.enabled),
    provider,
    model: row.model || (providerDef(provider).suggested[0] ?? ''),
    baseUrl: row.base_url || '',
    resolvedBaseUrl: resolveBaseUrl(provider, row.base_url),
    maxTokens: Number(row.max_tokens) || 700,
    temperature: Number(row.temperature ?? 0.3),
    extraPrompt: row.extra_prompt || '',
    keyHint: keys[0]?.key_hint || null,
    keySource: stored ? 'stored' : (fromEnv ? 'environment' : 'none'),
    // A stored key that will not decrypt must not silently fall through to the
    // environment without the admin being told, so this is reported separately.
    keyUnreadable: Boolean(keys[0]?.api_key_enc) && !stored,
    apiKey: stored || fromEnv || null,
  }
}

/** What the admin screen may see: everything except the key itself. */
export async function adminSettings() {
  const { apiKey: _omit, ...safe } = await readSettings()
  const [tiers] = await pool.query('SELECT * FROM assistant_tier_limits ORDER BY daily_messages, plan')
  const [inUse] = await pool.query(
    `SELECT s.plan AS plan, COUNT(*) AS accounts
       FROM subscriptions s
      WHERE s.status <> 'cancelled' AND (s.expires_at IS NULL OR s.expires_at > NOW())
      GROUP BY s.plan`,
  )
  // Which providers already hold a key, so the screen can show at a glance
  // what is set up and what switching to it would still need.
  const [configured] = await pool.query('SELECT provider, key_hint FROM assistant_provider_keys')
  const providers = publicProviders().map((entry) => {
    const stored = configured.find((row) => row.provider === entry.id)
    return {
      ...entry,
      keyHint: stored?.key_hint ?? null,
      hasStoredKey: Boolean(stored),
      hasEnvKey: Boolean(envKeyFor(entry.id)),
    }
  })

  return {
    ...safe,
    providers,
    keyStorageAvailable: keyStorageAvailable(),
    tiers: tiers.map((t) => ({
      plan: t.plan, label: t.label, dailyMessages: t.daily_messages, enabled: Boolean(t.enabled),
    })),
    // Plans that exist on real subscriptions but have no limit row fall back to
    // `free`. Surfacing them is the difference between a quota that is
    // configured and one that only looks configured.
    plansInUse: inUse.map((r) => ({
      plan: r.plan, key: normalisePlan(r.plan), accounts: Number(r.accounts),
      configured: tiers.some((t) => t.plan === normalisePlan(r.plan)),
    })),
  }
}

export async function saveSettings(patch, actorId) {
  await ensureRows()
  const fields = []
  const values = []

  if (patch.enabled !== undefined) { fields.push('enabled = ?'); values.push(patch.enabled ? 1 : 0) }
  if (patch.provider !== undefined) {
    if (!PROVIDER_IDS.includes(patch.provider)) return { error: 'invalid_provider' }
    fields.push('provider = ?'); values.push(patch.provider)
  }
  if (patch.baseUrl !== undefined) {
    const url = String(patch.baseUrl).trim().replace(/\/+$/, '')
    // Only http(s), and only an absolute URL: this string becomes the host the
    // server sends an API key to, so a typo that resolves somewhere unexpected
    // is a leaked key rather than a broken page.
    if (url && !/^https?:\/\/[^\s]+$/i.test(url)) return { error: 'invalid_base_url' }
    if (url.length > 300) return { error: 'invalid_base_url' }
    fields.push('base_url = ?'); values.push(url || null)
  }
  if (patch.model !== undefined) {
    const model = String(patch.model).trim()
    if (!model || model.length > 120) return { error: 'invalid_model' }
    fields.push('model = ?'); values.push(model)
  }
  if (patch.maxTokens !== undefined) {
    const n = Number(patch.maxTokens)
    if (!Number.isInteger(n) || n < 100 || n > 4000) return { error: 'invalid_max_tokens' }
    fields.push('max_tokens = ?'); values.push(n)
  }
  if (patch.temperature !== undefined) {
    const n = Number(patch.temperature)
    if (!Number.isFinite(n) || n < 0 || n > 1) return { error: 'invalid_temperature' }
    fields.push('temperature = ?'); values.push(n)
  }
  if (patch.extraPrompt !== undefined) {
    const text = String(patch.extraPrompt)
    if (text.length > 4000) return { error: 'prompt_too_long' }
    fields.push('extra_prompt = ?'); values.push(text || null)
  }
  if (fields.length) {
    fields.push('updated_by = ?'); values.push(actorId ?? null)
    await pool.query(`UPDATE assistant_settings SET ${fields.join(', ')} WHERE id = 1`, values)
  }

  // The key is written against a provider, not against the settings row — and
  // against the provider this patch selects, so setting provider and key in one
  // save stores the key where it will actually be read from.
  if (patch.apiKey !== undefined) {
    const [current] = await pool.query('SELECT provider FROM assistant_settings WHERE id = 1')
    const target = PROVIDER_IDS.includes(patch.keyProvider)
      ? patch.keyProvider
      : (current[0]?.provider || 'anthropic')
    const raw = String(patch.apiKey).trim()

    if (raw === '') {
      // Clearing falls back to the environment key rather than disabling —
      // the two are different intentions and only one of them is destructive.
      await pool.query('DELETE FROM assistant_provider_keys WHERE provider = ?', [target])
    } else {
      if (!keyStorageAvailable()) return { error: 'key_storage_unavailable' }
      if (raw.length < 20) return { error: 'invalid_api_key' }
      await pool.query(
        `INSERT INTO assistant_provider_keys (provider, api_key_enc, key_hint, updated_by)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE api_key_enc = VALUES(api_key_enc), key_hint = VALUES(key_hint), updated_by = VALUES(updated_by)`,
        [target, encryptKey(raw), raw.slice(-4), actorId ?? null],
      )
    }
  }

  return adminSettings()
}

export async function saveTierLimit({ plan, label, dailyMessages, enabled }) {
  const key = normalisePlan(plan)
  if (!key) return { error: 'invalid_plan' }
  const n = Number(dailyMessages)
  if (!Number.isInteger(n) || n < 0 || n > 10_000) return { error: 'invalid_limit' }
  await pool.query(
    `INSERT INTO assistant_tier_limits (plan, label, daily_messages, enabled) VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE label = VALUES(label), daily_messages = VALUES(daily_messages), enabled = VALUES(enabled)`,
    [key, String(label || plan).slice(0, 120), n, enabled === false ? 0 : 1],
  )
  return adminSettings()
}

export async function deleteTierLimit(plan) {
  const key = normalisePlan(plan)
  // `free` is the fallback every unconfigured plan lands on. Removing it would
  // leave the quota undefined for exactly the accounts least entitled to it.
  if (key === 'free') return { error: 'cannot_delete_fallback' }
  await pool.query('DELETE FROM assistant_tier_limits WHERE plan = ?', [key])
  return adminSettings()
}

// ── Entitlement ────────────────────────────────────────────────────────────

/** The plan a student is currently entitled to, normalised. */
async function planFor(userId) {
  const [rows] = await pool.query(
    `SELECT sub.plan, sub.status, sub.expires_at
       FROM students st
       JOIN subscriptions sub ON sub.student_id = st.id
      WHERE st.user_id = ? AND sub.status <> 'cancelled'
      ORDER BY sub.started_at DESC, sub.created_at DESC
      LIMIT 1`,
    [userId],
  )
  const entitlement = entitlementOf(rows[0] ?? null)
  const active = entitlement.state === 'active' || entitlement.state === 'trialing'
  return { key: normalisePlan(active ? entitlement.plan : 'free'), label: active ? entitlement.plan : 'Free' }
}

async function limitFor(planKey) {
  const [rows] = await pool.query(
    'SELECT plan, label, daily_messages, enabled FROM assistant_tier_limits WHERE plan IN (?, ?)',
    [planKey, 'free'],
  )
  const exact = rows.find((r) => r.plan === planKey)
  const fallback = rows.find((r) => r.plan === 'free')
  const row = exact ?? fallback
  return {
    plan: row?.plan ?? 'free',
    dailyMessages: row?.daily_messages ?? 10,
    enabled: row ? Boolean(row.enabled) : true,
    // True when this student's plan has no row of its own — the admin screen
    // shows the same fact, so the two never disagree about why a limit applies.
    inherited: !exact,
  }
}

async function usedToday(userId) {
  const [rows] = await pool.query(
    'SELECT messages FROM assistant_usage WHERE user_id = ? AND day = CURDATE()',
    [userId],
  )
  return Number(rows[0]?.messages ?? 0)
}

/** What the student's own client is told: enough to render, nothing more. */
export async function statusFor(identity) {
  await ensureRows()
  const settings = await readSettings()
  const plan = await planFor(identity.id)
  const limit = await limitFor(plan.key)
  const used = await usedToday(identity.id)

  return {
    // One flag for the client: there is no useful distinction, from a student's
    // side, between switched off and misconfigured.
    available: settings.enabled && Boolean(settings.apiKey) && limit.enabled,
    reason: !settings.enabled ? 'disabled'
      : !settings.apiKey ? 'unconfigured'
      : !limit.enabled ? 'not_on_plan'
      : null,
    plan: plan.label,
    dailyMessages: limit.dailyMessages,
    used,
    remaining: Math.max(0, limit.dailyMessages - used),
  }
}

// ── The conversation ───────────────────────────────────────────────────────

/**
 * The instruction the assistant is held to.
 *
 * The clinical guardrail is first and is not editable from the admin screen —
 * `extra_prompt` is appended after this, never in place of it. The distinction
 * matters: everything else here is a product decision, and that one is a safety
 * decision that should not be one checkbox away from being removed.
 */
export function systemPrompt({ extraPrompt, student }) {
  return [
    'You are the study assistant inside Maristana, a learning platform for undergraduate medical students.',
    '',
    'ABSOLUTE RULE — CLINICAL SAFETY',
    'Maristana is a study tool and is not clinical guidance. If a message asks you to make or influence a decision about a real patient — a treatment, a dose, an interpretation of a real result, "what should I do" in a live setting — refuse in one sentence, then offer the exam-style version of the same question. Never hedge, never comply partially.',
    'This does NOT apply to exam vignettes, OSCE stations, or textbook mechanism questions ("a 62-year-old man presents with..."). Those are the product. Answer them fully.',
    '',
    'VOICE',
    'Precise, calm, clinical. No hype, no gamification, no emoji. Do not open with pleasantries or announce what you are about to do. Two to six sentences unless the answer is genuinely a list.',
    'Answer in the language the student wrote in. Arabic questions get Arabic answers, with correct clinical terminology.',
    '',
    'WHAT YOU DO',
    '- Explain concepts, and name the library subtopic where they can read more.',
    '- Summarise a topic in the shape it is examined in, not as an essay.',
    '- Say what to study next, from what is due and what is slipping.',
    '- Explain why a question option was wrong.',
    '- Help them find a topic, station or resource inside Maristana.',
    '- Explain how a Maristana surface works.',
    '',
    'WHAT YOU DO NOT DO',
    '- Do not invent a citation. Only name a book, page or guideline if it was given to you in this conversation.',
    '- Do not state prices, refund terms or plan limits from memory. Point the student at the pricing page or their Billing screen.',
    '- Do not claim to cover a specific university\'s syllabus.',
    '- Do not answer questions unrelated to medical study or to using Maristana; say so in one sentence and name what you do cover.',
    '',
    'WHEN YOU DO NOT UNDERSTAND',
    'First time: ask for a rephrase and name the two most likely readings. Second time in a row: offer concrete options. Third time: point them at Help and stop guessing.',
    '',
    student ? `THIS STUDENT\n${student}` : '',
    extraPrompt ? `ADDITIONAL INSTRUCTIONS FROM THE INSTITUTION\n${extraPrompt}` : '',
  ].filter(Boolean).join('\n')
}

/** A compact description of who is asking, so answers can be specific. */
export function describeStudent({ plan, remaining, lang, context }) {
  const lines = [`Plan: ${plan}. Assistant messages left today: ${remaining}.`]
  if (lang) lines.push(`Interface language: ${lang === 'ar' ? 'Arabic' : 'English'}.`)
  if (context?.year) lines.push(`Year of study: ${context.year}.`)
  if (context?.dueToday?.length) lines.push(`Due for review today: ${context.dueToday.slice(0, 8).join('; ')}.`)
  if (context?.weakest?.length) lines.push(`Weakest subjects by first-attempt accuracy: ${context.weakest.slice(0, 5).join('; ')}.`)
  if (context?.surface) lines.push(`Currently looking at: ${context.surface}.`)
  return lines.join('\n')
}

/** Charge one message, atomically, only if it stays inside the limit. */
async function chargeMessage(userId, planKey, limit) {
  const [result] = await pool.query(
    `INSERT INTO assistant_usage (user_id, day, plan, messages) VALUES (?, CURDATE(), ?, 1)
     ON DUPLICATE KEY UPDATE messages = IF(messages < ?, messages + 1, messages)`,
    [userId, planKey, limit],
  )
  // affectedRows is 1 on insert and 2 on a row that actually changed; 0 means
  // the IF() declined to increment, which is the quota being full. Doing this
  // in one statement is what makes two requests in flight at once safe.
  return result.affectedRows !== 0
}

async function refundMessage(userId) {
  await pool.query(
    'UPDATE assistant_usage SET messages = GREATEST(messages, 1) - 1 WHERE user_id = ? AND day = CURDATE()',
    [userId],
  )
}

/**
 * Token counts, in the one shape this table stores.
 *
 * Each provider names these differently — `input_tokens`, `prompt_tokens`,
 * `promptTokenCount` — so they are normalised by the provider adapter before
 * they reach here, and this only ever sees `inputTokens` / `outputTokens`.
 */
async function recordTokens(userId, usage) {
  if (!usage) return
  await pool.query(
    `UPDATE assistant_usage SET input_tokens = input_tokens + ?, output_tokens = output_tokens + ?
      WHERE user_id = ? AND day = CURDATE()`,
    [Number(usage.inputTokens) || 0, Number(usage.outputTokens) || 0, userId],
  )
}

async function callModel({ settings, system, messages }) {
  let request
  try {
    request = buildChatRequest({
      provider: settings.provider,
      model: settings.model,
      system,
      messages,
      maxTokens: settings.maxTokens,
      temperature: settings.temperature,
      apiKey: settings.apiKey,
      baseUrl: settings.baseUrl,
    })
  } catch (cause) {
    // A custom provider with no base URL is a configuration fault, and saying
    // so beats letting `fetch` fail on the string "undefined/chat/completions".
    return { ok: false, status: 503, detail: String(cause?.message ?? cause) }
  }

  // One retry, and only for the failures a retry can fix. A 400 is a bad
  // request and will be bad again; a 401 is a wrong key and will be wrong again.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetch(request.url, {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify(request.body),
      signal: AbortSignal.timeout(60_000),
    })

    if (response.ok) return { ok: true, data: await response.json() }

    const retryable = response.status === 429 || response.status >= 500
    if (!retryable || attempt === 1) {
      const detail = await response.text().catch(() => '')
      return { ok: false, status: response.status, detail: detail.slice(0, 500) }
    }
    await new Promise((resolve) => setTimeout(resolve, 700))
  }
  return { ok: false, status: 500, detail: 'unreachable' }
}

/**
 * The models this provider will currently accept.
 *
 * Asked of the provider rather than kept in a list here, because model ids are
 * renamed and retired faster than any hardcoded list survives, and an admin
 * choosing from a stale list picks a model that 404s at the first question.
 */
export async function listModels(providerOverride) {
  const settings = await readSettings()
  const provider = PROVIDER_IDS.includes(providerOverride) ? providerOverride : settings.provider

  // Listing a provider that is not the active one still needs that provider's
  // own key, not the active one's.
  let apiKey = settings.apiKey
  if (provider !== settings.provider) {
    const [rows] = await pool.query(
      'SELECT api_key_enc FROM assistant_provider_keys WHERE provider = ?',
      [provider],
    )
    apiKey = (rows[0]?.api_key_enc ? decryptKey(rows[0].api_key_enc) : null) || envKeyFor(provider)
  }
  if (!apiKey) return { error: 'unconfigured', status: 503, provider }

  let request
  try {
    request = buildModelsRequest({ provider, apiKey, baseUrl: provider === settings.provider ? settings.baseUrl : '' })
  } catch (cause) {
    return { error: 'no_base_url', status: 400, detail: String(cause?.message ?? cause) }
  }

  try {
    const response = await fetch(request.url, { headers: request.headers, signal: AbortSignal.timeout(20_000) })
    if (!response.ok) {
      return { error: 'upstream_error', status: response.status === 401 ? 503 : 502, detail: (await response.text().catch(() => '')).slice(0, 300) }
    }
    const models = parseModelsResponse(provider, await response.json())
    return { provider, models, suggested: providerDef(provider).suggested }
  } catch (cause) {
    // Not every OpenAI-compatible server implements /models. Falling back to the
    // suggestions keeps the screen usable instead of dead-ending.
    return { provider, models: [], suggested: providerDef(provider).suggested, warning: String(cause?.message ?? cause).slice(0, 200) }
  }
}

/**
 * One turn of conversation.
 *
 * Order matters and is the whole safety story: entitlement is resolved, the
 * message is charged atomically, the model is called, and the charge is
 * refunded if the call failed. A student is never billed a message for our
 * outage, and a client that lies about its remaining count gets nowhere.
 */
export async function chat(identity, { messages, lang, context }) {
  const settings = await readSettings()
  if (!settings.enabled) return { error: 'disabled', status: 503 }
  if (!settings.apiKey) return { error: 'unconfigured', status: 503 }

  if (!Array.isArray(messages) || messages.length === 0) return { error: 'no_messages', status: 400 }
  const last = messages[messages.length - 1]
  if (last?.role !== 'user' || typeof last.content !== 'string' || !last.content.trim()) {
    return { error: 'no_messages', status: 400 }
  }
  if (last.content.length > MAX_MESSAGE_CHARS) return { error: 'message_too_long', status: 413 }

  const plan = await planFor(identity.id)
  const limit = await limitFor(plan.key)
  if (!limit.enabled) return { error: 'not_on_plan', status: 403, plan: plan.label }

  const charged = await chargeMessage(identity.id, plan.key, limit.dailyMessages)
  if (!charged) {
    return { error: 'quota_exhausted', status: 429, plan: plan.label, dailyMessages: limit.dailyMessages }
  }

  const trimmed = messages
    .slice(-MAX_TURNS)
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }))

  const used = await usedToday(identity.id)
  const system = systemPrompt({
    extraPrompt: settings.extraPrompt,
    student: describeStudent({
      plan: plan.label,
      remaining: Math.max(0, limit.dailyMessages - used),
      lang,
      context,
    }),
  })

  let result
  try {
    result = await callModel({ settings, system, messages: trimmed })
  } catch (cause) {
    await refundMessage(identity.id)
    return { error: 'upstream_unreachable', status: 502, detail: String(cause?.message ?? cause).slice(0, 200) }
  }

  if (!result.ok) {
    await refundMessage(identity.id)
    // 401/403 from the provider is a configuration fault, not the student's.
    const configFault = result.status === 401 || result.status === 403
    return {
      error: configFault ? 'unconfigured' : 'upstream_error',
      status: configFault ? 503 : 502,
      detail: result.detail,
    }
  }

  const { text, usage } = parseChatResponse(settings.provider, result.data)
  await recordTokens(identity.id, usage)

  return {
    reply: text || null,
    plan: plan.label,
    dailyMessages: limit.dailyMessages,
    used,
    remaining: Math.max(0, limit.dailyMessages - used),
  }
}

/** Aggregate spend, for the admin screen. */
export async function usageSummary({ days = 30 } = {}) {
  const window = Math.min(Math.max(Number(days) || 30, 1), 365)
  const [daily] = await pool.query(
    `SELECT day, SUM(messages) AS messages, SUM(input_tokens) AS inputTokens,
            SUM(output_tokens) AS outputTokens, COUNT(DISTINCT user_id) AS students
       FROM assistant_usage WHERE day >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      GROUP BY day ORDER BY day DESC`,
    [window],
  )
  const [byPlan] = await pool.query(
    `SELECT plan, SUM(messages) AS messages, COUNT(DISTINCT user_id) AS students
       FROM assistant_usage WHERE day >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      GROUP BY plan ORDER BY messages DESC`,
    [window],
  )
  const [heaviest] = await pool.query(
    `SELECT u.user_id AS userId, a.email, SUM(u.messages) AS messages
       FROM assistant_usage u LEFT JOIN user_access a ON a.user_id = u.user_id
      WHERE u.day >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      GROUP BY u.user_id, a.email ORDER BY messages DESC LIMIT 10`,
    [window],
  )
  return {
    days: window,
    daily: daily.map((r) => ({
      day: r.day, messages: Number(r.messages), students: Number(r.students),
      inputTokens: Number(r.inputTokens), outputTokens: Number(r.outputTokens),
    })),
    byPlan: byPlan.map((r) => ({ plan: r.plan, messages: Number(r.messages), students: Number(r.students) })),
    heaviest: heaviest.map((r) => ({ userId: r.userId, email: r.email, messages: Number(r.messages) })),
  }
}
