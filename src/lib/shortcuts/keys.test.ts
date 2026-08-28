import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  chordId,
  chordsEqual,
  detectMac,
  eventToChord,
  isEditableTarget,
  modPressed,
  normalizeKey,
  parseChord,
} from './keys.ts'

test('Mod is Command on macOS and Control elsewhere', () => {
  assert.equal(modPressed({ key: 'k', metaKey: true }, true), true)
  assert.equal(modPressed({ key: 'k', ctrlKey: true }, true), false, 'Ctrl on a Mac is not Mod')
  assert.equal(modPressed({ key: 'k', ctrlKey: true }, false), true)
  assert.equal(modPressed({ key: 'k', metaKey: true }, false), false, 'Cmd off a Mac is not Mod')
})

test('a spec and the matching event reduce to the same chord', () => {
  const event = eventToChord({ key: 'R', metaKey: true, shiftKey: true }, true)
  assert.equal(chordId(event), 'mod+shift+r')
  assert.ok(chordsEqual(event, parseChord('Mod+Shift+R')))
})

test('the shift needed to type "?" is not required to match the "?" spec', () => {
  const event = eventToChord({ key: '?', code: 'Slash', shiftKey: true }, false)
  assert.equal(event.shift, false, 'the shift is baked into the "?" character')
  assert.ok(chordsEqual(event, parseChord('?')))
})

test('shift stays significant for letters (Shift+I is not I)', () => {
  const shiftI = eventToChord({ key: 'I', shiftKey: true }, false)
  const plainI = eventToChord({ key: 'i' }, false)
  assert.equal(shiftI.shift, true)
  assert.ok(!chordsEqual(shiftI, plainI))
})

test('digits survive a shift and space/escape normalize', () => {
  assert.equal(normalizeKey({ key: '!', code: 'Digit1' }), '1')
  assert.equal(normalizeKey({ key: ' ', code: 'Space' }), 'space')
  assert.equal(normalizeKey({ key: 'Escape' }), 'escape')
  assert.equal(normalizeKey({ key: '?' }), '?')
})

test('Cmd/Ctrl/Control/Meta all parse to Mod; Opt/Option to Alt', () => {
  for (const spec of ['Cmd+1', 'Ctrl+1', 'Control+1', 'Meta+1']) {
    assert.equal(chordId(parseChord(spec)), 'mod+1')
  }
  assert.equal(chordId(parseChord('Mod+Option+1')), 'mod+alt+1')
})

test('editable targets are recognised across inputs, contenteditable and ARIA', () => {
  assert.equal(isEditableTarget({ tagName: 'INPUT' }), true)
  assert.equal(isEditableTarget({ tagName: 'TEXTAREA' }), true)
  assert.equal(isEditableTarget({ tagName: 'SELECT' }), true)
  assert.equal(isEditableTarget({ tagName: 'DIV', isContentEditable: true }), true)
  assert.equal(isEditableTarget({ tagName: 'DIV', getAttribute: () => 'textbox' }), true)
  assert.equal(isEditableTarget({ tagName: 'BUTTON', getAttribute: () => null }), false)
  assert.equal(isEditableTarget(null), false)
})

test('detectMac reads a platform string', () => {
  assert.equal(detectMac('MacIntel'), true)
  assert.equal(detectMac('iPhone'), true)
  assert.equal(detectMac('Win32'), false)
  assert.equal(detectMac(undefined), false)
})
