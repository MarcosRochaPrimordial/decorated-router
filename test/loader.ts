import { Usuario } from "./usuario";
import { App } from './../lib/main';
import { Login } from "./login";

@App({
    controllers: [
        Usuario,
        Login
    ],
    server: {
        port: 3300,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
    }
})
class loader {}