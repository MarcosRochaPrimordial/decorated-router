import { Paths } from './paths';
import { Route } from './route';
import { DiContainer } from './diContainer';

export class Decorators {

    constructor(
        private route: Route
    ){}

    public Controller({url, auth = null, cors = null}, target: any) {
        const keys: Array<{path: string, method: string, key: string}> = Paths.getInstance().getObjects() || [];
        let instance = DiContainer.resolve(target);
        
        keys.forEach(key => { 
            this.route.route({url, auth, cors}, instance, key.key, key.method, key.path);
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
}