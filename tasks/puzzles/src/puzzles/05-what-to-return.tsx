import { createPortal } from 'react-dom';
import { useState, type ReactNode } from 'react';

// Что можно вернуть из компонента? Для каждого варианта ответьте:
// что будет на экране, будет ли ошибка или предупреждение в консоли?
// Потом переключайте варианты и проверяйте.

const VARIANTS: Record<string, () => ReactNode> = {
  'div': () => <div>Hello</div>,
  'фрагмент': () => (
    <>
      <h3>Hello</h3>
      <h3>World</h3>
    </>
  ),
  'массив': () => [<h3>Some</h3>, <h3>Hello</h3>],
  'строка': () => 'Просто строка',
  'число 0': () => 0,
  'true': () => true,
  'null': () => null,
  'undefined': () => undefined,
  // @ts-expect-error - TypeScript тоже против. А React?
  'объект': () => ({ text: 'Hello' }),
  'портал': () => createPortal(<h3>Я в body</h3>, document.body),
};

export function Puzzle() {
  const [variant, setVariant] = useState('div');
  const Variant = VARIANTS[variant];

  return (
    <>
      <p>
        {Object.keys(VARIANTS).map((name) => (
          <button key={name} type="button" onClick={() => setVariant(name)}>
            {name}
          </button>
        ))}
      </p>
      <p>Вариант: {variant}</p>
      <hr />
      <Variant />
    </>
  );
}
