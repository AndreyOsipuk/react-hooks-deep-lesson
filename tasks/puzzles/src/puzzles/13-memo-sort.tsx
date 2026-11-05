import { useMemo, useState } from 'react';

// Нажмите «По цене». Что покажет список слева (родитель) и список справа (SortedList)?
// Есть ли в коде ошибка? Что сломается в проекте, если так сортировать предложения?
const OFFERS = [
  { id: 1, title: 'Amsterdam', price: 120 },
  { id: 2, title: 'Paris', price: 80 },
  { id: 3, title: 'Cologne', price: 200 },
];

function SortedList({ offers, isSorted }: { offers: typeof OFFERS; isSorted: boolean }) {
  const visible = useMemo(
    () => (isSorted ? offers.sort((a, b) => a.price - b.price) : offers),
    [offers, isSorted],
  );
  return (
    <ol>
      {visible.map((offer) => (
        <li key={offer.id}>
          {offer.title} - {offer.price}
        </li>
      ))}
    </ol>
  );
}

export function Puzzle() {
  const [isSorted, setIsSorted] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsSorted(!isSorted)}>
        {isSorted ? 'Как пришло с сервера' : 'По цене'}
      </button>
      <div style={{ display: 'flex', gap: 32 }}>
        <div>
          Родитель:
          <ol>
            {OFFERS.map((offer) => (
              <li key={offer.id}>{offer.title}</li>
            ))}
          </ol>
        </div>
        <div>
          SortedList:
          <SortedList offers={OFFERS} isSorted={isSorted} />
        </div>
      </div>
    </>
  );
}
