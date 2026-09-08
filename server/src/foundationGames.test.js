import test from 'node:test'
import assert from 'node:assert/strict'
import {FOUNDATION_TOPICS,FOUNDATION_ORDER_PACKS,FOUNDATION_RED_FLAG_PACKS} from '../shared/foundationGames.js'
import {FOUNDATION_SPOTTERS} from '../shared/foundationSpotters.js'
import {foundationGameContent,createInitialPartyGame,publicStateOf} from './partyGames.js'
test('every shared foundation game derives keys on the server and hides them from public state',()=>{
 const groups=[['term-grid',FOUNDATION_TOPICS],['term-match',FOUNDATION_TOPICS],['spotter',FOUNDATION_SPOTTERS],['clinical-sequence',FOUNDATION_ORDER_PACKS.filter(p=>p.kind==='clinical_sequence')],['mechanism-chain',FOUNDATION_ORDER_PACKS.filter(p=>p.kind==='mechanism_chain')],['red-flag-sort',FOUNDATION_RED_FLAG_PACKS],['maristanas',FOUNDATION_TOPICS]]
 for(const [kind,packs] of groups)for(const pack of packs){const result=foundationGameContent({kind,foundationPackId:pack.id,seed:17});assert.equal(result.ok,true);const game=createInitialPartyGame({id:'g',partyId:'p',hostId:'u',content:result.content,members:[{userId:'u',displayName:'Student'}],at:new Date().toISOString()});assert.equal('answerKey' in publicStateOf(game).currentRound,false)}
 assert.equal(foundationGameContent({kind:'spotter',foundationPackId:'not-real'}).ok,false)
})
