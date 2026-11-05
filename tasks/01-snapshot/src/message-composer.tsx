import { useState } from 'react';

type MessageComposerProps = {
  onSend: (text: string) => void;
};

// Компонент «Отправить с задержкой» - как в мессенджере: можно передумать в течение 3 секунд.
// Код написан ИИ-ассистентом по запросу «сделай отложенную отправку со счётчиком отправленных».
export function MessageComposer({ onSend }: MessageComposerProps) {
  const [text, setText] = useState('Привет');
  const [sentCount, setSentCount] = useState(0);

  const handleSendLater = () => {
    setTimeout(() => {
      onSend(text);
      setSentCount(sentCount + 1);
    }, 3000);
  };

  return (
    <div>
      <input aria-label="Текст" value={text} onChange={(evt) => setText(evt.target.value)} />
      <button type="button" onClick={handleSendLater}>
        Отправить через 3 с
      </button>
      <p>Отправлено: {sentCount}</p>
    </div>
  );
}
