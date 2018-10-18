import { Server } from './server';
import { Decorators } from './decorators';
import { Route } from './route';

let server = new Server();
let decorator = new Decorators(new Route(server.initiateServer()));

function Controller({url, auth = null, cors = null}) {
    return function (target: any) {
        decorator.Controller({url, auth, cors}, target);
    }
}

function Get(path: string = "") {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        decorator.Get(path, target, propertyKey, descriptor);
    }
}

function Post(path: string = "") {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        decorator.Post(path, target, propertyKey, descriptor);
    }
}

function Put(path: string = "") {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        decorator.Put(path, target, propertyKey, descriptor);
    }
}

function Delete(path: string = "") {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        decorator.Delete(path, target, propertyKey, descriptor);
    }
}

function Patch(path: string = "") {
    return function(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        decorator.Patch(path, target, propertyKey, descriptor);
    }
}

function Options(path: string = "") {
    return function(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        decorator.Options(path, target, propertyKey, descriptor);
    }
}

export = { Delete, Put, Post, Get, Controller, Patch, Options };