#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises'

const inputPath = process.argv[2] || '/private/tmp/kasr-y345-message-graph.json'
const outputPath = process.argv[3] || '/private/tmp/kasr-y345-message-graph-important.json'
const graph = JSON.parse(await readFile(inputPath, 'utf8'))
const important = /\beom\b|\beoy\b|end of (?:the )?(?:module|year|round)|end[- ]?(?:module|year|round)|\beor\b|\bfinal\b|exam|mcq|written|questions?|previous|practical|\bosce\b|\bospe\b|orientation|department|\bdept\b|كتاب القسم|أسئلة|اسئلة|امتحان|عملي|تجميع/iu
const existing = new Set(graph.records.map(record => normalize(record.canonicalUrl || record.url)))
const jobs = []

for (const record of graph.records) {
  if (record.depth !== 3 || record.attachment || !record.exactText || !important.test(record.exactText)) continue
  const parsed = parseTelegramMessageUrl(record.canonicalUrl || record.url)
  if (!parsed) continue
  for (let offset = 1; offset <= 6; offset += 1) {
    const url = `https://t.me/${parsed.channel}/${parsed.postId + offset}`
    const key = normalize(url)
    if (existing.has(key)) continue
    existing.add(key)
    jobs.push({
      year: record.year,
      module: record.module,
      url,
      depth: 4,
      parentUrl: record.canonicalUrl || record.url,
      parentLabel: `Sequential file below: ${record.exactText.split('\n')[0].slice(0, 180)}`,
    })
  }
}

const hydrated = []
const concurrency = 48
for (let index = 0; index < jobs.length; index += concurrency) {
  hydrated.push(...await Promise.all(jobs.slice(index, index + concurrency).map(fetchMessage)))
  process.stdout.write(`checked ${Math.min(index + concurrency, jobs.length)}/${jobs.length}\n`)
}

const output = {
  ...graph,
  generatedAt: new Date().toISOString(),
  hydration: {
    kind: 'important sequential messages below depth-three headings',
    checked: jobs.length,
    successful: hydrated.filter(record => !record.error).length,
    attachments: hydrated.filter(record => record.attachment).length,
    textMessages: hydrated.filter(record => record.exactText).length,
    failed: hydrated.filter(record => record.error).length,
  },
  records: [...graph.records, ...hydrated],
}
output.summary = {
  records: output.records.length,
  successful: output.records.filter(record => !record.error).length,
  attachments: output.records.filter(record => record.attachment).length,
  textMessages: output.records.filter(record => record.exactText).length,
  failed: output.records.filter(record => record.error).length,
  queuedRemaining: 0,
}

await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`)
process.stdout.write(`${JSON.stringify({ hydration: output.hydration, summary: output.summary })}\n`)

async function fetchMessage(item) {
  const widgetUrl = new URL(item.url)
  widgetUrl.searchParams.set('embed', '1')
  widgetUrl.searchParams.set('mode', 'tme')
  const [widget, page] = await Promise.all([fetchWithRetry(widgetUrl), fetchWithRetry(item.url)])
  const html = widget.text
  const pageHtml = page.text
  const parsed = parseTelegramMessageUrl(item.url)
  const post = html.match(/data-post="([^"]+)"/)?.[1] || parsed?.canonical || null
  const authorHtml = html.match(/tgme_widget_message_owner_name[^>]*>([\s\S]*?)<\/a>/)?.[1] || ''
  const textHtml = html.match(/<div class="tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>\s*(?:<div class="tgme_widget_message_footer|<div class="tgme_widget_message_reactions|<a class="tgme_widget_message_photo_wrap|<div class="tgme_widget_message_document_wrap|<div class="tgme_widget_message_video_player)/)?.[1]
    || html.match(/<div class="tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/)?.[1]
    || ''
  const previewText = decodeEntities(pageHtml.match(/<meta\s+property="og:description"\s+content="([\s\S]*?)">/iu)?.[1] || '').trim()
  const documentTitleHtml = html.match(/<div class="tgme_widget_message_document_title[^>]*>([\s\S]*?)<\/div>/)?.[1] || ''
  const documentExtraHtml = html.match(/<div class="tgme_widget_message_document_extra[^>]*>([\s\S]*?)<\/div>/)?.[1] || ''
  const error = widget.error && page.error ? `${widget.error}; ${page.error}` : null
  return {
    ...item,
    canonicalUrl: post ? `https://t.me/${post}` : item.url,
    author: htmlToText(authorHtml),
    exactText: htmlToText(textHtml) || previewText,
    links: extractLinks(textHtml, previewText),
    attachment: documentTitleHtml ? {
      title: htmlToText(documentTitleHtml),
      extra: htmlToText(documentExtraHtml),
    } : null,
    datetime: html.match(/<time datetime="([^"]+)"/)?.[1] || null,
    unsupported: /message_media_not_supported|text_not_supported_wrap/.test(html),
    error: error || (!post ? 'Telegram did not return a public message widget.' : null),
  }
}

async function fetchWithRetry(url) {
  let lastError = null
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'Mozilla/5.0 KasrArchive/1.0' },
        signal: AbortSignal.timeout(7_000),
      })
      const text = await response.text()
      if (response.ok) return { text, error: null }
      lastError = `HTTP ${response.status}`
    } catch (caught) {
      lastError = String(caught?.message || caught)
    }
  }
  return { text: '', error: lastError || 'fetch failed' }
}

function parseTelegramMessageUrl(value) {
  const match = String(value || '').match(/^https?:\/\/(?:www\.)?t\.me\/([A-Za-z0-9_]+)\/(\d+)/iu)
  if (!match) return null
  return { channel: match[1], postId: Number(match[2]), canonical: `${match[1]}/${match[2]}` }
}

function extractLinks(html, plainText = '') {
  const links = []
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/giu)) {
    const href = normalizeTelegramUrl(decodeEntities(match[1]))
    links.push({ href, label: htmlToText(match[2]) })
  }
  for (const match of plainText.matchAll(/https?:\/\/[^\s<>]+/giu)) {
    const href = decodeEntities(match[0]).replace(/[),.;]+$/u, '')
    if (!links.some(link => link.href === href)) links.push({ href, label: href })
  }
  return links
}

function normalizeTelegramUrl(value) {
  if (value.startsWith('//')) return `https:${value}`
  if (value.startsWith('/')) return `https://t.me${value}`
  return value
}

function normalize(value) {
  return String(value || '').replace(/[?#].*$/u, '').replace(/\/$/u, '').toLowerCase()
}

function htmlToText(value) {
  return decodeEntities(String(value || '')
    .replace(/<br\s*\/?>/giu, '\n')
    .replace(/<\/p\s*>/giu, '\n')
    .replace(/<[^>]+>/gu, ''))
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .trim()
}

function decodeEntities(value) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' }
  return String(value).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/giu, (_, entity) => {
    if (entity[0] !== '#') return named[entity.toLowerCase()] ?? `&${entity};`
    const code = entity[1].toLowerCase() === 'x'
      ? Number.parseInt(entity.slice(2), 16)
      : Number.parseInt(entity.slice(1), 10)
    return Number.isFinite(code) ? String.fromCodePoint(code) : `&${entity};`
  })
}
