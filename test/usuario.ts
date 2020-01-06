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

@Controller({ url: '/usuario', cors: "*", auth: Authentication })
export class Usuario {

    constructor(
        private equip: Equipamento
    ) { }

    @Get('/to/:to')
    getTo(@PathVariable('to') to) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject({ to });
            }, 5000);
        })
    }

    @Get('/from/:from')
    getFrom(@PathVariable('from') from, res: Response) {
        setTimeout(() => {
            res.json({ from });
        }, 3000);
    }
}