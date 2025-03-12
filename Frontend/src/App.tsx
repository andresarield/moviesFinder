import { useState } from 'react';
import Filters from './components/Filters';
import MediaList from './components/MediaList';
import './App.css';

const App = () => {
  const [media, setMedia] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Estado para el total de páginas

  const handleSearch = async (filters: any) => {
    const response = await fetch(`/api/moviesFinder?type=${filters.type}&category=${filters.category}&year=${filters.year}&page=${filters.page}`);
    const data = await response.json();
    setMedia(data.results);
    setTotalPages(data.total_pages); // Actualiza el total de páginas
  };

  return (
    <div className="app">
      <h1>MoviesFinder</h1>
      <Filters onSearch={handleSearch} />
      <MediaList media={media} />
    </div>
  );
};

export default App;