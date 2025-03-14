import { Request, Response } from 'express';
import { fetchMediaDetails } from '../services/apiService';

// Controlador para obtener detalles
export const getMediaDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtiene el ID del medio
    const type = req.query.type as 'movie' | 'tv'; // Obtiene el tipo (movie o tv)

    if (!type || !['movie', 'tv'].includes(type)) {
      return res.status(400).json({ error: 'Tipo inválido' });
    }

    const details = await fetchMediaDetails(type, parseInt(id, 10)); // Llama al servicio
    res.status(200).json(details); // Devuelve los detalles
  } catch (error) {
    console.error('Error fetching media details:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};