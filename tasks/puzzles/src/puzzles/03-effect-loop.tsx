import { useEffect, useRef, useState } from 'react';

// Сколько раз и что именно выведется в консоль? Что будет на экране?
// Что будет, если хранить состояние объектом: useState({ value: 0 }) и setState({ value: 5 })?
// Почему?
export function Puzzle() {
  const [value, setValue] = useState(0);
  const guard = useRef(0); // защита, чтобы вкладка не зависла. На вопрос не влияет

  useEffect(() => {
    setValue(3);
  }, []);

  useEffect(() => {
    if (guard.current++ > 20) return;
    console.log('effect', value);
    setValue(5);
  });

  return <p>{value}</p>;
}
