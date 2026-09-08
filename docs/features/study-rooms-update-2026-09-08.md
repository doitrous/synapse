# Study Rooms update — 8 September 2026

## Local implementation

- Room cards share the actual 2.5D room layout. Their thumbnail population follows the room's member count; it illustrates occupancy, not private student identities or exact live seat locations. Connected room lists refresh every 15 seconds and when the window regains focus.
- Your Rooms, Global Rooms, and University Rooms use the same compact card. Global audience choices include all universities and the student's university across all years.
- Friends occupies a single readable column, with discoverability opt-in and an Add action. Exact username search returns matching profiles and university details; sending a request is a separate explicit action. Existing pending requests and friendships are shown. The dialog keeps input focus across edits.
- The session panel stacks the timer and plan when its available width is 520px or less. Personalise Desk follows Status; Continue Studying is last.
- The companion popup sits at the bottom left, follows sidebar width, and includes focus, break, hand raise, room, voice and study shortcuts. A reserved bottom area keeps scrolling page controls clear of the popup.
- Shared Tests has been removed from the room landing page. Shared tests and games can still be opened inside a room, for the whole room or the student's table.
- Five new layouts: collaboration (24), duo (2), café (24), lab (18), and garden (16). The shared layout definition controls rendering, seat validation and table voice/activity boundaries.
- Desk items have stable positions; devices have distinct form factors and face the student in the front preview. Six chair styles are available in the preview and room. Fifty motivational reminders are included.
- In-app room and table invitations require acceptance, expire, and recheck table availability.

## Ready-game catalogue

Ten sets each are bundled for Term Grid, Term Match, Spotter, Clinical Sequence, Mechanism Chain, Red Flag Sort and Maristanas practice (70 total). Shared games mark answers on the server and omit answer keys from student state.

Foundational anatomy and physiology references are recorded beside the sets in `server/shared/foundationGames.js` and `server/shared/foundationSpotters.js`. Recognition scenarios cite NHS guidance; handwashing cites WHO. Spotter figures are original simplified teaching schematics. Source checking is not clinical peer review, and the metadata states this explicitly. The hospital sets are practice rounds, separate from the main hospital's earned-credit progression.

## Verification

- Production build succeeds.
- Frontend suite: 2,183 tests, including the expanded game-catalogue import assertion.
- Complete server suite: 708 tests pass, including realtime/voice checks with temporary local network ports enabled.
- Targeted lint has no errors; the existing provider export warning remains.
- Browser checks: room thumbnails, Friends layout, username search results, continuous input focus, narrow session layout, desk/device/chair previews, companion/sidebar movement, phone overflow and popup clearance, and a playable Spotter round.

## Deployment requirements

No real friend requests or invitations were sent during local verification. A successful local build is not evidence of a completed production deployment.

A production release needs the frontend and server changes together, the bundled study-room and game assets, and migration `server/migrations/0007_study_room_worlds.sql`. Apply through the established root-Dockerfile/Coolify deployment, whose migration runner applies ordered SQL files. Preserve all existing room memberships and content.

Before calling the release live, verify on the deployed app: all seven game categories show ten ready sets; two signed-in test accounts can accept a friend request and room/table invitations; public/private and cohort/university/global discovery obey scope; table-only activities and voice stay within the chosen table; changed chair and seat preferences persist after reconnecting. Database-backed and multi-account production verification remains outstanding.
