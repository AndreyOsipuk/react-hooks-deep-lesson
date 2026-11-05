const CITIES = [
  'Amsterdam', 'Antwerp', 'Athens', 'Barcelona', 'Berlin', 'Brussels', 'Budapest',
  'Cologne', 'Copenhagen', 'Dublin', 'Dusseldorf', 'Hamburg', 'Helsinki', 'Lisbon',
  'London', 'Madrid', 'Milan', 'Munich', 'Paris', 'Prague', 'Riga', 'Rome', 'Vienna',
];

export type SearchCities = (query: string, signal?: AbortSignal) => Promise<string[]>;

// «Сервер» со случайной задержкой 200-1500 мс: ответы приходят в случайном порядке.
// Если передать signal и отменить его - промис отклоняется с ошибкой AbortError, как у fetch.
export const searchCities: SearchCities = (query, signal) =>
  new Promise((resolve, reject) => {
    const delay = 200 + Math.random() * 1300;
    const timer = setTimeout(() => {
      const normalized = query.toLowerCase();
      resolve(CITIES.filter((city) => city.toLowerCase().startsWith(normalized)));
    }, delay);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Запрос отменён', 'AbortError'));
    });
  });
