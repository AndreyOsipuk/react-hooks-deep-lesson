// Имитация чат-сервера с постоянным соединением (как WebSocket).
// Не меняйте этот файл: это «внешняя библиотека».

type Listener = (message: string) => void;

export type Connection = {
  roomId: string;
  connect: () => void;
  disconnect: () => void;
  onMessage: (listener: Listener) => void;
};

const openConnections = new Set<Connection>();

export function createConnection(roomId: string): Connection {
  const listeners = new Set<Listener>();
  const connection: Connection = {
    roomId,
    connect: () => {
      openConnections.add(connection);
    },
    disconnect: () => {
      openConnections.delete(connection);
      listeners.clear();
    },
    onMessage: (listener) => {
      listeners.add(listener);
    },
  };
  deliver.set(connection, (message) => listeners.forEach((listener) => listener(message)));
  return connection;
}

const deliver = new Map<Connection, Listener>();

// Сервер рассылает сообщение всем открытым соединениям комнаты.
export function sendToRoom(roomId: string, message: string) {
  openConnections.forEach((connection) => {
    if (connection.roomId === roomId) {
      deliver.get(connection)?.(message);
    }
  });
}

export function getOpenConnections() {
  return [...openConnections].map((connection) => connection.roomId);
}

export function resetServer() {
  openConnections.clear();
}
