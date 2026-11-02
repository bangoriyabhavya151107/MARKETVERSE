/**
 * Formatting helpers for Indian Rupee (INR ₹) prices, percentages, Market Cap in Crores,
 * and IST simulation session timestamps.
 */

export function fmtPrice(v) {
  if (v === null || v === undefined || Number.isNaN(v)) return 'Unavailable';
  return '₹' + v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function fmtPct(v) {
  if (v === null || v === undefined || Number.isNaN(v)) return 'Unavailable';
  const sign = v > 0.0001 ? '+' : '';
  const arrow = v > 0.0001 ? '▲ ' : v < -0.0001 ? '▼ ' : '• ';
  return arrow + sign + v.toFixed(2) + '%';
}

export function fmtMcapCr(cr) {
  if (cr === null || cr === undefined || Number.isNaN(cr)) return 'Unavailable';
  if (Math.abs(cr) >= 100000) {
    const sign = cr < 0 ? '-' : '';
    return sign + '₹' + (Math.abs(cr) / 100000).toFixed(2) + ' L Cr';
  }
  return '₹' + Math.round(cr).toLocaleString('en-IN') + ' Cr';
}

export function formatSimClock(sec) {
  const h = Math.floor(sec / 3600) % 24;
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} IST`;
}