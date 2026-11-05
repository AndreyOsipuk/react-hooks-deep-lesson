import { useState } from 'react';

// Что выведется на экран?
// Сколько раз и что выведется в консоль?
// Есть ли тут ошибка? А если убрать условие if?
export function Puzzle() {
  const [n, setN] = useState(0);
  console.log('render', n);

  if (n < 3) {
    setN(n + 1);
  }

  return <p>{n}</p>;
}
