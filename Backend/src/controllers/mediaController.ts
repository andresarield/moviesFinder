import { Request, Response } from 'express';
import { fetchMediaFromExternalAPI } from '../services/apiService';

export const getMedia = async (req: Request, res: Response) => {
  try {
    const { type = 'movie', category = 'oscar', year } = req.query;
    
    const media = await fetchMediaFromExternalAPI(
      type as string,
      category as string,
      year as string
    );

    res.status(200).json({ results: media });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching media' });
  }
};