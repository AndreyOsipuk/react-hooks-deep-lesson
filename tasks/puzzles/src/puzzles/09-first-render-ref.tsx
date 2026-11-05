import { useEffect, useRef, useState } from 'react';

// Код хочет отличить первый запуск эффекта от последующих.
// Что выведется в консоль при монтировании? А со StrictMode?
// Что выведется после нажатия на кнопку?
export function Puzzle() {
  const [n, setN] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      console.log('update', n);
    } else {
      console.log('mount', n);
      isMounted.current = true;
    }
  });

  return (
    <button type="button" onClick={() => setN(n + 1)}>
      n = {n}
    </button>
  );
}
