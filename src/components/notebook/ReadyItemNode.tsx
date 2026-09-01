import {
  $applyNodeReplacement,
  DecoratorNode,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from 'lexical'
import { READY_ITEMS } from '@/data/readyItems'

/**
 * A ready-made medical item (stethoscope, "increases" arrow, improving-symptoms
 * icon, …) dropped inline in the note. Only the item's `id` is stored; the SVG
 * is looked up from the shared `READY_ITEMS` library at render time, so the
 * icon set can grow without rewriting saved notes.
 */

export type SerializedReadyItemNode = Spread<{ readyItemId: string }, SerializedLexicalNode>

export class ReadyItemNode extends DecoratorNode<React.ReactElement> {
  __readyItemId: string

  static getType(): string {
    return 'ready-item'
  }

  static clone(node: ReadyItemNode): ReadyItemNode {
    return new ReadyItemNode(node.__readyItemId, node.__key)
  }

  constructor(readyItemId: string, key?: NodeKey) {
    super(key)
    this.__readyItemId = readyItemId
  }

  static importJSON(serialized: SerializedReadyItemNode): ReadyItemNode {
    return $createReadyItemNode(serialized.readyItemId)
  }

  exportJSON(): SerializedReadyItemNode {
    return {
      ...super.exportJSON(),
      type: 'ready-item',
      version: 1,
      readyItemId: this.__readyItemId,
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

  isInline(): true {
    return true
  }

  decorate(): React.ReactElement {
    return <ReadyItemView readyItemId={this.__readyItemId} />
  }
}

export function $createReadyItemNode(readyItemId: string): ReadyItemNode {
  return $applyNodeReplacement(new ReadyItemNode(readyItemId))
}

export function $isReadyItemNode(node: LexicalNode | null | undefined): node is ReadyItemNode {
  return node instanceof ReadyItemNode
}

function ReadyItemView({ readyItemId }: { readyItemId: string }) {
  const item = READY_ITEMS.find((entry) => entry.id === readyItemId)
  if (!item) return null
  const { Svg } = item
  return (
    <span title={item.label} aria-label={item.label} role="img" className="mx-0.5 inline-flex align-middle text-ink">
      <Svg className="inline-block size-[1.3em]" />
    </span>
  )
}
