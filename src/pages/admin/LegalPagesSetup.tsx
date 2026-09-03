import { useState } from 'react'
import { ExternalLink, FileText, Plus, RotateCcw, Save, Scale, Trash2 } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Field, TextInput, Textarea } from '@/components/ui/Field'
import { Tabs } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Dialog } from '@/components/ui/Dialog'
import { DateField } from '@/components/ui/DateTimeField'
import { useIdentity } from '@/lib/useIdentity'
import { usePersistentState } from '@/lib/usePersistentState'
import { LEGAL_PAGES, type LegalPageContent, type LegalSection } from '@/pages/legal/content'
import {
  EMPTY_LEGAL_PAGES_DOC,
  LEGAL_PAGES_STATE_KEY,
  LEGAL_SLUGS,
  countPlaceholders,
  linesToText,
  mergeLegalPage,
  paragraphsToText,
  textToLines,
  textToParagraphs,
  type LegalPageOverride,
  type LegalPagesDoc,
  type LegalSectionOverride,
  type LegalSlug,
} from '@/data/legalPages'

/**
 * Edit the five public documents — Terms, Privacy, Refund Policy, Contact, Accessibility.
 *
 * They ship as drafts: every company fact nobody has confirmed is left in
 * brackets (`[COMPANY LEGAL NAME]`) and its clause carries a "Needs legal
 * review" badge, so an unfinished contract reads as unfinished. Replacing
 * those brackets used to mean a code change and a deploy. Here it is a save.
 *
 * What is stored is a patch, not a copy: only the fields somebody actually
 * changed, per page and per section, written to the shared
 * `nishany-legal-pages-v1` document by `usePersistentState` — the same
 * mechanism `TutorialSetup` uses, so one edit reaches every reader rather than
 * this admin's browser. `mergeLegalPage` lays the patch over the draft when a
 * page renders, which is why a clause nobody has touched still picks up a
 * later correction to the draft.
 *
 * Nothing is written until Save. The console is English, like every other
 * admin surface; the documents themselves are English by design (see
 * `src/pages/legal/content.ts`).
 */

const BASE_BY_SLUG: Record<LegalSlug, LegalPageContent> = {
  terms: LEGAL_PAGES.terms,
  privacy: LEGAL_PAGES.privacy,
  'refund-policy': LEGAL_PAGES.refund,
  contact: LEGAL_PAGES.contact,
  accessibility: LEGAL_PAGES.accessibility,
}

const EMPTY_OVERRIDE: LegalPageOverride = { sections: {}, updatedAt: '' }

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/

function filled(value: string | undefined): string | undefined {
  return value && value.trim() ? value : undefined
}

/** The part of an override an admin authored, ignoring who saved it and when. */
function body(override: LegalPageOverride | undefined): string {
  if (!override) return ''
  return JSON.stringify({
    lastUpdated: override.lastUpdated ?? null,
    intro: override.intro ?? null,
    sections: override.sections ?? {},
    extraSections: override.extraSections ?? [],
  })
}

function isEmptyOverride(override: LegalPageOverride): boolean {
  return body(override) === body(EMPTY_OVERRIDE)
}

function isEmptySection(section: LegalSectionOverride): boolean {
  return (
    section.heading === undefined
    && section.paragraphs === undefined
    && section.bullets === undefined
    && section.needsReview === undefined
    && section.hidden === undefined
  )
}

function sameList(a: string[] | undefined, b: string[] | undefined): boolean {
  const left = a ?? []
  const right = b ?? []
  return left.length === right.length && left.every((value, index) => value === right[index])
}

/** Drop the keys an edit set back to `undefined`, so "unchanged" stores nothing. */
function prune(section: LegalSectionOverride): LegalSectionOverride {
  const next: LegalSectionOverride = {}
  if (section.heading !== undefined) next.heading = section.heading
  if (section.paragraphs !== undefined) next.paragraphs = section.paragraphs
  if (section.bullets !== undefined) next.bullets = section.bullets
  if (section.needsReview !== undefined) next.needsReview = section.needsReview
  if (section.hidden !== undefined) next.hidden = section.hidden
  return next
}

