import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface MediaDetailsProps {
  title: string;
  releaseDate: string;
  overview: string;
  posterPath: string;
  genres: { name: string }[];
  cast: { name: string; character: string; profile_path: string }[];
  crew: { name: string; job: string }[];
  watchProviders: Record<string, any>;
}

const MediaDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<MediaDetailsProps | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/api/moviesFinder/details/${id}`);
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching media details:', error);
      }
    };
    fetchDetails();
  }, [id]);

  if (!details) return <p>Cargando...</p>;

  return (
    <div className="media-details p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${details.posterPath}`}
          alt={details.title}
          className="w-full md:w-1/3 rounded-lg shadow-md"
        />
        {/* Detalles */}
        <div>
          <h2 className="text-2xl font-bold">{details.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Año: {new Date(details.releaseDate).getFullYear()}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Géneros: {details.genres.map((genre) => genre.name).join(', ')}
          </p>
          <p className="mt-4">{details.overview}</p>

          {/* Plataformas de Streaming */}
          {Object.keys(details.watchProviders).length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Disponible en:</h3>
              <ul className="flex flex-wrap gap-2">
                {Object.entries(details.watchProviders).map(([key, provider]: [string, any]) => (
                  <li key={key} className="bg-blue-500 text-white px-2 py-1 rounded">
                    {provider.provider_name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Elenco */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Elenco Principal</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {details.cast.map((actor) => (
            <div key={actor.name} className="text-center">
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-32 object-cover rounded-lg shadow-md"
              />
              <p className="mt-2 font-semibold">{actor.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Equipo */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Equipo Técnico</h3>
        <ul className="space-y-2">
          {details.crew.map((member) => (
            <li key={member.name} className="flex justify-between">
              <span>{member.name}</span>
              <span className="text-gray-600 dark:text-gray-400">{member.job}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MediaDetails;