import { useRef, useState } from 'react';

// Код считает рендеры через ref.
// Что покажет «Рендеров» сразу и после двух нажатий на кнопку?
// А со StrictMode? Почему линтер React 19 ругается на эту строку?
export function Puzzle() {
  const [n, setN] = useState(0);
  const renders = useRef(0);
  renders.current += 1;

  return (
    <>
      <p>Рендеров: {renders.current}</p>
      <button type="button" onClick={() => setN(n + 1)}>
        n = {n}
      </button>
    </>
  );
}
