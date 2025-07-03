import express from 'express';
import bodyParser from 'body-parser';
import xagRoutes from './routes/xag.routes';
import { errorHandler } from './middleware/error.middleware';
import cors from 'cors';
import sequelize from './config/database';
import dotenv from 'dotenv';
import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

dotenv.config();

const httpPort: any = process.env.SERVER_PORT || 5000;
const app = express();

// Настройка логгера с ротацией
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Ротация логов по дням
    new DailyRotateFile({
      filename: path.join(__dirname, 'logs', 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d'
    }),
    // Логирование в консоль
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

app.use((req: express.Request, res: express.Response & { _originalEnd?: typeof res.end }, next: express.NextFunction) => {
    const start = Date.now();

    // Сохраняем оригинальный метод
    res._originalEnd = res.end.bind(res);

    // Переопределяем метод end
    res.end = function(
        this: express.Response,
        chunk?: any,
        encodingOrCallback?: BufferEncoding | (() => void),
        callback?: () => void
    ): express.Response {
        // Логируем перед вызовом оригинального метода
        const duration = Date.now() - start;
        
        const logData = {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            body: req.body,
            query: req.query,
            params: req.params,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip || req.connection.remoteAddress
        };
        
        logger.info('HTTP Request', logData);

        // Обрабатываем все варианты вызова
        if (typeof chunk === 'function') {
            return res._originalEnd!(chunk);
        }
        if (typeof encodingOrCallback === 'function') {
            return res._originalEnd!(chunk, encodingOrCallback);
        }
        if (typeof callback === 'function') {
            return res._originalEnd!(chunk, encodingOrCallback as BufferEncoding, callback);
        }
        return res._originalEnd!(chunk, encodingOrCallback as BufferEncoding);
    };

    next();
});

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


// // Error handling
// app.use(errorHandler);

// // Логирование ошибок
// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   logger.error('Error occurred', {
//     error: err.message,
//     stack: err.stack,
//     request: {
//       method: req.method,
//       url: req.originalUrl,
//       headers: req.headers,
//       body: req.body
//     }
//   });
//   next(err);
// });

// Database sync
sequelize.authenticate()
  .then(async () => {
    logger.info('Connection to PostgreSQL has been established successfully.');
    
    app.listen(httpPort, () => {
      logger.info(`Server is running on port ${httpPort}`);
    });

    // Sync models with database
    await sequelize.sync({ alter: true });
    logger.info('Database models synchronized');
  })
  .catch((error) => {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  });

export default app;