import { test } from 'node:test'
import assert from 'node:assert/strict'
import { escapeHtml, isRichEmpty, richToPlainText, sanitizeRich } from './richText.ts'

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

test('emptiness ignores markup but respects real content', () => {
  assert.equal(isRichEmpty(''), true)
  assert.equal(isRichEmpty('<b></b>'), true)
  assert.equal(isRichEmpty('<b>x</b>'), false)
  assert.equal(isRichEmpty('<br>'), false)
})
