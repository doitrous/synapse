import test from 'node:test'
import assert from 'node:assert/strict'
import {placeSeatLabels} from './seatLabels.ts'
import {roomSceneLayout} from './sceneLayout.ts'
import {openFloor,walkRoute} from './roomWalk.ts'
import {STUDY_WORLDS} from './studyWorld.ts'

test('dense seat labels never overlap and stay within the viewport',()=>{
  for(const width of [650,800,1100])for(const count of [8,14,20,25]){
    const anchors=Array.from({length:count},(_,index)=>({index,x:40+(index%4)*4,y:38+Math.floor(index/4)*5}))
    const labels=placeSeatLabels(anchors,width,690)
    labels.forEach((a,i)=>{
      assert.ok(a.x*width/100>=39&&a.x*width/100<=width-39)
      assert.ok(a.y*6.9>=17&&a.y*6.9<=673)
      labels.slice(i+1).forEach(b=>assert.ok(Math.abs(a.x-b.x)*width/100>=78||Math.abs(a.y-b.y)*6.9>=34))
    })
  }
})
test('campus walking follows open floor and rejects desks as destinations',()=>{
  const layout=roomSceneLayout(STUDY_WORLDS[1]),seat=layout.seats[1]
  const from={x:seat.x,z:seat.z+1.05}
  const route=walkRoute(from,{x:0,z:5.9},layout,1)
  assert.ok(route.length>2)
  for(const point of route.slice(1))assert.ok(openFloor(point,layout,1))
  assert.deepEqual(walkRoute(from,{x:seat.x,z:seat.z},layout,1),[])
  assert.deepEqual(walkRoute(from,{x:8,z:0},layout,1),[])
})
test('live room table membership matches the server voice map',async()=>{
  const {liveTableForSeat}=await import('../../../server/src/roomVoiceScope.js')
  const layout=roomSceneLayout({style:'campus',capacity:20})
  for(const seat of layout.seats)assert.equal(liveTableForSeat(seat.index),seat.shared?seat.table:null)
})

test('evening library keeps shared tables and private stair destinations in sync',async()=>{
  const {illustratedLayout}=await import('./illustratedLayout.ts')
  const world=STUDY_WORLDS.find(room=>room.style==='library')!
  const scene=roomSceneLayout(world),illustrated=illustratedLayout(world)
  const shared=illustrated.places.filter(place=>place.discussion)
  const privateDesks=illustrated.places.filter(place=>place.privateDesk)
  assert.equal(shared.length,2)
  assert.ok(shared.every(table=>table.indices.length===4))
  assert.equal(privateDesks.length,4)
  assert.deepEqual(illustrated.places.flatMap(place=>place.indices).sort((a,b)=>a-b),Array.from({length:12},(_,i)=>i))
  for(const place of illustrated.places){
    const memberships=new Set(place.indices.map(index=>scene.seats[index].table))
    assert.equal(memberships.size,1)
    assert.ok(place.indices.every(index=>scene.seats[index].shared===place.discussion))
  }
  assert.ok(privateDesks.every(place=>place.indices.length===1))
})
