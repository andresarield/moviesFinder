import { useState } from 'react';

interface FiltersProps {
  onSearch: (filters: any) => void;
}

const Filters = ({ onSearch }: FiltersProps) => {
  const [filters, setFilters] = useState({
    type: 'movie',
    category: 'oscar',
    year: '',
    page: 1, // Añadimos el estado de página
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    onSearch({ ...filters, page: newPage }); // Envía la nueva página al backend
  };

  const handleSubmit = () => {
    onSearch(filters);
  };

  return (
    <div className="filters">
      {/* Selectores de tipo, categoría y año */}
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

      <button onClick={handleSubmit}>Buscar</button>

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