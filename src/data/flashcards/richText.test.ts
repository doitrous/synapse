import { test } from 'node:test'
import assert from 'node:assert/strict'
import { escapeHtml, isLegacyPlainText, isRichEmpty, richToPlainText, sanitizeRich } from './richText.ts'

test('allowed inline formatting survives', () => {
  assert.equal(sanitizeRich('<b>bold</b> and <i>italic</i>'), '<b>bold</b> and <i>italic</i>')
  assert.equal(sanitizeRich('H<sub>2</sub>O and x<sup>2</sup>'), 'H<sub>2</sub>O and x<sup>2</sup>')
  assert.equal(sanitizeRich('<mark>note</mark>'), '<mark>note</mark>')
})

test('script tags are dropped, content and all', () => {
  assert.equal(sanitizeRich('a<script>alert(1)</script>b'), 'ab')
  assert.equal(sanitizeRich('<script>evil()</script>'), '')
})

test('event-handler and unknown attributes never survive', () => {
  assert.equal(sanitizeRich('<b onclick="steal()">x</b>'), '<b>x</b>')
  assert.equal(sanitizeRich('<span class="x" id="y" data-z="1">t</span>'), '<span>t</span>')
})

test('img with onerror is removed entirely', () => {
  assert.equal(sanitizeRich('<img src=x onerror="alert(1)">safe'), 'safe')
})

test('javascript: links are stripped but the text stays', () => {
  assert.equal(sanitizeRich('<a href="javascript:alert(1)">click</a>'), '<a>click</a>')
  assert.equal(sanitizeRich('<a href="https://ok.example/x">ok</a>'), '<a href="https://ok.example/x">ok</a>')
})

test('only allowlisted style properties with valid values survive', () => {
  assert.equal(sanitizeRich('<span style="color: #d13a63">t</span>'), '<span style="color: #d13a63">t</span>')
  assert.equal(sanitizeRich('<span style="color: red; position: fixed">t</span>'), '<span style="color: red">t</span>')
  assert.equal(sanitizeRich('<span style="background: url(x)">t</span>'), '<span>t</span>')
  assert.equal(sanitizeRich('<span style="font-size: 20px">t</span>'), '<span style="font-size: 20px">t</span>')
})

test('a url() smuggled into an allowed property is rejected', () => {
  assert.equal(sanitizeRich('<span style="background-color: url(javascript:x)">t</span>'), '<span>t</span>')
})

test('unbalanced and stray tags are balanced, never leaked', () => {
  assert.equal(sanitizeRich('<b>bold'), '<b>bold</b>')
  assert.equal(sanitizeRich('bold</b>'), 'bold')
  assert.equal(sanitizeRich('<b><i>x</b></i>'), '<b><i>x</i></b>')
})

test('text with angle brackets is escaped, not interpreted', () => {
  assert.equal(sanitizeRich('a < b and c > d'), 'a &lt; b and c &gt; d')
})

test('lists survive', () => {
  assert.equal(sanitizeRich('<ul><li>one</li><li>two</li></ul>'), '<ul><li>one</li><li>two</li></ul>')
})

test('escapeHtml and plain text round-trip visibly', () => {
  assert.equal(escapeHtml('a & <b>'), 'a &amp; &lt;b&gt;')
  assert.equal(richToPlainText('<b>Aorta</b> &amp; vein'), 'Aorta & vein')
})

test('escaping is idempotent, so a field never gains an &amp; layer', () => {
  // sanitizeRich runs on the way in AND on the way out (RichHtml re-sanitizes),
  // so a blanket & -> &amp; grew one layer per save and per render.
  assert.equal(escapeHtml(escapeHtml('a & b')), escapeHtml('a & b'))
  assert.equal(sanitizeRich(sanitizeRich('a < b && c > d')), sanitizeRich('a < b && c > d'))
  assert.equal(sanitizeRich('a &amp; b'), 'a &amp; b')
  assert.equal(sanitizeRich('<b>x</b> &amp; y'), '<b>x</b> &amp; y')
  // …and what the reader sees is still the characters that were typed.
  assert.equal(richToPlainText(sanitizeRich(sanitizeRich('a < b && c > d'))), 'a < b && c > d')
})

