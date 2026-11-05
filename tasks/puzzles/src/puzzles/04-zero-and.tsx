import { useEffect, useState } from 'react';

// Что пользователь увидит на экране в самый первый момент? А потом?
// Сколько раз выведется render?
// Есть ли в коде ошибки?
export function Puzzle() {
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  console.log('render', value, items.toString());

  useEffect(() => {
    setValue(2);
    setItems([0, 1]);
  }, []);

  return (
    <div>
      {value && <p>value: {value}</p>}
      <p>{items.toString()}</p>
    </div>
  );
}
