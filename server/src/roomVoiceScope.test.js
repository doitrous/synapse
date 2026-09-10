import test from 'node:test'
import assert from 'node:assert/strict'
import {liveTableForSeat,voiceAudience,mayHear} from './roomVoiceScope.js'

test('table voice accepts only a real shared seat',()=>{
  for(const index of [null,undefined,-1,0,7,20,'8'])assert.throws(()=>voiceAudience('table',index),/sit_at_shared_table_first/)
  assert.throws(()=>voiceAudience('table-16',16),/invalid_voice_audience/)
  assert.deepEqual(voiceAudience('table',9),{scope:'table',tableId:'pair-8'})
  for(const index of [16,17,18,19])assert.equal(liveTableForSeat(index),'table-16')
})
test('a different table or an unseated listener cannot hear a table producer',()=>{
  const audience=voiceAudience('table',8)
  assert.equal(mayHear(audience,liveTableForSeat(9)),true)
  assert.equal(mayHear(audience,liveTableForSeat(10)),false)
  assert.equal(mayHear(audience,null),false)
  assert.equal(mayHear({scope:'table',tableId:null},null),false)
  assert.equal(mayHear(voiceAudience('room',8),null),true)
})
