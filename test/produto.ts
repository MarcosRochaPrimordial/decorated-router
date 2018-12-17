import { Service } from './../lib/main';

@Service()
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