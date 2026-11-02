/**
 * 7 Hypothetical Economic Events (+ Baseline NONE).
 * Each event includes `durationTicks` so its drift impact decays smoothly over N ticks
 * and can also be ended early via "End Event" without resetting the simulation.
 */
export const ECONOMIC_EVENTS = {
  NONE: {
    id: 'NONE',
    name: 'Baseline Market Session (No Active Shock)',
    description: 'Normal simulated order flow with independent company activity and low macro drift.',
    sectorsAffected: 'All sectors operating under baseline stochastic drift.',
    assumptions: 'Assumes neutral macroeconomic news flow during the simulated window.',
    durationTicks: 0,
    impacts: {}
  },
  RATE_HIKE: {
    id: 'RATE_HIKE',
    name: 'Central Bank Interest-Rate Increase (+50 bps)',
    description: 'Hypothetical monetary policy tightening scenario where benchmark borrowing rates are raised to curb inflation.',
    sectorsAffected: 'Banking (mixed/margin sensitivity), Automotive (-), Infrastructure (-), Technology (-), Consumer (-)',
    assumptions: 'Hypothetical model assumes higher discount rates compress high-multiple growth valuations and increase financing costs for rate-sensitive borrowers.',
    durationTicks: 12,
    impacts: { BANKING: -0.018, AUTO: -0.032, INFRA_IND: -0.028, TECH: -0.022, CONSUMER: -0.012, HEALTH: 0.006, ENERGY: -0.008, TELECOM: -0.015, MATERIALS: -0.02, OTHER: -0.015 }
  },
  RATE_CUT: {
    id: 'RATE_CUT',
    name: 'Central Bank Interest-Rate Decrease (-50 bps)',
    description: 'Hypothetical accommodative policy shift lowering borrowing costs across the economy.',
    sectorsAffected: 'Banking (+), Automotive (+), Infrastructure (+), Consumer (+), Materials (+)',
    assumptions: 'Hypothetical model assumes lower credit costs support capital expenditure, auto/housing demand, and equity valuation multiples.',
    durationTicks: 12,
    impacts: { BANKING: 0.026, AUTO: 0.034, INFRA_IND: 0.030, TECH: 0.022, CONSUMER: 0.020, HEALTH: 0.008, ENERGY: 0.014, TELECOM: 0.016, MATERIALS: 0.024, OTHER: 0.018 }
  },
  OIL_SPIKE: {
    id: 'OIL_SPIKE',
    name: 'Crude Oil Price Surge (+18%)',
    description: 'Hypothetical global supply disruption driving energy feedstock prices higher.',
    sectorsAffected: 'Energy (+ upstream / mixed downstream), Automotive (-), Materials (-), Consumer (-)',
    assumptions: 'Assumes higher input and logistics costs pressure fuel-intensive industries while benefiting upstream energy producers.',
    durationTicks: 10,
    impacts: { ENERGY: 0.032, AUTO: -0.029, CONSUMER: -0.021, MATERIALS: -0.019, INFRA_IND: -0.016, BANKING: -0.012, TECH: 0.004, HEALTH: 0.003, TELECOM: -0.005, OTHER: -0.014 }
  },
  TECH_SELLOFF: {
    id: 'TECH_SELLOFF',
    name: 'Broad Technology-Sector Sell-Off',
    description: 'Hypothetical slowdown in global enterprise IT spending triggers a reassessment of technology multiples.',
    sectorsAffected: 'Information Technology (--), Telecom (-), Healthcare (+ defensive rotation), Consumer (+ defensive)',
    assumptions: 'Assumes institutional rotation out of export-oriented IT services into domestic defensive sectors.',
    durationTicks: 10,
    impacts: { TECH: -0.052, TELECOM: -0.018, BANKING: -0.005, HEALTH: 0.018, CONSUMER: 0.014, ENERGY: 0.008, AUTO: 0.002, INFRA_IND: 0.004, MATERIALS: -0.004, OTHER: -0.008 }
  },
  STRONG_EARNINGS: {
    id: 'STRONG_EARNINGS',
    name: 'Strong Corporate Earnings Season',
    description: 'Hypothetical broad-based quarterly profit beat across major domestic and export sectors.',
    sectorsAffected: 'Banking (+), Technology (+), Automotive (+), Industrials (+), Consumer (+)',
    assumptions: 'Assumes stronger operating margins and upward earnings-per-share revisions across cyclicals and leaders.',
    durationTicks: 14,
    impacts: { BANKING: 0.031, TECH: 0.035, AUTO: 0.029, INFRA_IND: 0.027, CONSUMER: 0.024, HEALTH: 0.019, MATERIALS: 0.025, TELECOM: 0.021, ENERGY: 0.020, OTHER: 0.022 }
  },
  INR_DEPREC: {
    id: 'INR_DEPREC',
    name: 'Currency Depreciation Scenario (INR Weakens)',
    description: 'Hypothetical scenario where the domestic currency depreciates against the US Dollar.',
    sectorsAffected: 'Information Technology (+ export revenue), Healthcare (+ pharma exports), Energy (- import costs), Auto (- imported components)',
    assumptions: 'Assumes exporters earning USD revenue see rupee margin tailwinds while net importers face higher landed costs.',
    durationTicks: 12,
    impacts: { TECH: 0.038, HEALTH: 0.028, ENERGY: -0.024, AUTO: -0.018, MATERIALS: -0.012, BANKING: -0.010, CONSUMER: -0.009, TELECOM: -0.011, INFRA_IND: -0.013, OTHER: -0.008 }
  },
  RISK_OFF: {
    id: 'RISK_OFF',
    name: 'Broad Market Risk-Off Event',
    description: 'Hypothetical global geopolitical or liquidity shock prompting broad equity de-risking.',
    sectorsAffected: 'All sectors experience downward pressure; Healthcare & Consumer show lower relative beta.',
    assumptions: 'Assumes correlated selling across high-beta and cyclical equities with relative resilience in defensive staples.',
    durationTicks: 10,
    impacts: { BANKING: -0.038, TECH: -0.034, ENERGY: -0.030, AUTO: -0.042, INFRA_IND: -0.040, MATERIALS: -0.044, TELECOM: -0.022, OTHER: -0.036, HEALTH: -0.012, CONSUMER: -0.015 }
  }
};