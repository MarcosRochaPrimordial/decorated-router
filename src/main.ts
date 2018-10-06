import { Response, Request, NextFunction, Express } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';

class ServerService {
    private static _instance: ServerService = null;
    private server: Express = null;
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

        let serverService = ServerService.getInstance();
        serverService.setServer(server);
    }
}

let server = new Server();
server.initiateServer();

function Controller({url, auth = null, cors = null}) {
    return function (target: Object) {
        let serverService = ServerService.getInstance();
        let router = express.Router();

        if(cors != null) {
            serverService.getServer().use(url, (req: Request, res: Response, next: NextFunction) => {
                res.header('Access-Control-Allow-Origin', cors);
                next();
            });
        }

        serverService.getServer().use(url, router);

        if (auth != null) {
            router.use(auth);
        }

        serverService.getPaths().forEach((path) => {
            switch (path.method) {
                case 'GET':
                    router.route(path.path).get((req: Request, res: Response) => {
                        path.function.call(this, req, res);
                    });
                    break;
                case 'POST':
                    router.route(path.path).post((req: Request, res: Response) => {
                        path.function.call(this, req, res);
                    });
                    break;
                case 'PUT':
                    router.route(path.path).put((req: Request, res: Response) => {
                        path.function.call(this, req, res);
                    });
                    break;
                case 'DELETE':
                    router.route(path.path).delete((req: Request, res: Response) => {
                        path.function.call(this, req, res);
                    });
                    break;
            }
        });

        serverService.renewPaths();
    }
}

function Get(path: string = "") {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        let serverService = ServerService.getInstance();
        serverService.setPaths({
            path: path,
            method: 'GET',
            function: descriptor.value
        });
    }
}

function Post(path: string = "") {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        let serverService = ServerService.getInstance();
        serverService.setPaths({
            path: path,
            method: 'POST',
            function: descriptor.value
        });
    }
}

function Put(path: string = "") {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        let serverService = ServerService.getInstance();
        serverService.setPaths({
            path: path,
            method: 'PUT',
            function: descriptor.value
        });
    }
}

function Delete(path: string = "") {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        let serverService = ServerService.getInstance();
        serverService.setPaths({
            path: path,
            method: 'DELETE',
            function: descriptor.value
        });
    }
}

export = { Delete, Put, Post, Get, Controller };