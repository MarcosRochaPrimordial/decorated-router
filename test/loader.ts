import { Usuario } from "./usuario";
import { LoadApp } from './../lib/main';

@LoadApp({
    controllers: [
        Usuario
    ],
    serverSets: {
        door: 3000,
        methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
})
class loader { }