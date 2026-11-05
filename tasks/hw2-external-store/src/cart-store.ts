// Маленькое хранилище корзины вне React (как Redux store, WebSocket или localStorage).
// Этот файл не меняйте.

type Listener = () => void;

let items: string[] = [];
const listeners = new Set<Listener>();

export const cartStore = {
  getItems: () => items,
  add: (item: string) => {
    items = [...items, item];
    listeners.forEach((listener) => listener());
  },
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  reset: () => {
    items = [];
    listeners.clear();
  },
  listenersCount: () => listeners.size,
};
