import { Controller, Get, HttpServer } from './../lib/main';
import { Response, Request } from 'express';
import { Authentication } from './Authentication';
import "reflect-metadata";

@Controller({url: '/usuario', cors: "*"})
export class Usuario {

    public id: number = 12;
    
    @Get('/:id')
    metodo(httpServer) {
        httpServer.res.json({teste: this.id});
    }
}