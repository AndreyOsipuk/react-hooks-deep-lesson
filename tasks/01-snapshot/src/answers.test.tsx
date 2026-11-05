// Часть 1: проверка ваших предсказаний. Этот файл не меняйте.
// Тест запускает ИСХОДНУЮ версию компонента (копия ниже), поэтому ваши исправления
// в message-composer.tsx на него не влияют.
import { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { answers } from './answers';

function OriginalComposer({ onSend }: { onSend: (text: string) => void }) {
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

const readCounter = () => Number(screen.getByText(/Отправлено:/).textContent?.replace(/\D/g, ''));

describe('Часть 1. Предсказания', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('сценарий 1: текст изменили во время ожидания', () => {
    const onSend = vi.fn();
    render(<OriginalComposer onSend={onSend} />);
    fireEvent.click(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(1000));
    fireEvent.change(screen.getByLabelText('Текст'), { target: { value: 'Пока' } });
    act(() => vi.advanceTimersByTime(3000));
    expect(answers.scenario1SentText).toBe(onSend.mock.calls[0][0]);
  });

  it('сценарий 2: два клика подряд', () => {
    render(<OriginalComposer onSend={vi.fn()} />);
    fireEvent.click(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(500));
    fireEvent.click(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(4000));
    expect(answers.scenario2Counter).toBe(readCounter());
  });

  it('сценарий 3: клик, смена текста, клик', () => {
    const onSend = vi.fn();
    render(<OriginalComposer onSend={onSend} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.change(screen.getByLabelText('Текст'), { target: { value: 'Пока' } });
    fireEvent.click(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(4000));
    expect(answers.scenario3SentTexts).toEqual(onSend.mock.calls.map(([text]) => text));
    expect(answers.scenario3Counter).toBe(readCounter());
  });
});
