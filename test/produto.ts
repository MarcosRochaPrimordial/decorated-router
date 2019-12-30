import { Injectable } from './../lib/main';

@Injectable()
export class Produto {
    private id: number;

    constructor(){}

    public getId(): number {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }
}