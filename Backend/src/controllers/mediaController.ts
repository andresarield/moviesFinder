import { Request, Response } from 'express';
import { fetchGenresFromTMDB } from '../services/apiService';

// Controlador para obtener géneros
export const getGenres = async (req: Request, res: Response) => {
  try {
    const type = req.query.type as 'movie' | 'tv'; // Obtiene el tipo (movie o tv)

    if (!type || !['movie', 'tv'].includes(type)) {
      return res.status(400).json({ error: 'Tipo inválido' });
    }

    const genres = await fetchGenresFromTMDB(type);
    res.status(200).json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};