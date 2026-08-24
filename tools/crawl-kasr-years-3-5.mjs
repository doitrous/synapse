#!/usr/bin/env node

import { writeFile } from 'node:fs/promises'

const outputPath = process.argv[2] || '/private/tmp/kasr-y345-message-graph.json'
const maxDepth = Number(process.argv[3] || 3)
const maxMessages = Number(process.argv[4] || 1800)

const seeds = [
  { year: 3, module: 'General', url: 'https://t.me/FUTUREDOCTORS_197/1927' },
  { year: 4, module: 'General', url: 'https://t.me/FUTUREDOCTORS_196/9255' },
  { year: 5, module: 'General', url: 'https://t.me/FUTUREDOCTORS_Siraj/7275' },
]

const queue = seeds.map(seed => ({ ...seed, depth: 0, parentUrl: null }))
const queued = new Set(queue.map(item => normalize(item.url)))
const records = []

while (queue.length && records.length < maxMessages) {
  const batch = queue.splice(0, 16)
  const fetched = await Promise.all(batch.map(item => fetchMessage(item)))
  for (const record of fetched) {
    records.push(record)
    if (record.depth >= maxDepth || record.error) continue

    const inferred = inferContext(record)
    for (const link of record.links) {
      if (!isPublicTelegramMessage(link.href)) continue
      enqueue({
        year: inferred.year,
        module: inferModule(record, link.label, inferred.module),
        url: link.href,
        depth: record.depth + 1,
        parentUrl: record.canonicalUrl,
        parentLabel: link.label,
      })
    }

    // Telegram index posts sometimes contain only a heading; the actual files are
    // the next few messages. Preserve those successors so text-only exam posts and
    // attachments placed immediately below a heading are not lost.
    if (!record.attachment && record.exactText && record.links.length === 0 && record.depth > 0) {
      const parsed = parseTelegramMessageUrl(record.canonicalUrl)
      if (parsed) {
        for (let offset = 1; offset <= 6; offset += 1) {
          enqueue({
            year: inferred.year,
            module: inferred.module,
            url: `https://t.me/${parsed.channel}/${parsed.postId + offset}`,
            depth: record.depth + 1,
            parentUrl: record.canonicalUrl,
            parentLabel: 'Sequential message below text-only Telegram heading',
          })
        }
      }
    }
  }
  await writeCheckpoint()
  await new Promise(resolve => setTimeout(resolve, 120))
}

const output = {
  generatedAt: new Date().toISOString(),
  maxDepth,
  maxMessages,
  seeds,
  summary: {
    records: records.length,
    successful: records.filter(record => !record.error).length,
    attachments: records.filter(record => record.attachment).length,
    textMessages: records.filter(record => record.exactText).length,
    failed: records.filter(record => record.error).length,
    queuedRemaining: queue.length,
  },
  records,
}

