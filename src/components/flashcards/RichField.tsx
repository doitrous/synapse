import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Bold,
  Italic,
  Underline,
  Superscript,
  Subscript,
  Baseline,
  Highlighter,
  List,
  ListOrdered,
  RemoveFormatting,
  Palette,
  SquareDashedBottomCode,
} from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Tooltip } from '@/components/ui/Tooltip'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { Kbd } from '@/components/ui/Kbd'
import { useT } from '@/lib/i18n'
import { resolveMediaSource } from '@/lib/mediaStorage'
import { sanitizeRich, isRichEmpty, isLegacyPlainText, escapeHtml } from '@/data/flashcards/richText'
import { nextClozeNumber } from '@/data/flashcards/cloze'
import { useCommands, useScope } from '@/lib/shortcuts/useShortcuts'
import type { Command } from '@/lib/shortcuts/registry'

export interface RichFieldHandle {
  focus: () => void
}

/** A named formatting preset applied to the current selection. */
interface Preset {
  id: string
  label: string
  /** Inline style string; every property survives `sanitizeRich`'s allowlist. */
  style: string
}

const PRESETS: Preset[] = [
  { id: 'important', label: 'Important', style: 'font-weight: bold; color: #dc2626' },
  { id: 'alert', label: 'Alert', style: 'font-weight: bold; color: #dc2626; background-color: #fef08a' },
  { id: 'underlined', label: 'Underlined attention', style: 'color: #dc2626; text-decoration: underline' },
  { id: 'marked', label: 'Marked attention', style: 'font-weight: bold; color: #c026d3' },
  { id: 'heading', label: 'Heading large', style: 'font-weight: bold; font-size: 1.4em' },
  { id: 'large-emphasis', label: 'Large emphasis', style: 'font-weight: bold; color: #dc2626; font-size: 1.25em' },
  { id: 'small', label: 'Small text', style: 'font-size: 0.85em' },
]

const TEXT_COLORS = ['#dc2626', '#ea580c', '#d97706', '#16a34a', '#0d9488', '#2563eb', '#7c3aed', '#c026d3', '#334155']
const HIGHLIGHTS = ['#fef08a', '#bbf7d0', '#bfdbfe', '#fbcfe8', '#fed7aa']

/** Quick insert helpers — characters common in medical/science authoring. */
const INSERTS = ['→', '←', '↑', '↓', '↔', '°C']

/** `<img>` tags `sanitizeRich` kept — their `src` is a reference, not a URL yet. */
const MEDIA_IMG_SELECTOR = 'img[src^="nishany-"], img[src^="synapse-"], img[src^="/media/"]'

/**
 * Swap every media-reference `<img src>` under `container` for a resolved
 * object URL, the same resolve-then-revoke pattern as `OcclusionCardFace` and
 * `RichHtml`. The original reference is kept on `data-media-ref` so
 * `emitFromDom` can read it back before sanitizing — the editable surface must
 * never let a transient `blob:` URL reach storage, since `sanitizeRich` only
 * recognizes references and would drop the image on the next save.
 */
function resolveMediaImages(container: HTMLElement): () => void {
  let alive = true
  const revokeUrls: string[] = []
  container.querySelectorAll<HTMLImageElement>(MEDIA_IMG_SELECTOR).forEach((img) => {
    const reference = img.getAttribute('src')
    if (!reference) return
    img.dataset.mediaRef = reference
    resolveMediaSource(reference)
      .then(({ url, revoke }) => {
        if (!alive) { if (revoke) URL.revokeObjectURL(url); return }
        if (revoke) revokeUrls.push(url)
        img.setAttribute('src', url)
      })
      .catch(() => { /* leave the reference src; the browser shows a broken image */ })
  })
  return () => { alive = false; revokeUrls.forEach((url) => URL.revokeObjectURL(url)) }
}

