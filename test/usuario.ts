import { Controller, Get, Post, PathVariable, RequestParam, RequestBody } from './../lib/main';
import { Response, Request } from 'express';
import { Equipamento } from './equipamento';
import { Authentication } from './Authentication';

@Controller({url: '/usuario', cors: "*", auth: Authentication})
export class Usuario {

    constructor(
        private equip: Equipamento
    ){}

    @Get('/:to')
    getAllUsers(@PathVariable('to') to, @RequestParam('from') from, res: Response) {
        res.json({ to, from });
    }

    @Post('/equip/blazer')
    getUserByEquip(@RequestBody() body, res: Response) {
        res.json(body);
    }

    @Post('/blah')
    blah(req: Request, res: Response) {
        console.log(req.body);
    }
}