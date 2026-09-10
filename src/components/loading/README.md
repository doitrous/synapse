# Loading layouts

`routeSkeletons.ts` maps mounted student, admin, public and authentication routes to their loading layout. Aliases resolve to the destination layout. `routeSkeletons.test.ts` checks coverage against the router, including nested import and reader routes.

`PageSkeleton` composes the page header, navigation, controls and content. `ContentSkeleton` reuses a body inside an already rendered page. Use the dedicated calendar, question, deck, room and media components when loading a smaller region. Dashboard sections have separate components in `DashboardSkeletons.tsx`.

`InitialReadBoundary` keeps the page mounted while its initial documents arrive. `usePersistentState` and content hooks report initial read status through `InitialReadContext`; their default data stays inert and hidden until ready. The boundary stops observing after the initial successful read, so saves and background revalidation preserve the working page. The dashboard uses independent section loaders. Readers, canvases and room scenes retain their own loading boundaries to preserve viewport measurements.

For a direct asynchronous request, render its matching skeleton only during the initial read. Keep existing data visible during refresh. `AsyncSurface` supports a matching `fallback`, error and empty state; it never renders children during a loading delay. A failed read must show its error rather than an endless skeleton. A loaded empty collection must show its empty state.

Skeleton blocks are decorative. `LoadingRegion` announces a loading region once, hides its bars from assistive technology, and exposes no interactive controls. Colors use the active theme and animation respects the app's reduced-motion setting. Action progress (saving, uploading or importing) remains on the action itself.
