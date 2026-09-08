import { DEFAULT_PERSONALISATION, STUDENT_MODELS, type StudyPresence, type StudyRoomDefinition } from './studyWorld.ts'

/** Lobby counts are current, but seat identities are private to room members.
 * Illustrate exactly that count without inventing names or speaking activity. */
export function roomPreviewSeats(world: StudyRoomDefinition, members: number): (StudyPresence | null)[] {
  const count = Math.max(0, Math.min(world.capacity, Math.floor(Number.isFinite(members) ? members : 0)))
  return Array.from({ length: world.capacity }, (_, index) => index < count ? {
    id: `occupied-${index}`, name: 'Occupied seat', seatIndex:index,
    seat: { desk:'plain', device:index % 4 === 1 ? 'tablet' : 'laptop', chair:'office' },
    studying:true, speaking:false,
    personalisation: {...DEFAULT_PERSONALISATION, model:STUDENT_MODELS[index % STUDENT_MODELS.length].id, items:['device','notebook'], note:''},
  } : null)
}
