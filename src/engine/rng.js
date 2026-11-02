/**
 * Mulberry32 Deterministic Seeded PRNG.
 * Two separate instances are exported:
 * - `simRng`: exclusively for financial simulation (prices, volumes, multi-horizon histories).
 * - `visualRng`: exclusively for 3D visual props, traffic, and weather particles.
 */
export class SeededRNG {
  constructor(seed = 20261102) {
    this.initialSeed = seed >>> 0;
    this.state = this.initialSeed;
  }

  reset() {
    this.state = this.initialSeed;
  }

  next() {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  range(min, max) {
    return min + this.next() * (max - min);
  }
}

export const simRng = new SeededRNG(4092026);
export const visualRng = new SeededRNG(9021042);
