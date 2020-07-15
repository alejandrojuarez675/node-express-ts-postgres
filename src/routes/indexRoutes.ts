import { Router } from 'express';

class IndexRoutes {
    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', (_req, res) => res.send('Hello world'));
    }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;