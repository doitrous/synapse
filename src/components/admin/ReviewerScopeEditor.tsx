import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { EntityPicker, type PickerOption } from '@/components/admin/EntityPicker'
import { moduleOptions } from '@/components/admin/pickerOptions'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { setUserScope } from '@/lib/useAdminUsers'

/**
 * Which modules and years a reviewer may write.
 *
 * A reviewer with nothing assigned holds no content — empty tables and every
 * save refused. That is deliberate: hiring somebody for Year 2 anatomy should
 * not begin by giving them everything and trusting them to stay put. The
 * warning below says so plainly rather than leaving an empty state to be read
 * as a bug.
 *
 * Years are chosen as university-scoped ids (KAU_Y1, OMS_Y2) rather than the
 * plain labels the content editors write. The id is the only form that names a
 * university, and without it "Year 2" would hand a reviewer at one university
 * every other university's second year.
 */
export function ReviewerScopeEditor({ userId, scope, onSaved }: {
  userId: string
  scope: { moduleIds: string[]; yearIds: string[] } | null
  onSaved: () => void
}) {
  const [catalogue] = useUniversityCatalogue()
  const modulePicks = useMemo(() => moduleOptions(catalogue), [catalogue])
  const yearPicks = useMemo<PickerOption[]>(() => catalogue.flatMap((university) =>
    university.years.map((year) => ({
      id: year.id,
      label: year.year,
      sublabel: year.id,
      group: university.short,
    }))), [catalogue])

  const [moduleIds, setModuleIds] = useState<string[]>(scope?.moduleIds ?? [])
  const [yearIds, setYearIds] = useState<string[]>(scope?.yearIds ?? [])
  const [reason, setReason] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const empty = moduleIds.length === 0 && yearIds.length === 0

  async function save() {
    setSaving(true)
    setMessage(null)
    try {
      await setUserScope(userId, { moduleIds, yearIds, reason })
      setMessage('Scope saved, and recorded in the account audit.')
      setReason('')
      onSaved()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save that scope.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-3 px-4 py-4">
      <div>
        <p className="text-[13px] font-semibold text-ink">What this reviewer may edit</p>
        <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-2">
          They see and can change content tagged with any of these modules or years. Everything else is hidden, and
          refused by the server if they reach for it another way.
        </p>
      </div>
      <EntityPicker label="Modules" noun="modules" options={modulePicks} selected={moduleIds} onChange={setModuleIds} />
      <EntityPicker label="Years" noun="years" options={yearPicks} selected={yearIds} onChange={setYearIds} />
      {empty && (
        <p className="rounded-lg border border-warning/40 bg-warning-tint px-3 py-2.5 text-[11.5px] leading-relaxed text-ink-2">
          With nothing assigned this reviewer holds no content: every content table reads empty and every save is
          refused. Assign at least one module or year.
        </p>
      )}
      {catalogue.length === 0 && (
        <p className="text-[11.5px] leading-relaxed text-ink-3">
          No universities have been set up yet, so there are no modules or years to assign. Add them in Academic Setup first.
        </p>
      )}
      <Field label="Reason" hint="Minimum 8 characters; stored in the account audit">
        <TextInput value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Why this reviewer covers these modules" />
      </Field>
      <Button variant="primary" size="sm" loading={saving} disabled={reason.trim().length < 8} onClick={() => void save()}>
        Save scope
      </Button>
      {message && <p role="status" className="text-[11.5px] leading-relaxed text-ink-2">{message}</p>}
    </div>
  )
}
