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
const main_1 = require("./../lib/main");
const equipamento_1 = require("./equipamento");
const Authentication_1 = require("./Authentication");
let Usuario = class Usuario {
    constructor(equip) {
        this.equip = equip;
    }
    getAllUsers(req, res) {
        res.json([{ usuarioId: 123, usuarioNome: 'açlskdfjal' }, { usuarioId: 321, usuarioNome: 'ofiasdofijasdofj' }]);
    }
    getUserByEquip(req, res) {
        this.equip.setName('Chave de fenda');
        this.equip.setProdutoId(12);
        res.json({ equipName: this.equip.getName(), equipProdutoId: this.equip.getProdutoId() });
    }
};
__decorate([
    main_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Usuario.prototype, "getAllUsers", null);
__decorate([
    main_1.Get('/equip/blazer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Usuario.prototype, "getUserByEquip", null);
Usuario = __decorate([
    main_1.Controller({ url: '/usuario', cors: "*", auth: Authentication_1.Authentication }),
    __metadata("design:paramtypes", [equipamento_1.Equipamento])
], Usuario);
exports.Usuario = Usuario;
