import { Profiler, useState } from 'react';
import { OffersList } from './offers-list';
import { OFFERS } from './offers';

export function Demo() {
  const [query, setQuery] = useState('');

  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>Поиск по предложениям</h1>
      <input aria-label="Поиск" value={query} onChange={(evt) => setQuery(evt.target.value)} />
      <Profiler
        id="OffersList"
        onRender={(_id, phase) => console.log(`OffersList: фиксация (${phase})`)}
      >
        <OffersList offers={OFFERS} query={query} />
      </Profiler>
      <p>Откройте консоль и введите одну букву: сколько фиксаций на один символ?</p>
    </main>
  );
}
