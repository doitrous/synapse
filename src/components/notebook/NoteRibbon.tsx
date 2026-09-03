import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Baseline,
  Bold,
  Check,
  ChevronDown,
  Eraser,
  Highlighter,
  Image as ImageIcon,
  IndentDecrease,
  IndentIncrease,
  Italic,
  Layers,
  Link2,
  List,
  Minus,
  PenTool,
  Redo2,
  RemoveFormatting,
  Shapes,
  Strikethrough,
  Subscript,
  Superscript,
  Table2,
  Trash2,
  Underline,
  Undo2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  $createTextNode,
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  mergeRegister,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  type LexicalEditor,
  type TextFormatType,
} from 'lexical'
import { $createLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import {
  $deleteTableColumnAtSelection,
  $deleteTableRowAtSelection,
  $insertTableColumnAtSelection,
  $insertTableRowAtSelection,
  INSERT_TABLE_COMMAND,
} from '@lexical/table'
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { Badge } from '@/components/ui/Badge'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { Tabs, type TabItem } from '@/components/ui/Tabs'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { readyItemsByCategory, searchReadyItems, type ReadyItem, type ReadyItemCategory } from '@/data/readyItems'
import { $createImageNode } from './ImageNode'
import { $createReadyItemNode } from './ReadyItemNode'
import type { DrawTool } from './NoteDrawLayer'

export interface DrawControls {
  enabled: boolean
  setEnabled: (next: boolean | ((current: boolean) => boolean)) => void
  tool: DrawTool
  setTool: (next: DrawTool) => void
  color: string
  setColor: (next: string) => void
  width: number
  setWidth: (next: number) => void
  colors: readonly string[]
  widths: readonly number[]
  placement: 'over' | 'under'
  setPlacement: (next: 'over' | 'under') => void
  hasStrokes: boolean
  clear: () => void
}
import {
  ALIGN_OPTIONS,
  applyHighlightColor,
  applyList,
  applyTextColor,
  applyTextStyle,
  clearFormatting,
  HIGHLIGHT_COLORS,
  LIST_STYLE_OPTIONS,
  TEXT_COLORS,
  TEXT_STYLE_OPTIONS,
  useActiveFormats,
  type BlockStyle,
  type ListStyle,
} from './noteCommands'

type RibbonTabId = 'home' | 'insert' | 'draw' | 'layout'

const RIBBON_TABS: TabItem[] = [
  { value: 'home', label: 'Home' },
  { value: 'insert', label: 'Insert' },
  { value: 'draw', label: 'Draw' },
  { value: 'layout', label: 'Layout' },
]

/**
 * The editor's ribbon — a tab strip over a contextual control row, the same
 * shape as Word's. `Home` and `Layout` are fully wired to Lexical commands;
 * `Insert` and `Draw` are shells for the next two agents (see
 * `docs/HANDOFF-notebook.md`) — the tab structure exists, the controls do not
 * yet.
 */
export function NoteRibbon({ uploadImage, draw }: { uploadImage?: (file: File) => Promise<string>; draw?: DrawControls }) {
  const t = useT()
  const [editor] = useLexicalComposerContext()
  const [tab, setTab] = useState<RibbonTabId>('home')
  const formats = useActiveFormats(editor)

  return (
    <div className="border-b border-line">
      <Tabs items={RIBBON_TABS.map((item) => ({ ...item, label: t(item.label) }))} value={tab} onChange={(next) => setTab(next as RibbonTabId)} className="px-2" />
      <div className="flex flex-wrap items-center gap-1 px-2 py-1.5" aria-label={`${t('Note formatting')} — ${t(tab)}`}>
        {tab === 'home' && <HomeRibbon editor={editor} formats={formats} />}
        {tab === 'layout' && <LayoutRibbon editor={editor} formats={formats} />}
        {tab === 'insert' && <InsertRibbon editor={editor} uploadImage={uploadImage} />}
        {tab === 'draw' && (draw ? <DrawRibbon draw={draw} /> : <DrawRibbonStub />)}
      </div>
    </div>
  )
}

function RibbonDivider() {
  return <span className="mx-1 h-6 w-px shrink-0 bg-line" aria-hidden />
}

function stop(event: React.MouseEvent) {
  event.preventDefault()
}

function HomeRibbon({ editor, formats }: { editor: LexicalEditor; formats: ReturnType<typeof useActiveFormats> }) {
  const t = useT()
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  useEffect(() => mergeRegister(
    editor.registerCommand(CAN_UNDO_COMMAND, (payload) => { setCanUndo(payload); return false }, COMMAND_PRIORITY_LOW),
    editor.registerCommand(CAN_REDO_COMMAND, (payload) => { setCanRedo(payload); return false }, COMMAND_PRIORITY_LOW),
  ), [editor])

  const format = (type: TextFormatType) => editor.dispatchCommand(FORMAT_TEXT_COMMAND, type)

  return (
    <>
      <IconButton
        icon={Undo2}
        label={t('Undo')}
        size="sm"
        disabled={!canUndo}
        className="disabled:pointer-events-none disabled:opacity-40"
        onMouseDown={stop}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      />
      <IconButton
        icon={Redo2}
        label={t('Redo')}
        size="sm"
        disabled={!canRedo}
        className="disabled:pointer-events-none disabled:opacity-40"
        onMouseDown={stop}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      />
      <RibbonDivider />

      <TextStyleMenu editor={editor} blockType={formats.blockType} />
      <RibbonDivider />

      <IconButton icon={Bold} label={t('Bold')} size="sm" active={formats.bold} onMouseDown={stop} onClick={() => format('bold')} />
      <IconButton icon={Italic} label={t('Italic')} size="sm" active={formats.italic} onMouseDown={stop} onClick={() => format('italic')} />
      <IconButton icon={Underline} label={t('Underline')} size="sm" active={formats.underline} onMouseDown={stop} onClick={() => format('underline')} />
      <IconButton icon={Strikethrough} label={t('Strike through')} size="sm" active={formats.strikethrough} onMouseDown={stop} onClick={() => format('strikethrough')} />
      <RibbonDivider />

      <ColorMenu
        icon={Baseline}
        label={t('Text colour')}
        colors={TEXT_COLORS}
        current={formats.color}
        onPick={(color) => applyTextColor(editor, color)}
        clearLabel={t('Automatic')}
      />
      <ColorMenu
        icon={Highlighter}
        label={t('Highlight')}
        colors={HIGHLIGHT_COLORS}
        current={formats.highlight}
        onPick={(color) => applyHighlightColor(editor, color)}
        clearLabel={t('No highlight')}
      />
      <RibbonDivider />

      <ListMenu editor={editor} listType={formats.listType} />
      <IconButton icon={Subscript} label={t('Subscript')} size="sm" active={formats.subscript} onMouseDown={stop} onClick={() => format('subscript')} />
      <IconButton icon={Superscript} label={t('Superscript')} size="sm" active={formats.superscript} onMouseDown={stop} onClick={() => format('superscript')} />
      <RibbonDivider />

      <IconButton icon={RemoveFormatting} label={t('Clear formatting')} size="sm" onMouseDown={stop} onClick={() => clearFormatting(editor)} />
    </>
  )
}

function LayoutRibbon({ editor, formats }: { editor: LexicalEditor; formats: ReturnType<typeof useActiveFormats> }) {
  const t = useT()
  return (
    <>
      {ALIGN_OPTIONS.map((option) => (
        <IconButton
          key={option.value}
          icon={option.icon}
          label={t(option.label)}
          size="sm"
          active={formats.alignment === option.value}
          onMouseDown={stop}
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, option.value)}
        />
      ))}
      <RibbonDivider />

      <IconButton icon={IndentDecrease} label={t('Decrease indent')} size="sm" onMouseDown={stop} onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)} />
      <IconButton icon={IndentIncrease} label={t('Increase indent')} size="sm" onMouseDown={stop} onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)} />
      <RibbonDivider />

      <IconButton icon={Minus} label={t('Horizontal line')} size="sm" onMouseDown={stop} onClick={() => editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)} />
    </>
  )
}

