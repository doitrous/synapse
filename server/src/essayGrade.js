import { pool } from './db.js'
import { statusFor, normalisePlan, decryptKey } from './assistant.js'
import {
  PROVIDER_IDS, providerDef, resolveBaseUrl, envKeyFor, buildChatRequest, parseChatResponse,
} from './assistantProviders.js'

/**
 * AI grading for a written answer — advisory only, alongside the existing
 * self-mark/reveal path (never replacing it).
 *
 * Reuses the study assistant's provider plumbing (`assistantProviders.js`) and
 * its exported entitlement view (`statusFor`) so a grading request costs the
 * same daily-message allowance as a chat turn, off the same counter.
 *
 * ponytail: `assistant.js` isn't allowed to change for this feature, and it
 * doesn't export the pieces that actually read config or charge/refund usage
 * (`readSettings`, `chargeMessage`, `refundMessage`, `callModel` are all
 * private to it) — piping this through the exported `chat()` instead doesn't
 * work either, since chat() hard-refuses any single message over 4000 chars,
 * which a question + key points + model answer + student answer blows past
 * routinely. So the ~20 lines below re-read `assistant_settings` /
 * `assistant_provider_keys` and re-do the atomic charge/refund against
 * `assistant_usage` directly — same tables, same columns, same semantics as
 * assistant.js's private versions. If that file's schema or charge logic ever
 * changes, this needs the same change made here.
 */

const MAX_PROMPT_CHARS = 4000
const MAX_KEY_POINTS = 20
const MAX_KEY_POINT_CHARS = 300
const MAX_EXAMINER_NOTE_CHARS = 2000
const MAX_MODEL_ANSWER_CHARS = 6000
const MAX_STUDENT_TEXT_CHARS = 8000

// ── Input validation ─────────────────────────────────────────────────────

function validateInput(body) {
  const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : ''
  const modelAnswer = typeof body?.modelAnswer === 'string' ? body.modelAnswer.trim() : ''
  const studentText = typeof body?.studentText === 'string' ? body.studentText.trim() : ''
  const examinerNote = typeof body?.examinerNote === 'string' ? body.examinerNote.trim() : ''
  const keyPoints = Array.isArray(body?.keyPoints)
    ? body.keyPoints.filter((p) => typeof p === 'string' && p.trim()).map((p) => p.trim())
    : []

  if (!prompt || prompt.length > MAX_PROMPT_CHARS) return { error: 'invalid_prompt' }
  if (!keyPoints.length || keyPoints.length > MAX_KEY_POINTS) return { error: 'invalid_key_points' }
  if (keyPoints.some((p) => p.length > MAX_KEY_POINT_CHARS)) return { error: 'invalid_key_points' }
  if (!modelAnswer || modelAnswer.length > MAX_MODEL_ANSWER_CHARS) return { error: 'invalid_model_answer' }
  if (!studentText) return { error: 'empty_answer' }
  if (studentText.length > MAX_STUDENT_TEXT_CHARS) return { error: 'answer_too_long' }
  if (examinerNote.length > MAX_EXAMINER_NOTE_CHARS) return { error: 'invalid_examiner_note' }

  return { prompt, keyPoints, modelAnswer, studentText, examinerNote }
}

// ── The grading prompt ───────────────────────────────────────────────────

