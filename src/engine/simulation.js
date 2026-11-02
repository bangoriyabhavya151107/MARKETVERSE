/**
 * Deterministic Market Simulation Engine.
 * - Uses `simRng` exclusively so resets are 100% deterministic.
 * - Generates distinct seeded histories for 1D, 1W, 1M, 3M, and 1Y at init (never scaling 1D).
 * - Implements event duration & per-tick decay, 5-second atmospheric visual cue,
 *   plus `endActiveEvent()` separate from `resetFullSimulation()`.
 */
import { store } from '../state/store.js';
import { simRng } from './rng.js';
import { RAW_COMPANIES } from '../data/companies.js';
import { SECTORS, SECTOR_MAP } from '../data/sectors.js';
import { ECONOMIC_EVENTS } from '../data/events.js';
import { recalculateAllFinancials } from './finance.js';
import { recordReplaySnapshot, returnToLiveReplay } from './replay.js';
import { formatSimClock } from '../utils/format.js';

const HORIZON_CONFIGS = {
  '1D': { points: 20, stepRange: 0.0042, volScale: 0.06 },
  '1W': { points: 24, stepRange: 0.011, volScale: 0.35 },
  '1M': { points: 26, stepRange: 0.019, volScale: 0.95 },
  '3M': { points: 28, stepRange: 0.028, volScale: 1.15 },
  '1Y': { points: 30, stepRange: 0.042, volScale: 1.45 }
};

const EVENT_CUE_COLORS = {
  RATE_HIKE: 0x3888ff,       // Cold blue wash
  RATE_CUT: 0x22c58b,        // Accommodative emerald-teal wash
  OIL_SPIKE: 0xe8832a,       // Crude amber-orange wash
  TECH_SELLOFF: 0x8a4fff,    // Electric violet-indigo wash
  STRONG_EARNINGS: 0xffc83d, // Radiant golden wash
  INR_DEPREC: 0xd97845,      // Copper-bronze wash
  RISK_OFF: 0xd93848         // Alert crimson wash
};

/**
 * Generates an authentic seeded historical series for a specific horizon
 * that walks deterministically and terminates at `currentPrice`.
 */
function generateSeededHorizonSeries(basePrice, currentPrice, baseVolume, horizonKey) {
  const cfg = HORIZON_CONFIGS[horizonKey];
  const rawWalk = [basePrice];
  let p = basePrice;

  for (let i = 1; i < cfg.points; i++) {
    const step = simRng.range(-cfg.stepRange, cfg.stepRange * 1.03);
    p = Math.max(5, p * (1 + step));
    rawWalk.push(p);
  }

  const lastRaw = rawWalk[rawWalk.length - 1];
  const priceSeries = rawWalk.map((val, idx) => {
    if (idx === rawWalk.length - 1) return currentPrice;
    const progress = idx / (rawWalk.length - 1);
    const adjusted = val + (currentPrice - lastRaw) * progress;
    return Number(Math.max(5, adjusted).toFixed(2));
  });

  const volSeries = priceSeries.map(() =>
    Math.round(baseVolume * cfg.volScale * simRng.range(0.65, 1.35))
  );

  return { priceSeries, volSeries };
}

/**
 * Initializes or resets the entire simulation dataset to its deterministic seed state.
 */
