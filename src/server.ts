import { Response, Request, NextFunction, Express } from 'express';
import * as express from 'express';

export class Server {

    private port: number;
    private methods: string[];
    private headers: string[];
    private instanceServer: Express;

    constructor() {
        this.instanceServer = express();
    }

    public setPort(port: number) {
        this.port = port;
    }

    public setMethods(methods: string[]) {
        this.methods = methods;
    }

    public getMethods(): string[] {
        return this.methods;
    }

    public setHeaders(headers: string[]) {
        this.headers = headers;
    }

    public getHeaders(): string[] {
        return this.headers;
    }

    public getInstanceServer(): Express {
        return this.instanceServer;
    }

    public initiateServer() {
        this.instanceServer.listen(this.port, () => console.log(`Now loading on port ${this.port}...`));
    }
}