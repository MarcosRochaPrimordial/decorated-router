import { Response, Request, NextFunction, Express, Router } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DiContainer } from './diContainer';
import { Path, Parameter } from './Path';

export class Route {

    constructor(
        private server: Express
    ) { }

    public route({ url, auth = null, cors = null }, instance: any, propertyKey: string, parameters: Parameter[], method: string, path: string) {
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

    private get(router: Router, path, classInstance, key, parameters: Parameter[]) {
        router.get(path, (req: Request, res: Response) => {
            this.determinate(classInstance, key, parameters, req, res);
        });
    }

    private post(router: Router, path, classInstance, key, parameters: Parameter[]) {
        router.post(path, (req: Request, res: Response) => {
            this.determinate(classInstance, key, parameters, req, res);
        });
    }

    private put(router: Router, path, classInstance, key, parameters: Parameter[]) {
        router.put(path, (req: Request, res: Response) => {
            this.determinate(classInstance, key, parameters, req, res);
        });
    }

    private delete(router: Router, path, classInstance, key, parameters: Parameter[]) {
        router.delete(path, (req: Request, res: Response) => {
            this.determinate(classInstance, key, parameters, req, res);
        });
    }

    private patch(router: Router, path, classInstance, key, parameters: Parameter[]) {
        router.patch(path, (req: Request, res: Response) => {
            this.determinate(classInstance, key, parameters, req, res);
        });
    }

    private options(router: Router, path, classInstance, key, parameters: Parameter[]) {
        router.options(path, (req: Request, res: Response) => {
            this.determinate(classInstance, key, parameters, req, res);
        });
    }

    private determinate(classInstance, key, parameters: Parameter[], req, res) {
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

    private prepareParams(classInstance, key, parameters: Parameter[], req) {
        return parameters.map((v, k) => {
            const token = Reflect.getMetadata('design:paramtypes', classInstance, key)[k];
            switch (v.parameterType) {
                case 'PARAM':
                    return this.convertToTypes(req.query[v.parameterKey], token.name);
                case 'PATHVARIABLE':
                    return this.convertToTypes(req.params[v.parameterKey], token.name);
                case 'BODY':
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

    private convertToTypes(parameter: string, type: string) {
        switch (type) {
            case 'Number':
                return Number(parameter);
            case 'Boolean':
                return Boolean(JSON.parse(parameter));
            default:
                return parameter;
        }
    }
}