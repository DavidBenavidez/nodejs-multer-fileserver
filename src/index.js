import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';
import {} from 'dotenv/config';

import connectToDatabase from './config/connection';
import { jsonResponse } from './middlewares'
import routes from './routes';

const app = express();

// default headers, bodyparser, and logger
app.use(helmet());
app.use(express.json());
app.use(logger('dev'));
app.use(jsonResponse);

/**
 * The code below is for the app to allow cors temporarily for localhost requests.
 * For real development usecases, use: `app.use(cors());`
 */
app.use('*', cors());

// Initialize Routes
app.use(routes);

export const initialize = async () => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.log('Error in connecting to database', error);
    throw new Error(error);
  }

  const { PORT } = process.env;
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

initialize();