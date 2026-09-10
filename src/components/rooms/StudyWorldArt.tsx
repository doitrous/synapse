import { characterSprite } from '@/lib/rooms/characterAtlas'
import type { StudentModel } from '@/lib/rooms/studyWorld'

export function StudentPortrait({model,className}:{model:string;className?:string}){
  const sprite=characterSprite(model as StudentModel,true)
  return <svg viewBox={`${sprite.column*362+55} ${sprite.row*543+3} 252 252`} width="80" height="80" className={className} aria-hidden="true"><image href={sprite.src} width="1448" height={sprite.rows*543}/></svg>
}
