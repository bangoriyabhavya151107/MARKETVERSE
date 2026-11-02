/**
 * Centralized Application Store with granular pub/sub channels and
 * strict separation between Live Simulation State and Replay View State.
 */

class Store {
  constructor() {
    this.listeners = new Map();

    this.state = {
      // UI & Mode Configuration
      dataMode: 'SIMULATION', // 'SIMULATION' | 'REAL_DATA'
      exchangeFilter: 'ALL',
      beginnerMode: true,
      activeNavView: 'overview',
      activeBottomTab: 'companies',
      activeHistoryHorizon: '1D',
      tableSort: { col: 'marketCap', asc: false },
      tableFilter: '',
      selectedObject: null, // { type: 'COMPANY'|'SECTOR'|'EXCHANGE'|'INFRA'|'LEARN', id: string }

      // User Tools State
      compareIds: ['C01', 'C06', 'C11'],
      watchlistIds: [],
      portfolio: [], // [{ id, qty, avgCost }]
      alerts: [],
      triggeredAlerts: [],
      mcapThresholds: { largeCr: 100000, midCr: 40000 },

      // Simulation Playback & Event Decay State
      simRunning: true,
      simSpeed: 1,
      simTickCount: 0,
      simSecondsFromOpen: 36900, // 10:15:00 IST
      activeEventId: 'NONE',
      eventRemainingTicks: 0,
      eventTotalTicks: 0,

      // What-If Sandbox State
      whatIf: {
        companyId: 'C01',
        customPrice: null,
        customSharesCr: null,
        sectorId: 'ALL',
        sectorShockPct: 5,
        snapshotBefore: null
      },

      // Live Simulation Financial Entities
      companies: [],
      indices: {
        NIFTY: { name: 'NIFTY 50 (Simulated)', baseLevel: 22450.00, baseMcap: 0, current: 22450.00, change: 0, changePercent: 0, constituentCount: 0, history: [] },
        SENSEX: { name: 'SENSEX (Simulated)', baseLevel: 73890.00, baseMcap: 0, current: 73890.00, change: 0, changePercent: 0, constituentCount: 0, history: [] }
      },
      totals: {
        listedCount: 0,
        mcapCr: 0,
        baseMcapCr: 0,
        mcapChangePct: 0,
        volumeCr: 0,
        advancing: 0,
        declining: 0,
        unchanged: 0,
        mood: 'SIDEWAYS',
        mcapHistory: [],
        volHistory: []
      },

      // Immutable Replay Buffer & View State
      replayHistory: [], // Array of frozen snapshots
      replayIndex: -1,   // -1 means Live
      replayViewState: null, // Populated when replayIndex !== -1

      // 3D Environment Settings
      labelsVisible: true,
      weather: 'CLEAR',
      isNight: false,
      reducedMotion: false
    };
  }

  /**
   * Returns the live mutable state (used by engine mutations).
   */
  getLiveState() {
    return this.state;
  }

  /**
   * Returns a unified view state for UI and 3D rendering:
   * - When in Live mode (`replayIndex === -1`), returns `this.state`.
   * - When scrubbing Replay (`replayIndex !== -1`), overlays the immutable snapshot's
   *   financial data (`companies`, `indices`, `totals`, `simSecondsFromOpen`, `simTickCount`)
   *   without ever mutating `this.state`.
   */
  getViewState() {
    if (this.state.replayIndex !== -1 && this.state.replayViewState) {
      return {
        ...this.state,
        simTickCount: this.state.replayViewState.tick,
        simSecondsFromOpen: this.state.replayViewState.clock,
        activeEventId: this.state.replayViewState.activeEventId,
        eventRemainingTicks: this.state.replayViewState.eventRemainingTicks,
        companies: this.state.replayViewState.companies,
        indices: this.state.replayViewState.indices,
        totals: this.state.replayViewState.totals
      };
    }
    return this.state;
  }

  /**
   * Subscribe to one or more granular event channels.
   * Channels: 'tick', 'selection', 'nav', 'bottomTab', 'settings', 'replay',
   * 'event', 'watchlist', 'portfolio', 'compare', 'alerts', 'whatif', 'filter'
   */
  subscribe(eventOrEvents, callback) {
    const events = Array.isArray(eventOrEvents) ? eventOrEvents : [eventOrEvents];
    events.forEach(ev => {
      if (!this.listeners.has(ev)) {
        this.listeners.set(ev, new Set());
      }
      this.listeners.get(ev).add(callback);
    });
    return () => {
      events.forEach(ev => {
        const set = this.listeners.get(ev);
        if (set) set.delete(callback);
      });
    };
  }

  /**
   * Emit a granular event to subscribed listeners.
   */
  emit(event, payload = null) {
    const set = this.listeners.get(event);
    if (set) {
      const viewState = this.getViewState();
      set.forEach(cb => cb(viewState, payload, event));
    }
  }

  /**
   * Load persisted user lists (watchlist, portfolio, alerts) from localStorage.
   */
  loadPersistedState() {
    try {
      const w = localStorage.getItem('mv_watchlist');
      this.state.watchlistIds = w ? JSON.parse(w) : ['C01', 'C06', 'C11', 'C19'];

      const p = localStorage.getItem('mv_portfolio');
      this.state.portfolio = p
        ? JSON.parse(p)
        : [
            { id: 'C01', qty: 50, avgCost: 1590.00 },
            { id: 'C06', qty: 25, avgCost: 3780.00 },
            { id: 'C15', qty: 40, avgCost: 1520.00 }
          ];

      const a = localStorage.getItem('mv_alerts');
      this.state.alerts = a
        ? JSON.parse(a)
        : [
            { id: 'A1', type: 'COMPANY_PCT', targetId: 'C06', thresholdPct: 1.5, description: 'NAVYATECH moves more than ±1.5%' },
            { id: 'A2', type: 'SECTOR_PCT', targetId: 'BANKING', thresholdPct: 1.2, description: 'Banking Sector moves more than ±1.2%' }
          ];
    } catch (e) {
      console.warn('localStorage unavailable, using default memory state.');
    }
  }

  /**
   * Persist user lists to localStorage.
   */
  savePersistedState() {
    try {
      localStorage.setItem('mv_watchlist', JSON.stringify(this.state.watchlistIds));
      localStorage.setItem('mv_portfolio', JSON.stringify(this.state.portfolio));
      localStorage.setItem('mv_alerts', JSON.stringify(this.state.alerts));
    } catch (e) {
      // Ignore storage quota errors
    }
  }
}

export const store = new Store();