test('a preserved entity is still inert text, never markup', () => {
  const escaped = '&lt;script&gt;alert(1)&lt;/script&gt;'
  assert.equal(sanitizeRich(escaped), escaped)
  assert.equal(richToPlainText(sanitizeRich(escaped)), '<script>alert(1)</script>')
  // A real tag is still dropped, content and all.
  assert.equal(sanitizeRich('<script>alert(1)</script>hi'), 'hi')
  assert.equal(escapeHtml('<img src=x onerror=y>'), '&lt;img src=x onerror=y&gt;')
})

test('legacy plain text is told apart from stored HTML', () => {
  assert.equal(isLegacyPlainText('a < b && c > d'), true)
  assert.equal(isLegacyPlainText('The {{c1::mitral}} valve'), true)
  assert.equal(isLegacyPlainText(''), true)
  assert.equal(isLegacyPlainText('Q & A, 5 < 6'), true)
  assert.equal(isLegacyPlainText('<b>bold</b>'), false)
  assert.equal(isLegacyPlainText('a &amp; b'), false)
  assert.equal(isLegacyPlainText('<br>'), false)
})

test('emptiness ignores markup but respects real content', () => {
  assert.equal(isRichEmpty(''), true)
  assert.equal(isRichEmpty('<b></b>'), true)
  assert.equal(isRichEmpty('<b>x</b>'), false)
  assert.equal(isRichEmpty('<br>'), false)
})

test('sanitizeRich keeps <img> with a nishany-doc media reference src', () => {
  const html = sanitizeRich('<img src="synapse-doc:med-1" alt="x" width="200">')
  assert.match(html, /<img[^>]+src="synapse-doc:med-1"/)
  assert.match(html, /alt="x"/)
})

test('sanitizeRich strips <img> with a remote or data src', () => {
  assert.doesNotMatch(sanitizeRich('<img src="https://evil/x.png">'), /<img/)
  assert.doesNotMatch(sanitizeRich('<img src="data:image/png;base64,AAAA">'), /<img/)
})

test('sanitizeRich keeps <img> with a synapse-media: stored reference src', () => {
  const html = sanitizeRich('<img src="synapse-media:abc123" alt="scan" width="150" height="100">')
  assert.match(html, /<img[^>]+src="synapse-media:abc123"/)
  assert.match(html, /alt="scan"/)
  assert.match(html, /width="150"/)
  assert.match(html, /height="100"/)
})

test('sanitizeRich keeps <img> with a managed /media/ reference src', () => {
  assert.match(sanitizeRich('<img src="/media/xyz.png">'), /<img src="\/media\/xyz\.png">/)
  // Path traversal / query / fragment smuggling past the managed-media matcher is rejected.
  assert.doesNotMatch(sanitizeRich('<img src="/media/../secret">'), /<img/)
  assert.doesNotMatch(sanitizeRich('<img src="/media/x?evil=1">'), /<img/)
})

test('sanitizeRich strips an empty or javascript: <img> src', () => {
  assert.doesNotMatch(sanitizeRich('<img src="">'), /<img/)
  assert.doesNotMatch(sanitizeRich('<img>'), /<img/)
  assert.doesNotMatch(sanitizeRich('<img src="javascript:alert(1)">'), /<img/)
})

test('sanitizeRich drops any other attribute on an otherwise-valid <img>', () => {
  const html = sanitizeRich('<img src="synapse-media:abc" onerror="alert(1)" class="x" data-z="1" style="position:fixed">')
  assert.equal(html, '<img src="synapse-media:abc">')
})

test('isLegacyPlainText: a bare < before a letter is still plain text', () => {
  assert.equal(isLegacyPlainText('a <b c and more'), true)
  assert.equal(isLegacyPlainText('K<Na, so >140'), true)
  assert.equal(isLegacyPlainText('x <b>y</b>'), false)
  assert.equal(isLegacyPlainText('salt &amp; water'), false)
})
