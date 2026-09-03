import test from 'node:test'
import assert from 'node:assert/strict'
import {
  PROVIDER_IDS, providerDef, resolveBaseUrl, envKeyFor,
  buildChatRequest, parseChatResponse, buildModelsRequest, parseModelsResponse, publicProviders,
  supportsTools, jsonPrefill,
} from './assistantProviders.js'

const TURNS = [{ role: 'user', content: 'Explain preload.' }]
const BASE = { model: 'm', system: 'SYSTEM', messages: TURNS, maxTokens: 500, temperature: 0.3, apiKey: 'k-secret' }

test('an OpenAI-compatible provider is a bearer token and /chat/completions', () => {
  const request = buildChatRequest({ ...BASE, provider: 'groq' })
  assert.equal(request.url, 'https://api.groq.com/openai/v1/chat/completions')
  assert.equal(request.headers.authorization, 'Bearer k-secret')
  // The system prompt is a message with a role here, and must come first.
  assert.equal(request.body.messages[0].role, 'system')
  assert.equal(request.body.messages[0].content, 'SYSTEM')
  assert.equal(request.body.messages[1].content, 'Explain preload.')
})

test('Groq, OpenAI, xAI and OpenRouter differ only by host', () => {
  // If these ever diverge in shape the difference belongs in the adapter, not
  // in four copies of a request builder.
  const hosts = ['groq', 'openai', 'xai', 'openrouter'].map((provider) => {
    const request = buildChatRequest({ ...BASE, provider })
    assert.ok(request.url.endsWith('/chat/completions'), `${provider} posts to /chat/completions`)
    assert.equal(request.headers.authorization, 'Bearer k-secret')
    return new URL(request.url).host
  })
  assert.equal(new Set(hosts).size, 4, 'each provider has its own host')
})

test('Anthropic takes the system prompt as its own field, not as a message', () => {
  const request = buildChatRequest({ ...BASE, provider: 'anthropic' })
  assert.equal(request.url, 'https://api.anthropic.com/v1/messages')
  assert.equal(request.headers['x-api-key'], 'k-secret')
  assert.equal(request.headers['anthropic-version'], '2023-06-01')
  assert.equal(request.body.system, 'SYSTEM')
  assert.equal(request.body.messages.length, 1, 'the system prompt is not also a message')
  assert.ok(!('authorization' in request.headers), 'Anthropic does not use a bearer token')
})

test('Gemini names the model in the path and the assistant "model"', () => {
  const request = buildChatRequest({
    ...BASE, provider: 'google', model: 'gemini-2.5-pro',
    messages: [{ role: 'user', content: 'a' }, { role: 'assistant', content: 'b' }],
  })
  assert.match(request.url, /\/models\/gemini-2\.5-pro:generateContent$/)
  assert.equal(request.headers['x-goog-api-key'], 'k-secret')
  assert.equal(request.body.systemInstruction.parts[0].text, 'SYSTEM')
  assert.deepEqual(request.body.contents.map((c) => c.role), ['user', 'model'])
})

test('the Gemini key travels in a header, never in the URL', () => {
  // A key in a query string is logged by every proxy in between and shows up in
  // error reports. Gemini accepts `?key=`; that is exactly why this is asserted.
  const request = buildChatRequest({ ...BASE, provider: 'google' })
  assert.ok(!request.url.includes('k-secret'), 'the key is not in the URL')
  assert.ok(!request.url.includes('key='), 'no key query parameter')
})

test('a custom provider uses the base URL it is given, and refuses without one', () => {
  const request = buildChatRequest({ ...BASE, provider: 'custom', baseUrl: 'https://llm.internal/v1/' })
  assert.equal(request.url, 'https://llm.internal/v1/chat/completions', 'a trailing slash does not double up')
  assert.throws(() => buildChatRequest({ ...BASE, provider: 'custom' }), /base URL/)
})

test('an explicit base URL overrides the provider default', () => {
  const request = buildChatRequest({ ...BASE, provider: 'groq', baseUrl: 'https://proxy.internal/v1' })
  assert.equal(request.url, 'https://proxy.internal/v1/chat/completions')
  assert.equal(resolveBaseUrl('groq', ''), 'https://api.groq.com/openai/v1', 'blank falls back to the default')
})

test('each provider response shape yields the same reply and token counts', () => {
  // The point of the adapters: one caller, three wire formats, one result.
  const openai = parseChatResponse('groq', {
    choices: [{ message: { content: '  hello  ' } }],
    usage: { prompt_tokens: 11, completion_tokens: 22 },
  })
  const anthropic = parseChatResponse('anthropic', {
    content: [{ type: 'text', text: 'hello' }, { type: 'thinking', text: 'ignored' }],
    usage: { input_tokens: 11, output_tokens: 22 },
  })
  const gemini = parseChatResponse('google', {
    candidates: [{ content: { parts: [{ text: 'hel' }, { text: 'lo' }] } }],
    usageMetadata: { promptTokenCount: 11, candidatesTokenCount: 22 },
  })

  for (const [name, parsed] of [['openai', openai], ['anthropic', anthropic], ['gemini', gemini]]) {
    assert.equal(parsed.text, 'hello', `${name} reply`)
    assert.equal(parsed.usage.inputTokens, 11, `${name} input tokens`)
    assert.equal(parsed.usage.outputTokens, 22, `${name} output tokens`)
  }
})

