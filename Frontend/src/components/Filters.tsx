import { useState } from 'react';

interface FiltersProps {
  onSearch: (filters: any) => void;
  genres: { id: number; name: string }[];
}

const Filters = ({ onSearch, genres }: FiltersProps) => {
  const [filters, setFilters] = useState({
    type: 'movie',
    category: 'oscar',
    year: '',
    genre: '',
    query: '',
    page: 1, // Estado para la página actual
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return; // Evita números negativos
    setFilters((prev) => ({ ...prev, page: newPage }));
    onSearch({ ...filters, page: newPage }); // Envía la nueva página al backend
  };

  const handleQuerySearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(filters);
    }
  };

  return (
    <div className="filters">
      <select name="type" value={filters.type} onChange={handleChange}>
        <option value="movie">Películas</option>
        <option value="series">Series</option>
      </select>

      <select name="category" value={filters.category} onChange={handleChange}>
        <option value="oscar">Ganadoras Oscar</option>
        <option value="nominee">Nominadas</option>
        <option value="best-decade">Mejores de la década</option>
      </select>

      <input
        type="number"
        name="year"
        value={filters.year}
        onChange={handleChange}
        placeholder="Año"
      />

      <select name="genre" value={filters.genre} onChange={handleChange}>
        <option value="">Todos los géneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* Campo de búsqueda */}
      <input
        type="text"
        name="query"
        value={filters.query}
        onChange={handleChange}
        onKeyDown={handleQuerySearch}
        placeholder="Buscar por título..."
      />

      <button onClick={handleSearch}>Buscar</button>

      {/* Botones de paginación */}
      <div className="pagination">
        <button onClick={() => handlePageChange(filters.page - 1)} disabled={filters.page === 1}>
          Anterior
        </button>
        <span>Página {filters.page}</span>
        <button onClick={() => handlePageChange(filters.page + 1)}>Siguiente</button>
      </div>
    </div>
  );
};

export default Filters;