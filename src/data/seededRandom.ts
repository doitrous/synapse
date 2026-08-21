/**
 * One seeded source of randomness, shared by everything that has to be the
 * same for two people at once.
 *
 * Term Grid, Spotter and Term Match are all shared by sending a link with a
 * seed in it: both players build the identical puzzle locally and there is no
 * server, no table, and nothing to be out of step. That only holds while every
 * draw comes from here — a single `Math.random()` in any of them would give two
 * friends different games with no error to notice.
 */

/**
 * A deterministic source for one seed.
 *
 * The seed is mixed (splitmix-style) before it drives the xorshift because
 * seeds in practice are small and adjacent — a link seeded 1 and the next
 * seeded 2. Feeding those into a raw xorshift state produces near-identical
 * early output and therefore near-identical games; mixing first makes
 * neighbouring seeds diverge from the very first draw.
 */
export function seededRandom(seed: number): () => number {
  let state = Math.imul(seed | 0, 0x9e3779b1) ^ 0x85ebca6b
  state = Math.imul(state ^ (state >>> 16), 0x21f0aaad)
  state = Math.imul(state ^ (state >>> 15), 0x735a2d97)
  state = (state ^ (state >>> 15)) >>> 0
  // xorshift32 is dead at zero, so nudge it off that one bad state.
  if (state === 0) state = 0x6d2b79f5
  return () => {
    state ^= state << 13
    state >>>= 0
    state ^= state >>> 17
    state ^= state << 5
    state >>>= 0
    return state / 0x1_0000_0000
  }
}

/** Fisher–Yates, drawing only from the seeded source. */
export function shuffle<T>(items: T[], random: () => number): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
