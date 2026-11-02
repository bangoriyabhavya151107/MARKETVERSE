/**
 * 12 Comprehensive Financial Education Lessons.
 */
export const FINANCIAL_LESSONS = {
  marketCap: {
    title: 'Market Capitalization',
    meaning: "Market capitalization (Market Cap) is the total market value of a company's outstanding equity shares at the current market price.",
    formula: 'Market Capitalization = Share Price × Total Outstanding Shares',
    example: "Company A has a share price of ₹500 and 200 Crore shares (Market Cap = ₹1,00,000 Cr). Company B has a share price of ₹5,000 and 5 Crore shares (Market Cap = ₹25,000 Cr). Even though Company B's share price is 10× higher, Company A is 4× larger in market capitalization.",
    whyItMatters: 'It tells you the aggregate equity scale of a company, determines its classification (Large-, Mid-, or Small-Cap), and governs its weight in market-cap-weighted indices.',
    whatItDoesNotTell: "Market cap is NOT the company's cash in the bank, annual revenue, enterprise value (which includes debt), or the total cash sitting inside the stock market. Also, a taller building in MarketVerse indicates larger scale, never superior investment quality."
  },
  priceVsSize: {
    title: 'Stock Price vs. Company Size',
    meaning: "A single share's nominal price only tells you the price of one slice of ownership—without knowing how many slices exist, the share price alone says nothing about how big or 'expensive' the company is.",
    formula: '1 Share = (1 ÷ Total Outstanding Shares) of Total Equity',
    example: "If a ₹2,000 stock undergoes a 10-for-1 stock split, its share price becomes ₹200 and share count multiplies by 10. The company's size and value have not changed at all.",
    whyItMatters: "Prevents beginners from mistakenly thinking a ₹80 stock is 'cheaper' or has 'more room to grow' than a ₹3,500 stock.",
    whatItDoesNotTell: 'Nominal share price does not tell you valuation (see P/E ratio) or company scale (see Market Cap).'
  },
  percentChange: {
    title: 'Absolute vs. Percentage Change',
    meaning: 'Absolute change is the rupee difference from the previous close, while percentage change normalizes that movement relative to the starting price.',
    formula: 'Change (%) = ((Current Price − Previous Close) ÷ Previous Close) × 100',
    example: 'A ₹20 gain on a ₹200 stock is a +10.00% return. The same ₹20 gain on a ₹2,000 stock is only a +1.00% return.',
    whyItMatters: 'Percentage change allows fair comparison of performance across stocks, sectors, and indices with completely different nominal price levels.',
    whatItDoesNotTell: "A single day's percentage change does not tell you long-term trend stability or fundamental business value."
  },
  volume: {
    title: 'Trading Volume',
    meaning: 'Trading volume counts the total number of shares exchanged between buyers and sellers during a given session.',
    formula: 'Volume = Sum of Shares Traded in All Matched Orders',
    example: 'If 500 buyers each purchase 1,000 shares from 500 sellers, total volume is 5,00,000 shares (not 10,00,000—every trade has both a buyer and a seller).',
    whyItMatters: 'Shows participation intensity. High relative volume alongside news or earnings indicates strong institutional or retail activity.',
    whatItDoesNotTell: "High volume does NOT automatically mean 'more buyers than sellers' (every traded share has both) nor does it guarantee high liquidity or a rising price."
  },
  liquidity: {
    title: 'Market Liquidity & Bid-Ask Spread',
    meaning: 'Liquidity measures how quickly and easily an asset can be bought or sold in meaningful size without causing a large impact on its market price.',
    formula: 'Bid-Ask Spread (%) = ((Best Ask − Best Bid) ÷ Mid-Price) × 100',
    example: 'Stock X has a Best Bid of ₹999.90 and Best Ask of ₹1,000.00 with deep order queues (tight spread, high liquidity). Stock Y has a Bid of ₹985 and Ask of ₹1,015 with only 50 shares available (wide spread, low liquidity).',
    whyItMatters: 'Low liquidity increases implicit transaction costs (slippage) when entering or exiting positions.',
    whatItDoesNotTell: 'A stock with temporary high volume during a panic crash can still suffer from poor order-book depth (low liquidity).'
  },
  indices: {
    title: 'Market Indices (NIFTY 50 & SENSEX)',
    meaning: 'A market index tracks the aggregate performance of a rules-based basket of securities to summarize a market segment or the broad equity market.',
    formula: 'Index Level = (Current Free-Float Market Cap of Basket ÷ Base Period Market Cap) × Base Index Value',
    example: 'NIFTY 50 tracks 50 large, liquid Indian companies across sectors on the NSE; SENSEX tracks 30 major companies on the BSE.',
    whyItMatters: 'Provides a benchmark to evaluate whether an individual stock, sector, or portfolio outperformed or underperformed the broader market.',
    whatItDoesNotTell: 'An official index is calculated using specific free-float weights and divisor adjustments—averaging arbitrary stock prices does not produce an official index.'
  },
  bullBear: {
    title: 'Bull and Bear Markets',
    meaning: 'Broad descriptors of sustained market sentiment and price direction over extended periods (months or years), plus sideways/range-bound phases.',
    formula: 'Simulated Session Rule in MarketVerse: Index > +0.35% (Bullish Bias), < -0.35% (Bearish Bias), else Sideways',
    example: 'During a broad bull trend, cyclical sectors may expand while a specific company with weak earnings still falls.',
    whyItMatters: 'Helps distinguish macroeconomic/market-wide tailwinds or headwinds from company-specific news.',
    whatItDoesNotTell: 'Short-term intraday mood is not a statistically established macroeconomic regime.'
  },
  volatility: {
    title: 'Price Volatility',
    meaning: 'Volatility measures the magnitude and dispersion of price fluctuations over time—both upward and downward.',
    formula: 'Standard Deviation of Periodic Logarithmic or Percentage Returns',
    example: 'Stock A moves between -0.3% and +0.4% daily (low volatility). Stock B swings between -4.5% and +5.0% daily (high volatility).',
    whyItMatters: 'Higher volatility means wider outcome uncertainty and greater chance of sharp short-term drawdowns.',
    whatItDoesNotTell: 'Volatility is not direction—a volatile stock can end the year higher, lower, or unchanged.'
  },
  diversification: {
    title: 'Portfolio Diversification',
    meaning: 'Combining holdings across multiple companies and distinct economic sectors so a downturn in one business or industry does not devastate the entire portfolio.',
    formula: 'Sector Weight (%) = (Value of Holdings in Sector ÷ Total Portfolio Value) × 100',
    example: 'Holding 4 IT stocks is still 100% concentrated in the Technology sector. Holding Banking, Healthcare, Consumer, and IT spreads sector risk.',
    whyItMatters: 'Reduces idiosyncratic (company- and sector-specific) risk without necessarily sacrificing expected long-term market participation.',
    whatItDoesNotTell: 'Diversification does not eliminate systemic market-wide risk during a global crisis.'
  },
  valuation: {
    title: 'Valuation: EPS & P/E Ratio',
    meaning: 'Earnings Per Share (EPS) is net profit divided by outstanding shares. Price-to-Earnings (P/E) compares the current share price to annual per-share earnings.',
    formula: 'P/E Ratio = Share Price ÷ Trailing 12-Month (TTM) EPS',
    example: 'If a company earns ₹50 per share (EPS) and trades at ₹1,000, its trailing P/E is 20×. Investors are paying ₹20 for every ₹1 of trailing annual profit.',
    whyItMatters: 'Provides context on market expectations relative to current profitability, especially when comparing peers within the same sector.',
    whatItDoesNotTell: 'A low P/E is not automatically a bargain (profits may be cyclical or shrinking), and a high P/E is not automatically overpriced. Loss-making companies have no meaningful positive P/E.'
  },
  dividends: {
    title: 'Dividends & Dividend Yield',
    meaning: 'A dividend is a distribution of a portion of company profits to shareholders. Dividend yield expresses annual dividends per share as a percentage of current share price.',
    formula: 'Dividend Yield (%) = (Annual Dividend Per Share ÷ Current Share Price) × 100',
    example: 'A company paying ₹15 per share in annual dividends at a share price of ₹500 has a trailing dividend yield of 3.00%.',
    whyItMatters: 'Shows the cash distribution component of total shareholder return.',
    whatItDoesNotTell: 'Dividends are not guaranteed interest payments; boards can reduce or omit future dividends if business conditions change.'
  },
  riskReturn: {
    title: 'Risk and Return Trade-off',
    meaning: 'In financial markets, higher potential returns are accompanied by greater uncertainty, volatility, and the real possibility of capital loss.',
    formula: 'Total Return = Capital Gain/Loss + Dividends Received',
    example: 'Small-cap or cyclical companies may rally sharply in expansions but experience deeper drawdowns during contractions.',
    whyItMatters: 'Every investment decision requires evaluating downside tolerance and time horizon alongside upside potential.',
    whatItDoesNotTell: 'Taking higher risk does NOT guarantee you will actually earn a higher return—that is why it is called risk.'
  }
};