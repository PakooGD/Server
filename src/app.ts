import express from 'express';
import bodyParser from 'body-parser';
import xagRoutes from './routes/xag.routes';
import { errorHandler } from './middleware/error.middleware';
import cors from 'cors';
import sequelize from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const httpPort: any = process.env.SERVER_PORT || 5000;
const app = express();

// Настройка логгера с ротацией


// Основные middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://hitech.inc',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', xagRoutes);


// Error handling
app.use(errorHandler);



// Database sync
sequelize.authenticate()
  .then(async () => {

    app.listen(httpPort, () => {

    });

    // Sync models with database
    await sequelize.sync({ alter: true });

  })
  .catch((error) => {

    process.exit(1);
  });

export default app;