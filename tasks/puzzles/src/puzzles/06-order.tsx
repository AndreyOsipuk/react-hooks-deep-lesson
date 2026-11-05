import { useEffect, useLayoutEffect, useState } from 'react';

// В каком порядке выведутся сообщения при монтировании?
// А после нажатия на кнопку?
function Child({ n }: { n: number }) {
  console.log('Child render', n);
  useLayoutEffect(() => {
    console.log('Child layout effect', n);
    return () => console.log('Child layout cleanup', n);
  });
  useEffect(() => {
    console.log('Child effect', n);
    return () => console.log('Child cleanup', n);
  });
  return <p ref={() => console.log('Child ref', n)}>Child {n}</p>;
}

export function Puzzle() {
  const [n, setN] = useState(0);
  console.log('Parent render', n);
  useLayoutEffect(() => {
    console.log('Parent layout effect', n);
  }, [n]);
  useEffect(() => {
    console.log('Parent effect', n);
  }, []);
  return (
    <>
      <button type="button" onClick={() => setN(n + 1)}>
        +1
      </button>
      <Child n={n} />
    </>
  );
}
