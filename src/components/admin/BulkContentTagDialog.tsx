import { useEffect, useMemo, useState } from 'react'
import { Plus, Tags } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { EntityPicker } from '@/components/admin/EntityPicker'
import { normalizeContentTag, uniqueContentTags } from '@/data/contentTags'

export function BulkContentTagDialog({
  open,
  itemCount,
  existingTags,
  onClose,
  onApply,
}: {
  open: boolean
  itemCount: number
  existingTags: string[]
  onClose: () => void
  onApply: (tags: string[]) => void
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [created, setCreated] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    if (!open) return
    setSelected([])
    setCreated([])
    setNewTag('')
  }, [open])

  const options = useMemo(
    () => uniqueContentTags([...existingTags, ...created]).map((tag) => ({ id: tag, label: tag })),
    [created, existingTags],
  )

  if (!open) return null

  function createTag() {
    const normalized = normalizeContentTag(newTag)
    if (!normalized) return
    const existing = options.find((option) => option.id.toLocaleLowerCase() === normalized.toLocaleLowerCase())?.id
    const tag = existing ?? normalized
    setCreated((current) => uniqueContentTags([...current, tag]))
    setSelected((current) => uniqueContentTags([...current, tag]))
    setNewTag('')
  }

  return (
    <Dialog label={`Add tags to ${itemCount} selected ${itemCount === 1 ? 'item' : 'items'}`} size="md" onClose={onClose}>
      <div className="border-b border-line px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent-strong">
            <Icon icon={Tags} size={17} />
          </span>
          <div className="min-w-0">
            <h2 className="font-serif text-[18px] font-semibold text-ink">Tag selected content</h2>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-3">
              Add shared editorial labels to {itemCount} selected {itemCount === 1 ? 'item' : 'items'}. Existing labels remain in place.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 px-5 py-5">
        <EntityPicker
          label="Existing tags"
          hint="Choose as many as needed. Selected tags stay visible below the field."
          noun="tags"
          options={options}
          selected={selected}
          onChange={setSelected}
          placeholder="Search existing tags…"
          emptyText="No existing tags yet — create the first one below."
        />

        <div>
          <label htmlFor="new-content-tag" className="mb-1.5 block text-[12.5px] font-medium text-ink-2">Create a new tag</label>
          <div className="flex items-center gap-2">
            <TextInput
              id="new-content-tag"
              value={newTag}
              maxLength={64}
              placeholder="e.g. Generated - No Module"
              onChange={(event) => setNewTag(event.target.value)}
              onKeyDown={(event) => {
                if (event.key !== 'Enter') return
                event.preventDefault()
                createTag()
              }}
            />
            <Button type="button" variant="secondary" size="md" iconLeft={Plus} disabled={!normalizeContentTag(newTag)} onClick={createTag}>
              Create
            </Button>
          </div>
          <p className="mt-1 text-[11px] text-ink-3">Tags are matched without regard to capitalization, so duplicate labels are not created.</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-2/45 px-5 py-4">
        <span className="tnum font-mono text-[11px] text-ink-3">{selected.length} selected</span>
        <div className="flex items-center gap-2">
          <Button type="button" variant="secondary" size="md" onClick={onClose}>Cancel</Button>
          <Button type="button" variant="primary" size="md" disabled={!selected.length} onClick={() => onApply(selected)}>
            Add {selected.length || ''} {selected.length === 1 ? 'tag' : 'tags'}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
