import {test} from 'node:test'
import assert from 'node:assert/strict'
import {pool} from './db.js'
import {searchByUsername} from './friends.js'

test('searching a shared username is read-only and never sends a request',async t=>{
  const query=t.mock.method(pool,'query',async(sql,args)=>{
    assert.ok(sql.startsWith('SELECT'))
    assert.ok(sql.includes('AND s.user_id <> ?'))
    assert.deepEqual(args,['me','me','neuro-nora','me','ASU'])
    return [[{user_id:'other',name:'Nora',email:'private@example.com',username:'neuro-nora',university_id:'ASU',year:'1'}]]
  })
  const result=await searchByUsername('me',{username:' @Neuro-Nora ',universityId:'ASU'})
  assert.equal(result.people[0].displayName,'Nora')
  assert.equal(result.people[0].relationship,'none')
  assert.equal('email' in result.people[0],false)
  assert.equal(query.mock.callCount(),1)
})
test('same usernames at different universities remain separate choices',async t=>{
  t.mock.method(pool,'query',async()=>[[{user_id:'one',university_id:'ASU',friendship_status:'pending',requested_by:'me'},{user_id:'two',university_id:'CU',friendship_status:'accepted'}]])
  const result=await searchByUsername('me',{username:'nora'})
  assert.equal(result.people.length,2)
  assert.deepEqual(result.people.map(person=>person.relationship),['outgoing','friends'])
})
test('unknown usernames return an empty search result',async t=>{
  t.mock.method(pool,'query',async()=>[[]])
  assert.deepEqual(await searchByUsername('me',{username:'unknown'}),{ok:true,people:[]})
})
test('invalid username input is rejected before a query',async t=>{
  const query=t.mock.method(pool,'query',async()=>{throw new Error('unexpected query')})
  assert.deepEqual(await searchByUsername('me',{username:'@x'}),{ok:false,reason:'invalid_username',people:[]})
  assert.equal(query.mock.callCount(),0)
})
