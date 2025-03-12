import { Request, Response } from 'express';
import { fetchMediaFromExternalAPI } from '../services/apiService';

export const getMedia = async (req: Request, res: Response) => {
  try {
    const { type = 'movie', category = 'oscar', year, page = 1 } = req.query;

    const media = await fetchMediaFromExternalAPI(
      type as 'movie' | 'tv',
      category as string,
      year as string,
      parseInt(page as string, 10) // Convertir a número
    );

    res.status(200).json(media); // Devuelve toda la respuesta
  } catch (error) {
    res.status(500).json({ error: 'Error fetching media' });
  }
};