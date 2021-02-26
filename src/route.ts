import { Response, Request, NextFunction, Express } from 'express';
import * as express from 'express';
import { DiContainer } from './diContainer';
import { Parameter } from './Action';
import { Server } from './server';

export class Route {

    private server: Express;

    constructor(
        private instanceServer: Server
    ) {
        this.server = this.instanceServer.getInstanceServer();
    }

    public route({ url, auth = null, cors = null }, instance: any, propertyKey: string, parameters: Parameter[], method: string, path: string) {
        let router = express.Router();

        this.server.use(express.json());
        this.server.use(url, (req: Request, res: Response, next: NextFunction) => {
            if (cors !== null) {
                res.header('Access-Control-Allow-Origin', cors);
            }
            res.header('Access-Control-Allow-Methods', this.instanceServer.getMethods().join(', '));
            res.header('Access-Control-Allow-Headers', this.instanceServer.getHeaders().join(', '));
            next();
        });
        this.server.use(url, router);
        if (auth !== null) {
            router.use(auth);
        }

        router[method](path, (req: Request, res: Response) => {
            this.determinate(instance, propertyKey, parameters, req, res);
        });
    }

    private determinate(classInstance, key, parameters: Parameter[], req, res) {
        let params = parameters.map((v, k) => {
            const token = Reflect.getMetadata('design:paramtypes', classInstance, key)[k];
            return this[v.parameterType](req, token, v.parameterKey);
        });
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
                return !!parameter ? Number(parameter) : null;
            case 'Boolean':
                return !!parameter ? Boolean(JSON.parse(parameter)) : false;
            default:
                return parameter;
        }
    }

    PARAM(req, token: any, parameterKey: string) {
        return this.convertToTypes(req['query'][parameterKey], token.name);
    }

    PATHVARIABLE(req, token: any, parameterKey: string,) {
        return this.convertToTypes(req['params'][parameterKey], token.name);
    }

    BODY(req, token: any) {
        if (token.name === 'Number' || token.name === 'String' || token.name === 'Bigint' || token.name === 'Boolean') {
            return req.body;
        }
        const instance = DiContainer.resolve(token);
        return this.mapper(req.body, instance);
    }
}