/**
 * What actually goes into `innerHTML` when the field is seeded.
 *
 * A stored value is normally sanitized HTML and is seeded verbatim. A *legacy*
 * value — a cloze note from before this field was rich, or a plain-text import
 * — is raw text, and handing raw text to `innerHTML` loses characters: `a <b c`
 * is eaten as a tag, and `a < b && c > d` loses ` b && c ` the same way. So a
 * legacy value is escaped first, which is exactly the HTML that renders those
 * characters back.
 *
 * Deliberately no `\n` → `<br>`: the old cloze textarea kept newlines, but the
 * card never showed them — `StudyCardFace` renders cells inside a normal
 * (non-`pre`) container, where a newline has always collapsed to a space. Every
 * `\n` survives as a character in the text node and in the stored HTML; turning
 * one into a `<br>` would *add* a line break the card never had.
 */
function seedHtml(value: string): string {
  return isLegacyPlainText(value) ? escapeHtml(value) : value
}

/**
 * A rich-text field whose stored value is always sanitized HTML.
 *
 * It is a `contentEditable` surface with a formatting toolbar; every edit reads
 * `innerHTML`, runs it through `sanitizeRich`, and reports the clean string, so
 * nothing outside the allowlist can ever reach storage. `cloze` mode is the same
 * surface with the same toolbar plus a cloze button (⌘⇧C): the `{{cN::…}}`
 * markers go in as *text nodes* around the selection, which is why they survive
 * `sanitizeRich` untouched and why a deletion can hold formatting. Editor
 * shortcuts register in the `'editor'` scope with `allowInEditable`, guarded so
 * only the focused field acts, so Bold-while-typing works and never collides
 * with study or global keys.
 */
