import test from 'node:test'
import assert from 'node:assert/strict'
import { roomSceneLayout } from './sceneLayout.ts'
import { STUDY_WORLDS, DESK_ITEMS } from './studyWorld.ts'
import { deskItemPositions } from './deskLayout.ts'
import { SEAT_DEVICES } from './roomPresence.ts'

test('every seat has a unique place and a reachable tabletop; discussion chairs face inward',()=>{
  for(const room of STUDY_WORLDS){
    const {seats,tables}=roomSceneLayout(room)
    assert.equal(seats.length,room.capacity)
    assert.equal(new Set(seats.map(s=>`${s.x}:${s.z}:${s.rotation}`)).size,room.capacity)
    assert.deepEqual(seats.map(s=>s.index),Array.from({length:room.capacity},(_,i)=>i))
    for(const seat of seats){
      const table=tables.find(t=>t.id===seat.table)!
      assert.ok(table)
      // Body sits +Z from its desk; its gaze (-Z) must point towards the table centre.
      const bodyX=seat.x+Math.sin(seat.rotation),bodyZ=seat.z+Math.cos(seat.rotation)
      const inward=(table.x-bodyX)*-Math.sin(seat.rotation)+(table.z-bodyZ)*-Math.cos(seat.rotation)
      assert.ok(inward>0,`${room.style} seat ${seat.index} faces away from its table`)
      assert.ok(Math.abs(seat.x)<=6&&Math.abs(bodyX)<=6.4)
      assert.ok(bodyZ<=6.7&&bodyZ>=-6.4)
    }
  }
})
test('legacy capacities retain independent valid places',()=>{
  for(const capacity of [5,8,12,16,20,25])assert.equal(roomSceneLayout({style:'campus',capacity}).seats.length,capacity)
})
test('desk zones stay stable when choices are reordered or removed',()=>{
  for(const device of SEAT_DEVICES){
    for(const items of [DESK_ITEMS,[...DESK_ITEMS].reverse(),['device'] as const,[]]){
      const positions=deskItemPositions(items,device),xs=[...positions.values()]
      assert.equal(positions.size,items.length)
      const all=deskItemPositions(DESK_ITEMS,device)
      for(const item of items)assert.equal(positions.get(item),all.get(item))
      assert.ok(xs.every(x=>Math.abs(x)<=1.35))
      if(items.length===1)assert.equal(xs[0],0)
    }
  }
})
