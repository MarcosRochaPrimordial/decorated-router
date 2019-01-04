"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const produto_1 = require("./produto");
const main_1 = require("./../lib/main");
let Equipamento = class Equipamento {
    constructor(produto) {
        this.produto = produto;
    }
    getProdutoId() {
        return this.produto.getId();
    }
    setProdutoId(id) {
        this.produto.setId(id);
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
};
Equipamento = __decorate([
    main_1.Service(),
    __metadata("design:paramtypes", [produto_1.Produto])
], Equipamento);
exports.Equipamento = Equipamento;
