import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Filters from './components/Filters';
import MediaList from './components/MediaList';
import MediaDetails from './components/MediaDetails';
import FavoritesPage from './components/FavoritesPage';
import TrendingSection from './components/TrendingSection'; // Nuevo componente

function App() {
  const [media, setMedia] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch('/api/moviesFinder/genres?type=movie'); // Cambia a 'tv' si es necesario
      const data = await response.json();
      setGenres(data);
    };
    fetchGenres();
  }, []);

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

  return (
    <BrowserRouter>
      <div className="app">
        <h1>MoviesFinder</h1>
        <Routes>
          {/* Ruta principal: Lista de medios */}
          <Route
            path="/"
            element={
              <>
                <TrendingSection /> {/* Sección de contenido popular */}
                <Filters onSearch={handleSearch} genres={genres} />
                <MediaList media={media} totalPages={totalPages} />
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
  );
}

export default App;