/**
 * Core financial formulas:
 * - Market Cap = Share Price × Outstanding Shares
 * - Cap-tier classification (Large-Cap, Mid-Cap, Small-Cap)
 * - Cap-weighted & Equal-weighted Sector returns
 */
import { store } from '../state/store.js';
import { SECTOR_MAP } from '../data/sectors.js';
import { formatSimClock } from '../utils/format.js';
import { updateSimulatedIndices } from './indices.js';
import { checkEducationalAlerts } from './alerts.js';

export function getCapTier(mcapCr, thresholds = store.getViewState().mcapThresholds) {
  if (mcapCr >= thresholds.largeCr) return 'Large-Cap';
  if (mcapCr >= thresholds.midCr) return 'Mid-Cap';
  return 'Small-Cap';
}

export function recalculateAllFinancials(targetState = store.getLiveState()) {
  const clockStr = formatSimClock(targetState.simSecondsFromOpen);
  let totalMcap = 0;
  let totalVol = 0;
  let adv = 0;
  let dec = 0;
  let unch = 0;

  targetState.companies.forEach(c => {
    c.change = Number((c.price - c.previousClose).toFixed(2));
    c.changePercent = c.previousClose > 0 ? Number(((c.change / c.previousClose) * 100).toFixed(2)) : 0;
    c.marketCap = Number((c.price * c.sharesOutstandingCr).toFixed(2));
    if (c.eps && c.eps > 0) {
      c.pe = Number((c.price / c.eps).toFixed(2));
    }
    c.timestamp = clockStr;
    c.dataStatus = targetState.dataMode === 'SIMULATION' ? 'SIMULATED' : 'UNCONFIGURED_PROVIDER';

    totalMcap += c.marketCap;
    totalVol += c.volume;
    if (c.changePercent > 0.02) adv++;
    else if (c.changePercent < -0.02) dec++;
    else unch++;
  });

  targetState.totals.listedCount = targetState.companies.length;
  targetState.totals.mcapCr = Number(totalMcap.toFixed(2));
  targetState.totals.mcapChangePct =
    targetState.totals.baseMcapCr > 0
      ? Number((((totalMcap - targetState.totals.baseMcapCr) / targetState.totals.baseMcapCr) * 100).toFixed(2))
      : 0;
  targetState.totals.volumeCr = Number((totalVol / 10000000).toFixed(2));
  targetState.totals.advancing = adv;
  targetState.totals.declining = dec;
  targetState.totals.unchanged = unch;

  updateSimulatedIndices(targetState);

  const niftyPct = targetState.indices.NIFTY.changePercent;
  if (niftyPct >= 0.35) targetState.totals.mood = 'BULLISH';
  else if (niftyPct <= -0.35) targetState.totals.mood = 'BEARISH';
  else targetState.totals.mood = 'SIDEWAYS';

  checkEducationalAlerts(targetState);
}

/**
 * Computes Cap-Weighted and Equal-Weighted statistics for a sector from any viewState.
 */
export function getSectorStats(sectorId, viewState = store.getViewState()) {
  const list = viewState.companies.filter(c => c.sector === sectorId);
  let totalMcap = 0;
  let prevMcap = 0;
  let totalVol = 0;
  let eqSumPct = 0;
  let strongest = null;
  let weakest = null;

  list.forEach(c => {
    totalMcap += c.marketCap;
    prevMcap += c.previousClose * c.sharesOutstandingCr;
    totalVol += c.volume;
    eqSumPct += c.changePercent;
    if (!strongest || c.changePercent > strongest.changePercent) strongest = c;
    if (!weakest || c.changePercent < weakest.changePercent) weakest = c;
  });

  const capWeightedChangePct = prevMcap > 0 ? Number((((totalMcap - prevMcap) / prevMcap) * 100).toFixed(2)) : 0;
  const equalWeightedChangePct = list.length > 0 ? Number((eqSumPct / list.length).toFixed(2)) : 0;

  return {
    sector: SECTOR_MAP[sectorId],
    companies: list,
    totalMcap,
    totalVol,
    capWeightedChangePct,
    equalWeightedChangePct,
    strongest,
    weakest
  };
}