test('a non-text Anthropic block is not concatenated into the reply', () => {
  const parsed = parseChatResponse('anthropic', { content: [{ type: 'thinking', text: 'private' }] })
  assert.equal(parsed.text, '')
})

test('an empty or malformed response reads as empty rather than throwing', () => {
  // An upstream that answers 200 with nothing useful must not take the process
  // down; `chat` turns an empty reply into an error the student can act on.
  for (const provider of ['groq', 'anthropic', 'google']) {
    assert.equal(parseChatResponse(provider, {}).text, '')
    assert.equal(parseChatResponse(provider, { choices: [] }).text, '')
    assert.equal(parseChatResponse(provider, null).text, '')
  }
})

test('an OpenAI-compatible reply may arrive as content parts', () => {
  const parsed = parseChatResponse('openai', { choices: [{ message: { content: [{ text: 'a' }, { text: 'b' }] } }] })
  assert.equal(parsed.text, 'ab')
})

test('model listings are parsed, de-duplicated and sorted per provider', () => {
  assert.deepEqual(
    parseModelsResponse('groq', { data: [{ id: 'b' }, { id: 'a' }, { id: 'a' }] }),
    ['a', 'b'],
  )
  // Gemini prefixes ids and lists models that cannot hold a conversation.
  assert.deepEqual(
    parseModelsResponse('google', {
      models: [
        { name: 'models/gemini-2.5-pro', supportedGenerationMethods: ['generateContent'] },
        { name: 'models/text-embedding-004', supportedGenerationMethods: ['embedContent'] },
      ],
    }),
    ['gemini-2.5-pro'],
  )
})

test('the models endpoint is authenticated the same way the chat endpoint is', () => {
  assert.equal(buildModelsRequest({ provider: 'groq', apiKey: 'k' }).headers.authorization, 'Bearer k')
  assert.equal(buildModelsRequest({ provider: 'anthropic', apiKey: 'k' }).headers['x-api-key'], 'k')
  assert.equal(buildModelsRequest({ provider: 'google', apiKey: 'k' }).headers['x-goog-api-key'], 'k')
})

test('each provider reads its own environment key, and Grok answers to both names', () => {
  assert.equal(envKeyFor('groq', { GROQ_API_KEY: 'g' }), 'g')
  assert.equal(envKeyFor('anthropic', { ANTHROPIC_API_KEY: 'a' }), 'a')
  assert.equal(envKeyFor('google', { GOOGLE_API_KEY: 'x' }), 'x', 'GOOGLE_API_KEY is accepted')
  assert.equal(envKeyFor('google', { GEMINI_API_KEY: 'y' }), 'y', 'GEMINI_API_KEY is accepted')
  assert.equal(envKeyFor('xai', { GROK_API_KEY: 'z' }), 'z')
  assert.equal(envKeyFor('groq', {}), null)
  // A key for one provider must never be offered to another.
  assert.equal(envKeyFor('openai', { GROQ_API_KEY: 'g' }), null)
})

test('an unknown provider falls back rather than crashing the request builder', () => {
  assert.equal(providerDef('nonsense').kind, 'anthropic')
  assert.doesNotThrow(() => buildChatRequest({ ...BASE, provider: 'nonsense' }))
})

test('the public description never carries a key, and flags what needs a URL', () => {
  const listed = publicProviders()
  assert.deepEqual(listed.map((entry) => entry.id).sort(), [...PROVIDER_IDS].sort())
  assert.ok(listed.every((entry) => !('envKeys' in entry)), 'env var names are not published')
  assert.ok(!JSON.stringify(listed).includes('k-secret'))
  assert.equal(listed.find((entry) => entry.id === 'custom').requiresBaseUrl, true)
  assert.equal(listed.find((entry) => entry.id === 'groq').requiresBaseUrl, false)
})

// ── JSON mode ──────────────────────────────────────────────────────────────

test('each provider is asked for JSON the only way it offers', () => {
  // The same intent, three unrelated mechanisms. Getting one wrong fails
  // exactly like a truncated answer, so each is pinned here.
  const openai = buildChatRequest({ ...BASE, provider: 'openai', json: true })
  assert.deepEqual(openai.body.response_format, { type: 'json_object' })

  const gemini = buildChatRequest({ ...BASE, provider: 'google', json: true })
  assert.equal(gemini.body.generationConfig.responseMimeType, 'application/json')

  // Anthropic has no JSON mode; the equivalent is putting the brace in the
  // model's mouth, which is why the caller has to put it back on the reply.
  const anthropic = buildChatRequest({ ...BASE, provider: 'anthropic', json: true })
  assert.deepEqual(anthropic.body.messages.at(-1), { role: 'assistant', content: '{' })
  assert.equal(jsonPrefill('anthropic'), '{')
  assert.equal(jsonPrefill('openai'), '')
})

