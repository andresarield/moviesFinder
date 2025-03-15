import { Router } from 'express';
import { getMedia, getMediaDetails, getGenres } from '../controllers/mediaController';

export const mediaRouter = Router();

mediaRouter.get('/', getMedia); // Lista de medios
mediaRouter.get('/details/:id', getMediaDetails); // Detalles de un medio
mediaRouter.get('/genres', getGenres); // Lista de géneros