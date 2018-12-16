import { Usuario } from "./usuario";
import { Equipamento } from "./equipamento";
import { LoadApp } from './../lib/main';

@LoadApp({
    controllers: [
        Usuario,
        Equipamento
    ],
    serverSets: {
        door: 4000,
        methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
})
class loader { }