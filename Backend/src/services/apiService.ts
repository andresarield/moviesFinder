import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = process.env.TMDB_API_URL;

export const fetchMediaFromExternalAPI = async (
  type: string,
  category: string,
  year: string
): Promise<any[]> => {
  try {
    let endpoint = '';
    const params: any = {
      api_key: TMDB_API_KEY,
      language: 'es-ES',
      page: 1,
    };

    // Definir endpoint según categoría
    switch (category) {
      case 'oscar':
        endpoint = `/discover/${type}`;
        params.with_awards = 'oscar_winner';
        break;
      case 'nominee':
        endpoint = `/discover/${type}`;
        params.with_awards = 'oscar_nominee';
        break;
      case 'best-decade':
        endpoint = `/discover/${type}`;
        params.year = 2020; // Ajusta según la década
        params.sort_by = 'vote_average.desc';
        break;
      default:
        endpoint = `/discover/${type}`;
    }

    if (year) params.year = year;

    const response = await axios.get(`${TMDB_API_URL}${endpoint}`, { params });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching TMDB data:', error);
    return [];
  }
};