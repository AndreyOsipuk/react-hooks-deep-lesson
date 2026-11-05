import { memo, useState, type ReactNode } from 'react';

// Box обёрнут в memo. Перерисуется ли он при нажатии на кнопку?
// Что выведется в консоль после трёх нажатий?
// Как сделать, чтобы Box не перерисовывался?
const Box = memo(function Box({ children }: { children: ReactNode }) {
  console.log('Box render');
  return <div style={{ border: '1px solid', padding: 8 }}>{children}</div>;
});

export function Puzzle() {
  const [n, setN] = useState(0);
  return (
    <>
      <button type="button" onClick={() => setN(n + 1)}>
        n = {n}
      </button>
      <Box>
        <span>Я не завишу от n</span>
      </Box>
    </>
  );
}
