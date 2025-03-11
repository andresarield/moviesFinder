interface MediaCardProps {
  title: string;
  releaseDate: string;
  overview: string;
  posterPath: string;
}

const MediaCard = ({ title, releaseDate, overview, posterPath }: MediaCardProps) => {
  return (
    <div className="media-card">
      <img 
        src={`https://image.tmdb.org/t/p/w500${posterPath}`} 
        alt={title}
        className="media-poster"
      />
      <h3>{title}</h3>
      <p>Año: {new Date(releaseDate).getFullYear()}</p>
      <p>{overview}</p>
    </div>
  );
};

export default MediaCard;