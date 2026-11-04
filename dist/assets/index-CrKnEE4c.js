(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class $m{constructor(){this.listeners=new Map;const e=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;this.state={dataMode:"SIMULATION",exchangeFilter:"ALL",beginnerMode:!0,soundEnabled:!1,storyModeActive:!1,activeNavView:"overview",activeBottomTab:"companies",activeHistoryHorizon:"1D",companyInspectorTab:"snapshot",tableSort:{col:"marketCap",asc:!1},tableFilter:"",selectedObject:null,hoveredObject:null,compareIds:["C01","C06","C11"],watchlistIds:[],portfolio:[],alerts:[],triggeredAlerts:[],mcapThresholds:{largeCr:1e5,midCr:4e4},simRunning:!0,simSpeed:1,simTickCount:0,simSecondsFromOpen:36900,activeEventId:"NONE",eventRemainingTicks:0,eventTotalTicks:0,eventCue:{id:"NONE",colorHex:4951016,timer:0,duration:5},whatIf:{companyId:"C01",customPrice:null,customSharesCr:null,sectorId:"ALL",sectorShockPct:5,snapshotBefore:null},companies:[],indices:{NIFTY:{name:"NIFTY 50 (Simulated)",baseLevel:22450,baseMcap:0,current:22450,change:0,changePercent:0,constituentCount:0,history:[]},SENSEX:{name:"SENSEX (Simulated)",baseLevel:73890,baseMcap:0,current:73890,change:0,changePercent:0,constituentCount:0,history:[]}},totals:{listedCount:0,mcapCr:0,baseMcapCr:0,mcapChangePct:0,volumeCr:0,advancing:0,declining:0,unchanged:0,mood:"SIDEWAYS",mcapHistory:[],volHistory:[]},replayHistory:[],replayIndex:-1,replayViewState:null,labelsVisible:!0,heatmapMode:!1,weather:"CLEAR",isNight:!1,timeOfDay:13.5,targetTimeOfDay:13.5,autoDayNight:!1,atmosphereOverride:!1,lightUiTheme:!1,reducedMotion:!!e,graphicsQuality:"AUTO",resolvedQuality:"HIGH",postFxEnabled:!0,dofEnabled:!0}}getLiveState(){return this.state}getViewState(){return this.state.replayIndex!==-1&&this.state.replayViewState?{...this.state,simTickCount:this.state.replayViewState.tick,simSecondsFromOpen:this.state.replayViewState.clock,activeEventId:this.state.replayViewState.activeEventId,eventRemainingTicks:this.state.replayViewState.eventRemainingTicks,companies:this.state.replayViewState.companies,indices:this.state.replayViewState.indices,totals:this.state.replayViewState.totals}:this.state}subscribe(e,t){const n=Array.isArray(e)?e:[e];return n.forEach(s=>{this.listeners.has(s)||this.listeners.set(s,new Set),this.listeners.get(s).add(t)}),()=>{n.forEach(s=>{const r=this.listeners.get(s);r&&r.delete(t)})}}emit(e,t=null){const n=this.listeners.get(e);if(n){const s=this.getViewState();n.forEach(r=>r(s,t,e))}}loadPersistedState(){try{const e=localStorage.getItem("mv_watchlist");this.state.watchlistIds=e?JSON.parse(e):["C01","C06","C11","C19"];const t=localStorage.getItem("mv_portfolio");this.state.portfolio=t?JSON.parse(t):[{id:"C01",qty:50,avgCost:1590},{id:"C06",qty:25,avgCost:3780},{id:"C15",qty:40,avgCost:1520}];const n=localStorage.getItem("mv_alerts");this.state.alerts=n?JSON.parse(n):[{id:"A1",type:"COMPANY_PCT",targetId:"C06",thresholdPct:1.5,description:"NAVYATECH moves more than ±1.5%"},{id:"A2",type:"SECTOR_PCT",targetId:"BANKING",thresholdPct:1.2,description:"Banking Sector moves more than ±1.2%"}]}catch{console.warn("localStorage unavailable, using default memory state.")}}savePersistedState(){try{localStorage.setItem("mv_watchlist",JSON.stringify(this.state.watchlistIds)),localStorage.setItem("mv_portfolio",JSON.stringify(this.state.portfolio)),localStorage.setItem("mv_alerts",JSON.stringify(this.state.alerts))}catch{}}}const P=new $m;class zf{constructor(e=20261102){this.initialSeed=e>>>0,this.state=this.initialSeed}reset(){this.state=this.initialSeed}next(){let e=this.state+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return e+this.next()*(t-e)}}const ai=new zf(4092026),yt=new zf(9021042),Hf=[{id:"C01",symbol:"BHARATBK",companyName:"Bharat Sovereign Bank Ltd",exchange:"NSE",sector:"BANKING",basePrice:1640,sharesCr:760,pe:18.4,divYield:1.15,inNifty:!0,inSensex:!0},{id:"C02",symbol:"INDFIN",companyName:"Indus Valley Bank Corp",exchange:"NSE",sector:"BANKING",basePrice:1085,sharesCr:690,pe:16.8,divYield:.95,inNifty:!0,inSensex:!0},{id:"C03",symbol:"DAKSHFIN",companyName:"Dakshina Capital Finance",exchange:"NSE",sector:"BANKING",basePrice:6820,sharesCr:62,pe:28.5,divYield:.5,inNifty:!0,inSensex:!0},{id:"C04",symbol:"PRAGATISF",companyName:"Pragati Small Finance Bank",exchange:"BSE",sector:"BANKING",basePrice:412,sharesCr:185,pe:13.2,divYield:1.4,inNifty:!1,inSensex:!1},{id:"C05",symbol:"SURAKSHA",companyName:"Suraksha Life & General Assurance",exchange:"NSE",sector:"BANKING",basePrice:645,sharesCr:215,pe:34,divYield:.45,inNifty:!0,inSensex:!1},{id:"C06",symbol:"NAVYATECH",companyName:"Navya Consultancy Systems",exchange:"NSE",sector:"TECH",basePrice:3890,sharesCr:362,pe:29.2,divYield:1.45,inNifty:!0,inSensex:!0},{id:"C07",symbol:"INFYNET",companyName:"InfyNet Digital Technologies",exchange:"NSE",sector:"TECH",basePrice:1520,sharesCr:415,pe:24.6,divYield:2.1,inNifty:!0,inSensex:!0},{id:"C08",symbol:"VEDASOFT",companyName:"VedaSoft Enterprise Solutions",exchange:"NSE",sector:"TECH",basePrice:1340,sharesCr:270,pe:22.1,divYield:1.85,inNifty:!0,inSensex:!0},{id:"C09",symbol:"KINETIXAI",companyName:"Kinetix Cloud & Engineering",exchange:"BSE",sector:"TECH",basePrice:2450,sharesCr:38,pe:36.4,divYield:.6,inNifty:!1,inSensex:!1},{id:"C10",symbol:"QUANTUMIT",companyName:"Quantum Micro-Systems India",exchange:"NSE",sector:"TECH",basePrice:540,sharesCr:52,pe:null,divYield:null,inNifty:!1,inSensex:!1},{id:"C11",symbol:"INDUSPET",companyName:"Indus Energy & Petrochemicals",exchange:"NSE",sector:"ENERGY",basePrice:2920,sharesCr:676,pe:25.8,divYield:.35,inNifty:!0,inSensex:!0},{id:"C12",symbol:"SURYAPWR",companyName:"Surya National Power Grid",exchange:"NSE",sector:"ENERGY",basePrice:345,sharesCr:970,pe:17.5,divYield:2.65,inNifty:!0,inSensex:!0},{id:"C13",symbol:"URJAGAS",companyName:"Urja Natural Gas Corp",exchange:"NSE",sector:"ENERGY",basePrice:268,sharesCr:1258,pe:8.9,divYield:4.1,inNifty:!0,inSensex:!1},{id:"C14",symbol:"PRANAREN",companyName:"Prana Green Renewables",exchange:"BSE",sector:"ENERGY",basePrice:890,sharesCr:95,pe:48,divYield:null,inNifty:!1,inSensex:!1},{id:"C15",symbol:"AYURPHARM",companyName:"AyurVeda Sun Pharmaceuticals",exchange:"NSE",sector:"HEALTH",basePrice:1580,sharesCr:240,pe:33.5,divYield:.85,inNifty:!0,inSensex:!0},{id:"C16",symbol:"PRANABIO",companyName:"Prana Biologics & Labs",exchange:"NSE",sector:"HEALTH",basePrice:6150,sharesCr:16.6,pe:21.4,divYield:.7,inNifty:!0,inSensex:!1},{id:"C17",symbol:"SANJEEVNI",companyName:"Sanjeevani Hospitals Network",exchange:"NSE",sector:"HEALTH",basePrice:6240,sharesCr:14.4,pe:58.2,divYield:.25,inNifty:!0,inSensex:!1},{id:"C18",symbol:"NOVAMED",companyName:"NovaMed Formulations Ltd",exchange:"BSE",sector:"HEALTH",basePrice:780,sharesCr:48,pe:19.8,divYield:1.1,inNifty:!1,inSensex:!1},{id:"C19",symbol:"GARUDAMOT",companyName:"Garuda Passenger Motors",exchange:"NSE",sector:"AUTO",basePrice:12450,sharesCr:31.4,pe:27.6,divYield:1.05,inNifty:!0,inSensex:!0},{id:"C20",symbol:"CHAKRAUTO",companyName:"Chakra Mobility & EV Corp",exchange:"NSE",sector:"AUTO",basePrice:985,sharesCr:332,pe:18.2,divYield:.6,inNifty:!0,inSensex:!0},{id:"C21",symbol:"ASHWAMOT",companyName:"Ashwa Tractors & Utility",exchange:"NSE",sector:"AUTO",basePrice:2120,sharesCr:124,pe:23,divYield:.9,inNifty:!0,inSensex:!0},{id:"C22",symbol:"TORQCOMP",companyName:"Torq Precision Forgings",exchange:"BSE",sector:"AUTO",basePrice:1140,sharesCr:46.5,pe:31.2,divYield:.55,inNifty:!1,inSensex:!1},{id:"C23",symbol:"ANNAPURNA",companyName:"Annapurna Consumer Staples",exchange:"NSE",sector:"CONSUMER",basePrice:2380,sharesCr:235,pe:54,divYield:1.75,inNifty:!0,inSensex:!0},{id:"C24",symbol:"DECCANCON",companyName:"Deccan Agri & Foods Ltd",exchange:"NSE",sector:"CONSUMER",basePrice:432,sharesCr:1248,pe:26.4,divYield:3.15,inNifty:!0,inSensex:!0},{id:"C25",symbol:"RATNAJWL",companyName:"Ratna Watches & Lifestyle",exchange:"NSE",sector:"CONSUMER",basePrice:3610,sharesCr:88.7,pe:78.5,divYield:.3,inNifty:!0,inSensex:!0},{id:"C26",symbol:"BAZAARRET",companyName:"Swadesh Hypermarket Retail",exchange:"BSE",sector:"CONSUMER",basePrice:4480,sharesCr:65,pe:92,divYield:null,inNifty:!1,inSensex:!1},{id:"C27",symbol:"AKASHTEL",companyName:"Akash Bharti Telecom Ltd",exchange:"NSE",sector:"TELECOM",basePrice:1310,sharesCr:572,pe:62,divYield:.65,inNifty:!0,inSensex:!0},{id:"C28",symbol:"DOORDATA",companyName:"DoorSanchar Fiber Networks",exchange:"NSE",sector:"TELECOM",basePrice:1840,sharesCr:28.5,pe:38.4,divYield:.5,inNifty:!1,inSensex:!1},{id:"C29",symbol:"TARANGSAT",companyName:"Tarang Tower Infrastructure",exchange:"BSE",sector:"TELECOM",basePrice:342,sharesCr:269,pe:14.8,divYield:1.2,inNifty:!1,inSensex:!1},{id:"C30",symbol:"VISHWAKRM",companyName:"Vishwakarma Engineering & Infra",exchange:"NSE",sector:"INFRA_IND",basePrice:3580,sharesCr:137.5,pe:35.2,divYield:.8,inNifty:!0,inSensex:!0},{id:"C31",symbol:"SAGARPORT",companyName:"Sagar Maritime Ports & SEZ",exchange:"NSE",sector:"INFRA_IND",basePrice:1340,sharesCr:216,pe:31.8,divYield:.45,inNifty:!0,inSensex:!1},{id:"C32",symbol:"GANGAROAD",companyName:"Ganga Expressways & Bridges",exchange:"BSE",sector:"INFRA_IND",basePrice:615,sharesCr:60.4,pe:16.5,divYield:1.3,inNifty:!1,inSensex:!1},{id:"C33",symbol:"LOHASTEEL",companyName:"Loha National Steel Works",exchange:"NSE",sector:"MATERIALS",basePrice:164,sharesCr:1248,pe:15.6,divYield:2.2,inNifty:!0,inSensex:!0},{id:"C34",symbol:"SHILACEM",companyName:"Shila Ultra Cement Corp",exchange:"NSE",sector:"MATERIALS",basePrice:9850,sharesCr:28.8,pe:41,divYield:.4,inNifty:!0,inSensex:!0},{id:"C35",symbol:"VIMANAIR",companyName:"Viman InterGlobe Aviation",exchange:"NSE",sector:"OTHER",basePrice:4180,sharesCr:38.6,pe:21.2,divYield:null,inNifty:!0,inSensex:!1},{id:"C36",symbol:"NAVRATNA",companyName:"Navratna Hospitality & Hotels",exchange:"BSE",sector:"OTHER",basePrice:585,sharesCr:142,pe:64,divYield:.3,inNifty:!1,inSensex:!1}],Gn=[{id:"BANKING",name:"Banking & Financial Services",short:"Banking",color:"#3BAA91",hex:3910289,center:{x:-75,z:-25},size:{w:54,d:44}},{id:"TECH",name:"Information Technology",short:"Technology",color:"#4B8BE8",hex:4951016,center:{x:75,z:-25},size:{w:54,d:44}},{id:"ENERGY",name:"Energy & Utilities",short:"Energy",color:"#D6A84F",hex:14067791,center:{x:-75,z:32},size:{w:54,d:44}},{id:"HEALTH",name:"Healthcare & Pharmaceuticals",short:"Healthcare",color:"#B58AE0",hex:11897568,center:{x:75,z:32},size:{w:54,d:44}},{id:"AUTO",name:"Automotive & Manufacturing",short:"Automotive",color:"#E8875A",hex:15239002,center:{x:-75,z:86},size:{w:54,d:40}},{id:"CONSUMER",name:"Consumer Goods & Retail",short:"Consumer",color:"#D9789B",hex:14252187,center:{x:75,z:86},size:{w:54,d:40}},{id:"TELECOM",name:"Telecommunications",short:"Telecom",color:"#5EC2D6",hex:6210262,center:{x:-24,z:-82},size:{w:44,d:36}},{id:"INFRA_IND",name:"Infrastructure & Industrials",short:"Industrials",color:"#9EA8B6",hex:10397878,center:{x:24,z:-82},size:{w:44,d:36}},{id:"MATERIALS",name:"Materials & Metals",short:"Materials",color:"#C7956D",hex:13079917,center:{x:-75,z:-82},size:{w:46,d:36}},{id:"OTHER",name:"Other Listed Companies",short:"Diversified",color:"#7C8DA6",hex:8162726,center:{x:75,z:-82},size:{w:46,d:36}}],vn=Object.fromEntries(Gn.map(i=>[i.id,i])),Ci={NONE:{id:"NONE",name:"Baseline Market Session (No Active Shock)",description:"Normal simulated order flow with independent company activity and low macro drift.",sectorsAffected:"All sectors operating under baseline stochastic drift.",assumptions:"Assumes neutral macroeconomic news flow during the simulated window.",durationTicks:0,impacts:{}},RATE_HIKE:{id:"RATE_HIKE",name:"Central Bank Interest-Rate Increase (+50 bps)",description:"Hypothetical monetary policy tightening scenario where benchmark borrowing rates are raised to curb inflation.",sectorsAffected:"Banking (mixed/margin sensitivity), Automotive (-), Infrastructure (-), Technology (-), Consumer (-)",assumptions:"Hypothetical model assumes higher discount rates compress high-multiple growth valuations and increase financing costs for rate-sensitive borrowers.",durationTicks:12,impacts:{BANKING:-.018,AUTO:-.032,INFRA_IND:-.028,TECH:-.022,CONSUMER:-.012,HEALTH:.006,ENERGY:-.008,TELECOM:-.015,MATERIALS:-.02,OTHER:-.015}},RATE_CUT:{id:"RATE_CUT",name:"Central Bank Interest-Rate Decrease (-50 bps)",description:"Hypothetical accommodative policy shift lowering borrowing costs across the economy.",sectorsAffected:"Banking (+), Automotive (+), Infrastructure (+), Consumer (+), Materials (+)",assumptions:"Hypothetical model assumes lower credit costs support capital expenditure, auto/housing demand, and equity valuation multiples.",durationTicks:12,impacts:{BANKING:.026,AUTO:.034,INFRA_IND:.03,TECH:.022,CONSUMER:.02,HEALTH:.008,ENERGY:.014,TELECOM:.016,MATERIALS:.024,OTHER:.018}},OIL_SPIKE:{id:"OIL_SPIKE",name:"Crude Oil Price Surge (+18%)",description:"Hypothetical global supply disruption driving energy feedstock prices higher.",sectorsAffected:"Energy (+ upstream / mixed downstream), Automotive (-), Materials (-), Consumer (-)",assumptions:"Assumes higher input and logistics costs pressure fuel-intensive industries while benefiting upstream energy producers.",durationTicks:10,impacts:{ENERGY:.032,AUTO:-.029,CONSUMER:-.021,MATERIALS:-.019,INFRA_IND:-.016,BANKING:-.012,TECH:.004,HEALTH:.003,TELECOM:-.005,OTHER:-.014}},TECH_SELLOFF:{id:"TECH_SELLOFF",name:"Broad Technology-Sector Sell-Off",description:"Hypothetical slowdown in global enterprise IT spending triggers a reassessment of technology multiples.",sectorsAffected:"Information Technology (--), Telecom (-), Healthcare (+ defensive rotation), Consumer (+ defensive)",assumptions:"Assumes institutional rotation out of export-oriented IT services into domestic defensive sectors.",durationTicks:10,impacts:{TECH:-.052,TELECOM:-.018,BANKING:-.005,HEALTH:.018,CONSUMER:.014,ENERGY:.008,AUTO:.002,INFRA_IND:.004,MATERIALS:-.004,OTHER:-.008}},STRONG_EARNINGS:{id:"STRONG_EARNINGS",name:"Strong Corporate Earnings Season",description:"Hypothetical broad-based quarterly profit beat across major domestic and export sectors.",sectorsAffected:"Banking (+), Technology (+), Automotive (+), Industrials (+), Consumer (+)",assumptions:"Assumes stronger operating margins and upward earnings-per-share revisions across cyclicals and leaders.",durationTicks:14,impacts:{BANKING:.031,TECH:.035,AUTO:.029,INFRA_IND:.027,CONSUMER:.024,HEALTH:.019,MATERIALS:.025,TELECOM:.021,ENERGY:.02,OTHER:.022}},INR_DEPREC:{id:"INR_DEPREC",name:"Currency Depreciation Scenario (INR Weakens)",description:"Hypothetical scenario where the domestic currency depreciates against the US Dollar.",sectorsAffected:"Information Technology (+ export revenue), Healthcare (+ pharma exports), Energy (- import costs), Auto (- imported components)",assumptions:"Assumes exporters earning USD revenue see rupee margin tailwinds while net importers face higher landed costs.",durationTicks:12,impacts:{TECH:.038,HEALTH:.028,ENERGY:-.024,AUTO:-.018,MATERIALS:-.012,BANKING:-.01,CONSUMER:-.009,TELECOM:-.011,INFRA_IND:-.013,OTHER:-.008}},RISK_OFF:{id:"RISK_OFF",name:"Broad Market Risk-Off Event",description:"Hypothetical global geopolitical or liquidity shock prompting broad equity de-risking.",sectorsAffected:"All sectors experience downward pressure; Healthcare & Consumer show lower relative beta.",assumptions:"Assumes correlated selling across high-beta and cyclical equities with relative resilience in defensive staples.",durationTicks:10,impacts:{BANKING:-.038,TECH:-.034,ENERGY:-.03,AUTO:-.042,INFRA_IND:-.04,MATERIALS:-.044,TELECOM:-.022,OTHER:-.036,HEALTH:-.012,CONSUMER:-.015}}};function tt(i){return i==null||Number.isNaN(i)?"Unavailable":"₹"+i.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}function We(i){if(i==null||Number.isNaN(i))return"Unavailable";const e=i>1e-4?"+":"";return(i>1e-4?"▲ ":i<-1e-4?"▼ ":"• ")+e+i.toFixed(2)+"%"}function dn(i){return i==null||Number.isNaN(i)?"Unavailable":Math.abs(i)>=1e5?(i<0?"-":"")+"₹"+(Math.abs(i)/1e5).toFixed(2)+" L Cr":"₹"+Math.round(i).toLocaleString("en-IN")+" Cr"}function Qd(i){const e=Math.floor(i/3600)%24,t=Math.floor(i%3600/60),n=Math.floor(i%60);return`${String(e).padStart(2,"0")}:${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")} IST`}const Jr={marketCap:{title:"Market Capitalization",meaning:"Market capitalization (Market Cap) is the total market value of a company's outstanding equity shares at the current market price.",formula:"Market Capitalization = Share Price × Total Outstanding Shares",example:"Company A has a share price of ₹500 and 200 Crore shares (Market Cap = ₹1,00,000 Cr). Company B has a share price of ₹5,000 and 5 Crore shares (Market Cap = ₹25,000 Cr). Even though Company B's share price is 10× higher, Company A is 4× larger in market capitalization.",whyItMatters:"It tells you the aggregate equity scale of a company, determines its classification (Large-, Mid-, or Small-Cap), and governs its weight in market-cap-weighted indices.",whatItDoesNotTell:"Market cap is NOT the company's cash in the bank, annual revenue, enterprise value (which includes debt), or the total cash sitting inside the stock market. Also, a taller building in MarketVerse indicates larger scale, never superior investment quality."},priceVsSize:{title:"Stock Price vs. Company Size",meaning:"A single share's nominal price only tells you the price of one slice of ownership—without knowing how many slices exist, the share price alone says nothing about how big or 'expensive' the company is.",formula:"1 Share = (1 ÷ Total Outstanding Shares) of Total Equity",example:"If a ₹2,000 stock undergoes a 10-for-1 stock split, its share price becomes ₹200 and share count multiplies by 10. The company's size and value have not changed at all.",whyItMatters:"Prevents beginners from mistakenly thinking a ₹80 stock is 'cheaper' or has 'more room to grow' than a ₹3,500 stock.",whatItDoesNotTell:"Nominal share price does not tell you valuation (see P/E ratio) or company scale (see Market Cap)."},percentChange:{title:"Absolute vs. Percentage Change",meaning:"Absolute change is the rupee difference from the previous close, while percentage change normalizes that movement relative to the starting price.",formula:"Change (%) = ((Current Price − Previous Close) ÷ Previous Close) × 100",example:"A ₹20 gain on a ₹200 stock is a +10.00% return. The same ₹20 gain on a ₹2,000 stock is only a +1.00% return.",whyItMatters:"Percentage change allows fair comparison of performance across stocks, sectors, and indices with completely different nominal price levels.",whatItDoesNotTell:"A single day's percentage change does not tell you long-term trend stability or fundamental business value."},volume:{title:"Trading Volume",meaning:"Trading volume counts the total number of shares exchanged between buyers and sellers during a given session.",formula:"Volume = Sum of Shares Traded in All Matched Orders",example:"If 500 buyers each purchase 1,000 shares from 500 sellers, total volume is 5,00,000 shares (not 10,00,000—every trade has both a buyer and a seller).",whyItMatters:"Shows participation intensity. High relative volume alongside news or earnings indicates strong institutional or retail activity.",whatItDoesNotTell:"High volume does NOT automatically mean 'more buyers than sellers' (every traded share has both) nor does it guarantee high liquidity or a rising price."},liquidity:{title:"Market Liquidity & Bid-Ask Spread",meaning:"Liquidity measures how quickly and easily an asset can be bought or sold in meaningful size without causing a large impact on its market price.",formula:"Bid-Ask Spread (%) = ((Best Ask − Best Bid) ÷ Mid-Price) × 100",example:"Stock X has a Best Bid of ₹999.90 and Best Ask of ₹1,000.00 with deep order queues (tight spread, high liquidity). Stock Y has a Bid of ₹985 and Ask of ₹1,015 with only 50 shares available (wide spread, low liquidity).",whyItMatters:"Low liquidity increases implicit transaction costs (slippage) when entering or exiting positions.",whatItDoesNotTell:"A stock with temporary high volume during a panic crash can still suffer from poor order-book depth (low liquidity)."},indices:{title:"Market Indices (NIFTY 50 & SENSEX)",meaning:"A market index tracks the aggregate performance of a rules-based basket of securities to summarize a market segment or the broad equity market.",formula:"Index Level = (Current Free-Float Market Cap of Basket ÷ Base Period Market Cap) × Base Index Value",example:"NIFTY 50 tracks 50 large, liquid Indian companies across sectors on the NSE; SENSEX tracks 30 major companies on the BSE.",whyItMatters:"Provides a benchmark to evaluate whether an individual stock, sector, or portfolio outperformed or underperformed the broader market.",whatItDoesNotTell:"An official index is calculated using specific free-float weights and divisor adjustments—averaging arbitrary stock prices does not produce an official index."},bullBear:{title:"Bull and Bear Markets",meaning:"Broad descriptors of sustained market sentiment and price direction over extended periods (months or years), plus sideways/range-bound phases.",formula:"Simulated Session Rule in MarketVerse: Index > +0.35% (Bullish Bias), < -0.35% (Bearish Bias), else Sideways",example:"During a broad bull trend, cyclical sectors may expand while a specific company with weak earnings still falls.",whyItMatters:"Helps distinguish macroeconomic/market-wide tailwinds or headwinds from company-specific news.",whatItDoesNotTell:"Short-term intraday mood is not a statistically established macroeconomic regime."},volatility:{title:"Price Volatility",meaning:"Volatility measures the magnitude and dispersion of price fluctuations over time—both upward and downward.",formula:"Standard Deviation of Periodic Logarithmic or Percentage Returns",example:"Stock A moves between -0.3% and +0.4% daily (low volatility). Stock B swings between -4.5% and +5.0% daily (high volatility).",whyItMatters:"Higher volatility means wider outcome uncertainty and greater chance of sharp short-term drawdowns.",whatItDoesNotTell:"Volatility is not direction—a volatile stock can end the year higher, lower, or unchanged."},diversification:{title:"Portfolio Diversification",meaning:"Combining holdings across multiple companies and distinct economic sectors so a downturn in one business or industry does not devastate the entire portfolio.",formula:"Sector Weight (%) = (Value of Holdings in Sector ÷ Total Portfolio Value) × 100",example:"Holding 4 IT stocks is still 100% concentrated in the Technology sector. Holding Banking, Healthcare, Consumer, and IT spreads sector risk.",whyItMatters:"Reduces idiosyncratic (company- and sector-specific) risk without necessarily sacrificing expected long-term market participation.",whatItDoesNotTell:"Diversification does not eliminate systemic market-wide risk during a global crisis."},valuation:{title:"Valuation: EPS & P/E Ratio",meaning:"Earnings Per Share (EPS) is net profit divided by outstanding shares. Price-to-Earnings (P/E) compares the current share price to annual per-share earnings.",formula:"P/E Ratio = Share Price ÷ Trailing 12-Month (TTM) EPS",example:"If a company earns ₹50 per share (EPS) and trades at ₹1,000, its trailing P/E is 20×. Investors are paying ₹20 for every ₹1 of trailing annual profit.",whyItMatters:"Provides context on market expectations relative to current profitability, especially when comparing peers within the same sector.",whatItDoesNotTell:"A low P/E is not automatically a bargain (profits may be cyclical or shrinking), and a high P/E is not automatically overpriced. Loss-making companies have no meaningful positive P/E."},dividends:{title:"Dividends & Dividend Yield",meaning:"A dividend is a distribution of a portion of company profits to shareholders. Dividend yield expresses annual dividends per share as a percentage of current share price.",formula:"Dividend Yield (%) = (Annual Dividend Per Share ÷ Current Share Price) × 100",example:"A company paying ₹15 per share in annual dividends at a share price of ₹500 has a trailing dividend yield of 3.00%.",whyItMatters:"Shows the cash distribution component of total shareholder return.",whatItDoesNotTell:"Dividends are not guaranteed interest payments; boards can reduce or omit future dividends if business conditions change."},riskReturn:{title:"Risk and Return Trade-off",meaning:"In financial markets, higher potential returns are accompanied by greater uncertainty, volatility, and the real possibility of capital loss.",formula:"Total Return = Capital Gain/Loss + Dividends Received",example:"Small-cap or cyclical companies may rally sharply in expansions but experience deeper drawdowns during contractions.",whyItMatters:"Every investment decision requires evaluating downside tolerance and time horizon alongside upside potential.",whatItDoesNotTell:"Taking higher risk does NOT guarantee you will actually earn a higher return—that is why it is called risk."}};function Vf(i=Hf){const e=i.length,t=i.filter(a=>a.inNifty).length,n=i.filter(a=>a.inSensex).length,s=Gn.length,r=Object.keys(Jr).length;return{listedCount:e,niftyCount:t,sensexCount:n,sectorCount:s,lessonCount:r}}function eg(i){const e=i.companies.filter(o=>o.inNifty),t=e.reduce((o,l)=>o+l.marketCap,0),n=i.indices.NIFTY;n.constituentCount=e.length,n.baseMcap>0&&(n.current=Number((t/n.baseMcap*n.baseLevel).toFixed(2)),n.change=Number((n.current-n.baseLevel).toFixed(2)),n.changePercent=Number((n.change/n.baseLevel*100).toFixed(2)));const s=i.companies.filter(o=>o.inSensex),r=s.reduce((o,l)=>o+l.marketCap,0),a=i.indices.SENSEX;a.constituentCount=s.length,a.baseMcap>0&&(a.current=Number((r/a.baseMcap*a.baseLevel).toFixed(2)),a.change=Number((a.current-a.baseLevel).toFixed(2)),a.changePercent=Number((a.change/a.baseLevel*100).toFixed(2)))}function kt(i,e=3200){const t=document.getElementById("toast-container");if(!t)return;const n=document.createElement("div");n.className="toast-item",n.textContent=i,t.appendChild(n),setTimeout(()=>{n.remove()},e)}function Gf(i=P.getLiveState()){let e=!1;i.alerts.forEach(t=>{if(t.type==="COMPANY_PCT"){const n=i.companies.find(s=>s.id===t.targetId);if(n&&Math.abs(n.changePercent)>=t.thresholdPct){const s=`[SIMULATED] ${n.symbol} moved ${We(n.changePercent)} (crossed ±${t.thresholdPct}% threshold at ${n.timestamp})`;i.triggeredAlerts.includes(s)||(i.triggeredAlerts.unshift(s),i.triggeredAlerts.length>15&&i.triggeredAlerts.pop(),e=!0,kt(`🔔 Alert: ${n.symbol} moved ${We(n.changePercent)}`))}}else if(t.type==="SECTOR_PCT"){const n=i.companies.filter(l=>l.sector===t.targetId);let s=0,r=0;n.forEach(l=>{s+=l.marketCap,r+=l.previousClose*l.sharesOutstandingCr});const a=r>0?Number(((s-r)/r*100).toFixed(2)):0,o=vn[t.targetId];if(o&&Math.abs(a)>=t.thresholdPct){const l=`[SIMULATED] ${o.short} Sector moved ${We(a)} (crossed ±${t.thresholdPct}% threshold)`;i.triggeredAlerts.includes(l)||(i.triggeredAlerts.unshift(l),i.triggeredAlerts.length>15&&i.triggeredAlerts.pop(),e=!0,kt(`🔔 Sector Alert: ${o.short} ${We(a)}`))}}}),e&&P.emit("alerts")}function Qa(i,e=P.getViewState().mcapThresholds){return i>=e.largeCr?"Large-Cap":i>=e.midCr?"Mid-Cap":"Small-Cap"}function $i(i=P.getLiveState()){const e=Qd(i.simSecondsFromOpen);let t=0,n=0,s=0,r=0,a=0;i.companies.forEach(l=>{l.change=Number((l.price-l.previousClose).toFixed(2)),l.changePercent=l.previousClose>0?Number((l.change/l.previousClose*100).toFixed(2)):0,l.marketCap=Number((l.price*l.sharesOutstandingCr).toFixed(2)),l.eps&&l.eps>0&&(l.pe=Number((l.price/l.eps).toFixed(2))),l.timestamp=e,l.dataStatus=i.dataMode==="SIMULATION"?"SIMULATED":"UNCONFIGURED_PROVIDER",t+=l.marketCap,n+=l.volume,l.changePercent>.02?s++:l.changePercent<-.02?r++:a++}),i.totals.listedCount=i.companies.length,i.totals.mcapCr=Number(t.toFixed(2)),i.totals.mcapChangePct=i.totals.baseMcapCr>0?Number(((t-i.totals.baseMcapCr)/i.totals.baseMcapCr*100).toFixed(2)):0,i.totals.volumeCr=Number((n/1e7).toFixed(2)),i.totals.advancing=s,i.totals.declining=r,i.totals.unchanged=a,eg(i);const o=i.indices.NIFTY.changePercent;o>=.35?i.totals.mood="BULLISH":o<=-.35?i.totals.mood="BEARISH":i.totals.mood="SIDEWAYS",Gf(i)}function es(i,e=P.getViewState()){const t=e.companies.filter(u=>u.sector===i);let n=0,s=0,r=0,a=0,o=null,l=null;t.forEach(u=>{n+=u.marketCap,s+=u.previousClose*u.sharesOutstandingCr,r+=u.volume,a+=u.changePercent,(!o||u.changePercent>o.changePercent)&&(o=u),(!l||u.changePercent<l.changePercent)&&(l=u)});const c=s>0?Number(((n-s)/s*100).toFixed(2)):0,d=t.length>0?Number((a/t.length).toFixed(2)):0;return{sector:vn[i],companies:t,totalMcap:n,totalVol:r,capWeightedChangePct:c,equalWeightedChangePct:d,strongest:o,weakest:l}}function $u(i){const e={};return Object.keys(i).forEach(t=>{e[t]=Object.freeze([...i[t]])}),Object.freeze(e)}function Er(){const i=P.getLiveState(),e=Object.freeze({tick:i.simTickCount,clock:i.simSecondsFromOpen,activeEventId:i.activeEventId,eventRemainingTicks:i.eventRemainingTicks,companies:Object.freeze(i.companies.map(t=>Object.freeze({...t,pos:Object.freeze({...t.pos}),history1D:Object.freeze([...t.history1D]),volHistory:Object.freeze([...t.volHistory]),histories:$u(t.histories),volHistories:$u(t.volHistories)}))),indices:Object.freeze({NIFTY:Object.freeze({...i.indices.NIFTY,history:Object.freeze([...i.indices.NIFTY.history])}),SENSEX:Object.freeze({...i.indices.SENSEX,history:Object.freeze([...i.indices.SENSEX.history])})}),totals:Object.freeze({...i.totals,mcapHistory:Object.freeze([...i.totals.mcapHistory]),volHistory:Object.freeze([...i.totals.volHistory])})});i.replayHistory.push(e),i.replayHistory.length>40&&i.replayHistory.shift()}function Wf(i){const e=P.getLiveState();i<0||i>=e.replayHistory.length-1?(e.replayIndex=-1,e.replayViewState=null):(e.replayIndex=i,e.replayViewState=e.replayHistory[i]),P.emit("replay")}function Ri(){const i=P.getLiveState();i.replayIndex!==-1&&(i.replayIndex=-1,i.replayViewState=null,P.emit("replay"))}const tg={"1D":{points:20,stepRange:.0042,volScale:.06},"1W":{points:24,stepRange:.011,volScale:.35},"1M":{points:26,stepRange:.019,volScale:.95},"3M":{points:28,stepRange:.028,volScale:1.15},"1Y":{points:30,stepRange:.042,volScale:1.45}},ng={RATE_HIKE:3705087,RATE_CUT:2278795,OIL_SPIKE:15237930,TECH_SELLOFF:9064447,STRONG_EARNINGS:16762941,INR_DEPREC:14252101,RISK_OFF:14235720};function ig(i,e,t,n){const s=tg[n],r=[i];let a=i;for(let d=1;d<s.points;d++){const u=ai.range(-s.stepRange,s.stepRange*1.03);a=Math.max(5,a*(1+u)),r.push(a)}const o=r[r.length-1],l=r.map((d,u)=>{if(u===r.length-1)return e;const h=u/(r.length-1),f=d+(e-o)*h;return Number(Math.max(5,f).toFixed(2))}),c=l.map(()=>Math.round(t*s.volScale*ai.range(.65,1.35)));return{priceSeries:l,volSeries:c}}function al(){ai.reset();const i=P.getLiveState();i.simTickCount=0,i.simSecondsFromOpen=36900,i.activeEventId="NONE",i.eventRemainingTicks=0,i.eventTotalTicks=0,i.eventCue={id:"NONE",colorHex:4951016,timer:0,duration:5},i.replayHistory=[],i.replayIndex=-1,i.replayViewState=null,i.whatIf.customPrice=null,i.whatIf.customSharesCr=null,i.whatIf.snapshotBefore=null;const e={};Gn.forEach(t=>{e[t.id]=0}),i.companies=Hf.map(t=>{const n=e[t.sector]++,s=vn[t.sector],r=3,a=n%r,o=Math.floor(n/r),l=(a-1)*14,c=(o-.5)*15,d=ai.range(-.018,.021),u=t.basePrice,h=Number((u*(1+d)).toFixed(2)),f=Number((h-u).toFixed(2)),g=Number((f/u*100).toFixed(2)),v=Number((h*t.sharesCr).toFixed(2)),m=Math.round(ai.range(12e4,38e5)),p=t.pe?Number((u/t.pe).toFixed(2)):null,_={},b={};["1D","1W","1M","3M","1Y"].forEach(E=>{const{priceSeries:S,volSeries:A}=ig(u,h,m,E);_[E]=S,b[E]=A});const x=Number(Math.max(..._["1Y"],u*ai.range(1.12,1.28)).toFixed(2)),C=Number(Math.min(..._["1Y"],u*ai.range(.74,.89)).toFixed(2));return{id:t.id,symbol:t.symbol,companyName:t.companyName,exchange:t.exchange,sector:t.sector,previousClose:u,price:h,change:f,changePercent:g,sharesOutstandingCr:t.sharesCr,baseSharesCr:t.sharesCr,marketCap:v,volume:m,avgDailyVolume:Math.round(m*.92),high52W:x,low52W:C,pe:t.pe?Number((h/p).toFixed(2)):null,eps:p,divYield:t.divYield,inNifty:t.inNifty,inSensex:t.inSensex,currency:"INR",timestamp:Qd(i.simSecondsFromOpen),source:"MarketVerse Deterministic Seed Engine",dataStatus:"SIMULATED",pos:{x:s.center.x+l,z:s.center.z+c},history1D:_["1D"],volHistory:b["1D"],histories:_,volHistories:b,pulseIntensity:0}}),i.indices.NIFTY.baseMcap=i.companies.filter(t=>t.inNifty).reduce((t,n)=>t+n.previousClose*n.sharesOutstandingCr,0),i.indices.SENSEX.baseMcap=i.companies.filter(t=>t.inSensex).reduce((t,n)=>t+n.previousClose*n.sharesOutstandingCr,0),i.totals.baseMcapCr=i.companies.reduce((t,n)=>t+n.previousClose*n.sharesOutstandingCr,0),i.indices.NIFTY.history=[i.indices.NIFTY.baseLevel],i.indices.SENSEX.history=[i.indices.SENSEX.baseLevel],i.totals.mcapHistory=[i.totals.baseMcapCr],i.totals.volHistory=[],$i(i),i.totals.volHistory.push(i.totals.volumeCr),Er()}function Mi(){const i=P.getLiveState();if(i.dataMode!=="SIMULATION"||i.replayIndex!==-1)return;i.simTickCount++,i.simSecondsFromOpen+=15;const e=Ci[i.activeEventId]||Ci.NONE;let t=0;i.activeEventId!=="NONE"&&i.eventRemainingTicks>0&&(t=i.eventRemainingTicks/Math.max(1,i.eventTotalTicks)),i.companies.forEach(n=>{const r=(e.impacts[n.sector]||0)*.14*t,a=ai.range(-.0055,.0056),o=r+a,l=Math.max(5,Number((n.price*(1+o)).toFixed(2))),c=Math.abs((l-n.price)/n.price);n.price=l;const d=Math.round(ai.range(8e3,65e3)*(1+c*80));n.volume+=d,n.histories["1D"].push(n.price),n.histories["1D"].length>30&&n.histories["1D"].shift(),n.volHistories["1D"].push(d),n.volHistories["1D"].length>30&&n.volHistories["1D"].shift(),["1W","1M","3M","1Y"].forEach(u=>{const h=n.histories[u];h&&h.length>0&&(h[h.length-1]=n.price)}),c>.003&&(n.pulseIntensity=1)}),i.activeEventId!=="NONE"&&(i.eventRemainingTicks=Math.max(0,i.eventRemainingTicks-1),i.eventRemainingTicks===0&&(i.activeEventId="NONE",i.eventTotalTicks=0,P.emit("event"))),$i(i),i.indices.NIFTY.history.push(i.indices.NIFTY.current),i.indices.NIFTY.history.length>25&&i.indices.NIFTY.history.shift(),i.indices.SENSEX.history.push(i.indices.SENSEX.current),i.indices.SENSEX.history.length>25&&i.indices.SENSEX.history.shift(),i.totals.mcapHistory.push(i.totals.mcapCr),i.totals.mcapHistory.length>25&&i.totals.mcapHistory.shift(),i.totals.volHistory.push(i.totals.volumeCr),i.totals.volHistory.length>25&&i.totals.volHistory.shift(),Er(),P.emit("tick")}function wl(i){Ri();const e=P.getLiveState();if(!i||i==="NONE"){ss();return}const t=Ci[i];t&&(e.activeEventId=i,e.eventTotalTicks=t.durationTicks||10,e.eventRemainingTicks=e.eventTotalTicks,e.eventCue={id:i,colorHex:ng[i]||4951016,timer:5,duration:5},e.companies.forEach(n=>{const s=t.impacts[n.sector]||0,r=ai.range(-.003,.003);n.price=Math.max(5,Number((n.price*(1+s+r)).toFixed(2))),n.histories["1D"].push(n.price),n.histories["1D"].length>30&&n.histories["1D"].shift(),["1W","1M","3M","1Y"].forEach(a=>{const o=n.histories[a];o&&o.length>0&&(o[o.length-1]=n.price)}),n.pulseIntensity=1}),$i(e),Er(),P.emit("event"),P.emit("tick"))}function ss(){const i=P.getLiveState();i.activeEventId="NONE",i.eventRemainingTicks=0,i.eventTotalTicks=0,i.eventCue.timer=0,P.emit("event"),P.emit("tick")}function Al(){al(),P.emit("event"),P.emit("replay"),P.emit("whatif"),P.emit("tick")}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jd="170",sg=0,eh=1,rg=2,$d=1,Xf=2,bi=3,rs=0,an=1,Tn=2,di=0,Tr=1,Bc=2,th=3,nh=4,ag=5,Ts=100,og=101,lg=102,cg=103,dg=104,ug=200,hg=201,fg=202,pg=203,kc=204,zc=205,mg=206,gg=207,vg=208,xg=209,_g=210,yg=211,bg=212,Mg=213,Sg=214,Hc=0,Vc=1,Gc=2,Fr=3,Wc=4,Xc=5,Yc=6,qc=7,Cl=0,Eg=1,Tg=2,ts=0,Yf=1,qf=2,jf=3,eu=4,wg=5,Kf=6,Zf=7,Qf=300,Br=301,kr=302,jc=303,Kc=304,Rl=306,en=1e3,Ki=1001,Zc=1002,qt=1003,Ag=1004,ao=1005,Zn=1006,zl=1007,Ps=1008,Ui=1009,Jf=1010,$f=1011,Ha=1012,tu=1013,ks=1014,li=1015,Vn=1016,nu=1017,iu=1018,zr=1020,ep=35902,tp=1021,np=1022,Qn=1023,ip=1024,sp=1025,wr=1026,Hr=1027,su=1028,ru=1029,rp=1030,au=1031,ou=1033,Yo=33776,qo=33777,jo=33778,Ko=33779,Qc=35840,Jc=35841,$c=35842,ed=35843,td=36196,nd=37492,id=37496,sd=37808,rd=37809,ad=37810,od=37811,ld=37812,cd=37813,dd=37814,ud=37815,hd=37816,fd=37817,pd=37818,md=37819,gd=37820,vd=37821,Zo=36492,xd=36494,_d=36495,ap=36283,yd=36284,bd=36285,Md=36286,Cg=3200,op=3201,lu=0,Rg=1,qi="",Fn="srgb",$r="srgb-linear",Pl="linear",ot="srgb",Ys=7680,ih=519,Pg=512,Lg=513,Ig=514,lp=515,Dg=516,Ng=517,Ug=518,Og=519,sh=35044,rh="300 es",wi=2e3,ol=2001;class ea{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ah=1234567;const Ar=Math.PI/180,Va=180/Math.PI;function ta(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]).toLowerCase()}function Xt(i,e,t){return Math.max(e,Math.min(t,i))}function cu(i,e){return(i%e+e)%e}function Fg(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Bg(i,e,t){return i!==e?(t-i)/(e-i):0}function Ea(i,e,t){return(1-t)*i+t*e}function kg(i,e,t,n){return Ea(i,e,1-Math.exp(-t*n))}function zg(i,e=1){return e-Math.abs(cu(i,e*2)-e)}function Hg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Vg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Gg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Wg(i,e){return i+Math.random()*(e-i)}function Xg(i){return i*(.5-Math.random())}function Yg(i){i!==void 0&&(ah=i);let e=ah+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function qg(i){return i*Ar}function jg(i){return i*Va}function Kg(i){return(i&i-1)===0&&i!==0}function Zg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Qg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Jg(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),u=r((e-n)/2),h=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*d,l*u,l*h,o*c);break;case"YZY":i.set(l*h,o*d,l*u,o*c);break;case"ZXZ":i.set(l*u,l*h,o*d,o*c);break;case"XZX":i.set(o*d,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*d,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ur(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function nn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const bs={DEG2RAD:Ar,RAD2DEG:Va,generateUUID:ta,clamp:Xt,euclideanModulo:cu,mapLinear:Fg,inverseLerp:Bg,lerp:Ea,damp:kg,pingpong:zg,smoothstep:Hg,smootherstep:Vg,randInt:Gg,randFloat:Wg,randFloatSpread:Xg,seededRandom:Yg,degToRad:qg,radToDeg:jg,isPowerOfTwo:Kg,ceilPowerOfTwo:Zg,floorPowerOfTwo:Qg,setQuaternionFromProperEuler:Jg,normalize:nn,denormalize:ur};class we{constructor(e=0,t=0){we.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Be{constructor(e,t,n,s,r,a,o,l,c){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],h=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],_=s[1],b=s[4],x=s[7],C=s[2],E=s[5],S=s[8];return r[0]=a*v+o*_+l*C,r[3]=a*m+o*b+l*E,r[6]=a*p+o*x+l*S,r[1]=c*v+d*_+u*C,r[4]=c*m+d*b+u*E,r[7]=c*p+d*x+u*S,r[2]=h*v+f*_+g*C,r[5]=h*m+f*b+g*E,r[8]=h*p+f*x+g*S,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,h=o*l-d*r,f=c*r-a*l,g=t*u+n*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(s*c-d*n)*v,e[2]=(o*n-s*a)*v,e[3]=h*v,e[4]=(d*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Hl.makeScale(e,t)),this}rotate(e){return this.premultiply(Hl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Hl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Hl=new Be;function cp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ll(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $g(){const i=ll("canvas");return i.style.display="block",i}const oh={};function va(i){i in oh||(oh[i]=!0,console.warn(i))}function e0(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function t0(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function n0(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ke={enabled:!0,workingColorSpace:$r,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===ot&&(i.r=Pi(i.r),i.g=Pi(i.g),i.b=Pi(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===ot&&(i.r=Cr(i.r),i.g=Cr(i.g),i.b=Cr(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===qi?Pl:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Pi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Cr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const lh=[.64,.33,.3,.6,.15,.06],ch=[.2126,.7152,.0722],dh=[.3127,.329],uh=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hh=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ke.define({[$r]:{primaries:lh,whitePoint:dh,transfer:Pl,toXYZ:uh,fromXYZ:hh,luminanceCoefficients:ch,workingColorSpaceConfig:{unpackColorSpace:Fn},outputColorSpaceConfig:{drawingBufferColorSpace:Fn}},[Fn]:{primaries:lh,whitePoint:dh,transfer:ot,toXYZ:uh,fromXYZ:hh,luminanceCoefficients:ch,outputColorSpaceConfig:{drawingBufferColorSpace:Fn}}});let qs;class i0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{qs===void 0&&(qs=ll("canvas")),qs.width=e.width,qs.height=e.height;const n=qs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=qs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ll("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Pi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Pi(t[n]/255)*255):t[n]=Pi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let s0=0;class dp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=ta(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Vl(s[a].image)):r.push(Vl(s[a]))}else r=Vl(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Vl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?i0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let r0=0;class Gt extends ea{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,n=Ki,s=Ki,r=Zn,a=Ps,o=Qn,l=Ui,c=Gt.DEFAULT_ANISOTROPY,d=qi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=ta(),this.name="",this.source=new dp(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Qf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case en:e.x=e.x-Math.floor(e.x);break;case Ki:e.x=e.x<0?0:1;break;case Zc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case en:e.y=e.y-Math.floor(e.y);break;case Ki:e.y=e.y<0?0:1;break;case Zc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=Qf;Gt.DEFAULT_ANISOTROPY=1;class Pt{constructor(e=0,t=0,n=0,s=1){Pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,x=(f+1)/2,C=(p+1)/2,E=(d+h)/4,S=(u+v)/4,A=(g+m)/4;return b>x&&b>C?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=E/n,r=S/n):x>C?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=E/s,r=A/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=S/r,s=A/r),this.set(n,s,r,t),this}let _=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(h-d)*(h-d));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(u-v)/_,this.z=(h-d)/_,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class a0 extends ea{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Gt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new dp(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class un extends a0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class up extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=Ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class o0 extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=Ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ja{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3];const h=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(u!==v||l!==h||c!==f||d!==g){let m=1-o;const p=l*h+c*f+d*g+u*v,_=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const C=Math.sqrt(b),E=Math.atan2(C,p*_);m=Math.sin(m*E)/C,o=Math.sin(o*E)/C}const x=o*_;if(l=l*m+h*x,c=c*m+f*x,d=d*m+g*x,u=u*m+v*x,m===1-o){const C=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=C,c*=C,d*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=r[a],h=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+d*u+l*f-c*h,e[t+1]=l*g+d*h+c*u-o*f,e[t+2]=c*g+d*f+o*h-l*u,e[t+3]=d*g-o*u-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),u=o(r/2),h=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"YXZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"ZXY":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"ZYX":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"YZX":this._x=h*d*u+c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u-h*f*g;break;case"XZY":this._x=h*d*u-c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=n+o+u;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(d-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,h=Math.sin(t*d)/c;return this._w=a*u+this._w*h,this._x=n*u+this._x*h,this._y=s*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*d,this.y=n+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Gl.copy(this).projectOnVector(e),this.sub(Gl)}reflect(e){return this.sub(Gl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Gl=new I,fh=new Ja;class Hs{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(qn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(qn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=qn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,qn):qn.fromBufferAttribute(r,a),qn.applyMatrix4(e.matrixWorld),this.expandByPoint(qn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),oo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),oo.copy(n.boundingBox)),oo.applyMatrix4(e.matrixWorld),this.union(oo)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qn),qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(oa),lo.subVectors(this.max,oa),js.subVectors(e.a,oa),Ks.subVectors(e.b,oa),Zs.subVectors(e.c,oa),zi.subVectors(Ks,js),Hi.subVectors(Zs,Ks),fs.subVectors(js,Zs);let t=[0,-zi.z,zi.y,0,-Hi.z,Hi.y,0,-fs.z,fs.y,zi.z,0,-zi.x,Hi.z,0,-Hi.x,fs.z,0,-fs.x,-zi.y,zi.x,0,-Hi.y,Hi.x,0,-fs.y,fs.x,0];return!Wl(t,js,Ks,Zs,lo)||(t=[1,0,0,0,1,0,0,0,1],!Wl(t,js,Ks,Zs,lo))?!1:(co.crossVectors(zi,Hi),t=[co.x,co.y,co.z],Wl(t,js,Ks,Zs,lo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const mi=[new I,new I,new I,new I,new I,new I,new I,new I],qn=new I,oo=new Hs,js=new I,Ks=new I,Zs=new I,zi=new I,Hi=new I,fs=new I,oa=new I,lo=new I,co=new I,ps=new I;function Wl(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ps.fromArray(i,r);const o=s.x*Math.abs(ps.x)+s.y*Math.abs(ps.y)+s.z*Math.abs(ps.z),l=e.dot(ps),c=t.dot(ps),d=n.dot(ps);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const l0=new Hs,la=new I,Xl=new I;class Vs{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):l0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;la.subVectors(e,this.center);const t=la.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(la,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(la.copy(e.center).add(Xl)),this.expandByPoint(la.copy(e.center).sub(Xl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const gi=new I,Yl=new I,uo=new I,Vi=new I,ql=new I,ho=new I,jl=new I;class Ll{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gi.copy(this.origin).addScaledVector(this.direction,t),gi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Yl.copy(e).add(t).multiplyScalar(.5),uo.copy(t).sub(e).normalize(),Vi.copy(this.origin).sub(Yl);const r=e.distanceTo(t)*.5,a=-this.direction.dot(uo),o=Vi.dot(this.direction),l=-Vi.dot(uo),c=Vi.lengthSq(),d=Math.abs(1-a*a);let u,h,f,g;if(d>0)if(u=a*l-o,h=a*o-l,g=r*d,u>=0)if(h>=-g)if(h<=g){const v=1/d;u*=v,h*=v,f=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),f=-u*u+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Yl).addScaledVector(uo,h),f}intersectSphere(e,t){gi.subVectors(e.center,this.origin);const n=gi.dot(this.direction),s=gi.dot(gi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),d>=0?(r=(e.min.y-h.y)*d,a=(e.max.y-h.y)*d):(r=(e.max.y-h.y)*d,a=(e.min.y-h.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,gi)!==null}intersectTriangle(e,t,n,s,r){ql.subVectors(t,e),ho.subVectors(n,e),jl.crossVectors(ql,ho);let a=this.direction.dot(jl),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Vi.subVectors(this.origin,e);const l=o*this.direction.dot(ho.crossVectors(Vi,ho));if(l<0)return null;const c=o*this.direction.dot(ql.cross(Vi));if(c<0||l+c>a)return null;const d=-o*Vi.dot(jl);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lt{constructor(e,t,n,s,r,a,o,l,c,d,u,h,f,g,v,m){lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,u,h,f,g,v,m)}set(e,t,n,s,r,a,o,l,c,d,u,h,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Qs.setFromMatrixColumn(e,0).length(),r=1/Qs.setFromMatrixColumn(e,1).length(),a=1/Qs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=a*d,f=a*u,g=o*d,v=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*d,f=l*u,g=c*d,v=c*u;t[0]=h+v*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=f*o-g,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*d,f=l*u,g=c*d,v=c*u;t[0]=h-v*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*d,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*d,f=a*u,g=o*d,v=o*u;t[0]=l*d,t[4]=g*c-f,t[8]=h*c+v,t[1]=l*u,t[5]=v*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=v-h*u,t[8]=g*u+f,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*u+g,t[10]=h-v*u}else if(e.order==="XZY"){const h=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+v,t[5]=a*d,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*d,t[10]=v*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(c0,e,d0)}lookAt(e,t,n){const s=this.elements;return yn.subVectors(e,t),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Gi.crossVectors(n,yn),Gi.lengthSq()===0&&(Math.abs(n.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Gi.crossVectors(n,yn)),Gi.normalize(),fo.crossVectors(yn,Gi),s[0]=Gi.x,s[4]=fo.x,s[8]=yn.x,s[1]=Gi.y,s[5]=fo.y,s[9]=yn.y,s[2]=Gi.z,s[6]=fo.z,s[10]=yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],h=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],_=n[3],b=n[7],x=n[11],C=n[15],E=s[0],S=s[4],A=s[8],y=s[12],M=s[1],L=s[5],U=s[9],O=s[13],H=s[2],W=s[6],V=s[10],j=s[14],z=s[3],re=s[7],J=s[11],he=s[15];return r[0]=a*E+o*M+l*H+c*z,r[4]=a*S+o*L+l*W+c*re,r[8]=a*A+o*U+l*V+c*J,r[12]=a*y+o*O+l*j+c*he,r[1]=d*E+u*M+h*H+f*z,r[5]=d*S+u*L+h*W+f*re,r[9]=d*A+u*U+h*V+f*J,r[13]=d*y+u*O+h*j+f*he,r[2]=g*E+v*M+m*H+p*z,r[6]=g*S+v*L+m*W+p*re,r[10]=g*A+v*U+m*V+p*J,r[14]=g*y+v*O+m*j+p*he,r[3]=_*E+b*M+x*H+C*z,r[7]=_*S+b*L+x*W+C*re,r[11]=_*A+b*U+x*V+C*J,r[15]=_*y+b*O+x*j+C*he,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*o*h+n*c*h+s*o*f-n*l*f)+v*(+t*l*f-t*c*h+r*a*h-s*a*f+s*c*d-r*l*d)+m*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*d-n*c*d)+p*(-s*o*d-t*l*u+t*o*h+s*a*u-n*a*h+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],_=u*m*c-v*h*c+v*l*f-o*m*f-u*l*p+o*h*p,b=g*h*c-d*m*c-g*l*f+a*m*f+d*l*p-a*h*p,x=d*v*c-g*u*c+g*o*f-a*v*f-d*o*p+a*u*p,C=g*u*l-d*v*l-g*o*h+a*v*h+d*o*m-a*u*m,E=t*_+n*b+s*x+r*C;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/E;return e[0]=_*S,e[1]=(v*h*r-u*m*r-v*s*f+n*m*f+u*s*p-n*h*p)*S,e[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*p+n*l*p)*S,e[3]=(u*l*r-o*h*r-u*s*c+n*h*c+o*s*f-n*l*f)*S,e[4]=b*S,e[5]=(d*m*r-g*h*r+g*s*f-t*m*f-d*s*p+t*h*p)*S,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*p-t*l*p)*S,e[7]=(a*h*r-d*l*r+d*s*c-t*h*c-a*s*f+t*l*f)*S,e[8]=x*S,e[9]=(g*u*r-d*v*r-g*n*f+t*v*f+d*n*p-t*u*p)*S,e[10]=(a*v*r-g*o*r+g*n*c-t*v*c-a*n*p+t*o*p)*S,e[11]=(d*o*r-a*u*r-d*n*c+t*u*c+a*n*f-t*o*f)*S,e[12]=C*S,e[13]=(d*v*s-g*u*s+g*n*h-t*v*h-d*n*m+t*u*m)*S,e[14]=(g*o*s-a*v*s-g*n*l+t*v*l+a*n*m-t*o*m)*S,e[15]=(a*u*s-d*o*s+d*n*l-t*u*l-a*n*h+t*o*h)*S,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,h=r*c,f=r*d,g=r*u,v=a*d,m=a*u,p=o*u,_=l*c,b=l*d,x=l*u,C=n.x,E=n.y,S=n.z;return s[0]=(1-(v+p))*C,s[1]=(f+x)*C,s[2]=(g-b)*C,s[3]=0,s[4]=(f-x)*E,s[5]=(1-(h+p))*E,s[6]=(m+_)*E,s[7]=0,s[8]=(g+b)*S,s[9]=(m-_)*S,s[10]=(1-(h+v))*S,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Qs.set(s[0],s[1],s[2]).length();const a=Qs.set(s[4],s[5],s[6]).length(),o=Qs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],jn.copy(this);const c=1/r,d=1/a,u=1/o;return jn.elements[0]*=c,jn.elements[1]*=c,jn.elements[2]*=c,jn.elements[4]*=d,jn.elements[5]*=d,jn.elements[6]*=d,jn.elements[8]*=u,jn.elements[9]*=u,jn.elements[10]*=u,t.setFromRotationMatrix(jn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=wi){const l=this.elements,c=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),h=(n+s)/(n-s);let f,g;if(o===wi)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===ol)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=wi){const l=this.elements,c=1/(t-e),d=1/(n-s),u=1/(a-r),h=(t+e)*c,f=(n+s)*d;let g,v;if(o===wi)g=(a+r)*u,v=-2*u;else if(o===ol)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Qs=new I,jn=new lt,c0=new I(0,0,0),d0=new I(1,1,1),Gi=new I,fo=new I,yn=new I,ph=new lt,mh=new Ja;class $n{constructor(e=0,t=0,n=0,s=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ph.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ph,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return mh.setFromEuler(this),this.setFromQuaternion(mh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";class du{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let u0=0;const gh=new I,Js=new Ja,vi=new lt,po=new I,ca=new I,h0=new I,f0=new Ja,vh=new I(1,0,0),xh=new I(0,1,0),_h=new I(0,0,1),yh={type:"added"},p0={type:"removed"},$s={type:"childadded",child:null},Kl={type:"childremoved",child:null};class Ct extends ea{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=ta(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ct.DEFAULT_UP.clone();const e=new I,t=new $n,n=new Ja,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new lt},normalMatrix:{value:new Be}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=Ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new du,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Js.setFromAxisAngle(e,t),this.quaternion.multiply(Js),this}rotateOnWorldAxis(e,t){return Js.setFromAxisAngle(e,t),this.quaternion.premultiply(Js),this}rotateX(e){return this.rotateOnAxis(vh,e)}rotateY(e){return this.rotateOnAxis(xh,e)}rotateZ(e){return this.rotateOnAxis(_h,e)}translateOnAxis(e,t){return gh.copy(e).applyQuaternion(this.quaternion),this.position.add(gh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vh,e)}translateY(e){return this.translateOnAxis(xh,e)}translateZ(e){return this.translateOnAxis(_h,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?po.copy(e):po.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ca.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(ca,po,this.up):vi.lookAt(po,ca,this.up),this.quaternion.setFromRotationMatrix(vi),s&&(vi.extractRotation(s.matrixWorld),Js.setFromRotationMatrix(vi),this.quaternion.premultiply(Js.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yh),$s.child=e,this.dispatchEvent($s),$s.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(p0),Kl.child=e,this.dispatchEvent(Kl),Kl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yh),$s.child=e,this.dispatchEvent($s),$s.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ca,e,h0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ca,f0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Ct.DEFAULT_UP=new I(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Kn=new I,xi=new I,Zl=new I,_i=new I,er=new I,tr=new I,bh=new I,Ql=new I,Jl=new I,$l=new I,ec=new Pt,tc=new Pt,nc=new Pt;class kn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Kn.subVectors(e,t),s.cross(Kn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Kn.subVectors(s,t),xi.subVectors(n,t),Zl.subVectors(e,t);const a=Kn.dot(Kn),o=Kn.dot(xi),l=Kn.dot(Zl),c=xi.dot(xi),d=xi.dot(Zl),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const h=1/u,f=(c*l-o*d)*h,g=(a*d-o*l)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,_i)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,_i.x),l.addScaledVector(a,_i.y),l.addScaledVector(o,_i.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return ec.setScalar(0),tc.setScalar(0),nc.setScalar(0),ec.fromBufferAttribute(e,t),tc.fromBufferAttribute(e,n),nc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ec,r.x),a.addScaledVector(tc,r.y),a.addScaledVector(nc,r.z),a}static isFrontFacing(e,t,n,s){return Kn.subVectors(n,t),xi.subVectors(e,t),Kn.cross(xi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kn.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),Kn.cross(xi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return kn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return kn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return kn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return kn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return kn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;er.subVectors(s,n),tr.subVectors(r,n),Ql.subVectors(e,n);const l=er.dot(Ql),c=tr.dot(Ql);if(l<=0&&c<=0)return t.copy(n);Jl.subVectors(e,s);const d=er.dot(Jl),u=tr.dot(Jl);if(d>=0&&u<=d)return t.copy(s);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(er,a);$l.subVectors(e,r);const f=er.dot($l),g=tr.dot($l);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(tr,o);const m=d*g-f*u;if(m<=0&&u-d>=0&&f-g>=0)return bh.subVectors(r,s),o=(u-d)/(u-d+(f-g)),t.copy(s).addScaledVector(bh,o);const p=1/(m+v+h);return a=v*p,o=h*p,t.copy(n).addScaledVector(er,a).addScaledVector(tr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const hp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},mo={h:0,s:0,l:0};function ic(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class oe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Fn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ke.workingColorSpace){if(e=cu(e,1),t=Xt(t,0,1),n=Xt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ic(a,r,e+1/3),this.g=ic(a,r,e),this.b=ic(a,r,e-1/3)}return Ke.toWorkingColorSpace(this,s),this}setStyle(e,t=Fn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Fn){const n=hp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=Cr(e.r),this.g=Cr(e.g),this.b=Cr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Fn){return Ke.fromWorkingColorSpace(Qt.copy(this),e),Math.round(Xt(Qt.r*255,0,255))*65536+Math.round(Xt(Qt.g*255,0,255))*256+Math.round(Xt(Qt.b*255,0,255))}getHexString(e=Fn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Qt.copy(this),t);const n=Qt.r,s=Qt.g,r=Qt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=Fn){Ke.fromWorkingColorSpace(Qt.copy(this),e);const t=Qt.r,n=Qt.g,s=Qt.b;return e!==Fn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Wi),this.setHSL(Wi.h+e,Wi.s+t,Wi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Wi),e.getHSL(mo);const n=Ea(Wi.h,mo.h,t),s=Ea(Wi.s,mo.s,t),r=Ea(Wi.l,mo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new oe;oe.NAMES=hp;let m0=0;class cs extends ea{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:m0++}),this.uuid=ta(),this.name="",this.blending=Tr,this.side=rs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kc,this.blendDst=zc,this.blendEquation=Ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new oe(0,0,0),this.blendAlpha=0,this.depthFunc=Fr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ih,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ys,this.stencilZFail=Ys,this.stencilZPass=Ys,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Tr&&(n.blending=this.blending),this.side!==rs&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==kc&&(n.blendSrc=this.blendSrc),this.blendDst!==zc&&(n.blendDst=this.blendDst),this.blendEquation!==Ts&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ih&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ys&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ys&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ys&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class _t extends cs{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ut=new I,go=new we;class hn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=sh,this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)go.fromBufferAttribute(this,t),go.applyMatrix3(e),this.setXY(t,go.x,go.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ur(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ur(t,this.array)),t}setX(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ur(t,this.array)),t}setY(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ur(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ur(t,this.array)),t}setW(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=nn(t,this.array),n=nn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=nn(t,this.array),n=nn(n,this.array),s=nn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=nn(t,this.array),n=nn(n,this.array),s=nn(s,this.array),r=nn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==sh&&(e.usage=this.usage),e}}class fp extends hn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class pp extends hn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ut extends hn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let g0=0;const Un=new lt,sc=new Ct,nr=new I,bn=new Hs,da=new Hs,Vt=new I;class Bt extends ea{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:g0++}),this.uuid=ta(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(cp(e)?pp:fp)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Be().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Un.makeRotationFromQuaternion(e),this.applyMatrix4(Un),this}rotateX(e){return Un.makeRotationX(e),this.applyMatrix4(Un),this}rotateY(e){return Un.makeRotationY(e),this.applyMatrix4(Un),this}rotateZ(e){return Un.makeRotationZ(e),this.applyMatrix4(Un),this}translate(e,t,n){return Un.makeTranslation(e,t,n),this.applyMatrix4(Un),this}scale(e,t,n){return Un.makeScale(e,t,n),this.applyMatrix4(Un),this}lookAt(e){return sc.lookAt(e),sc.updateMatrix(),this.applyMatrix4(sc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(nr).negate(),this.translate(nr.x,nr.y,nr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ut(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];bn.setFromBufferAttribute(r),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];da.setFromBufferAttribute(o),this.morphTargetsRelative?(Vt.addVectors(bn.min,da.min),bn.expandByPoint(Vt),Vt.addVectors(bn.max,da.max),bn.expandByPoint(Vt)):(bn.expandByPoint(da.min),bn.expandByPoint(da.max))}bn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Vt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Vt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Vt.fromBufferAttribute(o,c),l&&(nr.fromBufferAttribute(e,c),Vt.add(nr)),s=Math.max(s,n.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<n.count;A++)o[A]=new I,l[A]=new I;const c=new I,d=new I,u=new I,h=new we,f=new we,g=new we,v=new I,m=new I;function p(A,y,M){c.fromBufferAttribute(n,A),d.fromBufferAttribute(n,y),u.fromBufferAttribute(n,M),h.fromBufferAttribute(r,A),f.fromBufferAttribute(r,y),g.fromBufferAttribute(r,M),d.sub(c),u.sub(c),f.sub(h),g.sub(h);const L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(L),o[A].add(v),o[y].add(v),o[M].add(v),l[A].add(m),l[y].add(m),l[M].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let A=0,y=_.length;A<y;++A){const M=_[A],L=M.start,U=M.count;for(let O=L,H=L+U;O<H;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const b=new I,x=new I,C=new I,E=new I;function S(A){C.fromBufferAttribute(s,A),E.copy(C);const y=o[A];b.copy(y),b.sub(C.multiplyScalar(C.dot(y))).normalize(),x.crossVectors(E,y);const L=x.dot(l[A])<0?-1:1;a.setXYZW(A,b.x,b.y,b.z,L)}for(let A=0,y=_.length;A<y;++A){const M=_[A],L=M.start,U=M.count;for(let O=L,H=L+U;O<H;O+=3)S(e.getX(O+0)),S(e.getX(O+1)),S(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new hn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,d=new I,u=new I;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Vt.fromBufferAttribute(e,t),Vt.normalize(),e.setXYZ(t,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*d;for(let p=0;p<d;p++)h[g++]=c[f++]}return new hn(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Bt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const f=c[u];d.push(f.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Mh=new lt,ms=new Ll,vo=new Vs,Sh=new I,xo=new I,_o=new I,yo=new I,rc=new I,bo=new I,Eh=new I,Mo=new I;class K extends Ct{constructor(e=new Bt,t=new _t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){bo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],u=r[l];d!==0&&(rc.fromBufferAttribute(u,e),a?bo.addScaledVector(rc,d):bo.addScaledVector(rc.sub(t),d))}t.add(bo)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vo.copy(n.boundingSphere),vo.applyMatrix4(r),ms.copy(e.ray).recast(e.near),!(vo.containsPoint(ms.origin)===!1&&(ms.intersectSphere(vo,Sh)===null||ms.origin.distanceToSquared(Sh)>(e.far-e.near)**2))&&(Mh.copy(r).invert(),ms.copy(e.ray).applyMatrix4(Mh),!(n.boundingBox!==null&&ms.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ms)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],_=Math.max(m.start,f.start),b=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=_,C=b;x<C;x+=3){const E=o.getX(x),S=o.getX(x+1),A=o.getX(x+2);s=So(this,p,e,n,c,d,u,E,S,A),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const _=o.getX(m),b=o.getX(m+1),x=o.getX(m+2);s=So(this,a,e,n,c,d,u,_,b,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=a[m.materialIndex],_=Math.max(m.start,f.start),b=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=_,C=b;x<C;x+=3){const E=x,S=x+1,A=x+2;s=So(this,p,e,n,c,d,u,E,S,A),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const _=m,b=m+1,x=m+2;s=So(this,a,e,n,c,d,u,_,b,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function v0(i,e,t,n,s,r,a,o){let l;if(e.side===an?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===rs,o),l===null)return null;Mo.copy(o),Mo.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Mo);return c<t.near||c>t.far?null:{distance:c,point:Mo.clone(),object:i}}function So(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,xo),i.getVertexPosition(l,_o),i.getVertexPosition(c,yo);const d=v0(i,e,t,n,xo,_o,yo,Eh);if(d){const u=new I;kn.getBarycoord(Eh,xo,_o,yo,u),s&&(d.uv=kn.getInterpolatedAttribute(s,o,l,c,u,new we)),r&&(d.uv1=kn.getInterpolatedAttribute(r,o,l,c,u,new we)),a&&(d.normal=kn.getInterpolatedAttribute(a,o,l,c,u,new I),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new I,materialIndex:0};kn.getNormal(xo,_o,yo,h.normal),d.face=h,d.barycoord=u}return d}class ae extends Bt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],u=[];let h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ut(c,3)),this.setAttribute("normal",new ut(d,3)),this.setAttribute("uv",new ut(u,2));function g(v,m,p,_,b,x,C,E,S,A,y){const M=x/S,L=C/A,U=x/2,O=C/2,H=E/2,W=S+1,V=A+1;let j=0,z=0;const re=new I;for(let J=0;J<V;J++){const he=J*L-O;for(let Pe=0;Pe<W;Pe++){const nt=Pe*M-U;re[v]=nt*_,re[m]=he*b,re[p]=H,c.push(re.x,re.y,re.z),re[v]=0,re[m]=0,re[p]=E>0?1:-1,d.push(re.x,re.y,re.z),u.push(Pe/S),u.push(1-J/A),j+=1}}for(let J=0;J<A;J++)for(let he=0;he<S;he++){const Pe=h+he+W*J,nt=h+he+W*(J+1),Z=h+(he+1)+W*(J+1),ne=h+(he+1)+W*J;l.push(Pe,nt,ne),l.push(nt,Z,ne),z+=6}o.addGroup(f,z,y),f+=z,h+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ae(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function rn(i){const e={};for(let t=0;t<i.length;t++){const n=Vr(i[t]);for(const s in n)e[s]=n[s]}return e}function x0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function mp(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const Li={clone:Vr,merge:rn};var _0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,y0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ft extends cs{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_0,this.fragmentShader=y0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vr(e.uniforms),this.uniformsGroups=x0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class gp extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=wi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Xi=new I,Th=new we,wh=new we;class Bn extends gp{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Va*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Va*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z)}getViewSize(e,t){return this.getViewBounds(e,Th,wh),t.subVectors(wh,Th)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ar*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ir=-90,sr=1;class b0 extends Ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Bn(ir,sr,e,t);s.layers=this.layers,this.add(s);const r=new Bn(ir,sr,e,t);r.layers=this.layers,this.add(r);const a=new Bn(ir,sr,e,t);a.layers=this.layers,this.add(a);const o=new Bn(ir,sr,e,t);o.layers=this.layers,this.add(o);const l=new Bn(ir,sr,e,t);l.layers=this.layers,this.add(l);const c=new Bn(ir,sr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===wi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ol)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(u,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class vp extends Gt{constructor(e,t,n,s,r,a,o,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Br,super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class M0 extends un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new vp(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Zn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ae(5,5,5),r=new Ft({name:"CubemapFromEquirect",uniforms:Vr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:an,blending:di});r.uniforms.tEquirect.value=t;const a=new K(s,r),o=t.minFilter;return t.minFilter===Ps&&(t.minFilter=Zn),new b0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const ac=new I,S0=new I,E0=new Be;class Ms{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ac.subVectors(n,t).cross(S0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ac),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||E0.getNormalMatrix(e),s=this.coplanarPoint(ac).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gs=new Vs,Eo=new I;class uu{constructor(e=new Ms,t=new Ms,n=new Ms,s=new Ms,r=new Ms,a=new Ms){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wi){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],d=s[5],u=s[6],h=s[7],f=s[8],g=s[9],v=s[10],m=s[11],p=s[12],_=s[13],b=s[14],x=s[15];if(n[0].setComponents(l-r,h-c,m-f,x-p).normalize(),n[1].setComponents(l+r,h+c,m+f,x+p).normalize(),n[2].setComponents(l+a,h+d,m+g,x+_).normalize(),n[3].setComponents(l-a,h-d,m-g,x-_).normalize(),n[4].setComponents(l-o,h-u,m-v,x-b).normalize(),t===wi)n[5].setComponents(l+o,h+u,m+v,x+b).normalize();else if(t===ol)n[5].setComponents(o,u,v,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),gs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),gs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(gs)}intersectsSprite(e){return gs.center.set(0,0,0),gs.radius=.7071067811865476,gs.applyMatrix4(e.matrixWorld),this.intersectsSphere(gs)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Eo.x=s.normal.x>0?e.max.x:e.min.x,Eo.y=s.normal.y>0?e.max.y:e.min.y,Eo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Eo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function xp(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function T0(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<u.length;f++){const g=u[h],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,u[h]=v)}u.length=h+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];i.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class Gs extends Bt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,u=e/o,h=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<d;p++){const _=p*h-a;for(let b=0;b<c;b++){const x=b*u-r;g.push(x,-_,0),v.push(0,0,1),m.push(b/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let _=0;_<o;_++){const b=_+c*p,x=_+c*(p+1),C=_+1+c*(p+1),E=_+1+c*p;f.push(b,x,E),f.push(x,C,E)}this.setIndex(f),this.setAttribute("position",new ut(g,3)),this.setAttribute("normal",new ut(v,3)),this.setAttribute("uv",new ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gs(e.width,e.height,e.widthSegments,e.heightSegments)}}var w0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,A0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,C0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,R0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,P0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,L0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,I0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,D0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,N0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,U0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,O0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,F0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,B0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,k0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,z0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,H0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,V0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,G0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,W0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,X0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Y0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,q0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,j0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,K0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Z0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Q0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,J0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ev=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nv="gl_FragColor = linearToOutputTexel( gl_FragColor );",iv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,rv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,av=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ov=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,cv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,uv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,pv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,xv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,_v=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Mv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Sv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ev=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Tv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,wv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Av=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Iv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Dv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Uv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ov=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Vv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Wv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Xv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,jv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Kv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$v=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ex=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,tx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ix=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ax=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ox=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,lx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,cx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ux=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,px=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,mx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_x=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,yx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ex=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Tx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Px=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ix=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Dx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Nx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ox=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Wx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Yx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,qx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$x=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,e_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,t_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,n_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,i_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,s_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:w0,alphahash_pars_fragment:A0,alphamap_fragment:C0,alphamap_pars_fragment:R0,alphatest_fragment:P0,alphatest_pars_fragment:L0,aomap_fragment:I0,aomap_pars_fragment:D0,batching_pars_vertex:N0,batching_vertex:U0,begin_vertex:O0,beginnormal_vertex:F0,bsdfs:B0,iridescence_fragment:k0,bumpmap_pars_fragment:z0,clipping_planes_fragment:H0,clipping_planes_pars_fragment:V0,clipping_planes_pars_vertex:G0,clipping_planes_vertex:W0,color_fragment:X0,color_pars_fragment:Y0,color_pars_vertex:q0,color_vertex:j0,common:K0,cube_uv_reflection_fragment:Z0,defaultnormal_vertex:Q0,displacementmap_pars_vertex:J0,displacementmap_vertex:$0,emissivemap_fragment:ev,emissivemap_pars_fragment:tv,colorspace_fragment:nv,colorspace_pars_fragment:iv,envmap_fragment:sv,envmap_common_pars_fragment:rv,envmap_pars_fragment:av,envmap_pars_vertex:ov,envmap_physical_pars_fragment:xv,envmap_vertex:lv,fog_vertex:cv,fog_pars_vertex:dv,fog_fragment:uv,fog_pars_fragment:hv,gradientmap_pars_fragment:fv,lightmap_pars_fragment:pv,lights_lambert_fragment:mv,lights_lambert_pars_fragment:gv,lights_pars_begin:vv,lights_toon_fragment:_v,lights_toon_pars_fragment:yv,lights_phong_fragment:bv,lights_phong_pars_fragment:Mv,lights_physical_fragment:Sv,lights_physical_pars_fragment:Ev,lights_fragment_begin:Tv,lights_fragment_maps:wv,lights_fragment_end:Av,logdepthbuf_fragment:Cv,logdepthbuf_pars_fragment:Rv,logdepthbuf_pars_vertex:Pv,logdepthbuf_vertex:Lv,map_fragment:Iv,map_pars_fragment:Dv,map_particle_fragment:Nv,map_particle_pars_fragment:Uv,metalnessmap_fragment:Ov,metalnessmap_pars_fragment:Fv,morphinstance_vertex:Bv,morphcolor_vertex:kv,morphnormal_vertex:zv,morphtarget_pars_vertex:Hv,morphtarget_vertex:Vv,normal_fragment_begin:Gv,normal_fragment_maps:Wv,normal_pars_fragment:Xv,normal_pars_vertex:Yv,normal_vertex:qv,normalmap_pars_fragment:jv,clearcoat_normal_fragment_begin:Kv,clearcoat_normal_fragment_maps:Zv,clearcoat_pars_fragment:Qv,iridescence_pars_fragment:Jv,opaque_fragment:$v,packing:ex,premultiplied_alpha_fragment:tx,project_vertex:nx,dithering_fragment:ix,dithering_pars_fragment:sx,roughnessmap_fragment:rx,roughnessmap_pars_fragment:ax,shadowmap_pars_fragment:ox,shadowmap_pars_vertex:lx,shadowmap_vertex:cx,shadowmask_pars_fragment:dx,skinbase_vertex:ux,skinning_pars_vertex:hx,skinning_vertex:fx,skinnormal_vertex:px,specularmap_fragment:mx,specularmap_pars_fragment:gx,tonemapping_fragment:vx,tonemapping_pars_fragment:xx,transmission_fragment:_x,transmission_pars_fragment:yx,uv_pars_fragment:bx,uv_pars_vertex:Mx,uv_vertex:Sx,worldpos_vertex:Ex,background_vert:Tx,background_frag:wx,backgroundCube_vert:Ax,backgroundCube_frag:Cx,cube_vert:Rx,cube_frag:Px,depth_vert:Lx,depth_frag:Ix,distanceRGBA_vert:Dx,distanceRGBA_frag:Nx,equirect_vert:Ux,equirect_frag:Ox,linedashed_vert:Fx,linedashed_frag:Bx,meshbasic_vert:kx,meshbasic_frag:zx,meshlambert_vert:Hx,meshlambert_frag:Vx,meshmatcap_vert:Gx,meshmatcap_frag:Wx,meshnormal_vert:Xx,meshnormal_frag:Yx,meshphong_vert:qx,meshphong_frag:jx,meshphysical_vert:Kx,meshphysical_frag:Zx,meshtoon_vert:Qx,meshtoon_frag:Jx,points_vert:$x,points_frag:e_,shadow_vert:t_,shadow_frag:n_,sprite_vert:i_,sprite_frag:s_},le={common:{diffuse:{value:new oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new oe(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},ri={basic:{uniforms:rn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:rn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new oe(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:rn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new oe(0)},specular:{value:new oe(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:rn([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:rn([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new oe(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:rn([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:rn([le.points,le.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:rn([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:rn([le.common,le.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:rn([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:rn([le.sprite,le.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:rn([le.common,le.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:rn([le.lights,le.fog,{color:{value:new oe(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};ri.physical={uniforms:rn([ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new oe(0)},specularColor:{value:new oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const To={r:0,b:0,g:0},vs=new $n,r_=new lt;function a_(i,e,t,n,s,r,a){const o=new oe(0);let l=r===!0?0:1,c,d,u=null,h=0,f=null;function g(_){let b=_.isScene===!0?_.background:null;return b&&b.isTexture&&(b=(_.backgroundBlurriness>0?t:e).get(b)),b}function v(_){let b=!1;const x=g(_);x===null?p(o,l):x&&x.isColor&&(p(x,1),b=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(_,b){const x=g(b);x&&(x.isCubeTexture||x.mapping===Rl)?(d===void 0&&(d=new K(new ae(1,1,1),new Ft({name:"BackgroundCubeMaterial",uniforms:Vr(ri.backgroundCube.uniforms),vertexShader:ri.backgroundCube.vertexShader,fragmentShader:ri.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(C,E,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),vs.copy(b.backgroundRotation),vs.x*=-1,vs.y*=-1,vs.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(vs.y*=-1,vs.z*=-1),d.material.uniforms.envMap.value=x,d.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(r_.makeRotationFromEuler(vs)),d.material.toneMapped=Ke.getTransfer(x.colorSpace)!==ot,(u!==x||h!==x.version||f!==i.toneMapping)&&(d.material.needsUpdate=!0,u=x,h=x.version,f=i.toneMapping),d.layers.enableAll(),_.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new K(new Gs(2,2),new Ft({name:"BackgroundMaterial",uniforms:Vr(ri.background.uniforms),vertexShader:ri.background.vertexShader,fragmentShader:ri.background.fragmentShader,side:rs,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(x.colorSpace)!==ot,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||h!==x.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,h=x.version,f=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function p(_,b){_.getRGB(To,mp(i)),n.buffers.color.setClear(To.r,To.g,To.b,b,a)}return{getClearColor:function(){return o},setClearColor:function(_,b=1){o.set(_),l=b,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(o,l)},render:v,addToRenderList:m}}function o_(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(M,L,U,O,H){let W=!1;const V=u(O,U,L);r!==V&&(r=V,c(r.object)),W=f(M,O,U,H),W&&g(M,O,U,H),H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,x(M,L,U,O),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function d(M){return i.deleteVertexArray(M)}function u(M,L,U){const O=U.wireframe===!0;let H=n[M.id];H===void 0&&(H={},n[M.id]=H);let W=H[L.id];W===void 0&&(W={},H[L.id]=W);let V=W[O];return V===void 0&&(V=h(l()),W[O]=V),V}function h(M){const L=[],U=[],O=[];for(let H=0;H<t;H++)L[H]=0,U[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:O,object:M,attributes:{},index:null}}function f(M,L,U,O){const H=r.attributes,W=L.attributes;let V=0;const j=U.getAttributes();for(const z in j)if(j[z].location>=0){const J=H[z];let he=W[z];if(he===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(he=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(he=M.instanceColor)),J===void 0||J.attribute!==he||he&&J.data!==he.data)return!0;V++}return r.attributesNum!==V||r.index!==O}function g(M,L,U,O){const H={},W=L.attributes;let V=0;const j=U.getAttributes();for(const z in j)if(j[z].location>=0){let J=W[z];J===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(J=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(J=M.instanceColor));const he={};he.attribute=J,J&&J.data&&(he.data=J.data),H[z]=he,V++}r.attributes=H,r.attributesNum=V,r.index=O}function v(){const M=r.newAttributes;for(let L=0,U=M.length;L<U;L++)M[L]=0}function m(M){p(M,0)}function p(M,L){const U=r.newAttributes,O=r.enabledAttributes,H=r.attributeDivisors;U[M]=1,O[M]===0&&(i.enableVertexAttribArray(M),O[M]=1),H[M]!==L&&(i.vertexAttribDivisor(M,L),H[M]=L)}function _(){const M=r.newAttributes,L=r.enabledAttributes;for(let U=0,O=L.length;U<O;U++)L[U]!==M[U]&&(i.disableVertexAttribArray(U),L[U]=0)}function b(M,L,U,O,H,W,V){V===!0?i.vertexAttribIPointer(M,L,U,H,W):i.vertexAttribPointer(M,L,U,O,H,W)}function x(M,L,U,O){v();const H=O.attributes,W=U.getAttributes(),V=L.defaultAttributeValues;for(const j in W){const z=W[j];if(z.location>=0){let re=H[j];if(re===void 0&&(j==="instanceMatrix"&&M.instanceMatrix&&(re=M.instanceMatrix),j==="instanceColor"&&M.instanceColor&&(re=M.instanceColor)),re!==void 0){const J=re.normalized,he=re.itemSize,Pe=e.get(re);if(Pe===void 0)continue;const nt=Pe.buffer,Z=Pe.type,ne=Pe.bytesPerElement,Se=Z===i.INT||Z===i.UNSIGNED_INT||re.gpuType===tu;if(re.isInterleavedBufferAttribute){const de=re.data,Le=de.stride,Ue=re.offset;if(de.isInstancedInterleavedBuffer){for(let Ge=0;Ge<z.locationSize;Ge++)p(z.location+Ge,de.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Ge=0;Ge<z.locationSize;Ge++)m(z.location+Ge);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let Ge=0;Ge<z.locationSize;Ge++)b(z.location+Ge,he/z.locationSize,Z,J,Le*ne,(Ue+he/z.locationSize*Ge)*ne,Se)}else{if(re.isInstancedBufferAttribute){for(let de=0;de<z.locationSize;de++)p(z.location+de,re.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let de=0;de<z.locationSize;de++)m(z.location+de);i.bindBuffer(i.ARRAY_BUFFER,nt);for(let de=0;de<z.locationSize;de++)b(z.location+de,he/z.locationSize,Z,J,he*ne,he/z.locationSize*de*ne,Se)}}else if(V!==void 0){const J=V[j];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(z.location,J);break;case 3:i.vertexAttrib3fv(z.location,J);break;case 4:i.vertexAttrib4fv(z.location,J);break;default:i.vertexAttrib1fv(z.location,J)}}}}_()}function C(){A();for(const M in n){const L=n[M];for(const U in L){const O=L[U];for(const H in O)d(O[H].object),delete O[H];delete L[U]}delete n[M]}}function E(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const U in L){const O=L[U];for(const H in O)d(O[H].object),delete O[H];delete L[U]}delete n[M.id]}function S(M){for(const L in n){const U=n[L];if(U[M.id]===void 0)continue;const O=U[M.id];for(const H in O)d(O[H].object),delete O[H];delete U[M.id]}}function A(){y(),a=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:y,dispose:C,releaseStatesOfGeometry:E,releaseStatesOfProgram:S,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function l_(i,e,t){let n;function s(c){n=c}function r(c,d){i.drawArrays(n,c,d),t.update(d,n,1)}function a(c,d,u){u!==0&&(i.drawArraysInstanced(n,c,d,u),t.update(d,n,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,d,0,u);let f=0;for(let g=0;g<u;g++)f+=d[g];t.update(f,n,1)}function l(c,d,u,h){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],d[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,d,0,h,0,u);let g=0;for(let v=0;v<u;v++)g+=d[v]*h[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function c_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(S){return!(S!==Qn&&n.convert(S)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(S){const A=S===Vn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(S!==Ui&&n.convert(S)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==li&&!A)}function l(S){if(S==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:_,maxVaryings:b,maxFragmentUniforms:x,vertexTextures:C,maxSamples:E}}function d_(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Ms,o=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const f=u.length!==0||h||n!==0||s;return s=h,n=u.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const _=r?0:n,b=_*4;let x=p.clippingState||null;l.value=x,x=d(g,h,b,f);for(let C=0;C!==b;++C)x[C]=t[C];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,h,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,_=h.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,x=f;b!==v;++b,x+=4)a.copy(u[b]).applyMatrix4(_,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function u_(i){let e=new WeakMap;function t(a,o){return o===jc?a.mapping=Br:o===Kc&&(a.mapping=kr),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===jc||o===Kc)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new M0(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class hu extends gp{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const hr=4,Ah=[.125,.215,.35,.446,.526,.582],ws=20,oc=new hu,Ch=new oe;let lc=null,cc=0,dc=0,uc=!1;const Ss=(1+Math.sqrt(5))/2,rr=1/Ss,Rh=[new I(-Ss,rr,0),new I(Ss,rr,0),new I(-rr,0,Ss),new I(rr,0,Ss),new I(0,Ss,-rr),new I(0,Ss,rr),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class Ph{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){lc=this._renderer.getRenderTarget(),cc=this._renderer.getActiveCubeFace(),dc=this._renderer.getActiveMipmapLevel(),uc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ih(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(lc,cc,dc),this._renderer.xr.enabled=uc,e.scissorTest=!1,wo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Br||e.mapping===kr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),lc=this._renderer.getRenderTarget(),cc=this._renderer.getActiveCubeFace(),dc=this._renderer.getActiveMipmapLevel(),uc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Zn,minFilter:Zn,generateMipmaps:!1,type:Vn,format:Qn,colorSpace:$r,depthBuffer:!1},s=Lh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=h_(r)),this._blurMaterial=f_(r,e,t)}return s}_compileMaterial(e){const t=new K(this._lodPlanes[0],e);this._renderer.compile(t,oc)}_sceneToCubeUV(e,t,n,s){const o=new Bn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(Ch),d.toneMapping=ts,d.autoClear=!1;const f=new _t({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1}),g=new K(new ae,f);let v=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,v=!0):(f.color.copy(Ch),v=!0);for(let p=0;p<6;p++){const _=p%3;_===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):_===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const b=this._cubeSize;wo(s,_*b,p>2?b:0,b,b),d.setRenderTarget(s),v&&d.render(g,o),d.render(e,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Br||e.mapping===kr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ih());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new K(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;wo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,oc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Rh[(s-r-1)%Rh.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new K(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ws-1),v=r/g,m=isFinite(r)?1+Math.floor(d*v):ws;m>ws&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ws}`);const p=[];let _=0;for(let S=0;S<ws;++S){const A=S/v,y=Math.exp(-A*A/2);p.push(y),S===0?_+=y:S<m&&(_+=2*y)}for(let S=0;S<p.length;S++)p[S]=p[S]/_;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:b}=this;h.dTheta.value=g,h.mipInt.value=b-n;const x=this._sizeLods[s],C=3*x*(s>b-hr?s-b+hr:0),E=4*(this._cubeSize-x);wo(t,C,E,3*x,2*x),l.setRenderTarget(t),l.render(u,oc)}}function h_(i){const e=[],t=[],n=[];let s=i;const r=i-hr+1+Ah.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-hr?l=Ah[a-i+hr-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,g=6,v=3,m=2,p=1,_=new Float32Array(v*g*f),b=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let E=0;E<f;E++){const S=E%3*2/3-1,A=E>2?0:-1,y=[S,A,0,S+2/3,A,0,S+2/3,A+1,0,S,A,0,S+2/3,A+1,0,S,A+1,0];_.set(y,v*g*E),b.set(h,m*g*E);const M=[E,E,E,E,E,E];x.set(M,p*g*E)}const C=new Bt;C.setAttribute("position",new hn(_,v)),C.setAttribute("uv",new hn(b,m)),C.setAttribute("faceIndex",new hn(x,p)),e.push(C),s>hr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Lh(i,e,t){const n=new un(i,e,t);return n.texture.mapping=Rl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function wo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function f_(i,e,t){const n=new Float32Array(ws),s=new I(0,1,0);return new Ft({name:"SphericalGaussianBlur",defines:{n:ws,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:fu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:di,depthTest:!1,depthWrite:!1})}function Ih(){return new Ft({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:di,depthTest:!1,depthWrite:!1})}function Dh(){return new Ft({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:di,depthTest:!1,depthWrite:!1})}function fu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function p_(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===jc||l===Kc,d=l===Br||l===kr;if(c||d){let u=e.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Ph(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||d&&f&&s(f)?(t===null&&(t=new Ph(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function m_(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&va("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function g_(i,e,t,n){const s={},r=new WeakMap;function a(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const v=h.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}h.removeEventListener("dispose",a),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(u){const h=u.attributes;for(const g in h)e.update(h[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)e.update(v[m],i.ARRAY_BUFFER)}}function c(u){const h=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const _=f.array;v=f.version;for(let b=0,x=_.length;b<x;b+=3){const C=_[b+0],E=_[b+1],S=_[b+2];h.push(C,E,E,S,S,C)}}else if(g!==void 0){const _=g.array;v=g.version;for(let b=0,x=_.length/3-1;b<x;b+=3){const C=b+0,E=b+1,S=b+2;h.push(C,E,E,S,S,C)}}else return;const m=new(cp(h)?pp:fp)(h,1);m.version=v;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function d(u){const h=r.get(u);if(h){const f=u.index;f!==null&&h.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function v_(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,f){i.drawElements(n,f,r,h*a),t.update(f,n,1)}function c(h,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,h*a,g),t.update(f,n,g))}function d(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(h,f,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,h,0,v,0,g);let p=0;for(let _=0;_<g;_++)p+=f[_]*v[_];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function x_(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function __(i,e,t){const n=new WeakMap,s=new Pt;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=n.get(o);if(h===void 0||h.count!==u){let M=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var f=M;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let C=o.attributes.position.count*x,E=1;C>e.maxTextureSize&&(E=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const S=new Float32Array(C*E*4*u),A=new up(S,C,E,u);A.type=li,A.needsUpdate=!0;const y=x*4;for(let L=0;L<u;L++){const U=p[L],O=_[L],H=b[L],W=C*E*4*L;for(let V=0;V<U.count;V++){const j=V*y;g===!0&&(s.fromBufferAttribute(U,V),S[W+j+0]=s.x,S[W+j+1]=s.y,S[W+j+2]=s.z,S[W+j+3]=0),v===!0&&(s.fromBufferAttribute(O,V),S[W+j+4]=s.x,S[W+j+5]=s.y,S[W+j+6]=s.z,S[W+j+7]=0),m===!0&&(s.fromBufferAttribute(H,V),S[W+j+8]=s.x,S[W+j+9]=s.y,S[W+j+10]=s.z,S[W+j+11]=H.itemSize===4?s.w:1)}}h={count:u,texture:A,size:new we(C,E)},n.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function y_(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class _p extends Gt{constructor(e,t,n,s,r,a,o,l,c,d=wr){if(d!==wr&&d!==Hr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===wr&&(n=ks),n===void 0&&d===Hr&&(n=zr),super(null,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:qt,this.minFilter=l!==void 0?l:qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const yp=new Gt,Nh=new _p(1,1),bp=new up,Mp=new o0,Sp=new vp,Uh=[],Oh=[],Fh=new Float32Array(16),Bh=new Float32Array(9),kh=new Float32Array(4);function na(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Uh[s];if(r===void 0&&(r=new Float32Array(s),Uh[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function zt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ht(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Il(i,e){let t=Oh[e];t===void 0&&(t=new Int32Array(e),Oh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function b_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function M_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2fv(this.addr,e),Ht(t,e)}}function S_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(zt(t,e))return;i.uniform3fv(this.addr,e),Ht(t,e)}}function E_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4fv(this.addr,e),Ht(t,e)}}function T_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;kh.set(n),i.uniformMatrix2fv(this.addr,!1,kh),Ht(t,n)}}function w_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;Bh.set(n),i.uniformMatrix3fv(this.addr,!1,Bh),Ht(t,n)}}function A_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;Fh.set(n),i.uniformMatrix4fv(this.addr,!1,Fh),Ht(t,n)}}function C_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function R_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2iv(this.addr,e),Ht(t,e)}}function P_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3iv(this.addr,e),Ht(t,e)}}function L_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4iv(this.addr,e),Ht(t,e)}}function I_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function D_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2uiv(this.addr,e),Ht(t,e)}}function N_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3uiv(this.addr,e),Ht(t,e)}}function U_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4uiv(this.addr,e),Ht(t,e)}}function O_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Nh.compareFunction=lp,r=Nh):r=yp,t.setTexture2D(e||r,s)}function F_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Mp,s)}function B_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Sp,s)}function k_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||bp,s)}function z_(i){switch(i){case 5126:return b_;case 35664:return M_;case 35665:return S_;case 35666:return E_;case 35674:return T_;case 35675:return w_;case 35676:return A_;case 5124:case 35670:return C_;case 35667:case 35671:return R_;case 35668:case 35672:return P_;case 35669:case 35673:return L_;case 5125:return I_;case 36294:return D_;case 36295:return N_;case 36296:return U_;case 35678:case 36198:case 36298:case 36306:case 35682:return O_;case 35679:case 36299:case 36307:return F_;case 35680:case 36300:case 36308:case 36293:return B_;case 36289:case 36303:case 36311:case 36292:return k_}}function H_(i,e){i.uniform1fv(this.addr,e)}function V_(i,e){const t=na(e,this.size,2);i.uniform2fv(this.addr,t)}function G_(i,e){const t=na(e,this.size,3);i.uniform3fv(this.addr,t)}function W_(i,e){const t=na(e,this.size,4);i.uniform4fv(this.addr,t)}function X_(i,e){const t=na(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Y_(i,e){const t=na(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function q_(i,e){const t=na(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function j_(i,e){i.uniform1iv(this.addr,e)}function K_(i,e){i.uniform2iv(this.addr,e)}function Z_(i,e){i.uniform3iv(this.addr,e)}function Q_(i,e){i.uniform4iv(this.addr,e)}function J_(i,e){i.uniform1uiv(this.addr,e)}function $_(i,e){i.uniform2uiv(this.addr,e)}function ey(i,e){i.uniform3uiv(this.addr,e)}function ty(i,e){i.uniform4uiv(this.addr,e)}function ny(i,e,t){const n=this.cache,s=e.length,r=Il(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||yp,r[a])}function iy(i,e,t){const n=this.cache,s=e.length,r=Il(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Mp,r[a])}function sy(i,e,t){const n=this.cache,s=e.length,r=Il(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Sp,r[a])}function ry(i,e,t){const n=this.cache,s=e.length,r=Il(t,s);zt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||bp,r[a])}function ay(i){switch(i){case 5126:return H_;case 35664:return V_;case 35665:return G_;case 35666:return W_;case 35674:return X_;case 35675:return Y_;case 35676:return q_;case 5124:case 35670:return j_;case 35667:case 35671:return K_;case 35668:case 35672:return Z_;case 35669:case 35673:return Q_;case 5125:return J_;case 36294:return $_;case 36295:return ey;case 36296:return ty;case 35678:case 36198:case 36298:case 36306:case 35682:return ny;case 35679:case 36299:case 36307:return iy;case 35680:case 36300:case 36308:case 36293:return sy;case 36289:case 36303:case 36311:case 36292:return ry}}class oy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=z_(t.type)}}class ly{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ay(t.type)}}class cy{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const hc=/(\w+)(\])?(\[|\.)?/g;function zh(i,e){i.seq.push(e),i.map[e.id]=e}function dy(i,e,t){const n=i.name,s=n.length;for(hc.lastIndex=0;;){const r=hc.exec(n),a=hc.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){zh(t,c===void 0?new oy(o,i,e):new ly(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new cy(o),zh(t,u)),t=u}}}class Qo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);dy(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Hh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const uy=37297;let hy=0;function fy(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Vh=new Be;function py(i){Ke._getMatrix(Vh,Ke.workingColorSpace,i);const e=`mat3( ${Vh.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(i)){case Pl:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Gh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+fy(i.getShaderSource(e),a)}else return s}function my(i,e){const t=py(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function gy(i,e){let t;switch(e){case Yf:t="Linear";break;case qf:t="Reinhard";break;case jf:t="Cineon";break;case eu:t="ACESFilmic";break;case Kf:t="AgX";break;case Zf:t="Neutral";break;case wg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ao=new I;function vy(){Ke.getLuminanceCoefficients(Ao);const i=Ao.x.toFixed(4),e=Ao.y.toFixed(4),t=Ao.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xa).join(`
`)}function _y(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function yy(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function xa(i){return i!==""}function Wh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const by=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sd(i){return i.replace(by,Sy)}const My=new Map;function Sy(i,e){let t=ze[e];if(t===void 0){const n=My.get(e);if(n!==void 0)t=ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Sd(t)}const Ey=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yh(i){return i.replace(Ey,Ty)}function Ty(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function qh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function wy(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===$d?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Xf?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===bi&&(e="SHADOWMAP_TYPE_VSM"),e}function Ay(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Br:case kr:e="ENVMAP_TYPE_CUBE";break;case Rl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Cy(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case kr:e="ENVMAP_MODE_REFRACTION";break}return e}function Ry(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Cl:e="ENVMAP_BLENDING_MULTIPLY";break;case Eg:e="ENVMAP_BLENDING_MIX";break;case Tg:e="ENVMAP_BLENDING_ADD";break}return e}function Py(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Ly(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=wy(t),c=Ay(t),d=Cy(t),u=Ry(t),h=Py(t),f=xy(t),g=_y(r),v=s.createProgram();let m,p,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(xa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(xa).join(`
`),p.length>0&&(p+=`
`)):(m=[qh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xa).join(`
`),p=[qh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ts?"#define TONE_MAPPING":"",t.toneMapping!==ts?ze.tonemapping_pars_fragment:"",t.toneMapping!==ts?gy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,my("linearToOutputTexel",t.outputColorSpace),vy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xa).join(`
`)),a=Sd(a),a=Wh(a,t),a=Xh(a,t),o=Sd(o),o=Wh(o,t),o=Xh(o,t),a=Yh(a),o=Yh(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===rh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=_+m+a,x=_+p+o,C=Hh(s,s.VERTEX_SHADER,b),E=Hh(s,s.FRAGMENT_SHADER,x);s.attachShader(v,C),s.attachShader(v,E),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function S(L){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(v).trim(),O=s.getShaderInfoLog(C).trim(),H=s.getShaderInfoLog(E).trim();let W=!0,V=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,C,E);else{const j=Gh(s,C,"vertex"),z=Gh(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+U+`
`+j+`
`+z)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(O===""||H==="")&&(V=!1);V&&(L.diagnostics={runnable:W,programLog:U,vertexShader:{log:O,prefix:m},fragmentShader:{log:H,prefix:p}})}s.deleteShader(C),s.deleteShader(E),A=new Qo(s,v),y=yy(s,v)}let A;this.getUniforms=function(){return A===void 0&&S(this),A};let y;this.getAttributes=function(){return y===void 0&&S(this),y};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,uy)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=hy++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=E,this}let Iy=0;class Dy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ny(e),t.set(e,n)),n}}class Ny{constructor(e){this.id=Iy++,this.code=e,this.usedTimes=0}}function Uy(i,e,t,n,s,r,a){const o=new du,l=new Dy,c=new Set,d=[],u=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,M,L,U,O){const H=U.fog,W=O.geometry,V=y.isMeshStandardMaterial?U.environment:null,j=(y.isMeshStandardMaterial?t:e).get(y.envMap||V),z=j&&j.mapping===Rl?j.image.height:null,re=g[y.type];y.precision!==null&&(f=s.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const J=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,he=J!==void 0?J.length:0;let Pe=0;W.morphAttributes.position!==void 0&&(Pe=1),W.morphAttributes.normal!==void 0&&(Pe=2),W.morphAttributes.color!==void 0&&(Pe=3);let nt,Z,ne,Se;if(re){const at=ri[re];nt=at.vertexShader,Z=at.fragmentShader}else nt=y.vertexShader,Z=y.fragmentShader,l.update(y),ne=l.getVertexShaderID(y),Se=l.getFragmentShaderID(y);const de=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),Ue=O.isInstancedMesh===!0,Ge=O.isBatchedMesh===!0,St=!!y.map,Ze=!!y.matcap,Dt=!!j,k=!!y.aoMap,Dn=!!y.lightMap,Ye=!!y.bumpMap,qe=!!y.normalMap,Ce=!!y.displacementMap,mt=!!y.emissiveMap,Ae=!!y.metalnessMap,R=!!y.roughnessMap,T=y.anisotropy>0,G=y.clearcoat>0,$=y.dispersion>0,te=y.iridescence>0,Q=y.sheen>0,Ee=y.transmission>0,ue=T&&!!y.anisotropyMap,ve=G&&!!y.clearcoatMap,Qe=G&&!!y.clearcoatNormalMap,ie=G&&!!y.clearcoatRoughnessMap,xe=te&&!!y.iridescenceMap,Re=te&&!!y.iridescenceThicknessMap,Ie=Q&&!!y.sheenColorMap,_e=Q&&!!y.sheenRoughnessMap,je=!!y.specularMap,ke=!!y.specularColorMap,ht=!!y.specularIntensityMap,N=Ee&&!!y.transmissionMap,ce=Ee&&!!y.thicknessMap,q=!!y.gradientMap,ee=!!y.alphaMap,me=y.alphaTest>0,fe=!!y.alphaHash,Oe=!!y.extensions;let Rt=ts;y.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(Rt=i.toneMapping);const Kt={shaderID:re,shaderType:y.type,shaderName:y.name,vertexShader:nt,fragmentShader:Z,defines:y.defines,customVertexShaderID:ne,customFragmentShaderID:Se,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Ge,batchingColor:Ge&&O._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&O.instanceColor!==null,instancingMorph:Ue&&O.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:de===null?i.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:$r,alphaToCoverage:!!y.alphaToCoverage,map:St,matcap:Ze,envMap:Dt,envMapMode:Dt&&j.mapping,envMapCubeUVHeight:z,aoMap:k,lightMap:Dn,bumpMap:Ye,normalMap:qe,displacementMap:h&&Ce,emissiveMap:mt,normalMapObjectSpace:qe&&y.normalMapType===Rg,normalMapTangentSpace:qe&&y.normalMapType===lu,metalnessMap:Ae,roughnessMap:R,anisotropy:T,anisotropyMap:ue,clearcoat:G,clearcoatMap:ve,clearcoatNormalMap:Qe,clearcoatRoughnessMap:ie,dispersion:$,iridescence:te,iridescenceMap:xe,iridescenceThicknessMap:Re,sheen:Q,sheenColorMap:Ie,sheenRoughnessMap:_e,specularMap:je,specularColorMap:ke,specularIntensityMap:ht,transmission:Ee,transmissionMap:N,thicknessMap:ce,gradientMap:q,opaque:y.transparent===!1&&y.blending===Tr&&y.alphaToCoverage===!1,alphaMap:ee,alphaTest:me,alphaHash:fe,combine:y.combine,mapUv:St&&v(y.map.channel),aoMapUv:k&&v(y.aoMap.channel),lightMapUv:Dn&&v(y.lightMap.channel),bumpMapUv:Ye&&v(y.bumpMap.channel),normalMapUv:qe&&v(y.normalMap.channel),displacementMapUv:Ce&&v(y.displacementMap.channel),emissiveMapUv:mt&&v(y.emissiveMap.channel),metalnessMapUv:Ae&&v(y.metalnessMap.channel),roughnessMapUv:R&&v(y.roughnessMap.channel),anisotropyMapUv:ue&&v(y.anisotropyMap.channel),clearcoatMapUv:ve&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:Qe&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:_e&&v(y.sheenRoughnessMap.channel),specularMapUv:je&&v(y.specularMap.channel),specularColorMapUv:ke&&v(y.specularColorMap.channel),specularIntensityMapUv:ht&&v(y.specularIntensityMap.channel),transmissionMapUv:N&&v(y.transmissionMap.channel),thicknessMapUv:ce&&v(y.thicknessMap.channel),alphaMapUv:ee&&v(y.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(qe||T),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!W.attributes.uv&&(St||ee),fog:!!H,useFog:y.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Le,skinning:O.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:Pe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Rt,decodeVideoTexture:St&&y.map.isVideoTexture===!0&&Ke.getTransfer(y.map.colorSpace)===ot,decodeVideoTextureEmissive:mt&&y.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(y.emissiveMap.colorSpace)===ot,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Tn,flipSided:y.side===an,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Oe&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&y.extensions.multiDraw===!0||Ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Kt.vertexUv1s=c.has(1),Kt.vertexUv2s=c.has(2),Kt.vertexUv3s=c.has(3),c.clear(),Kt}function p(y){const M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)M.push(L),M.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(_(M,y),b(M,y),M.push(i.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function _(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function b(y,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),y.push(o.mask)}function x(y){const M=g[y.type];let L;if(M){const U=ri[M];L=Li.clone(U.uniforms)}else L=y.uniforms;return L}function C(y,M){let L;for(let U=0,O=d.length;U<O;U++){const H=d[U];if(H.cacheKey===M){L=H,++L.usedTimes;break}}return L===void 0&&(L=new Ly(i,M,y,r),d.push(L)),L}function E(y){if(--y.usedTimes===0){const M=d.indexOf(y);d[M]=d[d.length-1],d.pop(),y.destroy()}}function S(y){l.remove(y)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:C,releaseProgram:E,releaseShaderCache:S,programs:d,dispose:A}}function Oy(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Fy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function jh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Kh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,h,f,g,v,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:h,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),e++,p}function o(u,h,f,g,v,m){const p=a(u,h,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,h,f,g,v,m){const p=a(u,h,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,h){t.length>1&&t.sort(u||Fy),n.length>1&&n.sort(h||jh),s.length>1&&s.sort(h||jh)}function d(){for(let u=e,h=i.length;u<h;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function By(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Kh,i.set(n,[a])):s>=r.length?(a=new Kh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function ky(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new oe};break;case"SpotLight":t={position:new I,direction:new I,color:new oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new oe,groundColor:new oe};break;case"RectAreaLight":t={color:new oe,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function zy(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Hy=0;function Vy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Gy(i){const e=new ky,t=zy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const s=new I,r=new lt,a=new lt;function o(c){let d=0,u=0,h=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,_=0,b=0,x=0,C=0,E=0,S=0;c.sort(Vy);for(let y=0,M=c.length;y<M;y++){const L=c[y],U=L.color,O=L.intensity,H=L.distance,W=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=U.r*O,u+=U.g*O,h+=U.b*O;else if(L.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(L.sh.coefficients[V],O);S++}else if(L.isDirectionalLight){const V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const j=L.shadow,z=t.get(L);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,n.directionalShadow[f]=z,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=L.shadow.matrix,_++}n.directional[f]=V,f++}else if(L.isSpotLight){const V=e.get(L);V.position.setFromMatrixPosition(L.matrixWorld),V.color.copy(U).multiplyScalar(O),V.distance=H,V.coneCos=Math.cos(L.angle),V.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),V.decay=L.decay,n.spot[v]=V;const j=L.shadow;if(L.map&&(n.spotLightMap[C]=L.map,C++,j.updateMatrices(L),L.castShadow&&E++),n.spotLightMatrix[v]=j.matrix,L.castShadow){const z=t.get(L);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,n.spotShadow[v]=z,n.spotShadowMap[v]=W,x++}v++}else if(L.isRectAreaLight){const V=e.get(L);V.color.copy(U).multiplyScalar(O),V.halfWidth.set(L.width*.5,0,0),V.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=V,m++}else if(L.isPointLight){const V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),V.distance=L.distance,V.decay=L.decay,L.castShadow){const j=L.shadow,z=t.get(L);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,z.shadowCameraNear=j.camera.near,z.shadowCameraFar=j.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=L.shadow.matrix,b++}n.point[g]=V,g++}else if(L.isHemisphereLight){const V=e.get(L);V.skyColor.copy(L.color).multiplyScalar(O),V.groundColor.copy(L.groundColor).multiplyScalar(O),n.hemi[p]=V,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=le.LTC_FLOAT_1,n.rectAreaLTC2=le.LTC_FLOAT_2):(n.rectAreaLTC1=le.LTC_HALF_1,n.rectAreaLTC2=le.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;const A=n.hash;(A.directionalLength!==f||A.pointLength!==g||A.spotLength!==v||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==_||A.numPointShadows!==b||A.numSpotShadows!==x||A.numSpotMaps!==C||A.numLightProbes!==S)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=x+C-E,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=S,A.directionalLength=f,A.pointLength=g,A.spotLength=v,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=_,A.numPointShadows=b,A.numSpotShadows=x,A.numSpotMaps=C,A.numLightProbes=S,n.version=Hy++)}function l(c,d){let u=0,h=0,f=0,g=0,v=0;const m=d.matrixWorldInverse;for(let p=0,_=c.length;p<_;p++){const b=c[p];if(b.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(b.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(b.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const x=n.point[h];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),h++}else if(b.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Zh(i){const e=new Gy(i),t=[],n=[];function s(d){c.camera=d,t.length=0,n.length=0}function r(d){t.push(d)}function a(d){n.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Wy(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Zh(i),e.set(s,[o])):r>=a.length?(o=new Zh(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class Ep extends cs{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Cg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xy extends cs{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Yy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function jy(i,e,t){let n=new uu;const s=new we,r=new we,a=new Pt,o=new Ep({depthPacking:op}),l=new Xy,c={},d=t.maxTextureSize,u={[rs]:an,[an]:rs,[Tn]:Tn},h=new Ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:Yy,fragmentShader:qy}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new Bt;g.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new K(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$d;let p=this.type;this.render=function(E,S,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const y=i.getRenderTarget(),M=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),U=i.state;U.setBlending(di),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const O=p!==bi&&this.type===bi,H=p===bi&&this.type!==bi;for(let W=0,V=E.length;W<V;W++){const j=E[W],z=j.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const re=z.getFrameExtents();if(s.multiply(re),r.copy(z.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/re.x),s.x=r.x*re.x,z.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/re.y),s.y=r.y*re.y,z.mapSize.y=r.y)),z.map===null||O===!0||H===!0){const he=this.type!==bi?{minFilter:qt,magFilter:qt}:{};z.map!==null&&z.map.dispose(),z.map=new un(s.x,s.y,he),z.map.texture.name=j.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const J=z.getViewportCount();for(let he=0;he<J;he++){const Pe=z.getViewport(he);a.set(r.x*Pe.x,r.y*Pe.y,r.x*Pe.z,r.y*Pe.w),U.viewport(a),z.updateMatrices(j,he),n=z.getFrustum(),x(S,A,z.camera,j,this.type)}z.isPointLightShadow!==!0&&this.type===bi&&_(z,A),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,M,L)};function _(E,S){const A=e.update(v);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new un(s.x,s.y)),h.uniforms.shadow_pass.value=E.map.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(S,null,A,h,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(S,null,A,f,v,null)}function b(E,S,A,y){let M=null;const L=A.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)M=L;else if(M=A.isPointLight===!0?l:o,i.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const U=M.uuid,O=S.uuid;let H=c[U];H===void 0&&(H={},c[U]=H);let W=H[O];W===void 0&&(W=M.clone(),H[O]=W,S.addEventListener("dispose",C)),M=W}if(M.visible=S.visible,M.wireframe=S.wireframe,y===bi?M.side=S.shadowSide!==null?S.shadowSide:S.side:M.side=S.shadowSide!==null?S.shadowSide:u[S.side],M.alphaMap=S.alphaMap,M.alphaTest=S.alphaTest,M.map=S.map,M.clipShadows=S.clipShadows,M.clippingPlanes=S.clippingPlanes,M.clipIntersection=S.clipIntersection,M.displacementMap=S.displacementMap,M.displacementScale=S.displacementScale,M.displacementBias=S.displacementBias,M.wireframeLinewidth=S.wireframeLinewidth,M.linewidth=S.linewidth,A.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const U=i.properties.get(M);U.light=A}return M}function x(E,S,A,y,M){if(E.visible===!1)return;if(E.layers.test(S.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===bi)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,E.matrixWorld);const O=e.update(E),H=E.material;if(Array.isArray(H)){const W=O.groups;for(let V=0,j=W.length;V<j;V++){const z=W[V],re=H[z.materialIndex];if(re&&re.visible){const J=b(E,re,y,M);E.onBeforeShadow(i,E,S,A,O,J,z),i.renderBufferDirect(A,null,O,J,E,z),E.onAfterShadow(i,E,S,A,O,J,z)}}}else if(H.visible){const W=b(E,H,y,M);E.onBeforeShadow(i,E,S,A,O,W,null),i.renderBufferDirect(A,null,O,W,E,null),E.onAfterShadow(i,E,S,A,O,W,null)}}const U=E.children;for(let O=0,H=U.length;O<H;O++)x(U[O],S,A,y,M)}function C(E){E.target.removeEventListener("dispose",C);for(const A in c){const y=c[A],M=E.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}const Ky={[Hc]:Vc,[Gc]:Yc,[Wc]:qc,[Fr]:Xc,[Vc]:Hc,[Yc]:Gc,[qc]:Wc,[Xc]:Fr};function Zy(i,e){function t(){let N=!1;const ce=new Pt;let q=null;const ee=new Pt(0,0,0,0);return{setMask:function(me){q!==me&&!N&&(i.colorMask(me,me,me,me),q=me)},setLocked:function(me){N=me},setClear:function(me,fe,Oe,Rt,Kt){Kt===!0&&(me*=Rt,fe*=Rt,Oe*=Rt),ce.set(me,fe,Oe,Rt),ee.equals(ce)===!1&&(i.clearColor(me,fe,Oe,Rt),ee.copy(ce))},reset:function(){N=!1,q=null,ee.set(-1,0,0,0)}}}function n(){let N=!1,ce=!1,q=null,ee=null,me=null;return{setReversed:function(fe){if(ce!==fe){const Oe=e.get("EXT_clip_control");ce?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT);const Rt=me;me=null,this.setClear(Rt)}ce=fe},getReversed:function(){return ce},setTest:function(fe){fe?de(i.DEPTH_TEST):Le(i.DEPTH_TEST)},setMask:function(fe){q!==fe&&!N&&(i.depthMask(fe),q=fe)},setFunc:function(fe){if(ce&&(fe=Ky[fe]),ee!==fe){switch(fe){case Hc:i.depthFunc(i.NEVER);break;case Vc:i.depthFunc(i.ALWAYS);break;case Gc:i.depthFunc(i.LESS);break;case Fr:i.depthFunc(i.LEQUAL);break;case Wc:i.depthFunc(i.EQUAL);break;case Xc:i.depthFunc(i.GEQUAL);break;case Yc:i.depthFunc(i.GREATER);break;case qc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ee=fe}},setLocked:function(fe){N=fe},setClear:function(fe){me!==fe&&(ce&&(fe=1-fe),i.clearDepth(fe),me=fe)},reset:function(){N=!1,q=null,ee=null,me=null,ce=!1}}}function s(){let N=!1,ce=null,q=null,ee=null,me=null,fe=null,Oe=null,Rt=null,Kt=null;return{setTest:function(at){N||(at?de(i.STENCIL_TEST):Le(i.STENCIL_TEST))},setMask:function(at){ce!==at&&!N&&(i.stencilMask(at),ce=at)},setFunc:function(at,Xn,fi){(q!==at||ee!==Xn||me!==fi)&&(i.stencilFunc(at,Xn,fi),q=at,ee=Xn,me=fi)},setOp:function(at,Xn,fi){(fe!==at||Oe!==Xn||Rt!==fi)&&(i.stencilOp(at,Xn,fi),fe=at,Oe=Xn,Rt=fi)},setLocked:function(at){N=at},setClear:function(at){Kt!==at&&(i.clearStencil(at),Kt=at)},reset:function(){N=!1,ce=null,q=null,ee=null,me=null,fe=null,Oe=null,Rt=null,Kt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let d={},u={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,_=null,b=null,x=null,C=null,E=null,S=new oe(0,0,0),A=0,y=!1,M=null,L=null,U=null,O=null,H=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,j=0;const z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(z)[1]),V=j>=1):z.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),V=j>=2);let re=null,J={};const he=i.getParameter(i.SCISSOR_BOX),Pe=i.getParameter(i.VIEWPORT),nt=new Pt().fromArray(he),Z=new Pt().fromArray(Pe);function ne(N,ce,q,ee){const me=new Uint8Array(4),fe=i.createTexture();i.bindTexture(N,fe),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Oe=0;Oe<q;Oe++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ce,0,i.RGBA,1,1,ee,0,i.RGBA,i.UNSIGNED_BYTE,me):i.texImage2D(ce+Oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,me);return fe}const Se={};Se[i.TEXTURE_2D]=ne(i.TEXTURE_2D,i.TEXTURE_2D,1),Se[i.TEXTURE_CUBE_MAP]=ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[i.TEXTURE_2D_ARRAY]=ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Se[i.TEXTURE_3D]=ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),de(i.DEPTH_TEST),a.setFunc(Fr),Ye(!1),qe(eh),de(i.CULL_FACE),k(di);function de(N){d[N]!==!0&&(i.enable(N),d[N]=!0)}function Le(N){d[N]!==!1&&(i.disable(N),d[N]=!1)}function Ue(N,ce){return u[N]!==ce?(i.bindFramebuffer(N,ce),u[N]=ce,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ce),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ce),!0):!1}function Ge(N,ce){let q=f,ee=!1;if(N){q=h.get(ce),q===void 0&&(q=[],h.set(ce,q));const me=N.textures;if(q.length!==me.length||q[0]!==i.COLOR_ATTACHMENT0){for(let fe=0,Oe=me.length;fe<Oe;fe++)q[fe]=i.COLOR_ATTACHMENT0+fe;q.length=me.length,ee=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,ee=!0);ee&&i.drawBuffers(q)}function St(N){return g!==N?(i.useProgram(N),g=N,!0):!1}const Ze={[Ts]:i.FUNC_ADD,[og]:i.FUNC_SUBTRACT,[lg]:i.FUNC_REVERSE_SUBTRACT};Ze[cg]=i.MIN,Ze[dg]=i.MAX;const Dt={[ug]:i.ZERO,[hg]:i.ONE,[fg]:i.SRC_COLOR,[kc]:i.SRC_ALPHA,[_g]:i.SRC_ALPHA_SATURATE,[vg]:i.DST_COLOR,[mg]:i.DST_ALPHA,[pg]:i.ONE_MINUS_SRC_COLOR,[zc]:i.ONE_MINUS_SRC_ALPHA,[xg]:i.ONE_MINUS_DST_COLOR,[gg]:i.ONE_MINUS_DST_ALPHA,[yg]:i.CONSTANT_COLOR,[bg]:i.ONE_MINUS_CONSTANT_COLOR,[Mg]:i.CONSTANT_ALPHA,[Sg]:i.ONE_MINUS_CONSTANT_ALPHA};function k(N,ce,q,ee,me,fe,Oe,Rt,Kt,at){if(N===di){v===!0&&(Le(i.BLEND),v=!1);return}if(v===!1&&(de(i.BLEND),v=!0),N!==ag){if(N!==m||at!==y){if((p!==Ts||x!==Ts)&&(i.blendEquation(i.FUNC_ADD),p=Ts,x=Ts),at)switch(N){case Tr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bc:i.blendFunc(i.ONE,i.ONE);break;case th:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Tr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case th:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}_=null,b=null,C=null,E=null,S.set(0,0,0),A=0,m=N,y=at}return}me=me||ce,fe=fe||q,Oe=Oe||ee,(ce!==p||me!==x)&&(i.blendEquationSeparate(Ze[ce],Ze[me]),p=ce,x=me),(q!==_||ee!==b||fe!==C||Oe!==E)&&(i.blendFuncSeparate(Dt[q],Dt[ee],Dt[fe],Dt[Oe]),_=q,b=ee,C=fe,E=Oe),(Rt.equals(S)===!1||Kt!==A)&&(i.blendColor(Rt.r,Rt.g,Rt.b,Kt),S.copy(Rt),A=Kt),m=N,y=!1}function Dn(N,ce){N.side===Tn?Le(i.CULL_FACE):de(i.CULL_FACE);let q=N.side===an;ce&&(q=!q),Ye(q),N.blending===Tr&&N.transparent===!1?k(di):k(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);const ee=N.stencilWrite;o.setTest(ee),ee&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),mt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?de(i.SAMPLE_ALPHA_TO_COVERAGE):Le(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(N){M!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),M=N)}function qe(N){N!==sg?(de(i.CULL_FACE),N!==L&&(N===eh?i.cullFace(i.BACK):N===rg?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Le(i.CULL_FACE),L=N}function Ce(N){N!==U&&(V&&i.lineWidth(N),U=N)}function mt(N,ce,q){N?(de(i.POLYGON_OFFSET_FILL),(O!==ce||H!==q)&&(i.polygonOffset(ce,q),O=ce,H=q)):Le(i.POLYGON_OFFSET_FILL)}function Ae(N){N?de(i.SCISSOR_TEST):Le(i.SCISSOR_TEST)}function R(N){N===void 0&&(N=i.TEXTURE0+W-1),re!==N&&(i.activeTexture(N),re=N)}function T(N,ce,q){q===void 0&&(re===null?q=i.TEXTURE0+W-1:q=re);let ee=J[q];ee===void 0&&(ee={type:void 0,texture:void 0},J[q]=ee),(ee.type!==N||ee.texture!==ce)&&(re!==q&&(i.activeTexture(q),re=q),i.bindTexture(N,ce||Se[N]),ee.type=N,ee.texture=ce)}function G(){const N=J[re];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function $(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ue(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ve(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Qe(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ie(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xe(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Re(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ie(N){nt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),nt.copy(N))}function _e(N){Z.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),Z.copy(N))}function je(N,ce){let q=c.get(ce);q===void 0&&(q=new WeakMap,c.set(ce,q));let ee=q.get(N);ee===void 0&&(ee=i.getUniformBlockIndex(ce,N.name),q.set(N,ee))}function ke(N,ce){const ee=c.get(ce).get(N);l.get(ce)!==ee&&(i.uniformBlockBinding(ce,ee,N.__bindingPointIndex),l.set(ce,ee))}function ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},re=null,J={},u={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,_=null,b=null,x=null,C=null,E=null,S=new oe(0,0,0),A=0,y=!1,M=null,L=null,U=null,O=null,H=null,nt.set(0,0,i.canvas.width,i.canvas.height),Z.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:de,disable:Le,bindFramebuffer:Ue,drawBuffers:Ge,useProgram:St,setBlending:k,setMaterial:Dn,setFlipSided:Ye,setCullFace:qe,setLineWidth:Ce,setPolygonOffset:mt,setScissorTest:Ae,activeTexture:R,bindTexture:T,unbindTexture:G,compressedTexImage2D:$,compressedTexImage3D:te,texImage2D:xe,texImage3D:Re,updateUBOMapping:je,uniformBlockBinding:ke,texStorage2D:Qe,texStorage3D:ie,texSubImage2D:Q,texSubImage3D:Ee,compressedTexSubImage2D:ue,compressedTexSubImage3D:ve,scissor:Ie,viewport:_e,reset:ht}}function Qh(i,e,t,n){const s=Qy(n);switch(t){case tp:return i*e;case ip:return i*e;case sp:return i*e*2;case su:return i*e/s.components*s.byteLength;case ru:return i*e/s.components*s.byteLength;case rp:return i*e*2/s.components*s.byteLength;case au:return i*e*2/s.components*s.byteLength;case np:return i*e*3/s.components*s.byteLength;case Qn:return i*e*4/s.components*s.byteLength;case ou:return i*e*4/s.components*s.byteLength;case Yo:case qo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case jo:case Ko:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Jc:case ed:return Math.max(i,16)*Math.max(e,8)/4;case Qc:case $c:return Math.max(i,8)*Math.max(e,8)/2;case td:case nd:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case id:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sd:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case rd:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ad:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case od:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ld:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case cd:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case dd:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ud:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case hd:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case fd:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case pd:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case md:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case gd:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case vd:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Zo:case xd:case _d:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ap:case yd:return Math.ceil(i/4)*Math.ceil(e/4)*8;case bd:case Md:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Qy(i){switch(i){case Ui:case Jf:return{byteLength:1,components:1};case Ha:case $f:case Vn:return{byteLength:2,components:1};case nu:case iu:return{byteLength:2,components:4};case ks:case tu:case li:return{byteLength:4,components:1};case ep:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Jy(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new we,d=new WeakMap;let u;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,T){return f?new OffscreenCanvas(R,T):ll("canvas")}function v(R,T,G){let $=1;const te=Ae(R);if((te.width>G||te.height>G)&&($=G/Math.max(te.width,te.height)),$<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Q=Math.floor($*te.width),Ee=Math.floor($*te.height);u===void 0&&(u=g(Q,Ee));const ue=T?g(Q,Ee):u;return ue.width=Q,ue.height=Ee,ue.getContext("2d").drawImage(R,0,0,Q,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+Q+"x"+Ee+")."),ue}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function _(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(R,T,G,$,te=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Q=T;if(T===i.RED&&(G===i.FLOAT&&(Q=i.R32F),G===i.HALF_FLOAT&&(Q=i.R16F),G===i.UNSIGNED_BYTE&&(Q=i.R8)),T===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(Q=i.R8UI),G===i.UNSIGNED_SHORT&&(Q=i.R16UI),G===i.UNSIGNED_INT&&(Q=i.R32UI),G===i.BYTE&&(Q=i.R8I),G===i.SHORT&&(Q=i.R16I),G===i.INT&&(Q=i.R32I)),T===i.RG&&(G===i.FLOAT&&(Q=i.RG32F),G===i.HALF_FLOAT&&(Q=i.RG16F),G===i.UNSIGNED_BYTE&&(Q=i.RG8)),T===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(Q=i.RG8UI),G===i.UNSIGNED_SHORT&&(Q=i.RG16UI),G===i.UNSIGNED_INT&&(Q=i.RG32UI),G===i.BYTE&&(Q=i.RG8I),G===i.SHORT&&(Q=i.RG16I),G===i.INT&&(Q=i.RG32I)),T===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),G===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),G===i.UNSIGNED_INT&&(Q=i.RGB32UI),G===i.BYTE&&(Q=i.RGB8I),G===i.SHORT&&(Q=i.RGB16I),G===i.INT&&(Q=i.RGB32I)),T===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),G===i.UNSIGNED_INT&&(Q=i.RGBA32UI),G===i.BYTE&&(Q=i.RGBA8I),G===i.SHORT&&(Q=i.RGBA16I),G===i.INT&&(Q=i.RGBA32I)),T===i.RGB&&G===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),T===i.RGBA){const Ee=te?Pl:Ke.getTransfer($);G===i.FLOAT&&(Q=i.RGBA32F),G===i.HALF_FLOAT&&(Q=i.RGBA16F),G===i.UNSIGNED_BYTE&&(Q=Ee===ot?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function x(R,T){let G;return R?T===null||T===ks||T===zr?G=i.DEPTH24_STENCIL8:T===li?G=i.DEPTH32F_STENCIL8:T===Ha&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===ks||T===zr?G=i.DEPTH_COMPONENT24:T===li?G=i.DEPTH_COMPONENT32F:T===Ha&&(G=i.DEPTH_COMPONENT16),G}function C(R,T){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==qt&&R.minFilter!==Zn?Math.log2(Math.max(T.width,T.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?T.mipmaps.length:1}function E(R){const T=R.target;T.removeEventListener("dispose",E),A(T),T.isVideoTexture&&d.delete(T)}function S(R){const T=R.target;T.removeEventListener("dispose",S),M(T)}function A(R){const T=n.get(R);if(T.__webglInit===void 0)return;const G=R.source,$=h.get(G);if($){const te=$[T.__cacheKey];te.usedTimes--,te.usedTimes===0&&y(R),Object.keys($).length===0&&h.delete(G)}n.remove(R)}function y(R){const T=n.get(R);i.deleteTexture(T.__webglTexture);const G=R.source,$=h.get(G);delete $[T.__cacheKey],a.memory.textures--}function M(R){const T=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(T.__webglFramebuffer[$]))for(let te=0;te<T.__webglFramebuffer[$].length;te++)i.deleteFramebuffer(T.__webglFramebuffer[$][te]);else i.deleteFramebuffer(T.__webglFramebuffer[$]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[$])}else{if(Array.isArray(T.__webglFramebuffer))for(let $=0;$<T.__webglFramebuffer.length;$++)i.deleteFramebuffer(T.__webglFramebuffer[$]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let $=0;$<T.__webglColorRenderbuffer.length;$++)T.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[$]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const G=R.textures;for(let $=0,te=G.length;$<te;$++){const Q=n.get(G[$]);Q.__webglTexture&&(i.deleteTexture(Q.__webglTexture),a.memory.textures--),n.remove(G[$])}n.remove(R)}let L=0;function U(){L=0}function O(){const R=L;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),L+=1,R}function H(R){const T=[];return T.push(R.wrapS),T.push(R.wrapT),T.push(R.wrapR||0),T.push(R.magFilter),T.push(R.minFilter),T.push(R.anisotropy),T.push(R.internalFormat),T.push(R.format),T.push(R.type),T.push(R.generateMipmaps),T.push(R.premultiplyAlpha),T.push(R.flipY),T.push(R.unpackAlignment),T.push(R.colorSpace),T.join()}function W(R,T){const G=n.get(R);if(R.isVideoTexture&&Ce(R),R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){const $=R.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(G,R,T);return}}t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+T)}function V(R,T){const G=n.get(R);if(R.version>0&&G.__version!==R.version){Z(G,R,T);return}t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+T)}function j(R,T){const G=n.get(R);if(R.version>0&&G.__version!==R.version){Z(G,R,T);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+T)}function z(R,T){const G=n.get(R);if(R.version>0&&G.__version!==R.version){ne(G,R,T);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+T)}const re={[en]:i.REPEAT,[Ki]:i.CLAMP_TO_EDGE,[Zc]:i.MIRRORED_REPEAT},J={[qt]:i.NEAREST,[Ag]:i.NEAREST_MIPMAP_NEAREST,[ao]:i.NEAREST_MIPMAP_LINEAR,[Zn]:i.LINEAR,[zl]:i.LINEAR_MIPMAP_NEAREST,[Ps]:i.LINEAR_MIPMAP_LINEAR},he={[Pg]:i.NEVER,[Og]:i.ALWAYS,[Lg]:i.LESS,[lp]:i.LEQUAL,[Ig]:i.EQUAL,[Ug]:i.GEQUAL,[Dg]:i.GREATER,[Ng]:i.NOTEQUAL};function Pe(R,T){if(T.type===li&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Zn||T.magFilter===zl||T.magFilter===ao||T.magFilter===Ps||T.minFilter===Zn||T.minFilter===zl||T.minFilter===ao||T.minFilter===Ps)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,re[T.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,re[T.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,re[T.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,J[T.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,J[T.minFilter]),T.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,he[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===qt||T.minFilter!==ao&&T.minFilter!==Ps||T.type===li&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function nt(R,T){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,T.addEventListener("dispose",E));const $=T.source;let te=h.get($);te===void 0&&(te={},h.set($,te));const Q=H(T);if(Q!==R.__cacheKey){te[Q]===void 0&&(te[Q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),te[Q].usedTimes++;const Ee=te[R.__cacheKey];Ee!==void 0&&(te[R.__cacheKey].usedTimes--,Ee.usedTimes===0&&y(T)),R.__cacheKey=Q,R.__webglTexture=te[Q].texture}return G}function Z(R,T,G){let $=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&($=i.TEXTURE_3D);const te=nt(R,T),Q=T.source;t.bindTexture($,R.__webglTexture,i.TEXTURE0+G);const Ee=n.get(Q);if(Q.version!==Ee.__version||te===!0){t.activeTexture(i.TEXTURE0+G);const ue=Ke.getPrimaries(Ke.workingColorSpace),ve=T.colorSpace===qi?null:Ke.getPrimaries(T.colorSpace),Qe=T.colorSpace===qi||ue===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe);let ie=v(T.image,!1,s.maxTextureSize);ie=mt(T,ie);const xe=r.convert(T.format,T.colorSpace),Re=r.convert(T.type);let Ie=b(T.internalFormat,xe,Re,T.colorSpace,T.isVideoTexture);Pe($,T);let _e;const je=T.mipmaps,ke=T.isVideoTexture!==!0,ht=Ee.__version===void 0||te===!0,N=Q.dataReady,ce=C(T,ie);if(T.isDepthTexture)Ie=x(T.format===Hr,T.type),ht&&(ke?t.texStorage2D(i.TEXTURE_2D,1,Ie,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Ie,ie.width,ie.height,0,xe,Re,null));else if(T.isDataTexture)if(je.length>0){ke&&ht&&t.texStorage2D(i.TEXTURE_2D,ce,Ie,je[0].width,je[0].height);for(let q=0,ee=je.length;q<ee;q++)_e=je[q],ke?N&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,_e.width,_e.height,xe,Re,_e.data):t.texImage2D(i.TEXTURE_2D,q,Ie,_e.width,_e.height,0,xe,Re,_e.data);T.generateMipmaps=!1}else ke?(ht&&t.texStorage2D(i.TEXTURE_2D,ce,Ie,ie.width,ie.height),N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie.width,ie.height,xe,Re,ie.data)):t.texImage2D(i.TEXTURE_2D,0,Ie,ie.width,ie.height,0,xe,Re,ie.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){ke&&ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,Ie,je[0].width,je[0].height,ie.depth);for(let q=0,ee=je.length;q<ee;q++)if(_e=je[q],T.format!==Qn)if(xe!==null)if(ke){if(N)if(T.layerUpdates.size>0){const me=Qh(_e.width,_e.height,T.format,T.type);for(const fe of T.layerUpdates){const Oe=_e.data.subarray(fe*me/_e.data.BYTES_PER_ELEMENT,(fe+1)*me/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,fe,_e.width,_e.height,1,xe,Oe)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,_e.width,_e.height,ie.depth,xe,_e.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Ie,_e.width,_e.height,ie.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?N&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,_e.width,_e.height,ie.depth,xe,Re,_e.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,Ie,_e.width,_e.height,ie.depth,0,xe,Re,_e.data)}else{ke&&ht&&t.texStorage2D(i.TEXTURE_2D,ce,Ie,je[0].width,je[0].height);for(let q=0,ee=je.length;q<ee;q++)_e=je[q],T.format!==Qn?xe!==null?ke?N&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,_e.width,_e.height,xe,_e.data):t.compressedTexImage2D(i.TEXTURE_2D,q,Ie,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?N&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,_e.width,_e.height,xe,Re,_e.data):t.texImage2D(i.TEXTURE_2D,q,Ie,_e.width,_e.height,0,xe,Re,_e.data)}else if(T.isDataArrayTexture)if(ke){if(ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,Ie,ie.width,ie.height,ie.depth),N)if(T.layerUpdates.size>0){const q=Qh(ie.width,ie.height,T.format,T.type);for(const ee of T.layerUpdates){const me=ie.data.subarray(ee*q/ie.data.BYTES_PER_ELEMENT,(ee+1)*q/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ee,ie.width,ie.height,1,xe,Re,me)}T.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,xe,Re,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ie,ie.width,ie.height,ie.depth,0,xe,Re,ie.data);else if(T.isData3DTexture)ke?(ht&&t.texStorage3D(i.TEXTURE_3D,ce,Ie,ie.width,ie.height,ie.depth),N&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,xe,Re,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Ie,ie.width,ie.height,ie.depth,0,xe,Re,ie.data);else if(T.isFramebufferTexture){if(ht)if(ke)t.texStorage2D(i.TEXTURE_2D,ce,Ie,ie.width,ie.height);else{let q=ie.width,ee=ie.height;for(let me=0;me<ce;me++)t.texImage2D(i.TEXTURE_2D,me,Ie,q,ee,0,xe,Re,null),q>>=1,ee>>=1}}else if(je.length>0){if(ke&&ht){const q=Ae(je[0]);t.texStorage2D(i.TEXTURE_2D,ce,Ie,q.width,q.height)}for(let q=0,ee=je.length;q<ee;q++)_e=je[q],ke?N&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,xe,Re,_e):t.texImage2D(i.TEXTURE_2D,q,Ie,xe,Re,_e);T.generateMipmaps=!1}else if(ke){if(ht){const q=Ae(ie);t.texStorage2D(i.TEXTURE_2D,ce,Ie,q.width,q.height)}N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe,Re,ie)}else t.texImage2D(i.TEXTURE_2D,0,Ie,xe,Re,ie);m(T)&&p($),Ee.__version=Q.version,T.onUpdate&&T.onUpdate(T)}R.__version=T.version}function ne(R,T,G){if(T.image.length!==6)return;const $=nt(R,T),te=T.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+G);const Q=n.get(te);if(te.version!==Q.__version||$===!0){t.activeTexture(i.TEXTURE0+G);const Ee=Ke.getPrimaries(Ke.workingColorSpace),ue=T.colorSpace===qi?null:Ke.getPrimaries(T.colorSpace),ve=T.colorSpace===qi||Ee===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Qe=T.isCompressedTexture||T.image[0].isCompressedTexture,ie=T.image[0]&&T.image[0].isDataTexture,xe=[];for(let ee=0;ee<6;ee++)!Qe&&!ie?xe[ee]=v(T.image[ee],!0,s.maxCubemapSize):xe[ee]=ie?T.image[ee].image:T.image[ee],xe[ee]=mt(T,xe[ee]);const Re=xe[0],Ie=r.convert(T.format,T.colorSpace),_e=r.convert(T.type),je=b(T.internalFormat,Ie,_e,T.colorSpace),ke=T.isVideoTexture!==!0,ht=Q.__version===void 0||$===!0,N=te.dataReady;let ce=C(T,Re);Pe(i.TEXTURE_CUBE_MAP,T);let q;if(Qe){ke&&ht&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ce,je,Re.width,Re.height);for(let ee=0;ee<6;ee++){q=xe[ee].mipmaps;for(let me=0;me<q.length;me++){const fe=q[me];T.format!==Qn?Ie!==null?ke?N&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me,0,0,fe.width,fe.height,Ie,fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me,je,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ke?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me,0,0,fe.width,fe.height,Ie,_e,fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me,je,fe.width,fe.height,0,Ie,_e,fe.data)}}}else{if(q=T.mipmaps,ke&&ht){q.length>0&&ce++;const ee=Ae(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ce,je,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(ie){ke?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,xe[ee].width,xe[ee].height,Ie,_e,xe[ee].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,je,xe[ee].width,xe[ee].height,0,Ie,_e,xe[ee].data);for(let me=0;me<q.length;me++){const Oe=q[me].image[ee].image;ke?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me+1,0,0,Oe.width,Oe.height,Ie,_e,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me+1,je,Oe.width,Oe.height,0,Ie,_e,Oe.data)}}else{ke?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ie,_e,xe[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,je,Ie,_e,xe[ee]);for(let me=0;me<q.length;me++){const fe=q[me];ke?N&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me+1,0,0,Ie,_e,fe.image[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,me+1,je,Ie,_e,fe.image[ee])}}}m(T)&&p(i.TEXTURE_CUBE_MAP),Q.__version=te.version,T.onUpdate&&T.onUpdate(T)}R.__version=T.version}function Se(R,T,G,$,te,Q){const Ee=r.convert(G.format,G.colorSpace),ue=r.convert(G.type),ve=b(G.internalFormat,Ee,ue,G.colorSpace),Qe=n.get(T),ie=n.get(G);if(ie.__renderTarget=T,!Qe.__hasExternalTextures){const xe=Math.max(1,T.width>>Q),Re=Math.max(1,T.height>>Q);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,Q,ve,xe,Re,T.depth,0,Ee,ue,null):t.texImage2D(te,Q,ve,xe,Re,0,Ee,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),qe(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,te,ie.__webglTexture,0,Ye(T)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,te,ie.__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function de(R,T,G){if(i.bindRenderbuffer(i.RENDERBUFFER,R),T.depthBuffer){const $=T.depthTexture,te=$&&$.isDepthTexture?$.type:null,Q=x(T.stencilBuffer,te),Ee=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=Ye(T);qe(T)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ue,Q,T.width,T.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,Q,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,Q,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ee,i.RENDERBUFFER,R)}else{const $=T.textures;for(let te=0;te<$.length;te++){const Q=$[te],Ee=r.convert(Q.format,Q.colorSpace),ue=r.convert(Q.type),ve=b(Q.internalFormat,Ee,ue,Q.colorSpace),Qe=Ye(T);G&&qe(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Qe,ve,T.width,T.height):qe(T)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Qe,ve,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,ve,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Le(R,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(T.depthTexture);$.__renderTarget=T,(!$.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),W(T.depthTexture,0);const te=$.__webglTexture,Q=Ye(T);if(T.depthTexture.format===wr)qe(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(T.depthTexture.format===Hr)qe(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Ue(R){const T=n.get(R),G=R.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==R.depthTexture){const $=R.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),$){const te=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,$.removeEventListener("dispose",te)};$.addEventListener("dispose",te),T.__depthDisposeCallback=te}T.__boundDepthTexture=$}if(R.depthTexture&&!T.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Le(T.__webglFramebuffer,R)}else if(G){T.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[$]),T.__webglDepthbuffer[$]===void 0)T.__webglDepthbuffer[$]=i.createRenderbuffer(),de(T.__webglDepthbuffer[$],R,!1);else{const te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=T.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,Q)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),de(T.__webglDepthbuffer,R,!1);else{const $=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,te)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(R,T,G){const $=n.get(R);T!==void 0&&Se($.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Ue(R)}function St(R){const T=R.texture,G=n.get(R),$=n.get(T);R.addEventListener("dispose",S);const te=R.textures,Q=R.isWebGLCubeRenderTarget===!0,Ee=te.length>1;if(Ee||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=T.version,a.memory.textures++),Q){G.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(T.mipmaps&&T.mipmaps.length>0){G.__webglFramebuffer[ue]=[];for(let ve=0;ve<T.mipmaps.length;ve++)G.__webglFramebuffer[ue][ve]=i.createFramebuffer()}else G.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){G.__webglFramebuffer=[];for(let ue=0;ue<T.mipmaps.length;ue++)G.__webglFramebuffer[ue]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(Ee)for(let ue=0,ve=te.length;ue<ve;ue++){const Qe=n.get(te[ue]);Qe.__webglTexture===void 0&&(Qe.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&qe(R)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ue=0;ue<te.length;ue++){const ve=te[ue];G.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[ue]);const Qe=r.convert(ve.format,ve.colorSpace),ie=r.convert(ve.type),xe=b(ve.internalFormat,Qe,ie,ve.colorSpace,R.isXRRenderTarget===!0),Re=Ye(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,xe,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,G.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),de(G.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Q){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Pe(i.TEXTURE_CUBE_MAP,T);for(let ue=0;ue<6;ue++)if(T.mipmaps&&T.mipmaps.length>0)for(let ve=0;ve<T.mipmaps.length;ve++)Se(G.__webglFramebuffer[ue][ve],R,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ve);else Se(G.__webglFramebuffer[ue],R,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);m(T)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ue=0,ve=te.length;ue<ve;ue++){const Qe=te[ue],ie=n.get(Qe);t.bindTexture(i.TEXTURE_2D,ie.__webglTexture),Pe(i.TEXTURE_2D,Qe),Se(G.__webglFramebuffer,R,Qe,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,0),m(Qe)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ue=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,$.__webglTexture),Pe(ue,T),T.mipmaps&&T.mipmaps.length>0)for(let ve=0;ve<T.mipmaps.length;ve++)Se(G.__webglFramebuffer[ve],R,T,i.COLOR_ATTACHMENT0,ue,ve);else Se(G.__webglFramebuffer,R,T,i.COLOR_ATTACHMENT0,ue,0);m(T)&&p(ue),t.unbindTexture()}R.depthBuffer&&Ue(R)}function Ze(R){const T=R.textures;for(let G=0,$=T.length;G<$;G++){const te=T[G];if(m(te)){const Q=_(R),Ee=n.get(te).__webglTexture;t.bindTexture(Q,Ee),p(Q),t.unbindTexture()}}}const Dt=[],k=[];function Dn(R){if(R.samples>0){if(qe(R)===!1){const T=R.textures,G=R.width,$=R.height;let te=i.COLOR_BUFFER_BIT;const Q=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ee=n.get(R),ue=T.length>1;if(ue)for(let ve=0;ve<T.length;ve++)t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let ve=0;ve<T.length;ve++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),ue){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[ve]);const Qe=n.get(T[ve]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Qe,0)}i.blitFramebuffer(0,0,G,$,0,0,G,$,te,i.NEAREST),l===!0&&(Dt.length=0,k.length=0,Dt.push(i.COLOR_ATTACHMENT0+ve),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Dt.push(Q),k.push(Q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,k)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Dt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let ve=0;ve<T.length;ve++){t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[ve]);const Qe=n.get(T[ve]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,Qe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const T=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function Ye(R){return Math.min(s.maxSamples,R.samples)}function qe(R){const T=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Ce(R){const T=a.render.frame;d.get(R)!==T&&(d.set(R,T),R.update())}function mt(R,T){const G=R.colorSpace,$=R.format,te=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==$r&&G!==qi&&(Ke.getTransfer(G)===ot?($!==Qn||te!==Ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),T}function Ae(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=U,this.setTexture2D=W,this.setTexture2DArray=V,this.setTexture3D=j,this.setTextureCube=z,this.rebindTextures=Ge,this.setupRenderTarget=St,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=Dn,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=qe}function $y(i,e){function t(n,s=qi){let r;const a=Ke.getTransfer(s);if(n===Ui)return i.UNSIGNED_BYTE;if(n===nu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===iu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ep)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Jf)return i.BYTE;if(n===$f)return i.SHORT;if(n===Ha)return i.UNSIGNED_SHORT;if(n===tu)return i.INT;if(n===ks)return i.UNSIGNED_INT;if(n===li)return i.FLOAT;if(n===Vn)return i.HALF_FLOAT;if(n===tp)return i.ALPHA;if(n===np)return i.RGB;if(n===Qn)return i.RGBA;if(n===ip)return i.LUMINANCE;if(n===sp)return i.LUMINANCE_ALPHA;if(n===wr)return i.DEPTH_COMPONENT;if(n===Hr)return i.DEPTH_STENCIL;if(n===su)return i.RED;if(n===ru)return i.RED_INTEGER;if(n===rp)return i.RG;if(n===au)return i.RG_INTEGER;if(n===ou)return i.RGBA_INTEGER;if(n===Yo||n===qo||n===jo||n===Ko)if(a===ot)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Yo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===qo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Yo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===qo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===jo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ko)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qc||n===Jc||n===$c||n===ed)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Jc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$c)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ed)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===td||n===nd||n===id)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===td||n===nd)return a===ot?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===id)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===sd||n===rd||n===ad||n===od||n===ld||n===cd||n===dd||n===ud||n===hd||n===fd||n===pd||n===md||n===gd||n===vd)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===sd)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===rd)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ad)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===od)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ld)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===cd)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===dd)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ud)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===hd)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fd)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===pd)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===md)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===gd)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vd)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Zo||n===xd||n===_d)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Zo)return a===ot?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xd)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_d)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ap||n===yd||n===bd||n===Md)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Zo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===yd)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===bd)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Md)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class eb extends Bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Yt extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tb={type:"move"};class fc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(tb)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Yt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const nb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ib=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class sb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Gt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ft({vertexShader:nb,fragmentShader:ib,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new K(new Gs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rb extends ea{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,g=null;const v=new sb,m=t.getContextAttributes();let p=null,_=null;const b=[],x=[],C=new we;let E=null;const S=new Bn;S.viewport=new Pt;const A=new Bn;A.viewport=new Pt;const y=[S,A],M=new eb;let L=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ne=b[Z];return ne===void 0&&(ne=new fc,b[Z]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(Z){let ne=b[Z];return ne===void 0&&(ne=new fc,b[Z]=ne),ne.getGripSpace()},this.getHand=function(Z){let ne=b[Z];return ne===void 0&&(ne=new fc,b[Z]=ne),ne.getHandSpace()};function O(Z){const ne=x.indexOf(Z.inputSource);if(ne===-1)return;const Se=b[ne];Se!==void 0&&(Se.update(Z.inputSource,Z.frame,c||a),Se.dispatchEvent({type:Z.type,data:Z.inputSource}))}function H(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",W);for(let Z=0;Z<b.length;Z++){const ne=x[Z];ne!==null&&(x[Z]=null,b[Z].disconnect(ne))}L=null,U=null,v.reset(),e.setRenderTarget(p),f=null,h=null,u=null,s=null,_=null,nt.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",H),s.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(C),s.renderState.layers===void 0){const ne={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new un(f.framebufferWidth,f.framebufferHeight,{format:Qn,type:Ui,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ne=null,Se=null,de=null;m.depth&&(de=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=m.stencil?Hr:wr,Se=m.stencil?zr:ks);const Le={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:r};u=new XRWebGLBinding(s,t),h=u.createProjectionLayer(Le),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new un(h.textureWidth,h.textureHeight,{format:Qn,type:Ui,depthTexture:new _p(h.textureWidth,h.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),nt.setContext(s),nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function W(Z){for(let ne=0;ne<Z.removed.length;ne++){const Se=Z.removed[ne],de=x.indexOf(Se);de>=0&&(x[de]=null,b[de].disconnect(Se))}for(let ne=0;ne<Z.added.length;ne++){const Se=Z.added[ne];let de=x.indexOf(Se);if(de===-1){for(let Ue=0;Ue<b.length;Ue++)if(Ue>=x.length){x.push(Se),de=Ue;break}else if(x[Ue]===null){x[Ue]=Se,de=Ue;break}if(de===-1)break}const Le=b[de];Le&&Le.connect(Se)}}const V=new I,j=new I;function z(Z,ne,Se){V.setFromMatrixPosition(ne.matrixWorld),j.setFromMatrixPosition(Se.matrixWorld);const de=V.distanceTo(j),Le=ne.projectionMatrix.elements,Ue=Se.projectionMatrix.elements,Ge=Le[14]/(Le[10]-1),St=Le[14]/(Le[10]+1),Ze=(Le[9]+1)/Le[5],Dt=(Le[9]-1)/Le[5],k=(Le[8]-1)/Le[0],Dn=(Ue[8]+1)/Ue[0],Ye=Ge*k,qe=Ge*Dn,Ce=de/(-k+Dn),mt=Ce*-k;if(ne.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(mt),Z.translateZ(Ce),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Le[10]===-1)Z.projectionMatrix.copy(ne.projectionMatrix),Z.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const Ae=Ge+Ce,R=St+Ce,T=Ye-mt,G=qe+(de-mt),$=Ze*St/R*Ae,te=Dt*St/R*Ae;Z.projectionMatrix.makePerspective(T,G,$,te,Ae,R),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function re(Z,ne){ne===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ne.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let ne=Z.near,Se=Z.far;v.texture!==null&&(v.depthNear>0&&(ne=v.depthNear),v.depthFar>0&&(Se=v.depthFar)),M.near=A.near=S.near=ne,M.far=A.far=S.far=Se,(L!==M.near||U!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,U=M.far),S.layers.mask=Z.layers.mask|2,A.layers.mask=Z.layers.mask|4,M.layers.mask=S.layers.mask|A.layers.mask;const de=Z.parent,Le=M.cameras;re(M,de);for(let Ue=0;Ue<Le.length;Ue++)re(Le[Ue],de);Le.length===2?z(M,S,A):M.projectionMatrix.copy(S.projectionMatrix),J(Z,M,de)};function J(Z,ne,Se){Se===null?Z.matrix.copy(ne.matrixWorld):(Z.matrix.copy(Se.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ne.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ne.projectionMatrix),Z.projectionMatrixInverse.copy(ne.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Va*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(Z){l=Z,h!==null&&(h.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let he=null;function Pe(Z,ne){if(d=ne.getViewerPose(c||a),g=ne,d!==null){const Se=d.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let de=!1;Se.length!==M.cameras.length&&(M.cameras.length=0,de=!0);for(let Ue=0;Ue<Se.length;Ue++){const Ge=Se[Ue];let St=null;if(f!==null)St=f.getViewport(Ge);else{const Dt=u.getViewSubImage(h,Ge);St=Dt.viewport,Ue===0&&(e.setRenderTargetTextures(_,Dt.colorTexture,h.ignoreDepthValues?void 0:Dt.depthStencilTexture),e.setRenderTarget(_))}let Ze=y[Ue];Ze===void 0&&(Ze=new Bn,Ze.layers.enable(Ue),Ze.viewport=new Pt,y[Ue]=Ze),Ze.matrix.fromArray(Ge.transform.matrix),Ze.matrix.decompose(Ze.position,Ze.quaternion,Ze.scale),Ze.projectionMatrix.fromArray(Ge.projectionMatrix),Ze.projectionMatrixInverse.copy(Ze.projectionMatrix).invert(),Ze.viewport.set(St.x,St.y,St.width,St.height),Ue===0&&(M.matrix.copy(Ze.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),de===!0&&M.cameras.push(Ze)}const Le=s.enabledFeatures;if(Le&&Le.includes("depth-sensing")){const Ue=u.getDepthInformation(Se[0]);Ue&&Ue.isValid&&Ue.texture&&v.init(e,Ue,s.renderState)}}for(let Se=0;Se<b.length;Se++){const de=x[Se],Le=b[Se];de!==null&&Le!==void 0&&Le.update(de,ne,c||a)}he&&he(Z,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),g=null}const nt=new xp;nt.setAnimationLoop(Pe),this.setAnimationLoop=function(Z){he=Z},this.dispose=function(){}}}const xs=new $n,ab=new lt;function ob(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,mp(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,_,b,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,_,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===an&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===an&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const _=e.get(p),b=_.envMap,x=_.envMapRotation;b&&(m.envMap.value=b,xs.copy(x),xs.x*=-1,xs.y*=-1,xs.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(xs.y*=-1,xs.z*=-1),m.envMapRotation.value.setFromMatrix4(ab.makeRotationFromEuler(xs)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,_,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,_){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===an&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const _=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function lb(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,b){const x=b.program;n.uniformBlockBinding(_,x)}function c(_,b){let x=s[_.id];x===void 0&&(g(_),x=d(_),s[_.id]=x,_.addEventListener("dispose",m));const C=b.program;n.updateUBOMapping(_,C);const E=e.render.frame;r[_.id]!==E&&(h(_),r[_.id]=E)}function d(_){const b=u();_.__bindingPointIndex=b;const x=i.createBuffer(),C=_.__size,E=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,C,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,x),x}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const b=s[_.id],x=_.uniforms,C=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let E=0,S=x.length;E<S;E++){const A=Array.isArray(x[E])?x[E]:[x[E]];for(let y=0,M=A.length;y<M;y++){const L=A[y];if(f(L,E,y,C)===!0){const U=L.__offset,O=Array.isArray(L.value)?L.value:[L.value];let H=0;for(let W=0;W<O.length;W++){const V=O[W],j=v(V);typeof V=="number"||typeof V=="boolean"?(L.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,U+H,L.__data)):V.isMatrix3?(L.__data[0]=V.elements[0],L.__data[1]=V.elements[1],L.__data[2]=V.elements[2],L.__data[3]=0,L.__data[4]=V.elements[3],L.__data[5]=V.elements[4],L.__data[6]=V.elements[5],L.__data[7]=0,L.__data[8]=V.elements[6],L.__data[9]=V.elements[7],L.__data[10]=V.elements[8],L.__data[11]=0):(V.toArray(L.__data,H),H+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,b,x,C){const E=_.value,S=b+"_"+x;if(C[S]===void 0)return typeof E=="number"||typeof E=="boolean"?C[S]=E:C[S]=E.clone(),!0;{const A=C[S];if(typeof E=="number"||typeof E=="boolean"){if(A!==E)return C[S]=E,!0}else if(A.equals(E)===!1)return A.copy(E),!0}return!1}function g(_){const b=_.uniforms;let x=0;const C=16;for(let S=0,A=b.length;S<A;S++){const y=Array.isArray(b[S])?b[S]:[b[S]];for(let M=0,L=y.length;M<L;M++){const U=y[M],O=Array.isArray(U.value)?U.value:[U.value];for(let H=0,W=O.length;H<W;H++){const V=O[H],j=v(V),z=x%C,re=z%j.boundary,J=z+re;x+=re,J!==0&&C-J<j.storage&&(x+=C-J),U.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=j.storage}}}const E=x%C;return E>0&&(x+=C-E),_.__size=x,_.__cache={},this}function v(_){const b={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(b.boundary=4,b.storage=4):_.isVector2?(b.boundary=8,b.storage=8):_.isVector3||_.isColor?(b.boundary=16,b.storage=12):_.isVector4?(b.boundary=16,b.storage=16):_.isMatrix3?(b.boundary=48,b.storage=48):_.isMatrix4?(b.boundary=64,b.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),b}function m(_){const b=_.target;b.removeEventListener("dispose",m);const x=a.indexOf(b.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const _ in s)i.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class cb{constructor(e={}){const{canvas:t=$g(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const _=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Fn,this.toneMapping=ts,this.toneMappingExposure=1;const x=this;let C=!1,E=0,S=0,A=null,y=-1,M=null;const L=new Pt,U=new Pt;let O=null;const H=new oe(0);let W=0,V=t.width,j=t.height,z=1,re=null,J=null;const he=new Pt(0,0,V,j),Pe=new Pt(0,0,V,j);let nt=!1;const Z=new uu;let ne=!1,Se=!1;const de=new lt,Le=new lt,Ue=new I,Ge=new Pt,St={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function Dt(){return A===null?z:1}let k=n;function Dn(w,F){return t.getContext(w,F)}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Jd}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",fe,!1),k===null){const F="webgl2";if(k=Dn(F,w),k===null)throw Dn(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Ye,qe,Ce,mt,Ae,R,T,G,$,te,Q,Ee,ue,ve,Qe,ie,xe,Re,Ie,_e,je,ke,ht,N;function ce(){Ye=new m_(k),Ye.init(),ke=new $y(k,Ye),qe=new c_(k,Ye,e,ke),Ce=new Zy(k,Ye),qe.reverseDepthBuffer&&h&&Ce.buffers.depth.setReversed(!0),mt=new x_(k),Ae=new Oy,R=new Jy(k,Ye,Ce,Ae,qe,ke,mt),T=new u_(x),G=new p_(x),$=new T0(k),ht=new o_(k,$),te=new g_(k,$,mt,ht),Q=new y_(k,te,$,mt),Ie=new __(k,qe,R),ie=new d_(Ae),Ee=new Uy(x,T,G,Ye,qe,ht,ie),ue=new ob(x,Ae),ve=new By,Qe=new Wy(Ye),Re=new a_(x,T,G,Ce,Q,f,l),xe=new jy(x,Q,qe),N=new lb(k,mt,qe,Ce),_e=new l_(k,Ye,mt),je=new v_(k,Ye,mt),mt.programs=Ee.programs,x.capabilities=qe,x.extensions=Ye,x.properties=Ae,x.renderLists=ve,x.shadowMap=xe,x.state=Ce,x.info=mt}ce();const q=new rb(x,k);this.xr=q,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const w=Ye.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ye.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(w){w!==void 0&&(z=w,this.setSize(V,j,!1))},this.getSize=function(w){return w.set(V,j)},this.setSize=function(w,F,X=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=w,j=F,t.width=Math.floor(w*z),t.height=Math.floor(F*z),X===!0&&(t.style.width=w+"px",t.style.height=F+"px"),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(V*z,j*z).floor()},this.setDrawingBufferSize=function(w,F,X){V=w,j=F,z=X,t.width=Math.floor(w*X),t.height=Math.floor(F*X),this.setViewport(0,0,w,F)},this.getCurrentViewport=function(w){return w.copy(L)},this.getViewport=function(w){return w.copy(he)},this.setViewport=function(w,F,X,Y){w.isVector4?he.set(w.x,w.y,w.z,w.w):he.set(w,F,X,Y),Ce.viewport(L.copy(he).multiplyScalar(z).round())},this.getScissor=function(w){return w.copy(Pe)},this.setScissor=function(w,F,X,Y){w.isVector4?Pe.set(w.x,w.y,w.z,w.w):Pe.set(w,F,X,Y),Ce.scissor(U.copy(Pe).multiplyScalar(z).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(w){Ce.setScissorTest(nt=w)},this.setOpaqueSort=function(w){re=w},this.setTransparentSort=function(w){J=w},this.getClearColor=function(w){return w.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor.apply(Re,arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha.apply(Re,arguments)},this.clear=function(w=!0,F=!0,X=!0){let Y=0;if(w){let B=!1;if(A!==null){const se=A.texture.format;B=se===ou||se===au||se===ru}if(B){const se=A.texture.type,pe=se===Ui||se===ks||se===Ha||se===zr||se===nu||se===iu,ye=Re.getClearColor(),be=Re.getClearAlpha(),De=ye.r,Fe=ye.g,Me=ye.b;pe?(g[0]=De,g[1]=Fe,g[2]=Me,g[3]=be,k.clearBufferuiv(k.COLOR,0,g)):(v[0]=De,v[1]=Fe,v[2]=Me,v[3]=be,k.clearBufferiv(k.COLOR,0,v))}else Y|=k.COLOR_BUFFER_BIT}F&&(Y|=k.DEPTH_BUFFER_BIT),X&&(Y|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),ve.dispose(),Qe.dispose(),Ae.dispose(),T.dispose(),G.dispose(),Q.dispose(),ht.dispose(),N.dispose(),Ee.dispose(),q.dispose(),q.removeEventListener("sessionstart",Xu),q.removeEventListener("sessionend",Yu),hs.stop()};function ee(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const w=mt.autoReset,F=xe.enabled,X=xe.autoUpdate,Y=xe.needsUpdate,B=xe.type;ce(),mt.autoReset=w,xe.enabled=F,xe.autoUpdate=X,xe.needsUpdate=Y,xe.type=B}function fe(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Oe(w){const F=w.target;F.removeEventListener("dispose",Oe),Rt(F)}function Rt(w){Kt(w),Ae.remove(w)}function Kt(w){const F=Ae.get(w).programs;F!==void 0&&(F.forEach(function(X){Ee.releaseProgram(X)}),w.isShaderMaterial&&Ee.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,X,Y,B,se){F===null&&(F=St);const pe=B.isMesh&&B.matrixWorld.determinant()<0,ye=Zm(w,F,X,Y,B);Ce.setMaterial(Y,pe);let be=X.index,De=1;if(Y.wireframe===!0){if(be=te.getWireframeAttribute(X),be===void 0)return;De=2}const Fe=X.drawRange,Me=X.attributes.position;let Je=Fe.start*De,ft=(Fe.start+Fe.count)*De;se!==null&&(Je=Math.max(Je,se.start*De),ft=Math.min(ft,(se.start+se.count)*De)),be!==null?(Je=Math.max(Je,0),ft=Math.min(ft,be.count)):Me!=null&&(Je=Math.max(Je,0),ft=Math.min(ft,Me.count));const gt=ft-Je;if(gt<0||gt===1/0)return;ht.setup(B,Y,ye,X,be);let on,it=_e;if(be!==null&&(on=$.get(be),it=je,it.setIndex(on)),B.isMesh)Y.wireframe===!0?(Ce.setLineWidth(Y.wireframeLinewidth*Dt()),it.setMode(k.LINES)):it.setMode(k.TRIANGLES);else if(B.isLine){let Te=Y.linewidth;Te===void 0&&(Te=1),Ce.setLineWidth(Te*Dt()),B.isLineSegments?it.setMode(k.LINES):B.isLineLoop?it.setMode(k.LINE_LOOP):it.setMode(k.LINE_STRIP)}else B.isPoints?it.setMode(k.POINTS):B.isSprite&&it.setMode(k.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)it.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Ye.get("WEBGL_multi_draw"))it.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Te=B._multiDrawStarts,pi=B._multiDrawCounts,st=B._multiDrawCount,Yn=be?$.get(be).bytesPerElement:1,Xs=Ae.get(Y).currentProgram.getUniforms();for(let _n=0;_n<st;_n++)Xs.setValue(k,"_gl_DrawID",_n),it.render(Te[_n]/Yn,pi[_n])}else if(B.isInstancedMesh)it.renderInstances(Je,gt,B.count);else if(X.isInstancedBufferGeometry){const Te=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,pi=Math.min(X.instanceCount,Te);it.renderInstances(Je,gt,pi)}else it.render(Je,gt)};function at(w,F,X){w.transparent===!0&&w.side===Tn&&w.forceSinglePass===!1?(w.side=an,w.needsUpdate=!0,ro(w,F,X),w.side=rs,w.needsUpdate=!0,ro(w,F,X),w.side=Tn):ro(w,F,X)}this.compile=function(w,F,X=null){X===null&&(X=w),p=Qe.get(X),p.init(F),b.push(p),X.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),w!==X&&w.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const Y=new Set;return w.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const se=B.material;if(se)if(Array.isArray(se))for(let pe=0;pe<se.length;pe++){const ye=se[pe];at(ye,X,B),Y.add(ye)}else at(se,X,B),Y.add(se)}),b.pop(),p=null,Y},this.compileAsync=function(w,F,X=null){const Y=this.compile(w,F,X);return new Promise(B=>{function se(){if(Y.forEach(function(pe){Ae.get(pe).currentProgram.isReady()&&Y.delete(pe)}),Y.size===0){B(w);return}setTimeout(se,10)}Ye.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let Xn=null;function fi(w){Xn&&Xn(w)}function Xu(){hs.stop()}function Yu(){hs.start()}const hs=new xp;hs.setAnimationLoop(fi),typeof self<"u"&&hs.setContext(self),this.setAnimationLoop=function(w){Xn=w,q.setAnimationLoop(w),w===null?hs.stop():hs.start()},q.addEventListener("sessionstart",Xu),q.addEventListener("sessionend",Yu),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(F),F=q.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,F,A),p=Qe.get(w,b.length),p.init(F),b.push(p),Le.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Z.setFromProjectionMatrix(Le),Se=this.localClippingEnabled,ne=ie.init(this.clippingPlanes,Se),m=ve.get(w,_.length),m.init(),_.push(m),q.enabled===!0&&q.isPresenting===!0){const se=x.xr.getDepthSensingMesh();se!==null&&kl(se,F,-1/0,x.sortObjects)}kl(w,F,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(re,J),Ze=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Ze&&Re.addToRenderList(m,w),this.info.render.frame++,ne===!0&&ie.beginShadows();const X=p.state.shadowsArray;xe.render(X,w,F),ne===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=m.opaque,B=m.transmissive;if(p.setupLights(),F.isArrayCamera){const se=F.cameras;if(B.length>0)for(let pe=0,ye=se.length;pe<ye;pe++){const be=se[pe];ju(Y,B,w,be)}Ze&&Re.render(w);for(let pe=0,ye=se.length;pe<ye;pe++){const be=se[pe];qu(m,w,be,be.viewport)}}else B.length>0&&ju(Y,B,w,F),Ze&&Re.render(w),qu(m,w,F);A!==null&&(R.updateMultisampleRenderTarget(A),R.updateRenderTargetMipmap(A)),w.isScene===!0&&w.onAfterRender(x,w,F),ht.resetDefaultState(),y=-1,M=null,b.pop(),b.length>0?(p=b[b.length-1],ne===!0&&ie.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function kl(w,F,X,Y){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)X=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Z.intersectsSprite(w)){Y&&Ge.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Le);const pe=Q.update(w),ye=w.material;ye.visible&&m.push(w,pe,ye,X,Ge.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Z.intersectsObject(w))){const pe=Q.update(w),ye=w.material;if(Y&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ge.copy(w.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),Ge.copy(pe.boundingSphere.center)),Ge.applyMatrix4(w.matrixWorld).applyMatrix4(Le)),Array.isArray(ye)){const be=pe.groups;for(let De=0,Fe=be.length;De<Fe;De++){const Me=be[De],Je=ye[Me.materialIndex];Je&&Je.visible&&m.push(w,pe,Je,X,Ge.z,Me)}}else ye.visible&&m.push(w,pe,ye,X,Ge.z,null)}}const se=w.children;for(let pe=0,ye=se.length;pe<ye;pe++)kl(se[pe],F,X,Y)}function qu(w,F,X,Y){const B=w.opaque,se=w.transmissive,pe=w.transparent;p.setupLightsView(X),ne===!0&&ie.setGlobalState(x.clippingPlanes,X),Y&&Ce.viewport(L.copy(Y)),B.length>0&&so(B,F,X),se.length>0&&so(se,F,X),pe.length>0&&so(pe,F,X),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function ju(w,F,X,Y){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new un(1,1,{generateMipmaps:!0,type:Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float")?Vn:Ui,minFilter:Ps,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));const se=p.state.transmissionRenderTarget[Y.id],pe=Y.viewport||L;se.setSize(pe.z,pe.w);const ye=x.getRenderTarget();x.setRenderTarget(se),x.getClearColor(H),W=x.getClearAlpha(),W<1&&x.setClearColor(16777215,.5),x.clear(),Ze&&Re.render(X);const be=x.toneMapping;x.toneMapping=ts;const De=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),ne===!0&&ie.setGlobalState(x.clippingPlanes,Y),so(w,X,Y),R.updateMultisampleRenderTarget(se),R.updateRenderTargetMipmap(se),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let Me=0,Je=F.length;Me<Je;Me++){const ft=F[Me],gt=ft.object,on=ft.geometry,it=ft.material,Te=ft.group;if(it.side===Tn&&gt.layers.test(Y.layers)){const pi=it.side;it.side=an,it.needsUpdate=!0,Ku(gt,X,Y,on,it,Te),it.side=pi,it.needsUpdate=!0,Fe=!0}}Fe===!0&&(R.updateMultisampleRenderTarget(se),R.updateRenderTargetMipmap(se))}x.setRenderTarget(ye),x.setClearColor(H,W),De!==void 0&&(Y.viewport=De),x.toneMapping=be}function so(w,F,X){const Y=F.isScene===!0?F.overrideMaterial:null;for(let B=0,se=w.length;B<se;B++){const pe=w[B],ye=pe.object,be=pe.geometry,De=Y===null?pe.material:Y,Fe=pe.group;ye.layers.test(X.layers)&&Ku(ye,F,X,be,De,Fe)}}function Ku(w,F,X,Y,B,se){w.onBeforeRender(x,F,X,Y,B,se),w.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),B.onBeforeRender(x,F,X,Y,w,se),B.transparent===!0&&B.side===Tn&&B.forceSinglePass===!1?(B.side=an,B.needsUpdate=!0,x.renderBufferDirect(X,F,Y,B,w,se),B.side=rs,B.needsUpdate=!0,x.renderBufferDirect(X,F,Y,B,w,se),B.side=Tn):x.renderBufferDirect(X,F,Y,B,w,se),w.onAfterRender(x,F,X,Y,B,se)}function ro(w,F,X){F.isScene!==!0&&(F=St);const Y=Ae.get(w),B=p.state.lights,se=p.state.shadowsArray,pe=B.state.version,ye=Ee.getParameters(w,B.state,se,F,X),be=Ee.getProgramCacheKey(ye);let De=Y.programs;Y.environment=w.isMeshStandardMaterial?F.environment:null,Y.fog=F.fog,Y.envMap=(w.isMeshStandardMaterial?G:T).get(w.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&w.envMap===null?F.environmentRotation:w.envMapRotation,De===void 0&&(w.addEventListener("dispose",Oe),De=new Map,Y.programs=De);let Fe=De.get(be);if(Fe!==void 0){if(Y.currentProgram===Fe&&Y.lightsStateVersion===pe)return Qu(w,ye),Fe}else ye.uniforms=Ee.getUniforms(w),w.onBeforeCompile(ye,x),Fe=Ee.acquireProgram(ye,be),De.set(be,Fe),Y.uniforms=ye.uniforms;const Me=Y.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Me.clippingPlanes=ie.uniform),Qu(w,ye),Y.needsLights=Jm(w),Y.lightsStateVersion=pe,Y.needsLights&&(Me.ambientLightColor.value=B.state.ambient,Me.lightProbe.value=B.state.probe,Me.directionalLights.value=B.state.directional,Me.directionalLightShadows.value=B.state.directionalShadow,Me.spotLights.value=B.state.spot,Me.spotLightShadows.value=B.state.spotShadow,Me.rectAreaLights.value=B.state.rectArea,Me.ltc_1.value=B.state.rectAreaLTC1,Me.ltc_2.value=B.state.rectAreaLTC2,Me.pointLights.value=B.state.point,Me.pointLightShadows.value=B.state.pointShadow,Me.hemisphereLights.value=B.state.hemi,Me.directionalShadowMap.value=B.state.directionalShadowMap,Me.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Me.spotShadowMap.value=B.state.spotShadowMap,Me.spotLightMatrix.value=B.state.spotLightMatrix,Me.spotLightMap.value=B.state.spotLightMap,Me.pointShadowMap.value=B.state.pointShadowMap,Me.pointShadowMatrix.value=B.state.pointShadowMatrix),Y.currentProgram=Fe,Y.uniformsList=null,Fe}function Zu(w){if(w.uniformsList===null){const F=w.currentProgram.getUniforms();w.uniformsList=Qo.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function Qu(w,F){const X=Ae.get(w);X.outputColorSpace=F.outputColorSpace,X.batching=F.batching,X.batchingColor=F.batchingColor,X.instancing=F.instancing,X.instancingColor=F.instancingColor,X.instancingMorph=F.instancingMorph,X.skinning=F.skinning,X.morphTargets=F.morphTargets,X.morphNormals=F.morphNormals,X.morphColors=F.morphColors,X.morphTargetsCount=F.morphTargetsCount,X.numClippingPlanes=F.numClippingPlanes,X.numIntersection=F.numClipIntersection,X.vertexAlphas=F.vertexAlphas,X.vertexTangents=F.vertexTangents,X.toneMapping=F.toneMapping}function Zm(w,F,X,Y,B){F.isScene!==!0&&(F=St),R.resetTextureUnits();const se=F.fog,pe=Y.isMeshStandardMaterial?F.environment:null,ye=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:$r,be=(Y.isMeshStandardMaterial?G:T).get(Y.envMap||pe),De=Y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Fe=!!X.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Me=!!X.morphAttributes.position,Je=!!X.morphAttributes.normal,ft=!!X.morphAttributes.color;let gt=ts;Y.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(gt=x.toneMapping);const on=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,it=on!==void 0?on.length:0,Te=Ae.get(Y),pi=p.state.lights;if(ne===!0&&(Se===!0||w!==M)){const Nn=w===M&&Y.id===y;ie.setState(Y,w,Nn)}let st=!1;Y.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==pi.state.version||Te.outputColorSpace!==ye||B.isBatchedMesh&&Te.batching===!1||!B.isBatchedMesh&&Te.batching===!0||B.isBatchedMesh&&Te.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Te.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Te.instancing===!1||!B.isInstancedMesh&&Te.instancing===!0||B.isSkinnedMesh&&Te.skinning===!1||!B.isSkinnedMesh&&Te.skinning===!0||B.isInstancedMesh&&Te.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Te.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Te.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Te.instancingMorph===!1&&B.morphTexture!==null||Te.envMap!==be||Y.fog===!0&&Te.fog!==se||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==ie.numPlanes||Te.numIntersection!==ie.numIntersection)||Te.vertexAlphas!==De||Te.vertexTangents!==Fe||Te.morphTargets!==Me||Te.morphNormals!==Je||Te.morphColors!==ft||Te.toneMapping!==gt||Te.morphTargetsCount!==it)&&(st=!0):(st=!0,Te.__version=Y.version);let Yn=Te.currentProgram;st===!0&&(Yn=ro(Y,F,B));let Xs=!1,_n=!1,ra=!1;const vt=Yn.getUniforms(),ti=Te.uniforms;if(Ce.useProgram(Yn.program)&&(Xs=!0,_n=!0,ra=!0),Y.id!==y&&(y=Y.id,_n=!0),Xs||M!==w){Ce.buffers.depth.getReversed()?(de.copy(w.projectionMatrix),t0(de),n0(de),vt.setValue(k,"projectionMatrix",de)):vt.setValue(k,"projectionMatrix",w.projectionMatrix),vt.setValue(k,"viewMatrix",w.matrixWorldInverse);const Bi=vt.map.cameraPosition;Bi!==void 0&&Bi.setValue(k,Ue.setFromMatrixPosition(w.matrixWorld)),qe.logarithmicDepthBuffer&&vt.setValue(k,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&vt.setValue(k,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,_n=!0,ra=!0)}if(B.isSkinnedMesh){vt.setOptional(k,B,"bindMatrix"),vt.setOptional(k,B,"bindMatrixInverse");const Nn=B.skeleton;Nn&&(Nn.boneTexture===null&&Nn.computeBoneTexture(),vt.setValue(k,"boneTexture",Nn.boneTexture,R))}B.isBatchedMesh&&(vt.setOptional(k,B,"batchingTexture"),vt.setValue(k,"batchingTexture",B._matricesTexture,R),vt.setOptional(k,B,"batchingIdTexture"),vt.setValue(k,"batchingIdTexture",B._indirectTexture,R),vt.setOptional(k,B,"batchingColorTexture"),B._colorsTexture!==null&&vt.setValue(k,"batchingColorTexture",B._colorsTexture,R));const aa=X.morphAttributes;if((aa.position!==void 0||aa.normal!==void 0||aa.color!==void 0)&&Ie.update(B,X,Yn),(_n||Te.receiveShadow!==B.receiveShadow)&&(Te.receiveShadow=B.receiveShadow,vt.setValue(k,"receiveShadow",B.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(ti.envMap.value=be,ti.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&F.environment!==null&&(ti.envMapIntensity.value=F.environmentIntensity),_n&&(vt.setValue(k,"toneMappingExposure",x.toneMappingExposure),Te.needsLights&&Qm(ti,ra),se&&Y.fog===!0&&ue.refreshFogUniforms(ti,se),ue.refreshMaterialUniforms(ti,Y,z,j,p.state.transmissionRenderTarget[w.id]),Qo.upload(k,Zu(Te),ti,R)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Qo.upload(k,Zu(Te),ti,R),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&vt.setValue(k,"center",B.center),vt.setValue(k,"modelViewMatrix",B.modelViewMatrix),vt.setValue(k,"normalMatrix",B.normalMatrix),vt.setValue(k,"modelMatrix",B.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const Nn=Y.uniformsGroups;for(let Bi=0,ki=Nn.length;Bi<ki;Bi++){const Ju=Nn[Bi];N.update(Ju,Yn),N.bind(Ju,Yn)}}return Yn}function Qm(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function Jm(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(w,F,X){Ae.get(w.texture).__webglTexture=F,Ae.get(w.depthTexture).__webglTexture=X;const Y=Ae.get(w);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=X===void 0,Y.__autoAllocateDepthBuffer||Ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,F){const X=Ae.get(w);X.__webglFramebuffer=F,X.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(w,F=0,X=0){A=w,E=F,S=X;let Y=!0,B=null,se=!1,pe=!1;if(w){const be=Ae.get(w);if(be.__useDefaultFramebuffer!==void 0)Ce.bindFramebuffer(k.FRAMEBUFFER,null),Y=!1;else if(be.__webglFramebuffer===void 0)R.setupRenderTarget(w);else if(be.__hasExternalTextures)R.rebindTextures(w,Ae.get(w.texture).__webglTexture,Ae.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Me=w.depthTexture;if(be.__boundDepthTexture!==Me){if(Me!==null&&Ae.has(Me)&&(w.width!==Me.image.width||w.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(w)}}const De=w.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(pe=!0);const Fe=Ae.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Fe[F])?B=Fe[F][X]:B=Fe[F],se=!0):w.samples>0&&R.useMultisampledRTT(w)===!1?B=Ae.get(w).__webglMultisampledFramebuffer:Array.isArray(Fe)?B=Fe[X]:B=Fe,L.copy(w.viewport),U.copy(w.scissor),O=w.scissorTest}else L.copy(he).multiplyScalar(z).floor(),U.copy(Pe).multiplyScalar(z).floor(),O=nt;if(Ce.bindFramebuffer(k.FRAMEBUFFER,B)&&Y&&Ce.drawBuffers(w,B),Ce.viewport(L),Ce.scissor(U),Ce.setScissorTest(O),se){const be=Ae.get(w.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+F,be.__webglTexture,X)}else if(pe){const be=Ae.get(w.texture),De=F||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,be.__webglTexture,X||0,De)}y=-1},this.readRenderTargetPixels=function(w,F,X,Y,B,se,pe){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=Ae.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&pe!==void 0&&(ye=ye[pe]),ye){Ce.bindFramebuffer(k.FRAMEBUFFER,ye);try{const be=w.texture,De=be.format,Fe=be.type;if(!qe.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qe.textureTypeReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-Y&&X>=0&&X<=w.height-B&&k.readPixels(F,X,Y,B,ke.convert(De),ke.convert(Fe),se)}finally{const be=A!==null?Ae.get(A).__webglFramebuffer:null;Ce.bindFramebuffer(k.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(w,F,X,Y,B,se,pe){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=Ae.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&pe!==void 0&&(ye=ye[pe]),ye){const be=w.texture,De=be.format,Fe=be.type;if(!qe.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qe.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=w.width-Y&&X>=0&&X<=w.height-B){Ce.bindFramebuffer(k.FRAMEBUFFER,ye);const Me=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Me),k.bufferData(k.PIXEL_PACK_BUFFER,se.byteLength,k.STREAM_READ),k.readPixels(F,X,Y,B,ke.convert(De),ke.convert(Fe),0);const Je=A!==null?Ae.get(A).__webglFramebuffer:null;Ce.bindFramebuffer(k.FRAMEBUFFER,Je);const ft=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await e0(k,ft,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Me),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,se),k.deleteBuffer(Me),k.deleteSync(ft),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,F=null,X=0){w.isTexture!==!0&&(va("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,w=arguments[1]);const Y=Math.pow(2,-X),B=Math.floor(w.image.width*Y),se=Math.floor(w.image.height*Y),pe=F!==null?F.x:0,ye=F!==null?F.y:0;R.setTexture2D(w,0),k.copyTexSubImage2D(k.TEXTURE_2D,X,0,0,pe,ye,B,se),Ce.unbindTexture()},this.copyTextureToTexture=function(w,F,X=null,Y=null,B=0){w.isTexture!==!0&&(va("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,w=arguments[1],F=arguments[2],B=arguments[3]||0,X=null);let se,pe,ye,be,De,Fe,Me,Je,ft;const gt=w.isCompressedTexture?w.mipmaps[B]:w.image;X!==null?(se=X.max.x-X.min.x,pe=X.max.y-X.min.y,ye=X.isBox3?X.max.z-X.min.z:1,be=X.min.x,De=X.min.y,Fe=X.isBox3?X.min.z:0):(se=gt.width,pe=gt.height,ye=gt.depth||1,be=0,De=0,Fe=0),Y!==null?(Me=Y.x,Je=Y.y,ft=Y.z):(Me=0,Je=0,ft=0);const on=ke.convert(F.format),it=ke.convert(F.type);let Te;F.isData3DTexture?(R.setTexture3D(F,0),Te=k.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(R.setTexture2DArray(F,0),Te=k.TEXTURE_2D_ARRAY):(R.setTexture2D(F,0),Te=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,F.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,F.unpackAlignment);const pi=k.getParameter(k.UNPACK_ROW_LENGTH),st=k.getParameter(k.UNPACK_IMAGE_HEIGHT),Yn=k.getParameter(k.UNPACK_SKIP_PIXELS),Xs=k.getParameter(k.UNPACK_SKIP_ROWS),_n=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,gt.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,gt.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,be),k.pixelStorei(k.UNPACK_SKIP_ROWS,De),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Fe);const ra=w.isDataArrayTexture||w.isData3DTexture,vt=F.isDataArrayTexture||F.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const ti=Ae.get(w),aa=Ae.get(F),Nn=Ae.get(ti.__renderTarget),Bi=Ae.get(aa.__renderTarget);Ce.bindFramebuffer(k.READ_FRAMEBUFFER,Nn.__webglFramebuffer),Ce.bindFramebuffer(k.DRAW_FRAMEBUFFER,Bi.__webglFramebuffer);for(let ki=0;ki<ye;ki++)ra&&k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ae.get(w).__webglTexture,B,Fe+ki),w.isDepthTexture?(vt&&k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ae.get(F).__webglTexture,B,ft+ki),k.blitFramebuffer(be,De,se,pe,Me,Je,se,pe,k.DEPTH_BUFFER_BIT,k.NEAREST)):vt?k.copyTexSubImage3D(Te,B,Me,Je,ft+ki,be,De,se,pe):k.copyTexSubImage2D(Te,B,Me,Je,ft+ki,be,De,se,pe);Ce.bindFramebuffer(k.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else vt?w.isDataTexture||w.isData3DTexture?k.texSubImage3D(Te,B,Me,Je,ft,se,pe,ye,on,it,gt.data):F.isCompressedArrayTexture?k.compressedTexSubImage3D(Te,B,Me,Je,ft,se,pe,ye,on,gt.data):k.texSubImage3D(Te,B,Me,Je,ft,se,pe,ye,on,it,gt):w.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,B,Me,Je,se,pe,on,it,gt.data):w.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,B,Me,Je,gt.width,gt.height,on,gt.data):k.texSubImage2D(k.TEXTURE_2D,B,Me,Je,se,pe,on,it,gt);k.pixelStorei(k.UNPACK_ROW_LENGTH,pi),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,st),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Yn),k.pixelStorei(k.UNPACK_SKIP_ROWS,Xs),k.pixelStorei(k.UNPACK_SKIP_IMAGES,_n),B===0&&F.generateMipmaps&&k.generateMipmap(Te),Ce.unbindTexture()},this.copyTextureToTexture3D=function(w,F,X=null,Y=null,B=0){return w.isTexture!==!0&&(va("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,Y=arguments[1]||null,w=arguments[2],F=arguments[3],B=arguments[4]||0),va('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,F,X,Y,B)},this.initRenderTarget=function(w){Ae.get(w).__webglFramebuffer===void 0&&R.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?R.setTextureCube(w,0):w.isData3DTexture?R.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?R.setTexture2DArray(w,0):R.setTexture2D(w,0),Ce.unbindTexture()},this.resetState=function(){E=0,S=0,A=null,Ce.reset(),ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}class pu{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new oe(e),this.density=t}clone(){return new pu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class db extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class ub extends Gt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=qt,d=qt,u,h){super(null,a,o,l,c,d,s,r,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jh extends hn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ar=new lt,$h=new lt,Co=[],ef=new Hs,hb=new lt,ua=new K,ha=new Vs;class Sn extends K{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,hb)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Hs),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ar),ef.copy(e.boundingBox).applyMatrix4(ar),this.boundingBox.union(ef)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ar),ha.copy(e.boundingSphere).applyMatrix4(ar),this.boundingSphere.union(ha)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(ua.geometry=this.geometry,ua.material=this.material,ua.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ha.copy(this.boundingSphere),ha.applyMatrix4(n),e.ray.intersectsSphere(ha)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ar),$h.multiplyMatrices(n,ar),ua.matrixWorld=$h,ua.raycast(e,Co);for(let a=0,o=Co.length;a<o;a++){const l=Co[a];l.instanceId=r,l.object=this,t.push(l)}Co.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Jh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ub(new Float32Array(s*this.count),s,this.count,su,li));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class $a extends cs{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const cl=new I,dl=new I,tf=new lt,fa=new Ll,Ro=new Vs,pc=new I,nf=new I;class Tp extends Ct{constructor(e=new Bt,t=new $a){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)cl.fromBufferAttribute(t,s-1),dl.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=cl.distanceTo(dl);e.setAttribute("lineDistance",new ut(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ro.copy(n.boundingSphere),Ro.applyMatrix4(s),Ro.radius+=r,e.ray.intersectsSphere(Ro)===!1)return;tf.copy(s).invert(),fa.copy(e.ray).applyMatrix4(tf);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,h=n.attributes.position;if(d!==null){const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){const p=d.getX(v),_=d.getX(v+1),b=Po(this,e,fa,l,p,_);b&&t.push(b)}if(this.isLineLoop){const v=d.getX(g-1),m=d.getX(f),p=Po(this,e,fa,l,v,m);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){const p=Po(this,e,fa,l,v,v+1);p&&t.push(p)}if(this.isLineLoop){const v=Po(this,e,fa,l,g-1,f);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Po(i,e,t,n,s,r){const a=i.geometry.attributes.position;if(cl.fromBufferAttribute(a,s),dl.fromBufferAttribute(a,r),t.distanceSqToSegment(cl,dl,pc,nf)>n)return;pc.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(pc);if(!(l<e.near||l>e.far))return{distance:l,point:nf.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const sf=new I,rf=new I;class mu extends Tp{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)sf.fromBufferAttribute(t,s),rf.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+sf.distanceTo(rf);e.setAttribute("lineDistance",new ut(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class wp extends cs{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const af=new lt,Ed=new Ll,Lo=new Vs,Io=new I;class fb extends Ct{constructor(e=new Bt,t=new wp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lo.copy(n.boundingSphere),Lo.applyMatrix4(s),Lo.radius+=r,e.ray.intersectsSphere(Lo)===!1)return;af.copy(s).invert(),Ed.copy(e.ray).applyMatrix4(af);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=h,v=f;g<v;g++){const m=c.getX(g);Io.fromBufferAttribute(u,m),of(Io,m,l,s,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=h,v=f;g<v;g++)Io.fromBufferAttribute(u,g),of(Io,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function of(i,e,t,n,s,r,a){const o=Ed.distanceSqToPoint(i);if(o<t){const l=new I;Ed.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class ei extends Gt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class pb{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const d=n[s],h=n[s+1]-d,f=(a-d)/h;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new we:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new I,s=[],r=[],a=[],o=new I,l=new lt;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new I)}r[0]=new I,a[0]=new I;let c=Number.MAX_VALUE;const d=Math.abs(s[0].x),u=Math.abs(s[0].y),h=Math.abs(s[0].z);d<=c&&(c=d,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Xt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Xt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function mb(i,e){const t=1-i;return t*t*e}function gb(i,e){return 2*(1-i)*i*e}function vb(i,e){return i*i*e}function mc(i,e,t,n){return mb(i,e)+gb(i,t)+vb(i,n)}class xb extends pb{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(mc(e,s.x,r.x,a.x),mc(e,s.y,r.y,a.y),mc(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class et extends Bt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],u=[],h=[],f=[];let g=0;const v=[],m=n/2;let p=0;_(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(d),this.setAttribute("position",new ut(u,3)),this.setAttribute("normal",new ut(h,3)),this.setAttribute("uv",new ut(f,2));function _(){const x=new I,C=new I;let E=0;const S=(t-e)/n;for(let A=0;A<=r;A++){const y=[],M=A/r,L=M*(t-e)+e;for(let U=0;U<=s;U++){const O=U/s,H=O*l+o,W=Math.sin(H),V=Math.cos(H);C.x=L*W,C.y=-M*n+m,C.z=L*V,u.push(C.x,C.y,C.z),x.set(W,S,V).normalize(),h.push(x.x,x.y,x.z),f.push(O,1-M),y.push(g++)}v.push(y)}for(let A=0;A<s;A++)for(let y=0;y<r;y++){const M=v[y][A],L=v[y+1][A],U=v[y+1][A+1],O=v[y][A+1];(e>0||y!==0)&&(d.push(M,L,O),E+=3),(t>0||y!==r-1)&&(d.push(L,U,O),E+=3)}c.addGroup(p,E,0),p+=E}function b(x){const C=g,E=new we,S=new I;let A=0;const y=x===!0?e:t,M=x===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,m*M,0),h.push(0,M,0),f.push(.5,.5),g++;const L=g;for(let U=0;U<=s;U++){const H=U/s*l+o,W=Math.cos(H),V=Math.sin(H);S.x=y*V,S.y=m*M,S.z=y*W,u.push(S.x,S.y,S.z),h.push(0,M,0),E.x=W*.5+.5,E.y=V*.5*M+.5,f.push(E.x,E.y),g++}for(let U=0;U<s;U++){const O=C+U,H=L+U;x===!0?d.push(H,H+1,O):d.push(H+1,H,O),A+=3}c.addGroup(p,A,x===!0?1:2),p+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new et(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ii extends et{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ii(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Dl extends Bt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),d(),this.setAttribute("position",new ut(r,3)),this.setAttribute("normal",new ut(r.slice(),3)),this.setAttribute("uv",new ut(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const b=new I,x=new I,C=new I;for(let E=0;E<t.length;E+=3)f(t[E+0],b),f(t[E+1],x),f(t[E+2],C),l(b,x,C,_)}function l(_,b,x,C){const E=C+1,S=[];for(let A=0;A<=E;A++){S[A]=[];const y=_.clone().lerp(x,A/E),M=b.clone().lerp(x,A/E),L=E-A;for(let U=0;U<=L;U++)U===0&&A===E?S[A][U]=y:S[A][U]=y.clone().lerp(M,U/L)}for(let A=0;A<E;A++)for(let y=0;y<2*(E-A)-1;y++){const M=Math.floor(y/2);y%2===0?(h(S[A][M+1]),h(S[A+1][M]),h(S[A][M])):(h(S[A][M+1]),h(S[A+1][M+1]),h(S[A+1][M]))}}function c(_){const b=new I;for(let x=0;x<r.length;x+=3)b.x=r[x+0],b.y=r[x+1],b.z=r[x+2],b.normalize().multiplyScalar(_),r[x+0]=b.x,r[x+1]=b.y,r[x+2]=b.z}function d(){const _=new I;for(let b=0;b<r.length;b+=3){_.x=r[b+0],_.y=r[b+1],_.z=r[b+2];const x=m(_)/2/Math.PI+.5,C=p(_)/Math.PI+.5;a.push(x,1-C)}g(),u()}function u(){for(let _=0;_<a.length;_+=6){const b=a[_+0],x=a[_+2],C=a[_+4],E=Math.max(b,x,C),S=Math.min(b,x,C);E>.9&&S<.1&&(b<.2&&(a[_+0]+=1),x<.2&&(a[_+2]+=1),C<.2&&(a[_+4]+=1))}}function h(_){r.push(_.x,_.y,_.z)}function f(_,b){const x=_*3;b.x=e[x+0],b.y=e[x+1],b.z=e[x+2]}function g(){const _=new I,b=new I,x=new I,C=new I,E=new we,S=new we,A=new we;for(let y=0,M=0;y<r.length;y+=9,M+=6){_.set(r[y+0],r[y+1],r[y+2]),b.set(r[y+3],r[y+4],r[y+5]),x.set(r[y+6],r[y+7],r[y+8]),E.set(a[M+0],a[M+1]),S.set(a[M+2],a[M+3]),A.set(a[M+4],a[M+5]),C.copy(_).add(b).add(x).divideScalar(3);const L=m(C);v(E,M+0,_,L),v(S,M+2,b,L),v(A,M+4,x,L)}}function v(_,b,x,C){C<0&&_.x===1&&(a[b]=_.x-1),x.x===0&&x.z===0&&(a[b]=C/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dl(e.vertices,e.indices,e.radius,e.details)}}class gu extends Dl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new gu(e.radius,e.detail)}}const Do=new I,No=new I,gc=new I,Uo=new kn;class Ap extends Bt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),r=Math.cos(Ar*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],d=["a","b","c"],u=new Array(3),h={},f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:v,b:m,c:p}=Uo;if(v.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),Uo.getNormal(gc),u[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let _=0;_<3;_++){const b=(_+1)%3,x=u[_],C=u[b],E=Uo[d[_]],S=Uo[d[b]],A=`${x}_${C}`,y=`${C}_${x}`;y in h&&h[y]?(gc.dot(h[y].normal)<=r&&(f.push(E.x,E.y,E.z),f.push(S.x,S.y,S.z)),h[y]=null):A in h||(h[A]={index0:c[_],index1:c[b],normal:gc.clone()})}}for(const g in h)if(h[g]){const{index0:v,index1:m}=h[g];Do.fromBufferAttribute(o,v),No.fromBufferAttribute(o,m),f.push(Do.x,Do.y,Do.z),f.push(No.x,No.y,No.z)}this.setAttribute("position",new ut(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class vu extends Dl{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new vu(e.radius,e.detail)}}class Nl extends Bt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],d=[];let u=e;const h=(t-e)/s,f=new I,g=new we;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,d.push(g.x,g.y)}u+=h}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const _=p+m,b=_,x=_+n+1,C=_+n+2,E=_+1;o.push(b,x,E),o.push(x,C,E)}}this.setIndex(o),this.setAttribute("position",new ut(l,3)),this.setAttribute("normal",new ut(c,3)),this.setAttribute("uv",new ut(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ui extends Bt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],u=new I,h=new I,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const _=[],b=p/n;let x=0;p===0&&a===0?x=.5/t:p===n&&l===Math.PI&&(x=-.5/t);for(let C=0;C<=t;C++){const E=C/t;u.x=-e*Math.cos(s+E*r)*Math.sin(a+b*o),u.y=e*Math.cos(a+b*o),u.z=e*Math.sin(s+E*r)*Math.sin(a+b*o),g.push(u.x,u.y,u.z),h.copy(u).normalize(),v.push(h.x,h.y,h.z),m.push(E+x,1-b),_.push(c++)}d.push(_)}for(let p=0;p<n;p++)for(let _=0;_<t;_++){const b=d[p][_+1],x=d[p][_],C=d[p+1][_],E=d[p+1][_+1];(p!==0||a>0)&&f.push(b,x,E),(p!==n-1||l<Math.PI)&&f.push(x,C,E)}this.setIndex(f),this.setAttribute("position",new ut(g,3)),this.setAttribute("normal",new ut(v,3)),this.setAttribute("uv",new ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ui(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Gr extends Bt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],d=new I,u=new I,h=new I;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const v=g/s*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),d.x=e*Math.cos(v),d.y=e*Math.sin(v),h.subVectors(u,d).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,_=(s+1)*f+g;a.push(v,m,_),a.push(m,p,_)}this.setIndex(a),this.setAttribute("position",new ut(o,3)),this.setAttribute("normal",new ut(l,3)),this.setAttribute("uv",new ut(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class _b extends Ft{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}}class xt extends cs{static get type(){return"MeshPhongMaterial"}constructor(e){super(),this.isMeshPhongMaterial=!0,this.color=new oe(16777215),this.specular=new oe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lu,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class pt extends cs{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lu,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class xu extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class yb extends xu{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.groundColor=new oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const vc=new lt,lf=new I,cf=new I;class bb{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new uu,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new Pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;lf.setFromMatrixPosition(e.matrixWorld),t.position.copy(lf),cf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(cf),t.updateMatrixWorld(),vc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Mb extends bb{constructor(){super(new hu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Sb extends xu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new Mb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Eb extends xu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Tb{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=df(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=df();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function df(){return performance.now()}const uf=new lt;class wb{constructor(e,t,n=0,s=1/0){this.ray=new Ll(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new du,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return uf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(uf),this}intersectObject(e,t=!0,n=[]){return Td(e,this,n,t),n.sort(hf),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Td(e[s],this,n,t);return n.sort(hf),n}}function hf(i,e){return i.distance-e.distance}function Td(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Td(r[a],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jd);let ge=null,Lt=null,Ve=null,Jn=!1;const ia=[];let _a=60,Oo=0,Fo=0;function Ab(){const i=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||window.innerWidth<768,e=navigator.hardwareConcurrency||4,t=navigator.deviceMemory||4;return i||e<=2||t<=2?"LOW":e<=4||t<=4?"MEDIUM":"HIGH"}function Cp(i=P.getLiveState().graphicsQuality){const e=P.getLiveState();e.graphicsQuality=i;const t=i==="AUTO"?Ab():i;if(e.resolvedQuality=t,!Ve||!Jn)return t;const n=window.devicePixelRatio||1;return t==="LOW"?(Ve.setPixelRatio(1),Ve.shadowMap.enabled=!1):t==="MEDIUM"?(Ve.setPixelRatio(Math.min(n,1.5)),Ve.shadowMap.enabled=!0,Ve.shadowMap.type=$d):(Ve.setPixelRatio(Math.min(n,2)),Ve.shadowMap.enabled=!0,Ve.shadowMap.type=Xf),Ve.setSize(window.innerWidth,window.innerHeight),t}function Cb(i){if(!Ve||!Jn||i<=0)return;const e=1/i;_a=_a*.92+e*.08;const t=P.getLiveState();if(t.graphicsQuality==="AUTO"){if(_a<34)Oo++,Fo=0,Oo>45&&Ve.getPixelRatio()>1&&(Ve.setPixelRatio(1),Oo=0);else if(_a>55){Fo++,Oo=0;const n=Math.min(window.devicePixelRatio||1,t.resolvedQuality==="HIGH"?2:1.5);Fo>120&&Ve.getPixelRatio()<n&&(Ve.setPixelRatio(n),Fo=0)}}}function Rb(){return!Ve||!Jn?{fps:0,calls:0,triangles:0,geometries:0,textures:0}:{fps:Math.round(_a),calls:Ve.info.render.calls,triangles:Ve.info.render.triangles,geometries:Ve.info.memory.geometries,textures:Ve.info.memory.textures}}function Pb(){ge&&(ge.traverse(i=>{i.geometry&&i.geometry.dispose(),i.material&&(Array.isArray(i.material)?i.material:[i.material]).forEach(t=>{t.map&&t.map.dispose(),t.emissiveMap&&t.emissiveMap.dispose(),t.dispose()})}),Ve&&Ve.dispose())}function Lb(){const i=document.getElementById("city-canvas"),e=document.getElementById("webgl-fallback");ge=new db,ge.background=new oe(857373),ge.fog=new pu(857373,.0021),Lt=new Bn(40,window.innerWidth/window.innerHeight,1,850);try{if(!(i.getContext("webgl2",{preserveDrawingBuffer:!0})||i.getContext("webgl",{preserveDrawingBuffer:!0})||i.getContext("experimental-webgl",{preserveDrawingBuffer:!0})))throw new Error("WebGL context could not be created.");Ve=new cb({canvas:i,antialias:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"}),Ve.toneMapping=eu,Ve.toneMappingExposure=1.05,Jn=!0,Cp(P.getLiveState().graphicsQuality)}catch(t){console.warn("MarketVerse WebGL initialization failed, activating 2D fallback:",t),Jn=!1,i&&(i.style.display="none"),e&&(e.style.display="flex")}return window.addEventListener("resize",()=>{Lt&&(Lt.aspect=window.innerWidth/window.innerHeight,Lt.updateProjectionMatrix(),Ve&&Jn&&Ve.setSize(window.innerWidth,window.innerHeight))}),window.addEventListener("beforeunload",Pb),{scene:ge,camera:Lt,renderer:Ve,webglAvailable:Jn}}let ul=null,Rr=null,bt=null,fr=null,xc=null,_c=null;function Wr(i=8,e=8,t=.58){if(!xc){const s=document.createElement("canvas");s.width=128,s.height=128;const r=s.getContext("2d"),a=r.createRadialGradient(64,64,10,64,64,62);a.addColorStop(0,"rgba(4, 8, 14, 0.88)"),a.addColorStop(.55,"rgba(6, 12, 20, 0.48)"),a.addColorStop(1,"rgba(6, 12, 20, 0.0)"),r.fillStyle=a,r.fillRect(0,0,128,128);const o=new ei(s);xc=new _t({map:o,transparent:!0,opacity:t,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),_c=new Gs(1,1),_c.rotateX(-Math.PI/2)}const n=new K(_c,xc);return n.scale.set(i,1,e),n.position.y=.04,n}function Ib(){if(!ge)return;ul=new Eb(14279920,.48),ge.add(ul),Rr=new yb(9156840,1581612,.55),Rr.position.set(0,120,0),ge.add(Rr),fr=new Ct,fr.position.set(0,0,10),ge.add(fr),bt=new Sb(16774368,1.15),bt.position.set(85,135,85),bt.target=fr;const i=P.getLiveState().resolvedQuality;bt.castShadow=i!=="LOW",bt.shadow.mapSize.width=2048,bt.shadow.mapSize.height=2048,bt.shadow.camera.near=15,bt.shadow.camera.far=340,bt.shadow.bias=-4e-4,bt.shadow.normalBias=.02;const e=95;bt.shadow.camera.left=-e,bt.shadow.camera.right=e,bt.shadow.camera.top=e,bt.shadow.camera.bottom=-e,ge.add(bt)}function Db(i){bt&&(bt.castShadow=i!=="LOW")}function Nb(i,e,t){if(!bt||!fr)return;const n=Math.round(i.x*.5)*2,s=Math.round(i.z*.5)*2;fr.position.set(n,0,s),bt.position.set(n+t.x,t.y,s+t.z);const r=Math.round(Math.max(48,Math.min(125,e*.68))),a=bt.shadow.camera;a.right!==r&&(a.left=-r,a.right=r,a.top=r,a.bottom=-r,a.updateProjectionMatrix())}function pa(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Bt;let c=0;for(let d=0;d<i.length;++d){const u=i[d];let h=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,d),c+=f}}if(t){let d=0;const u=[];for(let h=0;h<i.length;++h){const f=i[h].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+d);d+=i[h].attributes.position.count}l.setIndex(u)}for(const d in r){const u=ff(r[d]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;l.setAttribute(d,u)}for(const d in a){const u=a[d][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[d]=[];for(let h=0;h<u;++h){const f=[];for(let v=0;v<a[d].length;++v)f.push(a[d][v][h]);const g=ff(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;l.morphAttributes[d].push(g)}}return l}function ff(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){const d=i[c];if(e===void 0&&(e=d.array.constructor),e!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=d.itemSize),t!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=d.normalized),n!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=d.gpuType),s!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=d.count*t}const a=new e(r),o=new hn(a,t,n);let l=0;for(let c=0;c<i.length;++c){const d=i[c];if(d.isInterleavedBufferAttribute){const u=l/t;for(let h=0,f=d.count;h<f;h++)for(let g=0;g<t;g++){const v=d.getComponent(h,g);o.setComponent(h+u,g,v)}}else a.set(d.array,l);l+=d.count*t}return s!==void 0&&(o.gpuType=s),o}let As=null,Ta=null,wa=null,yc=null,Aa=null;const wd=[];function Ub(){const i=document.createElement("canvas");i.width=256,i.height=256;const e=i.getContext("2d");e.fillStyle="#ffffff",e.fillRect(0,0,256,256),e.strokeStyle="#d0dce8",e.lineWidth=2;const t=32;for(let s=0;s<=256;s+=t)e.beginPath(),e.moveTo(s,0),e.lineTo(s,256),e.stroke(),e.beginPath(),e.moveTo(0,s),e.lineTo(256,s),e.stroke();e.fillStyle="rgba(0, 0, 0, 0.04)";for(let s=0;s<8;s++)for(let r=0;r<8;r++)(r+s)%2===0&&e.fillRect(r*t+2,s*t+2,t-4,t-4);const n=new ei(i);return n.wrapS=en,n.wrapT=en,n.repeat.set(28,28),n}function Ob(i,e){const t=document.createElement("canvas");t.width=128,t.height=512;const n=t.getContext("2d");n.fillStyle="#18222d",n.fillRect(0,0,128,512),n.fillStyle="#3b526b",n.fillRect(8,0,3,512),n.fillRect(117,0,3,512),n.fillStyle="#d6a84f";for(let r=16;r<512;r+=48)n.fillRect(62,r,4,24);const s=new ei(t);return s.wrapS=en,s.wrapT=en,i&&(s.rotation=Math.PI/2,s.center.set(.5,.5)),s.repeat.set(1,e/18),s}function Fb(){const i=document.createElement("canvas");i.width=128,i.height=128;const e=i.getContext("2d");e.fillStyle="#18222d",e.fillRect(0,0,128,128),e.fillStyle="#d4e2f0";for(let t=18;t<110;t+=14)e.fillRect(t,4,8,18),e.fillRect(t,106,8,18),e.fillRect(4,t,18,8),e.fillRect(106,t,18,8);return new ei(i)}function Bb(){const i=document.createElement("canvas");i.width=256,i.height=256;const e=i.getContext("2d");e.fillStyle="#0c283d",e.fillRect(0,0,256,256),e.strokeStyle="rgba(94, 194, 214, 0.25)",e.lineWidth=2;for(let n=0;n<256;n+=16){e.beginPath();for(let s=0;s<=256;s+=32){const r=n+Math.sin(s/256*Math.PI*2)*3;s===0?e.moveTo(s,r):e.lineTo(s,r)}e.stroke()}const t=new ei(i);return t.wrapS=en,t.wrapT=en,t.repeat.set(2,16),t}function kb(){if(!ge)return;const i=Ub(),e=new ae(276,4,256);As=new xt({map:i,color:1450543,specular:1120546,shininess:12});const t=new K(e,As);t.position.set(0,-2,8),t.receiveShadow=!0,ge.add(t),wa=new pt({color:2372676});const n=new ae(2.4,1.4,256);n.translate(-108.5,.4,8);const s=new ae(3,1.4,256);s.translate(-125.5,.4,8);const r=new K(pa([n,s]),wa);ge.add(r),Aa=Bb();const a=new Gs(15,254);a.rotateX(-Math.PI/2);const o=new xt({map:Aa,color:1727354,emissive:466220,specular:8965375,shininess:95});yc=new K(a,o),yc.position.set(-117,.12,8),ge.add(yc),Ta=new pt({color:2504005});const l=[{x:-42,z:8,w:7.4,d:226,horiz:!1},{x:42,z:8,w:7.4,d:226,horiz:!1},{x:0,z:-55,w:236,d:7.4,horiz:!0},{x:0,z:5,w:236,d:7.4,horiz:!0},{x:0,z:64,w:236,d:7.4,horiz:!0}],c=[];l.forEach(E=>{const S=E.horiz?E.w:E.w+2.6,A=E.horiz?E.d+2.6:E.d,y=new ae(S,.22,A);y.translate(E.x,.11,E.z),c.push(y);const M=Ob(E.horiz,E.horiz?E.w:E.d),L=new xt({map:M,color:16777215,specular:1582128,shininess:18});wd.push(L);const U=new K(new ae(E.w,.26,E.d),L);U.position.set(E.x,.13,E.z),U.receiveShadow=!0,ge.add(U)});const d=new K(pa(c),Ta);d.receiveShadow=!0,ge.add(d);const u=Fb(),h=new xt({map:u,specular:2109504,shininess:20});wd.push(h);const g=[{x:-42,z:-55},{x:42,z:-55},{x:-42,z:5},{x:42,z:5},{x:-42,z:64},{x:42,z:64}].map(E=>{const S=new ae(9.6,.28,9.6);return S.translate(E.x,.14,E.z),S}),v=new K(pa(g),h);v.receiveShadow=!0,ge.add(v);const m=new pt({color:3426654}),p=new xt({color:4951016,shininess:50}),_=[],b=[];[-55,5,64].forEach(E=>{const S=new ae(19,.8,9.5);S.translate(-117,1.2,E),_.push(S);const A=Wr(20,11,.55);A.position.set(-117,.16,E),ge.add(A),[-4.3,4.3].forEach(y=>{const M=new Gr(7.5,.38,8,18,Math.PI);M.translate(-117,1.4,E+y),b.push(M)})});const x=new K(pa(_),m);x.castShadow=!0,ge.add(x);const C=new K(pa(b),p);ge.add(C)}function zb(i,e,t){if(!As||!Ta||!wa)return;t&&e<.45?(As.color.setHex(13161695),Ta.color.setHex(14410988),wa.color.setHex(10465472)):(As.color.setHex(1450543),Ta.color.setHex(2504005),wa.color.setHex(2372676));const n=i?110:16,s=i?8041704:1384491;As.shininess=n*.7,As.specular.setHex(s),wd.forEach(r=>{r.shininess=n,r.specular.setHex(s)})}function Hb(i,e){!Aa||e||(Aa.offset.y=(Aa.offset.y+i*.18)%1)}function Si(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function Rp(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Rn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ga={duration:.5,overwrite:!1,delay:0},_u,jt,Mt,zn=1e8,dt=1/zn,Ad=Math.PI*2,Vb=Ad/4,Gb=0,Pp=Math.sqrt,Wb=Math.cos,Xb=Math.sin,Wt=function(e){return typeof e=="string"},It=function(e){return typeof e=="function"},Oi=function(e){return typeof e=="number"},yu=function(e){return typeof e>"u"},hi=function(e){return typeof e=="object"},fn=function(e){return e!==!1},bu=function(){return typeof window<"u"},Bo=function(e){return It(e)||Wt(e)},Lp=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},tn=Array.isArray,Yb=/random\([^)]+\)/g,qb=/,\s*/g,pf=/(?:-?\.?\d|\.)+/gi,Ip=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,pr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,bc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Dp=/[+-]=-?[.\d]+/,jb=/[^,'"\[\]\s]+/gi,Kb=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,wt,si,Cd,Mu,Ln={},hl={},Np,Up=function(e){return(hl=Xr(e,Ln))&&xn},Su=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Wa=function(e,t){return!t&&console.warn(e)},Op=function(e,t){return e&&(Ln[e]=t)&&hl&&(hl[e]=t)||Ln},Xa=function(){return 0},Zb={suppressEvents:!0,isStart:!0,kill:!1},Jo={suppressEvents:!0,kill:!1},Qb={suppressEvents:!0},Eu={},ns=[],Rd={},Fp,En={},Mc={},mf=30,$o=[],Tu="",wu=function(e){var t=e[0],n,s;if(hi(t)||It(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(s=$o.length;s--&&!$o[s].targetTest(t););n=$o[s]}for(s=e.length;s--;)e[s]&&(e[s]._gsap||(e[s]._gsap=new rm(e[s],n)))||e.splice(s,1);return e},Ns=function(e){return e._gsap||wu(Hn(e))[0]._gsap},Bp=function(e,t,n){return(n=e[t])&&It(n)?e[t]():yu(n)&&e.getAttribute&&e.getAttribute(t)||n},pn=function(e,t){return(e=e.split(",")).forEach(t)||e},Nt=function(e){return Math.round(e*1e5)/1e5||0},Tt=function(e){return Math.round(e*1e7)/1e7||0},Pr=function(e,t){var n=t.charAt(0),s=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+s:n==="-"?e-s:n==="*"?e*s:e/s},Jb=function(e,t){for(var n=t.length,s=0;e.indexOf(t[s])<0&&++s<n;);return s<n},fl=function(){var e=ns.length,t=ns.slice(0),n,s;for(Rd={},ns.length=0,n=0;n<e;n++)s=t[n],s&&s._lazy&&(s.render(s._lazy[0],s._lazy[1],!0)._lazy=0)},Au=function(e){return!!(e._initted||e._startAt||e.add)},kp=function(e,t,n,s){ns.length&&!jt&&fl(),e.render(t,n,!!(jt&&t<0&&Au(e))),ns.length&&!jt&&fl()},zp=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(jb).length<2?t:Wt(e)?e.trim():e},Hp=function(e){return e},In=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},$b=function(e){return function(t,n){for(var s in n)s in t||s==="duration"&&e||s==="ease"||(t[s]=n[s])}},Xr=function(e,t){for(var n in t)e[n]=t[n];return e},gf=function i(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=hi(t[n])?i(e[n]||(e[n]={}),t[n]):t[n]);return e},pl=function(e,t){var n={},s;for(s in e)s in t||(n[s]=e[s]);return n},Ca=function(e){var t=e.parent||wt,n=e.keyframes?$b(tn(e.keyframes)):In;if(fn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},eM=function(e,t){for(var n=e.length,s=n===t.length;s&&n--&&e[n]===t[n];);return n<0},Vp=function(e,t,n,s,r){var a=e[s],o;if(r)for(o=t[r];a&&a[r]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[s]=t,t._prev=a,t.parent=t._dp=e,t},Ul=function(e,t,n,s){n===void 0&&(n="_first"),s===void 0&&(s="_last");var r=t._prev,a=t._next;r?r._next=a:e[n]===t&&(e[n]=a),a?a._prev=r:e[s]===t&&(e[s]=r),t._next=t._prev=t.parent=null},as=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Us=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},tM=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Pd=function(e,t,n,s){return e._startAt&&(jt?e._startAt.revert(Jo):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,s))},nM=function i(e){return!e||e._ts&&i(e.parent)},vf=function(e){return e._repeat?Yr(e._tTime,e=e.duration()+e._rDelay)*e:0},Yr=function(e,t){var n=Math.floor(e=Tt(e/t));return e&&n===e?n-1:n},ml=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ol=function(e){return e._end=Tt(e._start+(e._tDur/Math.abs(e._ts||e._rts||dt)||0))},Fl=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Tt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ol(e),n._dirty||Us(n,e)),e},Gp=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=ml(e.rawTime(),t),(!t._dur||eo(0,t.totalDuration(),n)-t._tTime>dt)&&t.render(n,!0)),Us(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-dt}},oi=function(e,t,n,s){return t.parent&&as(t),t._start=Tt((Oi(n)?n:n||e!==wt?On(e,n,t):e._time)+t._delay),t._end=Tt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Vp(e,t,"_first","_last",e._sort?"_start":0),Ld(t)||(e._recent=t),s||Gp(e,t),e._ts<0&&Fl(e,e._tTime),e},Wp=function(e,t){return(Ln.ScrollTrigger||Su("scrollTrigger",t))&&Ln.ScrollTrigger.create(t,e)},Xp=function(e,t,n,s,r){if(Ru(e,t,r),!e._initted)return 1;if(!n&&e._pt&&!jt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Fp!==wn.frame)return ns.push(e),e._lazy=[r,s],1},iM=function i(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||i(t))},Ld=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},sM=function(e,t,n,s){var r=e.ratio,a=t<0||!t&&(!e._start&&iM(e)&&!(!e._initted&&Ld(e))||(e._ts<0||e._dp._ts<0)&&!Ld(e))?0:1,o=e._rDelay,l=0,c,d,u;if(o&&e._repeat&&(l=eo(0,e._tDur,t),d=Yr(l,o),e._yoyo&&d&1&&(a=1-a),d!==Yr(e._tTime,o)&&(r=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==r||jt||s||e._zTime===dt||!t&&e._zTime){if(!e._initted&&Xp(e,t,s,n,l))return;for(u=e._zTime,e._zTime=t||(n?dt:0),n||(n=t&&!u),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&Pd(e,t,n,!0),e._onUpdate&&!n&&An(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&An(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&as(e,1),!n&&!jt&&(An(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},rM=function(e,t,n){var s;if(n>t)for(s=e._first;s&&s._start<=n;){if(s.data==="isPause"&&s._start>t)return s;s=s._next}else for(s=e._last;s&&s._start>=n;){if(s.data==="isPause"&&s._start<t)return s;s=s._prev}},qr=function(e,t,n,s){var r=e._repeat,a=Tt(t)||0,o=e._tTime/e._tDur;return o&&!s&&(e._time*=a/e._dur),e._dur=a,e._tDur=r?r<0?1e10:Tt(a*(r+1)+e._rDelay*r):a,o>0&&!s&&Fl(e,e._tTime=e._tDur*o),e.parent&&Ol(e),n||Us(e.parent,e),e},xf=function(e){return e instanceof ln?Us(e):qr(e,e._dur)},aM={_start:0,endTime:Xa,totalDuration:Xa},On=function i(e,t,n){var s=e.labels,r=e._recent||aM,a=e.duration()>=zn?r.endTime(!1):e._dur,o,l,c;return Wt(t)&&(isNaN(t)||t in s)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?r:n).totalDuration()/100:1)):o<0?(t in s||(s[t]=a),s[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(tn(n)?n[0]:n).totalDuration()),o>1?i(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},Ra=function(e,t,n){var s=Oi(t[1]),r=(s?2:1)+(e<2?0:1),a=t[r],o,l;if(s&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=fn(l.vars.inherit)&&l.parent;a.immediateRender=fn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[r-1]}return new Ot(t[0],a,t[r+1])},ds=function(e,t){return e||e===0?t(e):t},eo=function(e,t,n){return n<e?e:n>t?t:n},$t=function(e,t){return!Wt(e)||!(t=Kb.exec(e))?"":t[1]},oM=function(e,t,n){return ds(n,function(s){return eo(e,t,s)})},Id=[].slice,Yp=function(e,t){return e&&hi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&hi(e[0]))&&!e.nodeType&&e!==si},lM=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(s){var r;return Wt(s)&&!t||Yp(s,1)?(r=n).push.apply(r,Hn(s)):n.push(s)})||n},Hn=function(e,t,n){return Mt&&!t&&Mt.selector?Mt.selector(e):Wt(e)&&!n&&(Cd||!jr())?Id.call((t||Mu).querySelectorAll(e),0):tn(e)?lM(e,n):Yp(e)?Id.call(e,0):e?[e]:[]},Dd=function(e){return e=Hn(e)[0]||Wa("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Hn(t,n.querySelectorAll?n:n===e?Wa("Invalid scope")||Mu.createElement("div"):e)}},qp=function(e){return e.sort(function(){return .5-Math.random()})},jp=function(e){if(It(e))return e;var t=hi(e)?e:{each:e},n=Os(t.ease),s=t.from||0,r=parseFloat(t.base)||0,a={},o=s>0&&s<1,l=isNaN(s)||o,c=t.axis,d=s,u=s;return Wt(s)?d=u={center:.5,edges:.5,end:1}[s]||0:!o&&l&&(d=s[0],u=s[1]),function(h,f,g){var v=(g||t).length,m=a[v],p,_,b,x,C,E,S,A,y;if(!m){if(y=t.grid==="auto"?0:(t.grid||[1,zn])[1],!y){for(S=-zn;S<(S=g[y++].getBoundingClientRect().left)&&y<v;);y<v&&y--}for(m=a[v]=[],p=l?Math.min(y,v)*d-.5:s%y,_=y===zn?0:l?v*u/y-.5:s/y|0,S=0,A=zn,E=0;E<v;E++)b=E%y-p,x=_-(E/y|0),m[E]=C=c?Math.abs(c==="y"?x:b):Pp(b*b+x*x),C>S&&(S=C),C<A&&(A=C);s==="random"&&qp(m),m.max=S-A,m.min=A,m.v=v=(parseFloat(t.amount)||parseFloat(t.each)*(y>v?v-1:c?c==="y"?v/y:y:Math.max(y,v/y))||0)*(s==="edges"?-1:1),m.b=v<0?r-v:r,m.u=$t(t.amount||t.each)||0,n=n&&v<0?bM(n):n}return v=(m[h]-m.min)/m.max||0,Tt(m.b+(n?n(v):v)*m.v)+m.u}},Nd=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var s=Tt(Math.round(parseFloat(n)/e)*e*t);return(s-s%1)/t+(Oi(n)?0:$t(n))}},Kp=function(e,t){var n=tn(e),s,r;return!n&&hi(e)&&(s=n=e.radius||zn,e.values?(e=Hn(e.values),(r=!Oi(e[0]))&&(s*=s)):e=Nd(e.increment)),ds(t,n?It(e)?function(a){return r=e(a),Math.abs(r-a)<=s?r:a}:function(a){for(var o=parseFloat(r?a.x:a),l=parseFloat(r?a.y:0),c=zn,d=0,u=e.length,h,f;u--;)r?(h=e[u].x-o,f=e[u].y-l,h=h*h+f*f):h=Math.abs(e[u]-o),h<c&&(c=h,d=u);return d=!s||c<=s?e[d]:a,r||d===a||Oi(a)?d:d+$t(a)}:Nd(e))},Zp=function(e,t,n,s){return ds(tn(e)?!t:n===!0?!!(n=0):!s,function(){return tn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(s=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*s)/s})},cM=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(s){return t.reduce(function(r,a){return a(r)},s)}},dM=function(e,t){return function(n){return e(parseFloat(n))+(t||$t(n))}},uM=function(e,t,n){return Jp(e,t,0,1,n)},Qp=function(e,t,n){return ds(n,function(s){return e[~~t(s)]})},hM=function i(e,t,n){var s=t-e;return tn(e)?Qp(e,i(0,e.length),t):ds(n,function(r){return(s+(r-e)%s)%s+e})},fM=function i(e,t,n){var s=t-e,r=s*2;return tn(e)?Qp(e,i(0,e.length-1),t):ds(n,function(a){return a=(r+(a-e)%r)%r||0,e+(a>s?r-a:a)})},Ya=function(e){return e.replace(Yb,function(t){var n=t.indexOf("[")+1,s=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(qb);return Zp(n?s:+s[0],n?0:+s[1],+s[2]||1e-5)})},Jp=function(e,t,n,s,r){var a=t-e,o=s-n;return ds(r,function(l){return n+((l-e)/a*o||0)})},pM=function i(e,t,n,s){var r=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!r){var a=Wt(e),o={},l,c,d,u,h;if(n===!0&&(s=1)&&(n=null),a)e={p:e},t={p:t};else if(tn(e)&&!tn(t)){for(d=[],u=e.length,h=u-2,c=1;c<u;c++)d.push(i(e[c-1],e[c]));u--,r=function(g){g*=u;var v=Math.min(h,~~g);return d[v](g-v)},n=t}else s||(e=Xr(tn(e)?[]:{},e));if(!d){for(l in t)Cu.call(o,e,l,"get",t[l]);r=function(g){return Iu(g,o)||(a?e.p:e)}}}return ds(n,r)},_f=function(e,t,n){var s=e.labels,r=zn,a,o,l;for(a in s)o=s[a]-t,o<0==!!n&&o&&r>(o=Math.abs(o))&&(l=a,r=o);return l},An=function(e,t,n){var s=e.vars,r=s[t],a=Mt,o=e._ctx,l,c,d;if(r)return l=s[t+"Params"],c=s.callbackScope||e,n&&ns.length&&fl(),o&&(Mt=o),d=l?r.apply(c,l):r.call(c),Mt=a,d},ya=function(e){return as(e),e.scrollTrigger&&e.scrollTrigger.kill(!!jt),e.progress()<1&&An(e,"onInterrupt"),e},mr,$p=[],em=function(e){if(e)if(e=!e.name&&e.default||e,bu()||e.headless){var t=e.name,n=It(e),s=t&&!n&&e.init?function(){this._props=[]}:e,r={init:Xa,render:Iu,add:Cu,kill:LM,modifier:PM,rawVars:0},a={targetTest:0,get:0,getSetter:Lu,aliases:{},register:0};if(jr(),e!==s){if(En[t])return;In(s,In(pl(e,r),a)),Xr(s.prototype,Xr(r,pl(e,a))),En[s.prop=t]=s,e.targetTest&&($o.push(s),Eu[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Op(t,s),e.register&&e.register(xn,s,mn)}else $p.push(e)},ct=255,ba={aqua:[0,ct,ct],lime:[0,ct,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ct],navy:[0,0,128],white:[ct,ct,ct],olive:[128,128,0],yellow:[ct,ct,0],orange:[ct,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ct,0,0],pink:[ct,192,203],cyan:[0,ct,ct],transparent:[ct,ct,ct,0]},Sc=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*ct+.5|0},tm=function(e,t,n){var s=e?Oi(e)?[e>>16,e>>8&ct,e&ct]:0:ba.black,r,a,o,l,c,d,u,h,f,g;if(!s){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),ba[e])s=ba[e];else if(e.charAt(0)==="#"){if(e.length<6&&(r=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+r+r+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return s=parseInt(e.substr(1,6),16),[s>>16,s>>8&ct,s&ct,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),s=[e>>16,e>>8&ct,e&ct]}else if(e.substr(0,3)==="hsl"){if(s=g=e.match(pf),!t)l=+s[0]%360/360,c=+s[1]/100,d=+s[2]/100,a=d<=.5?d*(c+1):d+c-d*c,r=d*2-a,s.length>3&&(s[3]*=1),s[0]=Sc(l+1/3,r,a),s[1]=Sc(l,r,a),s[2]=Sc(l-1/3,r,a);else if(~e.indexOf("="))return s=e.match(Ip),n&&s.length<4&&(s[3]=1),s}else s=e.match(pf)||ba.transparent;s=s.map(Number)}return t&&!g&&(r=s[0]/ct,a=s[1]/ct,o=s[2]/ct,u=Math.max(r,a,o),h=Math.min(r,a,o),d=(u+h)/2,u===h?l=c=0:(f=u-h,c=d>.5?f/(2-u-h):f/(u+h),l=u===r?(a-o)/f+(a<o?6:0):u===a?(o-r)/f+2:(r-a)/f+4,l*=60),s[0]=~~(l+.5),s[1]=~~(c*100+.5),s[2]=~~(d*100+.5)),n&&s.length<4&&(s[3]=1),s},nm=function(e){var t=[],n=[],s=-1;return e.split(is).forEach(function(r){var a=r.match(pr)||[];t.push.apply(t,a),n.push(s+=a.length+1)}),t.c=n,t},yf=function(e,t,n){var s="",r=(e+s).match(is),a=t?"hsla(":"rgba(",o=0,l,c,d,u;if(!r)return e;if(r=r.map(function(h){return(h=tm(h,t,1))&&a+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(d=nm(e),l=n.c,l.join(s)!==d.c.join(s)))for(c=e.replace(is,"1").split(pr),u=c.length-1;o<u;o++)s+=c[o]+(~l.indexOf(o)?r.shift()||a+"0,0,0,0)":(d.length?d:r.length?r:n).shift());if(!c)for(c=e.split(is),u=c.length-1;o<u;o++)s+=c[o]+r[o];return s+c[u]},is=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in ba)i+="|"+e+"\\b";return new RegExp(i+")","gi")}(),mM=/hsl[a]?\(/,im=function(e){var t=e.join(" "),n;if(is.lastIndex=0,is.test(t))return n=mM.test(t),e[1]=yf(e[1],n),e[0]=yf(e[0],n,nm(e[1])),!0},qa,wn=function(){var i=Date.now,e=500,t=33,n=i(),s=n,r=1e3/240,a=r,o=[],l,c,d,u,h,f,g=function v(m){var p=i()-s,_=m===!0,b,x,C,E;if((p>e||p<0)&&(n+=p-t),s+=p,C=s-n,b=C-a,(b>0||_)&&(E=++u.frame,h=C-u.time*1e3,u.time=C=C/1e3,a+=b+(b>=r?4:r-b),x=1),_||(l=c(v)),x)for(f=0;f<o.length;f++)o[f](C,h,E,m)};return u={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){Np&&(!Cd&&bu()&&(si=Cd=window,Mu=si.document||{},Ln.gsap=xn,(si.gsapVersions||(si.gsapVersions=[])).push(xn.version),Up(hl||si.GreenSockGlobals||!si.gsap&&si||{}),$p.forEach(em)),d=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&u.sleep(),c=d||function(m){return setTimeout(m,a-u.time*1e3+1|0)},qa=1,g(2))},sleep:function(){(d?cancelAnimationFrame:clearTimeout)(l),qa=0,c=Xa},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){r=1e3/(m||240),a=u.time*1e3+r},add:function(m,p,_){var b=p?function(x,C,E,S){m(x,C,E,S),u.remove(b)}:m;return u.remove(m),o[_?"unshift":"push"](b),jr(),b},remove:function(m,p){~(p=o.indexOf(m))&&o.splice(p,1)&&f>=p&&f--},_listeners:o},u}(),jr=function(){return!qa&&wn.wake()},Xe={},gM=/^[\d.\-M][\d.\-,\s]/,vM=/["']/g,xM=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),s=n[0],r=1,a=n.length,o,l,c;r<a;r++)l=n[r],o=r!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[s]=isNaN(c)?c.replace(vM,"").trim():+c,s=l.substr(o+1).trim();return t},_M=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),s=e.indexOf("(",t);return e.substring(t,~s&&s<n?e.indexOf(")",n+1):n)},yM=function(e){var t=(e+"").split("("),n=Xe[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[xM(t[1])]:_M(e).split(",").map(zp)):Xe._CE&&gM.test(e)?Xe._CE("",e):n},bM=function(e){return function(t){return 1-e(1-t)}},Os=function(e,t){return e&&(It(e)?e:Xe[e]||yM(e))||t},Ws=function(e,t,n,s){n===void 0&&(n=function(l){return 1-t(1-l)}),s===void 0&&(s=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var r={easeIn:t,easeOut:n,easeInOut:s},a;return pn(e,function(o){Xe[o]=Ln[o]=r,Xe[a=o.toLowerCase()]=n;for(var l in r)Xe[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Xe[o+"."+l]=r[l]}),r},sm=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Ec=function i(e,t,n){var s=t>=1?t:1,r=(n||(e?.3:.45))/(t<1?t:1),a=r/Ad*(Math.asin(1/s)||0),o=function(d){return d===1?1:s*Math.pow(2,-10*d)*Xb((d-a)*r)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:sm(o);return r=Ad/r,l.config=function(c,d){return i(e,c,d)},l},Tc=function i(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},s=e==="out"?n:e==="in"?function(r){return 1-n(1-r)}:sm(n);return s.config=function(r){return i(e,r)},s};pn("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var t=e<5?e+1:e;Ws(i+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});Xe.Linear.easeNone=Xe.none=Xe.Linear.easeIn;Ws("Elastic",Ec("in"),Ec("out"),Ec());(function(i,e){var t=1/e,n=2*t,s=2.5*t,r=function(o){return o<t?i*o*o:o<n?i*Math.pow(o-1.5/e,2)+.75:o<s?i*(o-=2.25/e)*o+.9375:i*Math.pow(o-2.625/e,2)+.984375};Ws("Bounce",function(a){return 1-r(1-a)},r)})(7.5625,2.75);Ws("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});Ws("Circ",function(i){return-(Pp(1-i*i)-1)});Ws("Sine",function(i){return i===1?1:-Wb(i*Vb)+1});Ws("Back",Tc("in"),Tc("out"),Tc());Xe.SteppedEase=Xe.steps=Ln.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,s=e+(t?0:1),r=t?1:0,a=1-dt;return function(o){return((s*eo(0,a,o)|0)+r)*n}}};Ga.ease=Xe["quad.out"];pn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return Tu+=i+","+i+"Params,"});var rm=function(e,t){this.id=Gb++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Bp,this.set=t?t.getSetter:Lu},ja=function(){function i(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,qr(this,+t.duration,1,1),this.data=t.data,Mt&&(this._ctx=Mt,Mt.data.push(this)),qa||wn.wake()}var e=i.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,qr(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,s){if(jr(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Fl(this,n),!r._dp||r.parent||Gp(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&oi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!s||this._initted&&Math.abs(this._zTime)===dt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),kp(this,n,s)),this},e.time=function(n,s){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+vf(this))%(this._dur+this._rDelay)||(n?this._dur:0),s):this._time},e.totalProgress=function(n,s){return arguments.length?this.totalTime(this.totalDuration()*n,s):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,s){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+vf(this),s):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,s){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,s):this._repeat?Yr(this._tTime,r)+1:1},e.timeScale=function(n,s){if(!arguments.length)return this._rts===-dt?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?ml(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-dt?0:this._rts,this.totalTime(eo(-Math.abs(this._delay),this.totalDuration(),r),s!==!1),Ol(this),tM(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(jr(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==dt&&(this._tTime-=dt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=Tt(n);var s=this.parent||this._dp;return s&&(s._sort||!this.parent)&&oi(s,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(fn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var s=this.parent||this._dp;return s?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?ml(s.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Qb);var s=jt;return jt=n,Au(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),jt=s,this},e.globalTime=function(n){for(var s=this,r=arguments.length?n:s.rawTime();s;)r=s._start+r/(Math.abs(s._ts)||1),s=s._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,xf(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var s=this._time;return this._rDelay=n,xf(this),s?this.time(s):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,s){return this.totalTime(On(this,n),fn(s))},e.restart=function(n,s){return this.play().totalTime(n?-this._delay:0,fn(s)),this._dur||(this._zTime=-dt),this},e.play=function(n,s){return n!=null&&this.seek(n,s),this.reversed(!1).paused(!1)},e.reverse=function(n,s){return n!=null&&this.seek(n||this.totalDuration(),s),this.reversed(!0).paused(!1)},e.pause=function(n,s){return n!=null&&this.seek(n,s),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-dt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-dt,this},e.isActive=function(){var n=this.parent||this._dp,s=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=s&&r<this.endTime(!0)-dt)},e.eventCallback=function(n,s,r){var a=this.vars;return arguments.length>1?(s?(a[n]=s,r&&(a[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=s)):delete a[n],this):a[n]},e.then=function(n){var s=this,r=s._prom;return new Promise(function(a){var o=It(n)?n:Hp,l=function(){var d=s.then;s.then=null,r&&r(),It(o)&&(o=o(s))&&(o.then||o===s)&&(s.then=d),a(o),s.then=d};s._initted&&s.totalProgress()===1&&s._ts>=0||!s._tTime&&s._ts<0?l():s._prom=l})},e.kill=function(){ya(this)},i}();In(ja.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-dt,_prom:0,_ps:!1,_rts:1});var ln=function(i){Rp(e,i);function e(n,s){var r;return n===void 0&&(n={}),r=i.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=fn(n.sortChildren),wt&&oi(n.parent||wt,Si(r),s),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&Wp(Si(r),n.scrollTrigger),r}var t=e.prototype;return t.to=function(s,r,a){return Ra(0,arguments,this),this},t.from=function(s,r,a){return Ra(1,arguments,this),this},t.fromTo=function(s,r,a,o){return Ra(2,arguments,this),this},t.set=function(s,r,a){return r.duration=0,r.parent=this,Ca(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new Ot(s,r,On(this,a),1),this},t.call=function(s,r,a){return oi(this,Ot.delayedCall(0,s,r),a)},t.staggerTo=function(s,r,a,o,l,c,d){return a.duration=r,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=d,a.parent=this,new Ot(s,a,On(this,l)),this},t.staggerFrom=function(s,r,a,o,l,c,d){return a.runBackwards=1,Ca(a).immediateRender=fn(a.immediateRender),this.staggerTo(s,r,a,o,l,c,d)},t.staggerFromTo=function(s,r,a,o,l,c,d,u){return o.startAt=a,Ca(o).immediateRender=fn(o.immediateRender),this.staggerTo(s,r,o,l,c,d,u)},t.render=function(s,r,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,d=s<=0?0:Tt(s),u=this._zTime<0!=s<0&&(this._initted||!c),h,f,g,v,m,p,_,b,x,C,E,S;if(this!==wt&&d>l&&s>=0&&(d=l),d!==this._tTime||a||u){if(o!==this._time&&c&&(d+=this._time-o,s+=this._time-o),h=d,x=this._start,b=this._ts,p=!b,u&&(c||(o=this._zTime),(s||!r)&&(this._zTime=s)),this._repeat){if(E=this._yoyo,m=c+this._rDelay,this._repeat<-1&&s<0)return this.totalTime(m*100+s,r,a);if(h=Tt(d%m),d===l?(v=this._repeat,h=c):(C=Tt(d/m),v=~~C,v&&v===C&&(h=c,v--),h>c&&(h=c)),C=Yr(this._tTime,m),!o&&this._tTime&&C!==v&&this._tTime-C*m-this._dur<=0&&(C=v),E&&v&1&&(h=c-h,S=1),v!==C&&!this._lock){var A=E&&C&1,y=A===(E&&v&1);if(v<C&&(A=!A),o=A?0:d%c?c:d,this._lock=1,this.render(o||(S?0:Tt(v*m)),r,!c)._lock=0,this._tTime=d,!r&&this.parent&&An(this,"onRepeat"),this.vars.repeatRefresh&&!S&&(this.invalidate()._lock=1,C=v),o&&o!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,y&&(this._lock=2,o=A?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!S&&this.invalidate()),this._lock=0,!this._ts&&!p)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(_=rM(this,Tt(o),Tt(h)),_&&(d-=h-(h=_._start))),this._tTime=d,this._time=h,this._act=!!b,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=s,o=0),!o&&d&&c&&!r&&!C&&(An(this,"onStart"),this._tTime!==d))return this;if(h>=o&&s>=0)for(f=this._first;f;){if(g=f._next,(f._act||h>=f._start)&&f._ts&&_!==f){if(f.parent!==this)return this.render(s,r,a);if(f.render(f._ts>0?(h-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(h-f._start)*f._ts,r,a),h!==this._time||!this._ts&&!p){_=0,g&&(d+=this._zTime=-dt);break}}f=g}else{f=this._last;for(var M=s<0?s:h;f;){if(g=f._prev,(f._act||M<=f._end)&&f._ts&&_!==f){if(f.parent!==this)return this.render(s,r,a);if(f.render(f._ts>0?(M-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(M-f._start)*f._ts,r,a||jt&&Au(f)),h!==this._time||!this._ts&&!p){_=0,g&&(d+=this._zTime=M?-dt:dt);break}}f=g}}if(_&&!r&&(this.pause(),_.render(h>=o?0:-dt)._zTime=h>=o?1:-1,this._ts))return this._start=x,Ol(this),this.render(s,r,a);this._onUpdate&&!r&&An(this,"onUpdate",!0),(d===l&&this._tTime>=this.totalDuration()||!d&&o)&&(x===this._start||Math.abs(b)!==Math.abs(this._ts))&&(this._lock||((s||!c)&&(d===l&&this._ts>0||!d&&this._ts<0)&&as(this,1),!r&&!(s<0&&!o)&&(d||o||!l)&&(An(this,d===l&&s>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(s,r){var a=this;if(Oi(r)||(r=On(this,r,s)),!(s instanceof ja)){if(tn(s))return s.forEach(function(o){return a.add(o,r)}),this;if(Wt(s))return this.addLabel(s,r);if(It(s))s=Ot.delayedCall(0,s);else return this}return this!==s?oi(this,s,r):this},t.getChildren=function(s,r,a,o){s===void 0&&(s=!0),r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=-zn);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Ot?r&&l.push(c):(a&&l.push(c),s&&l.push.apply(l,c.getChildren(!0,r,a)))),c=c._next;return l},t.getById=function(s){for(var r=this.getChildren(1,1,1),a=r.length;a--;)if(r[a].vars.id===s)return r[a]},t.remove=function(s){return Wt(s)?this.removeLabel(s):It(s)?this.killTweensOf(s):(s.parent===this&&Ul(this,s),s===this._recent&&(this._recent=this._last),Us(this))},t.totalTime=function(s,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Tt(wn.time-(this._ts>0?s/this._ts:(this.totalDuration()-s)/-this._ts))),i.prototype.totalTime.call(this,s,r),this._forcing=0,this):this._tTime},t.addLabel=function(s,r){return this.labels[s]=On(this,r),this},t.removeLabel=function(s){return delete this.labels[s],this},t.addPause=function(s,r,a){var o=Ot.delayedCall(0,r||Xa,a);return o.data="isPause",this._hasPause=1,oi(this,o,On(this,s))},t.removePause=function(s){var r=this._first;for(s=On(this,s);r;)r._start===s&&r.data==="isPause"&&as(r),r=r._next},t.killTweensOf=function(s,r,a){for(var o=this.getTweensOf(s,a),l=o.length;l--;)Zi!==o[l]&&o[l].kill(s,r);return this},t.getTweensOf=function(s,r){for(var a=[],o=Hn(s),l=this._first,c=Oi(r),d;l;)l instanceof Ot?Jb(l._targets,o)&&(c?(!Zi||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&a.push(l):(d=l.getTweensOf(o,r)).length&&a.push.apply(a,d),l=l._next;return a},t.tweenTo=function(s,r){r=r||{};var a=this,o=On(a,s),l=r,c=l.startAt,d=l.onStart,u=l.onStartParams,h=l.immediateRender,f,g=Ot.to(a,In({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||dt,onStart:function(){if(a.pause(),!f){var m=r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());g._dur!==m&&qr(g,m,0,1).render(g._time,!0,!0),f=1}d&&d.apply(g,u||[])}},r));return h?g.render(0):g},t.tweenFromTo=function(s,r,a){return this.tweenTo(r,In({startAt:{time:On(this,s)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(s){return s===void 0&&(s=this._time),_f(this,On(this,s))},t.previousLabel=function(s){return s===void 0&&(s=this._time),_f(this,On(this,s),1)},t.currentLabel=function(s){return arguments.length?this.seek(s,!0):this.previousLabel(this._time+dt)},t.shiftChildren=function(s,r,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(s=Tt(s);o;)o._start>=a&&(o._start+=s,o._end+=s),o=o._next;if(r)for(c in l)l[c]>=a&&(l[c]+=s);return Us(this)},t.invalidate=function(s){var r=this._first;for(this._lock=0;r;)r.invalidate(s),r=r._next;return i.prototype.invalidate.call(this,s)},t.clear=function(s){s===void 0&&(s=!0);for(var r=this._first,a;r;)a=r._next,this.remove(r),r=a;return this._dp&&(this._time=this._tTime=this._pTime=0),s&&(this.labels={}),Us(this)},t.totalDuration=function(s){var r=0,a=this,o=a._last,l=zn,c,d,u;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-s:s));if(a._dirty){for(u=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),d=o._start,d>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,oi(a,o,d-o._delay,1)._lock=0):l=d,d<0&&o._ts&&(r-=d,(!u&&!a._dp||u&&u.smoothChildTiming)&&(a._start+=Tt(d/a._ts),a._time-=d,a._tTime-=d),a.shiftChildren(-d,!1,-1/0),l=0),o._end>r&&o._ts&&(r=o._end),o=c;qr(a,a===wt&&a._time>r?a._time:r,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(s){if(wt._ts&&(kp(wt,ml(s,wt)),Fp=wn.frame),wn.frame>=mf){mf+=Rn.autoSleep||120;var r=wt._first;if((!r||!r._ts)&&Rn.autoSleep&&wn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||wn.sleep()}}},e}(ja);In(ln.prototype,{_lock:0,_hasPause:0,_forcing:0});var MM=function(e,t,n,s,r,a,o){var l=new mn(this._pt,e,t,0,1,um,null,r),c=0,d=0,u,h,f,g,v,m,p,_;for(l.b=n,l.e=s,n+="",s+="",(p=~s.indexOf("random("))&&(s=Ya(s)),a&&(_=[n,s],a(_,e,t),n=_[0],s=_[1]),h=n.match(bc)||[];u=bc.exec(s);)g=u[0],v=s.substring(c,u.index),f?f=(f+1)%5:v.substr(-5)==="rgba("&&(f=1),g!==h[d++]&&(m=parseFloat(h[d-1])||0,l._pt={_next:l._pt,p:v||d===1?v:",",s:m,c:g.charAt(1)==="="?Pr(m,g)-m:parseFloat(g)-m,m:f&&f<4?Math.round:0},c=bc.lastIndex);return l.c=c<s.length?s.substring(c,s.length):"",l.fp=o,(Dp.test(s)||p)&&(l.e=0),this._pt=l,l},Cu=function(e,t,n,s,r,a,o,l,c,d){It(s)&&(s=s(r||0,e,a));var u=e[t],h=n!=="get"?n:It(u)?c?e[t.indexOf("set")||!It(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():u,f=It(u)?c?AM:cm:Pu,g;if(Wt(s)&&(~s.indexOf("random(")&&(s=Ya(s)),s.charAt(1)==="="&&(g=Pr(h,s)+($t(h)||0),(g||g===0)&&(s=g))),!d||h!==s||Ud)return!isNaN(h*s)&&s!==""?(g=new mn(this._pt,e,t,+h||0,s-(h||0),typeof u=="boolean"?RM:dm,0,f),c&&(g.fp=c),o&&g.modifier(o,this,e),this._pt=g):(!u&&!(t in e)&&Su(t,s),MM.call(this,e,t,h,s,f,l||Rn.stringFilter,c))},SM=function(e,t,n,s,r){if(It(e)&&(e=Pa(e,r,t,n,s)),!hi(e)||e.style&&e.nodeType||tn(e)||Lp(e))return Wt(e)?Pa(e,r,t,n,s):e;var a={},o;for(o in e)a[o]=Pa(e[o],r,t,n,s);return a},am=function(e,t,n,s,r,a){var o,l,c,d;if(En[e]&&(o=new En[e]).init(r,o.rawVars?t[e]:SM(t[e],s,r,a,n),n,s,a)!==!1&&(n._pt=l=new mn(n._pt,r,e,0,1,o.render,o,0,o.priority),n!==mr))for(c=n._ptLookup[n._targets.indexOf(r)],d=o._props.length;d--;)c[o._props[d]]=l;return o},Zi,Ud,Ru=function i(e,t,n){var s=e.vars,r=s.ease,a=s.startAt,o=s.immediateRender,l=s.lazy,c=s.onUpdate,d=s.runBackwards,u=s.yoyoEase,h=s.keyframes,f=s.autoRevert,g=e._dur,v=e._startAt,m=e._targets,p=e.parent,_=p&&p.data==="nested"?p.vars.targets:m,b=e._overwrite==="auto"&&!_u,x=e.timeline,C=s.easeReverse||u,E,S,A,y,M,L,U,O,H,W,V,j,z;if(x&&(!h||!r)&&(r="none"),e._ease=Os(r,Ga.ease),e._rEase=C&&(Os(C)||e._ease),e._from=!x&&!!s.runBackwards,e._from&&(e.ratio=1),!x||h&&!s.stagger){if(O=m[0]?Ns(m[0]).harness:0,j=O&&s[O.prop],E=pl(s,Eu),v&&(v._zTime<0&&v.progress(1),t<0&&d&&o&&!f?v.render(-1,!0):v.revert(d&&g?Jo:Zb),v._lazy=0),a){if(as(e._startAt=Ot.set(m,In({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!v&&fn(l),startAt:null,delay:0,onUpdate:c&&function(){return An(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(jt||!o&&!f)&&e._startAt.revert(Jo),o&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(d&&g&&!v){if(t&&(o=!1),A=In({overwrite:!1,data:"isFromStart",lazy:o&&!v&&fn(l),immediateRender:o,stagger:0,parent:p},E),j&&(A[O.prop]=j),as(e._startAt=Ot.set(m,A)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(jt?e._startAt.revert(Jo):e._startAt.render(-1,!0)),e._zTime=t,!o)i(e._startAt,dt,dt);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&fn(l)||l&&!g,S=0;S<m.length;S++){if(M=m[S],U=M._gsap||wu(m)[S]._gsap,e._ptLookup[S]=W={},Rd[U.id]&&ns.length&&fl(),V=_===m?S:_.indexOf(M),O&&(H=new O).init(M,j||E,e,V,_)!==!1&&(e._pt=y=new mn(e._pt,M,H.name,0,1,H.render,H,0,H.priority),H._props.forEach(function(re){W[re]=y}),H.priority&&(L=1)),!O||j)for(A in E)En[A]&&(H=am(A,E,e,V,M,_))?H.priority&&(L=1):W[A]=y=Cu.call(e,M,A,"get",E[A],V,_,0,s.stringFilter);e._op&&e._op[S]&&e.kill(M,e._op[S]),b&&e._pt&&(Zi=e,wt.killTweensOf(M,W,e.globalTime(t)),z=!e.parent,Zi=0),e._pt&&l&&(Rd[U.id]=1)}L&&hm(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!z,h&&t<=0&&x.render(zn,!0,!0)},EM=function(e,t,n,s,r,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],d,u,h,f;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,f=e._targets.length;f--;){if(d=h[f][t],d&&d.d&&d.d._pt)for(d=d.d._pt;d&&d.p!==t&&d.fp!==t;)d=d._next;if(!d)return Ud=1,e.vars[t]="+=0",Ru(e,o),Ud=0,l?Wa(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(d)}for(f=c.length;f--;)u=c[f],d=u._pt||u,d.s=(s||s===0)&&!r?s:d.s+(s||0)+a*d.c,d.c=n-d.s,u.e&&(u.e=Nt(n)+$t(u.e)),u.b&&(u.b=d.s+$t(u.b))},TM=function(e,t){var n=e[0]?Ns(e[0]).harness:0,s=n&&n.aliases,r,a,o,l;if(!s)return t;r=Xr({},t);for(a in s)if(a in r)for(l=s[a].split(","),o=l.length;o--;)r[l[o]]=r[a];return r},wM=function(e,t,n,s){var r=t.ease||s||"power1.inOut",a,o;if(tn(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:r})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:r})},Pa=function(e,t,n,s,r){return It(e)?e.call(t,n,s,r):Wt(e)&&~e.indexOf("random(")?Ya(e):e},om=Tu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",lm={};pn(om+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return lm[i]=1});var Ot=function(i){Rp(e,i);function e(n,s,r,a){var o;typeof s=="number"&&(r.duration=s,s=r,r=null),o=i.call(this,a?s:Ca(s))||this;var l=o.vars,c=l.duration,d=l.delay,u=l.immediateRender,h=l.stagger,f=l.overwrite,g=l.keyframes,v=l.defaults,m=l.scrollTrigger,p=s.parent||wt,_=(tn(n)||Lp(n)?Oi(n[0]):"length"in s)?[n]:Hn(n),b,x,C,E,S,A,y,M;if(o._targets=_.length?wu(_):Wa("GSAP target "+n+" not found. https://gsap.com",!Rn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,g||h||Bo(c)||Bo(d)){s=o.vars;var L=s.easeReverse||s.yoyoEase;if(b=o.timeline=new ln({data:"nested",defaults:v||{},targets:p&&p.data==="nested"?p.vars.targets:_}),b.kill(),b.parent=b._dp=Si(o),b._start=0,h||Bo(c)||Bo(d)){if(E=_.length,y=h&&jp(h),hi(h))for(S in h)~om.indexOf(S)&&(M||(M={}),M[S]=h[S]);for(x=0;x<E;x++)C=pl(s,lm),C.stagger=0,L&&(C.easeReverse=L),M&&Xr(C,M),A=_[x],C.duration=+Pa(c,Si(o),x,A,_),C.delay=(+Pa(d,Si(o),x,A,_)||0)-o._delay,!h&&E===1&&C.delay&&(o._delay=d=C.delay,o._start+=d,C.delay=0),b.to(A,C,y?y(x,A,_):0),b._ease=Xe.none;b.duration()?c=d=0:o.timeline=0}else if(g){Ca(In(b.vars.defaults,{ease:"none"})),b._ease=Os(g.ease||s.ease||"none");var U=0,O,H,W;if(tn(g))g.forEach(function(V){return b.to(_,V,">")}),b.duration();else{C={};for(S in g)S==="ease"||S==="easeEach"||wM(S,g[S],C,g.easeEach);for(S in C)for(O=C[S].sort(function(V,j){return V.t-j.t}),U=0,x=0;x<O.length;x++)H=O[x],W={ease:H.e,duration:(H.t-(x?O[x-1].t:0))/100*c},W[S]=H.v,b.to(_,W,U),U+=W.duration;b.duration()<c&&b.to({},{duration:c-b.duration()})}}c||o.duration(c=b.duration())}else o.timeline=0;return f===!0&&!_u&&(Zi=Si(o),wt.killTweensOf(_),Zi=0),oi(p,Si(o),r),s.reversed&&o.reverse(),s.paused&&o.paused(!0),(u||!c&&!g&&o._start===Tt(p._time)&&fn(u)&&nM(Si(o))&&p.data!=="nested")&&(o._tTime=-dt,o.render(Math.max(0,-d)||0)),m&&Wp(Si(o),m),o}var t=e.prototype;return t.render=function(s,r,a){var o=this._time,l=this._tDur,c=this._dur,d=s<0,u=s>l-dt&&!d?l:s<dt?0:s,h,f,g,v,m,p,_,b;if(!c)sM(this,s,r,a);else if(u!==this._tTime||!s||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==d||this._lazy){if(h=u,b=this.timeline,this._repeat){if(v=c+this._rDelay,this._repeat<-1&&d)return this.totalTime(v*100+s,r,a);if(h=Tt(u%v),u===l?(g=this._repeat,h=c):(m=Tt(u/v),g=~~m,g&&g===m?(h=c,g--):h>c&&(h=c)),p=this._yoyo&&g&1,p&&(h=c-h),m=Yr(this._tTime,v),h===o&&!a&&this._initted&&g===m)return this._tTime=u,this;g!==m&&this.vars.repeatRefresh&&!p&&!this._lock&&h!==v&&this._initted&&(this._lock=a=1,this.render(Tt(v*g),!0).invalidate()._lock=0)}if(!this._initted){if(Xp(this,d?s:h,a,r,u))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(s,r,a)}if(this._rEase){var x=h<o;if(x!==this._inv){var C=x?o:c-o;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=C?(x?-1:1)/C:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=_=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=_=this._ease(h/c);if(this._from&&(this.ratio=_=1-_),this._tTime=u,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&u&&!r&&!m&&(An(this,"onStart"),this._tTime!==u))return this;for(f=this._pt;f;)f.r(_,f.d),f=f._next;b&&b.render(s<0?s:b._dur*b._ease(h/this._dur),r,a)||this._startAt&&(this._zTime=s),this._onUpdate&&!r&&(d&&Pd(this,s,r,a),An(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!r&&this.parent&&An(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(d&&!this._onUpdate&&Pd(this,s,!0,!0),(s||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&as(this,1),!r&&!(d&&!o)&&(u||o||p)&&(An(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(s){return(!s||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(s),i.prototype.invalidate.call(this,s)},t.resetTo=function(s,r,a,o,l){qa||wn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),d;return this._initted||Ru(this,c),d=this._ease(c/this._dur),EM(this,s,r,a,o,d,c,l)?this.resetTo(s,r,a,o,1):(Fl(this,0),this.parent||Vp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(s,r){if(r===void 0&&(r="all"),!s&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?ya(this):this.scrollTrigger&&this.scrollTrigger.kill(!!jt),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(s,r,Zi&&Zi.vars.overwrite!==!0)._first||ya(this),this.parent&&a!==this.timeline.totalDuration()&&qr(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=s?Hn(s):o,c=this._ptLookup,d=this._pt,u,h,f,g,v,m,p;if((!r||r==="all")&&eM(o,l))return r==="all"&&(this._pt=0),ya(this);for(u=this._op=this._op||[],r!=="all"&&(Wt(r)&&(v={},pn(r,function(_){return v[_]=1}),r=v),r=TM(o,r)),p=o.length;p--;)if(~l.indexOf(o[p])){h=c[p],r==="all"?(u[p]=r,g=h,f={}):(f=u[p]=u[p]||{},g=r);for(v in g)m=h&&h[v],m&&((!("kill"in m.d)||m.d.kill(v)===!0)&&Ul(this,m,"_pt"),delete h[v]),f!=="all"&&(f[v]=1)}return this._initted&&!this._pt&&d&&ya(this),this},e.to=function(s,r){return new e(s,r,arguments[2])},e.from=function(s,r){return Ra(1,arguments)},e.delayedCall=function(s,r,a,o){return new e(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:s,onComplete:r,onReverseComplete:r,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(s,r,a){return Ra(2,arguments)},e.set=function(s,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new e(s,r)},e.killTweensOf=function(s,r,a){return wt.killTweensOf(s,r,a)},e}(ja);In(Ot.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});pn("staggerTo,staggerFrom,staggerFromTo",function(i){Ot[i]=function(){var e=new ln,t=Id.call(arguments,0);return t.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,t)}});var Pu=function(e,t,n){return e[t]=n},cm=function(e,t,n){return e[t](n)},AM=function(e,t,n,s){return e[t](s.fp,n)},CM=function(e,t,n){return e.setAttribute(t,n)},Lu=function(e,t){return It(e[t])?cm:yu(e[t])&&e.setAttribute?CM:Pu},dm=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},RM=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},um=function(e,t){var n=t._pt,s="";if(!e&&t.b)s=t.b;else if(e===1&&t.e)s=t.e;else{for(;n;)s=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+s,n=n._next;s+=t.c}t.set(t.t,t.p,s,t)},Iu=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},PM=function(e,t,n,s){for(var r=this._pt,a;r;)a=r._next,r.p===s&&r.modifier(e,t,n),r=a},LM=function(e){for(var t=this._pt,n,s;t;)s=t._next,t.p===e&&!t.op||t.op===e?Ul(this,t,"_pt"):t.dep||(n=1),t=s;return!n},IM=function(e,t,n,s){s.mSet(e,t,s.m.call(s.tween,n,s.mt),s)},hm=function(e){for(var t=e._pt,n,s,r,a;t;){for(n=t._next,s=r;s&&s.pr>t.pr;)s=s._next;(t._prev=s?s._prev:a)?t._prev._next=t:r=t,(t._next=s)?s._prev=t:a=t,t=n}e._pt=r},mn=function(){function i(t,n,s,r,a,o,l,c,d){this.t=n,this.s=r,this.c=a,this.p=s,this.r=o||dm,this.d=l||this,this.set=c||Pu,this.pr=d||0,this._next=t,t&&(t._prev=this)}var e=i.prototype;return e.modifier=function(n,s,r){this.mSet=this.mSet||this.set,this.set=IM,this.m=n,this.mt=r,this.tween=s},i}();pn(Tu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(i){return Eu[i]=1});Ln.TweenMax=Ln.TweenLite=Ot;Ln.TimelineLite=Ln.TimelineMax=ln;wt=new ln({sortChildren:!1,defaults:Ga,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Rn.stringFilter=im;var Fs=[],el={},DM=[],bf=0,NM=0,wc=function(e){return(el[e]||DM).map(function(t){return t()})},Od=function(){var e=Date.now(),t=[];e-bf>2&&(wc("matchMediaInit"),Fs.forEach(function(n){var s=n.queries,r=n.conditions,a,o,l,c;for(o in s)a=si.matchMedia(s[o]).matches,a&&(l=1),a!==r[o]&&(r[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),wc("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(s){return n.add(null,s)})}),bf=e,wc("matchMedia"))},fm=function(){function i(t,n){this.selector=n&&Dd(n),this.data=[],this._r=[],this.isReverted=!1,this.id=NM++,t&&this.add(t)}var e=i.prototype;return e.add=function(n,s,r){It(n)&&(r=s,s=n,n=It);var a=this,o=function(){var c=Mt,d=a.selector,u;return c&&c!==a&&c.data.push(a),r&&(a.selector=Dd(r)),Mt=a,u=s.apply(a,arguments),It(u)&&a._r.push(u),Mt=c,a.selector=d,a.isReverted=!1,u};return a.last=o,n===It?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var s=Mt;Mt=null,n(this),Mt=s},e.getTweens=function(){var n=[];return this.data.forEach(function(s){return s instanceof i?n.push.apply(n,s.getTweens()):s instanceof Ot&&!(s.parent&&s.parent.data==="nested")&&n.push(s)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,s){var r=this;if(n?function(){for(var o=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(d){return o.splice(o.indexOf(d),1)}));for(o.map(function(d){return{g:d._dur||d._delay||d._sat&&!d._sat.vars.immediateRender?d.globalTime(0):-1/0,t:d}}).sort(function(d,u){return u.g-d.g||-1/0}).forEach(function(d){return d.t.revert(n)}),l=r.data.length;l--;)c=r.data[l],c instanceof ln?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ot)&&c.revert&&c.revert(n);r._r.forEach(function(d){return d(n,r)}),r.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),s)for(var a=Fs.length;a--;)Fs[a].id===this.id&&Fs.splice(a,1)},e.revert=function(n){this.kill(n||{})},i}(),UM=function(){function i(t){this.contexts=[],this.scope=t,Mt&&Mt.data.push(this)}var e=i.prototype;return e.add=function(n,s,r){hi(n)||(n={matches:n});var a=new fm(0,r||this.scope),o=a.conditions={},l,c,d;Mt&&!a.selector&&(a.selector=Mt.selector),this.contexts.push(a),s=a.add("onMatch",s),a.queries=n;for(c in n)c==="all"?d=1:(l=si.matchMedia(n[c]),l&&(Fs.indexOf(a)<0&&Fs.push(a),(o[c]=l.matches)&&(d=1),l.addListener?l.addListener(Od):l.addEventListener("change",Od)));return d&&s(a,function(u){return a.add(null,u)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(s){return s.kill(n,!0)})},i}(),gl={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(s){return em(s)})},timeline:function(e){return new ln(e)},getTweensOf:function(e,t){return wt.getTweensOf(e,t)},getProperty:function(e,t,n,s){Wt(e)&&(e=Hn(e)[0]);var r=Ns(e||{}).get,a=n?Hp:zp;return n==="native"&&(n=""),e&&(t?a((En[t]&&En[t].get||r)(e,t,n,s)):function(o,l,c){return a((En[o]&&En[o].get||r)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=Hn(e),e.length>1){var s=e.map(function(d){return xn.quickSetter(d,t,n)}),r=s.length;return function(d){for(var u=r;u--;)s[u](d)}}e=e[0]||{};var a=En[t],o=Ns(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(d){var u=new a;mr._pt=0,u.init(e,n?d+n:d,mr,0,[e]),u.render(1,u),mr._pt&&Iu(1,mr)}:o.set(e,l);return a?c:function(d){return c(e,l,n?d+n:d,o,1)}},quickTo:function(e,t,n){var s,r=xn.to(e,In((s={},s[t]="+=0.1",s.paused=!0,s.stagger=0,s),n||{})),a=function(l,c,d){return r.resetTo(t,l,c,d)};return a.tween=r,a},isTweening:function(e){return wt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Os(e.ease,Ga.ease)),gf(Ga,e||{})},config:function(e){return gf(Rn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,s=e.plugins,r=e.defaults,a=e.extendTimeline;(s||"").split(",").forEach(function(o){return o&&!En[o]&&!Ln[o]&&Wa(t+" effect requires "+o+" plugin.")}),Mc[t]=function(o,l,c){return n(Hn(o),In(l||{},r),c)},a&&(ln.prototype[t]=function(o,l,c){return this.add(Mc[t](o,hi(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){Xe[e]=Os(t)},parseEase:function(e,t){return arguments.length?Os(e,t):Xe},getById:function(e){return wt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new ln(e),s,r;for(n.smoothChildTiming=fn(e.smoothChildTiming),wt.remove(n),n._dp=0,n._time=n._tTime=wt._time,s=wt._first;s;)r=s._next,(t||!(!s._dur&&s instanceof Ot&&s.vars.onComplete===s._targets[0]))&&oi(n,s,s._start-s._delay),s=r;return oi(wt,n,0),n},context:function(e,t){return e?new fm(e,t):Mt},matchMedia:function(e){return new UM(e)},matchMediaRefresh:function(){return Fs.forEach(function(e){var t=e.conditions,n,s;for(s in t)t[s]&&(t[s]=!1,n=1);n&&e.revert()})||Od()},addEventListener:function(e,t){var n=el[e]||(el[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=el[e],s=n&&n.indexOf(t);s>=0&&n.splice(s,1)},utils:{wrap:hM,wrapYoyo:fM,distribute:jp,random:Zp,snap:Kp,normalize:uM,getUnit:$t,clamp:oM,splitColor:tm,toArray:Hn,selector:Dd,mapRange:Jp,pipe:cM,unitize:dM,interpolate:pM,shuffle:qp},install:Up,effects:Mc,ticker:wn,updateRoot:ln.updateRoot,plugins:En,globalTimeline:wt,core:{PropTween:mn,globals:Op,Tween:Ot,Timeline:ln,Animation:ja,getCache:Ns,_removeLinkedListItem:Ul,reverting:function(){return jt},context:function(e){return e&&Mt&&(Mt.data.push(e),e._ctx=Mt),Mt},suppressOverwrites:function(e){return _u=e}}};pn("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return gl[i]=Ot[i]});wn.add(ln.updateRoot);mr=gl.to({},{duration:0});var OM=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},FM=function(e,t){var n=e._targets,s,r,a;for(s in t)for(r=n.length;r--;)a=e._ptLookup[r][s],a&&(a=a.d)&&(a._pt&&(a=OM(a,s)),a&&a.modifier&&a.modifier(t[s],e,n[r],s))},Ac=function(e,t){return{name:e,headless:1,rawVars:1,init:function(s,r,a){a._onInit=function(o){var l,c;if(Wt(r)&&(l={},pn(r,function(d){return l[d]=1}),r=l),t){l={};for(c in r)l[c]=t(r[c]);r=l}FM(o,r)}}}},xn=gl.registerPlugin({name:"attr",init:function(e,t,n,s,r){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],s,r,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)jt?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Ac("roundProps",Nd),Ac("modifiers"),Ac("snap",Kp))||gl;Ot.version=ln.version=xn.version="3.15.0";Np=1;bu()&&jr();Xe.Power0;Xe.Power1;Xe.Power2;Xe.Power3;Xe.Power4;Xe.Linear;Xe.Quad;Xe.Cubic;Xe.Quart;Xe.Quint;Xe.Strong;Xe.Elastic;Xe.Back;Xe.SteppedEase;Xe.Bounce;Xe.Sine;Xe.Expo;Xe.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Mf,Qi,Lr,Du,Ls,Sf,Nu,BM=function(){return typeof window<"u"},Fi={},Es=180/Math.PI,Ir=Math.PI/180,or=Math.atan2,Ef=1e8,Uu=/([A-Z])/g,kM=/(left|right|width|margin|padding|x)/i,zM=/[\s,\(]\S/,ci={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Fd=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},HM=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},VM=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},GM=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},WM=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},pm=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},mm=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},XM=function(e,t,n){return e.style[t]=n},YM=function(e,t,n){return e.style.setProperty(t,n)},qM=function(e,t,n){return e._gsap[t]=n},jM=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},KM=function(e,t,n,s,r){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(r,a)},ZM=function(e,t,n,s,r){var a=e._gsap;a[t]=n,a.renderTransform(r,a)},At="transform",gn=At+"Origin",QM=function i(e,t){var n=this,s=this.target,r=s.style,a=s._gsap;if(e in Fi&&r){if(this.tfm=this.tfm||{},e!=="transform")e=ci[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=Ei(s,o)}):this.tfm[e]=a.x?a[e]:Ei(s,e),e===gn&&(this.tfm.zOrigin=a.zOrigin);else return ci.transform.split(",").forEach(function(o){return i.call(n,o,t)});if(this.props.indexOf(At)>=0)return;a.svg&&(this.svgo=s.getAttribute("data-svg-origin"),this.props.push(gn,t,"")),e=At}(r||t)&&this.props.push(e,t,r[e])},gm=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},JM=function(){var e=this.props,t=this.target,n=t.style,s=t._gsap,r,a;for(r=0;r<e.length;r+=3)e[r+1]?e[r+1]===2?t[e[r]](e[r+2]):t[e[r]]=e[r+2]:e[r+2]?n[e[r]]=e[r+2]:n.removeProperty(e[r].substr(0,2)==="--"?e[r]:e[r].replace(Uu,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)s[a]=this.tfm[a];s.svg&&(s.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),r=Nu(),(!r||!r.isStart)&&!n[At]&&(gm(n),s.zOrigin&&n[gn]&&(n[gn]+=" "+s.zOrigin+"px",s.zOrigin=0,s.renderTransform()),s.uncache=1)}},vm=function(e,t){var n={target:e,props:[],revert:JM,save:QM};return e._gsap||xn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(s){return n.save(s)}),n},xm,Bd=function(e,t){var n=Qi.createElementNS?Qi.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Qi.createElement(e);return n&&n.style?n:Qi.createElement(e)},Cn=function i(e,t,n){var s=getComputedStyle(e);return s[t]||s.getPropertyValue(t.replace(Uu,"-$1").toLowerCase())||s.getPropertyValue(t)||!n&&i(e,Kr(t)||t,1)||""},Tf="O,Moz,ms,Ms,Webkit".split(","),Kr=function(e,t,n){var s=t||Ls,r=s.style,a=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(Tf[a]+e in r););return a<0?null:(a===3?"ms":a>=0?Tf[a]:"")+e},kd=function(){BM()&&window.document&&(Mf=window,Qi=Mf.document,Lr=Qi.documentElement,Ls=Bd("div")||{style:{}},Bd("div"),At=Kr(At),gn=At+"Origin",Ls.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",xm=!!Kr("perspective"),Nu=xn.core.reverting,Du=1)},wf=function(e){var t=e.ownerSVGElement,n=Bd("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),s=e.cloneNode(!0),r;s.style.display="block",n.appendChild(s),Lr.appendChild(n);try{r=s.getBBox()}catch{}return n.removeChild(s),Lr.removeChild(n),r},Af=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},_m=function(e){var t,n;try{t=e.getBBox()}catch{t=wf(e),n=1}return t&&(t.width||t.height)||n||(t=wf(e)),t&&!t.width&&!t.x&&!t.y?{x:+Af(e,["x","cx","x1"])||0,y:+Af(e,["y","cy","y1"])||0,width:0,height:0}:t},ym=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&_m(e))},os=function(e,t){if(t){var n=e.style,s;t in Fi&&t!==gn&&(t=At),n.removeProperty?(s=t.substr(0,2),(s==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(s==="--"?t:t.replace(Uu,"-$1").toLowerCase())):n.removeAttribute(t)}},Ji=function(e,t,n,s,r,a){var o=new mn(e._pt,t,n,0,1,a?mm:pm);return e._pt=o,o.b=s,o.e=r,e._props.push(n),o},Cf={deg:1,rad:1,turn:1},$M={grid:1,flex:1},ls=function i(e,t,n,s){var r=parseFloat(n)||0,a=(n+"").trim().substr((r+"").length)||"px",o=Ls.style,l=kM.test(t),c=e.tagName.toLowerCase()==="svg",d=(c?"client":"offset")+(l?"Width":"Height"),u=100,h=s==="px",f=s==="%",g,v,m,p;if(s===a||!r||Cf[s]||Cf[a])return r;if(a!=="px"&&!h&&(r=i(e,t,n,"px")),p=e.getCTM&&ym(e),(f||a==="%")&&(Fi[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[d],Nt(f?r/g*u:r/100*g);if(o[l?"width":"height"]=u+(h?a:s),v=s!=="rem"&&~t.indexOf("adius")||s==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(v=(e.ownerSVGElement||{}).parentNode),(!v||v===Qi||!v.appendChild)&&(v=Qi.body),m=v._gsap,m&&f&&m.width&&l&&m.time===wn.time&&!m.uncache)return Nt(r/m.width*u);if(f&&(t==="height"||t==="width")){var _=e.style[t];e.style[t]=u+s,g=e[d],_?e.style[t]=_:os(e,t)}else(f||a==="%")&&!$M[Cn(v,"display")]&&(o.position=Cn(e,"position")),v===e&&(o.position="static"),v.appendChild(Ls),g=Ls[d],v.removeChild(Ls),o.position="absolute";return l&&f&&(m=Ns(v),m.time=wn.time,m.width=v[d]),Nt(h?g*r/u:g&&r?u/g*r:0)},Ei=function(e,t,n,s){var r;return Du||kd(),t in ci&&t!=="transform"&&(t=ci[t],~t.indexOf(",")&&(t=t.split(",")[0])),Fi[t]&&t!=="transform"?(r=Za(e,s),r=t!=="transformOrigin"?r[t]:r.svg?r.origin:xl(Cn(e,gn))+" "+r.zOrigin+"px"):(r=e.style[t],(!r||r==="auto"||s||~(r+"").indexOf("calc("))&&(r=vl[t]&&vl[t](e,t,n)||Cn(e,t)||Bp(e,t)||(t==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?ls(e,t,r,n)+n:r},eS=function(e,t,n,s){if(!n||n==="none"){var r=Kr(t,e,1),a=r&&Cn(e,r,1);a&&a!==n?(t=r,n=a):t==="borderColor"&&(n=Cn(e,"borderTopColor"))}var o=new mn(this._pt,e.style,t,0,1,um),l=0,c=0,d,u,h,f,g,v,m,p,_,b,x,C;if(o.b=n,o.e=s,n+="",s+="",s.substring(0,6)==="var(--"&&(s=Cn(e,s.substring(4,s.indexOf(")")))),s==="auto"&&(v=e.style[t],e.style[t]=s,s=Cn(e,t)||s,v?e.style[t]=v:os(e,t)),d=[n,s],im(d),n=d[0],s=d[1],h=n.match(pr)||[],C=s.match(pr)||[],C.length){for(;u=pr.exec(s);)m=u[0],_=s.substring(l,u.index),g?g=(g+1)%5:(_.substr(-5)==="rgba("||_.substr(-5)==="hsla(")&&(g=1),m!==(v=h[c++]||"")&&(f=parseFloat(v)||0,x=v.substr((f+"").length),m.charAt(1)==="="&&(m=Pr(f,m)+x),p=parseFloat(m),b=m.substr((p+"").length),l=pr.lastIndex-b.length,b||(b=b||Rn.units[t]||x,l===s.length&&(s+=b,o.e+=b)),x!==b&&(f=ls(e,t,v,b)||0),o._pt={_next:o._pt,p:_||c===1?_:",",s:f,c:p-f,m:g&&g<4||t==="zIndex"?Math.round:0});o.c=l<s.length?s.substring(l,s.length):""}else o.r=t==="display"&&s==="none"?mm:pm;return Dp.test(s)&&(o.e=0),this._pt=o,o},Rf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},tS=function(e){var t=e.split(" "),n=t[0],s=t[1]||"50%";return(n==="top"||n==="bottom"||s==="left"||s==="right")&&(e=n,n=s,s=e),t[0]=Rf[n]||n,t[1]=Rf[s]||s,t.join(" ")},nS=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,s=n.style,r=t.u,a=n._gsap,o,l,c;if(r==="all"||r===!0)s.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],Fi[o]&&(l=1,o=o==="transformOrigin"?gn:At),os(n,o);l&&(os(n,At),a&&(a.svg&&n.removeAttribute("transform"),s.scale=s.rotate=s.translate="none",Za(n,1),a.uncache=1,gm(s)))}},vl={clearProps:function(e,t,n,s,r){if(r.data!=="isFromStart"){var a=e._pt=new mn(e._pt,t,n,0,0,nS);return a.u=s,a.pr=-10,a.tween=r,e._props.push(n),1}}},Ka=[1,0,0,1,0,0],bm={},Mm=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Pf=function(e){var t=Cn(e,At);return Mm(t)?Ka:t.substr(7).match(Ip).map(Nt)},Ou=function(e,t){var n=e._gsap||Ns(e),s=e.style,r=Pf(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?Ka:r):(r===Ka&&!e.offsetParent&&e!==Lr&&!n.svg&&(l=s.display,s.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Lr.appendChild(e)),r=Pf(e),l?s.display=l:os(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Lr.removeChild(e))),t&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},zd=function(e,t,n,s,r,a){var o=e._gsap,l=r||Ou(e,!0),c=o.xOrigin||0,d=o.yOrigin||0,u=o.xOffset||0,h=o.yOffset||0,f=l[0],g=l[1],v=l[2],m=l[3],p=l[4],_=l[5],b=t.split(" "),x=parseFloat(b[0])||0,C=parseFloat(b[1])||0,E,S,A,y;n?l!==Ka&&(S=f*m-g*v)&&(A=x*(m/S)+C*(-v/S)+(v*_-m*p)/S,y=x*(-g/S)+C*(f/S)-(f*_-g*p)/S,x=A,C=y):(E=_m(e),x=E.x+(~b[0].indexOf("%")?x/100*E.width:x),C=E.y+(~(b[1]||b[0]).indexOf("%")?C/100*E.height:C)),s||s!==!1&&o.smooth?(p=x-c,_=C-d,o.xOffset=u+(p*f+_*v)-p,o.yOffset=h+(p*g+_*m)-_):o.xOffset=o.yOffset=0,o.xOrigin=x,o.yOrigin=C,o.smooth=!!s,o.origin=t,o.originIsAbsolute=!!n,e.style[gn]="0px 0px",a&&(Ji(a,o,"xOrigin",c,x),Ji(a,o,"yOrigin",d,C),Ji(a,o,"xOffset",u,o.xOffset),Ji(a,o,"yOffset",h,o.yOffset)),e.setAttribute("data-svg-origin",x+" "+C)},Za=function(e,t){var n=e._gsap||new rm(e);if("x"in n&&!t&&!n.uncache)return n;var s=e.style,r=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=Cn(e,gn)||"0",d,u,h,f,g,v,m,p,_,b,x,C,E,S,A,y,M,L,U,O,H,W,V,j,z,re,J,he,Pe,nt,Z,ne;return d=u=h=v=m=p=_=b=x=0,f=g=1,n.svg=!!(e.getCTM&&ym(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(s[At]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[At]!=="none"?l[At]:"")),s.scale=s.rotate=s.translate="none"),S=Ou(e,n.svg),n.svg&&(n.uncache?(z=e.getBBox(),c=n.xOrigin-z.x+"px "+(n.yOrigin-z.y)+"px",j=""):j=!t&&e.getAttribute("data-svg-origin"),zd(e,j||c,!!j||n.originIsAbsolute,n.smooth!==!1,S)),C=n.xOrigin||0,E=n.yOrigin||0,S!==Ka&&(L=S[0],U=S[1],O=S[2],H=S[3],d=W=S[4],u=V=S[5],S.length===6?(f=Math.sqrt(L*L+U*U),g=Math.sqrt(H*H+O*O),v=L||U?or(U,L)*Es:0,_=O||H?or(O,H)*Es+v:0,_&&(g*=Math.abs(Math.cos(_*Ir))),n.svg&&(d-=C-(C*L+E*O),u-=E-(C*U+E*H))):(ne=S[6],nt=S[7],J=S[8],he=S[9],Pe=S[10],Z=S[11],d=S[12],u=S[13],h=S[14],A=or(ne,Pe),m=A*Es,A&&(y=Math.cos(-A),M=Math.sin(-A),j=W*y+J*M,z=V*y+he*M,re=ne*y+Pe*M,J=W*-M+J*y,he=V*-M+he*y,Pe=ne*-M+Pe*y,Z=nt*-M+Z*y,W=j,V=z,ne=re),A=or(-O,Pe),p=A*Es,A&&(y=Math.cos(-A),M=Math.sin(-A),j=L*y-J*M,z=U*y-he*M,re=O*y-Pe*M,Z=H*M+Z*y,L=j,U=z,O=re),A=or(U,L),v=A*Es,A&&(y=Math.cos(A),M=Math.sin(A),j=L*y+U*M,z=W*y+V*M,U=U*y-L*M,V=V*y-W*M,L=j,W=z),m&&Math.abs(m)+Math.abs(v)>359.9&&(m=v=0,p=180-p),f=Nt(Math.sqrt(L*L+U*U+O*O)),g=Nt(Math.sqrt(V*V+ne*ne)),A=or(W,V),_=Math.abs(A)>2e-4?A*Es:0,x=Z?1/(Z<0?-Z:Z):0),n.svg&&(j=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Mm(Cn(e,At)),j&&e.setAttribute("transform",j))),Math.abs(_)>90&&Math.abs(_)<270&&(r?(f*=-1,_+=v<=0?180:-180,v+=v<=0?180:-180):(g*=-1,_+=_<=0?180:-180)),t=t||n.uncache,n.x=d-((n.xPercent=d&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-d)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=h+a,n.scaleX=Nt(f),n.scaleY=Nt(g),n.rotation=Nt(v)+o,n.rotationX=Nt(m)+o,n.rotationY=Nt(p)+o,n.skewX=_+o,n.skewY=b+o,n.transformPerspective=x+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(s[gn]=xl(c)),n.xOffset=n.yOffset=0,n.force3D=Rn.force3D,n.renderTransform=n.svg?sS:xm?Sm:iS,n.uncache=0,n},xl=function(e){return(e=e.split(" "))[0]+" "+e[1]},Cc=function(e,t,n){var s=$t(t);return Nt(parseFloat(t)+parseFloat(ls(e,"x",n+"px",s)))+s},iS=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Sm(e,t)},_s="0deg",ma="0px",ys=") ",Sm=function(e,t){var n=t||this,s=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,d=n.rotationY,u=n.rotationX,h=n.skewX,f=n.skewY,g=n.scaleX,v=n.scaleY,m=n.transformPerspective,p=n.force3D,_=n.target,b=n.zOrigin,x="",C=p==="auto"&&e&&e!==1||p===!0;if(b&&(u!==_s||d!==_s)){var E=parseFloat(d)*Ir,S=Math.sin(E),A=Math.cos(E),y;E=parseFloat(u)*Ir,y=Math.cos(E),a=Cc(_,a,S*y*-b),o=Cc(_,o,-Math.sin(E)*-b),l=Cc(_,l,A*y*-b+b)}m!==ma&&(x+="perspective("+m+ys),(s||r)&&(x+="translate("+s+"%, "+r+"%) "),(C||a!==ma||o!==ma||l!==ma)&&(x+=l!==ma||C?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+ys),c!==_s&&(x+="rotate("+c+ys),d!==_s&&(x+="rotateY("+d+ys),u!==_s&&(x+="rotateX("+u+ys),(h!==_s||f!==_s)&&(x+="skew("+h+", "+f+ys),(g!==1||v!==1)&&(x+="scale("+g+", "+v+ys),_.style[At]=x||"translate(0, 0)"},sS=function(e,t){var n=t||this,s=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,d=n.skewY,u=n.scaleX,h=n.scaleY,f=n.target,g=n.xOrigin,v=n.yOrigin,m=n.xOffset,p=n.yOffset,_=n.forceCSS,b=parseFloat(a),x=parseFloat(o),C,E,S,A,y;l=parseFloat(l),c=parseFloat(c),d=parseFloat(d),d&&(d=parseFloat(d),c+=d,l+=d),l||c?(l*=Ir,c*=Ir,C=Math.cos(l)*u,E=Math.sin(l)*u,S=Math.sin(l-c)*-h,A=Math.cos(l-c)*h,c&&(d*=Ir,y=Math.tan(c-d),y=Math.sqrt(1+y*y),S*=y,A*=y,d&&(y=Math.tan(d),y=Math.sqrt(1+y*y),C*=y,E*=y)),C=Nt(C),E=Nt(E),S=Nt(S),A=Nt(A)):(C=u,A=h,E=S=0),(b&&!~(a+"").indexOf("px")||x&&!~(o+"").indexOf("px"))&&(b=ls(f,"x",a,"px"),x=ls(f,"y",o,"px")),(g||v||m||p)&&(b=Nt(b+g-(g*C+v*S)+m),x=Nt(x+v-(g*E+v*A)+p)),(s||r)&&(y=f.getBBox(),b=Nt(b+s/100*y.width),x=Nt(x+r/100*y.height)),y="matrix("+C+","+E+","+S+","+A+","+b+","+x+")",f.setAttribute("transform",y),_&&(f.style[At]=y)},rS=function(e,t,n,s,r){var a=360,o=Wt(r),l=parseFloat(r)*(o&&~r.indexOf("rad")?Es:1),c=l-s,d=s+c+"deg",u,h;return o&&(u=r.split("_")[1],u==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),u==="cw"&&c<0?c=(c+a*Ef)%a-~~(c/a)*a:u==="ccw"&&c>0&&(c=(c-a*Ef)%a-~~(c/a)*a)),e._pt=h=new mn(e._pt,t,n,s,c,HM),h.e=d,h.u="deg",e._props.push(n),h},Lf=function(e,t){for(var n in t)e[n]=t[n];return e},aS=function(e,t,n){var s=Lf({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,d,u,h,f,g;s.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[At]=t,o=Za(n,1),os(n,At),n.setAttribute("transform",c)):(c=getComputedStyle(n)[At],a[At]=t,o=Za(n,1),a[At]=c);for(l in Fi)c=s[l],d=o[l],c!==d&&r.indexOf(l)<0&&(f=$t(c),g=$t(d),u=f!==g?ls(n,l,c,g):parseFloat(c),h=parseFloat(d),e._pt=new mn(e._pt,o,l,u,h-u,Fd),e._pt.u=g||0,e._props.push(l));Lf(o,s)};pn("padding,margin,Width,Radius",function(i,e){var t="Top",n="Right",s="Bottom",r="Left",a=(e<3?[t,n,s,r]:[t+r,t+n,s+n,s+r]).map(function(o){return e<2?i+o:"border"+o+i});vl[e>1?"border"+i:i]=function(o,l,c,d,u){var h,f;if(arguments.length<4)return h=a.map(function(g){return Ei(o,g,c)}),f=h.join(" "),f.split(h[0]).length===5?h[0]:f;h=(d+"").split(" "),f={},a.forEach(function(g,v){return f[g]=h[v]=h[v]||h[(v-1)/2|0]}),o.init(l,f,u)}});var Em={name:"css",register:kd,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,s,r){var a=this._props,o=e.style,l=n.vars.startAt,c,d,u,h,f,g,v,m,p,_,b,x,C,E,S,A,y;Du||kd(),this.styles=this.styles||vm(e),A=this.styles.props,this.tween=n;for(v in t)if(v!=="autoRound"&&(d=t[v],!(En[v]&&am(v,t,n,s,e,r)))){if(f=typeof d,g=vl[v],f==="function"&&(d=d.call(n,s,e,r),f=typeof d),f==="string"&&~d.indexOf("random(")&&(d=Ya(d)),g)g(this,e,v,d,n)&&(S=1);else if(v.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(v)+"").trim(),d+="",is.lastIndex=0,is.test(c)||(m=$t(c),p=$t(d),p?m!==p&&(c=ls(e,v,c,p)+p):m&&(d+=m)),this.add(o,"setProperty",c,d,s,r,0,0,v),a.push(v),A.push(v,0,o[v]);else if(f!=="undefined"){if(l&&v in l?(c=typeof l[v]=="function"?l[v].call(n,s,e,r):l[v],Wt(c)&&~c.indexOf("random(")&&(c=Ya(c)),$t(c+"")||c==="auto"||(c+=Rn.units[v]||$t(Ei(e,v))||""),(c+"").charAt(1)==="="&&(c=Ei(e,v))):c=Ei(e,v),h=parseFloat(c),_=f==="string"&&d.charAt(1)==="="&&d.substr(0,2),_&&(d=d.substr(2)),u=parseFloat(d),v in ci&&(v==="autoAlpha"&&(h===1&&Ei(e,"visibility")==="hidden"&&u&&(h=0),A.push("visibility",0,o.visibility),Ji(this,o,"visibility",h?"inherit":"hidden",u?"inherit":"hidden",!u)),v!=="scale"&&v!=="transform"&&(v=ci[v],~v.indexOf(",")&&(v=v.split(",")[0]))),b=v in Fi,b){if(this.styles.save(v),y=d,f==="string"&&d.substring(0,6)==="var(--"){if(d=Cn(e,d.substring(4,d.indexOf(")"))),d.substring(0,5)==="calc("){var M=e.style.perspective;e.style.perspective=d,d=Cn(e,"perspective"),M?e.style.perspective=M:os(e,"perspective")}u=parseFloat(d)}if(x||(C=e._gsap,C.renderTransform&&!t.parseTransform||Za(e,t.parseTransform),E=t.smoothOrigin!==!1&&C.smooth,x=this._pt=new mn(this._pt,o,At,0,1,C.renderTransform,C,0,-1),x.dep=1),v==="scale")this._pt=new mn(this._pt,C,"scaleY",C.scaleY,(_?Pr(C.scaleY,_+u):u)-C.scaleY||0,Fd),this._pt.u=0,a.push("scaleY",v),v+="X";else if(v==="transformOrigin"){A.push(gn,0,o[gn]),d=tS(d),C.svg?zd(e,d,0,E,0,this):(p=parseFloat(d.split(" ")[2])||0,p!==C.zOrigin&&Ji(this,C,"zOrigin",C.zOrigin,p),Ji(this,o,v,xl(c),xl(d)));continue}else if(v==="svgOrigin"){zd(e,d,1,E,0,this);continue}else if(v in bm){rS(this,C,v,h,_?Pr(h,_+d):d);continue}else if(v==="smoothOrigin"){Ji(this,C,"smooth",C.smooth,d);continue}else if(v==="force3D"){C[v]=d;continue}else if(v==="transform"){aS(this,d,e);continue}}else v in o||(v=Kr(v)||v);if(b||(u||u===0)&&(h||h===0)&&!zM.test(d)&&v in o)m=(c+"").substr((h+"").length),u||(u=0),p=$t(d)||(v in Rn.units?Rn.units[v]:m),m!==p&&(h=ls(e,v,c,p)),this._pt=new mn(this._pt,b?C:o,v,h,(_?Pr(h,_+u):u)-h,!b&&(p==="px"||v==="zIndex")&&t.autoRound!==!1?WM:Fd),this._pt.u=p||0,b&&y!==d?(this._pt.b=c,this._pt.e=y,this._pt.r=GM):m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=VM);else if(v in o)eS.call(this,e,v,c,_?_+d:d);else if(v in e)this.add(e,v,c||e[v],_?_+d:d,s,r);else if(v!=="parseTransform"){Su(v,d);continue}b||(v in o?A.push(v,0,o[v]):typeof e[v]=="function"?A.push(v,2,e[v]()):A.push(v,1,c||e[v])),a.push(v)}}S&&hm(this)},render:function(e,t){if(t.tween._time||!Nu())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Ei,aliases:ci,getSetter:function(e,t,n){var s=ci[t];return s&&s.indexOf(",")<0&&(t=s),t in Fi&&t!==gn&&(e._gsap.x||Ei(e,"x"))?n&&Sf===n?t==="scale"?jM:qM:(Sf=n||{})&&(t==="scale"?KM:ZM):e.style&&!yu(e.style[t])?XM:~t.indexOf("-")?YM:Lu(e,t)},core:{_removeProperty:os,_getMatrix:Ou}};xn.utils.checkPrefix=Kr;xn.core.getStyleSaver=vm;(function(i,e,t,n){var s=pn(i+","+e+","+t,function(r){Fi[r]=1});pn(e,function(r){Rn.units[r]="deg",bm[r]=1}),ci[s[13]]=i+","+e,pn(n,function(r){var a=r.split(":");ci[a[1]]=s[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");pn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){Rn.units[i]="px"});xn.registerPlugin(Em);var Fu=xn.registerPlugin(Em)||xn;Fu.core.Tween;const D={target:new I(0,0,10),goalTarget:new I(0,0,10),distance:155,goalDistance:155,theta:.52,goalTheta:.52,phi:.92,goalPhi:.92,thetaVel:0,phiVel:0,panVelX:0,panVelZ:0,zoomVel:0,isDragging:!1,dragMode:"PAN",prevMouse:{x:0,y:0},downMouse:{x:0,y:0},idleTimer:0,idleOrbitEnabled:!0,isIdleOrbiting:!1,isFlyInActive:!1};let cn=null;const Hd={ENTIRE:{target:{x:0,y:0,z:10},distance:165,theta:.48,phi:.9},EXCHANGE:{target:{x:0,y:8,z:-18},distance:68,theta:.35,phi:1.02},TECH:{target:{x:75,y:6,z:-25},distance:76,theta:-.45,phi:.96},BANKING:{target:{x:-75,y:6,z:-25},distance:76,theta:.55,phi:.96},INFRA:{target:{x:0,y:4,z:86},distance:82,theta:0,phi:.95},LEARN:{target:{x:0,y:4,z:48},distance:72,theta:.25,phi:.98}};function Bu(){D.goalDistance=Math.max(24,Math.min(245,D.goalDistance)),D.goalPhi=Math.max(.32,Math.min(1.42,D.goalPhi)),D.goalTarget.x=Math.max(-125,Math.min(125,D.goalTarget.x)),D.goalTarget.z=Math.max(-115,Math.min(115,D.goalTarget.z))}function Ma(){D.idleTimer=0,D.isIdleOrbiting=!1,D.isFlyInActive&&Tm(),cn&&(cn.kill(),cn=null)}function ku(){if(!Lt)return;const i=Math.sin(D.phi),e=Math.cos(D.phi),t=Math.sin(D.theta),n=Math.cos(D.theta);Lt.position.x=D.target.x+D.distance*i*t,Lt.position.y=D.target.y+D.distance*e,Lt.position.z=D.target.z+D.distance*i*n,Lt.lookAt(D.target)}function zu(){Bu(),D.target.copy(D.goalTarget),D.distance=D.goalDistance,D.theta=D.goalTheta,D.phi=D.goalPhi,ku()}function gr(i,e=68,t=D.goalTheta,n=.96,s=1.15){if(cn&&(cn.kill(),cn=null),D.thetaVel=0,D.phiVel=0,D.panVelX=0,D.panVelZ=0,D.zoomVel=0,D.idleTimer=0,D.goalTarget.set(i.x,i.y||4,i.z),D.goalDistance=e,D.goalTheta=t,D.goalPhi=n,Bu(),P.getViewState().reducedMotion){zu();return}const r={tx:D.target.x,ty:D.target.y,tz:D.target.z,dist:D.distance,th:D.theta,ph:D.phi};cn=Fu.to(r,{tx:D.goalTarget.x,ty:D.goalTarget.y,tz:D.goalTarget.z,dist:D.goalDistance,th:D.goalTheta,ph:D.goalPhi,duration:s,ease:"power3.out",onUpdate:()=>{D.target.set(r.tx,r.ty,r.tz),D.goalTarget.copy(D.target),D.distance=r.dist,D.theta=r.th,D.phi=r.ph},onComplete:()=>{cn=null}})}function Wn(i){const e=Hd[i]||Hd.ENTIRE;gr(e.target,e.distance,e.theta,e.phi)}function oS(i){if(P.getViewState().reducedMotion){Wn("ENTIRE"),i&&i();return}D.isFlyInActive=!0;const e=document.getElementById("flyin-banner");e&&(e.style.display="flex"),D.target.set(0,12,-20),D.goalTarget.copy(D.target),D.distance=235,D.goalDistance=235,D.theta=-.85,D.goalTheta=-.85,D.phi=1.18,D.goalPhi=1.18,ku();const t=Hd.ENTIRE,n={tx:D.target.x,ty:D.target.y,tz:D.target.z,dist:D.distance,th:D.theta,ph:D.phi};cn=Fu.to(n,{tx:t.target.x,ty:t.target.y,tz:t.target.z,dist:t.distance,th:t.theta,ph:t.phi,duration:5,ease:"power2.inOut",onUpdate:()=>{D.target.set(n.tx,n.ty,n.tz),D.goalTarget.copy(D.target),D.distance=n.dist,D.goalDistance=n.dist,D.theta=n.th,D.goalTheta=n.th,D.phi=n.ph,D.goalPhi=n.ph},onComplete:()=>{D.isFlyInActive=!1,cn=null,e&&(e.style.display="none"),i&&i()}})}function Tm(){if(!D.isFlyInActive)return;D.isFlyInActive=!1,cn&&(cn.kill(),cn=null);const i=document.getElementById("flyin-banner");i&&(i.style.display="none"),Wn("ENTIRE")}function lS(i){const e=P.getViewState().reducedMotion;if(!cn&&!D.isFlyInActive){const t=Math.pow(.0015,i);if(D.isDragging||(D.goalTheta+=D.thetaVel*i,D.goalPhi+=D.phiVel*i,D.goalTarget.x+=D.panVelX*i,D.goalTarget.z+=D.panVelZ*i,D.goalDistance+=D.zoomVel*i,D.thetaVel*=t,D.phiVel*=t,D.panVelX*=t,D.panVelZ*=t,D.zoomVel*=t),!D.isDragging&&D.idleOrbitEnabled&&!e&&(D.idleTimer+=i,D.idleTimer>8&&(D.isIdleOrbiting=!0,D.goalTheta+=i*.085)),Bu(),e){zu();return}const n=1-Math.pow(8e-4,i);D.target.lerp(D.goalTarget,n),D.distance+=(D.goalDistance-D.distance)*n,D.theta+=(D.goalTheta-D.theta)*n,D.phi+=(D.goalPhi-D.phi)*n}ku()}const La=[];let Vd=null;function cS(i){Vd=i}function to({id:i,type:e,text:t,worldPos:n,isDistrict:s,borderColor:r}){const a=document.getElementById("world-labels");if(!a)return;const o=document.createElement("div");o.className="world-label"+(s?" district-tag":""),r&&(o.style.borderColor=r),o.innerHTML=`<span data-label-sym>${t}</span> <span data-label-pct class="num"></span>`,o.addEventListener("click",l=>{l.stopPropagation(),Vd&&Vd(e,i,!0)}),a.appendChild(o),La.push({id:i,type:e,worldPos:n,el:o,isDistrict:s})}function wm(i,e,t,n){const s=La.find(c=>c.type==="COMPANY"&&c.id===i.id);if(!s)return;s.worldPos.y=e+4.8;const r=i.changePercent>.02?"▲":i.changePercent<-.02?"▼":"•",a=i.changePercent>.02?"pos-text":i.changePercent<-.02?"neg-text":"neu-text",o=s.el.querySelector("[data-label-sym]"),l=s.el.querySelector("[data-label-pct]");if(o&&o.textContent!==i.symbol&&(o.textContent=i.symbol),l){const c=`${r}${Math.abs(i.changePercent).toFixed(1)}%`;l.textContent!==c&&(l.textContent=c),l.className=`${a} num`}s.el.classList.toggle("selected",!!t),n||(s.el.style.display="none")}const lr=new I;function dS(){if(!Jn||!Lt)return;const i=P.getViewState();if(!i.labelsVisible){La.forEach(l=>{l.el.style.display="none"});return}const e=window.innerWidth,t=window.innerHeight,n=D.distance<95,s=[];La.forEach(l=>{if(l.type==="COMPANY"){const c=l.worldPos.x-D.target.x,d=l.worldPos.z-D.target.z;s.push({id:l.id,distSq:c*c+d*d})}}),s.sort((l,c)=>l.distSq-c.distSq);const r=new Set(s.slice(0,10).map(l=>l.id)),a=[];La.forEach(l=>{const c=i.selectedObject&&i.selectedObject.type===l.type&&i.selectedObject.id===l.id,d=i.hoveredObject&&i.hoveredObject.type===l.type&&i.hoveredObject.id===l.id,u=l.type==="COMPANY"&&i.activeNavView==="compare"&&i.compareIds.includes(l.id);if(l.type==="COMPANY"){const m=i.companies.find(p=>p.id===l.id);if(m&&i.exchangeFilter!=="ALL"&&m.exchange!==i.exchangeFilter){l.el.style.display="none";return}if(!c&&!d&&!u&&!n&&!r.has(l.id)){l.el.style.display="none";return}}else if((l.type==="INFRA"||l.type==="LEARN")&&!c&&!d&&D.distance>125){l.el.style.display="none";return}if(lr.copy(l.worldPos),lr.project(Lt),lr.z>1||lr.z<-1){l.el.style.display="none";return}const h=(lr.x*.5+.5)*e,f=(-(lr.y*.5)+.5)*t;if(h<30||h>e-30||f<56||f>t-30){l.el.style.display="none";return}const g=Lt.position.distanceTo(l.worldPos),v=c?100:d?90:u?80:l.isDistrict?70:Math.max(1,60-g*.2);a.push({anchor:l,x:h,y:f,camDist:g,priority:v,isPinned:!!(c||d||u||l.isDistrict)})}),a.sort((l,c)=>c.priority-l.priority);const o=[];a.forEach(l=>{const{anchor:c,x:d,y:u,camDist:h,isPinned:f}=l,g=c.el;g.style.display="flex",g.style.left=`${d}px`,g.style.top=`${u}px`;const v=c.isDistrict?96:78,p={left:d-v*.5,right:d+v*.5,top:u-22,bottom:u};let _=!1;for(let b=0;b<o.length;b++){const x=o[b];if(p.left<x.right&&p.right>x.left&&p.top<x.bottom&&p.bottom>x.top){_=!0;break}}if(_&&!f)g.style.opacity="0.12",g.style.pointerEvents="none";else{o.push(p);const b=bs.clamp(1.25-h/260,.45,1);g.style.opacity=f?"1":b.toFixed(2),g.style.pointerEvents="auto"}})}let Ti=null,_l=null,yl=null,Ia=null,ga=null,sn=null,vr=null,Dr=null,Is=null;function uS(i){const e=document.createElement("canvas");e.width=256,e.height=64;const t=e.getContext("2d");return t.fillStyle="#111b26",t.fillRect(0,0,256,64),t.strokeStyle="#4b8be8",t.lineWidth=4,t.strokeRect(2,2,252,60),t.fillStyle="#e6f0fa",t.font="bold 20px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(i,128,32),new ei(e)}function hS(){if(!ge)return;const i=new Yt;i.position.set(0,0,-24);const e=Wr(64,48,.65);e.position.y=.05,i.add(e);const t=new ae(68,.6,50),n=new pt({color:2240831}),s=new K(t,n);s.position.y=.3,s.receiveShadow=!0,i.add(s);const r=new K(new et(17.5,19,1.2,32),new pt({color:2768207}));r.position.y=.9,r.receiveShadow=!0,i.add(r);const a=new et(14,15.2,6.5,24),o=new xt({color:3097430,shininess:40}),l=new K(a,o);l.position.set(0,4.2,0),l.castShadow=!0,i.add(l);const c=new pt({color:10072004}),d=new et(.45,.5,6.4,8);for(let y=0;y<16;y++){const M=y/16*Math.PI*2,L=new K(d,c);L.position.set(Math.cos(M)*15.8,4.2,Math.sin(M)*15.8),i.add(L)}const u=new ui(13.6,24,12,0,Math.PI*2,0,Math.PI/2);_l=new xt({color:6202096,emissive:1787256,emissiveIntensity:.25,transparent:!0,opacity:.48,shininess:95});const h=new K(u,_l);h.position.y=7.4,i.add(h);const f=new et(8.8,10.6,28,16);yl=new xt({color:3889269,emissive:1585228,emissiveIntensity:.2,shininess:75});const g=new K(f,yl);g.position.set(0,21.5,0),g.castShadow=!0,i.add(g),ga=document.createElement("canvas"),ga.width=1024,ga.height=96,sn=ga.getContext("2d"),vr=new ei(ga),vr.wrapS=en,vr.wrapT=Ki;const v=new et(10.5,10.5,2.8,32,1,!0),m=new _t({map:vr,side:Tn});Ia=new K(v,m),Ia.position.set(0,18.5,0),i.add(Ia),Ti=new _t({color:2269291});const p=new K(new vu(2.6,1),Ti);p.position.set(0,39.5,0),i.add(p),Dr=new K(new Gr(4.6,.35,8,28),Ti),Dr.position.set(0,39.5,0),i.add(Dr),Is=new K(new Gr(3.5,.28,8,24),Ti),Is.position.set(0,39.5,0),Is.rotation.y=Math.PI/2,i.add(Is);const _=new K(new et(9.6,9.6,1.8,24),Ti);_.position.set(0,34.5,0),i.add(_);const b=[{x:-19,z:-11,label:"ORDER MATCHING"},{x:19,z:-11,label:"CLEARING LINK"},{x:-19,z:11,label:"SETTLEMENT"},{x:19,z:11,label:"MARKET-DATA"}],x=new pt({color:2834e3}),C=new _t({color:4951016});b.forEach(y=>{const M=new Yt;M.position.set(y.x,0,y.z);const L=Wr(15,15,.6);L.position.y=.62,M.add(L);const U=new K(new ae(11,11.5,11),x);U.position.y=6.2,U.castShadow=!0,M.add(U);const O=y.z>0?5.65:-5.65,H=new K(new ae(5.2,4.2,.3),C);H.position.set(0,2.6,O),M.add(H);const W=new K(new Gs(7.5,1.8),new _t({map:uS(y.label),side:Tn}));W.position.set(0,9.8,O),y.z<0&&(W.rotation.y=Math.PI),M.add(W),i.add(M)});const E=new ae(54,45,40),S=new _t({visible:!1}),A=new K(E,S);A.position.set(0,22,0),A.userData={type:"EXCHANGE",id:"CENTRAL_EXCHANGE",name:"Central Stock Exchange Complex (NSE / BSE Anchor)"},i.add(A),ia.push(A),ge.add(i),to({id:"CENTRAL_EXCHANGE",type:"EXCHANGE",text:"🏛️ STOCK EXCHANGE HQ",worldPos:new I(0,46,-24),isDistrict:!0})}function fS(i){_l&&(_l.emissiveIntensity=.22+i*.95),yl&&(yl.emissiveIntensity=.15+i*.65)}function pS(i){if(Ti){const n=i.totals.mood;n==="BULLISH"?Ti.color.setHex(2269291):n==="BEARISH"?Ti.color.setHex(14241618):Ti.color.setHex(14067791)}if(!sn||!vr||!i.companies.length)return;sn.fillStyle="#0c141d",sn.fillRect(0,0,1024,96),sn.strokeStyle="#3b5875",sn.lineWidth=4,sn.strokeRect(0,2,1024,92);const e=[...i.companies].sort((n,s)=>Math.abs(s.changePercent)-Math.abs(n.changePercent)).slice(0,6);sn.font='bold 26px "SFMono-Regular", Consolas, monospace',sn.textBaseline="middle";let t=24;e.forEach(n=>{const s=n.changePercent>=0,a=`${s?"▲":"▼"}${Math.abs(n.changePercent).toFixed(1)}%`;sn.fillStyle="#f2f5f7",sn.fillText(n.symbol,t,48),t+=sn.measureText(n.symbol).width+10,sn.fillStyle=s?"#22a06b":"#d94f52",sn.fillText(a,t,48),t+=sn.measureText(a).width+36}),vr.needsUpdate=!0}function mS(i,e){e||(Ia&&(Ia.rotation.y+=i*.38),Dr&&(Dr.rotation.y+=i*.85,Dr.rotation.x+=i*.35),Is&&(Is.rotation.z-=i*1.1,Is.rotation.y-=i*.5))}const Am={};function gS(i,e){const t=document.createElement("canvas");t.width=512,t.height=96;const n=t.getContext("2d");return n.fillStyle="#0f1720",n.fillRect(0,0,512,96),n.strokeStyle=e,n.lineWidth=6,n.strokeRect(4,4,504,88),n.fillStyle="#f2f5f7",n.font='bold 34px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',n.textAlign="center",n.textBaseline="middle",n.fillText(i.toUpperCase(),256,48),new ei(t)}function vS(i){const e=document.createElement("canvas");e.width=128,e.height=128;const t=e.getContext("2d");t.fillStyle="#1b2733",t.fillRect(0,0,128,128),t.strokeStyle="#"+new oe(i).getHexString(),t.globalAlpha=.16,t.lineWidth=2,t.strokeRect(6,6,116,116),t.globalAlpha=.07;for(let s=32;s<128;s+=32)t.beginPath(),t.moveTo(s,0),t.lineTo(s,128),t.stroke(),t.beginPath(),t.moveTo(0,s),t.lineTo(128,s),t.stroke();const n=new ei(e);return n.wrapS=en,n.wrapT=en,n.repeat.set(4,4),n}function xS(){if(!ge)return;const i=new pt({color:2504262});Gn.forEach(e=>{const t=new Yt;t.position.set(e.center.x,0,e.center.z);const n=new ae(e.size.w+1.2,.36,e.size.d+1.2),s=new pt({color:2635848}),r=new K(n,s);r.position.y=.18,r.receiveShadow=!0,t.add(r);const a=vS(e.hex),o=new ae(e.size.w,.52,e.size.d),l=new pt({map:a,color:16777215}),c=new K(o,l);c.position.y=.26,c.receiveShadow=!0,c.userData={type:"SECTOR",id:e.id},t.add(c),ia.push(c);const d=new Ap(new ae(e.size.w+.8,.95,e.size.d+.8)),u=new $a({color:e.hex}),h=new mu(d,u);h.position.y=.56,t.add(h);const f=new Yt,g=e.size.d/2-.6;f.position.set(0,.5,g);const v=new K(new ae(.9,6.2,.9),i);v.position.set(-5.2,3.1,0),v.castShadow=!0,f.add(v);const m=new K(new ae(.9,6.2,.9),i);m.position.set(5.2,3.1,0),m.castShadow=!0,f.add(m);const p=gS(e.short,e.color),_=new K(new ae(11.6,1.7,.6),new _t({map:p}));_.position.set(0,5.8,0),f.add(_),t.add(f),ge.add(t),Am[e.id]={padMesh:c,padMat:l,borderMesh:h,borderMat:u,baseHex:e.hex},to({id:e.id,type:"SECTOR",text:e.short,worldPos:new I(e.center.x,2.5,e.center.z-e.size.d/2+2),isDistrict:!0,borderColor:e.color})})}const _S=new oe(16777215),yS=new oe(2071912),bS=new oe(14042440),Rc=new oe(5399670);function MS(i){const{selectedObject:e,heatmapMode:t}=i;Gn.forEach(n=>{const s=Am[n.id];if(!s)return;const r=e&&e.type==="SECTOR"&&e.id===n.id;if(s.borderMat.color.setHex(r?16777215:s.baseHex),t&&i.dataMode==="SIMULATION"){const o=es(n.id,i).capWeightedChangePct,l=Math.min(1,Math.abs(o)/2.2);o>.05?s.padMat.color.copy(Rc).lerp(yS,l):o<-.05?s.padMat.color.copy(Rc).lerp(bS,l):s.padMat.color.copy(Rc)}else s.padMat.color.copy(_S)})}const Zr={};function Cm(i){const e=Math.max(1500,Math.min(25e5,i)),t=(Math.log10(e)-3.17)/(6.4-3.17);return Number((7.5+t*28.5).toFixed(2))}function Rm(i,e){const t=Qa(i,e);return t==="Large-Cap"?7.6:t==="Mid-Cap"?6.4:5.4}function Pm(i,e=.55,t=1){const n=document.createElement("canvas");n.width=128,n.height=256;const s=n.getContext("2d"),r=document.createElement("canvas");r.width=128,r.height=256;const a=r.getContext("2d"),o=new oe(i).lerp(new oe(1977402),.65);s.fillStyle="#"+o.getHexString(),s.fillRect(0,0,128,256),a.fillStyle="#000000",a.fillRect(0,0,128,256),s.fillStyle="rgba(10, 16, 24, 0.55)",s.fillRect(0,0,6,256),s.fillRect(122,0,6,256);const l=4,c=12,d=12,u=10,h=(128-d*2)/l,f=(256-u*2)/c;let g=t*1337;for(let p=0;p<c;p++)for(let _=0;_<l;_++){g=g*16807%2147483647;const b=(g&65535)/65535;if(b<e){const x=b<e*.35?"#ffe7a3":"#9ed2ff";s.fillStyle=x,a.fillStyle=x}else s.fillStyle="#121c26",a.fillStyle="#000000";s.fillRect(d+_*h+3,u+p*f+3,h-6,f-6),a.fillRect(d+_*h+3,u+p*f+3,h-6,f-6)}const v=new ei(n);v.wrapS=en,v.wrapT=en;const m=new ei(r);return m.wrapS=en,m.wrapT=en,{map:v,emissiveMap:m}}function SS(i,e,t,n){const s=new Yt,r=new Yt;switch(i){case"TECH":{const a=new K(new ae(1,.62,1),e);a.position.y=.31,a.castShadow=!0,s.add(a);const o=new K(new ae(.82,.26,.82),e);o.position.y=.75,o.castShadow=!0,s.add(o);const l=new K(new ae(.64,.14,.64),n);l.position.y=.93,s.add(l);const c=new K(new et(.02,.04,3.2,6),t);c.position.set(-.14,1.6,-.14),r.add(c);const d=new K(new et(.015,.03,2.2,6),t);d.position.set(.16,1.1,.14),r.add(d);break}case"BANKING":{const a=new pt({color:9413560}),o=new K(new ae(1.08,.2,1.08),a);o.position.y=.1,o.castShadow=!0,s.add(o),[-.48,.48].forEach(d=>{[-.48,.48].forEach(u=>{const h=new K(new et(.06,.06,.22,8),a);h.position.set(d,.11,u),s.add(h)})});const l=new K(new ae(.86,.8,.86),e);l.position.y=.6,l.castShadow=!0,s.add(l);const c=new K(new ae(.7,1.4,.7),t);c.position.y=.7,r.add(c);break}case"ENERGY":{const a=new K(new ae(.95,.65,.75),e);a.position.set(0,.325,.1),a.castShadow=!0,s.add(a);const o=new xt({color:13161696,shininess:60}),l=new K(new et(.28,.28,.55,14),o);l.position.set(-.22,.275,-.26),s.add(l);const c=new K(new et(.09,.14,.98,10),t);c.position.set(.24,.49,-.25),c.castShadow=!0,s.add(c);const d=new K(new Ii(.18,2.4,4),t);d.position.set(0,1.2,.1),r.add(d);break}case"HEALTH":{const a=new K(new et(.56,.58,.22,18),t);a.position.y=.11,s.add(a);const o=new K(new ae(.96,.78,.42),e);o.position.y=.61,o.castShadow=!0,s.add(o);const l=new K(new ae(.42,.78,.96),e);l.position.y=.61,l.castShadow=!0,s.add(l);const c=new _t({color:3910289}),d=new K(new ae(.42,.4,.14),c);d.position.y=.7;const u=new K(new ae(.14,.4,.42),c);u.position.y=.7,r.add(d,u);break}case"AUTO":{const a=new K(new ae(1.08,.48,1.04),e);a.position.y=.24,a.castShadow=!0,s.add(a);const o=new K(new ae(.54,.52,.54),e);o.position.set(.22,.74,.2),o.castShadow=!0,s.add(o);for(let l=-1;l<=1;l++){const c=new K(new Ii(.22,.8,4),t);c.rotation.y=Math.PI/4,c.position.set(-.24,.4,l*.28),r.add(c)}break}case"CONSUMER":{const a=new K(new ae(1.06,.42,1.06),e);a.position.y=.21,a.castShadow=!0,s.add(a);const o=new K(new ae(.82,.58,.82),e);o.position.y=.71,o.castShadow=!0,s.add(o);const l=new _t({color:15239002}),c=new K(new ae(1.14,.06,1.14),l);c.position.y=.42,s.add(c);const d=new K(new ui(.28,12,8,0,Math.PI*2,0,Math.PI/2),n);d.position.y=.5,r.add(d);break}case"TELECOM":{const a=new K(new ae(.92,.55,.92),e);a.position.y=.275,a.castShadow=!0,s.add(a);const o=new K(new et(.26,.38,.45,8),e);o.position.y=.775,s.add(o);const l=new K(new Ii(.22,3.4,4),t);l.position.y=1.7,r.add(l);const c=new K(new Gr(.28,.04,6,16),t);c.rotation.x=Math.PI/2,c.position.y=1.4,r.add(c);break}case"INFRA_IND":{const a=new K(new ae(.84,.88,.72),e);a.position.set(-.08,.44,.12),a.castShadow=!0,s.add(a);const o=new pt({color:9214632});[-.22,.22].forEach(d=>{const u=new K(new et(.18,.18,.95,12),o);u.position.set(d,.475,-.28),s.add(u)});const l=new K(new ae(.1,2.2,.1),t);l.position.set(0,1.1,0);const c=new K(new ae(.95,.1,.1),t);c.position.set(.25,2.1,0),r.add(l,c);break}case"MATERIALS":{const a=new K(new ae(.98,.72,.98),e);a.position.y=.36,a.castShadow=!0,s.add(a);const o=new K(new et(.14,.24,.32,10),t);o.position.set(-.22,.84,-.18);const l=new K(new et(.14,.24,.32,10),t);l.position.set(.22,.84,.18),s.add(o,l);const c=new K(new et(.08,.12,1.8,8),t);c.position.set(-.22,.9,-.18),r.add(c);break}default:{const a=new K(new ae(1,.24,1),e);a.position.y=.12,s.add(a);const o=new K(new ae(.44,.76,.88),e);o.position.set(-.24,.62,0),o.castShadow=!0,s.add(o);const l=new K(new ae(.44,.62,.88),e);l.position.set(.24,.55,0),l.castShadow=!0,s.add(l);const c=new K(new ae(.55,.1,.36),n);c.position.set(0,.72,0),s.add(c);break}}return{archGroup:s,roofGroup:r}}function ES(i){if(!ge)return;const e=new pt({color:2372676}),t=new xt({color:1715520,shininess:90});i.forEach((n,s)=>{const r=vn[n.sector],a=new Yt;a.position.set(n.pos.x,.5,n.pos.z);const o=Cm(n.marketCap),l=Rm(n.marketCap),c=n.volume/Math.max(1,n.avgDailyVolume),d=Math.max(.25,Math.min(.92,.45*c)),u=Wr(l*1.75,l*1.75,.65);u.position.y=.03,a.add(u);const h=new ae(1.14,.6,1.14);h.translate(0,.3,0);const f=new K(h,e);f.scale.set(l,1,l),f.receiveShadow=!0,a.add(f);const{map:g,emissiveMap:v}=Pm(r.hex,d,s+1),m=new xt({map:g,emissive:new oe(16777215),emissiveMap:v,emissiveIntensity:.18,shininess:48}),p=new xt({color:new oe(r.hex).lerp(new oe(16777215),.18),shininess:55}),{archGroup:_,roofGroup:b}=SS(n.sector,m,p,t);_.position.y=.6,_.scale.set(l,o,l),a.add(_),b.position.y=o+.6,b.scale.set(l,1,l),a.add(b);const x=new ae(1.05,1,1.05);x.translate(0,.5,0);const C=new K(x,new _t({visible:!1}));C.scale.set(l,o+1.2,l),C.userData={type:"COMPANY",id:n.id},a.add(C),ia.push(C);const E=new ae(.76,.85,.76),S=new _t({color:2269291}),A=new K(E,S);A.position.y=o+.95,A.scale.set(l,1,l),a.add(A);const y=new Nl(.62,.76,24);y.rotateX(-Math.PI/2);const M=new _t({color:r.hex,side:Tn,transparent:!0,opacity:.6}),L=new K(y,M);L.position.y=.14,L.scale.set(l,1,l),a.add(L);const U=new Ap(new ae(1.16,1,1.16));U.translate(0,.5,0);const O=new $a({color:16777215}),H=new mu(U,O);H.scale.set(l,o+2.8,l),H.visible=!1,a.add(H),ge.add(a),Zr[n.id]={group:a,aoShadowMesh:u,plinthMesh:f,archGroup:_,roofGroup:b,hitMesh:C,bodyMat:m,accentMat:p,beaconMesh:A,beaconMat:S,ringMesh:L,ringMat:M,selectionBox:H,selMat:O,currentWidth:l,goalWidth:l,currentHeight:o,goalHeight:o,currentLiftY:0,goalLiftY:0,height:o,lastLitBucket:Math.round(d*10),isLargeMover:!1,idx:s},to({id:n.id,type:"COMPANY",text:n.symbol,worldPos:new I(n.pos.x,o+4.8,n.pos.z),isDistrict:!1})})}function TS(i){const e=.15+i*.85;Object.values(Zr).forEach(t=>{t.bodyMat&&(t.bodyMat.emissiveIntensity=e)})}function He(i){pS(i),MS(i),i.companies.forEach(e=>{const t=Zr[e.id];if(!t)return;t.goalHeight=Cm(e.marketCap),t.goalWidth=Rm(e.marketCap,i.mcapThresholds),t.isLargeMover=Math.abs(e.changePercent)>=1.2,i.reducedMotion&&(t.currentHeight=t.goalHeight,t.currentWidth=t.goalWidth);const n=e.volume/Math.max(1,e.avgDailyVolume),s=Math.max(.25,Math.min(.95,.45*n)),r=Math.round(s*10);if(r!==t.lastLitBucket){t.lastLitBucket=r;const u=vn[e.sector],{map:h,emissiveMap:f}=Pm(u.hex,s,t.idx+r);t.bodyMat.map&&t.bodyMat.map.dispose(),t.bodyMat.emissiveMap&&t.bodyMat.emissiveMap.dispose(),t.bodyMat.map=h,t.bodyMat.emissiveMap=f,t.bodyMat.needsUpdate=!0}i.dataMode==="REAL_DATA"?t.beaconMat.color.setHex(14067791):e.changePercent>.03?t.beaconMat.color.setHex(2269291):e.changePercent<-.03?t.beaconMat.color.setHex(14241618):t.beaconMat.color.setHex(14067791),t.isLargeMover?(t.ringMat.color.setHex(e.changePercent>=0?2269291:14241618),t.ringMat.opacity=.92):(t.ringMat.color.setHex(vn[e.sector].hex),t.ringMat.opacity=.52);const a=i.selectedObject&&i.selectedObject.type==="COMPANY"&&i.selectedObject.id===e.id,o=i.hoveredObject&&i.hoveredObject.type==="COMPANY"&&i.hoveredObject.id===e.id,l=i.activeNavView==="compare"&&i.compareIds.includes(e.id),c=i.selectedObject&&i.selectedObject.type==="SECTOR"&&i.selectedObject.id===e.sector,d=i.exchangeFilter==="ALL"||e.exchange===i.exchangeFilter;t.goalLiftY=o?1.15:0,t.selectionBox.visible=!!(a||o||l||c),t.selMat&&t.selMat.color.setHex(a?16777215:o?6210262:10405375),t.bodyMat.opacity=d?1:.25,t.bodyMat.transparent=!d,t.accentMat.opacity=d?1:.25,t.accentMat.transparent=!d,wm(e,t.currentHeight+t.currentLiftY,a||l||o,i.labelsVisible&&d)})}function wS(i,e,t){const n=Math.min(1,e*6.5),s=Math.min(1,e*12);i.forEach(r=>{const a=Zr[r.id];if(!a)return;const o=Math.abs(a.goalHeight-a.currentHeight),l=Math.abs(a.goalWidth-a.currentWidth),c=Math.abs(a.goalLiftY-a.currentLiftY);if(o>.01||l>.01||c>.01){a.currentHeight+=(a.goalHeight-a.currentHeight)*n,a.currentWidth+=(a.goalWidth-a.currentWidth)*n,a.currentLiftY+=(a.goalLiftY-a.currentLiftY)*s,a.height=a.currentHeight;const u=a.currentWidth,h=a.currentHeight,f=a.currentLiftY;if(a.aoShadowMesh.scale.set(u*1.75,1,u*1.75),a.plinthMesh.scale.set(u,1,u),a.archGroup.position.y=.6+f,a.archGroup.scale.set(u,h,u),a.roofGroup.position.y=h+.6+f,a.roofGroup.scale.set(u,1,u),a.hitMesh.scale.set(u,h+1.2+f,u),a.beaconMesh.position.y=h+.95+f,a.beaconMesh.scale.set(u,1,u),a.ringMesh.scale.set(u,1,u),a.selectionBox.position.y=f,a.selectionBox.scale.set(u,h+2.8,u),t){const g=t.selectedObject&&t.selectedObject.type==="COMPANY"&&t.selectedObject.id===r.id,v=t.hoveredObject&&t.hoveredObject.type==="COMPANY"&&t.hoveredObject.id===r.id,m=t.activeNavView==="compare"&&t.compareIds.includes(r.id),p=t.exchangeFilter==="ALL"||r.exchange===t.exchangeFilter;wm(r,h+f,g||m||v,t.labelsVisible&&p)}}const d=a.currentWidth;if(r.pulseIntensity>0){r.pulseIntensity=Math.max(0,r.pulseIntensity-e*1.8);const u=1+r.pulseIntensity*.22;a.beaconMesh.scale.set(d*u,1+r.pulseIntensity*.55,d*u)}else a.beaconMesh.scale.set(d,1,d);if(a.isLargeMover){const u=1+Math.sin(performance.now()*.006)*.08;a.ringMesh.scale.set(d*u,1,d*u)}})}const Di=[{id:"INFRA_DATA",name:"Market-Data Broadcast Center",short:"Market-Data Center",role:"Tick-by-Tick Feed & Order Book Distribution",pos:{x:-40,z:84},size:{w:11,h:12,d:11},color:4951016,summary:"Collects matched trade prices and bid/ask quotes from the exchange matching engine and broadcasts timestamped market data to brokers, terminals, and index calculators.",distinction:"A Market-Data Center distributes information; it does not hold your shares or guarantee trade settlement."},{id:"INFRA_CLEARING",name:"Clearing & Settlement Facility (CCP)",short:"Clearing Corp",role:"Central Counterparty (Novation) & T+1 Settlement",pos:{x:-24,z:84},size:{w:12,h:14,d:11},color:3910289,summary:"Acts as the legal buyer to every seller and seller to every buyer (novation), eliminating counterparty default risk and ensuring funds and securities settle on a T+1 cycle.",distinction:"While the Stock Exchange matches orders, the Clearing Corporation manages post-trade counterparty risk and settlement guarantees."},{id:"INFRA_DEPOSITORY",name:"Central Securities Depository",short:"Depository",role:"Dematerialized Share Custody & Ownership Ledger",pos:{x:-8,z:84},size:{w:12,h:15,d:11},color:14067791,summary:"Holds securities in electronic (dematerialized / Demat) form and transfers legal ownership between investor accounts upon settlement instruction.",distinction:"In India (e.g., NSDL / CDSL model), your shares are held in a Depository account, NOT inside the stock exchange or on a broker's balance sheet."},{id:"INFRA_BROKERAGE",name:"Brokerage & Trading-Services Hub",short:"Brokerage Hub",role:"Order Routing, Margin Verification & Client Access",pos:{x:8,z:84},size:{w:11,h:13,d:11},color:11897568,summary:"Registered trading members (brokers) provide retail and institutional investors with order-entry apps, verify upfront margins, and route orders to the exchange.",distinction:"Retail investors cannot submit orders directly to the exchange matching engine; they must route orders through a licensed broker."},{id:"INFRA_RISK",name:"Risk-Monitoring & Surveillance Facility",short:"Risk Surveillance",role:"Circuit Breakers, Margin Calls & Manipulation Checks",pos:{x:24,z:84},size:{w:11,h:13,d:11},color:14241618,summary:"Monitors real-time price bands, volatility, mark-to-market margin utilization, and abnormal trading patterns to maintain fair and orderly markets.",distinction:"Risk surveillance protects market integrity; it does not protect investors from normal market losses."},{id:"INFRA_NEWS",name:"Corporate Disclosures & Financial News Center",short:"Disclosures Hub",role:"Earnings Filings, Board Notices & Material Events",pos:{x:40,z:84},size:{w:10,h:11,d:11},color:15239002,summary:"Disseminates statutory company filings, quarterly financial results, dividend announcements, and material corporate actions to the public simultaneously.",distinction:"Official exchange disclosures are regulated primary sources, whereas media commentary is secondary interpretation."},{id:"INFRA_INVESTOR",name:"Investor-Information & Grievance Center",short:"Investor Center",role:"Financial Literacy, Arbitration & Investor Protection",pos:{x:0,z:98},size:{w:14,h:9,d:9},color:6210262,summary:"Provides public education, KRA/KYC guidance, and dispute resolution mechanisms between investors and market intermediaries.",distinction:"Empowers investors with verified rules and rights rather than offering stock tips or investment advice."}];let Da=null;function AS(){if(!ge)return;const i=new K(new ae(108,.5,36),new pt({color:1779507}));i.position.set(0,.25,88),i.receiveShadow=!0,ge.add(i);const e=new _t({color:14872312}),t=new xt({color:2240573,shininess:60});Di.forEach(n=>{const s=new Yt;s.position.set(n.pos.x,.5,n.pos.z);const r=Wr(n.size.w*1.55,n.size.d*1.55,.62);r.position.y=.03,s.add(r);const a=new xt({color:n.color,shininess:48});if(n.id==="INFRA_DATA"){const l=new K(new ae(11,9,11),a);l.position.y=4.5,l.castShadow=!0,s.add(l),[-3,0,3].forEach((c,d)=>{const u=new K(new ui(1.7,12,8,0,Math.PI*2,0,Math.PI/2.2),e);u.rotation.x=Math.PI-.45,u.rotation.z=(d-1)*.3,u.position.set(c,10.5,d%2===0?-1.5:1.5),s.add(u)})}else if(n.id==="INFRA_CLEARING"){const l=new K(new ae(11.5,13,10.5),t);l.position.y=6.5,l.castShadow=!0,s.add(l);const c=new _t({color:3910289});for(let d=-4;d<=4;d+=2){const u=new K(new ae(.7,11,11),c);u.position.set(d,6.5,0),s.add(u)}}else if(n.id==="INFRA_DEPOSITORY"){const l=new K(new ae(12,14,11),a);l.position.y=7,l.castShadow=!0,s.add(l);const c=new K(new et(3.4,3.4,.8,20),t);c.rotation.x=Math.PI/2,c.position.set(0,7,-5.5),s.add(c);const d=new K(new et(2.2,2.2,1,16),e);d.rotation.x=Math.PI/2,d.position.set(0,7,-5.6),s.add(d)}else if(n.id==="INFRA_BROKERAGE")for(let l=0;l<3;l++){const c=11-l*1.8,d=new K(new ae(c,4.2,c),a);d.position.y=2.1+l*4.2,d.castShadow=!0,s.add(d)}else if(n.id==="INFRA_RISK"){const l=new K(new ae(11,7,11),t);l.position.y=3.5,s.add(l);const c=new K(new et(2.8,3.4,9,8),a);c.position.y=11.5,c.castShadow=!0,s.add(c),Da=new K(new ae(6.8,.6,.9),e),Da.position.y=16.8,s.add(Da)}else if(n.id==="INFRA_NEWS"){const l=new K(new ae(10,11,10),a);l.position.y=5.5,l.castShadow=!0,s.add(l);const c=new K(new ae(10.6,1.6,10.6),new _t({color:16765565}));c.position.y=7.5,s.add(c);const d=new K(new Ii(.8,5,4),e);d.position.y=13.5,s.add(d)}else{const l=new K(new ae(14,7.5,9),a);l.position.y=3.75,l.castShadow=!0,s.add(l);const c=new K(new ui(3.6,16,10,0,Math.PI*2,0,Math.PI/2),e);c.position.y=7.5,s.add(c)}const o=new K(new ae(n.size.w+2,n.size.h+5,n.size.d+2),new _t({visible:!1}));o.position.y=(n.size.h+5)/2,o.userData={type:"INFRA",id:n.id},s.add(o),ia.push(o),ge.add(s),to({id:n.id,type:"INFRA",text:"⚙️ "+n.short,worldPos:new I(n.pos.x,n.size.h+4.2,n.pos.z),isDistrict:!1})})}function CS(i,e){e||!Da||(Da.rotation.y+=i*2.2)}const Bs=[{id:"LEARN_MCAP",name:"Market-Capitalization Monument",short:"M-Cap Monument",conceptKey:"marketCap",pos:{x:-34,z:42},color:4951016,summary:"Visualizes why Company Scale = Share Price × Outstanding Shares. Two towers side by side show how a ₹400 stock with 500 Cr shares is much larger than a ₹4,000 stock with 10 Cr shares."},{id:"LEARN_PVV",name:"Price-versus-Volume Demonstration",short:"Price vs Volume",conceptKey:"volume",pos:{x:-12,z:42},color:3910289,summary:"Demonstrates how price movement and trading activity are distinct dimensions: a stock can move 3% on thin volume or trade millions of shares while closing flat."},{id:"LEARN_BULLBEAR",name:"Bull-versus-Bear Market Sculpture",short:"Bull & Bear Plaza",conceptKey:"bullBear",pos:{x:12,z:42},color:14067791,summary:"Contrasts sustained broad-market optimism (Bull) and pessimism (Bear) against single-day noise or single-company movement."},{id:"LEARN_DIVERSIFY",name:"Diversified Portfolio Garden",short:"Portfolio Garden",conceptKey:"diversification",pos:{x:34,z:42},color:2269291,summary:"A multi-species grove showing how spreading capital across uncorrelated sectors cushions sector-specific shocks compared to a monoculture."},{id:"LEARN_RISK",name:"Risk-and-Return Observation Tower",short:"Risk-Return Tower",conceptKey:"riskReturn",pos:{x:-22,z:58},color:14241618,summary:"Higher vantage points offer wider potential horizons but experience stronger wind variance—illustrating uncertainty, volatility, and drawdown risk."},{id:"LEARN_INDEX",name:"Market-Index Information Plaza",short:"Index Plaza",conceptKey:"indices",pos:{x:22,z:58},color:11897568,summary:"Explains how benchmark indices like NIFTY 50 and SENSEX summarize a defined basket of companies using free-float market-capitalization weights."}];let xr=null,_r=null,ji=null,Cs=null;function RS(){if(!ge)return;const i=new K(new ae(86,.5,30),new pt({color:1977402}));i.position.set(0,.25,48),i.receiveShadow=!0,ge.add(i);const e=new pt({color:2899536});Bs.forEach(t=>{const n=new Yt;n.position.set(t.pos.x,.5,t.pos.z);const s=Wr(14,14,.6);s.position.y=.03,n.add(s);const r=new K(new ae(9.5,1.4,9.5),e);if(r.position.y=.7,r.receiveShadow=!0,n.add(r),t.id==="LEARN_MCAP"){const o=new K(new ae(3.2,9.5,3.2),new xt({color:4951016,shininess:65}));o.position.set(-2,1.4+4.75,0),o.castShadow=!0,n.add(o);const l=new K(new ae(1.5,3.6,1.5),new xt({color:14067791,shininess:65}));l.position.set(2.2,1.4+1.8,0),l.castShadow=!0,n.add(l)}else if(t.id==="LEARN_PVV"){const o=new ae(2.2,1,2.2);o.translate(0,.5,0),xr=new K(o,new xt({color:3910289,shininess:60})),xr.position.set(-1.8,1.4,0),xr.scale.y=6.5,n.add(xr);const l=new et(1.2,1.2,1,16);l.translate(0,.5,0),_r=new K(l,new xt({color:4951016,shininess:60})),_r.position.set(1.8,1.4,0),_r.scale.y=5,n.add(_r)}else if(t.id==="LEARN_BULLBEAR"){const o=new Yt;o.position.set(-2.1,2.6,0);const l=new K(new ae(2.8,1.6,1.5),new xt({color:2269291,shininess:75}));l.rotation.z=.28;const c=new K(new Ii(.2,1.2,5),new _t({color:16770979}));c.position.set(1.3,1.1,.45),c.rotation.z=-.5;const d=c.clone();d.position.z=-.45,o.add(l,c,d),n.add(o);const u=new Yt;u.position.set(2.1,2.6,0);const h=new K(new ae(2.6,1.8,1.7),new xt({color:14241618,shininess:75}));h.rotation.z=-.25,u.add(h),n.add(u)}else if(t.id==="LEARN_DIVERSIFY"){[2269291,4951016,14067791,11897568].forEach((l,c)=>{const d=new K(new ui(1.1,10,8),new pt({color:l}));d.position.set(-2.2+c%2*1.6,3.2+c%2*.6,-1.2+Math.floor(c/2)*2.2),n.add(d)});for(let l=0;l<3;l++){const c=new K(new Ii(.75,2.2,5),new pt({color:7767702}));c.position.set(2.2,2.5,-1.8+l*1.8),n.add(c)}}else if(t.id==="LEARN_RISK"){const o=new K(new et(1.2,1.8,4.5,8),new xt({color:3889269}));o.position.y=3.65,n.add(o),ji=new Yt,ji.position.set(0,5.8,0);const l=new K(new et(.35,1,7.5,8),new xt({color:14241618,shininess:80}));l.position.y=3.75,ji.add(l);const c=new K(new et(1.9,1.9,.6,16),new _t({color:16765565}));c.position.y=6.2,ji.add(c),n.add(ji)}else if(t.id==="LEARN_INDEX"){Cs=new Yt,Cs.position.y=1.6;const o=new K(new et(3.8,4,.4,24),new xt({color:11897568}));Cs.add(o);const l=[3910289,4951016,14067791,15239002,14252187,6210262],c=[4.8,4.2,3.5,2.8,2.4,3.2];for(let d=0;d<6;d++){const u=d/6*Math.PI*2,h=c[d],f=new K(new ae(1.1,h,1.1),new xt({color:l[d]}));f.position.set(Math.cos(u)*2.4,h/2+.2,Math.sin(u)*2.4),Cs.add(f)}n.add(Cs)}const a=new K(new ae(10.5,14,10.5),new _t({visible:!1}));a.position.y=7,a.userData={type:"LEARN",id:t.id},n.add(a),ia.push(a),ge.add(n),to({id:t.id,type:"LEARN",text:"🎓 "+t.short,worldPos:new I(t.pos.x,12.2,t.pos.z),isDistrict:!1})})}function PS(i,e,t){t||(xr&&_r&&(xr.scale.y=5.5+Math.sin(i*1.9)*2.2,_r.scale.y=4.8+Math.cos(i*2.7)*2.4),ji&&(ji.rotation.z=Math.sin(i*1.6)*.09,ji.rotation.x=Math.cos(i*1.2)*.06),Cs&&(Cs.rotation.y+=e*.55))}let Pc=null,Na=null,Nr=null;const tl=[{x:14,y:15,z:-76},{x:34,y:14,z:-88},{x:-66,y:14,z:-76},{x:-84,y:13,z:92}],$e=new Ct;function LS(){if(!ge)return;const i=[];for(let S=-95;S<=95;S+=16)i.push({x:-48,z:S},{x:-36,z:S},{x:36,z:S},{x:48,z:S});for(let S=-3;S<=3;S+=3)for(let A=-3;A<=3;A+=3)i.push({x:34+S,z:42+A});const e=new ae(2.2,.5,2.2),t=new pt({color:2899536}),n=new Sn(e,t,i.length),s=new et(.28,.38,2.2,6),r=new pt({color:6045747}),a=new Sn(s,r,i.length),o=new Ii(1.65,4.2,7),l=new pt({color:2980435});Pc=new Sn(o,l,i.length),i.forEach((S,A)=>{$e.position.set(S.x,.25,S.z),$e.rotation.set(0,0,0),$e.scale.set(1,1,1),$e.updateMatrix(),n.setMatrixAt(A,$e.matrix),$e.position.set(S.x,1.3,S.z),$e.updateMatrix(),a.setMatrixAt(A,$e.matrix),$e.position.set(S.x,3.8,S.z),$e.updateMatrix(),Pc.setMatrixAt(A,$e.matrix)}),ge.add(n),ge.add(a),ge.add(Pc);const c=[];for(let S=-92;S<=92;S+=22)c.push({x:S,z:-50.2},{x:S,z:9.8},{x:S,z:68.8});const d=new et(.12,.16,5.2,6),u=new pt({color:3886430}),h=new Sn(d,u,c.length),f=new ui(.52,8,8),g=new _t({color:6715272});Na=new Sn(f,g,c.length),c.forEach((S,A)=>{$e.position.set(S.x,2.6,S.z),$e.updateMatrix(),h.setMatrixAt(A,$e.matrix),$e.position.set(S.x,5.3,S.z),$e.updateMatrix(),Na.setMatrixAt(A,$e.matrix)}),ge.add(h),ge.add(Na);const v=[];for(let S=-75;S<=75;S+=30)v.push({x:S,z:-59.8},{x:S,z:.2},{x:S,z:59.2});const m=new ae(1.8,.45,.65),p=new pt({color:8150083}),_=new Sn(m,p,v.length);v.forEach((S,A)=>{$e.position.set(S.x,.42,S.z),$e.updateMatrix(),_.setMatrixAt(A,$e.matrix)}),ge.add(_);const b=new ae(.6,14,.6),x=new pt({color:14067791}),C=new Sn(b,x,tl.length),E=new ae(9.5,.45,.45);E.translate(2.2,0,0),Nr=new Sn(E,x,tl.length),tl.forEach((S,A)=>{$e.position.set(S.x,S.y/2,S.z),$e.rotation.set(0,0,0),$e.updateMatrix(),C.setMatrixAt(A,$e.matrix),$e.position.set(S.x,S.y,S.z),$e.updateMatrix(),Nr.setMatrixAt(A,$e.matrix)}),ge.add(C),ge.add(Nr)}function IS(i,e){e||!Nr||(tl.forEach((t,n)=>{$e.position.set(t.x,t.y,t.z),$e.rotation.set(0,Math.sin(i*.45+n*1.7)*.85,0),$e.updateMatrix(),Nr.setMatrixAt(n,$e.matrix)}),Nr.instanceMatrix.needsUpdate=!0)}let yr=null,br=null,Ua=null;const Gd=[],Wd=[],Lm=[],Et=new Ct,Xd=[-55,5,64],Yd=[-42,42],qd=[{start:new I(-40,2.2,84),end:new I(-19,3,-13)},{start:new I(19,3,-13),end:new I(-24,2.2,84)},{start:new I(-24,2.2,84),end:new I(-8,2.2,84)},{start:new I(-19,3,-35),end:new I(8,2.2,84)}];function DS(){if(!ge)return;const i=40,e=new ae(1.9,.78,1.05),t=new xt({color:6859007,emissive:1851248,shininess:70});yr=new Sn(e,t,i);for(let d=0;d<i;d++){const u=d%2===0,h=u?Xd[d%3]:Yd[d%2],f=d%4===0?1:-1,g=f>0?1.65:-1.65;Gd.push({isHorizontal:u,roadCenter:h,dir:f,pos:u?yt.range(-100,100):yt.range(-95,95),fixedCoord:h+g,baseSpeed:yt.range(11,20),turnCooldown:0,turnPreference:yt.next()>.45})}ge.add(yr);const n=48,s=new et(.22,.25,1.1,6),r=new pt({color:13688556});br=new Sn(s,r,n);for(let d=0;d<n;d++){const u=d%2===0,h=u?Xd[d%3]:Yd[d%2],f=d%4<2?4.3:-4.3;Wd.push({isHorizontal:u,pos:yt.range(-88,88),fixedCoord:h+f,dir:d%2===0?1:-1,speed:yt.range(2.2,4)})}ge.add(br);const a=new $a({color:3910289,transparent:!0,opacity:.35});qd.forEach(d=>{const u=d.start.clone().lerp(d.end,.5);u.y=6.5;const h=new xb(d.start,u,d.end),f=h.getPoints(24),g=new Bt().setFromPoints(f);ge.add(new Tp(g,a)),d.curve=h});const o=32,l=new ui(.55,8,8),c=new _t({color:6210262});Ua=new Sn(l,c,o);for(let d=0;d<o;d++)Lm.push({routeIdx:d%qd.length,t:d/o%1,speed:yt.range(.22,.42)});ge.add(Ua)}const If=new I;function NS(i,e){if(e)return;const t=P.getViewState(),n=t.resolvedQuality||"HIGH",s=Math.max(.75,Math.min(2.2,(t.totals.volumeCr||5)/5));if(yr){const r=n==="LOW"?16:n==="MEDIUM"?28:Gd.length;Gd.forEach((a,o)=>{if(o>=r){Et.scale.set(0,0,0),Et.updateMatrix(),yr.setMatrixAt(o,Et.matrix);return}if(a.turnCooldown=Math.max(0,a.turnCooldown-i),a.pos+=a.dir*a.baseSpeed*s*i,a.pos>106&&(a.pos=-106),a.pos<-106&&(a.pos=106),a.turnCooldown<=0&&a.turnPreference){const l=a.isHorizontal?Yd:Xd;for(let c=0;c<l.length;c++){const d=l[c];if(Math.abs(a.pos-d)<.85){a.isHorizontal=!a.isHorizontal;const u=d;a.pos=a.roadCenter,a.roadCenter=u;const h=a.dir>0?1.65:-1.65;a.fixedCoord=a.roadCenter+h,a.turnCooldown=4.5;break}}}Et.scale.set(1,1,1),a.isHorizontal?(Et.position.set(a.pos,.62,a.fixedCoord),Et.rotation.set(0,a.dir>0?0:Math.PI,0)):(Et.position.set(a.fixedCoord,.62,a.pos),Et.rotation.set(0,a.dir>0?Math.PI/2:-Math.PI/2,0)),Et.updateMatrix(),yr.setMatrixAt(o,Et.matrix)}),yr.instanceMatrix.needsUpdate=!0}if(br){const r=n==="LOW"?16:Wd.length;Wd.forEach((a,o)=>{if(o>=r){Et.scale.set(0,0,0),Et.updateMatrix(),br.setMatrixAt(o,Et.matrix);return}a.pos+=a.dir*a.speed*i,a.pos>92&&(a.dir=-1),a.pos<-92&&(a.dir=1),Et.scale.set(1,1,1),a.isHorizontal?Et.position.set(a.pos,.75,a.fixedCoord):Et.position.set(a.fixedCoord,.75,a.pos),Et.rotation.set(0,0,0),Et.updateMatrix(),br.setMatrixAt(o,Et.matrix)}),br.instanceMatrix.needsUpdate=!0}Ua&&(Lm.forEach((r,a)=>{const o=qd[r.routeIdx];if(!o||!o.curve)return;r.t=(r.t+r.speed*s*i)%1,o.curve.getPoint(r.t,If),Et.position.copy(If);const l=.8+Math.sin(r.t*Math.PI)*.5;Et.scale.set(l,l,l),Et.updateMatrix(),Ua.setMatrixAt(a,Et.matrix)}),Ua.instanceMatrix.needsUpdate=!0)}let bl=null,Jt=null,Ml=null,Sl=null,Oa=null,Fa=null;const Im=[];let Ur=null,Ds=null;const Dm=[],ni=new Ct,Lc=new I(85,135,85),US=`
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`,OS=`
  uniform vec3 uTopColor;
  uniform vec3 uHorizonColor;
  uniform vec3 uBottomColor;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform float uSunSize;
  uniform vec3 uMoodTint;
  uniform float uMoodStrength;
  uniform vec3 uEventTint;
  uniform float uEventStrength;

  varying vec3 vWorldPosition;

  void main() {
    vec3 dir = normalize(vWorldPosition);
    float h = clamp(dir.y, -0.2, 1.0);

    vec3 col = mix(uHorizonColor, uTopColor, pow(max(h, 0.0), 0.55));
    if (h < 0.0) {
      col = mix(uHorizonColor, uBottomColor, clamp(-h * 5.0, 0.0, 1.0));
    }

    // Horizon band for market mood & 5s hypothetical event wash
    float horizonBand = pow(1.0 - abs(dir.y), 3.5);
    col = mix(col, uMoodTint, horizonBand * uMoodStrength);
    col = mix(col, uEventTint, horizonBand * uEventStrength);

    // Sun / Moon disc & corona
    float cosAngle = max(dot(dir, normalize(uSunDir)), 0.0);
    float disc = smoothstep(1.0 - uSunSize, 1.0 - uSunSize * 0.25, cosAngle);
    float corona = pow(cosAngle, 28.0) * 0.45;
    col += uSunColor * (disc * 1.35 + corona);

    gl_FragColor = vec4(col, 1.0);
  }
`;function FS(){if(!ge)return;Jt={uTopColor:{value:new oe(793390)},uHorizonColor:{value:new oe(1782603)},uBottomColor:{value:new oe(659994)},uSunDir:{value:new I(.5,.72,.48).normalize()},uSunColor:{value:new oe(16773584)},uSunSize:{value:.0045},uMoodTint:{value:new oe(14067791)},uMoodStrength:{value:0},uEventTint:{value:new oe(3705087)},uEventStrength:{value:0}};const i=new ui(540,32,20),e=new Ft({vertexShader:US,fragmentShader:OS,uniforms:Jt,side:an,depthWrite:!1});bl=new K(i,e),ge.add(bl);const t=460,n=new Float32Array(t*3);for(let g=0;g<t;g++){const v=yt.range(0,Math.PI*2),m=yt.range(.08,Math.PI*.44),p=490;n[g*3]=p*Math.sin(m)*Math.cos(v),n[g*3+1]=p*Math.cos(m),n[g*3+2]=p*Math.sin(m)*Math.sin(v)}const s=new Bt;s.setAttribute("position",new hn(n,3)),Sl=new wp({color:14478591,size:1.9,transparent:!0,opacity:0,depthWrite:!1}),Ml=new fb(s,Sl),ge.add(Ml);const r=34,a=new gu(1,1);Fa=new pt({color:14214898,transparent:!0,opacity:.42}),Oa=new Sn(a,Fa,r);for(let g=0;g<r;g++)Im.push({x:yt.range(-240,240),y:yt.range(78,118),z:yt.range(-210,210),sx:yt.range(12,26),sy:yt.range(3.2,6.2),sz:yt.range(9,19),speed:yt.range(1.4,3.4)});ge.add(Oa);const o=720,l=new Float32Array(o*6);for(let g=0;g<o;g++){const v=yt.range(-130,130),m=yt.range(2,96),p=yt.range(-120,120);l[g*6]=v,l[g*6+1]=m,l[g*6+2]=p,l[g*6+3]=v+.35,l[g*6+4]=m-2.6,l[g*6+5]=p}const c=new Bt;c.setAttribute("position",new hn(l,3));const d=new $a({color:10143472,transparent:!0,opacity:.58});Ur=new mu(c,d),Ur.visible=!1,ge.add(Ur);const u=90,h=new Nl(.45,.62,16);h.rotateX(-Math.PI/2);const f=new _t({color:11064575,side:Tn,transparent:!0,opacity:.48,depthWrite:!1});Ds=new Sn(h,f,u),Ds.visible=!1;for(let g=0;g<u;g++)Dm.push({x:yt.range(-120,105),z:yt.range(-105,105),phase:yt.range(0,1),speed:yt.range(.9,1.7)});ge.add(Ds)}function El(i){const e=P.getLiveState(),t=i.weather;i.isNight||t==="NIGHT"?e.targetTimeOfDay=22:t==="EVENING"?e.targetTimeOfDay=18.2:e.targetTimeOfDay=13.5,e.reducedMotion&&(e.timeOfDay=e.targetTimeOfDay)}const BS=new oe(728371),kS=new oe(2047322),zS=new oe(6530280),HS=new oe(14413567),VS=new oe(1578800),GS=new oe(8143928),WS=new oe(264208),XS=new oe(726308),YS=new oe(15247432),qS=new oe(13123147),jS=new oe(4951016),ko=new oe,zo=new oe,cr=new oe;function KS(i,e,t,n){const s=P.getLiveState(),r=P.getViewState();if(s.autoDayNight&&!e){s.timeOfDay=(s.timeOfDay+i*.65)%24,s.targetTimeOfDay=s.timeOfDay;const E=s.timeOfDay>=19.5||s.timeOfDay<5.5;if(s.isNight!==E){s.isNight=E;const S=document.getElementById("day-night-btn");S&&(S.textContent=E?"🌙 Night":"☀️ Day")}}else if(e)s.timeOfDay=s.targetTimeOfDay;else{const E=s.targetTimeOfDay-s.timeOfDay;Math.abs(E)>.01?s.timeOfDay+=E*Math.min(1,i*3.2):s.timeOfDay=s.targetTimeOfDay}const o=(s.timeOfDay-6)/12*Math.PI,l=Math.sin(o),c=Math.cos(o),d=bs.clamp(-l+.15,0,1),u=bs.clamp(1-Math.abs(l-.1)*2.5,0,1),h=r.weather==="CLOUDY"||r.weather==="RAIN",f=r.weather==="RAIN",g=Math.max(38,Math.abs(l)*145+25),v=c*115,m=75+l*20;Lc.set(v,g,m),t&&(Nb(t,n||140,Lc),bl&&bl.position.set(t.x,0,t.z),Ml&&Ml.position.set(t.x,0,t.z));const p=r.lightUiTheme?zS:BS,_=r.lightUiTheme?HS:kS;if(ko.copy(p).lerp(VS,u).lerp(WS,d),zo.copy(_).lerp(GS,u).lerp(XS,d),h){const E=r.lightUiTheme?new oe(9413557):new oe(1450542);ko.lerp(E,.55),zo.lerp(E,.65)}let b=0,x=jS;!r.atmosphereOverride&&r.dataMode==="SIMULATION"&&(r.totals.mood==="BULLISH"?(x=YS,b=.34):r.totals.mood==="BEARISH"&&(x=qS,b=.38));let C=0;if(s.eventCue&&s.eventCue.timer>0){s.eventCue.timer=Math.max(0,s.eventCue.timer-i);const E=s.eventCue.timer/Math.max(.1,s.eventCue.duration);C=Math.sin(E*Math.PI)*.62,Jt&&Jt.uEventTint.value.setHex(s.eventCue.colorHex)}if(Jt&&(Jt.uTopColor.value.copy(ko),Jt.uHorizonColor.value.copy(zo),Jt.uSunDir.value.copy(Lc).normalize(),d>.55?cr.setHex(12114175):u>.35?cr.setHex(16752216):b>0&&r.totals.mood==="BULLISH"?cr.setHex(16768926):cr.setHex(16774368),Jt.uSunColor.value.copy(cr),Jt.uMoodTint.value.copy(x),Jt.uMoodStrength.value=b,Jt.uEventStrength.value=C),ge&&ge.fog&&(ge.fog.color.copy(zo),C>.01&&Jt&&ge.fog.color.lerp(Jt.uEventTint.value,C*.45),ge.background.copy(ge.fog.color),ge.fog.density=f?.0017:h?.0015:.0011),ul&&Rr&&bt){const E=r.lightUiTheme&&d<.4?.22:0;ul.intensity=bs.lerp(.62+E,.26,d),Rr.intensity=bs.lerp(.55+E,.24,d),Rr.color.copy(ko).lerp(new oe(16777215),.4);let S=bs.lerp(1.18+E,.25,d);h&&(S*=.58),bt.intensity=S,bt.color.copy(cr),C>.05&&Jt&&bt.color.lerp(Jt.uEventTint.value,C*.4)}if(Sl&&(Sl.opacity=bs.clamp((d-.35)*1.4,0,.88)),Na&&Na.material.color.setHex(d>.35||u>.45?16766597:6057342),TS(d),fS(d),zb(f,d,r.lightUiTheme),Oa&&Fa){const E=!r.atmosphereOverride&&r.totals.mood==="BEARISH";Fa.opacity=f?.72:h||E?.62:.36,Fa.color.setHex(d>.5?2372679:h?8097182:14412277),Im.forEach((S,A)=>{e||(S.x+=S.speed*i,S.x>250&&(S.x=-250)),ni.position.set(S.x,S.y,S.z),ni.rotation.set(0,0,0),ni.scale.set(S.sx,S.sy,S.sz),ni.updateMatrix(),Oa.setMatrixAt(A,ni.matrix)}),Oa.instanceMatrix.needsUpdate=!0}if(Ur&&(Ur.visible=f,f&&!e)){const E=Ur.geometry.attributes.position,S=E.count/2;for(let A=0;A<S;A++){let y=E.getY(A*2)-64*i;y<1&&(y=94),E.setY(A*2,y),E.setY(A*2+1,y-2.6)}E.needsUpdate=!0}Ds&&(Ds.visible=f,f&&!e&&(Dm.forEach((E,S)=>{E.phase=(E.phase+E.speed*i)%1;const A=.3+E.phase*2.1;ni.position.set(E.x,.32,E.z),ni.rotation.set(0,0,0),ni.scale.set(A,1,A),ni.updateMatrix(),Ds.setMatrixAt(S,ni.matrix)}),Ds.instanceMatrix.needsUpdate=!0))}const Nm={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class us{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ZS=new hu(-1,1,1,-1,0,1);class QS extends Bt{constructor(){super(),this.setAttribute("position",new ut([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ut([0,2,0,0,2,0],2))}}const JS=new QS;class no{constructor(e){this._mesh=new K(JS,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ZS)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Um extends us{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Ft?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Li.clone(e.uniforms),this.material=new Ft({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new no(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Df extends us{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class $S extends us{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class eE{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new we);this._width=n.width,this._height=n.height,t=new un(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Vn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Um(Nm),this.copyPass.material.blending=di,this.clock=new Tb}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Df!==void 0&&(a instanceof Df?n=!0:a instanceof $S&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new we);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class tE extends us{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new oe}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const nE={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new oe(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Qr extends us{constructor(e,t,n,s){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new we(e.x,e.y):new we(256,256),this.clearColor=new oe(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new un(r,a,{type:Vn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const h=new un(r,a,{type:Vn});h.texture.name="UnrealBloomPass.h"+u,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const f=new un(r,a,{type:Vn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}const o=nE;this.highPassUniforms=Li.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ft({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new we(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const d=Nm;this.copyUniforms=Li.clone(d.uniforms),this.blendMaterial=new Ft({uniforms:this.copyUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader,blending:Bc,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new oe,this.oldClearAlpha=1,this.basic=new _t,this.fsQuad=new no(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new we(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Qr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Qr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Ft({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new we(.5,.5)},direction:{value:new we(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Ft({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Qr.BlurDirectionX=new we(1,0);Qr.BlurDirectionY=new we(0,1);const iE={defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class sE extends us{constructor(e,t,n){super(),this.scene=e,this.camera=t;const s=n.focus!==void 0?n.focus:1,r=n.aperture!==void 0?n.aperture:.025,a=n.maxblur!==void 0?n.maxblur:1;this.renderTargetDepth=new un(1,1,{minFilter:qt,magFilter:qt,type:Vn}),this.renderTargetDepth.texture.name="BokehPass.depth",this.materialDepth=new Ep,this.materialDepth.depthPacking=op,this.materialDepth.blending=di;const o=iE,l=Li.clone(o.uniforms);l.tDepth.value=this.renderTargetDepth.texture,l.focus.value=s,l.aspect.value=t.aspect,l.aperture.value=r,l.maxblur.value=a,l.nearClip.value=t.near,l.farClip.value=t.far,this.materialBokeh=new Ft({defines:Object.assign({},o.defines),uniforms:l,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.uniforms=l,this.fsQuad=new no(this.materialBokeh),this._oldClearColor=new oe}render(e,t,n){this.scene.overrideMaterial=this.materialDepth,e.getClearColor(this._oldClearColor);const s=e.getClearAlpha(),r=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this.renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=n.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this.fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(s),e.autoClear=r}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this.renderTargetDepth.setSize(e,t)}dispose(){this.renderTargetDepth.dispose(),this.materialDepth.dispose(),this.materialBokeh.dispose(),this.fsQuad.dispose()}}const Ho={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new we(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},Vo={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new we(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},Ic={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new we(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};class rE extends us{constructor(e,t){super(),this.edgesRT=new un(e,t,{depthBuffer:!1,type:Vn}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new un(e,t,{depthBuffer:!1,type:Vn}),this.weightsRT.texture.name="SMAAPass.weights";const n=this,s=new Image;s.src=this.getAreaTexture(),s.onload=function(){n.areaTexture.needsUpdate=!0},this.areaTexture=new Gt,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=s,this.areaTexture.minFilter=Zn,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;const r=new Image;r.src=this.getSearchTexture(),r.onload=function(){n.searchTexture.needsUpdate=!0},this.searchTexture=new Gt,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=r,this.searchTexture.magFilter=qt,this.searchTexture.minFilter=qt,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,this.uniformsEdges=Li.clone(Ho.uniforms),this.uniformsEdges.resolution.value.set(1/e,1/t),this.materialEdges=new Ft({defines:Object.assign({},Ho.defines),uniforms:this.uniformsEdges,vertexShader:Ho.vertexShader,fragmentShader:Ho.fragmentShader}),this.uniformsWeights=Li.clone(Vo.uniforms),this.uniformsWeights.resolution.value.set(1/e,1/t),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new Ft({defines:Object.assign({},Vo.defines),uniforms:this.uniformsWeights,vertexShader:Vo.vertexShader,fragmentShader:Vo.fragmentShader}),this.uniformsBlend=Li.clone(Ic.uniforms),this.uniformsBlend.resolution.value.set(1/e,1/t),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new Ft({uniforms:this.uniformsBlend,vertexShader:Ic.vertexShader,fragmentShader:Ic.fragmentShader}),this.fsQuad=new no(null)}render(e,t,n){this.uniformsEdges.tDiffuse.value=n.texture,this.fsQuad.material=this.materialEdges,e.setRenderTarget(this.edgesRT),this.clear&&e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialWeights,e.setRenderTarget(this.weightsRT),this.clear&&e.clear(),this.fsQuad.render(e),this.uniformsBlend.tColor.value=n.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}setSize(e,t){this.edgesRT.setSize(e,t),this.weightsRT.setSize(e,t),this.materialEdges.uniforms.resolution.value.set(1/e,1/t),this.materialWeights.uniforms.resolution.value.set(1/e,1/t),this.materialBlend.uniforms.resolution.value.set(1/e,1/t)}getAreaTexture(){return"data:image/png;base64,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"}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}dispose(){this.edgesRT.dispose(),this.weightsRT.dispose(),this.areaTexture.dispose(),this.searchTexture.dispose(),this.materialEdges.dispose(),this.materialWeights.dispose(),this.materialBlend.dispose(),this.fsQuad.dispose()}}const aE={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class oE extends us{constructor(){super();const e=aE;this.uniforms=Li.clone(e.uniforms),this.material=new _b({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new no(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ke.getTransfer(this._outputColorSpace)===ot&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Yf?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===qf?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===jf?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===eu?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Kf?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Zf&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}let Mn=null,Yi=null,Ni=null,Mr=null,Sr=null;const lE={uniforms:{tDiffuse:{value:null},uOffset:{value:1.05},uDarkness:{value:.28}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uOffset;
    uniform float uDarkness;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      vec2 uv = (vUv - vec2(0.5)) * vec2(uOffset);
      float vig = clamp(1.0 - dot(uv, uv) * uDarkness, 0.0, 1.0);
      gl_FragColor = vec4(texel.rgb * vig, texel.a);
    }
  `};function cE(){if(!Jn||!Ve||!ge||!Lt)return;Mn=new eE(Ve);const i=new tE(ge,Lt);Mn.addPass(i),Yi=new Qr(new we(window.innerWidth,window.innerHeight),.34,.42,.85),Mn.addPass(Yi),Ni=new sE(ge,Lt,{focus:55,aperture:8e-5,maxblur:.004}),Ni.enabled=!1,Mn.addPass(Ni),Sr=new Um(lE),Mn.addPass(Sr);const e=Ve.getPixelRatio();Mr=new rE(window.innerWidth*e,window.innerHeight*e),Mn.addPass(Mr);const t=new oE;Mn.addPass(t),Ba(P.getLiveState().graphicsQuality),window.addEventListener("resize",()=>{!Mn||!Ve||Mn.setSize(window.innerWidth,window.innerHeight)})}function Ba(i=P.getLiveState().graphicsQuality){const e=Cp(i);Db(e);const t=P.getViewState(),n=t.postFxEnabled&&e!=="LOW";Mn&&Yi&&Mr&&Ni&&Sr&&(n?e==="HIGH"?(Yi.enabled=!0,Yi.strength=.36,Mr.enabled=!0,Sr.enabled=!0,Om(t)):(Yi.enabled=!0,Yi.strength=.22,Mr.enabled=!1,Sr.enabled=!0,Ni.enabled=!1):(Yi.enabled=!1,Ni.enabled=!1,Mr.enabled=!1,Sr.enabled=!1),Mn.setSize(window.innerWidth,window.innerHeight))}function Om(i,e){if(!Ni||!Lt)return;const t=i.resolvedQuality,n=!!i.postFxEnabled&&!!i.dofEnabled&&t==="HIGH"&&!!i.selectedObject;if(Ni.enabled=n,n&&e){const s=Lt.position.distanceTo(e);Ni.uniforms.focus.value=s}}function Fm(i){if(!Jn||!Ve||!ge||!Lt)return;const e=P.getViewState(),t=e.resolvedQuality;Mn&&e.postFxEnabled&&t!=="LOW"?(Om(e,i),Mn.render()):Ve.render(ge,Lt)}const Nf=new wb,Dc=new we;let Uf=0;function rt(i,e,t=!0,n=!1){const s=P.getLiveState();s.selectedObject={type:i,id:e};const r=document.getElementById("deselect-btn");r&&(r.style.display="inline-block"),document.body.classList.remove("right-collapsed");const a=P.getViewState();if(i==="COMPANY"){const o=a.companies.find(l=>l.id===e);if(o&&t){const l=Zr[e]?Zr[e].height:15,c=n?34:48;gr({x:o.pos.x,y:l*.5,z:o.pos.z},c,D.goalTheta,.98)}}else if(i==="SECTOR"){const o=vn[e];o&&t&&gr({x:o.center.x,y:5,z:o.center.z},n?56:74,D.goalTheta,.95)}else if(i==="EXCHANGE")t&&Wn("EXCHANGE");else if(i==="INFRA"){const o=Di.find(l=>l.id===e);o&&t&&gr({x:o.pos.x,y:6,z:o.pos.z},n?34:45,0,.98)}else if(i==="LEARN"){const o=Bs.find(l=>l.id===e);o&&t&&gr({x:o.pos.x,y:5,z:o.pos.z},n?32:42,.15,.98)}He(P.getViewState()),P.emit("selection")}function io(){const i=P.getLiveState();i.selectedObject=null;const e=document.getElementById("deselect-btn");e&&(e.style.display="none"),He(P.getViewState()),P.emit("selection")}function Hu(i){if(!Jn||!Ve||!Lt)return null;const e=Ve.domElement.getBoundingClientRect();Dc.x=(i.clientX-e.left)/e.width*2-1,Dc.y=-((i.clientY-e.top)/e.height)*2+1,Nf.setFromCamera(Dc,Lt);const t=Nf.intersectObjects(ia,!1);if(t.length>0){const n=t[0].object.userData;if(n&&n.type&&n.id)return n}return null}function dE(i){const e=Hu(i);e&&rt(e.type,e.id,!0,!1)}function Of(i){const e=Hu(i);e&&rt(e.type,e.id,!0,!0)}function uE(i){if(!i||i.length<2)return"";const e=68,t=18,n=Math.min(...i),r=Math.max(...i)-n||1;return i.map((a,o)=>{const l=o/(i.length-1)*e,c=t-(a-n)/r*(t-4)-2;return`${l.toFixed(1)},${c.toFixed(1)}`}).join(" ")}function hE(i){const e=document.getElementById("hover-tooltip");if(!e)return;if(D.isDragging||i.target!==Ve?.domElement){e.style.display="none",P.getLiveState().hoveredObject&&(P.getLiveState().hoveredObject=null,He(P.getViewState()));return}const t=performance.now();if(t-Uf<45){e.style.display==="block"&&(e.style.left=`${i.clientX}px`,e.style.top=`${i.clientY}px`);return}Uf=t;const n=Hu(i),s=P.getLiveState(),r=s.hoveredObject;if(!n){e.style.display="none",r&&(s.hoveredObject=null,He(P.getViewState())),Ve.domElement.style.cursor="grab";return}Ve.domElement.style.cursor="pointer";const a=!r||r.type!==n.type||r.id!==n.id;s.hoveredObject={type:n.type,id:n.id};const o=P.getViewState();if(a&&He(o),n.type==="COMPANY"){const l=o.companies.find(c=>c.id===n.id);if(l){const c=l.changePercent>=0,d=c?"#22A06B":"#D94F52",u=uE(l.history1D);e.innerHTML=`
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
          <strong>${l.symbol}</strong>
          <span class="badge ${c?"pos":"neg"} num">${We(l.changePercent)}</span>
        </div>
        <div style="font-size:11px; color:var(--text-secondary); margin-bottom:4px;">${l.companyName}</div>
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <div>
            <div class="num" style="font-weight:700; font-size:13px;">${tt(l.price)}</div>
            <div style="font-size:10px; color:var(--text-muted);">M-Cap: ${dn(l.marketCap)}</div>
          </div>
          <svg width="68" height="18"><polyline fill="none" stroke="${d}" stroke-width="1.8" points="${u}" /></svg>
        </div>
      `,e.style.display="block",e.style.left=`${i.clientX}px`,e.style.top=`${i.clientY}px`;return}}else if(n.type==="SECTOR"){const l=vn[n.id];if(l){e.innerHTML=`
        <div style="font-weight:700; color:${l.color};">${l.name}</div>
        <div style="font-size:11px; color:var(--text-secondary);">Click to inspect district • Double-click to zoom</div>
      `,e.style.display="block",e.style.left=`${i.clientX}px`,e.style.top=`${i.clientY}px`;return}}else if(n.type==="EXCHANGE"){e.innerHTML=`
      <div style="font-weight:700;">🏛️ Central Stock Exchange HQ</div>
      <div style="font-size:11px; color:var(--text-secondary);">Order Matching, Clearing & Market Data Anchor</div>
    `,e.style.display="block",e.style.left=`${i.clientX}px`,e.style.top=`${i.clientY}px`;return}e.style.display="none"}function Go(i,e,t){const n=document.getElementById(i);if(!n||!e||e.length<2)return;const s=64,r=18,a=Math.min(...e),l=Math.max(...e)-a||1,c=e.map((d,u)=>{const h=u/(e.length-1)*s,f=r-(d-a)/l*(r-4)-2;return`${h.toFixed(1)},${f.toFixed(1)}`}).join(" ");n.innerHTML=`<polyline fill="none" stroke="${t}" stroke-width="1.8" points="${c}" />`}function Vu(i,e,t=null,n=!1){if(!i)return;const s=t?e.companies.find(o=>o.id===t):e.selectedObject&&e.selectedObject.type==="COMPANY"?e.companies.find(o=>o.id===e.selectedObject.id):e.companies[0];if(!s){i.innerHTML='<div class="edu-block warn">No company data available to chart.</div>';return}if(e.dataMode==="REAL_DATA"){i.innerHTML='<div class="edu-block warn">Real-Data Mode is active without a configured historical time-series provider. MarketVerse never fabricates historical series in Real-Data mode.</div>';return}const r=e.activeHistoryHorizon||"1D",a=n?155:132;i.dataset.chartCompId=s.id,i.dataset.chartCompact=n?"1":"0",i.innerHTML=`
    <div class="interactive-chart-wrap">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px; flex-wrap:wrap; gap:6px;">
        <div>
          <strong data-bind="chart-title">${s.symbol} (${r})</strong>
          <span class="badge sim" style="margin-left:4px;">SIMULATED</span>
        </div>
        <div style="display:flex; gap:3px;" role="group" aria-label="Chart Time Horizon">
          ${["1D","1W","1M","3M","1Y"].map(o=>`
            <button class="horizon-btn ${r===o?"active":""}" data-horizon="${o}" style="padding:2px 7px; font-size:var(--text-sm);">${o}</button>
          `).join("")}
        </div>
      </div>

      <div class="chart-hover-readout">
        <span data-bind="chart-range" class="num"></span>
        <span data-bind="chart-hover-info" class="num" style="color:var(--text-primary); font-weight:600;">Hover chart to inspect points</span>
      </div>

      <svg data-bind="chart-svg" viewBox="0 0 680 ${a}" style="width:100%; height:${a}px; background:var(--bg-input); border-radius:var(--radius-sm); border:1px solid var(--border-subtle); cursor:crosshair; touch-action:none;"></svg>
    </div>
  `,i.querySelectorAll(".horizon-btn").forEach(o=>{o.addEventListener("click",()=>{P.getLiveState().activeHistoryHorizon=o.dataset.horizon,Vu(i,P.getViewState(),t,n)})}),Gu(i,e)}function Gu(i,e){if(!i||e.dataMode==="REAL_DATA")return;const t=i.dataset.chartCompId,n=i.dataset.chartCompact==="1",s=t?e.companies.find(W=>W.id===t):e.selectedObject&&e.selectedObject.type==="COMPANY"?e.companies.find(W=>W.id===e.selectedObject.id):e.companies[0];if(!s)return;const r=e.activeHistoryHorizon||"1D",a=s.histories&&s.histories[r]||s.history1D,o=s.volHistories&&s.volHistories[r]||s.volHistory,l=Math.min(...a),c=Math.max(...a),d=c-l||1,u=Math.max(...o,1),h=i.querySelector('[data-bind="chart-title"]');h&&(h.textContent=`${s.symbol} — ${r} Series`);const f=i.querySelector('[data-bind="chart-range"]');f&&(f.textContent=`Low: ${tt(l)} • High: ${tt(c)}`);const g=i.querySelector('[data-bind="chart-svg"]');if(!g)return;const v=680,m=n?155:132,p=m-34,_=p-14,b=a.map((W,V)=>{const j=V/Math.max(1,a.length-1)*(v-24)+12,z=p-(W-l)/d*_;return{x:j,y:z,price:W,vol:o[V]||0,idx:V}}),x=b.map(W=>`${W.x.toFixed(1)},${W.y.toFixed(1)}`).join(" "),C=`${b[0].x.toFixed(1)},${p} ${x} ${b[b.length-1].x.toFixed(1)},${p}`,E=b.map(W=>{const V=W.vol/u*26;return`<rect x="${(W.x-4).toFixed(1)}" y="${(m-4-V).toFixed(1)}" width="8" height="${V.toFixed(1)}" fill="rgba(75,139,232,0.42)" />`}).join(""),S=a[a.length-1]>=a[0],A=S?"#22A06B":"#E05255",y=S?"rgba(34,160,107,0.16)":"rgba(224,82,85,0.16)";g.innerHTML=`
    <polygon fill="${y}" points="${C}" />
    ${E}
    <polyline fill="none" stroke="${A}" stroke-width="2.3" points="${x}" />
    <line id="ch-vline" x1="0" y1="0" x2="0" y2="${m}" stroke="rgba(255,255,255,0.45)" stroke-dasharray="3,3" visibility="hidden" />
    <line id="ch-hline" x1="0" y1="0" x2="${v}" y2="0" stroke="rgba(255,255,255,0.35)" stroke-dasharray="3,3" visibility="hidden" />
    <circle id="ch-dot" cx="0" cy="0" r="4.5" fill="${A}" stroke="#fff" stroke-width="1.5" visibility="hidden" />
  `;const M=g.querySelector("#ch-vline"),L=g.querySelector("#ch-hline"),U=g.querySelector("#ch-dot"),O=i.querySelector('[data-bind="chart-hover-info"]'),H=W=>{const V=g.getBoundingClientRect(),j=(W.clientX-V.left)/V.width*v;let z=b[0],re=1/0;if(b.forEach(J=>{const he=Math.abs(J.x-j);he<re&&(re=he,z=J)}),z&&M&&L&&U&&(M.setAttribute("x1",z.x),M.setAttribute("x2",z.x),M.setAttribute("visibility","visible"),L.setAttribute("y1",z.y),L.setAttribute("y2",z.y),L.setAttribute("visibility","visible"),U.setAttribute("cx",z.x),U.setAttribute("cy",z.y),U.setAttribute("visibility","visible"),O)){const J=a[0]>0?(z.price-a[0])/a[0]*100:0;O.textContent=`Pt #${z.idx+1}: ${tt(z.price)} (${We(J)}) • Vol: ${z.vol.toLocaleString("en-IN")}`}};g.addEventListener("pointermove",H),g.addEventListener("pointerleave",()=>{M&&M.setAttribute("visibility","hidden"),L&&L.setAttribute("visibility","hidden"),U&&U.setAttribute("visibility","hidden"),O&&(O.textContent="Hover chart to inspect points")})}function fE(){const i=[],e=(J,he,Pe)=>{i.push({name:J,pass:!!he,detail:String(Pe)})};al();const t=P.getLiveState(),n=Vf(t.companies);e("AT-01: 36 Listed Companies & Dynamic Constituent Counts",n.listedCount===36&&n.niftyCount===24&&n.sensexCount===18,`Listed=${n.listedCount}, NIFTY=${n.niftyCount}, SENSEX=${n.sensexCount}`);const s=t.companies.every(J=>Math.abs(J.marketCap-Number((J.price*J.sharesOutstandingCr).toFixed(2)))<.01);e("AT-02: Market Cap = Price × Shares Across All 36 Companies",s,`Verified exact formula on ${t.companies.length} companies (e.g. ${t.companies[0].symbol}: ₹${t.companies[0].price} × ${t.companies[0].sharesOutstandingCr} Cr = ₹${t.companies[0].marketCap} Cr)`);const r=t.companies.every(J=>{const he=Number(((J.price-J.previousClose)/J.previousClose*100).toFixed(2));return Math.abs(J.changePercent-he)<.01});e("AT-03: % Change vs Previous Close Accuracy",r,"All 36 companies match ((price - previousClose) / previousClose) × 100");const a=t.companies.filter(J=>J.inNifty).reduce((J,he)=>J+he.marketCap,0),o=Number((a/t.indices.NIFTY.baseMcap*t.indices.NIFTY.baseLevel).toFixed(2));e("AT-04: Cap-Weighted Simulated NIFTY & SENSEX Indices",Math.abs(t.indices.NIFTY.current-o)<.01,`NIFTY=${t.indices.NIFTY.current} (Expected ${o}), SENSEX=${t.indices.SENSEX.current}`);const l=es("BANKING",t);e("AT-05: 10 Sector Districts with Cap-Weighted & Equal-Weighted Returns",Gn.length===10&&l.companies.length===5&&typeof l.capWeightedChangePct=="number",`10 Sectors verified; Banking Cap-Wt=${l.capWeightedChangePct}%, Equal-Wt=${l.equalWeightedChangePct}%`),e("AT-06: 7 Market Infrastructure Facilities Present & Distinct",Di.length===7&&Di.every(J=>J.role&&J.distinction),`Facilities=${Di.map(J=>J.short).join(", ")}`);const c=Object.keys(Jr);e("AT-07: 6 Learning Landmarks & 12 Financial Literacy Lessons",Bs.length===6&&c.length===12,`${Bs.length} Landmarks, ${c.length} Lessons verified`);const d=t.companies[0],u=d.histories["1D"],h=d.histories["1Y"],f=u.length===20&&h.length===30&&u[u.length-1]===d.price&&h[h.length-1]===d.price;e("AT-08: Distinct Multi-Horizon Seeded Histories (1D, 1W, 1M, 3M, 1Y)",f,`1D pts=${u.length}, 1W pts=${d.histories["1W"].length}, 1M pts=${d.histories["1M"].length}, 3M pts=${d.histories["3M"].length}, 1Y pts=${h.length}`),Mi(),Mi(),Mi();const g=t.companies.map(J=>J.price);for(let J=0;J<500;J++)yt.next();Al(),Mi(),Mi(),Mi();const v=P.getLiveState().companies.map(J=>J.price),m=g.every((J,he)=>J===v[he]);e("AT-09: Dual Seeded RNG Isolation & 100% Deterministic Reset",m,`Run 1 & Run 2 after 3 ticks produced identical prices (e.g. C01=₹${v[0]}, C06=₹${v[5]})`);const p=P.getLiveState().companies[0].price,_=P.getLiveState().companies[0].volume,b=P.getLiveState().simTickCount;Wf(0);const C=P.getViewState().companies[0].price,E=P.getLiveState().companies[0].price===p;Ri();const S=P.getViewState(),A=S.companies[0].price===p&&S.companies[0].volume===_&&S.simTickCount===b;e("AT-10: Immutable Replay Isolation & Exact Live Restoration",E&&A&&C!==p,`Tick #0 price=₹${C}, Live price=₹${p} (Unmutated=${E}, Restored=${A})`),wl("RATE_HIKE");const y=P.getLiveState().eventRemainingTicks;Mi();const M=P.getLiveState().eventRemainingTicks,L=P.getLiveState().simTickCount,U=P.getLiveState().companies[0].price;ss();const O=P.getLiveState().activeEventId==="NONE"&&P.getLiveState().eventRemainingTicks===0&&P.getLiveState().simTickCount===L&&P.getLiveState().companies[0].price===U;e('AT-11: Event Decay & "End Event" Preserves Simulation Progress',y===12&&M===11&&O,`Triggered=12t, After 1 tick=${M}t, EndEvent kept Tick #${L} & price ₹${U}`);const H=P.getLiveState().companies.find(J=>J.symbol==="QUANTUMIT");e("AT-12: Unavailable P/E & Dividend Yield Explicitly Null (Not 0)",H&&H.pe===null&&H.divYield===null,`QUANTUMIT pe=${H?.pe}, divYield=${H?.divYield}`),P.getLiveState().dataMode="REAL_DATA";const W=P.getLiveState().dataMode==="REAL_DATA";P.getLiveState().dataMode="SIMULATION",e("AT-13: Simulation vs Real-Data Adapter Separation",W,"REAL_DATA mode flags UNCONFIGURED_PROVIDER and halts synthetic ticks");const V=P.getViewState().compareIds;e("AT-14: Compare Tool Supports 2–4 Companies",Array.isArray(V)&&V.length>=2&&V.length<=4,`Active compareIds=${V.join(", ")}`),e("AT-15: Watchlist & Hypothetical Portfolio Explorer State",P.getViewState().watchlistIds.length>0&&P.getViewState().portfolio.length>0,`Watchlist=${P.getViewState().watchlistIds.length} items, Portfolio=${P.getViewState().portfolio.length} positions`),e("AT-16: What-If Single-Company & Sector Shock Sandbox",!!(P.getViewState().whatIf&&P.getViewState().whatIf.companyId),`Default target=${P.getViewState().whatIf.companyId}`),e("AT-17: Educational Market Movement Alerts",Array.isArray(P.getViewState().alerts)&&P.getViewState().alerts.length>=2,`${P.getViewState().alerts.length} alert rules configured`);const j=Object.keys(Ci).filter(J=>J!=="NONE").length;e("AT-18: 7 Hypothetical Economic Events with Explicit Assumptions",j===7,`${j} hypothetical macro events verified`),al();const z=i.filter(J=>J.pass).length,re=i.length-z;return{total:i.length,passed:z,failed:re,items:i}}function sa(i){const e=Jr[i];e&&(document.getElementById("modal-title").textContent=`Understand This: ${e.title}`,document.getElementById("modal-body").innerHTML=`
    <div class="edu-block">
      <strong>What It Means</strong>
      <p style="margin-top:4px;">${e.meaning}</p>
    </div>
    <div class="section-card">
      <h4>Formula / Calculation</h4>
      <div style="background:var(--bg-input); padding:8px; border-radius:4px; font-family:var(--font-mono); font-size:12px;">
        ${e.formula}
      </div>
    </div>
    <div class="section-card">
      <h4>Numerical Example</h4>
      <p>${e.example}</p>
    </div>
    <div class="section-card">
      <h4>Why It Matters</h4>
      <p>${e.whyItMatters}</p>
    </div>
    <div class="edu-block warn">
      <strong>What It Does NOT Tell You (Common Misconceptions)</strong>
      <p style="margin-top:4px;">${e.whatItDoesNotTell}</p>
    </div>
  `,document.getElementById("modal-backdrop").style.display="flex")}function Wu(){const i=fE();He(P.getViewState()),document.getElementById("modal-title").textContent=`🧪 Automated QA & Acceptance Suite (${i.passed}/${i.total} Passed)`,document.getElementById("modal-body").innerHTML=`
    <div class="edu-block" style="border-left-color:${i.failed===0?"var(--pos)":"var(--neg)"};">
      <strong>Verification Summary: ${i.passed} Passed, ${i.failed} Failed</strong>
      <p style="font-size:var(--text-sm); margin-top:4px;">
        Executed live against the active MarketVerse engine and DOM state. You can also run <code>npm test</code> in the terminal.
      </p>
    </div>
    <div class="section-card" style="max-height:55vh; overflow-y:auto;">
      <table class="data-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Test ID & Requirement</th>
            <th>Verified Detail</th>
          </tr>
        </thead>
        <tbody>
          ${i.items.map(e=>`
            <tr>
              <td><span class="badge ${e.pass?"pos":"neg"}">${e.pass?"PASS ✓":"FAIL ✕"}</span></td>
              <td style="font-weight:600; white-space:normal;">${e.name}</td>
              <td class="num" style="white-space:normal; font-size:11px; color:var(--text-secondary);">${e.detail}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `,document.getElementById("modal-backdrop").style.display="flex"}function Bm(){document.getElementById("modal-title").textContent="Keyboard, Mouse & Touch Controls",document.getElementById("modal-body").innerHTML=`
    <div class="section-card">
      <h4>Keyboard Shortcuts</h4>
      <table class="data-table" style="font-size:12px;">
        <tbody>
          <tr><td><kbd class="badge">1</kbd> – <kbd class="badge">9</kbd>, <kbd class="badge">0</kbd></td><td>Switch Left Navigation Views 1 through 9</td></tr>
          <tr><td><kbd class="badge">Space</kbd></td><td>Pause / Resume Live Market Simulation</td></tr>
          <tr><td><kbd class="badge">F</kbd></td><td>Focus Camera on Selected Object (or Exchange)</td></tr>
          <tr><td><kbd class="badge">Esc</kbd></td><td>Close Modal or Deselect Active Building/District</td></tr>
          <tr><td><kbd class="badge">/</kbd></td><td>Focus Global Search Bar</td></tr>
          <tr><td><kbd class="badge">?</kbd></td><td>Open this Keyboard Shortcuts Guide</td></tr>
        </tbody>
      </table>
    </div>
    <div class="section-card">
      <h4>Mouse & Touch Gestures</h4>
      <ul style="padding-left:16px; font-size:12px; display:flex; flex-direction:column; gap:6px;">
        <li><strong>Mouse:</strong> Left-drag to Pan • Right-drag (or Shift+drag) to Orbit • Scroll Wheel to Zoom • Click to Select • Double-click to Zoom-Focus.</li>
        <li><strong>Touch:</strong> 1-Finger drag to Orbit • 2-Finger drag to Pan + Pinch to Zoom • Tap to Select • Double-tap to Focus.</li>
        <li><strong>Minimap & D-Pad:</strong> Click or drag anywhere on the bottom-right City Radar minimap or use the bottom-left on-screen camera buttons.</li>
      </ul>
    </div>
  `,document.getElementById("modal-backdrop").style.display="flex"}function km(){const i=P.getViewState();document.getElementById("modal-title").textContent="Educational Market Alerts (Simulated Dataset)";const e=document.getElementById("modal-body");e.innerHTML=`
    <div class="edu-block">
      Alerts monitor the active dataset (${i.dataMode}) and explain when a company or sector crosses your custom movement threshold.
    </div>
    <div class="section-card">
      <h4>Create New Percentage Movement Alert</h4>
      <div style="display:grid; grid-template-columns:1fr 90px auto; gap:6px;">
        <select id="new-alert-comp">
          ${i.companies.map(n=>`<option value="${n.id}">${n.symbol}</option>`).join("")}
        </select>
        <input type="number" id="new-alert-pct" value="2.0" step="0.5" min="0.5" placeholder="±%" />
        <button class="primary" id="add-alert-submit-btn">+ Add Alert</button>
      </div>
    </div>
    <div class="section-card">
      <h4>Active Alert Rules (${i.alerts.length})</h4>
      ${i.alerts.map(n=>`
        <div style="font-size:12px; padding:4px 0; border-bottom:1px solid var(--border-subtle);">${n.description}</div>
      `).join("")}
    </div>
    <div class="section-card">
      <h4>Triggered Notifications Log (${i.triggeredAlerts.length})</h4>
      ${i.triggeredAlerts.length===0?'<div style="color:var(--text-secondary); font-size:12px;">No alerts triggered yet in this session.</div>':i.triggeredAlerts.map(n=>`<div style="padding:5px 0; border-bottom:1px solid var(--border-subtle); font-size:11.5px;">🔔 ${n}</div>`).join("")}
    </div>
  `;const t=e.querySelector("#add-alert-submit-btn");t&&t.addEventListener("click",()=>{const n=P.getLiveState(),s=document.getElementById("new-alert-comp").value,r=parseFloat(document.getElementById("new-alert-pct").value)||2,a=n.companies.find(o=>o.id===s);a&&(n.alerts.push({id:"A"+Date.now(),type:"COMPANY_PCT",targetId:s,thresholdPct:r,description:`${a.symbol} moves more than ±${r.toFixed(1)}%`}),P.savePersistedState(),Gf(n),P.emit("alerts"),km())}),document.getElementById("modal-backdrop").style.display="flex"}function zm(){const i=P.getViewState();document.getElementById("modal-title").textContent="Environment, Render Quality & Accessibility Settings";const e=document.getElementById("modal-body");e.innerHTML=`
    <div class="section-card">
      <h4>Visual, Audio & Accessibility Controls</h4>
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>3D Graphics Quality (Active: <strong>${i.resolvedQuality}</strong>)</span>
          <select id="modal-quality-select">
            <option value="AUTO" ${i.graphicsQuality==="AUTO"?"selected":""}>Auto-Detect</option>
            <option value="HIGH" ${i.graphicsQuality==="HIGH"?"selected":""}>High (Bloom + SMAA + Soft Shadows)</option>
            <option value="MEDIUM" ${i.graphicsQuality==="MEDIUM"?"selected":""}>Medium</option>
            <option value="LOW" ${i.graphicsQuality==="LOW"?"selected":""}>Low (Battery Saver)</option>
          </select>
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Post-Processing (Selective Emissive Bloom, SMAA, Vignette)</span>
          <input type="checkbox" id="modal-postfx-checkbox" ${i.postFxEnabled?"checked":""} />
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Depth-of-Field (Focus Blur when a Building is Selected)</span>
          <input type="checkbox" id="modal-dof-checkbox" ${i.dofEnabled?"checked":""} />
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Web Audio Sound Effects (Off by default)</span>
          <input type="checkbox" id="modal-sound-checkbox" ${i.soundEnabled?"checked":""} />
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Sector-Performance Ground Heatmap</span>
          <input type="checkbox" id="modal-heatmap-checkbox" ${i.heatmapMode?"checked":""} />
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Interface & 3D City Theme (Dark Navy vs. Daylight Palette)</span>
          <button id="toggle-theme-modal-btn">Toggle UI & 3D Theme</button>
        </label>
        <label style="display:flex; justify-content:space-between; align-items:center;">
          <span>Reduced Motion (Respects OS prefers-reduced-motion)</span>
          <input type="checkbox" id="reduced-motion-checkbox" ${i.reducedMotion?"checked":""} />
        </label>
        <div style="border-top:1px solid var(--border-subtle); padding-top:8px; display:flex; justify-content:space-between; align-items:center;">
          <span>Automated Engine & 18 Acceptance Tests</span>
          <button class="primary" id="modal-run-qa-btn">🧪 Run QA Suite</button>
        </div>
      </div>
    </div>
    <div class="edu-block">
      <strong>Accessibility Note:</strong> Positive and negative movements in MarketVerse always include explicit directional symbols (▲ +, ▼ -, •) alongside green/red/amber colors.
    </div>
  `,e.querySelector("#modal-quality-select").addEventListener("change",t=>{const n=t.target.value;Ba(n);const s=document.getElementById("quality-select");s&&(s.value=n),zm()}),e.querySelector("#modal-postfx-checkbox").addEventListener("change",t=>{P.getLiveState().postFxEnabled=t.target.checked,Ba(P.getLiveState().graphicsQuality)}),e.querySelector("#modal-dof-checkbox").addEventListener("change",t=>{P.getLiveState().dofEnabled=t.target.checked,Ba(P.getLiveState().graphicsQuality)}),e.querySelector("#modal-sound-checkbox").addEventListener("change",t=>{const n=P.getLiveState();n.soundEnabled=t.target.checked;const s=document.getElementById("sound-top-btn");s&&(s.textContent=n.soundEnabled?"🔊":"🔇",s.classList.toggle("active",n.soundEnabled))}),e.querySelector("#modal-heatmap-checkbox").addEventListener("change",t=>{const n=P.getLiveState();n.heatmapMode=t.target.checked;const s=document.getElementById("heatmap-toggle-btn");s&&(s.classList.toggle("active",n.heatmapMode),s.textContent=n.heatmapMode?"🔥 Sector Heatmap: On":"🔥 Sector Heatmap: Off"),He(P.getViewState())}),e.querySelector("#toggle-theme-modal-btn").addEventListener("click",()=>{document.body.classList.toggle("light-ui"),P.getLiveState().lightUiTheme=document.body.classList.contains("light-ui"),P.emit("settings")}),e.querySelector("#reduced-motion-checkbox").addEventListener("change",t=>{P.getLiveState().reducedMotion=t.target.checked,P.emit("settings")}),e.querySelector("#modal-run-qa-btn").addEventListener("click",Wu),document.getElementById("modal-backdrop").style.display="flex"}function pE(){const i=document.getElementById("modal-close-btn"),e=document.getElementById("modal-backdrop");i&&i.addEventListener("click",()=>{e.style.display="none"}),e&&e.addEventListener("click",t=>{t.target.id==="modal-backdrop"&&(e.style.display="none")})}let yi=null;function Bl(i="select"){if(P.getViewState().soundEnabled)try{if(!yi){const s=window.AudioContext||window.webkitAudioContext;if(!s)return;yi=new s}yi.state==="suspended"&&yi.resume();const e=yi.createOscillator(),t=yi.createGain(),n=yi.currentTime;i==="event"?(e.type="triangle",e.frequency.setValueAtTime(220,n),e.frequency.exponentialRampToValueAtTime(330,n+.28),t.gain.setValueAtTime(.08,n),t.gain.exponentialRampToValueAtTime(.001,n+.32),e.connect(t),t.connect(yi.destination),e.start(n),e.stop(n+.34)):(e.type="sine",e.frequency.setValueAtTime(520,n),e.frequency.exponentialRampToValueAtTime(660,n+.12),t.gain.setValueAtTime(.06,n),t.gain.exponentialRampToValueAtTime(.001,n+.14),e.connect(t),t.connect(yi.destination),e.start(n),e.stop(n+.15))}catch{}}const nl=[{title:"1. Building = Listed Company",desc:"Every tower in MarketVerse represents one listed Indian company. Click any building to inspect its live price, share count, and financial fundamentals.",action:()=>rt("COMPANY","C06",!0,!1)},{title:"2. Height = Market Capitalization",desc:"Building height encodes Market Cap (Share Price × Outstanding Shares). Remember: a taller tower reflects larger equity scale, never superior investment quality.",action:()=>rt("COMPANY","C11",!0,!1)},{title:"3. Roof Beacon = Daily Change (%)",desc:"The glowing roof crown and directional ticker badge (▲ / ▼ / •) show percentage movement vs. previous close, while window light density reflects relative trading volume.",action:()=>rt("COMPANY","C01",!0,!1)},{title:"4. District = Economic Sector",desc:'Companies are grouped into 10 color-coded Sector Districts around the Central Stock Exchange. Toggle "🔥 Sector Heatmap" in Scene settings to see cap-weighted sector performance.',action:()=>{io(),Wn("ENTIRE")}}];let Ai=0;const Nc=[{startSec:0,title:"Chapter 1/5 — Opening Bell at the Central Exchange (0:00–0:12)",desc:"Welcome to MarketVerse. At the city center stands the Stock Exchange HQ, matching buy and sell orders by price-time priority while the rotating ticker band broadcasts top movers.",onEnter:()=>{const i=P.getLiveState();i.weather="CLEAR",i.isNight=!1,El(P.getViewState()),rt("EXCHANGE","CENTRAL_EXCHANGE",!0)}},{startSec:12,title:"Chapter 2/5 — Company Scale vs. Share Price (0:12–0:24)",desc:"Inspecting Indus Energy (INDUSPET): Tower height represents Market Cap = Share Price × Outstanding Shares. A high nominal share price does not make a company large without share count.",onEnter:()=>{rt("COMPANY","C11",!0)}},{startSec:24,title:"Chapter 3/5 — Mid-Session Rate Hike & Sector Heatmap (0:24–0:36)",desc:"Simulating a hypothetical +50 bps Central Bank Interest Rate Hike! Notice the 5-second cold-blue atmospheric cue and Sector Heatmap showing rate-sensitive sectors reacting.",onEnter:()=>{const i=P.getLiveState();i.heatmapMode=!0,wl("RATE_HIKE"),rt("SECTOR","BANKING",!0),He(P.getViewState())}},{startSec:36,title:"Chapter 4/5 — Post-Trade Clearing & Depository (0:36–0:48)",desc:"Matched trades travel along fiber-optic data links to the Clearing Corporation (T+1 novation guarantee) and Central Depository (where Demat shares are legally held).",onEnter:()=>{ss(),rt("INFRA","INFRA_CLEARING",!0)}},{startSec:48,title:"Chapter 5/5 — Closing Bell & Portfolio Diversification (0:48–1:00)",desc:"As evening falls over the Diversified Portfolio Garden, spreading holdings across uncorrelated sectors cushions individual shocks. Story Mode concluding at the full city overlook!",onEnter:()=>{const i=P.getLiveState();i.heatmapMode=!1,i.weather="EVENING",El(P.getViewState()),rt("LEARN","LEARN_DIVERSIFY",!0),He(P.getViewState())}}];let il=null,dr=0,Uc=-1;function mE(){Tl(!1);const i=document.getElementById("onboarding-card");i&&(i.style.display="none");const e=document.getElementById("story-banner");e&&(e.style.display="block"),P.getLiveState().storyModeActive=!0,dr=0,Uc=-1;const t=()=>{if(dr>=60){Tl(!0);return}let n=0;for(let r=Nc.length-1;r>=0;r--)if(dr>=Nc[r].startSec){n=r;break}if(n!==Uc){Uc=n;const r=Nc[n];document.getElementById("story-chapter-title").textContent=`🎬 ${r.title}`,document.getElementById("story-chapter-desc").textContent=r.desc,Bl("select"),r.onEnter()}const s=Math.max(0,60-dr);document.getElementById("story-timer-badge").textContent=`${s}s left`,document.getElementById("story-progress-fill").style.width=`${dr/60*100}%`,dr++};t(),il=setInterval(t,1e3)}function Tl(i=!1){il&&(clearInterval(il),il=null),P.getLiveState().storyModeActive=!1;const e=document.getElementById("story-banner");e&&(e.style.display="none"),i&&(io(),Wn("ENTIRE"),kt("🎬 60-Second Market Session Story complete!"))}function gE(i){const e=Vf(i),t=document.getElementById("nav-companies-label");t&&(t.textContent=`2. Companies (${e.listedCount})`);const n=document.getElementById("nav-sectors-label");n&&(n.textContent=`3. Sectors (${e.sectorCount})`);const s=document.getElementById("nav-learn-label");s&&(s.textContent=`9. Learn Finance (${e.lessonCount})`);const r=document.getElementById("btab-companies-btn");r&&(r.textContent=`Companies (${e.listedCount})`);const a=document.getElementById("btab-sectors-btn");a&&(a.textContent=`Sectors (${e.sectorCount})`)}function Sa(i,e){const t=document.getElementById("loading-bar-fill"),n=document.getElementById("loading-status-text");t&&(t.style.width=`${i}%`),n&&e&&(n.textContent=e)}function vE(){Sa(100,"City Ready!");const i=document.getElementById("loading-screen");let e=!1;try{e=localStorage.getItem("mv_visited_v1")==="true",localStorage.setItem("mv_visited_v1","true")}catch{}setTimeout(()=>{i&&(i.style.opacity="0",setTimeout(()=>{i.style.display="none"},380)),e?Wn("ENTIRE"):oS(()=>{Kd()})},220);const t=document.getElementById("skip-flyin-btn");t&&t.addEventListener("click",()=>{Tm(),Kd()});const n=document.getElementById("stop-story-btn");n&&n.addEventListener("click",()=>Tl(!1)),xE()}function jd(){if(!document.getElementById("onboarding-card"))return;const e=nl[Ai];if(!e)return;document.getElementById("onboarding-step-badge").textContent=`Step ${Ai+1} of ${nl.length}`,document.getElementById("onboarding-title").textContent=e.title,document.getElementById("onboarding-desc").textContent=e.desc;const t=document.getElementById("onboarding-prev-btn"),n=document.getElementById("onboarding-next-btn");t&&(t.disabled=Ai===0),n&&(n.textContent=Ai===nl.length-1?"Finish ✓":"Next →"),e.action()}function Kd(){Tl(!1),Ai=0;const i=document.getElementById("onboarding-card");i&&(i.style.display="block",jd())}function xE(){const i=document.getElementById("onboarding-card"),e=document.getElementById("onboarding-close-btn"),t=document.getElementById("onboarding-prev-btn"),n=document.getElementById("onboarding-next-btn");e&&e.addEventListener("click",()=>{i&&(i.style.display="none")}),t&&t.addEventListener("click",()=>{Ai>0&&(Ai--,jd())}),n&&n.addEventListener("click",()=>{Ai<nl.length-1?(Ai++,jd()):i&&(i.style.display="none",kt("Tour complete! Click any building or press ? for keyboard shortcuts."))})}function _E(){const i=document.getElementById("city-canvas");if(!i)return;Fm(D.target);const e=document.createElement("canvas");e.width=i.width,e.height=i.height;const t=e.getContext("2d");t.drawImage(i,0,0);const n=P.getViewState(),s=Math.max(44,Math.round(e.height*.055));t.fillStyle="rgba(16, 24, 32, 0.88)",t.fillRect(0,e.height-s,e.width,s),t.strokeStyle="#4B8BE8",t.lineWidth=2,t.beginPath(),t.moveTo(0,e.height-s),t.lineTo(e.width,e.height-s),t.stroke();const r=Math.max(13,Math.round(s*.36));t.font=`bold ${r}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,t.fillStyle="#F2F5F7",t.textBaseline="middle",t.fillText("MARKETVERSE — The Living 3D Stock Market City (Educational Simulation)",18,e.height-s*.5);const a=n.indices.NIFTY,o=n.indices.SENSEX,l=`NIFTY (Sim): ${a.current.toFixed(2)} (${a.changePercent>=0?"+":""}${a.changePercent.toFixed(2)}%)  |  SENSEX (Sim): ${o.current.toFixed(2)}`;t.font=`${Math.max(11,Math.round(s*.32))}px monospace`,t.fillStyle="#AAB6C2",t.textAlign="right",t.fillText(l,e.width-18,e.height-s*.5);const c=document.createElement("a");c.download=`MarketVerse-City-${Date.now()}.png`,c.href=e.toDataURL("image/png"),c.click(),kt("📷 Watermarked city screenshot downloaded!")}const yE={NONE:"⚖️",RATE_HIKE:"📈",RATE_CUT:"📉",OIL_SPIKE:"🛢️",TECH_SELLOFF:"💻",STRONG_EARNINGS:"🏆",INR_DEPREC:"💱",RISK_OFF:"🛡️"},Wo={nifty:22450,sensex:73890};function Ff(i,e,t,n){const s=document.getElementById(i);if(!s)return;if(Math.abs(t-e)<.01||P.getViewState().reducedMotion){s.textContent=n(t);return}const r=performance.now(),a=260;function o(l){const c=Math.min(1,(l-r)/a),d=e+(t-e)*c;s.textContent=n(d),c<1&&requestAnimationFrame(o)}requestAnimationFrame(o)}function bE(i){const e=P.getLiveState();e.beginnerMode=i;const t=document.getElementById("edu-mode-label");t&&(t.textContent=i?"Beginner":"Pro"),i?e.heatmapMode=!1:(e.heatmapMode=!0,document.body.classList.remove("bottom-collapsed"));const n=document.getElementById("heatmap-toggle-btn");n&&(n.classList.toggle("active",e.heatmapMode),n.textContent=e.heatmapMode?"🔥 Sector Heatmap: On":"🔥 Sector Heatmap: Off"),He(P.getViewState()),P.emit("settings"),kt(i?"Beginner Preset active: simplified core metrics & guided callouts.":"Pro Preset active: P/E & Yield valuation columns + Sector Heatmap enabled.")}function ka(i=P.getViewState()){const e=document.getElementById("events-popover-list");e&&(e.innerHTML=Object.values(Ci).map(t=>{const n=i.activeEventId===t.id,s=yE[t.id]||"⚡";return`
        <div class="event-popover-item ${n?"active":""}" role="menuitem" tabindex="0" data-ev-item="${t.id}">
          <span style="font-size:16px;">${s}</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:var(--text-sm);">${t.name}</div>
            <div style="font-size:11px; color:var(--text-secondary);">${t.description}</div>
          </div>
        </div>
      `}).join(""),e.querySelectorAll("[data-ev-item]").forEach(t=>{const n=()=>{const s=t.dataset.evItem;s==="NONE"?(ss(),He(P.getViewState()),kt("Active event ended. Live simulation continues.")):(wl(s),Bl("event"),He(P.getViewState()),kt(`⚡ Event triggered: ${Ci[s].name}`)),document.getElementById("events-popover-menu").style.display="none"};t.addEventListener("click",n),t.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),n())})}))}function Rs(i=P.getViewState()){const e=document.getElementById("sim-clock-display"),t=document.getElementById("session-dot"),n=document.getElementById("session-label");i.dataMode==="REAL_DATA"?(t.className="status-dot unavail",n.textContent="UNCONFIGURED",e.textContent="NO LIVE FEED"):(t.className="status-dot"+(i.simRunning?"":" paused"),n.textContent=i.replayIndex!==-1?"REPLAY":i.simRunning?"SIMULATED":"PAUSED",e.textContent=Qd(i.simSecondsFromOpen));const s=document.getElementById("heatmap-legend-pill");s&&(s.style.display=i.heatmapMode?"inline-flex":"none");const r=document.getElementById("replay-slider"),a=document.getElementById("replay-step-label"),o=document.getElementById("replay-live-btn");r&&(r.max=Math.max(0,i.replayHistory.length-1),i.replayIndex===-1?(r.value=r.max,a&&(a.textContent="Live"),o&&(o.style.display="none")):(r.value=i.replayIndex,a&&(a.textContent=`Tick #${i.simTickCount}`),o&&(o.style.display="inline-block")));const l=document.getElementById("event-decay-badge"),c=document.getElementById("end-event-btn");i.activeEventId&&i.activeEventId!=="NONE"?(l&&(l.style.display="inline-flex",l.textContent=`${i.eventRemainingTicks}t`),c&&(c.style.display="inline-block")):(l&&(l.style.display="none"),c&&(c.style.display="none"));const d=document.getElementById("alert-count-badge");d&&(d.textContent=i.triggeredAlerts.length);const u=i.dataMode==="REAL_DATA",h=i.indices.NIFTY;u?document.getElementById("card-nifty-val").textContent="Unavailable":(Ff("card-nifty-val",Wo.nifty,h.current,b=>b.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})),Wo.nifty=h.current);const f=document.getElementById("card-nifty-chg");f.textContent=u?"No Feed":We(h.changePercent),f.className=`badge num ${h.changePercent>=0?"pos":"neg"}`,document.getElementById("card-nifty-prev").textContent=u?"Configure Adapter":`Base: ${h.baseLevel.toLocaleString("en-IN")} (${h.constituentCount} const.)`,Go("spark-nifty",h.history,h.changePercent>=0?"#22A06B":"#E05255");const g=i.indices.SENSEX;u?document.getElementById("card-sensex-val").textContent="Unavailable":(Ff("card-sensex-val",Wo.sensex,g.current,b=>b.toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})),Wo.sensex=g.current);const v=document.getElementById("card-sensex-chg");v.textContent=u?"No Feed":We(g.changePercent),v.className=`badge num ${g.changePercent>=0?"pos":"neg"}`,document.getElementById("card-sensex-prev").textContent=u?"Configure Adapter":`Base: ${g.baseLevel.toLocaleString("en-IN")} (${g.constituentCount} const.)`,Go("spark-sensex",g.history,g.changePercent>=0?"#22A06B":"#E05255");const m=i.totals;document.getElementById("card-mcap-val").textContent=u?"Unavailable":dn(m.mcapCr);const p=document.getElementById("card-mcap-chg");p.textContent=u?"No Feed":We(m.mcapChangePct),p.className=`badge num ${m.mcapChangePct>=0?"pos":"neg"}`,document.getElementById("card-mcap-count").textContent=`${m.listedCount} Listed Companies`,Go("spark-mcap",m.mcapHistory,m.mcapChangePct>=0?"#22A06B":"#E05255"),document.getElementById("card-vol-val").textContent=u?"Unavailable":`${m.volumeCr.toFixed(2)} Cr sh`;const _=document.getElementById("card-mood-badge");_.textContent=u?"UNAVAILABLE":m.mood,_.className=`badge ${m.mood==="BULLISH"?"pos":m.mood==="BEARISH"?"neg":"neu"}`,document.getElementById("card-breadth-mini").textContent=`Adv: ${m.advancing} | Dec: ${m.declining} | Unch: ${m.unchanged}`,Go("spark-vol",m.volHistory.length>1?m.volHistory:[1,1.1],"#4B8BE8")}function ME(){const i=document.getElementById("global-search"),e=document.getElementById("search-results");!i||!e||(i.addEventListener("input",()=>{const t=i.value.trim().toLowerCase();if(!t){e.style.display="none";return}const n=P.getViewState(),s=[];n.companies.forEach(r=>{(r.symbol.toLowerCase().includes(t)||r.companyName.toLowerCase().includes(t))&&s.push({label:`${r.symbol} — ${r.companyName}`,sub:`${tt(r.price)} (${We(r.changePercent)})`,typeLabel:"Company",action:()=>rt("COMPANY",r.id,!0)})}),Gn.forEach(r=>{(r.name.toLowerCase().includes(t)||r.short.toLowerCase().includes(t))&&s.push({label:r.name,sub:"Sector District",typeLabel:"Sector",action:()=>rt("SECTOR",r.id,!0)})}),Di.forEach(r=>{(r.name.toLowerCase().includes(t)||r.role.toLowerCase().includes(t))&&s.push({label:r.name,sub:r.role,typeLabel:"Infrastructure",action:()=>rt("INFRA",r.id,!0)})}),Object.entries(Jr).forEach(([r,a])=>{(a.title.toLowerCase().includes(t)||a.meaning.toLowerCase().includes(t))&&s.push({label:a.title,sub:"Interactive Financial Lesson",typeLabel:"Concept",action:()=>sa(r)})}),e.innerHTML="",s.length===0?e.innerHTML=`<div style="padding:10px; color:var(--text-secondary);">No matching companies, sectors, or concepts found for "${i.value}".</div>`:s.slice(0,10).forEach(r=>{const a=document.createElement("div");a.className="search-item",a.innerHTML=`
          <div>
            <div style="font-weight:600;">${r.label}</div>
            <div style="font-size:11px; color:var(--text-secondary);">${r.sub}</div>
          </div>
          <span class="search-item-type">${r.typeLabel}</span>
        `,a.addEventListener("click",()=>{e.style.display="none",i.value="",r.action()}),e.appendChild(a)}),e.style.display="block"}),document.addEventListener("click",t=>{!i.contains(t.target)&&!e.contains(t.target)&&(e.style.display="none")}))}function SE(){const i=document.getElementById("events-popover-btn"),e=document.getElementById("events-popover-menu"),t=document.getElementById("scene-popover-btn"),n=document.getElementById("scene-popover-menu");i&&e&&i.addEventListener("click",s=>{s.stopPropagation();const r=e.style.display==="block";n&&(n.style.display="none"),r||ka(P.getViewState()),e.style.display=r?"none":"block",i.setAttribute("aria-expanded",String(!r))}),t&&n&&t.addEventListener("click",s=>{s.stopPropagation();const r=n.style.display==="block";e&&(e.style.display="none"),n.style.display=r?"none":"block",t.setAttribute("aria-expanded",String(!r))}),document.addEventListener("click",s=>{e&&!e.contains(s.target)&&s.target!==i&&(e.style.display="none"),n&&!n.contains(s.target)&&s.target!==t&&(n.style.display="none")})}function EE(){ME(),SE(),ka(P.getViewState()),document.getElementById("exchange-select").addEventListener("change",l=>{P.getLiveState().exchangeFilter=l.target.value,He(P.getViewState()),P.emit("filter")}),document.getElementById("data-mode-select").addEventListener("change",l=>{const c=P.getLiveState();c.dataMode=l.target.value,$i(c),He(P.getViewState()),P.emit("settings"),P.emit("tick")}),document.getElementById("edu-mode-btn").addEventListener("click",()=>{bE(!P.getLiveState().beginnerMode)});const i=document.getElementById("sound-top-btn");i&&i.addEventListener("click",()=>{const l=P.getLiveState();l.soundEnabled=!l.soundEnabled,i.textContent=l.soundEnabled?"🔊":"🔇",i.classList.toggle("active",l.soundEnabled),l.soundEnabled&&Bl("select"),kt(l.soundEnabled?"🔊 Web Audio sound effects enabled.":"🔇 Sound effects muted.")});const e=document.getElementById("story-top-btn");e&&e.addEventListener("click",mE);const t=document.getElementById("qa-top-btn");t&&t.addEventListener("click",Wu),document.getElementById("alerts-top-btn").addEventListener("click",km),document.getElementById("settings-top-btn").addEventListener("click",zm);const n=document.getElementById("tour-top-btn");n&&n.addEventListener("click",Kd);const s=document.getElementById("screenshot-top-btn");s&&s.addEventListener("click",_E);const r=document.getElementById("shortcuts-top-btn");r&&r.addEventListener("click",Bm);const a=document.getElementById("scene-theme-toggle-btn");a&&a.addEventListener("click",()=>{document.body.classList.toggle("light-ui"),P.getLiveState().lightUiTheme=document.body.classList.contains("light-ui"),P.emit("settings")}),document.getElementById("toggle-left-btn").addEventListener("click",()=>{document.body.classList.contains("left-icon-only")?document.body.classList.remove("left-icon-only"):document.body.classList.add("left-icon-only")}),document.getElementById("toggle-right-btn").addEventListener("click",()=>{document.body.classList.toggle("right-collapsed")}),document.getElementById("fullscreen-city-btn").addEventListener("click",()=>{const l=document.body.classList.contains("left-collapsed")&&document.body.classList.contains("right-collapsed")&&document.body.classList.contains("bottom-collapsed");document.body.classList.toggle("left-collapsed",!l),document.body.classList.toggle("right-collapsed",!l),document.body.classList.toggle("bottom-collapsed",!l)}),document.getElementById("reset-cam-btn").addEventListener("click",()=>Wn("ENTIRE")),document.getElementById("deselect-btn").addEventListener("click",io),document.querySelectorAll(".summary-card").forEach(l=>{l.addEventListener("click",c=>{if(c.target.classList.contains("help-icon"))return;const d=l.dataset.summaryCard;d==="NIFTY"||d==="SENSEX"?zs("indices"):(d==="MCAP"||d==="VOL")&&zs("overview")})}),document.querySelectorAll(".help-icon[data-concept]").forEach(l=>{l.addEventListener("click",c=>{c.stopPropagation(),sa(l.dataset.concept)})});const o=document.getElementById("sim-play-pause-btn");o.addEventListener("click",()=>{const l=P.getLiveState();l.simRunning=!l.simRunning,Ri(),o.textContent=l.simRunning?"⏸ Pause":"▶ Resume",He(P.getViewState()),Rs(P.getViewState())}),document.querySelectorAll(".sim-speed-btn").forEach(l=>{l.addEventListener("click",()=>{P.getLiveState().simSpeed=parseFloat(l.dataset.speed),document.querySelectorAll(".sim-speed-btn").forEach(c=>c.classList.toggle("active",c===l))})}),document.getElementById("sim-step-btn").addEventListener("click",()=>{Ri(),Mi(),He(P.getViewState())}),document.getElementById("sim-reset-btn").addEventListener("click",()=>{Al(),He(P.getViewState()),kt("Simulation reset to initial deterministic seed state.")}),document.getElementById("replay-slider").addEventListener("input",l=>{const c=parseInt(l.target.value,10);Wf(c),He(P.getViewState())}),document.getElementById("replay-live-btn").addEventListener("click",()=>{Ri(),He(P.getViewState())}),document.getElementById("end-event-btn").addEventListener("click",()=>{ss(),He(P.getViewState()),kt("Active event ended without resetting simulation.")})}function sl(){const i=P.getViewState().activeBottomTab;document.querySelectorAll(".tab-btn").forEach(e=>e.classList.toggle("active",e.dataset.btab===i))}function Oc(i){const e=Array.from(i.querySelectorAll('tbody tr[tabindex="0"]'));e.forEach((t,n)=>{t.addEventListener("keydown",s=>{s.key==="Enter"||s.key===" "?(s.preventDefault(),t.click()):s.key==="ArrowDown"&&n<e.length-1?(s.preventDefault(),e[n+1].focus()):s.key==="ArrowUp"&&n>0&&(s.preventDefault(),e[n-1].focus())})})}function za(i=P.getViewState()){const e=document.getElementById("bottom-content");if(!e)return;if(i.dataMode==="REAL_DATA"){e.innerHTML='<div class="edu-block warn">Real-Data Adapter Mode is selected without a configured NSE/BSE provider endpoint. Switch back to <strong>Sim Mode</strong> in the top bar to view live simulated tables and charts.</div>';return}const t=i.tableFilter.trim().toLowerCase();if(i.activeBottomTab==="companies"){const n=i.companies.filter(a=>i.exchangeFilter!=="ALL"&&a.exchange!==i.exchangeFilter?!1:t?a.symbol.toLowerCase().includes(t)||a.companyName.toLowerCase().includes(t)||vn[a.sector].name.toLowerCase().includes(t):!0);if(n.length===0){e.innerHTML=`<div class="edu-block warn">No companies match filter "${i.tableFilter}". Clear the filter box above to see all listed companies.</div>`;return}const{col:s,asc:r}=i.tableSort;n.sort((a,o)=>{const l=a[s],c=o[s];return l===null?1:c===null?-1:typeof l=="string"?r?l.localeCompare(c):c.localeCompare(l):r?l-c:c-l}),e.innerHTML=`
      <table class="data-table" aria-label="Listed Companies Table">
        <thead>
          <tr>
            <th data-sort-col="symbol" tabindex="0">Ticker</th>
            <th data-sort-col="companyName" tabindex="0">Company Name</th>
            <th data-sort-col="sector" tabindex="0">Sector</th>
            <th data-sort-col="exchange" tabindex="0">Exch</th>
            <th data-sort-col="price" tabindex="0">Price (₹)</th>
            <th data-sort-col="changePercent" tabindex="0">Change (%)</th>
            <th data-sort-col="marketCap" tabindex="0">Market Cap</th>
            <th data-sort-col="volume" tabindex="0">Volume</th>
            ${i.beginnerMode?"":'<th data-sort-col="pe" tabindex="0">P/E</th><th data-sort-col="divYield" tabindex="0">Div Yield</th>'}
          </tr>
        </thead>
        <tbody>
          ${n.map(a=>{const o=i.selectedObject&&i.selectedObject.type==="COMPANY"&&i.selectedObject.id===a.id,l=vn[a.sector];return`
                <tr tabindex="0" class="${o?"selected-row":""}" data-comp-row="${a.id}">
                  <td style="font-weight:700;">${a.symbol}</td>
                  <td>${a.companyName}</td>
                  <td><span style="color:${l.color}; font-weight:600;">${l.short}</span></td>
                  <td>${a.exchange}</td>
                  <td class="num">${tt(a.price)}</td>
                  <td class="num ${a.changePercent>=0?"pos-text":"neg-text"}">${We(a.changePercent)}</td>
                  <td class="num">${dn(a.marketCap)}</td>
                  <td class="num">${a.volume.toLocaleString("en-IN")}</td>
                  ${i.beginnerMode?"":`
                    <td class="num">${a.pe!==null?a.pe.toFixed(1)+"×":"Unavailable"}</td>
                    <td class="num">${a.divYield!==null?a.divYield.toFixed(2)+"%":"Unavailable"}</td>
                  `}
                </tr>
              `}).join("")}
        </tbody>
      </table>
    `,e.querySelectorAll("[data-sort-col]").forEach(a=>{const o=()=>{const l=a.dataset.sortCol,c=P.getLiveState();c.tableSort.col===l?c.tableSort.asc=!c.tableSort.asc:(c.tableSort.col=l,c.tableSort.asc=l==="symbol"||l==="companyName"),za(P.getViewState())};a.addEventListener("click",o),a.addEventListener("keydown",l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),o())})}),e.querySelectorAll("[data-comp-row]").forEach(a=>{a.addEventListener("click",()=>rt("COMPANY",a.dataset.compRow,!0))}),Oc(e)}else if(i.activeBottomTab==="sectors")e.innerHTML=`
      <table class="data-table" aria-label="Sector Districts Table">
        <thead>
          <tr>
            <th>Sector District</th>
            <th>Companies</th>
            <th>Sector Market Cap</th>
            <th>Dataset Weight</th>
            <th>Cap-Weighted Change</th>
            <th>Equal-Weighted Change</th>
            <th>Top Performer</th>
          </tr>
        </thead>
        <tbody>
          ${Gn.map(n=>{const s=es(n.id,i),r=i.totals.mcapCr>0?(s.totalMcap/i.totals.mcapCr*100).toFixed(2):"0.00";return`
              <tr tabindex="0" data-sec-row="${n.id}">
                <td style="font-weight:700; color:${n.color};">■ ${n.name}</td>
                <td class="num">${s.companies.length}</td>
                <td class="num">${dn(s.totalMcap)}</td>
                <td class="num">${r}%</td>
                <td class="num ${s.capWeightedChangePct>=0?"pos-text":"neg-text"}">${We(s.capWeightedChangePct)}</td>
                <td class="num ${s.equalWeightedChangePct>=0?"pos-text":"neg-text"}">${We(s.equalWeightedChangePct)}</td>
                <td>${s.strongest?`${s.strongest.symbol} (${We(s.strongest.changePercent)})`:"—"}</td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    `,e.querySelectorAll("[data-sec-row]").forEach(n=>{n.addEventListener("click",()=>rt("SECTOR",n.dataset.secRow,!0))}),Oc(e);else if(i.activeBottomTab==="indices"){const n=i.indices.NIFTY,s=i.indices.SENSEX;e.innerHTML=`
      <table class="data-table" aria-label="Market Indices Table">
        <thead>
          <tr>
            <th>Benchmark / Sector Index</th>
            <th>Methodology</th>
            <th>Current Level</th>
            <th>Base Reference</th>
            <th>Change (%)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr tabindex="0" class="idx-nav-row">
            <td style="font-weight:700;">NIFTY 50 (City Basket)</td>
            <td>Cap-Weighted (${n.constituentCount} City Constituents)</td>
            <td class="num">${n.current.toLocaleString("en-IN",{minimumFractionDigits:2})}</td>
            <td class="num">${n.baseLevel.toLocaleString("en-IN")}</td>
            <td class="num ${n.changePercent>=0?"pos-text":"neg-text"}">${We(n.changePercent)}</td>
            <td><span class="badge sim">SIMULATED</span></td>
          </tr>
          <tr tabindex="0" class="idx-nav-row">
            <td style="font-weight:700;">SENSEX (City Basket)</td>
            <td>Cap-Weighted (${s.constituentCount} City Constituents)</td>
            <td class="num">${s.current.toLocaleString("en-IN",{minimumFractionDigits:2})}</td>
            <td class="num">${s.baseLevel.toLocaleString("en-IN")}</td>
            <td class="num ${s.changePercent>=0?"pos-text":"neg-text"}">${We(s.changePercent)}</td>
            <td><span class="badge sim">SIMULATED</span></td>
          </tr>
          ${Gn.slice(0,6).map(r=>{const a=es(r.id,i),o=(1e4*(1+a.capWeightedChangePct/100)).toFixed(2);return`
                <tr tabindex="0" data-sec-row="${r.id}">
                  <td style="font-weight:600; color:${r.color};">MarketVerse ${r.short} Index</td>
                  <td>Sector Cap-Weighted (${a.companies.length} Constituents)</td>
                  <td class="num">${Number(o).toLocaleString("en-IN",{minimumFractionDigits:2})}</td>
                  <td class="num">10,000.00</td>
                  <td class="num ${a.capWeightedChangePct>=0?"pos-text":"neg-text"}">${We(a.capWeightedChangePct)}</td>
                  <td><span class="badge sim">SIMULATED</span></td>
                </tr>
              `}).join("")}
        </tbody>
      </table>
    `,e.querySelectorAll(".idx-nav-row").forEach(r=>{r.addEventListener("click",()=>zs("indices"))}),e.querySelectorAll("[data-sec-row]").forEach(r=>{r.addEventListener("click",()=>rt("SECTOR",r.dataset.secRow,!0))}),Oc(e)}else i.activeBottomTab==="events"?(e.innerHTML=`
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; gap:8px; flex-wrap:wrap;">
        <div style="font-size:var(--text-sm); color:var(--text-secondary);">
          Active Scenario: <strong>${Ci[i.activeEventId]?.name||"None"}</strong>
          ${i.eventRemainingTicks>0?`<span class="badge sim" style="margin-left:6px;">Decay: ${i.eventRemainingTicks} ticks remaining</span>`:""}
        </div>
        <div style="display:flex; gap:6px;">
          <button id="btab-end-event-btn">⏹ End Active Event (Keep Progress)</button>
          <button id="btab-reset-sim-btn">↺ Reset Full Simulation</button>
        </div>
      </div>
      <table class="data-table" aria-label="Hypothetical Economic Events Table">
        <thead>
          <tr>
            <th>Hypothetical Economic Event</th>
            <th>Plain-Language Description</th>
            <th>Primary Affected Sectors</th>
            <th>Explicit Model Assumptions & Decay</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${Object.values(Ci).map(n=>`
            <tr>
              <td style="font-weight:700;">${n.name}</td>
              <td style="white-space:normal; max-width:260px;">${n.description}</td>
              <td style="white-space:normal; max-width:200px;">${n.sectorsAffected}</td>
              <td style="white-space:normal; max-width:250px; color:var(--text-secondary);">
                ${n.assumptions}
                ${n.durationTicks>0?`<br><span style="color:var(--accent);">Fades over ${n.durationTicks} ticks</span>`:""}
              </td>
              <td>
                <button data-trigger-ev="${n.id}" class="${i.activeEventId===n.id?"active":"primary"}">
                  ${n.id==="NONE"?"⏹ End Event":"⚡ Simulate Event"}
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `,e.querySelector("#btab-end-event-btn").addEventListener("click",()=>{ss(),He(P.getViewState()),ka(P.getViewState()),kt("Active event ended without resetting simulation.")}),e.querySelector("#btab-reset-sim-btn").addEventListener("click",()=>{Al(),He(P.getViewState()),ka(P.getViewState()),kt("Simulation reset to initial seed state.")}),e.querySelectorAll("[data-trigger-ev]").forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.triggerEv;s==="NONE"?(ss(),kt("Active event ended.")):(wl(s),kt(`⚡ Event triggered: ${Ci[s].name}`)),He(P.getViewState()),ka(P.getViewState())})})):i.activeBottomTab==="history"&&Vu(e,i)}function TE(i=P.getViewState()){const e=document.getElementById("bottom-content");e&&(i.activeBottomTab==="history"?Gu(e,i):za(i))}function wE(){document.querySelectorAll(".tab-btn").forEach(i=>{i.addEventListener("click",()=>{P.getLiveState().activeBottomTab=i.dataset.btab,sl(),document.body.classList.remove("bottom-collapsed"),P.emit("bottomTab")})}),document.getElementById("table-filter-input").addEventListener("input",i=>{P.getLiveState().tableFilter=i.target.value,P.emit("filter")}),document.getElementById("toggle-bottom-btn").addEventListener("click",()=>{document.body.classList.toggle("bottom-collapsed")})}function zs(i){const e=P.getLiveState();if(e.activeNavView=i,document.querySelectorAll(".nav-btn").forEach(t=>t.classList.toggle("active",t.dataset.view===i)),document.querySelectorAll(".mob-nav-btn").forEach(t=>t.classList.toggle("active",t.dataset.mobView===i)),i==="overview"&&Wn("ENTIRE"),["compare","watchlist","portfolio","whatif","learn","indices","overview"].includes(i)){e.selectedObject=null;const t=document.getElementById("deselect-btn");t&&(t.style.display="none"),document.body.classList.remove("right-collapsed")}i==="companies"?(e.activeBottomTab="companies",sl(),document.body.classList.remove("bottom-collapsed"),P.emit("bottomTab")):i==="sectors"?(e.activeBottomTab="sectors",sl(),document.body.classList.remove("bottom-collapsed"),P.emit("bottomTab")):i==="indices"&&(e.activeBottomTab="indices",sl(),P.emit("bottomTab")),He(P.getViewState()),P.emit("nav")}function AE(){window.innerWidth<=768&&document.body.classList.add("bottom-collapsed"),document.querySelectorAll(".mob-nav-btn").forEach(n=>{n.addEventListener("click",()=>{document.body.classList.remove("right-collapsed");const s=document.getElementById("right-panel");s&&s.classList.contains("sheet-peek")&&(s.classList.remove("sheet-peek"),s.classList.add("sheet-half")),zs(n.dataset.mobView)})});const i=document.getElementById("inspector-sheet-handle"),e=document.getElementById("right-panel");if(!i||!e)return;const t=()=>{e.classList.contains("sheet-peek")?(e.classList.remove("sheet-peek"),e.classList.add("sheet-half")):e.classList.contains("sheet-half")?(e.classList.remove("sheet-half"),e.classList.add("sheet-full")):(e.classList.remove("sheet-full"),e.classList.add("sheet-peek"))};i.addEventListener("click",t),i.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())})}function CE(){document.querySelectorAll(".nav-btn").forEach(r=>{r.addEventListener("click",()=>zs(r.dataset.view))}),document.querySelectorAll(".camera-preset-btn").forEach(r=>{r.addEventListener("click",()=>Wn(r.dataset.cam))});const i=document.getElementById("collapse-icon-mode-btn");i&&i.addEventListener("click",()=>{document.body.classList.toggle("left-icon-only")}),document.getElementById("day-night-btn").addEventListener("click",r=>{const a=P.getLiveState();a.autoDayNight=!1;const o=document.getElementById("auto-cycle-btn");o&&o.classList.remove("active"),a.isNight=!a.isNight,r.target.textContent=a.isNight?"🌙 Night":"☀️ Day",El(P.getViewState())});const e=document.getElementById("auto-cycle-btn");e&&e.addEventListener("click",()=>{const r=P.getLiveState();r.autoDayNight=!r.autoDayNight,e.classList.toggle("active",r.autoDayNight),kt(r.autoDayNight?"Automatic Day/Night solar cycle enabled.":"Automatic Day/Night cycle paused.")}),document.getElementById("labels-toggle-btn").addEventListener("click",r=>{const a=P.getLiveState();a.labelsVisible=!a.labelsVisible,r.target.classList.toggle("active",a.labelsVisible),He(P.getViewState())});const t=document.getElementById("atmo-override-btn");t&&t.addEventListener("click",()=>{const r=P.getLiveState();r.atmosphereOverride=!r.atmosphereOverride,t.classList.toggle("active",!r.atmosphereOverride),t.textContent=r.atmosphereOverride?"🌤️ Override":"🌤️ Mood Sky",kt(r.atmosphereOverride?"Market-driven sky tint overridden (manual neutral sky).":"Market-driven atmosphere enabled (Rally = Golden, Sell-off = Red Skyline).")});const n=document.getElementById("heatmap-toggle-btn");n&&n.addEventListener("click",()=>{const r=P.getLiveState();r.heatmapMode=!r.heatmapMode,n.classList.toggle("active",r.heatmapMode),n.textContent=r.heatmapMode?"🔥 Sector Heatmap: On":"🔥 Sector Heatmap: Off",He(P.getViewState()),kt(r.heatmapMode?"Sector-Performance Heatmap enabled on district plazas.":"Sector-Performance Heatmap disabled.")}),document.getElementById("weather-select").addEventListener("change",r=>{const a=P.getLiveState();a.weather=r.target.value,(a.weather==="NIGHT"||a.weather==="EVENING")&&(a.autoDayNight=!1,e&&e.classList.remove("active")),El(P.getViewState())});const s=document.getElementById("quality-select");s&&s.addEventListener("change",r=>{const a=r.target.value;Ba(a);const o=P.getLiveState().resolvedQuality;kt(`Graphics quality set to ${a} (Resolved: ${o}).`)}),AE()}function RE(i){if(!i||!document.activeElement)return!1;const e=document.activeElement;if(!i.contains(e))return!1;const t=e.tagName;return t==="INPUT"||t==="SELECT"||t==="TEXTAREA"}function Ne(i,e,t){if(!i)return;const n=i.querySelector(`[data-bind="${e}"]`);if(!n||n===document.activeElement)return;const s=String(t);n.textContent!==s&&(n.textContent=s)}function Pn(i,e,t,n){if(!i)return;const s=i.querySelector(`[data-bind="${e}"]`);if(!s||s===document.activeElement)return;const r=String(t);s.textContent!==r&&(s.textContent=r),n&&s.className!==n&&(s.className=n)}function Or(i,e,t,n){if(!i)return;const s=i.querySelector(`[data-bind="${e}"]`);s&&s.style[t]!==n&&(s.style[t]=n)}const ii=new Map;let Fc=0,Xo={x:0,y:0},Bf=0;function PE(){const i=document.getElementById("city-canvas");if(!i)return;i.addEventListener("contextmenu",t=>t.preventDefault()),i.addEventListener("dblclick",t=>Of(t)),i.addEventListener("pointerdown",t=>{if(Ma(),ii.set(t.pointerId,{x:t.clientX,y:t.clientY}),ii.size===1)D.isDragging=!0,t.pointerType==="touch"?D.dragMode="ROTATE":D.dragMode=t.button===2||t.shiftKey?"ROTATE":"PAN",D.prevMouse={x:t.clientX,y:t.clientY},D.downMouse={x:t.clientX,y:t.clientY};else if(ii.size===2){const n=Array.from(ii.values());Fc=Math.hypot(n[0].x-n[1].x,n[0].y-n[1].y),Xo={x:(n[0].x+n[1].x)*.5,y:(n[0].y+n[1].y)*.5}}}),window.addEventListener("pointermove",t=>{if(ii.has(t.pointerId)&&ii.set(t.pointerId,{x:t.clientX,y:t.clientY}),ii.size===2){Ma();const r=Array.from(ii.values()),a=Math.hypot(r[0].x-r[1].x,r[0].y-r[1].y),o={x:(r[0].x+r[1].x)*.5,y:(r[0].y+r[1].y)*.5},l=Fc-a;D.goalDistance+=l*.35,Fc=a;const c=o.x-Xo.x,d=o.y-Xo.y;Xo=o;const u=D.distance*.0016,h=-Math.sin(D.theta),f=-Math.cos(D.theta),g=Math.cos(D.theta),v=-Math.sin(D.theta);D.goalTarget.x-=(g*c-h*d)*u,D.goalTarget.z-=(v*c-f*d)*u;return}if(!D.isDragging){hE(t);return}Ma();const n=t.clientX-D.prevMouse.x,s=t.clientY-D.prevMouse.y;if(D.prevMouse={x:t.clientX,y:t.clientY},D.dragMode==="ROTATE"){const r=-n*.0065,a=-s*.0055;D.goalTheta+=r,D.goalPhi+=a,D.thetaVel=r*18,D.phiVel=a*18}else{const r=D.distance*.0014,a=-Math.sin(D.theta),o=-Math.cos(D.theta),l=Math.cos(D.theta),c=-Math.sin(D.theta),d=-(l*n-a*s)*r,u=-(c*n-o*s)*r;D.goalTarget.x+=d,D.goalTarget.z+=u,D.panVelX=d*16,D.panVelZ=u*16}});const e=t=>{if(ii.delete(t.pointerId),ii.size===0&&D.isDragging&&(D.isDragging=!1,Math.hypot(t.clientX-D.downMouse.x,t.clientY-D.downMouse.y)<6&&t.target===i)){const s=performance.now();t.pointerType==="touch"&&s-Bf<320?Of(t):dE(t),Bf=s}};window.addEventListener("pointerup",e),window.addEventListener("pointercancel",e),i.addEventListener("wheel",t=>{t.preventDefault(),Ma();const n=t.deltaY*.085;D.goalDistance+=n,D.zoomVel=n*8},{passive:!1}),LE(),IE(),NE()}function LE(){const i=(t,n)=>{const s=document.getElementById(t);s&&s.addEventListener("click",()=>{Ma(),n()})};i("cam-rot-left-btn",()=>{D.goalTheta+=.32}),i("cam-rot-right-btn",()=>{D.goalTheta-=.32}),i("cam-tilt-up-btn",()=>{D.goalPhi-=.14}),i("cam-tilt-down-btn",()=>{D.goalPhi+=.14}),i("cam-zoom-in-btn",()=>{D.goalDistance-=22}),i("cam-zoom-out-btn",()=>{D.goalDistance+=22});const e=document.getElementById("cam-idle-toggle-btn");e&&(e.classList.toggle("active",D.idleOrbitEnabled),e.addEventListener("click",()=>{D.idleOrbitEnabled=!D.idleOrbitEnabled,D.idleOrbitEnabled?D.idleTimer=8.1:D.isIdleOrbiting=!1,e.classList.toggle("active",D.idleOrbitEnabled)}))}function IE(){const i=document.getElementById("city-minimap"),e=document.getElementById("minimap-toggle-btn");if(!i)return;let t=!1;const n=s=>{const r=i.getBoundingClientRect(),a=(s.clientX-r.left)/r.width,o=(s.clientY-r.top)/r.height,l=(a-.5)*250,c=(o-.5)*240+8;gr({x:l,y:4,z:c},D.goalDistance,D.goalTheta,D.goalPhi,.45)};i.addEventListener("pointerdown",s=>{t=!0,n(s)}),window.addEventListener("pointermove",s=>{t&&n(s)}),window.addEventListener("pointerup",()=>{t=!1}),e&&e.addEventListener("click",()=>{const s=i.style.display==="none";i.style.display=s?"block":"none",e.textContent=s?"−":"+"})}function DE(){const i=document.getElementById("city-minimap");if(!i||i.style.display==="none")return;const e=i.getContext("2d"),t=i.width,n=i.height;e.fillStyle="#0c141d",e.fillRect(0,0,t,n);const s=u=>(u/250+.5)*t,r=u=>((u-8)/240+.5)*n;e.fillStyle="#154463",e.fillRect(s(-122),0,5,n),Gn.forEach(u=>{const h=s(u.center.x-u.size.w*.5),f=r(u.center.z-u.size.d*.5),g=u.size.w/250*t,v=u.size.d/240*n;e.fillStyle=u.color+"33",e.fillRect(h,f,g,v),e.strokeStyle=u.color,e.lineWidth=1,e.strokeRect(h,f,g,v)}),e.fillStyle="#4b8be8",e.beginPath(),e.arc(s(0),r(-24),5,0,Math.PI*2),e.fill();const a=P.getViewState().selectedObject;if(a&&a.type==="COMPANY"){const u=P.getViewState().companies.find(h=>h.id===a.id);u&&(e.fillStyle="#ffffff",e.beginPath(),e.arc(s(u.pos.x),r(u.pos.z),3.5,0,Math.PI*2),e.fill())}const o=s(D.target.x),l=r(D.target.z),c=Math.max(12,Math.min(38,D.distance/220*36)),d=Math.atan2(-Math.sin(D.theta),-Math.cos(D.theta))-Math.PI/2;e.save(),e.translate(o,l),e.rotate(d),e.fillStyle="rgba(255, 255, 255, 0.22)",e.beginPath(),e.moveTo(0,0),e.lineTo(-c*.65,-c),e.lineTo(c*.65,-c),e.closePath(),e.fill(),e.restore(),e.fillStyle="#ffd27d",e.beginPath(),e.arc(o,l,3,0,Math.PI*2),e.fill()}function NE(){const i={1:"overview",2:"explore",3:"companies",4:"sectors",5:"indices",6:"compare",7:"watchlist",8:"portfolio",9:"whatif",0:"learn"};window.addEventListener("keydown",e=>{if(RE(document.body)){e.key==="Escape"&&document.activeElement.blur();return}if(i[e.key])e.preventDefault(),zs(i[e.key]);else if(e.code==="Space"){e.preventDefault();const t=P.getLiveState();t.simRunning=!t.simRunning,Ri();const n=document.getElementById("sim-play-pause-btn");n&&(n.textContent=t.simRunning?"⏸ Pause":"▶ Resume"),He(P.getViewState()),Rs(P.getViewState())}else if(e.key==="f"||e.key==="F"){e.preventDefault();const t=P.getViewState().selectedObject;t?rt(t.type,t.id,!0,!0):Wn("EXCHANGE")}else if(e.key==="Escape"){const t=document.getElementById("modal-backdrop");t&&t.style.display==="flex"?t.style.display="none":io()}else if(e.key==="/"){e.preventDefault();const t=document.getElementById("global-search");t&&t.focus()}else e.key==="?"&&(e.preventDefault(),Bm())})}function Hm(i,e,t,n){const s=n.companies.find(h=>h.id===i);if(!s)return;const r=vn[s.sector],a=n.watchlistIds.includes(s.id),o=n.compareIds.includes(s.id),l=Qa(s.marketCap,n.mcapThresholds),c=n.companyInspectorTab||"snapshot";if(e.textContent=`${s.symbol} (${s.exchange})`,t.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
      <div>
        <div style="font-size:var(--text-lg); font-weight:700;">${s.companyName}</div>
        <div style="font-size:var(--text-sm); color:var(--text-secondary); margin-top:2px;">
          Sector: <a href="javascript:void(0)" id="comp-sector-link" style="color:${r.color}; font-weight:600;">${r.name}</a>
        </div>
      </div>
      <span class="badge sim" data-bind="comp-status">${s.dataStatus}</span>
    </div>

    <div style="margin-top:8px; display:flex; align-items:baseline; justify-content:space-between; background:var(--bg-elevated); padding:10px; border-radius:var(--radius-md);">
      <div>
        <div class="num" style="font-size:20px; font-weight:800;" data-bind="comp-price">${tt(s.price)}</div>
        <div style="font-size:var(--text-sm); color:var(--text-muted);">Prev Close: <span class="num" data-bind="comp-prev">${tt(s.previousClose)}</span></div>
      </div>
      <div style="text-align:right;">
        <span data-bind="comp-change-badge" class="badge ${s.change>=0?"pos":"neg"} num" style="font-size:var(--text-md);">
          ${s.change>=0?"+":""}${s.change.toFixed(2)} (${We(s.changePercent)})
        </span>
        <div style="font-size:var(--text-sm); color:var(--text-muted); margin-top:3px;">As of <span data-bind="comp-timestamp">${s.timestamp}</span></div>
      </div>
    </div>

    <div style="display:flex; gap:6px; margin-top:8px;">
      <button id="comp-watchlist-btn" style="flex:1;" class="${a?"active":""}">
        ${a?"★ Watched":"☆ Watchlist"}
      </button>
      <button id="comp-compare-btn" style="flex:1;" class="${o?"active":""}">
        ${o?"✓ Comparing":"+ Compare"}
      </button>
      <button id="comp-whatif-btn" title="Simulate Price or Share Count Changes">⚡ What-If</button>
    </div>

    <!-- 3 Simple Tabs: Snapshot | Chart | Learn -->
    <div class="inspector-tabs" role="tablist">
      <button class="inspector-tab-btn ${c==="snapshot"?"active":""}" role="tab" data-insp-tab="snapshot">1. Snapshot</button>
      <button class="inspector-tab-btn ${c==="chart"?"active":""}" role="tab" data-insp-tab="chart">2. Chart</button>
      <button class="inspector-tab-btn ${c==="learn"?"active":""}" role="tab" data-insp-tab="learn">3. Learn</button>
    </div>

    <!-- TAB 1: SNAPSHOT + ADVANCED -->
    <div id="comp-tab-snapshot" style="display:${c==="snapshot"?"block":"none"};">
      <div class="metric-grid">
        <div class="metric-box">
          <div class="metric-label">
            <span data-bind="comp-tier-label">Market Cap (${l})</span>
            <button class="help-icon" data-concept-btn="marketCap" aria-label="Understand Market Cap">?</button>
          </div>
          <div class="metric-val num" data-bind="comp-mcap">${dn(s.marketCap)}</div>
          <div style="font-size:var(--text-sm); color:var(--text-muted);" data-bind="comp-dataset-pct"></div>
        </div>

        <div class="metric-box">
          <div class="metric-label">
            <span>Trading Volume</span>
            <button class="help-icon" data-concept-btn="volume" aria-label="Understand Volume">?</button>
          </div>
          <div class="metric-val num" data-bind="comp-vol">${s.volume.toLocaleString("en-IN")}</div>
          <div style="font-size:var(--text-sm); color:var(--text-muted);" data-bind="comp-rel-vol"></div>
        </div>

        <div class="metric-box">
          <div class="metric-label">
            <span>Outstanding Shares</span>
            <button class="help-icon" data-concept-btn="priceVsSize" aria-label="Understand Share Count">?</button>
          </div>
          <div class="metric-val num" data-bind="comp-shares">${s.sharesOutstandingCr.toFixed(1)} Cr</div>
          <div style="font-size:var(--text-sm); color:var(--text-muted);">1 Cr = 10 Million</div>
        </div>

        <div class="metric-box">
          <div class="metric-label">
            <span>52-Week Range</span>
            <button class="help-icon" data-concept-btn="volatility" aria-label="Understand 52W Range">?</button>
          </div>
          <div class="metric-val num" style="font-size:var(--text-sm);">${tt(s.low52W)} – ${tt(s.high52W)}</div>
          <div style="font-size:var(--text-sm); color:var(--text-muted);">Simulated 52W Band</div>
        </div>
      </div>

      <div class="section-card">
        <h4>
          <span>Market-Cap Scale & Verification</span>
          <button class="help-icon" data-concept-btn="marketCap">?</button>
        </h4>
        <div data-bind="comp-formula" style="font-size:var(--text-sm); background:var(--bg-input); padding:7px; border-radius:4px; font-family:var(--font-mono);"></div>
        <p style="font-size:var(--text-sm); color:var(--text-secondary); margin-top:6px;">
          <strong>Scale vs. Quality Note:</strong> Building height represents equity market capitalization (<span data-bind="comp-tier-inline">${l}</span>), not cash balance, annual revenue, or investment quality.
        </p>
      </div>

      <!-- Accessible Advanced Section (Expanded automatically in Advanced mode, collapsible in Beginner mode) -->
      <details class="section-card" ${n.beginnerMode?"":"open"}>
        <summary style="cursor:pointer; font-weight:700; font-size:var(--text-md); display:flex; justify-content:space-between; align-items:center;">
          <span>Advanced Valuation & Cap Thresholds</span>
          <span class="badge">${n.beginnerMode?"Click to Expand":"Expanded"}</span>
        </summary>
        <div class="metric-grid" style="margin-top:8px;">
          <div class="metric-box">
            <div class="metric-label">
              <span>P/E Ratio (TTM)</span>
              <button class="help-icon" data-concept-btn="valuation">?</button>
            </div>
            <div class="metric-val num" data-bind="comp-pe">${s.pe!==null?s.pe.toFixed(2)+"×":"Unavailable"}</div>
            ${s.pe===null?'<div style="font-size:10px; color:var(--text-muted);">Not reported / negative earnings</div>':""}
          </div>
          <div class="metric-box">
            <div class="metric-label"><span>EPS (Trailing)</span></div>
            <div class="metric-val num">${s.eps!==null?tt(s.eps):"Unavailable"}</div>
          </div>
          <div class="metric-box">
            <div class="metric-label">
              <span>Dividend Yield</span>
              <button class="help-icon" data-concept-btn="dividends">?</button>
            </div>
            <div class="metric-val num">${s.divYield!==null?s.divYield.toFixed(2)+"%":"Unavailable"}</div>
            ${s.divYield===null?'<div style="font-size:10px; color:var(--text-muted);">No trailing dividend declared</div>':""}
          </div>
          <div class="metric-box">
            <div class="metric-label"><span>Index Basket</span></div>
            <div class="metric-val" style="font-size:var(--text-sm);">
              ${s.inNifty?"NIFTY 50 ":""}${s.inSensex?"• SENSEX":s.inNifty?"":"Broad Market"}
            </div>
          </div>
        </div>
        <div style="margin-top:8px; font-size:var(--text-sm); color:var(--text-secondary);">
          <strong>Configurable Cap Thresholds (₹ Cr):</strong>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:4px;">
            <label>Large-Cap ≥ <input type="number" id="thresh-large-input" value="${n.mcapThresholds.largeCr}" style="width:90px; padding:2px 4px;" /></label>
            <label>Mid-Cap ≥ <input type="number" id="thresh-mid-input" value="${n.mcapThresholds.midCr}" style="width:90px; padding:2px 4px;" /></label>
          </div>
        </div>
      </details>
    </div>

    <!-- TAB 2: INTERACTIVE CHART -->
    <div id="comp-tab-chart" style="display:${c==="chart"?"block":"none"};">
      <div class="section-card" id="comp-inspector-chart-box"></div>
    </div>

    <!-- TAB 3: CONTEXTUAL LEARN -->
    <div id="comp-tab-learn" style="display:${c==="learn"?"block":"none"};">
      <div class="edu-block">
        <strong>Understanding ${s.symbol}'s Tower in 3D</strong>
        <p style="font-size:var(--text-sm); margin-top:4px;">
          • <strong>Tower Height (${l}):</strong> Derived from ${tt(s.price)} × ${s.sharesOutstandingCr.toFixed(1)} Cr shares = ${dn(s.marketCap)}.<br>
          • <strong>Roof Beacon:</strong> Shows daily percentage change vs. previous close (${tt(s.previousClose)}).<br>
          • <strong>Window Illumination:</strong> Lit window density reflects relative trading volume against average session activity.
        </p>
      </div>
      <div class="section-card">
        <h4>Key Concepts for This Company</h4>
        <div style="display:flex; flex-direction:column; gap:5px;">
          <button data-concept-btn="marketCap" style="text-align:left;">📘 Market Cap vs. Share Price</button>
          <button data-concept-btn="valuation" style="text-align:left;">📘 Valuation: P/E & EPS Explained</button>
          <button data-concept-btn="volume" style="text-align:left;">📘 Trading Volume vs. Liquidity</button>
          <button data-concept-btn="dividends" style="text-align:left;">📘 Dividends & Yield</button>
        </div>
      </div>
    </div>
  `,t.querySelectorAll("[data-insp-tab]").forEach(h=>{h.addEventListener("click",()=>{P.getLiveState().companyInspectorTab=h.dataset.inspTab,Hm(i,e,t,P.getViewState())})}),c==="chart"){const h=t.querySelector("#comp-inspector-chart-box");Vu(h,n,s.id,!0)}t.querySelector("#comp-sector-link").addEventListener("click",()=>{rt("SECTOR",s.sector,!0)}),t.querySelector("#comp-watchlist-btn").addEventListener("click",()=>{const h=P.getLiveState(),f=h.watchlistIds.indexOf(s.id);f>=0?h.watchlistIds.splice(f,1):h.watchlistIds.push(s.id),P.savePersistedState(),P.emit("watchlist")}),t.querySelector("#comp-compare-btn").addEventListener("click",()=>{const h=P.getLiveState(),f=h.compareIds.indexOf(s.id);f>=0?h.compareIds.splice(f,1):(h.compareIds.length>=4&&h.compareIds.shift(),h.compareIds.push(s.id)),He(P.getViewState()),P.emit("compare")}),t.querySelector("#comp-whatif-btn").addEventListener("click",()=>{const h=P.getLiveState();h.selectedObject=null,h.whatIf.companyId=s.id,h.whatIf.customPrice=null,h.whatIf.customSharesCr=null,zs("whatif")}),t.querySelectorAll("[data-concept-btn]").forEach(h=>{h.addEventListener("click",()=>sa(h.dataset.conceptBtn))});const d=t.querySelector("#thresh-large-input"),u=t.querySelector("#thresh-mid-input");d&&d.addEventListener("change",h=>{const f=parseFloat(h.target.value);!Number.isNaN(f)&&f>0&&(P.getLiveState().mcapThresholds.largeCr=f,He(P.getViewState()),rl(i,t,P.getViewState()))}),u&&u.addEventListener("change",h=>{const f=parseFloat(h.target.value);!Number.isNaN(f)&&f>0&&(P.getLiveState().mcapThresholds.midCr=f,He(P.getViewState()),rl(i,t,P.getViewState()))}),rl(i,t,n)}function rl(i,e,t){const n=t.companies.find(o=>o.id===i);if(!n)return;const s=t.totals.mcapCr>0?(n.marketCap/t.totals.mcapCr*100).toFixed(2):"0.00",r=Qa(n.marketCap,t.mcapThresholds),a=(n.volume/n.avgDailyVolume).toFixed(2);if(Ne(e,"comp-status",n.dataStatus),Ne(e,"comp-price",tt(n.price)),Ne(e,"comp-prev",tt(n.previousClose)),Pn(e,"comp-change-badge",`${n.change>=0?"+":""}${n.change.toFixed(2)} (${We(n.changePercent)})`,`badge ${n.change>=0?"pos":"neg"} num`),Ne(e,"comp-timestamp",n.timestamp),Ne(e,"comp-tier-label",`Market Cap (${r})`),Ne(e,"comp-tier-inline",r),Ne(e,"comp-mcap",dn(n.marketCap)),Ne(e,"comp-dataset-pct",`${s}% of City Dataset`),Ne(e,"comp-vol",n.volume.toLocaleString("en-IN")),Ne(e,"comp-rel-vol",`Rel Vol: ${a}× avg`),Ne(e,"comp-shares",`${n.sharesOutstandingCr.toFixed(1)} Cr`),Ne(e,"comp-pe",n.pe!==null?n.pe.toFixed(2)+"×":"Unavailable"),Ne(e,"comp-formula",`${tt(n.price)} × ${n.sharesOutstandingCr.toFixed(1)} Cr shares = ₹${n.marketCap.toLocaleString("en-IN")} Cr`),t.companyInspectorTab==="chart"){const o=e.querySelector("#comp-inspector-chart-box");o&&Gu(o,t)}}function UE(i,e,t,n){const s=es(i,n),r=s.sector;r&&(e.textContent=`${r.short} District`,t.innerHTML=`
    <div style="border-left:4px solid ${r.color}; padding-left:10px; margin-bottom:10px;">
      <div style="font-size:15px; font-weight:700;">${r.name}</div>
      <div style="font-size:11.5px; color:var(--text-secondary);">${s.companies.length} Listed Companies in District</div>
    </div>

    <div class="metric-grid">
      <div class="metric-box">
        <div class="metric-label"><span>Sector Market Cap</span></div>
        <div class="metric-val num" data-bind="sec-mcap"></div>
        <div style="font-size:10.5px; color:var(--text-muted);" data-bind="sec-share"></div>
      </div>
      <div class="metric-box">
        <div class="metric-label"><span>Cap-Weighted Return</span></div>
        <div class="metric-val num" data-bind="sec-cap-ret"></div>
        <div style="font-size:10.5px; color:var(--text-muted);" data-bind="sec-eq-ret"></div>
      </div>
    </div>

    <div class="edu-block">
      <strong>How Sector Return Is Calculated:</strong>
      <p style="font-size:11.5px; margin-top:3px;" data-bind="sec-edu-text"></p>
    </div>

    <div class="section-card">
      <h4>Strongest & Weakest in Sector Today</h4>
      <div style="display:flex; justify-content:space-between; font-size:12px; padding:4px 0; border-bottom:1px solid var(--border-subtle);">
        <span>🏆 Top: <a href="javascript:void(0)" id="sec-strongest-link" style="color:var(--text-primary); font-weight:600;" data-bind="sec-strong-sym"></a></span>
        <span class="pos-text num" data-bind="sec-strong-pct"></span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:12px; padding:4px 0;">
        <span>📉 Lagging: <a href="javascript:void(0)" id="sec-weakest-link" style="color:var(--text-primary); font-weight:600;" data-bind="sec-weak-sym"></a></span>
        <span class="neg-text num" data-bind="sec-weak-pct"></span>
      </div>
    </div>

    <div class="section-card">
      <h4>Companies in ${r.short} District</h4>
      ${s.companies.map(a=>`
        <div class="sec-comp-row" data-comp-id="${a.id}" style="display:flex; justify-content:space-between; align-items:center; padding:6px 4px; border-bottom:1px solid var(--border-subtle); cursor:pointer;">
          <div>
            <div style="font-weight:600;">${a.symbol} <span style="font-size:10.5px; color:var(--text-muted);" data-bind="sec-c-tier-${a.id}"></span></div>
            <div style="font-size:11px; color:var(--text-secondary);" data-bind="sec-c-mcap-${a.id}"></div>
          </div>
          <div style="text-align:right;">
            <div class="num" style="font-weight:600;" data-bind="sec-c-price-${a.id}"></div>
            <span data-bind="sec-c-chg-${a.id}" class="badge pos num"></span>
          </div>
        </div>
      `).join("")}
    </div>

    <button class="primary" id="sec-return-city-btn" style="width:100%;">🌐 Return to Full City View</button>
  `,t.querySelectorAll(".sec-comp-row").forEach(a=>{a.addEventListener("click",()=>rt("COMPANY",a.dataset.compId,!0))}),t.querySelector("#sec-strongest-link").addEventListener("click",()=>{const a=es(i);a.strongest&&rt("COMPANY",a.strongest.id,!0)}),t.querySelector("#sec-weakest-link").addEventListener("click",()=>{const a=es(i);a.weakest&&rt("COMPANY",a.weakest.id,!0)}),t.querySelector("#sec-return-city-btn").addEventListener("click",()=>{io(),Wn("ENTIRE")}),Vm(i,t,n))}function Vm(i,e,t){const n=es(i,t),s=t.totals.mcapCr>0?(n.totalMcap/t.totals.mcapCr*100).toFixed(2):"0.00";Ne(e,"sec-mcap",dn(n.totalMcap)),Ne(e,"sec-share",`${s}% of City Dataset`),Pn(e,"sec-cap-ret",We(n.capWeightedChangePct),`metric-val num ${n.capWeightedChangePct>=0?"pos-text":"neg-text"}`),Ne(e,"sec-eq-ret",`Equal-Wt: ${We(n.equalWeightedChangePct)}`),Ne(e,"sec-edu-text",`The primary figure (${We(n.capWeightedChangePct)}) is Market-Cap Weighted: total current sector market cap divided by total previous-close sector market cap. An equal-weighted simple average of constituent percentages is ${We(n.equalWeightedChangePct)}.`),n.strongest&&(Ne(e,"sec-strong-sym",n.strongest.symbol),Ne(e,"sec-strong-pct",We(n.strongest.changePercent))),n.weakest&&(Ne(e,"sec-weak-sym",n.weakest.symbol),Ne(e,"sec-weak-pct",We(n.weakest.changePercent))),n.companies.forEach(r=>{Ne(e,`sec-c-tier-${r.id}`,`(${Qa(r.marketCap,t.mcapThresholds)})`),Ne(e,`sec-c-mcap-${r.id}`,dn(r.marketCap)),Ne(e,`sec-c-price-${r.id}`,tt(r.price)),Pn(e,`sec-c-chg-${r.id}`,We(r.changePercent),`badge ${r.changePercent>=0?"pos":"neg"} num`)})}function OE(i,e){i.textContent="Central Stock Exchange HQ",e.innerHTML=`
    <div class="edu-block">
      <strong>What a Stock Exchange Does (NSE / BSE Context)</strong>
      <p style="font-size:12px; margin-top:4px;">
        A stock exchange provides a regulated, transparent electronic marketplace where buyers and sellers discover prices and match orders according to strict <strong>Price-Time Priority</strong> rules.
      </p>
    </div>

    <div class="section-card">
      <h4>4 Connected Exchange Functions</h4>
      <p style="font-size:11.5px; color:var(--text-secondary); margin-bottom:8px;">
        Notice the four distinct wings around the Central Exchange Rotunda, connecting to the Market Infrastructure District:
      </p>
      <ul style="padding-left:16px; font-size:12px; color:var(--text-primary); display:flex; flex-direction:column; gap:6px;">
        <li><strong>1. Order Matching Engine:</strong> Matches buy (bid) and sell (ask) limit and market orders in microseconds.</li>
        <li><strong>2. Clearing Handoff:</strong> Transmits matched trades to the Clearing Corporation (CCP) for counterparty novation.</li>
        <li><strong>3. Settlement Coordination:</strong> Links with Depositories and Clearing Banks to complete T+1 delivery and payment.</li>
        <li><strong>4. Market-Data Broadcast:</strong> Publishes real-time order-book depth, trades, and official index ticks.</li>
      </ul>
    </div>

    <div class="edu-block warn">
      <strong>Crucial Institutional Distinction:</strong>
      <p style="font-size:11.5px; margin-top:4px;">
        The stock exchange itself does <em>not</em> hold your demat shares (Depositories do), does <em>not</em> take retail client orders directly (Brokers do), and does <em>not</em> set stock prices (buyer and seller order flow does).
      </p>
    </div>
  `}function FE(i,e,t){const n=Di.find(s=>s.id===i);n&&(e.textContent=n.short,t.innerHTML=`
    <div class="section-card" style="border-left:4px solid #4B8BE8;">
      <div style="font-size:15px; font-weight:700;">${n.name}</div>
      <div style="font-size:11.5px; color:var(--accent); margin-top:2px; font-weight:600;">Role: ${n.role}</div>
      <p style="font-size:12.5px; margin-top:8px;">${n.summary}</p>
    </div>

    <div class="edu-block warn">
      <strong>How This Differs from Other Market Institutions</strong>
      <p style="font-size:12px; margin-top:4px;">${n.distinction}</p>
    </div>

    <div class="section-card">
      <h4>Explore All ${Di.length} Infrastructure Facilities</h4>
      ${Di.map(s=>`
        <button data-infra-id="${s.id}" class="infra-nav-btn ${s.id===i?"active":""}" style="width:100%; text-align:left; margin-bottom:4px; display:flex; justify-content:space-between;">
          <span>⚙️ ${s.short}</span>
          <span style="font-size:10.5px; color:var(--text-secondary);">Inspect →</span>
        </button>
      `).join("")}
    </div>
  `,t.querySelectorAll(".infra-nav-btn").forEach(s=>{s.addEventListener("click",()=>rt("INFRA",s.dataset.infraId,!0))}))}function BE(i,e,t){const n=Bs.find(r=>r.id===i);if(!n)return;const s=Jr[n.conceptKey];e.textContent=n.short,t.innerHTML=`
    <div class="section-card" style="border-left:4px solid #22A06B;">
      <div style="font-size:15px; font-weight:700;">🎓 ${n.name}</div>
      <p style="font-size:12.5px; margin-top:6px;">${n.summary}</p>
    </div>

    ${s?`
      <div class="section-card">
        <h4>Deep Dive: ${s.title}</h4>
        <p style="font-size:12px; margin-bottom:8px;">${s.meaning}</p>
        <div style="background:var(--bg-input); padding:7px; border-radius:4px; font-family:var(--font-mono); font-size:11.5px; margin-bottom:8px;">
          ${s.formula}
        </div>
        <p style="font-size:12px; margin-bottom:8px;"><strong>Example:</strong> ${s.example}</p>
        <div class="edu-block warn" style="margin-bottom:0;">
          <strong>What It Does NOT Tell You:</strong>
          <p style="font-size:11.5px; margin-top:3px;">${s.whatItDoesNotTell}</p>
        </div>
      </div>
    `:""}

    <div class="section-card">
      <h4>All ${Bs.length} Learning District Landmarks</h4>
      ${Bs.map(r=>`
        <button data-lm-id="${r.id}" class="lm-nav-btn ${r.id===i?"active":""}" style="width:100%; text-align:left; margin-bottom:4px;">
          🎓 ${r.name}
        </button>
      `).join("")}
    </div>
  `,t.querySelectorAll(".lm-nav-btn").forEach(r=>{r.addEventListener("click",()=>rt("LEARN",r.dataset.lmId,!0))})}function kE(i,e,t){i.textContent="Company Comparison (2–4)";const n=t.compareIds.map(a=>t.companies.find(o=>o.id===a)).filter(Boolean),s=e.querySelector("#compare-add-select"),r=s?s.value:t.companies[0]?.id;e.innerHTML=`
    <div class="section-card">
      <h4>Select 2 to 4 Companies to Compare</h4>
      <div style="display:flex; gap:6px; margin-bottom:8px;">
        <select id="compare-add-select" style="flex:1;">
          ${t.companies.map(a=>`<option value="${a.id}" ${a.id===r?"selected":""}>${a.symbol} — ${a.companyName}</option>`).join("")}
        </select>
        <button class="primary" id="compare-add-btn">+ Add</button>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:5px;">
        ${n.map(a=>`
          <span class="badge" style="background:var(--bg-input); border:1px solid var(--accent);">
            ${a.symbol}
            <button data-remove-comp="${a.id}" style="border:none; background:transparent; padding:0 3px; color:var(--neg);">✕</button>
          </span>
        `).join("")}
      </div>
    </div>

    ${n.length<2?'<div class="edu-block warn">Please select at least 2 companies (up to 4) to view side-by-side comparison.</div>':`
      <div class="section-card" style="overflow-x:auto;">
        <h4>Side-by-Side Metrics (INR ₹)</h4>
        <table class="data-table" style="font-size:11.5px;">
          <thead>
            <tr>
              <th>Metric</th>
              ${n.map(a=>`<th data-focus-comp="${a.id}">${a.symbol}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Price</td>
              ${n.map(a=>`<td class="num" data-bind="cmp-price-${a.id}"></td>`).join("")}
            </tr>
            <tr>
              <td>Change (%)</td>
              ${n.map(a=>`<td class="num" data-bind="cmp-chg-${a.id}"></td>`).join("")}
            </tr>
            <tr>
              <td>Market Cap</td>
              ${n.map(a=>`<td class="num" data-bind="cmp-mcap-${a.id}"></td>`).join("")}
            </tr>
            <tr>
              <td>Cap Tier</td>
              ${n.map(a=>`<td data-bind="cmp-tier-${a.id}"></td>`).join("")}
            </tr>
            <tr>
              <td>Volume</td>
              ${n.map(a=>`<td class="num" data-bind="cmp-vol-${a.id}"></td>`).join("")}
            </tr>
            <tr>
              <td>P/E (TTM)</td>
              ${n.map(a=>`<td class="num" data-bind="cmp-pe-${a.id}"></td>`).join("")}
            </tr>
            <tr>
              <td>Div Yield</td>
              ${n.map(a=>`<td class="num">${a.divYield!==null?a.divYield.toFixed(2)+"%":"Unavailable"}</td>`).join("")}
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section-card">
        <h4>Normalized Session Performance (% vs Prev Close)</h4>
        ${n.map(a=>`
          <div style="margin-bottom:6px;">
            <div style="display:flex; justify-content:space-between; font-size:11.5px;">
              <span>${a.symbol}</span>
              <span class="num" data-bind="cmp-bar-lbl-${a.id}"></span>
            </div>
            <div style="height:7px; background:var(--bg-input); border-radius:4px; overflow:hidden; margin-top:2px;">
              <div data-bind="cmp-bar-fill-${a.id}" style="width:0%; height:100%;"></div>
            </div>
          </div>
        `).join("")}
      </div>
    `}
  `,e.querySelector("#compare-add-btn").addEventListener("click",()=>{const a=e.querySelector("#compare-add-select"),o=P.getLiveState();a&&!o.compareIds.includes(a.value)&&(o.compareIds.length>=4&&o.compareIds.shift(),o.compareIds.push(a.value),He(P.getViewState()),P.emit("compare"))}),e.querySelectorAll("[data-remove-comp]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.removeComp,l=P.getLiveState(),c=l.compareIds.indexOf(o);c>=0&&(l.compareIds.splice(c,1),He(P.getViewState()),P.emit("compare"))})}),e.querySelectorAll("[data-focus-comp]").forEach(a=>{a.addEventListener("click",()=>rt("COMPANY",a.dataset.focusComp,!0))}),Gm(e,t)}function Gm(i,e){const t=e.compareIds.map(n=>e.companies.find(s=>s.id===n)).filter(Boolean);t.length<2||t.forEach(n=>{Ne(i,`cmp-price-${n.id}`,tt(n.price)),Pn(i,`cmp-chg-${n.id}`,We(n.changePercent),`num ${n.changePercent>=0?"pos-text":"neg-text"}`),Ne(i,`cmp-mcap-${n.id}`,dn(n.marketCap)),Ne(i,`cmp-tier-${n.id}`,Qa(n.marketCap,e.mcapThresholds)),Ne(i,`cmp-vol-${n.id}`,`${(n.volume/1e5).toFixed(2)} L`),Ne(i,`cmp-pe-${n.id}`,n.pe!==null?n.pe.toFixed(1)+"×":"Unavailable"),Pn(i,`cmp-bar-lbl-${n.id}`,We(n.changePercent),`num ${n.changePercent>=0?"pos-text":"neg-text"}`);const s=Math.min(100,Math.abs(n.changePercent)*18);Or(i,`cmp-bar-fill-${n.id}`,"width",`${s}%`),Or(i,`cmp-bar-fill-${n.id}`,"background",n.changePercent>=0?"var(--pos)":"var(--neg)")})}function zE(i,e,t){i.textContent="My Watchlist";const n=t.watchlistIds.map(o=>t.companies.find(l=>l.id===o)).filter(Boolean),s=e.querySelector("#watchlist-add-select"),r=s?s.value:t.companies[0]?.id;e.innerHTML=`
    <div class="section-card">
      <h4>Add Company to Watchlist</h4>
      <div style="display:flex; gap:6px;">
        <select id="watchlist-add-select" style="flex:1;">
          ${t.companies.map(o=>`<option value="${o.id}" ${o.id===r?"selected":""}>${o.symbol} — ${o.companyName}</option>`).join("")}
        </select>
        <button class="primary" id="watchlist-add-btn">+ Add</button>
      </div>
    </div>

    ${n.length===0?`
      <div class="edu-block warn">
        Your watchlist is currently empty. Add companies above or click "☆ Add Watchlist" on any building.
      </div>
      <button id="watchlist-reset-btn" style="width:100%; margin-top:6px; font-size:11.5px;">↺ Reset Watchlist to Default</button>
    `:`
      <div class="section-card">
        <h4>Watched Companies (${n.length})</h4>
        ${n.map(o=>`
          <div style="display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid var(--border-subtle);">
            <div data-watch-focus="${o.id}" style="cursor:pointer;">
              <div style="font-weight:700;">${o.symbol} <span style="font-size:10.5px; color:var(--text-muted);">${vn[o.sector].short}</span></div>
              <div style="font-size:11px; color:var(--text-secondary);" data-bind="wl-mcap-${o.id}"></div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="text-align:right;">
                <div class="num" style="font-weight:600;" data-bind="wl-price-${o.id}"></div>
                <span data-bind="wl-chg-${o.id}" class="badge pos num"></span>
              </div>
              <button data-watch-remove="${o.id}" title="Remove from Watchlist" style="padding:3px 6px;">✕</button>
            </div>
          </div>
        `).join("")}
        <button id="watchlist-reset-btn" style="width:100%; margin-top:10px; font-size:11.5px;">↺ Reset Watchlist to Default</button>
      </div>
    `}
  `,e.querySelector("#watchlist-add-btn").addEventListener("click",()=>{const o=e.querySelector("#watchlist-add-select"),l=P.getLiveState();o&&!l.watchlistIds.includes(o.value)&&(l.watchlistIds.push(o.value),P.savePersistedState(),P.emit("watchlist"))}),e.querySelectorAll("[data-watch-focus]").forEach(o=>{o.addEventListener("click",()=>rt("COMPANY",o.dataset.watchFocus,!0))}),e.querySelectorAll("[data-watch-remove]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.watchRemove,c=P.getLiveState(),d=c.watchlistIds.indexOf(l);d>=0&&(c.watchlistIds.splice(d,1),P.savePersistedState(),P.emit("watchlist"))})});const a=e.querySelector("#watchlist-reset-btn");a&&a.addEventListener("click",()=>{P.getLiveState().watchlistIds=["C01","C06","C11","C19"],P.savePersistedState(),P.emit("watchlist")}),Wm(e,t)}function Wm(i,e){e.watchlistIds.forEach(t=>{const n=e.companies.find(s=>s.id===t);n&&(Ne(i,`wl-mcap-${n.id}`,dn(n.marketCap)),Ne(i,`wl-price-${n.id}`,tt(n.price)),Pn(i,`wl-chg-${n.id}`,We(n.changePercent),`badge ${n.changePercent>=0?"pos":"neg"} num`))})}function Xm(i){let e=0,t=0;const n={},s=i.portfolio.map(c=>{const d=i.companies.find(v=>v.id===c.id);if(!d)return null;const u=c.qty*c.avgCost,h=c.qty*d.price,f=h-u,g=u>0?f/u*100:0;return e+=u,t+=h,n[d.sector]=(n[d.sector]||0)+h,{...c,comp:d,cost:u,val:h,pnl:f,pnlPct:g}}).filter(Boolean),r=t-e,a=e>0?r/e*100:0;let o=0,l="None";return Object.entries(n).forEach(([c,d])=>{const u=t>0?d/t*100:0;u>o&&(o=u,l=vn[c].short)}),{totalCost:e,totalValue:t,totalPnl:r,totalPnlPct:a,sectorTotals:n,enriched:s,maxSectorShare:o,maxSectorName:l}}function HE(i,e,t){i.textContent="Hypothetical Portfolio Explorer";const n=e.querySelector("#port-company-select"),s=e.querySelector("#port-qty-input"),r=n?n.value:t.companies[0]?.id,a=s?s.value:"20",{sectorTotals:o,enriched:l}=Xm(t);e.innerHTML=`
    <div class="edu-block">
      <strong>Educational Sandbox Disclosure:</strong>
      <p style="font-size:11.5px; margin-top:2px;">
        This is a hypothetical learning portfolio, not a brokerage account. No real orders are executed.
      </p>
    </div>

    <div class="metric-grid">
      <div class="metric-box">
        <div class="metric-label"><span>Hypothetical Value</span></div>
        <div class="metric-val num" data-bind="port-total-val"></div>
        <div style="font-size:10.5px; color:var(--text-muted);" data-bind="port-total-cost"></div>
      </div>
      <div class="metric-box">
        <div class="metric-label"><span>Unrealized Gain/Loss</span></div>
        <div class="metric-val num" data-bind="port-total-pnl"></div>
        <div class="num" style="font-size:11px;" data-bind="port-total-pnl-pct"></div>
      </div>
    </div>

    <div class="section-card">
      <h4>Add / Update Hypothetical Position</h4>
      <div style="display:grid; grid-template-columns:1fr 75px; gap:6px; margin-bottom:6px;">
        <select id="port-company-select">
          ${t.companies.map(c=>`<option value="${c.id}" ${c.id===r?"selected":""}>${c.symbol} (${tt(c.price)})</option>`).join("")}
        </select>
        <input type="number" id="port-qty-input" value="${a}" min="1" placeholder="Qty" />
      </div>
      <button class="primary" id="port-add-btn" style="width:100%;">+ Add Position at Current Simulated Price</button>
    </div>

    <div class="section-card">
      <h4>
        <span>Sector Allocation & Concentration</span>
        <button class="help-icon" id="port-div-help-btn">?</button>
      </h4>
      <div data-bind="port-conc-warn" class="edu-block warn" style="padding:6px 8px; font-size:11px; display:none;"></div>
      ${Object.keys(o).map(c=>{const d=vn[c];return`
            <div style="margin-bottom:5px;">
              <div style="display:flex; justify-content:space-between; font-size:11px;">
                <span>${d.short}</span>
                <span class="num" data-bind="port-sec-lbl-${c}"></span>
              </div>
              <div style="height:6px; background:var(--bg-input); border-radius:3px; overflow:hidden;">
                <div data-bind="port-sec-bar-${c}" style="width:0%; height:100%; background:${d.color};"></div>
              </div>
            </div>
          `}).join("")}
    </div>

    <div class="section-card">
      <h4>Holdings (${l.length})</h4>
      ${l.map(c=>`
        <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid var(--border-subtle); font-size:11.5px;">
          <div data-port-focus="${c.comp.id}" style="cursor:pointer;">
            <div style="font-weight:700;">${c.comp.symbol} × ${c.qty} sh</div>
            <div style="font-size:10.5px; color:var(--text-muted);">Avg Cost: ${tt(c.avgCost)}</div>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <div style="text-align:right;">
              <div class="num" style="font-weight:600;" data-bind="port-item-val-${c.comp.id}"></div>
              <div class="num" style="font-size:10.5px;" data-bind="port-item-pnl-${c.comp.id}"></div>
            </div>
            <button data-port-remove="${c.comp.id}" style="padding:2px 6px;">✕</button>
          </div>
        </div>
      `).join("")}
    </div>
  `,e.querySelector("#port-add-btn").addEventListener("click",()=>{const c=e.querySelector("#port-company-select").value,d=Math.max(1,parseInt(e.querySelector("#port-qty-input").value,10)||10),u=P.getLiveState(),h=u.companies.find(g=>g.id===c);if(!h)return;const f=u.portfolio.find(g=>g.id===c);if(f){const g=f.qty*f.avgCost+d*h.price;f.qty+=d,f.avgCost=Number((g/f.qty).toFixed(2))}else u.portfolio.push({id:c,qty:d,avgCost:h.price});P.savePersistedState(),P.emit("portfolio")}),e.querySelector("#port-div-help-btn").addEventListener("click",()=>sa("diversification")),e.querySelectorAll("[data-port-focus]").forEach(c=>{c.addEventListener("click",()=>rt("COMPANY",c.dataset.portFocus,!0))}),e.querySelectorAll("[data-port-remove]").forEach(c=>{c.addEventListener("click",()=>{const d=c.dataset.portRemove,u=P.getLiveState();u.portfolio=u.portfolio.filter(h=>h.id!==d),P.savePersistedState(),P.emit("portfolio")})}),Ym(e,t)}function Ym(i,e){const{totalCost:t,totalValue:n,totalPnl:s,totalPnlPct:r,sectorTotals:a,enriched:o,maxSectorShare:l,maxSectorName:c}=Xm(e);Ne(i,"port-total-val",tt(n)),Ne(i,"port-total-cost",`Cost: ${tt(t)}`),Pn(i,"port-total-pnl",`${s>=0?"+":""}${tt(s)}`,`metric-val num ${s>=0?"pos-text":"neg-text"}`),Pn(i,"port-total-pnl-pct",We(r),`num ${s>=0?"pos-text":"neg-text"}`);const d=i.querySelector('[data-bind="port-conc-warn"]');d&&(l>55?(d.style.display="block",d.textContent=`⚠️ Concentration Notice: ${l.toFixed(1)}% of your hypothetical portfolio is concentrated in ${c}.`):d.style.display="none"),Object.entries(a).forEach(([h,f])=>{const g=n>0?f/n*100:0;Ne(i,`port-sec-lbl-${h}`,`${g.toFixed(1)}% (${tt(f)})`),Or(i,`port-sec-bar-${h}`,"width",`${g}%`)}),o.forEach(h=>{Ne(i,`port-item-val-${h.comp.id}`,tt(h.val)),Pn(i,`port-item-pnl-${h.comp.id}`,`${h.pnl>=0?"+":""}${h.pnl.toFixed(0)} (${h.pnlPct.toFixed(1)}%)`,`num ${h.pnl>=0?"pos-text":"neg-text"}`)});const u=i.querySelector("#port-company-select");u&&document.activeElement!==u&&Array.from(u.options).forEach(h=>{const f=e.companies.find(g=>g.id===h.value);if(f){const g=`${f.symbol} (${tt(f.price)})`;h.textContent!==g&&(h.textContent=g)}})}function qm(i,e,t){i.textContent="What-If & Event Simulator";const n=t.companies.find(d=>d.id===t.whatIf.companyId)||t.companies[0],s=t.whatIf.customPrice!==null?t.whatIf.customPrice:n.price,r=t.whatIf.customSharesCr!==null?t.whatIf.customSharesCr:n.sharesOutstandingCr;e.innerHTML=`
    <div class="edu-block">
      <strong>Interactive What-If Sandbox</strong>
      <p style="font-size:11.5px; margin-top:2px;">
        Test how changing share price, share count, or sector shocks recalculates Market Cap and simulated indices in real time.
      </p>
    </div>

    <div class="section-card">
      <h4>1. Single-Company Parameter Simulator</h4>
      <label style="font-size:11.5px; color:var(--text-secondary);">Target Company:</label>
      <select id="wi-company-select" style="width:100%; margin:4px 0 8px;">
        ${t.companies.map(d=>`<option value="${d.id}" ${d.id===n.id?"selected":""}>${d.symbol} — ${d.companyName}</option>`).join("")}
      </select>

      <div style="font-size:11px; color:var(--text-secondary); margin-bottom:6px;">
        Live Simulated Price: <strong class="num" data-bind="wi-live-price">${tt(n.price)}</strong>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        <div>
          <label style="font-size:11px; color:var(--text-secondary);">Hypothetical Price (₹)</label>
          <input type="number" id="wi-price-input" value="${s}" step="10" style="width:100%; margin-top:3px;" />
        </div>
        <div>
          <label style="font-size:11px; color:var(--text-secondary);">Shares (Crores)</label>
          <input type="number" id="wi-shares-input" value="${r}" step="5" style="width:100%; margin-top:3px;" />
        </div>
      </div>

      <div style="display:flex; gap:6px; margin-top:8px;">
        <button class="primary" id="wi-apply-btn" style="flex:1;">Apply to Simulation</button>
        <button id="wi-undo-btn">Undo</button>
      </div>

      <div style="margin-top:10px; background:var(--bg-input); padding:8px; border-radius:5px; font-size:11.5px;">
        <div style="display:flex; justify-content:space-between;">
          <span>Before (Base Close):</span>
          <span class="num" data-bind="wi-before-mcap"></span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:3px;">
          <span>After (Current/What-If):</span>
          <span class="num"><strong data-bind="wi-after-mcap"></strong></span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:3px;">
          <span>Difference:</span>
          <span class="num" data-bind="wi-diff-mcap"></span>
        </div>
      </div>
    </div>

    <div class="section-card">
      <h4>2. Sector-Wide Percentage Shock</h4>
      <div style="display:grid; grid-template-columns:1fr 85px; gap:6px; margin-bottom:8px;">
        <select id="wi-sector-select">
          <option value="ALL">Entire Market (All ${Gn.length} Sectors)</option>
          ${Gn.map(d=>`<option value="${d.id}" ${d.id===t.whatIf.sectorId?"selected":""}>${d.name}</option>`).join("")}
        </select>
        <input type="number" id="wi-sector-pct" value="${t.whatIf.sectorShockPct}" step="1" placeholder="%" />
      </div>
      <div style="display:flex; gap:6px;">
        <button class="primary" id="wi-shock-pos-btn" style="flex:1;">Apply +Shock %</button>
        <button id="wi-shock-neg-btn" style="flex:1; border-color:var(--neg); color:var(--neg);">Apply -Shock %</button>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
      <button id="wi-end-event-btn">⏹ End Active Event</button>
      <button id="wi-reset-sim-btn">↺ Reset Simulation</button>
    </div>
  `,e.querySelector("#wi-company-select").addEventListener("change",d=>{const u=P.getLiveState();u.whatIf.companyId=d.target.value,u.whatIf.customPrice=null,u.whatIf.customSharesCr=null,qm(i,e,P.getViewState())});const a=e.querySelector("#wi-price-input"),o=e.querySelector("#wi-shares-input"),l=()=>Zd(e,P.getViewState());a.addEventListener("input",l),o.addEventListener("input",l),e.querySelector("#wi-apply-btn").addEventListener("click",()=>{Ri();const d=P.getLiveState(),u=d.companies.find(g=>g.id===d.whatIf.companyId);if(!u)return;d.whatIf.snapshotBefore={id:u.id,price:u.price,shares:u.sharesOutstandingCr};const h=parseFloat(a.value),f=parseFloat(o.value);!Number.isNaN(h)&&h>0&&(u.price=Number(h.toFixed(2))),!Number.isNaN(f)&&f>0&&(u.sharesOutstandingCr=Number(f.toFixed(2))),d.whatIf.customPrice=u.price,d.whatIf.customSharesCr=u.sharesOutstandingCr,$i(d),Er(),He(P.getViewState()),P.emit("tick")}),e.querySelector("#wi-undo-btn").addEventListener("click",()=>{Ri();const d=P.getLiveState(),u=d.whatIf.snapshotBefore;if(!u)return;const h=d.companies.find(f=>f.id===u.id);h&&(h.price=u.price,h.sharesOutstandingCr=u.shares,d.whatIf.customPrice=null,d.whatIf.customSharesCr=null,a.value=h.price,o.value=h.sharesOutstandingCr,$i(d),Er(),He(P.getViewState()),P.emit("tick"))});const c=d=>{Ri();const u=P.getLiveState(),h=e.querySelector("#wi-sector-select").value,f=parseFloat(e.querySelector("#wi-sector-pct").value)||0;u.whatIf.sectorId=h,u.whatIf.sectorShockPct=f;const g=f*d;u.companies.forEach(v=>{(h==="ALL"||v.sector===h)&&(v.price=Math.max(5,Number((v.price*(1+g/100)).toFixed(2))))}),$i(u),Er(),He(P.getViewState()),P.emit("tick")};e.querySelector("#wi-shock-pos-btn").addEventListener("click",()=>c(1)),e.querySelector("#wi-shock-neg-btn").addEventListener("click",()=>c(-1)),e.querySelector("#wi-end-event-btn").addEventListener("click",()=>{ss(),He(P.getViewState())}),e.querySelector("#wi-reset-sim-btn").addEventListener("click",()=>{Al(),He(P.getViewState())}),Zd(e,t)}function Zd(i,e){const t=e.companies.find(f=>f.id===e.whatIf.companyId)||e.companies[0];if(!t)return;Ne(i,"wi-live-price",tt(t.price));const n=i.querySelector("#wi-price-input"),s=i.querySelector("#wi-shares-input"),r=n?parseFloat(n.value):NaN,a=s?parseFloat(s.value):NaN,o=!Number.isNaN(r)&&r>0?r:t.price,l=!Number.isNaN(a)&&a>0?a:t.sharesOutstandingCr,c=t.previousClose*t.baseSharesCr,d=o*l,u=d-c,h=c>0?u/c*100:0;Ne(i,"wi-before-mcap",dn(c)),Ne(i,"wi-after-mcap",dn(d)),Pn(i,"wi-diff-mcap",`${u>=0?"+":""}${dn(u)} (${We(h)})`,`num ${u>=0?"pos-text":"neg-text"}`)}function VE(i,e){const t=Object.entries(Jr);i.textContent=`Financial Education Curriculum (${t.length})`,e.innerHTML=`
    <div class="edu-block">
      <strong>Learn Without Leaving the City</strong>
      <p style="font-size:11.5px; margin-top:3px;">
        Select any of the ${t.length} interactive financial lessons below or fly directly to the <strong>Investor Learning District</strong> in the 3D city.
      </p>
      <button class="primary" id="fly-learn-district-btn" style="width:100%; margin-top:8px;">🎓 Fly Camera to Learning District</button>
    </div>

    <div class="section-card">
      <h4>${t.length} Core Financial Lessons</h4>
      ${t.map(([n,s],r)=>`
        <div data-lesson-key="${n}" style="padding:8px; border-bottom:1px solid var(--border-subtle); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:700; font-size:12.5px;">${r+1}. ${s.title}</div>
            <div style="font-size:11px; color:var(--text-secondary);">${s.meaning.slice(0,68)}...</div>
          </div>
          <span style="color:var(--accent); font-weight:700;">Open →</span>
        </div>
      `).join("")}
    </div>
  `,e.querySelector("#fly-learn-district-btn").addEventListener("click",()=>{Wn("LEARN")}),e.querySelectorAll("[data-lesson-key]").forEach(n=>{n.addEventListener("click",()=>sa(n.dataset.lessonKey))})}function GE(i,e,t){i.textContent="Indices & Constituent Explorer";const n=[...t.companies.filter(s=>s.inNifty)].sort((s,r)=>r.marketCap-s.marketCap);e.innerHTML=`
    <div class="edu-block">
      <strong>Index Methodology Disclosure</strong>
      <p style="font-size:11.5px; margin-top:3px;">
        Official NIFTY 50 and SENSEX indices are maintained by NSE Indices Ltd and Asia Index Pvt Ltd using free-float market capitalization rules. In MarketVerse Simulation Mode, index movements are derived proportionally from the market-cap-weighted basket of constituent buildings in the city.
      </p>
    </div>

    <div class="metric-grid">
      <div class="metric-box">
        <div class="metric-label"><span>NIFTY 50 (Simulated)</span></div>
        <div class="metric-val num" data-bind="idx-nifty-lvl"></div>
        <div class="num" style="font-size:11px;" data-bind="idx-nifty-chg"></div>
      </div>
      <div class="metric-box">
        <div class="metric-label"><span>SENSEX (Simulated)</span></div>
        <div class="metric-val num" data-bind="idx-sensex-lvl"></div>
        <div class="num" style="font-size:11px;" data-bind="idx-sensex-chg"></div>
      </div>
    </div>

    <div class="section-card">
      <h4>Simulated NIFTY Basket Constituents (${n.length})</h4>
      <div style="font-size:11px; color:var(--text-secondary); margin-bottom:6px;">
        Top Constituents by Basket Weight (Market Cap Share)
      </div>
      ${n.slice(0,12).map(s=>`
        <div data-idx-comp="${s.id}" style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid var(--border-subtle); cursor:pointer; font-size:11.5px;">
          <span><strong>${s.symbol}</strong> <span style="color:var(--text-muted);" data-bind="idx-wt-${s.id}"></span></span>
          <span class="num" data-bind="idx-pct-${s.id}"></span>
        </div>
      `).join("")}
    </div>
  `,e.querySelectorAll("[data-idx-comp]").forEach(s=>{s.addEventListener("click",()=>rt("COMPANY",s.dataset.idxComp,!0))}),jm(e,t)}function jm(i,e){const t=e.indices.NIFTY,n=e.indices.SENSEX,s=e.companies.filter(a=>a.inNifty),r=s.reduce((a,o)=>a+o.marketCap,0);Ne(i,"idx-nifty-lvl",t.current.toLocaleString("en-IN",{minimumFractionDigits:2})),Pn(i,"idx-nifty-chg",We(t.changePercent),`num ${t.changePercent>=0?"pos-text":"neg-text"}`),Ne(i,"idx-sensex-lvl",n.current.toLocaleString("en-IN",{minimumFractionDigits:2})),Pn(i,"idx-sensex-chg",We(n.changePercent),`num ${n.changePercent>=0?"pos-text":"neg-text"}`),s.forEach(a=>{const o=r>0?(a.marketCap/r*100).toFixed(2):"0.00";Ne(i,`idx-wt-${a.id}`,`(${o}% wt)`),Pn(i,`idx-pct-${a.id}`,We(a.changePercent),`num ${a.changePercent>=0?"pos-text":"neg-text"}`)})}function WE(i,e,t){const n=t.totals.listedCount||t.companies.length;i.textContent="MarketVerse City Overview",e.innerHTML=`
    <div class="edu-block">
      <strong>Welcome to MarketVerse</strong>
      <p style="font-size:12px; margin-top:4px;">
        Click any <strong>Company Building</strong>, <strong>Sector District</strong>, <strong>Exchange Tower</strong>, or <strong>Learning Landmark</strong> in the 3D city to inspect live simulated metrics and interactive explanations.
      </p>
    </div>

    <div class="section-card">
      <h4>
        <span>Market Breadth (${n}-Company City Dataset)</span>
        <button class="help-icon" id="overview-breadth-help">?</button>
      </h4>
      <div style="display:flex; height:10px; border-radius:5px; overflow:hidden; margin:8px 0;">
        <div data-bind="ov-bar-adv" style="width:0%; background:var(--pos);"></div>
        <div data-bind="ov-bar-unch" style="width:0%; background:var(--neu);"></div>
        <div data-bind="ov-bar-dec" style="width:0%; background:var(--neg);"></div>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:11.5px;">
        <span class="pos-text">▲ Advancing: <strong data-bind="ov-adv-cnt"></strong></span>
        <span class="neu-text">• Unch: <strong data-bind="ov-unch-cnt"></strong></span>
        <span class="neg-text">▼ Declining: <strong data-bind="ov-dec-cnt"></strong></span>
      </div>
      <div style="font-size:10.5px; color:var(--text-muted); margin-top:4px;">
        Universe disclosure: Calculated strictly across the ${n} listed companies in MarketVerse, not the entire NSE/BSE universe.
      </div>
    </div>

    <div class="section-card">
      <h4>Top Simulated Movers Today</h4>
      <div style="font-size:11px; color:var(--text-secondary); margin-bottom:4px;">Strongest Gainers</div>
      <div id="ov-top-gainers"></div>
      <div style="font-size:11px; color:var(--text-secondary); margin:8px 0 4px;">Largest Decliners</div>
      <div id="ov-top-losers"></div>
    </div>
  `,e.querySelector("#overview-breadth-help").addEventListener("click",()=>sa("bullBear")),Km(e,t)}function Km(i,e){const t=Math.max(1,e.totals.listedCount||e.companies.length);Or(i,"ov-bar-adv","width",`${e.totals.advancing/t*100}%`),Or(i,"ov-bar-unch","width",`${e.totals.unchanged/t*100}%`),Or(i,"ov-bar-dec","width",`${e.totals.declining/t*100}%`),Ne(i,"ov-adv-cnt",e.totals.advancing),Ne(i,"ov-unch-cnt",e.totals.unchanged),Ne(i,"ov-dec-cnt",e.totals.declining);const n=[...e.companies].sort((l,c)=>c.changePercent-l.changePercent),s=n.slice(0,3),r=n.slice(-3).reverse(),a=i.querySelector("#ov-top-gainers");a&&(a.innerHTML=s.map(l=>`
      <div data-mover-id="${l.id}" style="display:flex; justify-content:space-between; padding:4px 0; cursor:pointer; border-bottom:1px solid var(--border-subtle);">
        <span style="font-weight:600;">${l.symbol}</span>
        <span class="num">${tt(l.price)} <span class="pos-text">(${We(l.changePercent)})</span></span>
      </div>
    `).join(""),a.querySelectorAll("[data-mover-id]").forEach(l=>{l.addEventListener("click",()=>rt("COMPANY",l.dataset.moverId,!0))}));const o=i.querySelector("#ov-top-losers");o&&(o.innerHTML=r.map(l=>`
      <div data-mover-id="${l.id}" style="display:flex; justify-content:space-between; padding:4px 0; cursor:pointer; border-bottom:1px solid var(--border-subtle);">
        <span style="font-weight:600;">${l.symbol}</span>
        <span class="num">${tt(l.price)} <span class="neg-text">(${We(l.changePercent)})</span></span>
      </div>
    `).join(""),o.querySelectorAll("[data-mover-id]").forEach(l=>{l.addEventListener("click",()=>rt("COMPANY",l.dataset.moverId,!0))}))}function kf(i=P.getViewState()){const e=document.getElementById("inspector-title"),t=document.getElementById("inspector-body");if(!(!e||!t)){if(i.dataMode==="REAL_DATA"){e.textContent="Real-Data Adapter Status",t.innerHTML=`
      <div class="edu-block warn">
        <strong>Real-Data Provider Not Configured</strong>
        <p style="margin-top:6px;">MarketVerse separates its 3D city visualization from its market-data adapter. Currently, no licensed NSE/BSE real-time or delayed API endpoint is configured.</p>
      </div>
      <div class="section-card">
        <h4>Why No Live Quote Is Fabricated</h4>
        <p style="color:var(--text-secondary); font-size:12px;">
          In accordance with strict financial integrity rules:
          <br>• MarketVerse never invents fake "live" quotes in Real-Data mode.
          <br>• Secret API keys must never be embedded in client-side static HTML/JS; a secure backend proxy is required for authenticated exchange feeds.
        </p>
        <button class="primary" id="return-sim-mode-btn" style="width:100%; margin-top:10px;">Return to Seeded Simulation Mode</button>
      </div>
    `,t.querySelector("#return-sim-mode-btn").addEventListener("click",()=>{const n=P.getLiveState();n.dataMode="SIMULATION";const s=document.getElementById("data-mode-select");s&&(s.value="SIMULATION"),$i(n),He(P.getViewState()),P.emit("settings"),P.emit("tick")});return}if(i.selectedObject){const{type:n,id:s}=i.selectedObject;if(n==="COMPANY")return Hm(s,e,t,i);if(n==="SECTOR")return UE(s,e,t,i);if(n==="EXCHANGE")return OE(e,t);if(n==="INFRA")return FE(s,e,t);if(n==="LEARN")return BE(s,e,t)}switch(i.activeNavView){case"compare":return kE(e,t,i);case"watchlist":return zE(e,t,i);case"portfolio":return HE(e,t,i);case"whatif":return qm(e,t,i);case"learn":return VE(e,t);case"indices":return GE(e,t,i);default:return WE(e,t,i)}}}function XE(i=P.getViewState()){if(i.dataMode==="REAL_DATA")return;const e=document.getElementById("inspector-body");if(e){if(i.selectedObject){const{type:t,id:n}=i.selectedObject;return t==="COMPANY"?rl(n,e,i):t==="SECTOR"?Vm(n,e,i):void 0}switch(i.activeNavView){case"compare":return Gm(e,i);case"watchlist":return Wm(e,i);case"portfolio":return Ym(e,i);case"whatif":return Zd(e,i);case"indices":return jm(e,i);case"learn":return;default:return Km(e,i)}}}function YE(){Sa(15,"Loading Seeded Indian Market Dataset..."),P.loadPersistedState(),al(),gE(P.getViewState().companies),window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change",o=>{P.getLiveState().reducedMotion=o.matches,P.emit("settings")}),Sa(40,"Constructing 3D Exchange & Sector Districts..."),cS(rt),Lb(),Ib(),kb(),hS(),xS(),Sa(70,"Building Company Towers & Learning Landmarks..."),ES(P.getViewState().companies),AS(),RS(),LS(),DS(),FS(),cE(),He(P.getViewState()),zu(),Sa(90,"Wiring Interactive Controls & Analytics..."),PE(),EE(),CE(),wE(),pE(),P.subscribe("selection",()=>{Bl("select")}),P.subscribe(["selection","nav","settings","watchlist","portfolio","compare","whatif"],a=>{Rs(a),kf(a),za(a)}),P.subscribe(["bottomTab","filter","event"],a=>{Rs(a),za(a)}),P.subscribe("alerts",a=>{Rs(a)}),P.subscribe(["tick","replay"],a=>{He(a),Rs(a),XE(a),TE(a)});const i=P.getViewState();Rs(i),kf(i),za(i),vE(),window.location.search.includes("test=1")&&setTimeout(()=>Wu(),500);const e=document.getElementById("perf-telemetry-pill");let t=performance.now(),n=0,s=0;function r(a){requestAnimationFrame(r);const o=Math.min(.1,(a-t)/1e3),l=a*.001;if(t=a,document.hidden)return;const c=P.getLiveState(),d=P.getViewState();if(c.simRunning&&c.dataMode==="SIMULATION"&&c.replayIndex===-1&&(n+=o*c.simSpeed,n>=2.6&&(n=0,Mi())),Cb(o),lS(o),wS(d.companies,o,d),mS(o,c.reducedMotion),CS(o,c.reducedMotion),PS(l,o,c.reducedMotion),IS(l,c.reducedMotion),Hb(o,c.reducedMotion),NS(o,c.reducedMotion),KS(o,c.reducedMotion,D.target,D.distance),Fm(D.target),dS(),DE(),s+=o,s>=.5&&e){s=0;const u=Rb();e.textContent=`${u.fps} FPS • ${u.calls} draws • ${(u.triangles/1e3).toFixed(1)}k tris`}}requestAnimationFrame(r)}window.addEventListener("DOMContentLoaded",YE);
//# sourceMappingURL=index-CrKnEE4c.js.map
