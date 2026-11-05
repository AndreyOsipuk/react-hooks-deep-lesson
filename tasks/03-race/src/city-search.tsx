import { useEffect, useRef, useState } from 'react';
import { searchCities, type SearchCities } from './api';

type CitySearchProps = {
  search?: SearchCities;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export function CitySearch({ search = searchCities }: CitySearchProps) {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (query === '') {
      return;
    }
    search(query)
      .then((result) => {
        if (isMounted.current) {
          setCities(result);
          setStatus('success');
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setStatus('error');
        }
      });
  }, [query, search]);

  const handleChange = (value: string) => {
    setQuery(value);
    setStatus(value === '' ? 'idle' : 'loading');
  };

  return (
    <div>
      <input aria-label="Город" value={query} onChange={(evt) => handleChange(evt.target.value)} />
      <p data-testid="status">{status}</p>
      {status === 'error' && <p>Не удалось загрузить</p>}
      <ul>
        {cities.map((city) => (
          <li key={city}>{city}</li>
        ))}
      </ul>
    </div>
  );
}
