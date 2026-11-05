// Почините OffersList так, чтобы тесты стали зелёными. Тесты не меняйте.
// «Фиксация» (commit) - момент, когда React применил изменения к DOM.
// Profiler вызывает onRender на каждую фиксацию, и в этот момент DOM уже обновлён.
import { Profiler } from 'react';
import { render } from '@testing-library/react';
import { OffersList } from './offers-list';
import { OFFERS } from './offers';

function renderWithCommits(query: string) {
  const commits: string[] = [];
  const ui = (q: string) => (
    <Profiler
      id="list"
      onRender={() => commits.push(document.querySelector('p')?.textContent ?? '')}
    >
      <OffersList offers={OFFERS} query={q} />
    </Profiler>
  );
  const result = render(ui(query));
  return { commits, rerender: (q: string) => result.rerender(ui(q)) };
}

describe('OffersList', () => {
  it('показывает отфильтрованный список', () => {
    const { commits } = renderWithCommits('apartment');
    expect(commits.at(-1)).toBe('Найдено: 2');
  });

  it('уже первая фиксация показывает правильный результат (нет мигания «Найдено: 0»)', () => {
    const { commits } = renderWithCommits('');
    expect(commits[0]).toBe('Найдено: 5');
  });

  it('смена запроса - ровно одна фиксация, без промежуточного устаревшего списка', () => {
    const { commits, rerender } = renderWithCommits('');
    commits.length = 0;
    rerender('wood');
    expect(commits).toEqual(['Найдено: 1']);
  });
});
