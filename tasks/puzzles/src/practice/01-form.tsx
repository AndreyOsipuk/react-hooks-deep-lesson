import { useState } from 'react';

// Практика 1. Форма.
// 1. Сделайте оба поля управляемыми: введённое значение показывается под полем.
// 2. В поле name нельзя ввести цифры: они просто не появляются (без сообщения об ошибке).
// 3. Email хранится и показывается в нижнем регистре.
// 4. Кнопка «Отправить» неактивна, пока одно из полей пустое.
// 5. По «Отправить» в консоль выводится { name, email }, поля очищаются. Страница не перезагружается.
export function Puzzle() {
  const [name] = useState('');
  const [email] = useState('');

  return (
    <form>
      <p>
        <label>
          name: <input onChange={(evt) => console.log(evt.target.value)} />
        </label>
      </p>
      <p>name: {name}</p>
      <p>
        <label>
          email: <input onChange={(evt) => console.log(evt.target.value)} />
        </label>
      </p>
      <p>email: {email}</p>
      <button type="submit">Отправить</button>
    </form>
  );
}
