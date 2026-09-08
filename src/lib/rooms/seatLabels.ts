export interface LabelAnchor {index:number;x:number;y:number}
export interface PositionedLabel extends LabelAnchor {anchorX:number;anchorY:number}
/** Pixel-space collision placement, shared by every camera size and zoom. */
export function placeSeatLabels(anchors:LabelAnchor[],width:number,height:number):PositionedLabel[]{
  const placed:{x:number;y:number}[]=[],w=78,h=34,pad=5
  return [...anchors].sort((a,b)=>a.y-b.y||a.x-b.x).map(anchor=>{
    const ax=anchor.x*width/100,ay=anchor.y*height/100
    let point={x:Math.max(w/2+pad,Math.min(width-w/2-pad,ax)),y:Math.max(h/2+pad,Math.min(height-h/2-pad,ay))}
    const preferredY=point.y
    let best=Infinity
    for(let row=0;row<Math.ceil(height/h);row++)for(const sign of row?[1,-1]:[1]){
      const y=Math.max(h/2+pad,Math.min(height-h/2-pad,preferredY+row*sign*(h+4)))
      for(const offset of [0,-w-4,w+4,-2*(w+4),2*(w+4)]){
        const x=Math.max(w/2+pad,Math.min(width-w/2-pad,ax+offset))
        if(placed.some(other=>Math.abs(other.x-x)<w+3&&Math.abs(other.y-y)<h+3))continue
        const distance=(x-ax)**2+(y-ay)**2
        if(distance<best){best=distance;point={x,y}}
      }
    }
    placed.push(point)
    return {index:anchor.index,x:point.x/width*100,y:point.y/height*100,anchorX:anchor.x,anchorY:anchor.y}
  }).sort((a,b)=>a.index-b.index)
}
