import { MOTIVATIONAL_REMINDERS } from './motivation.ts'
import type { SeatOccupant } from './roomPresence.ts'

/** Transport-neutral model. Mock presence and future room snapshots use this same shape. */
export type RoomStyle = 'quiet' | 'campus' | 'discussion' | 'library' | 'courtyard' | 'collaboration' | 'duo' | 'cafe' | 'lab' | 'garden'
export const STUDY_STATUSES = ['Focusing', 'Reading', 'Watching Lecture', 'Practicing', 'Taking Notes', 'On Break', 'Needs Help', 'Available to Talk'] as const
export type StudyStatus = typeof STUDY_STATUSES[number]
export interface StudyRoomDefinition {
  style: RoomStyle; id: string; code: string; name: string; mood: string; purpose: string
  type: string; capacity: number; students: number; minutes: number; groups: number[]
}
// A group is a physical table made from individual desk places. All places remain independent.
export const STUDY_WORLDS: readonly StudyRoomDefinition[] = [
  { style: 'quiet', id: 'world-quiet', code: 'FOCUS8', name: 'Quiet Focus Room', mood: 'A little quiet. A lot of progress.', purpose: 'Lectures, flashcards & MCQs', type: 'Silent study', capacity: 12, students: 5, minutes: 25, groups: [1,1,1,1,1,1,1,1,1,1,1,1] },
  { style: 'campus', id: 'world-campus', code: 'CAMPUS', name: 'Campus Study Room', mood: 'Your everyday place to show up.', purpose: 'Everyday studying, together', type: 'Open study', capacity: 14, students: 6, minutes: 25, groups: [1,1,4,2,2,2,2] },
  { style: 'discussion', id: 'world-discussion', code: 'TALK12', name: 'Discussion Room', mood: 'Make a difficult topic click.', purpose: 'Case discussion & explaining concepts', type: 'Voice & collaboration', capacity: 8, students: 4, minutes: 25, groups: [4,4] },
  { style: 'library', id: 'world-library', code: 'READ16', name: 'Library Room', mood: 'Warm lamps. A little company. Your own quiet corner.', purpose: 'Two shared tables and four private reading desks', type: 'Evening study', capacity: 12, students: 6, minutes: 50, groups: [4,4,1,1,1,1] },
  { style: 'courtyard', id: 'world-courtyard', code: 'COURT1', name: 'Courtyard Study Hall', mood: 'Different desks. A shared destination.', purpose: 'Study the same module with your cohort', type: 'Social study', capacity: 16, students: 7, minutes: 25, groups: [1,1,1,1,2,2,2,2,4] },
  {style:'collaboration',id:'world-collaboration',code:'CIRCLE',name:'Circular Collaboration Hall',mood:'A place for every perspective.',purpose:'Four round tables · six students each',type:'Group study',capacity:24,students:8,minutes:25,groups:[6,6,6,6]},
  {style:'duo',id:'world-duo',code:'DUO2',name:'Two-person Focus Room',mood:'A quiet space for you and a study partner.',purpose:'One shared desk · two students',type:'Paired focus',capacity:2,students:1,minutes:50,groups:[2]},
  {style:'cafe',id:'world-cafe',code:'CAFE24',name:'Study Café',mood:'Coffee, company, and a chapter to finish.',purpose:'Six café tables · four students each',type:'Social study',capacity:24,students:8,minutes:25,groups:[4,4,4,4,4,4]},
  {style:'lab',id:'world-lab',code:'LAB18',name:'Study Lab',mood:'Work through the details together.',purpose:'Six workbenches · three students each',type:'Collaborative practice',capacity:18,students:7,minutes:25,groups:[3,3,3,3,3,3]},
  {style:'garden',id:'world-garden',code:'GARDEN',name:'Outdoor Study Garden',mood:'Fresh air. A fresh perspective.',purpose:'Four garden tables · four students each',type:'Outdoor study',capacity:16,students:6,minutes:25,groups:[4,4,4,4]},
]
export function worldForRoom(id: string): StudyRoomDefinition {
  const styled = STUDY_WORLDS.find(room => room.id === id)
  if (styled) return styled
  // Preserve the capacity and occupancy of previously shared demo links.
  const legacy: Record<string, {base: number; capacity: number; students: number; groups: number[]}> = {
    'demo-room': {base:1,capacity:20,students:5,groups:[1,1,1,1,1,1,1,1,2,2,2,2,4]},
    'demo-room-anatomy': {base:4,capacity:20,students:11,groups:[1,1,1,1,2,2,2,2,4,4]},
    'demo-room-pharma': {base:0,capacity:12,students:4,groups:Array.from({length:12},()=>1)},
    'demo-room-finals': {base:4,capacity:20,students:19,groups:[1,1,1,1,2,2,2,2,4,4]},
  }
  const old = legacy[id]
  return old ? {...STUDY_WORLDS[old.base],...old} : STUDY_WORLDS[1]
}
export const STUDENT_MODELS = [
  { id: 'man-1', label: 'Man · short hair', hair: 'short', tone: '#c98c65', shirt: 'var(--color-accent)' },
  { id: 'man-2', label: 'Man · curls', hair: 'curls', tone: '#875438', shirt: 'var(--color-ink-2)' },
  { id: 'man-3', label: 'Man · olive hoodie', hair: 'glasses', tone: '#e4b18c', shirt: 'var(--color-accent-strong)' },
  { id: 'man-4', label: 'Man · swept hair', hair: 'swept', tone: '#b67b54', shirt: 'var(--color-primary-strong)' },
  { id: 'woman-1', label: 'Woman · long hair', hair: 'long', tone: '#d39b77', shirt: 'var(--color-primary)' },
  { id: 'woman-2', label: 'Woman · hijab', hair: 'hijab', tone: '#9b6345', shirt: 'var(--color-accent)' },
  { id: 'woman-3', label: 'Woman · bun', hair: 'bun', tone: '#e1b090', shirt: 'var(--color-ink-2)' },
  { id: 'woman-4', label: 'Woman · curls', hair: 'curls', tone: '#875438', shirt: 'var(--color-primary-strong)' },
  { id: 'man-5', label: 'Man · crew cut', hair: 'short', tone: '#c98c65', shirt: 'var(--color-accent)' },
  { id: 'man-6', label: 'Man · side part', hair: 'swept', tone: '#d39b77', shirt: 'var(--color-accent)' },
  { id: 'man-7', label: 'Man · textured crop', hair: 'short', tone: '#875438', shirt: 'var(--color-accent)' },
  { id: 'man-8', label: 'Man · swept back', hair: 'swept', tone: '#b67b54', shirt: 'var(--color-accent)' },
  { id: 'man-9', label: 'Man · glasses & waves', hair: 'glasses', tone: '#d39b77', shirt: 'var(--color-accent)' },
  { id: 'man-10', label: 'Man · buzz cut & beard', hair: 'short', tone: '#b67b54', shirt: 'var(--color-accent)' },
  { id: 'woman-5', label: 'Woman · sleek bob', hair: 'long', tone: '#d39b77', shirt: 'var(--color-accent)' },
  { id: 'woman-6', label: 'Woman · ponytail', hair: 'long', tone: '#b67b54', shirt: 'var(--color-accent)' },
  { id: 'woman-7', label: 'Woman · glasses & straight hair', hair: 'glasses', tone: '#e1b090', shirt: 'var(--color-accent)' },
  { id: 'woman-8', label: 'Woman · braid', hair: 'long', tone: '#d39b77', shirt: 'var(--color-accent)' },
  { id: 'woman-9', label: 'Woman · beige hijab', hair: 'hijab', tone: '#b67b54', shirt: 'var(--color-accent)' },
  { id: 'woman-10', label: 'Woman · low bun', hair: 'bun', tone: '#e1b090', shirt: 'var(--color-accent)' },
] as const
export type StudentModel = typeof STUDENT_MODELS[number]['id']
export type DeskItem = 'device' | 'notebook' | 'plant' | 'cup' | 'note'
export const DESK_ITEMS: readonly DeskItem[] = ['device','notebook','plant','cup','note']
export interface DeskPersonalisation { model: StudentModel; note: string; items: DeskItem[] }
export const DEFAULT_PERSONALISATION: DeskPersonalisation = { model: 'man-1', note: 'One topic at a time.', items: ['notebook','device','plant','note'] }
export function normalizePersonalisation(raw: unknown): DeskPersonalisation {
  const value = (raw ?? {}) as Partial<DeskPersonalisation>
  return {
    model: STUDENT_MODELS.some(m => m.id === value.model) ? value.model! : DEFAULT_PERSONALISATION.model,
    note: typeof value.note === 'string' ? value.note.slice(0, 100) : DEFAULT_PERSONALISATION.note,
    items: Array.isArray(value.items) ? [...new Set(value.items.filter(i => DESK_ITEMS.includes(i)))].slice(0,5) : [...DEFAULT_PERSONALISATION.items],
  }
}
export interface StudyPresence extends SeatOccupant {
  university?: string; year?: string; topic?: string; goal?: string; status?: StudyStatus
  elapsedSeconds?: number; micMuted?: boolean; handRaised?: boolean; personalisation?: DeskPersonalisation
  /** Cumulative, all-time active-study minutes — not this session's elapsed time. Undefined when not known (a server that predates it). */
  totalStudyMinutes?: number
}
export interface FocusSession {
  startedAt: number | null; accumulatedMs: number; durationMinutes: number
  topic: string; goal: string; status: StudyStatus; handRaised: boolean; seatIndex: number | null
  completed: boolean
}
export function newFocusSession(minutes = 25): FocusSession {
  return { startedAt: null, accumulatedMs: 0, durationMinutes: minutes, topic: '', goal: '', status: 'Focusing', handRaised: false, seatIndex: null, completed: false }
}
export function elapsedMs(session: FocusSession, now: number): number {
  return Math.max(0, session.accumulatedMs + (session.startedAt === null ? 0 : now - session.startedAt))
}
export function clockText(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds))
  return `${Math.floor(safe / 60).toString().padStart(2,'0')}:${(safe % 60).toString().padStart(2,'0')}`
}
export function mockWorldPresence(selfId: string, room: StudyRoomDefinition): StudyPresence[] {
  const names = ['Nour Hassan','Salma Adel','Youssef Fahmy','Mariam Zaki','Kareem Saad','Hana Omar','Omar Ali','Ahmed Khaled','Farah Nabil','Laila Samir','Ali Tarek','Dina Mostafa','Malak Amr','Adam Salem','Nada Ibrahim','Hassan Adel','Aya Mahmoud','Ziad Nasser','Reem Yasser']
  const topics = ['Cardiac conduction','Upper limb anatomy','Renal physiology','Pharmacology']
  const positions = [...Array.from({length:room.capacity},(_,i)=>i).filter(i=>i%2===0),...Array.from({length:room.capacity},(_,i)=>i).filter(i=>i%2===1)]
  return names.slice(0,room.students).map((name,i) => ({
    id: `sample-${i}-${selfId}`, name, seat: { desk: i % 3 === 0 ? 'drawer' : 'plain', device: i % 3 === 1 ? 'tablet' : 'laptop', chair: 'office' },
    seatIndex: positions[i],
    studying: i !== 2, speaking: false, university: ['Cairo University','Ain Shams University','Alexandria University'][i%3], year: `Year ${i%3+2}`,
    topic: topics[i%4], goal: ['Review the conduction pathway','Finish 20 flashcards','Explain the key mechanisms'][i%3],
    status: (['Focusing','Focusing','On Break','Needs Help','Available to Talk'] as StudyStatus[])[i%5], elapsedSeconds: 430+i*137, micMuted: true,
    totalStudyMinutes: 180+i*97,
    personalisation: { ...DEFAULT_PERSONALISATION, note:MOTIVATIONAL_REMINDERS[(i*7+room.capacity)%50], model: STUDENT_MODELS[[0,4,2,5,1,6,3][i%7]].id },
  }))
}
