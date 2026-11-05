// Сделайте тесты зелёными. Тесты и cart-store.ts не меняйте.
import { useEffect } from 'react';
import { act, render, renderHook, screen } from '@testing-library/react';
import { cartStore } from './cart-store';
import { useCartItems, useCartSummary } from './use-cart';

beforeEach(() => cartStore.reset());

describe('Часть 1. useCartItems', () => {
  it('показывает товары и обновляется при добавлении', () => {
    const { result } = renderHook(() => useCartItems());
    act(() => cartStore.add('Палатка'));
    expect(result.current).toEqual(['Палатка']);
  });

  it('не теряет изменение, которое случилось между рендером и подпиской', () => {
    function GiftBanner() {
      useEffect(() => {
        cartStore.add('Подарок');
      }, []);
      return null;
    }
    function Cart() {
      const items = useCartItems();
      return <p>В корзине: {items.join(', ') || 'пусто'}</p>;
    }
    render(
      <>
        <GiftBanner />
        <Cart />
      </>,
    );
    expect(screen.getByText(/В корзине/).textContent).toBe('В корзине: Подарок');
  });

  it('отписывается при размонтировании', () => {
    const { unmount } = renderHook(() => useCartItems());
    unmount();
    expect(cartStore.listenersCount()).toBe(0);
  });
});

describe('Часть 2. useCartSummary', () => {
  it('пустая корзина', () => {
    const { result } = renderHook(() => useCartSummary());
    expect(result.current).toEqual({ count: 0, last: null });
  });

  it('считает товары и помнит последний', () => {
    const { result } = renderHook(() => useCartSummary());
    act(() => cartStore.add('Палатка'));
    act(() => cartStore.add('Спальник'));
    expect(result.current).toEqual({ count: 2, last: 'Спальник' });
  });

  it('пока корзина не менялась, возвращает тот же объект (можно класть в зависимости и в memo)', () => {
    const { result, rerender } = renderHook(() => useCartSummary());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
