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
  Sparkles,
  SquareDashedBottomCode,
} from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Tooltip } from '@/components/ui/Tooltip'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { Kbd } from '@/components/ui/Kbd'
import { useT } from '@/lib/i18n'
import { sanitizeRich, isRichEmpty } from '@/data/flashcards/richText'
import { insertCloze } from '@/data/flashcards/cloze'
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

/**
 * A rich-text field whose stored value is always sanitized HTML.
 *
 * In `rich` mode it is a `contentEditable` surface with a formatting toolbar;
 * every edit reads `innerHTML`, runs it through `sanitizeRich`, and reports the
 * clean string, so nothing outside the allowlist can ever reach storage. In
 * `cloze` mode it is a plain `<textarea>` (the `{{c1::…}}` markup is plain text,
 * not HTML) with a cloze-insert button. Editor shortcuts register in the
 * `'editor'` scope with `allowInEditable`, guarded so only the focused field
 * acts, so Bold-while-typing works and never collides with study or global keys.
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
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const focusedRef = useRef(false)
  const emittedRef = useRef(value)
  const valueRef = useRef(value)
  const onChangeRef = useRef(onChange)
  valueRef.current = value
  onChangeRef.current = onChange
  const [focused, setFocused] = useState(false)

  useImperativeHandle(ref, () => ({
    focus() {
      if (mode === 'cloze') textareaRef.current?.focus()
      else editorRef.current?.focus()
    },
  }), [mode])

  // ---- rich (contentEditable) plumbing -------------------------------------

  function emitFromDom() {
    const el = editorRef.current
    if (!el) return
    const clean = sanitizeRich(el.innerHTML)
    emittedRef.current = clean
    onChangeRef.current(clean)
  }

  // Seed the editor once, and re-seed only on an *external* value change (a form
  // reset), never on our own echo — so the caret is never yanked mid-type.
  useEffect(() => {
    if (mode !== 'rich') return
    const el = editorRef.current
    if (!el) return
    if (value === emittedRef.current) return
    el.innerHTML = value
    emittedRef.current = value
  }, [value, mode])

  useEffect(() => {
    if (mode !== 'rich') return
    const el = editorRef.current
    if (el && value) {
      el.innerHTML = value
      emittedRef.current = value
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
    if (mode === 'cloze') {
      insertIntoTextarea(char)
      return
    }
    exec('insertText', char)
  }

  // ---- cloze (textarea) plumbing -------------------------------------------

  function insertIntoTextarea(text: string) {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart ?? el.value.length
    const end = el.selectionEnd ?? el.value.length
    const next = el.value.slice(0, start) + text + el.value.slice(end)
    onChangeRef.current(next)
    requestAnimationFrame(() => {
      el.focus()
      const caret = start + text.length
      el.setSelectionRange(caret, caret)
    })
  }

  function doInsertCloze() {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart ?? el.value.length
    const end = el.selectionEnd ?? el.value.length
    const result = insertCloze(el.value, start, end)
    onChangeRef.current(result.text)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(result.caret, result.caret)
    })
  }

  // ---- shortcuts -----------------------------------------------------------

  useScope('editor')
  const commands = useMemo<Command[]>(() => {
    const when = () => focusedRef.current
    const list: Command[] = []
    if (mode === 'rich') {
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
    } else {
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

  const showPlaceholder = mode === 'rich' ? isRichEmpty(value) && !focused : value === '' && !focused

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
        {mode === 'rich' ? (
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
        ) : (
          <textarea
            ref={textareaRef}
            id={id}
            aria-label={ariaLabel}
            dir="auto"
            spellCheck
            className="w-full resize-y bg-transparent px-3 py-2.5 font-mono text-[13.5px] leading-relaxed text-ink focus:outline-none"
            style={{ minHeight }}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onFocus={() => {
              focusedRef.current = true
              setFocused(true)
            }}
            onBlur={() => {
              focusedRef.current = false
              setFocused(false)
            }}
          />
        )}
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
      {mode === 'cloze' ? (
        <ToolBtn icon={SquareDashedBottomCode} label={t('Make cloze deletion')} keyHint="Mod+Shift+C" onClick={onCloze} />
      ) : (
        <>
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
        </>
      )}
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
          <Icon icon={Sparkles} size={16} />
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
