import type { MedicalTerm } from '../../src/data/glossary'
import type { OrderedMiniGamePack,RedFlagSortPack } from '../../src/data/minigamePacks'
export interface FoundationTopic {id:string;title:string;source:{label:string;url:string};terms:MedicalTerm[]}
export const FOUNDATION_TOPICS:FoundationTopic[]
export const FOUNDATION_ORDER_PACKS:OrderedMiniGamePack[]
export const FOUNDATION_RED_FLAG_PACKS:RedFlagSortPack[]
