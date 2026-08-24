/**
 * The student's own notes.
 *
 * Seeded with five clinical notes — "Heart failure — the compensation trap",
 * "Four pillars of HFrEF" — which were written into every account the moment it
 * opened the notebook, and carried frozen relative timestamps ("2 days ago")
 * that never aged because they were strings, not times. Both are gone: a
 * notebook starts empty, and `updatedAt` is a real ISO timestamp.
 */
export interface Note {
  id: string
  title: string
  /**
   * Legacy markdown body. Kept optional for backward compatibility: old notes
   * load with this field, then gain `editorJson` and `plainText` lazily without
   * discarding the source markdown.
   */
  body: string
  editorJson?: NotebookEditorJson
  plainText?: string
  legacyMarkdownSource?: string
  revision?: number
  tags: string[]
  subtopicId?: string
  subtopicTitle?: string
  subjectId?: string
  /** Managed student-owned media for newly pasted images. */
  imageDocumentId?: string
  /** Legacy inline image retained so existing notes never lose an attachment. */
  imageData?: string
  /**
   * Documents this note is about — a Maristana resource, or a PDF the student
   * uploaded themselves. Optional and additive, so every note written before
   * this existed is still a valid note.
   *
   * `resourceId` is a reader route id, which means an upload is stored as
   * `my:<id>`; one field addresses both kinds because the reader does.
   */
  resourceRefs?: NoteResourceRef[]
  /** ISO timestamp of the last edit. */
  updatedAt: string
}

export interface NotebookEditorJson {
  root: {
    type: 'root'
    version: number
    children: NotebookEditorNode[]
    direction?: 'ltr' | 'rtl' | null
    format?: string
    indent?: number
  }
}

export interface NotebookEditorNode {
  type: string
  version: number
  text?: string
  children?: NotebookEditorNode[]
  direction?: 'ltr' | 'rtl' | null
  format?: string | number
  indent?: number
  level?: 1 | 2
  ordered?: boolean
  [key: string]: unknown
}

export interface NoteResourceRef {
  resourceId: string
  /** The page the student was on, when they were on one. */
  page?: number
  /** Kept alongside the id so a chip still reads if the item is withdrawn. */
  label: string
}

export const initialNotes: Note[] = []

function textNode(text: string): NotebookEditorNode {
  return { type: 'text', version: 1, text, detail: 0, format: 0, mode: 'normal', style: '' }
}

function paragraphNode(text: string): NotebookEditorNode {
  return {
    type: 'paragraph', version: 1, children: text ? [textNode(text)] : [],
    direction: null, format: '', indent: 0, textFormat: 0, textStyle: '',
  }
}

export function plainTextToEditorJson(text: string): NotebookEditorJson {
  const lines = text.replace(/\r\n?/g, '\n').split('\n')
  const blocks: NotebookEditorNode[] = lines.map((line) => {
    const trimmed = line.trim()
    // Old markdown is preserved separately on the note. The rich-text state
    // receives the readable words, never the formatting marks.
    if (trimmed.startsWith('## ')) return paragraphNode(trimmed.slice(3).trim())
    if (trimmed.startsWith('# ')) return paragraphNode(trimmed.slice(2).trim())
    if (trimmed.startsWith('> ')) return paragraphNode(trimmed.slice(2).trim())
    if (/^[-*]\s+/.test(trimmed)) return paragraphNode(trimmed.replace(/^[-*]\s+/, ''))
    if (/^\d+\.\s+/.test(trimmed)) return paragraphNode(trimmed.replace(/^\d+\.\s+/, ''))
    return paragraphNode(line)
  })

  return {
    root: { type: 'root', version: 1, children: blocks.length ? blocks : [paragraphNode('')], direction: null, format: '', indent: 0 },
  }
}

export function editorJsonToPlainText(editorJson: NotebookEditorJson | undefined): string {
  if (!editorJson?.root?.children?.length) return ''
  const textOf = (node: NotebookEditorNode): string => {
    if (typeof node.text === 'string') return node.text
    return (node.children ?? []).map(textOf).join('')
  }
  return editorJson.root.children.map(textOf).join('\n')
}

/** Convert the worker-era block JSON into Lexical's serialised editor state. */
export function normaliseNotebookEditorJson(editorJson: NotebookEditorJson): NotebookEditorJson {
  const first = editorJson?.root?.children?.[0]
  if (!first || Array.isArray(first.children)) return editorJson
  return plainTextToEditorJson(editorJsonToPlainText(editorJson))
}

export function notePlainText(note: Pick<Note, 'plainText' | 'editorJson' | 'body'>): string {
  return note.plainText ?? editorJsonToPlainText(note.editorJson) ?? note.body ?? ''
}

export function ensureNotebookEditor(note: Note): Note {
  if (note.editorJson && note.plainText !== undefined) return note
  const source = note.body ?? ''
  return {
    ...note,
    editorJson: plainTextToEditorJson(source),
    plainText: source.replace(/\r\n?/g, '\n'),
    legacyMarkdownSource: note.legacyMarkdownSource ?? source,
    revision: note.revision ?? 1,
  }
}

export function editorJsonFromPlainText(text: string, previous?: NotebookEditorJson): NotebookEditorJson {
  void previous
  return plainTextToEditorJson(text)
}
