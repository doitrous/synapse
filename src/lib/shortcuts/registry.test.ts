import { test } from 'node:test'
import assert from 'node:assert/strict'
import { findCollisions, formatSpec, helpModel, resolve, type Command, type ResolveContext } from './registry.ts'
import type { Chord } from './keys.ts'

let fired: string[] = []
const cmd = (over: Partial<Command> & Pick<Command, 'id' | 'keys' | 'scopes'>): Command => ({
  title: over.id,
  group: 'Test',
  run: () => fired.push(over.id),
  ...over,
})

const ctx = (over: Partial<ResolveContext> = {}): ResolveContext => ({
  isMac: false,
  activeScopes: ['study', 'global'],
  isEditable: false,
  isRepeat: false,
  pending: null,
  ...over,
})

test('a single-key command in an active scope runs', () => {
  fired = []
  const commands = [cmd({ id: 'bury', keys: 'B', scopes: ['study'] })]
  const res = resolve(commands, { key: 'b' }, ctx())
  assert.equal(res.type, 'run')
  if (res.type === 'run') res.command.run()
  assert.deepEqual(fired, ['bury'])
})

test('the same letter means different things by scope: B buries in study, nothing in editor', () => {
  const commands = [cmd({ id: 'bury', keys: 'B', scopes: ['study'] })]
  assert.equal(resolve(commands, { key: 'b' }, ctx({ activeScopes: ['editor', 'global'] })).type, 'none')
})

test('platform modifier routes Cmd on mac and Ctrl on pc to the same command', () => {
  const commands = [cmd({ id: 'save', keys: 'Mod+Enter', scopes: ['editor'] })]
  const macCtx = ctx({ isMac: true, activeScopes: ['editor'] })
  const pcCtx = ctx({ isMac: false, activeScopes: ['editor'] })
  assert.equal(resolve(commands, { key: 'Enter', metaKey: true }, macCtx).type, 'run')
  assert.equal(resolve(commands, { key: 'Enter', ctrlKey: true }, pcCtx).type, 'run')
  assert.equal(resolve(commands, { key: 'Enter', ctrlKey: true }, macCtx).type, 'none', 'Ctrl on mac is not the mod')
})

test('shortcuts do not fire while typing, except commands that opt in', () => {
  const commands = [
    cmd({ id: 'bury', keys: 'B', scopes: ['study'] }),
    cmd({ id: 'bold', keys: 'Mod+B', scopes: ['editor'], allowInEditable: true }),
  ]
  assert.equal(resolve(commands, { key: 'b' }, ctx({ isEditable: true })).type, 'none')
  const editing = ctx({ isEditable: true, activeScopes: ['editor'] })
  assert.equal(resolve(commands, { key: 'b', ctrlKey: true }, editing).type, 'run')
})

test('a disabled command never fires', () => {
  const commands = [cmd({ id: 'suspend', keys: 'S', scopes: ['study'], when: () => false })]
  assert.equal(resolve(commands, { key: 's' }, ctx()).type, 'none')
})

test('auto-repeat is suppressed unless the command opts in', () => {
  const commands = [
    cmd({ id: 'good', keys: '3', scopes: ['study'] }),
    cmd({ id: 'nudge', keys: 'arrowup', scopes: ['occlusion'], repeatable: true }),
  ]
  assert.equal(resolve(commands, { key: '3' }, ctx({ isRepeat: true })).type, 'none')
  assert.equal(resolve(commands, { key: 'ArrowUp' }, ctx({ isRepeat: true, activeScopes: ['occlusion'] })).type, 'run')
})

test('modal precedence: an exclusive dialog scope suppresses the study screen beneath it', () => {
  const commands = [
    cmd({ id: 'grade-good', keys: '3', scopes: ['study'] }),
    cmd({ id: 'dialog-confirm', keys: 'Enter', scopes: ['dialog'] }),
  ]
  // Caller passes only the dialog scope when a modal is open.
  const modal = ctx({ activeScopes: ['dialog'] })
  assert.equal(resolve(commands, { key: '3' }, modal).type, 'none')
  assert.equal(resolve(commands, { key: 'Enter' }, modal).type, 'run')
})

test('a two-key sequence: G then D navigates, and G then an unrelated key aborts', () => {
  fired = []
  const commands = [cmd({ id: 'nav-decks', keys: { seq: ['G', 'D'] }, scopes: ['global'] })]
  const first = resolve(commands, { key: 'g' }, ctx())
  assert.equal(first.type, 'pending')
  const prefix = (first as { type: 'pending'; prefix: Chord }).prefix

  const done = resolve(commands, { key: 'd' }, ctx({ pending: prefix }))
  assert.equal(done.type, 'run')
  if (done.type === 'run') done.command.run()
  assert.deepEqual(fired, ['nav-decks'])

  const aborted = resolve(commands, { key: 'x' }, ctx({ pending: prefix }))
  assert.equal(aborted.type, 'clear')
})

test('a single-key command wins over a sequence that starts with the same key', () => {
  const commands = [
    cmd({ id: 'lone-g', keys: 'G', scopes: ['study'] }),
    cmd({ id: 'seq-gd', keys: { seq: ['G', 'D'] }, scopes: ['study'] }),
  ]
  assert.equal(resolve(commands, { key: 'g' }, ctx()).type, 'run')
})

test('collisions within a scope are reported', () => {
  const commands = [
    cmd({ id: 'a', keys: 'B', scopes: ['study'] }),
    cmd({ id: 'b', keys: 'B', scopes: ['study'] }),
    cmd({ id: 'c', keys: 'B', scopes: ['editor'] }), // different scope: not a collision
  ]
  const collisions = findCollisions(commands)
  assert.equal(collisions.length, 1)
  assert.deepEqual(collisions[0].ids.sort(), ['a', 'b'])
})

test('help formatting reads for the platform', () => {
  assert.equal(formatSpec('Mod+Shift+R', true), '⌘⇧R')
  assert.equal(formatSpec('Mod+Shift+R', false), 'Ctrl+Shift+R')
  assert.equal(formatSpec({ seq: ['G', 'D'] }, false), 'G then D')
})

test('help model groups commands and hides the hidden ones', () => {
  const commands = [
    cmd({ id: 'good', keys: '3', scopes: ['study'], group: 'Study', title: 'Good' }),
    cmd({ id: 'esc', keys: 'Escape', scopes: ['study'], hidden: true }),
  ]
  const groups = helpModel(commands, false)
  const study = groups.find((g) => g.group === 'Study')
  assert.ok(study)
  assert.equal(study!.items.length, 1)
  assert.equal(study!.items[0].title, 'Good')
})
