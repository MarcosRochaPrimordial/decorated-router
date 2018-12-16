"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("./usuario");
const equipamento_1 = require("./equipamento");
const main_1 = require("./../lib/main");
let loader = class loader {
};
loader = __decorate([
    main_1.LoadApp({
        controllers: [
            usuario_1.Usuario,
            equipamento_1.Equipamento
        ],
        serverSets: {
            door: 4000,
            methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        }
    })
], loader);
