import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Filters from './components/Filters';
import MediaList from './components/MediaList';
import MediaDetails from './components/MediaDetails';

function App() {
  const [media, setMedia] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Función para buscar medios
  const handleSearch = async (filters: any) => {
    const response = await fetch(`/api/moviesFinder?type=${filters.type}&category=${filters.category}&year=${filters.year}&page=${filters.page}`);
    const data = await response.json();
    setMedia(data.results);
    setTotalPages(data.total_pages); // Actualiza el total de páginas
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
                <Filters onSearch={handleSearch} />
                <MediaList media={media} totalPages={totalPages} />
              </>
            }
          />
          {/* Ruta para detalles de un medio */}
          <Route path="/details/:id" element={<MediaDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;