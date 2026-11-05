// Почините CitySearch так, чтобы тесты стали зелёными. Тесты не меняйте.
import { StrictMode } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { CitySearch } from './city-search';

// «Сервер», которым управляет тест: сам решает, какой запрос и когда ответит.
function createControlledSearch() {
  const requests: {
    query: string;
    signal?: AbortSignal;
    resolve: (cities: string[]) => void;
    reject: (error: unknown) => void;
  }[] = [];
  const search = vi.fn((query: string, signal?: AbortSignal) =>
    new Promise<string[]>((resolve, reject) => {
      requests.push({ query, signal, resolve, reject });
      signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    }),
  );
  const last = (query: string) => requests.filter((r) => r.query === query).at(-1)!;
  return { search, requests, last };
}

const type = (value: string) => fireEvent.change(screen.getByLabelText('Город'), { target: { value } });
const shownCities = () => screen.queryAllByRole('listitem').map((li) => li.textContent);

describe('CitySearch', () => {
  it('ответ на старый запрос, пришедший позже, не затирает новый результат', async () => {
    const { search, last } = createControlledSearch();
    render(<CitySearch search={search} />);

    type('B');
    type('Bu');
    await act(async () => last('Bu').resolve(['Budapest']));
    await act(async () => last('B').resolve(['Barcelona', 'Berlin', 'Brussels', 'Budapest']));

    expect(shownCities()).toEqual(['Budapest']);
  });

  it('работает в StrictMode (как в main.tsx)', async () => {
    const { search, last } = createControlledSearch();
    render(
      <StrictMode>
        <CitySearch search={search} />
      </StrictMode>,
    );

    type('Ro');
    await act(async () => last('Ro').resolve(['Rome']));

    expect(shownCities()).toEqual(['Rome']);
  });

  it('устаревший запрос отменяется через AbortSignal, а не просто игнорируется', () => {
    const { search, requests } = createControlledSearch();
    render(<CitySearch search={search} />);

    type('B');
    type('Be');

    expect(requests[0].signal?.aborted).toBe(true);
  });

  it('запрос отменяется при размонтировании', () => {
    const { search, requests } = createControlledSearch();
    const { unmount } = render(<CitySearch search={search} />);

    type('Pa');
    unmount();

    expect(requests[0].signal?.aborted).toBe(true);
  });

  it('отмена - не ошибка: статус не становится error', async () => {
    const { search, last } = createControlledSearch();
    render(<CitySearch search={search} />);

    type('M');
    type('Mi');
    await act(async () => last('Mi').resolve(['Milan']));

    expect(screen.getByTestId('status').textContent).toBe('success');
    expect(screen.queryByText('Не удалось загрузить')).toBeNull();
  });

  it('настоящая ошибка сети показывается', async () => {
    const { search, last } = createControlledSearch();
    render(<CitySearch search={search} />);

    type('X');
    await act(async () => last('X').reject(new Error('Network Error')));

    expect(screen.getByTestId('status').textContent).toBe('error');
  });
});
