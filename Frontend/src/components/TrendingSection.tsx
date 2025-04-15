import { useEffect, useState } from 'react';

interface Media {
    id: number;
    title: string;
    name?: string; // Para series
    poster_path: string;
}

const TrendingSection = () => {
    const [trending, setTrending] = useState<Media[]>([]);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await fetch('/api/moviesFinder/trending?type=movie&timeWindow=day'); // Cambia a 'tv' si es necesario
                const data = await response.json();
                setTrending(data);
            } catch (error) {
                console.error('Error fetching trending media:', error);
            }
        };
        fetchTrending();
    }, []);

    return (
        <div className="trending-section">
            <h2>Populares Hoy</h2>
            <div className="media-grid">
                {trending.map((item) => (
                    <div key={item.id} className="media-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt={item.title || item.name}
                            className="media-poster"
                        />
                        <h3>{item.title || item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingSection;