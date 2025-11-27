// Buffer shims for browser compatibility
declare global {
  var Buffer: typeof import('buffer').Buffer;
  var global: typeof globalThis;
}

// Add the Buffer to the window object for browser compatibility
import { Buffer } from 'buffer';
(window as any).Buffer = Buffer;

export {};