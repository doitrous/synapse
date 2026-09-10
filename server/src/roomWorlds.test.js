import test from 'node:test'
import assert from 'node:assert/strict'
import {ROOM_LAYOUTS,tableForSeat} from '../shared/roomLayouts.js'
import {canJoin,visibleTo} from './partyRules.js'
import {canSeeActivity} from './roomActivityScope.js'
import {normalizeSeatInput} from './roomSeats.js'
test('global, university and cohort audiences remain distinct',()=>{
 const viewer={universityId:'a',year:'1'}
 const p={universityId:'a',year:'2',visibility:'open',archivedAt:null}
 assert.equal(canJoin({...p,scope:'cohort'},viewer).ok,false)
 assert.equal(canJoin({...p,scope:'university'},viewer).ok,true)
 assert.equal(canJoin({...p,scope:'university'},{...viewer,universityId:'b'}).ok,false)
 assert.equal(canJoin({...p,scope:'global'},{...viewer,universityId:'b'}).ok,true)
 assert.equal(visibleTo([{...p,scope:'global',visibility:'invite'}],viewer).length,0)
 assert.equal(canJoin({...p,scope:'global',archivedAt:new Date()},viewer).ok,false)
})
test('table activity is visible only at that table, room activity to any member',()=>{
 assert.equal(canSeeActivity('table-0','table-0'),true)
 assert.equal(canSeeActivity('table-0','table-6'),false)
 assert.equal(canSeeActivity('table-0',null),false)
 assert.equal(canSeeActivity(null,null),true)
})
test('all requested room capacities and furniture are accepted without accepting extra seats',()=>{
 for(const [key,layout] of Object.entries(ROOM_LAYOUTS)){
  assert.equal(layout.groups.reduce((a,b)=>a+b,0),layout.capacity,key)
  assert.equal(normalizeSeatInput({seatIndex:layout.capacity-1},layout.capacity).ok,true)
  assert.equal(normalizeSeatInput({seatIndex:layout.capacity},layout.capacity).ok,false)
  let first=0
  for(const count of layout.groups){const expected=count===1?null:`${count===2?'pair':'table'}-${first}`;for(let i=first;i<first+count;i++)assert.equal(tableForSeat(i,key),expected);first+=count}
 }
 for(const chair of ['ergonomic','executive','gaming','lounge'])assert.equal(normalizeSeatInput({chair}).ok,true)
})
