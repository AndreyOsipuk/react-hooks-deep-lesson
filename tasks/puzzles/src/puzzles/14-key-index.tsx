import { useState } from 'react';

// Впишите что-нибудь в поле напротив Paris, затем удалите Amsterdam.
// Напротив какого города окажется ваш текст? Почему?
// Что изменится, если key={city}?
export function Puzzle() {
  const [cities, setCities] = useState(['Amsterdam', 'Paris', 'Cologne']);
  return (
    <ul>
      {cities.map((city, index) => (
        <li key={index}>
          {city} <input placeholder="заметка" />{' '}
          <button type="button" onClick={() => setCities(cities.filter((item) => item !== city))}>
            Удалить {city}
          </button>
        </li>
      ))}
    </ul>
  );
}
