import { Route } from './route';
import { DiContainer } from './diContainer';
import { Path, Parameter } from './Path';

export class Decorators {

    constructor(
        private route: Route
    ){}

    public Controller({url, auth = null, cors = null}, target: any) {
        let instance = DiContainer.resolve(target);
        const keys: Path[] = Reflect.getMetadata('paths', instance);
        
        keys.forEach(key => {
            const parameters: Parameter[] = Reflect.getMetadata('params', instance, key.key) || [];
            this.route.route({url, auth, cors}, instance, key.key, parameters.reverse(), key.method, key.path);
        });
    }

    public Get(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Path[] = Reflect.getMetadata('paths', target) || [];
        keys.push({path, method: 'GET', key: propertyKey});

        Reflect.defineMetadata('paths', keys, target);

        return descriptor.value;
    }

    public Post(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Path[] = Reflect.getMetadata('paths', target) || [];
        keys.push({path, method: 'POST', key: propertyKey});

        Reflect.defineMetadata('paths', keys, target);

        return descriptor.value;
    }

    public Put(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Path[] = Reflect.getMetadata('paths', target) || [];
        keys.push({path, method: 'PUT', key: propertyKey});

        Reflect.defineMetadata('paths', keys, target);

        return descriptor.value;
    }

    public Delete(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Path[] = Reflect.getMetadata('paths', target) || [];
        keys.push({path, method: 'DELETE', key: propertyKey});

        Reflect.defineMetadata('paths', keys, target);

        return descriptor.value;
    }

    public Patch(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Path[] = Reflect.getMetadata('paths', target) || [];
        keys.push({path, method: 'PATCH', key: propertyKey});

        Reflect.defineMetadata('paths', keys, target);

        return descriptor.value;
    }

    public Options(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const keys: Path[] = Reflect.getMetadata('paths', target) || [];
        keys.push({path, method: 'OPTIONS', key: propertyKey});

        Reflect.defineMetadata('paths', keys, target);

        return descriptor.value;
    }

    public PathVariable(id: string, target: any, propertyKey: string, parameterIndex: number) {
        const parameters: Parameter[] = Reflect.getMetadata('params', target, propertyKey) || [];
        parameters.push({parameterType: 'PATHVARIABLE', parameterKey: id});
        Reflect.defineMetadata('params', parameters, target, propertyKey);
    }

    public RequestParam(id: string, target: any, propertyKey: string, parameterIndex: number) {
        const parameters: Parameter[] = Reflect.getMetadata('params', target, propertyKey) || [];
        parameters.push({parameterType: 'PARAM', parameterKey: id});
        Reflect.defineMetadata('params', parameters, target, propertyKey);
    }

    public RequestBody(target: any, propertyKey: string, parameterIndex: number) {
        const parameters: Parameter[] = Reflect.getMetadata('params', target, propertyKey) || [];
        parameters.push({parameterType: 'BODY', parameterKey: ''});
        Reflect.defineMetadata('params', parameters, target, propertyKey);
    }
}