import { useEffect, useLayoutEffect, useState } from 'react';
import { ErrorBoundary } from '../playground/error-boundary';

// Жизненный цикл функционального компонента.
// Перед каждым нажатием предскажите, что появится в консоли:
// «Обновить проп», «Изменить внутреннее состояние», «Размонтировать», «Смонтировать», «Уронить».
// После «Уронить» вернуть компонент можно кнопкой «Перезапустить» сверху.
function Broken(): never {
  throw new Error('some error');
}

function ShowLifecycle({ value, shouldFail }: { value: number; shouldFail: boolean }) {
  const [inner, setInner] = useState(0);
  console.log(`render: value=${value}, inner=${inner}`);

  useLayoutEffect(() => {
    console.log('layout effect []');
    return () => console.log('layout cleanup []');
  }, []);

  useEffect(() => {
    console.log(`effect [value] value=${value}`);
    return () => console.log(`cleanup [value] value=${value}`);
  }, [value]);

  useEffect(() => {
    console.log(`effect без зависимостей inner=${inner}`);
    return () => console.log(`cleanup без зависимостей inner=${inner}`);
  });

  return (
    <div>
      <p>
        value = {value}, inner = {inner}
      </p>
      <button type="button" onClick={() => setInner(inner + 1)}>
        Изменить внутреннее состояние
      </button>
      {shouldFail && <Broken />}
    </div>
  );
}

export function Puzzle() {
  const [value, setValue] = useState(0);
  const [isMounted, setIsMounted] = useState(true);
  const [shouldFail, setShouldFail] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setValue(value + 1)}>
        Обновить проп
      </button>
      <button type="button" onClick={() => setIsMounted(!isMounted)}>
        {isMounted ? 'Размонтировать' : 'Смонтировать'}
      </button>
      <button type="button" onClick={() => setShouldFail(true)}>
        Уронить
      </button>
      <ErrorBoundary>{isMounted && <ShowLifecycle value={value} shouldFail={shouldFail} />}</ErrorBoundary>
    </>
  );
}
