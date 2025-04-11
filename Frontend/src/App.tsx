import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Filters from './components/Filters';
import MediaList from './components/MediaList';
import MediaDetails from './components/MediaDetails';
import FavoritesPage from './components/FavoritesPage'; // Nuevo componente

const handleSearch = async (filters: any) => {
  let url = `/api/moviesFinder?type=${filters.type}&category=${filters.category}&year=${filters.year}&page=${filters.page}`;

  if (filters.genre) {
    url += `&genre=${filters.genre}`;
  }

  if (filters.query) {
    url = `/api/moviesFinder/search?query=${encodeURIComponent(filters.query)}&type=${filters.type}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  setMedia(data.results || data);
  setTotalPages(data.total_pages || 1);
};

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className="app">
          <h1>MoviesFinder</h1>
          <Routes>
            {/* Ruta principal: Lista de medios */}
            <Route
              path="/"
              element={
                <>
                  <Filters />
                  <MediaList />
                </>
              }
            />
            {/* Ruta para detalles de un medio */}
            <Route path="/details/:id" element={<MediaDetails />} />
            {/* Ruta para favoritos */}
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;