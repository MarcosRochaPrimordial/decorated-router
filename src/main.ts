import { Server } from './server';
import { Decorators } from './decorators';
import { Route } from './route';
import { METHOD } from './method';
import { HEADER } from './header';

let serverInstance = new Server();
let decorator = new Decorators(new Route(serverInstance.getInstanceServer()));

let LoadApp = ({controllers, server}) => {
    return (target: any) => {
        serverInstance.setPort(server.port);
        serverInstance.setMethods(server.methods);
        serverInstance.setHeaders(server.headers);
        serverInstance.initiateServer();
    }
}

let Injectable = () => {
    return (target: any) => {
        // faz alguma validação
    }
}

let DataObject = () => {
    return (target: any) => {
        // faz alguma validação
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

let PathVariable = (id: string) => {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        decorator.PathVariable(id, target, propertyKey, parameterIndex);
    }
}

let RequestParam = (id: string) => {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        decorator.RequestParam(id, target, propertyKey, parameterIndex);
    }
}

let RequestBody = () => {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        decorator.RequestBody(target, propertyKey, parameterIndex);
    }
}

export = { LoadApp, Injectable, Controller, Get, Post, Put, Delete, Patch, Options, PathVariable, RequestParam, RequestBody, METHOD, HEADER, DataObject };