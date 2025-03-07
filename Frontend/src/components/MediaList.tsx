import MediaCard from './MediaCard';

interface MediaListProps {
  media: any[];
}

const MediaList = ({ media }: MediaListProps) => {
  return (
    <div className="media-list">
      {media.length > 0 ? (
        media.map((item, index) => (
          <MediaCard key={index} title={item.title} year={item.year} category={item.category} />
        ))
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default MediaList;