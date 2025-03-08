interface MediaCardProps {
  title: string;
  year: number;
  overview: string;
  posterPath: string;
}

const MediaCard = ({ title, year, overview, posterPath }: MediaCardProps) => {
  return (
    <div className="media-card">
      <img 
        src={`https://image.tmdb.org/t/p/w500${posterPath}`} 
        alt={title}
        className="media-poster"
      />
      <h3>{title}</h3>
      <p>{year}</p>
      <p>{overview}</p>
    </div>
  );
};

export default MediaCard;