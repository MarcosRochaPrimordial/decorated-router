import { Request, Response } from "express";
import { Controller, Get } from './../lib/main';

@Controller({url: '/equipamento'})
export class Equipamento {
    @Get('/:bah')
    mtod(req: Request, res: Response) {
        res.json({tes: req.params.bah});
    }
}