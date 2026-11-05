import { useState } from 'react';

// Что будет на экране после одного нажатия? А после второго?
// Сколько раз выведется render на одно нажатие?
export function Puzzle() {
  const [n, setN] = useState(0);
  console.log('render', n);

  const handleClick = () => {
    setN(n + 1);
    setN((prev) => prev * 2);
    setN(10);
    setN((prev) => prev + 1);
  };

  return (
    <button type="button" onClick={handleClick}>
      n = {n}
    </button>
  );
}
