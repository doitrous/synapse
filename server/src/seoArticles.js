import { marked } from 'marked'

export const SUPPORTED = ['en', 'ar']
const str = (v) => typeof v === 'string' && v.trim().length > 0
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export function validatePayload(body) {
  if (!body || !Number.isInteger(body.externalId)) return { error: 'invalid externalId' }
  if (!Array.isArray(body.articles) || body.articles.length === 0) return { error: 'invalid articles' }
  for (const [i, a] of body.articles.entries()) {
    for (const k of ['lang', 'title', 'slug', 'bodyMd']) if (!str(a?.[k])) return { error: `invalid articles[${i}].${k}` }
    if (a.faq !== undefined && (!Array.isArray(a.faq) || a.faq.some((f) => !str(f?.q) || !str(f?.a)))) return { error: `invalid articles[${i}].faq` }
    if (a.schemaJsonld !== undefined && !Array.isArray(a.schemaJsonld)) return { error: `invalid articles[${i}].schemaJsonld` }
  }
  if (body.image != null && !str(body.image.url)) return { error: 'invalid image' }
  return { payload: body }
}

const stripRawHtml = (md) => md.replace(/<\s*\/?\s*(script|iframe|object|embed|style)[^>]*>/gi, '').replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|\S+)/gi, '')
export function renderBody(md) {
  const html = marked.parse(stripRawHtml(md.replace(/^# .*\n?/m, '')), { async: false })
  return html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" rel="noopener" target="_blank"')
}
export function intro(md) {
  const p = md.replace(/^# .*\n?/m, '').split(/\n{2,}/).map((x) => x.trim()).find((x) => x && !x.startsWith('#')) ?? ''
  return p.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '')
}
export function toRows(payload) {
  const skipped = [], rows = []
  for (const a of payload.articles) {
    if (!SUPPORTED.includes(a.lang)) { skipped.push(a.lang); continue }
    rows.push({ external_id: payload.externalId, lang: a.lang, slug: a.slug, title: a.title, meta_title: a.metaTitle || a.title,
      meta_description: a.metaDescription || intro(a.bodyMd).slice(0, 155), body_md: a.bodyMd, body_html: renderBody(a.bodyMd),
      faq: a.faq ?? [], schema_jsonld: a.schemaJsonld ?? [], image_url: payload.image?.url ?? null, image_alt: payload.image?.alt ?? null,
      author_name: payload.author?.name ?? null, author_credentials: payload.author?.credentials ?? null })
  }
  return { skipped, rows }
}

const T = { en: { blog: 'Blog', home: 'Nishany', by: 'By', faq: 'Frequently asked questions', more: 'Read more' }, ar: { blog: 'المدونة', home: 'نيشاني', by: 'بقلم', faq: 'الأسئلة الشائعة', more: 'اقرأ المزيد' } }
const shell = (lang, head, body) => `<!doctype html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${head}
<style>body{margin:0;font-family:${lang === 'ar' ? "'IBM Plex Sans Arabic',system-ui" : 'Figtree,system-ui'},sans-serif;color:#1c1c1e;background:#fff}header,main,footer{max-width:760px;margin:0 auto;padding:1.5rem 1.25rem}header a{color:#0b5fff;text-decoration:none;font-weight:600}h1{font-size:2rem;line-height:1.2}article img{max-width:100%;border-radius:12px}article p,article li{line-height:1.8}article h2{margin-top:2rem}.meta{color:#666;font-size:.9rem}.card{padding:1rem 0;border-bottom:1px solid #eee}footer{color:#666;font-size:.85rem}</style></head>
<body><header><a href="/${lang}">${T[lang].home}</a> · <a href="/blog/${lang}">${T[lang].blog}</a></header><main>${body}</main><footer>© Nishany</footer></body></html>`

export function articlePage(row, langsStored, origin) {
  const t = T[row.lang], url = `${origin}/blog/${row.lang}/${row.slug}`
  const alternates = langsStored.map((l) => `<link rel="alternate" hreflang="${l}" href="${origin}/blog/${l}/${row.slug}">`).join('')
    + `<link rel="alternate" hreflang="x-default" href="${origin}/blog/${langsStored.includes('en') ? 'en' : langsStored[0]}/${row.slug}">`
  const ld = (row.schema_jsonld ?? []).map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('')
  const faq = row.faq?.length ? `<section><h2>${t.faq}</h2>${row.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</section>` : ''
  const head = `<title>${esc(row.meta_title || row.title)}</title><meta name="description" content="${esc(row.meta_description)}"><link rel="canonical" href="${url}">${alternates}<meta property="og:title" content="${esc(row.title)}"><meta property="og:description" content="${esc(row.meta_description)}">${row.image_url ? `<meta property="og:image" content="${esc(row.image_url)}">` : ''}${ld}`
  const byline = row.author_name ? `<p class="meta">${t.by} ${esc(row.author_name)}${row.author_credentials ? ', ' + esc(row.author_credentials) : ''}${row.published_at ? ' · ' + new Date(row.published_at).toISOString().slice(0, 10) : ''}</p>` : ''
  const img = row.image_url ? `<img src="${esc(row.image_url)}" alt="${esc(row.image_alt || row.title)}">` : ''
  return shell(row.lang, head, `<article><h1>${esc(row.title)}</h1>${byline}${img}${row.body_html}${faq}</article>`)
}
export function indexPage(lang, rows, origin) {
  const t = T[lang]
  const head = `<title>${t.blog} · Nishany</title><link rel="canonical" href="${origin}/blog/${lang}">` + SUPPORTED.map((l) => `<link rel="alternate" hreflang="${l}" href="${origin}/blog/${l}">`).join('')
  const cards = rows.map((r) => `<div class="card"><h2><a href="/blog/${lang}/${r.slug}">${esc(r.title)}</a></h2><p>${esc(r.meta_description)}</p><p class="meta">${r.published_at ? new Date(r.published_at).toISOString().slice(0, 10) : ''}</p></div>`).join('')
  return shell(lang, head, `<h1>${t.blog}</h1>${cards}`)
}
export const STATIC_URLS = [
  { path: '/', alternates: { ar: '/ar', en: '/en', 'x-default': '/' } },
  { path: '/ar', alternates: { ar: '/ar', en: '/en' } },
  { path: '/en', alternates: { ar: '/ar', en: '/en' } },
  { path: '/pricing', alternates: { ar: '/ar/pricing', en: '/pricing', 'x-default': '/pricing' } },
  { path: '/en/pricing', alternates: { ar: '/ar/pricing', en: '/pricing', 'x-default': '/pricing' } },
  { path: '/ar/pricing', alternates: { ar: '/ar/pricing', en: '/pricing' } },
  { path: '/terms', alternates: { en: '/terms', 'x-default': '/terms' } },
  { path: '/privacy', alternates: { en: '/privacy', 'x-default': '/privacy' } },
  { path: '/refund-policy', alternates: { en: '/refund-policy', 'x-default': '/refund-policy' } },
  { path: '/contact', alternates: { en: '/contact', 'x-default': '/contact' } },
  { path: '/accessibility', alternates: { en: '/accessibility', 'x-default': '/accessibility' } },
]
export function sitemapXml(rows, origin) {
  const u = (loc, alternates, lastmod) => `<url><loc>${origin}${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}${Object.entries(alternates).map(([l, p]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${origin}${p}"/>`).join('')}</url>`
  const bySlug = new Map()
  for (const r of rows) { if (!bySlug.has(r.slug)) bySlug.set(r.slug, []); bySlug.get(r.slug).push(r) }
  const articleUrls = [...bySlug.values()].flatMap((group) => {
    const alternates = Object.fromEntries(group.map((r) => [r.lang, `/blog/${r.lang}/${r.slug}`]))
    return group.map((r) => u(`/blog/${r.lang}/${r.slug}`, alternates, r.updated_at ? new Date(r.updated_at).toISOString().slice(0, 10) : undefined))
  })
  const indexUrls = SUPPORTED.map((l) => u(`/blog/${l}`, Object.fromEntries(SUPPORTED.map((x) => [x, `/blog/${x}`]))))
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${STATIC_URLS.map((s) => u(s.path, s.alternates)).join('')}${indexUrls.join('')}${articleUrls.join('')}</urlset>`
}