await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`)
process.stdout.write(`${JSON.stringify(output.summary)}\n`)

function enqueue(item) {
  const key = normalize(item.url)
  if (queued.has(key) || records.length + queue.length >= maxMessages) return
  queued.add(key)
  queue.push(item)
}

async function fetchMessage(item) {
  const url = new URL(item.url)
  url.searchParams.set('embed', '1')
  url.searchParams.set('mode', 'tme')
  const [widget, page] = await Promise.all([fetchWithRetry(url), fetchWithRetry(item.url)])
  const html = widget.text
  const pageHtml = page.text
  const post = html.match(/data-post="([^"]+)"/)?.[1] || parseTelegramMessageUrl(item.url)?.canonical || null
  const authorHtml = html.match(/tgme_widget_message_owner_name[^>]*>([\s\S]*?)<\/a>/)?.[1] || ''
  const textHtml = html.match(/<div class="tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>\s*(?:<div class="tgme_widget_message_footer|<div class="tgme_widget_message_reactions|<a class="tgme_widget_message_photo_wrap|<div class="tgme_widget_message_document_wrap|<div class="tgme_widget_message_video_player)/)?.[1]
    || html.match(/<div class="tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/)?.[1]
    || ''
  const previewText = decodeEntities(pageHtml.match(/<meta\s+property="og:description"\s+content="([\s\S]*?)">/iu)?.[1] || '').trim()
  const exactText = htmlToText(textHtml) || previewText
  const documentTitleHtml = html.match(/<div class="tgme_widget_message_document_title[^>]*>([\s\S]*?)<\/div>/)?.[1] || ''
  const documentExtraHtml = html.match(/<div class="tgme_widget_message_document_extra[^>]*>([\s\S]*?)<\/div>/)?.[1] || ''
  const error = widget.error && page.error ? `${widget.error}; ${page.error}` : null
  return {
    ...item,
    canonicalUrl: post ? `https://t.me/${post}` : item.url,
    author: htmlToText(authorHtml),
    exactText,
    links: extractLinks(textHtml, exactText),
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
        signal: AbortSignal.timeout(8_000),
      })
      const text = await response.text()
      if (response.ok) return { text, error: null }
      lastError = `HTTP ${response.status}`
    } catch (caught) {
      lastError = String(caught?.message || caught)
    }
    if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 450))
  }
  return { text: '', error: lastError || 'fetch failed' }
}

async function writeCheckpoint() {
  await writeFile(outputPath, `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    maxDepth,
    maxMessages,
    seeds,
    summary: {
      records: records.length,
      successful: records.filter(record => !record.error).length,
      attachments: records.filter(record => record.attachment).length,
      textMessages: records.filter(record => record.exactText).length,
      failed: records.filter(record => record.error).length,
      queuedRemaining: queue.length,
      status: 'in_progress',
    },
    records,
  }, null, 2)}\n`)
}

function inferContext(record) {
  if (record.depth === 0) return { year: record.year, module: record.module }
  return { year: record.year, module: record.module || 'General' }
}

function inferModule(record, label, fallback) {
  const text = `${label || ''} ${record.exactText || ''}`.toLowerCase()
  if (record.depth === 0) {
    if (/309|para|micro/.test(text)) return '309 INF'
    if (/310|patho|pharma/.test(text)) return '310 PAT'
    if (/nutrition|319/.test(text)) return '319 Nutrition'
    if (/investigation|314/.test(text)) return '314 Investigation'
    if (/ophth|عيون/.test(text)) return '315 Ophthalmology'
    if (/\bent\b|الأنف|الاذن|الأذن/.test(text)) return '316 ENT'
    if (/toxic|forensic|سموم|شرعي/.test(text)) return '317 Forensic & Toxicology'
    if (/mpe|ethic/.test(text)) return '327 MPE Ethics'
    if (/قضايا|community issues/.test(text)) return 'Community Issues'
    if (/elective|اختيار/.test(text)) return 'Elective Courses'
    if (/paed|pediatric|الأطفال/.test(text)) return '424 Paediatrics'
    if (/obstetric|gynec|gyna|نساء/.test(text)) return '425 Obstetrics & Gynaecology'
    if (/psychi|النفسي/.test(text)) return '413 Psychiatry'
    if (/community|المجتمع/.test(text)) return '418 Community Medicine'
    if (/palliative|oncology|الأورام|التلطيف/.test(text)) return 'Palliative Medicine & Oncology'
    if (/research/.test(text)) return '434 Research'
    if (/family|الأسرة/.test(text)) return record.year === 5 ? 'Family Medicine' : 'Family Medicine'
    if (/surgery|جراحة/.test(text)) return record.year === 5 ? 'Surgery' : '423 General Surgery'
    if (/internal medicine|باطنة/.test(text)) return record.year === 5 ? 'Internal Medicine' : '422 Internal Medicine'
  }
  return fallback || 'General'
}

function isPublicTelegramMessage(value) {
  return /^https?:\/\/(?:www\.)?t\.me\/[A-Za-z0-9_]+\/\d+(?:[?#].*)?$/iu.test(value || '')
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
