import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  CheckSquare,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Quote as QuoteIcon,
  Type,
} from 'lucide-react'
import {
  $createParagraphNode,
  $findMatchingParent,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_LOW,
  mergeRegister,
  SELECTION_CHANGE_COMMAND,
  type ElementFormatType,
  type LexicalEditor,
  type TextFormatType,
} from 'lexical'
import { $isListNode, INSERT_CHECK_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list'
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, $isQuoteNode, type HeadingTagType } from '@lexical/rich-text'
import { $getSelectionStyleValueForProperty, $patchStyleText, $setBlocksType } from '@lexical/selection'

/**
 * Shared command dispatch + selection-state helpers for the note ribbon.
 * Kept apart from `NoteRibbon.tsx` so the ribbon file stays about layout, and
 * this one stays a plain (non-JSX) module of Lexical calls.
 */

export type BlockStyle = 'paragraph' | 'h1' | 'h2' | 'h3' | 'h4' | 'quote'
export type ListStyle = 'bullet' | 'number' | 'check'

export const TEXT_STYLE_OPTIONS: { value: BlockStyle; label: string; icon: LucideIcon }[] = [
  { value: 'paragraph', label: 'Normal text', icon: Type },
  { value: 'h1', label: 'Heading 1', icon: Heading1 },
  { value: 'h2', label: 'Heading 2', icon: Heading2 },
  { value: 'h3', label: 'Heading 3', icon: Heading3 },
  { value: 'h4', label: 'Heading 4', icon: Heading4 },
  { value: 'quote', label: 'Quote', icon: QuoteIcon },
]

export const LIST_STYLE_OPTIONS: { value: ListStyle; label: string; icon: LucideIcon }[] = [
  { value: 'bullet', label: 'Bulleted list', icon: List },
  { value: 'number', label: 'Numbered list', icon: ListOrdered },
  { value: 'check', label: 'Checklist', icon: CheckSquare },
]

export const ALIGN_OPTIONS: { value: ElementFormatType; label: string; icon: LucideIcon }[] = [
  { value: 'left', label: 'Align left', icon: AlignLeft },
  { value: 'center', label: 'Align centre', icon: AlignCenter },
  { value: 'right', label: 'Align right', icon: AlignRight },
  { value: 'justify', label: 'Justify', icon: AlignJustify },
]

/**
 * Literal hex, not theme tokens: a colour written into a note's saved
 * content has to mean the same thing on every device and in every theme, the
 * same reasoning the reader's ink palette already follows.
 */
export const TEXT_COLORS = [
  { label: 'Ink', value: '#161920' },
  { label: 'Grey', value: '#5d636f' },
  { label: 'Crimson', value: '#d13a63' },
  { label: 'Blue', value: '#1553b3' },
  { label: 'Rust', value: '#c14a2e' },
  { label: 'Amber', value: '#9a6a1f' },
  { label: 'Green', value: '#1f8a5a' },
  { label: 'Teal', value: '#1f6f8b' },
  { label: 'Violet', value: '#5145a8' },
  { label: 'Plum', value: '#8d4a72' },
] as const

/** Marker-bright backgrounds — a highlighter reads the same in light or dark. */
export const HIGHLIGHT_COLORS = [
  { label: 'Yellow', value: '#fdea9b' },
  { label: 'Green', value: '#bff0cd' },
  { label: 'Blue', value: '#c3ddfb' },
  { label: 'Pink', value: '#f9cee1' },
  { label: 'Orange', value: '#fbdaad' },
  { label: 'Violet', value: '#e3d5fb' },
] as const

export function applyTextColor(editor: LexicalEditor, color: string | null) {
  editor.update(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    $patchStyleText(selection, { color })
  })
}

export function applyHighlightColor(editor: LexicalEditor, color: string | null) {
  editor.update(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    $patchStyleText(selection, { 'background-color': color })
  })
}

