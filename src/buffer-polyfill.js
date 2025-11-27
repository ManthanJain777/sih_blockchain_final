// Buffer polyfill for browser compatibility
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  // Make Buffer available globally in the browser
  window.Buffer = Buffer;
  window.global = window.global || window;
  window.process = window.process || {
    env: { DEBUG: undefined },
  };
}

export { Buffer };