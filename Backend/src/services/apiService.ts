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