# Nishany Study Rooms

The existing `/app/study-rooms` route now includes five clearly labelled preview rooms. Existing cohort rooms, room codes, legacy `?party=` links, shared tests and friends remain available.

## Experience

- Quiet Focus: 12 individual desks, 25-minute default block.
- Campus: 14 seats, including individual desks, pairs and a four-place shared table.
- Discussion: 8 independent places across two shared tables, with prominent Raise Hand controls.
- Library: 10 individual desks, warm furniture and a 50-minute default block.
- Courtyard: 16 seats across individual desks, four pairs and one shared table.

The default room is now a layered 2.5D scene matching the supplied daylight reference: independent realistic student sprites, oak tables, blue upholstered chairs, editable desktop items, tall windows and a central aisle. Front-facing and rear-facing versions place students across the discussion table. The character picker and desk preview use the same artwork. The optional 3D view retains real Three.js architecture, furniture and movement, with projected HTML seat buttons and an accessible seat list. Each seat has one coordinate shared by its desk, chair, student, hit target and label. Individual students face their desk with their backs toward the entrance; discussion students face inward. Nameplates use collision-aware placement with connectors to their seats and show identity, timer and status; selecting a student reveals their available profile, topic, goal and microphone state. Empty desks can be claimed; moving frees the previous place. Selecting a student opens a contextual panel. The session panel supplies a timestamp-based focus timer, goal, topic, status, progress and links into lectures, flashcards and MCQs.

Mobile defaults to My Session and a readable student list. The Room tab preserves the full-size floor plan with horizontal scrolling. Focus mode retains the timer and bottom dock, makes the surrounding interface inert, traps keyboard focus and exits with Escape. The existing shell dock retains the room and countdown during navigation elsewhere.

Students can stand, walk through open aisles and sit back down while retaining their reserved desk. Walking follows obstacle-aware routes around tables and other chairs. This movement is local and is not broadcast as live presence.

Desk personalisation includes four male and four female student models, iPhone, iPad, laptop, PC or Android phone, chair/desk variants, a bounded motivational note, and add/remove/reorder controls for the device, notebook, plant, cup and note. Preferences use the existing account-aware state store. The editor has a live rear-view 3D preview, one-click device choices, accessory toggles and drag or keyboard arrow ordering. Item footprints determine both placement and hand targets. Shared tables preserve their common furniture and expose chair/item choices. The note appears on the actual desk.

## Data and integration boundary

`src/lib/rooms/studyWorld.ts` defines room, presence, desk personalisation, status and focus session shapes without transport dependencies. Explicit sample classmates provide initial room presence. Sample counts do not claim to be live. Your goal and progress come from your own inputs and focus time; no study analytics are invented.

`RoomSessionProvider` owns membership, the existing voice/channel hooks and the new focus controller. The authenticated student's identity and university catalogue populate their desk. Focus survives in-app navigation; ending or switching rooms starts a fresh focus session. Demo membership and focus do not survive a full page reload. Saved desk preferences do.

Existing live cohort rooms retain server presence, authenticated seat claiming/movement and voice. The voice dock offers Entire room and My table audiences. Shared-table membership comes from the server-verified seat; the SFU checks it when listing, consuming and resuming audio. A failed membership read denies the request. Changing seats closes voice resources and tells all of that student’s open tabs to release the microphone; changing audience also requires rejoining voice. Live 20-seat layouts share the same table mapping on client and server. Deafen mutes current and newly attached remote audio elements. Preview rooms do not request a microphone or imply a connected voice call. New goal/status/hand/decorative presence fields are local pending a future server snapshot extension. Demo chat is explicitly local, has an empty state, and clears when the room view closes; live chat uses the existing PartyPage. New preview room styles are not yet provisioned as live backend rooms.