export function initDataset() {
  simRng.reset();
  const live = store.getLiveState();

  live.simTickCount = 0;
  live.simSecondsFromOpen = 36900; // 10:15:00 IST
  live.activeEventId = 'NONE';
  live.eventRemainingTicks = 0;
  live.eventTotalTicks = 0;
  live.eventCue = { id: 'NONE', colorHex: 0x4b8be8, timer: 0, duration: 5.0 };
  live.replayHistory = [];
  live.replayIndex = -1;
  live.replayViewState = null;
  live.whatIf.customPrice = null;
  live.whatIf.customSharesCr = null;
  live.whatIf.snapshotBefore = null;

  const sectorCounters = {};
  SECTORS.forEach(s => {
    sectorCounters[s.id] = 0;
  });

  live.companies = RAW_COMPANIES.map(raw => {
    const idxInSector = sectorCounters[raw.sector]++;
    const sec = SECTOR_MAP[raw.sector];
    const cols = 3;
    const col = idxInSector % cols;
    const row = Math.floor(idxInSector / cols);
    const offsetX = (col - 1) * 14;
    const offsetZ = (row - 0.5) * 15;

    const initMovePct = simRng.range(-0.018, 0.021);
    const previousClose = raw.basePrice;
    const price = Number((previousClose * (1 + initMovePct)).toFixed(2));
    const change = Number((price - previousClose).toFixed(2));
    const changePercent = Number(((change / previousClose) * 100).toFixed(2));
    const marketCap = Number((price * raw.sharesCr).toFixed(2));
    const baseVolume = Math.round(simRng.range(120000, 3800000));
    const eps = raw.pe ? Number((previousClose / raw.pe).toFixed(2)) : null;

    const histories = {};
    const volHistories = {};
    ['1D', '1W', '1M', '3M', '1Y'].forEach(hKey => {
      const { priceSeries, volSeries } = generateSeededHorizonSeries(previousClose, price, baseVolume, hKey);
      histories[hKey] = priceSeries;
      volHistories[hKey] = volSeries;
    });

    const high52W = Number(Math.max(...histories['1Y'], previousClose * simRng.range(1.12, 1.28)).toFixed(2));
    const low52W = Number(Math.min(...histories['1Y'], previousClose * simRng.range(0.74, 0.89)).toFixed(2));

    return {
      id: raw.id,
      symbol: raw.symbol,
      companyName: raw.companyName,
      exchange: raw.exchange,
      sector: raw.sector,
      previousClose,
      price,
      change,
      changePercent,
      sharesOutstandingCr: raw.sharesCr,
      baseSharesCr: raw.sharesCr,
      marketCap,
      volume: baseVolume,
      avgDailyVolume: Math.round(baseVolume * 0.92),
      high52W,
      low52W,
      pe: raw.pe ? Number((price / eps).toFixed(2)) : null,
      eps,
      divYield: raw.divYield,
      inNifty: raw.inNifty,
      inSensex: raw.inSensex,
      currency: 'INR',
      timestamp: formatSimClock(live.simSecondsFromOpen),
      source: 'MarketVerse Deterministic Seed Engine',
      dataStatus: 'SIMULATED',
      pos: { x: sec.center.x + offsetX, z: sec.center.z + offsetZ },
      history1D: histories['1D'],
      volHistory: volHistories['1D'],
      histories,
      volHistories,
      pulseIntensity: 0
    };
  });

  live.indices.NIFTY.baseMcap = live.companies
    .filter(c => c.inNifty)
    .reduce((acc, c) => acc + c.previousClose * c.sharesOutstandingCr, 0);

  live.indices.SENSEX.baseMcap = live.companies
    .filter(c => c.inSensex)
    .reduce((acc, c) => acc + c.previousClose * c.sharesOutstandingCr, 0);

  live.totals.baseMcapCr = live.companies.reduce(
    (acc, c) => acc + c.previousClose * c.sharesOutstandingCr,
    0
  );

  live.indices.NIFTY.history = [live.indices.NIFTY.baseLevel];
  live.indices.SENSEX.history = [live.indices.SENSEX.baseLevel];
  live.totals.mcapHistory = [live.totals.baseMcapCr];
  live.totals.volHistory = [];

  recalculateAllFinancials(live);
  live.totals.volHistory.push(live.totals.volumeCr);
  recordReplaySnapshot();
}

/**
 * Advances the live simulation by 1 tick.
 */
