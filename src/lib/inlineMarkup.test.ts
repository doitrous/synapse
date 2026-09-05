import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { isPlainInline, tokenizeInline } from './inlineMarkup.ts'

test('plain prose is one text token', () => {
  assert.deepEqual(tokenizeInline('The coronary sinus is a vein.'), [
    { kind: 'text', text: 'The coronary sinus is a vein.' },
  ])
})

test('bold, italic and code are recognised', () => {
  assert.deepEqual(tokenizeInline('a **bold** and *thin* and `code` end'), [
    { kind: 'text', text: 'a ' },
    { kind: 'strong', text: 'bold' },
    { kind: 'text', text: ' and ' },
    { kind: 'em', text: 'thin' },
    { kind: 'text', text: ' and ' },
    { kind: 'code', text: 'code' },
    { kind: 'text', text: ' end' },
  ])
})

test('bold is not mistaken for two italics', () => {
  assert.deepEqual(tokenizeInline('**strong**'), [{ kind: 'strong', text: 'strong' }])
})

test('double underscores are an underline; a lone underscore is not', () => {
  assert.deepEqual(tokenizeInline('mark __this__ term'), [
    { kind: 'text', text: 'mark ' },
    { kind: 'underline', text: 'this' },
    { kind: 'text', text: ' term' },
  ])
  // An identifier with single underscores must survive untouched.
  assert.deepEqual(tokenizeInline('node SYS_HEM_T01'), [{ kind: 'text', text: 'node SYS_HEM_T01' }])
})

test('emphasis inside a code span stays literal', () => {
  assert.deepEqual(tokenizeInline('`a **b** c`'), [{ kind: 'code', text: 'a **b** c' }])
})

test('a safe link becomes a link token', () => {
  assert.deepEqual(tokenizeInline('see [the guide](https://example.org/x)'), [
    { kind: 'text', text: 'see ' },
    { kind: 'link', text: 'the guide', href: 'https://example.org/x' },
  ])
})

test('an in-app path is a valid link', () => {
  assert.deepEqual(tokenizeInline('[library](/app/library)'), [
    { kind: 'link', text: 'library', href: '/app/library' },
  ])
})

test('a javascript: href is not a link', () => {
  const tokens = tokenizeInline('[x](javascript:alert(1))')
  assert.equal(tokens.every((token) => token.kind !== 'link'), true)
})

test('a data: href is not a link', () => {
  const tokens = tokenizeInline('[x](data:text/html;base64,PHNjcmlwdD4=)')
  assert.equal(tokens.every((token) => token.kind !== 'link'), true)
})

test('a protocol-relative href is not a link', () => {
  const tokens = tokenizeInline('[x](//evil.example)')
  assert.equal(tokens.every((token) => token.kind !== 'link'), true)
})

test('an unmatched marker is left as text', () => {
  assert.deepEqual(tokenizeInline('2 * 3 = 6'), [{ kind: 'text', text: '2 * 3 = 6' }])
})

test('markup is never allowed to span a line break', () => {
  assert.deepEqual(tokenizeInline('*not\nemphasis*'), [{ kind: 'text', text: '*not\nemphasis*' }])
})

test('the earliest marker wins when several are present', () => {
  const tokens = tokenizeInline('**first** then `second`')
  assert.equal(tokens[0].kind, 'strong')
})

test('isPlainInline spots the common fast path', () => {
  assert.equal(isPlainInline('Ordinary clinical prose, with commas.'), true)
  assert.equal(isPlainInline('has **markup**'), false)
})
