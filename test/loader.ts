import { Usuario } from "./usuario";
import { LoadApp } from './../lib/main';
import { METHOD } from './../lib/main';
import { HEADER } from "../lib/header";

@LoadApp({
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