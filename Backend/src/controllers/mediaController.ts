import { Request, Response } from 'express';
import { searchMediaFromTMDB } from '../services/apiService';

// Controlador para búsquedas
export const searchMedia = async (req: Request, res: Response) => {
  try {
    const { query, type } = req.query;

    if (!query || !type || !['movie', 'tv'].includes(type as string)) {
      return res.status(400).json({ error: 'Consulta inválida' });
    }

    const results = await searchMediaFromTMDB(query as string, type as 'movie' | 'tv');
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};