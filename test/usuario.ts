import { Controller, Get, Post, Path, Query, Body, DataObject } from './../lib/main';
import { Response } from 'express';
import { Equipamento } from './equipamento';
import { Authentication } from './Authentication';

@DataObject()
class zoa {
    private id: number;
    private name: string;

    public getId(): number {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }

    public getName() {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }
}

@Controller({ url: '/usuario', cors: "*" })
export class Usuario {

    constructor(
        private equip: Equipamento
    ) { }

    @Get('/to/:to')
    getTo(@Path('to') to: number, @Query('e') e: string, @Query('c') c: number, @Query('b') b: number) {
        return new Promise((resolve, reject) => {
            resolve({ to, e, c, b });
        });
    }

    @Get('/from')
    getFrom(@Query('from') from: boolean, res: Response) {
        res.json({ to: 2012, from });
    }

    @Post('/test')
    getTest(@Body() zoa: zoa, @Query('a') a: string) {
        return zoa;
    }
}