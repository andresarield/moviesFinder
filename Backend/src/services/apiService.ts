import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY!;
const TMDB_API_URL = process.env.TMDB_API_URL!;

export const fetchMediaFromExternalAPI = async (
  type: 'movie' | 'tv',
  category: string,
  year?: string,
  page: number = 1 // Añadimos el parámetro page
): Promise<any[]> => {
  try {
    let endpoint = '';
    const params: Record<string, any> = {
      api_key: TMDB_API_KEY,
      language: 'es-ES',
      page, // Pasamos el número de página
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

    // if (startYear && endYear) {
    //   params.primary_release_date_gte = `${startYear}-01-01`;
    //   params.primary_release_date_lte = `${endYear}-12-31`;
    // }

    endpoint = `/discover/${type}`;
    const response = await axios.get(`${TMDB_API_URL}${endpoint}`, { params });
    return response.data; // Devuelve toda la respuesta (incluye info de paginación)
  } catch (error) {
    console.error('Error fetching TMDB:', error);
    return { results: [], total_pages: 1, page: 1 }; // Respuesta por defecto
  }
};