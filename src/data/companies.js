/**
 * Consistent Fictional Indian Market Dataset (36 Companies across 10 Sectors).
 * Share count is stored in Crores (1 Cr = 10,000,000 shares).
 * Market Cap (in ₹ Crores) = Share Price (₹) × Shares Outstanding (Crores).
 */
export const RAW_COMPANIES = [
  // 1. BANKING & FINANCIAL SERVICES (5)
  { id: 'C01', symbol: 'BHARATBK', companyName: 'Bharat Sovereign Bank Ltd', exchange: 'NSE', sector: 'BANKING', basePrice: 1640.00, sharesCr: 760.0, pe: 18.4, divYield: 1.15, inNifty: true, inSensex: true },
  { id: 'C02', symbol: 'INDFIN', companyName: 'Indus Valley Bank Corp', exchange: 'NSE', sector: 'BANKING', basePrice: 1085.00, sharesCr: 690.0, pe: 16.8, divYield: 0.95, inNifty: true, inSensex: true },
  { id: 'C03', symbol: 'DAKSHFIN', companyName: 'Dakshina Capital Finance', exchange: 'NSE', sector: 'BANKING', basePrice: 6820.00, sharesCr: 62.0, pe: 28.5, divYield: 0.50, inNifty: true, inSensex: true },
  { id: 'C04', symbol: 'PRAGATISF', companyName: 'Pragati Small Finance Bank', exchange: 'BSE', sector: 'BANKING', basePrice: 412.00, sharesCr: 185.0, pe: 13.2, divYield: 1.40, inNifty: false, inSensex: false },
  { id: 'C05', symbol: 'SURAKSHA', companyName: 'Suraksha Life & General Assurance', exchange: 'NSE', sector: 'BANKING', basePrice: 645.00, sharesCr: 215.0, pe: 34.0, divYield: 0.45, inNifty: true, inSensex: false },

  // 2. INFORMATION TECHNOLOGY (5)
  { id: 'C06', symbol: 'NAVYATECH', companyName: 'Navya Consultancy Systems', exchange: 'NSE', sector: 'TECH', basePrice: 3890.00, sharesCr: 362.0, pe: 29.2, divYield: 1.45, inNifty: true, inSensex: true },
  { id: 'C07', symbol: 'INFYNET', companyName: 'InfyNet Digital Technologies', exchange: 'NSE', sector: 'TECH', basePrice: 1520.00, sharesCr: 415.0, pe: 24.6, divYield: 2.10, inNifty: true, inSensex: true },
  { id: 'C08', symbol: 'VEDASOFT', companyName: 'VedaSoft Enterprise Solutions', exchange: 'NSE', sector: 'TECH', basePrice: 1340.00, sharesCr: 270.0, pe: 22.1, divYield: 1.85, inNifty: true, inSensex: true },
  { id: 'C09', symbol: 'KINETIXAI', companyName: 'Kinetix Cloud & Engineering', exchange: 'BSE', sector: 'TECH', basePrice: 2450.00, sharesCr: 38.0, pe: 36.4, divYield: 0.60, inNifty: false, inSensex: false },
  { id: 'C10', symbol: 'QUANTUMIT', companyName: 'Quantum Micro-Systems India', exchange: 'NSE', sector: 'TECH', basePrice: 540.00, sharesCr: 52.0, pe: null, divYield: null, inNifty: false, inSensex: false },

  // 3. ENERGY & UTILITIES (4)
  { id: 'C11', symbol: 'INDUSPET', companyName: 'Indus Energy & Petrochemicals', exchange: 'NSE', sector: 'ENERGY', basePrice: 2920.00, sharesCr: 676.0, pe: 25.8, divYield: 0.35, inNifty: true, inSensex: true },
  { id: 'C12', symbol: 'SURYAPWR', companyName: 'Surya National Power Grid', exchange: 'NSE', sector: 'ENERGY', basePrice: 345.00, sharesCr: 970.0, pe: 17.5, divYield: 2.65, inNifty: true, inSensex: true },
  { id: 'C13', symbol: 'URJAGAS', companyName: 'Urja Natural Gas Corp', exchange: 'NSE', sector: 'ENERGY', basePrice: 268.00, sharesCr: 1258.0, pe: 8.9, divYield: 4.10, inNifty: true, inSensex: false },
  { id: 'C14', symbol: 'PRANAREN', companyName: 'Prana Green Renewables', exchange: 'BSE', sector: 'ENERGY', basePrice: 890.00, sharesCr: 95.0, pe: 48.0, divYield: null, inNifty: false, inSensex: false },

  // 4. HEALTHCARE & PHARMACEUTICALS (4)
  { id: 'C15', symbol: 'AYURPHARM', companyName: 'AyurVeda Sun Pharmaceuticals', exchange: 'NSE', sector: 'HEALTH', basePrice: 1580.00, sharesCr: 240.0, pe: 33.5, divYield: 0.85, inNifty: true, inSensex: true },
  { id: 'C16', symbol: 'PRANABIO', companyName: 'Prana Biologics & Labs', exchange: 'NSE', sector: 'HEALTH', basePrice: 6150.00, sharesCr: 16.6, pe: 21.4, divYield: 0.70, inNifty: true, inSensex: false },
  { id: 'C17', symbol: 'SANJEEVNI', companyName: 'Sanjeevani Hospitals Network', exchange: 'NSE', sector: 'HEALTH', basePrice: 6240.00, sharesCr: 14.4, pe: 58.2, divYield: 0.25, inNifty: true, inSensex: false },
  { id: 'C18', symbol: 'NOVAMED', companyName: 'NovaMed Formulations Ltd', exchange: 'BSE', sector: 'HEALTH', basePrice: 780.00, sharesCr: 48.0, pe: 19.8, divYield: 1.10, inNifty: false, inSensex: false },

  // 5. AUTOMOTIVE & MANUFACTURING (4)
  { id: 'C19', symbol: 'GARUDAMOT', companyName: 'Garuda Passenger Motors', exchange: 'NSE', sector: 'AUTO', basePrice: 12450.00, sharesCr: 31.4, pe: 27.6, divYield: 1.05, inNifty: true, inSensex: true },
  { id: 'C20', symbol: 'CHAKRAUTO', companyName: 'Chakra Mobility & EV Corp', exchange: 'NSE', sector: 'AUTO', basePrice: 985.00, sharesCr: 332.0, pe: 18.2, divYield: 0.60, inNifty: true, inSensex: true },
  { id: 'C21', symbol: 'ASHWAMOT', companyName: 'Ashwa Tractors & Utility', exchange: 'NSE', sector: 'AUTO', basePrice: 2120.00, sharesCr: 124.0, pe: 23.0, divYield: 0.90, inNifty: true, inSensex: true },
  { id: 'C22', symbol: 'TORQCOMP', companyName: 'Torq Precision Forgings', exchange: 'BSE', sector: 'AUTO', basePrice: 1140.00, sharesCr: 46.5, pe: 31.2, divYield: 0.55, inNifty: false, inSensex: false },

  // 6. CONSUMER GOODS & RETAIL (4)
  { id: 'C23', symbol: 'ANNAPURNA', companyName: 'Annapurna Consumer Staples', exchange: 'NSE', sector: 'CONSUMER', basePrice: 2380.00, sharesCr: 235.0, pe: 54.0, divYield: 1.75, inNifty: true, inSensex: true },
  { id: 'C24', symbol: 'DECCANCON', companyName: 'Deccan Agri & Foods Ltd', exchange: 'NSE', sector: 'CONSUMER', basePrice: 432.00, sharesCr: 1248.0, pe: 26.4, divYield: 3.15, inNifty: true, inSensex: true },
  { id: 'C25', symbol: 'RATNAJWL', companyName: 'Ratna Watches & Lifestyle', exchange: 'NSE', sector: 'CONSUMER', basePrice: 3610.00, sharesCr: 88.7, pe: 78.5, divYield: 0.30, inNifty: true, inSensex: true },
  { id: 'C26', symbol: 'BAZAARRET', companyName: 'Swadesh Hypermarket Retail', exchange: 'BSE', sector: 'CONSUMER', basePrice: 4480.00, sharesCr: 65.0, pe: 92.0, divYield: null, inNifty: false, inSensex: false },

  // 7. TELECOMMUNICATIONS (3)
  { id: 'C27', symbol: 'AKASHTEL', companyName: 'Akash Bharti Telecom Ltd', exchange: 'NSE', sector: 'TELECOM', basePrice: 1310.00, sharesCr: 572.0, pe: 62.0, divYield: 0.65, inNifty: true, inSensex: true },
  { id: 'C28', symbol: 'DOORDATA', companyName: 'DoorSanchar Fiber Networks', exchange: 'NSE', sector: 'TELECOM', basePrice: 1840.00, sharesCr: 28.5, pe: 38.4, divYield: 0.50, inNifty: false, inSensex: false },
  { id: 'C29', symbol: 'TARANGSAT', companyName: 'Tarang Tower Infrastructure', exchange: 'BSE', sector: 'TELECOM', basePrice: 342.00, sharesCr: 269.0, pe: 14.8, divYield: 1.20, inNifty: false, inSensex: false },

  // 8. INFRASTRUCTURE & INDUSTRIALS (3)
  { id: 'C30', symbol: 'VISHWAKRM', companyName: 'Vishwakarma Engineering & Infra', exchange: 'NSE', sector: 'INFRA_IND', basePrice: 3580.00, sharesCr: 137.5, pe: 35.2, divYield: 0.80, inNifty: true, inSensex: true },
  { id: 'C31', symbol: 'SAGARPORT', companyName: 'Sagar Maritime Ports & SEZ', exchange: 'NSE', sector: 'INFRA_IND', basePrice: 1340.00, sharesCr: 216.0, pe: 31.8, divYield: 0.45, inNifty: true, inSensex: false },
  { id: 'C32', symbol: 'GANGAROAD', companyName: 'Ganga Expressways & Bridges', exchange: 'BSE', sector: 'INFRA_IND', basePrice: 615.00, sharesCr: 60.4, pe: 16.5, divYield: 1.30, inNifty: false, inSensex: false },

  // 9. MATERIALS & METALS (2)
  { id: 'C33', symbol: 'LOHASTEEL', companyName: 'Loha National Steel Works', exchange: 'NSE', sector: 'MATERIALS', basePrice: 164.00, sharesCr: 1248.0, pe: 15.6, divYield: 2.20, inNifty: true, inSensex: true },
  { id: 'C34', symbol: 'SHILACEM', companyName: 'Shila Ultra Cement Corp', exchange: 'NSE', sector: 'MATERIALS', basePrice: 9850.00, sharesCr: 28.8, pe: 41.0, divYield: 0.40, inNifty: true, inSensex: true },

  // 10. OTHER LISTED COMPANIES (2)
  { id: 'C35', symbol: 'VIMANAIR', companyName: 'Viman InterGlobe Aviation', exchange: 'NSE', sector: 'OTHER', basePrice: 4180.00, sharesCr: 38.6, pe: 21.2, divYield: null, inNifty: true, inSensex: false },
  { id: 'C36', symbol: 'NAVRATNA', companyName: 'Navratna Hospitality & Hotels', exchange: 'BSE', sector: 'OTHER', basePrice: 585.00, sharesCr: 142.0, pe: 64.0, divYield: 0.30, inNifty: false, inSensex: false }
];