test('a plain request carries no JSON field at all', () => {
  // Chat answers in prose. A response format left on by accident would make
  // every student answer a JSON object.
  const request = buildChatRequest({ ...BASE, provider: 'openai' })
  assert.ok(!('response_format' in request.body))
  assert.equal(buildChatRequest({ ...BASE, provider: 'anthropic' }).body.messages.length, 1)
})

// ── Tools ──────────────────────────────────────────────────────────────────

const TOOLS = [{ name: 'searchLibrary', description: 'Search', parameters: { type: 'object', properties: {} } }]

test('a tool list is translated into each provider own shape', () => {
  assert.equal(buildChatRequest({ ...BASE, provider: 'openai', tools: TOOLS }).body.tools[0].type, 'function')
  assert.equal(buildChatRequest({ ...BASE, provider: 'anthropic', tools: TOOLS }).body.tools[0].input_schema.type, 'object')
  assert.equal(
    buildChatRequest({ ...BASE, provider: 'google', tools: TOOLS }).body.tools[0].functionDeclarations[0].name,
    'searchLibrary',
  )
})

test('a custom endpoint is not offered tools, because nothing says it has any', () => {
  // It speaks OpenAI's shape, but some unknown server is behind it and one
  // that ignores `tools` answers a tool-call request with nothing useful.
  assert.equal(supportsTools('custom'), false)
  assert.equal(supportsTools('groq'), true)
  assert.equal(supportsTools('not-a-provider'), false)
})

test('a tool call and its result survive being re-sent to a different provider', () => {
  // This is what makes falling over mid-conversation possible: turns are held
  // in one internal shape and translated per step, never rebuilt.
  const turns = [
    { role: 'user', content: 'Explain preload.' },
    { role: 'assistant', content: '', toolCalls: [{ id: 'call_1', name: 'searchLibrary', args: { query: 'preload' } }] },
    { role: 'tool', results: [{ id: 'call_1', name: 'searchLibrary', content: '<context source="library" id="a-1"></context>' }] },
  ]

  const openai = buildChatRequest({ ...BASE, provider: 'openai', messages: turns }).body.messages
  assert.equal(openai.at(-2).tool_calls[0].function.name, 'searchLibrary')
  assert.equal(JSON.parse(openai.at(-2).tool_calls[0].function.arguments).query, 'preload')
  assert.equal(openai.at(-1).role, 'tool')
  assert.equal(openai.at(-1).tool_call_id, 'call_1')

  const anthropic = buildChatRequest({ ...BASE, provider: 'anthropic', messages: turns }).body.messages
  assert.equal(anthropic.at(-2).content.at(-1).type, 'tool_use')
  assert.equal(anthropic.at(-1).role, 'user', 'Anthropic returns a tool result as a user turn')
  assert.equal(anthropic.at(-1).content[0].type, 'tool_result')

  const gemini = buildChatRequest({ ...BASE, provider: 'google', messages: turns }).body.contents
  assert.equal(gemini.at(-2).role, 'model')
  assert.equal(gemini.at(-2).parts.at(-1).functionCall.name, 'searchLibrary')
  assert.equal(gemini.at(-1).parts[0].functionResponse.name, 'searchLibrary')
})

test('tool calls are read back out of each response shape', () => {
  const openai = parseChatResponse('openai', {
    choices: [{ message: { content: null, tool_calls: [{ id: 'c1', function: { name: 'getArticle', arguments: '{"id":"a-1"}' } }] } }],
  })
  assert.deepEqual(openai.toolCalls, [{ id: 'c1', name: 'getArticle', args: { id: 'a-1' } }])

  // A model writes those arguments, so unparseable ones are empty, not a throw.
  const broken = parseChatResponse('openai', {
    choices: [{ message: { tool_calls: [{ id: 'c2', function: { name: 'getArticle', arguments: 'not json' } }] } }],
  })
  assert.deepEqual(broken.toolCalls[0].args, {})

  const anthropic = parseChatResponse('anthropic', {
    content: [{ type: 'text', text: 'Looking…' }, { type: 'tool_use', id: 'c3', name: 'searchLibrary', input: { query: 'x' } }],
  })
  assert.equal(anthropic.text, 'Looking…')
  assert.deepEqual(anthropic.toolCalls, [{ id: 'c3', name: 'searchLibrary', args: { query: 'x' } }])

  const gemini = parseChatResponse('google', {
    candidates: [{ content: { parts: [{ functionCall: { name: 'searchQuestions', args: { query: 'x' } } }] } }],
  })
  assert.equal(gemini.toolCalls[0].name, 'searchQuestions')

  assert.deepEqual(parseChatResponse('openai', { choices: [{ message: { content: 'plain' } }] }).toolCalls, [])
})
