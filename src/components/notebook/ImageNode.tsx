import { useEffect, useState } from 'react'
import {
  $applyNodeReplacement,
  DecoratorNode,
  type DOMExportOutput,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from 'lexical'
import { API_MODE, apiFetchBlob } from '@/lib/api'
import { resolveMediaSource } from '@/lib/mediaStorage'
import { useMyDocuments } from '@/lib/useMyDocuments'
import { useT } from '@/lib/i18n'

/**
 * An image that flows inline in the note body — between words, and inside a
 * list item at whatever level the cursor sits — rather than in a dedicated
 * media strip. It stores the student-owned document id (the same managed upload
 * the Notebook page already uses) and resolves the bytes at render time, so the
 * note JSON stays small and the picture travels with the account. A legacy
 * data-URL `src` is still honoured for anything pasted before managed uploads.
 */

export type SerializedImageNode = Spread<
  { documentId?: string; src?: string; alt: string },
  SerializedLexicalNode
>

export class ImageNode extends DecoratorNode<React.ReactElement> {
  __documentId?: string
  __src?: string
  __alt: string

  static getType(): string {
    return 'inline-image'
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__documentId, node.__src, node.__alt, node.__key)
  }

  constructor(documentId?: string, src?: string, alt = '', key?: NodeKey) {
    super(key)
    this.__documentId = documentId
    this.__src = src
    this.__alt = alt
  }

  static importJSON(serialized: SerializedImageNode): ImageNode {
    return $createImageNode({
      documentId: serialized.documentId,
      src: serialized.src,
      alt: serialized.alt ?? '',
    })
  }

  exportJSON(): SerializedImageNode {
    return {
      ...super.exportJSON(),
      type: 'inline-image',
      version: 1,
      documentId: this.__documentId,
      src: this.__src,
      alt: this.__alt,
    }
  }

  createDOM(): HTMLElement {
    const span = document.createElement('span')
    span.className = 'inline-block align-middle'
    return span
  }

  updateDOM(): false {
    return false
  }

  exportDOM(): DOMExportOutput {
    const img = document.createElement('img')
    if (this.__src) img.setAttribute('src', this.__src)
    img.setAttribute('alt', this.__alt)
    return { element: img }
  }

  isInline(): true {
    return true
  }

  decorate(): React.ReactElement {
    return <InlineImageView documentId={this.__documentId} src={this.__src} alt={this.__alt} />
  }
}

export function $createImageNode(options: { documentId?: string; src?: string; alt?: string }): ImageNode {
  return $applyNodeReplacement(new ImageNode(options.documentId, options.src, options.alt ?? ''))
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode
}

/**
 * Resolves the managed document to a short-lived object URL the same way the
 * page's `ManagedNotebookImage` does — API blob fetch when connected, IndexedDB
 * in demo mode — and revokes it on unmount.
 */
function InlineImageView({ documentId, src, alt }: { documentId?: string; src?: string; alt: string }) {
  const t = useT()
  const documents = useMyDocuments()
  const document = documentId ? documents.items.find((item) => item.id === documentId) : undefined
  const documentRef = document?.ref
  const [source, setSource] = useState(src ?? '')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (src) { setSource(src); return undefined }
    if (!documentId) return undefined
    let active = true
    let revoke = false
    let resolvedUrl = ''
    setError(false)
    void (async () => {
      try {
        if (!API_MODE && documentRef) {
          const resolved = await resolveMediaSource(documentRef)
          resolvedUrl = resolved.url
          revoke = resolved.revoke
        } else {
          const blob = await apiFetchBlob(`/my-documents/${encodeURIComponent(documentId)}/file`)
          resolvedUrl = URL.createObjectURL(blob)
          revoke = true
        }
        if (active) setSource(resolvedUrl)
        else if (revoke) URL.revokeObjectURL(resolvedUrl)
      } catch {
        if (active) setError(true)
      }
    })()
    return () => {
      active = false
      if (revoke && resolvedUrl) URL.revokeObjectURL(resolvedUrl)
    }
  }, [documentId, documentRef, src])

  if (error) {
    return <span className="mx-0.5 rounded bg-danger-tint px-1.5 py-0.5 text-[0.8em] text-danger">{t('Image unavailable')}</span>
  }
  if (!source) {
    return <span className="mx-0.5 inline-block h-[1.2em] w-16 animate-pulse rounded bg-inset align-middle" aria-hidden />
  }
  return (
    <img
      src={source}
      alt={alt}
      draggable={false}
      className="mx-0.5 inline-block max-h-72 max-w-full rounded-md border border-line align-middle"
    />
  )
}
