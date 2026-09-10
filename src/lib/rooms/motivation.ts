/** Gentle reminders, assigned once and then editable by their student. */
export const MOTIVATIONAL_REMINDERS = [
  'One topic at a time.', 'Small steps still move you forward.', 'Show up for the doctor you are becoming.',
  'Progress grows with practice.', 'Today is a good day to understand one more thing.',
  'Learn with curiosity, not comparison.', 'Your next small step matters.', 'Take your time. Make it meaningful.',
  'Understanding is worth the effort.', 'A little focus can go a long way.',
  'You can begin again at any moment.', 'Build knowledge one connection at a time.',
  'Consistency is a quiet strength.', 'Make space for questions.', 'You do not need to know it all today.',
  'Breathe, read, reflect, repeat.', 'Practice makes the unfamiliar familiar.', 'Keep your goals kind and clear.',
  'Your pace is allowed to be your own.', 'Learn deeply, then rest well.', 'The next page is a fresh start.',
  'Be patient with the learning process.', 'Curiosity opens the next door.', 'A focused minute is a beginning.',
  'Remember how far you have come.', 'Turn one question into one discovery.', 'Rest belongs in your plan too.',
  'Try explaining it in your own words.', 'You are building something lasting.', 'Start with what you can do now.',
  'Keep learning, keep asking.', 'Today’s practice is tomorrow’s confidence.', 'Let understanding lead the way.',
  'Steady effort adds up.', 'Take a breath before the next challenge.', 'Your attention is a gift to your future.',
  'Every thoughtful question counts.', 'Work gently. Stay curious.', 'Make one idea clearer today.',
  'Learning is a series of fresh starts.', 'A mistake can teach you where to look.', 'You belong in the learning process.',
  'Choose progress you can sustain.', 'Focus on the next useful step.', 'Give difficult ideas a little time.',
  'A short session can still be worthwhile.', 'Notice what makes more sense now.', 'Build a habit you can return to.',
  'Study with purpose and room to breathe.', 'Be as kind to yourself as to your future patients.',
] as const
export function randomMotivation():string {
  return MOTIVATIONAL_REMINDERS[Math.floor(Math.random()*MOTIVATIONAL_REMINDERS.length)]
}
