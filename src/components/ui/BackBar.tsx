import { useLocation, useNavigate, type Location } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n'

interface FromState { from?: string; fromLabel?: string }

/** Build the navigation state that lets a destination show a "back" button. */
export function backState(location: Location, label: string): FromState {
  return { from: `${location.pathname}${location.search}`, fromLabel: label }
}

/**
 * A back button shown only when the student arrived here from another in-app
 * context (a question, a practical case, or a library reading). Returns them to
 * the exact place they left. Renders nothing on a direct visit.
 */
export function BackBar() {
  const t = useT()
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as FromState | null
  if (!state?.from) return null
  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={() => navigate(state.from!)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium text-ink-2 shadow-panel transition-colors hover:border-primary-line hover:text-primary-strong"
      >
        <Icon icon={ArrowLeft} size={15} className="rtl:-scale-x-100" />
        {state.fromLabel || t('Back')}
      </button>
    </div>
  )
}
