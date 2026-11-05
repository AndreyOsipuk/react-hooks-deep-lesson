// Почините ProductPage так, чтобы тесты стали зелёными. Тесты не меняйте.
import { act, render } from '@testing-library/react';
import { ProductPage, VISIT_DELAY } from './product-page';

const wait = (ms: number) => act(() => vi.advanceTimersByTime(ms));

describe('ProductPage', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('засчитывает просмотр через секунду на странице', () => {
    const logVisit = vi.fn();
    render(<ProductPage productId="1" cartCount={0} logVisit={logVisit} />);
    wait(VISIT_DELAY - 1);
    expect(logVisit).not.toHaveBeenCalled();
    wait(1);
    expect(logVisit.mock.calls).toEqual([['1', 0]]);
  });

  it('ушёл раньше чем через секунду - просмотр не засчитан', () => {
    const logVisit = vi.fn();
    const { unmount } = render(<ProductPage productId="1" cartCount={0} logVisit={logVisit} />);
    wait(500);
    unmount();
    wait(VISIT_DELAY);
    expect(logVisit).not.toHaveBeenCalled();
  });

  it('добавление в корзину не сбрасывает отсчёт секунды', () => {
    const logVisit = vi.fn();
    const { rerender } = render(<ProductPage productId="1" cartCount={0} logVisit={logVisit} />);
    wait(600);
    rerender(<ProductPage productId="1" cartCount={1} logVisit={logVisit} />);
    wait(400);
    expect(logVisit).toHaveBeenCalledTimes(1);
  });

  it('в событии - число в корзине на момент отправки, а не на момент открытия', () => {
    const logVisit = vi.fn();
    const { rerender } = render(<ProductPage productId="1" cartCount={0} logVisit={logVisit} />);
    wait(600);
    rerender(<ProductPage productId="1" cartCount={2} logVisit={logVisit} />);
    wait(400);
    expect(logVisit.mock.calls).toEqual([['1', 2]]);
  });

  it('один просмотр на товар: дальнейшие изменения корзины не шлют новых событий', () => {
    const logVisit = vi.fn();
    const { rerender } = render(<ProductPage productId="1" cartCount={0} logVisit={logVisit} />);
    wait(VISIT_DELAY);
    rerender(<ProductPage productId="1" cartCount={1} logVisit={logVisit} />);
    wait(VISIT_DELAY);
    expect(logVisit.mock.calls).toEqual([['1', 0]]);
  });

  it('родитель каждые 300 мс передаёт новую функцию logVisit - просмотр всё равно засчитывается', () => {
    const calls: unknown[] = [];
    const ui = () => <ProductPage productId="1" cartCount={0} logVisit={(...args) => calls.push(args)} />;
    const { rerender } = render(ui());
    for (let i = 0; i < 4; i++) {
      wait(300);
      rerender(ui());
    }
    expect(calls).toEqual([['1', 0]]);
  });

  it('переход на другой товар - новый отсчёт и новое событие', () => {
    const logVisit = vi.fn();
    const { rerender } = render(<ProductPage productId="1" cartCount={0} logVisit={logVisit} />);
    wait(VISIT_DELAY);
    rerender(<ProductPage productId="2" cartCount={0} logVisit={logVisit} />);
    wait(VISIT_DELAY);
    expect(logVisit.mock.calls).toEqual([
      ['1', 0],
      ['2', 0],
    ]);
  });
});
