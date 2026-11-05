import { useEffect, useLayoutEffect, useState } from 'react';

// Нажмите «Скрыть». В каком порядке выполнятся cleanup-функции:
// сначала родитель или дети? Сначала первый ребёнок или второй? layout или обычные?
function Item({ name }: { name: string }) {
  useLayoutEffect(() => () => console.log(`${name}: layout cleanup`), [name]);
  useEffect(() => () => console.log(`${name}: cleanup`), [name]);
  return <li>{name}</li>;
}

function List() {
  useLayoutEffect(() => () => console.log('List: layout cleanup'), []);
  useEffect(() => () => console.log('List: cleanup'), []);
  return (
    <ul>
      <Item name="первый" />
      <Item name="второй" />
    </ul>
  );
}

export function Puzzle() {
  const [isShown, setIsShown] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setIsShown(!isShown)}>
        {isShown ? 'Скрыть' : 'Показать'}
      </button>
      {isShown && <List />}
    </>
  );
}
