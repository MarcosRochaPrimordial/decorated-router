import { Response, Request, NextFunction, Express } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';

export class Server {
    constructor() { }

    public initiateServer() {
        const door = 3000 || process.argv[2];
        const server: Express = express();
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(bodyParser.json());

        server.use("/", (req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            next();
        });

        server.listen(door, () => console.log(`Now loading on door ${door}...`));

        return server;
    }
}