import { Response, Request, NextFunction, Express, Router } from 'express';
import { HttpServer } from './httpServer';
import * as express from 'express';
import "reflect-metadata";


export class Decorator {

    constructor(
        private server: Express
    ) {}

    public Controller({url, auth = null, cors = null}, target: Function) {
        const keys: Array<any> = Reflect.getMetadata('restcontroller', target) || [];
        if(keys.length != 0) {
            keys.forEach(key => {
                let meta: {path: string, method: string} = Reflect.getMetadata('restcontroller', target, key); 
                this.route({url, auth, cors}, target, key, meta.method, meta.path);
            });
        }
        
    }

    public Get(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys =  Reflect.getMetadata('restcontroller', target) || [];
        keys.push(propertyKey);

        let meta = {path, method: 'GET'};
        
        Reflect.defineMetadata('restcontroller', meta, target, propertyKey);

        return descriptor.value;
    }

    public Post(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys =  Reflect.getMetadata('restcontroller', target) || [];
        keys.push(propertyKey);

        let meta = {path, method: 'POST'};
        
        Reflect.defineMetadata('restcontroller', meta, target, propertyKey);

        return descriptor.value;
    }

    public Put(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys =  Reflect.getMetadata('restcontroller', target) || [];
        keys.push(propertyKey);

        let meta = {path, method: 'PUT'};
        
        Reflect.defineMetadata('restcontroller', meta, target, propertyKey);

        return descriptor.value;
    }

    public Delete(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys =  Reflect.getMetadata('restcontroller', target) || [];
        keys.push(propertyKey);

        let meta = {path, method: 'DELETE'};
        
        Reflect.defineMetadata('restcontroller', meta, target, propertyKey);

        return descriptor.value;
    }

    private route({url, auth = null, cors = null}, target: any, propertyKey: string, method: string, path: string) {
        let router = express.Router();

        if(cors === null) {
            this.server.use(url, (req: Request, res: Response, next: NextFunction) => {
                res.header('Access-Control-Allow-Origin', cors);
                next();
            });
        }

        this.server.use(url, router);

        if(auth !== null) {
            router.use(auth);
        }

        let instance = new target();

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
        }
    }

    private get(router: Router, path, classIntance, key) {
        router.get(path, (req: Request, res: Response) => {
            classIntance[key](new HttpServer(req, res));
        });
    }

    private post(router: Router, path, classInstance, key) {
        router.post(path, (req: Request, res: Response) => {
            classInstance[key](new HttpServer(req, res));
        });
    }

    private put(router: Router, path, classInstance, key) {
        router.put(path, (req: Request, res: Response) => {
            classInstance[key](new HttpServer(req, res));
        });
    }

    private delete(router: Router, path, classInstance, key) {
        router.delete(path, (req: Request, res: Response) => {
            classInstance[key](new HttpServer(req, res));
        });
    }
}