import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import MediaCard from './MediaCard';

const FavoritesPage = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <div className="favorites-page">
            <h2>Mis Favoritos</h2>
            {favorites.length > 0 ? (
                <div className="media-grid">
                    {favorites.map((fav) => (
                        <MediaCard
                            key={fav.id}
                            id={fav.id}
                            title={fav.title}
                            releaseDate="N/A"
                            overview="Este es un favorito."
                            posterPath={fav.posterPath}
                        />
                    ))}
                </div>
            ) : (
                <p>No tienes favoritos.</p>
            )}
        </div>
    );
};

export default FavoritesPage;