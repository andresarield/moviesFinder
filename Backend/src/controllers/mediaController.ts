import { Request, Response } from 'express';
import { fetchTrendingMediaFromTMDB } from '../services/apiService';

// Controlador para obtener contenido popular
export const getTrendingMedia = async (req: Request, res: Response) => {
  try {
    const type = req.query.type as 'movie' | 'tv'; // Tipo: movie o tv
    const timeWindow = req.query.timeWindow as 'day' | 'week'; // Ventana: día o semana

    if (!type || !['movie', 'tv'].includes(type)) {
      return res.status(400).json({ error: 'Tipo inválido' });
    }

    const results = await fetchTrendingMediaFromTMDB(type, timeWindow || 'day');
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching trending media:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};