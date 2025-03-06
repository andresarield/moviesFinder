import { Router } from 'express';
import { getMedia } from '../controllers/mediaController';

export const mediaRouter = Router();

mediaRouter.get('/', getMedia);