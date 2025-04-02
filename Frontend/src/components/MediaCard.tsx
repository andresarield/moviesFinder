import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

interface MediaCardProps {
  id: number;
  title: string;
  releaseDate: string;
  overview: string;
  posterPath: string;
}

const MediaCard = ({ id, title, releaseDate, overview, posterPath }: MediaCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.id === id); // Verifica si es favorito

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite({ id, title, posterPath }); //test
    }
  };

  return (
    <div className="media-card">
      <Link to={`/details/${id}`} className="media-card-link">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="media-poster"
        />
      </Link>
      <h3>{title}</h3>
      <p>Año: {new Date(releaseDate).getFullYear()}</p>
      <p>{overview.slice(0, 100)}...</p>
      {/* Botón de favorito */}
      <button onClick={toggleFavorite}>
        {isFavorite ? '❤️ Favorito' : '🤍 Marcar como Favorito'}
      </button>
    </div>
  );
};

export default MediaCard;