export function stepMarketSimulation() {
  const live = store.getLiveState();
  if (live.dataMode !== 'SIMULATION' || live.replayIndex !== -1) return;

  live.simTickCount++;
  live.simSecondsFromOpen += 15;

  const activeEvent = ECONOMIC_EVENTS[live.activeEventId] || ECONOMIC_EVENTS.NONE;
  let decayMultiplier = 0;

  if (live.activeEventId !== 'NONE' && live.eventRemainingTicks > 0) {
    decayMultiplier = live.eventRemainingTicks / Math.max(1, live.eventTotalTicks);
  }

  live.companies.forEach(c => {
    const rawImpact = activeEvent.impacts[c.sector] || 0;
    const sectorDrift = rawImpact * 0.14 * decayMultiplier;
    const randomStep = simRng.range(-0.0055, 0.0056);
    const totalPctStep = sectorDrift + randomStep;
    const nextPrice = Math.max(5, Number((c.price * (1 + totalPctStep)).toFixed(2)));
    const deltaAbs = Math.abs((nextPrice - c.price) / c.price);

    c.price = nextPrice;
    const tradeChunk = Math.round(simRng.range(8000, 65000) * (1 + deltaAbs * 80));
    c.volume += tradeChunk;

    c.histories['1D'].push(c.price);
    if (c.histories['1D'].length > 30) c.histories['1D'].shift();
    c.volHistories['1D'].push(tradeChunk);
    if (c.volHistories['1D'].length > 30) c.volHistories['1D'].shift();

    ['1W', '1M', '3M', '1Y'].forEach(hKey => {
      const arr = c.histories[hKey];
      if (arr && arr.length > 0) {
        arr[arr.length - 1] = c.price;
      }
    });

    if (deltaAbs > 0.003) {
      c.pulseIntensity = 1.0;
    }
  });

  if (live.activeEventId !== 'NONE') {
    live.eventRemainingTicks = Math.max(0, live.eventRemainingTicks - 1);
    if (live.eventRemainingTicks === 0) {
      live.activeEventId = 'NONE';
      live.eventTotalTicks = 0;
      store.emit('event');
    }
  }

  recalculateAllFinancials(live);

  live.indices.NIFTY.history.push(live.indices.NIFTY.current);
  if (live.indices.NIFTY.history.length > 25) live.indices.NIFTY.history.shift();

  live.indices.SENSEX.history.push(live.indices.SENSEX.current);
  if (live.indices.SENSEX.history.length > 25) live.indices.SENSEX.history.shift();

  live.totals.mcapHistory.push(live.totals.mcapCr);
  if (live.totals.mcapHistory.length > 25) live.totals.mcapHistory.shift();

  live.totals.volHistory.push(live.totals.volumeCr);
  if (live.totals.volHistory.length > 25) live.totals.volHistory.shift();

  recordReplaySnapshot();
  store.emit('tick');
}

/**
 * Applies a hypothetical economic event with immediate impulse, decaying duration,
 * and a 5-second visual atmospheric cue.
 */
export function applyEconomicEvent(eventId) {
  returnToLiveReplay();
  const live = store.getLiveState();

  if (!eventId || eventId === 'NONE') {
    endActiveEvent();
    return;
  }

  const ev = ECONOMIC_EVENTS[eventId];
  if (!ev) return;

  live.activeEventId = eventId;
  live.eventTotalTicks = ev.durationTicks || 10;
  live.eventRemainingTicks = live.eventTotalTicks;

  // Trigger 5-second visual atmospheric wash for the event
  live.eventCue = {
    id: eventId,
    colorHex: EVENT_CUE_COLORS[eventId] || 0x4b8be8,
    timer: 5.0,
    duration: 5.0
  };

  live.companies.forEach(c => {
    const impact = ev.impacts[c.sector] || 0;
    const jitter = simRng.range(-0.003, 0.003);
    c.price = Math.max(5, Number((c.price * (1 + impact + jitter)).toFixed(2)));
    c.histories['1D'].push(c.price);
    if (c.histories['1D'].length > 30) c.histories['1D'].shift();
    ['1W', '1M', '3M', '1Y'].forEach(hKey => {
      const arr = c.histories[hKey];
      if (arr && arr.length > 0) arr[arr.length - 1] = c.price;
    });
    c.pulseIntensity = 1.0;
  });

  recalculateAllFinancials(live);
  recordReplaySnapshot();
  store.emit('event');
  store.emit('tick');
}

/**
 * Ends the currently active hypothetical event WITHOUT resetting simulation progress.
 */
export function endActiveEvent() {
  const live = store.getLiveState();
  live.activeEventId = 'NONE';
  live.eventRemainingTicks = 0;
  live.eventTotalTicks = 0;
  live.eventCue.timer = 0;
  store.emit('event');
  store.emit('tick');
}

/**
 * Resets the entire simulation back to the initial deterministic seed state.
 */
export function resetFullSimulation() {
  initDataset();
  store.emit('event');
  store.emit('replay');
  store.emit('whatif');
  store.emit('tick');
}