export const RichField = forwardRef<RichFieldHandle, {
  value: string
  onChange: (value: string) => void
  ariaLabel: string
  placeholder?: string
  mode?: 'rich' | 'cloze'
  id?: string
  minHeight?: string
  commandPrefix?: string
}>(function RichField(
  { value, onChange, ariaLabel, placeholder, mode = 'rich', id, minHeight = '5.5rem', commandPrefix = 'editor' },
  ref,
) {
  const editorRef = useRef<HTMLDivElement>(null)
  const focusedRef = useRef(false)
  const emittedRef = useRef(value)
  const valueRef = useRef(value)
  const onChangeRef = useRef(onChange)
  valueRef.current = value
  onChangeRef.current = onChange
  const [focused, setFocused] = useState(false)

  useImperativeHandle(ref, () => ({
    focus() {
      editorRef.current?.focus()
    },
  }), [])

  // ---- contentEditable plumbing --------------------------------------------

  function emitFromDom() {
    const el = editorRef.current
    if (!el) return
    // Read back each resolved image's original reference before serializing —
    // the DOM currently shows a resolved `blob:`/object URL for display, but
    // sanitizeRich only recognizes media references and would silently drop
    // the image if it saw the transient URL instead.
    const resolved = Array.from(el.querySelectorAll<HTMLImageElement>('img[data-media-ref]'))
    const displayedSrcs = resolved.map((img) => img.getAttribute('src'))
    resolved.forEach((img) => { if (img.dataset.mediaRef) img.setAttribute('src', img.dataset.mediaRef) })
    const clean = sanitizeRich(el.innerHTML)
    resolved.forEach((img, i) => { const src = displayedSrcs[i]; if (src !== null) img.setAttribute('src', src) })
    emittedRef.current = clean
    onChangeRef.current(clean)
  }

  // Seed the editor once, and re-seed only on an *external* value change (a form
  // reset), never on our own echo — so the caret is never yanked mid-type.
  useEffect(() => {
    const el = editorRef.current
    if (!el) return
    if (value === emittedRef.current) return
    el.innerHTML = seedHtml(value)
    emittedRef.current = value
    return resolveMediaImages(el)
  }, [value])

  useEffect(() => {
    const el = editorRef.current
    if (el && value) {
      el.innerHTML = seedHtml(value)
      emittedRef.current = value
      return resolveMediaImages(el)
    }
    // mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function exec(command: string, arg?: string) {
    editorRef.current?.focus()
    try {
      document.execCommand(command, false, arg)
    } catch {
      /* execCommand is best-effort; the sanitizer is the real guarantee. */
    }
    emitFromDom()
  }

  /** Wrap the current selection in a `<span>` carrying an allowlisted style. */
  function applyStyle(style: string) {
    const el = editorRef.current
    if (!el) return
    el.focus()
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return
    const range = selection.getRangeAt(0)
    if (range.collapsed) return
    const span = document.createElement('span')
    span.setAttribute('style', style)
    try {
      span.appendChild(range.extractContents())
      range.insertNode(span)
      selection.removeAllRanges()
      const next = document.createRange()
      next.selectNodeContents(span)
      selection.addRange(next)
    } catch {
      /* selection spanned unwrappable boundaries; leave the text untouched. */
    }
    emitFromDom()
  }

  function insertChar(char: string) {
    exec('insertText', char)
  }

  // ---- cloze plumbing ------------------------------------------------------

  /**
   * Wrap the DOM selection in `{{cN::…}}`, or drop an empty deletion at the
   * caret. The two markers go in as **text nodes**, never as markup: that is
   * what lets a deletion keep the formatting inside it (`extractContents`
   * carries the selected nodes across intact) and what lets `sanitizeRich`
   * leave the markers alone on the way to storage.
   */
  function doInsertCloze() {
    const el = editorRef.current
    if (!el) return
    el.focus()
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return
    const range = selection.getRangeAt(0)
    if (!el.contains(range.commonAncestorContainer)) return

    const number = nextClozeNumber(sanitizeRich(el.innerHTML))
    const open = document.createTextNode(`{{c${number}::`)
    const close = document.createTextNode('}}')
    // Read before inserting: `insertNode` grows the range around what it added.
    const wasCollapsed = range.collapsed
    try {
      if (wasCollapsed) {
        // insertNode always inserts at the range start, so the second call
        // lands the opening marker *before* the closing one.
        range.insertNode(close)
        range.insertNode(open)
      } else {
        const selected = range.extractContents()
        const fragment = document.createDocumentFragment()
        fragment.append(open, selected, close)
        range.insertNode(fragment)
      }
      // Caret inside an empty deletion (type straight into it), or after a
      // wrapped one so the student carries on where they left off.
      const caretNode = wasCollapsed ? open : close
      const after = document.createRange()
      after.setStart(caretNode, caretNode.length)
      after.collapse(true)
      selection.removeAllRanges()
      selection.addRange(after)
    } catch {
      /* selection spanned unwrappable boundaries; leave the text untouched. */
    }
    emitFromDom()
  }

  // ---- shortcuts -----------------------------------------------------------

  useScope('editor')
  const commands = useMemo<Command[]>(() => {
    const when = () => focusedRef.current
    const list: Command[] = []
    list.push(
      { id: `${commandPrefix}.bold`, title: 'Bold', group: 'Editor', scopes: ['editor'], keys: 'Mod+B', allowInEditable: true, when, run: () => exec('bold') },
      { id: `${commandPrefix}.italic`, title: 'Italic', group: 'Editor', scopes: ['editor'], keys: 'Mod+I', allowInEditable: true, when, run: () => exec('italic') },
      { id: `${commandPrefix}.underline`, title: 'Underline', group: 'Editor', scopes: ['editor'], keys: 'Mod+U', allowInEditable: true, when, run: () => exec('underline') },
    )
    PRESETS.forEach((preset, index) => {
      list.push({
        id: `${commandPrefix}.preset.${preset.id}`,
        title: `Style: ${preset.label}`,
        group: 'Editor',
        scopes: ['editor'],
        keys: `Mod+Option+${index + 1}`,
        allowInEditable: true,
        when,
        run: () => applyStyle(preset.style),
      })
    })
    if (mode === 'cloze') {
      list.push({
        id: `${commandPrefix}.cloze`,
        title: 'Wrap selection as cloze',
        group: 'Editor',
        scopes: ['editor'],
        keys: 'Mod+Shift+C',
        allowInEditable: true,
        when,
        run: doInsertCloze,
      })
    }
    return list
    // Handlers read refs, so a stable array is correct and avoids re-registration.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, commandPrefix])
  useCommands(commands)

  const showPlaceholder = isRichEmpty(value) && !focused

  // ---- render --------------------------------------------------------------

  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-[color-mix(in_srgb,var(--color-primary)_18%,transparent)]">
      <Toolbar
        mode={mode}
        onExec={exec}
        onApplyStyle={applyStyle}
        onColor={(c) => applyStyle(`color: ${c}`)}
        onHighlight={(c) => applyStyle(`background-color: ${c}`)}
        onInsert={insertChar}
        onCloze={doInsertCloze}
      />
      <div className="relative">
        <div
          ref={editorRef}
          id={id}
          role="textbox"
          aria-multiline="true"
          aria-label={ariaLabel}
          contentEditable
          suppressContentEditableWarning
          spellCheck
          dir="auto"
          className="fc-rich w-full px-3 py-2.5 text-[14px] leading-relaxed text-ink focus:outline-none"
          style={{ minHeight }}
          onInput={emitFromDom}
          onBlur={() => {
            focusedRef.current = false
            setFocused(false)
            emitFromDom()
          }}
          onFocus={() => {
            focusedRef.current = true
            setFocused(true)
          }}
        />
        {showPlaceholder && placeholder && (
          <p className="pointer-events-none absolute inset-x-0 top-0 px-3 py-2.5 text-[14px] leading-relaxed text-ink-3">
            {placeholder}
          </p>
        )}
      </div>
    </div>
  )
})

// ---- toolbar ---------------------------------------------------------------

function Toolbar({
  mode,
  onExec,
  onApplyStyle,
  onColor,
  onHighlight,
  onInsert,
  onCloze,
}: {
  mode: 'rich' | 'cloze'
  onExec: (command: string, arg?: string) => void
  onApplyStyle: (style: string) => void
  onColor: (color: string) => void
  onHighlight: (color: string) => void
  onInsert: (char: string) => void
  onCloze: () => void
}) {
  const t = useT()
  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-line bg-surface-2 px-1.5 py-1">
      {/* Cloze text is a rich field like any other, so it carries the same
          toolbar — with the cloze button first, because that is the one control
          the field exists for. */}
      {mode === 'cloze' && (
        <>
          <ToolBtn icon={SquareDashedBottomCode} label={t('Make cloze deletion')} keyHint="Mod+Shift+C" onClick={onCloze} />
          <Divider />
        </>
      )}
      <ToolBtn icon={Bold} label={t('Bold')} keyHint="Mod+B" onClick={() => onExec('bold')} />
      <ToolBtn icon={Italic} label={t('Italic')} keyHint="Mod+I" onClick={() => onExec('italic')} />
      <ToolBtn icon={Underline} label={t('Underline')} keyHint="Mod+U" onClick={() => onExec('underline')} />
      <ToolBtn icon={Superscript} label={t('Superscript')} onClick={() => onExec('superscript')} />
      <ToolBtn icon={Subscript} label={t('Subscript')} onClick={() => onExec('subscript')} />
      <Divider />
      <ColorMenu label={t('Text colour')} icon={Baseline} colors={TEXT_COLORS} onPick={onColor} />
      <ColorMenu label={t('Highlight')} icon={Highlighter} colors={HIGHLIGHTS} onPick={onHighlight} />
      <PresetMenu onApply={onApplyStyle} />
      <Divider />
      <ToolBtn icon={List} label={t('Bulleted list')} onClick={() => onExec('insertUnorderedList')} />
      <ToolBtn icon={ListOrdered} label={t('Numbered list')} onClick={() => onExec('insertOrderedList')} />
      <ToolBtn icon={RemoveFormatting} label={t('Clear formatting')} onClick={() => onExec('removeFormat')} />
      <Divider />
      {INSERTS.map((char) => (
        <button
          key={char}
          type="button"
          aria-label={`${t('Insert')} ${char}`}
          // Mouse-down keeps the editor selection alive through the click.
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onInsert(char)}
          className="grid h-8 min-w-8 place-items-center rounded px-1.5 font-mono text-[13px] text-ink-2 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
        >
          {char}
        </button>
      ))}
    </div>
  )
}

