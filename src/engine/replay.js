/**
 * Immutable Replay Engine.
 * Records deep-cloned, frozen snapshots of the live simulation at each tick.
 * Scrubbing sets `replayViewState` on the store without ever mutating `liveState`.
 */
import { store } from '../state/store.js';

function cloneHorizons(obj) {
  const out = {};
  Object.keys(obj).forEach(k => {
    out[k] = Object.freeze([...obj[k]]);
  });
  return Object.freeze(out);
}

export function recordReplaySnapshot() {
  const live = store.getLiveState();

  const snapshot = Object.freeze({
    tick: live.simTickCount,
    clock: live.simSecondsFromOpen,
    activeEventId: live.activeEventId,
    eventRemainingTicks: live.eventRemainingTicks,
    companies: Object.freeze(
      live.companies.map(c =>
        Object.freeze({
          ...c,
          pos: Object.freeze({ ...c.pos }),
          history1D: Object.freeze([...c.history1D]),
          volHistory: Object.freeze([...c.volHistory]),
          histories: cloneHorizons(c.histories),
          volHistories: cloneHorizons(c.volHistories)
        })
      )
    ),
    indices: Object.freeze({
      NIFTY: Object.freeze({
        ...live.indices.NIFTY,
        history: Object.freeze([...live.indices.NIFTY.history])
      }),
      SENSEX: Object.freeze({
        ...live.indices.SENSEX,
        history: Object.freeze([...live.indices.SENSEX.history])
      })
    }),
    totals: Object.freeze({
      ...live.totals,
      mcapHistory: Object.freeze([...live.totals.mcapHistory]),
      volHistory: Object.freeze([...live.totals.volHistory])
    })
  });

  live.replayHistory.push(snapshot);
  if (live.replayHistory.length > 40) {
    live.replayHistory.shift();
  }
}

/**
 * Scrub to a specific snapshot index, or pass -1 to return to Live.
 */
export function setReplayIndex(index) {
  const live = store.getLiveState();
  if (index < 0 || index >= live.replayHistory.length - 1) {
    live.replayIndex = -1;
    live.replayViewState = null;
  } else {
    live.replayIndex = index;
    live.replayViewState = live.replayHistory[index];
  }
  store.emit('replay');
}

export function returnToLiveReplay() {
  const live = store.getLiveState();
  if (live.replayIndex !== -1) {
    live.replayIndex = -1;
    live.replayViewState = null;
    store.emit('replay');
  }
}