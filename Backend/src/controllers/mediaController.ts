import { Request, Response } from 'express';
import { fetchMediaFromExternalAPI } from '../services/apiService';

export const getMedia = async (req: Request, res: Response) => {
  try {
    const { type, category, year } = req.query;

    // Llamar al servicio que consume una API externa
    const media = await fetchMediaFromExternalAPI(type as string, category as string, year as string);

    res.status(200).json({ results: media });
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};