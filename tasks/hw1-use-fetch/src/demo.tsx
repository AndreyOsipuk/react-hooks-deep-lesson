import { useState } from 'react';
import { useFetch } from './use-fetch';

type Offer = { id: string; title: string };

// Демо ходит в сервер «Шести городов». Если сервер недоступен - увидите ошибку, это нормально.
const SERVER = 'https://14.design.htmlacademy.pro/six-cities';

export function Demo() {
  const [path, setPath] = useState('/offers');
  const { data, error, isLoading } = useFetch<Offer[] | Offer>(`${SERVER}${path}`);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>useFetch</h1>
      <p>Откройте вкладку Network в DevTools: сколько запросов уходит?</p>
      <button type="button" onClick={() => setPath('/offers')}>Все предложения</button>{' '}
      <button type="button" onClick={() => setPath('/offers/not-exists')}>Несуществующее</button>
      <p>isLoading: {String(isLoading)}</p>
      <p>error: {error?.message ?? 'нет'}</p>
      <pre style={{ maxHeight: 300, overflow: 'auto' }}>{JSON.stringify(data, null, 2)?.slice(0, 1000)}</pre>
    </main>
  );
}
