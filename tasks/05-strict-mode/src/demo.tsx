import { useState } from 'react';
import { ChatRoom } from './chat-room';
import { getOpenConnections, sendToRoom } from './chat-server';

export function Demo() {
  const [roomId, setRoomId] = useState('general');
  const [isOpen, setIsOpen] = useState(true);
  const [, forceUpdate] = useState(0);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>Чат</h1>
      <select value={roomId} onChange={(evt) => setRoomId(evt.target.value)}>
        <option value="general">general</option>
        <option value="travel">travel</option>
        <option value="offtop">offtop</option>
      </select>{' '}
      <button type="button" onClick={() => setIsOpen((value) => !value)}>
        {isOpen ? 'Закрыть чат' : 'Открыть чат'}
      </button>{' '}
      <button type="button" onClick={() => sendToRoom(roomId, `Сообщение в ${roomId}`)}>
        Сервер шлёт сообщение
      </button>{' '}
      <button type="button" onClick={() => forceUpdate((n) => n + 1)}>
        Обновить список соединений
      </button>
      <p>Открытые соединения: {getOpenConnections().join(', ') || 'нет'}</p>
      {isOpen && <ChatRoom roomId={roomId} />}
    </main>
  );
}
