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
 * Providers that can be given tools.
 *
 * A `custom` endpoint speaks OpenAI's shape but is some unknown server behind
 * it, and one that ignores `tools` answers a tool-call request with nothing
 * useful. Those get retrieval injected into the prompt instead — see
 * `assistantTools.js`.
 */
export function supportsTools(provider) {
  return provider !== 'custom' && Object.hasOwn(PROVIDERS, provider)
}

/**
 * The characters an assistant turn is pre-filled with to force JSON.
 *
 * Anthropic has no JSON mode; the equivalent is putting the opening brace in
 * the model's mouth. The caller has to put it back on the front of the reply,
 * because the response only carries what came after it.
 */
export function jsonPrefill(provider) {
  return providerDef(provider).kind === 'anthropic' ? '{' : ''
}

/**
 * One conversation turn, in this provider's shape.
 *
 * Turns are held in one internal form — `{ role, content, toolCalls, results }`
 * — and translated here, so a conversation that started on one provider can be
 * re-sent to another mid-fallback without being rebuilt.
 */
function serialiseTurn(kind, message) {
  const { role, content = '', toolCalls = [], results = [] } = message

  if (kind === 'anthropic') {
    if (results.length) {
      return [{ role: 'user', content: results.map((r) => ({ type: 'tool_result', tool_use_id: r.id, content: r.content })) }]
    }
    if (toolCalls.length) {
      return [{
        role: 'assistant',
        content: [
          ...(content ? [{ type: 'text', text: content }] : []),
          ...toolCalls.map((call) => ({ type: 'tool_use', id: call.id, name: call.name, input: call.args })),
        ],
      }]
    }
    return [{ role, content }]
  }

  if (kind === 'gemini') {
    if (results.length) {
      return [{ role: 'user', parts: results.map((r) => ({ functionResponse: { name: r.name, response: { result: r.content } } })) }]
    }
    return [{
      // Gemini calls the assistant "model" and has no "assistant" role.
      role: role === 'assistant' ? 'model' : 'user',
      parts: [
        ...(content ? [{ text: content }] : []),
        ...toolCalls.map((call) => ({ functionCall: { name: call.name, args: call.args } })),
      ],
    }]
  }

  // OpenAI: a tool result is its own message per call, not one message of many.
  if (results.length) return results.map((r) => ({ role: 'tool', tool_call_id: r.id, content: r.content }))
  if (toolCalls.length) {
    return [{
      role: 'assistant',
      content: content || null,
      tool_calls: toolCalls.map((call) => ({
        id: call.id, type: 'function', function: { name: call.name, arguments: JSON.stringify(call.args ?? {}) },
      })),
    }]
  }
  return [{ role, content }]
}

/** The tool list, in this provider's shape. `tools` is `{name, description, parameters}[]`. */
function serialiseTools(kind, tools) {
  if (!tools?.length) return undefined
  if (kind === 'anthropic') {
    return tools.map((t) => ({ name: t.name, description: t.description, input_schema: t.parameters }))
  }
  if (kind === 'gemini') return [{ functionDeclarations: tools }]
  return tools.map((t) => ({ type: 'function', function: t }))
}

/**
 * A chat request, in the shape this provider expects.
 *
 * `system` is passed separately by the caller because the three formats put it
 * in three different places — a top-level field, a `systemInstruction` object,
 * or a message with a role. Flattening it into the message list for everyone
 * would quietly weaken it on the providers that treat it specially.
 *
 * `json` asks for a machine-readable answer the only way each provider offers:
 * a response format, a response MIME type, or a prefilled opening brace.
 */
export function buildChatRequest({ provider, model, system, messages, maxTokens, temperature, apiKey, baseUrl, json, tools }) {
  const kind = providerDef(provider).kind
  const root = resolveBaseUrl(provider, baseUrl)
  if (!root) throw new Error('no base URL configured for this provider')
  const turns = messages.flatMap((message) => serialiseTurn(kind, message))

  if (kind === 'anthropic') {
    return {
      url: `${root}/messages`,
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: {
        model,
        max_tokens: maxTokens,
        temperature,
        system,
        messages: json ? [...turns, { role: 'assistant', content: '{' }] : turns,
        tools: serialiseTools(kind, tools),
      },
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
        contents: turns,
        tools: serialiseTools(kind, tools),
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature,
          ...(json ? { responseMimeType: 'application/json' } : {}),
        },
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
      messages: system ? [{ role: 'system', content: system }, ...turns] : turns,
      tools: serialiseTools(kind, tools),
      ...(json ? { response_format: { type: 'json_object' } } : {}),
    },
  }
}

/** The assistant's reply, any tools it asked for, and what it cost. */
export function parseChatResponse(provider, data) {
  const kind = providerDef(provider).kind

  if (kind === 'anthropic') {
    const blocks = data?.content ?? []
    const text = blocks
      .filter((block) => block?.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim()
    return {
      text,
      toolCalls: blocks
        .filter((block) => block?.type === 'tool_use')
        .map((block) => ({ id: block.id, name: block.name, args: block.input ?? {} })),
      usage: {
        inputTokens: Number(data?.usage?.input_tokens) || 0,
        outputTokens: Number(data?.usage?.output_tokens) || 0,
      },
    }
  }

  if (kind === 'gemini') {
    const parts = data?.candidates?.[0]?.content?.parts ?? []
    const text = parts.map((part) => part?.text ?? '').join('').trim()
    return {
      text,
      // Gemini names no call id, so the function name is the id. That is enough:
      // a result is matched back by name in its own wire shape too.
      toolCalls: parts
        .filter((part) => part?.functionCall?.name)
        .map((part) => ({ id: part.functionCall.name, name: part.functionCall.name, args: part.functionCall.args ?? {} })),
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
    toolCalls: (message?.tool_calls ?? [])
      .filter((call) => call?.function?.name)
      .map((call) => {
        let args = {}
        // A model writes these arguments, so they are not trusted to parse.
        try { args = JSON.parse(call.function.arguments || '{}') } catch { args = {} }
        return { id: call.id, name: call.function.name, args }
      }),
    usage: {
      inputTokens: Number(data?.usage?.prompt_tokens) || 0,
      outputTokens: Number(data?.usage?.completion_tokens) || 0,
    },
  }
}

/**
 * The first JSON object in a reply, or null.
 *
 * A model asked for bare JSON is not trusted to send it — it may wrap the
 * object in prose or a ```json fence even with a response format set, and some
 * OpenAI-compatible servers ignore the format field entirely. This pulls out
 * the first balanced `{...}` block and parses that, returning null rather than
 * throwing on anything unparseable.
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
