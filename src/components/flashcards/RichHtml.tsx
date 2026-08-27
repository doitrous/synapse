import { useMemo } from 'react'
import { cn } from '@/lib/cn'
import { sanitizeRich } from '@/data/flashcards/richText'

/**
 * Render a stored rich-text field.
 *
 * Fields are sanitized on the way *in* (`sanitizeRich` in the authoring path),
 * but this re-sanitizes on the way *out* too — defence in depth, so a field that
 * somehow reached storage unsanitized (an old import, a hand-edited document)
 * still cannot inject anything when it is shown. Only after that pass is the
 * result handed to `dangerouslySetInnerHTML`, and by then it is a string built
 * from a fixed allowlist of tags and attributes, nothing executable.
 */
export function RichHtml({ html, className }: { html: string; className?: string }) {
  const safe = useMemo(() => sanitizeRich(html), [html])
  return (
    <div
      className={cn('fc-rich leading-relaxed', className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  )
}
