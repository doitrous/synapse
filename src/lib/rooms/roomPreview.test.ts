import { test } from 'node:test'
import assert from 'node:assert/strict'
import { roomPreviewSeats } from './roomPreview.ts'
import { STUDY_WORLDS } from './studyWorld.ts'

test('thumbnail occupancy follows every room capacity, including 24-seat rooms',()=>{
  for(const room of STUDY_WORLDS)for(const count of [0,1,room.capacity-1,room.capacity]){
    const seats=roomPreviewSeats(room,count)
    assert.equal(seats.length,room.capacity)
    assert.equal(seats.filter(Boolean).length,count)
    assert.equal(seats.some(seat=>seat?.speaking),false)
  }
})
test('thumbnail occupancy safely bounds stale counts',()=>{
  const room=STUDY_WORLDS.find(room=>room.style==='duo')!
  assert.equal(roomPreviewSeats(room,99).filter(Boolean).length,2)
  assert.equal(roomPreviewSeats(room,-1).filter(Boolean).length,0)
  assert.equal(roomPreviewSeats(room,NaN).filter(Boolean).length,0)
})
