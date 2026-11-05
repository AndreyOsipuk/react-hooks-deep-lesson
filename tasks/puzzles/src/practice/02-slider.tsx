import { useState } from 'react';

// Практика 2. Слайдер.
// 1. Кнопки «Назад» и «Вперёд» меняют id на единицу. Минимум - 1, максимум - 100.
// 2. Слайдер сам переключается вперёд каждые `interval` мс (проп). После 100 - снова 1.
// 3. Интервал можно поменять селектом - слайдер должен сразу перейти на новый интервал.
// 4. Пока мышь над слайдом - автопереключение на паузе, когда мышь ушла - продолжается.
// 5. В консоли не должно копиться лишних таймеров: проверьте, переключая интервал и StrictMode.
function Slider({ interval }: { interval: number }) {
  const [id] = useState(1);

  return (
    <div>
      <div
        className="slide"
        style={{ background: `hsl(${(id * 37) % 360} 70% 60%)` }}
        onMouseEnter={() => console.log('enter')}
        onMouseLeave={() => console.log('leave')}
      >
        {id}
      </div>
      <button type="button" onClick={() => console.log('prev')}>
        Назад
      </button>
      <button type="button" onClick={() => console.log('next')}>
        Вперёд
      </button>
      <span> интервал: {interval} мс</span>
    </div>
  );
}

export function Puzzle() {
  const [interval, setIntervalMs] = useState(2000);
  return (
    <>
      <p>
        <select value={interval} onChange={(evt) => setIntervalMs(Number(evt.target.value))}>
          <option value={500}>500 мс</option>
          <option value={1000}>1000 мс</option>
          <option value={2000}>2000 мс</option>
        </select>
      </p>
      <Slider interval={interval} />
    </>
  );
}