export function LegalPagesSetup() {
  const identity = useIdentity()
  const [stored, setStored] = usePersistentState<LegalPagesDoc>(LEGAL_PAGES_STATE_KEY, EMPTY_LEGAL_PAGES_DOC)
  const [draft, setDraft] = useState<LegalPagesDoc | null>(null)
  const [slug, setSlug] = useState<LegalSlug>('terms')
  const [confirmReset, setConfirmReset] = useState<LegalSlug | null>(null)
  // Raw textarea text, so a blank line the admin has just typed is not swept
  // away by the round trip through `textToParagraphs`. Keyed per field.
  const [text, setText] = useState<Record<string, string>>({})

  const doc = draft ?? stored
  const dirty = draft !== null && JSON.stringify(draft) !== JSON.stringify(stored)

  const base = BASE_BY_SLUG[slug]
  const override = doc.pages?.[slug]
  const saved = stored.pages?.[slug]
  const preview = mergeLegalPage(base, override)
  const placeholders = countPlaceholders(preview)

  function editPage(slugToEdit: LegalSlug, change: (current: LegalPageOverride) => LegalPageOverride) {
    setDraft((current) => {
      const source = current ?? stored
      const next = change(source.pages?.[slugToEdit] ?? EMPTY_OVERRIDE)
      const pages = { ...source.pages }
      if (isEmptyOverride(next)) delete pages[slugToEdit]
      else pages[slugToEdit] = next
      return { version: 1, pages }
    })
  }

  function editSection(sectionId: string, patch: LegalSectionOverride) {
    editPage(slug, (current) => {
      const sections = { ...current.sections }
      const merged = prune({ ...sections[sectionId], ...patch })
      if (isEmptySection(merged)) delete sections[sectionId]
      else sections[sectionId] = merged
      return { ...current, sections }
    })
  }

  function editExtra(sectionId: string, patch: Partial<LegalSection>) {
    editPage(slug, (current) => ({
      ...current,
      extraSections: (current.extraSections ?? []).map((section) => (
        section.id === sectionId ? { ...section, ...patch } : section
      )),
    }))
  }

  /** Forget the raw text held for one section (or a whole page, with no id). */
  function forgetText(sectionId?: string) {
    setText((current) => {
      const prefix = sectionId ? `${slug}|${sectionId}|` : `${slug}|`
      const next: Record<string, string> = {}
      for (const [key, value] of Object.entries(current)) {
        if (!key.startsWith(prefix)) next[key] = value
      }
      return next
    })
  }

  function addSection() {
    const existing = override?.extraSections ?? []
    let index = existing.length + 1
    while (existing.some((section) => section.id === `added-${index}`)) index += 1
    // Badged on arrival: a clause somebody has just typed into a contract has
    // certainly not been through review yet.
    const section: LegalSection = { id: `added-${index}`, heading: 'New section', paragraphs: [], needsReview: true }
    editPage(slug, (current) => ({ ...current, extraSections: [...(current.extraSections ?? []), section] }))
  }

  function removeSection(sectionId: string) {
    forgetText(sectionId)
    editPage(slug, (current) => ({
      ...current,
      extraSections: (current.extraSections ?? []).filter((section) => section.id !== sectionId),
    }))
  }

  function resetSection(sectionId: string) {
    forgetText(sectionId)
    editPage(slug, (current) => {
      const sections = { ...current.sections }
      delete sections[sectionId]
      return { ...current, sections }
    })
  }

  function resetPage(slugToReset: LegalSlug) {
    setText((current) => {
      const next: Record<string, string> = {}
      for (const [key, value] of Object.entries(current)) {
        if (!key.startsWith(`${slugToReset}|`)) next[key] = value
      }
      return next
    })
    setDraft((current) => {
      const pages = { ...(current ?? stored).pages }
      delete pages[slugToReset]
      return { version: 1, pages }
    })
    setConfirmReset(null)
  }

  function save() {
    if (!draft) return
    const at = new Date().toISOString()
    // The real person, or nobody. `displayName` falls back to "Student", and a
    // change to the terms attributed to a name nobody has is worse than one
    // attributed to no name at all.
    const by = identity.profile.name || identity.email || undefined
    const pages: LegalPagesDoc['pages'] = {}
    for (const key of LEGAL_SLUGS) {
      const next = draft.pages?.[key]
      if (!next || isEmptyOverride(next)) continue
      const previous = stored.pages?.[key]
      // Only a page whose text actually moved gets a new stamp: saving Terms
      // must not re-date the Privacy Policy nobody touched.
      const unchanged = previous !== undefined && body(next) === body(previous)
      pages[key] = unchanged ? previous : { ...next, updatedAt: at, updatedBy: by }
    }
    setStored({ version: 1, pages })
    setDraft(null)
    setText({})
  }

  const tabs = LEGAL_SLUGS.map((key) => {
    const page = BASE_BY_SLUG[key]
    return {
      value: key,
      label: page.title,
      icon: FileText,
      // The count is the page's remaining work: bracketed facts nobody has
      // supplied yet. Zero is the condition for publishing it as real policy.
      count: countPlaceholders(mergeLegalPage(page, doc.pages?.[key])),
    }
  })

  const lastUpdated = override?.lastUpdated ?? ''
  const introKey = `${slug}|intro`
  const introValue = text[introKey] ?? override?.intro ?? base.intro

  return (
    <PageContainer>
      <PageHeader
        title="Legal pages"
        description="Terms, Privacy, Refund Policy, Contact and Accessibility, as students read them. Each page ships as a draft with the unconfirmed company facts left in brackets; what you write here replaces those and is published to every reader the moment you save."
        actions={
          <Button
            iconLeft={ExternalLink}
            onClick={() => window.open(`/${slug}`, '_blank', 'noopener,noreferrer')}
          >
            Preview {base.title}
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:items-start lg:gap-6">
        <Tabs items={tabs} value={slug} onChange={(next) => setSlug(next as LegalSlug)} className="lg:sticky lg:top-24" />

        <div className="min-w-0 space-y-4">
          <Panel>
            <PanelHeader
              title={base.title}
              hint={`/${slug}`}
              icon={Scale}
              action={
                <>
                  <Badge tone={placeholders ? 'warning' : 'success'} dot>
                    {placeholders === 0 ? 'No placeholders left' : `${placeholders} placeholder${placeholders === 1 ? '' : 's'} left`}
                  </Badge>
                  <Button size="sm" iconLeft={RotateCcw} disabled={!override} onClick={() => setConfirmReset(slug)}>
                    Reset page
                  </Button>
                </>
              }
            />
            <div className="space-y-4 p-4">
              <Field
                label="Last updated"
                htmlFor="legal-updated"
                hint={
                  lastUpdated
                    ? 'Shown under the title on the public page.'
                    : `Not set. The draft shows "${base.updated}" until you choose a date.`
                }
              >
                <DateField
                  id="legal-updated"
                  value={ISO_DAY.test(lastUpdated) ? lastUpdated : ''}
                  onChange={(next) => editPage(slug, (current) => ({ ...current, lastUpdated: filled(next) }))}
                />
              </Field>

              <Field label="Introduction" htmlFor="legal-intro" hint="The paragraph under the title, before the first section.">
                <Textarea
                  id="legal-intro"
                  rows={3}
                  value={introValue}
                  onChange={(event) => {
                    const value = event.target.value
                    setText((current) => ({ ...current, [introKey]: value }))
                    editPage(slug, (current) => ({
                      ...current,
                      intro: value === base.intro ? undefined : filled(value),
                    }))
                  }}
                />
              </Field>

              {/* Who last changed a contract, and when. Read from what is
                  stored rather than the draft, so it describes the version
                  students are actually reading right now. */}
              {saved && (
                <p className="text-[12px] text-ink-3">
                  Published {new Date(saved.updatedAt).toLocaleString()}
                  {saved.updatedBy ? ` by ${saved.updatedBy}` : ''}.
                </p>
              )}
            </div>
          </Panel>

          {base.sections.map((section) => {
            const patch = override?.sections?.[section.id]
            return (
              <SectionCard
                key={section.id}
                slug={slug}
                section={section}
                heading={text[`${slug}|${section.id}|heading`] ?? patch?.heading ?? section.heading}
                paragraphs={text[`${slug}|${section.id}|paragraphs`] ?? paragraphsToText(patch?.paragraphs ?? section.paragraphs)}
                bullets={text[`${slug}|${section.id}|bullets`] ?? linesToText(patch?.bullets ?? section.bullets)}
                needsReview={patch?.needsReview ?? Boolean(section.needsReview)}
                hidden={Boolean(patch?.hidden)}
                edited={patch !== undefined}
                onText={(field, value) => setText((current) => ({ ...current, [`${slug}|${section.id}|${field}`]: value }))}
                onHeading={(value) => editSection(section.id, { heading: value === section.heading ? undefined : filled(value) })}
                onParagraphs={(value) => {
                  const next = textToParagraphs(value)
                  editSection(section.id, { paragraphs: sameList(next, section.paragraphs) ? undefined : next })
                }}
                onBullets={(value) => {
                  const next = textToLines(value)
                  editSection(section.id, { bullets: sameList(next, section.bullets) ? undefined : next })
                }}
                onNeedsReview={(next) => editSection(section.id, {
                  needsReview: next === Boolean(section.needsReview) ? undefined : next,
                })}
                onHidden={(next) => editSection(section.id, { hidden: next ? true : undefined })}
                onReset={() => resetSection(section.id)}
              />
            )
          })}

          {(override?.extraSections ?? []).map((section) => (
            <SectionCard
              key={section.id}
              slug={slug}
              section={section}
              added
              heading={text[`${slug}|${section.id}|heading`] ?? section.heading}
              paragraphs={text[`${slug}|${section.id}|paragraphs`] ?? paragraphsToText(section.paragraphs)}
              bullets={text[`${slug}|${section.id}|bullets`] ?? linesToText(section.bullets)}
              needsReview={Boolean(section.needsReview)}
              hidden={false}
              edited
              onText={(field, value) => setText((current) => ({ ...current, [`${slug}|${section.id}|${field}`]: value }))}
              onHeading={(value) => editExtra(section.id, { heading: value })}
              onParagraphs={(value) => editExtra(section.id, { paragraphs: textToParagraphs(value) })}
              onBullets={(value) => editExtra(section.id, { bullets: textToLines(value) })}
              onNeedsReview={(next) => editExtra(section.id, { needsReview: next })}
              onRemove={() => removeSection(section.id)}
            />
          ))}

          <Button iconLeft={Plus} onClick={addSection}>Add a section</Button>
        </div>
      </div>

      {/* One bar for the whole document: an admin who corrected the company
          name on three pages saves all three together, which is what makes the
          single "last updated" stamp per page honest. */}
      {dirty && (
        <Panel className="sticky bottom-4 mt-5 border-primary">
          <PanelHeader
            title="Unsaved changes"
            icon={Save}
            hint="Nothing is published until you save."
            action={
              <Badge tone={placeholders ? 'warning' : 'success'} dot>
                {placeholders === 0 ? 'No placeholders left' : `${placeholders} placeholder${placeholders === 1 ? '' : 's'} left on this page`}
              </Badge>
            }
          />
          <div className="flex flex-wrap items-center gap-2 p-4">
            <Button variant="primary" iconLeft={Save} onClick={save}>Save legal pages</Button>
            <Button onClick={() => { setDraft(null); setText({}) }}>Discard changes</Button>
            <p className="text-[12.5px] text-ink-3">Preview opens the published page, not this draft.</p>
          </div>
        </Panel>
      )}

      {confirmReset && (
        <Dialog onClose={() => setConfirmReset(null)} label={`Reset ${BASE_BY_SLUG[confirmReset].title}`} size="sm">
          <div className="border-b border-line px-5 py-4">
            <h2 className="font-serif text-[17px] font-semibold text-ink">Reset this page to the draft</h2>
            <p className="mt-0.5 text-[12.5px] text-ink-3">
              Every edit to {BASE_BY_SLUG[confirmReset].title} is discarded, including sections you added, and the page
              goes back to the wording that ships with the code. Nothing is published until you save.
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-2 px-5 py-4">
            <Button onClick={() => setConfirmReset(null)}>Keep my edits</Button>
            <Button variant="danger" iconLeft={RotateCcw} onClick={() => resetPage(confirmReset)}>Reset page</Button>
          </div>
        </Dialog>
      )}
    </PageContainer>
  )
}

/**
 * One clause. The paragraphs are edited as prose — a blank line starts a new
 * paragraph — because that is how the document reads, and a row of numbered
 * boxes would make re-ordering a sentence into a data-entry exercise.
 */
function SectionCard({
  slug,
  section,
  added = false,
  heading,
  paragraphs,
  bullets,
  needsReview,
  hidden,
  edited,
  onText,
  onHeading,
  onParagraphs,
  onBullets,
  onNeedsReview,
  onHidden,
  onReset,
  onRemove,
}: {
  slug: LegalSlug
  section: LegalSection
  added?: boolean
  heading: string
  paragraphs: string
  bullets: string
  needsReview: boolean
  hidden: boolean
  edited: boolean
  onText: (field: 'heading' | 'paragraphs' | 'bullets', value: string) => void
  onHeading: (value: string) => void
  onParagraphs: (value: string) => void
  onBullets: (value: string) => void
  onNeedsReview: (next: boolean) => void
  onHidden?: (next: boolean) => void
  onReset?: () => void
  onRemove?: () => void
}) {
  const fieldId = `legal-${slug}-${section.id}`
  return (
    <Panel className={hidden ? 'border-dashed' : undefined}>
      <PanelHeader
        title={heading || section.heading}
        hint={added ? 'Added section' : `#${section.id}`}
        icon={FileText}
        action={
          <>
            {hidden && <Badge tone="neutral">Hidden</Badge>}
            {!added && edited && <Badge tone="accent">Edited</Badge>}
            {onReset && (
              <Button size="sm" iconLeft={RotateCcw} disabled={!edited} onClick={onReset}>
                Reset this section to the draft
              </Button>
            )}
            {onRemove && (
              <Button size="sm" variant="danger" iconLeft={Trash2} onClick={onRemove}>Remove</Button>
            )}
          </>
        }
      />
      <div className="space-y-4 p-4">
        <Field label="Heading" htmlFor={`${fieldId}-heading`}>
          <TextInput
            id={`${fieldId}-heading`}
            value={heading}
            onChange={(event) => { onText('heading', event.target.value); onHeading(event.target.value) }}
          />
        </Field>

        <Field label="Paragraphs" htmlFor={`${fieldId}-paragraphs`} hint="Leave a blank line between paragraphs.">
          <Textarea
            id={`${fieldId}-paragraphs`}
            rows={Math.min(14, Math.max(4, paragraphs.split('\n').length + 1))}
            value={paragraphs}
            onChange={(event) => { onText('paragraphs', event.target.value); onParagraphs(event.target.value) }}
          />
        </Field>

        <Field label="Bullets" htmlFor={`${fieldId}-bullets`} hint="One per line. Leave empty for no list.">
          <Textarea
            id={`${fieldId}-bullets`}
            rows={Math.min(10, Math.max(3, bullets.split('\n').length + 1))}
            value={bullets}
            onChange={(event) => { onText('bullets', event.target.value); onBullets(event.target.value) }}
          />
        </Field>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <CheckRow
            checked={needsReview}
            onChange={onNeedsReview}
            label="Needs legal review"
            hint="Shows the warning badge beside this heading on the public page."
          />
          {onHidden && (
            <CheckRow
              checked={hidden}
              onChange={onHidden}
              label="Hide this section"
              hint="Removes it from the page and from the section index."
            />
          )}
        </div>
      </div>
    </Panel>
  )
}

/**
 * A checkbox with its words next to it. The box carries the accessible name,
 * and the text is a click target for the same toggle rather than a second
 * control, so a screen reader hears the setting once.
 */
function CheckRow({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
  hint: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={checked} onChange={onChange} label={label} />
      <span
        aria-hidden
        onClick={() => onChange(!checked)}
        className="cursor-pointer text-[12.5px] text-ink-2"
        title={hint}
      >
        {label}
      </span>
    </div>
  )
}
