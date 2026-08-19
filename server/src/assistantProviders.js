/**
 * The model providers the assistant can talk to.
 *
 * Three wire formats cover every provider worth offering. Most of them —
 * Groq, OpenAI, xAI, OpenRouter, DeepSeek, Together, and anything self-hosted
 * behind Ollama or vLLM — speak OpenAI's `/chat/completions`, so they differ
 * only by base URL. Anthropic and Google each have their own shape.
 *
 * Everything here is pure: it builds a request and reads a response, and never
 * performs one. That is what lets the shapes be tested without a key, which
 * matters because a wrong request body fails identically to a wrong key from
 * the outside — a 400 — and the two need very different fixes.
 */

/**
 * Model ids to offer before a key is configured.
 *
 * Only a starting point. Providers rename and retire models faster than any
 * hardcoded list survives, so the admin screen loads the live list from the
 * provider once a key is set, and the field accepts anything typed into it.
 * Treat these as a prompt, not a source of truth.
 */
export const PROVIDERS = {
  groq: {
    label: 'Groq',
    kind: 'openai',
    baseUrl: 'https://api.groq.com/openai/v1',
    envKeys: ['GROQ_API_KEY'],
    consoleUrl: 'https://console.groq.com/keys',
    suggested: [
      'llama-3.3-70b-versatile',
      'llama-3.1-8b-instant',
      'openai/gpt-oss-120b',
      'moonshotai/kimi-k2-instruct',
      'qwen/qwen3-32b',
    ],
  },
  openai: {
    label: 'OpenAI',
    kind: 'openai',
    baseUrl: 'https://api.openai.com/v1',
    envKeys: ['OPENAI_API_KEY'],
    consoleUrl: 'https://platform.openai.com/api-keys',
    suggested: ['gpt-4.1', 'gpt-4.1-mini', 'gpt-4o', 'gpt-4o-mini', 'o4-mini'],
  },
  anthropic: {
    label: 'Anthropic (Claude)',
    kind: 'anthropic',
    baseUrl: 'https://api.anthropic.com/v1',
    envKeys: ['ANTHROPIC_API_KEY'],
    consoleUrl: 'https://console.anthropic.com/settings/keys',
    suggested: ['claude-opus-5', 'claude-sonnet-5', 'claude-fable-5', 'claude-haiku-4-5-20251001'],
  },
  google: {
    label: 'Google (Gemini)',
    kind: 'gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    envKeys: ['GEMINI_API_KEY', 'GOOGLE_API_KEY'],
    consoleUrl: 'https://aistudio.google.com/apikey',
    suggested: ['gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.0-flash'],
  },
  xai: {
    label: 'xAI (Grok)',
    kind: 'openai',
    baseUrl: 'https://api.x.ai/v1',
    envKeys: ['XAI_API_KEY', 'GROK_API_KEY'],
    consoleUrl: 'https://console.x.ai',
    suggested: ['grok-4', 'grok-3', 'grok-3-mini'],
  },
  openrouter: {
    label: 'OpenRouter',
    kind: 'openai',
    baseUrl: 'https://openrouter.ai/api/v1',
    envKeys: ['OPENROUTER_API_KEY'],
    consoleUrl: 'https://openrouter.ai/keys',
    suggested: ['anthropic/claude-sonnet-4.5', 'google/gemini-2.5-pro', 'meta-llama/llama-3.3-70b-instruct'],
  },
  custom: {
    label: 'Custom (OpenAI-compatible)',
    kind: 'openai',
    // No default: a custom provider is defined by the URL the admin supplies.
    baseUrl: null,
    envKeys: ['ASSISTANT_API_KEY'],
    consoleUrl: null,
    suggested: [],
  },
}

export const PROVIDER_IDS = Object.keys(PROVIDERS)

export function providerDef(id) {
  return PROVIDERS[id] ?? PROVIDERS.anthropic
}

/** The base URL to call: an admin override, else the provider's own. */
export function resolveBaseUrl(providerId, override) {
  const trimmed = (override ?? '').trim().replace(/\/+$/, '')
  if (trimmed) return trimmed
  return providerDef(providerId).baseUrl
}

/** The key from the environment for this provider, if one is set. */
export function envKeyFor(providerId, env = process.env) {
  for (const name of providerDef(providerId).envKeys) {
    if (env[name]) return env[name]
  }
  return null
}

/**
 * A chat request, in the shape this provider expects.
 *
 * `system` is passed separately by the caller because the three formats put it
 * in three different places — a top-level field, a `systemInstruction` object,
 * or a message with a role. Flattening it into the message list for everyone
 * would quietly weaken it on the providers that treat it specially.
 */
