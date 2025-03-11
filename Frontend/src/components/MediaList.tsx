import MediaCard from './MediaCard';

interface MediaListProps {
  media: {
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
  }[];
}

const MediaList = ({ media }: MediaListProps) => {
  if (media.length === 0) return <p>No hay resultados.</p>;

  return (
    <div className="media-grid">
      {media.map((item, index) => (
        <MediaCard
          key={index}
          title={item.title}
          releaseDate={item.release_date}
          overview={item.overview}
          posterPath={item.poster_path}
        />
      ))}
    </div>
  );
};

export default MediaList;