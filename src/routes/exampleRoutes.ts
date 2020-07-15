import { Router, Request, Response } from "express";


class ExampleRoutes {
    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    health(_req: Request, res: Response){
        res.send({
            status: 200,
            msg: 'UP'
        });
    }

    routes() {
        this.router.get('/health', this.health);
    }
}

const exampleRouter = new ExampleRoutes();
export default exampleRouter.router;