export function applyTextStyle(editor: LexicalEditor, style: BlockStyle) {
  editor.update(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    if (style === 'paragraph') { $setBlocksType(selection, () => $createParagraphNode()); return }
    if (style === 'quote') { $setBlocksType(selection, () => $createQuoteNode()); return }
    $setBlocksType(selection, () => $createHeadingNode(style as HeadingTagType))
  })
}

export function applyList(editor: LexicalEditor, style: ListStyle) {
  if (style === 'bullet') editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
  else if (style === 'number') editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
  else editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
}

const CLEARABLE_FORMATS: TextFormatType[] = ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'highlight', 'code']

/** Mirrors Word's eraser: strips inline colour/format and drops the block back to Normal. */
export function clearFormatting(editor: LexicalEditor) {
  editor.update(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    $patchStyleText(selection, { color: null, 'background-color': null })
    for (const format of CLEARABLE_FORMATS) {
      if (selection.hasFormat(format)) selection.toggleFormat(format)
    }
    $setBlocksType(selection, () => $createParagraphNode())
  })
}

export interface ActiveFormats {
  bold: boolean
  italic: boolean
  underline: boolean
  strikethrough: boolean
  subscript: boolean
  superscript: boolean
  blockType: BlockStyle
  listType: ListStyle | null
  alignment: ElementFormatType
  color: string | null
  highlight: string | null
}

const DEFAULT_ACTIVE_FORMATS: ActiveFormats = {
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  subscript: false,
  superscript: false,
  blockType: 'paragraph',
  listType: null,
  alignment: 'left',
  color: null,
  highlight: null,
}

/**
 * Reflects the selection's current formatting back to the ribbon — bold
 * button lit while the caret sits in bold text, the style dropdown reading
 * "Heading 2", and so on. Registers both an update listener and a selection
 * command, the belt-and-braces pattern Lexical's own toolbar examples use,
 * since a pure selection move (no content change) is not guaranteed to reach
 * a plain update listener on every build.
 */
export function useActiveFormats(editor: LexicalEditor): ActiveFormats {
  const [formats, setFormats] = useState<ActiveFormats>(DEFAULT_ACTIVE_FORMATS)

  useEffect(() => {
    const update = () => {
      editor.getEditorState().read(() => {
        const selection = $getSelection()
        if (!$isRangeSelection(selection)) {
          setFormats(DEFAULT_ACTIVE_FORMATS)
          return
        }
        const anchorNode = selection.anchor.getNode()
        const element = $isRootOrShadowRoot(anchorNode)
          ? anchorNode
          : ($findMatchingParent(anchorNode, (node) => {
              const parent = node.getParent()
              return parent !== null && $isRootOrShadowRoot(parent)
            }) ?? anchorNode.getTopLevelElementOrThrow())

        let blockType: BlockStyle = 'paragraph'
        let listType: ListStyle | null = null
        if ($isListNode(element)) {
          const type = element.getListType()
          listType = type === 'number' ? 'number' : type === 'check' ? 'check' : 'bullet'
        } else if ($isHeadingNode(element)) {
          blockType = element.getTag() as BlockStyle
        } else if ($isQuoteNode(element)) {
          blockType = 'quote'
        }

        setFormats({
          bold: selection.hasFormat('bold'),
          italic: selection.hasFormat('italic'),
          underline: selection.hasFormat('underline'),
          strikethrough: selection.hasFormat('strikethrough'),
          subscript: selection.hasFormat('subscript'),
          superscript: selection.hasFormat('superscript'),
          blockType,
          listType,
          alignment: ($isElementNode(element) ? element.getFormatType() : '') || 'left',
          color: $getSelectionStyleValueForProperty(selection, 'color', '') || null,
          highlight: $getSelectionStyleValueForProperty(selection, 'background-color', '') || null,
        })
      })
    }

    update()
    return mergeRegister(
      editor.registerUpdateListener(() => update()),
      editor.registerCommand(SELECTION_CHANGE_COMMAND, () => { update(); return false }, COMMAND_PRIORITY_LOW),
    )
  }, [editor])

  return formats
}