Loading/error states use the live room read with retry; offline status explains which features remain available. Empty desks and a first-student room state are provided. The surrounding interface inherits current CSS tokens across light, warm, dark and black themes. Architectural materials use oak, linen, muted upholstery, planted windows, bookcases, framed study prints and real shadows. Students have continuous cloth sleeves over articulated arms. Student hands type at a laptop, use a PC keyboard/mouse, write with a tablet stylus, or tap a held phone. Motion is illustrative sample activity, not telemetry. Both scene and desk preview have pause controls, respect reduced motion and stop offscreen or in a hidden tab; the main scene also pauses under the editor. Static architecture and furniture are batched by material, animation is capped at 24 fps, and shadows refresh less frequently. Desktop scenes and the close-up preview add soft contact occlusion; the mobile room uses the lighter direct renderer. Previews below the fold initialise lazily. Geometry, textures, animation frames and observers are disposed on exit. The new reference-based 2.5D room is the default and also appears if WebGL fails. Its artwork has loading and retry states; semantic seats remain available during asset failure. It retains selectable occupied and available desks, horizontal scrolling on mobile, and the accessible seat list. 3D view · move around opens the animated scene.

## Validation

`npm run build`

`node --test --experimental-strip-types src/lib/rooms/*.test.ts`

`node --test server/src/roomVoiceScope.test.js server/src/roomsRealtime.test.js server/src/roomsSfu.test.js`

70 frontend room tests and 65 server voice tests pass. The server suite includes actual SFU table-boundary checks, membership read failures, forged table IDs, and seat-change resets.

Browser checks cover non-overlapping nameplates, walking and sitting, switching between 2.5D and 3D, fallback seat changes, audience selection and reset, joining all five layouts, exact capacities, individual seat moves, customisation and ordering, timer continuity into MCQs, local chat, break/hand controls, focus keyboard containment, mobile session/map views and dark theme. Real multi-user voice requires the configured backend and was not exercised by the local preview.


Reference artwork and full generation prompts: [study-room-artwork.md](./study-room-artwork.md). The 2.5D figures are illustrative sprites; articulated hand/device animation and walking remain in 3D mode. This pass changes no voice transport.


Compact room update: desktop defaults to a height-aware fit that reserves space for the persistent controls, with Larger view / Fit to screen controls. Individual desks use up to three columns, paired desks retain two banks, and discussion rooms no longer carry a long empty floor. Mobile keeps a scrollable, readable room. Empty far-side chairs at discussion tables use front-facing artwork; near-side chairs keep the rear view.

### Current 2.5D room experience

The Library has 12 independent seats: two central four-seat round tables and four private desks on raised stone platforms. Its slate floor, paneled walls, warm sconces, walnut shelves, lamps and anatomical artwork are independent visual layers. Private desks have a non-interactive label; only semantic seat buttons select students or claim empty seats. The alternate 3D room and desk-preview switches have been removed.

Names are hidden by default. Seat badges use green for available, brown for occupied, and teal for your seat, with a visible legend and descriptive accessible names. Eight visible status choices include Reading, Watching Lecture, Practicing and Taking Notes alongside the original four. Status icons appear beside seat badges; a raised hand adds an upper-right character cue. Status, goal and hand state in preview rooms remain local.

Fit-to-screen sizes the room container itself and gives the remaining desktop width to the session rail. The rail has My Session and People tabs. My Session uses two compact columns without internal scrolling: timer and separate Continue studying shortcuts beside Your focus, topic and one-tap Status choices. Only People scrolls. The redundant below-room description and seat list have been removed. Floating controls reserve bottom page space. Chat is anchored within the room column and cannot overlap the session rail; preview messages remain local in memory. Connected rooms continue to use the existing PartyPage chat transport.

Student details are a compact anchored popover with viewport clamping, Escape/outside-click dismissal, and focus restoration. Empty-seat selection does not open an unnecessary self-details popover. The desk editor shows a front-facing student with correctly oriented device backs. Twenty character identities have registered front, rear-chair and rear-stool views. Room chooser previews are compact enough for more cards per screen.

Character artwork and full prompts: [study-room-character-variations.md](study-room-character-variations.md).
