// Почините ChatRoom так, чтобы тесты стали зелёными. Тесты и chat-server.ts не меняйте.
import { StrictMode, type ReactNode } from 'react';
import { act, render, screen } from '@testing-library/react';
import { ChatRoom } from './chat-room';
import { getOpenConnections, resetServer, sendToRoom } from './chat-server';

const strict = (node: ReactNode) => <StrictMode>{node}</StrictMode>;
const shownMessages = () => screen.queryAllByRole('listitem').map((li) => li.textContent);

describe('ChatRoom', () => {
  beforeEach(() => resetServer());

  it('без StrictMode: одно соединение с комнатой', () => {
    render(<ChatRoom roomId="general" />);
    expect(getOpenConnections()).toEqual(['general']);
  });

  it('в StrictMode тоже одно соединение', () => {
    render(strict(<ChatRoom roomId="general" />));
    expect(getOpenConnections()).toEqual(['general']);
  });

  it('в StrictMode каждое сообщение показано один раз', () => {
    render(strict(<ChatRoom roomId="general" />));
    act(() => sendToRoom('general', 'Привет'));
    expect(shownMessages()).toEqual(['Привет']);
  });

  it('при смене комнаты старое соединение закрывается', () => {
    const { rerender } = render(<ChatRoom roomId="general" />);
    rerender(<ChatRoom roomId="travel" />);
    expect(getOpenConnections()).toEqual(['travel']);
  });

  it('после смены комнаты сообщения из старой не приходят', () => {
    const { rerender } = render(<ChatRoom roomId="general" />);
    rerender(<ChatRoom roomId="travel" />);
    act(() => sendToRoom('general', 'Из старой комнаты'));
    expect(shownMessages()).toEqual([]);
  });

  it('после закрытия чата соединений нет', () => {
    const { unmount } = render(<ChatRoom roomId="general" />);
    unmount();
    expect(getOpenConnections()).toEqual([]);
  });
});
