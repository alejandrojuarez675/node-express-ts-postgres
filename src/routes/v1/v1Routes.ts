import { Router } from 'express';

import indexRoutes from './indexRoutes';
import exampleRoutes from './exampleRoutes';

class V1Routes {
    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.use(indexRoutes);
        this.router.use(exampleRoutes);
    }
}

const v1Routes = new V1Routes();
v1Routes.routes();

export default v1Routes.router;