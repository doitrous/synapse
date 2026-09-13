export interface PresetAvatar {
  id: string
  label: string
  src: string
}

/** Build a base-aware URL for a preset avatar in /public/avatars. */
const avatar = (id: string) => `${import.meta.env.BASE_URL}avatars/${id}.png`

/**
 * The gallery of ready-made avatars a student can pick instead of uploading a
 * photo. Three families — animal mascots, illustrated students, and abstract
 * mood tiles — so there is a face for every personality and mood.
 */
export const PRESET_AVATARS: PresetAvatar[] = [
  // Animal mascots
  { id: 'owl-scholar', label: 'Wise owl', src: avatar('owl-scholar') },
  { id: 'fox-strategist', label: 'Clever fox', src: avatar('fox-strategist') },
  { id: 'lion-leader', label: 'Lion leader', src: avatar('lion-leader') },
  { id: 'panda-zen', label: 'Zen panda', src: avatar('panda-zen') },
  { id: 'cat-caffeine', label: 'Night-owl cat', src: avatar('cat-caffeine') },
  { id: 'raccoon-tinkerer', label: 'Curious raccoon', src: avatar('raccoon-tinkerer') },
  { id: 'deer-empath', label: 'Gentle deer', src: avatar('deer-empath') },
  { id: 'tiger-competitor', label: 'Bold tiger', src: avatar('tiger-competitor') },
  { id: 'dog-social', label: 'Friendly dog', src: avatar('dog-social') },
  { id: 'koala-chill', label: 'Chill koala', src: avatar('koala-chill') },
  { id: 'bee-hustler', label: 'Busy bee', src: avatar('bee-hustler') },
  { id: 'otter-comedian', label: 'Playful otter', src: avatar('otter-comedian') },
  { id: 'tortoise-marathon', label: 'Steady tortoise', src: avatar('tortoise-marathon') },
  { id: 'falcon-highflyer', label: 'Swift falcon', src: avatar('falcon-highflyer') },
  { id: 'octopus-multitask', label: 'Clever octopus', src: avatar('octopus-multitask') },
  { id: 'penguin-resilient', label: 'Brave penguin', src: avatar('penguin-resilient') },
  // Illustrated students
  { id: 'student-confident', label: 'Confident', src: avatar('student-confident') },
  { id: 'student-dreamer', label: 'Dreamer', src: avatar('student-dreamer') },
  { id: 'student-focused', label: 'In the zone', src: avatar('student-focused') },
  { id: 'student-joyful', label: 'Joyful', src: avatar('student-joyful') },
  { id: 'student-cool', label: 'Effortlessly cool', src: avatar('student-cool') },
  { id: 'student-bookworm', label: 'Bookworm', src: avatar('student-bookworm') },
  { id: 'student-hijabi', label: 'Warm encourager', src: avatar('student-hijabi') },
  { id: 'student-grinder', label: 'Tired but proud', src: avatar('student-grinder') },
  { id: 'student-curious', label: 'Curious', src: avatar('student-curious') },
  { id: 'student-zen', label: 'Zen achiever', src: avatar('student-zen') },
  { id: 'student-competitive', label: 'Competitor', src: avatar('student-competitive') },
  { id: 'student-introvert', label: 'Quiet thinker', src: avatar('student-introvert') },
  { id: 'student-artist', label: 'Creative', src: avatar('student-artist') },
  { id: 'student-athlete', label: 'Athlete', src: avatar('student-athlete') },
  { id: 'student-captain', label: 'Captain', src: avatar('student-captain') },
  { id: 'student-caregiver', label: 'Caregiver', src: avatar('student-caregiver') },
  // Abstract mood tiles
  { id: 'mood-sunrise', label: 'Fresh start', src: avatar('mood-sunrise') },
  { id: 'mood-nightsky', label: 'Night sky', src: avatar('mood-nightsky') },
  { id: 'mood-lightning', label: 'High energy', src: avatar('mood-lightning') },
  { id: 'mood-wave', label: 'Calm wave', src: avatar('mood-wave') },
  { id: 'mood-summit', label: 'On target', src: avatar('mood-summit') },
  { id: 'mood-rocket', label: 'Ambitious', src: avatar('mood-rocket') },
  { id: 'mood-flower', label: 'Growing', src: avatar('mood-flower') },
  { id: 'mood-spark', label: 'Bright idea', src: avatar('mood-spark') },
]
