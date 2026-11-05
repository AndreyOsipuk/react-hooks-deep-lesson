import { useEffect, useReducer, useState } from 'react';

// Что выведется на экран сразу?
// Что будет на экране после первого нажатия на кнопку? А после второго?
// Есть ли в коде ошибки?
export function Puzzle() {
  const [values] = useState([0]);
  const [, rerender] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    values.push(1);
  }, []);

  useEffect(() => {
    values.push(2);
  });

  return (
    <>
      <p>{values}</p>
      <button type="button" onClick={rerender}>
        Перерисовать
      </button>
    </>
  );
}
