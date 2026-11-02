/**
 * Educational market alert evaluation.
 */
import { store } from '../state/store.js';
import { SECTOR_MAP } from '../data/sectors.js';
import { fmtPct } from '../utils/format.js';

export function checkEducationalAlerts(liveState = store.getLiveState()) {
  let newlyTriggered = false;

  liveState.alerts.forEach(al => {
    if (al.type === 'COMPANY_PCT') {
      const c = liveState.companies.find(x => x.id === al.targetId);
      if (c && Math.abs(c.changePercent) >= al.thresholdPct) {
        const msg = `[SIMULATED] ${c.symbol} moved ${fmtPct(c.changePercent)} (crossed ±${al.thresholdPct}% threshold at ${c.timestamp})`;
        if (!liveState.triggeredAlerts.includes(msg)) {
          liveState.triggeredAlerts.unshift(msg);
          if (liveState.triggeredAlerts.length > 15) liveState.triggeredAlerts.pop();
          newlyTriggered = true;
        }
      }
    } else if (al.type === 'SECTOR_PCT') {
      const list = liveState.companies.filter(c => c.sector === al.targetId);
      let totalMcap = 0;
      let prevMcap = 0;
      list.forEach(c => {
        totalMcap += c.marketCap;
        prevMcap += c.previousClose * c.sharesOutstandingCr;
      });
      const capWeightedChangePct = prevMcap > 0 ? Number((((totalMcap - prevMcap) / prevMcap) * 100).toFixed(2)) : 0;
      const sector = SECTOR_MAP[al.targetId];
      if (sector && Math.abs(capWeightedChangePct) >= al.thresholdPct) {
        const msg = `[SIMULATED] ${sector.short} Sector moved ${fmtPct(capWeightedChangePct)} (crossed ±${al.thresholdPct}% threshold)`;
        if (!liveState.triggeredAlerts.includes(msg)) {
          liveState.triggeredAlerts.unshift(msg);
          if (liveState.triggeredAlerts.length > 15) liveState.triggeredAlerts.pop();
          newlyTriggered = true;
        }
      }
    }
  });

  if (newlyTriggered) {
    store.emit('alerts');
  }
}