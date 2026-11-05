import { useState } from 'react';
import { ProductPage } from './product-page';

export function Demo() {
  const [productId, setProductId] = useState('1');
  const [cartCount, setCartCount] = useState(0);
  const [events, setEvents] = useState<string[]>([]);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>Аналитика просмотров</h1>
      <button type="button" onClick={() => setProductId(String(Number(productId) + 1))}>
        Следующий товар
      </button>{' '}
      <button type="button" onClick={() => setCartCount((count) => count + 1)}>
        Добавить в корзину
      </button>
      <ProductPage
        productId={productId}
        cartCount={cartCount}
        logVisit={(id, count) => setEvents((prev) => [...prev, `просмотр ${id}, в корзине ${count}`])}
      />
      <h2>Ушло в аналитику</h2>
      <ol>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ol>
    </main>
  );
}
