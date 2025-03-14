import { Router } from 'express';
import { getMedia, getMediaDetails } from '../controllers/mediaController';

export const mediaRouter = Router();

mediaRouter.get('/', getMedia); // Endpoint para la lista de medios
mediaRouter.get('/details/:id', getMediaDetails); // Endpoint para detalles