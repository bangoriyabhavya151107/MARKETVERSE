/**
 * 7 Market Infrastructure Facilities in the MarketVerse City.
 */
export const INFRA_FACILITIES = [
  {
    id: 'INFRA_DATA',
    name: 'Market-Data Broadcast Center',
    short: 'Market-Data Center',
    role: 'Tick-by-Tick Feed & Order Book Distribution',
    pos: { x: -40, z: 84 },
    size: { w: 11, h: 12, d: 11 },
    color: 0x4b8be8,
    summary: 'Collects matched trade prices and bid/ask quotes from the exchange matching engine and broadcasts timestamped market data to brokers, terminals, and index calculators.',
    distinction: 'A Market-Data Center distributes information; it does not hold your shares or guarantee trade settlement.'
  },
  {
    id: 'INFRA_CLEARING',
    name: 'Clearing & Settlement Facility (CCP)',
    short: 'Clearing Corp',
    role: 'Central Counterparty (Novation) & T+1 Settlement',
    pos: { x: -24, z: 84 },
    size: { w: 12, h: 14, d: 11 },
    color: 0x3baa91,
    summary: 'Acts as the legal buyer to every seller and seller to every buyer (novation), eliminating counterparty default risk and ensuring funds and securities settle on a T+1 cycle.',
    distinction: 'While the Stock Exchange matches orders, the Clearing Corporation manages post-trade counterparty risk and settlement guarantees.'
  },
  {
    id: 'INFRA_DEPOSITORY',
    name: 'Central Securities Depository',
    short: 'Depository',
    role: 'Dematerialized Share Custody & Ownership Ledger',
    pos: { x: -8, z: 84 },
    size: { w: 12, h: 15, d: 11 },
    color: 0xd6a84f,
    summary: 'Holds securities in electronic (dematerialized / Demat) form and transfers legal ownership between investor accounts upon settlement instruction.',
    distinction: "In India (e.g., NSDL / CDSL model), your shares are held in a Depository account, NOT inside the stock exchange or on a broker's balance sheet."
  },
  {
    id: 'INFRA_BROKERAGE',
    name: 'Brokerage & Trading-Services Hub',
    short: 'Brokerage Hub',
    role: 'Order Routing, Margin Verification & Client Access',
    pos: { x: 8, z: 84 },
    size: { w: 11, h: 13, d: 11 },
    color: 0xb58ae0,
    summary: 'Registered trading members (brokers) provide retail and institutional investors with order-entry apps, verify upfront margins, and route orders to the exchange.',
    distinction: 'Retail investors cannot submit orders directly to the exchange matching engine; they must route orders through a licensed broker.'
  },
  {
    id: 'INFRA_RISK',
    name: 'Risk-Monitoring & Surveillance Facility',
    short: 'Risk Surveillance',
    role: 'Circuit Breakers, Margin Calls & Manipulation Checks',
    pos: { x: 24, z: 84 },
    size: { w: 11, h: 13, d: 11 },
    color: 0xd94f52,
    summary: 'Monitors real-time price bands, volatility, mark-to-market margin utilization, and abnormal trading patterns to maintain fair and orderly markets.',
    distinction: 'Risk surveillance protects market integrity; it does not protect investors from normal market losses.'
  },
  {
    id: 'INFRA_NEWS',
    name: 'Corporate Disclosures & Financial News Center',
    short: 'Disclosures Hub',
    role: 'Earnings Filings, Board Notices & Material Events',
    pos: { x: 40, z: 84 },
    size: { w: 10, h: 11, d: 11 },
    color: 0xe8875a,
    summary: 'Disseminates statutory company filings, quarterly financial results, dividend announcements, and material corporate actions to the public simultaneously.',
    distinction: 'Official exchange disclosures are regulated primary sources, whereas media commentary is secondary interpretation.'
  },
  {
    id: 'INFRA_INVESTOR',
    name: 'Investor-Information & Grievance Center',
    short: 'Investor Center',
    role: 'Financial Literacy, Arbitration & Investor Protection',
    pos: { x: 0, z: 98 },
    size: { w: 14, h: 9, d: 9 },
    color: 0x5ec2d6,
    summary: 'Provides public education, KRA/KYC guidance, and dispute resolution mechanisms between investors and market intermediaries.',
    distinction: 'Empowers investors with verified rules and rights rather than offering stock tips or investment advice.'
  }
];