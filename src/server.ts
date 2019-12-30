import { Response, Request, NextFunction, Express } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';

export class Server {

    private port: number;
    private methods: string;
    private headers: string;
    private instanceServer: Express;

    constructor() {
        this.instanceServer = express();
    }

    public setPort(port: number) {
        this.port = port;
    }

    public setMethods(methods: string) {
        this.methods = methods;
    }

    public setHeaders(headers: string) {
        this.headers = headers;
    }

    public getInstanceServer(): Express {
        return this.instanceServer;
    }

    public initiateServer() {
        this.instanceServer.use(bodyParser.urlencoded({ extended: true }));
        this.instanceServer.use(bodyParser.json());

        this.instanceServer.use("/", (req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Methods', this.methods);
            res.header('Access-Control-Allow-Headers', this.headers);
            next();
        });

        this.instanceServer.listen(this.port, () => console.log(`Now loading on port ${this.port}...`));
    }
}