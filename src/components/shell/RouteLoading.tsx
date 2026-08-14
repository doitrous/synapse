/**
 * What a surface looks like while its chunk is still arriving.
 *
 * This used to be the words "Opening Synapse…" centred in an empty page, in
 * English regardless of the chosen language. A block of prose announcing a wait
 * makes a fast load feel like a slow one; a shape that matches what is about to
 * appear reads as the page already being there. With route chunks now
 * prefetched on hover this should rarely be seen at all.
 */
export function RouteLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6" role="status" aria-busy="true">
      <span className="sr-only">Loading</span>
      <div className="animate-fade">
        <div className="h-7 w-56 rounded-md bg-inset" />
        <div className="mt-3 h-4 w-80 max-w-full rounded bg-inset/70" />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="rounded-xl border border-line bg-surface p-4 shadow-panel">
              <div className="h-4 w-2/3 rounded bg-inset" />
              <div className="mt-2.5 h-3 w-full rounded bg-inset/70" />
              <div className="mt-1.5 h-3 w-4/5 rounded bg-inset/70" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
