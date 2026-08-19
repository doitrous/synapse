import { Badge } from './Badge'

type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger'

const MAP: Record<string, Tone> = {
  // success
  Published: 'success',
  Paid: 'success',
  Active: 'success',
  Completed: 'success',
  Resolved: 'success',
  Sent: 'success',
  Connected: 'success',
  Enabled: 'success',
  pass: 'success',
  // warning
  'In review': 'warning',
  Pending: 'warning',
  Scheduled: 'warning',
  'In progress': 'warning',
  warn: 'warning',
  // accent (needs attention, neutral-positive)
  Open: 'primary',
  // neutral
  Draft: 'neutral',
  Archived: 'neutral',
  Refunded: 'neutral',
  Disconnected: 'neutral',
  // danger
  Failed: 'danger',
  fail: 'danger',
}

const LABEL: Record<string, string> = { pass: 'Pass', warn: 'Warning', fail: 'Fail' }

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge tone={MAP[status] ?? 'neutral'} dot>
      {LABEL[status] ?? status}
    </Badge>
  )
}
