export const SUPPORTED = ['en', 'ar']
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const T = { en: { blog: 'Blog', home: 'Nishany', by: 'By', faq: 'Frequently asked questions', more: 'Read more', references: 'References' }, ar: { blog: 'المدونة', home: 'نيشاني', by: 'بقلم', faq: 'الأسئلة الشائعة', more: 'اقرأ المزيد', references: 'المراجع' } }
const shell = (lang, head, body) => `<!doctype html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${head}
<style>body{margin:0;font-family:${lang === 'ar' ? "'IBM Plex Sans Arabic',system-ui" : 'Figtree,system-ui'},sans-serif;color:#1c1c1e;background:#fff}header,main,footer{max-width:760px;margin:0 auto;padding:1.5rem 1.25rem}header a{color:#0b5fff;text-decoration:none;font-weight:600}h1{font-size:2rem;line-height:1.2}article img{max-width:100%;border-radius:12px}article p,article li{line-height:1.8}article h2{margin-top:2rem}.meta{color:#666;font-size:.9rem}.card{padding:1rem 0;border-bottom:1px solid #eee}footer{color:#666;font-size:.85rem}</style></head>
<body><header><a href="/${lang}">${T[lang].home}</a> · <a href="/blog/${lang}">${T[lang].blog}</a></header><main>${body}</main><footer>© Nishany</footer></body></html>`

export function articlePage(row, siblings, origin) {
  // slug is hub-supplied; escaped here like every other user-derived string
  // (defence in depth even though the hub's own ingest already restricts its
  // format) so it can't break out of these href attributes. Each sibling
  // carries its OWN slug — the hub lets translations of the same job use
  // different slugs — so hreflang must not reuse this row's slug for every
  // language.
  const t = T[row.lang], slug = esc(row.slug), url = `${origin}/blog/${row.lang}/${slug}`
  const xDefault = siblings.find((s) => s.lang === 'en') ?? siblings[0]
  const alternates = siblings.map((s) => `<link rel="alternate" hreflang="${s.lang}" href="${origin}/blog/${s.lang}/${esc(s.slug)}">`).join('')
    + `<link rel="alternate" hreflang="x-default" href="${origin}/blog/${xDefault.lang}/${esc(xDefault.slug)}">`
  const ld = (row.schema_jsonld ?? []).map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('')
  const faq = row.faq?.length ? `<section><h2>${t.faq}</h2>${row.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</section>` : ''
  const refs = row.references_json?.length ? `<section><h2>${t.references}</h2><ol>${row.references_json.map((r) => `<li><a href="${esc(r.url)}" rel="nofollow noopener" target="_blank">${esc(r.title)}</a>${r.publisher ? ` — ${esc(r.publisher)}` : ''}${r.date ? ` (${esc(r.date)})` : ''}</li>`).join('')}</ol></section>` : ''
  const head = `<title>${esc(row.meta_title || row.title)}</title><meta name="description" content="${esc(row.meta_description)}"><link rel="canonical" href="${url}">${alternates}<meta property="og:title" content="${esc(row.og_title || row.title)}"><meta property="og:description" content="${esc(row.og_description || row.meta_description)}">${row.image_url ? `<meta property="og:image" content="${esc(row.image_url)}">` : ''}${ld}`
  const byline = row.author_name ? `<p class="meta">${t.by} ${esc(row.author_name)}${row.author_credentials ? ', ' + esc(row.author_credentials) : ''}${row.published_at ? ' · ' + new Date(row.published_at).toISOString().slice(0, 10) : ''}</p>` : ''
  const img = row.image_url ? `<img src="${esc(row.image_url)}" alt="${esc(row.image_alt || row.title)}">` : ''
  return shell(row.lang, head, `<article><h1>${esc(row.title)}</h1>${byline}${img}${row.body_html}${faq}${refs}</article>`)
}
export function indexPage(lang, rows, origin) {
  const t = T[lang]
  const head = `<title>${t.blog} · Nishany</title><link rel="canonical" href="${origin}/blog/${lang}">`
    + SUPPORTED.map((l) => `<link rel="alternate" hreflang="${l}" href="${origin}/blog/${l}">`).join('')
    + `<link rel="alternate" hreflang="x-default" href="${origin}/blog/en">`
  const cards = rows.map((r) => {
    const img = r.image_url ? `<img src="${esc(r.image_url)}" alt="${esc(r.image_alt || r.title)}" loading="lazy">` : ''
    return `<div class="card">${img}<h2><a href="/blog/${lang}/${esc(r.slug)}">${esc(r.title)}</a></h2><p>${esc(r.meta_description)}</p><p class="meta">${r.published_at ? new Date(r.published_at).toISOString().slice(0, 10) : ''}</p></div>`
  }).join('')
  return shell(lang, head, `<h1>${t.blog}</h1>${cards}`)
}
