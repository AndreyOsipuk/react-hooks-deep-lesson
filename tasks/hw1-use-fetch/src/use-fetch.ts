import { useEffect, useState } from 'react';

// В этом хуке минимум четыре бага. Два уже покрыты тестами в use-fetch.test.ts, два - найдите сами.
export function useFetch<T>(url: string, options: RequestInit = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(url, options)
      .then((response) => response.json())
      .then((json: T) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setError(err);
        setIsLoading(false);
      });
  }, [url, options]);

  return { data, error, isLoading };
}
