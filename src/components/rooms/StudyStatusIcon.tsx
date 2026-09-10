import { BookOpen, CircleHelp, Coffee, Focus, MessageCircle, NotebookPen, PlayCircle, Brain, type LucideIcon } from 'lucide-react'
import type { StudyStatus } from '@/lib/rooms/studyWorld'
const statusIcons:Record<StudyStatus,LucideIcon>={Focusing:Focus,Reading:BookOpen,'Watching Lecture':PlayCircle,Practicing:Brain,'Taking Notes':NotebookPen,'On Break':Coffee,'Needs Help':CircleHelp,'Available to Talk':MessageCircle}
export function StudyStatusIcon({status,size=15}:{status:StudyStatus;size?:number}){const Icon=statusIcons[status];return <Icon size={size} aria-hidden="true"/>}
