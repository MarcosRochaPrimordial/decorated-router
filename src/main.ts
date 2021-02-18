import { Server } from './server';
import { Decorators } from './decorators';
import { Route } from './route';

let serverInstance = new Server();
let decorator = new Decorators(new Route(serverInstance));

let App = ({controllers, server}) => {
    return (target: any) => {
        serverInstance.setPort(server.port);
        serverInstance.setMethods(server.methods);
        serverInstance.setHeaders(server.headers);
        serverInstance.initiateServer();
    }
}

let Injectable = () => {
    return (target: any) => {
        // do some validation
    }
}

let DataObject = () => {
    return (target: any) => {
        // do some validation
    }
}

let Controller = ({url, auth = null, cors = null}) => {
    return (target: any) => {
        decorator.Controller({url, auth, cors}, target);
    }
}

let Get = (path: string = "") => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        decorator.defineActionRequestType(path, target, propertyKey, descriptor, 'get');
    }
}

let Post = (path: string = "") => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        decorator.defineActionRequestType(path, target, propertyKey, descriptor, 'post');
    }
}

let Put = (path: string = "") => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        decorator.defineActionRequestType(path, target, propertyKey, descriptor, 'put');
    }
}

let Delete = (path: string = "") => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        decorator.defineActionRequestType(path, target, propertyKey, descriptor, 'delete');
    }
}

let Patch = (path: string = "") => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        decorator.defineActionRequestType(path, target, propertyKey, descriptor, 'patch');
    }
}

let Options = (path: string = "") => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        decorator.defineActionRequestType(path, target, propertyKey, descriptor, 'options');
    }
}

let Path = (id: string) => {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        decorator.defineActionParameters(id, target, propertyKey, 'PATHVARIABLE');
    }
}

let Query = (id: string) => {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        decorator.defineActionParameters(id, target, propertyKey, 'PARAM');
    }
}

let Body = () => {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        decorator.defineActionParameters(null, target, propertyKey, 'BODY');
    }
}

export = { App, Injectable, Controller, Get, Post, Put, Delete, Patch, Options, Path, Query, Body, DataObject };