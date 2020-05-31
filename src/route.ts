import { Response, Request, NextFunction, Express, Router } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DiContainer } from './diContainer';
import { Parameter } from './Action';

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
                return Number(parameter);
            case 'Boolean':
                return Boolean(JSON.parse(parameter));
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