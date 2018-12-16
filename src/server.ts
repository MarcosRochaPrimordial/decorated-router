import { Response, Request, NextFunction, Express } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';

export class Server {

    public door: number;
    public methods: string;
    public headers: string;
    public instanceServer: Express;

    constructor() {
        this.instanceServer = express();
    }

    public initiateServer() {
        this.instanceServer.use(bodyParser.urlencoded({ extended: true }));
        this.instanceServer.use(bodyParser.json());

        this.instanceServer.use("/", (req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Methods', this.methods);
            res.header('Access-Control-Allow-Headers', this.headers);
            next();
        });

        this.instanceServer.listen(this.door, () => console.log(`Now loading on door ${this.door}...`));
    }
}