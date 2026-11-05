// Часть 2: почините MessageComposer так, чтобы эти тесты стали зелёными. Тесты не меняйте.
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MessageComposer } from './message-composer';

const readCounter = () => Number(screen.getByText(/Отправлено:/).textContent?.replace(/\D/g, ''));

describe('Часть 2. MessageComposer', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('отправляет тот текст, который был в поле в момент нажатия', () => {
    const onSend = vi.fn();
    render(<MessageComposer onSend={onSend} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.change(screen.getByLabelText('Текст'), { target: { value: 'Пока' } });
    act(() => vi.advanceTimersByTime(3000));
    expect(onSend).toHaveBeenCalledWith('Привет');
  });

  it('считает каждую отправку, даже если таймеры пересеклись', () => {
    const onSend = vi.fn();
    render(<MessageComposer onSend={onSend} />);
    fireEvent.click(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(500));
    fireEvent.click(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(500));
    fireEvent.click(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(4000));
    expect(onSend).toHaveBeenCalledTimes(3);
    expect(readCounter()).toBe(3);
  });

  it('после размонтирования ничего не отправляет', () => {
    const onSend = vi.fn();
    const { unmount } = render(<MessageComposer onSend={onSend} />);
    fireEvent.click(screen.getByRole('button'));
    unmount();
    act(() => vi.advanceTimersByTime(4000));
    expect(onSend).not.toHaveBeenCalled();
  });
});
