import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY!;
const TMDB_API_URL = process.env.TMDB_API_URL!;

export const fetchMediaFromExternalAPI = async (
  type: 'movie' | 'tv',
  category: string,
  year?: string
): Promise<any[]> => {
  try {
    let endpoint = '';
    const params: Record<string, any> = {
      api_key: TMDB_API_KEY,
      language: 'es-ES',
    };

    switch (category) {
      case 'oscar':
        params.with_awards = 'oscar_winner';
        break;
      case 'nominee':
        params.with_awards = 'oscar_nominee';
        break;
      case 'best-decade':
        params.year = 2020; // Ajusta según tu década
        params.sort_by = 'vote_average.desc';
        break;
      default:
        break;
    }

    if (year) params.year = year;

    // Endpoint dinámico para películas o series
    endpoint = `/discover/${type}`;
    
    const response = await axios.get(`${TMDB_API_URL}${endpoint}`, { params });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching TMDB:', error);
    return [];
  }
};