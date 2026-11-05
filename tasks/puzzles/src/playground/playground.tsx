import { StrictMode, useState, useSyncExternalStore } from 'react';
import { PUZZLES } from '../puzzles';
import { consoleStore } from './console-store';
import { ErrorBoundary } from './error-boundary';

// Служебный код песочницы: выбор примера, StrictMode, консоль на странице.

const STORAGE_KEY = 'hooks-puzzles-current';

const readSaved = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? PUZZLES[0].id;
  } catch {
    return PUZZLES[0].id;
  }
};

export function Playground() {
  const [currentId, setCurrentId] = useState(readSaved);
  const [isStrict, setIsStrict] = useState(false);
  const [mountKey, setMountKey] = useState(0);
  const [isShown, setIsShown] = useState(true);

  const current = PUZZLES.find((puzzle) => puzzle.id === currentId) ?? PUZZLES[0];
  const Current = current.Component;

  // Перезапуск в два шага: сначала полностью убираем пример (его cleanup-логи уходят),
  // потом чистим консоль и монтируем заново. Так в консоли только логи нового запуска.
  const remount = (apply: () => void = () => {}) => {
    setIsShown(false);
    setTimeout(() => {
      apply();
      consoleStore.clear();
      setMountKey((key) => key + 1);
      setIsShown(true);
    }, 50);
  };

  const choose = (id: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // хранилище может быть недоступно - не страшно
    }
    remount(() => setCurrentId(id));
  };

  const content = (
    <ErrorBoundary key={`${current.id}-${mountKey}-${isStrict}`}>
      <Current />
    </ErrorBoundary>
  );

  return (
    <div className="playground">
      <header className="toolbar">
        <select value={current.id} onChange={(evt) => choose(evt.target.value)}>
          {PUZZLES.map((puzzle) => (
            <option key={puzzle.id} value={puzzle.id}>
              {puzzle.title}
            </option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            checked={isStrict}
            onChange={(evt) => {
              const checked = evt.target.checked;
              remount(() => setIsStrict(checked));
            }}
          />{' '}
          StrictMode
        </label>
        <button type="button" onClick={() => remount()}>
          Перезапустить
        </button>
        <span className="file">Код: src/{current.file}</span>
      </header>

      <section className="stage">{isShown && (isStrict ? <StrictMode>{content}</StrictMode> : content)}</section>

      <ConsolePanel />
    </div>
  );
}

// Консоль - отдельный компонент: новые записи перерисовывают только её, а не пример.
// Иначе пример с console.log в эффекте без зависимостей перерисовывал бы сам себя по кругу.
function ConsolePanel() {
  const entries = useSyncExternalStore(consoleStore.subscribe, consoleStore.getEntries);
  return (
    <section className="console">
      <div className="console-head">
        Консоль
        <button type="button" onClick={consoleStore.clear}>
          Очистить
        </button>
      </div>
      <ol>
        {entries.map((entry) => (
          <li key={entry.id} className={entry.level}>
            {entry.text}
          </li>
        ))}
      </ol>
    </section>
  );
}
