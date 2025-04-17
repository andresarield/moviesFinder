import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContex';
import Filters from './components/Filters';
import MediaList from './components/MediaList';
import MediaDetails from './components/MediaDetails';
import FavoritesPage from './components/FavoritesPage';
import TrendingSection from './components/TrendingSection';

function App() {
  const [media, setMedia] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Estado para el total de páginas
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
      url = `/api/moviesFinder/search?query=${encodeURIComponent(filters.query)}&type=${filters.type}&page=${filters.page}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setMedia(data.results || data);
    setTotalPages(data.total_pages || 1); // Actualiza el total de páginas
  };
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import { ThemeProvider } from './context/ThemeContext';
  import Header from './components/Header'; // Nuevo componente
  import Filters from './components/Filters';
  import MediaList from './components/MediaList';
  import MediaDetails from './components/MediaDetails';
  import FavoritesPage from './components/FavoritesPage';
  import TrendingSection from './components/TrendingSection';

  function App() {
    return (
      <ThemeProvider>
        <BrowserRouter>
          <div className="app min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
            <div className="container mx-auto p-4">
              <Header /> {/* Usa el componente Header */}
              <Routes>
                {/* Rutas */}
                <Route
                  path="/"
                  element={
                    <>
                      <TrendingSection />
                      <Filters />
                      <MediaList />
                    </>
                  }
                />
                <Route path="/details/:id" element={<MediaDetails />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  export default App;

  //   return (
  //     <BrowserRouter>
  //       <div className="app">
  //         <h1>MoviesFinder</h1>
  //         <Routes>
  //           {/* Ruta principal: Lista de medios */}
  //           <Route
  //             path="/"
  //             element={
  //               <>
  //                 <TrendingSection />
  //                 <Filters onSearch={handleSearch} genres={genres} />
  //                 <MediaList media={media} totalPages={totalPages} />
  //               </>
  //             }
  //           />
  //           {/* Ruta para detalles de un medio */}
  //           <Route path="/details/:id" element={<MediaDetails />} />
  //           {/* Ruta para favoritos */}
  //           <Route path="/favorites" element={<FavoritesPage />} />
  //         </Routes>
  //       </div>
  //     </BrowserRouter>
  //   );
  // }

  export default App;