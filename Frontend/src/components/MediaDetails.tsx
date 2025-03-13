import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface MediaDetailsProps {
  title: string;
  releaseDate: string;
  overview: string;
  posterPath: string;
  genres: { name: string }[];
}

const MediaDetails = () => {
  const { id } = useParams(); // Obtiene el ID del medio desde la URL
  const [details, setDetails] = useState<MediaDetailsProps | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/api/moviesFinder/details/${id}`); // Llama al backend
        const data = await response.json();
        setDetails(data); // Guarda los detalles en el estado
      } catch (error) {
        console.error('Error fetching media details:', error);
      }
    };
    fetchDetails();
  }, [id]);

  if (!details) return <p>Cargando...</p>;

  return (
    <div className="media-details">
      <img
        src={`https://image.tmdb.org/t/p/w500${details.posterPath}`}
        alt={details.title}
        className="media-poster"
      />
      <div>
        <h2>{details.title}</h2>
        <p>Año: {new Date(details.releaseDate).getFullYear()}</p>
        <p>Géneros: {details.genres.map((genre) => genre.name).join(', ')}</p>
        <p>{details.overview}</p>
      </div>
    </div>
  );
};

export default MediaDetails;