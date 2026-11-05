import { useEffect, useState } from 'react';

// Что выведется на экран?
// Есть ли в коде ошибки?
// Что изменится, если включить StrictMode?
// Как вывести 012 без ошибок?
export function Puzzle() {
  const [values, setValues] = useState([0]);

  useEffect(() => {
    values.push(1);
    setValues([...values]);
  }, []);

  useEffect(() => {
    if (values.length === 2) {
      values.push(2);
      setValues([...values]);
    }
  });

  return <p>{values}</p>;
}
