import { CitySearch } from './city-search';

export function Demo() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>Поиск города</h1>
      <p>Быстро наберите «B», затем «Bu» и посмотрите, что останется в списке.</p>
      <CitySearch />
    </main>
  );
}
