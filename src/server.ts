import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import v1Routes from './routes/v1/v1Routes';
import errorMiddleware from './middleware/error.middleware';
import HttpException from './exceptions/httpException';

class Server {

    app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        // settings
        this.app.set('port', process.env.PORT || 3000);
        this.initializeMiddlewares();
    }
    
    initializeMiddlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(errorMiddleware);
    }

    routes() {
        this.app.use('/api/v1', v1Routes);
        this.app.get('*', (_req, _res) => {
            throw new HttpException(404, 'Latest Api in /api/v1')
        });
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server start on port ', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();

