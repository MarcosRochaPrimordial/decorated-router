import { Controller, Get, Post } from './../lib/main';
import { Response, Request } from 'express';
import { Equipamento } from './equipamento';
import { Authentication } from './Authentication';

@Controller({url: '/usuario', cors: "*", auth: Authentication})
export class Usuario {

    constructor(
        private equip: Equipamento
    ){}

    @Get()
    getAllUsers(req: Request, res: Response) {
        res.json([{usuarioId: 123, usuarioNome: 'açlskdfjal'}, {usuarioId: 321, usuarioNome: 'ofiasdofijasdofj'}])
    }

    @Get('/equip/blazer')
    getUserByEquip(req: Request, res: Response) {
        this.equip.setName('Chave de fenda');
        this.equip.setProdutoId(12);
        res.json({equipName: this.equip.getName(), equipProdutoId: this.equip.getProdutoId()});
    }

    @Post('/blah')
    blah(req: Request, res: Response) {
        console.log(req.body);
    }
}