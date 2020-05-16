import { Usuario } from "./usuario";
import { App } from './../lib/main';
import { METHOD } from './../lib/main';
import { HEADER } from "../lib/header";

@App({
    controllers: [
        Usuario
    ],
    server: {
        port: 3000,
        methods: [METHOD.GET, METHOD.POST, METHOD.PUT, METHOD.DELETE, METHOD.PATCH, METHOD.OPTIONS],
        headers: [HEADER.ORIGIN, HEADER.XREQUESTEDWITH, HEADER.CONTENTTYPE, HEADER.ACCEPT, HEADER.AUTHORIZATION]
    }
})
class loader {}