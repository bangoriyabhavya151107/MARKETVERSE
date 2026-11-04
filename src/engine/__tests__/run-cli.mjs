/**
 * Node CLI Runner for `npm test`.
 */
import { runAllEngineTests } from './engine.test.js';

const results = runAllEngineTests();

console.log('\n============================================================');
console.log('  MARKETVERSE — AUTOMATED ENGINE & 18 ACCEPTANCE TESTS');
console.log('============================================================\n');

results.items.forEach(item => {
  const badge = item.pass ? '\x1b[32mPASS ✓\x1b[0m' : '\x1b[31mFAIL ✕\x1b[0m';
  console.log(`${badge}  ${item.name}`);
  console.log(`        └─ ${item.detail}`);
});

console.log('\n------------------------------------------------------------');
console.log(`  Summary: ${results.passed}/${results.total} Passed, ${results.failed} Failed`);
console.log('------------------------------------------------------------\n');

if (results.failed > 0) {
  process.exit(1);
}