function ToolBtn({
  icon,
  label,
  keyHint,
  onClick,
}: {
  icon: Parameters<typeof Icon>[0]['icon']
  label: string
  keyHint?: string
  onClick: () => void
}) {
  return (
    <Tooltip
      content={
        <span className="inline-flex items-center gap-1.5">
          {label}
          {keyHint && <Kbd className="border-paper/25 bg-transparent text-paper">{keyHint.replace('Mod', '⌘').replace('Option', '⌥').replace('Shift', '⇧').replace(/\+/g, '')}</Kbd>}
        </span>
      }
    >
      <button
        type="button"
        aria-label={label}
        onMouseDown={(event) => event.preventDefault()}
        onClick={onClick}
        className="grid size-8 place-items-center rounded text-ink-2 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
      >
        <Icon icon={icon} size={16} />
      </button>
    </Tooltip>
  )
}

function Divider() {
  return <span className="mx-0.5 h-5 w-px bg-line" aria-hidden />
}

function ColorMenu({
  label,
  icon,
  colors,
  onPick,
}: {
  label: string
  icon: Parameters<typeof Icon>[0]['icon']
  colors: string[]
  onPick: (color: string) => void
}) {
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  return (
    <>
      <Tooltip content={label}>
        <button
          ref={setAnchor}
          type="button"
          aria-label={label}
          aria-haspopup="menu"
          aria-expanded={open}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setOpen((v) => !v)}
          className="grid size-8 place-items-center rounded text-ink-2 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
        >
          <Icon icon={icon} size={16} />
        </button>
      </Tooltip>
      {open && (
        <Popover anchor={anchor} onClose={close} role="menu" label={label} className="p-2">
          <div className="grid grid-cols-5 gap-1.5">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={color}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onPick(color)
                  close()
                }}
                className="size-6 rounded-full border border-line-2 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </Popover>
      )}
    </>
  )
}

