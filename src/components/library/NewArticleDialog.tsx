import { useState } from 'react'
import { X, Plus, GripVertical, Tag as TagIcon, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Field, TextInput, Textarea, Select } from '@/components/ui/Field'
import { subjects } from '@/data/subjects'
import { emptySections, newId, type ArticleSection, type UserArticle } from '@/data/userLibrary'
import { useT } from '@/lib/i18n'
import { overlayPortal } from '@/lib/overlayPortal'

export function NewArticleDialog({
  open,
  reusableTags,
  onClose,
  onCreate,
}: {
  open: boolean
  reusableTags: string[]
  onClose: () => void
  onCreate: (article: UserArticle) => void
}) {
  const t = useT()
  const [title, setTitle] = useState('')
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? '')
  const [summary, setSummary] = useState('')
  const [sections, setSections] = useState<ArticleSection[]>(emptySections)
  const [tags, setTags] = useState<string[]>([])
  const [tagDraft, setTagDraft] = useState('')

  if (!open) return null

  function reset() {
    setTitle('')
    setSubjectId(subjects[0]?.id ?? '')
    setSummary('')
    setSections(emptySections())
    setTags([])
    setTagDraft('')
  }

  function addTag(raw: string) {
    const value = raw.trim()
    if (!value) return
    setTags((prev) => (prev.some((x) => x.toLowerCase() === value.toLowerCase()) ? prev : [...prev, value]))
    setTagDraft('')
  }

  function save() {
    if (!title.trim()) return
    const now = new Date().toISOString()
    onCreate({
      id: newId('ua'),
      title: title.trim(),
      subjectId,
      summary: summary.trim(),
      sections: sections
        .map((s) => ({ ...s, heading: s.heading.trim(), body: s.body.trim() }))
        .filter((s) => s.heading || s.body),
      tags,
      createdAt: now,
      updatedAt: now,
    })
    reset()
    onClose()
  }

  const suggestions = reusableTags.filter((tag) => !tags.some((x) => x.toLowerCase() === tag.toLowerCase()))

  return overlayPortal(
    <div
      className="fixed inset-0 z-[60] grid items-end bg-ink/30 p-0 animate-fade sm:place-items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-article-title"
    >
      <div className="animate-pop flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-line bg-surface shadow-pop sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <h2 id="new-article-title" className="font-serif text-[18px] font-semibold text-ink">
            {t('New article')}
          </h2>
          <button
            onClick={onClose}
            className="grid size-9 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink"
            aria-label={t('Close')}
          >
            <Icon icon={X} size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t('Title')} htmlFor="na-title">
              <TextInput
                id="na-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('e.g. Rheumatoid arthritis')}
                autoFocus
              />
            </Field>
            <Field label={t('Subject')} htmlFor="na-subject">
              <Select id="na-subject" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label={t('Summary')} htmlFor="na-summary" hint={t('A one or two line overview shown at the top.')}>
            <Textarea
              id="na-summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder={t('What is this article about?')}
            />
          </Field>

          {/* Sections */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[12.5px] font-semibold text-ink">{t('Sections')}</span>
              <span className="text-[11.5px] text-ink-3">{t('Rename or remove to fit this article')}</span>
            </div>
            <div className="space-y-3">
              {sections.map((section, index) => (
                <div key={section.id} className="rounded-xl border border-line bg-surface-2/40 p-3">
                  <div className="flex items-center gap-2">
                    <Icon icon={GripVertical} size={15} className="shrink-0 text-ink-3" />
                    <input
                      value={section.heading}
                      onChange={(e) =>
                        setSections((prev) => prev.map((s, i) => (i === index ? { ...s, heading: e.target.value } : s)))
                      }
                      placeholder={t('Section heading')}
                      className="h-9 flex-1 rounded-md border border-line bg-surface px-2.5 text-[13.5px] font-semibold text-ink focus:border-primary focus:outline-none"
                    />
                    <button
                      onClick={() => setSections((prev) => prev.filter((_, i) => i !== index))}
                      className="grid size-8 shrink-0 place-items-center rounded-md text-ink-3 hover:bg-danger-tint hover:text-danger"
                      aria-label={t('Remove section')}
                    >
                      <Icon icon={Trash2} size={15} />
                    </button>
                  </div>
                  <Textarea
                    value={section.body}
                    onChange={(e) =>
                      setSections((prev) => prev.map((s, i) => (i === index ? { ...s, body: e.target.value } : s)))
                    }
                    placeholder={t('Write this section…')}
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
            <Button
              variant="secondary"
              size="sm"
              iconLeft={Plus}
              className="mt-3"
              onClick={() => setSections((prev) => [...prev, { id: newId('sec'), heading: '', body: '' }])}
            >
              {t('Add section')}
            </Button>
          </div>

          {/* Personal tags */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Icon icon={TagIcon} size={15} className="text-primary" />
              <span className="text-[12.5px] font-semibold text-ink">{t('Your tags')}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-primary-line bg-primary-tint py-0.5 pe-1.5 ps-2.5 text-[12px] font-medium text-primary-strong"
                >
                  {tag}
                  <button
                    onClick={() => setTags((prev) => prev.filter((x) => x !== tag))}
                    aria-label={`${t('Remove')} ${tag}`}
                    className="text-primary/70 hover:text-primary"
                  >
                    <Icon icon={X} size={12} />
                  </button>
                </span>
              ))}
              <input
                value={tagDraft}
                onChange={(e) => setTagDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault()
                    addTag(tagDraft)
                  }
                }}
                placeholder={t('Add a tag…')}
                className="h-8 min-w-[8rem] flex-1 rounded-md border border-line bg-surface px-2.5 text-[13px] text-ink focus:border-primary focus:outline-none"
              />
            </div>
            {suggestions.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-ink-3">{t('Reuse:')}</span>
                {suggestions.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => addTag(tag)}
                    className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[12px] text-ink-2 hover:border-primary-line hover:bg-primary-tint/40 hover:text-primary-strong"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-line bg-surface-2/40 px-5 py-3">
          <Button variant="ghost" onClick={onClose}>
            {t('Cancel')}
          </Button>
          <Button variant="primary" iconLeft={Plus} onClick={save} disabled={!title.trim()}>
            {t('Create article')}
          </Button>
        </div>
      </div>
    </div>
  )
}