/**
 * The Insert tab. Inline images (a managed student upload placed in the text
 * flow) and the ready-items inserter are wired; hyperlinks and tables are the
 * remaining work (see `docs/HANDOFF-notebook.md`).
 */
function InsertRibbon({ editor, uploadImage }: { editor: LexicalEditor; uploadImage?: (file: File) => Promise<string> }) {
  const t = useT()
  const fileInput = useRef<HTMLInputElement>(null)

  async function onPickImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    const alt = file.name.replace(/\.[^.]+$/, '')
    try {
      if (uploadImage) {
        const documentId = await uploadImage(file)
        editor.update(() => { $insertNodes([$createImageNode({ documentId, alt })]) })
        return
      }
    } catch {
      // Fall back to an inline data URL below if the managed upload is unavailable.
    }
    const reader = new FileReader()
    reader.onload = () => {
      const src = typeof reader.result === 'string' ? reader.result : undefined
      if (!src) return
      editor.update(() => { $insertNodes([$createImageNode({ src, alt })]) })
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={onPickImage} />
      <IconButton icon={ImageIcon} label={t('Insert image')} size="sm" onMouseDown={stop} onClick={() => fileInput.current?.click()} />
      <ReadyItemMenu editor={editor} />
      <LinkMenu editor={editor} />
      <TableMenu editor={editor} />
    </>
  )
}

