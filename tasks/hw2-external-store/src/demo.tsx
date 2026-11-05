import { useEffect } from 'react';
import { cartStore } from './cart-store';
import { useCartItems } from './use-cart';

// Виджет «Подарок»: при появлении на странице сразу кладёт подарок в корзину.
function GiftBanner() {
  useEffect(() => {
    cartStore.add('Подарок');
  }, []);
  return <p>Мы положили вам подарок в корзину!</p>;
}

function Cart() {
  const items = useCartItems();
  return <p>В корзине: {items.join(', ') || 'пусто'}</p>;
}

export function Demo() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>Корзина</h1>
      <GiftBanner />
      <Cart />
      <button type="button" onClick={() => cartStore.add('Товар')}>
        Добавить товар
      </button>
    </main>
  );
}
