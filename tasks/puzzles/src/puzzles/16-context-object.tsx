import { createContext, memo, use, useState } from 'react';

// UserName обёрнут в memo и читает только user из контекста.
// Нажмите «Тема» три раза. Сколько раз выведется UserName render? Почему?
// Как починить, не убирая theme из контекста?
type AppContextValue = { user: string; theme: string };
const AppContext = createContext<AppContextValue>({ user: '', theme: 'light' });

const UserName = memo(function UserName() {
  const { user } = use(AppContext);
  console.log('UserName render');
  return <p>Пользователь: {user}</p>;
});

const Header = memo(function Header() {
  console.log('Header render');
  return <UserName />;
});

export function Puzzle() {
  const [theme, setTheme] = useState('light');
  const user = 'Oliver';

  return (
    <AppContext value={{ user, theme }}>
      <button type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Тема: {theme}
      </button>
      <Header />
    </AppContext>
  );
}
