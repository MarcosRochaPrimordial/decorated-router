import { Route } from './route';
import { DiContainer } from './diContainer';

export class Decorators {

    constructor(
        private route: Route
    ){}

    public Controller({url, auth = null, cors = null}, target: any) {
        const keys: Array<{path: string, method: string, key: string, parameters: Array<{parameterType: string, parameterKey: string}>}> = this.route.getPaths() || [];
        let instance = DiContainer.resolve(target);
        
        keys.forEach(key => {
            key.parameters.splice(1, 1);
            this.route.route({url, auth, cors}, instance, key.key, key.parameters, key.method, key.path);
        });

        this.route.setPaths([]);
    }

    public Get(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Array<{path: string, method: string, key: string, parameters: Array<{parameterType: string, parameterKey: string}>}> = this.route.getPaths() || [];
        const parameters: Array<{parameterType: string, parameterKey: string}> = Reflect.getMetadata('params', target, propertyKey) || [];
        keys.push({path, method: 'GET', key: propertyKey, parameters});

        this.route.setPaths(keys);

        return descriptor.value;
    }

    public Post(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Array<{path: string, method: string, key: string, parameters: Array<{parameterType: string, parameterKey: string}>}> = this.route.getPaths() || [];
        const parameters: Array<{parameterType: string, parameterKey: string}> = Reflect.getMetadata('params', target, propertyKey) || [];
        keys.push({path, method: 'POST', key: propertyKey, parameters});

        this.route.setPaths(keys);

        return descriptor.value;
    }

    public Put(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Array<{path: string, method: string, key: string, parameters: Array<{parameterType: string, parameterKey: string}>}> = this.route.getPaths() || [];
        const parameters: Array<{parameterType: string, parameterKey: string}> = Reflect.getMetadata('params', target, propertyKey) || [];
        keys.push({path, method: 'PUT', key: propertyKey, parameters});

        this.route.setPaths(keys);

        return descriptor.value;
    }

    public Delete(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Array<{path: string, method: string, key: string, parameters: Array<{parameterType: string, parameterKey: string}>}> = this.route.getPaths() || [];
        const parameters: Array<{parameterType: string, parameterKey: string}> = Reflect.getMetadata('params', target, propertyKey) || [];
        keys.push({path, method: 'DELETE', key: propertyKey, parameters});

        this.route.setPaths(keys);

        return descriptor.value;
    }

    public Patch(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Array<{path: string, method: string, key: string, parameters: Array<{parameterType: string, parameterKey: string}>}> = this.route.getPaths() || [];
        const parameters: Array<{parameterType: string, parameterKey: string}> = Reflect.getMetadata('params', target, propertyKey) || [];
        keys.push({path, method: 'PATCH', key: propertyKey, parameters});

        this.route.setPaths(keys);

        return descriptor.value;
    }

    public Options(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Array<{path: string, method: string, key: string, parameters: Array<{parameterType: string, parameterKey: string}>}> = this.route.getPaths() || [];
        const parameters: Array<{parameterType: string, parameterKey: string}> = Reflect.getMetadata('params', target, propertyKey) || [];
        keys.push({path, method: 'OPTIONS', key: propertyKey, parameters});

        this.route.setPaths(keys);

        return descriptor.value;
    }

    public PathVariable(id: string, target: any, propertyKey: string, parameterIndex: number) {
        const parameters: Array<{parameterType: string, parameterKey: string}> = Reflect.getMetadata('params', target, propertyKey) || ['value'];
        parameters.splice(parameterIndex, 0, {parameterType: 'PATHVARIABLE', parameterKey: id});
        Reflect.defineMetadata('params', parameters, target, propertyKey);
    }

    public RequestParam(id: string, target: any, propertyKey: string, parameterIndex: number) {
        const parameters: Array<{parameterType: string, parameterKey: string}> = Reflect.getMetadata('params', target, propertyKey) || ['value'];
        parameters.splice(parameterIndex, 0, {parameterType: 'PARAM', parameterKey: id});
        Reflect.defineMetadata('params', parameters, target, propertyKey);
    }

    public RequestBody(target: any, propertyKey: string, parameterIndex: number) {
        const parameters: Array<{parameterType: string, parameterKey: string}> = Reflect.getMetadata('params', target, propertyKey) || ['value'];
        parameters.splice(parameterIndex, 0, {parameterType: 'BODY', parameterKey: ''});
        Reflect.defineMetadata('params', parameters, target, propertyKey);
    }
}