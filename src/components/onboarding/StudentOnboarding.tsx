import { useState } from 'react'
import { GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { universities as seededUniversities, YEARS } from '@/data/universities'
import { usePersistentState } from '@/lib/usePersistentState'
import { SELF_AUDIENCE_STORAGE_KEY, useIdentity, type SelfDeclaredAudience } from '@/lib/useIdentity'
import { useT } from '@/lib/i18n'

/**
 * Asked once, when nobody knows where this student studies.
 *
 * Their university and year decide which timetable, which curriculum mapping and
 * which scoped content applies. Without them those surfaces match nothing, and
 * the app previously just explained that in a banner and carried on being empty.
 *
 * The roster still wins wherever it has an answer — see useIdentity. This only
 * fills a gap, and it can be changed afterwards from the account page.
 */
export function StudentOnboarding() {
  const t = useT()
  const { audienceUnknown, status } = useIdentity()
  const [configured] = useUniversityCatalogue()
  const [saved, setSaved] = usePersistentState<SelfDeclaredAudience | null>(SELF_AUDIENCE_STORAGE_KEY, null)
  const [dismissed, setDismissed] = useState(false)

  const [universityId, setUniversityId] = useState('')
  const [year, setYear] = useState('')
  const [group, setGroup] = useState('')

  // An admin-configured catalogue is the real list; the seeded schools stand in
  // when none has been set up yet, so this is never an empty dropdown.
  const universities = configured.length ? configured : seededUniversities

  // Nothing to ask while identity is still loading, or once it is answered.
  if (status === 'loading' || !audienceUnknown || saved || dismissed) return null

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!universityId || !year) return
    setSaved({ universityId, year, group: group.trim() })
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-pop">
        <div className="border-b border-line px-6 py-5">
          <span className="grid size-10 place-items-center rounded-xl bg-primary-tint text-primary-strong"><Icon icon={GraduationCap} size={20} /></span>
          <h2 id="onboarding-title" className="mt-3 font-serif text-[20px] font-semibold text-ink">{t('Where do you study?')}</h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">
            {t('This decides which timetable and which year’s content you see. You can change it later in your account.')}
          </p>
        </div>

        <form className="space-y-4 px-6 py-5" onSubmit={submit}>
          <Field label={t('University')} htmlFor="onboarding-university">
            <Select id="onboarding-university" value={universityId} onChange={(event) => setUniversityId(event.target.value)} required>
              <option value="">{t('Choose your university')}</option>
              {universities.map((university) => (
                <option key={university.id} value={university.id}>{university.name}</option>
              ))}
            </Select>
          </Field>

          <Field label={t('Year')} htmlFor="onboarding-year">
            <Select id="onboarding-year" value={year} onChange={(event) => setYear(event.target.value)} required>
              <option value="">{t('Choose your year')}</option>
              {YEARS.map((option) => <option key={option} value={option}>{option}</option>)}
            </Select>
          </Field>

          <Field label={t('Group')} htmlFor="onboarding-group" hint={t('Optional — your clinical or tutorial group, if you have one.')}>
            <TextInput id="onboarding-group" value={group} onChange={(event) => setGroup(event.target.value)} maxLength={24} />
          </Field>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button type="submit" variant="primary" disabled={!universityId || !year}>{t('Save')}</Button>
            {/* Nothing here is required to use the app, so there is a way past it. */}
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="inline-flex min-h-11 items-center rounded-lg px-3 text-[13px] font-medium text-ink-2 hover:bg-inset hover:text-ink sm:min-h-9"
            >
              {t('Not now')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
