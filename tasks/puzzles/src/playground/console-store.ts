// Перехват console.log/warn/error, чтобы показывать консоль прямо на странице.
// Это служебный код песочницы, к задачам он не относится.

export type LogEntry = { id: number; level: 'log' | 'warn' | 'error'; text: string };

let entries: LogEntry[] = [];
let pending: LogEntry[] = [];
let nextId = 1;
let flushScheduled = false;
const listeners = new Set<() => void>();

const format = (args: unknown[]) =>
  args
    .map((arg) => {
      if (typeof arg === 'string') return arg;
      if (arg instanceof Error) return arg.message;
      if (typeof arg === 'function') return `ƒ ${arg.name || 'anonymous'}`;
      try {
        return JSON.stringify(arg) ?? String(arg);
      } catch {
        return String(arg);
      }
    })
    .join(' ')
    // React подставляет аргументы в предупреждения через %s
    .replace(/%s/g, '');

function flush() {
  flushScheduled = false;
  entries = [...entries, ...pending].slice(-300);
  pending = [];
  listeners.forEach((listener) => listener());
}

function push(level: LogEntry['level'], args: unknown[]) {
  pending.push({ id: nextId++, level, text: format(args) });
  // Обновляем панель после текущего рендера, а не во время него.
  if (!flushScheduled) {
    flushScheduled = true;
    setTimeout(flush, 0);
  }
}

export function installConsoleCapture() {
  (['log', 'warn', 'error'] as const).forEach((level) => {
    const original = console[level].bind(console);
    console[level] = (...args: unknown[]) => {
      original(...args);
      push(level, args);
    };
  });
}

export const consoleStore = {
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getEntries: () => entries,
  clear: () => {
    entries = [];
    pending = [];
    listeners.forEach((listener) => listener());
  },
};
