import { Controller, Get, Post, PathVariable, RequestParam, RequestBody, DataObject } from './../lib/main';
import { Response } from 'express';
import { Equipamento } from './equipamento';
import { Authentication } from './Authentication';

@DataObject()
class zoa {
    private id: number;

    public getId() {
        return this.id;
    }
}

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
    getUserByEquip(@RequestBody() body: zoa, res: Response) {
        res.json({idsan: body.getId()})
    }
}