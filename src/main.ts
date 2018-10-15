import { Server } from './server';
import { Decorator } from './decorator';
import { HttpServer } from './httpServer';

let server = new Server();
let decorator = new Decorator(server.initiateServer());

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

export = { Delete, Put, Post, Get, Controller, HttpServer };