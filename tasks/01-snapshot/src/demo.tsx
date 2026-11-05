import { useState } from 'react';
import { MessageComposer } from './message-composer';

export function Demo() {
  const [log, setLog] = useState<string[]>([]);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>Отложенная отправка</h1>
      <MessageComposer onSend={(text) => setLog((prev) => [...prev, text])} />
      <h2>Ушло на сервер</h2>
      <ol>
        {log.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ol>
    </main>
  );
}
