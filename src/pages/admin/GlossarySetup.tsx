import { useMemo, useState } from 'react'
import { BookA, Check, Plus, Trash2, Upload, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Field, SearchInput, Select, TextInput, Textarea } from '@/components/ui/Field'
import { FilterChip } from '@/components/ui/FilterChip'
import { useMedicalGlossary } from '@/data/glossaryStore'
import { MED_CATEGORIES, starterGlossary, termForms, type MedTermCategory, type MedicalTerm } from '@/data/glossary'

function blankTerm(category: MedTermCategory): MedicalTerm {
  return { id: `term-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`, term: '', ar: '', category, def: '', defAr: '', example: '' }
}

/**
 * Edit the bilingual glossary students read.
 *
 * The glossary used to be a source literal with no admin surface at all: a
 * mistranslation could only be corrected by editing TypeScript and
 * redeploying. It is now a shared document, written here and read by
 * `/app/taxonomy`.
 *
 * The starter set is loaded by an explicit button, never automatically. An
 * auto-seed on empty would rewrite the document every time this page opened,
 * quietly undoing whatever an admin had changed.
 */
export function GlossarySetup() {
  const [glossary, setGlossary] = useMedicalGlossary()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<MedTermCategory | 'all'>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [confirmLoad, setConfirmLoad] = useState(false)

  const categories = glossary.categories
  const needle = query.trim().toLowerCase()
  const filtered = useMemo(
    () => glossary.terms.filter((term) => {
      if (category !== 'all' && term.category !== category) return false
      if (!needle) return true
      return `${term.term} ${term.ar} ${term.def} ${term.defAr}`.toLowerCase().includes(needle)
    }),
    [category, glossary.terms, needle],
  )
  const editing = glossary.terms.find((term) => term.id === editingId) ?? null

  function patchTerm(id: string, patch: Partial<MedicalTerm>) {
    setGlossary((current) => ({ ...current, terms: current.terms.map((term) => term.id === id ? { ...term, ...patch } : term) }))
  }

  /**
   * Add one term.
   *
   * This did nothing in production. A live glossary starts as EMPTY_GLOSSARY, so
   * `categories` was `[]`, the button was disabled, and the only thing that ever
   * populated categories was "Load starter glossary" — which is offered only while
   * there are no terms. A glossary with terms but no categories was stuck for good.
   *
   * The categories are a fixed set, not user-authored, so a missing one is simply a
   * document that has not met them yet. They are filled in on demand.
   */
  function addTerm() {
    const known = categories.length ? categories : MED_CATEGORIES.map((entry) => ({ ...entry }))
    const term = blankTerm(known[0].key)
    setGlossary((current) => ({ ...current, categories: current.categories.length ? current.categories : known, terms: [term, ...current.terms] }))
    setEditingId(term.id)
  }

  function removeTerm(id: string) {
    setGlossary((current) => ({ ...current, terms: current.terms.filter((term) => term.id !== id) }))
    if (editingId === id) setEditingId(null)
  }

  function loadStarter() {
    setGlossary(starterGlossary())
    setConfirmLoad(false)
  }

  return (
    <PageContainer>
      <PageHeader
        title="Glossary"
        description="The bilingual medical dictionary students read at Medical Taxonomy. Edits here are live."
        actions={
          <>
            {glossary.terms.length === 0 && (
              <Button variant="secondary" size="md" onClick={() => setConfirmLoad(true)}>Load starter glossary</Button>
            )}
            <Link to="/admin/glossary/import"><Button variant="secondary" size="md" iconLeft={Upload}>Bulk import</Button></Link>
            <Button variant="primary" size="md" iconLeft={Plus} onClick={addTerm}>Add term</Button>
          </>
        }
      />

      {confirmLoad && (
        <Panel className="mb-4 border-accent-line p-4">
          <p className="text-[13.5px] font-medium text-ink">Load the starter glossary?</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">
            This writes {starterGlossary().terms.length} terms and {starterGlossary().categories.length} categories into the live glossary. It is only offered while the glossary is empty, so nothing you have written can be overwritten.
          </p>
          <div className="mt-3 flex gap-2">
            <Button variant="primary" size="sm" iconLeft={Check} onClick={loadStarter}>Load them</Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirmLoad(false)}>Cancel</Button>
          </div>
        </Panel>
      )}

      {glossary.terms.length === 0 && !confirmLoad ? (
        <Panel className="p-10">
          <EmptyState
            icon={BookA}
            title="The glossary is empty"
            description="Students see an empty Medical Taxonomy page until terms are published here. Load the starter set to begin, import a batch, or add terms one at a time."
            action={<Button variant="primary" size="sm" iconLeft={Plus} onClick={addTerm}>Add the first term</Button>}
          />
        </Panel>
      ) : (
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)]">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a term…" className="w-full sm:max-w-xs" />
              <span className="ms-auto text-[12.5px] text-ink-3"><span className="tnum font-mono text-ink-2">{filtered.length}</span> of {glossary.terms.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>All</FilterChip>
              {categories.map((item) => (
                <FilterChip key={item.key} active={category === item.key} onClick={() => setCategory(item.key)}>{item.key}</FilterChip>
              ))}
            </div>
            <Panel>
              <ul className="divide-y divide-line">
                {filtered.map((term) => (
                  <li key={term.id} className="flex items-center gap-3 px-4 py-3">
                    <button type="button" onClick={() => setEditingId(term.id)} className="min-w-0 flex-1 text-left">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-[13.5px] font-medium text-ink">{termForms(term.term).head || 'Untitled term'}</span>
                        <span lang="ar" dir="rtl" className="truncate text-[13px] text-accent-strong">{termForms(term.ar).head}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-[12px] text-ink-3">
                        {term.category}
                        {/* A family row would otherwise truncate to an ellipsis mid-word. */}
                        {termForms(term.term).variants.length > 0 &&
                          ` · ${termForms(term.term).variants.length} more form${termForms(term.term).variants.length === 1 ? '' : 's'}`}
                      </span>
                    </button>
                    {(!term.term.trim() || !term.ar.trim() || !term.def.trim()) && <Badge tone="warning">Incomplete</Badge>}
                    <IconButton icon={Trash2} label={`Delete ${term.term}`} size="sm" onClick={() => removeTerm(term.id)} />
                  </li>
                ))}
                {filtered.length === 0 && <li className="px-4 py-8 text-center text-[13px] text-ink-3">No term matches that search.</li>}
              </ul>
            </Panel>
          </div>

          <Panel className="lg:sticky lg:top-[4.5rem]">
            <PanelHeader
              title={editing ? 'Edit term' : 'Select a term'}
              icon={BookA}
              action={editing ? <IconButton icon={X} label="Close" size="sm" onClick={() => setEditingId(null)} /> : undefined}
            />
            {editing ? (
              <div className="space-y-4 p-5">
                <Field label="Term (English)"><TextInput value={editing.term} onChange={(event) => patchTerm(editing.id, { term: event.target.value })} /></Field>
                <Field label="Term (Arabic)"><TextInput value={editing.ar} onChange={(event) => patchTerm(editing.id, { ar: event.target.value })} dir="rtl" lang="ar" /></Field>
                <Field label="Category">
                  <Select value={editing.category} onChange={(event) => patchTerm(editing.id, { category: event.target.value as MedTermCategory })}>
                    {categories.map((item) => <option key={item.key} value={item.key}>{item.key}</option>)}
                  </Select>
                </Field>
                <Field label="Explanation (English)"><Textarea value={editing.def} onChange={(event) => patchTerm(editing.id, { def: event.target.value })} className="min-h-20" /></Field>
                <Field label="Explanation (Arabic)"><Textarea value={editing.defAr} onChange={(event) => patchTerm(editing.id, { defAr: event.target.value })} className="min-h-20" dir="rtl" lang="ar" /></Field>
                <Field label="Example" hint="Optional — how the term is used in a sentence">
                  <TextInput value={editing.example ?? ''} onChange={(event) => patchTerm(editing.id, { example: event.target.value })} />
                </Field>
                <p className="border-t border-line pt-3 text-[11.5px] leading-relaxed text-ink-3">
                  Changes save as you type and are live for students immediately.
                </p>
              </div>
            ) : (
              <p className="p-8 text-center text-[13px] text-ink-3">Pick a term from the list to edit it.</p>
            )}
          </Panel>
        </div>
      )}
    </PageContainer>
  )
}
