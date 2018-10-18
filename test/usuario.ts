import { Controller, Get } from './../lib/main';
import { Response, Request } from 'express';
import { Authentication } from './Authentication';

@Controller({url: '/usuario', cors: "*"})
export class Usuario {

    public id: number = 12;
    
    @Get('/:id')
    metodo(req: Request, res: Response) {
        res.json({teste: this.id, retornado: req.params.id});
    }

    @Get()
    getAllUsers(req: Request, res: Response) {
        res.json([{usuarioId: 123, usuarioNome: 'açlskdfjal'}, {usuarioId: 321, usuarioNome: 'ofiasdofijasdofj'}])
    }
}