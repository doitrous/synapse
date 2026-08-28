import type { ContentReport } from '@/data/contentReports'

/**
 * Client mirror of `deletionConfirmed` in `server/src/contentReports.js`.
 *
 * The server is the actual gate — this only decides when the "Delete
 * permanently" button may be pressed at all, so a superadmin gets an inline
 * "that doesn't match" instead of firing the request and finding out from a
 * 400. Whatever this accepts, the server re-checks byte for byte.
 */
export function deletionConfirmed(report: Pick<ContentReport, 'id' | 'contentTitle'>, confirmation: string): boolean {
  const typed = confirmation.trim()
  if (!typed) return false
  return typed === report.id.trim() || typed === report.contentTitle.trim()
}
