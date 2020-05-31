import { Route } from './route';
import { DiContainer } from './diContainer';
import { Action, Parameter } from './Action';

const ACTIONS = 'ACTIONS';
const PARAMS = 'PARAMS';

export class Decorators {

    constructor(
        private route: Route
    ) { }

    public Controller({url, auth = null, cors = null}, target: any) {
        let instance = DiContainer.resolve(target);
        const actions: Action[] = Reflect.getMetadata(ACTIONS, instance);
        
        actions.forEach(action => {
            const parameters: Parameter[] = Reflect.getMetadata(PARAMS, instance, action.action) || [];
            this.route.route({url, auth, cors}, instance, action.action, parameters.reverse(), action.method, action.path);
        });
    }

    public defineActionRequestType(path: string = "", target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>, requestType: string) {
        const actions: Action[] = Reflect.getMetadata(ACTIONS, target) || [];
        actions.push({path, method: requestType, action: propertyKey});

        Reflect.defineMetadata(ACTIONS, actions, target);

        return descriptor.value;
    }

    public defineActionParameters(id: string, target: any, propertyKey: string, parameterType: string) {
        const parameters: Parameter[] = Reflect.getMetadata(PARAMS, target, propertyKey) || [];
        parameters.push({parameterType: parameterType, parameterKey: id});
        Reflect.defineMetadata(PARAMS, parameters, target, propertyKey);
    }
}