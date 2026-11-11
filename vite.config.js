import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite plugin that verifies required project files on startup and provides
 * automatic fallback resolution if a file was named singular vs. plural on Windows.
 */
function marketVerseResolverPlugin() {
  const REQUIRED_FILES = [
    'src/main.js',
    'src/state/store.js',
    'src/data/companies.js',
    'src/data/sectors.js',
    'src/data/infrastructure.js',
    'src/data/landmarks.js',
    'src/data/lessons.js',
    'src/data/events.js',
    'src/engine/rng.js',
    'src/engine/simulation.js',
    'src/engine/finance.js',
    'src/engine/indices.js',
    'src/engine/replay.js',
    'src/engine/alerts.js',
    'src/world/scene.js',
    'src/world/lighting.js',
    'src/world/ground.js',
    'src/world/exchange.js',
    'src/world/districts.js',
    'src/world/buildings.js',
    'src/world/modelLoader.js',
    'src/data/assets.json',
    'src/world/infrastructure.js',
    'src/world/learning.js',
    'src/world/instancing.js',
    'src/world/traffic.js',
    'src/world/weather.js',
    'src/world/postfx.js',
    'src/world/labels.js',
    'src/controls/cameraRig.js',
    'src/controls/picking.js',
    'src/controls/touch.js',
    'src/ui/router.js',
    'src/ui/intro.js',
    'src/ui/panels.js',
    'src/ui/topbar.js',
    'src/ui/leftNav.js',
    'src/ui/bottomPanel.js',
    'src/ui/charts.js',
    'src/ui/modal.js',
    'src/ui/toasts.js',
    'src/ui/onboarding.js',
    'src/ui/inspector/index.js',
    'src/ui/inspector/company.js',
    'src/ui/inspector/sector.js',
    'src/ui/inspector/exchange.js',
    'src/ui/inspector/infra.js',
    'src/ui/inspector/landmark.js',
    'src/ui/inspector/compare.js',
    'src/ui/inspector/watchlist.js',
    'src/ui/inspector/portfolio.js',
    'src/ui/inspector/whatif.js',
    'src/ui/inspector/learn.js',
    'src/ui/inspector/indices.js',
    'src/styles/tokens.css',
    'src/styles/base.css',
    'src/styles/layout.css',
    'src/styles/components.css',
    'src/utils/format.js',
    'src/utils/dom.js'
  ];

  return {
    name: 'marketverse-file-verifier',
    buildStart() {
      const missing = REQUIRED_FILES.filter(rel => !fs.existsSync(path.resolve(__dirname, rel)));
      if (missing.length > 0) {
        console.warn('\n⚠️ [MarketVerse File Check] The following files are missing from your folder:');
        missing.forEach(m => console.warn(`   - ${m}`));
        console.warn('Please create them at the exact paths above.\n');
      } else {
        console.log('✅ [MarketVerse File Check] All 46 project files verified present!');
      }
    },
    resolveId(source, importer) {
      if (!importer || !source.startsWith('.')) return null;
      const importerDir = path.dirname(importer);
      const targetPath = path.resolve(importerDir, source);
      if (fs.existsSync(targetPath)) return null;

      // Fallback for common singular/plural or .txt filename variations on Windows
      const candidates = [
        targetPath.replace(/sectors\.js$/i, 'sector.js'),
        targetPath.replace(/sector\.js$/i, 'sectors.js'),
        targetPath.replace(/format\.js$/i, 'formats.js'),
        targetPath.replace(/formats\.js$/i, 'format.js'),
        targetPath + '.txt'
      ];

      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
          return candidate;
        }
      }
      return null;
    }
  };
}

export default defineConfig({
  base: '/',
  plugins: [marketVerseResolverPlugin()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2020'
  }
});