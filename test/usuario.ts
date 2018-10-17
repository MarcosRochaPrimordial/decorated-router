import { Controller, Get } from './../lib/main';
import { Response, Request } from 'express';
import { Authentication } from './Authentication';
import "reflect-metadata";

@Controller({url: '/usuario', cors: "*"})
export class Usuario {

    public id: number = 12;
    
    @Get('/:id')
    metodo(req: Request, res: Response) {
        res.json({teste: this.id, retornado: req.params.id});
    }
}