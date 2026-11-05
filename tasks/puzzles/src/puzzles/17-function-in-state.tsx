import { useState } from 'react';

// В состоянии хотим хранить функцию-форматтер.
// Что выведется на экран сразу? Что выведется в консоль и на экран после нажатия «В евро»?
// Как правильно положить функцию в состояние?
const toRubles = (price: number) => {
  console.log('toRubles вызвана с', price);
  return `${price} ₽`;
};
const toEuros = (price: number) => {
  console.log('toEuros вызвана с', price);
  return `€${price}`;
};

export function Puzzle() {
  const [format, setFormat] = useState(toRubles);

  return (
    <>
      <p>Цена: {typeof format === 'function' ? format(100) : String(format)}</p>
      <button type="button" onClick={() => setFormat(toEuros)}>
        В евро
      </button>
    </>
  );
}