export function buildChatRequest({ provider, model, system, messages, maxTokens, temperature, apiKey, baseUrl }) {
  const kind = providerDef(provider).kind
  const root = resolveBaseUrl(provider, baseUrl)
  if (!root) throw new Error('no base URL configured for this provider')

  if (kind === 'anthropic') {
    return {
      url: `${root}/messages`,
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: { model, max_tokens: maxTokens, temperature, system, messages },
    }
  }

  if (kind === 'gemini') {
    return {
      // The key goes in a header, not the query string: a URL is logged by
      // proxies and shows up in error messages, and a key in one is a leaked key.
      url: `${root}/models/${encodeURIComponent(model)}:generateContent`,
      headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
      body: {
        systemInstruction: system ? { parts: [{ text: system }] } : undefined,
        contents: messages.map((message) => ({
          // Gemini calls the assistant "model" and has no "assistant" role.
          role: message.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: message.content }],
        })),
        generationConfig: { maxOutputTokens: maxTokens, temperature },
      },
    }
  }

  return {
    url: `${root}/chat/completions`,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
    body: {
      model,
      max_tokens: maxTokens,
      temperature,
      messages: system ? [{ role: 'system', content: system }, ...messages] : messages,
    },
  }
}

/** The assistant's reply and what it cost, whatever shape it arrived in. */
export function parseChatResponse(provider, data) {
  const kind = providerDef(provider).kind

  if (kind === 'anthropic') {
    const text = (data?.content ?? [])
      .filter((block) => block?.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim()
    return {
      text,
      usage: {
        inputTokens: Number(data?.usage?.input_tokens) || 0,
        outputTokens: Number(data?.usage?.output_tokens) || 0,
      },
    }
  }

  if (kind === 'gemini') {
    const text = (data?.candidates?.[0]?.content?.parts ?? [])
      .map((part) => part?.text ?? '')
      .join('')
      .trim()
    return {
      text,
      usage: {
        inputTokens: Number(data?.usageMetadata?.promptTokenCount) || 0,
        outputTokens: Number(data?.usageMetadata?.candidatesTokenCount) || 0,
      },
    }
  }

  const message = data?.choices?.[0]?.message
  // Some OpenAI-compatible servers return content as an array of parts.
  const raw = Array.isArray(message?.content)
    ? message.content.map((part) => part?.text ?? '').join('')
    : message?.content
  return {
    text: (raw ?? '').trim(),
    usage: {
      inputTokens: Number(data?.usage?.prompt_tokens) || 0,
      outputTokens: Number(data?.usage?.completion_tokens) || 0,
    },
  }
}

/** Where to ask a provider what models it will accept. */
export function buildModelsRequest({ provider, apiKey, baseUrl }) {
  const kind = providerDef(provider).kind
  const root = resolveBaseUrl(provider, baseUrl)
  if (!root) throw new Error('no base URL configured for this provider')

  if (kind === 'anthropic') {
    return {
      url: `${root}/models?limit=100`,
      headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    }
  }
  if (kind === 'gemini') {
    return { url: `${root}/models?pageSize=200`, headers: { 'x-goog-api-key': apiKey } }
  }
  return { url: `${root}/models`, headers: { authorization: `Bearer ${apiKey}` } }
}

/** Model ids from a provider's listing, sorted and de-duplicated. */
export function parseModelsResponse(provider, data) {
  const kind = providerDef(provider).kind
  let ids = []

  if (kind === 'gemini') {
    ids = (data?.models ?? [])
      // Gemini lists embedding and tuning models alongside chat ones.
      .filter((model) => (model?.supportedGenerationMethods ?? []).includes('generateContent'))
      // "models/gemini-2.5-pro" → "gemini-2.5-pro"
      .map((model) => String(model?.name ?? '').replace(/^models\//, ''))
  } else {
    ids = (data?.data ?? []).map((model) => String(model?.id ?? ''))
  }

  return [...new Set(ids.filter(Boolean))].sort()
}

/** A provider's public description — everything except anybody's key. */
export function publicProviders() {
  return PROVIDER_IDS.map((id) => ({
    id,
    label: PROVIDERS[id].label,
    kind: PROVIDERS[id].kind,
    defaultBaseUrl: PROVIDERS[id].baseUrl,
    consoleUrl: PROVIDERS[id].consoleUrl,
    suggested: PROVIDERS[id].suggested,
    /** A custom endpoint has no default, so the admin must supply one. */
    requiresBaseUrl: PROVIDERS[id].baseUrl === null,
  }))
}
