import { Response, Request, NextFunction, Express, Router } from 'express';
import { Paths } from './paths';
import * as express from 'express';


export class Decorator {

    constructor(
        private server: Express
    ) {}

    public Controller({url, auth = null, cors = null}, target: Function) {
        const keys: Array<{path: string, method: string, key: string}> = Paths.getInstance().getObjects() || [];
        keys.forEach(key => { 
            this.route({url, auth, cors}, target, key.key, key.method, key.path);
        });

        Paths.getInstance().renewObjects();        
    }

    public Get(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Array<{path: string, method: string, key: string}> = Paths.getInstance().getObjects() || [];
        keys.push({path, method: 'GET', key: propertyKey});

        Paths.getInstance().setObjects(keys);

        return descriptor.value;
    }

    public Post(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Array<{path: string, method: string, key: string}> = Paths.getInstance().getObjects() || [];
        keys.push({path, method: 'POST', key: propertyKey});

        Paths.getInstance().setObjects(keys);

        return descriptor.value;
    }

    public Put(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Array<{path: string, method: string, key: string}> = Paths.getInstance().getObjects() || [];
        keys.push({path, method: 'PUT', key: propertyKey});

        Paths.getInstance().setObjects(keys);

        return descriptor.value;
    }

    public Delete(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Array<{path: string, method: string, key: string}> = Paths.getInstance().getObjects() || [];
        keys.push({path, method: 'DELETE', key: propertyKey});

        Paths.getInstance().setObjects(keys);

        return descriptor.value;
    }

    public Patch(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Array<{path: string, method: string, key: string}> = Paths.getInstance().getObjects() || [];
        keys.push({path, method: 'PATCH', key: propertyKey});

        Paths.getInstance().setObjects(keys);

        return descriptor.value;
    }

    public Options(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Array<{path: string, method: string, key: string}> = Paths.getInstance().getObjects() || [];
        keys.push({path, method: 'OPTIONS', key: propertyKey});

        Paths.getInstance().setObjects(keys);

        return descriptor.value;
    }

    private route({url, auth = null, cors = null}, target: any, propertyKey: string, method: string, path: string) {
        let router = express.Router();

        if(cors !== null) {
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