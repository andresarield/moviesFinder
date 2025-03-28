import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY!;
const TMDB_API_URL = process.env.TMDB_API_URL!;

// Función para obtener detalles de un medio
export const fetchMediaDetails = async (type: 'movie' | 'tv', id: number) => {
  try {
    const endpoint = `/${type}/${id}`;
    const params = { api_key: TMDB_API_KEY, language: 'es-ES' };

    const response = await axios.get(`${TMDB_API_URL}${endpoint}`, { params });
    return response.data; // Devuelve los detalles del medio
  } catch (error) {
    console.error('Error fetching media details:', error);
    return null;
  }
};

export const fetchGenresFromTMDB = async (type: 'movie' | 'tv') => {
  try {
    const endpoint = `/genre/${type}/list`;
    const params = { api_key: TMDB_API_KEY, language: 'es-ES' };

    const response = await axios.get(`${TMDB_API_URL}${endpoint}`, { params });
    return response.data.genres; // Devuelve la lista de géneros
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

export const fetchMediaFromExternalAPI = async (
  type: 'movie' | 'tv',
  category: string,
  year?: string,
  genre?: string, // Nuevo parámetro para el género
  page: number = 1
): Promise<any[]> => {
  try {
    let endpoint = '';
    const params: Record<string, any> = {
      api_key: TMDB_API_KEY,
      language: 'es-ES',
      page,
    };

    switch (category) {
      case 'oscar':
        params.with_awards = 'oscar_winner';
        break;
      case 'nominee':
        params.with_awards = 'oscar_nominee';
        break;
      case 'best-decade':
        params.year = 2020;
        params.sort_by = 'vote_average.desc';
        break;
      default:
        break;
    }

    if (year) params.year = year;
    if (genre) params.with_genres = genre; // Aplica el filtro de género

    endpoint = `/discover/${type}`;
    const response = await axios.get(`${TMDB_API_URL}${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching TMDB:', error);
    return { results: [], total_pages: 1, page: 1 };
  }
};