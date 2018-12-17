import { Server } from './server';
import { Decorators } from './decorators';
import { Route } from './route';

let server = new Server();
let decorator = new Decorators(new Route(server.getInstanceServer()));

let LoadApp = ({controllers, serverSets}) => {
    return (target: any) => {
        server.setDoor(serverSets.door);
        server.setMethods(serverSets.methods);
        server.setHeaders(serverSets.headers);
        server.initiateServer();
    }
}

let Service = () => {
    return (target: any) => {
        //console.log(target);
    }
}

let Controller = ({url, auth = null, cors = null}) => {
    return (target: any) => {
        decorator.Controller({url, auth, cors}, target);
    }
}

let Get = (path: string = "") => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        decorator.Get(path, target, propertyKey, descriptor);
    }
}

let Post = (path: string = "") => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        decorator.Post(path, target, propertyKey, descriptor);
    }
}

let Put = (path: string = "") => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        decorator.Put(path, target, propertyKey, descriptor);
    }
}

let Delete = (path: string = "") => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        decorator.Delete(path, target, propertyKey, descriptor);
    }
}

let Patch = (path: string = "") => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        decorator.Patch(path, target, propertyKey, descriptor);
    }
}

let Options = (path: string = "") => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        decorator.Options(path, target, propertyKey, descriptor);
    }
}

export = { LoadApp, Service, Controller, Get, Post, Put, Delete, Patch, Options };