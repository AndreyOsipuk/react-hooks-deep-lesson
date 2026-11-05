import { useState } from 'react';

// Нажмите «+1» у счётчика A три раза, затем «Переключить».
// Что покажет счётчик B? Почему?
// Как сделать, чтобы у A и B были свои счётчики? Назовите два способа.
function Counter({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  return (
    <p>
      {label}: {count}{' '}
      <button type="button" onClick={() => setCount(count + 1)}>
        +1
      </button>
    </p>
  );
}

export function Puzzle() {
  const [isA, setIsA] = useState(true);
  return (
    <>
      {isA ? <Counter label="A" /> : <Counter label="B" />}
      <button type="button" onClick={() => setIsA(!isA)}>
        Переключить
      </button>
    </>
  );
}
