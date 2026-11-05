import { useEffect } from 'react';

type ProductPageProps = {
  productId: string;
  cartCount: number;
  logVisit: (productId: string, cartCount: number) => void;
};

export const VISIT_DELAY = 1000;

// Требование аналитиков: «просмотр засчитывается, если пользователь пробыл на товаре 1 секунду.
// Событие отправляется один раз на товар, и в нём - число товаров в корзине НА МОМЕНТ ОТПРАВКИ».
export function ProductPage({ productId, cartCount, logVisit }: ProductPageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      logVisit(productId, cartCount);
    }, VISIT_DELAY);
    return () => clearTimeout(timer);
  }, [productId, cartCount, logVisit]);

  return (
    <article>
      <h2>Товар {productId}</h2>
      <p>В корзине: {cartCount}</p>
    </article>
  );
}
