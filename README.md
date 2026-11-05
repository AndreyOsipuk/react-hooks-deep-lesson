# Хук изнутри: снимок рендера, жизнь эффекта и гонки

Задачи к углублённому уроку по хукам курса «React. Разработка сложных клиентских приложений».

Каждая задача - отдельный маленький проект (React 19.3, Vite 8, Vitest 5). Открывается по ссылке в StackBlitz прямо в браузере: ничего ставить не нужно, тесты запускаются сами и перезапускаются при каждом сохранении.

## Задачи

| # | Задача | Где | Ссылка |
|---|--------|-----|--------|
| 0 | **Головоломки на хуки**: 18 коротких примеров «что выведется?» + 2 практики | урок | [открыть](https://stackblitz.com/github/AndreyOsipuk/react-hooks-deep-lesson/tree/main/tasks/puzzles?file=README.md) |
| 1 | Снимок рендера | урок | [открыть](https://stackblitz.com/github/AndreyOsipuk/react-hooks-deep-lesson/tree/main/tasks/01-snapshot?file=README.md) |
| 2 | Лишний рендер, которого не видно глазами | урок | [открыть](https://stackblitz.com/github/AndreyOsipuk/react-hooks-deep-lesson/tree/main/tasks/02-derived-state?file=README.md) |
| 3 | Гонка запросов и «проверка на демонтирование» | урок | [открыть](https://stackblitz.com/github/AndreyOsipuk/react-hooks-deep-lesson/tree/main/tasks/03-race?file=README.md) |
| 4 | Реактивное и нереактивное в эффекте | урок | [открыть](https://stackblitz.com/github/AndreyOsipuk/react-hooks-deep-lesson/tree/main/tasks/04-effect-event?file=README.md) |
| 5 | Что проверяет StrictMode | урок | [открыть](https://stackblitz.com/github/AndreyOsipuk/react-hooks-deep-lesson/tree/main/tasks/05-strict-mode?file=README.md) |
| Д1 | Ревью хука от ИИ: `useFetch` | дома | [открыть](https://stackblitz.com/github/AndreyOsipuk/react-hooks-deep-lesson/tree/main/tasks/hw1-use-fetch?file=README.md) |
| Д2 | Подписка на внешнее хранилище | дома | [открыть](https://stackblitz.com/github/AndreyOsipuk/react-hooks-deep-lesson/tree/main/tasks/hw2-external-store?file=README.md) |
| Д3 | Докажи тестом | дома | [открыть](https://stackblitz.com/github/AndreyOsipuk/react-hooks-deep-lesson/tree/main/tasks/hw3-prove-it?file=README.md) |

## Как работать

1. Откройте ссылку и подождите около минуты: StackBlitz установит зависимости и запустит тесты в терминале внизу (в головоломках вместо тестов откроется превью).
2. Условие задачи - в `README.md` (откроется первым). Код - в папке `src`.
3. Сохраняете файл (Ctrl+S / Cmd+S) - тесты перезапускаются сами.
4. Чтобы посмотреть демо в браузере: нажмите **+** справа от вкладки Terminal и выполните `npm run dev`. Справа откроется превью.
5. **Тесты не меняйте** (кроме Д1 и Д3, где их пишете вы). Задача решена, когда все тесты зелёные **и** вы можете объяснить, почему исходный код был неправильным.
6. Чтобы сохранить решение, нажмите **Fork** (нужен вход через GitHub). Без входа изменения живут, пока открыта вкладка.

## Если StackBlitz не открывается

Работайте локально (нужен Node.js 22.12+):

```bash
git clone https://github.com/AndreyOsipuk/react-hooks-deep-lesson.git
cd react-hooks-deep-lesson/tasks/03-race
npm install
npm test
```

Демо: `npm run dev` в соседнем терминале.

## Про ИИ-ассистентов

Пользоваться можно. Но в каждой задаче проверяется не код, а понимание: на уроке вы сначала **предсказываете** поведение, потом проверяете. Если ИИ дал решение, которое проходит тесты, - спросите себя, сможете ли вы объяснить его без ИИ на защите курсового.
