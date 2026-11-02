/**
 * Keyed DOM update utilities.
 * Ensures we never destroy or overwrite focused inputs/selects during simulation ticks.
 */

/**
 * Returns true if the given container currently holds a focused form control.
 */
export function hasFocusedControl(container) {
  if (!container || !document.activeElement) return false;
  const active = document.activeElement;
  if (!container.contains(active)) return false;
  const tag = active.tagName;
  return tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA';
}

/**
 * Updates textContent of an element matching `[data-bind="key"]` inside root
 * only if the value actually changed and the node is not focused.
 */
export function patchText(root, key, value) {
  if (!root) return;
  const el = root.querySelector(`[data-bind="${key}"]`);
  if (!el || el === document.activeElement) return;
  const str = String(value);
  if (el.textContent !== str) {
    el.textContent = str;
  }
}

/**
 * Updates both textContent and className of a keyed node.
 */
export function patchTextAndClass(root, key, value, className) {
  if (!root) return;
  const el = root.querySelector(`[data-bind="${key}"]`);
  if (!el || el === document.activeElement) return;
  const str = String(value);
  if (el.textContent !== str) el.textContent = str;
  if (className && el.className !== className) el.className = className;
}

/**
 * Updates style property (such as width) of a keyed node.
 */
export function patchStyle(root, key, prop, val) {
  if (!root) return;
  const el = root.querySelector(`[data-bind="${key}"]`);
  if (!el) return;
  if (el.style[prop] !== val) {
    el.style[prop] = val;
  }
}