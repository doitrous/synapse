import { Fragment, useMemo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { isPlainInline, tokenizeInline } from '@/lib/inlineMarkup'

/**
 * Renders the inline markup authored content uses, as React elements.
 *
 * The student app had no renderer at all, so `**bold**` and `` `code` `` reached
 * the page as literal characters. This closes that gap without opening an HTML
 * injection path: tokens become elements, never markup strings.
 *
 * `children` is an escape hatch for callers that have already turned the text
 * into nodes of their own — concept highlighting, media anchors, search
 * highlighting — so those passes compose with this one instead of fighting it.
 */
export function RichText({ text, className }: { text: string; className?: string }): ReactNode {
  const tokens = useMemo(() => (isPlainInline(text) ? null : tokenizeInline(text)), [text])

  // The overwhelmingly common case: prose with no markers at all.
  if (!tokens) return className ? <span className={className}>{text}</span> : text

  const rendered = tokens.map((token, index) => {
    const key = `${token.kind}-${index}`
    switch (token.kind) {
      case 'strong':
        return <strong key={key} className="font-semibold text-ink">{token.text}</strong>
      case 'underline':
        return <u key={key} className="underline decoration-1 underline-offset-2">{token.text}</u>
      case 'em':
        return <em key={key} className="italic">{token.text}</em>
      case 'code':
        return (
          <code key={key} className="rounded bg-inset px-1 py-0.5 font-mono text-[0.9em] text-ink">
            {token.text}
          </code>
        )
      case 'link':
        return token.href.startsWith('/')
          ? <Link key={key} to={token.href} className="font-medium text-primary-strong underline decoration-primary-line underline-offset-2 hover:text-primary">{token.text}</Link>
          : <a key={key} href={token.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary-strong underline decoration-primary-line underline-offset-2 hover:text-primary">{token.text}</a>
      default:
        return <Fragment key={key}>{token.text}</Fragment>
    }
  })

  return className ? <span className={className}>{rendered}</span> : <>{rendered}</>
}