function TableMenu({ editor }: { editor: LexicalEditor }) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()

  const runInTable = (fn: () => void) => editor.update(fn)
  const action = (label: string, run: () => void) => (
    <button
      type="button"
      onMouseDown={stop}
      onClick={() => { close(); run() }}
      className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-start text-[12.5px] text-ink-2 transition-colors hover:bg-inset hover:text-ink"
    >
      {label}
    </button>
  )

  return (
    <>
      <button
        type="button"
        ref={setAnchor}
        onMouseDown={stop}
        onClick={() => setOpen(true)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('Table')}
        title={t('Table')}
        className="flex h-11 shrink-0 items-center gap-1.5 rounded-lg px-2 text-ink-2 transition-colors hover:bg-inset hover:text-ink sm:h-8"
      >
        <Icon icon={Table2} size={16} />
        <Icon icon={ChevronDown} size={12} className="text-ink-3" />
      </button>
      {open && (
        <Popover anchor={anchor} onClose={close} role="menu" label={t('Table')} className="min-w-[13rem] p-1">
          {action(t('Insert table (3 × 3)'), () => editor.dispatchCommand(INSERT_TABLE_COMMAND, { columns: '3', rows: '3', includeHeaders: true }))}
          <div className="my-1 border-t border-line" />
          <p className="px-2.5 pb-1 pt-0.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Edit (inside a table)')}</p>
          {action(t('Insert row below'), () => runInTable(() => { $insertTableRowAtSelection(true) }))}
          {action(t('Insert row above'), () => runInTable(() => { $insertTableRowAtSelection(false) }))}
          {action(t('Insert column right'), () => runInTable(() => { $insertTableColumnAtSelection(true) }))}
          {action(t('Insert column left'), () => runInTable(() => { $insertTableColumnAtSelection(false) }))}
          {action(t('Delete row'), () => runInTable(() => { $deleteTableRowAtSelection() }))}
          {action(t('Delete column'), () => runInTable(() => { $deleteTableColumnAtSelection() }))}
        </Popover>
      )}
    </>
  )
}

function LinkMenu({ editor }: { editor: LexicalEditor }) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')

  function normalise(raw: string): string {
    const trimmed = raw.trim()
    if (!trimmed) return ''
    return /^(https?:\/\/|mailto:|tel:)/i.test(trimmed) ? trimmed : `https://${trimmed}`
  }

  function apply() {
    const href = normalise(url)
    if (!href) return
    // Does the current selection already cover some text to turn into a link?
    let hasText = false
    editor.getEditorState().read(() => {
      const selection = $getSelection()
      hasText = $isRangeSelection(selection) && !selection.isCollapsed()
    })
    if (hasText) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, href)
    } else {
      editor.update(() => {
        const selection = $getSelection()
        if (!$isRangeSelection(selection)) return
        const link = $createLinkNode(href)
        link.append($createTextNode(text.trim() || href))
        $insertNodes([link])
      })
    }
    close()
    setUrl('')
    setText('')
  }

  return (
    <>
      <button
        type="button"
        ref={setAnchor}
        onMouseDown={stop}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t('Insert link')}
        title={t('Insert link')}
        className="grid size-11 shrink-0 place-items-center rounded-lg text-ink-2 transition-colors hover:bg-inset hover:text-ink sm:size-8"
      >
        <Icon icon={Link2} size={16} />
      </button>
      {open && (
        <Popover anchor={anchor} onClose={close} role="dialog" label={t('Insert link')} className="w-64 p-3">
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Link address')}</label>
          <input
            autoFocus
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); apply() } }}
            placeholder="https://…"
            className="mb-2.5 h-9 w-full rounded-lg border border-line-2 bg-surface px-2.5 text-[12.5px] text-ink outline-none focus:border-primary"
          />
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Text to show')} <span className="font-normal normal-case text-ink-3/70">{t('(if none selected)')}</span></label>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); apply() } }}
            placeholder={t('Link text')}
            className="mb-3 h-9 w-full rounded-lg border border-line-2 bg-surface px-2.5 text-[12.5px] text-ink outline-none focus:border-primary"
          />
          <button
            type="button"
            onMouseDown={stop}
            onClick={apply}
            disabled={!url.trim()}
            className="h-9 w-full rounded-lg bg-primary text-[12.5px] font-medium text-on-primary transition-colors hover:bg-primary-strong disabled:pointer-events-none disabled:opacity-40"
          >
            {t('Add link')}
          </button>
        </Popover>
      )}
    </>
  )
}

