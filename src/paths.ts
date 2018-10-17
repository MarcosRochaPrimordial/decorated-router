export class Paths {
    private static _instance: Paths = null;
    private objects: Array<{path: string, method: string, key: string}>;

    constructor() {
        Paths._instance = this;
    }

    public static getInstance() {
        if(Paths._instance === null) {
            Paths._instance = new Paths();
        }

        return Paths._instance;
    }

    getObjects() {
        return this.objects;
    }

    setObjects(objects: Array<{path: string, method: string, key: string}>) {
        this.objects = objects;
    }

    renewObjects() {
        this.objects = [];
    }

}