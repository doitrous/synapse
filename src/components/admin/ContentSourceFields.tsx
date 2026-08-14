import type { ContentSource } from '@/data/contentControl'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'

/**
 * Where this item came from.
 *
 * Admin-only, and deliberately so: a student is never told whether a question was
 * written here or taken from a faculty's paper. It exists so that a batch which
 * arrived together can be found, reviewed, and retired together instead of
 * dissolving into the catalogue the moment it is imported.
 *
 * Choosing "written here" clears the record rather than storing an origin meaning
 * "none", so an item with no provenance and an item explicitly marked internal are
 * the same thing — there is only one way for the catalogue to say "ours".
 */
export function ContentSourceFields({ source, onChange }: {
  source?: ContentSource
  onChange: (source: ContentSource | undefined) => void
}) {
  const [catalogue] = useUniversityCatalogue()
  const origin = source?.origin ?? 'internal'
  const patch = (next: Partial<ContentSource>) => onChange({ origin: 'university', ...source, ...next })

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="Where this came from" htmlFor="source-origin">
        <Select
          id="source-origin"
          value={origin}
          onChange={(event) => onChange(event.target.value === 'university' ? { ...source, origin: 'university' } : undefined)}
        >
          <option value="internal">Written here</option>
          <option value="university">University or college source</option>
        </Select>
      </Field>

      {origin === 'university' && (
        <>
          <Field label="University" htmlFor="source-university">
            <Select id="source-university" value={source?.universityId ?? ''} onChange={(event) => patch({ universityId: event.target.value || undefined })}>
              <option value="">— Not in the catalogue —</option>
              {catalogue.map((university) => <option key={university.id} value={university.id}>{university.short} · {university.name}</option>)}
            </Select>
          </Field>
          <Field label="College or faculty" htmlFor="source-institution" hint="Only needed when the university is not in the catalogue.">
            <TextInput id="source-institution" value={source?.institution ?? ''} onChange={(event) => patch({ institution: event.target.value })} placeholder="e.g. Faculty of Medicine" />
          </Field>
          <Field label="Paper or exam" htmlFor="source-reference" hint="What this was taken from.">
            <TextInput id="source-reference" value={source?.reference ?? ''} onChange={(event) => patch({ reference: event.target.value })} placeholder="e.g. 2024 final, paper 2" />
          </Field>
        </>
      )}
    </div>
  )
}
