import test from 'node:test'
import assert from 'node:assert/strict'
import { STUDY_WORLDS, STUDENT_MODELS, mockWorldPresence, newFocusSession, elapsedMs, normalizePersonalisation, clockText } from './studyWorld.ts'
import { placeSeats, DEFAULT_SEAT } from './roomPresence.ts'

test('all room styles have their requested capacities and independently addressable places',()=>{
  assert.equal(STUDY_WORLDS.length,10)
  assert.ok(new Set(STUDY_WORLDS.map(r=>r.groups.join(','))).size>=9)
  for(const room of STUDY_WORLDS){
    assert.ok(room.capacity>=(room.style==='duo'?2:5)&&room.capacity<=25)
    assert.equal(room.groups.reduce((a,b)=>a+b,0),room.capacity)
    const people=mockWorldPresence('self',room)
    assert.equal(people.length,room.students)
    assert.ok(people.length<room.capacity)
    assert.equal(new Set(people.map(p=>p.seatIndex)).size,people.length)
    assert.equal(placeSeats(people,room.capacity).filter(Boolean).length,room.students)
  }
})
test('moving one student leaves the old desk free and preserves classmates',()=>{
  const room=STUDY_WORLDS[0]
  const classmates=mockWorldPresence('self',room)
  const self={id:'self',name:'You',seat:DEFAULT_SEAT,studying:true,speaking:false,seatIndex:1}
  const before=placeSeats([...classmates,self],room.capacity)
  const after=placeSeats([...classmates,{...self,seatIndex:3}],room.capacity)
  assert.equal(before[1]?.id,'self');assert.equal(after[1],null);assert.equal(after[3]?.id,'self')
  for(const p of classmates)assert.equal(after[p.seatIndex!]?.id,p.id)
})
test('clock uses wall time, paused time stays fixed, and negative clock changes are clamped',()=>{
  const session={...newFocusSession(),startedAt:1000,accumulatedMs:5000}
  assert.equal(elapsedMs(session,61000),65000)
  const paused={...session,startedAt:null,accumulatedMs:65000}
  assert.equal(elapsedMs(paused,900000),65000)
  assert.equal(elapsedMs({...session,accumulatedMs:0},0),0)
  assert.equal(clockText(-1),'00:00');assert.equal(clockText(3661),'61:01')
})
test('untrusted desk customisation is bounded without losing the chosen order',()=>{
  assert.equal(STUDENT_MODELS.filter(m=>m.id.startsWith('man')).length,10)
  assert.equal(STUDENT_MODELS.filter(m=>m.id.startsWith('woman')).length,10)
  const normalized=normalizePersonalisation({model:'unknown',note:'x'.repeat(900),items:['note','cup','note','unsafe','device']})
  assert.equal(normalized.model,'man-1');assert.equal(normalized.note.length,100)
  assert.deepEqual(normalized.items,['note','cup','device'])
  assert.deepEqual(normalizePersonalisation({items:[]}).items,[])
})

test('a nearly full legacy room can place every sample classmate without seat collisions',()=>{
  const full={...STUDY_WORLDS[4],capacity:20,students:19}
  const classmates=mockWorldPresence('self',full)
  assert.equal(classmates.length,19)
  assert.equal(new Set(classmates.map(p=>p.seatIndex)).size,19)
  const desks=placeSeats([...classmates,{id:'self',name:'You',seat:DEFAULT_SEAT,studying:true,speaking:false,seatIndex:1}],20)
  assert.equal(desks.filter(Boolean).length,20)
  assert.equal(desks.filter(p=>p?.id==='self').length,1)
})

test('all twenty students have distinct registered views and shipped artwork',async()=>{
  const {characterSprite}=await import('./characterAtlas.ts')
  const {existsSync}=await import('node:fs')
  for(const [front,stool] of [[true,false],[false,false],[false,true]]){
    const views=STUDENT_MODELS.map(model=>characterSprite(model.id,front,stool))
    assert.equal(new Set(views.map(view=>`${view.src}:${view.column}:${view.row}`)).size,20)
    for(const view of views){
      assert.ok(view.column>=0&&view.column<4&&view.row>=0&&view.row<view.rows)
      assert.ok(existsSync(new URL(`../../../public${view.src}`,import.meta.url)),view.src)
    }
  }
})
