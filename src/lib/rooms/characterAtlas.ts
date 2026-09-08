import type { StudentModel } from './studyWorld'
const original:Partial<Record<StudentModel,number>>={'man-1':0,'man-2':2,'man-3':1,'man-4':3,'woman-1':4,'woman-2':7,'woman-3':5,'woman-4':6}
const additions:Partial<Record<StudentModel,{sheet:string;column:number}>>={
  'man-5':{sheet:'a',column:0},'man-6':{sheet:'a',column:1},'man-7':{sheet:'a',column:2},'man-8':{sheet:'a',column:3},
  'man-9':{sheet:'b',column:0},'man-10':{sheet:'b',column:1},'woman-5':{sheet:'b',column:2},'woman-6':{sheet:'b',column:3},
  'woman-7':{sheet:'c',column:0},'woman-8':{sheet:'c',column:1},'woman-9':{sheet:'c',column:2},'woman-10':{sheet:'c',column:3},
}
/** Every model has a registered front, rear-chair and rear-stool view. */
export function characterSprite(model:StudentModel,front=false,stool=false){
  const extra=additions[model]
  if(extra)return {src:`/assets/study-room/students-extra-${extra.sheet}.png`,column:extra.column,row:front?0:stool?2:1,rows:3}
  const index=original[model]??0
  return {src:`/assets/study-room/students-${front?'front':stool?'stools':'rear'}.png`,column:index%4,row:Math.floor(index/4),rows:2}
}
export const roomArtwork=['/assets/study-room/students-rear.png','/assets/study-room/students-front.png','/assets/study-room/furniture-clean.png','/assets/study-room/students-stools.png','/assets/study-room/furniture-front-chair.png',...['a','b','c'].map(sheet=>`/assets/study-room/students-extra-${sheet}.png`)]
