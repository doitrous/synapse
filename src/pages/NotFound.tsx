import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { Button } from '@/components/ui/Button'

export function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-10 text-center shadow-panel">
        <div className="mb-6 flex justify-center">
          <Wordmark />
        </div>
        <p className="tnum font-mono text-[13px] text-ink-3">404</p>
        <h1 className="mt-2 font-serif text-[26px] font-semibold tracking-[-0.02em] text-ink">
          This page isn't on the chart
        </h1>
        <p className="mt-2 text-[14px] text-ink-2">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-6 flex justify-center">
          <Link to="/">
            <Button variant="primary" size="md" iconLeft={ArrowLeft}>
              Back to start
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