const READY_ITEM_CATEGORY_LABEL: Record<ReadyItemCategory, string> = {
  anatomy: 'Anatomy',
  tools: 'Tools',
  people: 'People',
  trends: 'Trends',
  symptoms: 'Symptoms',
  general: 'General',
}

function ReadyItemMenu({ editor }: { editor: LexicalEditor }) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const [query, setQuery] = useState('')
  const grouped = useMemo(() => readyItemsByCategory(), [])
  const results = useMemo(() => (query.trim() ? searchReadyItems(query) : null), [query])

  function insert(item: ReadyItem) {
    close()
    setQuery('')
    editor.update(() => { $insertNodes([$createReadyItemNode(item.id)]) })
  }

  return (
    <>
      <button
        type="button"
        ref={setAnchor}
        onMouseDown={stop}
        onClick={() => setOpen(true)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('Ready items')}
        title={t('Ready items')}
        className="flex h-11 shrink-0 items-center gap-1.5 rounded-lg px-2 text-ink-2 transition-colors hover:bg-inset hover:text-ink sm:h-8"
      >
        <Icon icon={Shapes} size={16} />
        <Icon icon={ChevronDown} size={12} className="text-ink-3" />
      </button>
      {open && (
        <Popover anchor={anchor} onClose={close} role="menu" label={t('Ready items')} className="w-72 p-2">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('Search items…')}
            className="mb-2 h-9 w-full rounded-lg border border-line-2 bg-surface px-2.5 text-[12.5px] text-ink outline-none focus:border-primary"
          />
          <div className="max-h-72 overflow-y-auto">
            {results ? (
              <ReadyItemGrid items={results} onPick={insert} />
            ) : (
              (Object.keys(grouped) as ReadyItemCategory[]).map((category) => (
                grouped[category].length > 0 && (
                  <div key={category} className="mb-2 last:mb-0">
                    <p className="mb-1 px-1 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t(READY_ITEM_CATEGORY_LABEL[category])}</p>
                    <ReadyItemGrid items={grouped[category]} onPick={insert} />
                  </div>
                )
              ))
            )}
            {results?.length === 0 && <p className="px-1 py-3 text-center text-[12px] text-ink-3">{t('No items match')} “{query}”.</p>}
          </div>
        </Popover>
      )}
    </>
  )
}

function ReadyItemGrid({ items, onPick }: { items: ReadyItem[]; onPick: (item: ReadyItem) => void }) {
  const t = useT()
  return (
    <div className="grid grid-cols-6 gap-1">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          title={t(item.label)}
          aria-label={t(item.label)}
          onMouseDown={stop}
          onClick={() => onPick(item)}
          className="grid aspect-square place-items-center rounded-lg text-ink-2 transition-colors hover:bg-inset hover:text-ink"
        >
          <item.Svg className="size-5" />
        </button>
      ))}
    </div>
  )
}

