import { Response, Request } from "express";

export class HttpServer {

    public response: Response;

    public request: Request;

    constructor(req: Request, res: Response)  {
        this.request = req;
        this.response = res;
    }
}