import { Produto } from "./produto";
import { Service } from './../lib/main';

@Service()
export class Equipamento {

    private name: string

    constructor(
        private produto: Produto
    ){}

    public getProdutoId(): number {
        return this.produto.getId();
    }

    public setProdutoId(id: number) {
        this.produto.setId(id);
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }
}