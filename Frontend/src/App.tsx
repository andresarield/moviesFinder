import { useState } from 'react';
import Filters from './components/Filters';
import MediaList from './components/MediaList';
import './App.css';

function App() {
  const [media, setMedia] = useState([]);

  const handleSearch = async (filters: any) => {
    const response = await fetch(`/api/moviesFinder?type=${filters.type}&category=${filters.category}&year=${filters.year}`);
    const data = await response.json();
    setMedia(data.results);
  };

  return (
    <div className="app">
      <h1>MoviesFinder</h1>
      <Filters onSearch={handleSearch} />
      <MediaList media={media} />
    </div>
  );
}

export default App;