import { Response, Request, NextFunction, Express, Router } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DiContainer } from './diContainer';

export class Route {

    private paths: Array<{ path: string, method: string, key: string, parameters: Array<{ parameterType: string, parameterKey: string }> }>;

    constructor(
        private server: Express
    ) { }

    public getPaths(): Array<{ path: string, method: string, key: string, parameters: Array<{ parameterType: string, parameterKey: string }> }> {
        return this.paths;
    }

    public setPaths(paths: Array<{ path: string, method: string, key: string, parameters: Array<{ parameterType: string, parameterKey: string }> }>) {
        this.paths = paths;
    }

    public route({ url, auth = null, cors = null }, instance: any, propertyKey: string, parameters: Array<{ parameterType: string, parameterKey: string }>, method: string, path: string) {
        let router = express.Router();

        if (cors !== null) {
            this.server.use(url, (req: Request, res: Response, next: NextFunction) => {
                res.header('Access-Control-Allow-Origin', cors);
                next();
            });
        }

        this.server.use(bodyParser.json());
        this.server.use(url, router);
        if (auth !== null) {
            router.use(auth);
        }

        switch (method) {
            case 'GET':
                this.get(router, path, instance, propertyKey, parameters);
                break;
            case 'POST':
                this.post(router, path, instance, propertyKey, parameters);
                break;
            case 'PUT':
                this.put(router, path, instance, propertyKey, parameters);
                break;
            case 'DELETE':
                this.delete(router, path, instance, propertyKey, parameters);
                break;
            case 'PATCH':
                this.patch(router, path, instance, propertyKey, parameters);
                break;
            case 'OPTIONS':
                this.options(router, path, instance, propertyKey, parameters);
                break;
        }
    }

    private get(router: Router, path, classInstance, key, parameters: Array<{ parameterType: string, parameterKey: string }>) {
        router.get(path, (req: Request, res: Response) => {
            this.determinate(classInstance, key, parameters, req, res);
        });
    }

    private post(router: Router, path, classInstance, key, parameters: Array<{ parameterType: string, parameterKey: string }>) {
        router.post(path, (req: Request, res: Response) => {
            this.determinate(classInstance, key, parameters, req, res);
        });
    }

    private put(router: Router, path, classInstance, key, parameters: Array<{ parameterType: string, parameterKey: string }>) {
        router.put(path, (req: Request, res: Response) => {
            this.determinate(classInstance, key, parameters, req, res);
        });
    }

    private delete(router: Router, path, classInstance, key, parameters: Array<{ parameterType: string, parameterKey: string }>) {
        router.delete(path, (req: Request, res: Response) => {
            this.determinate(classInstance, key, parameters, req, res);
        });
    }

    private patch(router: Router, path, classInstance, key, parameters: Array<{ parameterType: string, parameterKey: string }>) {
        router.patch(path, (req: Request, res: Response) => {
            this.determinate(classInstance, key, parameters, req, res);
        });
    }

    private options(router: Router, path, classInstance, key, parameters: Array<{ parameterType: string, parameterKey: string }>) {
        router.options(path, (req: Request, res: Response) => {
            this.determinate(classInstance, key, parameters, req, res);
        });
    }

    private determinate(classInstance, key, parameters: Array<{ parameterType: string, parameterKey: string }>, req, res) {
        let params = this.prepareParams(classInstance, key, parameters, req);
        const retrn = classInstance[key](...params, res);
        if (!!retrn) {
            if (!!retrn.then) {
                retrn
                    .then((result: any) => {
                        res.json(result);
                    })
                    .catch((err: any) => {
                        res.status(500).send(err);
                    });
            } else {
                res.json(retrn);
            }
        }
    }

    private prepareParams(classInstance, key, parameters: Array<{ parameterType: string, parameterKey: string }>, req) {
        return parameters.map((v, k) => {
            switch (v.parameterType) {
                case 'PARAM':
                    return req.query[v.parameterKey];
                case 'PATHVARIABLE':
                    return req.params[v.parameterKey];
                case 'BODY':
                    const token = Reflect.getMetadata('design:paramtypes', classInstance, key)[k];
                    if (token.name === 'Number' || token.name === 'String' || token.name === 'Bigint' || token.name === 'Boolean') {
                        return req.body;
                    }
                    const instance = DiContainer.resolve(token);
                    return this.mapper(req.body, instance);
            }
        });
    }

    private mapper<T>(from: any, to: T): T {
        Object.keys(from).forEach(fromValue => {
            if (!!from[fromValue]) {
                to[fromValue] = from[fromValue];
            }
        });
        return to;
    }
}