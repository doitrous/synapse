import test from 'node:test'
import assert from 'node:assert/strict'
import {existsSync} from 'node:fs'
import {FOUNDATION_TOPICS,FOUNDATION_ORDER_PACKS,FOUNDATION_RED_FLAG_PACKS} from '../../server/shared/foundationGames.js'
import {FOUNDATION_SPOTTERS} from '../../server/shared/foundationSpotters.js'
import {buildGrid} from './crossword.ts'
import {buildBoard} from './termMatch.ts'
import {validateMiniGamePack} from './minigamePacks.ts'
test('seventy complete foundation sets are playable',()=>{
 assert.equal(FOUNDATION_TOPICS.length,10)
 assert.equal(FOUNDATION_SPOTTERS.length,10)
 assert.equal(FOUNDATION_ORDER_PACKS.filter(p=>p.kind==='clinical_sequence').length,10)
 assert.equal(FOUNDATION_ORDER_PACKS.filter(p=>p.kind==='mechanism_chain').length,10)
 assert.equal(FOUNDATION_RED_FLAG_PACKS.length,10)
 for(const pack of [...FOUNDATION_ORDER_PACKS,...FOUNDATION_RED_FLAG_PACKS])assert.deepEqual(validateMiniGamePack(pack),[],pack.id)
 for(const topic of FOUNDATION_TOPICS){
  assert.equal(new Set(topic.terms.map(t=>t.id)).size,8)
  for(const seed of [37491,37492,37493])assert.ok(buildGrid(topic.terms.map(t=>({term:t.term,clue:t.def})),seed).words.length>=8,`${topic.id} ${seed}`)
  assert.equal(buildBoard(topic.terms,'definition',37491).refusal,null)
 }
 for(const pack of FOUNDATION_SPOTTERS){assert.ok(existsSync(new URL(`../../public${pack.image}`,import.meta.url)));assert.equal(pack.structures.length,4);for(const point of pack.structures)assert.ok(point.x>0&&point.x<1&&point.y>0&&point.y<1)}
})
