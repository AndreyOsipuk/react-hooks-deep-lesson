import { useEffect, useState } from 'react';
import { cartStore } from './cart-store';

// Часть 1. Хук: подписывается на корзину и возвращает товары.
// На первый взгляд всё правильно: подписка в эффекте, отписка в cleanup.
export function useCartItems() {
  const [items, setItems] = useState(cartStore.getItems());

  useEffect(() => {
    return cartStore.subscribe(() => setItems(cartStore.getItems()));
  }, []);

  return items;
}

// Часть 2. Напишите сами: { count, last } - число товаров и последний добавленный (или null).
// Требования - в тестах.
export function useCartSummary(): { count: number; last: string | null } {
  throw new Error('Не реализовано');
}
