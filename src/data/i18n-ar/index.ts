import { AR_SHELL } from './shell.ts'
import { AR_PLAN } from './plan.ts'
import { AR_LEARN } from './learn.ts'
import { AR_PRACTICE } from './practice.ts'
import { AR_REVISE } from './revise.ts'
import { AR_ROOMS } from './rooms.ts'
import { AR_DASHBOARD } from './dashboard.ts'
import { AR_LEGAL } from './legal.ts'
import { AR_QBANK } from './qbank.ts'
import { AR_QBANK_STATS } from './qbankStats.ts'
import { AR_ACCOUNT } from './account.ts'
import { AR_PERFORMANCE } from './performance.ts'
import { AR_ADAPTIVE } from './adaptive.ts'
import { AR_MARISTANAS } from './maristanas.ts'
import { AR_UNIVERSITY } from './university.ts'
import { AR_TUTORIAL } from './tutorial.ts'

/**
 * The redesign's Arabic, one file per package.
 *
 * `i18n-ar.ts` is a single 1,000-line object that seven packages would all be
 * editing at once. Splitting the new strings by owner means each package
 * appends to a file nobody else touches, and the merge is this spread rather
 * than a conflict. Later entries win, so this sits at the end of `AR`: a key
 * a package restates here deliberately overrides the older translation.
 */
export const AR_REDESIGN: Record<string, string> = {
  ...AR_SHELL,
  ...AR_PLAN,
  ...AR_LEARN,
  ...AR_PRACTICE,
  ...AR_REVISE,
  ...AR_ROOMS,
  ...AR_DASHBOARD,
  ...AR_LEGAL,
  ...AR_QBANK,
  ...AR_QBANK_STATS,
  ...AR_ACCOUNT,
  ...AR_PERFORMANCE,
  ...AR_ADAPTIVE,
  ...AR_MARISTANAS,
  ...AR_UNIVERSITY,
  ...AR_TUTORIAL,
}
