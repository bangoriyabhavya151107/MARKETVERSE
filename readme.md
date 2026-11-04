# MarketVerse — The Living 3D Stock Market City

MarketVerse is a production-grade 3D financial literacy and market-visualization platform built with **Vite**, **Vanilla ES Modules**, **Three.js**, and **GSAP**. It transforms an Indian equity market ecosystem (NSE/BSE model) into an interactive 3D miniature city where company scale (`Market Cap = Share Price × Outstanding Shares`), sector dynamics, post-trade infrastructure, and investment concepts can be explored in real time.

## Features
- **36 Fictional Indian Listed Companies across 10 Sector Districts**: Each sector features its own procedural architectural language (`Tech` stepped glass towers, `Banking` colonnade bases, `Energy` refineries & chimneys, `Healthcare` cross-wings, `Auto` sawtooth sheds, `Consumer` terraced retail, `Telecom` lattice masts, `Industrials` silos & cranes, `Materials` blast furnaces, `Diversified` skybridge towers).
- **Landmark Central Stock Exchange + 7 Infrastructure Facilities + 6 Physical Learning Landmarks + 12 Interactive Lessons**.
- **Focus-Safe Keyed UI & Granular State Store (`src/state/store.js`)**: Simulation ticks patch only `[data-bind]` text/bar nodes and never overwrite focused `<input>` or `<select>` controls.
- **Immutable Replay Isolation (`src/engine/replay.js`)**: Scrubbing the replay timeline reads from frozen snapshots via `store.getViewState()` without mutating `liveState`.
- **60-Second Guided "Story Mode" (`🎬 Story`)** & **4-Step Interactive Onboarding Tour (`🎓`)**.
- **Automated Engine & 18 Acceptance Tests (`npm test` or click `🧪` in the Topbar / visit `?test=1`)**.

---

## Quick Start & Commands

```bash
# 1. Install dependencies
npm install

# 2. Run automated financial engine & 18 acceptance tests
npm test

# 3. Start local Vite development server
npm run dev

# 4. Build static production bundle for Vercel
npm run build

# 5. Preview production build locally
npm run preview
```

---



# Changelog — MarketVerse Production Rebuild

## Stage 6 — Polish, Performance & QA
- Added **Beginner / Pro Workspace Presets** (`applyWorkspacePreset`) and floating **Sector Heatmap Scale Legend**.
- Added **60-Second Guided "Story Mode" (`🎬 Story`)** walking through a 5-chapter simulated market session.
- Added optional **Web Audio Synthesizer Sound Effects (`🔇/🔊`)**, off by default.
- Merged static sidewalk, canal embankment, crosswalk, and bridge geometries (`BufferGeometryUtils.mergeGeometries`) to reduce draw calls.
- Added live **Render Telemetry HUD** (`FPS • Draw Calls • Triangles`), adaptive pixel-ratio scaling, hidden-tab pause, and `beforeunload` WebGL resource disposal.
- Added `src/engine/__tests__/engine.test.js` and `run-cli.mjs` (`npm test` + in-app `🧪` QA modal) verifying all 18 product acceptance criteria.

## Stage 5 — UI System & Responsive Layout
- Created formal design tokens in `src/styles/tokens.css` (spacing scale, radii, elevations, 3 type sizes, tabular numerals, single primary accent).
- Simplified the Top Bar into 3 groups (**Market/Exchange**, **Simulation with Events Popover**, **View with Scene Dropdown**).
- Added **Icon-Only Collapsible Left Nav** and merged duplicate Overview/Entire Market actions.
- Added **3-Tab Company Inspector** (`Snapshot`, `Chart`, `Learn`) with collapsible `Advanced Valuation & Thresholds`.
- Built **Interactive Multi-Horizon Chart** (`src/ui/charts.js`) with hover crosshair and point readout tooltip.
- Added **Mobile Responsive Layout (`<= 768px`)** with bottom navigation bar and 3-state bottom-sheet inspector (`peek / half / full`).

## Stage 4 — Interaction & Controls
- Added inertia/damping camera rig with GSAP transitions, double-click tight focus, and automatic gentle idle orbit.
- Added multi-touch gestures (1-finger orbit, 2-finger pan + pinch zoom), on-screen accessible camera D-pad, and clickable 2D **City Radar Minimap**.
- Added throttled hover raycasting with building vertical lift, outline glow, and mini-tooltip with sparkline.
- Added **Label LOD** with distance fading and 2D bounding-box collision avoidance.
- Added Loading Screen, skippable 5-second cinematic fly-in, 4-step onboarding tour, keyboard shortcuts (`1-0`, `Space`, `F`, `Esc`, `/`, `?`), and watermarked PNG screenshot export.

## Stage 3 — Lighting & Atmosphere
- Added camera-following tight `2048×2048` directional shadow frustum and soft baked-looking AO contact shadow decals under all structures.
- Added `EffectComposer` post-processing (`RenderPass`, selective `UnrealBloomPass`, `BokehPass` DoF on selection, `SMAAPass`, Vignette, `OutputPass` ACES).
- Added procedural GLSL Sky Dome with Sun/Moon disc, night starfield, drifting volumetric clouds, smooth day/night solar cycle, market-mood skyline tinting, 5-second event color wash, and rain streaks + ground ripples.

