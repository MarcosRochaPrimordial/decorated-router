import { Response, Request, NextFunction, Express, Router } from 'express';
import * as express from 'express';

export class Route {

    constructor(
        private server: Express
    ) {}

    public route({url, auth = null, cors = null}, instance: any, propertyKey: string, method: string, path: string) {
        let router = express.Router();

        if(cors !== null) {
            this.server.use(url, (req: Request, res: Response, next: NextFunction) => {
                res.header('Access-Control-Allow-Origin', cors);
                next();
            });
        }

        this.server.use(url, router);

        if(auth !== null) {
            this.server.use(url, auth);
        }

        switch(method) {
            case 'GET':
                this.get(router, path, instance, propertyKey);
                break;
            case 'POST':
                this.post(router, path, instance, propertyKey);
                break;
            case 'PUT':
                this.put(router, path, instance, propertyKey);
                break;
            case 'DELETE':
                this.delete(router, path, instance, propertyKey);
                break;
            case 'PATCH':
                this.patch(router, path, instance, propertyKey);
                break;
            case 'OPTIONS':
                this.options(router, path, instance, propertyKey);
                break;
        }
    }

    private get(router: Router, path, classIntance, key) {
        router.get(path, (req: Request, res: Response) => {
            classIntance[key](req, res);
        });
    }

    private post(router: Router, path, classInstance, key) {
        router.post(path, (req: Request, res: Response) => {
            classInstance[key](req, res);
        });
    }

    private put(router: Router, path, classInstance, key) {
        router.put(path, (req: Request, res: Response) => {
            classInstance[key](req, res);
        });
    }

    private delete(router: Router, path, classInstance, key) {
        router.delete(path, (req: Request, res: Response) => {
            classInstance[key](req, res);
        });
    }

    private patch(router: Router, path, classInstance, key) {
        router.patch(path, (req: Request, res: Response) => {
            classInstance[key](req, res);
        });
    }

    private options(router: Router, path, classInstance, key) {
        router.options(path, (req: Request, res: Response) => {
            classInstance[key](req, res);
        });
    }
}