function DrawRibbon({ draw }: { draw: DrawControls }) {
  const t = useT()
  return (
    <>
      <IconButton
        icon={PenTool}
        label={draw.enabled ? t('Stop drawing') : t('Draw')}
        size="sm"
        active={draw.enabled && draw.tool === 'pen'}
        onMouseDown={stop}
        onClick={() => { draw.setTool('pen'); draw.setEnabled((current) => draw.tool === 'pen' ? !current : true) }}
      />
      <IconButton
        icon={Eraser}
        label={t('Eraser')}
        size="sm"
        active={draw.enabled && draw.tool === 'eraser'}
        onMouseDown={stop}
        onClick={() => { draw.setTool('eraser'); draw.setEnabled((current) => draw.tool === 'eraser' ? !current : true) }}
      />
      <RibbonDivider />

      <div className="flex items-center gap-1">
        {draw.colors.map((swatch) => (
          <button
            key={swatch}
            type="button"
            aria-label={`${t('Pen colour')} ${swatch}`}
            title={swatch}
            onMouseDown={stop}
            onClick={() => draw.setColor(swatch)}
            className={cn(
              'size-5 rounded-full border transition-transform hover:scale-110',
              draw.color === swatch ? 'border-ink scale-110' : 'border-line-2',
            )}
            style={{ backgroundColor: swatch }}
          />
        ))}
      </div>
      <RibbonDivider />

      <div className="flex items-center gap-0.5">
        {draw.widths.map((option) => (
          <button
            key={option}
            type="button"
            aria-label={`${t('Pen width')} ${option}`}
            title={`${t('Width')} ${option}`}
            onMouseDown={stop}
            onClick={() => draw.setWidth(option)}
            className={cn(
              'grid size-8 place-items-center rounded-lg transition-colors hover:bg-inset',
              draw.width === option ? 'bg-primary-tint' : '',
            )}
          >
            <span className="rounded-full bg-ink" style={{ width: option + 2, height: option + 2 }} />
          </button>
        ))}
      </div>
      <RibbonDivider />

      <button
        type="button"
        onMouseDown={stop}
        onClick={() => draw.setPlacement(draw.placement === 'over' ? 'under' : 'over')}
        className="flex h-11 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium text-ink-2 transition-colors hover:bg-inset hover:text-ink sm:h-8"
        title={t('Whether the drawing sits over or under your text')}
      >
        <Icon icon={Layers} size={15} />
        {t('Ink')} {draw.placement === 'over' ? t('over text') : t('under text')}
      </button>
      <RibbonDivider />

      <IconButton
        icon={Trash2}
        label={t('Clear drawing')}
        size="sm"
        disabled={!draw.hasStrokes}
        className="disabled:pointer-events-none disabled:opacity-40"
        onMouseDown={stop}
        onClick={draw.clear}
      />
      {draw.enabled && <Badge tone="primary" className="ms-1">{t('Drawing on')}</Badge>}
    </>
  )
}

/**
 * Fallback shell shown only when the host does not provide draw controls
 * (e.g. a read-only surface). The live Draw tab is `DrawRibbon` above.
 */
function DrawRibbonStub() {
  const t = useT()
  const stubs: { icon: LucideIcon; label: string }[] = [
    { icon: PenTool, label: 'Pen' },
    { icon: Eraser, label: 'Eraser' },
    { icon: Layers, label: 'Bring to front / send to back' },
  ]
  return (
    <>
      {stubs.map((item) => (
        <button
          key={item.label}
          type="button"
          disabled
          title={`${t(item.label)} — ${t('coming soon')}`}
          className="grid size-11 shrink-0 cursor-not-allowed place-items-center rounded-lg text-ink-3/60 sm:size-8"
        >
          <Icon icon={item.icon} size={16} />
        </button>
      ))}
      <Badge tone="outline" className="ms-2">{t('Coming soon')}</Badge>
    </>
  )
}

function TextStyleMenu({ editor, blockType }: { editor: LexicalEditor; blockType: BlockStyle }) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const current = TEXT_STYLE_OPTIONS.find((option) => option.value === blockType) ?? TEXT_STYLE_OPTIONS[0]

  return (
    <>
      <button
        type="button"
        ref={setAnchor}
        onMouseDown={stop}
        onClick={() => setOpen(true)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-11 shrink-0 items-center gap-1.5 rounded-lg border border-line-2 bg-surface px-2.5 text-[12.5px] font-medium text-ink-2 transition-colors hover:bg-inset hover:text-ink sm:h-8"
      >
        <Icon icon={current.icon} size={15} />
        <span className="max-w-[6.5rem] truncate">{t(current.label)}</span>
        <Icon icon={ChevronDown} size={13} className="text-ink-3" />
      </button>
      {open && (
        <Popover anchor={anchor} onClose={close} role="menu" label={t('Text style')} className="min-w-[11.5rem] py-1">
          {TEXT_STYLE_OPTIONS.map((option) => {
            const active = option.value === blockType
            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onMouseDown={stop}
                onClick={() => { close(); applyTextStyle(editor, option.value) }}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3 py-2 text-start text-[13px] transition-colors hover:bg-inset',
                  active ? 'text-primary-strong' : 'text-ink-2',
                )}
              >
                <Icon icon={option.icon} size={15} className={active ? 'text-primary' : 'text-ink-3'} />
                <span className="flex-1 truncate">{t(option.label)}</span>
                {active && <Icon icon={Check} size={14} className="text-primary" />}
              </button>
            )
          })}
        </Popover>
      )}
    </>
  )
}

