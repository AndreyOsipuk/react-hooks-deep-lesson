import { useEffect, useState } from 'react';
import type { Offer } from './offers';

type OffersListProps = {
  offers: Offer[];
  query: string;
};

// Запрос к ИИ: «отфильтруй список по строке поиска, чтобы фильтр пересчитывался при изменении пропсов».
// Код работает - на экране всё правильно. Но линтер React 19 ругается: react-hooks/set-state-in-effect.
export function OffersList({ offers, query }: OffersListProps) {
  const [visibleOffers, setVisibleOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const normalized = query.trim().toLowerCase();
    setVisibleOffers(offers.filter((offer) => offer.title.toLowerCase().includes(normalized)));
  }, [offers, query]);

  return (
    <section>
      <p>Найдено: {visibleOffers.length}</p>
      <ul>
        {visibleOffers.map((offer) => (
          <li key={offer.id}>
            {offer.title} - €{offer.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
