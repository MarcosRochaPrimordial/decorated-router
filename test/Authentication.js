"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Authentication(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }
    else {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).send({ errors: ['Token não enviado.'] });
        }
        next();
    }
}
exports.Authentication = Authentication;
