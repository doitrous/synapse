import { WifiOff } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { useOnlineStatus } from '@/lib/useOnlineStatus'
import { useT } from '@/lib/i18n'

/**
 * Slim top-of-viewport notice that the tab has dropped offline.
 *
 * ponytail: fixed overlay rather than reserving layout space, so it never has
 * to coordinate with Topbar's own `sticky top-0`. It overlaps the very top of
 * Topbar for the ~2rem it's visible. If that clipping ever bothers someone,
 * the fix is a scroll-margin/offset on Topbar, not two sticky elements
 * negotiating stacking order.
 */
export function OfflineBanner() {
  const online = useOnlineStatus()
  const t = useT()
  if (online) return null
  return (
    <div
      role="status"
      className="animate-fade fixed inset-x-0 top-0 z-50 flex items-center justify-center gap-2 border-b border-line bg-ink px-3 py-1.5 pt-[calc(0.375rem+env(safe-area-inset-top))] text-center text-[12.5px] font-medium text-paper"
    >
      <Icon icon={WifiOff} size={14} />
      {t("You're offline — changes will sync when you reconnect")}
    </div>
  )
}
