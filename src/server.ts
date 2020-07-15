import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import exampleRoutes from './routes/exampleRoutes';
import errorMiddleware from './middleware/error.middleware';

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
        this.app.use(indexRoutes);
        this.app.use(exampleRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server start on port ', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();