function ListMenu({ editor, listType }: { editor: LexicalEditor; listType: ListStyle | null }) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const current = LIST_STYLE_OPTIONS.find((option) => option.value === listType)

  return (
    <>
      <button
        type="button"
        ref={setAnchor}
        onMouseDown={stop}
        onClick={() => setOpen(true)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('List style')}
        title={t('List style')}
        className={cn(
          'grid h-11 shrink-0 grid-cols-[1fr_auto] place-items-center gap-0.5 rounded-lg px-1.5 text-ink-2 transition-colors hover:bg-inset hover:text-ink sm:h-8',
          current && 'bg-primary-tint text-primary-strong',
        )}
      >
        <Icon icon={current?.icon ?? List} size={16} />
        <Icon icon={ChevronDown} size={12} className="text-ink-3" />
      </button>
      {open && (
        <Popover anchor={anchor} onClose={close} role="menu" label={t('List style')} className="min-w-[11rem] py-1">
          {LIST_STYLE_OPTIONS.map((option) => {
            const active = option.value === listType
            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onMouseDown={stop}
                onClick={() => { close(); applyList(editor, option.value) }}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3 py-2 text-start text-[13px] transition-colors hover:bg-inset',
                  active ? 'text-primary-strong' : 'text-ink-2',
                )}
              >
                <Icon icon={option.icon} size={15} className={active ? 'text-primary' : 'text-ink-3'} />
                <span className="flex-1 truncate">{t(option.label)}</span>
                {active && <Icon icon={Check} size={14} className="text-primary" />}
              </button>
            )
          })}
        </Popover>
      )}
    </>
  )
}

function ColorMenu({
  icon,
  label,
  colors,
  current,
  onPick,
  clearLabel,
}: {
  icon: LucideIcon
  label: string
  colors: readonly { label: string; value: string }[]
  current: string | null
  onPick: (color: string | null) => void
  clearLabel: string
}) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()

  return (
    <>
      <button
        type="button"
        ref={setAnchor}
        onMouseDown={stop}
        onClick={() => setOpen(true)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        title={label}
        className="grid size-11 shrink-0 place-items-center rounded-lg pb-0.5 text-ink-2 transition-colors hover:bg-inset hover:text-ink sm:size-8"
      >
        <span className="relative grid place-items-center">
          <Icon icon={icon} size={16} />
          <span
            aria-hidden
            className="absolute -bottom-1 h-[3px] w-4 rounded-full"
            style={{ backgroundColor: current ?? 'var(--color-line-2)' }}
          />
        </span>
      </button>
      {open && (
        <Popover anchor={anchor} onClose={close} role="menu" label={label} className="w-56 p-3">
          <div className="grid grid-cols-5 gap-2">
            {colors.map((swatch) => (
              <button
                key={swatch.value}
                type="button"
                aria-label={t(swatch.label)}
                title={t(swatch.label)}
                onMouseDown={stop}
                onClick={() => { close(); onPick(swatch.value) }}
                className={cn(
                  'size-8 rounded-full border transition-transform hover:scale-105',
                  current === swatch.value ? 'border-ink scale-110' : 'border-line-2',
                )}
                style={{ backgroundColor: swatch.value }}
              />
            ))}
          </div>
          <button
            type="button"
            onMouseDown={stop}
            onClick={() => { close(); onPick(null) }}
            className="mt-3 flex w-full items-center gap-2 rounded-md border-t border-line px-1 pt-2.5 text-[12.5px] font-medium text-ink-2 hover:text-ink"
          >
            <span className="grid size-5 place-items-center rounded border border-line-2 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,var(--color-line)_2px,var(--color-line)_3px)]" />
            {clearLabel}
          </button>
        </Popover>
      )}
    </>
  )
}
