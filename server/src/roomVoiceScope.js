/** Live cohort rooms have eight individual desks, four pairs and one four-seat table. */
import { tableForSeat } from '../shared/roomLayouts.js'
export const liveTableForSeat=tableForSeat
export function voiceAudience(requested, seatIndex, layoutKey='legacy') {
  if (requested === undefined || requested === 'room') return { scope: 'room', tableId: null }
  if (requested !== 'table') throw new Error('invalid_voice_audience')
  const tableId = liveTableForSeat(seatIndex,layoutKey)
  if (!tableId) throw new Error('sit_at_shared_table_first')
  return { scope: 'table', tableId }
}
export function mayHear(audience, listenerTableId) {
  return !audience || audience.scope === 'room' || Boolean(audience.scope === 'table' && audience.tableId && audience.tableId === listenerTableId)
}
