import { useState } from 'react';

interface FiltersProps {
  onSearch: (filters: any) => void;
  genres: { id: number; name: string }[]; // Lista de géneros
}

const Filters = ({ onSearch, genres }: FiltersProps) => {
  const [filters, setFilters] = useState({
    type: 'movie',
    category: 'oscar',
    year: '',
    genre: '', // Nuevo estado para el género
    page: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSearch(filters);
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

      <button onClick={handleSubmit}>Buscar</button>
    </div>
  );
};

export default Filters;