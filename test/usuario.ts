import { Controller, Get } from './../lib/main';
import { Response, Request } from 'express';
import { Authentication } from './Authentication';

@Controller({url: '/usuario', cors: "*"})
export class Usuario {
    
    @Get('/:id')
    metodo(req: Request, res: Response) {
        res.json({teste: req.params.id});
    }
}