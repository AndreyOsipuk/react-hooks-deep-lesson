import { useEffect, useState } from 'react';
import { createConnection } from './chat-server';

type ChatRoomProps = {
  roomId: string;
};

// В main.tsx приложение обёрнуто в StrictMode.
export function ChatRoom({ roomId }: ChatRoomProps) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    connection.onMessage((message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [roomId]);

  return (
    <section>
      <h2>Комната {roomId}</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </section>
  );
}
