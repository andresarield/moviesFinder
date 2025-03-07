interface MediaCardProps {
    title: string;
    year: number;
    category: string;
  }
  
  const MediaCard = ({ title, year, category }: MediaCardProps) => {
    return (
      <div className="media-card">
        <h3>{title}</h3>
        <p>{year}</p>
        <p>{category}</p>
      </div>
    );
  };
  
  export default MediaCard;