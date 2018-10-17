"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./../lib/main");
let Equipamento = class Equipamento {
    mtod(req, res) {
        res.json({ tes: req.params.bah });
    }
};
__decorate([
    main_1.Get('/:bah')
], Equipamento.prototype, "mtod", null);
Equipamento = __decorate([
    main_1.Controller({ url: '/equipamento' })
], Equipamento);
exports.Equipamento = Equipamento;