## Stage 2 — World & Art Direction
- Built 10 distinct procedural sector architectural languages, procedural window facades with volume-driven light density, and smooth lerped height/width transitions.
- Built textured plazas, avenues with lane markings & crosswalks, western canal waterway with 3 arch bridges, and 3D district entrance gates.
- Built landmark Central Stock Exchange with rotating 3D ticker-tape band and gyroscope mood monument, 7 distinct infrastructure silhouettes, 6 physical learning landmarks, and instanced traffic, pedestrians, cranes, and fiber-optic data pulses.

## Stage 1 — Architecture Migration & Core Fixes
- Migrated single-file app into modular Vite ES project structure (`src/state`, `src/data`, `src/engine`, `src/world`, `src/controls`, `src/ui`, `src/styles`, `src/utils`).
- Fixed the input/dropdown reset bug via granular store events and keyed DOM patching (`src/utils/dom.js`).
- Isolated Replay into immutable snapshots (`src/engine/replay.js`), added event duration/decay + separate "End Event" vs. "Reset Simulation", separated `simRng` and `visualRng`, and generated authentic multi-horizon seeded histories (`1D`, `1W`, `1M`, `3M`, `1Y`).
```

---

### Stage 6 Summary & Honest 18 Acceptance Test Verification Report

#### 1. How to Run the Application & Automated QA Suite
```powershell
# Run the automated 18 acceptance tests in PowerShell:
npm test

# Start the development server:
npm run dev
```
*(You can also click the **`🧪`** button in the top bar or visit `http://localhost:5173/?test=1` to run and inspect all 18 tests live in the browser.)*

#### 2. Verified 18 Acceptance Tests Report (`npm test` & Live Browser Execution)

| ID | Acceptance Requirement | Status | Verified Output |
| :--- | :--- | :---: | :--- |
| **AT-01** | 36 Listed Companies & Dynamic Constituent Counts | **PASS ✓** | `Listed=36, NIFTY=24, SENSEX=18` computed dynamically |
| **AT-02** | `Market Cap = Price × Shares` Across All 36 Companies | **PASS ✓** | Exact to 2 decimal places across all 36 companies on init, tick, and What-If |
| **AT-03** | `% Change vs Previous Close` Accuracy | **PASS ✓** | All 36 companies match `((price - previousClose) / previousClose) * 100` |
| **AT-04** | Cap-Weighted Simulated NIFTY & SENSEX Indices | **PASS ✓** | Derived from constituent `marketCap` sum vs. `baseMcap` |
| **AT-05** | 10 Sector Districts with Cap-Weighted & Equal-Weighted Returns | **PASS ✓** | Both Cap-Weighted and Equal-Weighted returns calculated & displayed |
| **AT-06** | 7 Market Infrastructure Facilities Present & Distinct | **PASS ✓** | All 7 facilities have unique 3D silhouettes, roles, and institutional distinctions |
| **AT-07** | 6 Learning Landmarks & 12 Financial Literacy Lessons | **PASS ✓** | All 6 physical 3D landmarks and 12 interactive lessons verified |
| **AT-08** | Distinct Multi-Horizon Seeded Histories (`1D, 1W, 1M, 3M, 1Y`) | **PASS ✓** | 5 independent seeded arrays generated at init (`20..30` pts), never scaled from `1D` |
| **AT-09** | Dual Seeded RNG Isolation & 100% Deterministic Reset | **PASS ✓** | Advancing `visualRng` 500× has zero effect on `simRng`; resets reproduce identical prices |
| **AT-10** | Immutable Replay Isolation & Exact Live Restoration | **PASS ✓** | Scrubbing to Tick #0 reads frozen `replayViewState`; returning to Live restores exact `liveState` |
| **AT-11** | Event Decay & "End Event" Preserves Simulation Progress | **PASS ✓** | Events decay over $N$ ticks; `endActiveEvent()` clears drift while preserving tick & prices |
| **AT-12** | Unavailable Metrics Explicitly Null (Never Fake Zeroes) | **PASS ✓** | `QUANTUMIT` (`pe: null, divYield: null`) displays `Unavailable` with explanation |
| **AT-13** | Simulation vs. Real-Data Adapter Separation | **PASS ✓** | `REAL_DATA` mode halts synthetic ticks and shows unconfigured provider notice |
| **AT-14** | Compare Tool Supports 2–4 Companies Focus-Safely | **PASS ✓** | Supports 2–4 companies; `<select>` dropdown never resets during simulation ticks |
| **AT-15** | Watchlist & Hypothetical Portfolio Explorer | **PASS ✓** | Persisted in `localStorage`; quantity input never resets on ticks; shows sector concentration |
| **AT-16** | What-If Single-Company & Sector Shock Sandbox | **PASS ✓** | Price/share inputs never reset on ticks; supports Apply, Undo, and ±Sector Shocks |
| **AT-17** | Educational Market Movement Alerts + Toasts | **PASS ✓** | Evaluates company & sector thresholds each tick and fires Toast notifications |
| **AT-18** | 7 Hypothetical Economic Events with Explicit Assumptions | **PASS ✓** | All 7 events include plain-English descriptions, affected sectors, assumptions, and 5s sky cue |