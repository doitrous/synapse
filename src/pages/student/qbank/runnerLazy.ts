import { lazy, type ComponentType } from 'react'

/**
 * A component that can also be fetched before it is rendered, so a click that
 * needs it lands on code already in memory — the same shape as the router's
 * own `lazyNamed` (see `src/router.tsx`), duplicated here because these are
 * qbank-runner chunks rather than routes.
 */
type Preloadable<P> = ComponentType<P> & { preload: () => void }

/**
 * Keeps each export's real prop types through the lazy wrapper — inferred from
 * the module type — so callers still get their props checked (the router's own
 * `lazyNamed` is for routes and takes none, so it can stay untyped).
 */
function lazyNamed<M, K extends keyof M>(
  loader: () => Promise<M>,
  exportName: K,
): M[K] extends ComponentType<infer P> ? Preloadable<P> : never {
  const component = lazy(
    async () => ({ default: (await loader())[exportName] as ComponentType<unknown> }),
  ) as unknown as Preloadable<unknown>
  // The browser caches the module, so repeated calls cost one request at most,
  // and a failure here is silent: it only means the click pays for it instead.
  component.preload = () => { void loader().catch(() => undefined) }
  return component as unknown as M[K] extends ComponentType<infer P> ? Preloadable<P> : never
}

// None of this is on screen while a student is on the setup/hub — only a
// start, a resume, a review, a retake, or the Previous tab reaches it — so it
// has no business in the chunk that paints the hub itself.
export const LazyMixedRunner = lazyNamed(() => import('@/components/qbank/unified/MixedRunner'), 'MixedRunner')
export const LazyMixedSummary = lazyNamed(() => import('@/components/qbank/unified/MixedSummary'), 'MixedSummary')
export const LazyPreviousTests = lazyNamed(() => import('./PreviousTests'), 'PreviousTests')
export const LazyQuestionNavigator = lazyNamed(() => import('@/components/qbank/QuestionNavigator'), 'QuestionNavigator')
export const LazyStudyRail = lazyNamed(() => import('@/components/qbank/StudyRail'), 'StudyRail')
export const LazyMediaAttachmentView = lazyNamed(() => import('@/components/ui/MediaAttachmentView'), 'MediaAttachmentView')
export const LazyZoomableImage = lazyNamed(() => import('@/components/ui/MediaAttachmentView'), 'ZoomableImage')
export const LazyAnswerStatBar = lazyNamed(() => import('@/components/qbank/AnswerStatBar'), 'AnswerStatBar')
export const LazyReportContentDialog = lazyNamed(() => import('@/components/reports/ReportContentDialog'), 'ReportContentDialog')
export const LazyQuickAddFlashcardDialog = lazyNamed(() => import('@/components/flashcards/QuickAddFlashcardDialog'), 'QuickAddFlashcardDialog')
export const LazyEndSessionDialog = lazyNamed(() => import('@/components/qbank/EndSessionDialog'), 'EndSessionDialog')

/** Everything the running/results/review screen needs once a sitting is open. */
export function preloadRunnerSurface(): void {
  LazyQuestionNavigator.preload()
  LazyStudyRail.preload()
  LazyMediaAttachmentView.preload()
  LazyZoomableImage.preload()
  LazyAnswerStatBar.preload()
  LazyReportContentDialog.preload()
  LazyQuickAddFlashcardDialog.preload()
  LazyEndSessionDialog.preload()
}

/** Direction 2's runner, and its end-of-sitting report. */
export function preloadMixedRunner(): void {
  LazyMixedRunner.preload()
  LazyMixedSummary.preload()
}

export function preloadPreviousTests(): void {
  LazyPreviousTests.preload()
}
