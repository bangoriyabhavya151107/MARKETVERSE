/**
 * 6 Investor Learning District Landmarks.
 */
export const LEARNING_LANDMARKS = [
  {
    id: 'LEARN_MCAP',
    name: 'Market-Capitalization Monument',
    short: 'M-Cap Monument',
    conceptKey: 'marketCap',
    pos: { x: -34, z: 42 },
    color: 0x4b8be8,
    summary: 'Visualizes why Company Scale = Share Price × Outstanding Shares. Two towers side by side show how a ₹400 stock with 500 Cr shares is much larger than a ₹4,000 stock with 10 Cr shares.'
  },
  {
    id: 'LEARN_PVV',
    name: 'Price-versus-Volume Demonstration',
    short: 'Price vs Volume',
    conceptKey: 'volume',
    pos: { x: -12, z: 42 },
    color: 0x3baa91,
    summary: 'Demonstrates how price movement and trading activity are distinct dimensions: a stock can move 3% on thin volume or trade millions of shares while closing flat.'
  },
  {
    id: 'LEARN_BULLBEAR',
    name: 'Bull-versus-Bear Market Sculpture',
    short: 'Bull & Bear Plaza',
    conceptKey: 'bullBear',
    pos: { x: 12, z: 42 },
    color: 0xd6a84f,
    summary: 'Contrasts sustained broad-market optimism (Bull) and pessimism (Bear) against single-day noise or single-company movement.'
  },
  {
    id: 'LEARN_DIVERSIFY',
    name: 'Diversified Portfolio Garden',
    short: 'Portfolio Garden',
    conceptKey: 'diversification',
    pos: { x: 34, z: 42 },
    color: 0x22a06b,
    summary: 'A multi-species grove showing how spreading capital across uncorrelated sectors cushions sector-specific shocks compared to a monoculture.'
  },
  {
    id: 'LEARN_RISK',
    name: 'Risk-and-Return Observation Tower',
    short: 'Risk-Return Tower',
    conceptKey: 'riskReturn',
    pos: { x: -22, z: 58 },
    color: 0xd94f52,
    summary: 'Higher vantage points offer wider potential horizons but experience stronger wind variance—illustrating uncertainty, volatility, and drawdown risk.'
  },
  {
    id: 'LEARN_INDEX',
    name: 'Market-Index Information Plaza',
    short: 'Index Plaza',
    conceptKey: 'indices',
    pos: { x: 22, z: 58 },
    color: 0xb58ae0,
    summary: 'Explains how benchmark indices like NIFTY 50 and SENSEX summarize a defined basket of companies using free-float market-capitalization weights.'
  }
];