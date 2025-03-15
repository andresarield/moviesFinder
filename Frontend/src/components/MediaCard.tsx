import { Link } from 'react-router-dom';

interface MediaCardProps {
  id: number;
  title: string;
  releaseDate: string;
  overview: string;
  posterPath: string;
}

const MediaCard = ({ id, title, releaseDate, overview, posterPath }: MediaCardProps) => {
  return (
    <Link to={`/details/${id}`} className="media-card-link">
      <div className="media-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="media-poster"
        />
        <h3>{title}</h3>
        <p>Año: {new Date(releaseDate).getFullYear()}</p>
        <p>{overview.slice(0, 100)}...</p> {/* Resumen corto */}
      </div>
    </Link>
  );
};

export default MediaCard;