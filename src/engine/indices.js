
/**
 * Dynamic constituent counts and simulated cap-weighted index calculations.
 */
import { RAW_COMPANIES } from '../data/companies.js';
import { SECTORS } from '../data/sectors.js';
import { FINANCIAL_LESSONS } from '../data/lessons.js';

/**
 * Dynamically computes dataset and index constituent counts.
 */
export function getDatasetCounts(companies = RAW_COMPANIES) {
  const listedCount = companies.length;
  const niftyCount = companies.filter(c => c.inNifty).length;
  const sensexCount = companies.filter(c => c.inSensex).length;
  const sectorCount = SECTORS.length;
  const lessonCount = Object.keys(FINANCIAL_LESSONS).length;

  return {
    listedCount,
    niftyCount,
    sensexCount,
    sectorCount,
    lessonCount
  };
}

/**
 * Updates NIFTY 50 (Simulated) and SENSEX (Simulated) levels based on
 * constituent market-capitalization weights.
 */
export function updateSimulatedIndices(liveState) {
  const niftyConstituents = liveState.companies.filter(c => c.inNifty);
  const niftyMcap = niftyConstituents.reduce((sum, c) => sum + c.marketCap, 0);
  const niftyObj = liveState.indices.NIFTY;
  niftyObj.constituentCount = niftyConstituents.length;

  if (niftyObj.baseMcap > 0) {
    niftyObj.current = Number(((niftyMcap / niftyObj.baseMcap) * niftyObj.baseLevel).toFixed(2));
    niftyObj.change = Number((niftyObj.current - niftyObj.baseLevel).toFixed(2));
    niftyObj.changePercent = Number(((niftyObj.change / niftyObj.baseLevel) * 100).toFixed(2));
  }

  const sensexConstituents = liveState.companies.filter(c => c.inSensex);
  const sensexMcap = sensexConstituents.reduce((sum, c) => sum + c.marketCap, 0);
  const sensexObj = liveState.indices.SENSEX;
  sensexObj.constituentCount = sensexConstituents.length;

  if (sensexObj.baseMcap > 0) {
    sensexObj.current = Number(((sensexMcap / sensexObj.baseMcap) * sensexObj.baseLevel).toFixed(2));
    sensexObj.change = Number((sensexObj.current - sensexObj.baseLevel).toFixed(2));
    sensexObj.changePercent = Number(((sensexObj.change / sensexObj.baseLevel) * 100).toFixed(2));
  }
}