function PresetMenu({ onApply }: { onApply: (style: string) => void }) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  return (
    <>
      <Tooltip content={t('Named styles')}>
        <button
          ref={setAnchor}
          type="button"
          aria-label={t('Named styles')}
          aria-haspopup="menu"
          aria-expanded={open}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setOpen((v) => !v)}
          className="grid size-8 place-items-center rounded text-ink-2 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
        >
          <Icon icon={Palette} size={16} />
        </button>
      </Tooltip>
      {open && (
        <Popover anchor={anchor} onClose={close} role="menu" label={t('Named styles')} className="min-w-56 py-1">
          <ul>
            {PRESETS.map((preset, index) => (
              <li key={preset.id}>
                <button
                  type="button"
                  role="menuitem"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    onApply(preset.style)
                    close()
                  }}
                  className="flex w-full items-center justify-between gap-4 px-3 py-2 text-start text-[13px] text-ink-2 transition-colors hover:bg-inset hover:text-ink"
                >
                  <span style={inlineStyleToObject(preset.style)}>{t(preset.label)}</span>
                  <Kbd>{`⌘⌥${index + 1}`}</Kbd>
                </button>
              </li>
            ))}
          </ul>
        </Popover>
      )}
    </>
  )
}

/** Preview a preset in its own style inside the menu, as a React style object. */
function inlineStyleToObject(style: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const decl of style.split(';')) {
    const idx = decl.indexOf(':')
    if (idx === -1) continue
    const prop = decl.slice(0, idx).trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    out[prop] = decl.slice(idx + 1).trim()
  }
  return out
}
