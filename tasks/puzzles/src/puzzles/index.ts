import type { ComponentType } from 'react';
import { Puzzle as P01 } from './01-zero-one-two';
import { Puzzle as P02 } from './02-push-without-set';
import { Puzzle as P03 } from './03-effect-loop';
import { Puzzle as P04 } from './04-zero-and';
import { Puzzle as P05 } from './05-what-to-return';
import { Puzzle as P06 } from './06-order';
import { Puzzle as P07 } from './07-same-place';
import { Puzzle as P08 } from './08-set-in-render';
import { Puzzle as P09 } from './09-first-render-ref';
import { Puzzle as P10 } from './10-memo-children';
import { Puzzle as P11 } from './11-updater-queue';
import { Puzzle as P12 } from './12-lifecycle';
import { Puzzle as P13 } from './13-memo-sort';
import { Puzzle as P14 } from './14-key-index';
import { Puzzle as P15 } from './15-ref-render-counter';
import { Puzzle as P16 } from './16-context-object';
import { Puzzle as P17 } from './17-function-in-state';
import { Puzzle as P18 } from './18-unmount-order';
import { Puzzle as Form } from '../practice/01-form';
import { Puzzle as Slider } from '../practice/02-slider';

type PuzzleEntry = { id: string; title: string; file: string; Component: ComponentType };

export const PUZZLES: PuzzleEntry[] = [
  { id: '01', title: '1. Как вывести 012?', file: 'puzzles/01-zero-one-two.tsx', Component: P01 },
  { id: '02', title: '2. push без setState', file: 'puzzles/02-push-without-set.tsx', Component: P02 },
  { id: '03', title: '3. setState в эффекте без зависимостей', file: 'puzzles/03-effect-loop.tsx', Component: P03 },
  { id: '04', title: '4. Что видно в первый момент', file: 'puzzles/04-zero-and.tsx', Component: P04 },
  { id: '05', title: '5. Что можно вернуть из компонента', file: 'puzzles/05-what-to-return.tsx', Component: P05 },
  { id: '06', title: '6. Порядок рендеров и эффектов', file: 'puzzles/06-order.tsx', Component: P06 },
  { id: '07', title: '7. Тот же компонент на том же месте', file: 'puzzles/07-same-place.tsx', Component: P07 },
  { id: '08', title: '8. setState прямо в рендере', file: 'puzzles/08-set-in-render.tsx', Component: P08 },
  { id: '09', title: '9. Первый запуск эффекта через ref', file: 'puzzles/09-first-render-ref.tsx', Component: P09 },
  { id: '10', title: '10. memo и children', file: 'puzzles/10-memo-children.tsx', Component: P10 },
  { id: '11', title: '11. Очередь обновлений', file: 'puzzles/11-updater-queue.tsx', Component: P11 },
  { id: '12', title: '12. Жизненный цикл функционального компонента', file: 'puzzles/12-lifecycle.tsx', Component: P12 },
  { id: '13', title: '13. sort внутри useMemo', file: 'puzzles/13-memo-sort.tsx', Component: P13 },
  { id: '14', title: '14. key={index} и удаление', file: 'puzzles/14-key-index.tsx', Component: P14 },
  { id: '15', title: '15. Счётчик рендеров в ref', file: 'puzzles/15-ref-render-counter.tsx', Component: P15 },
  { id: '16', title: '16. Объект в value контекста', file: 'puzzles/16-context-object.tsx', Component: P16 },
  { id: '17', title: '17. Функция в useState', file: 'puzzles/17-function-in-state.tsx', Component: P17 },
  { id: '18', title: '18. Порядок cleanup при размонтировании', file: 'puzzles/18-unmount-order.tsx', Component: P18 },
  { id: 'form', title: 'Практика 1. Форма', file: 'practice/01-form.tsx', Component: Form },
  { id: 'slider', title: 'Практика 2. Слайдер', file: 'practice/02-slider.tsx', Component: Slider },
];
