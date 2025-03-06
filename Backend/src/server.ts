import express from 'express';
import cors from 'cors';
import { mediaRouter } from './routes/mediaRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/moviesFinder', mediaRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`MoviesFinder API running on port ${PORT}`);
});