/** One user message the model answers as an examiner, JSON only. */
export function buildGradingPrompt({ prompt, keyPoints, modelAnswer, studentText, examinerNote }) {
  const pointsList = keyPoints.map((text, i) => `${i}. ${text}`).join('\n')
  return [
    'You are an examiner marking one written exam answer against a mark scheme. Be precise and evidence-based — do not credit a point the student did not actually make, and do not invent claims about their answer.',
    '',
    `QUESTION:\n${prompt}`,
    '',
    `KEY POINTS THE MARK SCHEME AWARDS (indexed from 0):\n${pointsList}`,
    examinerNote ? `\nWHAT THE EXAMINER SCANS FOR:\n${examinerNote}` : '',
    `\nMODEL ANSWER (for comparison):\n${modelAnswer}`,
    `\nSTUDENT'S ANSWER:\n${studentText}`,
    '',
    'Compare the student answer against the key points and model answer, then reply with ONLY a single JSON object — no prose, no markdown code fence — matching exactly this shape:',
    '{"coveredKeyPoints": number[], "missedKeyPoints": number[], "score": number, "strengths": string[], "improvements": string[], "summary": string}',
    '- coveredKeyPoints / missedKeyPoints: 0-based indices into the key points list above; together they partition every index.',
    '- score: 0-100, how completely the answer would score against the mark scheme.',
    '- strengths: up to 4 short bullets on what the answer got right.',
    '- improvements: up to 4 short bullets on what to add or fix.',
    '- summary: one or two sentences, examiner tone.',
  ].filter(Boolean).join('\n')
}

// ── Defensive parsing of the model's reply ──────────────────────────────

/**
 * The model is asked for bare JSON but is not trusted to send it —
 * it may wrap the object in prose or a ```json fence. This pulls out the
 * first balanced `{...}` block, from inside a fence if there is one, and
 * parses that. Returns null rather than throwing on anything unparseable.
 */
export function extractJson(text) {
  if (typeof text !== 'string' || !text.trim()) return null
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = fenced ? fenced[1] : text
  const start = candidate.indexOf('{')
  if (start === -1) return null
  let depth = 0
  for (let i = start; i < candidate.length; i += 1) {
    if (candidate[i] === '{') depth += 1
    else if (candidate[i] === '}') {
      depth -= 1
      if (depth === 0) {
        try {
          const parsed = JSON.parse(candidate.slice(start, i + 1))
          return parsed && typeof parsed === 'object' ? parsed : null
        } catch {
          return null
        }
      }
    }
  }
  return null
}

function toIndexArray(value, total) {
  if (!Array.isArray(value)) return []
  return [...new Set(
    value.map((n) => Number(n)).filter((n) => Number.isInteger(n) && n >= 0 && n < total),
  )].sort((a, b) => a - b)
}

function toStringArray(value, max) {
  if (!Array.isArray(value)) return []
  return value
    .filter((s) => typeof s === 'string' && s.trim())
    .slice(0, max)
    .map((s) => s.trim().slice(0, 300))
}

/** Coerces a parsed (possibly malformed) reply into the display shape, never throwing. */
export function normalizeFeedback(parsed, totalPoints) {
  const p = parsed && typeof parsed === 'object' ? parsed : {}
  const rawScore = Number(p.score)
  return {
    coveredKeyPoints: toIndexArray(p.coveredKeyPoints, totalPoints),
    missedKeyPoints: toIndexArray(p.missedKeyPoints, totalPoints),
    score: Number.isFinite(rawScore) ? Math.min(100, Math.max(0, Math.round(rawScore))) : 0,
    strengths: toStringArray(p.strengths, 4),
    improvements: toStringArray(p.improvements, 4),
    summary: typeof p.summary === 'string' ? p.summary.trim().slice(0, 600) : '',
  }
}

// ── Calling the model ────────────────────────────────────────────────────

/**
 * One model call given already-resolved settings. Kept separate from the DB
 * reads above so it can be exercised with a mocked `fetch` and no database.
 */
export async function callGradingModel(settings, promptText) {
  const request = buildChatRequest({
    provider: settings.provider,
    model: settings.model,
    system: null,
    messages: [{ role: 'user', content: promptText }],
    maxTokens: settings.maxTokens,
    temperature: settings.temperature,
    apiKey: settings.apiKey,
    baseUrl: settings.baseUrl,
  })
  const response = await fetch(request.url, {
    method: 'POST',
    headers: request.headers,
    body: JSON.stringify(request.body),
    signal: AbortSignal.timeout(60_000),
  })
  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    return { ok: false, status: response.status, detail: detail.slice(0, 500) }
  }
  const { text } = parseChatResponse(settings.provider, await response.json())
  return { ok: true, text }
}

