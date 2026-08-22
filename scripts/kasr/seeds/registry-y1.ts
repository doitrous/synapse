/**
 * Year 1's registrations — moved verbatim out of `registry.ts` so five module
 * lanes (and now five year lanes) can each append to their own file instead of
 * conflicting on one array literal. See `registry.ts` for `Registration`
 * itself and how the per-year files are assembled back into one list.
 */
import type { Registration } from './registry.ts'
import { paperFromJson } from './from-json.ts'
import { PAPER as EOY_2025 } from './101-eoy-2025.ts'
import { PAPER as EOY_2024 } from './101-eoy-2024.ts'
import { PAPER as EOY_2022 } from './101-eoy-2022.ts'
import { PAPER as EOY_2022_SECOND } from './101-eoy-2022-second.ts'
import { PAPER as CASES_2025 } from './101-eoy-2025-cases.ts'
import { PAPER as BAQOON_2024 } from './101-baqoon-2024.ts'
import { PAPER as BAQOON_2023 } from './101-baqoon-2023.ts'

export const REGISTRATIONS_Y1: Registration[] = [
  { module: '101 ISK', load: () => EOY_2025 },
  { module: '101 ISK', load: () => EOY_2024 },
  { module: '101 ISK', load: () => EOY_2022 },
  { module: '101 ISK', load: () => EOY_2022_SECOND },
  { module: '101 ISK', load: () => BAQOON_2024 },
  { module: '101 ISK', load: () => BAQOON_2023 },
  { module: '101 ISK', load: () => CASES_2025 },
  { module: '102 INT', load: () => paperFromJson('scripts/kasr/extract/102-INT/eoy-2025-199.json') },
  { module: '102 INT', load: () => paperFromJson('scripts/kasr/extract/102-INT/eoy-2024-198.json') },
]
