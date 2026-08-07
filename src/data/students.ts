import { universities } from './universities'

export type StudentStatus = 'Active' | 'Trial' | 'Lapsed' | 'Suspended'
export type PlanTier = 'Free' | 'QBank' | 'Adaptive' | 'Adaptive add-on' | 'Exam Sprint'

export interface AdminStudent {
  id: string
  name: string
  email: string
  universityId: string
  year: string
  plan: PlanTier
  status: StudentStatus
  joined: string
  lastActive: string
  questionsAnswered: number
  accuracy: number
  readiness: number
}

const FIRST = ['Maya', 'Omar', 'Layla', 'Youssef', 'Nour', 'Hassan', 'Sara', 'Karim', 'Farida', 'Ali', 'Hana', 'Tariq', 'Salma', 'Adam', 'Dina', 'Ziad', 'Rana', 'Bilal', 'Aya', 'Kareem']
const LAST = ['Adeyemi', 'Hassan', 'Mansour', 'Farouk', 'Saleh', 'Nasser', 'Khalil', 'Habib', 'Zaki', 'Rahman', 'Darwish', 'Sabri', 'Younes', 'Fahmy', 'Osman']
const PLANS: PlanTier[] = ['Free', 'QBank', 'Adaptive', 'Adaptive add-on', 'Exam Sprint']
const STATUSES: StudentStatus[] = ['Active', 'Active', 'Active', 'Trial', 'Lapsed', 'Suspended']

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]
}

/** Deterministic demo roster spread across universities and years. */
export const adminStudents: AdminStudent[] = (() => {
  const out: AdminStudent[] = []
  let n = 0
  universities.forEach((uni, ui) => {
    uni.years.forEach((y, yi) => {
      const count = 6 + ((ui + yi) % 4) // 6–9 students per year
      for (let i = 0; i < count; i++) {
        n += 1
        const seed = n * 7 + ui * 13 + yi * 17
        const first = pick(FIRST, seed)
        const last = pick(LAST, seed * 3)
        const status = pick(STATUSES, seed)
        out.push({
          id: `stu-${uni.id}-${yi}-${i}`,
          name: `${first} ${last}`,
          email: `${first}.${last}`.toLowerCase() + `@${uni.short.toLowerCase()}.edu`,
          universityId: uni.id,
          year: y.year,
          plan: status === 'Trial' ? 'Free' : pick(PLANS, seed * 2),
          status,
          joined: `${2024 + (seed % 2)}-0${1 + (seed % 9)}-1${seed % 9}`,
          lastActive: `${seed % 20}d ago`,
          questionsAnswered: 40 + ((seed * 37) % 3200),
          accuracy: 48 + ((seed * 13) % 45),
          readiness: 30 + ((seed * 19) % 65),
        })
      }
    })
  })
  return out
})()
