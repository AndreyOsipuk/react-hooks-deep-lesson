// 1. Сделайте зелёными готовые тесты (их не меняйте).
// 2. Найдите ещё минимум два бага. На каждый: СНАЧАЛА тест, который падает на исходном коде
//    (замените it.todo на it), потом исправление. Проверьте, что тест действительно был красным.
import { act, renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './use-fetch';

type Pending = {
  url: string;
  init?: RequestInit;
  respond: (status: number, body: unknown) => void;
  fail: (error: Error) => void;
};

// Подменяем глобальный fetch: тест сам решает, какой запрос и когда ответит.
function mockFetch() {
  const pending: Pending[] = [];
  const fetchMock = vi.fn(
    (url: string, init?: RequestInit) =>
      new Promise<Response>((resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
        pending.push({
          url,
          init,
          respond: (status, body) =>
            resolve({ ok: status >= 200 && status < 300, status, json: async () => body } as Response),
          // Сетевая ошибка: так fetch ведёт себя, когда сервер недоступен.
          fail: (error) => reject(error),
        });
      }),
  );
  vi.stubGlobal('fetch', fetchMock);
  const last = (url: string) => pending.filter((p) => p.url === url).at(-1)!;
  return { fetchMock, pending, last };
}

afterEach(() => vi.unstubAllGlobals());

describe('useFetch', () => {
  it('загружает данные', async () => {
    const { last } = mockFetch();
    const { result } = renderHook(() => useFetch<string[]>('/offers'));
    await act(async () => last('/offers').respond(200, ['a', 'b']));
    expect(result.current).toEqual({ data: ['a', 'b'], error: null, isLoading: false });
  });

  it('без options делает ровно один запрос (а не бесконечно)', async () => {
    const { fetchMock, pending } = mockFetch();
    renderHook(() => useFetch('/offers'));
    for (let i = 0; i < 5; i++) {
      await act(async () => pending.at(-1)?.respond(200, []));
    }
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('ответ на старый url, пришедший позже, не затирает новый', async () => {
    const { last } = mockFetch();
    const { result, rerender } = renderHook(({ url }) => useFetch<string>(url), {
      initialProps: { url: '/offers/1' },
    });
    rerender({ url: '/offers/2' });
    await act(async () => last('/offers/2').respond(200, 'второе'));
    await act(async () => last('/offers/1').respond(200, 'первое'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toBe('второе');
  });

  it('при размонтировании запрос отменяется', () => {
    const { pending } = mockFetch();
    const { unmount } = renderHook(() => useFetch('/offers'));
    unmount();
    expect(pending[0].init?.signal?.aborted).toBe(true);
  });

  it.todo('баг 3: ...');

  it.todo('баг 4: ...');
});