/** Re-reads what `assistant.js`'s private `readSettings()` reads — see file header. */
async function readModelConfig() {
  const [rows] = await pool.query('SELECT * FROM assistant_settings WHERE id = 1')
  const row = rows[0]
  if (!row?.enabled) return null
  const provider = PROVIDER_IDS.includes(row.provider) ? row.provider : 'anthropic'
  const [keys] = await pool.query(
    'SELECT api_key_enc FROM assistant_provider_keys WHERE provider = ?',
    [provider],
  )
  const apiKey = (keys[0]?.api_key_enc ? decryptKey(keys[0].api_key_enc) : null) || envKeyFor(provider)
  if (!apiKey) return null
  return {
    provider,
    model: row.model || (providerDef(provider).suggested[0] ?? ''),
    baseUrl: resolveBaseUrl(provider, row.base_url),
    maxTokens: Number(row.max_tokens) || 700,
    temperature: Number(row.temperature ?? 0.3),
    apiKey,
  }
}

/** Re-implements `assistant.js`'s private charge/refund against the same table — see file header. */
async function chargeMessage(userId, planKey, limit) {
  const [result] = await pool.query(
    `INSERT INTO assistant_usage (user_id, day, plan, messages) VALUES (?, CURDATE(), ?, 1)
     ON DUPLICATE KEY UPDATE messages = IF(messages < ?, messages + 1, messages)`,
    [userId, planKey, limit],
  )
  return result.affectedRows !== 0
}

async function refundMessage(userId) {
  await pool.query(
    'UPDATE assistant_usage SET messages = GREATEST(messages, 1) - 1 WHERE user_id = ? AND day = CURDATE()',
    [userId],
  )
}

/**
 * Grade one written answer. Advisory only — the caller must not let this
 * touch accuracy stats; see EssayRunner.tsx for why.
 *
 * Order mirrors assistant.js's `chat()`: entitlement is resolved from the
 * same exported `statusFor`, the message is charged before the model is
 * called, and the charge is refunded on any failure — including a reply that
 * cannot be parsed, since that is not a session the student got value from.
 */
export async function gradeEssay(identity, body) {
  const input = validateInput(body)
  if (input.error) return { error: input.error, status: 400 }

  const status = await statusFor(identity)
  if (!status.available) {
    return {
      error: status.reason ?? 'unconfigured',
      status: status.reason === 'not_on_plan' ? 403 : 503,
      plan: status.plan,
    }
  }

  const planKey = normalisePlan(status.plan)
  const charged = await chargeMessage(identity.id, planKey, status.dailyMessages)
  if (!charged) {
    return { error: 'quota_exhausted', status: 429, plan: status.plan, dailyMessages: status.dailyMessages }
  }

  const settings = await readModelConfig()
  if (!settings) {
    await refundMessage(identity.id)
    return { error: 'unconfigured', status: 503 }
  }

  const promptText = buildGradingPrompt(input)
  let result
  try {
    result = await callGradingModel(settings, promptText)
  } catch (cause) {
    await refundMessage(identity.id)
    return { error: 'upstream_unreachable', status: 502, detail: String(cause?.message ?? cause).slice(0, 200) }
  }

  if (!result.ok) {
    await refundMessage(identity.id)
    const configFault = result.status === 401 || result.status === 403
    return { error: configFault ? 'unconfigured' : 'upstream_error', status: configFault ? 503 : 502, detail: result.detail }
  }

  const parsed = extractJson(result.text)
  if (!parsed) {
    await refundMessage(identity.id)
    return { error: 'malformed_response', status: 502 }
  }

  return {
    feedback: normalizeFeedback(parsed, input.keyPoints.length),
    plan: status.plan,
    dailyMessages: status.dailyMessages,
    used: status.used + 1,
    remaining: Math.max(0, status.remaining - 1),
  }
}
