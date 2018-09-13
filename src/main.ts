import { Response, Request, NextFunction, Express, Router } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';

class ServerService {
    private static _instance: ServerService = null;
    private server: Express = null;
    private router: Router = null;
    private paths: Array<{path: string, method: string, function: Function}> = [];

    private constructor() {
        ServerService._instance = this;
    }

    public static getInstance(): ServerService {
        if(ServerService._instance === null) {
            ServerService._instance = new ServerService();
        }

        return ServerService._instance;
    }

    public getServer(): Express {
        return this.server;
    }

    public setServer(server: Express) {
        this.server = server;
    }

    public getRouter(): Router {
        return this.router;
    }

    public setRouter(router: Router) {
        this.router = router;
    }

    public getPaths(): Array<{path: string, method: string, function: Function}> {
        return this.paths;
    }

    public setPaths(paths: {path: string, method: string, function: Function}) {
        this.paths.push(paths);
    }

    public renewPaths() {
        this.paths = [];
    }
}

class Server {
    constructor() { }

    public initiateServer() {
        const door = 3000;
        const server: Express = express();
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(bodyParser.json());

        server.use("/", (req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            next();
        });

        server.listen(door, () => console.log(`Now loading on door ${door}...`));

        let serverService = ServerService.getInstance();
        serverService.setServer(server);
    }
}

let server = new Server();
server.initiateServer();

export function Controller(url: string = "/", auth: any = null, cors: string = "") {
    return function (target: Object) {
        let serverService = ServerService.getInstance();
        serverService.setRouter(express.Router());

        if(cors != "") {
            serverService.getServer().use(url, (req: Request, res: Response, next: NextFunction) => {
                res.header('Access-Control-Allow-Origin', cors);
                next();
            });
        }

        serverService.getServer().use(url, serverService.getRouter());

        if (auth != null) {
            serverService.getRouter().use(auth);
        }

        serverService.getPaths().forEach((path) => {
            switch (path.method) {
                case 'GET':
                    serverService.getRouter().route(path.path).get((req: Request, res: Response) => {
                        path.function.call(this, req, res);
                    });
                    break;
                case 'POST':
                    serverService.getRouter().route(path.path).post((req: Request, res: Response) => {
                        path.function.call(this, req, res);
                    });
                    break;
                case 'PUT':
                    serverService.getRouter().route(path.path).put((req: Request, res: Response) => {
                        path.function.call(this, req, res);
                    });
                    break;
                case 'DELETE':
                    serverService.getRouter().route(path.path).delete((req: Request, res: Response) => {
                        path.function.call(this, req, res);
                    });
                    break;
            }
        });

        serverService.renewPaths();
        serverService.setRouter(null);
    }
}

export function Get(path: string = "") {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        let serverService = ServerService.getInstance();
        serverService.setPaths({
            path: path,
            method: 'GET',
            function: descriptor.value
        });
    }
}

export function Post(path: string = "") {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        let serverService = ServerService.getInstance();
        serverService.setPaths({
            path: path,
            method: 'POST',
            function: descriptor.value
        });
    }
}

export function Put(path: string = "") {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        let serverService = ServerService.getInstance();
        serverService.setPaths({
            path: path,
            method: 'PUT',
            function: descriptor.value
        });
    }
}

export function Delete(path: string = "") {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        let serverService = ServerService.getInstance();
        serverService.setPaths({
            path: path,
            method: 'DELETE',
            function: descriptor.value
        });
    }
}